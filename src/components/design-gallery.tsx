"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { DesignCard } from "./design-card";

const designs = [
  {
    id: "design-1",
    title: "Vesper Crypto Wallet",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop",
    aspectRatio: "aspect-square",
  },
  {
    id: "design-2",
    title: "Zenith Mobile App",
    image: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=600&auto=format&fit=crop",
    aspectRatio: "aspect-[2/3]",
  },
  {
    id: "design-3",
    title: "Aura Workspace System",
    image: "https://images.unsplash.com/photo-1604871000636-074fa5117945?q=80&w=600&auto=format&fit=crop",
    aspectRatio: "aspect-[2/3]",
  },
  {
    id: "design-4",
    title: "Aether Landing Page",
    image: "https://images.unsplash.com/photo-1618005198143-e5283b519a7f?q=80&w=600&auto=format&fit=crop",
    aspectRatio: "aspect-square",
  },
  {
    id: "design-5",
    title: "Smart Home Interface",
    image: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=600&auto=format&fit=crop",
    aspectRatio: "aspect-square",
  },
  {
    id: "design-6",
    title: "Futuristic Core Render",
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=600&auto=format&fit=crop",
    aspectRatio: "aspect-[2/3]",
  },
];

export function DesignGallery() {
  const containerRef = useRef<HTMLDivElement>(null);

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

  return (
    <div className="mx-auto max-w-4xl">
      <div
        ref={containerRef}
        className="mt-10 columns-1 md:columns-2 lg:columns-3 gap-8"
      >
        {designs.map((design) => (
          <DesignCard key={design.id} design={design} />
        ))}
      </div>
    </div>
  );
}
