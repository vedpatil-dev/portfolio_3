import Link from "next/link";
import MapShell from "@/src/components/layout/MapShell";
import profileData from "@/src/data/content/profile.json";
import socialData from "@/src/data/content/social.json";
import { Mail } from "lucide-react";
import { FaGithub as Github, FaLinkedin as Linkedin } from "react-icons/fa";
import ThemeLogo from "@/src/components/layout/ThemeLogo";

export default function Home() {
  return (
    <MapShell>
      {/* ── HERO SECTION ─────────────────────────────────────────────── */}
      <section
        className="map-section relative flex flex-col items-center justify-center text-center overflow-hidden"
        style={{ minHeight: "calc(100vh - 120px)", justifyContent: "center" }}
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
          {/* Themed Magic Logo - responsive scale (larger on mobile) */}
          <div className="flex justify-center mb-4">
            <ThemeLogo className="w-28 h-28 sm:w-24 sm:h-24 md:w-20 md:h-20" />
          </div>

          {/* Small eyebrow label */}
          <p className="font-handwritten text-sm text-leather font-semibold tracking-widest mb-3 opacity-90">
            ✦ Full Stack Developer ✦
          </p>

          {/* Main name */}
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
          <p className="font-handwritten text-lg text-ink font-semibold italic mb-8 leading-relaxed">
            &ldquo;{profileData.tagline}&rdquo;
          </p>

          {/* CTA buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 mt-2">
            <Link
              href="/about"
              className="px-6 py-3 font-display text-sm tracking-wider text-leather border-2 border-parchment-dark/70 hover:border-gold rounded-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
              style={{ background: "rgba(150, 115, 49, 0.35)" }}
            >
              View My Work →
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
    </MapShell>
  );
}
