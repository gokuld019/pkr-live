import { notFound } from "next/navigation";
import {
  completedProjects,
  getCompletedProjectBySlug,
  getAllCompletedProjectSlugs,
} from "@/data/completedProjects";
import CompletedProjectView from "@/components/completed/CompletedProjectView";

export function generateStaticParams() {
  return getAllCompletedProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = getCompletedProjectBySlug(slug);
  if (!project) return {};

  return {
    title: `${project.name} — Completed Project | PKR Estates`,
    description: project.tagline,
  };
}

export default async function CompletedProjectPage({ params }) {
  const { slug } = await params;
  const project = getCompletedProjectBySlug(slug);
  if (!project) notFound();

  const otherProjects = completedProjects.filter((p) => p.slug !== project.slug);

  return <CompletedProjectView project={project} otherProjects={otherProjects} />;
}