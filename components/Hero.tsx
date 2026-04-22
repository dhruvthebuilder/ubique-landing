"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import MarqueeText from "./MarqueeText";

const heroImages = [
  {
    src: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&q=80",
    alt: "Pressed suit on hanger",
  },
  {
    src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
    alt: "Organised clothing rack",
  },
  {
    src: "https://images.unsplash.com/photo-1489987707849-0b8b0e46e3c8?w=600&q=80",
    alt: "Laundered shirts ready for delivery",
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
              You have too many
              <br />
              clothes and nothing
              <br />
              to wear.
            </motion.h1>

            <motion.p
              className="text-base md:text-lg text-muted leading-relaxed max-w-sm mb-3"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            >
              We come to your home. Photograph every garment. Move your wardrobe
              to our facility. Every morning, the right outfit arrives at your door
              before 8am. Every evening, we collect it.
            </motion.p>

            <motion.p
              className="text-sm text-muted mb-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.45 }}
            >
              Starting at ₹4,999 / month. First session free.
            </motion.p>

            <motion.button
              onClick={scrollToForm}
              className="text-sm tracking-[0.12em] uppercase bg-ink text-bg px-8 py-3.5 hover:opacity-85 transition-opacity duration-200"
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
