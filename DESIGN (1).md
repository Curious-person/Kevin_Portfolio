---
name: Grounded Technical Minimalist
colors:
  surface: '#f8f9ff'
  surface-dim: '#d7dae1'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f1f4fb'
  surface-container: '#ebeef5'
  surface-container-high: '#e5e8f0'
  surface-container-highest: '#dfe2ea'
  on-surface: '#181c21'
  on-surface-variant: '#3f4752'
  inverse-surface: '#2d3136'
  inverse-on-surface: '#eef1f8'
  outline: '#707883'
  outline-variant: '#bfc7d3'
  surface-tint: '#0062a0'
  primary: '#005f9c'
  on-primary: '#ffffff'
  primary-container: '#0079c4'
  on-primary-container: '#fdfcff'
  inverse-primary: '#9ccaff'
  secondary: '#595e6c'
  on-secondary: '#ffffff'
  secondary-container: '#dbdfef'
  on-secondary-container: '#5e6270'
  tertiary: '#8f4900'
  on-tertiary: '#ffffff'
  tertiary-container: '#b45e00'
  on-tertiary-container: '#fffbff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d0e4ff'
  primary-fixed-dim: '#9ccaff'
  on-primary-fixed: '#001d35'
  on-primary-fixed-variant: '#00497a'
  secondary-fixed: '#dee2f2'
  secondary-fixed-dim: '#c2c6d6'
  on-secondary-fixed: '#161c27'
  on-secondary-fixed-variant: '#424753'
  tertiary-fixed: '#ffdcc4'
  tertiary-fixed-dim: '#ffb781'
  on-tertiary-fixed: '#301400'
  on-tertiary-fixed-variant: '#703800'
  background: '#f8f9ff'
  on-background: '#181c21'
  surface-variant: '#dfe2ea'
typography:
  display-lg:
    fontFamily: Playfair Display
    fontSize: 96px
    fontWeight: '400'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-xl:
    fontFamily: Playfair Display
    fontSize: 64px
    fontWeight: '400'
    lineHeight: '1.2'
  headline-lg:
    fontFamily: Playfair Display
    fontSize: 48px
    fontWeight: '400'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '400'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: '1.4'
    letterSpacing: 0.05em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1.2'
  headline-xl-mobile:
    fontFamily: Playfair Display
    fontSize: 40px
    fontWeight: '400'
    lineHeight: '1.2'
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

The design system is built on a foundation of **Technical Minimalism**. It targets a professional audience in the B2B, SaaS, and B2C sectors, positioning the owner as a "Design Engineer"—a bridge between aesthetic intent and functional execution. 

The visual language is **grounded** and **authoritative**. It uses a sophisticated mix of traditional editorial typography (serifs) set against a modern, systematic grid (sans-serifs). High-contrast imagery featuring natural mountain landscapes acts as a metaphor for stability, scale, and clarity. The UI balances expansive blue fields with clean, white-space-heavy sections to evoke a sense of reliability and precision.

The emotional response should be one of "effortless competence." It avoids excessive decoration in favor of structural integrity, clear hierarchies, and subtle tactile cues.

## Colors

This design system utilizes a high-energy Primary Blue to denote action and brand presence, anchored by a deep "Dark Slate" for navigation and structural components.

- **Primary Blue (#008CE2):** Used for hero backgrounds, primary action buttons, and critical branding moments.
- **Secondary / Slate (#2D323E):** Used for high-contrast elements like the floating navigation bar and dark-themed cards.
- **Surface / Background:** The layout alternates between the vibrant primary blue and a soft, neutral light grey (#F9FAFB) to provide visual "breathing room" between content blocks.
- **Status & Utility:** Success and error states should follow standard accessible patterns but remain muted to not disrupt the minimalist aesthetic.

## Typography

The typographic strategy pairs **Playfair Display** (Serif) for headlines to provide a literary, authoritative feel, with **Inter** (Sans-serif) for body and UI elements to maintain technical clarity.

- **Display & Headings:** Use Playfair Display for all titles. Keep weights at 400 (Regular) to maintain the elegance of the serif strokes. Use negative letter-spacing on larger sizes to create a cohesive "locked-in" look.
- **Body & Metadata:** Inter is the workhorse. Use it for all long-form text, form labels, and button text.
- **Text Masks:** In the footer, the display font is used at a massive scale with an image mask (mountain texture). This should be reserved strictly for the brand name.

## Layout & Spacing

The design system employs a **12-column fluid grid** for desktop, transitioning to a **4-column grid** for mobile.

- **Grid Logic:** Use a 24px gutter. Content should be centered within a 1280px max-width container.
- **Vertical Rhythm:** Sections are separated by large white-space blocks (`xl` spacing) to ensure the portfolio pieces feel distinct and significant.
- **Safe Margins:** A minimum of 24px horizontal padding is required on mobile to prevent content from touching the screen edges.
- **Desktop Breakpoint:** 1024px.
- **Tablet Breakpoint:** 768px.
- **Mobile Breakpoint:** 480px.

## Elevation & Depth

Hierarchy is established through **tonal layering** and **subtle ambient shadows**.

- **Surface Tiers:** 
    1. **Level 0 (Base):** Background colors (Blue or Light Grey).
    2. **Level 1 (Cards):** White or Slate surfaces with subtle shadows.
    3. **Level 2 (Floating):** Navigation bars and Tooltips.
- **Shadow Style:** Use highly diffused shadows with low opacity (4-8%). For the slate-colored cards, use a slightly darker tint of the background color rather than pure black to maintain "grounded" realism.
- **Interactions:** On hover, cards should subtly lift (increase shadow spread and scale by 1-2%) to provide tactile feedback.

## Shapes

The shape language is a mix of **geometric precision** and **organic softness**.

- **Cards & Containers:** Use a moderate 12px-16px radius (`rounded-lg`). This softens the technical nature of the grid.
- **Interactive Elements:** Buttons and Category Tags (Chips) use a full pill-shape (radius: 9999px). This distinguishes "clickable" items from "containment" items.
- **Image Treatments:** All project thumbnails must share the same `rounded-lg` corner radius as their parent containers.

## Components

### Navigation
- **Floating Bar:** Dark Slate (#2D323E) background with a pill-shaped container. Links should have a subtle white underline or opacity change on hover.
- **Placement:** Top-center, fixed or sticky.

### Buttons
- **Primary:** Pill-shaped, Primary Blue or Dark Slate. White text. Large padding (12px 32px).
- **Icon Buttons:** Circular containers for social links (GitHub, LinkedIn) with outlined strokes.

### Project Cards
- **Structure:** A light-grey container (#EEE) with a horizontal split (Desktop) or vertical stack (Mobile).
- **Details:** Title (Serif), Description (Sans), and a pill-shaped category chip at the bottom.
- **Images:** High-contrast photography with consistent aspect ratios.

### Stat Cards
- **Visuals:** Dark Slate containers with massive white numerals. These act as high-contrast anchors in the layout.

### Input Fields
- **Style:** Minimalist with 1px light grey borders. No shadows by default. Focus state transitions to a 2px Primary Blue border.
- **Labels:** Positioned above the field in `label-md` Inter.

### Iconography
- **Style:** Outlined icons with a 1.5pt or 2pt stroke weight.
- **Consistency:** Use a single library (e.g., Lucide or Phosphor) to ensure geometric harmony.