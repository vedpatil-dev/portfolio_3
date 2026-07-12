import React, { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import Diary from "@/src/components/diary/Diary";
import projectsData from "@/src/data/content/projects.json";

interface Project {
  id: string;
  slug: string;
  name: string;
  summary: string;
  features: string[];
  image: string;
  gitLink: string;
  demoLink: string;
  techStack: string[];
}

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const projects: Project[] = projectsData.projects;

  // Find project matching the slug
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  const rightPageContent = (
    <div className="space-y-6 animate-fade-in select-text">
      {/* Header with back button */}
      <div className="flex justify-between items-center border-b border-double border-parchment-dark/30 pb-2">
        <h3 className="font-display text-2xl text-leather">
          Artifact: {project.name}
        </h3>
        <Link 
          href="/projects"
          className="font-handwritten text-sm text-blood-ink hover:text-leather hover:underline font-bold"
        >
          ← Back to Vault
        </Link>
      </div>

      {/* Main summary */}
      <p className="font-serif text-sm text-ink-faded leading-relaxed text-justify">
        {project.summary}
      </p>

      {/* Key features / attributes */}
      <div className="bg-[#c5a671]/15 border border-parchment-dark/20 rounded p-4 space-y-3">
        <h4 className="font-display text-sm font-bold text-blood-ink tracking-wider border-b border-dotted border-parchment-dark/30 pb-1 uppercase">
          Magical Attributes & Features
        </h4>
        <ul className="space-y-2 text-sm font-serif text-ink-faded">
          {project.features.map((feature, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <span className="text-[#967331] shrink-0 mt-1">✦</span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Tech stack list */}
      <div className="space-y-2">
        <h5 className="font-display text-xs font-bold text-leather-light tracking-wide uppercase">
          Runes of Crafting (Tech Stack)
        </h5>
        <div className="flex flex-wrap gap-1.5">
          {project.techStack.map((tech, idx) => (
            <span 
              key={idx} 
              className="font-mono text-xs text-leather bg-parchment-dark/25 border border-parchment-dark/30 px-2 py-0.5 rounded-sm"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Action links / scroll handles */}
      <div className="flex flex-wrap gap-4 pt-4 border-t border-parchment-dark/20 justify-center">
        {project.gitLink && (
          <a
            href={project.gitLink}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 font-display text-xs text-[#d6bd89] bg-leather hover:bg-leather-light border border-shadow rounded shadow transition-all duration-300 font-bold uppercase tracking-wider"
          >
            🐙 Examine Repository
          </a>
        )}
        {project.demoLink && (
          <a
            href={project.demoLink}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 font-display text-xs text-leather bg-gold/40 hover:bg-gold/80 border border-gold/60 rounded shadow transition-all duration-300 font-bold uppercase tracking-wider"
          >
            🔮 Inspect Manifestation
          </a>
        )}
      </div>

      <div className="font-handwritten text-xl text-blood-ink text-center pt-2">
        ~ Crafted with focus and dedication.
      </div>
    </div>
  );

  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#100b08] flex items-center justify-center font-handwritten text-2xl text-[#d6bd89]">
        Summoning Chapter II Details...
      </div>
    }>
      <Diary
        activeChapter="projects"
        rightPageContent={rightPageContent}
        initialHasWritten={true}
      />
    </Suspense>
  );
}

// Generate static params for all project routes (for SSG capability)
export async function generateStaticParams() {
  const projects: Project[] = projectsData.projects;
  return projects.map((project) => ({
    slug: project.slug,
  }));
}
