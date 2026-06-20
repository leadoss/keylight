"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import ScrollReveal from "@/components/ScrollReveal";
import { containerClasses } from "@/lib/theme";

const categories = [
  {
    title: "Profiles & Flexible Strips",
    slug: "profiles-flexible-strips",
    image: "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?w=600&h=750&fit=crop",
  },
  {
    title: "For Your Indoor Spaces",
    slug: "indoor",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&h=750&fit=crop",
  },
  {
    title: "Spotlights",
    slug: "spotlights",
    image: "https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=600&h=750&fit=crop",
  },
  {
    title: "For Your Outdoor Spaces",
    slug: "outdoor",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=750&fit=crop",
  },
];

function CategoryCard({ category, index }: { category: typeof categories[0]; index: number }) {
  return (
    <ScrollReveal delay={index * 0.1} className="h-full">
      <motion.a
        href={`/category/${category.slug}`}
        className="group relative block h-full min-h-[420px] overflow-hidden cursor-pointer"
        whileHover="hovered"
        initial="idle"
      >
        {/* Image */}
        <motion.div
          className="absolute inset-0"
          variants={{
            idle: { scale: 1 },
            hovered: { scale: 1.05 },
          }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <Image
            src={category.image}
            alt={category.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        </motion.div>

        {/* Overlay */}
        <motion.div
          className="absolute inset-0 bg-brand-black"
          variants={{
            idle: { opacity: 0.5 },
            hovered: { opacity: 0.7 },
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center p-8 text-center">
          <h3 className="text-white font-semibold text-xl group-hover:text-accent transition-colors duration-300">
            {category.title}
          </h3>
        </div>

        {/* Bottom accent line */}
        <motion.div
          className="absolute bottom-0 left-0 h-[2px] bg-accent"
          variants={{
            idle: { width: "0%" },
            hovered: { width: "100%" },
          }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        />
      </motion.a>
    </ScrollReveal>
  );
}

export default function Services() {
  return (
    <section id="services" className="bg-brand-black py-32">
      <div className={containerClasses}>
        {/* Header */}
        <div className="mb-16">
          <ScrollReveal>
            <h2
              className="font-bold text-accent tracking-tight mb-4"
              style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
            >
              What Are You Looking For?
            </h2>
          </ScrollReveal>
        </div>

        {/* Category grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-stretch">
          {categories.map((category, i) => (
            <CategoryCard key={category.title} category={category} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
