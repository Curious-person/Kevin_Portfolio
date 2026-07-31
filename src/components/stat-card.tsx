"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { heroTexture } from "@/lib/constants";

export function StatCard({
  value,
  label,
  offset,
  isActive = false,
  onClick,
}: {
  value: string;
  label: string;
  offset: string;
  isActive?: boolean;
  onClick?: () => void;
}) {
  const imageRef = useRef<HTMLImageElement>(null);

  const handleMouseEnter = () => {
    gsap.to(imageRef.current, { y: -20, duration: 0.4, ease: "power2.out" });
  };

  const handleMouseLeave = () => {
    gsap.to(imageRef.current, { y: 0, duration: 0.4, ease: "power2.out" });
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className={`group relative h-49.75 w-49.75 rounded-3xl bg-[#444] text-left transition-all duration-300 cursor-pointer border-0 outline-none p-0 focus-visible:ring-4 focus-visible:ring-[#0392ea]/70 focus-visible:ring-offset-4 focus-visible:ring-offset-white ${isActive
        ? "ring-4 ring-[#0392ea] ring-offset-4 ring-offset-white shadow-[0_20px_40px_rgba(3,146,234,0.3)] scale-[1.03]"
        : "shadow-[0_12px_30px_rgba(0,0,0,0.12)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.2)] hover:scale-[1.02]"
        } ${offset}`}
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
      <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none m-2">
        <div className="rounded-[20px] bg-[#444]/90  absolute inset-x-0 bottom-0 h-29.5 ">
          {/* <div
            className="bg-[#444]/80 backdrop-blur-sm"
          /> */}
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-4 left-4 right-4 text-white pointer-events-none">
        <p className="text-[48px] font-bold leading-none">{value}</p>
        <p className="mt-1 text-sm font-light">{label}</p>
      </div>
    </button>
  );
}
