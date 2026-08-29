"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CloseIcon } from "@/lib/constants";
import { supabase, ProjectDetail } from "@/lib/supabase";

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
    const [caseStudyDetail, setCaseStudyDetail] = useState<ProjectDetail | null>(null);
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
            setCaseStudyDetail(null);
            return;
        }

        let isMounted = true;

        const loadCaseStudyDetail = async () => {
            setIsLoadingDetail(true);

            // We're querying project_details table using the case study ID, assuming they share details table
            // or you can change this to case_study_details if you have a separate table.
            const { data, error } = await supabase
                .from("project_details")
                .select("*")
                .eq("project_id", caseStudyId)
                .maybeSingle();

            if (!isMounted) {
                return;
            }

            if (error) {
                setCaseStudyDetail(null);
                setIsLoadingDetail(false);
                return;
            }

            setCaseStudyDetail((data as ProjectDetail | null) ?? null);
            setIsLoadingDetail(false);
        };

        loadCaseStudyDetail();

        return () => {
            isMounted = false;
        };
    }, [open, caseStudyId]);

    const section1Title = caseStudyDetail?.section1_title || "Overview";
    const section1Text = caseStudyDetail?.section1_text || description;
    const section1ImageUrl = caseStudyDetail?.section1_image_url;

    const section2Title = caseStudyDetail?.section2_title || "Process";
    const section2Text = caseStudyDetail?.section2_text || description;
    const section2ImageUrl = caseStudyDetail?.section2_image_url;

    const section3Title = caseStudyDetail?.section3_title || "Result";
    const section3ImageUrl = caseStudyDetail?.section3_image_url;

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
                                    <section>
                                        <h3 className="text-2xl font-semibold leading-tight text-[#444]">
                                            {section1Title}
                                        </h3>
                                        <p className="mt-4 text-base leading-relaxed text-[#444]/95 md:text-lg">
                                            {section1Text}
                                        </p>
                                    </section>

                                    <section>
                                        <h3 className="text-2xl font-semibold leading-tight text-[#444]">
                                            {section2Title}
                                        </h3>
                                        <p className="mt-4 text-base leading-relaxed text-[#444]/95 md:text-lg">
                                            {section2Text}
                                        </p>
                                    </section>
                                    
                                    <section>
                                        <h3 className="text-2xl font-semibold leading-tight text-[#444]">
                                            {section3Title}
                                        </h3>
                                        {/* Result section usually has the image, but since we are moving it to the right, we'll just keep the title if they want to add text later */}
                                    </section>
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
                                style={{ backgroundImage: `url(${section1ImageUrl || section3ImageUrl || section2ImageUrl || 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80'})` }}
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
