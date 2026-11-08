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
        <SectionLabel index="03" title="Selected Work" />

        <div className="mx-auto mt-8 grid max-w-4xl grid-cols-1 gap-4 sm:mt-10 sm:grid-cols-2 sm:gap-5 lg:gap-8">
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
      className="group relative block overflow-hidden border border-ink/15 transition-[border-color,box-shadow,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-ink/45 hover:shadow-[0_18px_40px_-18px_rgba(42,37,31,0.55)] focus-visible:-translate-y-1 focus-visible:border-ink/45 focus-visible:shadow-[0_18px_40px_-18px_rgba(42,37,31,0.55)]"
    >
      {/* 4:3 tiles on phones; tall portrait tiles from sm up. */}
      <div
        className="relative aspect-[4/3] w-full sm:aspect-auto sm:h-[52vh] sm:max-h-[30rem] sm:min-h-[16rem]"
        style={project.thumbnailContain ? { backgroundColor: project.palette.paper } : undefined}
      >
        <Image
          src={project.thumbnail}
          alt={project.thumbnailAlt}
          fill
          sizes="(min-width: 640px) 45vw, 90vw"
          className={`${project.thumbnailContain ? "object-contain" : "object-cover"} brightness-[0.97] grayscale-[0.4] transition-[transform,filter] duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.045] group-hover:brightness-100 group-hover:grayscale-0 group-focus-visible:scale-[1.045] group-focus-visible:grayscale-0`}
        />

        {/* Title is always shown; hover lifts the card and brings the image to full colour. */}
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-ink/90 via-ink/45 to-transparent"
        />

        <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
          <p className="font-display text-[clamp(1.5rem,2.1vw,2rem)] leading-[1.1] font-light text-balance text-paper italic">
            {project.title}
          </p>
        </div>
      </div>
    </Link>
  );
}
