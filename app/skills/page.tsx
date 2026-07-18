import React from "react";
import MapShell from "@/src/components/layout/MapShell";
import skillsData from "@/src/data/content/skills.json";
import profileData from "@/src/data/content/profile.json";
import {
  BookOpen,
  Palette,
  Database,
  Cpu,
  FileText,
  Briefcase,
  FolderGit2,
  Star
} from "lucide-react";

// Map category string to a Lucide icon component type
const CATEGORY_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Languages: BookOpen,
  Frontend: Palette,
  "Backend & Database": Database,
  "AI & Tools": Cpu,
};

export default function SkillsPage() {
  return (
    <MapShell>
      <section className="map-section px-4 py-12 md:py-16" aria-labelledby="skills-title">
        <div className="max-w-4xl w-full mx-auto space-y-10">

          {/* Chapter header */}
          <div className="text-center">
            <p className="font-handwritten text-sm text-ink-faded tracking-widest mb-2 opacity-70">
              Chapter II
            </p>
            <h1 id="skills-title" className="chapter-header text-3xl md:text-4xl">
              Skills
            </h1>
            <div className="chapter-divider w-48 mx-auto mt-2" />
            <p className="font-handwritten text-base text-ink-faded italic mt-2 opacity-80">
              Technologies and tools I work with
            </p>
          </div>

          {/* Skill categories */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {skillsData.categories.map((cat, i) => {
              const IconComp = CATEGORY_ICONS[cat.name] || FileText;

              return (
                <div key={i} className="map-content-card p-6">
                  <div className="flex items-center gap-3 mb-4 border-b border-parchment-dark/25 pb-3">
                    <IconComp className="w-6 h-6 text-leather shrink-0" />
                    <h2 className="font-display text-lg text-leather">{cat.name}</h2>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {cat.skills.map((skill, j) => (
                      <span key={j} className="skill-tag py-1" title={skill.name}>
                        <Star className="w-3 h-3 text-gold/80 mr-1 inline-block shrink-0" />
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* CTA */}
          <div className="map-content-card p-6 text-center">
            <p className="font-handwritten text-base text-ink-faded italic mb-4">
              ~ See skills in action through my experience and projects ~
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href="/experience"
                className="flex items-center gap-2 px-5 py-2 font-display text-sm tracking-wider text-leather-light border border-parchment-dark/40 hover:border-gold hover:bg-gold/10 rounded-sm transition-all duration-300"
              >
                <Briefcase className="w-4 h-4 shrink-0" />
                <span>View Experience</span>
              </a>
              <a
                href="/projects"
                className="px-5 py-2 flex items-center gap-2 font-display text-sm tracking-wider text-leather-light border border-parchment-dark/40 hover:border-gold hover:bg-gold/10 rounded-sm transition-all duration-300"
              >
                <FolderGit2 className="w-4 h-4 shrink-0" />
                <span>View Projects</span>
              </a>
              <a
                href={profileData.resumeUrl}
                download
                className="px-5 py-2 flex items-center gap-2 font-display text-sm tracking-wider text-leather border-2 border-gold/50 hover:border-gold hover:bg-gold/20 rounded-sm transition-all duration-300"
              >
                <FileText className="w-4 h-4 shrink-0" />
                <span>Download Resume</span>
              </a>
            </div>
          </div>

        </div>
      </section>
    </MapShell>
  );
}
