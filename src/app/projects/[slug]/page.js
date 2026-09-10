// src/app/projects/[slug]/page.js
import { notFound } from "next/navigation";
import { projects, getProjectBySlug, getAllProjectSlugs } from "@/data/projects";
import ProjectBanner from "@/components/ProjectBanner";

// Pre-render both project pages at build time
export function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

// Per-page <title> / meta
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: `${project.name} | PKR Estates`,
    description: project.tagline,
  };
}

export default async function ProjectDetailPage({ params }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const hasUnitTypes = project.unitTypes && project.unitTypes.length > 0;
  const hasAmenities = project.amenities && project.amenities.length > 0;
  const hasLandmarks =
    project.nearbyLandmarks && project.nearbyLandmarks.length > 0;
  const hasGallery = project.gallery && project.gallery.length > 0;

  return (
    <main className="project-detail">
      {/* Banner */}
      <ProjectBanner project={project} />

    
      

     

      <style>{`
        .project-detail {
          width: 100%;
          color: #1a1a1a;
          font-family: inherit;
        }

        .section {
          padding: 3rem 6vw;
          border-bottom: 1px solid #eee;
        }

        .section h2 {
          font-size: 1.6rem;
          margin: 0 0 1.2rem;
        }

        .overview p {
          max-width: 70ch;
          line-height: 1.7;
          color: #444;
        }

        .overview-stats {
          display: flex;
          gap: 2.5rem;
          margin-top: 1.8rem;
          flex-wrap: wrap;
        }

        .stat {
          display: flex;
          flex-direction: column;
        }

        .stat-value {
          font-size: 1.4rem;
          font-weight: 700;
        }

        .stat-label {
          font-size: 0.85rem;
          color: #777;
          margin-top: 0.2rem;
        }

        table {
          width: 100%;
          max-width: 640px;
          border-collapse: collapse;
        }

        th,
        td {
          text-align: left;
          padding: 0.75rem 1rem;
          border-bottom: 1px solid #eee;
        }

        th {
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          color: #777;
        }

        .amenities-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
          gap: 1rem;
        }

        .amenity-card {
          background: #f7f7f7;
          border-radius: 8px;
          padding: 1rem 1.2rem;
          font-size: 0.95rem;
        }

        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 1rem;
        }

        .gallery-item {
          aspect-ratio: 4 / 3;
          background-size: cover;
          background-position: center;
          background-color: #e5e5e5;
          border-radius: 8px;
        }

        .landmarks-list {
          list-style: none;
          margin: 0;
          padding: 0;
          max-width: 640px;
        }

        .landmarks-list li {
          display: flex;
          justify-content: space-between;
          padding: 0.7rem 0;
          border-bottom: 1px solid #eee;
          font-size: 0.95rem;
        }

        .cta {
          text-align: center;
          border-bottom: none;
        }

        .cta-button {
          display: inline-block;
          margin-top: 1rem;
          padding: 0.9rem 2.4rem;
          background: #1a1a1a;
          color: #fff;
          text-decoration: none;
          border-radius: 6px;
          font-weight: 600;
        }

        @media (max-width: 640px) {
          .section {
            padding: 2.2rem 6vw;
          }

          .overview-stats {
            gap: 1.5rem;
          }
        }
      `}</style>
    </main>
  );
}