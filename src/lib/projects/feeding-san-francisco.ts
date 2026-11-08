/** Copy is from Jamnie's "Second Year Evolution" email; keep her wording. */

export type FsfImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

const dir = "/images/projects/feeding-san-francisco";

export const fsfImages = {
  logo: {
    src: `${dir}/logo.svg`,
    alt: "Feeding San Francisco logo: a red Golden Gate Bridge line drawing ending in an arrow",
    width: 800,
    height: 800,
  },
  system: {
    src: `${dir}/system-diagram.webp`,
    alt: "Diagram of the system: resources flow from USF out to people in the community, and a handwritten card goes into each box",
    width: 1774,
    height: 887,
  },
  openBox: {
    src: `${dir}/open-box.webp`,
    alt: "An open resource box packed with snacks, a tuna lunch kit, hygiene items and a Feeding San Francisco card",
    width: 1800,
    height: 2400,
  },
  cards: [
    {
      src: `${dir}/card-story.webp`,
      alt: "Prompt card reading: Write a story from my life to yours",
      width: 1197,
      height: 859,
    },
    {
      src: `${dir}/card-aspiration.webp`,
      alt: "Prompt card reading: Give a few words of aspiration",
      width: 1197,
      height: 859,
    },
    {
      src: `${dir}/card-encouragement.webp`,
      alt: "Prompt card reading: Share words of encouragement",
      width: 1197,
      height: 859,
    },
  ],
  thankYou: {
    src: `${dir}/thank-you-sticker.webp`,
    alt: "Thank-you packaging sticker: We Appreciate Your Support",
    width: 400,
    height: 600,
  },
  tissue: {
    src: `${dir}/tissue-paper.webp`,
    alt: "Red tissue paper printed with white icons of food, hygiene items and envelopes",
    width: 1542,
    height: 1250,
  },
  transport: {
    src: `${dir}/transport.webp`,
    alt: "A student stacking sealed boxes onto a blue USF cart for transport",
    width: 1800,
    height: 2400,
  },
  stickerBox: {
    src: `${dir}/sticker-box.webp`,
    alt: "Close-up of the Feeding San Francisco sticker sealing a kraft box",
    width: 1800,
    height: 2400,
  },
  boxWall: {
    src: `${dir}/box-wall.webp`,
    alt: "Ninety labelled resource boxes stacked in rows along a window",
    width: 2400,
    height: 1800,
  },
  distribution: {
    src: `${dir}/distribution.webp`,
    alt: "Students handing out resource boxes from a table at the distribution site",
    width: 1800,
    height: 2400,
  },
  recipient: {
    src: `${dir}/recipient.webp`,
    alt: "A community member holding a resource box and a bowl of food",
    width: 2400,
    height: 1800,
  },
} satisfies Record<string, FsfImage | FsfImage[]>;

export const fsfCopy = {
  title: "Feeding San Francisco",
  kicker: "Second Year Evolution",
  subtitle: "Designing Systems of Care",
  meta: "2025 / Community design",

  system: [
    "The second year is where Feeding San Francisco found its true direction. What began as a simple donation effort evolved into a designed system, a structured, intentional experience built around care, dignity, and access. Instead of collecting whatever non‑perishables came in, I began curating targeted resource boxes sourced directly from undistributed student meal plan funds. This was the shift that transformed the project from passive collection into active design.",
    "Receiving grants each semester gave me the freedom to shape the initiative however I saw fit. I approached it the way I approach architecture: by asking what the system needed to accomplish, who it served, and how design could make that experience clearer, kinder, and more effective.",
  ],

  questionIntro: "Each box was built around one question:",
  question: "How much relief can it offer, and for how long?",
  boxes: [
    {
      size: "Small",
      dims: "9 × 6",
      body: "Small boxes provided immediate hygiene and quick calories for short‑term comfort.",
    },
    {
      size: "Medium",
      dims: "12 × 9",
      body: "Medium boxes offered 2–3 days of support, adding items like socks and reusable bottles.",
    },
    {
      size: "Large",
      dims: "12 × 12",
      body: "Large boxes extended relief for a full week, including shelf‑stable meals, hygiene items, and small personal touches like notebooks and pens.",
    },
  ],
  questionClose:
    "Each box was curated to balance practicality and care, emphasizing design as a form of empathy.",

  identity: [
    "The design process became central to the project’s identity. We developed a logo, box design, and cards that carried handwritten letters from students, each one a message of encouragement and care. This transformed the act of donation into something tangible and personal, reminding both giver and receiver that compassion can be designed, felt, and shared.",
    "None of this happened alone. The visual identity and packaging were created in collaboration with a graphic design student I met through the art department. I set the vision and she brought it to life.",
  ],

  hands:
    "Campus clubs joined in, hosting tabling events to collect donations and help fill boxes. One partnership with the engineering club brought in enough contributions for about thirty boxes in a single event.",

  ninety:
    "For our second year, the project produced 90 fully curated resource boxes, along with additional pantry ready items.",

  kitchen:
    "We partnered with Mother Brown’s Kitchen in San Francisco, who received all 90 boxes plus the extra resources. They invited us to set up tables on site, allowing us to personally distribute the boxes to individuals from their community who were registered for aid.",

  closing:
    "This year marked the first time Feeding San Francisco truly became a “we.” What started as a personal vision evolved into a collective effort, students, artists, and community members working together to turn empathy into action. It demonstrated the impact of a designed care system and the strength of student driven community support.",
  signature: "Jamnie",
} as const;
