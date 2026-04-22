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
      plan: body.plan ?? "",
    });

    const res = await fetch(`${endpoint}?${params.toString()}`, {
      method: "GET",
      redirect: "follow",
    });

    if (!res.ok) {
      throw new Error(`Upstream error: ${res.status}`);
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Form submission error:", err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
