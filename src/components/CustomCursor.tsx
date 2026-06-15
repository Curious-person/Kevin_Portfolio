"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Asterisk } from "lucide-react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isHidden, setIsHidden] = useState(true);
  const [isDarkBg, setIsDarkBg] = useState(false);

  useGSAP(() => {
    if (typeof window === "undefined") return;

    // Only enable custom cursor if pointer: fine (desktop mouse)
    const mediaQuery = window.matchMedia("(pointer: fine)");
    if (!mediaQuery.matches) return;

    const cursor = cursorRef.current;
    if (!cursor) return;

    // Set initial position off screen
    gsap.set(cursor, { 
      xPercent: -50, 
      yPercent: -50, 
      x: window.innerWidth / 2, 
      y: window.innerHeight / 2 
    });

    const xSetter = gsap.quickSetter(cursor, "x", "px");
    const ySetter = gsap.quickSetter(cursor, "y", "px");

    // Custom animation variables
    let cursorX = window.innerWidth / 2;
    let cursorY = window.innerHeight / 2;
    let targetX = cursorX;
    let targetY = cursorY;
    let rotation = 0;

    const handlePointerMove = (e: PointerEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      setIsHidden(false);

      // Check if hovering over interactive element
      const target = e.target as HTMLElement | null;
      if (target) {
        // Hover state check
        const isInteractive = target.closest("a, button, [role='button'], input, select, textarea, .hoverable");
        setIsHovered(!!isInteractive);

        // Dark background check (e.g. inside dark containers)
        const closestDark = target.closest('[data-theme="dark"]') || 
                            target.closest('.bg-\\[\\#0c0c0c\\]') || 
                            target.closest('.bg-black') || 
                            target.closest('.bg-neutral-900') ||
                            target.closest('.text-white');
        setIsDarkBg(!!closestDark);
      }
    };

    const handlePointerLeave = () => {
      setIsHidden(true);
    };

    const handlePointerEnter = () => {
      setIsHidden(false);
    };

    // Smooth follow loop with GSAP tick
    const tick = () => {
      const dt = 0.15; // interpolation factor
      cursorX += (targetX - cursorX) * dt;
      cursorY += (targetY - cursorY) * dt;

      // Rotate slightly based on speed of movement
      const dx = targetX - cursorX;
      const dy = targetY - cursorY;
      const speed = Math.sqrt(dx * dx + dy * dy);
      
      // Rotate the asterisk as it moves
      rotation += speed * 0.08;

      xSetter(cursorX);
      ySetter(cursorY);
      
      gsap.set(cursor, { rotation: rotation });
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerleave", handlePointerLeave);
    window.addEventListener("pointerenter", handlePointerEnter);
    document.addEventListener("mouseleave", handlePointerLeave);
    document.addEventListener("mouseenter", handlePointerEnter);

    gsap.ticker.add(tick);

    // Add cursor-none class to body
    document.body.classList.add("custom-cursor-active");

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
      window.removeEventListener("pointerenter", handlePointerEnter);
      document.removeEventListener("mouseleave", handlePointerLeave);
      document.removeEventListener("mouseenter", handlePointerEnter);
      gsap.ticker.remove(tick);
      document.body.classList.remove("custom-cursor-active");
    };
  }, { scope: cursorRef });

  if (typeof window !== "undefined" && !window.matchMedia("(pointer: fine)").matches) {
    return null;
  }

  return (
    <div
      ref={cursorRef}
      className={`fixed top-0 left-0 pointer-events-none z-[99999] transition-opacity duration-300 ease-out select-none
        ${isHidden ? "opacity-0 scale-50" : "opacity-100"}
        ${isDarkBg ? "text-white" : "text-[#171717]"}
      `}
      style={{
        transformOrigin: "center center",
      }}
    >
      <div 
        className={`transition-transform duration-300 ease-out
          ${isHovered ? "scale-150" : "scale-100"}
        `}
      >
        <Asterisk 
          size={32} 
          strokeWidth={isHovered ? 2.5 : 2} 
          className="transition-all duration-300"
        />
      </div>
    </div>
  );
}
