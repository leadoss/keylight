"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { getAllProducts } from "@/lib/products";

const allProducts = getAllProducts();

export default function SearchButton() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const results = query.trim().length > 0
    ? allProducts.filter((p) =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.sku?.toLowerCase().includes(query.toLowerCase()) ||
        p.description?.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 8)
    : [];

  function openSearch() {
    setOpen(true);
    setTimeout(() => inputRef.current?.focus(), 100);
  }
  function closeSearch() {
    setOpen(false);
    setQuery("");
  }
  function handleSelect(slug: string) {
    closeSearch();
    router.push(`/product/${slug}`);
  }

  return (
    <>
      <button
        onClick={openSearch}
        className="flex items-center justify-center w-10 h-10 text-accent hover:text-white transition-colors duration-200"
        aria-label="Search products"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
          <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[60] flex flex-col items-center pt-32 px-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="absolute inset-0 bg-brand-black/90 backdrop-blur-md" onClick={closeSearch} />

            <motion.div
              className="relative w-full max-w-2xl"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-center border-b-2 border-accent pb-3 gap-4">
                <svg className="text-accent shrink-0" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
                </svg>
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search products…"
                  className="flex-1 bg-transparent text-white text-xl placeholder-white/30 outline-none tracking-wide"
                />
                <button onClick={closeSearch} className="text-white/40 hover:text-white transition-colors">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {results.length > 0 && (
                <ul className="mt-2 bg-[#0f0f0f] border border-white/10 max-h-80 overflow-y-auto">
                  {results.map((p, i) => (
                    <li key={p.slug ?? i}>
                      <button
                        onMouseDown={() => handleSelect(p.slug!)}
                        className="w-full text-left px-6 py-4 text-white/80 hover:bg-white/5 hover:text-accent transition-colors flex items-center gap-4"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-accent/50 shrink-0">
                          <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
                        </svg>
                        <span className="font-medium">{p.name}</span>
                        {p.sku && <span className="ml-auto text-xs text-white/30 shrink-0">{p.sku}</span>}
                      </button>
                    </li>
                  ))}
                </ul>
              )}

              {query.trim().length > 0 && results.length === 0 && (
                <p className="mt-6 text-white/30 text-sm tracking-wide">No products found for &ldquo;{query}&rdquo;</p>
              )}

              {query.trim().length === 0 && (
                <p className="mt-6 text-white/20 text-xs tracking-[0.15em] uppercase">Type to search all products</p>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
