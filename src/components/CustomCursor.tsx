"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springX = useSpring(mouseX, { stiffness: 500, damping: 40, mass: 0.2 });
  const springY = useSpring(mouseY, { stiffness: 500, damping: 40, mass: 0.2 });

  const trailX = useSpring(mouseX, { stiffness: 120, damping: 28, mass: 0.5 });
  const trailY = useSpring(mouseY, { stiffness: 120, damping: 28, mass: 0.5 });

  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;

    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive =
        target.closest("a, button, [data-cursor-hover]") !== null;
      setIsHovering(isInteractive);
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", handleOver);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", handleOver);
    };
  }, [mouseX, mouseY, isVisible]);

  return (
    <>
      {/* Dot */}
      <motion.div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full bg-accent"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: isVisible ? 1 : 0,
        }}
        animate={{
          width: isHovering ? 8 : 6,
          height: isHovering ? 8 : 6,
        }}
        transition={{ duration: 0.15 }}
      />
      {/* Ring */}
      <motion.div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full border border-white/40"
        style={{
          x: trailX,
          y: trailY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: isVisible ? 1 : 0,
        }}
        animate={{
          width: isHovering ? 48 : 32,
          height: isHovering ? 48 : 32,
          borderColor: isHovering ? "rgba(255,212,0,0.7)" : "rgba(255,255,255,0.4)",
        }}
        transition={{ type: "spring", stiffness: 200, damping: 25 }}
      />
    </>
  );
}
