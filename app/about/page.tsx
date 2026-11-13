import MapShell from "@/src/components/layout/MapShell";
import ChapterHeader from "@/src/components/layout/ChapterHeader";
import profileData from "@/src/data/content/profile.json";
import aboutData from "@/src/data/content/about.json";
import skillsData from "@/src/data/content/skills.json";
import socialData from "@/src/data/content/social.json";
import { Mail, Code2, Layout, Server, Database, Wrench } from "lucide-react";
import { FaGithub as Github, FaLinkedin as Linkedin } from "react-icons/fa";
import ThemeLogo from "@/src/components/layout/ThemeLogo";
import TechIcon from "@/src/components/skills/TechIcon";
import InteractiveParagraph from "@/src/components/text/InteractiveParagraph";
import ResumeButton from "@/src/components/resume/ResumeButton";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Ved Patil | Full Stack Developer",
  description:
    "Learn about Ved Patil, a Full Stack Developer specializing in React, Next.js, Java, Spring Boot, and PostgreSQL. Explore his background, education, and development journey.",
  alternates: {
    canonical: "https://vedpatil.in/about",
  },
};

const getCategoryIcon = (categoryName: string) => {
  if (categoryName.includes("Language")) return Code2;
  if (categoryName.includes("Frontend")) return Layout;
  if (categoryName.includes("Backend")) return Server;
  if (categoryName.includes("Database")) return Database;
  return Wrench;
};

export default function AboutPage() {
  // Why: bio[0..1] become the lead introduction; bio[2..] are presented as the development philosophy
  // (bio[2] set as a highlighted note). Impact: no copy is invented — the existing biography is only re-organised.
  const [lead, origin, philosophy, ...rest] = aboutData.bio;

  return (
    <MapShell>
      <section className="page-container pb-12" aria-labelledby="about-title">
        <ChapterHeader id="about-title" chapter="Chapter I" title="The Author" />

        <div className="grid lg:grid-cols-[320px_1fr] gap-8 lg:gap-12 mt-8 items-start">
          {/* Profile column */}
          <aside className="map-content-card p-6 text-center lg:sticky lg:top-28">
            <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border border-rust/50 bg-parchment-dark/30 flex items-center justify-center shadow-inner">
              <ThemeLogo size={96} />
            </div>
            <h2 className="font-serif text-2xl font-semibold text-leather mt-4">{profileData.name}</h2>
            <p className="font-handwritten text-xl text-blood-ink">{profileData.title}</p>
            <div className="flex flex-col gap-2 mt-5">
              <ResumeButton url={profileData.resumeUrl}>Resume</ResumeButton>
              <a href={`mailto:${socialData.email}`} className="btn btn-secondary"><Mail className="w-4 h-4" aria-hidden="true" /> Email me</a>
            </div>
            <div className="flex justify-center gap-5 mt-4">
              <a href={socialData.github} target="_blank" rel="noopener noreferrer" className="link-quiet" aria-label="GitHub"><Github className="w-4 h-4" aria-hidden="true" /> GitHub</a>
              <a href={socialData.linkedin} target="_blank" rel="noopener noreferrer" className="link-quiet" aria-label="LinkedIn"><Linkedin className="w-4 h-4" aria-hidden="true" /> LinkedIn</a>
            </div>
          </aside>

          {/* Editorial column */}
          <div className="space-y-12 min-w-0">
            <div className="reveal">
              <p className="eyebrow">Introduction</p>
              <p className="font-serif text-2xl md:text-[1.7rem] leading-snug text-leather mt-2">{lead}</p>
              <InteractiveParagraph className="mt-4 max-w-2xl" text={origin} fontClass="prose-map prose-map-soft" fontSpec="20px Caveat, cursive" />
            </div>

            <div className="reveal">
              <p className="eyebrow">Development philosophy</p>
              <blockquote className="map-note mt-3 !p-5 border-l-4 !border-l-blood-ink">
                <p className="font-serif text-lg leading-relaxed text-leather">{philosophy}</p>
              </blockquote>
              <div className="mt-4 space-y-3 max-w-2xl">
                {rest.map((p) => (
                  <InteractiveParagraph key={p} text={p} fontClass="prose-map prose-map-soft" fontSpec="20px Caveat, cursive" />
                ))}
              </div>
            </div>

            {/* Technical expertise — anchor target for the "Skills" command */}
            <div id="skills" className="scroll-mt-28 reveal">
              <p className="eyebrow">The Craft</p>
              <h2 className="section-title mt-1 mb-5">Technical expertise</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {skillsData.categories.map((category, i) => {
                  const CategoryIcon = getCategoryIcon(category.name);
                  return (
                    <div key={category.name} className={`map-content-card p-5 ${i === 0 ? "sm:col-span-2" : ""}`}>
                      <h3 className="flex items-center gap-2 font-serif font-semibold text-leather mb-3">
                        <CategoryIcon className="w-4 h-4 text-blood-ink" aria-hidden="true" />
                        {category.name}
                      </h3>
                      <ul className="flex flex-wrap gap-2">
                        {category.skills.map((skill) => (
                          <li key={skill.name} className="inline-flex items-center gap-2 px-2.5 py-1 text-[0.9rem] font-medium text-ink border border-parchment-dark/60 bg-parchment-light rounded-sm">
                            <TechIcon name={skill.name} />
                            <span>{skill.name}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="reveal">
              <p className="eyebrow">Education</p>
              {aboutData.education.map((edu) => (
                <div key={edu.degree} className="map-content-card p-5 mt-3">
                  <p className="text-sm font-semibold text-blood-ink">{edu.duration}</p>
                  <h3 className="font-serif text-xl font-semibold text-leather mt-1">{edu.degree}</h3>
                  <p className="text-ink-faded">{edu.institution}</p>
                  <p className="prose-map prose-map-soft mt-2 text-[0.95rem]">{edu.details}</p>
                </div>
              ))}
            </div>

            <InteractiveParagraph
              text="~ “It is our choices that show what we truly are, far more than our abilities.” ~"
              fontClass="font-handwritten text-xl text-ink-faded italic"
              fontSpec="20px Caveat, cursive"
            />
          </div>
        </div>
      </section>
    </MapShell>
  );
}
