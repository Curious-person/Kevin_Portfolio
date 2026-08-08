"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CloseIcon } from "@/lib/constants";
import { supabase, ProjectDetail } from "@/lib/supabase";

type ProjectDetailSheetProps = {
    open: boolean;
    projectId: string | null;
    title: string;
    description: string;
    onClose: () => void;
};

function DetailImageBlock({
    imageUrl,
    caption,
}: {
    imageUrl?: string | null;
    caption?: string;
}) {
    return (
        <div className="flex flex-col items-center gap-2">
            <div
                className="h-55 w-full rounded-3xl bg-[#d9d9d9] bg-cover bg-center sm:h-72"
                style={imageUrl ? { backgroundImage: `url(${imageUrl})` } : undefined}
                role="img"
                aria-label={caption || "Project detail image"}
            />
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
    const [projectDetail, setProjectDetail] = useState<ProjectDetail | null>(null);
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
            setProjectDetail(null);
            return;
        }

        let isMounted = true;

        const loadProjectDetail = async () => {
            setIsLoadingDetail(true);

            const { data, error } = await supabase
                .from("project_details")
                .select("*")
                .eq("project_id", projectId)
                .maybeSingle();

            if (!isMounted) {
                return;
            }

            if (error) {
                setProjectDetail(null);
                setIsLoadingDetail(false);
                return;
            }

            setProjectDetail((data as ProjectDetail | null) ?? null);
            setIsLoadingDetail(false);
        };

        loadProjectDetail();

        return () => {
            isMounted = false;
        };
    }, [open, projectId]);

    const section1Title = projectDetail?.section1_title || "Overview";
    const section1Text = projectDetail?.section1_text || description;
    const section1ImageUrl = projectDetail?.section1_image_url;

    const section2Title = projectDetail?.section2_title || "Process";
    const section2Text = projectDetail?.section2_text || description;
    const section2ImageUrl = projectDetail?.section2_image_url;

    const section3Title = projectDetail?.section3_title || "Result";
    const section3ImageUrl = projectDetail?.section3_image_url;

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
                                    <p className="mt-6 text-sm text-[#666] sm:text-base">Loading project details...</p>
                                ) : null}

                                <div className="mt-10 w-full space-y-14 sm:mt-12 sm:space-y-20">
                                    <section className="grid gap-5 md:grid-cols-[0.95fr_1.05fr] md:items-start md:gap-8">
                                        <DetailImageBlock imageUrl={section1ImageUrl} caption={section1Text} />
                                        <div className="md:pt-1">
                                            <h3 className="text-2xl font-semibold leading-tight text-[#444]">
                                                {section1Title}
                                            </h3>
                                            <p className="mt-3 text-base leading-6 text-[#444]/95 sm:text-[18px] sm:leading-[1.45]">
                                                {section1Text}
                                            </p>
                                        </div>
                                    </section>

                                    <section className="grid gap-5 md:grid-cols-[1.05fr_0.95fr] md:items-start md:gap-8">
                                        <div className="md:pt-1">
                                            <h3 className="text-2xl font-semibold leading-tight text-[#444]">
                                                {section2Title}
                                            </h3>
                                            <p className="mt-3 text-base leading-6 text-[#444]/95 sm:text-[18px] sm:leading-[1.45]">
                                                {section2Text}
                                            </p>
                                        </div>
                                        <DetailImageBlock imageUrl={section2ImageUrl} />
                                    </section>

                                    <section className="space-y-5">
                                        <h3 className="text-center text-2xl font-semibold leading-tight text-[#444]">
                                            {section3Title}
                                        </h3>
                                        <div
                                            className="h-55 w-full rounded-3xl bg-[#d9d9d9] bg-cover bg-center sm:h-84.5"
                                            style={section3ImageUrl ? { backgroundImage: `url(${section3ImageUrl})` } : undefined}
                                            role="img"
                                            aria-label="Project result image"
                                        />
                                    </section>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            ) : null}
        </AnimatePresence>
    );
}
