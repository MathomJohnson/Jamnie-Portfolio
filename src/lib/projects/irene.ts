export type SlideKind = "image" | "text" | "turntable" | "crossfade" | "panels" | "spec";

export type IrenePanel = {
  label: string;
  sheet: string;
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type IreneSlide = {
  id: string;
  kind: SlideKind;
  heading: string;
  caption: string;
  alt?: string;
  src?: string;
  sources?: readonly [string, string];
  width?: number;
  height?: number;
  contain?: boolean;
  layout?: "thirds" | "split";
  panels?: readonly IrenePanel[];
};

export const ireneBackstory = {
  label: "Backstory",
  body: "Irene began in Rhino during a third full redesign before being rebuilt in Revit for the class.",
  pull: "The concept came first. Revit simply gave it structure.",
} as const;

export const ireneSlides: IreneSlide[] = [
  {
    id: "front",
    kind: "image",
    heading: "Irene",
    caption:
      "This is Irene. Six floors of red steel and glass, built around a single idea I couldn't let go of, a mass that reads as powerful the moment you see it. Dense and industrial, with a form that never softens itself.",
    alt: "Front view of Irene, six floors of red steel and glass with a recessed curved balcony",
    src: "/images/projects/irene/front.webp",
    width: 1393,
    height: 1129,
  },
  {
    id: "backstory",
    kind: "text",
    heading: ireneBackstory.label,
    caption: `${ireneBackstory.body} ${ireneBackstory.pull}`,
  },
  {
    id: "spin",
    kind: "turntable",
    heading: "360",
    caption:
      "She narrows as she rises. Towards the roofline each floor sets back from the one below it, creating a corbelled taper that pulls the massing inward. The silhouette becomes more defined the higher you look.",
    alt: "Interactive 360-degree view of Irene",
    src: "/images/projects/irene/side-angle.webp",
    width: 1376,
    height: 1143,
  },
  {
    id: "balcony",
    kind: "crossfade",
    heading: "The Balcony",
    caption:
      "Most balconies cantilever outward into the site. Hers curve back into the building instead. It's a quieter move than the rest of the project, recessed and inward curving, hugging the facade rather than extending away from it. I think it's the most honest structural moment in the building, and probably the one people notice the least.",
    alt: "Recessed balcony of Irene, curving back into the facade",
    sources: [
      "/images/projects/irene/balcony-01.webp",
      "/images/projects/irene/balcony-02.webp",
    ],
    width: 2048,
    height: 1180,
  },
  {
    id: "roof",
    kind: "image",
    heading: "Roof Plan",
    caption:
      "Beneath the red cladding is storefront glazing, some of it frosted, divided by steel mullions that catch and reflect light across the facade. The roof plan reveals how the massing is cut and organized.",
    alt: "Roof plan of Irene showing corbel step-back and cut geometry",
    src: "/images/projects/irene/roof-plan.webp",
    width: 2056,
    height: 1705,
    contain: true,
  },
  {
    id: "level-01",
    kind: "image",
    heading: "First Floor",
    caption: "The first floor holds the entry sequence and the lobby.",
    alt: "Level 01 floor plan of Irene",
    src: "/images/projects/irene/level-01.webp",
    width: 820,
    height: 710,
    contain: true,
  },
  {
    id: "units",
    kind: "panels",
    layout: "thirds",
    heading: "Typical Units",
    caption: "Level 02 — typical units.",
    panels: [
      {
        label: "Unit A",
        sheet: "A-102.1",
        src: "/images/projects/irene/unit-a.webp",
        alt: "Unit A plan",
        width: 1958,
        height: 2317,
      },
      {
        label: "Unit B",
        sheet: "A-102.2",
        src: "/images/projects/irene/unit-b.webp",
        alt: "Unit B plan",
        width: 2907,
        height: 1061,
      },
      {
        label: "Unit C",
        sheet: "A-102.3",
        src: "/images/projects/irene/unit-c.webp",
        alt: "Unit C plan",
        width: 1881,
        height: 2156,
      },
    ],
  },
  {
    id: "elevations",
    kind: "panels",
    layout: "split",
    heading: "Elevations",
    caption: "Bay elevation and the full facade.",
    panels: [
      {
        label: "Bay Elevation",
        sheet: "A-201",
        src: "/images/projects/irene/storefront-bay-1.webp",
        alt: "Detail bay elevation of Irene",
        width: 943,
        height: 2316,
      },
      {
        label: "Full Facade",
        sheet: "A-202",
        src: "/images/projects/irene/storefront-bay-2.webp",
        alt: "Full facade elevation of Irene",
        width: 2428,
        height: 2316,
      },
    ],
  },
  {
    id: "glazing",
    kind: "spec",
    heading: "Storefront Glazing",
    caption:
      "Storefront glazing follows a 15'-0\" floor to floor rhythm, 13' of glass per level under a 2' spandrel band, organized into alternating 8'-9\" and 6'-3\" vertical bays across the facade.",
  },
];

export const ireneTurntable = {
  frameDir: "/turntables/irene-turntable/",
  frameCount: 48,
  framePad: 2,
  frameExt: "webp",
  poster: "/images/projects/irene/side-angle.webp",
  alt: "Drag to rotate a 360-degree view of Irene",
  sensitivity: 8,
} as const;

export const ireneGlazingSpec = {
  heading: "Storefront Glazing",
  sheet: "Sheet A-301",
  rhythm:
    "Storefront glazing follows a 15'-0\" floor to floor rhythm, 13' of glass per level under a 2' spandrel band, organized into alternating 8'-9\" and 6'-3\" vertical bays across the facade.",
  items: [
    { label: "Glass", body: "Frosted storefront glazing, Revit storefront system" },
    { label: "Mullions", body: "Bright silver steel, exposed bar spacing" },
    { label: "Frame", body: "Red steel surround at balcony openings" },
    { label: "Placement", body: "Concentrated at cut/reveal conditions" },
  ],
} as const;

export const ireneIndexHref = "/#work";
export const ireneNext = {
  href: "/projects/feeding-san-francisco",
  label: "Next: Feeding San Francisco",
} as const;
