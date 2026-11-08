export type ProjectPalette = {
  /** Page background. */
  paper: string;
  /** Primary text on that background. */
  ink: string;
  /** Rules, labels, hover states. */
  muted: string;
  /** The project's signature colour. */
  accent: string;
  /** Bright accent for headings and active tabs. Irene only for now. */
  accentBright?: string;
  /** Dimmer steel for inactive labels. Irene only for now. */
  steelDim?: string;
};

export type Project = {
  slug: string;
  title: string;
  year: string;
  discipline: string;
  thumbnail: string;
  thumbnailAlt: string;
  /** Letterbox the thumbnail on `palette.paper` instead of cropping it to fill the tile. */
  thumbnailContain?: boolean;
  palette: ProjectPalette;
};

/** Order is fixed by Jamnie's brief: Irene, Feeding San Francisco. */
export const projects: Project[] = [
  {
    slug: "irene",
    title: "Irene",
    year: "2026",
    discipline: "Mixed-use tower",
    thumbnail: "/images/irene-thumb.webp",
    thumbnailAlt:
      "Front view of Irene, a six-storey red steel and glass building with curved recessed balconies",
    thumbnailContain: true,
    // Specified in Jamnie's brief.
    palette: {
      paper: "#100E0E",
      ink: "#E8E4DF",
      muted: "#A7ABB2",
      accent: "#6E1220",
      accentBright: "#C81E3A",
      steelDim: "#6B6F75",
    },
  },
  {
    slug: "feeding-san-francisco",
    title: "Feeding San Francisco",
    year: "2025",
    discipline: "Community design",
    thumbnail: "/images/projects/feeding-san-francisco/logo.svg",
    thumbnailAlt:
      "Feeding San Francisco logo: a red Golden Gate Bridge line drawing ending in an arrow",
    thumbnailContain: true,
    // The home page's beige sheet, with the red from the project's logo.
    palette: {
      paper: "#EDE6D8",
      ink: "#2A251F",
      muted: "#B8A98C",
      accent: "#C22B26",
    },
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
