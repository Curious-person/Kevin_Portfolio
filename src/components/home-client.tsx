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
import { Project, CaseStudy, Design, Stats } from "@/lib/supabase";
import {
  ArrowRightIcon,
  githubIcon,
  linkedinIcon,
  facebookIcon,
  instagramIcon,
} from "@/lib/constants";

type PortfolioTab = "projects" | "designs" | "case_studies";

type HomeClientProps = {
  projects: Project[];
  caseStudies: CaseStudy[];
  designs: Design[];
  stats: Stats[];
  skills: string[];
};

export function HomeClient({
  projects,
  caseStudies,
  designs,
  stats,
  skills,
}: HomeClientProps) {
  const [activeTab, setActiveTab] = useState<PortfolioTab>("projects");
  const [selectedProject, setSelectedProject] = useState<Project | CaseStudy | null>(null);

  // Map backend stats data to correct layout structure
  // Ensuring the ids match the tabs ('projects', 'designs', 'case_studies')
  const formattedStats = stats.map((s) => ({
    id: s.id,
    value: s.value,
    label: s.label,
    offset: s.offset_class || "lg:translate-y-0",
  }));

  return (
    <main className="bg-white text-foreground">
      {/* Hero Section */}
      <section id="home" className="bg-[#0392ea] text-white">
        <div className="mx-auto max-w-432 px-4 pb-16 pt-28 sm:px-8 lg:px-10">
          <PortfolioNav active="home" variant="white" />

          <div className="mx-auto flex max-w-275 flex-col items-center text-center">
            <Badge className="mt-24">Hi, I&apos;m Kevin</Badge>

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

      {/* Tabs and Content Section */}
      <section className="bg-white px-4 pb-20 pt-20 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-270">
          {/* Dynamic StatCards as Tab Buttons */}
          <div
            className="flex flex-wrap items-start justify-center gap-6 sm:gap-8"
            role="tablist"
            aria-label="Portfolio sections"
          >
            {formattedStats.map((stat) => (
              <StatCard
                key={stat.id}
                value={stat.value}
                label={stat.label}
                offset={stat.offset}
                isActive={activeTab === stat.id}
                onClick={() => setActiveTab(stat.id as PortfolioTab)}
              />
            ))}
          </div>

          <h2 className="mt-16 text-center font-serif text-[clamp(3rem,4vw,4.5rem)] leading-none text-[#444] capitalize">
            {activeTab === "case_studies" ? "Case Studies" : activeTab}
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
                      number={project.number}
                      title={project.title}
                      description={project.description}
                      tag={project.tag}
                      imageUrl={project.image_url}
                      onClick={() => setSelectedProject(project)}
                    />
                  ))}
                
                {activeTab === "designs" && <DesignGallery designs={designs} />}
                
                {activeTab === "case_studies" &&
                  caseStudies.map((cs) => (
                    <ProjectCard
                      key={cs.id}
                      number={cs.number}
                      title={cs.title}
                      description={cs.description}
                      tag={cs.tag}
                      onClick={() => setSelectedProject(cs)}
                    />
                  ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Contact Section */}
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

      {/* Project Detail Sheet */}
      <ProjectDetailSheet
        open={selectedProject !== null}
        projectId={selectedProject?.id ?? null}
        title={selectedProject?.title ?? ""}
        description={selectedProject?.description ?? ""}
        onClose={() => setSelectedProject(null)}
      />
    </main>
  );
}
