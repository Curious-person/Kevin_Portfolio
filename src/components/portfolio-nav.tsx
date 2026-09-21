"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ResumeModal } from "@/components/resume-modal";
import { Menu, X } from "lucide-react";

type PortfolioNavProps = {
    active?: "home" | "about" | "contact";
    variant?: "white" | "blue";
};

export function PortfolioNav({ active, variant = "blue" }: PortfolioNavProps) {
    const [isResumeOpen, setIsResumeOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    
    const wrapperRef = useRef<HTMLDivElement>(null);
    const drawerRef = useRef<HTMLDivElement>(null);
    
    const itemBase = "transition-all duration-200 px-4 py-2 rounded-lg hover:bg-[#3e4451]";
    const activeClass = "bg-[#4e5461] text-white font-semibold";
    const mobileItemBase = "block text-lg font-medium px-4 py-3 rounded-xl transition-all duration-200 hover:bg-[#3e4451]";

    useGSAP(() => {
        if (!wrapperRef.current || !drawerRef.current) return;
        
        if (isMobileMenuOpen) {
            // Fade in the backdrop/wrapper
            gsap.to(wrapperRef.current, {
                duration: 0.3,
                autoAlpha: 1,
            });
            // Slide in the drawer
            gsap.to(drawerRef.current, {
                x: 0,
                duration: 0.4,
                ease: "power3.out",
            });
        } else {
            // Slide out the drawer
            gsap.to(drawerRef.current, {
                x: "100%",
                duration: 0.3,
                ease: "power2.in",
            });
            // Fade out the backdrop/wrapper slightly after
            gsap.to(wrapperRef.current, {
                duration: 0.3,
                delay: 0.1,
                autoAlpha: 0,
            });
        }
    }, [isMobileMenuOpen]);

    return (
        <>
            <div className="absolute inset-x-0 top-0 z-50 w-full px-4 sm:px-8 lg:px-10">
                <header className="mx-auto flex w-full max-w-280 items-center justify-between gap-6 pt-4 text-white">
                    <Link
                        href="/"
                        className={`font-serif text-xl italic tracking-tight sm:text-2xl ${variant === "white" ? "text-white" : "text-[#0392ea]"
                            }`}
                    >
                        Kevin Abgao
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden rounded-lg bg-[#2e3441] px-6 py-3 text-sm font-medium md:block">
                        <ul className="flex items-center gap-12">
                            <li>
                                <Link
                                    href="/"
                                    className={`${itemBase} ${active === "home" ? activeClass : "text-gray-300"}`}
                                >
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/about"
                                    className={`${itemBase} ${active === "about" ? activeClass : "text-gray-300"}`}
                                >
                                    About me
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/contact"
                                    className={`${itemBase} ${active === "contact" ? activeClass : "text-gray-300"}`}
                                >
                                    Contact
                                </Link>
                            </li>
                            <li>
                                <button
                                    type="button"
                                    onClick={() => setIsResumeOpen(true)}
                                    className={`${itemBase} text-gray-300`}
                                >
                                    Resume
                                </button>
                            </li>
                        </ul>
                    </nav>

                    {/* Mobile Hamburger Button */}
                    <button 
                        className={`md:hidden rounded-lg p-2 ${variant === "white" ? "text-white" : "text-[#0392ea]"}`}
                        onClick={() => setIsMobileMenuOpen(true)}
                        aria-label="Open menu"
                    >
                        <Menu size={28} />
                    </button>

                    <div className="hidden w-40 md:block" />
                </header>
            </div>

            {/* Mobile Menu Drawer Wrapper */}
            <div 
                ref={wrapperRef}
                className="fixed inset-0 z-[60] flex justify-end invisible opacity-0"
            >
                {/* Backdrop overlay */}
                <div 
                    className="absolute inset-0 bg-black/40 backdrop-blur-sm" 
                    onClick={() => setIsMobileMenuOpen(false)}
                />
                
                {/* Drawer Content */}
                <div 
                    ref={drawerRef}
                    className="relative flex h-full w-[280px] flex-col bg-[#2e3441] text-white shadow-2xl p-6"
                    style={{ transform: "translateX(100%)" }}
                >
                    <div className="flex items-center justify-end mb-10">
                        <button 
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="p-2 text-gray-300 hover:text-white rounded-lg hover:bg-[#3e4451]"
                            aria-label="Close menu"
                        >
                            <X size={24} />
                        </button>
                    </div>

                    <nav className="flex flex-col gap-4">
                        <Link
                            href="/"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={`${mobileItemBase} ${active === "home" ? activeClass : "text-gray-300"}`}
                        >
                            Home
                        </Link>
                        <Link
                            href="/about"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={`${mobileItemBase} ${active === "about" ? activeClass : "text-gray-300"}`}
                        >
                            About me
                        </Link>
                        <Link
                            href="/contact"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={`${mobileItemBase} ${active === "contact" ? activeClass : "text-gray-300"}`}
                        >
                            Contact
                        </Link>
                        <button
                            type="button"
                            onClick={() => {
                                setIsMobileMenuOpen(false);
                                setIsResumeOpen(true);
                            }}
                            className={`text-left ${mobileItemBase} text-gray-300`}
                        >
                            Resume
                        </button>
                    </nav>
                </div>
            </div>

            <ResumeModal open={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
        </>
    );
}
