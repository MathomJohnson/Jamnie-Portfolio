export type ProjectPalette = {
  /** Page background. */
  paper: string;
  /** Primary text on that background. */
  ink: string;
  /** Rules, labels, hover states. */
  muted: string;
  /** The project's signature colour. */
  accent: string;
};

export type Project = {
  slug: string;
  /** Drawing-sheet index shown beside the name, e.g. A-001. */
  sheet: string;
  title: string;
  /** PLACEHOLDER for Virgo and Feeding San Francisco. */
  year: string;
  /** PLACEHOLDER for Virgo and Feeding San Francisco. */
  discipline: string;
  thumbnail: string;
  thumbnailAlt: string;
  palette: ProjectPalette;
};

/** Order is fixed by Jamnie's brief: Irene, Virgo, Feeding San Francisco. */
export const projects: Project[] = [
  {
    slug: "irene",
    sheet: "A-001",
    title: "Irene",
    year: "2026",
    discipline: "Mixed-use tower",
    thumbnail: "/images/irene-thumb.jpg",
    thumbnailAlt:
      "Front view of Irene, a six-storey red steel and glass building with curved recessed balconies",
    // Specified in Jamnie's brief.
    palette: {
      paper: "#100E0E",
      ink: "#E8E4DF",
      muted: "#A7ABB2",
      accent: "#6E1220",
    },
  },
  {
    slug: "virgo",
    sheet: "A-002",
    title: "Virgo",
    year: "TBC",
    discipline: "To be confirmed",
    thumbnail: "/images/placeholder-virgo.svg",
    thumbnailAlt: "Placeholder image for the Virgo project",
    // PLACEHOLDER — Jamnie has not chosen Virgo's palette yet.
    palette: {
      paper: "#14161A",
      ink: "#E6E8EB",
      muted: "#8A9199",
      accent: "#3E5C6B",
    },
  },
  {
    slug: "feeding-san-francisco",
    sheet: "A-003",
    title: "Feeding San Francisco",
    year: "TBC",
    discipline: "To be confirmed",
    thumbnail: "/images/placeholder-feeding-san-francisco.svg",
    thumbnailAlt: "Placeholder image for the Feeding San Francisco project",
    // PLACEHOLDER — Jamnie has not chosen this project's palette yet.
    palette: {
      paper: "#15140F",
      ink: "#EDE9DF",
      muted: "#9A9481",
      accent: "#7A6A32",
    },
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
