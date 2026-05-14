#!/usr/bin/env node
/**
 * Decode the Claude Design "bundler" v2 prototype into real files.
 *
 * The source HTML contains three script tags:
 *   - script[type="__bundler/manifest"]        — uuid → { data (b64), mime, compressed? }
 *   - script[type="__bundler/ext_resources"]   — [{ uuid, id }]
 *   - script[type="__bundler/template"]        — JSON-encoded HTML template with uuid placeholders
 *
 * We replicate the in-browser unpacker offline: gunzip where needed, write each asset
 * to public/v2/assets/<basename>, rewrite the template to reference those file paths,
 * and write the result as public/v2/index.html.
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import zlib from 'node:zlib';
import { promisify } from 'node:util';

const gunzip = promisify(zlib.gunzip);

const SRC = path.resolve(process.cwd(), 'ubique-landing-page-v2/project/Ubique Landing Page.html');
const OUT_DIR = path.resolve(process.cwd(), 'public/v2');
const ASSETS_DIR = path.join(OUT_DIR, 'assets');

type ManifestEntry = { data: string; mime: string; compressed?: boolean };
type Manifest = Record<string, ManifestEntry>;

// Minimal mime → extension map covering what Claude Design bundles.
const MIME_EXT: Record<string, string> = {
  'text/html': '.html',
  'text/css': '.css',
  'application/javascript': '.js',
  'text/javascript': '.js',
  'application/json': '.json',
  'image/png': '.png',
  'image/jpeg': '.jpg',
  'image/gif': '.gif',
  'image/svg+xml': '.svg',
  'image/webp': '.webp',
  'font/woff': '.woff',
  'font/woff2': '.woff2',
  'application/font-woff': '.woff',
  'application/font-woff2': '.woff2',
  'application/octet-stream': '.bin'
};

function extFor(mime: string): string {
  return MIME_EXT[mime.toLowerCase()] ?? '.bin';
}

function extractScript(html: string, type: string): string {
  const open = `<script type="${type}">`;
  const start = html.indexOf(open);
  if (start === -1) throw new Error(`Missing <script type="${type}">`);
  const contentStart = start + open.length;
  const end = html.indexOf('</script>', contentStart);
  if (end === -1) throw new Error(`Unterminated <script type="${type}">`);
  return html.slice(contentStart, end).trim();
}

async function main() {
  console.log('Reading bundle...');
  const html = await fs.readFile(SRC, 'utf8');

  const manifest: Manifest = JSON.parse(extractScript(html, '__bundler/manifest'));
  let template: string = JSON.parse(extractScript(html, '__bundler/template'));
  const extResRaw = extractScript(html, '__bundler/ext_resources').trim();
  const extResources: Array<{ uuid: string; id: string }> = extResRaw ? JSON.parse(extResRaw) : [];

  console.log(`  manifest: ${Object.keys(manifest).length} assets`);
  console.log(`  ext_resources: ${extResources.length}`);

  await fs.mkdir(ASSETS_DIR, { recursive: true });

  // Decode each asset, write to disk, build uuid → relative path map.
  const uuidToPath: Record<string, string> = {};
  let idx = 0;
  for (const [uuid, entry] of Object.entries(manifest)) {
    const raw = Buffer.from(entry.data, 'base64');
    const bytes = entry.compressed ? await gunzip(raw) : raw;
    const ext = extFor(entry.mime);
    const filename = `${String(idx).padStart(3, '0')}-${uuid.slice(0, 8)}${ext}`;
    await fs.writeFile(path.join(ASSETS_DIR, filename), bytes);
    uuidToPath[uuid] = `/v2/assets/${filename}`;
    idx++;
  }
  console.log(`  wrote ${idx} files to ${ASSETS_DIR}`);

  // Rewrite the template: every uuid in the template body is replaced with its file path.
  for (const [uuid, p] of Object.entries(uuidToPath)) {
    template = template.split(uuid).join(p);
  }

  // Strip integrity + crossorigin (same reasoning as the runtime unpacker).
  template = template.replace(/\s+integrity="[^"]*"/gi, '').replace(/\s+crossorigin="[^"]*"/gi, '');

  // Drop any ext_resources references — they target the runtime resource map; not relevant here.
  // (We leave the template as-is otherwise so the design is preserved exactly.)

  // Inject tracking + image-placeholder helper after <head>.
  const trackingHead = `
<!-- TRACKING (injected at build via scripts/inject-keys.ts) -->
<script>
  (function () {
    var m = (document.cookie.match(/(?:^|;\\s*)ubique_variant=(v[12])/) || [])[1] || 'v2';
    window.__UBIQUE_VARIANT__ = m;
  })();
</script>

<script>
  !function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.crossOrigin="anonymous",p.async=!0,p.src=s.api_host.replace(".i.posthog.com","-assets.i.posthog.com")+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="init capture register register_once register_for_session unregister unregister_for_session getFeatureFlag getFeatureFlagPayload isFeatureEnabled reloadFeatureFlags updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures on onFeatureFlags onSessionId getSurveys getActiveMatchingSurveys renderSurvey canRenderSurvey getNextSurveyStep identify setPersonProperties group resetGroups setPersonPropertiesForFlags resetPersonPropertiesForFlags setGroupPropertiesForFlags resetGroupPropertiesForFlags reset get_distinct_id getGroups get_session_id get_session_replay_url alias set_config startSessionRecording stopSessionRecording sessionRecordingStarted captureException loadToolbar get_property getSessionProperty createPersonProfile opt_in_capturing opt_out_capturing has_opted_in_capturing has_opted_out_capturing clear_opt_in_out_capturing debug getPageViewId captureTraceFeedback captureTraceMetric".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
  if ('%NEXT_PUBLIC_POSTHOG_KEY%' && '%NEXT_PUBLIC_POSTHOG_KEY%'.charAt(0) !== '%') {
    posthog.init('%NEXT_PUBLIC_POSTHOG_KEY%', { api_host: '%NEXT_PUBLIC_POSTHOG_HOST%', person_profiles: 'identified_only' });
    posthog.register({ variant: window.__UBIQUE_VARIANT__ });
    posthog.capture('variant_assigned', { variant: window.__UBIQUE_VARIANT__ });
  }
</script>

<script>
  if ('%NEXT_PUBLIC_META_PIXEL_ID%' && '%NEXT_PUBLIC_META_PIXEL_ID%'.charAt(0) !== '%') {
    !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', '%NEXT_PUBLIC_META_PIXEL_ID%');
    fbq('track', 'PageView');
  }
</script>

<script>
  if ('%NEXT_PUBLIC_GOOGLE_ADS_ID%' && '%NEXT_PUBLIC_GOOGLE_ADS_ID%'.charAt(0) !== '%') {
    var gads = document.createElement('script');
    gads.async = true;
    gads.src = 'https://www.googletagmanager.com/gtag/js?id=%NEXT_PUBLIC_GOOGLE_ADS_ID%';
    document.head.appendChild(gads);
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '%NEXT_PUBLIC_GOOGLE_ADS_ID%');
  }
</script>

<script>
  // Image slot fallback: any element matching [data-img-slot] / [data-image-slot] / a.placeholder image
  // gets swapped for /generated/v2/<slot>.webp once the DOM is ready, with graceful fallback if the
  // file does not yet exist.
  window.addEventListener('DOMContentLoaded', function () {
    var nodes = document.querySelectorAll('[data-img-slot],[data-image-slot]');
    nodes.forEach(function (el) {
      var slot = (el.getAttribute('data-img-slot') || el.getAttribute('data-image-slot') || '').toLowerCase().replace(/\\s+/g, '-');
      if (!slot) return;
      var img = new Image();
      img.src = '/generated/v2/' + slot + '.webp';
      img.alt = '';
      img.loading = 'lazy';
      img.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:0;transition:opacity .5s';
      img.onload = function () { img.style.opacity = '1'; };
      img.onerror = function () { img.remove(); };
      if (getComputedStyle(el).position === 'static') el.style.position = 'relative';
      el.appendChild(img);
    });
  });
</script>
`;

  // Insert tracking right after the opening <head> tag.
  template = template.replace(/<head([^>]*)>/i, '<head$1>' + trackingHead);

  // Write as the template; the served index.html is built from it by scripts/inject-keys.ts.
  await fs.writeFile(path.join(OUT_DIR, 'index.template.html'), template, 'utf8');
  console.log(`Wrote ${path.join(OUT_DIR, 'index.template.html')}`);
  console.log('Done.');
}

main().catch((err) => {
  console.error('Unpack failed:', err);
  process.exit(1);
});
