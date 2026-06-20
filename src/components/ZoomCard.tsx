"use client";

import { useRef, useState } from "react";
import Image from "next/image";

interface ZoomCardProps {
  image: string;
  name: string;
  showMoreDetails?: boolean;
}

export default function ZoomCard({ image, name, showMoreDetails }: ZoomCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [zoomed, setZoomed] = useState(false);
  const [origin, setOrigin] = useState("50% 50%");
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setOrigin(`${x}% ${y}%`);
  };

  if (showMoreDetails) {
    return (
      <div
        ref={containerRef}
        className="relative aspect-square overflow-hidden bg-brand-black border border-white/10 cursor-pointer"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <Image
          src={image}
          alt={name}
          fill
          className="object-contain p-6"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {hovered && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/30">
            <span className="bg-brand-black text-accent text-xs font-semibold px-4 py-2 border border-accent">
              More Details
            </span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="relative aspect-square overflow-hidden bg-brand-black border border-white/10 cursor-zoom-in"
      onMouseEnter={() => setZoomed(true)}
      onMouseLeave={() => setZoomed(false)}
      onMouseMove={handleMouseMove}
    >
      <Image
        src={image}
        alt={name}
        fill
        className="object-contain p-6 transition-transform duration-300 ease-out"
        style={{
          transform: zoomed ? "scale(2.2)" : "scale(1)",
          transformOrigin: origin,
        }}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      />
    </div>
  );
}
