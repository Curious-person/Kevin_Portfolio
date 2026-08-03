# Implementation Log

## 2026-07-21 — DESIGN.md refresh from Figma reference

**What was done:** Updated the portfolio design spec to match the selected Figma frame, including the blue hero, dark pill navigation, serif headlines, and light-grey project cards.

**Design system considerations:** Swapped the palette to `#0392EA` and `#2E3441`, changed headings to Instrument Serif, kept Inter for body and UI text, and documented the rounded containers, floating nav, and footer wordmark treatment.

**Reuse check:** Reused the existing markdown structure in `DESIGN.md`; no new UI component was needed because this change is a spec update rather than a code implementation.

**Library usage:** Not applicable. This change only updates documentation.

## 2026-08-02 — Resume modal wired from nav

**What was done:** Added a reusable resume modal and wired the portfolio nav Resume action on the home page to open it, with a fallback link to the about-page experience section on other pages.

**Design system considerations:** Matched the existing bright editorial palette, rounded modal surfaces, serif headline treatment, and white/light-grey content blocks used across the portfolio. Reused the portrait image treatment and experience card structure so the modal feels like a direct extension of the about page.

**Reuse check:** Reused the existing portfolio navigation component, the established modal open/close pattern from `ProjectDetailSheet`, and the about-page content structure as the basis for the resume dialog. A separate modal component was needed because the Resume action now controls its own overlay state instead of navigating to a route.

**Library usage:** Used `framer-motion` for the dialog transition and existing `next/image` plus local icon exports from `src/lib/constants.ts`. No form libraries were needed for this change.

## 2026-08-02 — Resume modal matched to Frame 39

**What was done:** Replaced the earlier resume modal content with the Frame 39 layout: centered title, file card, separator text, email input row, send button, and bottom note.

**Design system considerations:** Tightened the overlay to the white rounded dialog shown in Figma, used the neutral border and blue accent treatment from the frame, and kept the spacing airy and centered to preserve the modal's minimal composition.

**Reuse check:** Reused the same modal shell and close behavior, but swapped the internal content to a frame-specific layout. The shared `Input`, `Label`, and `Button` primitives kept the form styling aligned with the rest of the app.

**Library usage:** Used `framer-motion` for motion, `next/image` was no longer needed for this modal, and the shared form primitives remained in use. No additional third-party libraries were required.

## 2026-08-03 — Refactor DesignModal structure and layout

**What was done:** Refactored `DesignModal` to use `bg-black/80` backdrop, `#3a3a3a` (charcoal) container background, large serif "Designs" title (48-64px), spacing-based layout without divider lines, subtle close button, and a rounded image wrapper supporting dynamic aspect ratios.

**Design system considerations:** Applied the core serif and sans styling, using `font-serif` for the title and Inter for body text. Kept separation entirely visual using spacious margins, avoiding lines, and implemented a light gray (`bg-[#e8e8e8]`) rounded card with `rounded-[24px]` for the designs.

**Reuse check:** Modified the existing `DesignModal` implementation, updating the type definition for selected designs inside `DesignGallery` to pass `aspectRatio`.

**Library usage:** Reused `framer-motion` for overlays and transitions, `next/image` for image rendering, and Lucide (`CloseIcon`) for the icon.
