import MapShell from "@/src/components/layout/MapShell";
import profileData from "@/src/data/content/profile.json";
import aboutData from "@/src/data/content/about.json";
import skillsData from "@/src/data/content/skills.json";
import socialData from "@/src/data/content/social.json";
import { Mail, FileText } from "lucide-react";
import { FaGithub as Github, FaLinkedin as Linkedin } from 'react-icons/fa'
import ThemeLogo from "@/src/components/layout/ThemeLogo";

export default function AboutPage() {
  return (
    <MapShell>
      <section className="map-section px-4 py-12 md:py-16" aria-labelledby="about-title">
        <div className="max-w-5xl w-full mx-auto space-y-10">

          {/* Chapter header */}
          <div className="text-center">
            <p className="font-handwritten text-sm text-ink-faded tracking-widest mb-2 opacity-70">
              Chapter I
            </p>
            <h1 id="about-title" className="chapter-header text-3xl md:text-4xl">
              About Me
            </h1>
            <div className="chapter-divider w-64 mx-auto mt-2" />
          </div>

          {/* Profile card */}
          <div className="map-content-card p-6 md:p-8">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
              {/* Avatar Logo */}
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center shrink-0 border border-parchment-dark/40 overflow-hidden"
                style={{
                  background: "radial-gradient(circle at 35% 35%, rgba(214,189,137,0.8), rgba(176,145,80,0.6))",
                  boxShadow: "inset 0 2px 8px rgba(16,11,8,0.15), 0 2px 8px rgba(16,11,8,0.2)",
                }}
                aria-label={`${profileData.initials} — profile initials logo`}
              >
                <ThemeLogo size={80} />
              </div>

              <div className="flex-1 text-center sm:text-left space-y-2">
                <h2 className="font-display text-2xl text-leather">{profileData.name}</h2>
                <p className="font-handwritten text-xl text-gold/90 italic">{profileData.title}</p>
                <p className="font-serif text-base text-ink-faded leading-relaxed">{aboutData.summary}</p>


              </div>
            </div>

            {/* Subtle HP quote */}
            <p className="font-handwritten text-lg text-blood-ink/60 text-center pt-6 italic">
              ~ &ldquo;It is our choices that show what we truly are, far more than our abilities.&rdquo;
            </p>
          </div>

          {/* Two-column: Education + Skills */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Education */}
            <div className="map-content-card p-6">
              <h2 className="font-display text-xl text-leather mb-4 border-b border-parchment-dark/25 pb-2">
                Education
              </h2>
              <div className="space-y-5 relative pl-4">
                <div className="timeline-line" aria-hidden="true" />
                {aboutData.education.map((edu, idx) => (
                  <div key={idx} className="relative pl-4">
                    <span
                      className="absolute left-[-14px] top-2 w-2.5 h-2.5 rounded-full border border-rust bg-rust-light"
                      aria-hidden="true"
                    />
                    <p className="font-handwritten text-base text-blood-ink font-semibold">{edu.duration}</p>
                    <h3 className="font-display text-base text-leather-light font-bold">{edu.degree}</h3>
                    <p className="font-serif text-sm text-ink-faded">{edu.institution}</p>
                    <p className="font-serif text-sm text-ink-faded leading-relaxed pt-1">{edu.details}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills snapshot */}
            <div className="map-content-card p-6">
              <h2 className="font-display text-xl text-leather mb-4 border-b border-parchment-dark/25 pb-2">
                Core Skills
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {skillsData.categories.map((cat, i) => (
                  <div key={i} className="space-y-1">
                    <h3 className="font-handwritten text-xs uppercase tracking-widest text-blood-ink font-bold opacity-80">
                      {cat.name}
                    </h3>
                    <div className="flex flex-wrap gap-1">
                      {cat.skills.map((s, j) => (
                        <span key={j} className="skill-tag">{s.name}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Resume link */}
              <div className="mt-5 pt-4 border-t border-parchment-dark/20">
                <a
                  href={profileData.resumeUrl}
                  download
                  className="inline-flex items-center gap-2 px-4 py-2 font-display text-xs tracking-wider text-leather border border-gold/50 hover:border-gold hover:bg-gold/15 rounded-sm transition-all duration-300"
                >
                  <FileText className="w-4 h-4 shrink-0" />
                  <span>Download Resume</span>
                </a>
              </div>
            </div>
          </div>

          {/* Contact / Social links */}
          <div className="map-content-card p-6">
            <h2 className="font-display text-xl text-leather mb-4 border-b border-parchment-dark/25 pb-2">
              Get in Touch
            </h2>
            <div className="flex flex-wrap gap-5">
              <a
                href={socialData.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 font-handwritten text-base text-ink-faded hover:text-leather transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4 shrink-0" />
                <span>{socialData.github.replace("https://", "")}</span>
              </a>
              <span className="text-parchment-dark/30" aria-hidden="true">·</span>
              <a
                href={socialData.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 font-handwritten text-base text-ink-faded hover:text-leather transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4 shrink-0" />
                <span>{socialData.linkedin.replace("https://", "")}</span>
              </a>
              <span className="text-parchment-dark/30" aria-hidden="true">·</span>
              <a
                href={`mailto:${socialData.email}`}
                className="flex items-center gap-2 font-handwritten text-base text-ink-faded hover:text-leather transition-colors"
                aria-label="Email"
              >
                <Mail className="w-4 h-4 shrink-0" />
                <span>{socialData.email}</span>
              </a>
            </div>
          </div>

        </div>
      </section>
    </MapShell>
  );
}
