# Boxling Design System

## Direction

**Neighborhood coffee utility.** A bold, photographic landing page that helps people understand three actions immediately: find a nearby cart, order in the app, and pick up their coffee. The system combines practical app clarity with Boxling's kinetic street presence in Bali.

## Principles

1. One clear message and one conversion goal per viewport.
2. Photography carries atmosphere; typography carries instructions.
3. Red is reserved for brand recognition and primary action.
4. Motion must preserve reading order and spatial continuity.
5. Self-pickup must never be confused with delivery.

## Core tokens

| Role | Token | Value |
|---|---|---|
| Ink | `--ink` | `#090909` |
| Black field | `--black` | `#030303` |
| Paper | `--paper` | `#F4F0E7` |
| Boxling red | `--red` | `#E30613` |
| Header red | `--header-red` | `#D50101` |
| Deep red | `--red-dark` | `#7E0509` |
| Sky support | `--sky` | `#83CCEC` |
| Signal yellow | `--yellow` | `#F5D547` |

## Typography

- **Display and UI:** Geist 400–900.
- **Editorial accent only:** Instrument Serif Italic.
- Hero: `clamp(4.5rem, 7.22vw, 6.25rem)`, weight 800, line-height 0.86.
- Section heading: `clamp(3.5rem, 7vw, 8.5rem)`, line-height 0.87.
- Body: 1rem base, line-height 1.5–1.6, maximum readable width 32rem.
- Labels: 0.72rem, uppercase, tracking 0.08–0.13em.
- Do not introduce another sans-serif family.

## Spacing

- Base rhythm: 8px.
- Inline gap: 8–12px.
- Component padding: 16–24px.
- Content separation: 24–48px.
- Section separation: 96–176px.
- Page gutter: `clamp(1rem, 3vw, 2.75rem)`.

## Components

- Store badges are rectangular, high-contrast, and shadow-free.
- Interactive targets are at least 44px high.
- Focus uses a 2px yellow outline with a 4px offset.
- Pills are reserved for navigation CTAs; content CTAs use store badges or text links.
- Avoid generic card grids unless the content genuinely needs comparison.

## Hero

- Full-bleed photography with a horizontal readability veil only—never a bottom shadow gradient.
- Copy stays on the left and is capped at 43rem.
- Required hierarchy: context label → two-line value proposition → one explanatory sentence → store CTAs → pickup clarification.
- Decorative badges or duplicate instructional text are removed when they compete with the CTA.

## Motion

- Preserve the existing GSAP scroll narrative.
- Use motion for transitions and spatial explanation, not decoration.
- Respect `prefers-reduced-motion` and keep content understandable without animation.

## Responsive checks

- Validate at 375, 620, 900, 1024, and 1440px.
- No horizontal overflow.
- No text hidden behind the header.
- Hero copy and CTAs must fit within the first viewport at common phone heights.
