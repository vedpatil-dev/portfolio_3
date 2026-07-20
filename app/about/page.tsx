import MapShell from "@/src/components/layout/MapShell";
import profileData from "@/src/data/content/profile.json";
import aboutData from "@/src/data/content/about.json";
import skillsData from "@/src/data/content/skills.json";
import socialData from "@/src/data/content/social.json";
import { Mail, FileText } from "lucide-react";
import { FaGithub as Github, FaLinkedin as Linkedin } from 'react-icons/fa'
import ThemeLogo from "@/src/components/layout/ThemeLogo";
import InteractiveParagraph from "@/src/components/text/InteractiveParagraph";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | Ved Patil",
  description: "Learn more about Ved Patil's background, education, skills, and full stack development journey.",
};

export default function AboutPage() {
  return (
    <MapShell>
      <section className="map-section px-4 py-4 animate-map-fade-in" aria-labelledby="about-title">
        <div className="max-w-5xl w-full mx-auto space-y-10 mb-24">

          {/* Chapter header */}
          <div className="text-center">
            <p className="chapter-number">
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
                <div className="space-y-4 pt-2">
                  {aboutData.bio ? (
                    aboutData.bio.map((p: string, idx: number) => (
                      <InteractiveParagraph
                        key={idx}
                        text={p}
                        fontClass="font-serif text-base text-ink-faded leading-relaxed"
                        fontSpec="16px Caveat, cursive"
                        lineHeight={24}
                      />
                    ))
                  ) : (
                    <InteractiveParagraph
                      text={aboutData.summary}
                      fontClass="font-serif text-base text-ink-faded leading-relaxed"
                      fontSpec="16px Caveat, cursive"
                      lineHeight={24}
                    />
                  )}
                </div>


              </div>
            </div>

            {/* Subtle HP quote */}
            <div className="pt-6 flex justify-center w-full">
              <InteractiveParagraph
                text='~ “It is our choices that show what we truly are, far more than our abilities.”'
                fontClass="font-handwritten text-lg text-blood-ink/70 text-center italic"
                fontSpec="18px Caveat, cursive"
                lineHeight={26}
              />
            </div>
          </div>

          {/* Unified Skills Section */}
          <div id="skills" className="map-content-card p-6 md:p-8 scroll-mt-24">
            <h2 className="font-display text-2xl text-leather mb-4 border-b border-parchment-dark/25 pb-2">
              Skills & Technology
            </h2>
            <div className="flex flex-wrap gap-2 md:gap-3 justify-center py-4">
              {skillsData.categories.flatMap((cat) => cat.skills).map((skill, index) => (
                <span
                  key={index}
                  className="skill-tag px-3.5 py-2 font-serif text-sm border border-parchment-dark/30 bg-parchment-light/35 text-leather rounded-sm transition-all duration-200 hover:scale-105 hover:bg-parchment-light/60 cursor-default"
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </div>

          {/* Two-column: Education + Contact & Resume */}
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

            {/* Resume & Documents download inside this card */}
            <div className="map-content-card p-6 flex flex-col justify-between">
              <div>
                <h2 className="font-display text-xl text-leather mb-4 border-b border-parchment-dark/25 pb-2">
                  Documents
                </h2>
                <p className="font-serif text-sm text-ink-faded leading-relaxed mb-4">
                  Examine the author's complete parchment summary for academic credentials, operational records, and professional history.
                </p>
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
