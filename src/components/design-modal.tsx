"use client";

import { useEffect } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { CloseIcon } from "@/lib/constants";

type DesignModalProps = {
  open: boolean;
  onClose: () => void;
  design: {
    title: string;
    description?: string | null;
    image: string;
    width?: number;
    height?: number;
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

  const designRatio =
    design && design.width && design.height && design.height > 0
      ? design.width / design.height
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
            className="relative mt-4 flex w-full max-w-2xl flex-col items-center overflow-hidden rounded-3xl px-6 py-12 text-center sm:mt-8 sm:px-10 sm:py-16"
            initial={{ scale: 0.96, y: 18, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.96, y: 18, opacity: 0 }}
            transition={{ type: "spring", stiffness: 180, damping: 20 }}
            onClick={(e) => e.stopPropagation()}
          >

            {/* Title Area */}
            <h2 className="font-serif text-5xl md:text-6xl font-light text-white mb-6 tracking-wide">
              {design.title}
            </h2>

            {/* Description Area */}
            <div className="flex flex-col items-center px-4 max-w-lg">
              <p className="font-sans text-sm md:text-base text-neutral-400 leading-relaxed">
                {design.description || "No description provided."}
              </p>
            </div>

            {/* Image Placeholder */}
            <div
              className="relative w-full max-w-xs sm:max-w-sm md:max-w-md bg-[#e8e8e8] rounded-3xl overflow-hidden shadow-lg mt-10"
              style={{ aspectRatio: designRatio, width: "100%" }}
            >
              <Image
                src={design.image}
                alt={design.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 24rem"
                unoptimized
              />
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
