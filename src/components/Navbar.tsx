"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Logo from "./Logo";
import { navLinks } from "@/lib/data";
import { useCart } from "@/lib/cartContext";
import { getAllProducts } from "@/lib/products";

const allProducts = getAllProducts();

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);
  const { count } = useCart();
  const router = useRouter();

  const searchResults = query.trim().length > 0
    ? allProducts.filter((p) =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.sku?.toLowerCase().includes(query.toLowerCase()) ||
        p.description?.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 8)
    : [];

  function openSearch() {
    setSearchOpen(true);
    setTimeout(() => searchInputRef.current?.focus(), 100);
  }
  function closeSearch() {
    setSearchOpen(false);
    setQuery("");
  }
  function handleSelect(slug: string) {
    closeSearch();
    router.push(`/product/${slug}`);
  }

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    if (href.startsWith("/")) {
      router.push(href);
    } else {
      // Hash link — if the section exists on this page, scroll to it;
      // otherwise go home first and let the browser jump to the anchor.
      const el = document.querySelector(href);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      } else {
        router.push(`/${href}`);
      }
    }
  };

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 lg:px-16"
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{
          height: scrolled ? "64px" : "88px",
          backgroundColor: scrolled ? "rgba(10,10,10,0.92)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          transition: "height 0.4s ease, background-color 0.4s ease, backdrop-filter 0.4s ease",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
        }}
      >
        {/* Hamburger — always visible, left side */}
        <button
          onClick={() => setMenuOpen((v) => !v)}
          className="w-10 h-10 flex flex-col items-center justify-center gap-[6px] z-[60] shrink-0"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          <motion.span
            className="block w-6 h-px bg-white origin-center"
            animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3 }}
          />
          <motion.span
            className="block w-6 h-px bg-white"
            animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
          <motion.span
            className="block w-6 h-px bg-white origin-center"
            animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3 }}
          />
        </button>

        {/* Logo — centered */}
        <a href="#" aria-label="KeyLight home" className="absolute left-1/2 -translate-x-1/2">
          <Logo variant="dark" size="md" />
        </a>

        {/* Right: search + cart */}
        <div className="flex items-center gap-4">
          <button
            onClick={openSearch}
            className="flex items-center justify-center w-10 h-10 text-accent hover:text-white transition-colors duration-200"
            aria-label="Search products"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
            </svg>
          </button>
          <a
            href="/cart"
            className="relative flex items-center justify-center w-10 h-10 text-white/70 hover:text-accent transition-colors duration-200"
            aria-label="Cart"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            {count > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-accent text-brand-black text-[10px] font-bold flex items-center justify-center">
                {count}
              </span>
            )}
          </a>
        </div>
      </motion.header>

      {/* Search overlay */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            className="fixed inset-0 z-[60] flex flex-col items-center pt-32 px-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-brand-black/90 backdrop-blur-md" onClick={closeSearch} />

            <motion.div
              className="relative w-full max-w-2xl"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Input */}
              <div className="flex items-center border-b-2 border-accent pb-3 gap-4">
                <svg className="text-accent shrink-0" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
                </svg>
                <input
                  ref={searchInputRef}
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

              {/* Results */}
              {searchResults.length > 0 && (
                <ul className="mt-2 bg-[#0f0f0f] border border-white/10 max-h-80 overflow-y-auto">
                  {searchResults.map((p, i) => (
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

              {query.trim().length > 0 && searchResults.length === 0 && (
                <p className="mt-6 text-white/30 text-sm tracking-wide">No products found for &ldquo;{query}&rdquo;</p>
              )}

              {query.trim().length === 0 && (
                <p className="mt-6 text-white/20 text-xs tracking-[0.15em] uppercase">Type to search all products</p>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-brand-black flex flex-col items-start justify-center px-8"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <nav className="flex flex-col gap-6 w-full" aria-label="Mobile navigation">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="text-left text-5xl font-bold text-white hover:text-accent transition-colors duration-200"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ delay: 0.1 + i * 0.07, duration: 0.4 }}
                >
                  {link.label}
                </motion.button>
              ))}
            </nav>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
