import Image from "next/image";
import { PortfolioNav } from "@/components/portfolio-nav";

const sendIcon = "https://www.figma.com/api/mcp/asset/21cb3597-7293-4cdc-b5b9-d4cc666b36b8";
const mapPinIcon = "https://www.figma.com/api/mcp/asset/66ca5eb6-9463-4ef4-babe-f3241b7c5eff";
const phoneIcon = "https://www.figma.com/api/mcp/asset/03b08046-eaa5-4557-98ad-94d0471e3109";
const messageIcon = "https://www.figma.com/api/mcp/asset/d5564aec-c365-493a-b0b6-766d7c882bf9";

function ContactPill({ icon, title, description }: { icon: string; title: string; description: string }) {
    return (
        <div className="flex items-start gap-4">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#f2f2f2]">
                <Image src={icon} alt="" width={24} height={24} unoptimized />
            </div>
            <div>
                <p className="text-lg font-bold text-[#444]">{title}</p>
                <p className="mt-1 text-sm leading-5 text-[#444]">{description}</p>
            </div>
        </div>
    );
}

function Field({ label, placeholder, className = "", type = "text" }: { label: string; placeholder: string; className?: string; type?: string }) {
    return (
        <label className={`flex flex-col gap-2 ${className}`}>
            <span className="text-[14px] font-semibold text-[#71717a]">{label}</span>
            <input
                type={type}
                placeholder={placeholder}
                className="h-10 w-full rounded-xl border border-[#e4e4e7] bg-white px-3 text-sm text-foreground outline-none placeholder:text-[#71717a] focus:border-[#0392ea]"
            />
        </label>
    );
}

export default function ContactPage() {
    return (
        <main className="bg-white text-foreground">
            <section className="mx-auto min-h-screen max-w-432 px-4 pb-10 sm:px-8 lg:px-36.25">
                <PortfolioNav active="contact" />

                <div className="mt-24 grid gap-12 lg:grid-cols-[468px_minmax(0,380px)] lg:justify-between lg:gap-16">
                    <div className="max-w-117">
                        <h1 className="font-serif text-[clamp(3rem,4vw,4rem)] leading-none text-black">
                            Have a project in mind?
                        </h1>
                        <p className="mt-4 text-base leading-6 text-[#444]">
                            Let’s build something incredible together. Whether you need a complete design system, a responsive web application, or just want to chat about user-centered design, drop me a line.
                        </p>

                        <div className="mt-8 space-y-6">
                            <ContactPill
                                icon={messageIcon}
                                title="Drop a message"
                                description="I’ll get back to you within 24 hours."
                            />
                            <ContactPill
                                icon={phoneIcon}
                                title="Book a Discovery Call"
                                description="Let’s talk architecture and interface — Available Mon-Fri, 9 AM to 6 PM."
                            />
                            <ContactPill
                                icon={mapPinIcon}
                                title="Based In"
                                description="Antipolo, Rizal (Available for remote work worldwide)"
                            />
                        </div>
                    </div>

                    <form className="w-full space-y-6">
                        <Field label="Your Name" placeholder="John Doe" />

                        <div className="grid gap-4 sm:grid-cols-2">
                            <Field label="Email" placeholder="example@domain.com" type="email" />
                            <Field label="Phone (optional)" placeholder="+1 332 245 666" type="tel" />
                        </div>

                        <Field label="Subject" placeholder="Which topic are you interested in?" />

                        <label className="flex flex-col gap-2">
                            <span className="text-[14px] font-semibold text-[#71717a]">Your message</span>
                            <textarea
                                placeholder="Type your message here."
                                className="min-h-30 w-full rounded-xl border border-[#e4e4e7] bg-white px-3 py-3 text-sm text-foreground outline-none placeholder:text-[#71717a] focus:border-[#0392ea]"
                            />
                        </label>

                        <button
                            type="submit"
                            className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-xl bg-[#0392ea] px-4 text-sm font-medium text-white transition-opacity hover:opacity-90"
                        >
                            Send Now
                            <Image src={sendIcon} alt="" width={16} height={16} unoptimized />
                        </button>
                    </form>
                </div>
            </section>
        </main>
    );
}
