"use client";

import React, { useState, useEffect, useMemo } from "react";
import experienceData from "@/src/data/content/experience.json";

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

interface ExperienceMapProps {
  highlightId?: string | null;
  onSelectExperience: (experience: ExperienceEntry) => void;
}

export default function ExperienceMap({
  highlightId,
  onSelectExperience,
}: ExperienceMapProps) {
  const entries: ExperienceEntry[] = experienceData.entries;
  
  // State for hovered node
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  
  // Coordinate mapping for chronological order (1M1B Sep 2024 -> EY Feb 2025 -> Elecon May 2025)
  // Let's layout nodes from left to right along a winding path
  const nodePositions: Record<string, { x: number; y: number; labelYOffset: number }> = {
    "1m1b": { x: 120, y: 320, labelYOffset: 45 },
    "ey": { x: 300, y: 180, labelYOffset: -25 },
    "elecon": { x: 480, y: 300, labelYOffset: 45 },
  };

  // Find corresponding experiences - memoized to prevent render infinite loop
  const sortedEntries = useMemo(() => {
    return [...entries].sort((a, b) => {
      // Chronological sorting: 1m1b (Sep 2024), ey (Feb 2025), elecon (May 2025)
      const dates: Record<string, number> = { "1m1b": 1, "ey": 2, "elecon": 3 };
      return (dates[a.id] || 0) - (dates[b.id] || 0);
    });
  }, [entries]);

  // Default select first item on mount or if highlightId changes
  useEffect(() => {
    if (highlightId) {
      const selected = entries.find((e) => e.id === highlightId);
      if (selected) {
        onSelectExperience(selected);
        return;
      }
    }
    // Default selection
    if (sortedEntries.length > 0) {
      onSelectExperience(sortedEntries[0]);
    }
  }, [highlightId, entries, onSelectExperience, sortedEntries]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      
      {/* Map Caption */}
      <div className="text-center mb-4">
        <h4 className="font-display text-xl text-leather font-bold tracking-wide">
          The Path of Chronicles
        </h4>
        <p className="font-handwritten text-sm text-ink-faded">
          Hover or click locations to read the wizard&apos;s deeds
        </p>
      </div>

      {/* SVG Map Canvas */}
      <div className="w-full relative aspect-[5/4] border border-parchment-dark/30 rounded bg-[#c5a671]/40 overflow-hidden shadow-inner p-2">
        
        {/* Parchment background grain/lines specifically for map */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_40%,_rgba(118,83,46,0.15)_100%)] pointer-events-none" />

        <svg
          viewBox="0 0 600 450"
          className="w-full h-full select-none"
        >
          {/* Compass Rose / Old Map Decoration */}
          <g transform="translate(520, 90)" className="opacity-40">
            <circle cx="0" cy="0" r="30" fill="none" stroke="#76532e" strokeWidth="1" strokeDasharray="3,3" />
            <path d="M 0 -40 L 5 -10 L 25 -25 L 10 -5 L 40 0 L 10 5 L 25 25 L 5 10 L 0 40 L -5 10 L -25 25 L -10 5 L -40 0 L -10 -5 L -25 -25 L -5 -10 Z" fill="none" stroke="#76532e" strokeWidth="1.5" />
            <text x="-4" y="-45" className="font-display text-[10px] fill-ink">N</text>
          </g>

          {/* Chronological Winding Path (dashed trail) */}
          <path
            d="M 60 380 Q 120 320 120 320 T 300 180 T 480 300 T 560 220"
            fill="none"
            stroke="#76532e"
            strokeWidth="3"
            strokeDasharray="6,8"
            strokeLinecap="round"
            className="opacity-70"
          />

          {/* SVG Map Grid Marks */}
          <g stroke="#76532e" strokeWidth="0.5" className="opacity-15" fill="none">
            <line x1="50" y1="0" x2="50" y2="450" />
            <line x1="150" y1="0" x2="150" y2="450" />
            <line x1="250" y1="0" x2="250" y2="450" />
            <line x1="350" y1="0" x2="350" y2="450" />
            <line x1="450" y1="0" x2="450" y2="450" />
            <line x1="550" y1="0" x2="550" y2="450" />
            <line x1="0" y1="100" x2="600" y2="100" />
            <line x1="0" y1="200" x2="600" y2="200" />
            <line x1="0" y1="300" x2="600" y2="300" />
            <line x1="0" y1="400" x2="600" y2="400" />
          </g>

          {/* SVG Sea Monster / Stained Art (decorative map details) */}
          <g transform="translate(100, 100)" className="opacity-20 select-none pointer-events-none font-handwritten text-xs fill-ink-faded">
            <text x="0" y="0">Terra Incognita</text>
          </g>

          {/* Interactive Nodes */}
          {sortedEntries.map((entry) => {
            const pos = nodePositions[entry.id] || { x: 100, y: 100, labelYOffset: 30 };
            const isActive = highlightId === entry.id;
            const isHovered = hoveredNode === entry.id;

            return (
              <g
                key={entry.id}
                className="cursor-pointer"
                onClick={() => onSelectExperience(entry)}
                onMouseEnter={() => setHoveredNode(entry.id)}
                onMouseLeave={() => setHoveredNode(null)}
              >
                {/* Outer Glow Ring for Selected / Hovered items */}
                {(isActive || isHovered) && (
                  <circle
                    cx={pos.x}
                    cy={pos.y}
                    r="24"
                    fill="none"
                    stroke="#967331"
                    strokeWidth="1.5"
                    className="animate-pulse opacity-75"
                  />
                )}

                {/* Main Node Point (Castle Tower/Stone circle) */}
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r={isActive ? "14" : "10"}
                  fill={isActive ? "#681d18" : "#76532e"}
                  stroke="#21170f"
                  strokeWidth="2"
                  className="transition-all duration-300 hover:scale-125"
                />

                {/* Tiny center core dot */}
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r="4"
                  fill={isActive ? "#d6bd89" : "#b9955b"}
                />

                {/* Waving Banner / Label for Nodes */}
                <g transform={`translate(${pos.x}, ${pos.y + pos.labelYOffset})`}>
                  {/* Label background plate */}
                  <rect
                    x="-75"
                    y="-15"
                    width="150"
                    height="26"
                    rx="3"
                    fill="#d6bd89"
                    stroke="#76532e"
                    strokeWidth="1"
                    className={`shadow-sm ${isActive ? "fill-gold/20 stroke-blood-ink" : "opacity-90"}`}
                  />
                  {/* Company Name */}
                  <text
                    x="0"
                    y="1"
                    textAnchor="middle"
                    className={`font-display text-[10px] font-bold ${
                      isActive ? "fill-blood-ink" : "fill-ink"
                    }`}
                  >
                    {entry.company}
                  </text>
                  {/* Duration text */}
                  <text
                    x="0"
                    y="9"
                    textAnchor="middle"
                    className="font-serif text-[8px] fill-ink-faded"
                  >
                    {entry.duration.split(" - ")[0]}
                  </text>
                </g>
              </g>
            );
          })}
        </svg>

        {/* Legend / Key overlay */}
        <div className="absolute bottom-2 left-2 bg-[#d6bd89]/90 border border-parchment-dark/30 rounded p-1.5 text-[10px] font-display text-ink-faded select-none z-10">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#681d18] border border-ink inline-block" />
            <span>Active Chronicle</span>
          </div>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="w-2 h-2 rounded-full bg-[#76532e] border border-ink inline-block" />
            <span>Past Chronicle</span>
          </div>
        </div>

      </div>
    </div>
  );
}
