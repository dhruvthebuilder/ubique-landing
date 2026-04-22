"use client";

import { motion } from "framer-motion";
import MarqueeText from "./MarqueeText";

export default function Hero() {
  const scrollToForm = () => {
    document.getElementById("reserve")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative flex flex-col min-h-screen">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 md:px-12 py-5 border-b border-border">
        <span className="text-base font-semibold tracking-[0.2em] uppercase">Ubique</span>
        <button
          onClick={scrollToForm}
          className="text-xs tracking-[0.15em] uppercase border border-ink px-4 py-2 hover:bg-ink hover:text-bg transition-colors duration-200"
        >
          Reserve a Session →
        </button>
      </nav>

      {/* Marquee */}
      <MarqueeText />

      {/* Hero content */}
      <div className="flex-1 flex flex-col justify-between px-6 md:px-12 py-16 md:py-24">
        <div className="max-w-5xl">
          <motion.h1
            className="text-[11vw] md:text-[8vw] font-semibold leading-[0.92] tracking-[-0.03em] mb-8 md:mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            You have too many
            <br />
            clothes and nothing
            <br />
            to wear.
          </motion.h1>

          <motion.p
            className="text-base md:text-lg text-muted tracking-wide max-w-md mb-10"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          >
            Ubique digitises, stores, and delivers your wardrobe. Daily.
          </motion.p>

          <motion.button
            onClick={scrollToForm}
            className="text-sm tracking-[0.12em] uppercase bg-ink text-bg px-8 py-3.5 hover:opacity-85 transition-opacity duration-200"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
          >
            Reserve your session →
          </motion.button>
        </div>

        {/* Bottom row */}
        <motion.div
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mt-16"
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
    </section>
  );
}
