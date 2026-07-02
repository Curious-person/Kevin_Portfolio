"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

/**
 * Mist layer configuration.
 * Each layer is a radial-gradient blob positioned in the lower portion of the scene,
 * with independent GSAP animation parameters to prevent synchronization.
 */
const MIST_LAYERS = [
  {
    // Large base fog — lower-left, very diffuse
    id: "mist-0",
    gradient:
      "radial-gradient(ellipse 120% 80% at 30% 85%, rgba(80,82,90,0.5) 0%, rgba(60,62,68,0.3) 40%, transparent 70%)",
    style: {
      width: "110%",
      height: "70%",
      bottom: "-10%",
      left: "-15%",
    },
    blur: 60,
    animation: { x: 60, y: -20, scale: 1.08, opacity: 0.45, durationX: 22, durationY: 18, durationScale: 26, durationOpacity: 14 },
  },
  {
    // Dense fog bank — center-bottom, main obscuring layer
    id: "mist-1",
    gradient:
      "radial-gradient(ellipse 100% 70% at 50% 90%, rgba(70,72,80,0.6) 0%, rgba(50,52,58,0.35) 45%, transparent 75%)",
    style: {
      width: "100%",
      height: "65%",
      bottom: "-5%",
      left: "0%",
    },
    blur: 50,
    animation: { x: -45, y: 15, scale: 1.06, opacity: 0.55, durationX: 19, durationY: 16, durationScale: 24, durationOpacity: 12 },
  },
  {
    // Right flank fog — hugs the lower-right mountain base
    id: "mist-2",
    gradient:
      "radial-gradient(ellipse 90% 60% at 75% 80%, rgba(75,78,88,0.45) 0%, rgba(55,58,65,0.25) 50%, transparent 75%)",
    style: {
      width: "80%",
      height: "55%",
      bottom: "0%",
      right: "-10%",
    },
    blur: 55,
    animation: { x: -70, y: -12, scale: 1.1, opacity: 0.4, durationX: 25, durationY: 20, durationScale: 28, durationOpacity: 16 },
  },
  {
    // Mid-altitude wisp — lighter, sits higher to create depth
    id: "mist-3",
    gradient:
      "radial-gradient(ellipse 80% 50% at 55% 65%, rgba(90,92,100,0.3) 0%, rgba(65,68,75,0.15) 50%, transparent 70%)",
    style: {
      width: "90%",
      height: "50%",
      bottom: "10%",
      left: "5%",
    },
    blur: 70,
    animation: { x: 50, y: 18, scale: 1.12, opacity: 0.3, durationX: 28, durationY: 22, durationScale: 30, durationOpacity: 18 },
  },
  {
    // Left flank cloud — wraps the lower-left
    id: "mist-4",
    gradient:
      "radial-gradient(ellipse 85% 55% at 25% 75%, rgba(72,75,85,0.4) 0%, rgba(55,58,65,0.2) 45%, transparent 70%)",
    style: {
      width: "75%",
      height: "50%",
      bottom: "5%",
      left: "-5%",
    },
    blur: 65,
    animation: { x: 80, y: -15, scale: 1.07, opacity: 0.35, durationX: 24, durationY: 19, durationScale: 22, durationOpacity: 15 },
  },
  {
    // Foreground haze — closest to camera, very large and subtle
    id: "mist-5",
    gradient:
      "radial-gradient(ellipse 130% 90% at 45% 95%, rgba(65,68,78,0.4) 0%, rgba(45,48,55,0.2) 40%, transparent 65%)",
    style: {
      width: "120%",
      height: "60%",
      bottom: "-15%",
      left: "-10%",
    },
    blur: 80,
    animation: { x: -55, y: 10, scale: 1.05, opacity: 0.5, durationX: 20, durationY: 15, durationScale: 25, durationOpacity: 13 },
  },
  {
    // High wisp — thin, ethereal tendril near the mountain mid-section
    id: "mist-6",
    gradient:
      "radial-gradient(ellipse 70% 35% at 60% 55%, rgba(95,98,110,0.22) 0%, rgba(70,72,82,0.1) 50%, transparent 70%)",
    style: {
      width: "70%",
      height: "40%",
      bottom: "20%",
      right: "0%",
    },
    blur: 75,
    animation: { x: -40, y: 25, scale: 1.15, opacity: 0.2, durationX: 30, durationY: 24, durationScale: 32, durationOpacity: 20 },
  },
  {
    // Deep background fog — very dark, fills the gap between mountain and edges
    id: "mist-7",
    gradient:
      "radial-gradient(ellipse 110% 75% at 40% 100%, rgba(60,62,72,0.45) 0%, rgba(42,44,52,0.25) 45%, transparent 70%)",
    style: {
      width: "105%",
      height: "55%",
      bottom: "-8%",
      left: "-3%",
    },
    blur: 45,
    animation: { x: 35, y: -18, scale: 1.04, opacity: 0.6, durationX: 17, durationY: 14, durationScale: 20, durationOpacity: 11 },
  },
];

export default function MountainScene() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          isMotionOk: "(prefers-reduced-motion: no-preference)",
          isReduced: "(prefers-reduced-motion: reduce)",
        },
        (context) => {
          const { isReduced } = context.conditions!;

          if (isReduced) {
            // Respect accessibility — no animation
            return;
          }

          // Animate each mist layer independently
          MIST_LAYERS.forEach((layer) => {
            const el = `#${layer.id}`;
            const a = layer.animation;

            // Horizontal drift
            gsap.to(el, {
              x: a.x,
              duration: a.durationX,
              ease: "sine.inOut",
              repeat: -1,
              yoyo: true,
            });

            // Vertical drift (offset start via delay)
            gsap.to(el, {
              y: a.y,
              duration: a.durationY,
              ease: "sine.inOut",
              repeat: -1,
              yoyo: true,
              delay: a.durationY * 0.3,
            });

            // Breathing scale
            gsap.to(el, {
              scale: a.scale,
              duration: a.durationScale,
              ease: "sine.inOut",
              repeat: -1,
              yoyo: true,
              delay: a.durationScale * 0.15,
            });

            // Opacity oscillation
            gsap.to(el, {
              opacity: a.opacity,
              duration: a.durationOpacity,
              ease: "sine.inOut",
              repeat: -1,
              yoyo: true,
              delay: a.durationOpacity * 0.5,
            });
          });
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden bg-[#080808]"
      style={{ height: "70vh", minHeight: "500px" }}
    >
      {/* Layer 1: Mountain image */}
      <img
        src="/images/singlemountain.png"
        alt=""
        role="presentation"
        draggable={false}
        className="pointer-events-none select-none absolute inset-0 w-full h-full"
        style={{
          objectFit: "cover",
          objectPosition: "55% 30%",
          mixBlendMode: "screen",
        }}
      />

      {/* Layer 2: Bottom-to-background gradient — fades mountain base to #080808 */}
      <div
        className="absolute inset-x-0 bottom-0 pointer-events-none"
        style={{
          height: "55%",
          background:
            "linear-gradient(to top, rgb(8,8,8) 0%, rgba(8,8,8,0.95) 20%, rgba(8,8,8,0.7) 50%, rgba(8,8,8,0.3) 75%, transparent 100%)",
        }}
      />

      {/* Layer 3: Side vignettes — darken edges for cinematic feel */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 80% at 60% 40%, transparent 30%, rgba(8,8,8,0.6) 100%)",
        }}
      />

      {/* Layer 4: Mist / fog blobs */}
      {MIST_LAYERS.map((layer) => (
        <div
          key={layer.id}
          id={layer.id}
          className="absolute pointer-events-none will-change-transform"
          style={{
            ...layer.style,
            background: layer.gradient,
            filter: `blur(${layer.blur}px)`,
            mixBlendMode: "screen" as const,
            opacity: layer.animation.opacity * 1.8,
          }}
        />
      ))}

      {/* Layer 5: Top edge fade — subtle darkening at the very top */}
      <div
        className="absolute inset-x-0 top-0 pointer-events-none"
        style={{
          height: "25%",
          background:
            "linear-gradient(to bottom, rgba(8,8,8,0.5) 0%, rgba(8,8,8,0.15) 50%, transparent 100%)",
        }}
      />
    </div>
  );
}
