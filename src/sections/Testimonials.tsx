"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";
import { containerClasses } from "@/lib/theme";
import { testimonials } from "@/lib/data";

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const next = useCallback(() => {
    setDirection(1);
    setIndex((i) => (i + 1) % testimonials.length);
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setIndex((i) => (i - 1 + testimonials.length) % testimonials.length);
  }, []);

  useEffect(() => {
    const id = setInterval(next, 6000);
    return () => clearInterval(id);
  }, [next]);

  const current = testimonials[index];

  const variants = {
    enter: (dir: number) => ({ y: dir > 0 ? 30 : -30, opacity: 0 }),
    center: { y: 0, opacity: 1 },
    exit: (dir: number) => ({ y: dir > 0 ? -30 : 30, opacity: 0 }),
  };

  return (
    <section className="bg-brand-black py-32 overflow-hidden">
      <div className={`${containerClasses} max-w-4xl`}>
        {/* Header */}
        <ScrollReveal>
          <h2
            className="font-bold text-accent tracking-tight mb-16 text-center"
            style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
          >
            What Our Clients Say
          </h2>
        </ScrollReveal>

        {/* Testimonial card */}
        <div className="relative min-h-[220px] flex items-center justify-center">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={index}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="text-center"
            >
              {/* Stars */}
              <div className="flex justify-center gap-1 mb-8">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-accent" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Quote */}
              <blockquote
                className="text-white/90 leading-relaxed mb-8 max-w-2xl mx-auto"
                style={{ fontSize: "clamp(1rem, 1.8vw, 1.25rem)" }}
              >
                &ldquo;{current.quote}&rdquo;
              </blockquote>

              {/* Author */}
              <p className="text-white font-semibold text-sm">
                {current.author}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-6 mt-12">
          <button
            onClick={prev}
            className="w-10 h-10 border border-white/15 flex items-center justify-center text-white/50 hover:border-accent hover:text-accent transition-colors duration-300"
            aria-label="Previous testimonial"
          >
            <svg className="w-4 h-4" viewBox="0 0 20 20" fill="none">
              <path d="M13 4l-6 6 6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => { setDirection(i > index ? 1 : -1); setIndex(i); }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  i === index ? "bg-accent scale-110" : "bg-white/20 hover:bg-white/40"
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={next}
            className="w-10 h-10 border border-white/15 flex items-center justify-center text-white/50 hover:border-accent hover:text-accent transition-colors duration-300"
            aria-label="Next testimonial"
          >
            <svg className="w-4 h-4" viewBox="0 0 20 20" fill="none">
              <path d="M7 4l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
