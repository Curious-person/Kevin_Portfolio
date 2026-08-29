# Kevin Portfolio Codebase Init Guide

Welcome to the **Kevin Portfolio** codebase. This document serves as a general guide and overview of the project structure, design system, dependencies, and engineering practices to help developers and AI agents quickly understand and contribute to this repository.

---

## 🚀 Project Overview
This repository contains the personal portfolio website for **John Kevin D. Abgao**, a BSIT graduate and Design Engineer/Developer specializing in Frontend, Backend, UI/UX Design, and AI workflows. 

The website is designed with a **bright editorial minimalist style** characterized by high typography hierarchy, rounded containers, and mountain imagery.

---

## 🛠️ Technology Stack
* **Framework:** [Next.js (v16.2.6)](https://nextjs.org/) (using the App Router)
* **Language:** [TypeScript](https://www.typescriptlang.org/)
* **Runtime / Engine:** React 19 & React DOM 19
* **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) with Vanilla CSS variables
* **Animations:** [Framer Motion](https://www.framer.com/motion/) & [GSAP](https://gsap.com/)
* **Icons:** [Lucide React](https://lucide.dev/) & [FontAwesome Brand Icons](https://fontawesome.com/)
* **Forms & Validation:** [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/)
* **UI Components:** [Base UI](https://base-ui.com/) & [shadcn/ui](https://ui.shadcn.com/)

---

## 📁 Directory Structure
Below is an overview of the key directories and files in this project:

```text
Kevin_portfolio/
├── .agents/                    # Custom agent definitions, skills, and instructions
│   ├── roles/                  # Role descriptions (e.g. frontend-developer, ux-ui-designer)
│   └── skills/                 # Custom skills and instructions (e.g. gsap-core, gsap-timeline)
├── .vscode/                    # VS Code workspace settings
├── public/                     # Static assets (images, fonts, vector designs)
├── src/                        # Core codebase
│   ├── app/                    # Next.js App Router routes and page layouts
│   │   ├── about/              # About me page and Experience section
│   │   ├── contact/            # Contact form page
│   │   ├── loading/            # Custom loading components
│   │   ├── globals.css         # Main stylesheet integrating Tailwind CSS directives
│   │   ├── layout.tsx          # Root layout structure
│   │   └── page.tsx            # Portfolio homepage (Hero, Stats, Tabs for Projects/Designs/Case Studies)
│   ├── assets/                 # Shared local design assets
│   ├── components/             # Reusable UI React components
│   │   ├── ui/                 # Basic UI primitives (button, badge, input, label, textarea)
│   │   ├── design-card.tsx     # Component for rendering Figma designs
│   │   ├── design-gallery.tsx  # Layout for showcasing creative designs
│   │   ├── design-modal.tsx    # Modal dialog overlay for viewing high-res design graphics
│   │   ├── portfolio-nav.tsx   # Sticky dark slate navigation pill bar
│   │   ├── project-card.tsx    # Horizontal/vertical project cards
│   │   ├── project-detail-sheet# Sliding detail sheet for individual projects
│   │   ├── resume-modal.tsx    # Interactive resume and request overlay
│   │   ├── skills-ticker.tsx   # Loop animated slider showing tech competencies
│   │   └── stat-card.tsx       # Highlight statistics counts
│   ├── hooks/                  # Custom React hooks
│   ├── lib/                    # Shared utility code
│   │   ├── constants.ts        # Central definitions for icons, assets, and constants
│   │   └── utils.ts            # Helper utilities (e.g., clsx/tailwind-merge cn merger)
│   └── types/                  # Shared TypeScript type declarations
├── CLAUDE.md                   # Command and instruction file pointing to agent configurations
├── DESIGN.md                   # Brand, style, color, layout tokens, and UI specs
├── IMPLEMENTATION_LOG.md       # Audit trail documenting changes made to components
├── package.json                # Project dependencies and script commands
├── postcss.config.mjs          # PostCSS processing config
├── tailwind.config.js          # Tailwind styling config
└── tsconfig.json               # TypeScript configuration
```

---

## 🗄️ Data Models & SQL Reference
This section documents the JSON structures of static data used across the portfolio, along with their corresponding SQL schema representation as a reference for future database migrations.

### 1. Projects (`projects` in `src/app/page.tsx`)
* **JSON Structure:**
  ```json
  {
    "id": "project-1",
    "number": "Project 1",
    "title": "NU Space",
    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    "tag": "System Design"
  }
  ```
* **SQL Reference DDL:**
  ```sql
  CREATE TABLE projects (
      id VARCHAR(50) PRIMARY KEY,
      number VARCHAR(50) NOT NULL,
      title VARCHAR(100) NOT NULL,
      description TEXT NOT NULL,
      tag VARCHAR(100) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
  ```

### 2. Case Studies (`caseStudies` in `src/app/page.tsx`)
* **JSON Structure:**
  ```json
  {
    "id": "case-1",
    "number": "Case Study 1",
    "title": "Onboarding Redesign",
    "description": "An in-depth user research and design project aimed at identifying and fixing user retention leaks during onboarding, resulting in a 28% completion increase.",
    "tag": "UX Research & Design"
  }
  ```
* **SQL Reference DDL:**
  ```sql
  CREATE TABLE case_studies (
      id VARCHAR(50) PRIMARY KEY,
      number VARCHAR(50) NOT NULL,
      title VARCHAR(100) NOT NULL,
      description TEXT NOT NULL,
      tag VARCHAR(100) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
  ```

### 3. Designs (`designs` in `src/components/design-gallery.tsx`)
* **JSON Structure:**
  ```json
  {
    "id": "design-1",
    "title": "Vesper Crypto Wallet",
    "image": "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop",
    "aspectRatio": "aspect-square"
  }
  ```
* **SQL Reference DDL:**
  ```sql
  CREATE TABLE designs (
      id VARCHAR(50) PRIMARY KEY,
      title VARCHAR(100) NOT NULL,
      image TEXT NOT NULL,
      aspect_ratio VARCHAR(50) DEFAULT 'aspect-square',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
  ```

### 4. Experience (`experience` in `src/app/about/page.tsx`)
* **JSON Structure:**
  ```json
  {
    "company": "Nexvision Innovations, Inc.",
    "role": "Full-Stack and WordPress Developer Intern",
    "dates": "February 2026 - April 2026"
  }
  ```
* **SQL Reference DDL:**
  ```sql
  CREATE TABLE experience (
      id SERIAL PRIMARY KEY,
      company VARCHAR(150) NOT NULL,
      role VARCHAR(150) NOT NULL,
      dates VARCHAR(100) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
  ```

### 5. Contact Submissions (`contactSchema` in `src/app/contact/page.tsx`)
* **JSON Structure:**
  ```json
  {
    "name": "John Doe",
    "email": "example@domain.com",
    "phone": "+1 332 245 666",
    "subject": "Which topic are you interested in?",
    "message": "Type your message here."
  }
  ```
* **SQL Reference DDL:**
  ```sql
  CREATE TABLE contact_submissions (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(150) NOT NULL,
      phone VARCHAR(50),
      subject VARCHAR(150) NOT NULL,
      message TEXT NOT NULL,
      submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
  ```

### 6. Stats (`stats` in `src/app/page.tsx`)
* **JSON Structure:**
  ```json
  {
    "id": "projects",
    "value": "10",
    "label": "Projects",
    "offset": "lg:translate-y-0"
  }
  ```
* **SQL Reference DDL:**
  ```sql
  CREATE TABLE stats (
      id VARCHAR(50) PRIMARY KEY,
      value VARCHAR(10) NOT NULL,
      label VARCHAR(50) NOT NULL,
      offset_class VARCHAR(50) DEFAULT 'lg:translate-y-0'
  );
  ```

---

## 🎨 Design System & Engineering Principles

Detailed brand rules, typography scales, layout dimensions, and architectural decisions are documented in [DESIGN.md](file:///c:/personal-project/Kevin_portfolio/DESIGN.md). Developers and AI agents must strictly follow these rules:

1. **Colors & Shapes:** Saturated Primary Blue (`#0392EA`), Slate (`#2E3441`), and Neutrals (`#F2F2F2`/`#FFFFFF`). Containers use rounded corners (`rounded-[24px]` or `rounded-lg`).
2. **Typography:** **Instrument Serif** for display, headings, and name signature. **Inter** for UI, labels, chips, and body copy.
3. **Iconography Rule:** Do **NOT** import icons directly from `lucide-react` in individual UI files. All icons must be centralized and exported from [src/lib/constants.ts](file:///c:/personal-project/Kevin_portfolio/src/lib/constants.ts) using PascalCase naming (e.g. `ArrowRightIcon`, `CloseIcon`, `DownloadIcon`).
4. **DRY & Reuse:** Search → Compose → Extend → Create. Check `components/ui` or existing primitives before building new UI components. Keep components prop-driven and context-agnostic.
5. **No `any`:** TypeScript strict mode is enabled. Use strict typings; no non-null assertions (`!`) or `@ts-ignore` to silence type errors.

---

## 🪵 Keeping the Audit Trail

Every new component implementation, route, or design tweak must be logged chronologically in [IMPLEMENTATION_LOG.md](file:///c:/personal-project/Kevin_portfolio/IMPLEMENTATION_LOG.md). 

Entries should outline:
* **What was done**
* **Design system considerations**
* **Reuse check**
* **Library usage**

---

## 🛠️ Available Scripts

Run these scripts from the project root directory:

* **Start local development server:**
  ```bash
  npm run dev
  ```
* **Build production application bundle:**
  ```bash
  npm run build
  ```
* **Preview production build locally:**
  ```bash
  npm run start
  ```
* **Run lint checks:**
  ```bash
  npm run lint
  ```
