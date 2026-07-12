"use client";

import React, { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
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

function ProjectsPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const search = searchParams.get("search") || "";
  const projects: Project[] = projectsData.projects;

  // Filter projects by search query if present
  const filteredProjects = projects.filter((project) => {
    if (!search) return true;
    const query = search.toLowerCase();
    return (
      project.name.toLowerCase().includes(query) ||
      project.summary.toLowerCase().includes(query) ||
      project.techStack.some((tech) => tech.toLowerCase().includes(query))
    );
  });

  const renderRightPageContent = () => {
    return (
      <div className="space-y-6 animate-fade-in select-text">
        <div className="flex justify-between items-center border-b border-double border-parchment-dark/30 pb-2">
          <h3 className="font-display text-2xl text-leather">
            Chapter II: Magical Artifacts
          </h3>
          {search && (
            <span className="font-handwritten text-sm text-blood-ink">
              Filtered by: &apos;{search}&apos; (
              <button 
                onClick={() => router.push("/projects")}
                className="underline hover:text-leather font-bold"
              >
                clear
              </button>
              )
            </span>
          )}
        </div>

        {filteredProjects.length === 0 ? (
          <div className="text-center py-10 space-y-4">
            <div className="font-handwritten text-3xl text-blood-ink">
              No matching artifacts found.
            </div>
            <p className="font-serif text-sm text-ink-faded max-w-sm mx-auto">
              No magical spells in our registry matches &quot;{search}&quot;. Try typing another keyword like <code className="bg-parchment-dark/10 px-1 py-0.5 rounded text-blood-ink font-mono text-xs">lms</code> or <code className="bg-parchment-dark/10 px-1 py-0.5 rounded text-blood-ink font-mono text-xs">AI</code>.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredProjects.map((project) => (
              <div 
                key={project.id} 
                className="bg-[#c5a671]/15 border border-parchment-dark/20 rounded p-4 space-y-3 shadow-sm hover:bg-[#c5a671]/25 hover:border-gold/50 transition-all duration-300 transform hover:-translate-y-0.5"
              >
                <div className="flex justify-between items-start gap-2">
                  <h4 className="font-display text-xl text-leather-light font-bold">
                    {project.name}
                  </h4>
                  <span className="font-handwritten text-xs text-ink-faded font-bold tracking-wider uppercase border border-parchment-dark/30 px-1.5 py-0.5 rounded bg-parchment/10">
                    ID: {project.id}
                  </span>
                </div>

                <p className="font-serif text-sm text-ink-faded leading-relaxed">
                  {project.summary}
                </p>

                {/* Tech Stack tags */}
                <div className="flex flex-wrap gap-1">
                  {project.techStack.map((tech, idx) => (
                    <span 
                      key={idx} 
                      className="font-mono text-[10px] text-leather bg-parchment-dark/15 border border-parchment-dark/20 px-1.5 py-0.5 rounded-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Navigation Link to detail page */}
                <div className="flex justify-between items-center pt-2 border-t border-dotted border-parchment-dark/20">
                  <span className="font-handwritten text-sm text-blood-ink">
                    Spell code: {project.id}
                  </span>
                  <Link
                    href={`/projects/${project.slug}`}
                    className="font-display text-xs font-bold text-blood-ink hover:text-leather hover:underline tracking-wider uppercase"
                  >
                    Examine Artifact →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="font-handwritten text-xl text-blood-ink text-center pt-4">
          ~ Artifacts are items of power, crafted with code.
        </div>
      </div>
    );
  };

  return (
    <Diary
      activeChapter="projects"
      rightPageContent={renderRightPageContent()}
    />
  );
}

export default function ProjectsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#100b08] flex items-center justify-center font-handwritten text-2xl text-[#d6bd89]">
        Summoning Chapter II...
      </div>
    }>
      <ProjectsPageContent />
    </Suspense>
  );
}
