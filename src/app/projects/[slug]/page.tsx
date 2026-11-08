import type { Metadata } from "next";
import { Big_Shoulders } from "next/font/google";
import { notFound } from "next/navigation";
import { FeedingSanFranciscoProject } from "@/components/project/feeding-san-francisco/FeedingSanFranciscoProject";
import { IreneProject } from "@/components/project/irene/IreneProject";
import { getProject, projects } from "@/lib/projects";
import { PlaceholderProject } from "@/components/project/PlaceholderProject";

const bigShoulders = Big_Shoulders({
  subsets: ["latin"],
  weight: ["400", "700", "800", "900"],
  variable: "--font-big-shoulders",
  display: "swap",
});

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata(
  props: PageProps<"/projects/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const project = getProject(slug);

  if (!project) return {};

  if (slug === "irene") {
    return {
      title: `${project.title} — Jamnie Whawhen`,
      description:
        "Six floors of red steel and glass. Irene began in Rhino during a third full redesign before being rebuilt in Revit.",
    };
  }

  if (slug === "feeding-san-francisco") {
    return {
      title: `${project.title} — Jamnie Whawhen`,
      description:
        "Designing systems of care: 90 curated resource boxes, designed and packed by students and distributed at Mother Brown's Kitchen in San Francisco.",
    };
  }

  return {
    title: `${project.title} — Jamnie Whawhen`,
  };
}

export default async function ProjectPage(props: PageProps<"/projects/[slug]">) {
  const { slug } = await props.params;
  const project = getProject(slug);

  if (!project) notFound();

  if (slug === "irene") {
    return (
      <div className={`${bigShoulders.variable} h-dvh`}>
        <IreneProject />
      </div>
    );
  }

  if (slug === "feeding-san-francisco") {
    return <FeedingSanFranciscoProject project={project} />;
  }

  return <PlaceholderProject project={project} />;
}
