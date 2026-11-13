import Link from "next/link";
import Image from "next/image";
import MapShell from "@/src/components/layout/MapShell";
import HeroMap from "@/src/components/home/HeroMap";
import profileData from "@/src/data/content/profile.json";
import socialData from "@/src/data/content/social.json";
import aboutData from "@/src/data/content/about.json";
import projectsData from "@/src/data/content/projects.json";
import experienceData from "@/src/data/content/experience.json";
import { Mail, ArrowRight } from "lucide-react";
import { FaGithub as Github, FaLinkedin as Linkedin } from "react-icons/fa";
import InteractiveParagraph from "@/src/components/text/InteractiveParagraph";
import ResumeButton from "@/src/components/resume/ResumeButton";
import Footprints from "@/src/components/map/Footprints";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ved Patil | Full Stack Developer",
  description:
    "Ved Patil is a Full Stack Developer specializing in React, Next.js, Java, Spring Boot, and PostgreSQL. Explore his projects, experience, and software development work.",
  alternates: {
    canonical: "https://vedpatil.in",
  },
};

// Core stack shown in the hero (same technologies named in the site's SEO description).
const CORE_STACK = ["React", "Next.js", "Java", "Spring Boot", "PostgreSQL"];

export default function Home() {
  // Why: replace three stacked duplicate cards with a focused composition:
  // hero → selected works → current role → invitation to explore.
  const featuredProjects = projectsData.projects.slice(0, 3);
  const [current, intern] = experienceData.entries;
  const education = aboutData.education[0];

  const pins = [
    { label: education.degree, detail: `${education.institution} · ${education.duration}` },
    { label: intern.role, detail: `${intern.company.replace(" (Internship)", "")} · ${intern.duration}` },
    { label: current.role, detail: `${current.company} · ${current.duration}` },
  ];

  return (
    <MapShell>
      {/* ── HERO — The Beginning ── */}
      <section className="page-container pt-6 md:pt-12 pb-12" aria-labelledby="hero-title">
        <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-10 lg:gap-14 items-center">
          <div className="animate-map-fade-in opacity-0">
            <p className="eyebrow">The Beginning · Full Stack Developer</p>
            <h1
              id="hero-title"
              className="font-display text-6xl sm:text-7xl lg:text-8xl text-leather leading-[0.95] mt-3"
            >
              {profileData.name}
            </h1>
            <div className="flex items-center gap-3 my-5" aria-hidden="true">
              <div className="h-px w-16 bg-linear-to-r from-gold to-transparent" />
              <span className="text-gold-text">⚜</span>
            </div>
            <p className="font-serif text-xl md:text-2xl text-blood-ink font-semibold leading-snug">
              {profileData.title} building thoughtful digital experiences.
            </p>
            {/* Why: dragon-reactive text restored (it was dropped in the redesign). */}
            <InteractiveParagraph
              className="mt-4 max-w-xl"
              text={aboutData.bio[0]}
              fontClass="prose-map prose-map-soft text-[1.25rem]"
              fontSpec="20px Caveat, cursive"
            />

            <ul className="flex flex-wrap gap-2 mt-5" aria-label="Core technologies">
              {CORE_STACK.map((t) => (
                <li key={t} className="skill-tag">{t}</li>
              ))}
            </ul>

            <div className="flex flex-wrap items-center gap-3 mt-8">
              <ResumeButton url={profileData.resumeUrl} />
              <Link href="/projects" className="btn btn-secondary">
                Explore Projects <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
              <Link href="/contact" className="link-quiet px-2">Get in touch</Link>
            </div>

            <div className="flex items-center gap-5 mt-6">
              <a href={socialData.github} target="_blank" rel="noopener noreferrer" className="link-quiet" aria-label="GitHub profile">
                <Github className="w-4 h-4" aria-hidden="true" /> GitHub
              </a>
              <a href={socialData.linkedin} target="_blank" rel="noopener noreferrer" className="link-quiet" aria-label="LinkedIn profile">
                <Linkedin className="w-4 h-4" aria-hidden="true" /> LinkedIn
              </a>
              <a href={`mailto:${socialData.email}`} className="link-quiet" aria-label="Send email">
                <Mail className="w-4 h-4" aria-hidden="true" /> Email
              </a>
            </div>
          </div>

          <div className="animate-map-fade-in opacity-0 [animation-delay:150ms] max-w-md w-full mx-auto lg:mx-0 lg:ml-auto">
            <HeroMap pins={pins} />
          </div>
        </div>
      </section>

      <Footprints />

      {/* ── SELECTED WORKS ── */}
      <section className="page-container py-10" aria-labelledby="works-heading">
        <div className="flex items-end justify-between gap-4 mb-6">
          <div>
            <p className="eyebrow">The Workshop</p>
            <h2 id="works-heading" className="section-title mt-1">Selected works</h2>
          </div>
          <Link href="/projects" className="link-quiet text-blood-ink font-semibold">
            All projects <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {featuredProjects.map((p) => (
            <Link key={p.id} href={`/projects/${p.slug}`} className="project-card artifact-card reveal block p-3 group">
              <div className="shot-frame aspect-video">
                <Image src={p.image} alt={`${p.name} screenshot`} fill sizes="(min-width: 768px) 360px, 100vw" className="object-cover object-top" />
              </div>
              <h3 className="font-serif font-semibold text-lg text-leather mt-3 leading-snug group-hover:text-blood-ink transition-colors">{p.name}</h3>
              <p className="text-[0.92rem] text-ink-faded mt-1 line-clamp-2">{p.summary}</p>
            </Link>
          ))}
        </div>
      </section>

      <Footprints />

      {/* ── CURRENT ROLE ── */}
      <section className="page-container py-10" aria-labelledby="journey-heading">
        <div className="map-content-card reveal p-6 md:p-8 grid md:grid-cols-[1fr_auto] gap-6 items-center">
          <div>
            <p className="eyebrow">My Journey</p>
            <h2 id="journey-heading" className="section-title mt-1">
              {current.role} at {current.company}
            </h2>
            <p className="prose-map prose-map-soft mt-2 max-w-2xl">
              {current.duration}. Started here as a {intern.role.toLowerCase()} ({intern.duration}) and moved into the full-time role.
            </p>
          </div>
          <Link href="/experience" className="btn btn-secondary">Follow the route <ArrowRight className="w-4 h-4" aria-hidden="true" /></Link>
        </div>
      </section>

      {/* ── INVITATION ── */}
      <section className="page-container pt-6 pb-16 text-center" aria-label="Contact invitation">
        <p className="font-handwritten text-2xl text-ink-faded italic">
          “I solemnly swear that I am up to no good.” — Let&apos;s build something worth the trouble.
        </p>
        <Link href="/contact" className="btn btn-primary mt-5">Send an owl <ArrowRight className="w-4 h-4" aria-hidden="true" /></Link>
      </section>
    </MapShell>
  );
}
