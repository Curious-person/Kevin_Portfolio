---
name: Bright Editorial Portfolio
colors:
  surface: '#ffffff'
  surface-dim: '#f2f2f2'
  surface-bright: '#ffffff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f8f8f8'
  surface-container: '#f2f2f2'
  surface-container-high: '#e9e9e9'
  surface-container-highest: '#dedede'
  on-surface: '#111111'
  on-surface-variant: '#444444'
  inverse-surface: '#2e3441'
  inverse-on-surface: '#ffffff'
  outline: '#cfcfcf'
  outline-variant: '#e3e3e3'
  surface-tint: '#0392ea'
  primary: '#0392ea'
  on-primary: '#ffffff'
  primary-container: '#0392ea'
  on-primary-container: '#ffffff'
  inverse-primary: '#ffffff'
  secondary: '#2e3441'
  on-secondary: '#ffffff'
  secondary-container: '#2e3441'
  on-secondary-container: '#ffffff'
  tertiary: '#444444'
  on-tertiary: '#ffffff'
  tertiary-container: '#f2f2f2'
  on-tertiary-container: '#111111'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d9f0ff'
  primary-fixed-dim: '#8fd1fb'
  on-primary-fixed: '#001d2f'
  on-primary-fixed-variant: '#00517f'
  secondary-fixed: '#e2e5ec'
  secondary-fixed-dim: '#c8ccd6'
  on-secondary-fixed: '#11151d'
  on-secondary-fixed-variant: '#343a47'
  tertiary-fixed: '#f2f2f2'
  tertiary-fixed-dim: '#dedede'
  on-tertiary-fixed: '#111111'
  on-tertiary-fixed-variant: '#444444'
  background: '#ffffff'
  on-background: '#111111'
  surface-variant: '#e3e3e3'
typography:
  display-lg:
    fontFamily: Instrument Serif
    fontSize: 128px
    fontWeight: '400'
    lineHeight: '1'
    letterSpacing: 0
  headline-xl:
    fontFamily: Instrument Serif
    fontSize: 64px
    fontWeight: '400'
    lineHeight: '1.05'
  headline-lg:
    fontFamily: Instrument Serif
    fontSize: 48px
    fontWeight: '400'
    lineHeight: '1.1'
  headline-md:
    fontFamily: Instrument Serif
    fontSize: 32px
    fontWeight: '400'
    lineHeight: '1.2'
  body-lg:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '400'
    lineHeight: '1.4'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: '1.4'
    letterSpacing: 0.03em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1.2'
  headline-xl-mobile:
    fontFamily: Instrument Serif
    fontSize: 64px
    fontWeight: '400'
    lineHeight: '1.05'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 12px
  md: 24px
  lg: 48px
  xl: 80px
  container-max: 1280px
  gutter: 24px
---

## Brand & Style

The design system is built on a foundation of **bright editorial minimalism**. It presents the owner as a "Design Engineer" through strong contrast, generous whitespace, and a clear serif/sans hierarchy.

The visual language is **open, confident, and highly legible**. A bright blue hero field anchors the page, while the navigation bar, project cards, and footer use dark slate or light neutral surfaces for structure. Mountain imagery appears throughout as a repeatable visual motif, giving the portfolio a consistent sense of scale and continuity.

The emotional response should be one of "effortless visibility." It avoids dense ornamentation and instead relies on oversized serif headlines, compact UI chrome, rounded panels, and spacious composition.

## Colors

This design system uses a saturated Primary Blue for the hero, panels, and key calls to action, anchored by a deep Dark Slate for navigation and footer accents.

- **Primary Blue (#0392EA):** Used for the hero background, selected badges, and prominent CTA surfaces.
- **Secondary / Slate (#2E3441):** Used for the floating navigation pill, dark buttons, and the footer anchor.
- **Neutral Surfaces (#F2F2F2 / #FFFFFF):** Used for project cards, badges, and the main content canvas.
- **Text Hierarchy:** Headline text leans black or near-black in content sections; hero text stays white for contrast.
- **Status & Utility:** Error and success states should remain conventional and subdued so they do not compete with the visual hierarchy.

## Typography

The typographic strategy pairs **Instrument Serif** for headlines and signature copy with **Inter** for all body, navigation, chips, and utility text.

- **Display & Headings:** Use Instrument Serif for the hero title, section headings, project names, and the footer wordmark. Keep the weight at 400 and let the scale do the work.
- **Body & Metadata:** Inter handles supporting copy, button text, nav items, tag labels, and contact/footer links.
- **Scale:** The hero title is intentionally oversized, while the projects heading and card titles step down cleanly to preserve hierarchy.
- **Text Masks:** The footer brand wordmark remains a large image-masked signature treatment and should be used only for the name lockup.

## Layout & Spacing

The design system uses a wide desktop canvas with a centered content rhythm and generous vertical separation between sections.

- **Grid Logic:** Use a 24px gutter and a centered container up to 1280px when the content is not intentionally full-bleed.
- **Vertical Rhythm:** Keep large section gaps between the hero, stats, projects, and footer so each block reads independently.
- **Safe Margins:** Preserve at least 24px of horizontal padding on mobile.
- **Desktop Breakpoint:** 1024px.
- **Tablet Breakpoint:** 768px.
- **Mobile Breakpoint:** 480px.

## Elevation & Depth

Hierarchy is established through **colored surfaces**, **rounded containers**, and **soft ambient shadows**.

- **Surface Tiers:**
    1. **Level 0 (Base):** Full-bleed blue hero or white page background.
    2. **Level 1 (Cards):** Light grey project cards and white badges.
    3. **Level 2 (Floating):** Dark nav pill, CTA buttons, and footer panel.
- **Shadow Style:** Use diffused shadows with low opacity and keep them soft enough to preserve the flat editorial look.
- **Interactions:** Hover states should lift cards subtly and preserve the rounded silhouette.

## Shapes

The shape language is deliberately simple and rounded.

- **Cards & Containers:** Use a 20px-24px radius for the large hero/footer surfaces and rounded-lg on smaller content cards where appropriate.
- **Interactive Elements:** Buttons, pills, and tags use rounded-full or a small pill radius to match the navigation and CTA language.
- **Image Treatments:** Project thumbnails should match the rounded container treatment and never feel inset as a separate object.

## Components

### Navigation
- **Floating Bar:** Dark Slate (#2E3441) background with a pill-shaped container and centered links.
- **Placement:** Top-center, fixed or sticky.
- **Link Style:** Keep the labels compact, bright, and lightly separated; hover can use opacity or a subtle underline.

### Buttons
- **Primary:** Pill-shaped, Primary Blue or Dark Slate. White text. Large padding (12px 32px).
- **Secondary:** Minimal dark buttons work well inside the hero and footer sections.
- **Icon Buttons:** Small outlined social buttons or icon-only circles for GitHub, LinkedIn, Facebook, and Instagram.

### Project Cards
- **Structure:** A light-grey container (#F2F2F2) with a horizontal split on desktop and a compact stacked arrangement on smaller screens.
- **Details:** Project label, large serif title, short sans-serif description, and a small pill tag.
- **Images:** High-contrast mountain photography with consistent rounded corners and controlled cropping.

### Stat Cards
- **Visuals:** Dark Slate containers with massive white numerals and a small caption beneath. These act as compact anchors before the project section.

### Input Fields
- **Style:** Minimalist with 1px light grey borders. No shadows by default. Focus state transitions to a 2px Primary Blue border.
- **Labels:** Positioned above the field in `label-md` Inter.

### Iconography
- **Style:** Outlined icons with a 1.5pt or 2pt stroke weight.
- **Consistency:** Use a single library such as Lucide to keep the icon set visually aligned.

## Engineering Principles

These principles govern how the design system is *implemented* in code, not just how it looks. They apply to every component, page, or feature built against this system.

### DRY (Don't Repeat Yourself)
- Never re-implement a visual pattern (spacing scale, color token, shadow, radius) inline more than once — promote it to a design token, Tailwind config value, or shared utility class instead.
- Repeated JSX structures (e.g. a stat block, a chip, a card header) must be extracted into a component after the second occurrence, not left duplicated "just this once."
- Shared logic (formatting, validation, data fetching, class-merging via `cn()`/`clsx`) belongs in a single utility module, imported everywhere it's needed — never copy-pasted between files.
- Prefer composing existing primitives (e.g. a `Card` + `Badge` + `Button`) over building a new one-off component that reproduces what those primitives already do.

### Reusable Components
- Every component should be built prop-driven and context-agnostic — it should not assume it will only ever be used on one page.
- Favor composition (children, slots, render props) over configuration explosion (a dozen boolean props controlling internal branches).
- Keep components single-responsibility: a `ProjectCard` renders a project; it does not also fetch the projects list.
- Variants (size, tone, state) should be modeled explicitly (e.g. via `class-variance-authority` or a typed `variant` prop) rather than through ad hoc conditional class strings.
- Before adding a new component, check `components/ui`, `components/shared`, and any installed library (see below) for something that already does the job or can be extended via props/composition.

### TypeScript Best Practices
- `strict` mode on; no `any` — use `unknown` with narrowing, generics, or proper types instead.
- Every component has an explicit, exported `Props` interface (e.g. `interface ProjectCardProps { ... }`), even for small components — no untyped or implicitly-`any` props.
- Prefer `interface` for public component/object shapes and `type` for unions, intersections, and utility compositions.
- Model variants and states with discriminated unions or string literal unions (`variant: "primary" | "secondary" | "ghost"`) instead of loose `string`.
- Let TypeScript infer return types for simple functions; annotate explicitly for public APIs, exported functions, and anything non-trivial.
- No non-null assertions (`!`) or `@ts-ignore` as a substitute for real typing — fix the type or narrow it properly.
- Co-locate types with the component that owns them; share types via a dedicated `types.ts` only when genuinely cross-cutting.

### Library Priority — Check Before You Build
Before creating **any** new component, first check whether it already exists in the codebase (`components/ui`, existing feature components) or can be composed from the approved libraries below. Do not duplicate functionality that these already provide.

Priority order for new UI/logic needs:
1. **shadcn/ui** — default source for primitives (Button, Card, Dialog, Input, Select, Tooltip, etc.). Extend and theme these to match the bright editorial tokens above rather than hand-rolling equivalents.
2. **lucide-react** — default and only icon set, matching the outlined iconography rule already defined above.
3. **react-hook-form** — default for all form state management (registration, submission, error state, touched/dirty tracking).
4. **zod** — default for all schema validation, paired with `@hookform/resolvers/zod` to validate `react-hook-form` forms. Also use for validating external data (API responses, params).

Rule of thumb: **search → compose → extend → create.** Only build a fully custom component when the above genuinely cannot express the requirement, and note why in the implementation log (see below).

### Implementation Log
Every implementation (new component, page, or non-trivial change) must be logged in a markdown file so the reasoning and coverage are auditable later.

- **File:** `IMPLEMENTATION_LOG.md` at the project root. If it doesn't exist yet, create it the first time this system is implemented against.
- **When to update:** on every implementation — new component, significant edit, or bug fix that touches design-system-governed code.
- **Entry format:** append a new dated entry (don't rewrite history) with:
  - **What was done** — the component/page/feature and a one-line summary.
  - **Design system considerations** — which tokens, components, and layout rules from this file were applied (colors, type scale, spacing, shape, elevation).
  - **Reuse check** — what existing components/libraries were checked or reused before writing new code, and why a new component was (or wasn't) necessary.
  - **Library usage** — confirmation that shadcn/ui, lucide-react, react-hook-form, and zod were used where applicable, or a note on why not.

Example entry:

```md
## 2026-07-21 — DESIGN.md refresh from Figma reference

**What was done:** Updated the portfolio design spec to match the selected Figma frame, including the blue hero, dark pill navigation, serif headlines, and light-grey project cards.

**Design system considerations:** Swapped the palette to `#0392EA` and `#2E3441`, changed headings to Instrument Serif, kept Inter for body and UI text, and documented the rounded containers, floating nav, and footer wordmark treatment.

**Reuse check:** Reused the existing markdown structure in `DESIGN.md`; no new UI component was needed because this change is a spec update rather than a code implementation.

**Library usage:** Not applicable. This change only updates documentation.
```
