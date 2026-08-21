"use client";

import { motion } from "motion/react";
import { riseVariants, ruleVariants } from "@/lib/motion";

type SectionLabelProps = {
  index: string;
  title: string;
  className?: string;
};

/** Mono sheet label with a rule that draws itself, echoing Jamnie's drawing sets. */
export function SectionLabel({ index, title, className = "" }: SectionLabelProps) {
  return (
    <motion.div variants={riseVariants} className={className}>
      <div className="flex items-baseline gap-4 font-mono text-[0.6875rem] tracking-[0.28em] text-ink/55 uppercase">
        <span>{index}</span>
        <span className="text-ink/80">{title}</span>
      </div>
      <motion.div
        variants={ruleVariants}
        className="mt-3 h-px w-full origin-left bg-ink/20"
      />
    </motion.div>
  );
}
