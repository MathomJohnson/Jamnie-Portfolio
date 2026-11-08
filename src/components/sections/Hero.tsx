"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { ActionLink } from "@/components/ActionLink";
import { Section } from "@/components/Section";
import { hero, site } from "@/lib/content";
import { fadeVariants, riseVariants, stagger, wipeVariants } from "@/lib/motion";

export function Hero() {
  return (
    <Section id="hero">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={stagger(0.11, 0.15)}
        className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-8 sm:gap-12 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)] md:gap-16 lg:gap-24"
      >
        {/* Always the photo's own 3:4 shape. Width is the only constraint: capped on
            phones, and never wider than its column or ~58vh above sm. */}
        <motion.figure variants={riseVariants} className="w-full">
          <div className="relative mx-auto w-full max-w-[18rem] sm:w-[min(100%,43.5vh)] sm:max-w-[25.5rem]">
            <RegistrationMarks />
            <div className="overflow-hidden border border-ink/20">
              <motion.div variants={wipeVariants} className="relative aspect-[3/4] w-full">
                <Image
                  src={hero.portrait.src}
                  alt={hero.portrait.alt}
                  fill
                  priority
                  sizes="(min-width: 640px) 26rem, 18rem"
                  className="object-cover object-top"
                />
              </motion.div>
            </div>
            <motion.figcaption
              variants={fadeVariants}
              className="mt-3 hidden justify-between font-mono text-[0.625rem] tracking-[0.22em] text-ink/45 uppercase sm:flex"
            >
              <span>{site.name}</span>
              <span>Fig. 01</span>
            </motion.figcaption>
          </div>
        </motion.figure>

        <div>
          <motion.p
            variants={riseVariants}
            className="label"
          >
            {site.sheetLabel}
          </motion.p>

          <h1 className="mt-4 font-display leading-[0.86] font-light tracking-[-0.02em] sm:mt-6">
            <motion.span
              variants={riseVariants}
              className="block text-[clamp(3.25rem,11vw,7.5rem)]"
            >
              Jamnie
            </motion.span>
            <motion.span
              variants={riseVariants}
              className="block text-[clamp(3.25rem,11vw,7.5rem)] italic"
            >
              Whawhen
            </motion.span>
          </h1>

          <motion.div
            variants={fadeVariants}
            className="mt-6 h-px w-24 origin-left bg-ink/25 sm:mt-8"
          />

          <motion.p
            variants={riseVariants}
            className="mt-6 max-w-md text-[0.9375rem] leading-relaxed text-ink/70 sm:mt-8"
          >
            {hero.intro}
          </motion.p>

          <motion.div variants={riseVariants} className="mt-8 sm:mt-10">
            <ActionLink href={site.resumeUrl} external>
              Resume
            </ActionLink>
          </motion.div>
        </div>
      </motion.div>

      <ScrollCue />
    </Section>
  );
}

/** Corner ticks borrowed from drawing-sheet registration marks. */
function RegistrationMarks() {
  const corners = [
    "-top-3 -left-3 border-t border-l",
    "-top-3 -right-3 border-t border-r",
    "-bottom-3 -left-3 border-b border-l",
    "-bottom-3 -right-3 border-b border-r",
  ];

  return (
    <>
      {corners.map((position) => (
        <span
          key={position}
          aria-hidden
          className={`pointer-events-none absolute hidden h-6 w-6 border-ink/30 sm:block ${position}`}
        />
      ))}
    </>
  );
}

function ScrollCue() {
  return (
    <motion.a
      href="#about"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.4, duration: 0.8 }}
      className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 font-mono text-[0.625rem] tracking-[0.28em] text-ink/45 uppercase transition-colors hover:text-ink md:flex"
    >
      Scroll
      <span aria-hidden className="relative block h-10 w-px bg-ink/20">
        <motion.span
          className="absolute inset-x-0 top-0 block h-4 bg-ink/50"
          animate={{ y: [0, 24, 24], opacity: [1, 1, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        />
      </span>
    </motion.a>
  );
}
