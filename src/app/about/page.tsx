import Image from "next/image";
import { PortfolioNav } from "@/components/portfolio-nav";
import { getExperience } from "@/app/actions/portfolio";
import { portrait, MapPinIcon, GraduationCapIcon, RulerIcon, HeartIcon, LightbulbIcon } from "@/lib/constants";

// Revalidate cache every hour
export const revalidate = 3600;

function InfoCard({
    title,
    description,
    icon: Icon,
    filled,
}: {
    title: string;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
    filled?: boolean;
}) {
    return (
        <article
            className={`rounded-[24px] border ${filled ? "border-transparent bg-[#b4e2ff]" : "border-[#d9d9d9] bg-white"} p-4 shadow-[0_8px_24px_rgba(0,0,0,0.02)]`}
        >
            <div className={`mb-8 flex h-8 w-8 items-center justify-center rounded-md ${filled ? "bg-white" : "bg-[#b4e2ff]"}`}>
                <Icon className="h-5 w-5" />
            </div>
            <h3 className="text-[20px] font-bold text-[#444]">{title}</h3>
            <p className="mt-3 max-w-[337px] text-sm leading-[1.4] text-[#444]">
                {description}
            </p>
        </article>
    );
}

/**
 * About Page Server Component.
 * Fetches professional history (Experience list) from Supabase dynamically.
 */
export default async function AboutPage() {
    const experience = await getExperience();

    return (
        <main className="bg-white text-foreground">
            <section className="mx-auto min-h-screen max-w-[1728px] px-4 pb-10 pt-28 sm:px-8 lg:px-[145px]">
                <PortfolioNav active="about" />

                <div className="mt-16 grid gap-8 lg:grid-cols-[299px_minmax(0,1fr)] lg:gap-10">
                    <div className="lg:pt-14">
                        <div className="relative h-[447px] w-full overflow-hidden rounded-[24px] bg-[#eef2f7]">
                            <Image src={portrait} alt="John Kevin D. Abgao" fill className="object-cover" sizes="299px" unoptimized />
                        </div>
                        <p className="mt-4 text-lg font-bold text-[#444]">John Kevin D. Abgao</p>
                        <div className="mt-1 flex items-center gap-2 text-sm text-[#71717a]">
                            <MapPinIcon className="h-4 w-4" />
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
                                icon={GraduationCapIcon}
                            />
                            <InfoCard
                                title="Core skills"
                                description="Frontend, Backend, UX Design, & AI Workflows"
                                icon={RulerIcon}
                            />
                            <InfoCard
                                title="What drives me"
                                description="I design for how people think, not how trends look."
                                icon={HeartIcon}
                                filled
                            />
                            <InfoCard
                                title="Currently"
                                description="Building up a UX Case study, and integrating AI tools to leverage UIs."
                                icon={LightbulbIcon}
                                filled
                            />
                        </div>

                        <section id="experience" className="mt-16 max-w-[763px]">
                            <h2 className="font-serif text-[clamp(2.5rem,3vw,3.5rem)] leading-none text-black">
                                Experience
                            </h2>

                            <div className="mt-8 space-y-6">
                                {experience.length > 0 ? (
                                    experience.map((item, index) => (
                                        <div key={item.id || item.company} className="pb-4">
                                            <div className="flex flex-col gap-2 border-b border-[#e5e7eb] pb-4 lg:flex-row lg:items-start lg:justify-between lg:gap-6">
                                                <div>
                                                    <p className="text-lg font-bold text-[#444]">{item.company}</p>
                                                    <p className="text-base text-[#444]">{item.role}</p>
                                                </div>
                                                <p className="text-base italic text-[#444] lg:text-right">{item.dates}</p>
                                            </div>
                                            {index === experience.length - 1 ? null : <div className="h-px bg-[#e5e7eb]" />}
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-base text-neutral-500 italic">No experience entries found.</p>
                                )}
                            </div>
                        </section>
                    </div>
                </div>
            </section>
        </main>
    );
}
