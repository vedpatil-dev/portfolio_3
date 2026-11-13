"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { useDiaryMachine } from "./useDiaryMachine";
import DiaryBook from "./DiaryBook";
import projectsData from "@/src/data/content/projects.json";
import experienceData from "@/src/data/content/experience.json";
import skillsData from "@/src/data/content/skills.json";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import "./diary.css";
import { COMMANDS } from "@/src/lib/navigationCommands";

interface DiaryProps {
  open: boolean;
  onClose: () => void;
}

export default function Diary({ open, onClose }: DiaryProps) {
  const { phase, transitionTo } = useDiaryMachine("closed");
  const router = useRouter();
  const [query, setQuery] = useState("");
  const overlayRef = useRef<HTMLDivElement>(null);
  const [answer, setAnswer] = useState<any | null>(null);
  const [highlighted, setHighlighted] = useState(0);
  // Stays mounted permanently to preload textures and prevent white flash on open.

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
      // Why: suggestion chips search for plain text without a matching command. Impact: `{ rawQuery }` runs the normal
      // text search with that term (the `query` state is not updated yet when the chip fires).
      const rawQuery: string | undefined = selectedCmd?.rawQuery;
      const searchText = (rawQuery ?? query).trim();
      const targetCmd = rawQuery ? null : selectedCmd || (filtered[highlighted] && query.trim() ? filtered[highlighted] : null);

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
          // Why: command ids are namespaced ("project:"/"experience:") in navigationCommands to stay unique.
          // Custom specific project/experience shortcut match
          const proj = projectsData.projects.find((p) => `project:${p.slug}` === targetCmd.id);
          if (proj) {
            setAnswer({ title: proj.name, type: "project", project: proj });
          } else {
            const exp = experienceData.entries.find((e) => `experience:${e.id}` === targetCmd.id);
            if (exp) {
              setAnswer({ title: `${exp.company} — ${exp.role}`, type: "experience", experience: exp });
            }
          }
        }
      } else {
        // Arbitrary textual search matching
        const q = searchText.toLowerCase();
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
          const matchedProjects = projectsData.projects.filter(
            (p) =>
              p.name.toLowerCase().includes(q) ||
              p.summary.toLowerCase().includes(q) ||
              p.techStack.some((t) => t.toLowerCase().includes(q))
          );

          const matchedExperiences = experienceData.entries.filter(
            (e) =>
              e.company.toLowerCase().includes(q) ||
              e.role.toLowerCase().includes(q) ||
              e.summary.toLowerCase().includes(q) ||
              e.description.some((d) => d.toLowerCase().includes(q))
          );

          const matchedSkills = skillsData.categories
            .flatMap((cat) => cat.skills)
            .filter((s) => s.name.toLowerCase().includes(q))
            .map((s) => s.name);

          if (matchedProjects.length > 0 || matchedExperiences.length > 0 || matchedSkills.length > 0) {
            setAnswer({
              title: `Search matches for "${searchText}"`,
              type: "search_results",
              results: {
                projects: matchedProjects,
                experiences: matchedExperiences,
                skills: matchedSkills,
              },
            });
          } else {
            setAnswer({
              title: "Ved's thoughts remain blank...",
              type: "custom_text",
              content: `I searched my memories for "${searchText}", but found no records. Try asking about skills like "React", "Spring Boot", or projects like "FundDev".`,
            });
          }
        }
      }

      setQuery("");
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

  return (
    <div
      ref={overlayRef}
      className={`diary-overlay${phase !== "closed" ? " active" : ""}`}
      role="dialog"
      aria-modal="true"
      aria-label="Ved's Diary — search my work"
      aria-hidden={phase === "closed"}
      inert={phase === "closed"}
      onClick={(e) => {
        if (e.target === e.currentTarget) handleCloseTrigger();
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
          // Why: answers had no way to reach the real page. Impact: "Open page" navigates there and closes the diary.
          onOpenPage={(route: string) => {
            router.push(route);
            handleCloseTrigger();
          }}
        />
      </div>
    </div>
  );
}
