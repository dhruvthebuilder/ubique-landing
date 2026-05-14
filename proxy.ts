import { NextResponse, type NextRequest } from 'next/server';

const BOT_RE =
  /bot|crawler|spider|crawling|facebookexternalhit|whatsapp|twitterbot|linkedinbot|slackbot|telegrambot|googlebot|bingbot|duckduckbot|yandex/i;

type Variant = 'v1' | 'v2';

export function proxy(req: NextRequest) {
  // Override: ?v=1 or ?v=2 is session-only, never written to cookie.
  const qv = req.nextUrl.searchParams.get('v');
  const override: Variant | null = qv === '1' ? 'v1' : qv === '2' ? 'v2' : null;

  // Existing assignment from cookie.
  const cookieVal = req.cookies.get('ubique_variant')?.value;
  const fromCookie: Variant | null =
    cookieVal === 'v1' || cookieVal === 'v2' ? cookieVal : null;

  // Bot UAs are deterministic → v1 (keeps analytics clean).
  const ua = req.headers.get('user-agent') ?? '';
  const isBot = BOT_RE.test(ua);

  const assigned: Variant =
    override ?? fromCookie ?? (isBot ? 'v1' : Math.random() < 0.5 ? 'v1' : 'v2');

  const url = req.nextUrl.clone();
  url.pathname = assigned === 'v1' ? '/v1/index.html' : '/v2/index.html';
  // Drop any query params from the rewritten target so caching keys stay clean.
  url.search = '';

  const res = NextResponse.rewrite(url);
  res.headers.set('x-ubique-variant', assigned);
  // Never let the edge cache a variant-assignment response — otherwise many
  // cookie-less first-time visitors collapse into one cache key and all see
  // the same variant. Each visit must hit the proxy.
  res.headers.set('Cache-Control', 'private, no-store, max-age=0, must-revalidate');
  res.headers.set('CDN-Cache-Control', 'no-store');
  res.headers.set('Vercel-CDN-Cache-Control', 'no-store');

  // Persist only freshly-assigned variants; overrides stay session-scoped.
  if (!fromCookie && !override) {
    res.cookies.set('ubique_variant', assigned, {
      maxAge: 60 * 60 * 24 * 30,
      httpOnly: false,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/'
    });
  }

  return res;
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon\\.ico|favicon\\.svg|fonts|generated|v1|v2|robots\\.txt|sitemap\\.xml).*)'
  ]
};
