"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { CountUp } from "./CountUp";

export default function Statement() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section
      ref={ref}
      className="px-6 md:px-12 py-20 md:py-32 border-t border-border overflow-hidden"
    >
      <div className="flex flex-col gap-4">
        <div className="overflow-hidden">
          <motion.p
            className="text-[20vw] font-semibold tracking-[-0.05em] leading-none text-ink"
            initial={{ y: "100%", opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            {isInView ? (
              <>
                <CountUp end={2} duration={1.2} />
                {" hrs."}
              </>
            ) : "2 hrs."}
          </motion.p>
        </div>

        <motion.div
          className="max-w-xl"
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
        >
          <p className="text-base md:text-lg text-muted leading-relaxed">
            That is how long your first session takes.
          </p>
          <p className="text-base md:text-lg text-muted leading-relaxed">
            After that, you never make a wardrobe decision alone again.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
