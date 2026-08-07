"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CloseIcon, DownloadIcon, SendIcon } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { getResumeUrl, submitResumeRequest } from "@/app/actions/resume";

type ResumeModalProps = {
    open: boolean;
    onClose: () => void;
};

export function ResumeModal({ open, onClose }: ResumeModalProps) {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [message, setMessage] = useState("");
    const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);
    const [isLoading, setIsLoading] = useState(false);

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

    const handleSend = () => {
        setIsLoading(true);
        setStatus(null);

        void submitResumeRequest({ email, name, message })
            .then((result) => {
                setStatus({
                    type: result.success ? "success" : "error",
                    message: result.message || result.error || "Request processed",
                });

                if (result.success) {
                    setEmail("");
                    setName("");
                    setMessage("");
                }
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    const handleDownload = () => {
        setIsLoading(true);
        setStatus(null);

        void getResumeUrl()
            .then((url) => {
                if (!url) {
                    setStatus({ type: "error", message: "Resume unavailable." });
                    return;
                }

                window.open(url, "_blank", "noopener,noreferrer");
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    return (
        <AnimatePresence>
            {open ? (
                <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4 py-6"
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
                        aria-labelledby="resume-modal-title"
                        className="relative flex w-full max-w-lg flex-col overflow-hidden rounded-3xl bg-white shadow-2xl"
                        initial={{ scale: 0.96, y: 18 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.96, y: 18 }}
                        transition={{ type: "spring", stiffness: 180, damping: 20 }}
                        onClick={(event) => event.stopPropagation()}
                    >
                        <button
                            type="button"
                            onClick={onClose}
                            aria-label="Close resume modal"
                            className="absolute right-5 top-5 z-10 rounded-full p-1.5 text-[#555] transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0392ea]/30"
                        >
                            <CloseIcon strokeWidth={1.8} />
                        </button>

                        <div className="flex flex-col px-5 pb-5 pt-14 sm:px-8 sm:pb-6 sm:pt-16">
                            <h2
                                id="resume-modal-title"
                                className="mx-auto text-center text-xl font-semibold leading-snug text-[#4a4a4a] sm:text-2xl"
                            >
                                How would you like to receive my resume?
                            </h2>

                            <div className="mt-8 rounded-2xl border border-[#d9d9d9] p-4 sm:p-5">
                                <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-5">
                                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[10px] bg-[#d9ecff] text-[#1397f3]">
                                        <DownloadIcon className="h-7 w-7" strokeWidth={2.2} />
                                    </div>

                                    <div className="min-w-0 flex-1 text-center text-base text-[#4a4a4a] sm:text-left">
                                        <span className="block truncate sm:inline">Kevin_Resume.pdf</span>
                                    </div>

                                    <div className="flex shrink-0 items-center gap-3">
                                        <div className="text-sm text-[#767676]">
                                            PDF
                                        </div>

                                        <Button
                                            type="button"
                                            onClick={handleDownload}
                                            disabled={isLoading}
                                            className="h-11 bg-[#1397f3] px-5 text-base font-medium text-white hover:bg-[#0f8ae0]"
                                        >
                                            {isLoading ? "Loading..." : "Download"}
                                        </Button>
                                    </div>
                                </div>
                            </div>

                            <p className="mt-6 text-center text-base text-[#4a4a4a]">
                                or
                            </p>

                            <form
                                className="mt-6 rounded-2xl border border-[#d9d9d9] p-4 sm:p-5"
                                onSubmit={(event) => {
                                    event.preventDefault();
                                    handleSend();
                                }}
                            >
                                <div className="grid gap-4 lg:grid-cols-2">
                                    <div>
                                        <Label
                                            htmlFor="resume-name"
                                            className="mb-2 block text-sm font-semibold text-[#7a7a7a]"
                                        >
                                            Name
                                        </Label>
                                        <Input
                                            id="resume-name"
                                            type="text"
                                            value={name}
                                            onChange={(event) => setName(event.target.value)}
                                            placeholder="Your name"
                                            className="h-11 border-[#e2e2e2] px-4 text-base placeholder:text-[#8c8c8c] focus-visible:border-[#1397f3] focus-visible:ring-[#1397f3]/20"
                                        />
                                    </div>

                                    <div>
                                        <Label
                                            htmlFor="resume-email"
                                            className="mb-2 block text-sm font-semibold text-[#7a7a7a]"
                                        >
                                            Email
                                        </Label>
                                        <Input
                                            id="resume-email"
                                            type="email"
                                            value={email}
                                            onChange={(event) => setEmail(event.target.value)}
                                            placeholder="example@domain.com"
                                            className="h-11 border-[#e2e2e2] px-4 text-base placeholder:text-[#8c8c8c] focus-visible:border-[#1397f3] focus-visible:ring-[#1397f3]/20"
                                        />
                                    </div>

                                    <div className="lg:col-span-2">
                                        <Label
                                            htmlFor="resume-message"
                                            className="mb-2 block text-sm font-semibold text-[#7a7a7a]"
                                        >
                                            Message
                                        </Label>
                                        <Textarea
                                            id="resume-message"
                                            value={message}
                                            onChange={(event) => setMessage(event.target.value)}
                                            placeholder="Optional message"
                                            className="min-h-24 border-[#e2e2e2] px-4 py-3 text-base placeholder:text-[#8c8c8c] focus-visible:border-[#1397f3] focus-visible:ring-[#1397f3]/20"
                                        />
                                    </div>

                                    <Button
                                        type="submit"
                                        disabled={isLoading}
                                        className="h-11 bg-[#1397f3] px-6 text-base font-medium text-white hover:bg-[#0f8ae0] lg:col-span-2"
                                    >
                                        {isLoading ? "Sending..." : "Send Resume Request"}
                                        <SendIcon className="ml-2 h-5 w-5" />
                                    </Button>
                                </div>
                            </form>

                            {status ? (
                                <div className={`mt-4 rounded-2xl px-4 py-3 text-sm ${status.type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                                    {status.message}
                                </div>
                            ) : null}

                            <div className="mt-8 border-t border-[#d9d9d9] pt-4 text-center text-sm text-[#73737d]">
                                Thank you for your interest!
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            ) : null}
        </AnimatePresence>
    );
}