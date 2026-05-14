const { useEffect, useRef, useState } = React;
const { motion, useInView, useScroll, useTransform } = window.Motion || {};

/* WordsPullUp ----------------------------------------------------------- */
function WordsPullUp({ text, className = "", style = {}, delay = 0, showAsterisk = false }) {
  const words = text.split(" ");
  const ref = useRef(null);
  const inView = useInView ? useInView(ref, { once: true, margin: "-10%" }) : true;
  return (
    <span ref={ref} className={className} style={{ display: "inline-flex", flexWrap: "wrap", ...style }}>
      {words.map((w, i) => {
        const isLast = i === words.length - 1;
        const text = isLast && showAsterisk ? w + "*" : w + (isLast ? "" : "\u00A0");
        return (
          <span key={i} style={{ display: "inline-block", overflow: "hidden", verticalAlign: "top" }}>
            <motion.span
              style={{ display: "inline-block" }}
              initial={{ y: 20, opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: delay + i * 0.08 }}
            ><span>{text}</span></motion.span>
          </span>
        );
      })}
    </span>
  );
}

/* WordsPullUpMultiStyle ------------------------------------------------- */
function WordsPullUpMultiStyle({ segments, className = "", style = {}, delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView ? useInView(ref, { once: true, margin: "-10%" }) : true;
  const tokens = [];
  segments.forEach((seg) => {
    const ws = seg.text.split(" ").filter(Boolean);
    ws.forEach((w, j) => {
      tokens.push({ word: w, className: seg.className || "", serif: !!seg.serif, last: j === ws.length - 1 });
    });
  });
  return (
    <span ref={ref} className={className} style={{ display: "inline-flex", flexWrap: "wrap", ...style }}>
      {tokens.map((t, i) => (
        <span key={i} style={{ display: "inline-block", overflow: "hidden", verticalAlign: "top" }}>
          <motion.span
            className={t.className}
            style={{
              display: "inline-block",
              fontFamily: t.serif ? '"Instrument Serif", serif' : undefined,
              fontStyle: t.serif ? "italic" : undefined,
              fontWeight: t.serif ? 400 : undefined,
            }}
            initial={{ y: 20, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: delay + i * 0.08 }}
          >
            {t.word + "\u00A0"}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/* ScrollLetterReveal ---------------------------------------------------- */
function AnimatedLetter({ ch, progress, charProgress }) {
  const opacity = useTransform(progress, [charProgress - 0.1, charProgress + 0.05], [0.2, 1]);
  return <motion.span style={{ opacity, display: "inline-block", whiteSpace: "pre" }}>{ch}</motion.span>;
}
function ScrollLetterReveal({ text, className = "", style = {} }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.2"] });
  const chars = [...text];
  return (
    <span ref={ref} className={className} style={style}>
      {chars.map((c, i) => (
        <AnimatedLetter key={i} ch={c} progress={scrollYProgress} charProgress={i / chars.length} />
      ))}
    </span>
  );
}

/* FadeUp ---------------------------------------------------------------- */
function FadeUp({ children, delay = 0, y = 24, className = "", amount = 0.3 }) {
  const ref = useRef(null);
  const inView = useInView ? useInView(ref, { once: true, amount }) : true;
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

/* Primary CTA — "Reserve your spot" pill ---- */
function ReserveButton({ label = "Reserve your spot", href = "#reserve", className = "", variant = "cream" }) {
  const base = "group inline-flex items-center gap-2 hover:gap-3 transition-all duration-300 pl-5 sm:pl-6 pr-1.5 py-1.5 rounded-full font-medium text-sm sm:text-base";
  const variants = {
    cream: "bg-primary text-black",
    outline: "border border-primary/30 text-primary hover:bg-primary/5",
    dark: "bg-black text-primary border border-primary/15 hover:border-primary/40",
  };
  return (
    <a href={href} className={`${base} ${variants[variant]} ${className}`}>
      <span>{label}</span>
      <span className={`inline-flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full transition-transform group-hover:scale-110 ${variant === "cream" ? "bg-black text-primary" : "bg-primary text-black"}`}>
        <IconArrowRight size={14} />
      </span>
    </a>
  );
}

/* Navbar — black pill hanging from top -------- */
function Navbar() {
  return (
    <div className="absolute top-0 left-0 right-0 z-40 flex justify-center pointer-events-none">
      <nav
        className="pointer-events-auto bg-black rounded-b-2xl md:rounded-b-3xl px-4 py-2.5 md:px-8 md:py-3 flex items-center gap-3 sm:gap-6 md:gap-12 lg:gap-14 text-[10px] sm:text-xs md:text-sm"
        style={{ boxShadow: "0 12px 32px rgba(0,0,0,0.5)" }}
      >
        {[
          ["How it works", "#how"],
          ["Stylists", "#roster"],
          ["Workshops", "#modes"],
          ["Pricing", "#pricing"],
          ["Reserve your spot", "#reserve"],
        ].map(([t, href]) => (
          <a
            key={href}
            href={href}
            className="whitespace-nowrap transition-colors duration-200"
            style={{ color: "rgba(225, 224, 204, 0.78)" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#E1E0CC")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(225, 224, 204, 0.78)")}
          >
            {t === "Reserve your spot" ? <span className="text-primary font-semibold">{t}</span> : t}
          </a>
        ))}
      </nav>
    </div>
  );
}

function Eyebrow({ children, className = "", color = "#CFDDB5" }) {
  return (
    <div className={`eyebrow inline-flex items-center gap-2 ${className}`} style={{ color }}>
      <span className="inline-block h-px w-6" style={{ background: color, opacity: 0.4 }} />
      <span>{children}</span>
    </div>
  );
}

function ImagePlaceholder({ label = "Image", aspect = "4/3", className = "", note = "", filename = "" }) {
  const alt = filename || label;
  return (
    <div
      role="img"
      aria-label={alt}
      data-filename={filename}
      className={`relative w-full overflow-hidden rounded-2xl border border-primary/15 bg-card-2 ${className}`}
      style={{ aspectRatio: aspect }}
    >
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 30% 30%, rgba(207,221,181,0.10), transparent 60%), radial-gradient(ellipse at 70% 80%, rgba(207,221,181,0.06), transparent 60%)" }} />
      <svg className="absolute inset-0 w-full h-full opacity-30" preserveAspectRatio="none" viewBox="0 0 100 100">
        <line x1="0" y1="0" x2="100" y2="100" stroke="#CFDDB5" strokeWidth="0.25" strokeDasharray="1 1" vectorEffect="non-scaling-stroke" />
        <line x1="100" y1="0" x2="0" y2="100" stroke="#CFDDB5" strokeWidth="0.25" strokeDasharray="1 1" vectorEffect="non-scaling-stroke" />
      </svg>
      <div className="absolute top-3 left-3 mono text-[10px] tracking-[0.22em] uppercase text-primary/55">{label}</div>
      {filename ? (
        <div className="absolute top-3 right-3 mono text-[9px] tracking-[0.18em] text-primary/40 max-w-[60%] truncate text-right">{filename}</div>
      ) : null}
      <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between gap-2">
        <div className="text-xs text-primary/45 italic font-italic-serif">{note || "Placeholder, image to come."}</div>
        <div className="shrink-0 w-7 h-7 rounded-full border border-primary/25 inline-flex items-center justify-center text-primary/55">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="5" width="18" height="14" rx="1" /><circle cx="9" cy="11" r="1.5" /><path d="M21 17l-5-5-9 7" /></svg>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { WordsPullUp, WordsPullUpMultiStyle, ScrollLetterReveal, FadeUp, ReserveButton, Navbar, Eyebrow, ImagePlaceholder });
