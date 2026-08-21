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
  await shoot(browser, "d7-irene", { ...desktop, url: "/projects/irene" });
  await shoot(browser, "d8-virgo", { ...desktop, url: "/projects/virgo" });
  await shoot(browser, "l1-hero", { ...laptop });
  await shoot(browser, "l2-gallery", { ...laptop, scrollTo: "#work" });
});

await withBrowser(TOUCH_DEVICE, async (browser) => {
  await shoot(browser, "m1-hero", { ...phone });
  await shoot(browser, "m2-about", { ...phone, scrollTo: "#about" });
  await shoot(browser, "m3-gallery", { ...phone, scrollTo: "#work" });
  await shoot(browser, "m4-contact", { ...phone, scrollTo: "#contact" });
  await shoot(browser, "m5-irene", { ...phone, url: "/projects/irene" });
});
