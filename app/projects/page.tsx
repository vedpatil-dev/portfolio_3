import Link from "next/link";
import MapShell from "@/src/components/layout/MapShell";
import projectsData from "@/src/data/content/projects.json";
import { ExternalLink, ArrowRight } from "lucide-react";
import { FaGithub as Github } from "react-icons/fa";

type Project = typeof projectsData.projects[0];

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects | Ved Patil",
  description: "Explore the software engineering projects, web applications, and tools built by Ved Patil.",
};

export default function ProjectsPage() {

  return (
    <MapShell>
      <section className="map-section px-4 py-12 md:py-16" aria-labelledby="projects-title">
        <div className="max-w-5xl w-full mx-auto space-y-10">

          {/* Chapter header */}
          <div className="text-center">
            <p className="font-handwritten text-sm text-ink-faded tracking-widest mb-2 opacity-70">
              Chapter IV
            </p>
            <h1 id="projects-title" className="chapter-header text-3xl md:text-4xl">
              Projects
            </h1>
            <div className="chapter-divider w-48 mx-auto mt-2" />
            <p className="font-handwritten text-base text-ink-faded italic mt-2 opacity-80">
              Things I&apos;ve built — and the stories behind them
            </p>
          </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projectsData.projects.map((project, i) => (
                <article key={project.id} className="artifact-card flex flex-col">
                  {/* Project image */}
                  <div
                    className="relative overflow-hidden"
                    style={{ height: 160, background: "rgba(155,118,65,0.25)" }}
                  >
                    <img
                      src={project.image}
                      alt={`${project.name} preview`}
                      className="w-full h-full object-cover opacity-70 hover:opacity-100 transition-opacity duration-500"
                      loading={i < 3 ? "eager" : "lazy"}
                    />
                    <div className="absolute top-2 left-3 font-handwritten text-xs text-ink-faded opacity-60">
                      № {String(i + 1).padStart(2, "0")}
                    </div>
                  </div>

                  {/* Card content */}
                  <div className="flex flex-col flex-1 p-4 space-y-2">
                    <h2 className="font-display text-lg text-leather font-bold leading-tight">
                      {project.name}
                    </h2>
                    <p className="font-serif text-sm text-ink-faded leading-relaxed flex-1">
                      {project.summary}
                    </p>

                    {/* Tech tags */}
                    <div className="flex flex-wrap gap-1 pt-1">
                      {project.techStack.slice(0, 4).map((t, ti) => (
                        <span key={ti} className="skill-tag">{t}</span>
                      ))}
                      {project.techStack.length > 4 && (
                        <span className="skill-tag opacity-60">+{project.techStack.length - 4}</span>
                      )}
                    </div>

                    {/* Action row */}
                    <div className="flex items-center justify-between pt-3 border-t border-parchment-dark/20">
                      <div className="flex items-center gap-3">
                        {project.gitLink && (
                          <a
                            href={project.gitLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 font-handwritten text-xs text-ink-faded hover:text-leather transition-colors"
                            aria-label={`${project.name} GitHub`}
                          >
                            <Github className="w-3.5 h-3.5 shrink-0" />
                            <span>GitHub</span>
                          </a>
                        )}
                        {project.demoLink && (
                          <a
                            href={project.demoLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 font-handwritten text-xs text-ink-faded hover:text-leather transition-colors"
                            aria-label={`${project.name} live demo`}
                          >
                            <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                            <span>Live Demo</span>
                          </a>
                        )}
                      </div>
                      <Link
                        href={`/projects/${project.slug}`}
                        className="font-display text-xs text-blood-ink hover:text-leather hover:underline tracking-wider uppercase transition-colors flex items-center gap-0.5"
                      >
                        <span>Details</span>
                        <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>

          {/* Footer */}
          <div className="text-center pt-4">
            <p className="font-handwritten text-base text-blood-ink/60 italic">
              ~ Built with focus, curiosity, and too much coffee. ~
            </p>
          </div>

        </div>
      </section>
    </MapShell>
  );
}
