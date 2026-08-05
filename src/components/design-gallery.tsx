"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { DesignCard } from "./design-card";
import { DesignModal } from "./design-modal";
import { Design } from "@/lib/supabase";

type DesignGalleryProps = {
  designs: Design[];
};

export function DesignGallery({ designs }: DesignGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedDesign, setSelectedDesign] = useState<Design | null>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const cards = containerRef.current.querySelectorAll(".design-card");

      // Set initial state
      gsap.set(cards, { opacity: 0, y: 40 });

      // Staggered show up animation
      gsap.to(cards, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
        clearProps: "transform,opacity",
      });
    },
    { scope: containerRef }
  );

  // Map to align database aspect_ratio with component's aspectRatio prop
  const formattedDesigns = designs.map((design) => ({
    id: design.id,
    title: design.title,
    image: design.image,
    aspectRatio: design.aspect_ratio,
  }));

  const formattedSelectedDesign = selectedDesign
    ? {
        id: selectedDesign.id,
        title: selectedDesign.title,
        image: selectedDesign.image,
        aspectRatio: selectedDesign.aspect_ratio,
      }
    : null;

  return (
    <>
      <div className="mx-auto max-w-4xl">
        <div
          ref={containerRef}
          className="mt-10 columns-1 md:columns-2 lg:columns-3 gap-8"
        >
          {formattedDesigns.map((design, idx) => (
            <DesignCard 
              key={design.id} 
              design={design} 
              onClick={() => setSelectedDesign(designs[idx])} 
            />
          ))}
        </div>
      </div>
      <DesignModal 
        open={selectedDesign !== null} 
        onClose={() => setSelectedDesign(null)} 
        design={formattedSelectedDesign} 
      />
    </>
  );
}
