"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { Section } from "@/components/Section";
import { SectionLabel } from "@/components/SectionLabel";
import { projects, type Project } from "@/lib/projects";
import { riseVariants, stagger, viewport } from "@/lib/motion";

export function Gallery() {
  return (
    <Section id="work">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        variants={stagger()}
        className="mx-auto w-full max-w-6xl"
      >
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionLabel index="03" title="Selected Work" className="min-w-[14rem] flex-1" />
          <motion.p
            variants={riseVariants}
            className="font-mono text-[0.625rem] tracking-[0.22em] text-ink/40 uppercase"
          >
            Three projects
          </motion.p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:mt-10 sm:grid-cols-3 sm:gap-5 lg:gap-8">
          {projects.map((project) => (
            <motion.div key={project.slug} variants={riseVariants}>
              <ProjectTile project={project} />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </Section>
  );
}

function ProjectTile({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      aria-label={`Open the ${project.title} project`}
      className="group relative block overflow-hidden border border-ink/15 transition-colors duration-500 hover:border-ink/45 focus-visible:border-ink/45"
    >
      {/* Short landscape crops on phones keep all three tiles inside one screen. */}
      <div className="relative h-[21vh] max-h-[30rem] min-h-[8.5rem] w-full sm:h-[52vh] sm:min-h-[16rem]">
        <Image
          src={project.thumbnail}
          alt={project.thumbnailAlt}
          fill
          sizes="(min-width: 640px) 32vw, 90vw"
          className="object-cover brightness-[0.97] grayscale-[0.4] transition-[transform,filter] duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.045] group-hover:brightness-100 group-hover:grayscale-0 group-focus-visible:scale-[1.045] group-focus-visible:grayscale-0"
        />

        {/* Caption is hidden until hover on pointer devices, and always shown on touch. */}
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-ink/90 via-ink/45 to-transparent opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100 group-focus-visible:opacity-100 [@media(hover:none)]:opacity-100"
        />

        <div className="absolute inset-x-0 bottom-0 translate-y-3 p-4 opacity-0 transition-[opacity,transform] duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 sm:p-5 [@media(hover:none)]:translate-y-0 [@media(hover:none)]:opacity-100">
          <p className="font-mono text-[0.625rem] tracking-[0.28em] text-paper/65 uppercase">
            {project.sheet}
          </p>
          <p className="mt-1.5 font-display text-[clamp(1.5rem,2.1vw,2rem)] leading-[1.1] font-light text-balance text-paper italic">
            {project.title}
          </p>
        </div>
      </div>
    </Link>
  );
}
