"use client";

export default function MarqueeText() {
  const text = "Now accepting reservations · Mumbai · Delhi NCR · Bengaluru · Hyderabad · Chennai · ";
  const repeated = text.repeat(4);

  return (
    <div className="overflow-hidden border-t border-b border-border py-2.5">
      <div className="marquee-track">
        <span className="text-xs tracking-[0.15em] uppercase text-muted pr-8">
          {repeated}
        </span>
        <span className="text-xs tracking-[0.15em] uppercase text-muted pr-8" aria-hidden>
          {repeated}
        </span>
      </div>
    </div>
  );
}
