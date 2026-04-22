"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const features = [
  "Curated edits built around your existing wardrobe",
  "Filtered by body shape, skin tone, fit, and occasion",
  "AI try-on: see how each piece looks on you before you buy",
  "Purchase through the app — added to your digital wardrobe automatically",
];

export default function PersonalShopping() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-5%" });

  return (
    <section ref={ref} className="px-6 md:px-12 py-20 md:py-32 border-t border-border">

      {/* Label */}
      <motion.p
        className="text-xs tracking-[0.2em] uppercase text-accent mb-6 font-medium"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5 }}
      >
        Personal Shopping
      </motion.p>

      <motion.h2
        className="text-4xl md:text-6xl font-semibold tracking-[-0.03em] leading-tight mb-12 md:mb-16 max-w-3xl"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
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
            Once we know your wardrobe, measurements, body shape, and skin tone —
            our AI-enabled stylist curates what to buy next. Not trends. Not guesses.
            Pieces from India&apos;s top brands chosen for your frame, your complexion,
            and what you already own — so every addition earns its place rather than
            adding to the clutter. Every recommendation is personal. Nothing is generic.
          </p>
          <p className="text-xs tracking-[0.12em] uppercase text-muted border-l-2 border-accent pl-4">
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
              <span className="text-xs text-accent font-semibold mt-0.5 tabular-nums shrink-0">
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
