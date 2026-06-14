"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import TopNavigation from "@/components/TopNavigation";
import ScrollDownArrow from "@/components/ScrollDownArrow";
import AboutSection from "@/components/AboutSection";
import DustToText from "@/components/DustToText";
import Preloader from "@/components/Preloader";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);

  const mouseX = useRef<number>(typeof window !== "undefined" ? window.innerWidth / 2 : 0);
  const scrollProgress = useRef<number>(0);
  const [showDust, setShowDust] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Lock scroll while preloader is visible
  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isLoading]);

  // Recalculates horizontal translation to make container follow cursor
  const updatePosition = () => {
    if (!containerRef.current) return;
    const cardWidth = containerRef.current.offsetWidth;
    const wWidth = window.innerWidth;

    // Map cursor X coordinate so that container aligns with screen edges at extremes
    const targetX = (mouseX.current / wWidth - 0.5) * (wWidth - cardWidth);

    // Scale horizontal translation down to zero as scroll progress reaches the end
    const currentX = targetX * (1 - scrollProgress.current);

    gsap.to(containerRef.current, {
      x: currentX,
      duration: 0.25,
      ease: "power1.out",
      overwrite: "auto"
    });
  };

  // Set up mouse events and resize listeners for horizontal cursor tracking
  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      mouseX.current = e.clientX;
      updatePosition();
    };

    const handleResize = () => {
      updatePosition();
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // GSAP scroll trigger timeline for card zoom and fade effects
  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        // Pin the sticky viewport container so ScrollTrigger owns the scroll range
        trigger: pinRef.current,
        start: "top top",
        end: "+=200%",   // 2× viewport heights of scroll travel for the zoom
        pin: true,
        pinSpacing: true, // pushes AboutSection down so it doesn't overlap
        scrub: 1,
        onUpdate: (self) => {
          scrollProgress.current = self.progress;
          updatePosition();

          // Trigger particle animation when card is mostly zoomed in
          setShowDust(self.progress > 0.75);
        }
      }
    });

    tl.to(containerRef.current, {
      width: "100%",
      height: "100vh",
      borderRadius: "0px",
      ease: "none"
    }, 0)
      .to(".teaser-content", {
        opacity: 0,
        scale: 0.8,
        ease: "none"
      }, 0)
      .to(".zoomed-content", {
        opacity: 1,
        ease: "none"
      }, 0.6); // Fade in zoomed content during the last 40% of the scroll
  }, { scope: wrapperRef });

  return (
    <>
      {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
      <div className="flex min-h-screen flex-col bg-background text-foreground overflow-x-hidden">
      <TopNavigation />

      <main className="flex min-h-[50vh] items-center justify-center px-6">
        <div className="text-center">
          <p className="mt-4 text-base text-muted-foreground sm:text-lg">
            Hello my name is Kevin
          </p>
          <h1 className="text-[clamp(3rem,14vw,8rem)] font-black uppercase leading-none tracking-tight">
            Design Engineer
          </h1>
        </div>
      </main>

      {/* Scroll range container — height is managed by GSAP pinSpacing */}
      <div ref={wrapperRef} className="relative w-full">
        {/* Sticky element keeping the card fixed on viewport during expansion */}
        <div ref={pinRef} className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
          <div
            ref={containerRef}
            className="w-[50%] h-[35vh] bg-[#0c0c0c] text-white rounded-3xl flex items-center justify-center shadow-2xl relative overflow-hidden border border-white/10"
            style={{ transformOrigin: "center center" }}
          >
            {/* Teaser Content - visible before zooming */}
            <div className="teaser-content absolute flex flex-col items-center justify-center text-center px-6 pointer-events-none">
              <span className="text-xs font-semibold tracking-[0.2em] text-neutral-400 uppercase mb-2">Next Project</span>
              <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-4">SUMING INK</h2>
              <div className="flex items-center gap-2 text-xs text-neutral-400 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full">
                <span>Scroll to enter</span>
                <span className="animate-bounce font-bold">↓</span>
              </div>
            </div>

            {/* Zoomed Full Content - revealed on zoom expansion */}
            <div className="zoomed-content absolute inset-0 opacity-0 pointer-events-none flex items-center justify-center bg-[#0c0c0c] w-full h-full">
              {showDust && (
                <DustToText
                  headline="Suming"
                  subtitle="ink website."
                  bg="#0c0c0c"
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* About Section - scrolls in naturally after the card transition is complete */}
      <AboutSection />

      {/* Footer */}
      <footer className="py-12 text-center text-sm text-neutral-500 border-t border-border/20 bg-[#EDE9E8]">
        <p>© 2026 Kevin. All rights reserved.</p>
      </footer>
    </div>
    </>
  );
}

