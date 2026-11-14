# LFA "Matchday" — Cursor handoff

The approved design is the prototype at `reference/concept/index.html` (+ `logo.png`). It is a single hand-written HTML/CSS/GSAP page and it is the **design spec**: structure, copy, spacing, colors, timings and behavior are all in that file. The job in Cursor is to **port it faithfully to the existing Vite + React + Tailwind + motion project**, not to reinterpret it and not to patch the old sections.

## What stays from the current Cursor project
- Scaffold: Vite, React 18, TS strict, Tailwind v4 `@theme` tokens, shadcn init, ESLint/Prettier.
- `src/i18n/*` (react-i18next, 4 visible languages ES/EN/PT/IT, CA hidden), language persistence, `<html lang>`.
- `index.html` head: title, meta, OG, canonical, Meta Pixel, Google Ads tag, Cloudflare Web Analytics.
- `src/data/leagues.ts` (names, shortName, logoUrl, href).
- `src/lib/motion.ts` as the single place for easings/timings.
- Lenis provider (desktop only, off under reduced motion).

## What gets replaced
- `src/sections/Hero.tsx`, `SocialProof.tsx` and anything else built so far → rebuilt from the prototype.
- `PitchBackground.tsx` → replaced by the prototype's pitch SVG (perspective lines + vignette mask).
- Spotlight component → removed.

## Section map (prototype → React)
| Prototype block | Component | Notes |
|---|---|---|
| `.ticker` | `Ticker.tsx` | Fixed 30px yellow bar, phrase "Revolucionando el fútbol amateur" looping, "LFA" tag left. |
| `nav` | `Navbar.tsx` | Logo PNG (SVG if available), links, lang switcher, Login ghost (hidden <900px), "Probar gratis". Blur on scroll. Mobile hamburger with Login inside. |
| `.hero` | `Hero.tsx` + `PitchSvg.tsx` + `HeroPanels.tsx` | Word-reveal H1 with padded clip boxes (accents!). Three floating panels: AI match sheet (front), live results, standings (hidden <600px). Entrance timeline exactly as in the prototype script (`tl`), then idle float + mouse parallax (fine pointer only). Live score ticks 1–1 → 2–1 at t≈3.3s after the sheet finishes. |
| `.logos` | `LogoMarquee.tsx` | Replace text pills with real league logos from `leagues.ts`, links `target=_blank`. 22s loop, pause on hover, edge fades. |
| `.stats` | `Stats.tsx` | Four count-up numbers: torneos, equipos, jugadores, partidos. Values from i18n/env; render nothing while all are 0. |
| `.signature` | `AiImport.tsx` | Feature spotlight. Left: eyebrow, H2, sentence (verbatim), 3 steps. Right: looping demo (scan → rows → "Listo"), plays only while in view. Swap the CSS "paper" for a real photo of a handwritten match sheet when provided. |
| `.journey` | `Journey.tsx` | GSAP ScrollTrigger pinned horizontal scroll, 5 scenes, scrub 1. ≤900px: vertical stack, no pin. |
| `.manifesto` | `Manifesto.tsx` | Centered statement block. |
| `.bento` | `Features.tsx` | 7 tiles, 3D tilt + cursor glow (fine pointer only). |
| `.app` | `PlayerApp.tsx` | Phone mockup straightening on scroll; later replace inner mock with real LFA Player screenshots. |
| `.pricing` | `Pricing.tsx` | One plan, 3 billing options, animated price toggle; `Suscribirme` links from old site. |
| `.final` | `FinalCta.tsx` | Outlined marquee "¿Arrancamos?" + CTAs + company line. |
| `footer`, `.wa` | `Footer.tsx`, `WhatsAppButton.tsx` | Existing wa.me link. |

## Libraries
- Keep `motion` for simple reveals/hover; **add `gsap` (+ ScrollTrigger)** for the hero timeline, the horizontal pin and the AI demo loop — these are scrub/pin/timeline jobs GSAP does better. GSAP core + ScrollTrigger are free (MIT-like "no charge" license since 3.13).
- No Three.js, no new UI kits.

## Rules the agent must follow
1. Port **one section per prompt**, in page order, and stop after each for review.
2. Copy text verbatim from the prototype into `es.json` (keep voseo and accents). Do not rewrite.
3. Reproduce timings/easings from the prototype `<script>`; put them in `lib/motion.ts`.
4. Every word-reveal clip box must have top/side padding so Á/Ó/Í and italics don't clip.
5. Fine-pointer-only effects (tilt, parallax, cursor glow) behind `(hover:hover) and (pointer:fine)`; reduced-motion renders final states.
6. No layout shift: reserve media boxes; lazy-load everything below the hero.
7. Build must pass; Lighthouse mobile ≥85 perf / ≥95 a11y after each section.
8. Ask when a URL or number is missing; never invent.

## Owner still owes
- Real stats (4 numbers), real league logos already in `leagues.ts`, a photo of a handwritten match sheet, LFA Player screenshots, SVG logo if it exists, translations for EN/PT/IT.
