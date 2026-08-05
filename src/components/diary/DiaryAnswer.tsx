"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import DiaryWriter from "./DiaryWriter";
import projectsData from "@/src/data/content/projects.json";
import experienceData from "@/src/data/content/experience.json";
import aboutData from "@/src/data/content/about.json";
import skillsData from "@/src/data/content/skills.json";
import socialData from "@/src/data/content/social.json";
import { ProjectEntry, ExperienceEntry } from "@/src/types/portfolio";
import ContactForm from "../contact/ContactForm";

interface AnswerData {
  title: string;
  subtitle?: string;
  type: "project" | "projects" | "experience" | "about" | "skills" | "contact" | "search_results" | "custom_text";
  content?: string | string[];
  project?: ProjectEntry;
  experience?: ExperienceEntry;
  results?: {
    projects: ProjectEntry[];
    experiences: ExperienceEntry[];
    skills: string[];
  };
}

interface DiaryAnswerProps {
  answer: AnswerData;
  onBack: () => void;
}

export default function DiaryAnswer({ answer, onBack }: DiaryAnswerProps) {
  // Use state with the answer object itself as the key/tracker
  const [prevAnswer, setPrevAnswer] = useState<AnswerData | null>(null);
  const [preambleDone, setPreambleDone] = useState(false);

  // If the answer changed, reset preambleDone when it mounts/updates
  useEffect(() => {
    if (answer !== prevAnswer) {
      setPrevAnswer(answer);
      setPreambleDone(false);
    }
  }, [answer, prevAnswer]);

  // Generate Riddle-style preambles
  const getPreamble = () => {
    switch (answer.type) {
      case "project":
        return `I remember crafting this artifact... ${answer.project?.name || "It"} was a creation born of intent. Let me share its records.`;
      case "projects":
        return "I have documented my creations on these pages. Examine these artifacts of code...";
      case "experience":
        return "My chronicles. These are the paths I have walked, the systems I have shaped, and the houses I have served.";
      case "about":
        return "You speak of origins. Let me write of my history and the lessons I have learned along the way.";
      case "skills":
        return "The arcane library. These are the languages and crafts I have mastered to bend systems to my will.";
      case "contact":
        return "Should you wish to send your owl... I have left my marks. Speak to me through these portals.";
      case "search_results":
        return `My memories reveal matching records for your inquiry. Turn the page to see what I have found.`;
      default:
        return typeof answer.content === "string" 
          ? answer.content 
          : "I have written of this before, but perhaps your eyes search for something else.";
    }
  };

  return (
    <div className="diary-answer-container w-full h-full flex flex-col justify-between select-text">
      {/* Riddle Preamble */}
      <div className="mb-4">
        <DiaryWriter 
          text={getPreamble()} 
          onComplete={() => setPreambleDone(true)}
          speed={30}
          delay={300}
        />
      </div>

      {/* Answer content revealed after Riddle finished writing the preamble */}
      {preambleDone && (
        <div
          className="diary-details-area flex-1 overflow-y-auto pr-4 border-t border-dashed border-[rgba(118,83,46,0.18)] pt-4 mt-2"
          style={{ animation: "ink-bloom-in 0.6s ease forwards" }}
        >
          {/* Title */}
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-display text-blood-ink text-xl tracking-wide">{answer.title}</h3>
            <button 
              onClick={onBack} 
              className="font-handwritten text-sm text-ink-faded hover:text-blood-ink border border-dashed border-[rgba(118,83,46,0.25)] px-2 py-0.5 rounded cursor-pointer transition-colors"
            >
              [ Return ]
            </button>
          </div>

          {/* PROJECT DETAIL */}
          {answer.type === "project" && answer.project && (
            <div className="diary-project-details font-handwritten text-ink-faded space-y-4">
              {answer.project.image && (
                <div className="w-full h-40 overflow-hidden rounded border border-[rgba(118,83,46,0.2)] shadow-inner relative">
                  <Image 
                    src={answer.project.image} 
                    alt={answer.project.name} 
                    fill
                    className="object-cover grayscale opacity-90 hover:grayscale-0 transition-all duration-300"
                  />
                </div>
              )}
              {answer.project.summary && (
                <p className="text-lg leading-relaxed">{answer.project.summary}</p>
              )}
              {answer.project.techStack && (
                <div>
                  <strong className="text-blood-ink">Incantations (Tech Stack):</strong>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {answer.project.techStack.map((tech: string) => (
                      <span key={tech} className="px-2 py-0.5 border border-[rgba(118,83,46,0.3)] rounded text-sm bg-gold/5">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {answer.project.features && (
                <div>
                  <strong className="text-blood-ink">Runes (Key Features):</strong>
                  <ul className="list-disc pl-5 space-y-1 mt-1 text-base">
                    {answer.project.features.map((feat: string, i: number) => (
                      <li key={i}>{feat}</li>
                    ))}
                  </ul>
                </div>
              )}
              <div className="flex gap-4 pt-2">
                {answer.project.gitLink && (
                  <a 
                    href={answer.project.gitLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blood-ink underline hover:text-ink text-lg"
                  >
                    Examine Code (GitHub) →
                  </a>
                )}
                {answer.project.demoLink && (
                  <a 
                    href={answer.project.demoLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blood-ink underline hover:text-ink text-lg font-bold"
                  >
                    Witness Live Demo →
                  </a>
                )}
              </div>
            </div>
          )}

          {/* PROJECTS LIST */}
          {answer.type === "projects" && (
            <div className="space-y-4 font-handwritten">
              <div className="divide-y divide-dashed divide-[rgba(118,83,46,0.18)]">
                {(answer.results?.projects || projectsData.projects).map((proj: ProjectEntry) => (
                  <div key={proj.id} className="py-3 first:pt-0">
                    <h4 className="font-display text-blood-ink text-lg">{proj.name}</h4>
                    <p className="text-sm text-ink-faded mb-1">{proj.summary}</p>
                    <a href={proj.demoLink || proj.gitLink} target="_blank" rel="noopener noreferrer" className="text-xs text-blood-ink underline">
                      Examine Artifact →
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* EXPERIENCE LIST — shown when no single experience is selected */}
          {answer.type === "experience" && !answer.experience && (
            <div className="space-y-4 font-handwritten">
              <div className="divide-y divide-dashed divide-[rgba(118,83,46,0.18)]">
                {(answer.results?.experiences || (experienceData.entries as ExperienceEntry[])).map((exp: ExperienceEntry) => (
                  <div key={exp.id} className="py-3 first:pt-0">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-display text-blood-ink text-lg">{exp.company}</h4>
                        <span className="text-sm italic text-ink">{exp.role}</span>
                      </div>
                      <span className="text-xs opacity-60 text-right">{exp.duration}</span>
                    </div>
                    {exp.summary && (
                      <p className="text-sm text-ink-faded mt-1">{exp.summary}</p>
                    )}
                    {exp.skills && exp.skills.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-1.5">
                        {exp.skills.map((skill: string) => (
                          <span key={skill} className="px-1.5 py-0.5 border border-[rgba(118,83,46,0.25)] rounded text-xs bg-gold/5">
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* EXPERIENCE DETAIL — shown for a single experience entry */}
          {answer.type === "experience" && answer.experience && (
            <div className="font-handwritten text-ink-faded space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-xl text-blood-ink font-bold">{answer.experience.company}</h4>
                  <span className="text-md italic text-ink">{answer.experience.role}</span>
                </div>
                <span className="text-sm opacity-70">{answer.experience.duration}</span>
              </div>
              {answer.experience.summary && (
                <p className="text-lg italic">{answer.experience.summary}</p>
              )}
              {answer.experience.description && (
                <ul className="list-disc pl-5 space-y-1.5 text-base">
                  {answer.experience.description.map((bullet: string, i: number) => (
                    <li key={i} className="leading-relaxed">{bullet}</li>
                  ))}
                </ul>
              )}
              {answer.experience.skills && (
                <div className="pt-2">
                  <strong className="text-blood-ink">Skills Applied:</strong>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {answer.experience.skills.map((skill: string) => (
                      <span key={skill} className="px-1.5 py-0.5 border border-[rgba(118,83,46,0.25)] rounded text-xs">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ABOUT ME DETAIL */}
          {answer.type === "about" && (
            <div className="font-handwritten text-ink-faded space-y-4">
              {aboutData.bio.map((paragraph: string, idx: number) => (
                <p key={idx} className="text-lg leading-relaxed">{paragraph}</p>
              ))}
              {aboutData.education && aboutData.education.length > 0 && (
                <div className="border-t border-dashed border-[rgba(118,83,46,0.18)] pt-3">
                  <h4 className="font-display text-blood-ink text-lg mb-2">Schooling & Academics</h4>
                  <div className="space-y-3">
                    {aboutData.education.map((edu, idx) => (
                      <div key={idx}>
                        <h5 className="font-bold text-ink">{edu.degree}</h5>
                        <p className="text-sm opacity-80">{edu.institution} | {edu.duration}</p>
                        {edu.details && <p className="text-sm text-ink-faded mt-0.5">{edu.details}</p>}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* SKILLS DETAIL */}
          {answer.type === "skills" && (
            <div className="font-handwritten text-ink-faded space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {skillsData.categories.map((cat) => (
                  <div key={cat.name}>
                    <h4 className="font-display text-blood-ink text-lg border-b border-dashed border-[rgba(118,83,46,0.2)] pb-1 mb-2">{cat.name}</h4>
                    <p className="text-base leading-relaxed">
                      {cat.skills.map((s) => s.name).join(", ")}.
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CONTACT INFO */}
          {answer.type === "contact" && (
            <div className="font-handwritten text-ink-faded space-y-4 text-lg">
              <p>You may send owls or direct transmissions to these coordinates:</p>
              
              <div className="mt-2 mb-4 p-3 rounded border border-dashed border-[rgba(118,83,46,0.25)] bg-gold/5">
                <ContactForm />
              </div>

              <ul className="space-y-3 pl-2 border-t border-dashed border-[rgba(118,83,46,0.18)] pt-4">
                {socialData.email && (
                  <li>
                    <strong className="text-blood-ink">Owl (Email):</strong>{" "}
                    <a href={`mailto:${socialData.email}`} className="underline hover:text-blood-ink">
                      {socialData.email}
                    </a>
                  </li>
                )}
                {socialData.linkedin && (
                  <li>
                    <strong className="text-blood-ink">LinkedIn Seal:</strong>{" "}
                    <a href={socialData.linkedin} target="_blank" rel="noopener noreferrer" className="underline hover:text-blood-ink">
                      {socialData.linkedin.replace("https://", "")}
                    </a>
                  </li>
                )}
                {socialData.github && (
                  <li>
                    <strong className="text-blood-ink">GitHub Repository:</strong>{" "}
                    <a href={socialData.github} target="_blank" rel="noopener noreferrer" className="underline hover:text-blood-ink">
                      {socialData.github.replace("https://", "")}
                    </a>
                  </li>
                )}
              </ul>
            </div>
          )}

          {/* SEARCH RESULTS MATCHES */}
          {answer.type === "search_results" && answer.results && (
            <div className="font-handwritten text-ink-faded space-y-4">
              {answer.results.skills.length > 0 && (
                <div>
                  <strong className="text-blood-ink">Matching Skills Found:</strong>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {answer.results.skills.map((s) => (
                      <span key={s} className="px-2 py-0.5 border border-[rgba(118,83,46,0.25)] rounded text-sm bg-gold/5">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {answer.results.projects.length > 0 && (
                <div className="border-t border-dashed border-[rgba(118,83,46,0.18)] pt-2">
                  <strong className="text-blood-ink">Matching Artifacts (Projects):</strong>
                  <div className="divide-y divide-[rgba(118,83,46,0.1)]">
                    {answer.results.projects.map((p: ProjectEntry) => (
                      <div key={p.id} className="py-2">
                        <span className="font-bold text-ink">{p.name}</span> — <span className="text-sm">{p.summary}</span>
                        <div className="mt-1">
                          <a href={p.demoLink || p.gitLink} target="_blank" rel="noopener noreferrer" className="text-xs text-blood-ink underline">
                            Examine Artifact →
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {answer.results.experiences.length > 0 && (
                <div className="border-t border-dashed border-[rgba(118,83,46,0.18)] pt-2">
                  <strong className="text-blood-ink">Matching Chronicles (Experience):</strong>
                  <div className="divide-y divide-[rgba(118,83,46,0.1)]">
                    {answer.results.experiences.map((e: ExperienceEntry) => (
                      <div key={e.id} className="py-2">
                        <span className="font-bold text-ink">{e.company}</span> — <span className="text-sm italic">{e.role} ({e.duration})</span>
                        <p className="text-sm opacity-80 mt-0.5">{e.summary}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
