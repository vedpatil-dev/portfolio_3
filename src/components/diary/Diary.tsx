"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { useDiaryMachine } from "./useDiaryMachine";
import DiaryBook from "./DiaryBook";
import projectsData from "@/src/data/content/projects.json";
import experienceData from "@/src/data/content/experience.json";
import skillsData from "@/src/data/content/skills.json";
import {
  Home as HomeIcon,
  User as UserIcon,
  BookOpen,
  Briefcase,
  FolderGit2,
  Mail,
  Folder,
  Book,
  X,
} from "lucide-react";
import "./diary.css";

/* ── Command options ── */
const COMMANDS = [
  { id: "home", label: "Home", icon: <HomeIcon className="w-4 h-4" />, route: "/" },
  { id: "about", label: "About", icon: <UserIcon className="w-4 h-4" />, route: "/about" },
  { id: "skills", label: "Skills", icon: <BookOpen className="w-4 h-4" />, route: "/about#skills" },
  { id: "experience", label: "Experience", icon: <Briefcase className="w-4 h-4" />, route: "/experience" },
  { id: "projects", label: "Projects", icon: <FolderGit2 className="w-4 h-4" />, route: "/projects" },
  { id: "contact", label: "Contact", icon: <Mail className="w-4 h-4" />, route: "/contact" },
  ...projectsData.projects.map((p) => ({
    id: p.slug,
    label: `Project: ${p.name}`,
    icon: <Folder className="w-4 h-4" />,
    route: `/projects/${p.slug}`,
    tags: p.techStack,
  })),
  ...experienceData.entries.map((e) => ({
    id: e.id,
    label: `Experience: ${e.company}`,
    icon: <Book className="w-4 h-4" />,
    route: `/experience#${e.id}`,
    tags: e.skills,
  })),
];

// Precomputed normalized search index for faster query filtering
const SEARCH_INDEX = {
  projects: projectsData.projects.map((p) => ({
    ...p,
    normalizedName: p.name.toLowerCase(),
    normalizedSummary: p.summary.toLowerCase(),
    normalizedTechStack: p.techStack.map((t) => t.toLowerCase()),
  })),
  experiences: experienceData.entries.map((e) => ({
    ...e,
    normalizedCompany: e.company.toLowerCase(),
    normalizedRole: e.role.toLowerCase(),
    normalizedSummary: e.summary.toLowerCase(),
    normalizedDescription: e.description.map((d) => d.toLowerCase()),
  })),
  skills: skillsData.categories.flatMap((cat) =>
    cat.skills.map((s) => ({
      name: s.name,
      normalizedName: s.name.toLowerCase(),
    }))
  ),
};

interface DiaryProps {
  open: boolean;
  onClose: () => void;
}

export default function Diary({ open, onClose }: DiaryProps) {
  const { phase, transitionTo } = useDiaryMachine("closed");
  const [query, setQuery] = useState("");
  const overlayRef = useRef<HTMLDivElement>(null);
  const [answer, setAnswer] = useState<any | null>(null);
  const [highlighted, setHighlighted] = useState(0);

  // Sync state machine with parent open state
  useEffect(() => {
    if (open) {
      transitionTo("appearing");
    } else if (phase !== "closed" && phase !== "closing") {
      transitionTo("closing");
    }
  }, [open]);

  const handleCloseTrigger = useCallback(() => {
    if (phase !== "closed" && phase !== "closing") {
      transitionTo("closing");
    }
  }, [phase, transitionTo]);

  const handleCloseComplete = useCallback(() => {
    setQuery("");
    setAnswer(null);
    setHighlighted(0);
    onClose();
  }, [onClose]);

  // Filtering search commands
  const filtered = query.trim()
    ? COMMANDS.filter(
        (c) =>
          c.label.toLowerCase().includes(query.toLowerCase()) ||
          c.id.toLowerCase().includes(query.toLowerCase()) ||
          (c as any).tags?.some((t: string) => t.toLowerCase().includes(query.toLowerCase()))
      )
    : COMMANDS;

  // Submit query search matching logic
  const handleSearchSubmit = useCallback(
    (selectedCmd?: any) => {
      const targetCmd = selectedCmd || (filtered[highlighted] && query.trim() ? filtered[highlighted] : null);

      if (targetCmd) {
        // Direct shortcuts
        if (targetCmd.id === "home") {
          setAnswer({
            title: "Home",
            type: "custom_text",
            content: "Welcome to my portfolio. Write in my diary or turn the index to search my memories.",
          });
        } else if (targetCmd.id === "about") {
          setAnswer({ title: "About Me", type: "about" });
        } else if (targetCmd.id === "skills") {
          setAnswer({ title: "Skills Library", type: "skills" });
        } else if (targetCmd.id === "experience") {
          setAnswer({ title: "The Chronicles", type: "experience" });
        } else if (targetCmd.id === "projects") {
          setAnswer({ title: "Magical Artifacts", type: "projects" });
        } else if (targetCmd.id === "contact") {
          setAnswer({ title: "Send an Owl", type: "contact" });
        } else {
          // Custom specific project/experience shortcut match
          const proj = projectsData.projects.find((p) => p.slug === targetCmd.id);
          if (proj) {
            setAnswer({ title: proj.name, type: "project", project: proj });
          } else {
            const exp = experienceData.entries.find((e) => e.id === targetCmd.id);
            if (exp) {
              setAnswer({ title: `${exp.company} — ${exp.role}`, type: "experience", experience: exp });
            }
          }
        }
      } else {
        // Arbitrary textual search matching
        const q = query.trim().toLowerCase();
        if (!q) return;

        // Check for direct word matching first for native sections
        if (["about", "author", "origin", "bio", "history"].includes(q)) {
          setAnswer({ title: "About Me", type: "about" });
        } else if (["skills", "languages", "arcane", "technologies", "tech"].includes(q)) {
          setAnswer({ title: "Skills Library", type: "skills" });
        } else if (["experience", "jobs", "work", "chronicles", "timeline"].includes(q)) {
          setAnswer({ title: "The Chronicles", type: "experience" });
        } else if (["projects", "artifacts", "portfolio", "code"].includes(q)) {
          setAnswer({ title: "Magical Artifacts", type: "projects" });
        } else if (["contact", "owl", "email", "reach"].includes(q)) {
          setAnswer({ title: "Send an Owl", type: "contact" });
        } else {
          const matchedProjects = SEARCH_INDEX.projects.filter(
            (p) =>
              p.normalizedName.includes(q) ||
              p.normalizedSummary.includes(q) ||
              p.normalizedTechStack.some((t) => t.includes(q))
          );

          const matchedExperiences = SEARCH_INDEX.experiences.filter(
            (e) =>
              e.normalizedCompany.includes(q) ||
              e.normalizedRole.includes(q) ||
              e.normalizedSummary.includes(q) ||
              e.normalizedDescription.some((d) => d.includes(q))
          );

          const matchedSkills = SEARCH_INDEX.skills
            .filter((s) => s.normalizedName.includes(q))
            .map((s) => s.name);

          if (matchedProjects.length > 0 || matchedExperiences.length > 0 || matchedSkills.length > 0) {
            setAnswer({
              title: `Search matches for "${query}"`,
              type: "search_results",
              results: {
                projects: matchedProjects.map(({ normalizedName, normalizedSummary, normalizedTechStack, ...p }) => p),
                experiences: matchedExperiences.map(({ normalizedCompany, normalizedRole, normalizedSummary, normalizedDescription, ...e }) => e),
                skills: matchedSkills,
              },
            });
          } else {
            setAnswer({
              title: "Ved's thoughts remain blank...",
              type: "custom_text",
              content: `I searched my memories for "${query}", but found no records. Try asking about skills like "React", "Spring Boot", or projects like "FundDev".`,
            });
          }
        }
      }

      setQuery("");
      transitionTo("page_turn");
    },
    [query, filtered, highlighted, transitionTo]
  );

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setHighlighted((h) => Math.min(h + 1, filtered.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setHighlighted((h) => Math.max(h - 1, 0));
      } else if (e.key === "Enter") {
        e.preventDefault();
        handleSearchSubmit();
      } else if (e.key === "Escape") {
        handleCloseTrigger();
      }
    },
    [filtered, handleSearchSubmit, handleCloseTrigger]
  );

  // Handle ESC globally when modal is open
  useEffect(() => {
    if (phase === "closed") return;
    const globalEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleCloseTrigger();
      }
    };
    window.addEventListener("keydown", globalEsc);
    return () => window.removeEventListener("keydown", globalEsc);
  }, [phase, handleCloseTrigger]);

  if (phase === "closed") return null;

  return (
    <div
      ref={overlayRef}
      className="diary-overlay active"
      role="dialog"
      aria-modal="true"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleCloseTrigger();
      }}
      style={{
        transition: phase === "closing" ? "none" : "opacity 0.5s ease-in-out",
        opacity: phase === "closing" ? undefined : 1,
      }}
    >
      {/* ── Overlay Close Button ── */}
      <button
        onClick={handleCloseTrigger}
        className="diary-close-btn"
        aria-label="Close Diary"
      >
        <X className="w-5 h-5" />
      </button>

      {/* ── 3D Viewport container ── */}
      <div className="diary-viewport">
        <DiaryBook
          phase={phase}
          transitionTo={transitionTo}
          onCloseComplete={handleCloseComplete}
          query={query}
          setQuery={setQuery}
          answer={answer}
          setAnswer={setAnswer}
          onSubmit={handleSearchSubmit}
          filtered={filtered}
          highlighted={highlighted}
          setHighlighted={setHighlighted}
          handleKeyDown={handleKeyDown}
          overlayRef={overlayRef}
        />
      </div>
    </div>
  );
}
