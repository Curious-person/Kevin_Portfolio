"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Parallax and scale animation
    gsap.fromTo(
      contentRef.current,
      { 
        scale: 0.8,
        y: 150,
        opacity: 0.5 
      },
      {
        scale: 1.1, // Enlargens as it scrolls down
        y: 0,
        opacity: 1,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom", // starts when top of container hits bottom of screen
          end: "bottom center", // ends when bottom of container hits center of screen
          scrub: 1, // smooth scrubbing effect
        },
      }
    );
  }, { scope: containerRef });

  return (
    <section 
      ref={containerRef} 
      className="relative min-h-[80vh] w-full flex items-center justify-center overflow-hidden py-24 px-6"
    >
      <div 
        ref={contentRef}
        className="max-w-4xl w-full text-center p-12 md:p-20 bg-card border border-border/50 shadow-2xl shadow-primary/5"
      >
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">
          About me
        </h2>
        <p className="text-lg md:text-2xl text-muted-foreground leading-relaxed">
          I'm a design engineer who is passionate about creating innovative solutions.
          I have a strong background in product design, bridging the gap between aesthetics and engineering.
        </p>
      </div>
    </section>
  );
}
