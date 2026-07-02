---
name: Nue Vitality
colors:
  surface: '#14121b'
  surface-dim: '#14121b'
  surface-bright: '#3a3841'
  surface-container-lowest: '#0f0d15'
  surface-container-low: '#1c1a23'
  surface-container: '#201e27'
  surface-container-high: '#2b2932'
  surface-container-highest: '#36333d'
  on-surface: '#e6e0ed'
  on-surface-variant: '#c9c4d7'
  inverse-surface: '#e6e0ed'
  inverse-on-surface: '#312f39'
  outline: '#938ea0'
  outline-variant: '#484554'
  surface-tint: '#cabeff'
  primary: '#cabeff'
  on-primary: '#30009a'
  primary-container: '#5d3fd3'
  on-primary-container: '#d8ceff'
  inverse-primary: '#6042d6'
  secondary: '#c8c3e1'
  on-secondary: '#302e45'
  secondary-container: '#49465f'
  on-secondary-container: '#bab5d2'
  tertiary: '#c8c4db'
  on-tertiary: '#302e40'
  tertiary-container: '#5c596d'
  on-tertiary-container: '#d6d1e9'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#e6deff'
  primary-fixed-dim: '#cabeff'
  on-primary-fixed: '#1c0062'
  on-primary-fixed-variant: '#4723be'
  secondary-fixed: '#e5dffe'
  secondary-fixed-dim: '#c8c3e1'
  on-secondary-fixed: '#1b192f'
  on-secondary-fixed-variant: '#47445c'
  tertiary-fixed: '#e4dff8'
  tertiary-fixed-dim: '#c8c4db'
  on-tertiary-fixed: '#1b1a2b'
  on-tertiary-fixed-variant: '#474558'
  background: '#14121b'
  on-background: '#e6e0ed'
  surface-variant: '#36333d'
typography:
  display-lg:
    fontFamily: Hanken Grotesk
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Hanken Grotesk
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Hanken Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Hanken Grotesk
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-caps:
    fontFamily: Hanken Grotesk
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  card-padding: 24px
  grid-gap: 16px
  container-margin: 32px
---

## Brand & Style
The design system is centered on a vibrant, tech-forward aesthetic that balances high-energy purples with soft, approachable lavender surfaces. It targets a modern, data-driven audience that values clarity, speed, and premium craftsmanship.

The visual style is **Corporate Modern with a Bento-Grid influence**. It utilizes "squircle-like" heavy rounded corners to create a friendly, organic feel within a structured layout. The interface relies on tonal depth—using layers of purple rather than traditional shadows—to establish hierarchy. Every element feels like a tactile tile, organized into a rhythmic, modular grid that communicates stability and efficiency.

## Colors
This design system uses a sophisticated dark-themed palette dominated by deep violets and soft lavenders.

- **Primary Purple (#5D3FD3):** Used for key branding elements, primary actions, and emphasis in data visualization.
- **Lavender Light (#E6E0FF):** The primary surface color for "Bento" cards, providing a high-contrast background for dark text.
- **Midnight Navy (#1A1926):** The base background color, chosen to allow the purple gradients to pop.
- **Success Green (#4ADE80):** A high-contrast accent used exclusively for positive data trends.

**Logo Treatment:** The "nue" wordmark should always appear in white (#FFFFFF) when on primary purple backgrounds, or in primary purple when on lavender surfaces. It utilizes a lowercase, geometric sans-serif weight with a distinctive dot element that can take on a gradient or secondary accent color.

## Typography
The system uses **Hanken Grotesk** across all roles to maintain a clean, contemporary, and highly legible appearance. 

- **Headlines:** Use tighter letter-spacing and heavier weights (600-700) to create a strong visual anchor within cards.
- **Data Points:** Large numeric displays (e.g., "78K") should use `display-lg` or `headline-md` weights to ensure they are the first thing a user sees.
- **Body Text:** Maintains a generous line height for readability against light lavender backgrounds.
- **Hierarchy:** Use color (Primary Purple for titles, 60% opacity for secondary labels) to establish depth rather than just changing font sizes.

## Layout & Spacing
The layout follows a **Bento Grid** philosophy: a fixed-column grid where content is housed in cards of varying heights and widths that lock together seamlessly.

- **Desktop:** 12-column grid with 16px gutters. Cards typically span 3, 4, or 6 columns.
- **Mobile:** Single column fluid layout. Card padding reduces to 16px to maximize content area.
- **Spacing Rhythm:** All margins and paddings are multiples of 8px. Use 24px as the standard internal padding for all containers to create a sense of luxurious "breathing room."
- **Data Visualization:** Charts should bleed to the edges of their containers or maintain a consistent 24px inset, never in between.

## Elevation & Depth
In this design system, depth is achieved through **Tonal Layering** rather than traditional drop shadows.

- **Level 0 (Background):** The deepest layer, a solid Midnight Navy.
- **Level 1 (Cards):** Soft Lavender (#E6E0FF) or Deep Purple (#5D3FD3) surfaces. These do not use shadows; their "lift" comes from the high contrast against the background.
- **Level 2 (Overlays/Modals):** Use a subtle background blur (20px) with a 10% white border to simulate glass floating above the bento grid.
- **Interactive Elements:** Buttons and clickable chips use a 2px inner-stroke or a slight saturation shift on hover to indicate interactability.

## Shapes
The "Nue" identity is defined by its **extreme roundedness**, echoing the soft geometry of modern hardware.

- **Primary Containers:** All bento cards must use `rounded-xl` (1.5rem / 24px) to create the signature look.
- **Internal Elements:** Small buttons, tags, and avatars use `rounded-lg` (1rem / 16px).
- **Icons:** Should be encased in circular or heavily rounded frames.
- **Data Viz:** Bar charts and progress indicators must have fully rounded (pill-shaped) end caps to match the container language.

## Components

### Cards (Bento Tiles)
The core component. Features 24px padding, `rounded-xl` corners, and a background of either Lavender or Primary Purple. Content should be vertically distributed with key metrics at the top or center.

### Data Visualization
- **Line/Area Charts:** Use smooth, organic bezier curves (splines). Fill areas with a multi-step gradient of decreasing opacity.
- **Donut Charts:** High-thickness rings with rounded caps. Use "Active" vs "Inactive" states with Lavender and Primary Purple.
- **Trend Indicators:** Small, bold typography (e.g., +10%) paired with a minimal up/down arrow icon.

### Buttons & Interaction
- **Primary:** Solid Primary Purple with white text. Roundedness matches the `rounded-lg` token.
- **Secondary:** Ghost style with a 1.5px Primary Purple border or soft lavender fill.
- **Avatars:** Circular with a 2px border matching the card's background color to create a "cutout" effect when stacked.

### Input Fields
Minimalist design. Use a light lavender background with a bottom-only border that thickens and changes to Primary Purple on focus. Labels should sit above the field in `label-caps`.