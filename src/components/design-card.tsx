"use client";

import Image from "next/image";
import { getYouTubeVideoId } from "@/lib/utils";

type DesignCardProps = {
  design: {
    id: string;
    title: string;
    type?: "image" | "video";
    link?: string;
    image?: string; // Fallback for backwards compatibility
    width?: number | null;
    height?: number | null;
  };
  onClick?: () => void;
};

export function DesignCard({ design, onClick }: DesignCardProps) {
  const mediaUrl = design.link || design.image || "";
  const isVideo = design.type === "video";
  const youtubeId = isVideo ? getYouTubeVideoId(mediaUrl) : null;
  
  const width = design.width ?? 16;
  const height = design.height ?? 9;
  const ratio = height > 0 ? width / height : 1;

  return (
    <div className="design-card group cursor-pointer break-inside-avoid mb-8" onClick={onClick}>
      <div
        className="relative overflow-hidden rounded-[24px] bg-neutral-100 transition-all duration-500 ease-out hover:shadow-xl hover:-translate-y-1"
        style={{ aspectRatio: ratio, width: "100%" }}
      >
        {isVideo && !youtubeId ? (
          <video
            src={mediaUrl}
            autoPlay
            loop
            muted
            playsInline
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        ) : (
          <Image
            src={youtubeId ? `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg` : mediaUrl}
            alt={design.title}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            unoptimized
          />
        )}

        {/* Video badge indicator */}
        {isVideo && (
          <div className="absolute top-3 right-3 flex items-center justify-center rounded-full bg-black/50 p-2 backdrop-blur-md text-white">
            <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        )}

        {/* Subtle overlay gradient on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>
    </div>
  );
}
