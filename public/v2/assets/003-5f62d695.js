/* Roster, Modes, Testimonials, Pricing, Reserve, Footer */
const { useState: useStateB } = React;

/* ROSTER ============================================ */
const STYLIST_VIBES = [
  "Body-positive, occasion-led",
  "Editorial, monochrome",
  "Streetwear, layered",
  "Classic, tailored",
  "Indo, western, modern",
  "Sustainable, slow",
  "Bold, statement",
  "Minimalist, considered",
];

function StylistCard({ vibe, idx }) {
  return (
    <FadeUp delay={idx * 0.05} amount={0.1}>
      <a
        href="#"
        className="group block relative rounded-2xl overflow-hidden transition-transform duration-500 ease-out hover:-translate-y-1 border border-primary/10"
        style={{ aspectRatio: "3/4" }}
      >
        <div className="absolute inset-0 ph-portrait transition-transform duration-700 ease-out group-hover:scale-[1.04]">
          <svg viewBox="0 0 100 130" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 w-full h-full opacity-95">
            <defs>
              <radialGradient id={`pg-${idx}`} cx="50%" cy="32%" r="60%">
                <stop offset="0%" stopColor="rgba(207,221,181,0.22)" />
                <stop offset="100%" stopColor="rgba(207,221,181,0)" />
              </radialGradient>
            </defs>
            <rect width="100" height="130" fill={`url(#pg-${idx})`} />
            <ellipse cx="50" cy="48" rx="14" ry="17" fill="rgba(207,221,181,0.06)" />
            <path d="M16 130 Q50 70 84 130 Z" fill="rgba(207,221,181,0.05)" />
          </svg>
          <span className="absolute top-3 left-3 mono text-[10px] tracking-[0.22em] uppercase text-primary/45">
            Stylist · {String(idx + 1).padStart(2, "0")}
          </span>
        </div>
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.78) 100%)" }} />
        <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
          <div className="flex items-end justify-between gap-3">
            <div className="min-w-0">
              <div className="text-lg font-bold leading-tight" style={{ color: "#E1E0CC" }}>
                <span className="font-italic-serif text-primary">No.</span> {String(idx + 1).padStart(2, "0")}
              </div>
              <div className="text-xs text-primary/65 mt-2">{vibe}</div>
              <div className="text-[10px] text-primary/45 mt-1 tracking-wide">Revealed soon</div>
            </div>
            <span className="shrink-0 inline-flex h-9 w-9 items-center justify-center rounded-full border border-primary/30 text-primary/80 group-hover:bg-primary group-hover:text-black group-hover:border-primary transition-all">
              <IconArrowUpRight size={14} />
            </span>
          </div>
        </div>
      </a>
    </FadeUp>
  );
}

function RosterSection() {
  return (
    <section id="roster" className="relative w-full px-4 md:px-6 py-24 md:py-32 bg-black">
      <div className="mx-auto max-w-[1400px]">
        <div className="text-center">
          <Eyebrow className="mb-6 justify-center">Meet the roster</Eyebrow>
          <h2 className="font-normal mx-auto max-w-5xl" style={{ color: "#E1E0CC", letterSpacing: "-0.04em", fontSize: "clamp(40px, 6vw, 96px)", lineHeight: 0.95 }}>
            <WordsPullUpMultiStyle
              className="justify-center"
              segments={[
                { text: "Access India's" },
                { text: "top ten", serif: true, className: "text-primary" },
                { text: "stylists, on one platform." },
              ]}
            />
          </h2>
          <p className="mt-8 text-base text-primary/55 max-w-2xl mx-auto leading-relaxed">
            A small, hand-picked roster of the country's most-followed stylists.
            Names revealed soon.
          </p>
        </div>

        <FadeUp delay={0.1}>
          <div className="mt-16 max-w-4xl mx-auto bg-card p-6 md:p-10 rounded-2xl border border-primary/10 relative overflow-hidden">
            <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full" style={{ background: "radial-gradient(circle, rgba(207,221,181,0.08), transparent 70%)" }} />
            <div className="flex flex-col md:flex-row gap-5 md:gap-8 items-start relative">
              <div className="shrink-0 inline-flex items-center justify-center w-12 h-12 rounded-full border border-primary/20">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#CFDDB5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 8v4" />
                  <circle cx="12" cy="16" r="0.6" fill="#CFDDB5" />
                </svg>
              </div>
              <div>
                <div className="eyebrow text-primary/60 mb-3">Behind the scenes</div>
                <h4 className="text-2xl md:text-3xl font-normal mb-3" style={{ color: "#E1E0CC", letterSpacing: "-0.025em" }}>
                  <span>It's their </span><span className="font-italic-serif text-primary">signature,</span><span> not a generic assistant.</span>
                </h4>
                <p className="text-sm text-primary/60 leading-relaxed">
                  Each stylist on Ubique is supported by a personalised model trained on their work,
                  voiced and styled in close collaboration with them. You're always talking to their
                  signature, their taste, their voice, their eye.
                </p>
              </div>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

/* MODES (Chat / Voice / Video) ======================= */
const MODES = [
  { Icon: IconMessageCircle, n: "01", label: "Chat", title: "Always available.", body: "Message your stylist for a quick outfit decision, a fit check, or a shopping question. Reply in seconds, anytime." },
  { Icon: IconPhone, n: "02", label: "Voice", title: "Think out loud, together.", body: "Hop on a voice session when you want to plan an outfit for an event, or talk through a wardrobe gap together." },
  { Icon: IconVideo, n: "03", label: "Video", title: "For moments that need a real eye.", body: "Show your stylist exactly what you're working with. Mirror sessions for that big interview, that wedding, that pitch." },
];

function ModesSection() {
  return (
    <section id="modes" className="relative w-full px-4 md:px-6 py-24 md:py-32 bg-black min-h-screen flex flex-col justify-center overflow-hidden">
      <div className="absolute inset-0 bg-noise opacity-[0.15] pointer-events-none" />
      <div className="mx-auto max-w-[1400px] relative">
        <div className="grid grid-cols-12 gap-6 md:gap-10 items-end mb-14 md:mb-20">
          <div className="col-span-12 md:col-span-4">
            <Eyebrow className="mb-4">How your stylist works</Eyebrow>
          </div>
          <div className="col-span-12 md:col-span-8">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-normal" style={{ color: "#E1E0CC" }}>
              <WordsPullUpMultiStyle
                segments={[
                  { text: "Three ways to" },
                  { text: "talk", serif: true, className: "text-primary" },
                  { text: "to your stylist." },
                ]}
              />
            </h2>
            <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-normal text-gray-500 mt-2">
              <WordsPullUpMultiStyle
                delay={0.3}
                segments={[{ text: "One relationship, three channels, every day." }]}
              />
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-2 md:gap-1">
          {MODES.map((m, i) => (
            <FadeUp key={m.label} delay={i * 0.15} y={20}>
              <div className="bg-card-3 rounded-2xl p-8 h-full flex flex-col border border-primary/5 relative overflow-hidden group min-h-[360px]">
                <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-30 group-hover:opacity-60 transition-opacity duration-700" style={{ background: "radial-gradient(circle, rgba(207,221,181,0.18), transparent 65%)", transform: "translate(30%,-30%)" }} />
                <div className="flex items-center justify-between mb-6">
                  <span className="text-primary"><m.Icon size={28} /></span>
                  <span className="mono text-xs text-primary/45 tracking-[0.22em]">{m.n}</span>
                </div>
                <ImagePlaceholder label={`App · ${m.label}`} aspect="9/12" className="mb-6" filename={`mode-${m.label.toLowerCase()}.jpg`} note={`${m.label} session preview`} />
                <div className="eyebrow text-primary mb-3">{m.label}</div>
                <h3 className="text-2xl md:text-3xl font-normal mb-4" style={{ color: "#E1E0CC", letterSpacing: "-0.025em", lineHeight: 1.05 }}>
                  {m.title.split(" ").slice(0, -1).join(" ")}{" "}
                  <span className="font-italic-serif text-primary">{m.title.split(" ").slice(-1)}</span>
                </h3>
                <p className="text-sm text-primary/55 leading-relaxed mt-auto">{m.body}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

/* TESTIMONIALS + STATS ============================== */
const TESTIMONIALS = [
  { quote: "I had a closet full of clothes I had stopped seeing. Three months in, I get dressed in seven minutes, in things I already own, and I leave the house feeling like I look like myself again. It's the most useful thing on my phone.", name: "Aanya R.", meta: "6 months in" },
  { quote: "I used to buy a new outfit before every event. Now my stylist plans it from what's already hanging in my wardrobe. I have spent a fraction of what I used to, and I look more put-together than I ever have.", name: "Meher S.", meta: "4 months in" },
  { quote: "The voice sessions changed it for me. The night before a pitch I will call and we plan the whole look. Fit, fabric, what is clean, what reads on camera. It is having a stylist on retainer, in your pocket.", name: "Ishaan K.", meta: "5 months in" },
];
const STATS = [
  ["4.8/5", "Member rating"],
  ["82%", "Wear more of their existing wardrobe"],
  ["3×", "Average shopping uplift through the app"],
  ["₹12,400", "Average annual savings on unworn clothes"],
];

function TestimonialsSection() {
  return (
    <section className="relative w-full px-4 md:px-6 py-24 md:py-32 bg-black">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid grid-cols-12 gap-6 md:gap-10 items-end mb-14 md:mb-20">
          <div className="col-span-12 md:col-span-4">
            <Eyebrow className="mb-4">Testimonials</Eyebrow>
          </div>
          <div className="col-span-12 md:col-span-8">
            <h2 className="font-normal" style={{ color: "#E1E0CC", letterSpacing: "-0.04em", fontSize: "clamp(34px, 5vw, 72px)", lineHeight: 0.92 }}>
              <WordsPullUpMultiStyle
                segments={[
                  { text: "What our members" },
                  { text: "actually", serif: true, className: "text-primary" },
                  { text: "say." },
                ]}
              />
            </h2>
            <p className="mt-5 text-base text-primary/55 max-w-2xl">Real stories from early users.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-2 md:gap-1">
          {TESTIMONIALS.map((t, i) => (
            <FadeUp key={i} delay={i * 0.1} y={20}>
              <div className="bg-card-3 rounded-2xl p-8 h-full flex flex-col border border-primary/5">
                <div className="font-italic-serif text-primary leading-none mb-6" style={{ fontSize: "84px" }}>&ldquo;</div>
                <p className="text-base leading-relaxed mb-8" style={{ color: "#D5DBC0" }}>{t.quote}</p>
                <div className="mt-auto pt-6 border-t border-primary/10">
                  <div className="min-w-0">
                    <div className="text-sm font-bold truncate" style={{ color: "#E1E0CC" }}>{t.name}</div>
                    <div className="text-xs text-primary/55 truncate">{t.meta}</div>
                  </div>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>

        <FadeUp delay={0.1}>
          <div className="mt-16 rounded-2xl p-8 md:p-12 border border-primary/10 bg-card relative overflow-hidden">
            <div className="absolute -top-32 -right-20 w-96 h-96 rounded-full" style={{ background: "radial-gradient(circle, rgba(207,221,181,0.07), transparent 70%)" }} />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6 relative">
              {STATS.map(([num, label], i) => (
                <div key={i} className="flex flex-col">
                  <div className="font-medium" style={{ color: "#E1E0CC", fontSize: "clamp(40px, 5vw, 64px)", letterSpacing: "-0.05em", lineHeight: 1 }}>{num}</div>
                  <div className="mt-3 text-[11px] text-primary/60 uppercase tracking-[0.18em] max-w-[180px]">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

/* PRICING ============================================ */
const PLANS = [
  { badge: "Plan A", title: "Your wardrobe lives in your phone.", price: "₹8,000", cadence: "per year", subline: "Daily styling from the stylist of your choice. Chat access anytime.", features: ["Wardrobe digitisation and organisation", "Choose your stylist", "Daily styling, picked by them", "Chat access anytime", "In-app shopping recommendations"], accent: false },
  { badge: "Plan B · Premium", title: "Daily styling, in your pocket.", price: "₹20,000", cadence: "per year", subline: "Everything in Plan A, plus voice and video sessions. Switch stylists anytime. Second opinion from anyone on the roster.", features: ["Everything in Plan A", "Voice and video sessions", "Switch stylists anytime", "Second opinion on call", "Priority booking and support"], accent: true },
];

function PricingSection() {
  return (
    <section id="pricing" className="relative w-full px-4 md:px-6 py-24 md:py-32 bg-black">
      <div className="mx-auto max-w-[1400px]">
        <div className="text-center mb-14 md:mb-20">
          <Eyebrow className="mb-6 justify-center">Pricing plans</Eyebrow>
          <h2 className="font-normal mx-auto" style={{ color: "#E1E0CC", letterSpacing: "-0.04em", fontSize: "clamp(36px, 5.5vw, 80px)", lineHeight: 0.92 }}>
            <WordsPullUpMultiStyle
              className="justify-center"
              segments={[
                { text: "Two plans. Same wardrobe" },
                { text: "magic.", serif: true, className: "text-primary" },
              ]}
            />
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-2 md:gap-2">
          {PLANS.map((p, i) => (
            <FadeUp key={i} delay={i * 0.1} y={20}>
              <div className={`relative h-full rounded-2xl border p-8 md:p-12 flex flex-col overflow-hidden ${p.accent ? "border-primary/30" : "border-primary/10"}`} style={{ background: p.accent ? "linear-gradient(180deg, #1a201b 0%, #0e120e 100%)" : "#101410" }}>
                {p.accent && (
                  <div className="absolute -top-32 -left-20 w-96 h-96 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(207,221,181,0.12), transparent 70%)" }} />
                )}
                <div className="relative">
                  <div className="eyebrow text-primary/65 mb-8">{p.badge}</div>
                  <h3 className="text-3xl md:text-4xl font-normal mb-8" style={{ color: "#E1E0CC", letterSpacing: "-0.03em", lineHeight: 1.05 }}>
                    {p.title.split(" ").slice(0, -1).join(" ")}{" "}
                    <span className="font-italic-serif text-primary">{p.title.split(" ").slice(-1)}</span>
                  </h3>
                  <div className="flex items-baseline gap-2 mb-4">
                    <div className="font-medium" style={{ color: "#E1E0CC", fontSize: "clamp(48px, 6vw, 88px)", letterSpacing: "-0.05em", lineHeight: 1 }}>{p.price}</div>
                    <div className="text-sm text-primary/55">{p.cadence}</div>
                  </div>
                  <p className="text-sm mb-10" style={{ color: "rgba(225, 224, 204, 0.65)" }}>{p.subline}</p>
                  <ul className="space-y-3 mb-12">
                    {p.features.map((f, j) => (
                      <li key={j} className="flex items-start gap-3">
                        <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-primary/30 text-primary">
                          <IconCheck size={12} />
                        </span>
                        <span className="text-sm" style={{ color: "#E1E0CC" }}>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <ReserveButton variant={p.accent ? "cream" : "outline"} className="w-fit" />
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

/* RESERVE FORM ====================================== */
function ReserveForm() {
  const [submitted, setSubmitted] = useStateB(false);
  const [sending, setSending] = useStateB(false);
  const [errorMsg, setErrorMsg] = useStateB("");
  const [form, setForm] = useStateB({ name: "", phone: "", email: "", pincode: "", plan: "" });
  const upd = (k) => (e) => setForm({ ...form, [k]: e.target.value });
  const inputCls = "w-full bg-transparent border-0 border-b border-primary/15 pb-3 pt-2 text-base focus:outline-none focus:border-primary transition-colors";
  async function submit(e) {
    e.preventDefault();
    if (sending || submitted) return;
    setSending(true);
    setErrorMsg("");
    const payload = {
      name: form.name,
      phone: form.phone,
      email: form.email,
      pincode: form.pincode,
      city: form.pincode,
      plan: form.plan,
      variant: window.__UBIQUE_VARIANT__ || "v2"
    };
    try {
      const res = await fetch("/api/reserve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error("Server responded " + res.status);
      setSubmitted(true);
    } catch (err) {
      setErrorMsg("Could not send. Try again or write to hello@ubique.in.");
    } finally {
      setSending(false);
    }
  }
  return (
    <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
      <div>
        <label className="eyebrow text-primary/55 mb-2 block">Name</label>
        <input required value={form.name} onChange={upd("name")} className={inputCls} placeholder="Enter your name" style={{ color: "#E1E0CC" }} />
      </div>
      <div>
        <label className="eyebrow text-primary/55 mb-2 block">Phone</label>
        <input required value={form.phone} onChange={upd("phone")} className={inputCls} placeholder="Enter your phone" style={{ color: "#E1E0CC" }} />
      </div>
      <div>
        <label className="eyebrow text-primary/55 mb-2 block">Email</label>
        <input required type="email" value={form.email} onChange={upd("email")} className={inputCls} placeholder="Enter your email" style={{ color: "#E1E0CC" }} />
      </div>
      <div>
        <label className="eyebrow text-primary/55 mb-2 block">Pincode</label>
        <input required value={form.pincode} onChange={upd("pincode")} className={inputCls} placeholder="Enter your pincode" style={{ color: "#E1E0CC" }} />
      </div>
      <div className="md:col-span-2">
        <label className="eyebrow text-primary/55 mb-2 block">Which plan interests you? (Optional)</label>
        <select value={form.plan} onChange={upd("plan")} className={`${inputCls} appearance-none pr-8 bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%23CFDDB5%22 stroke-width=%221.5%22><path d=%22m6 9 6 6 6-6%22/></svg>')] bg-no-repeat bg-[right_4px_center] bg-[length:18px_18px]`} style={{ color: "#E1E0CC" }}>
          <option value="" style={{ background: "#000", color: "#E1E0CC" }}>Select a plan, not binding</option>
          <option value="A" style={{ background: "#000", color: "#E1E0CC" }}>Plan A · Daily styling</option>
          <option value="B" style={{ background: "#000", color: "#E1E0CC" }}>Plan B · Premium</option>
          <option value="unsure" style={{ background: "#000", color: "#E1E0CC" }}>Not sure yet</option>
        </select>
      </div>
      <div className="md:col-span-2 flex items-center gap-6 flex-wrap pt-4">
        <button type="submit" disabled={submitted || sending} className="group inline-flex items-center gap-2 hover:gap-3 transition-all duration-300 pl-6 pr-1.5 py-1.5 rounded-full bg-primary text-black text-sm sm:text-base font-medium disabled:opacity-70">
          <span>{submitted ? "We will be in touch" : sending ? "Sending…" : "Reserve my spot"}</span>
          <span className="inline-flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-black text-primary group-hover:scale-110 transition-transform">
            <IconArrowRight size={14} />
          </span>
        </button>
        <span className="text-xs text-primary/50 tracking-wide">Free · We will be in touch when your slot opens up</span>
        {errorMsg ? <span className="text-xs text-red-300">{errorMsg}</span> : null}
      </div>
    </form>
  );
}

function ReserveSection() {
  return (
    <section id="reserve" className="relative w-full px-4 md:px-6 py-24 md:py-32 bg-black">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid grid-cols-12 gap-6 md:gap-10 mb-14 md:mb-20">
          <div className="col-span-12 md:col-span-4">
            <Eyebrow className="mb-4">Reserve your spot</Eyebrow>
          </div>
          <div className="col-span-12 md:col-span-8">
            <h2 className="font-normal" style={{ color: "#E1E0CC", letterSpacing: "-0.04em", fontSize: "clamp(36px, 5.5vw, 80px)", lineHeight: 0.92 }}>
              <WordsPullUpMultiStyle
                segments={[
                  { text: "Be among the" },
                  { text: "first", serif: true, className: "text-primary" },
                  { text: "to use Ubique." },
                ]}
              />
            </h2>
            <p className="mt-6 text-base text-primary/55 max-w-xl">
              We will reach out when your slot opens up.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6 md:gap-10">
          <div className="col-span-12 md:col-span-8 md:col-start-5">
            <FadeUp>
              <ReserveForm />
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  );
}

/* FOOTER ============================================ */
function FooterSection() {
  return (
    <footer className="relative w-full px-4 md:px-6 pt-16 pb-10 bg-black overflow-hidden">
      <div className="absolute -bottom-40 left-1/2 -translate-x-1/2 w-[120vw] h-80 rounded-[50%] pointer-events-none" style={{ background: "radial-gradient(ellipse, rgba(207,221,181,0.10), transparent 65%)" }} />
      <div className="mx-auto max-w-[1400px] relative">
        <div className="grid grid-cols-12 gap-6 md:gap-10 items-end mb-12">
          <div className="col-span-12 md:col-span-8">
            <div className="font-medium leading-none" style={{ color: "#E1E0CC", fontSize: "clamp(56px, 10vw, 160px)", letterSpacing: "-0.07em" }}>ubique</div>
            <p className="mt-6 text-sm text-primary/60 max-w-sm">Personal styling, in the voice of someone you already follow.</p>
          </div>
          <div className="col-span-12 md:col-span-4 text-sm text-primary/65 space-y-3">
            <div className="eyebrow text-primary/45 mb-3">Contact</div>
            <a className="block hover:text-primary" href="mailto:hello@ubique.in">hello@ubique.in</a>
          </div>
        </div>
        <div className="pt-8 border-t border-primary/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs text-primary/45 tracking-wide">
          <div>© 2026 Ubique.</div>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { RosterSection, ModesSection, TestimonialsSection, PricingSection, ReserveSection, FooterSection });
