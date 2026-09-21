"use client";

import React, { useEffect, useRef, useState } from "react";

type GridCell = {
  id: number;
  grade: number;
  opacity: number;
  hue: number;
};

export function InteractiveGridBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ cols: 20, rows: 12 });
  const [cells, setCells] = useState<GridCell[]>([]);
  const cellElementsRef = useRef<(HTMLDivElement | null)[]>([]);
  const timeoutsRef = useRef<Record<number, NodeJS.Timeout>>({});

  useEffect(() => {
    const updateGridSize = () => {
      if (!containerRef.current) return;
      const { clientWidth, clientHeight } = containerRef.current;

      // Target responsive cell size ~45px
      const cellSize = window.innerWidth < 640 ? 38 : 46;
      const cols = Math.max(6, Math.floor(clientWidth / cellSize));
      const rows = Math.max(6, Math.floor(clientHeight / cellSize));

      setDimensions({ cols, rows });

      const total = cols * rows;
      const newCells: GridCell[] = [];
      for (let i = 0; i < total; i++) {
        newCells.push({
          id: i,
          grade: Math.floor(Math.random() * 12 - 6),
          opacity: Math.max(0.15, Math.min(Math.random() * 0.4, 0.35)),
          hue: Math.floor(Math.random() * 360),
        });
      }
      setCells(newCells);
      cellElementsRef.current = new Array(total).fill(null);
    };

    updateGridSize();

    const resizeObserver = new ResizeObserver(() => {
      updateGridSize();
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      resizeObserver.disconnect();
      // Clean up any timeouts
      Object.values(timeoutsRef.current).forEach(clearTimeout);
    };
  }, []);

  // Global mouse & touch movement tracker over parent section
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const parentSection = container.closest("section") || container;

    const triggerCell = (clientX: number, clientY: number) => {
      if (!containerRef.current || dimensions.cols <= 0 || dimensions.rows <= 0) return;
      const rect = containerRef.current.getBoundingClientRect();
      const relX = clientX - rect.left;
      const relY = clientY - rect.top;

      if (relX >= 0 && relX <= rect.width && relY >= 0 && relY <= rect.height) {
        const cellW = rect.width / dimensions.cols;
        const cellH = rect.height / dimensions.rows;
        const col = Math.floor(relX / cellW);
        const row = Math.floor(relY / cellH);

        if (col >= 0 && col < dimensions.cols && row >= 0 && row < dimensions.rows) {
          const index = row * dimensions.cols + col;
          const el = cellElementsRef.current[index];
          if (el) {
            el.setAttribute("data-hover", "true");
            if (timeoutsRef.current[index]) {
              clearTimeout(timeoutsRef.current[index]);
            }
            timeoutsRef.current[index] = setTimeout(() => {
              el.removeAttribute("data-hover");
            }, 650);
          }
        }
      }
    };

    const handlePointerMove = (e: PointerEvent) => {
      triggerCell(e.clientX, e.clientY);
    };

    const handleMouseMove = (e: MouseEvent) => {
      triggerCell(e.clientX, e.clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches && e.touches[0]) {
        triggerCell(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    parentSection.addEventListener("pointermove", handlePointerMove as EventListener, { passive: true });
    parentSection.addEventListener("mousemove", handleMouseMove as EventListener, { passive: true });
    parentSection.addEventListener("touchmove", handleTouchMove as EventListener, { passive: true });

    return () => {
      parentSection.removeEventListener("pointermove", handlePointerMove as EventListener);
      parentSection.removeEventListener("mousemove", handleMouseMove as EventListener);
      parentSection.removeEventListener("touchmove", handleTouchMove as EventListener);
    };
  }, [dimensions]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-0 overflow-hidden select-none pointer-events-auto"
      aria-hidden="true"
    >
      {/* Background subtle grid lines pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.18) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.18) 1px, transparent 1px)
          `,
          backgroundSize: "46px 46px",
          maskImage: "radial-gradient(ellipse at center, rgba(0,0,0,1) 40%, transparent 85%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, rgba(0,0,0,1) 40%, transparent 85%)",
        }}
      />

      <style>{`
        .interactive-plus-grid {
          display: grid;
          grid-template-columns: repeat(var(--cols, 20), 1fr);
          grid-template-rows: repeat(var(--rows, 12), 1fr);
          touch-action: none;
          font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
        }

        .grid-cell {
          touch-action: none;
          display: grid;
          place-items: center;
          aspect-ratio: 1;
          font-size: 1.5rem;
          font-weight: 500;
          line-height: 1;
          color: hsl(var(--hue, 200) 90% 70%);
          opacity: var(--opacity, 0.2);
          transform: scale(1) rotate(0deg);
          filter: grayscale(0.8) brightness(1);
          transition: opacity 0.8s ease-in, transform 0.4s ease-out, filter 0.6s ease-out, color 0.4s ease-out;
          cursor: crosshair;
        }

        @media (hover: hover) and (pointer: fine) {
          .grid-cell:hover {
            transition-duration: 0s !important;
            transform: scale(1.6) rotate(calc(var(--grade, 0) * 90deg)) !important;
            filter: grayscale(0) brightness(1.8) !important;
            opacity: 1 !important;
            color: #ffffff !important;
            text-shadow: 0 0 10px rgba(255, 255, 255, 0.9), 0 0 20px hsl(var(--hue, 200) 100% 70%);
          }
        }

        .grid-cell[data-hover="true"] {
          transition-duration: 0s !important;
          transform: scale(1.6) rotate(calc(var(--grade, 0) * 90deg)) !important;
          filter: grayscale(0) brightness(1.8) !important;
          opacity: 1 !important;
          color: #ffffff !important;
          text-shadow: 0 0 10px rgba(255, 255, 255, 0.9), 0 0 20px hsl(var(--hue, 200) 100% 70%);
        }
      `}</style>

      <div
        ref={gridRef}
        className="interactive-plus-grid w-full h-full"
        style={
          {
            "--cols": dimensions.cols,
            "--rows": dimensions.rows,
          } as React.CSSProperties
        }
      >
        {cells.map((cell, index) => (
          <div
            key={cell.id}
            ref={(el) => {
              cellElementsRef.current[index] = el;
            }}
            className="grid-cell"
            style={
              {
                "--grade": cell.grade,
                "--opacity": cell.opacity,
                "--hue": cell.hue,
              } as React.CSSProperties
            }
          >
            +
          </div>
        ))}
      </div>
    </div>
  );
}
