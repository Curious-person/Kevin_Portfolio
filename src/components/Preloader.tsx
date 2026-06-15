"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP);
}

interface PreloaderProps {
  /** Called after the exit animation completes so the parent can unmount */
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<HTMLDivElement>(null);

  useGSAP(
    (context, contextSafe) => {
      // ── Wave animation on the three dots ──────────────────────────────────
      const dots = dotsRef.current?.querySelectorAll(".dot");
      if (!dots?.length) return;

      // Infinite wave: each dot bounces up with a stagger offset
      gsap.to(dots, {
        y: -18,
        duration: 0.45,
        ease: "sine.inOut",
        stagger: {
          each: 0.15,
          repeat: -1,
          yoyo: true,
        },
      });

      // ── Exit sequence ─────────────────────────────────────────────────────
      // After 1.8s, fade dots then slide the overlay up
      const exit = contextSafe!(() => {
        const tl = gsap.timeline({
          onComplete,
        });

        tl.to(dots, {
          autoAlpha: 0,
          y: -10,
          duration: 0.35,
          ease: "power2.in",
          stagger: 0.06,
        }).to(
          overlayRef.current,
          {
            yPercent: -100,
            duration: 0.7,
            ease: "power3.inOut",
          },
          "-=0.1"
        );
      });

      // Minimum display time before exiting
      const timer = setTimeout(exit, 1800);
      return () => clearTimeout(timer);
    },
    { scope: overlayRef }
  );

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background"
      aria-label="Loading"
      role="status"
    >
      {/* Ellipsis dots */}
      <div ref={dotsRef} className="flex items-center gap-3">
        <span className="dot h-3 w-3 bg-foreground" />
        <span className="dot h-3 w-3 bg-foreground" />
        <span className="dot h-3 w-3 bg-foreground" />
      </div>

      {/* Screen-reader text */}
      <span className="sr-only">Loading…</span>
    </div>
  );
}
