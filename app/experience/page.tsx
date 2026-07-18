"use client";

import React, { useState } from "react";
import MapShell from "@/src/components/layout/MapShell";
import experienceData from "@/src/data/content/experience.json";
import { ChevronDown, ChevronUp } from "lucide-react";

type ExperienceEntry = typeof experienceData.entries[0];

export default function ExperiencePage() {
  const [selected, setSelected] = useState<ExperienceEntry | null>(null);

  return (
    <MapShell>
      <section className="map-section px-4 py-12 md:py-16" aria-labelledby="exp-title">
        <div className="max-w-5xl w-full mx-auto space-y-10">

          {/* Chapter header */}
          <div className="text-center">
            <p className="font-handwritten text-sm text-ink-faded tracking-widest mb-2 opacity-70">
              Chapter III
            </p>
            <h1 id="exp-title" className="chapter-header text-3xl md:text-4xl">
              Experience
            </h1>
            <div className="chapter-divider w-48 mx-auto mt-2" />
            <p className="font-handwritten text-base text-ink-faded italic mt-2 opacity-80">
              Professional roles and internships
            </p>
          </div>

          {/* Timeline */}
          <div className="relative space-y-6">
            {/* Vertical line */}
            <div
              className="absolute left-6 md:left-8 top-0 bottom-0 w-0.5 pointer-events-none"
              style={{
                background: "linear-gradient(to bottom, transparent, #7a3b1e 15%, #967331 50%, #7a3b1e 85%, transparent)",
                opacity: 0.55,
              }}
              aria-hidden="true"
            />

            {experienceData.entries.map((entry, i) => (
              <div key={entry.id} id={entry.id} className="relative pl-16 md:pl-20">
                {/* Timeline node */}
                <div className="absolute left-4 md:left-6 top-5 flex items-center justify-center" aria-hidden="true">
                  <div
                    className="w-8 h-8 rounded-full border-2 flex items-center justify-center text-lg overflow-hidden"
                    style={{
                      background: "radial-gradient(circle at 35% 35%, rgba(214,189,137,0.9), rgba(155,118,65,0.7))",
                      borderColor: selected?.id === entry.id ? "var(--gold)" : "rgba(118,83,46,0.5)",
                      boxShadow: selected?.id === entry.id ? "0 0 10px rgba(150,115,49,0.5)" : "none",
                    }}
                  >
                    <img
                      src={entry.icon}
                      alt=""
                      className="object-contain"
                      onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
                    />
                  </div>
                </div>

                {/* Entry card */}
                <button
                  className={`artifact-card w-full text-left p-5 md:p-6 transition-all duration-300 cursor-pointer ${
                    selected?.id === entry.id ? "ring-2 ring-gold/50" : ""
                  }`}
                  onClick={() => setSelected(selected?.id === entry.id ? null : entry)}
                  aria-expanded={selected?.id === entry.id}
                  aria-controls={`exp-detail-${entry.id}`}
                >
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <h2 className="font-display text-xl text-leather font-bold">{entry.role}</h2>
                      <p className="font-serif text-base text-leather-light font-semibold">{entry.company}</p>
                    </div>
                    <span className="font-handwritten text-sm text-blood-ink shrink-0">{entry.duration}</span>
                  </div>
                  <p className="font-serif text-sm text-ink-faded mt-2 italic leading-relaxed">
                    {entry.summary}
                  </p>

                  {/* Tech tags */}
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {entry.skills.map((s, si) => (
                      <span key={si} className="skill-tag">{s}</span>
                    ))}
                  </div>

                  <div className="font-handwritten text-xs text-ink-faded mt-3 opacity-60 flex items-center gap-1">
                    {selected?.id === entry.id ? (
                      <>
                        <ChevronUp className="w-3.5 h-3.5 shrink-0" />
                        <span>Collapse</span>
                      </>
                    ) : (
                      <>
                        <ChevronDown className="w-3.5 h-3.5 shrink-0" />
                        <span>View details</span>
                      </>
                    )}
                  </div>
                </button>

                {/* Expanded detail */}
                {selected?.id === entry.id && (
                  <div
                    id={`exp-detail-${entry.id}`}
                    className="map-content-card mt-2 p-5 md:p-6 animate-fade-in"
                  >
                    <h3 className="font-display text-sm uppercase tracking-widest text-leather-light mb-3 border-b border-parchment-dark/20 pb-2">
                      ✦ Key Contributions
                    </h3>
                    <ul className="space-y-2">
                      {entry.description.map((bullet, bi) => (
                        <li key={bi} className="flex items-start gap-2 font-serif text-sm text-ink-faded leading-relaxed">
                          <span className="text-gold shrink-0 mt-0.5" aria-hidden="true">✦</span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="text-center pt-4">
            <p className="font-handwritten text-base text-ink-faded italic opacity-70">
              ~ The journey continues. &ldquo;After all this time? Always.&rdquo; ~
            </p>
          </div>

        </div>
      </section>
    </MapShell>
  );
}
