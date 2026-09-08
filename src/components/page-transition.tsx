"use client";

import { useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import gsap from "gsap";
import { LoadingWave } from "@/components/loading-wave";

export function PageTransition() {
  const router = useRouter();
  const pathname = usePathname();
  const overlayRef = useRef<HTMLDivElement>(null);
  
  // Solution C: Page Reload Handling
  // Fade out on initial mount (hard reload or first load) and on pathname change
  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;
    
    // Animate out the overlay smoothly when the page mounts/finishes routing
    gsap.to(overlay, {
      opacity: 0,
      duration: 0.5,
      pointerEvents: "none",
      ease: "power2.inOut",
    });
  }, [pathname]);

  // Solution A: Delay Navigation Until Animation Completes
  // Global interceptor for all local links
  useEffect(() => {
    const handleLinkClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a");
      
      if (!anchor) return;
      if (anchor.target === "_blank") return;
      
      const href = anchor.getAttribute("href");
      
      // Only handle internal routes that are meant to transition
      if (!href || !href.startsWith("/") || href.startsWith("/#") || anchor.hasAttribute("download")) return;
      
      // Allow default behavior for modifier keys (Ctrl+Click, Meta+Click, etc.)
      if (e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return;
      
      // Delay navigation
      e.preventDefault();
      
      const overlay = overlayRef.current;
      if (overlay) {
        gsap.to(overlay, {
          opacity: 1,
          pointerEvents: "auto",
          duration: 0.3,
          ease: "power2.inOut",
          onComplete: () => {
             // Navigate after the transition screen is fully visible
             router.push(href);
             // Note: the `[pathname]` useEffect will fade it back out once the new route renders
          }
        });
      } else {
        router.push(href);
      }
    };

    document.addEventListener("click", handleLinkClick);
    return () => document.removeEventListener("click", handleLinkClick);
  }, [router]);

  return (
    <div ref={overlayRef} className="fixed inset-0 z-[9999] opacity-100 pointer-events-auto">
      <LoadingWave isOverlay={true} />
    </div>
  );
}
