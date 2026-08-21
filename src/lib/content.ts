/**
 * Every string on the main page lives here.
 *
 * Items marked PLACEHOLDER were not specified in Jamnie's brief and are
 * standing in until she supplies the real copy.
 */

export const site = {
  name: "Jamnie Whawhen",
  role: "Architecture",
  /** PLACEHOLDER — confirm the year she wants on the sheet label. */
  sheetLabel: "Architecture Portfolio / 2026",
  email: "jswhawhen@dons.usfca.edu",
  /** PLACEHOLDER — swap in her real LinkedIn profile URL. */
  linkedInUrl: "https://www.linkedin.com/",
  /** PLACEHOLDER — replace public/Jamnie-Whawhen-Resume.pdf with the real file. */
  resumeUrl: "/Jamnie-Whawhen-Resume.pdf",
} as const;

export const hero = {
  /** PLACEHOLDER — one-line intro, hers to rewrite. */
  intro:
    "A rising junior working in mass, material and gesture — the concept that reads whole the moment you see it.",
  portrait: {
    src: "/images/jamnie-portrait.jpg",
    alt: "Portrait of Jamnie Whawhen",
    width: 1050,
    height: 1400,
  },
} as const;

/** Verbatim from Jamnie's brief. Do not paraphrase without asking her. */
export const about = {
  paragraphs: [
    "I'm a rising junior studying architecture, and I still think of myself as a student, not just because I'm in school, but because I'm aware of how much I don't know yet. Right now, my work is predominantly exterior, and that's not an accident. My design thinking is strongest at the big, expressive gesture, the concept that reads as whole the moment you see it. I haven't fully found my footing with interiors yet: circulation, spatial sequence, the way a building holds someone inside it. I'm working on that. Exteriors right now are honest expressions about where I am.",
    "I stuck with architecture because it demanded something of me. It asks for real hours and real effort. Doing this work, and doing it well, means something to me beyond the buildings themselves.",
  ],
} as const;

export const contact = {
  /** PLACEHOLDER — Jamnie to choose the quote she wants to close on. */
  quote:
    "We shape our buildings; thereafter they shape us.",
  quoteAttribution: "Winston Churchill",
} as const;
