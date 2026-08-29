"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export function SkillsTicker({ skills }: { skills: string[] }) {
  const tickerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!tickerRef.current || !trackRef.current || !contentRef.current) return;

    const content = contentRef.current;
    const track = trackRef.current;
    const contentWidth = content.offsetWidth;

    // Clone the content for seamless loop
    const clone = content.cloneNode(true) as HTMLDivElement;
    clone.setAttribute("aria-hidden", "true");
    track.appendChild(clone);

    gsap.set(track, { x: 0 });

    const tl = gsap.timeline({ repeat: -1 });

    tl.to(track, {
      x: -contentWidth,
      duration: 30,
      ease: "none",
    });

    return () => {
      tl.kill();
      clone.remove();
    };
  }, [skills]);

  const skillsText = skills.join(" | ");

  return (
    <div
      ref={tickerRef}
      className="w-full overflow-hidden rounded-sm border border-white/80 py-3"
    >
      <div ref={trackRef} className="flex w-max items-center">
        <div
          ref={contentRef}
          className="shrink-0 whitespace-nowrap text-[11px] uppercase tracking-[0.24em] text-white/90 sm:text-[13px] sm:tracking-[0.28em]"
        >
          {skillsText} |{" "}
        </div>
      </div>
    </div>
  );
}
