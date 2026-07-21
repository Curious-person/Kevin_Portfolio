import Image from "next/image";
import Link from "next/link";
import { PortfolioNav } from "@/components/portfolio-nav";

const heroTexture = "https://www.figma.com/api/mcp/asset/6f79f46d-a9b4-46f2-b63f-fc162b3a39dc";
const cardTexture = "https://www.figma.com/api/mcp/asset/a96ca185-a061-4d15-b5f7-82de2258258b";
const githubIcon = "https://www.figma.com/api/mcp/asset/334effc4-2810-4a7c-bfc9-0bc867779d5c";
const linkedinIcon = "https://www.figma.com/api/mcp/asset/79dc6d3c-400b-49a7-a019-960f128a13fe";
const facebookIcon = "https://www.figma.com/api/mcp/asset/cc52187f-0847-4b03-bc53-7055d5f2ba6c";
const instagramIcon = "https://www.figma.com/api/mcp/asset/873921ee-4f76-47e5-9015-12fe7d742968";
const arrowRightIcon = "https://www.figma.com/api/mcp/asset/89ba94b2-7af9-43f5-b345-2f5b31d26f7c";

const skills = [
  "USER RESEARCH",
  "USABILITY TESTING",
  "LANDING PAGE DESIGN",
  "FRONTEND DEVELOPMENT",
  "BACKEND DEVELOPMENT",
  "REST API INTEGRATION",
  "AUTHENTICATION",
];

const stats = [
  { value: "10", label: "Projects", offset: "lg:translate-y-0" },
  { value: "3", label: "Designs", offset: "lg:translate-y-3" },
  { value: "4", label: "Case studies", offset: "lg:translate-y-6" },
];

const projects = [
  {
    id: "project-1",
    number: "Project 1",
    title: "NU Space",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    tag: "System Design",
  },
  {
    id: "project-2",
    number: "Project 1",
    title: "NU Space",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    tag: "System Design",
  },
  {
    id: "project-3",
    number: "Project 1",
    title: "NU Space",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    tag: "System Design",
  },
];

function NavBar() {
  return <PortfolioNav active="home" />;
}

function StatCard({
  value,
  label,
  offset,
}: {
  value: string;
  label: string;
  offset: string;
}) {
  return (
    <div
      className={`relative h-49.75 w-49.75 overflow-hidden rounded-3xl bg-[#444] shadow-[0_12px_30px_rgba(0,0,0,0.12)] ${offset}`}
    >
      <div className="absolute inset-2.5 overflow-hidden rounded-[20px]">
        <Image
          src={heroTexture}
          alt="Mountain texture"
          fill
          className="object-cover"
          sizes="199px"
          unoptimized
        />
      </div>
      <div className="absolute inset-x-0 bottom-0 h-29.5">
        <Image
          src={cardTexture}
          alt="Card overlay texture"
          fill
          className="object-cover"
          sizes="199px"
          unoptimized
        />
      </div>
      <div className="absolute inset-x-0 bottom-4 left-4 right-4 text-white">
        <p className="text-[48px] font-bold leading-none">{value}</p>
        <p className="mt-1 text-sm font-light">{label}</p>
      </div>
    </div>
  );
}

function ProjectCard({
  number,
  title,
  description,
  tag,
}: {
  number: string;
  title: string;
  description: string;
  tag: string;
}) {
  return (
    <article className="mx-auto grid max-w-200.25 gap-5 rounded-3xl bg-[#f2f2f2] p-6 shadow-[0_8px_28px_rgba(0,0,0,0.05)] md:grid-cols-[1fr_1.35fr] md:items-start">
      <div className="flex h-full flex-col justify-between gap-4">
        <div>
          <p className="text-sm text-foreground/60">{number}</p>
          <h3 className="mt-3 font-serif text-[48px] leading-none text-foreground">
            {title}
          </h3>
          <p className="mt-4 max-w-67.5 text-sm leading-5 text-foreground/75">
            {description}
          </p>
        </div>

        <span className="inline-flex w-fit rounded-full bg-white px-4 py-1.5 text-sm text-foreground shadow-sm">
          {tag}
        </span>
      </div>

      <div className="relative min-h-67.5 overflow-hidden rounded-[20px] bg-[#dde3e8]">
        <Image
          src={heroTexture}
          alt={`${title} preview`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 457px"
          unoptimized
        />
      </div>
    </article>
  );
}

function SocialIcon({ src, label }: { src: string; label: string }) {
  return (
    <a
      href="#"
      aria-label={label}
      className="inline-flex h-9 w-9 items-center justify-center transition-transform hover:scale-105"
    >
      <Image src={src} alt="" width={36} height={36} unoptimized />
    </a>
  );
}

export default function Home() {
  return (
    <main className="bg-white text-foreground">
      <section id="home" className="bg-[#0392ea] text-white">
        <div className="mx-auto max-w-432 px-4 pb-16 pt-5 sm:px-8 lg:px-10">
          <NavBar />

          <div className="mx-auto flex max-w-275 flex-col items-center text-center">
            <div className="mt-24 rounded-md bg-white px-3 py-1 text-sm text-[#0392ea] shadow-sm">
              Hi, I&apos;m Kevin
            </div>

            <h1 className="mt-6 font-serif text-[clamp(4rem,9vw,7.25rem)] leading-[0.95] tracking-tight">
              Design Engineer
            </h1>

            <p className="mt-5 max-w-170 text-sm leading-5 text-white/90 sm:text-base">
              I have designed and worked for B2B, SaaS, B2C tools. Taking initiatives
              from a grounded perspective.
            </p>

            <div className="mt-24 w-full overflow-hidden rounded-sm border border-white/80 px-4 py-3">
              <p className="whitespace-nowrap text-[11px] uppercase tracking-[0.24em] text-white/90 sm:text-[13px] sm:tracking-[0.28em]">
                {skills.join(" | ")}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-4 pb-20 pt-20 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-270">
          <div className="flex flex-wrap items-start justify-center gap-6 sm:gap-8">
            {stats.map((stat) => (
              <StatCard key={stat.label} {...stat} />
            ))}
          </div>

          <h2 className="mt-16 text-center font-serif text-[clamp(3rem,4vw,4.5rem)] leading-none text-[#444]">
            Projects
          </h2>

          <div className="mt-10 space-y-6">
            {projects.map((project) => (
              <ProjectCard key={project.id} {...project} />
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="px-4 pb-6">
        <div className="mx-auto max-w-410 rounded-3xl bg-[#0392ea] px-6 py-8 text-white sm:px-8 lg:px-17.75 lg:py-10">
          <div className="grid gap-10 lg:grid-cols-[1.6fr_0.8fr_0.8fr] lg:gap-16">
            <div>
              <h2 className="font-serif text-[clamp(3.5rem,7vw,7.5rem)] leading-none">
                Let&apos;s Talk
              </h2>

              <p className="mt-8 max-w-155 text-base leading-7 text-white/92 sm:text-xl">
                Empowering businesses with beautiful interface by utilizing tools to
                improve workflow and user experience.
              </p>

              <Link
                href="/contact"
                className="mt-5 inline-flex h-10 items-center gap-2 rounded-md bg-[#2e3441] px-4 text-sm text-white transition-transform hover:-translate-y-0.5"
              >
                Get Started
                <Image src={arrowRightIcon} alt="" width={20} height={20} unoptimized />
              </Link>

              <div className="mt-6 flex items-center gap-4">
                <SocialIcon src={githubIcon} label="GitHub" />
                <SocialIcon src={linkedinIcon} label="LinkedIn" />
                <SocialIcon src={facebookIcon} label="Facebook" />
                <SocialIcon src={instagramIcon} label="Instagram" />
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold">Sitemap</h3>
              <ul className="mt-6 space-y-4 text-lg text-white/95">
                <li>
                  <a href="#home" className="underline underline-offset-4">
                    Homepage
                  </a>
                </li>
                <li>
                  <a href="#about">About me</a>
                </li>
                <li>
                  <Link href="/contact">Contact</Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-2xl font-bold">Legal</h3>
              <ul className="mt-6 space-y-4 text-lg text-white/95">
                <li>
                  <a href="#">Privacy Policy</a>
                </li>
                <li>
                  <a href="#">Terms of Services</a>
                </li>
              </ul>
            </div>
          </div>

          <p
            className="mt-10 bg-cover bg-center bg-clip-text text-center font-serif text-[clamp(4rem,10vw,10rem)] italic leading-none text-transparent"
            style={{ backgroundImage: `url(${heroTexture})` }}
          >
            Kevin Abgao
          </p>

          <p className="mt-2 text-center text-sm text-white/90">
            © 2026 Kevin Abgao. All rights reserved.
          </p>
        </div>
      </section>
    </main>
  );
}
