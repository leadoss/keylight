"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ProductItem } from "@/lib/products";
import { useCart } from "@/lib/cartContext";
import SearchButton from "@/components/SearchButton";

interface Props {
  product: ProductItem & { categorySlug: string; subcategorySlug: string };
}

export default function ProductDetail({ product }: Props) {
  const allImages = product.images?.length ? product.images : [product.image];
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<"info" | "reviews">("info");
  const [zoomed, setZoomed] = useState(false);
  const [origin, setOrigin] = useState("50% 50%");
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();
  const imageRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = imageRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setOrigin(`${x}% ${y}%`);
  };

  useEffect(() => {
    if (allImages.length <= 1) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % allImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [allImages.length]);

  return (
    <div className="min-h-screen bg-brand-black">
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
          <Link
            href={`/category/${product.categorySlug}/${product.subcategorySlug}`}
            className="text-accent hover:text-white text-sm font-semibold transition-colors"
          >
            ← Back
          </Link>
          <SearchButton />
        </div>
      </header>

      {/* Product section */}
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Left: Image gallery */}
          <div>
            <div
              ref={imageRef}
              className="relative bg-brand-black rounded-sm overflow-hidden w-full aspect-square cursor-zoom-in border border-white/10"
              onMouseEnter={() => setZoomed(true)}
              onMouseLeave={() => setZoomed(false)}
              onMouseMove={handleMouseMove}
            >
              <Image
                src={allImages[activeIndex]}
                alt={product.name}
                fill
                className="object-contain p-10 transition-transform duration-300 ease-out"
                style={{
                  transform: zoomed ? "scale(2.2)" : "scale(1)",
                  transformOrigin: origin,
                }}
              />
            </div>
            {allImages.length > 1 && (
              <div className="flex gap-4 mt-6 flex-wrap">
                {allImages.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveIndex(i)}
                    className={`relative w-20 h-20 bg-white rounded-sm overflow-hidden border-2 transition-colors ${
                      activeIndex === i ? "border-accent" : "border-transparent hover:border-white/30"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} ${i + 1}`}
                      fill
                      className="object-contain p-1"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Product info */}
          <div className="flex flex-col gap-8">
            {/* Title + status */}
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-accent mb-4">{product.name}</h1>
              <span className="text-sm text-white/50">
                Status:{" "}
                <span className="text-green-400 font-medium">
                  {product.inStock !== false ? "In Stock" : "Out of Stock"}
                </span>
              </span>
            </div>

            {/* Description */}
            {product.description && (
              <p className="text-white/70 text-sm leading-7 whitespace-pre-line">{product.description}</p>
            )}

            {/* Download DataSheet button */}
            {product.datasheet && (
              <a
                href={product.datasheet}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block w-fit px-8 py-3.5 border border-accent text-accent text-sm font-medium tracking-wide hover:bg-accent hover:text-brand-black transition-colors duration-300"
              >
                Download DataSheet
              </a>
            )}

            {/* Add to Cart */}
            <button
              onClick={() => {
                addItem({ id: product.slug ?? String(product.id), name: product.name, image: product.image, slug: product.slug ?? "" });
                setAdded(true);
                setTimeout(() => setAdded(false), 2000);
              }}
              className="flex items-center gap-3 text-white/40 hover:text-accent cursor-pointer transition-colors w-fit"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
              <span className="text-sm">{added ? "Added!" : "Add to Cart"}</span>
            </button>

            {/* Separator */}
            <div className="border-t border-dashed border-white/15" />

            {/* SKU and Categories */}
            <div className="flex flex-col gap-3">
              <p className="text-sm text-white/60">
                <span className="font-semibold text-white/90 mr-2">SKU:</span>{product.sku}
              </p>
              <p className="text-sm text-white/60">
                <span className="font-semibold text-white/90 mr-2">Categories:</span>
                {product.categories?.join(", ")}
              </p>
            </div>
          </div>
        </div>

        {/* Additional information / Reviews tabs */}
        {product.specs && product.specs.length > 0 && (
          <div className="mt-24">
            <div className="border-t border-dashed border-white/15 mb-16" />

            <div className="mb-12 border-b border-white/15">
              <span className="inline-block text-base font-bold pb-5 border-b-2 border-accent text-accent -mb-px tracking-wide uppercase">
                Additional information
              </span>
            </div>

            <div className="w-full">
              <table className="w-full border-collapse">
                <tbody>
                  {product.specs.map((spec, i) => (
                    <tr key={i} className="border-b border-white/15 last:border-0">
                      <td className="w-80 pr-16 text-base font-semibold text-accent align-middle tracking-wide" style={{ padding: "2.5rem 4rem 2.5rem 0" }}>
                        {spec.label}
                      </td>
                      <td className="text-base text-white/75 align-middle" style={{ padding: "2.5rem 0" }}>
                        {spec.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
