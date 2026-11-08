/**
 * Design QA harness: screenshots each section at desktop, laptop and phone sizes.
 * Headless Chrome reports `hover: none` by default, which would hide the real
 * pointer-device styling, so the pointer profile is forced via Blink settings.
 *
 * Usage: node scripts/shots.mjs   (with `npm run dev` already running)
 */
import { mkdir } from "node:fs/promises";
import puppeteer from "puppeteer-core";

const OUT = new URL("../.design-shots/", import.meta.url).pathname;
const BASE = "http://localhost:3000";
const CHROME = process.env.CHROME_PATH ?? "/usr/bin/google-chrome";

const POINTER_DEVICE =
  "--blink-settings=primaryHoverType=2,availableHoverTypes=2,primaryPointerType=4,availablePointerTypes=4";
const TOUCH_DEVICE =
  "--blink-settings=primaryHoverType=1,availableHoverTypes=1,primaryPointerType=2,availablePointerTypes=2";

await mkdir(OUT, { recursive: true });

async function withBrowser(flag, run) {
  const browser = await puppeteer.launch({
    executablePath: CHROME,
    headless: "new",
    args: ["--no-sandbox", "--disable-dev-shm-usage", flag],
  });
  try {
    await run(browser);
  } finally {
    await browser.close();
  }
}

async function shoot(browser, name, opts) {
  const { url = "/", width, height, scrollTo, hover, wait = 2200 } = opts;
  const page = await browser.newPage();
  await page.setViewport({ width, height, deviceScaleFactor: 1 });
  await page.goto(BASE + url, { waitUntil: "networkidle0" });

  if (scrollTo) {
    await page.evaluate((selector) => {
      document.querySelector(selector)?.scrollIntoView({ behavior: "instant", block: "start" });
    }, scrollTo);
  }

  await new Promise((resolve) => setTimeout(resolve, wait));

  if (hover) {
    await page.hover(hover);
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  await page.screenshot({ path: `${OUT}${name}.png` });
  console.log("shot", name);
  await page.close();
}

const fsfSections = ["overview", "system", "question", "identity", "hands", "ninety", "kitchen", "we"];
const fsf = "/projects/feeding-san-francisco";

const desktop = { width: 1440, height: 900 };
const laptop = { width: 1280, height: 720 };
const phone = { width: 390, height: 844 };

await withBrowser(POINTER_DEVICE, async (browser) => {
  await shoot(browser, "d1-hero", { ...desktop });
  await shoot(browser, "d2-about", { ...desktop, scrollTo: "#about" });
  await shoot(browser, "d3-gallery", { ...desktop, scrollTo: "#work" });
  await shoot(browser, "d4-gallery-hover", {
    ...desktop,
    scrollTo: "#work",
    hover: 'a[href="/projects/feeding-san-francisco"]',
  });
  await shoot(browser, "d5-contact", { ...desktop, scrollTo: "#contact" });
  await shoot(browser, "d6-contact-hover", {
    ...desktop,
    scrollTo: "#contact",
    hover: 'a[href^="mailto:"]',
  });
  await shoot(browser, "d7-irene-front", { ...desktop, url: "/projects/irene" });
  await shoot(browser, "d7b-irene-front-caption", {
    ...desktop,
    url: "/projects/irene",
    hover: "#slide-front .slide",
    wait: 2800,
  });
  await shoot(browser, "d7c-irene-backstory", {
    ...desktop,
    url: "/projects/irene",
    scrollTo: "#slide-backstory",
  });
  await shoot(browser, "d7d-irene-spin", {
    ...desktop,
    url: "/projects/irene",
    scrollTo: "#slide-spin",
    wait: 3500,
  });
  await shoot(browser, "d7e-irene-balcony", {
    ...desktop,
    url: "/projects/irene",
    scrollTo: "#slide-balcony",
    wait: 3500,
  });
  await shoot(browser, "d7f-irene-roof", {
    ...desktop,
    url: "/projects/irene",
    scrollTo: "#slide-roof",
  });
  await shoot(browser, "d7g-irene-level", {
    ...desktop,
    url: "/projects/irene",
    scrollTo: "#slide-level-01",
  });
  await shoot(browser, "d7h-irene-units", {
    ...desktop,
    url: "/projects/irene",
    scrollTo: "#slide-units",
  });
  await shoot(browser, "d7i-irene-elevations", {
    ...desktop,
    url: "/projects/irene",
    scrollTo: "#slide-elevations",
  });
  await shoot(browser, "d7j-irene-glazing", {
    ...desktop,
    url: "/projects/irene",
    scrollTo: "#slide-glazing",
  });
  await shoot(browser, "l1-hero", { ...laptop });
  await shoot(browser, "l2-gallery", { ...laptop, scrollTo: "#work" });
  for (const [i, id] of fsfSections.entries()) {
    await shoot(browser, `d9-fsf-${i + 1}-${id}`, { ...desktop, url: fsf, scrollTo: `#${id}` });
    await shoot(browser, `l9-fsf-${i + 1}-${id}`, { ...laptop, url: fsf, scrollTo: `#${id}` });
  }
});

await withBrowser(TOUCH_DEVICE, async (browser) => {
  await shoot(browser, "m1-hero", { ...phone });
  await shoot(browser, "m2-about", { ...phone, scrollTo: "#about" });
  await shoot(browser, "m3-gallery", { ...phone, scrollTo: "#work" });
  await shoot(browser, "m4-contact", { ...phone, scrollTo: "#contact" });
  for (const [i, id] of fsfSections.entries()) {
    await shoot(browser, `m9-fsf-${i + 1}-${id}`, { ...phone, url: fsf, scrollTo: `#${id}` });
  }
  await shoot(browser, "m5-irene", { ...phone, url: "/projects/irene" });
  await shoot(browser, "m6-irene-backstory", {
    ...phone,
    url: "/projects/irene",
    scrollTo: "#slide-backstory",
  });
  await shoot(browser, "m7-irene-level", {
    ...phone,
    url: "/projects/irene",
    scrollTo: "#slide-level-01",
  });
  await shoot(browser, "m7b-irene-units", {
    ...phone,
    url: "/projects/irene",
    scrollTo: "#slide-units",
  });
  await shoot(browser, "m7c-irene-elevations", {
    ...phone,
    url: "/projects/irene",
    scrollTo: "#slide-elevations",
  });
  await shoot(browser, "m7d-irene-glazing", {
    ...phone,
    url: "/projects/irene",
    scrollTo: "#slide-glazing",
  });
});
