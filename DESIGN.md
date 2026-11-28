---
name: zaid.seta
description: Personal portfolio of Zaid Seta, CS (Co-op) student at McMaster. Dark-first, teal-lit, carried by real data.
colors:
  ink-night-bg: "#0f1115"
  ink-night-fg: "#ffffff"
  signal-teal: "#5eead4"
  night-subtle: "rgb(255 255 255 / 0.55)"
  night-surface: "rgb(255 255 255 / 0.05)"
  night-added: "#4ade80"
  night-removed: "#f87171"
  night-contrib-empty: "rgb(255 255 255 / 0.06)"
  paper-bg: "#f7f6f3"
  paper-ink: "#1c1917"
  deep-teal: "#0f766e"
  paper-subtle: "rgb(28 25 23 / 0.62)"
  paper-surface: "#ffffff"
  paper-added: "#15803d"
  paper-removed: "#b91c1c"
  paper-contrib-empty: "rgb(28 25 23 / 0.07)"
typography:
  display:
    fontFamily: "Cabinet Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(3rem, 6vw, 4.5rem)"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "Cabinet Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "3rem"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "-0.025em"
  title:
    fontFamily: "Cabinet Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 700
    lineHeight: 1.333
    letterSpacing: "-0.025em"
  body:
    fontFamily: "Hanken Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.75
  body-small:
    fontFamily: "Hanken Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "IBM Plex Mono, ui-monospace, monospace"
    fontSize: "0.75rem"
    fontWeight: 400
    lineHeight: 1.333
  label-micro:
    fontFamily: "IBM Plex Mono, ui-monospace, monospace"
    fontSize: "11px"
    fontWeight: 400
    lineHeight: 1.333
rounded:
  cell: "2px"
  md: "6px"
  lg: "8px"
  xl: "12px"
  2xl: "16px"
  full: "9999px"
spacing:
  gutter-mobile: "16px"
  gutter-tablet: "24px"
  gutter-desktop: "32px"
  tile-padding: "20px"
  row-padding: "24px"
  feature-padding: "32px"
  grid-gap: "16px"
  section-gap: "56px"
  home-section-gap: "80px"
  container: "1280px"
  prose-measure: "62ch"
components:
  button-primary:
    backgroundColor: "{colors.signal-teal}"
    textColor: "{colors.ink-night-bg}"
    typography: "{typography.body-small}"
    rounded: "{rounded.lg}"
    padding: "8px 16px"
  button-primary-light:
    backgroundColor: "{colors.deep-teal}"
    textColor: "{colors.paper-bg}"
    typography: "{typography.body-small}"
    rounded: "{rounded.lg}"
    padding: "8px 16px"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.ink-night-fg}"
    typography: "{typography.body-small}"
    rounded: "{rounded.lg}"
    padding: "8px 16px"
  tech-tag:
    typography: "{typography.label-micro}"
    rounded: "{rounded.md}"
    padding: "2px 8px"
  bento-tile:
    backgroundColor: "{colors.night-surface}"
    rounded: "{rounded.xl}"
    padding: "{spacing.tile-padding}"
  bento-tile-light:
    backgroundColor: "{colors.paper-surface}"
    rounded: "{rounded.xl}"
    padding: "{spacing.tile-padding}"
  featured-row:
    backgroundColor: "{colors.night-surface}"
    rounded: "{rounded.2xl}"
    padding: "{spacing.feature-padding}"
  company-logo:
    rounded: "{rounded.lg}"
    size: "40px"
  toast:
    backgroundColor: "{colors.ink-night-bg}"
    textColor: "{colors.ink-night-fg}"
    typography: "{typography.body}"
    rounded: "{rounded.xl}"
    padding: "14px 24px"
---

# Design System: zaid.seta

## Overview

**Creative North Star: "The Live Logbook"**

The site reads like an engineer's logbook that keeps itself up to date. Near-black (or warm paper in the light theme) carries everything; one teal signal colour marks what is current, clickable, or real. The hero sits over thirty weeks of Zaid's actual GitHub contributions drawn as large faint squares, and the home page closes on tiles fed by refreshed data: commits, the contribution calendar, free rooms at McMaster, books, watch history, local time. The data is the decoration.

Density is calm and scannable. A recruiter should reach the projects and experience within one scroll, so ornament stays quiet: thin `fg/10` hairlines, translucent cards, mono metadata, and motion that settles in rather than performs. Personality lives in small, deliberate places (the clickable wordmark that spins letters into new colours, theme-toggle toasts, the 404 cat) and never in layout gimmicks.

Dark is the default theme; light is a full override, not an afterthought. Every token below has a tuned value per theme, and the light theme is warm paper and warm ink, never cool grey.

**Key Characteristics:**
- Dark-first, with a warm paper light theme toggled by a `.light` class on `<html>`
- One accent hue (teal), tuned per theme for AA contrast
- Real data as texture: contribution squares, live tiles, count-up stats
- Hairline borders and translucent surfaces instead of heavy shadows
- Mono for metadata, grotesk display for headings, grotesk sans for reading
- Motion is short, eased out, staggered, and fully honours reduced motion

## Colors

A near-monochrome system with one teal signal, mirrored across a dark night theme and a warm paper day theme.

### Primary
- **Signal Teal** (dark) / **Deep Teal** (light): the only accent. Used for primary buttons, active nav and the current breadcrumb segment, the dot in the wordmark, tile header icons, links' hover targets, project status text, the current-role dot on the timeline, focus rings, text selection (30% mix), the contact-block glow, and every step of the contribution graph. Light mode drops to teal-700 because teal-600 fails 4.5:1 for small text on white.

### Neutral
- **Ink Night** / **Paper**: page background. Dark is a blue-black; light is a warm off-white paper.
- **Night Foreground** / **Paper Ink**: primary text. Body copy is rarely full strength; it is set at `fg/60` to `fg/70` for reading text and `fg/80`–`fg/85` for emphasised secondary lines. Hairlines are `fg/8` (header, footer), `fg/10` (cards, dividers) and `fg/15` (outline buttons), rising to `fg/20`–`fg/30` on hover.
- **Subtle**: small labels, metadata, dates, captions, icon-button rest state. Tuned per theme to stay above 4.5:1 (about 6:1 on night, about 5:1 on paper).
- **Surface**: card fill. Translucent white at 5% on night; solid white on paper, where it pairs with the card shadow.
- **Added / Removed**: green and red, used only for commit `+additions / -deletions` counts.

### Data ramp (contribution graph)
- **contrib-l0** is the empty-day fill (Contrib Empty token per theme). **l1–l3** mix the accent with transparent at 25% / 50% / 75% on night and 32% / 55% / 78% on paper (paper needs stronger low steps to read on white). **l4** is the full accent.
- The hero backdrop uses a quieter ramp: accent at 7% / 11% / 16% / 22%, and empty days stay empty so it reads as data, not a grid.

### Named Rules
**The One Signal Rule.** Teal is the only hue in the chrome. Anything teal is current, interactive, or real data. Do not introduce a second accent.

**The Per-Theme Tuning Rule.** No colour is shared blindly across themes. Every new token gets a night value and a paper value, and the paper value is checked against 4.5:1 on `#f7f6f3` before it ships.

**The Hashed Rainbow Exception.** Tech tags are the one place many hues appear. Each tag's hue is a stable hash of its label (0–360), with background at `hsla(h, 70%, 60%, 0.12)` (0.14 on paper) and text at `hsl(h, 70%, 72%)` on night or `hsl(h, 65%, 30%)` on paper. The colour carries no meaning; it only makes stacks scannable. Never hand-pick tag colours.

## Typography

**Display Font:** Cabinet Grotesk (Fontshare, weights 500 and 700; fallback ui-sans-serif, system-ui). **Provisional**: kept for now, may be swapped.
**Body Font:** Hanken Grotesk (Google Fonts, 400–700; fallback ui-sans-serif, system-ui)
**Label/Mono Font:** IBM Plex Mono (Google Fonts, 400–600; fallback ui-monospace)

**Character:** A firm, slightly characterful display grotesk over a neutral, readable sans, with a plain mono for anything that is data: dates, counts, stack names, commit SHAs, link affordances like "all projects".

### Hierarchy
- **Display** (700, 3rem / 3.75rem / 4.5rem at base / sm / lg, tight tracking): the hero name only.
- **Headline** (700, 2.25rem rising to 3rem at sm, tight tracking): page H1s (Projects, Experience, About, Resume, case-study titles, 404).
- **Title** (700, 1.5rem, tight tracking): section H2s ("Featured projects", "Experience", "Lately", case-study sections). Featured project titles step up to 1.875rem; project card titles are 1.25rem; case-study step and decision titles 1.125rem. Stats and metrics use the display face at 1.875–2.25rem.
- **Body** (400, 1rem, 1.75 line height; case-study prose uses 2): reading text, capped at 62ch.
- **Body small** (400, 0.875rem, 1.5–1.71): card descriptions, role summaries, tile content. Tile headings are body small at 500.
- **Label** (IBM Plex Mono 400, 0.75rem): dates, metric labels, "all projects" links. **Label micro** (11px) for tech tags, tooltips, tile meta.

All H1–H3 use `text-wrap: balance`; paragraphs use `text-wrap: pretty`. The display weight is set once through `--display-weight: 700`.

### Named Rules
**The Mono Means Data Rule.** IBM Plex Mono is reserved for machine-ish facts: dates, counts, stack names, SHAs, paths, short lowercase link affordances. Never set sentences or headings in mono.

**The Lowercase Affordance Rule.** Secondary text links are lowercase mono ("all projects", "read case study", "code", "live"). Primary actions are sentence-case sans in buttons.

## Layout

- **Container:** one centred column, max 1280px, gutters 16px / 24px / 32px at base / sm / lg. Main padding is 40px vertical, 48px at xl.
- **Rhythm:** home sections are 64px apart (80px at lg), with the hero a further step away (80–96px). Interior pages stack sections 48–56px apart. Section heads sit 32px above their content, with the title left and a mono "all … →" link right-aligned on the same baseline.
- **Prose measure:** reading paragraphs cap at 62ch (About intro, case-study prose, timeline bodies). Case-study headers and bodies cap at `max-w-3xl` (768px); the "How it works" flow diagram is the one block allowed full width.
- **Hero:** two columns at lg (`1fr 340px`), text left and the "Currently" panel right, bottom-aligned. Contribution squares appear only at lg and up; below that only the teal glow remains so nothing sits behind the name.
- **Bento:** 4-column grid at md (1 column below), 16px gap. GitHub activity spans 2×2; contributions, RoomRadar, location map and "Off the clock" span 2; Stack spans the full row.
- **Projects grid:** 1 / 2 / 3 columns (base / md / xl), 20px gap; the first card spans two columns.
- **Case study:** main column plus a 260px sticky sidebar at lg (sidebar first on mobile).
- **Experience timeline:** a 1px rule on the left on mobile; at md it moves to 180px, with dates right-aligned in a 160px column and content to the right.
- **Breakpoints:** Tailwind defaults (640 / 768 / 1024 / 1280). Contribution graph drops to the last 26 weeks on phones.

## Elevation & Depth

Flat by default, separated by hairlines and tonal surfaces. On night, cards are 5% white over the background with a `fg/10` border and no shadow. On paper, cards are solid white with a soft two-layer shadow (`0 1px 2px rgb(28 25 23 / 0.05), 0 4px 16px -6px rgb(28 25 23 / 0.09)`) so they lift off the warm page. Only floating UI carries a real shadow: the toast (`shadow-2xl` with black at 30%, backdrop blur) and the contribution tooltip (`shadow-lg`). The sticky header uses `bg/80` with a medium backdrop blur and a bottom hairline.

### Named Rules
**The Hairline-First Rule.** Separation comes from a `fg/10` border and a tonal surface. Shadows are for floating layers (toast, tooltip) and for paper-theme cards; nothing else.

**The Border-Lift Hover Rule.** Interactive cards respond by strengthening their border from `fg/10` to `fg/20`, with images scaling 1.02–1.03 and opacity rising to 100%. They do not move or grow a shadow.

## Shapes

Softly rounded rectangles on a stepped scale, larger for larger containers: 6px for tags, tooltips and inline code; 8px for buttons, icon chips and company logos; 12px for bento tiles, project cards, case-study cards and the resume frame; 16px for the big section containers (featured project rows, the home experience list, the contact block, the "Currently" panel, the "Earlier" disclosure). Hero contribution squares are 6px; calendar cells are 2px. Circles are used for the footer social buttons (40px), timeline dots, bullet dots and progress bars. Bullets are drawn as small filled circles, never typed characters.

### Named Rules
**The Single-Layer Card Rule.** A card holds content directly: text, tags, a divider list, an image. Never put a bordered box inside a bordered card. Small media frames (logos, cover thumbnails) are the only bordered children allowed.

## Components

### Buttons
- **Shape:** gently rounded (8px).
- **Primary:** accent fill, background-coloured text, 14px medium, 8px × 16px padding, optional 16px Lucide icon. Hover drops to accent at 85%.
- **Outline:** transparent with a `fg/15` border and `fg/80` text; hover strengthens to `fg/30` border and full `fg` text.
- **Icon buttons:** bare Lucide icon in `subtle`, turning `fg` on hover. Footer variants are 40px circles with a `fg/10` border and a 3% `fg` fill. Mobile touch targets are 44px.
- **Focus:** a global 2px solid accent outline at 2px offset on `:focus-visible` only.

### Tech tags
- **Style:** IBM Plex Mono 11px, 6px radius, 2px × 8px padding, no border, colour from the label hash (see Colors). Wrapped in a flex row with 6px gaps.

### Navigation (header)
- Sticky, full-width, `bg/80` with backdrop blur and a `fg/8` bottom hairline. Left: the mono "zaid.seta" wordmark (dot in accent) followed by the route as a mono breadcrumb (`/projects/mactrack`), with the last segment in accent. Right: 14px sans nav links at `fg/60`, active in accent, plus a theme toggle (sun / moon spinning in). On phones the links collapse into a menu button that opens a bordered list below the bar.
- **Wordmark easter egg:** each click spins one random character into a new colour from a fixed pastel set; colours persist until reload. Four rapid theme toggles raise a toast.

### Hero
- Display name, a 20–24px medium line at `fg/85`, a 16px `fg/60` paragraph capped near 36rem, then primary and outline buttons plus GitHub and LinkedIn icon links. Blocks enter with staggered rise-in at 0 / 80 / 160 / 320ms and the panel at 400ms.
- **Backdrop:** a radial teal glow at the upper left plus the last 30 weeks of real contributions as 40px squares with 6px gaps, masked to fade toward the text and the edges. Decorative and `aria-hidden`.
- **Currently panel:** a 16px-radius card listing role, current build, study and location, each with an accent icon in an 8px-radius tinted square. It sits on an opaque background so the squares never show through.

### Featured project rows
- Full-width 16px-radius cards, image half and text half at md, alternating sides per row. Text block: mono meta line, 30px display title with an arrow that nudges up-right and turns accent on hover, hook paragraph, count-up metrics in display type with mono labels, then tech tags and lowercase mono "code" / "live" links. The whole card is the link (stretched link on the title); the code and live links sit above it.

### Project cards (Projects page)
- 12px-radius cards with a 16:10 image on top (beside the text on the wide first card), display title with mono date, description, tags, and a hairline footer row with "read case study →" and the status in accent mono.

### Bento tiles
- 12px radius, 20px padding, surface fill, `fg/10` border lifting to `fg/20` on hover. Header: a 14px accent Lucide icon plus a 14px medium title, with optional mono 11px meta on the right. Contents vary (commit list with green / red diff counts, contribution calendar with hover tooltip and legend, room count with progress bar, inverted greyscale map with local time, books and watch thumbnails, stack tags) but stay a single layer. Loading states are `fg/8` pulse bars; failures are a plain sentence in `subtle`.

### Experience timeline
- Vertical 1px `fg/10` rule with 10px dots ringed in the page colour; the current role's dot is accent, past roles `fg/25`. Each entry: mono date range, company logo (white tile with padding, or accent-tinted initials when the file is missing), title in the display face, company and location, and a list of `fg/65` bullets with drawn dots. Earlier roles fold into a native `<details>` card with a rotating chevron.
- On the home page the same roles appear as a single 16px-radius card split by `fg/10` dividers.

### Case-study page
- Back link, mono meta line, display H1, `fg/65` 18px summary, then a stats band between two hairlines (2 or 4 columns, display numbers). Body sections each have a 24px display H2 and enter with Reveal. "How it works" is a numbered flow of small cards (accent mono step number, title, detail, mono tech) joined by short hairline connectors, horizontal at lg. Decisions are a 2-column card grid; timeline-style notes use a 2px `accent/40` left rule. A sticky sidebar holds a mono-labelled definition list, stack tags, and primary / outline link buttons. Image carousels sit in 12px cards with translucent black arrow buttons and pill dots.

### Contact block
- A 16px-radius card with generous padding (24px, 40px at sm), a blurred accent glow in the top-right corner, and on paper a 7% teal wash with a 22% teal border. Display H2, one plain sentence, then: primary "Email me", a mono copy-email button that swaps to a check and "copied", and outline Resume and LinkedIn buttons. On phones the first two go full width and the last two pair up.

### Toasts
- One at a time, centred 24px above the bottom, 12px radius, 30% accent border, `bg/95` with blur and a large soft shadow, IBM Plex Mono 16px. Announced through a polite live region, shown for 2.6s, entering with rise-in. Used only for easter eggs, never for system status.

### Motion
- **Easing:** one curve everywhere, `cubic-bezier(0.2, 0.7, 0.2, 1)` (fast start, long settle). The theme switch uses `cubic-bezier(0.4, 0, 0.2, 1)` over 380ms as a circular reveal from the toggle via the View Transitions API.
- **Page enter:** 6px rise and fade over 350ms, keyed on the route.
- **Rise-in:** 14px over 600ms with a per-element `--delay` for staggers.
- **Reveal:** scroll-triggered (IntersectionObserver, fires once, 10% bottom margin), 18px rise over 600ms; siblings stagger in 80ms steps. Without IntersectionObserver everything shows immediately. Contribution cells inside a Reveal pop in column by column at 14ms per week.
- **CountUp:** stats count from zero over 1.1s with an ease-out cubic when first seen; tabular numerals; screen readers get only the final value.
- **Reduced motion:** movement is removed and replaced with 200ms opacity fades so state changes still read; smooth scrolling is turned off; CountUp jumps to its final value; the theme switch is instant; decorative loops (pulse, ping, spin, the wordmark spin, the 404 drift) stop. Print forces every revealed element visible.

### Accessibility
- Target WCAG 2.2 AA in both themes. Small text uses `subtle` or stronger, never lower opacity.
- A "Skip to content" link appears on focus (accent fill, top left) and targets `#main`, which is focusable.
- Focus is a 2px accent outline at 2px offset, keyboard only.
- Icon-only controls carry `aria-label`; the mobile menu exposes `aria-expanded`; decorative backdrops and the contribution grid are `aria-hidden` with an sr-only summary.
- Touch targets on mobile header controls are 44px.

## Do's and Don'ts

### Do:
- **Do** tune every new colour for both themes and check the paper value against 4.5:1 on `#f7f6f3`.
- **Do** keep teal as the only chrome accent; let tech tags be the one hashed multicolour exception.
- **Do** cap reading text at 62ch and keep case-study prose inside 768px.
- **Do** build cards as a single layer: surface fill, `fg/10` border, content directly inside.
- **Do** use IBM Plex Mono for dates, counts, stack names and lowercase link affordances only.
- **Do** use the shared ease `cubic-bezier(0.2, 0.7, 0.2, 1)` and give every new motion a reduced-motion fallback that keeps a short fade.
- **Do** prefer real data (contributions, live tiles, shipped metrics) over decorative imagery.
- **Do** write copy plainly in first person, the way Zaid talks.

### Don't:
- **Don't** add status or availability pills ("Open to work", "Available", coloured status badges). The owner reads them as AI-generated design.
- **Don't** add a subheading under the Projects or Experience page titles.
- **Don't** nest bordered boxes inside cards.
- **Don't** write tricolons, aphorisms, or polished taglines in copy.
- **Don't** introduce a second accent hue or hand-pick tech-tag colours.
- **Don't** use cool grey for the light theme; paper and ink stay warm.
- **Don't** add heavy drop shadows to cards on the dark theme; depth there is border and tone.
- **Don't** let motion block content: anything hidden for a reveal must show when IntersectionObserver is missing, under reduced motion, and in print.
