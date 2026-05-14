/* Hero, Pillars, Ecosystem — dark cinematic, greenish */

/* HERO ============================================== */
function HeroBackdrop() {
  // Cinematic placeholder backdrop (in lieu of a video). Subtly animated.
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* hero background image placeholder */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 30% 35%, rgba(207,221,181,0.22), transparent 65%), radial-gradient(ellipse 60% 70% at 75% 75%, rgba(92,111,77,0.35), transparent 70%), linear-gradient(180deg, #0d100c 0%, #050605 100%)",
        }}
      />
      <svg className="absolute inset-0 w-full h-full opacity-25" preserveAspectRatio="none" viewBox="0 0 100 100">
        <line x1="0" y1="0" x2="100" y2="100" stroke="#CFDDB5" strokeWidth="0.18" strokeDasharray="1 1.4" vectorEffect="non-scaling-stroke" />
        <line x1="100" y1="0" x2="0" y2="100" stroke="#CFDDB5" strokeWidth="0.18" strokeDasharray="1 1.4" vectorEffect="non-scaling-stroke" />
      </svg>
      <div className="absolute top-6 left-1/2 -translate-x-1/2 mono text-[10px] uppercase tracking-[0.22em] text-primary/45 z-[1]">
        Hero · hero-background.jpg
      </div>
      <div className="absolute inset-0 ph-vid mix-blend-overlay opacity-60" />
      {/* slow orbiting glow */}
      <div
        className="absolute -top-1/3 left-1/3 w-[80vw] h-[80vw] rounded-full hero-orb-a"
        style={{
          background:
            "radial-gradient(circle, rgba(207,221,181,0.18), rgba(207,221,181,0) 60%)",
          filter: "blur(40px)",
        }}
      />
      <div
        className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] rounded-full hero-orb-b"
        style={{
          background:
            "radial-gradient(circle, rgba(92,111,77,0.4), rgba(92,111,77,0) 65%)",
          filter: "blur(60px)",
        }}
      />
      <style>{`
        @keyframes orbA { 0%,100% { transform: translate(-5%, -3%);} 50% { transform: translate(5%, 4%);} }
        @keyframes orbB { 0%,100% { transform: translate(0,0);} 50% { transform: translate(-4%, 3%);} }
        .hero-orb-a { animation: orbA 22s ease-in-out infinite; }
        .hero-orb-b { animation: orbB 28s ease-in-out infinite; }
      `}</style>
      {/* film grain */}
      <div className="absolute inset-0 noise-overlay opacity-[0.55] mix-blend-overlay pointer-events-none" />
      {/* vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/70 pointer-events-none" />
      {/* placeholder caption (replace with video file) */}
      <div className="absolute top-6 right-8 mono text-[10px] uppercase tracking-[0.22em] text-primary/40">
        backdrop · b-roll loop
      </div>
    </div>
  );
}

function HeroSection() {
  return (
    <section id="top" className="h-screen w-full p-4 md:p-6 bg-black">
      <div className="relative h-full w-full rounded-2xl md:rounded-[2rem] overflow-hidden ring-prism">
        <HeroBackdrop />
        <Navbar />

        {/* top label */}
        <div className="absolute top-20 sm:top-24 md:top-28 left-6 md:left-10 z-10">
          <Eyebrow>Ubique · Latin · everywhere, always</Eyebrow>
        </div>
        <div className="absolute top-20 sm:top-24 md:top-28 right-6 md:right-10 z-10 hidden sm:block">
          <div className="eyebrow text-primary/60">Stylist-led</div>
        </div>

        {/* hero title */}
        <div className="absolute bottom-0 left-0 right-0 px-4 md:px-8 pb-8 md:pb-14 z-10">
          <div className="grid grid-cols-12 gap-4 md:gap-8 items-end">
            <div className="col-span-12 lg:col-span-9 relative">
              <h1
                className="font-medium"
                style={{ color: "#E1E0CC", fontSize: "clamp(40px, 6.2vw, 104px)", lineHeight: 0.98, letterSpacing: "-0.035em" }}
              >
                <WordsPullUpMultiStyle
                  segments={[
                    { text: "Your wardrobe, managed," },
                    { text: "styled", serif: true, className: "text-primary" },
                    { text: "and" },
                    { text: "curated", serif: true, className: "text-primary" },
                    { text: "by someone you already love." },
                  ]}
                />
              </h1>
            </div>
            <div className="col-span-12 lg:col-span-3">
              <motion.p
                className="text-primary/75 text-sm sm:text-base"
                style={{ lineHeight: 1.35 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
              >
                Direct access to India's most followed stylists. They know your
                wardrobe, your body, your life, and style you every day through
                chat, voice and video.
              </motion.p>
              <motion.div
                className="mt-6 flex items-center gap-4 flex-wrap"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.7 }}
              >
                <ReserveButton label="Join the roster" />
              </motion.div>
            </div>
          </div>
        </div>

        {/* corner ticks */}
        <div className="pointer-events-none">
          <span className="absolute top-2 left-2 w-3 h-3 border-l border-t border-primary/30" />
          <span className="absolute top-2 right-2 w-3 h-3 border-r border-t border-primary/30" />
          <span className="absolute bottom-2 left-2 w-3 h-3 border-l border-b border-primary/30" />
          <span className="absolute bottom-2 right-2 w-3 h-3 border-r border-b border-primary/30" />
        </div>
      </div>
    </section>
  );
}

/* PILLARS ============================================ */
const PILLARS = [
  { n: "01", title: "Your wardrobe, organised and scanned.", body: "Every piece you own, photographed and tagged. Your closet, fully organised and living in your phone.", glyph: "wardrobe" },
  { n: "02", title: "Your stylist learns every little thing about you.", body: "Body, lifestyle, taste, the occasions you dress for. The relationship sharpens with every conversation.", glyph: "portrait" },
  { n: "03", title: "Shop, plan and dress, all inside the app.", body: "Outfits picked for you, shopping recommendations in their voice, and your full wardrobe always a tap away. Everything happens in the Ubique app.", glyph: "outfit" },
];
function PillarGlyph({ kind }) {
  const stroke = "#CFDDB5";
  const props = { stroke, strokeWidth: 0.8, fill: "none" };
  if (kind === "wardrobe") {
    return (
      <svg viewBox="0 0 120 120" className="w-full h-full">
        <rect x="20" y="22" width="80" height="76" {...props} />
        <line x1="60" y1="22" x2="60" y2="98" {...props} strokeWidth="0.6" />
        {[34, 46, 58, 70, 82].map((y, i) => (
          <path key={i} d={`M28 ${y} q4 -6 8 0 q4 6 8 0 q4 -6 8 0`} stroke={stroke} strokeOpacity="0.55" strokeWidth="0.7" fill="none" />
        ))}
        {[34, 46, 58, 70, 82].map((y, i) => (
          <path key={"r" + i} d={`M68 ${y} q4 -6 8 0 q4 6 8 0 q4 -6 8 0`} stroke={stroke} strokeOpacity="0.55" strokeWidth="0.7" fill="none" />
        ))}
      </svg>
    );
  }
  if (kind === "portrait") {
    return (
      <svg viewBox="0 0 120 120" className="w-full h-full">
        <circle cx="60" cy="48" r="18" {...props} />
        <path d="M28 100 q32 -36 64 0" {...props} />
        <circle cx="60" cy="48" r="0.8" fill={stroke} />
        <path d="M52 50 q8 4 16 0" stroke={stroke} strokeOpacity="0.5" strokeWidth="0.6" fill="none" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 120 120" className="w-full h-full">
      <path d="M60 22 q-2 -4 0 -6 q2 -2 4 0 q2 2 -1 4 L100 36 L20 36 Z" {...props} />
      <path d="M30 36 L46 30 q6 8 28 0 L90 36 L84 52 L78 50 L78 96 L42 96 L42 50 L36 52 Z" {...props} />
      <path d="M58 38 q2 6 4 0" stroke={stroke} strokeOpacity="0.5" strokeWidth="0.6" fill="none" />
    </svg>
  );
}

function PillarsSection() {
  return (
    <section id="how" className="relative w-full px-4 md:px-6 py-24 md:py-32 bg-black">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid grid-cols-12 gap-6 md:gap-10 items-end mb-14 md:mb-20">
          <div className="col-span-12 md:col-span-4">
            <Eyebrow className="mb-4">The three pillars</Eyebrow>
          </div>
          <div className="col-span-12 md:col-span-8">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-normal leading-[0.9]" style={{ color: "#E1E0CC", letterSpacing: "-0.04em" }}>
              <WordsPullUpMultiStyle
                segments={[
                  { text: "How it" },
                  { text: "actually", serif: true, className: "text-primary" },
                  { text: "works." },
                ]}
              />
            </h2>
          </div>
        </div>

        <FadeUp delay={0.1} className="mb-12 md:mb-16">
          <ImagePlaceholder label="Lookbook · Editorial 01" aspect="21/9" filename="pillars-lookbook-editorial.jpg" note="Wide editorial hero — stylist + client moment." />
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-2 md:gap-1">
          {PILLARS.map((p, i) => (
            <FadeUp key={p.n} delay={i * 0.1}>
              <div className="bg-card-2 p-8 md:p-10 h-full flex flex-col rounded-2xl border border-primary/5">
                <div className="flex items-start justify-between mb-8">
                  <span className="mono text-xs text-primary/55 tracking-[0.22em]">{p.n}</span>
                </div>
                <ImagePlaceholder label={`Pillar · ${p.n}`} aspect="4/3" className="mb-6" filename={`pillar-${p.n}-${p.glyph}.jpg`} note="" />
                <h3 className="text-2xl md:text-[28px] font-normal mb-4" style={{ color: "#E1E0CC", letterSpacing: "-0.02em", lineHeight: 1.1 }}>
                  {p.title}
                </h3>
                <p className="text-sm text-primary/55 leading-relaxed mt-auto">{p.body}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ECOSYSTEM (8 steps) ================================ */
const STEPS = [
  ["01", "Your closet today", "A wardrobe full of clothes, none of which you reach for."],
  ["02", "You find us", "Through Instagram, a friend, or one of the stylists you already follow."],
  ["03", "The Archivist Session", "A 90-minute home visit. Every piece scanned, every detail noted."],
  ["04", "Your wardrobe, now a system", "Tagged, categorised, ready for your stylist to work with."],
  ["05", "You choose your stylist", "Browse the roster. Pick the voice and taste that fits you."],
  ["06", "They understand you, entirely", "Body, style preferences, occasions, taste, budget."],
  ["07", "Style on demand", "Message them anytime. Hop on a voice or video session when you want their take."],
  ["08", "Wake up to your perfect outfit", "In the style of someone whose work you already love."],
];

function EcosystemSection() {
  return (
    <section className="relative w-full px-4 md:px-6 py-24 md:py-32 bg-black">
      <div className="mx-auto max-w-[1400px]">
        <div className="text-center mb-14 md:mb-20">
          <Eyebrow className="mb-6 justify-center">The ecosystem</Eyebrow>
          <h2 className="font-normal mx-auto" style={{ color: "#E1E0CC", letterSpacing: "-0.04em", fontSize: "clamp(36px, 6vw, 88px)", lineHeight: 0.92 }}>
            <WordsPullUpMultiStyle
              className="justify-center"
              segments={[
                { text: "How you" },
                { text: "actually", serif: true, className: "text-primary" },
                { text: "use it." },
              ]}
            />
          </h2>
          <p className="mt-6 text-base text-primary/55 max-w-xl mx-auto">
            From the first session to the daily ritual. Eight steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-2 md:gap-1">
          {STEPS.map(([n, t, b], i) => (
            <FadeUp key={n} delay={i * 0.05} amount={0.15}>
              <div className="bg-card-2 p-7 md:p-8 h-full flex flex-col rounded-2xl border border-primary/5 relative overflow-hidden group">
                <div
                  className="absolute -top-12 -right-12 w-32 h-32 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                  style={{ background: "radial-gradient(circle, rgba(207,221,181,0.12), transparent 70%)" }}
                />
                <div className="flex items-center justify-between mb-5">
                  <span className="mono text-xs text-primary/45 tracking-[0.22em]">{n}</span>
                </div>
                <ImagePlaceholder label={`Step · ${n}`} aspect="4/3" className="mb-5" filename={`step-${n}.jpg`} note="" />
                <h3 className="text-lg md:text-xl font-normal mb-3" style={{ color: "#E1E0CC", letterSpacing: "-0.02em", lineHeight: 1.15 }}>
                  {t}
                </h3>
                <p className="text-sm text-primary/55 leading-relaxed mt-auto">{b}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { HeroSection, PillarsSection, EcosystemSection });
