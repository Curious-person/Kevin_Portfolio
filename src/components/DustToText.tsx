"use client";

import { useEffect, useRef } from "react";
import { animate, stagger } from "motion";

// ─── types ────────────────────────────────────────────────────────────────────
interface Particle {
  x: number;
  y: number;
  tx: number;
  ty: number;
  size: number;
  alpha: number;
  t: number;
  delay: number;
  speed: number;
  color: string;
}

// ─── helpers ──────────────────────────────────────────────────────────────────
function sampleTextPixels(
  text: string,
  font: string,
  canvasW: number,
  canvasH: number,
  centerY: number,
  step = 4
): { x: number; y: number }[] {
  const off = document.createElement("canvas");
  off.width = canvasW;
  off.height = canvasH;
  const oc = off.getContext("2d")!;
  oc.fillStyle = "#fff";
  oc.font = font;
  oc.textAlign = "center";
  oc.textBaseline = "middle";
  oc.fillText(text, canvasW / 2, centerY);
  const data = oc.getImageData(0, 0, canvasW, canvasH).data;
  const pts: { x: number; y: number }[] = [];
  for (let y = 0; y < canvasH; y += step) {
    for (let x = 0; x < canvasW; x += step) {
      if (data[(y * canvasW + x) * 4 + 3] > 128) pts.push({ x, y });
    }
  }
  return pts;
}

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

// ─── component ────────────────────────────────────────────────────────────────
interface DustToTextProps {
  /** Primary headline text */
  headline?: string;
  /** Subtitle / tagline text */
  subtitle?: string;
  /** Background color of the stage */
  bg?: string;
  /** Auto-replay on mount? */
  autoPlay?: boolean;
}

export default function DustToText({
  headline = "Suming",
  subtitle = "ink website.",
  bg = "#0c0c0c",
  autoPlay = true,
}: DustToTextProps) {
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const txtRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const rafRef = useRef<number>(0);

  // ─── core animation logic ─────────────────────────────────────────────────
  const play = () => {
    const stage = stageRef.current;
    const canvas = canvasRef.current;
    const txtEl = txtRef.current;
    const subEl = subRef.current;
    if (!stage || !canvas || !txtEl || !subEl) return;

    cancelAnimationFrame(rafRef.current);

    const W = (canvas.width = stage.offsetWidth);
    const H = (canvas.height = stage.offsetHeight);
    const ctx = canvas.getContext("2d")!;
    ctx.clearRect(0, 0, W, H);

    // reset text visibility
    txtEl.style.opacity = "0";
    txtEl.style.filter = "blur(20px)";
    subEl.style.opacity = "0";
    subEl.style.filter = "blur(10px)";

    // ── sample font pixels ────────────────────────────────────────────────
    const fs1 = Math.min(W * 0.13, 80);
    const fs2 = Math.min(W * 0.05, 28);
    const cy1 = H * 0.42;
    const cy2 = H * 0.63;

    const pts1 = sampleTextPixels(
      headline,
      `900 ${fs1}px Inter, sans-serif`,
      W, H, cy1, 4
    );
    const pts2 = sampleTextPixels(
      subtitle,
      `700 ${fs2}px Inter, sans-serif`,
      W, H, cy2, 5
    );

    // ── build particles ───────────────────────────────────────────────────
    const particles: Particle[] = [];

    const makeParticles = (
      pts: { x: number; y: number }[],
      delayBase: number,
      delaySpread: number
    ) => {
      pts.forEach(({ x, y }) => {
        const delay = delayBase + Math.random() * delaySpread;
        particles.push({
          tx: x,
          ty: y,
          x: x + (Math.random() - 0.5) * 300,
          y: y + (Math.random() - 0.5) * 200 - 60,
          size: Math.random() * 2.5 + 0.5,
          alpha: 0,
          t: -delay,
          delay,
          speed: 0.012 + Math.random() * 0.018,
          color: `hsl(${Math.random() * 30 + 20}, 10%, ${60 + Math.random() * 30}%)`,
        });
      });
    };

    makeParticles(pts1, 0, 0.4);
    makeParticles(pts2, 0.55, 0.35);

    // ── run loop ──────────────────────────────────────────────────────────
    const startedAt = performance.now();
    let txt1Revealed = false;
    let txt2Revealed = false;

    const loop = () => {
      ctx.clearRect(0, 0, W, H);
      const elapsed = (performance.now() - startedAt) / 1000;

      particles.forEach((p) => {
        p.t += p.speed;
        if (p.t < 0) return;

        const raw = Math.min(p.t, 1);
        const ease = easeInOutCubic(raw);

        // converge toward target
        p.x += (p.tx - p.x) * p.speed * 3;
        p.y += (p.ty - p.y) * p.speed * 3;

        // fade in then out
        p.alpha = ease * (1 - Math.max(0, p.t - 0.85) * 6);

        if (p.alpha <= 0) return;

        ctx.save();
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // reveal headline
      if (elapsed > 0.8 && !txt1Revealed) {
        txt1Revealed = true;
        animate(
          txtEl as any,
          { opacity: 1, filter: "blur(0px)" },
          { duration: 1.0, ease: [0.22, 1, 0.36, 1] } as any
        );
      }

      // reveal subtitle
      if (elapsed > 1.4 && !txt2Revealed) {
        txt2Revealed = true;
        animate(
          subEl as any,
          { opacity: 1, filter: "blur(0px)" },
          { duration: 0.85, ease: [0.22, 1, 0.36, 1] } as any
        );
      }

      if (elapsed < 4) {
        rafRef.current = requestAnimationFrame(loop);
      }
    };

    rafRef.current = requestAnimationFrame(loop);
  };

  // ── mount / cleanup ───────────────────────────────────────────────────────
  useEffect(() => {
    if (autoPlay) {
      const t = setTimeout(play, 300);
      return () => {
        clearTimeout(t);
        cancelAnimationFrame(rafRef.current);
      };
    }
    return () => cancelAnimationFrame(rafRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headline, subtitle, autoPlay]);

  // ── render ────────────────────────────────────────────────────────────────
  return (
    <div
      ref={stageRef}
      style={{ background: bg }}
      data-theme="dark"
      className="relative flex min-h-[340px] w-full flex-col items-center justify-center overflow-hidden px-8 py-12"
    >
      {/* particle canvas */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 h-full w-full"
        aria-hidden
      />

      {/* headline */}
      <h1
        ref={txtRef}
        style={{
          opacity: 0,
          filter: "blur(20px)",
          fontFamily: "Inter, sans-serif",
          fontWeight: 900,
          letterSpacing: "-0.02em",
          background: "linear-gradient(135deg, #fff 60%, #aaa)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
        className="relative z-10 text-5xl md:text-7xl"
      >
        {headline}
      </h1>

      {/* subtitle */}
      <p
        ref={subRef}
        style={{
          opacity: 0,
          filter: "blur(10px)",
          fontFamily: "Inter, sans-serif",
          fontWeight: 700,
          color: "#666",
          letterSpacing: "0.05em",
        }}
        className="relative z-10 mt-2 text-xl md:text-2xl"
      >
        {subtitle}
      </p>

      {/* optional replay button */}
      <button
        onClick={play}
        style={{
          marginTop: "2rem",
          background: "transparent",
          border: "0.5px solid #444",
          color: "#aaa",
          padding: "8px 20px",
          borderRadius: "0px",
          fontSize: "13px",
          cursor: "pointer",
          fontFamily: "Inter, sans-serif",
        }}
        className="relative z-10 transition-colors hover:bg-white/10 hover:text-white"
      >
        ↺ Replay
      </button>
    </div>
  );
}
