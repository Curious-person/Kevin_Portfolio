"use client"

import { useRef } from "react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"

gsap.registerPlugin(useGSAP)

interface ImageCardProps {
    imageSource?: string
    title?: string
    description?: string
}

export default function ImageCard({ 
    imageSource = "https://placehold.co/600x450/1f2937/ffffff?text=No+Image",
    title = "Project Name",
    description = "Project Description"
}: ImageCardProps) {
    const cardRef = useRef<HTMLDivElement>(null)
    const imgWrapRef = useRef<HTMLDivElement>(null)
    const textRef = useRef<HTMLDivElement>(null)

    const { contextSafe } = useGSAP({ scope: cardRef })

    const onEnter = contextSafe(() => {
        gsap.to(imgWrapRef.current, {
            yPercent: -15,
            duration: 0.4,
            ease: "power2.out",
        })
        gsap.to(textRef.current, {
            yPercent: 0,
            duration: 0.4,
            ease: "power2.out",
        })
    })

    const onLeave = contextSafe(() => {
        gsap.to(imgWrapRef.current, {
            yPercent: 0,
            duration: 0.4,
            ease: "power2.inOut",
        })
        gsap.to(textRef.current, {
            yPercent: 100,
            duration: 0.35,
            ease: "power2.inOut",
        })
    })

    useGSAP(() => {
        gsap.set(textRef.current, { yPercent: 100 })
    }, { scope: cardRef })

    return (
        <div
            ref={cardRef}
            className="relative bg-gray-800 rounded-lg overflow-hidden cursor-pointer"
            onMouseEnter={onEnter}
            onMouseLeave={onLeave}
        >
            {/* Image */}
            <div ref={imgWrapRef} className="aspect-[4/3] w-full">
                <img
                    src={imageSource}
                    alt=""
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Text revealed on hover — absolute so it adds no layout height */}
            <div ref={textRef} className="absolute bottom-0 left-0 right-0 px-4 pb-4 pt-2 bg-gray-800">
                <h2 className="text-white font-semibold text-lg">{title}</h2>
                <p className="text-gray-400 text-sm mt-1">{description}</p>
            </div>
        </div>
    )
}
