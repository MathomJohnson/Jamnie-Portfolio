import type { Transition, Variants } from "motion/react";

export const easeOutQuint = [0.16, 1, 0.3, 1] as const;

export const transition: Transition = {
  duration: 0.9,
  ease: easeOutQuint,
};

/** Parent for staggered entrances. Children opt in with `riseVariants`. */
export const stagger = (staggerChildren = 0.09, delayChildren = 0): Variants => ({
  hidden: {},
  visible: {
    transition: { staggerChildren, delayChildren },
  },
});

export const riseVariants: Variants = {
  hidden: { opacity: 0, y: 26 },
  visible: { opacity: 1, y: 0, transition },
};

export const fadeVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition },
};

/** A drafted rule that draws itself from the left. */
export const ruleVariants: Variants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 1.1, ease: easeOutQuint },
  },
};

/** Wipes an image in from the bottom edge, like a print developing. */
export const wipeVariants: Variants = {
  hidden: { clipPath: "inset(100% 0% 0% 0%)", scale: 1.08 },
  visible: {
    clipPath: "inset(0% 0% 0% 0%)",
    scale: 1,
    transition: { duration: 1.3, ease: easeOutQuint },
  },
};

/** Shared viewport config so every section reveals at the same threshold. */
export const viewport = { once: true, amount: 0.35 } as const;
