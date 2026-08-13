"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { PortfolioNav } from "@/components/portfolio-nav";

// Register useGSAP plugin
gsap.registerPlugin(useGSAP);
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SkillsTicker } from "@/components/skills-ticker";
import { StatCard } from "@/components/stat-card";
import { ProjectCard } from "@/components/project-card";
import { CaseStudyCard } from "@/components/case-study-card";
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
  const [isHovered, setIsHovered] = useState(false);
  const [isHoveringInteractive, setIsHoveringInteractive] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const vinylRef = useRef<HTMLImageElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 250, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useGSAP(() => {
    if (isHovered && vinylRef.current) {
      const tween = gsap.to(vinylRef.current, {
        rotation: 360,
        duration: 1.8, // Normal vinyl speed (~33.3 RPM)
        repeat: -1,
        ease: "none",
      });
      tweenRef.current = tween;

      if (isClicked) {
        tween.pause();
      }

      return () => {
        tween.kill();
      };
    }
  }, { dependencies: [isHovered] });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);

    const target = e.target as HTMLElement;
    const isInteractive = target.closest("a, button, [role='button'], input, select") !== null;
    setIsHoveringInteractive(isInteractive);
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsHovered(true);
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setIsHoveringInteractive(false);
    setIsClicked(false);
  };

  const handleMouseDown = () => {
    setIsClicked(true);
    if (tweenRef.current) {
      tweenRef.current.pause();
    }
  };

  const handleMouseUp = () => {
    setIsClicked(false);
    if (tweenRef.current) {
      tweenRef.current.play();
    }
  };

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
      <section
        id="home"
        className="relative bg-[#0392ea] text-white cursor-none overflow-hidden"
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      >
        {isHovered && (
          <motion.div
            className="pointer-events-none absolute z-50 -translate-x-1/2 -translate-y-1/2"
            style={{
              left: cursorX,
              top: cursorY,
            }}
            animate={{
              scale: isClicked ? 0.85 : isHoveringInteractive ? 1.3 : 1,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            <img
              ref={vinylRef}
              src="/images/vinyl.png"
              alt="Vinyl Record Cursor"
              className="h-12 w-12 object-contain select-none pointer-events-none"
            />
          </motion.div>
        )}
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
                    <CaseStudyCard
                      key={cs.id}
                      title={cs.title}
                      description={cs.description}
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
