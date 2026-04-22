"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const features = [
  "Curated edits built around your existing wardrobe",
  "Filtered by fit, occasion, and what you actually wear",
  "Direct purchase through the Ubique app",
  "Pieces added to your digital wardrobe automatically",
];

export default function PersonalShopping() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-5%" });

  return (
    <section ref={ref} className="px-6 md:px-12 py-20 md:py-32 border-t border-border">
      <motion.h2
        className="text-4xl md:text-6xl font-semibold tracking-[-0.03em] leading-tight mb-12 md:mb-16 max-w-3xl"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        Shop clothes that are
        <br />
        guaranteed to work.
      </motion.h2>

      <div className="grid md:grid-cols-2 gap-12 md:gap-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        >
          <p className="text-base md:text-lg text-muted leading-relaxed mb-8">
            Once we know your wardrobe, your measurements, and your style —
            we show you what to buy next. Not trends. Not guesses.
            Pieces from India&apos;s top brands that we know will look good on you,
            pair with what you already own, and earn their place in your wardrobe.
            Every recommendation is personal. Nothing is generic.
          </p>
          <p className="text-xs tracking-[0.12em] uppercase text-muted">
            Partnered with leading Indian fashion brands across formal, casual, and occasion wear.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="flex flex-col justify-center"
        >
          {features.map((f, i) => (
            <div
              key={i}
              className="flex items-start gap-4 py-5 border-b border-border first:border-t"
            >
              <span className="text-xs text-muted mt-0.5 tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="text-sm md:text-base leading-snug">{f}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
