"use client";

import { useEffect, useRef } from "react";

import { gsap } from "gsap";

const WIDTH = 192.44;
const HEIGHT = 96.22;
const POINT_COUNT = 36;

function buildWavePoints(phase: number) {
    const points: string[] = [];
    const step = WIDTH / (POINT_COUNT - 1);

    for (let index = 0; index < POINT_COUNT; index += 1) {
        const x = index * step;
        const progress = index / (POINT_COUNT - 1);
        const y = HEIGHT / 2 + Math.sin(progress * Math.PI * 6 + phase) * 8;

        points.push(`${x.toFixed(2)},${y.toFixed(2)}`);
    }

    return points.join(" ");
}

export default function LoadingPage() {
    const lineRef = useRef<SVGPolylineElement | null>(null);

    useEffect(() => {
        const line = lineRef.current;

        if (!line) {
            return;
        }

        const mm = gsap.matchMedia();

        mm.add(
            {
                reduceMotion: "(prefers-reduced-motion: reduce)",
                noPreference: "(prefers-reduced-motion: no-preference)",
            },
            (context) => {
                const { reduceMotion } = context.conditions;

                if (reduceMotion) {
                    line.setAttribute("points", buildWavePoints(Math.PI / 4));
                    gsap.set(line, { autoAlpha: 0.9 });
                    return undefined;
                }

                const motionState = { phase: 0 };

                const tween = gsap.to(motionState, {
                    phase: Math.PI * 2,
                    duration: 2.8,
                    ease: "none",
                    repeat: -1,
                    onUpdate: () => {
                        line.setAttribute("points", buildWavePoints(motionState.phase));
                    },
                });

                gsap.fromTo(
                    line,
                    { autoAlpha: 0.65 },
                    {
                        autoAlpha: 1,
                        duration: 1.2,
                        repeat: -1,
                        yoyo: true,
                        ease: "sine.inOut",
                    }
                );

                return () => {
                    tween.kill();
                };
            }
        );

        return () => {
            mm.revert();
        };
    }, []);

    return (
        <main className="relative min-h-screen overflow-hidden bg-[#0392ea]">
            <div className="absolute left-1/2 top-1/2 h-[96.22px] w-[192.44px] -translate-x-1/2 -translate-y-1/2">
                <svg
                    viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
                    className="block h-full w-full"
                    fill="none"
                    aria-hidden="true"
                >
                    <polyline
                        ref={lineRef}
                        points={buildWavePoints(Math.PI / 4)}
                        fill="none"
                        stroke="#ffffff"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </div>
            <span className="sr-only">Loading</span>
        </main>
    );
}
