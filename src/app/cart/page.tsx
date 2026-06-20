"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/lib/cartContext";
import SearchButton from "@/components/SearchButton";

export default function CartPage() {
  const { items, removeItem, updateQty } = useCart();

  return (
    <div className="min-h-screen bg-brand-black text-white">
      {/* Header */}
      <header className="border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 py-6 flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <Image
              src="/logo-keylight.png"
              alt="KeyLight"
              width={140}
              height={43}
              priority
              style={{ width: 140, height: "auto", filter: "invert(1) hue-rotate(180deg)" }}
            />
          </Link>
          <div className="flex items-center gap-3">
            <SearchButton />
            <Link href="/" className="text-white/60 hover:text-white text-sm transition-colors">
              ← Back
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 py-16">
        <h1 className="text-3xl font-bold tracking-tight mb-12">Your Cart</h1>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-6 py-32 text-white/40">
            <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            <p className="text-lg">Your cart is empty.</p>
            <Link
              href="/category/profiles-flexible-strips"
              className="px-8 py-3 border border-accent text-accent text-sm font-medium tracking-wide hover:bg-accent hover:text-brand-black transition-colors duration-300"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Items list */}
            <div className="flex-1 flex flex-col divide-y divide-white/10">
              {items.map((item) => (
                <div key={item.id} className="flex gap-6 py-6 items-center">
                  <div className="relative w-20 h-20 shrink-0 bg-white/5 rounded">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-contain p-2"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/product/${item.slug}`}
                      className="text-sm font-medium hover:text-accent transition-colors line-clamp-2"
                    >
                      {item.name}
                    </Link>
                  </div>

                  {/* Qty controls */}
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => updateQty(item.id, item.quantity - 1)}
                      className="w-8 h-8 border border-white/20 hover:border-accent text-white/60 hover:text-accent transition-colors flex items-center justify-center text-lg leading-none"
                    >
                      −
                    </button>
                    <span className="w-8 text-center text-sm">{item.quantity}</span>
                    <button
                      onClick={() => updateQty(item.id, item.quantity + 1)}
                      className="w-8 h-8 border border-white/20 hover:border-accent text-white/60 hover:text-accent transition-colors flex items-center justify-center text-lg leading-none"
                    >
                      +
                    </button>
                  </div>

                  {/* Remove */}
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-white/30 hover:text-white transition-colors shrink-0 ml-2"
                    aria-label="Remove item"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="lg:w-80 shrink-0">
              <div className="border border-white/10 p-8 flex flex-col gap-6">
                <h2 className="text-lg font-semibold tracking-wide">Order Summary</h2>
                <div className="flex flex-col gap-3 text-sm text-white/60">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between gap-4">
                      <span className="line-clamp-1 flex-1">{item.name}</span>
                      <span className="shrink-0">× {item.quantity}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-white/10 pt-4 flex justify-between text-sm font-semibold">
                  <span>Total items</span>
                  <span>{items.reduce((s, i) => s + i.quantity, 0)}</span>
                </div>
                <Link
                  href="/#contact"
                  className="w-full py-4 bg-accent text-brand-black text-sm font-semibold tracking-[0.15em] uppercase text-center hover:bg-white transition-colors duration-300"
                >
                  Request a Quote
                </Link>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
