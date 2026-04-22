export default function Footer() {
  return (
    <footer className="px-6 md:px-12 py-12 border-t border-border flex flex-col md:flex-row md:items-end justify-between gap-6">
      <div className="flex flex-col gap-3">
        <span className="text-base font-semibold tracking-[0.2em] uppercase">Ubique</span>
        <p className="text-xs tracking-[0.12em] uppercase text-muted">
          Mumbai · Delhi NCR · Bengaluru · Hyderabad · Chennai
        </p>
      </div>
      <p className="text-[11px] text-muted max-w-xs leading-relaxed">
        Ubique is in pre-launch. Reserving a session does not constitute a purchase.
      </p>
    </footer>
  );
}
