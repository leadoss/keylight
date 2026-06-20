"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import ScrollReveal from "@/components/ScrollReveal";
import { containerClasses } from "@/lib/theme";
import { products, productCategories } from "@/lib/data";

function ProductCard({ product, index }: { product: typeof products[0]; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <ScrollReveal delay={index * 0.06}>
      <div
        className="group relative overflow-hidden bg-gray-light"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Image */}
        <div className="relative h-80 overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />

          {/* Hover overlay */}
          <motion.div
            className="absolute inset-0 bg-brand-black/70 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.a
              href={`/product/${product.slug}`}
              className="px-6 py-3 border border-white text-white text-sm font-semibold hover:bg-white hover:text-brand-black transition-colors duration-200 rounded-full"
              initial={{ y: 12, opacity: 0 }}
              animate={{ y: hovered ? 0 : 12, opacity: hovered ? 1 : 0 }}
              transition={{ duration: 0.3, delay: 0.05 }}
            >
              View Details
            </motion.a>
          </motion.div>
        </div>

        {/* Info */}
        <div className="p-5 bg-white">
          <div className="flex items-start justify-between gap-2">
            <div>
              <span className="text-xs font-semibold tracking-widest uppercase text-gray-mid">
                {product.category}
              </span>
              <h3 className="text-brand-black font-semibold text-base mt-1 group-hover:text-accent transition-colors duration-300">
                {product.name}
              </h3>
            </div>
            <span className="text-brand-black font-bold text-base shrink-0">{product.price}</span>
          </div>
        </div>
      </div>
    </ScrollReveal>
  );
}

export default function Products() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = activeCategory === "All"
    ? products
    : products.filter((p) => p.category === activeCategory);

  return (
    <section id="products" className="bg-brand-white py-32">
      <div className={containerClasses}>
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div>
            <ScrollReveal>
              <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gray-mid mb-5">
                Curated Shop
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h2
                className="font-bold text-brand-black leading-[1.05] tracking-tight"
                style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}
              >
                Fixtures we stand<br />
                behind completely.
              </h2>
            </ScrollReveal>
          </div>

          {/* Filter tabs */}
          <ScrollReveal delay={0.15} direction="left">
            <div className="flex flex-wrap gap-2">
              {productCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 text-xs font-semibold rounded-full border transition-all duration-200 ${
                    activeCategory === cat
                      ? "bg-brand-black text-white border-brand-black"
                      : "bg-transparent text-brand-black border-brand-black/20 hover:border-brand-black"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </ScrollReveal>
        </div>

        {/* Product grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {filtered.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* View all */}
        <ScrollReveal className="mt-14 text-center">
          <a
            href="/shop"
            className="inline-flex items-center gap-3 text-brand-black font-semibold text-sm border-b-2 border-brand-black pb-0.5 hover:border-accent hover:text-accent transition-colors duration-300 group"
          >
            Browse the full collection
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </ScrollReveal>
      </div>
    </section>
  );
}
