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

The main page is finished. The three project pages are deliberate placeholders — they
apply each project's palette and link back to the gallery, but the slide walkthroughs
are not built yet.

## What still needs real content

Everything below is a placeholder. Copy lives in
[`src/lib/content.ts`](src/lib/content.ts) and project data in
[`src/lib/projects.ts`](src/lib/projects.ts); both mark placeholders with a `PLACEHOLDER`
comment so they are easy to find.

- **Hero intro line** — one sentence, currently written as a stand-in.
- **Contact quote** — Jamnie picks the quote she wants to close on.
- **LinkedIn URL** — currently points at linkedin.com.
- **Resume** — replace `public/Jamnie-Whawhen-Resume.pdf` with the real file.
- **Virgo and Feeding San Francisco thumbnails** — currently drawing-sheet placeholder
  SVGs in `public/images/`. Swap in real renders and update `thumbnail` in
  `src/lib/projects.ts`.
- **Virgo and Feeding San Francisco palettes** — Jamnie has only specified Irene's
  (near-black `#100E0E`, brick `#6E1220`, steel `#A7ABB2`). The other two use holding
  values.
- **Project year and discipline** — set for Irene, `TBC` for the other two.

Her About statement and the beige palette are taken verbatim from her brief and should
not be changed without asking her.

## Design notes

- **Palette.** Paper `#EDE6D8`, ink `#2A251F`, muted accent `#B8A98C`, defined as CSS
  custom properties in [`src/app/globals.css`](src/app/globals.css). Project pages
  override them locally.
- **Type.** Cormorant Garamond for display (leaning on its italic), Inter for body,
  IBM Plex Mono for the drawing-sheet labels and index numbers.
- **Scroll snap.** Mandatory vertical snap at `md` and above, relaxed to proximity on
  phones so long copy is never clipped, and disabled entirely under
  `prefers-reduced-motion`.
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
