import Link from "next/link";
import MapShell from "@/src/components/layout/MapShell";
import profileData from "@/src/data/content/profile.json";
import socialData from "@/src/data/content/social.json";
import aboutData from "@/src/data/content/about.json";
import projectsData from "@/src/data/content/projects.json";
import experienceData from "@/src/data/content/experience.json";
import { Mail, ArrowRight, Briefcase, Trophy, User } from "lucide-react";
import { FaGithub as Github, FaLinkedin as Linkedin } from "react-icons/fa";
import ThemeLogo from "@/src/components/layout/ThemeLogo";
import InteractiveParagraph from "@/src/components/text/InteractiveParagraph";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ved Patil | Full Stack Developer",
  description:
    "Ved Patil is a Full Stack Developer specializing in React, Next.js, Java, Spring Boot, and PostgreSQL. Explore his projects, experience, and software development work.",
  alternates: {
    canonical: "https://vedpatil.in",
  },
};

export default function Home() {
  const featuredProjects = projectsData.projects.slice(0, 3);
  const recentExperience = experienceData.entries.slice(0, 3);

  return (
    <MapShell>
      {/* ── HERO SECTION ─────────────────────────────────────────────── */}
      <section
        className="map-section relative flex flex-col items-center justify-center text-center overflow-hidden min-h-[calc(100vh-120px)] py-12"
        aria-labelledby="hero-title"
      >
        {/* Map coordinate label top-left */}
        <div className="absolute top-6 left-6 text-left pointer-events-none select-none" aria-hidden="true">
          <p className="map-coord-mark text-xs">LAT: 19°04′N</p>
          <p className="map-coord-mark text-xs">LON: 72°51′E</p>
          <p className="map-coord-mark text-xs mt-1 opacity-60">Ahmedabad · India</p>
        </div>

        {/* Rust / water stain blotch decorations */}
        <div
          className="absolute pointer-events-none"
          style={{
            top: "15%", left: "5%", width: 80, height: 60,
            background: "radial-gradient(ellipse, rgba(122,59,30,0.12) 0%, transparent 70%)",
            borderRadius: "50%",
          }}
          aria-hidden="true"
        />
        <div
          className="absolute pointer-events-none"
          style={{
            bottom: "20%", right: "8%", width: 120, height: 90,
            background: "radial-gradient(ellipse, rgba(104,29,24,0.08) 0%, transparent 70%)",
            borderRadius: "50%",
          }}
          aria-hidden="true"
        />

        {/* ── MAIN HERO CONTENT ── */}
        <div className="relative z-10 max-w-2xl mx-auto px-6 opacity-0 translate-y-4 animate-map-fade-in">
          {/* Themed Magic Logo - responsive scale */}
          <div className="flex justify-center mb-4">
            <ThemeLogo className="w-28 h-28 sm:w-24 sm:h-24 md:w-20 md:h-20" />
          </div>

          {/* Eyebrow label */}
          <p className="font-handwritten text-sm text-leather font-semibold tracking-widest mb-3 opacity-90">
            ✦ Full Stack Developer ✦
          </p>

          {/* Primary H1 Heading */}
          <h1
            id="hero-title"
            className="font-display text-5xl sm:text-6xl md:text-7xl text-leather leading-tight mb-2"
            style={{ textShadow: "1px 2px 6px rgba(16,11,8,0.12)" }}
          >
            {profileData.name}
          </h1>

          {/* Underline ornament */}
          <div className="flex items-center justify-center gap-3 my-3" aria-hidden="true">
            <div style={{ height: 1, width: 60, background: "linear-gradient(to right, transparent, #967331)" }} />
            <span className="font-handwritten text-gold text-lg">⚜</span>
            <div style={{ height: 1, width: 60, background: "linear-gradient(to left, transparent, #967331)" }} />
          </div>

          {/* Title */}
          <p className="font-serif text-xl sm:text-2xl text-blood-ink font-bold mb-4 tracking-wide">
            {profileData.title}
          </p>

          {/* Tagline */}
          <div className="mb-8 flex justify-center w-full">
            <InteractiveParagraph
              text={`“${profileData.tagline}”`}
              fontClass="font-handwritten text-lg text-ink font-semibold italic text-center leading-relaxed"
              fontSpec="18px Caveat, cursive"
              lineHeight={26}
            />
          </div>

          {/* CTA buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 mt-2">
            <Link
              href="/about"
              className="px-6 py-3 font-display text-sm tracking-wider text-leather border-2 border-parchment-dark/70 hover:border-gold rounded-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
              style={{ background: "rgba(150, 115, 49, 0.35)" }}
            >
              About Ved Patil →
            </Link>
            <Link
              href="/projects"
              className="px-6 py-3 font-display text-sm tracking-wider text-leather border border-parchment-dark/50 hover:border-parchment-dark/80 rounded-sm transition-all duration-300"
              style={{ background: "rgba(214, 189, 137, 0.65)" }}
            >
              Browse Projects
            </Link>
          </div>

          {/* Social links */}
          <div className="flex items-center justify-center gap-6 mt-10 pt-6 border-t border-parchment-dark/25">
            <a
              href={socialData.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 font-handwritten text-sm text-leather font-semibold hover:text-blood-ink transition-colors duration-200"
              aria-label="GitHub profile"
            >
              <Github className="w-4 h-4 shrink-0 text-leather" />
              <span>GitHub</span>
            </a>
            <span className="text-parchment-dark opacity-40" aria-hidden="true">·</span>
            <a
              href={socialData.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 font-handwritten text-sm text-leather font-semibold hover:text-blood-ink transition-colors duration-200"
              aria-label="LinkedIn profile"
            >
              <Linkedin className="w-4 h-4 shrink-0 text-leather" />
              <span>LinkedIn</span>
            </a>
            <span className="text-parchment-dark opacity-40" aria-hidden="true">·</span>
            <a
              href={`mailto:${socialData.email}`}
              className="flex items-center gap-1.5 font-handwritten text-sm text-leather font-semibold hover:text-blood-ink transition-colors duration-200"
              aria-label="Send email"
            >
              <Mail className="w-4 h-4 shrink-0 text-leather" />
              <span>Email</span>
            </a>
          </div>
        </div>
      </section>

      {/* ── SEMANTIC CONTENT SECTIONS FOR CRAWLABILITY ───────────────────── */}
      <div className="max-w-7xl mx-auto px-4 pb-16 space-y-12">
        {/* ABOUT SECTION */}
        <section aria-labelledby="about-heading" className="map-content-card p-6 md:p-8">
          <div className="flex items-center gap-2 mb-4 border-b border-parchment-dark/25 pb-3">
            <User className="w-5 h-5 text-blood-ink shrink-0" />
            <h2 id="about-heading" className="font-display text-2xl md:text-3xl text-leather">
              About Ved Patil
            </h2>
          </div>
          <div className="font-handwritten text-base md:text-lg text-ink-faded space-y-3 leading-relaxed">
            {aboutData.bio.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>
          <div className="mt-5 pt-3 border-t border-dashed border-parchment-dark/25">
            <Link
              href="/about"
              className="inline-flex items-center gap-1.5 font-display text-xs tracking-wider text-blood-ink hover:text-leather font-bold transition-colors"
            >
              <span>Learn more about Ved Patil&apos;s background & education</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </section>

        {/* FEATURED PROJECTS SECTION */}
        <section aria-labelledby="projects-heading" className="map-content-card p-6 md:p-8">
          <div className="flex items-center justify-between mb-4 border-b border-parchment-dark/25 pb-3">
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-blood-ink shrink-0" />
              <h2 id="projects-heading" className="font-display text-2xl md:text-3xl text-leather">
                Featured Projects by Ved Patil
              </h2>
            </div>
            <Link
              href="/projects"
              className="font-handwritten text-sm text-blood-ink hover:underline hidden sm:block"
            >
              View all projects →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 font-handwritten">
            {featuredProjects.map((project) => (
              <div
                key={project.id}
                className="p-4 rounded border border-parchment-dark/30 bg-parchment-light/40 flex flex-col justify-between"
              >
                <div>
                  <h3 className="font-display text-lg text-blood-ink mb-1">{project.name}</h3>
                  <p className="text-xs text-ink-faded leading-relaxed mb-3">{project.summary}</p>
                </div>
                <Link
                  href={`/projects/${project.slug}`}
                  className="text-xs text-blood-ink font-bold hover:underline flex items-center gap-1"
                >
                  <span>Examine Project</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* EXPERIENCE SECTION */}
        <section aria-labelledby="experience-heading" className="map-content-card p-6 md:p-8">
          <div className="flex items-center justify-between mb-4 border-b border-parchment-dark/25 pb-3">
            <div className="flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-blood-ink shrink-0" />
              <h2 id="experience-heading" className="font-display text-2xl md:text-3xl text-leather">
                Professional Experience
              </h2>
            </div>
            <Link
              href="/experience"
              className="font-handwritten text-sm text-blood-ink hover:underline hidden sm:block"
            >
              Full history →
            </Link>
          </div>
          <div className="space-y-4 font-handwritten">
            {recentExperience.map((exp) => (
              <div key={exp.id} className="border-b border-dashed border-parchment-dark/20 pb-3 last:border-0 last:pb-0">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-display text-lg text-blood-ink inline">{exp.company}</h3>
                    <span className="text-xs text-ink opacity-80 italic ml-2">— {exp.role}</span>
                  </div>
                  <span className="text-xs text-ink-faded opacity-70">{exp.duration}</span>
                </div>
                <p className="text-xs text-ink-faded mt-1">{exp.summary}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </MapShell>
  );
}

