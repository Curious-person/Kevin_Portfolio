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
    width: number;
    height: number;
  };
  onClick?: () => void;
}) {
  const ratio = design.height > 0 ? design.width / design.height : 1;

  return (
    <div className="design-card group cursor-pointer break-inside-avoid mb-8" onClick={onClick}>
      <div
        className="relative overflow-hidden rounded-[24px] bg-neutral-100 transition-all duration-500 ease-out hover:shadow-xl hover:-translate-y-1"
        style={{ aspectRatio: ratio, width: "100%" }}
      >
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
    </div>
  );
}
