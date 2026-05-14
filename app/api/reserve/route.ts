import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const endpoint = process.env.FORM_ENDPOINT;

  if (!endpoint) {
    console.log("Reservation received (no endpoint configured):", body);
    return NextResponse.json({ ok: true });
  }

  try {
    // GAS web apps redirect POST → GET, so we send as GET with query params.
    // This is the reliable approach for Google Apps Script web app endpoints.
    const params = new URLSearchParams({
      name: body.name ?? "",
      phone: body.phone ?? "",
      email: body.email ?? "",
      city: body.city ?? "",
      pincode: body.pincode ?? "",
      plan: body.plan ?? "",
      variant: body.variant ?? "",
    });

    const res = await fetch(`${endpoint}?${params.toString()}`, {
      method: "GET",
      redirect: "follow",
    });

    const text = await res.text();
    const preview = text.slice(0, 400).replace(/\s+/g, " ");

    if (!res.ok) {
      console.error(`[reserve] GAS upstream ${res.status} variant=${body.variant ?? "?"}: ${preview}`);
      return NextResponse.json({ ok: false, upstream: res.status }, { status: 502 });
    }

    // GAS web apps always return 200, even on error — they wrap errors in JSON
    // { ok: false, error: ... } or return an HTML error page on permission/script issues.
    let gasOk = true;
    try {
      const parsed = JSON.parse(text);
      gasOk = parsed?.ok !== false;
      if (!gasOk) console.error(`[reserve] GAS reported failure variant=${body.variant ?? "?"}: ${preview}`);
    } catch {
      // Non-JSON response = GAS HTML error page (auth, undeployed, etc.)
      console.error(`[reserve] GAS returned non-JSON variant=${body.variant ?? "?"}: ${preview}`);
      gasOk = false;
    }

    if (!gasOk) return NextResponse.json({ ok: false, gas: preview }, { status: 502 });

    console.log(`[reserve] ok variant=${body.variant ?? "?"} plan=${body.plan ?? "?"}`);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[reserve] fatal:", err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
