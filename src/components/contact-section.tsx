"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { SocialIcon } from "@/components/social-icon";
import {
  ArrowRightIcon,
  githubIcon,
  linkedinIcon,
  facebookIcon,
  instagramIcon,
} from "@/lib/constants";

export function ContactSection() {
  const pathname = usePathname();

  const navLinks = [
    { href: "/", label: "Homepage" },
    { href: "/about", label: "About me" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <section id="contact" className="px-4 pb-6 mt-20">
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
          </div>

          <div>
            <h3 className="text-2xl font-bold">Sitemap</h3>
            <ul className="mt-6 space-y-4 text-lg text-white/95">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={isActive ? "underline underline-offset-4" : "hover:underline hover:underline-offset-4"}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          <div>
            <h3 className="text-2xl font-bold">Socials</h3>
            <ul className="mt-6 space-y-4 text-lg text-white/95">
              <li>
                <a href="https://github.com/Curious-person/" target="_blank" rel="noopener noreferrer" className="hover:underline hover:underline-offset-4">Github</a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/john-kevin-abgao-5893192b2/" target="_blank" rel="noopener noreferrer" className="hover:underline hover:underline-offset-4">LinkedIn</a>
              </li>
              <li>
                <a href="https://www.facebook.com/johnkevin.abgao" target="_blank" rel="noopener noreferrer" className="hover:underline hover:underline-offset-4">Facebook</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
