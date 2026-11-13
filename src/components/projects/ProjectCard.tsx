import Link from "next/link";
import Image from "next/image";
import { ExternalLink, ArrowRight } from "lucide-react";
import { FaGithub as Github } from "react-icons/fa";
import projectsData from "@/src/data/content/projects.json";

type Project = (typeof projectsData.projects)[number];

interface ProjectCardProps {
  project: Project;
  index: number;
  priority?: boolean;
}

// Why: a Pinterest-style masonry looks best when tiles keep each screenshot's real proportions.
// Impact: width/height of the files in /public/projects (default 1920x890); only Butler is notably taller.
const IMAGE_SIZE: Record<string, [number, number]> = {
  butler: [912, 628],
};

// Why: Projects (and Home) need one consistent, screenshot-first card.
// Impact: full-colour screenshot at a fixed 16:9 ratio (no CLS), top-aligned so UI chrome is not cropped;
// "What I built" reuses the real `features` data instead of inventing contribution copy.
export default function ProjectCard({ project, index, priority = false }: ProjectCardProps) {
  const [w, h] = IMAGE_SIZE[project.slug] ?? [1920, 890];
  const stack = project.techStack.slice(0, 5);
  const extra = project.techStack.length - stack.length;

  return (
    <article className="project-card artifact-card flex flex-col p-3 md:p-4">
      <Link
        href={`/projects/${project.slug}`}
        className="shot-frame block"
        aria-label={`${project.name} — view details`}
        tabIndex={-1}
      >
        <Image
          src={project.image}
          alt={`${project.name} screenshot`}
          width={w}
          height={h}
          sizes="(min-width: 1024px) 380px, (min-width: 768px) 50vw, 100vw"
          priority={priority}
          className="w-full h-auto"
        />
      </Link>

      <div className="flex flex-col flex-1 gap-3 pt-4">
        <p className="eyebrow">№ {String(index + 1).padStart(2, "0")}</p>
        <h2 className={`font-serif font-semibold leading-snug text-leather text-xl`}>
          <Link href={`/projects/${project.slug}`} className="hover:text-blood-ink transition-colors">
            {project.name}
          </Link>
        </h2>
        <p className="prose-map prose-map-soft text-[0.95rem]">{project.summary}</p>

        {project.features.length > 0 && (
          <div>
            <p className="eyebrow mb-1.5">What I built</p>
            <ul className="space-y-1.5 text-[0.92rem] text-ink">
              {project.features.slice(0, 2).map((f) => (
                <li key={f} className="flex gap-2">
                  <span className="text-gold-text shrink-0" aria-hidden="true">✦</span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <ul className="flex flex-wrap gap-1.5 mt-auto" aria-label="Technologies">
          {stack.map((t) => (
            <li key={t} className="skill-tag">{t}</li>
          ))}
          {extra > 0 && <li className="skill-tag opacity-70">+{extra}</li>}
        </ul>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 pt-3 border-t border-parchment-dark/40">
          {project.gitLink && (
            <a href={project.gitLink} target="_blank" rel="noopener noreferrer" className="link-quiet" aria-label={`${project.name} on GitHub`}>
              <Github className="w-4 h-4" aria-hidden="true" /> GitHub
            </a>
          )}
          {project.demoLink && (
            <a href={project.demoLink} target="_blank" rel="noopener noreferrer" className="link-quiet" aria-label={`${project.name} live demo`}>
              <ExternalLink className="w-4 h-4" aria-hidden="true" /> Live demo
            </a>
          )}
          <Link href={`/projects/${project.slug}`} className="link-quiet ml-auto text-blood-ink font-semibold">
            Details <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
}
