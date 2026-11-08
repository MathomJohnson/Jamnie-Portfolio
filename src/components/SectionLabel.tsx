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
      <div className="label flex items-baseline gap-4">
        <span>{index}</span>
        <span>{title}</span>
      </div>
      <motion.div
        variants={ruleVariants}
        className="mt-3 h-px w-full origin-left bg-ink/25"
      />
    </motion.div>
  );
}
