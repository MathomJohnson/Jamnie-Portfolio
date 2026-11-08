# Jamnie Whawhen — Architecture Portfolio

A one-page portfolio site. The main page is four full-viewport scroll-snap sections
(Hero, About, Selected Work, Contact) on a beige paper palette with a drafting-grid
background. Each project in the gallery routes to its own page with its own colour scheme.

Built with Next.js 16 (App Router), TypeScript, Tailwind CSS v4 and Motion. Deploys to
Vercel with no extra configuration.

## Running it

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

| Command             | What it does                                            |
| ------------------- | ------------------------------------------------------- |
| `npm run dev`       | Dev server                                               |
| `npm run build`     | Production build                                         |
| `npm run typecheck` | TypeScript, no emit                                      |
| `npm run lint`      | ESLint                                                   |
| `npm run shots`     | Screenshots every section at three widths (see below)    |

## Current state

The main page is finished. **Irene** (`/projects/irene`) is the first full project
walkthrough: nine scroll-snap slides (front render, backstory, drag-to-rotate 360,
balcony crossfade, roof plan, first floor, typical units, elevations, and
storefront glazing).

**Feeding San Francisco** (`/projects/feeding-san-francisco`) tells the project's second
year in eight home-style sections on the beige sheet, with the logo red (`#C22B26`) as
accent. Copy is from Jamnie's "Second Year Evolution" write-up and lives in
[`src/lib/projects/feeding-san-francisco.ts`](src/lib/projects/feeding-san-francisco.ts);
images are in `public/images/projects/feeding-san-francisco/`.

### Irene turntable frames

The 360 slide uses 48 frames at
`public/turntables/irene-turntable/01.webp` …
`48.webp` (2400px wide). `frameCount`, `framePad`, and `frameExt` in
[`src/lib/projects/irene.ts`](src/lib/projects/irene.ts) must match that folder.


## What still needs real content

Everything below is a placeholder. Copy lives in
[`src/lib/content.ts`](src/lib/content.ts) and project data in
[`src/lib/projects.ts`](src/lib/projects.ts); both mark placeholders with a `PLACEHOLDER`
comment so they are easy to find.

- **Hero intro line** — one sentence, currently written as a stand-in.
- **Contact quote** — Jamnie picks the quote she wants to close on.
- **LinkedIn URL** — currently points at linkedin.com.
- **Resume** — replace `public/Jamnie-Whawhen-Resume.pdf` with the real file.

Her About statement and the beige palette are taken verbatim from her brief and should
not be changed without asking her.

## Design notes

- **Palette.** Paper `#EDE6D8`, ink `#2A251F`, muted accent `#B8A98C`, defined as CSS
  custom properties in [`src/app/globals.css`](src/app/globals.css). Project pages
  override them locally.
- **Type.** Cormorant Garamond for display on the main page, Inter for body,
  IBM Plex Mono for sheet labels. Irene uses Big Shoulders for condensed titles
  on its own near-black / brick / steel palette (`#100E0E`, `#6E1220`, `#C81E3A`,
  `#A7ABB2`).
- **Scroll snap.** Mandatory one-section-per-screen snap from `md` (768px) up. Phones
  have no snap at all: sections size to their content and the page scrolls freely. Irene's
  slide deck follows the same split (its own snapping scroller on desktop, a plain page
  with captions under each image on phones). Snap is off entirely under
  `prefers-reduced-motion`.
- **Light only.** `color-scheme: only light` (CSS and the viewport meta) stops phone
  browsers' automatic dark mode from repainting the palette.
- **Phones are pared back.** Figure captions ("Fig. 0X") and the hero's registration marks
  are hidden below `sm`/`md`.
- **Gallery hover.** Project names are hidden by default and fade up over a scrim on
  hover or keyboard focus. On touch devices (`@media (hover: none)`) they are always
  visible, since there is no hover state to discover them with.

## Design QA screenshots

`npm run shots` captures every section at 1440, 1280 and 390 pixels wide into
`.design-shots/` (gitignored), including the gallery hover state. Headless Chrome
reports `hover: none` by default, which would hide all the pointer-device styling, so
the script forces the pointer profile through Blink settings. It needs a local Chrome;
set `CHROME_PATH` if yours is not at `/usr/bin/google-chrome`, and have `npm run dev`
running first.
