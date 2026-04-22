"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

const steps = [
  {
    number: "01",
    headline: "We come to your home.",
    detail: "An Ubique archivist photographs every garment you own, tags each one, and builds your complete digital wardrobe. The entire session takes two hours. You do nothing except let us in.",
    image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Woman reviewing wardrobe",
  },
  {
    number: "02",
    headline: "Your entire wardrobe moves to us.",
    detail: "We transport everything to a climate-controlled Ubique facility nearby. Your clothes are cleaned, pressed, and stored individually — ready to be picked at any moment. Nothing sits crumpled in a suitcase.",
    image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Fashion editorial styling",
  },
  {
    number: "03",
    headline: "The right outfit arrives. We handle the rest.",
    detail: "Every morning we deliver the outfit that works best for your day. After we drop it off, we collect what you wore yesterday, clean it, and return it to storage. The same cycle, every day, without you lifting a finger.",
    image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Woman dressed and ready",
  },
];

function Step({ step, index }: { step: (typeof steps)[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-5%" });

  return (
    <motion.div
      ref={ref}
      className="flex flex-col border-b border-border last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0"
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: index * 0.12 }}
    >
      {/* Image */}
      <div className="relative h-52 md:h-64 overflow-hidden border-b border-border">
        <Image
          src={step.image}
          alt={step.imageAlt}
          fill
          className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>

      {/* Text */}
      <div className="flex flex-col gap-5 p-8 md:p-10 flex-1">
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
      </div>
    </motion.div>
  );
}

export default function Steps() {
  return (
    <section className="border-t border-border">
      <div className="grid md:grid-cols-3">
        {steps.map((step, i) => (
          <Step key={step.number} step={step} index={i} />
        ))}
      </div>
    </section>
  );
}
