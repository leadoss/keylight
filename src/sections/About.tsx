"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import ScrollReveal from "@/components/ScrollReveal";
import { containerClasses } from "@/lib/theme";
import { stats } from "@/lib/data";

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1800;
    const step = 16;
    const increment = value / (duration / step);
    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, step);
    return () => clearInterval(timer);
  }, [inView, value]);

  return (
    <span ref={ref}>
      {count}{suffix}
    </span>
  );
}

export default function About() {
  return (
    <section id="about" className="bg-brand-white">
      {/* Story block */}
      <div className={`${containerClasses} py-32 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center`}>
        {/* Text */}
        <div>
          <ScrollReveal>
            <h2
              className="font-bold text-accent tracking-tight mb-6"
              style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
            >
              Who We Are
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="text-gray-mid text-base leading-relaxed mb-6 max-w-lg">
              Keylight Spain is a leading specialist in lighting products from Valencia, Spain. We use the latest LED technology to create a unique range of lighting solutions.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <p className="text-gray-mid text-base leading-relaxed max-w-lg mb-10">
              Known by the high quality of our materials and innovative approaches when it comes to lighting, we offer a comprehensive selection of products, including LED lights, luminaires, drivers, control systems, accessories and more.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.4}>
            <a
              href="#services"
              className="inline-flex items-center gap-2 text-brand-black font-semibold text-sm border-b-2 border-brand-black pb-0.5 hover:border-accent hover:text-accent transition-colors duration-300 group"
            >
              Our services
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </ScrollReveal>
        </div>

        {/* Image */}
        <ScrollReveal delay={0.15} direction="left">
          <div className="relative">
            <div className="relative h-[560px] w-full overflow-hidden rounded-sm">
              <Image
                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=900&h=1100&fit=crop"
                alt="Modern restaurant with elegant pendant lighting"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </ScrollReveal>
      </div>

    </section>
  );
}
