"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CloseIcon } from "@/lib/constants";
import { supabase, ProjectSection } from "@/lib/supabase";

type CaseStudyDetailSheetProps = {
    open: boolean;
    caseStudyId: string | null;
    title: string;
    description: string;
    onClose: () => void;
};

export function CaseStudyDetailSheet({
    open,
    caseStudyId,
    title,
    description,
    onClose,
}: CaseStudyDetailSheetProps) {
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
        if (!open || !caseStudyId) {
            setSections([]);
            return;
        }

        let isMounted = true;

        const loadCaseStudyDetail = async () => {
            setIsLoadingDetail(true);

            const { data, error } = await supabase
                .from("project_sections")
                .select("*")
                .eq("project_id", caseStudyId)
                .order("sequence_order", { ascending: true });

            if (!isMounted) {
                return;
            }

            if (error || !data) {
                setSections([]);
                setIsLoadingDetail(false);
                return;
            }

            setSections(data as ProjectSection[]);
            setIsLoadingDetail(false);
        };

        loadCaseStudyDetail();

        return () => {
            isMounted = false;
        };
    }, [open, caseStudyId]);

    const mainImageUrl = sections.find((s) => s.image_url)?.image_url || 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80';

    return (
        <AnimatePresence>
            {open ? (
                <motion.div
                    className="fixed inset-0 z-50 flex items-end justify-center bg-black/30 backdrop-blur-[2px]"
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
                        aria-label={`${title} case study details`}
                        className="relative flex h-full w-full flex-col md:flex-row overflow-hidden bg-white shadow-[0_-24px_80px_rgba(0,0,0,0.24)]"
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        exit={{ y: "100%" }}
                        transition={{ type: "spring", stiffness: 140, damping: 20 }}
                        onClick={(event) => event.stopPropagation()}
                    >
                        {/* Close button (Mobile view) */}
                        <button
                            type="button"
                            onClick={onClose}
                            aria-label="Close case study details"
                            className="absolute right-4 top-4 z-20 rounded-full bg-black/5 p-2 backdrop-blur-md transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0392ea]/30 md:hidden"
                        >
                            <CloseIcon className="h-6 w-6 text-black" />
                        </button>

                        {/* Left Side: Scrollable Text Content */}
                        <div className="relative flex w-full md:w-1/2 flex-col overflow-y-auto px-6 py-12 md:px-12 md:py-16 lg:px-20 lg:py-24">
                            <div className="w-full max-w-2xl">
                                <h2 className="font-serif text-[clamp(2.5rem,4.5vw,3.5rem)] leading-none text-black">
                                    {title}
                                </h2>

                                {isLoadingDetail ? (
                                    <p className="mt-6 text-sm text-[#666] md:text-base">Loading case study details...</p>
                                ) : null}

                                <div className="mt-10 space-y-10 md:mt-12 md:space-y-12">
                                    {sections.length > 0 ? (
                                        sections.map((section, idx) => (
                                            <section key={section.id || idx}>
                                                {section.title ? (
                                                    <h3 className="text-2xl font-semibold leading-tight text-[#444]">
                                                        {section.title}
                                                    </h3>
                                                ) : null}
                                                {section.content_text ? (
                                                    <p className="mt-4 text-base leading-relaxed text-[#444]/95 md:text-lg">
                                                        {section.content_text}
                                                    </p>
                                                ) : null}
                                            </section>
                                        ))
                                    ) : !isLoadingDetail ? (
                                        <>
                                            <section>
                                                <h3 className="text-2xl font-semibold leading-tight text-[#444]">
                                                    Overview
                                                </h3>
                                                <p className="mt-4 text-base leading-relaxed text-[#444]/95 md:text-lg">
                                                    {description}
                                                </p>
                                            </section>
                                        </>
                                    ) : null}
                                </div>
                            </div>
                        </div>

                        {/* Right Side: Static Picture */}
                        <div className="relative hidden w-full md:block md:w-1/2">
                            <button
                                type="button"
                                onClick={onClose}
                                aria-label="Close case study details"
                                className="absolute right-6 top-6 z-20 rounded-full bg-black/20 p-2 backdrop-blur-md transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                            >
                                <CloseIcon className="h-6 w-6 text-white drop-shadow-md" />
                            </button>
                            <div
                                className="h-full w-full bg-[#f0f0f0] bg-cover bg-center"
                                style={{ backgroundImage: `url(${mainImageUrl})` }}
                                role="img"
                                aria-label="Case study main picture"
                            />
                        </div>
                    </motion.div>
                </motion.div>
            ) : null}
        </AnimatePresence>
    );
}

