import MapShell from "@/src/components/layout/MapShell";
import ChapterHeader from "@/src/components/layout/ChapterHeader";
import ProjectCard from "@/src/components/projects/ProjectCard";
import projectsData from "@/src/data/content/projects.json";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects | Ved Patil — Software Portfolio",
  description:
    "Explore the software engineering projects, web applications, full-stack solutions, and open-source software built by Ved Patil.",
  alternates: {
    canonical: "https://vedpatil.in/projects",
  },
};

export default function ProjectsPage() {
  const projects = projectsData.projects;

  return (
    <MapShell>
      <section className="page-container pb-12" aria-labelledby="projects-title">
        <ChapterHeader
          id="projects-title"
          chapter="Chapter III"
          title="The Workshop"
          subtitle="Things I've built — and the stories behind them"
        />

        {/* Why: Pinterest-style masonry via CSS columns — tiles keep their natural screenshot proportions and
            flow into 1/2/3 columns with no JS layout. Impact: break-inside-avoid keeps each card whole. */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-5 md:gap-6 mt-8">
          {projects.map((project, i) => (
            <div key={project.id} className="reveal break-inside-avoid mb-5 md:mb-6">
              <ProjectCard project={project} index={i} priority={i < 3} />
            </div>
          ))}
        </div>
      </section>
    </MapShell>
  );
}
