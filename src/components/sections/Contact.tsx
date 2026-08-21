"use client";

import { motion } from "motion/react";
import { ActionLink } from "@/components/ActionLink";
import { Section } from "@/components/Section";
import { SectionLabel } from "@/components/SectionLabel";
import { contact, site } from "@/lib/content";
import { riseVariants, stagger, viewport } from "@/lib/motion";

export function Contact() {
  return (
    <Section id="contact" className="md:justify-between">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        variants={stagger()}
        className="mx-auto flex w-full max-w-4xl flex-1 flex-col justify-center text-center"
      >
        <SectionLabel index="04" title="Contact" className="mx-auto w-full max-w-xs" />

        <motion.blockquote variants={riseVariants} className="mx-auto mt-12 max-w-3xl sm:mt-14">
          <p className="font-display text-[clamp(1.75rem,4.6vw,3.25rem)] leading-[1.25] font-light text-balance text-ink italic">
            &ldquo;{contact.quote}&rdquo;
          </p>
          <footer className="mt-6 font-mono text-[0.625rem] tracking-[0.28em] text-ink/45 uppercase">
            {contact.quoteAttribution}
          </footer>
        </motion.blockquote>

        <motion.div
          variants={riseVariants}
          className="mt-14 flex flex-wrap items-center justify-center gap-4"
        >
          <ActionLink href={`mailto:${site.email}`}>Email me</ActionLink>
          <ActionLink href={site.linkedInUrl} external>
            LinkedIn
          </ActionLink>
        </motion.div>
      </motion.div>

      <motion.footer
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={stagger(0.06)}
        className="mx-auto mt-16 w-full max-w-6xl"
      >
        <motion.div variants={riseVariants} className="h-px w-full bg-ink/15" />
        <motion.div
          variants={riseVariants}
          className="flex flex-col items-center gap-2 pt-5 font-mono text-[0.625rem] tracking-[0.22em] text-ink/40 uppercase sm:flex-row sm:justify-between sm:gap-3"
        >
          <span>{site.name}</span>
          <a
            href={`mailto:${site.email}`}
            className="tracking-[0.12em] lowercase transition-colors hover:text-ink"
          >
            {site.email}
          </a>
          <span>&copy; {new Date().getFullYear()}</span>
        </motion.div>
      </motion.footer>
    </Section>
  );
}
