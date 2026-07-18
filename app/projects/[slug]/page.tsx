import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import MapShell from "@/src/components/layout/MapShell";
import projectsData from "@/src/data/content/projects.json";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { FaGithub as Github } from "react-icons/fa";

import { Metadata } from "next";

type Project = typeof projectsData.projects[0];

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projectsData.projects.find((p) => p.slug === slug);
  if (!project) {
    return {
      title: "Project Not Found | Ved Patil",
    };
  }
  return {
    title: `${project.name} | Projects | Ved Patil`,
    description: project.summary,
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project: Project | undefined = projectsData.projects.find((p) => p.slug === slug);

  if (!project) notFound();

  return (
    <MapShell>
      <section className="map-section px-4 py-12 md:py-16" aria-labelledby="project-detail-title">
        <div className="max-w-3xl w-full mx-auto space-y-8">

          {/* Back link */}
          <Link
            href="/projects"
            className="inline-flex items-center gap-1 font-handwritten text-sm text-ink-faded hover:text-leather transition-colors"
          >
            <ArrowLeft className="w-4 h-4 shrink-0" />
            <span>Back to the Vault</span>
          </Link>

          {/* Chapter header */}
          <div className="text-center">
            <p className="font-handwritten text-sm text-ink-faded tracking-widest mb-2 opacity-70">
              Artifact Record
            </p>
            <h1 id="project-detail-title" className="chapter-header text-2xl md:text-3xl">
              {project.name}
            </h1>
            <div className="chapter-divider w-48 mx-auto mt-2" />
          </div>

          {/* Main card */}
          <div className="map-content-card overflow-hidden">
            {/* Project image */}
            <div
              className="relative overflow-hidden"
              style={{ background: "rgba(155,118,65,0.3)" }}
            >
              <img
                src={project.image}
                alt={`${project.name} screenshot`}
                className="w-full object-cover opacity-70 hover:opacity-100 transition-opacity duration-500"
              />
            </div>

            <div className="p-6 md:p-8 space-y-6">
              {/* Summary */}
              <p className="font-serif text-base text-ink-faded leading-relaxed">
                {project.summary}
              </p>

              {/* Features */}
              <div>
                <h2 className="font-display text-sm uppercase tracking-widest text-leather-light border-b border-dotted border-parchment-dark/25 pb-2 mb-3">
                  ✦ Features & Highlights
                </h2>
                <ul className="space-y-2">
                  {project.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 font-serif text-sm text-ink-faded leading-relaxed">
                      <span className="text-gold shrink-0 mt-0.5" aria-hidden="true">✦</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tech stack */}
              <div>
                <h2 className="font-display text-sm uppercase tracking-widest text-leather-light mb-2">
                  Tech Stack
                </h2>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech, i) => (
                    <span key={i} className="skill-tag py-1">{tech}</span>
                  ))}
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-wrap gap-4 pt-2 border-t border-parchment-dark/20">
                {project.gitLink && (
                  <a
                    href={project.gitLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 font-display text-xs tracking-wider text-parchment-light bg-leather hover:bg-leather-light border border-shadow rounded-sm transition-all duration-300 uppercase"
                    aria-label={`${project.name} source code`}
                  >
                    <Github className="w-4 h-4 shrink-0" />
                    <span>View Source</span>
                  </a>
                )}
                {project.demoLink && (
                  <a
                    href={project.demoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 font-display text-xs tracking-wider text-leather border-2 border-gold/50 hover:border-gold hover:bg-gold/20 rounded-sm transition-all duration-300 uppercase"
                    aria-label={`${project.name} live demo`}
                  >
                    <ExternalLink className="w-4 h-4 shrink-0" />
                    <span>Live Demo</span>
                  </a>
                )}
              </div>

              <p className="font-handwritten text-base text-blood-ink/60 text-center opacity-70 italic pt-2">
                ~ Built with focus and dedication. ~
              </p>
            </div>
          </div>

        </div>
      </section>
    </MapShell>
  );
}

export async function generateStaticParams() {
  return projectsData.projects.map((p) => ({ slug: p.slug }));
}
