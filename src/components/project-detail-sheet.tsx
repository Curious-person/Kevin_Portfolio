"use client";

import { useEffect, useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { CloseIcon } from "@/lib/constants";
import { supabase, ProjectSection, ProjectWithSections } from "@/lib/supabase";

type ProjectDetailSheetProps = {
    open: boolean;
    projectId: string | null;
    title: string;
    description: string;
    onClose: () => void;
};

function ImageCarousel({ images, caption }: { images: string[]; caption?: string }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (images.length <= 1) return;
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % images.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [images.length]);

    useGSAP(() => {
        gsap.to(".slides-container", {
            xPercent: -100 * currentIndex,
            duration: 0.6,
            ease: "power2.inOut"
        });
    }, { dependencies: [currentIndex], scope: containerRef });

    return (
        <div ref={containerRef} className="relative h-55 w-full overflow-hidden rounded-3xl bg-[#d9d9d9] sm:h-72">
            <div className="slides-container absolute inset-0 flex h-full w-full">
                {images.map((img, idx) => (
                    <div
                        key={idx}
                        className="h-full w-full flex-shrink-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${img})` }}
                        role="img"
                        aria-label={caption || `Project image ${idx + 1}`}
                    />
                ))}
            </div>
            <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2 z-10">
                {images.map((_, idx) => (
                    <div
                        key={idx}
                        className={`h-2 w-2 rounded-full transition-colors ${
                            idx === currentIndex ? "bg-white" : "bg-white/50"
                        }`}
                    />
                ))}
            </div>
        </div>
    );
}

function DetailImageBlock({
    imageUrl,
    caption,
}: {
    imageUrl?: string | null;
    caption?: string;
}) {
    const images = imageUrl ? imageUrl.split(',').map(url => url.trim()).filter(Boolean) : [];
    const isMultiple = images.length > 1;
    const isVideo = !isMultiple && images[0]?.match(/\.mp4($|\?)/i);

    return (
        <div className="flex flex-col items-center gap-2">
            {isMultiple ? (
                <ImageCarousel images={images} caption={caption} />
            ) : (
                <div
                    className="relative h-55 w-full overflow-hidden rounded-3xl bg-[#d9d9d9] bg-cover bg-center sm:h-72"
                    style={!isVideo && images[0] ? { backgroundImage: `url(${images[0]})` } : undefined}
                    role={!isVideo ? "img" : undefined}
                    aria-label={!isVideo ? (caption || "Project detail image") : undefined}
                >
                    {isVideo && (
                        <video
                            src={images[0]}
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="absolute inset-0 h-full w-full object-cover"
                            aria-label={caption || "Project detail video"}
                        />
                    )}
                </div>
            )}
            {caption ? (
                <p className="text-center text-sm text-[#777] sm:text-base">{caption}</p>
            ) : null}
        </div>
    );
}

export function ProjectDetailSheet({
    open,
    projectId,
    title,
    description,
    onClose,
}: ProjectDetailSheetProps) {
    const [sections, setSections] = useState<ProjectSection[]>([]);
    const [isLoadingDetail, setIsLoadingDetail] = useState(false);

    useEffect(() => {
        if (!open) {
            return;
        }

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                onClose();
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            document.body.style.overflow = previousOverflow;
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [open, onClose]);

    useEffect(() => {
        if (!open || !projectId) {
            setSections([]);
            return;
        }

        let isMounted = true;

        const loadProjectDetail = async () => {
            setIsLoadingDetail(true);

            const { data, error } = await supabase
                .from("projects")
                .select("*, project_sections(*)")
                .eq("id", projectId)
                .order("sequence_order", { ascending: true, referencedTable: "project_sections" })
                .maybeSingle();

            if (!isMounted) {
                return;
            }

            if (error || !data) {
                setSections([]);
                setIsLoadingDetail(false);
                return;
            }

            const projectData = data as unknown as ProjectWithSections;
            const fetchedSections = projectData.project_sections ?? [];
            setSections(fetchedSections);
            setIsLoadingDetail(false);
        };

        loadProjectDetail();

        return () => {
            isMounted = false;
        };
    }, [open, projectId]);

    return (
        <AnimatePresence>
            {open ? (
                <motion.div
                    className="fixed inset-0 z-50 flex items-end justify-center bg-black/30 pt-12 backdrop-blur-[2px] sm:pt-16"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    onClick={onClose}
                    role="presentation"
                >
                    <motion.div
                        role="dialog"
                        aria-modal="true"
                        aria-label={`${title} details`}
                        className="relative flex h-full w-full flex-col overflow-hidden rounded-t-3xl bg-white shadow-[0_-24px_80px_rgba(0,0,0,0.24)]"
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        exit={{ y: "100%" }}
                        transition={{ type: "spring", stiffness: 140, damping: 20 }}
                        onClick={(event) => event.stopPropagation()}
                    >
                        <button
                            type="button"
                            onClick={onClose}
                            aria-label="Close project details"
                            className="absolute right-4 top-4 z-10 rounded-full p-2 transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0392ea]/30 sm:right-5 sm:top-5"
                        >
                            <CloseIcon className="h-6 w-6" />
                        </button>

                        <div className="flex-1 overflow-y-auto px-4 pb-10 pt-16 sm:px-8 sm:pt-20">
                            <div className="mx-auto flex w-full max-w-248.5 flex-col items-center">
                                <h2 className="font-serif text-[clamp(2.5rem,4.5vw,3rem)] leading-none text-black">
                                    {title}
                                </h2>

                                {isLoadingDetail ? (
                                    <div className="mt-10 w-full space-y-14 sm:mt-12 sm:space-y-20">
                                        <section className="grid gap-5 md:grid-cols-[0.95fr_1.05fr] md:items-start md:gap-8">
                                            <div className="h-55 w-full sm:h-72">
                                                <Skeleton height="100%" borderRadius="1.5rem" />
                                            </div>
                                            <div className="md:pt-1">
                                                <Skeleton height={32} width="40%" className="mb-3" />
                                                <Skeleton count={4} className="mb-2" />
                                            </div>
                                        </section>
                                        <section className="grid gap-5 md:grid-cols-[1.05fr_0.95fr] md:items-start md:gap-8">
                                            <div className="md:pt-1">
                                                <Skeleton height={32} width="40%" className="mb-3" />
                                                <Skeleton count={4} className="mb-2" />
                                            </div>
                                            <div className="h-55 w-full sm:h-72">
                                                <Skeleton height="100%" borderRadius="1.5rem" />
                                            </div>
                                        </section>
                                    </div>
                                ) : null}

                                <div className="mt-10 w-full space-y-14 sm:mt-12 sm:space-y-20">
                                    {sections.length > 0 ? (
                                        sections.map((section, idx) => {
                                            const sectionTitle = section.title || (idx === 0 ? "Overview" : idx === 1 ? "Process" : "Result");

                                            if (section.content_text && section.image_url) {
                                                const isEven = idx % 2 === 0;
                                                return (
                                                    <section
                                                        key={section.id || idx}
                                                        className={`grid gap-5 md:items-start md:gap-8 ${
                                                            isEven
                                                                ? "md:grid-cols-[0.95fr_1.05fr]"
                                                                : "md:grid-cols-[1.05fr_0.95fr]"
                                                        }`}
                                                    >
                                                        {isEven ? (
                                                            <>
                                                                <DetailImageBlock imageUrl={section.image_url} caption={section.content_text} />
                                                                <div className="md:pt-1">
                                                                    <h3 className="text-2xl font-semibold leading-tight text-[#444]">
                                                                        {sectionTitle}
                                                                    </h3>
                                                                    <p className="mt-3 text-base leading-6 text-[#444]/95 sm:text-[18px] sm:leading-[1.45]">
                                                                        {section.content_text}
                                                                    </p>
                                                                </div>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <div className="md:pt-1">
                                                                    <h3 className="text-2xl font-semibold leading-tight text-[#444]">
                                                                        {sectionTitle}
                                                                    </h3>
                                                                    <p className="mt-3 text-base leading-6 text-[#444]/95 sm:text-[18px] sm:leading-[1.45]">
                                                                        {section.content_text}
                                                                    </p>
                                                                </div>
                                                                <DetailImageBlock imageUrl={section.image_url} />
                                                            </>
                                                        )}
                                                    </section>
                                                );
                                            }

                                            if (section.image_url && !section.content_text) {
                                                const isSectionVideo = section.image_url.match(/\.mp4($|\?)/i);
                                                return (
                                                    <section key={section.id || idx} className="space-y-5">
                                                        <h3 className="text-center text-2xl font-semibold leading-tight text-[#444]">
                                                            {sectionTitle}
                                                        </h3>
                                                        <div
                                                            className="relative h-55 w-full overflow-hidden rounded-3xl bg-[#d9d9d9] bg-cover bg-center sm:h-84.5"
                                                            style={!isSectionVideo ? { backgroundImage: `url(${section.image_url})` } : undefined}
                                                            role={!isSectionVideo ? "img" : undefined}
                                                            aria-label={!isSectionVideo ? sectionTitle : undefined}
                                                        >
                                                            {isSectionVideo && (
                                                                <video
                                                                    src={section.image_url}
                                                                    autoPlay
                                                                    loop
                                                                    muted
                                                                    playsInline
                                                                    className="absolute inset-0 h-full w-full object-cover"
                                                                    aria-label={sectionTitle}
                                                                />
                                                            )}
                                                        </div>
                                                    </section>
                                                );
                                            }

                                            return (
                                                <section key={section.id || idx} className="space-y-3">
                                                    <h3 className="text-2xl font-semibold leading-tight text-[#444]">
                                                        {sectionTitle}
                                                    </h3>
                                                    {section.content_text ? (
                                                        <p className="text-base leading-6 text-[#444]/95 sm:text-[18px] sm:leading-[1.45]">
                                                            {section.content_text}
                                                        </p>
                                                    ) : null}
                                                </section>
                                            );
                                        })
                                    ) : !isLoadingDetail ? (
                                        <section className="grid gap-5 md:grid-cols-[0.95fr_1.05fr] md:items-start md:gap-8">
                                            <DetailImageBlock imageUrl={null} caption={description} />
                                            <div className="md:pt-1">
                                                <h3 className="text-2xl font-semibold leading-tight text-[#444]">
                                                    Overview
                                                </h3>
                                                <p className="mt-3 text-base leading-6 text-[#444]/95 sm:text-[18px] sm:leading-[1.45]">
                                                    {description}
                                                </p>
                                            </div>
                                        </section>
                                    ) : null}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            ) : null}
        </AnimatePresence>
    );
}

