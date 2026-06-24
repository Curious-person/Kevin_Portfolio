"use client"

import { useRef } from "react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { ArrowUpRight } from "lucide-react"

gsap.registerPlugin(useGSAP)

interface ImageCardProps {
    imageSource?: string
    title?: string
    description?: string
}

export default function ImageCard({
    imageSource,
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
        if (imageSource) {
            gsap.set(textRef.current, { yPercent: 100 })
        }
    }, { scope: cardRef })

    if (!imageSource) {
        return (
            <div className="bg-gray-800 rounded-lg overflow-hidden cursor-pointer aspect-[4/3] w-full p-6 md:p-8 flex flex-col justify-between group hover:bg-gray-700 transition-colors">
                <div className="flex flex-col text-left">
                    <h2 className="text-white font-bold text-3xl md:text-4xl">{title}</h2>
                    <p className="text-gray-400 text-lg mt-3 max-w-[90%]">{description}</p>
                </div>
                <div className="flex justify-end">
                    <div className="bg-white text-black p-3 rounded-full opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300">
                        <ArrowUpRight className="w-6 h-6" />
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div
            ref={cardRef}
            className="relative bg-gray-800 rounded-lg overflow-hidden cursor-pointer"
            onMouseEnter={onEnter}
            onMouseLeave={onLeave}
        >
            {/* Media (Image/Video) */}
            <div ref={imgWrapRef} className="aspect-[4/3] w-full">
                {imageSource.match(/\.(mp4|webm|ogg|mov)(\?.*)?$/i) ? (
                    <video
                        src={imageSource}
                        className="w-full h-full object-cover"
                        autoPlay
                        loop
                        muted
                        playsInline
                    />
                ) : (
                    <img
                        src={imageSource}
                        alt=""
                        className="w-full h-full object-cover"
                    />
                )}
            </div>

            {/* Text revealed on hover — absolute so it adds no layout height */}
            <div ref={textRef} className="absolute bottom-0 left-0 right-0 px-4 pb-4 pt-2 bg-gray-800">
                <h2 className="text-white font-semibold text-lg">{title}</h2>
                <p className="text-gray-400 text-sm mt-1">{description}</p>
            </div>
        </div>
    )
}
