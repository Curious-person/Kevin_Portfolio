"use client"

import { useRef } from "react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"

gsap.registerPlugin(useGSAP)

interface FundCardProps {
    /** Full-bleed background image URL */
    imageSource?: string
    /** Large primary text on the bottom-left */
    primaryText?: string
    /** First line of the smaller stacked text beside the primary */
    secondaryLine1?: string
    /** Second line of the smaller stacked text beside the primary */
    secondaryLine2?: string
    /** CTA button label on the bottom-right */
    ctaLabel?: string
    /** CTA button click handler */
    onCtaClick?: () => void
}

export default function FundCard({
    imageSource,
    primaryText = "Fund",
    secondaryLine1 = "Help",
    secondaryLine2 = "Others",
    ctaLabel = "Start Fundraising",
    onCtaClick,
}: FundCardProps) {
    const cardRef = useRef<HTMLDivElement>(null)
    const btnRef = useRef<HTMLButtonElement>(null)

    const { contextSafe } = useGSAP({ scope: cardRef })

    // Subtle button scale on card hover
    const onEnter = contextSafe(() => {
        gsap.to(btnRef.current, {
            scale: 1.05,
            duration: 0.3,
            ease: "power2.out",
        })
    })

    const onLeave = contextSafe(() => {
        gsap.to(btnRef.current, {
            scale: 1,
            duration: 0.3,
            ease: "power2.inOut",
        })
    })

    return (
        <div
            ref={cardRef}
            className="relative w-full rounded-2xl overflow-hidden cursor-pointer bg-gray-800"
            style={{ aspectRatio: "16 / 9" }}
            onMouseEnter={onEnter}
            onMouseLeave={onLeave}
            aria-label={`${primaryText} ${secondaryLine1} ${secondaryLine2} card`}
        >
            {/* Full-bleed background image */}
            {imageSource && (
                <img
                    src={imageSource}
                    alt=""
                    aria-hidden="true"
                    className="absolute inset-0 w-full h-full object-cover"
                />
            )}

            {/* Subtle gradient scrim so bottom text remains legible */}
            <div
                className="absolute inset-0"
                style={{
                    background:
                        "linear-gradient(to top, rgba(0,0,0,0.52) 0%, rgba(0,0,0,0.18) 45%, transparent 100%)",
                }}
                aria-hidden="true"
            />

            {/* Bottom content row */}
            <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between px-8 pb-7">

                {/* Left: Primary + stacked secondary text */}
                <div className="flex items-end gap-3">
                    <span
                        className="text-white font-bold leading-none select-none"
                        style={{ fontSize: "clamp(3.5rem, 8vw, 6rem)" }}
                    >
                        {primaryText}
                    </span>

                    <div
                        className="flex flex-col leading-tight text-white font-semibold select-none"
                        style={{ fontSize: "clamp(1rem, 2.2vw, 1.5rem)", paddingBottom: "0.25rem" }}
                    >
                        <span>{secondaryLine1}</span>
                        <span>{secondaryLine2}</span>
                    </div>
                </div>

                {/* Right: pill-shaped CTA button */}
                <button
                    ref={btnRef}
                    onClick={onCtaClick}
                    className="shrink-0 rounded-full font-semibold text-sm md:text-base transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    style={{
                        backgroundColor: "#a3e635",
                        color: "#171717",
                        padding: "0.65rem 1.6rem",
                        letterSpacing: "0.01em",
                    }}
                    aria-label={ctaLabel}
                >
                    {ctaLabel}
                </button>
            </div>
        </div>
    )
}
