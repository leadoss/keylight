"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getAllProducts } from "@/lib/products";

const allProducts = getAllProducts();

export default function ProductSearch() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);

  const results = query.trim().length > 0
    ? allProducts.filter((p) =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.sku?.toLowerCase().includes(query.toLowerCase()) ||
        p.description?.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 6)
    : [];

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function handleSelect(slug: string) {
    setQuery("");
    setOpen(false);
    router.push(`/product/${slug}`);
  }

  return (
    <div ref={containerRef} className="relative w-full max-w-xl mx-auto">
      <div className="flex items-center bg-white/10 backdrop-blur-sm border border-white/20 focus-within:border-accent transition-colors duration-300">
        <svg className="ml-4 shrink-0 text-white/50" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
        </svg>
        <input
          type="text"
          value={query}
          onChange={(e) => { setQuery(e.target.value); setOpen(true); }}
          onFocus={() => setOpen(true)}
          placeholder="Search products…"
          className="w-full bg-transparent px-4 py-3.5 text-sm text-white placeholder-white/40 outline-none tracking-wide"
        />
        {query && (
          <button onClick={() => { setQuery(""); setOpen(false); }} className="mr-4 text-white/40 hover:text-white transition-colors">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {open && results.length > 0 && (
        <ul className="absolute top-full left-0 right-0 mt-1 bg-[#111] border border-white/10 shadow-2xl z-50 max-h-72 overflow-y-auto">
          {results.map((p, i) => (
            <li key={p.slug ?? i}>
              <button
                onMouseDown={() => handleSelect(p.slug!)}
                className="w-full text-left px-5 py-3.5 text-sm text-white/80 hover:bg-white/5 hover:text-accent transition-colors flex items-center gap-3"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0 text-accent/60">
                  <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
                </svg>
                <span className="font-medium">{p.name}</span>
                {p.sku && <span className="ml-auto text-xs text-white/30 shrink-0">{p.sku}</span>}
              </button>
            </li>
          ))}
        </ul>
      )}

      {open && query.trim().length > 0 && results.length === 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-[#111] border border-white/10 px-5 py-4 text-sm text-white/40 z-50">
          No products found for &ldquo;{query}&rdquo;
        </div>
      )}
    </div>
  );
}
