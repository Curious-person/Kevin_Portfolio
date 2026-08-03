"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { PortfolioNav } from "@/components/portfolio-nav";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SkillsTicker } from "@/components/skills-ticker";
import { StatCard } from "@/components/stat-card";
import { ProjectCard } from "@/components/project-card";
import { DesignGallery } from "@/components/design-gallery";
import { ProjectDetailSheet } from "@/components/project-detail-sheet";
import { SocialIcon } from "@/components/social-icon";
import {
  ArrowRightIcon,
  githubIcon,
  linkedinIcon,
  facebookIcon,
  instagramIcon,
} from "@/lib/constants";

type PortfolioTab = "projects" | "designs" | "case-studies";

type PortfolioItem = {
  id: string;
  number: string;
  title: string;
  description: string;
  tag: string;
};

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
  { id: "projects", value: "10", label: "Projects", offset: "lg:translate-y-0" },
  { id: "designs", value: "3", label: "Designs", offset: "lg:translate-y-0" },
  { id: "case-studies", value: "4", label: "Case studies", offset: "lg:translate-y-0" },
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
    number: "Project 2",
    title: "NU Space",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    tag: "System Design",
  },
  {
    id: "project-3",
    number: "Project 3",
    title: "NU Space",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    tag: "System Design",
  },
];



const caseStudies = [
  {
    id: "case-1",
    number: "Case Study 1",
    title: "Onboarding Redesign",
    description:
      "An in-depth user research and design project aimed at identifying and fixing user retention leaks during onboarding, resulting in a 28% completion increase.",
    tag: "UX Research & Design",
  },
  {
    id: "case-2",
    number: "Case Study 2",
    title: "A11y Audit & Update",
    description:
      "A deep dive into WCAG 2.1 AAA accessibility auditing and user flows redesign for an enterprise platform serving 500k+ active users.",
    tag: "Web Accessibility",
  },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState<PortfolioTab>("projects");
  const [selectedProject, setSelectedProject] = useState<PortfolioItem | null>(null);

  return (
    <main className="bg-white text-foreground">
      <section id="home" className="bg-[#0392ea] text-white">
        <div className="mx-auto max-w-432 px-4 pb-16 pt-28 sm:px-8 lg:px-10">
          <PortfolioNav
            active="home"
            variant="white"
          />

          <div className="mx-auto flex max-w-275 flex-col items-center text-center">
            <Badge className="mt-24">
              Hi, I&apos;m Kevin
            </Badge>

            <h1 className="mt-6 font-serif text-[clamp(4rem,9vw,7.25rem)] leading-[0.95] tracking-tight">
              Design Engineer
            </h1>

            <p className="mt-5 max-w-170 text-sm leading-5 text-white/90 sm:text-base">
              I have designed and worked for B2B, SaaS, B2C tools. Taking initiatives
              from a grounded perspective.
            </p>

            <div className="mt-24 w-full">
              <SkillsTicker skills={skills} />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-4 pb-20 pt-20 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-270">
          <div className="flex flex-wrap items-start justify-center gap-6 sm:gap-8" role="tablist" aria-label="Portfolio sections">
            {stats.map((stat) => (
              <StatCard
                key={stat.label}
                {...stat}
                isActive={activeTab === stat.id}
                onClick={() => setActiveTab(stat.id as PortfolioTab)}
              />
            ))}
          </div>

          <h2 className="mt-16 text-center font-serif text-[clamp(3rem,4vw,4.5rem)] leading-none text-[#444] capitalize">
            {activeTab === "case-studies" ? "Case Studies" : activeTab}
          </h2>

          <div className="overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className={activeTab === "designs" ? "mt-10" : "mt-10 space-y-6"}
              >
                {activeTab === "projects" &&
                  projects.map((project) => (
                    <ProjectCard
                      key={project.id}
                      {...project}
                      onClick={() => setSelectedProject(project)}
                    />
                  ))}
                {activeTab === "designs" && <DesignGallery />}
                {activeTab === "case-studies" &&
                  caseStudies.map((cs) => (
                    <ProjectCard
                      key={cs.id}
                      {...cs}
                      onClick={() => setSelectedProject(cs)}
                    />
                  ))}
              </motion.div>
            </AnimatePresence>
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

              <Button
                render={<Link href="/contact" />}
                nativeButton={false}
                className="mt-5 h-10 gap-2 rounded-md bg-[#2e3441] px-4 text-sm font-normal text-white transition-transform hover:-translate-y-0.5 hover:bg-[#2e3441]/90"
              >
                Get Started
                <ArrowRightIcon className="h-5 w-5" />
              </Button>

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
                  <a href="#projects">Projects</a>
                </li>
                <li>
                  <a href="#contact">Contact</a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-2xl font-bold">Socials</h3>
              <ul className="mt-6 space-y-4 text-lg text-white/95">
                <li>
                  <a href="#">Github</a>
                </li>
                <li>
                  <a href="#">LinkedIn</a>
                </li>
                <li>
                  <a href="#">Instagram</a>
                </li>
                <li>
                  <a href="#">Facebook</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <ProjectDetailSheet
        open={selectedProject !== null}
        title={selectedProject?.title ?? ""}
        description={selectedProject?.description ?? ""}
        onClose={() => setSelectedProject(null)}
      />

    </main>
  );
}
