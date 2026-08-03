"use client";

import Image from "next/image";

export function DesignCard({
  design,
  onClick,
}: {
  design: {
    id: string;
    title: string;
    image: string;
    aspectRatio: string;
  };
  onClick?: () => void;
}) {
  return (
    <div className="design-card group cursor-pointer break-inside-avoid mb-8" onClick={onClick}>
      <div className={`relative overflow-hidden rounded-[24px] bg-neutral-100 ${design.aspectRatio} transition-all duration-500 ease-out hover:shadow-xl hover:-translate-y-1`}>
        <Image
          src={design.image}
          alt={design.title}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          unoptimized
        />
        {/* Subtle overlay gradient on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>
      <div className="mt-4 px-1">
        <h4 className="font-sans text-lg text-neutral-800 tracking-tight transition-colors duration-300 group-hover:text-[#0392ea]">
          {design.title}
        </h4>
      </div>
    </div>
  );
}
