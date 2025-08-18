import { ReactNode } from "react";
import ProjectNav from "@/components/ProjectNav";

// Define project order for navigation
const projects = [
  "docplanner-ia",
  "multitood",
  "runchise",
  "watson-design-system",
  "nikola-chmiel",
];

export default async function ProjectLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const currentIndex = projects.indexOf(slug);
  const nextProjectSlug =
    currentIndex >= 0 && currentIndex < projects.length - 1
      ? projects[currentIndex + 1]
      : undefined;

  const title = slug.replace(/-/g, " ");

  return (
    <>
      <div className="pt-16">{children}</div>
      <ProjectNav title={title} nextProjectSlug={nextProjectSlug} />
    </>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const title = slug.replace(/-/g, " ");
  return {
    title: `${title} — Rafał Ziółek`,
    description: `${title} case study`,
  };
}
