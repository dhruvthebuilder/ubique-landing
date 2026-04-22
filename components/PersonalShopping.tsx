"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const features = [
  "Curated edits built around your existing wardrobe and what you actually reach for",
  "Filtered by your body shape, skin tone, fit preferences, and occasion",
  "Direct purchase through the Ubique app, added to your digital wardrobe automatically",
  "Every piece chosen to pair with at least three things you already own",
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
            Once we know your wardrobe, your measurements, your body shape, and your
            skin tone — our AI-enabled stylist takes over completely. Every recommendation
            is built on what we know about you specifically: the silhouettes that flatter
            your frame, the colours that complement your complexion, and the cuts that fit
            the way you actually move through your day. We surface pieces from India&apos;s top
            brands that will look good on you, pair with what you already own, and earn
            their place in a wardrobe that works — not sit forgotten behind everything else.
            Every recommendation is deeply personal. Nothing is pulled from a generic
            trending list and handed to you as advice.
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
