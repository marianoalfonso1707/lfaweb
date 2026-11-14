# LFA Marketing Site Redesign — Project Brief & Agent Rules

> Paste this file as `.cursor/rules/lfa-web.mdc` (or `.cursorrules`) in the new project. It is the source of truth for scope, brand, stack, and how the agent should work. When something here conflicts with a library default, this file wins.

---

## 1. Context

**Product:** LFA (Ligas Fútbol Amateur) — a SaaS platform for amateur soccer league and tournament organizers. Features: automatic fixture generation, playoff brackets, suspensions, Face ID player verification, real-time results, mass edits, PDF/Excel exports, a public league web page, and a players' mobile app ("LFA Player").

**Current site:** `https://ligasfutbolamateur.com` — one hand-written static `index.html` (~150 KB, inline CSS, two keyframe animations), hosted on Cloudflare Pages. It is visually consistent but static, very long, and never shows the product in motion.

**Audience:** Amateur tournament organizers in Latin America (Argentina, Colombia, Brazil and others). Many arrive from WhatsApp links on mid-range Android phones. Mobile performance is not optional.

**Goal:** Rebuild the site as a modern, motion-rich React landing page that (a) feels as dynamic as the sport, (b) shows the real product moving, and (c) builds trust as a serious SaaS — while keeping the existing brand, copy, links and tracking.

**Visual references:** Aceternity UI and React Bits (component vocabulary), figma.com/motion ("show the product in motion", staggered type, springy easing), cosmos.so (restraint, editorial whitespace). The target is *polished and confident*, not *busy*.

---

## 2. Brand (do not change)

```css
:root {
  --thunder-black: #0D0B0C;  /* page background */
  --sinergy-yellow: #f3dd30; /* primary accent, CTAs */
  --foul-black: #2c3346;     /* secondary surfaces / borders */
  --powder-white: #fdfdf0;   /* headings, primary text */
  --text-muted: #a3a3a3;     /* secondary text */
}
```

- **Headings:** Oswald 700, uppercase, italic allowed for emphasis (current H1 style: white line + yellow italic line).
- **Body:** Archivo Narrow 400/700.
- Load both from Google Fonts with `display=swap`; preconnect to fonts.gstatic.com.
- Dark theme only. Yellow is the *only* accent color — no gradients into purple/blue/pink. Glows, beams and spotlights must be yellow or white at low opacity.
- Mascot **"Capi"** (existing PNGs) stays, used with restraint (hero + WhatsApp widget), never full-screen on mobile.

---

## 3. Stack

- **Vite + React 18 + TypeScript**
- **Tailwind CSS** (+ `tailwind-merge`, `clsx`)
- **shadcn CLI** initialized (Aceternity components install through it)
- **Aceternity UI** — free components only (via `npx shadcn@latest add` / Aceternity MCP)
- **React Bits** — free, via CLI or copied source
- **motion** (`import { motion } from "motion/react"`) for all custom animation
- **lenis** for smooth scroll (desktop only; disabled on touch devices and under reduced motion)
- **@react-three/fiber + drei** — ONLY if/when a 3D element is explicitly requested; lazy-loaded
- **i18n:** `react-i18next` with JSON files per language (`es`, `en`, `pt`, `it`, `ca`)
- **Hosting:** Cloudflare Pages, build `npm run build`, output `dist`. No server code.

Do not add Next.js, a CMS, a UI kit other than the above, or any paid dependency.

### Project structure

```
src/
  app/            App.tsx, providers (i18n, lenis)
  sections/       Hero.tsx, SocialProof.tsx, ProductShowcase.tsx, Pillars.tsx,
                  FeatureStory.tsx, Pricing.tsx, Testimonials.tsx, About.tsx, Cta.tsx, Footer.tsx
  components/     Navbar, LanguageSwitcher, WhatsAppWidget, shared UI
  components/ui/  Aceternity / React Bits / shadcn components (generated)
  lib/            utils.ts (cn), motion.ts (shared variants/easings), tracking.ts
  i18n/           es.json en.json pt.json it.json ca.json
  assets/         images, videos (webm + mp4), mascot
public/           favicon, og image, robots
```

---

## 4. Page structure & motion spec

Build **one section per prompt**, in this order. Each section is a self-contained component under `src/sections/`.

### 4.1 Navbar
- Sticky, blurred dark background on scroll (`backdrop-blur`), 64px desktop / 56px mobile.
- Left: LFA logo. Right: `Login Admin` (ghost button → existing admin URL), `Prueba Gratis 30 Días` (yellow button → `#pricing`), language switcher (ES · EN · PT · IT · CA).
- Motion: logo + items fade/slide in on load (stagger 60ms); nav shrinks slightly after 40px scroll.
- Mobile: hamburger → full-screen overlay menu with staggered items.

### 4.2 Hero
- Copy (ES): H1 line 1 "REVOLUCIONANDO", line 2 (yellow italic) "EL FÚTBOL AMATEUR"; subtitle "La plataforma todo-en-uno para organizadores de ligas amateur. Automatizá tu fixture en segundos y dale a tus jugadores una experiencia profesional."; badge "30 días de prueba gratis"; CTA "Iniciar Prueba Gratis" → `#pricing`; secondary link "Ver LFA en acción" → YouTube.
- Components: React Bits **Split Text / Blur Text** for H1 (word-level stagger, spring ease); Aceternity **Background Beams** or **Spotlight** in yellow at ≤15% opacity; CTA with Aceternity **Moving Border**.
- Capi: right side on desktop with a subtle mouse-parallax tilt (≤6°); on mobile, small and below the CTA, max 35vh, or omitted below 380px width.
- Hero must fit in one viewport on desktop (≥1280px) and show the CTA above the fold on a 390×844 phone.

### 4.3 Social proof
- Heading "LIGAS QUE YA CONFÍAN EN NOSOTROS", subline "Hacé clic en cualquier liga para ver su página web".
- Aceternity **Infinite Moving Cards** with the ~20 league logos (each a link to its public page, `target=_blank rel=noopener`). Pause on hover, logos lift 4px and brighten.
- Stats row below with animated counters (count-up on enter): leagues, matches managed, players registered. **Use placeholders `{{stat}}` until real numbers are provided — do not invent figures.**

### 4.4 Product showcase
- Heading "REVOLUCIONÁ TU TORNEO" + existing paragraph copy.
- Aceternity **Container Scroll Animation / Macbook Scroll**: the admin dashboard screenshot (or looping video) tilts into place as the user scrolls. Follow with a phone mockup of LFA Player.
- Media: prefer short looping `webm`/`mp4` (muted, `playsInline`, `loop`, `preload="metadata"`, poster image). Fall back to the existing PNG screenshots if video is not yet provided.

### 4.5 Pillars (features overview)
- Heading "LOS PILARES DEL ORGANIZADOR".
- Aceternity **Bento Grid** (2 large + 8 small tiles on desktop, 1 column on mobile) with **3D Card Effect** hover on desktop only. Ten pillars: Web App Admin, Fixture Inteligente, Tiempo Real, Face ID, Llaves de Playoffs, Suspensiones, Perfil Jugador, Ediciones Masivas, Exportaciones, Página Web Pública.
- Each tile: icon (existing), title, one-line description, and (when available) a 5–8s muted clip that plays on hover/in-view.
- Clicking a tile scrolls to its step in the Feature Story.

### 4.6 Feature story (replaces the ten long sections)
- Aceternity **Sticky Scroll Reveal** (desktop) / stacked cards (mobile). One step per pillar: media on one side stays pinned and swaps; text on the other side scrolls.
- Reuse the existing long-form copy, trimmed to ≤60 words per step. Keep all existing screenshots.

### 4.7 Pricing
- Heading "UNITE A LA REVOLUCIÓN". Three plans from the current site: Mensual US$10/mes · Semestral US$8/mes (US$48) · Anual US$6/mes (US$72). All include the 30-day trial.
- Cards with hover glow; the recommended plan (Anual) pre-highlighted with a yellow border and "Más elegido" tag. Price number animates when switching plans.
- **Fix the "Hasta 30 equipos / +30 equipos" ambiguity**: render it only if a second price set is supplied; otherwise omit the label. Ask before guessing.
- Buttons `Suscribirme` → existing signup links (copy exact URLs from current `index.html`). WhatsApp link preserved.
- Below: "¿Buscás algo a medida?" block with WhatsApp + email.

### 4.8 Testimonials
- Aceternity **Animated Testimonials**. **Placeholder content until real quotes are provided; mark clearly as `TODO` and do not fabricate names or leagues.**

### 4.9 About + video CTA
- "¿QUIÉNES SOMOS?" — existing text (empresa argentina con sede en Atlanta, Georgia; Ligas Futbol Amateur, LLC).
- "MIRÁ A LFA EN ACCIÓN" — YouTube embed facade (click-to-load, no iframe until clicked) + button "Ver en YouTube".

### 4.10 Footer
- © 2026 Ligas Futbol Amateur, LLC · Face ID privacy policy link · email · social links. Minimal, no motion beyond link hover.

### 4.11 WhatsApp widget
- Floating button bottom-right with the Capi avatar and the "Consultanos vía WhatsApp" bubble (dismissible, remembers dismissal in localStorage). Same `wa.me` link as today.

---

## 5. Motion principles

1. **Purposeful, not decorative.** Every animation either reveals content, shows the product working, or confirms an interaction. If removing it loses nothing, remove it.
2. **One hero effect per section.** Never stack beams + sparkles + spotlight + particles.
3. **Shared timing.** Define in `lib/motion.ts`: `easeOut = [0.22, 1, 0.36, 1]`, `spring = { type: "spring", stiffness: 260, damping: 24 }`, durations 0.4–0.8s, stagger 0.06–0.1s. Reuse; don't hardcode per component.
4. **Scroll reveals** use `whileInView` with `viewport={{ once: true, margin: "-10%" }}`.
5. **Reduced motion:** honor `prefers-reduced-motion` everywhere (use `useReducedMotion()`); fall back to opacity-only transitions; disable Lenis, parallax, 3D tilt and video autoplay.
6. **Touch devices:** no hover-only information. 3D tilt and spotlight-follow are desktop-only (`(hover: hover) and (pointer: fine)`).
7. **No layout shift.** Reserve space for media (explicit width/height or aspect-ratio).

---

## 6. Performance & accessibility budget

- Lighthouse mobile: **Performance ≥ 85, Accessibility ≥ 95, SEO ≥ 95**. Check after every section.
- Initial JS ≤ 250 KB gzipped. Lazy-load (`React.lazy` + `IntersectionObserver`) everything below the fold, all Three.js, and all videos.
- Images: WebP/AVIF, responsive `srcset`, `loading="lazy"` except hero. Keep the Google Storage / Supabase image URLs working or copy assets locally.
- Canvas/WebGL backgrounds: cap device pixel ratio at 1.5, pause when off-screen or tab hidden.
- Semantic HTML (`header/main/section/footer`, one `h1`), visible focus states, color contrast ≥ 4.5:1 for body text (yellow on black passes; muted gray on black must stay ≥ #a3a3a3).
- All interactive elements keyboard-reachable; carousel is pausable.

---

## 7. Must be preserved from the current site

- **Copy and language:** Spanish with Rioplatense voseo ("Automatizá", "Armá", "Unite"). Do not "correct" it to neutral Spanish.
- **Five languages** via the switcher; default `es`; remember choice in localStorage; `<html lang>` updated.
- **All outbound links:** admin login, signup/`Suscribirme` URLs, league public pages, WhatsApp, email, YouTube, Face ID privacy policy. **Copy them verbatim from the current `index.html`.**
- **Tracking:** Cloudflare Zaraz, Meta Pixel, Google Ads tag (`AW-11536482334`), Cloudflare Web Analytics. Keep the snippets in `index.html` `<head>` exactly as they are today, or route them through Zaraz. Do not drop or rename events.
- **SEO:** title "LFA - La Herramienta Definitiva para Organizadores", meta description, OpenGraph/Twitter cards, canonical, favicon. Add JSON-LD `SoftwareApplication` + `Organization`.
- Anchor ids used in links: `#pricing` and the per-feature anchors.

---

## 8. Content still to be supplied by the owner (use placeholders, never invent)

- [ ] 6–10 screen recordings of the admin app and LFA Player (5–10 s, 1080p, converted to webm + mp4)
- [ ] Real stats for the counters (leagues, matches, players)
- [ ] 3–6 organizer testimonials (name, league, country, quote, photo/logo)
- [ ] Clarification of the "30 equipos" pricing tier
- [ ] Translations for new strings (en, pt, it, ca)

---

## 9. How the agent should work

- Work **one section at a time**. Finish, run `npm run build`, show a dev-server preview, stop and wait for approval before the next section.
- Before touching copy or links, read the current `index.html` (place it at `reference/index.html` in the repo) and reuse its text and URLs. Never paraphrase existing marketing copy without being asked.
- Install Aceternity/React Bits components as source into `components/ui/`; adapt colors to the brand tokens; delete unused props/variants.
- Prefer Tailwind utilities; no CSS-in-JS. Keep component files < 200 lines; split otherwise.
- TypeScript strict; no `any`; ESLint + Prettier clean.
- Commit after each approved section with a message like `feat(hero): animated hero with beams and split text`.
- If a requirement is ambiguous (a URL, a number, a tier), **ask — do not guess**.
- Do not add dependencies not listed in §3 without asking.
- Do not add dark/light toggles, cookie banners, chatbots or newsletter forms unless requested.

---

## 10. Definition of done (whole site)

- All ten sections implemented and approved; visually consistent with the brand.
- Five languages working; no untranslated keys in the console.
- Lighthouse mobile budgets met on the production build.
- `prefers-reduced-motion` verified; keyboard navigation verified.
- All links, tracking tags and anchors verified against the old site.
- Deployed to a Cloudflare Pages preview URL; cut over to `ligasfutbolamateur.com` only after owner sign-off.
