import Image from "next/image";
import { PortfolioNav } from "@/components/portfolio-nav";

const portrait = "https://www.figma.com/api/mcp/asset/8d27202e-9c2e-43bd-81fc-eca475ae8485";
const graduationIcon = "https://www.figma.com/api/mcp/asset/40f3765d-bc27-4456-8d5e-a92968bc79e6";
const heartIcon = "https://www.figma.com/api/mcp/asset/504251d3-503c-4cba-a39b-5b5ec1fe5392";
const lightbulbIcon = "https://www.figma.com/api/mcp/asset/cf8dbdb5-4473-4636-9b59-110b444245fd";
const rulerIcon = "https://www.figma.com/api/mcp/asset/3fa04a32-a567-48e0-8f52-2c9e2ecf465a";
const mapPinIcon = "https://www.figma.com/api/mcp/asset/c39fa57b-25a6-4743-9acc-ec5578a842f4";

const experience = [
    {
        company: "Nexvision Innovations, Inc.",
        role: "Full-Stack and WordPress Developer Intern",
        dates: "February 2026 - April 2026",
    },
    {
        company: "Technology Services Office, NU Manila",
        role: "UI/UX Intern",
        dates: "December 2025 - February 2026",
    },
    {
        company: "Google Developer Groups Manila",
        role: "Technical Production Executive",
        dates: "July 2025 - September 2025",
    },
];

function InfoCard({
    title,
    description,
    icon,
    filled,
}: {
    title: string;
    description: string;
    icon: string;
    filled?: boolean;
}) {
    return (
        <article
            className={`rounded-[24px] border ${filled ? "border-transparent bg-[#b4e2ff]" : "border-[#d9d9d9] bg-white"} p-4 shadow-[0_8px_24px_rgba(0,0,0,0.02)]`}
        >
            <div className={`mb-8 flex h-8 w-8 items-center justify-center rounded-md ${filled ? "bg-white" : "bg-[#b4e2ff]"}`}>
                <Image src={icon} alt="" width={24} height={24} unoptimized />
            </div>
            <h3 className="text-[20px] font-bold text-[#444]">{title}</h3>
            <p className="mt-3 max-w-[337px] text-sm leading-[1.4] text-[#444]">
                {description}
            </p>
        </article>
    );
}

export default function AboutPage() {
    return (
        <main className="bg-white text-foreground">
            <section className="mx-auto min-h-screen max-w-[1728px] px-4 pb-10 sm:px-8 lg:px-[145px]">
                <PortfolioNav active="about" />

                <div className="mt-16 grid gap-8 lg:grid-cols-[299px_minmax(0,1fr)] lg:gap-10">
                    <div className="lg:pt-14">
                        <div className="relative h-[447px] w-full overflow-hidden rounded-[24px] bg-[#eef2f7]">
                            <Image src={portrait} alt="John Kevin D. Abgao" fill className="object-cover" sizes="299px" unoptimized />
                        </div>
                        <p className="mt-4 text-lg font-bold text-[#444]">John Kevin D. Abgao</p>
                        <div className="mt-1 flex items-center gap-2 text-sm text-[#71717a]">
                            <Image src={mapPinIcon} alt="" width={15} height={15} unoptimized />
                            <span>Antipolo, Rizal</span>
                        </div>
                    </div>

                    <div className="lg:pt-8">
                        <h1 className="max-w-[476px] font-serif text-[clamp(3rem,4vw,4rem)] leading-none text-black">
                            I design, build, and ship apps
                        </h1>

                        <div className="mt-6 grid gap-4 md:grid-cols-2">
                            <InfoCard
                                title="Background"
                                description="BSIT Graduate, with 1 year of development experience."
                                icon={graduationIcon}
                            />
                            <InfoCard
                                title="Core skills"
                                description="Frontend, Backend, UX Design, & AI Workflows"
                                icon={rulerIcon}
                            />
                            <InfoCard
                                title="What drives me"
                                description="I design for how people think, not how trends look."
                                icon={heartIcon}
                                filled
                            />
                            <InfoCard
                                title="Currently"
                                description="Building up a UX Case study, and integrating AI tools to leverage UIs."
                                icon={lightbulbIcon}
                                filled
                            />
                        </div>

                        <section className="mt-16 max-w-[763px]">
                            <h2 className="font-serif text-[clamp(2.5rem,3vw,3.5rem)] leading-none text-black">
                                Experience
                            </h2>

                            <div className="mt-8 space-y-6">
                                {experience.map((item, index) => (
                                    <div key={item.company} className="pb-4">
                                        <div className="flex flex-col gap-2 border-b border-[#e5e7eb] pb-4 lg:flex-row lg:items-start lg:justify-between lg:gap-6">
                                            <div>
                                                <p className="text-lg font-bold text-[#444]">{item.company}</p>
                                                <p className="text-base text-[#444]">{item.role}</p>
                                            </div>
                                            <p className="text-base italic text-[#444] lg:text-right">{item.dates}</p>
                                        </div>
                                        {index === experience.length - 1 ? null : <div className="h-px bg-[#e5e7eb]" />}
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>
                </div>
            </section>
        </main>
    );
}
