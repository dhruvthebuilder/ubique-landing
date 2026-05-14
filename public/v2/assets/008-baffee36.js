/* Ubique landing page (dark / cinematic). */

const { useScroll: useScrollApp } = window.Motion || {};

/* "About" interlude block — uses ScrollLetterReveal as in Prisma spec. */
function AboutInterlude() {
  return (
    <section className="relative w-full px-4 md:px-6 py-24 md:py-32 bg-black">
      <div className="mx-auto max-w-6xl bg-card rounded-2xl p-10 md:p-20 text-center border border-primary/8 relative overflow-hidden">
        <div className="absolute -top-40 -right-32 w-[28rem] h-[28rem] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(207,221,181,0.08), transparent 70%)" }} />
        <div className="absolute -bottom-40 -left-32 w-[28rem] h-[28rem] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(92,111,77,0.18), transparent 70%)" }} />
        <div className="relative">
          <div className="eyebrow text-primary mb-8">Visual arts, and a wardrobe</div>
          <h2 className="font-normal max-w-3xl mx-auto" style={{ color: "#E1E0CC", letterSpacing: "-0.03em", fontSize: "clamp(30px, 4.4vw, 64px)", lineHeight: 0.95 }}>
            <WordsPullUpMultiStyle
              className="justify-center"
              segments={[
                { text: "We are stylists," },
                { text: "not algorithms.", serif: true, className: "text-primary" },
                { text: "Your wardrobe is shaped by a real person with a real eye, every single day." },
              ]}
            />
          </h2>
          <div className="mt-10 max-w-2xl mx-auto text-base sm:text-lg" style={{ color: "#DEDBC8" }}>
            <ScrollLetterReveal text="For the last decade we have worked with India's most followed stylists, the ones whose looks you save, screenshot and try to copy. Ubique brings their voice, their taste and their full body of work to your wardrobe, every morning, in your phone." />
          </div>
        </div>
      </div>
    </section>
  );
}

function App() {
  return (
    <div className="w-full overflow-x-hidden bg-black" style={{ color: "#E1E0CC" }}>
      <main>
        <HeroSection />
        <PillarsSection />
        <AboutInterlude />
        <EcosystemSection />
        <RosterSection />
        <ModesSection />
        <TestimonialsSection />
        <PricingSection />
        <ReserveSection />
        <FooterSection />
      </main>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
