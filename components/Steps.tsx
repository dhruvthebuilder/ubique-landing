"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const steps = [
  {
    number: "01",
    headline: "An archivist visits your home.",
    detail: "Photographs every garment. Builds your digital wardrobe. Takes two hours.",
  },
  {
    number: "02",
    headline: "Your clothes move to an Ubique centre.",
    detail: "Climate-controlled. Cleaned. Pressed. Ready.",
  },
  {
    number: "03",
    headline: "The right outfit arrives every morning.",
    detail: "Matched to your calendar, the weather, your week. Worn clothes collected the same evening.",
  },
];

function Step({ step, index }: { step: (typeof steps)[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-5%" });

  return (
    <motion.div
      ref={ref}
      className="flex flex-col gap-6 py-12 md:py-16 border-b border-border last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0 md:px-8 first:pl-0 last:pr-0"
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: index * 0.12 }}
    >
      <span className="text-[clamp(3rem,6vw,5rem)] font-semibold tracking-[-0.04em] text-border leading-none select-none">
        {step.number}
      </span>
      <div className="flex flex-col gap-3">
        <p className="text-xl md:text-2xl font-medium leading-tight tracking-[-0.01em]">
          {step.headline}
        </p>
        <p className="text-sm md:text-base text-muted leading-relaxed">
          {step.detail}
        </p>
      </div>
    </motion.div>
  );
}

export default function Steps() {
  return (
    <section className="px-6 md:px-12 border-t border-border">
      <div className="grid md:grid-cols-3">
        {steps.map((step, i) => (
          <Step key={step.number} step={step} index={i} />
        ))}
      </div>
    </section>
  );
}
