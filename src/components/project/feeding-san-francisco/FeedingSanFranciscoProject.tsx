"use client";

import Image from "next/image";
import { motion } from "motion/react";
import type { ReactNode } from "react";
import { IndexLink } from "@/components/project/IndexLink";
import { Section } from "@/components/Section";
import { SectionLabel } from "@/components/SectionLabel";
import { projects, type Project } from "@/lib/projects";
import {
  fsfCopy as copy,
  fsfImages as img,
  type FsfImage,
} from "@/lib/projects/feeding-san-francisco";
import { fadeVariants, riseVariants, stagger, viewport } from "@/lib/motion";

const accent = "text-[var(--accent)]";
const body = "text-[0.9375rem] leading-[1.85] text-ink/85";
const lede = "font-display text-[clamp(1.0625rem,1.6vw,1.375rem)] leading-[1.55] text-ink";

/** Home-page building blocks (Section, SectionLabel, Fig. captions) on the beige sheet, with the FSF red as accent. */
export function FeedingSanFranciscoProject({ project }: { project: Project }) {
  // Match by slug: the prop is a serialized copy, so indexOf(project) would miss.
  const number = String(projects.findIndex((p) => p.slug === project.slug) + 1).padStart(2, "0");
  const total = String(projects.length).padStart(2, "0");

  return (
    <div style={{ "--accent": project.palette.accent } as React.CSSProperties}>
      <div aria-hidden className="drafting-grid pointer-events-none fixed inset-0 z-0" />

      <header className="fixed top-0 left-0 z-30 px-5 py-5 sm:px-8 sm:py-6">
        <IndexLink href="/#work" className="bg-paper/85 px-2 py-1 text-ink backdrop-blur-sm" />
      </header>

      <main className="relative z-10">
        {/* 01 Overview */}
        <Section id="overview" className="pt-24">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger(0.11, 0.15)}
            className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-16"
          >
            <div>
              <motion.p variants={riseVariants} className="label">
                {copy.kicker}
              </motion.p>
              <h1 className="mt-5 font-display leading-[0.9] font-light tracking-[-0.02em] sm:mt-6">
                <motion.span variants={riseVariants} className="block text-[clamp(3rem,8vw,6.5rem)]">
                  Feeding
                </motion.span>
                <motion.span variants={riseVariants} className="block text-[clamp(3rem,8vw,6.5rem)] italic">
                  San Francisco
                </motion.span>
              </h1>
              <motion.div variants={fadeVariants} className="mt-8 h-0.5 w-20 origin-left bg-[var(--accent)]" />
              <motion.p
                variants={riseVariants}
                className="mt-6 font-display text-[clamp(1.375rem,2.4vw,2rem)] leading-tight italic"
              >
                {copy.subtitle}
              </motion.p>
              <motion.p variants={riseVariants} className="mt-4 font-mono text-[0.6875rem] tracking-[0.24em] text-ink/55 uppercase">
                {copy.meta}
              </motion.p>
            </div>
            {/* The logo's square artboard has its own margin, so no Fig. caption here. */}
            <motion.div variants={riseVariants}>
              <Image
                src={img.logo.src}
                alt={img.logo.alt}
                width={img.logo.width}
                height={img.logo.height}
                priority
                className="mx-auto h-auto max-h-56 w-auto max-w-full md:max-h-[min(52dvh,30rem)]"
              />
            </motion.div>
          </motion.div>
        </Section>

        {/* 02 A Designed System */}
        <Sheet id="system" index="02" title="A Designed System">
          <div className="md:col-span-7">
            <motion.p variants={riseVariants} className={lede}>
              {copy.system[0]}
            </motion.p>
            <motion.p variants={riseVariants} className={`mt-6 max-w-2xl ${body}`}>
              {copy.system[1]}
            </motion.p>
          </div>
          <Figure image={img.system} fig="02" label="The system" className="md:col-span-5" />
        </Sheet>

        {/* 03 One Question */}
        <Sheet id="question" index="03" title="One Question">
          <div className="md:col-span-8">
            <motion.p variants={riseVariants} className="label">
              {copy.questionIntro}
            </motion.p>
            <motion.p
              variants={riseVariants}
              className={`mt-4 font-display text-[clamp(1.75rem,3.6vw,3rem)] leading-[1.1] italic ${accent}`}
            >
              {copy.question}
            </motion.p>
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-6">
              {copy.boxes.map((box) => (
                <motion.div key={box.size} variants={riseVariants} className="border-t border-ink/25 pt-4">
                  <p className="flex items-baseline justify-between font-mono text-[0.6875rem] tracking-[0.22em] uppercase">
                    <span>{box.size}</span>
                    <span className={accent}>{box.dims}</span>
                  </p>
                  <p className="mt-3 text-[0.875rem] leading-[1.7] text-ink/80">{box.body}</p>
                </motion.div>
              ))}
            </div>
            <motion.p variants={riseVariants} className={`mt-8 max-w-xl ${body}`}>
              {copy.questionClose}
            </motion.p>
          </div>
          <Figure image={img.openBox} fig="03" label="Inside a box" className="mx-auto md:col-span-4" imgClassName="max-h-[min(62dvh,36rem)]" />
        </Sheet>

        {/* 04 Identity */}
        <Sheet id="identity" index="04" title="Identity">
          <div className="md:col-span-5">
            <motion.p variants={riseVariants} className={lede}>
              {copy.identity[0]}
            </motion.p>
            <motion.p variants={riseVariants} className={`mt-6 ${body}`}>
              {copy.identity[1]}
            </motion.p>
          </div>
          <motion.figure variants={riseVariants} className="md:col-span-7">
            <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
              {img.cards.map((card) => (
                <Image
                  key={card.src}
                  src={card.src}
                  alt={card.alt}
                  width={card.width}
                  height={card.height}
                  sizes="(min-width: 768px) 18vw, 30vw"
                  className="h-auto w-full border border-ink/20"
                />
              ))}
              <div className="relative col-span-2 aspect-[2/1] overflow-hidden border border-ink/20">
                <Image src={img.tissue.src} alt={img.tissue.alt} fill sizes="(min-width: 768px) 36vw, 60vw" className="object-cover" />
              </div>
              <div className="relative border border-ink/20 bg-[var(--accent)]">
                <Image src={img.thankYou.src} alt={img.thankYou.alt} fill sizes="(min-width: 768px) 18vw, 30vw" className="object-contain" />
              </div>
            </div>
            <Caption fig="04" label="Cards, sticker, tissue" />
          </motion.figure>
        </Sheet>

        {/* 05 Many Hands */}
        <Sheet id="hands" index="05" title="Many Hands">
          <div className="md:col-span-5">
            <motion.p variants={riseVariants} className={`font-display text-[clamp(4.5rem,10vw,8rem)] leading-none font-light italic ${accent}`}>
              30
            </motion.p>
            <motion.p variants={riseVariants} className="label mt-3">
              Boxes from a single event
            </motion.p>
            <motion.p variants={riseVariants} className={`mt-8 ${lede}`}>
              {copy.hands}
            </motion.p>
          </div>
          <div className="mx-auto grid w-full max-w-[min(100%,calc((100dvh-15rem)*1.5))] grid-cols-2 gap-4 md:col-span-7">
            <Figure image={img.transport} fig="05" label="Packed for transport" fill />
            <Figure image={img.stickerBox} fig="06" label="Sealed" fill />
          </div>
        </Sheet>

        {/* 06 Ninety Boxes */}
        <Sheet id="ninety" index="06" title="Ninety Boxes">
          <div className="md:col-span-4">
            <motion.p variants={riseVariants} className={`font-display text-[clamp(6rem,14vw,11rem)] leading-[0.85] font-light italic ${accent}`}>
              90
            </motion.p>
            <motion.p variants={riseVariants} className="label mt-4">
              Curated resource boxes
            </motion.p>
            <motion.p variants={riseVariants} className={`mt-8 ${lede}`}>
              {copy.ninety}
            </motion.p>
          </div>
          <Figure image={img.boxWall} fig="07" label="Year two, packed" className="md:col-span-8" imgClassName="max-h-[min(62dvh,40rem)]" />
        </Sheet>

        {/* 07 Mother Brown's Kitchen */}
        <Sheet id="kitchen" index="07" title="Mother Brown’s Kitchen">
          <div className="md:col-span-4">
            <motion.p variants={riseVariants} className={lede}>
              {copy.kitchen}
            </motion.p>
          </div>
          {/* Column widths follow each photo's aspect ratio so both render at the same height. */}
          <div className="mx-auto grid w-full max-w-[min(100%,calc((100dvh-15rem)*2.08))] grid-cols-[9fr_16fr] gap-4 md:col-span-8">
            <Figure image={img.distribution} fig="08" label="On site" fill />
            <Figure image={img.recipient} fig="09" label="Received" fill />
          </div>
        </Sheet>

        {/* 08 We */}
        <Section id="we" className="pb-28">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={stagger()}
            className="mx-auto w-full max-w-3xl"
          >
            <SectionLabel index="08" title="We" />
            <motion.p variants={riseVariants} className="mt-10 font-display text-[clamp(1.25rem,2.4vw,1.875rem)] leading-[1.5] text-ink">
              {copy.closing}
            </motion.p>
            <motion.div variants={fadeVariants} className="mt-10 h-0.5 w-16 origin-left bg-[var(--accent)]" />
            <motion.p variants={riseVariants} className="mt-5 font-display text-[1.75rem] italic">
              {copy.signature}
            </motion.p>
          </motion.div>

          <footer className="absolute inset-x-0 bottom-0 flex items-center justify-between px-6 py-8 font-mono text-[0.625rem] tracking-[0.24em] text-ink/55 uppercase sm:px-10 lg:px-16">
            <span>Jamnie Whawhen</span>
            <span>
              {number} / {total}
            </span>
          </footer>
        </Section>
      </main>
    </div>
  );
}

/** A standard sheet: section label across the top, then a 12-column row like About. */
function Sheet({ id, index, title, children }: { id: string; index: string; title: string; children: ReactNode }) {
  return (
    <Section id={id}>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        variants={stagger()}
        className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-10 md:grid-cols-12 md:gap-x-14 lg:gap-x-16"
      >
        <SectionLabel index={index} title={title} className="md:col-span-12 md:self-start" />
        {children}
      </motion.div>
    </Section>
  );
}

function Caption({ fig, label }: { fig: string; label: string }) {
  return (
    // Desktop only: phones get the images alone, for a compact layout.
    <figcaption className="mt-2.5 hidden justify-between gap-4 font-mono text-[0.625rem] tracking-[0.22em] text-ink/45 uppercase sm:flex">
      <span>{label}</span>
      <span className="ml-auto whitespace-nowrap">Fig. {fig}</span>
    </figcaption>
  );
}

type FigureProps = {
  image: FsfImage;
  fig: string;
  label: string;
  className?: string;
  /** Height cap for the image; width follows the aspect ratio. */
  imgClassName?: string;
  /** Fill the column width instead of sizing to the height cap. */
  fill?: boolean;
};

/** About-style figure: image with the Fig. caption directly under it. */
function Figure({ image, fig, label, className = "", imgClassName = "max-h-[min(56dvh,34rem)]", fill }: FigureProps) {
  return (
    <motion.figure variants={riseVariants} className={fill ? className : `w-fit max-w-full ${className}`}>
      <Image
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        sizes="(min-width: 768px) 50vw, 100vw"
        className={`block h-auto ${fill ? "w-full" : `w-auto max-w-full ${imgClassName}`} border border-ink/20`}
      />
      <Caption fig={fig} label={label} />
    </motion.figure>
  );
}
