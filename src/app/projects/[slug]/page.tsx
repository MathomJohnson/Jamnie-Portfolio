import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject, projects } from "@/lib/projects";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata(
  props: PageProps<"/projects/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const project = getProject(slug);

  if (!project) return {};

  return {
    title: `${project.title} — Jamnie Whawhen`,
  };
}

export default async function ProjectPage(props: PageProps<"/projects/[slug]">) {
  const { slug } = await props.params;
  const project = getProject(slug);

  if (!project) notFound();

  const { palette } = project;

  return (
    <main
      className="snap-section relative flex min-h-dvh flex-col justify-between px-6 py-10 sm:px-10 lg:px-16"
      style={
        {
          "--paper": palette.paper,
          "--paper-deep": palette.paper,
          "--ink": palette.ink,
          "--muted": palette.muted,
          backgroundColor: palette.paper,
          color: palette.ink,
        } as React.CSSProperties
      }
    >
      <div
        aria-hidden
        className="drafting-grid pointer-events-none absolute inset-0 opacity-40"
      />

      <header className="relative flex items-center justify-between font-mono text-[0.625rem] tracking-[0.24em] uppercase">
        <Link
          href="/#work"
          className="group inline-flex items-center gap-3 transition-opacity hover:opacity-70"
        >
          <span
            aria-hidden
            className="block h-px w-6 transition-all duration-500 group-hover:w-9"
            style={{ backgroundColor: palette.muted }}
          />
          Index
        </Link>
        <span style={{ color: palette.muted }}>{project.sheet}</span>
      </header>

      <div className="relative mx-auto w-full max-w-5xl py-20">
        <p
          className="font-mono text-[0.625rem] tracking-[0.28em] uppercase"
          style={{ color: palette.muted }}
        >
          {project.discipline} / {project.year}
        </p>

        <h1 className="mt-6 font-display text-[clamp(3rem,12vw,9rem)] leading-[0.88] font-light italic">
          {project.title}
        </h1>

        <div className="mt-10 flex w-full items-center">
          <span
            className="block h-0.5 w-24 shrink-0"
            style={{ backgroundColor: palette.accent }}
          />
          <span
            className="block h-px flex-1"
            style={{ backgroundColor: `${palette.muted}59` }}
          />
        </div>

        <p className="mt-10 max-w-lg text-[0.9375rem] leading-relaxed opacity-70">
          The full walkthrough for this project is still being built. It will run
          as vertical scroll-snap slides, one full-bleed image per screen, with
          captions that fade up on hover.
        </p>

        <p
          className="mt-8 inline-flex items-center gap-2.5 font-mono text-[0.625rem] tracking-[0.24em] uppercase"
          style={{ color: palette.muted }}
        >
          <span
            aria-hidden
            className="block size-1.5 rounded-full"
            style={{ backgroundColor: palette.accent }}
          />
          In progress
        </p>
      </div>

      <footer className="relative flex items-center justify-between font-mono text-[0.625rem] tracking-[0.24em] uppercase">
        <span style={{ color: palette.muted }}>Jamnie Whawhen</span>
        <span style={{ color: palette.muted }}>
          {String(projects.indexOf(project) + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
        </span>
      </footer>
    </main>
  );
}
