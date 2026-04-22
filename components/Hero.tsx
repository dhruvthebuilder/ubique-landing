"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import MarqueeText from "./MarqueeText";

const heroImages = [
  {
    src: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=800&q=80",
    alt: "Woman in polished outfit",
  },
  {
    src: "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?auto=format&fit=crop&w=800&q=80",
    alt: "Man in tailored suit",
  },
  {
    src: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=80",
    alt: "Woman browsing fashion",
  },
];

export default function Hero() {
  const scrollToForm = () => {
    document.getElementById("reserve")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative flex flex-col min-h-screen">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 md:px-12 py-5 border-b border-border">
        <span className="text-base font-semibold tracking-[0.2em] uppercase">
          <span className="text-accent">U</span>bique
        </span>
        <button
          onClick={scrollToForm}
          className="text-xs tracking-[0.15em] uppercase bg-accent text-white px-4 py-2 hover:opacity-90 transition-opacity duration-200"
        >
          Reserve a Session →
        </button>
      </nav>

      {/* Marquee */}
      <MarqueeText />

      {/* Hero content */}
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Left: copy */}
        <div className="flex-1 flex flex-col justify-between px-6 md:px-12 py-16 md:py-24">
          <div>
            <motion.h1
              className="text-[13vw] md:text-[7vw] font-semibold leading-[0.92] tracking-[-0.03em] mb-8 md:mb-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              You own a lot of clothes.
              <br />
              You just don&apos;t know
              <br />
              <span className="text-accent">how to style them.</span>
            </motion.h1>

            <motion.p
              className="text-base md:text-lg text-muted leading-relaxed max-w-md mb-3"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            >
              Ubique studies every garment you own, learns how you carry each one,
              and curates the exact look for your day — you approve it on the app,
              we deliver it. After we drop it off, we collect what you wore the day
              before, clean it, and return it to storage. You never decide.
              You never search. You never repeat the same uninspired choice again.
            </motion.p>

            <motion.p
              className="text-sm text-muted mb-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.45 }}
            >
              Starting at ₹1,999 / month. First session free.
            </motion.p>

            <motion.button
              onClick={scrollToForm}
              className="text-sm tracking-[0.12em] uppercase bg-accent text-white px-8 py-3.5 hover:opacity-90 transition-opacity duration-200"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.55 }}
            >
              Reserve your session →
            </motion.button>
          </div>

          <motion.div
            className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mt-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <p className="text-xs tracking-[0.1em] uppercase text-muted">
              A wardrobe operating system.
            </p>
            <p className="text-xs tracking-[0.1em] uppercase text-muted">
              Mumbai · Delhi NCR · Bengaluru · Hyderabad · Chennai
            </p>
          </motion.div>
        </div>

        {/* Right: image stack */}
        <motion.div
          className="hidden md:flex flex-col w-[30vw] border-l border-border"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {heroImages.map((img, i) => (
            <div key={i} className="relative flex-1 border-b border-border last:border-b-0 overflow-hidden">
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover grayscale"
                sizes="30vw"
              />
            </div>
          ))}
        </motion.div>

        {/* Mobile image strip */}
        <motion.div
          className="flex md:hidden border-t border-border"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.6 }}
        >
          {heroImages.map((img, i) => (
            <div key={i} className="relative flex-1 h-36 border-r border-border last:border-r-0 overflow-hidden">
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover grayscale"
                sizes="33vw"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
