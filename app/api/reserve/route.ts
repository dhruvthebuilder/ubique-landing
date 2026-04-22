import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const endpoint = process.env.FORM_ENDPOINT;

  if (!endpoint) {
    console.log("Reservation received (no endpoint configured):", body);
    return NextResponse.json({ ok: true });
  }

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
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
