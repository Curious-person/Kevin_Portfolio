"use client";

import { useEffect } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { CloseIcon } from "@/lib/constants";
import { getYouTubeVideoId } from "@/lib/utils";

type DesignModalProps = {
  open: boolean;
  onClose: () => void;
  design: {
    title: string;
    description?: string | null;
    type?: "image" | "video";
    link?: string;
    image?: string;
    width?: number | null;
    height?: number | null;
  } | null;
};

export function DesignModal({ open, onClose, design }: DesignModalProps) {
  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  const mediaUrl = design?.link || design?.image || "";
  const isVideo = design?.type === "video";
  const youtubeId = isVideo ? getYouTubeVideoId(mediaUrl) : null;

  const designRatio =
    design && design.width && design.height && design.height > 0
      ? design.width / design.height
      : isVideo
      ? 16 / 9
      : 2 / 3;

  return (
    <AnimatePresence>
      {open && design ? (
        <motion.div
          className="fixed inset-0 z-50 flex items-start justify-center bg-black/80 px-4 py-8 backdrop-blur-sm overflow-y-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          onClick={onClose}
          role="presentation"
        >
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="fixed right-5 top-5 z-50 text-white/50 hover:text-white transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20 p-1"
          >
            <CloseIcon className="h-6 w-6" strokeWidth={1.5} />
          </button>
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`${design.title} details`}
            className="relative mt-4 flex w-full max-w-3xl flex-col items-center overflow-hidden rounded-3xl px-6 py-12 text-center sm:mt-8 sm:px-10 sm:py-16"
            initial={{ scale: 0.96, y: 18, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.96, y: 18, opacity: 0 }}
            transition={{ type: "spring", stiffness: 180, damping: 20 }}
            onClick={(e) => e.stopPropagation()}
          >

            {/* Title Area */}
            <h2 className="font-serif text-5xl md:text-6xl font-light text-white tracking-wide">
              {design.title}
            </h2>

            {/* Media Container */}
            <div
              className="relative w-full max-w-xs sm:max-w-md md:max-w-lg bg-black/20 rounded-3xl overflow-hidden shadow-2xl mt-10"
              style={{ aspectRatio: designRatio, width: "100%" }}
            >
              {youtubeId ? (
                <iframe
                  src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=0`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="h-full w-full border-0 object-cover"
                />
              ) : isVideo ? (
                <video
                  src={mediaUrl}
                  controls
                  autoPlay
                  loop
                  playsInline
                  className="h-full w-full object-cover"
                />
              ) : (
                <Image
                  src={mediaUrl}
                  alt={design.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 32rem"
                  unoptimized
                />
              )}
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
