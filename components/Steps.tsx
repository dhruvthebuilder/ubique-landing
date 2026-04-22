"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

const steps = [
  {
    number: "01",
    headline: "We come to your home.",
    detail: "An Ubique archivist visits, photographs every garment you own, and tags each piece with detail — fabric, occasion, fit. Your entire wardrobe is catalogued into a living digital archive in two hours. You do nothing except let us in.",
    image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Woman reviewing wardrobe with stylist",
  },
  {
    number: "02",
    headline: "Your wardrobe moves to us.",
    detail: "We transport everything to a climate-controlled Ubique facility nearby. Every piece is cleaned, pressed, and stored individually — hung in the right conditions, ready to be pulled at any moment. Nothing sits folded in the wrong way, or forgotten at the back of a shelf.",
    image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Fashion editorial — clothes in storage",
  },
  {
    number: "03",
    headline: "Your wardrobe lives in your pocket.",
    detail: "Open the Ubique app each morning to see the outfit our stylist has curated for your day. Accept it, swap a piece, or browse your entire digital wardrobe — every garment photographed, tagged, and searchable. Plan ahead for the week, track what is in storage, and never lose sight of something you own again.",
    image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Person browsing fashion on phone",
  },
  {
    number: "04",
    headline: "The right outfit arrives. We handle the rest.",
    detail: "Every morning, the confirmed outfit is delivered to your door before you need it. After we drop it off, we collect what you wore the day before, clean it, and return it to storage. The same seamless cycle, every day, without you making a single decision about it.",
    image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Woman dressed and ready for the day",
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
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 }}
    >
      {/* Image */}
      <div className="relative h-48 md:h-56 overflow-hidden border-b border-border">
        <Image
          src={step.image}
          alt={step.imageAlt}
          fill
          className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
          sizes="(max-width: 768px) 100vw, 25vw"
        />
      </div>

      {/* Text */}
      <div className="flex flex-col gap-4 p-6 md:p-8 flex-1">
        <span className="text-[clamp(2.5rem,5vw,4rem)] font-semibold tracking-[-0.04em] text-accent leading-none select-none opacity-25">
          {step.number}
        </span>
        <div className="flex flex-col gap-2.5">
          <p className="text-base md:text-lg font-medium leading-tight tracking-[-0.01em]">
            {step.headline}
          </p>
          <p className="text-xs md:text-sm text-muted leading-relaxed">
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
      <div className="grid md:grid-cols-4">
        {steps.map((step, i) => (
          <Step key={step.number} step={step} index={i} />
        ))}
      </div>
    </section>
  );
}
