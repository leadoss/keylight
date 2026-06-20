"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import MagneticButton from "@/components/MagneticButton";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const lineVariants = {
  hidden: { y: "110%", opacity: 0 },
  visible: (i: number) => ({
    y: "0%",
    opacity: 1,
    transition: {
      duration: 1.1,
      delay: 0.3 + i * 0.14,
      ease: EASE,
    },
  }),
};

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.8], [0.4, 0.8]);

  return (
    <section
      ref={ref}
      id="hero"
      className="relative flex items-center justify-center min-h-screen overflow-hidden bg-brand-black"
    >
      {/* Background image — modern interior with lighting */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y: imgY, scale: imgScale }}
      >
        <Image
          src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&h=1200&fit=crop&q=85"
          alt="Luxurious modern living room with elegant pendant lighting"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <motion.div
          className="absolute inset-0 bg-brand-black"
          style={{ opacity: overlayOpacity }}
        />
      </motion.div>

      {/* Center content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        {/* Headline */}
        <h1
          className="font-semibold text-white leading-[1] tracking-tight"
          style={{ fontSize: "clamp(2.2rem, 5vw, 4.5rem)" }}
        >
          {["Illuminate", "Your Space."].map((line, i) => (
            <span key={i} className="block overflow-hidden">
              <motion.span
                className="block"
                variants={lineVariants}
                initial="hidden"
                animate="visible"
                custom={i}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        {/* CTA */}
        <motion.div
          className="mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.7, ease: EASE }}
        >
          <a
            href="#services"
            className="inline-block px-12 py-4 bg-accent text-brand-black text-xs font-semibold tracking-[0.2em] uppercase hover:bg-white transition-colors duration-300"
          >
            Start Your Project
          </a>
        </motion.div>

      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
      >
        <span className="text-white/30 text-[9px] tracking-[0.25em] uppercase">
          Scroll
        </span>
        <motion.div
          className="w-px h-10 bg-gradient-to-b from-white/0 to-accent"
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          style={{ originY: 0 }}
        />
      </motion.div>

    </section>
  );
}
