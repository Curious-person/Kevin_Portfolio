"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowLeft } from "react-feather";
import { Button } from "@/components/ui/button";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function AboutPage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const heroRef = useRef<HTMLDivElement>(null);
    const heroImgRef = useRef<HTMLDivElement>(null);
    const heroTitleRef = useRef<HTMLDivElement>(null);
    const revealPanelRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: heroRef.current,
                    start: "top top",
                    end: "+=120%",
                    pin: true,
                    scrub: 1,
                    pinSpacing: true,
                },
            });

            // As user scrolls: hero image slides up and slightly scales down
            tl.to(
                heroImgRef.current,
                {
                    yPercent: -30,
                    scale: 0.92,
                    ease: "none",
                },
                0
            );

            // Hero title fades out upward
            tl.to(
                heroTitleRef.current,
                {
                    yPercent: -80,
                    opacity: 0,
                    ease: "none",
                },
                0
            );

            // Reveal panel slides up from below to cover the hero
            tl.fromTo(
                revealPanelRef.current,
                { yPercent: 100 },
                {
                    yPercent: 0,
                    ease: "none",
                },
                0
            );
        },
        { scope: containerRef }
    );

    return (
        <div ref={containerRef} className="bg-background text-foreground">
            {/* ── HERO — full viewport ── */}
            <div
                ref={heroRef}
                className="relative w-full h-screen overflow-hidden"
            >
                {/* Background image */}
                <div
                    ref={heroImgRef}
                    className="absolute inset-0 w-full h-full"
                    style={{ willChange: "transform" }}
                >
                    <img
                        src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop"
                        alt="Workspace"
                        className="w-full h-full object-cover"
                    />
                    {/* Dark gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/70" />
                </div>

                {/* Hero text */}
                <div
                    ref={heroTitleRef}
                    className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-8"
                    style={{ willChange: "transform, opacity" }}
                >
                    <p className="text-sm uppercase tracking-[0.3em] text-white/60 mb-4">
                        Welcome
                    </p>
                    <h1 className="text-6xl md:text-8xl font-bold tracking-tight leading-none">
                        About Me
                    </h1>
                    <p className="mt-6 text-lg text-white/70 max-w-md">
                        Scroll to discover my story
                    </p>

                    {/* Scroll indicator */}
                    <div className="absolute bottom-10 flex flex-col items-center gap-2 text-white/50 text-xs tracking-widest uppercase">
                        <span>Scroll</span>
                        <div className="w-px h-10 bg-white/30 animate-pulse" />
                    </div>
                </div>

                {/* ── Reveal panel — slides up over the hero ── */}
                <div
                    ref={revealPanelRef}
                    className="absolute bottom-0 left-0 right-0 h-full bg-background rounded-t-3xl shadow-2xl"
                    style={{ willChange: "transform" }}
                >
                    <div className="max-w-2xl mx-auto px-8 py-16 flex flex-col gap-16">
                        {/* Back Button */}
                        <div>
                            <Link href="/">
                                <Button variant="outline" className="dark:text-white">
                                    <ArrowLeft className="mr-2 h-4 w-4" />
                                    Back to Portfolio
                                </Button>
                            </Link>
                        </div>

                        {/* Bio content */}
                        <article className="flex flex-col gap-12">
                            <h2 className="text-4xl font-bold tracking-tight">
                                John Kevin Abgao
                            </h2>

                            <div className="flex flex-col gap-8 text-lg leading-relaxed text-foreground/80">
                                <p>
                                    Hello! I am John Kevin Abgao, a passionate website developer
                                    based in Antipolo, Philippines. I specialize in building
                                    dynamic, responsive, and beautiful web applications that
                                    provide meaningful experiences to users.
                                </p>

                                <p>
                                    With a strong foundation in modern web technologies like
                                    React, Next.js, and Tailwind CSS, I love turning complex
                                    problems into elegant, intuitive designs. My journey into
                                    web development started with a simple curiosity about how
                                    things work on the internet, and it has since blossomed into
                                    a full-time career.
                                </p>

                                <p>
                                    When I am not coding, you can find me exploring the latest
                                    tech trends, contributing to open-source projects, or
                                    enjoying a good cup of coffee while brainstorming my next
                                    big idea. I am always open to new challenges and
                                    opportunities to learn and grow.
                                </p>
                            </div>
                        </article>
                    </div>
                </div>
            </div>
        </div>
    );
}
