import React from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import MapShell from "@/src/components/layout/MapShell";
import projectsData from "@/src/data/content/projects.json";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { FaGithub as Github } from "react-icons/fa";

import InteractiveParagraph from "@/src/components/text/InteractiveParagraph";
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
    title: `${project.name} — Project by Ved Patil`,
    description: `${project.name}: ${project.summary}. Built by Full Stack Developer Ved Patil using ${project.techStack.join(", ")}.`,
    alternates: {
      canonical: `https://vedpatil.in/projects/${slug}`,
    },
    openGraph: {
      title: `${project.name} | Ved Patil Software Portfolio`,
      description: project.summary,
      url: `https://vedpatil.in/projects/${slug}`,
    },
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project: Project | undefined = projectsData.projects.find((p) => p.slug === slug);

  if (!project) notFound();

  return (
    <MapShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": project.name,
            "description": project.summary,
            "applicationCategory": "DeveloperApplication",
            "operatingSystem": "All",
            "author": {
              "@type": "Person",
              "@id": "https://vedpatil.in/#person",
              "name": "Ved Patil"
            },
            "url": `https://vedpatil.in/projects/${slug}`
          }),
        }}
      />
      <section className="page-container pb-12" aria-labelledby="project-detail-title">
        {/* Why: detail page redesigned as an editorial spread: back link, large full-colour screenshot,
            description + highlights on the left, stack/links aside on the right. */}
        <Link href="/projects" className="link-quiet mt-4">
          <ArrowLeft className="w-4 h-4 shrink-0" aria-hidden="true" />
          <span>Back to the Workshop</span>
        </Link>

        <header className="mt-3 max-w-3xl">
          <p className="eyebrow">Project record</p>
          <h1 id="project-detail-title" className="font-serif text-3xl md:text-5xl font-semibold text-leather leading-tight mt-2">
            {project.name}
          </h1>
          <InteractiveParagraph className="mt-3" text={project.summary} fontClass="prose-map prose-map-soft text-lg" fontSpec="20px Caveat, cursive" />
        </header>

        <div className="shot-frame mt-8">
          <Image
            src={project.image}
            alt={`${project.name} screenshot`}
            width={1920}
            height={890}
            priority
            sizes="(min-width: 1152px) 1100px, 100vw"
            className="w-full h-auto"
          />
        </div>

        <div className="grid lg:grid-cols-[1fr_320px] gap-8 lg:gap-12 mt-10 items-start">
          <div>
            <h2 className="section-title mb-4">What I built</h2>
            <ul className="space-y-3">
              {project.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3 prose-map">
                  <span className="text-gold-text shrink-0 mt-0.5" aria-hidden="true">✦</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <aside className="map-content-card p-5 space-y-5 lg:sticky lg:top-28">
            <div>
              <h2 className="eyebrow mb-2">Tech stack</h2>
              <ul className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => <li key={tech} className="skill-tag py-1">{tech}</li>)}
              </ul>
            </div>
            <div className="flex flex-col gap-2">
              {project.gitLink && (
                <a href={project.gitLink} target="_blank" rel="noopener noreferrer" className="btn btn-primary" aria-label={`${project.name} source code`}>
                  <Github className="w-4 h-4 shrink-0" aria-hidden="true" /> View source
                </a>
              )}
              {project.demoLink && (
                <a href={project.demoLink} target="_blank" rel="noopener noreferrer" className="btn btn-secondary" aria-label={`${project.name} live demo`}>
                  <ExternalLink className="w-4 h-4 shrink-0" aria-hidden="true" /> Live demo
                </a>
              )}
            </div>
          </aside>
        </div>
      </section>
    </MapShell>
  );
}

export async function generateStaticParams() {
  return projectsData.projects.map((p) => ({ slug: p.slug }));
}
