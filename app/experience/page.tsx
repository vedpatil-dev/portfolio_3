"use client";

import React, { useState, Suspense, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import Diary from "@/src/components/diary/Diary";
import ExperienceMap from "@/src/components/map/ExperienceMap";

interface ExperienceEntry {
  id: string;
  company: string;
  role: string;
  duration: string;
  summary: string;
  animation: string;
  icon: string;
  description: string[];
  skills: string[];
}

function ExperiencePageContent() {
  const searchParams = useSearchParams();

  const highlightId = searchParams.get("highlight");

  const [selectedExperience, setSelectedExperience] = useState<ExperienceEntry | null>(null);

  // Update selected experience when map triggers callback
  const handleSelectExperience = useCallback((exp: ExperienceEntry) => {
    setSelectedExperience(exp);
    // Sync to URL query param silently without full page refresh
    const url = `/experience?highlight=${exp.id}`;
    window.history.pushState({ ...window.history.state, as: url, url }, "", url);
  }, []);

  // Profile data description / list details
  const renderLeftPageContent = () => {
    if (!selectedExperience) {
      return (
        <div className="flex-1 flex items-center justify-center text-center p-4">
          <p className="font-handwritten text-xl text-ink-faded">
            Select a location on the map of chronicles to reveal its history.
          </p>
        </div>
      );
    }

    return (
      <div className="space-y-6 animate-fade-in select-text">
        <div className="border-b border-double border-parchment-dark/30 pb-3">
          <span className="font-handwritten text-lg text-blood-ink font-bold block">
            {selectedExperience.duration}
          </span>
          <h3 className="font-display text-2xl text-leather font-bold">
            {selectedExperience.role}
          </h3>
          <h4 className="font-serif text-base text-leather-light font-semibold">
            {selectedExperience.company}
          </h4>
        </div>

        {/* Short Summary */}
        <p className="font-serif text-sm text-ink-faded leading-relaxed text-justify italic">
          &quot;{selectedExperience.summary}&quot;
        </p>

        {/* Bullet description */}
        <div className="space-y-3">
          <h5 className="font-display text-xs font-bold text-leather-light tracking-wide uppercase border-b border-dotted border-parchment-dark/20 pb-1">
            deeds accomplished (Chronicle log)
          </h5>
          <ul className="space-y-2 text-sm font-serif text-ink-faded leading-relaxed">
            {selectedExperience.description.map((bullet, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-[#967331] shrink-0 mt-1">✦</span>
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Technologies utilized */}
        <div className="space-y-2 pt-2">
          <h5 className="font-display text-xs font-bold text-leather-light tracking-wide uppercase">
            Runes utilized (Skills)
          </h5>
          <div className="flex flex-wrap gap-1.5">
            {selectedExperience.skills.map((skill, idx) => (
              <span
                key={idx}
                className="font-mono text-[10px] text-leather bg-parchment-dark/20 border border-parchment-dark/30 px-1.5 py-0.5 rounded-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="font-handwritten text-xl text-blood-ink text-center pt-2 select-none">
          ~ Active record verified.
        </div>
      </div>
    );
  };

  return (
    <Diary
      activeChapter="experience"
      leftPageContent={renderLeftPageContent()}
      rightPageContent={
        <ExperienceMap
          highlightId={highlightId}
          onSelectExperience={handleSelectExperience}
        />
      }
    />
  );
}

export default function ExperiencePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#100b08] flex items-center justify-center font-handwritten text-2xl text-[#d6bd89]">
        Summoning Chapter III...
      </div>
    }>
      <ExperiencePageContent />
    </Suspense>
  );
}
