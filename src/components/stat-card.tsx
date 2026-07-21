"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { heroTexture, cardTexture } from "@/lib/constants";

export function StatCard({
  value,
  label,
  offset,
}: {
  value: string;
  label: string;
  offset: string;
}) {
  const imageRef = useRef<HTMLImageElement>(null);

  const handleMouseEnter = () => {
    gsap.to(imageRef.current, { y: -20, duration: 0.4, ease: "power2.out" });
  };

  const handleMouseLeave = () => {
    gsap.to(imageRef.current, { y: 0, duration: 0.4, ease: "power2.out" });
  };

  return (
    <div
      className={`group relative h-49.75 w-49.75 rounded-3xl bg-[#444] shadow-[0_12px_30px_rgba(0,0,0,0.12)] transition-shadow duration-300 hover:shadow-[0_20px_40px_rgba(0,0,0,0.2)] ${offset}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div ref={imageRef} className="absolute inset-2.5 overflow-hidden rounded-[20px]">
        <Image
          src={heroTexture}
          alt="Mountain texture"
          fill
          className="object-cover"
          sizes="199px"
          unoptimized
        />
      </div>
      <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
        <div className="absolute inset-x-0 bottom-0 h-29.5">
          <Image
            src={cardTexture}
            alt="Card overlay texture"
            fill
            className="object-cover"
            sizes="199px"
            unoptimized
          />
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-4 left-4 right-4 text-white pointer-events-none">
        <p className="text-[48px] font-bold leading-none">{value}</p>
        <p className="mt-1 text-sm font-light">{label}</p>
      </div>
    </div>
  );
}
