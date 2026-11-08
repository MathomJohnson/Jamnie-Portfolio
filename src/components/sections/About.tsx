"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Section } from "@/components/Section";
import { SectionLabel } from "@/components/SectionLabel";
import { about } from "@/lib/content";
import { riseVariants, stagger, viewport } from "@/lib/motion";

export function About() {
  const [lede, ...rest] = about.paragraphs;

  return (
    <Section id="about">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        variants={stagger()}
        className="mx-auto grid w-full max-w-7xl grid-cols-1 items-start gap-10 md:grid-cols-12 md:gap-x-16 lg:gap-x-20"
      >
        <SectionLabel index="02" title="About" className="md:col-span-12" />

        <motion.figure variants={riseVariants} className="md:col-span-5 md:row-start-2">
          <div className="relative aspect-[3/4] w-full max-h-[calc(100dvh-13rem)] overflow-hidden border border-ink/20">
            <Image
              src={about.portrait.src}
              alt={about.portrait.alt}
              fill
              sizes="(min-width: 768px) 40vw, 90vw"
              className="object-cover object-top"
            />
          </div>
          <figcaption className="mt-2.5 hidden justify-end md:flex font-mono text-[0.625rem] tracking-[0.22em] text-ink/45 uppercase">
            <span>Fig. 02</span>
          </figcaption>
        </motion.figure>

        <div className="md:col-span-7 md:row-start-2 md:self-center">
          <motion.p
            variants={riseVariants}
            className="font-display text-[clamp(1.125rem,2.4vw,1.75rem)] leading-[1.55] font-normal text-ink"
          >
            {lede}
          </motion.p>

          {rest.map((paragraph) => (
            <motion.p
              key={paragraph.slice(0, 32)}
              variants={riseVariants}
              className="mt-8 max-w-2xl text-[0.9375rem] leading-[1.85] font-normal text-ink/85"
            >
              {paragraph}
            </motion.p>
          ))}
        </div>
      </motion.div>
    </Section>
  );
}
