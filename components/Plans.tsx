"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const plans = [
  {
    name: "Digital",
    price: "₹4,999",
    tagline: "The full picture, without moving your clothes.",
    features: [
      "Archivist session at your home",
      "Complete digital wardrobe on the app",
      "Daily outfit recommendations",
      "Style gap analysis",
      "Outfit planning for events",
      "Your clothes stay with you",
    ],
    recommended: false,
  },
  {
    name: "Essential",
    price: "₹7,999",
    tagline: "Your wardrobe moves to us. Your mornings free up.",
    features: [
      "Everything in Digital",
      "We store all your clothes at your nearest Ubique centre",
      "Daily morning delivery before 8am",
      "Evening pickup and same-day laundry",
      "In-house dry cleaning and steaming",
      "Outfit planner synced to your calendar",
    ],
    recommended: true,
  },
  {
    name: "Signature",
    price: "₹9,999",
    tagline: "Everything in Essential, plus a person who knows your wardrobe better than you do.",
    features: [
      "Dedicated senior stylist",
      "Monthly wardrobe review",
      "Priority same-morning delivery",
      "Event and occasion styling",
      "Tailoring and alteration coordination",
      "Seasonal edit recommendations",
    ],
    recommended: false,
  },
];

export default function Plans() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-5%" });

  return (
    <section className="px-6 md:px-12 py-20 md:py-32 border-t border-border" ref={ref}>
      <motion.div
        className="mb-12 md:mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <h2 className="text-4xl md:text-6xl font-semibold tracking-[-0.03em] leading-tight mb-4">
          Three plans.
          <br />
          No contracts.
        </h2>
        <p className="text-sm text-muted tracking-wide">
          Cancel anytime. Your first session is free regardless of which plan you choose.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-3 border border-border">
        {plans.map((plan, i) => (
          <motion.div
            key={plan.name}
            className={`p-8 flex flex-col gap-6 border-b md:border-b-0 md:border-r border-border last:border-0 relative ${
              plan.recommended ? "bg-ink text-bg" : ""
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
          >
            {plan.recommended && (
              <span className="text-[10px] tracking-[0.2em] uppercase text-accent font-medium">
                Recommended for daily use
              </span>
            )}
            {!plan.recommended && <span className="h-4" />}

            <div>
              <p className={`text-xs tracking-[0.15em] uppercase mb-1 ${plan.recommended ? "text-bg/50" : "text-muted"}`}>
                {plan.name}
              </p>
              <p className="text-4xl md:text-5xl font-semibold tracking-[-0.03em]">
                {plan.price}
              </p>
              <p className={`text-xs ${plan.recommended ? "text-bg/50" : "text-muted"} mt-1`}>
                / month
              </p>
            </div>

            <p className={`text-sm leading-relaxed ${plan.recommended ? "text-bg/80" : "text-muted"}`}>
              {plan.tagline}
            </p>

            <ul className="flex flex-col gap-3">
              {plan.features.map((f) => (
                <li key={f} className="flex items-start gap-3 text-sm leading-snug">
                  <span className={`mt-0.5 w-3 h-px flex-shrink-0 ${plan.recommended ? "bg-bg/40" : "bg-border"} mt-2`} />
                  <span className={plan.recommended ? "text-bg/90" : ""}>{f}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
