"use client";

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
        className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-10 md:grid-cols-[minmax(0,0.34fr)_minmax(0,1fr)] md:gap-16 lg:gap-24"
      >
        <div>
          <SectionLabel index="02" title="About" />
        </div>

        <div>
          <motion.p
            variants={riseVariants}
            className="font-display text-[clamp(1.125rem,2.4vw,1.75rem)] leading-[1.55] font-light text-ink"
          >
            {lede}
          </motion.p>

          {rest.map((paragraph) => (
            <motion.p
              key={paragraph.slice(0, 32)}
              variants={riseVariants}
              className="mt-8 max-w-2xl text-[0.9375rem] leading-[1.85] text-ink/70"
            >
              {paragraph}
            </motion.p>
          ))}
        </div>
      </motion.div>
    </Section>
  );
}
