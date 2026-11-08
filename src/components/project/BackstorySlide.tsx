"use client";

import { motion, useReducedMotion } from "motion/react";
import { ireneBackstory } from "@/lib/projects/irene";
import { riseVariants, stagger } from "@/lib/motion";
import { SlideShell } from "@/components/project/slide-shared";

export function BackstorySlide() {
  const reduce = useReducedMotion();

  return (
    <SlideShell id="slide-backstory" className="bg-[var(--irene-bg)]">
      <motion.div
        initial={reduce ? false : "hidden"}
        whileInView="visible"
        viewport={{ once: true, amount: 0.45 }}
        variants={stagger(0.12, 0.1)}
        className="mx-auto flex h-full w-full max-w-5xl flex-col justify-center px-6 py-24 sm:px-12 lg:px-16"
      >
        <motion.p
          variants={riseVariants}
          className="font-mono text-[0.6875rem] tracking-[0.28em] text-[var(--irene-steel)] uppercase"
        >
          {ireneBackstory.label}
        </motion.p>
        <motion.span
          variants={riseVariants}
          aria-hidden
          className="mt-5 block h-0.5 w-16 bg-[var(--irene-brick)]"
        />
        <motion.p
          variants={riseVariants}
          className="font-condensed mt-8 max-w-4xl text-[clamp(2.5rem,7vw,6rem)] leading-[0.95] font-extrabold tracking-[0.02em] text-[var(--irene-paper)] uppercase"
        >
          {ireneBackstory.body}
        </motion.p>
        <motion.p
          variants={riseVariants}
          className="font-condensed mt-8 max-w-3xl text-[clamp(1.75rem,4.2vw,3.25rem)] leading-[1.05] font-extrabold tracking-[0.02em] text-[var(--irene-accent)] uppercase"
        >
          {ireneBackstory.pull}
        </motion.p>
      </motion.div>
    </SlideShell>
  );
}
