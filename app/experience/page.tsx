import MapShell from "@/src/components/layout/MapShell";
import experienceData from "@/src/data/content/experience.json";
import { ChevronDown, ChevronUp } from "lucide-react";
import InteractiveParagraph from "@/src/components/text/InteractiveParagraph";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Experience | Ved Patil",
  description: "Browse the professional roles, internships, and MERN/Full Stack Developer history of Ved Patil.",
};

export default function ExperiencePage() {
  return (
    <MapShell>
      {/* SVG Definitions for Journey Footprints */}
      <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
        <defs>
          <g id="exp-foot-left">
            <path d="M 0 0 C -1.5 -2 -3.5 0 -3 3.5 C -2.2 5.5 2.2 5.5 3 3.5 C 3.5 0 1.5 -2 0 0 Z" fill="currentColor" />
            <circle cx="-2.5" cy="-3.5" r="1" fill="currentColor" />
            <circle cx="-0.7" cy="-5.5" r="1" fill="currentColor" />
            <circle cx="1.5" cy="-5.5" r="1" fill="currentColor" />
            <circle cx="3.2" cy="-3.5" r="1" fill="currentColor" />
          </g>
          <g id="exp-foot-right">
            <path d="M 0 0 C 1.5 -2 3.5 0 3 3.5 C 2.2 5.5 -2.2 5.5 -3 3.5 C -3.5 0 -1.5 -2 0 0 Z" fill="currentColor" />
            <circle cx="2.5" cy="-3.5" r="1" fill="currentColor" />
            <circle cx="0.7" cy="-5.5" r="1" fill="currentColor" />
            <circle cx="-1.5" cy="-5.5" r="1" fill="currentColor" />
            <circle cx="-3.2" cy="-3.5" r="1" fill="currentColor" />
          </g>
        </defs>
      </svg>

      <section className="map-section px-4 py-4 animate-map-fade-in" aria-labelledby="exp-title">
        <div className="max-w-5xl w-full mx-auto space-y-12">

          {/* Chapter header */}
          <div className="text-center">
            <p className="chapter-number">
              Chapter III
            </p>
            <h1 id="exp-title" className="chapter-header text-3xl md:text-4xl">
              The Chronicles
            </h1>
            <div className="chapter-divider w-56 mx-auto mt-2" />
            <div className="mt-2 flex justify-center w-full">
              <InteractiveParagraph
                text="A winding path through professional milestones and training rooms"
                fontClass="font-handwritten text-base text-ink-faded italic text-center"
                fontSpec="16px Caveat, cursive"
                lineHeight={22}
              />
            </div>
          </div>

          {/* Journey Timeline Map Wrapper */}
          <div className="relative mt-8 md:mt-16 pb-12">
            
            {/* Winding road SVG path - DESKTOP ONLY */}
            <div className="absolute inset-0 left-0 right-0 pointer-events-none select-none hidden md:block" aria-hidden="true">
              <svg className="w-full h-full text-parchment-dark/35" viewBox="0 0 800 1200" preserveAspectRatio="none" fill="none">
                <path 
                  d="M 400 0 C 310 150 310 250 400 400 C 490 550 490 650 400 800 C 310 950 310 1050 400 1200" 
                  stroke="var(--gold)" 
                  strokeWidth="2.5" 
                  strokeDasharray="6 8" 
                />
                
                {/* Footprints walking along the winding path */}
                {/* Lane 1: Emgage -> Elecon */}
                <g className="text-blood-ink opacity-35">
                  <use href="#exp-foot-left" x="380" y="80" transform="rotate(-15 380 80) scale(1.1)" />
                  <use href="#exp-foot-right" x="350" y="140" transform="rotate(-30 350 140) scale(1.1)" />
                  <use href="#exp-foot-left" x="340" y="210" transform="rotate(-20 340 210) scale(1.1)" />
                  <use href="#exp-foot-right" x="350" y="280" transform="rotate(10 350 280) scale(1.1)" />
                  <use href="#exp-foot-left" x="380" y="340" transform="rotate(25 380 340) scale(1.1)" />
                </g>
                
                {/* Lane 2: Elecon -> EY */}
                <g className="text-blood-ink opacity-35">
                  <use href="#exp-foot-right" x="420" y="480" transform="rotate(15 420 480) scale(1.1)" />
                  <use href="#exp-foot-left" x="450" y="540" transform="rotate(30 450 540) scale(1.1)" />
                  <use href="#exp-foot-right" x="460" y="610" transform="rotate(20 460 610) scale(1.1)" />
                  <use href="#exp-foot-left" x="450" y="680" transform="rotate(-10 450 680) scale(1.1)" />
                  <use href="#exp-foot-right" x="420" y="740" transform="rotate(-25 420 740) scale(1.1)" />
                </g>

                {/* Lane 3: EY -> 1M1B */}
                <g className="text-blood-ink opacity-35">
                  <use href="#exp-foot-left" x="380" y="880" transform="rotate(-15 380 880) scale(1.1)" />
                  <use href="#exp-foot-right" x="350" y="940" transform="rotate(-30 350 940) scale(1.1)" />
                  <use href="#exp-foot-left" x="340" y="1010" transform="rotate(-20 340 1010) scale(1.1)" />
                  <use href="#exp-foot-right" x="350" y="1080" transform="rotate(10 350 1080) scale(1.1)" />
                  <use href="#exp-foot-left" x="380" y="1140" transform="rotate(25 380 1140) scale(1.1)" />
                </g>
              </svg>
            </div>

            {/* Vertical timeline line - MOBILE ONLY */}
            <div
              className="absolute left-6 top-0 bottom-0 w-0.5 pointer-events-none md:hidden"
              style={{
                background: "linear-gradient(to bottom, transparent, #7a3b1e 10%, #967331 50%, #7a3b1e 90%, transparent)",
                opacity: 0.55,
              }}
              aria-hidden="true"
            />

            {/* Experience Checklist Items */}
            <div className="space-y-12 md:space-y-16">
              {experienceData.entries.map((entry, idx) => {
                const isEven = idx % 2 === 0;
                
                return (
                  <div 
                    key={entry.id} 
                    id={entry.id} 
                    className="relative md:grid md:grid-cols-9 md:gap-8 md:items-center pl-16 md:pl-0"
                  >
                    
                    {/* Checkpoint Node (Castle logo seal) */}
                    <div className="absolute left-4 md:left-auto md:relative md:col-span-1 md:col-start-5 flex justify-center z-10 top-2 md:top-auto">
                      <div
                        className="w-11 h-11 sm:w-13 sm:h-13 rounded-full border-2 border-[rgba(118,83,46,0.5)] flex items-center justify-center overflow-hidden transition-all duration-300 hover:scale-110"
                        style={{
                          background: "radial-gradient(circle at 35% 35%, rgba(214,189,137,0.95), rgba(155,118,65,0.75))",
                          boxShadow: "0 2px 8px rgba(16,11,8,0.15), inset 0 1px 4px rgba(255,255,255,0.2)",
                        }}
                      >
                        <img
                          src={entry.icon}
                          alt={`${entry.company} logo`}
                          className="object-contain justify-center aspect-square mx-auto"
                        />
                      </div>
                    </div>

                    {/* Card container - alternates columns on desktop */}
                    <div className={`md:col-span-4 ${isEven ? "md:col-start-1" : "md:col-start-6"}`}>
                      
                      {/* Pure CSS hover accordion card (Zero React Client State!) */}
                      <div className="group w-full block outline-none">
                        <div className="artifact-card w-full text-left p-5 transition-all duration-300 hover:ring-1 hover:ring-gold/30">
                          
                          <div className="flex flex-wrap items-start justify-between gap-1 border-b border-parchment-dark/15 pb-2">
                            <div>
                              <span className="font-handwritten text-xs text-blood-ink font-semibold uppercase tracking-wider">
                                Checkpoint {String(idx + 1).padStart(2, "0")}
                              </span>
                              <h2 className="font-display text-lg sm:text-xl text-leather font-bold leading-tight mt-0.5">
                                {entry.role}
                              </h2>
                              <p className="font-serif text-sm text-leather-light font-semibold">
                                {entry.company}
                              </p>
                            </div>
                            <span className="font-handwritten text-xs text-blood-ink/80 bg-parchment-light/20 px-2 py-0.5 rounded-sm shrink-0 mt-1 md:mt-0">
                              {entry.duration}
                            </span>
                          </div>

                          <p className="font-serif text-sm text-ink-faded mt-3 italic leading-relaxed">
                            {entry.summary}
                          </p>

                          {/* Tech tags */}
                          <div className="flex flex-wrap gap-1.5 mt-3">
                            {entry.skills.map((s, si) => (
                              <span key={si} className="skill-tag text-xs px-2 py-0.5">{s}</span>
                            ))}
                          </div>

                          {/* Interactive indicators */}
                          <div className="font-handwritten text-xs text-ink-faded mt-3 opacity-60 flex items-center gap-1 select-none pointer-events-none">
                            <span className="group-hover:hidden flex items-center gap-1">
                              <ChevronDown className="w-3.5 h-3.5 shrink-0" />
                              <span>Hover to Unfold Chronicles</span>
                            </span>
                            <span className="hidden group-hover:flex items-center gap-1">
                              <ChevronUp className="w-3.5 h-3.5 shrink-0" />
                              <span>Chronicles Unfolded</span>
                            </span>
                          </div>

                          {/* Expanded details - transitions max-height and opacity on hover */}
                          <div className="max-h-0 opacity-0 overflow-hidden transition-all duration-500 ease-in-out group-hover:max-h-[600px] group-hover:opacity-100 group-hover:mt-4">
                            <div className="map-content-card p-5 relative overflow-hidden border border-dashed border-parchment-dark/30 bg-parchment-light/20">
                              {/* Inside scroll marks */}
                              <div className="absolute top-2 right-3 font-handwritten text-xs text-ink-faded opacity-30 select-none">
                                VP-RECORD
                              </div>
                              
                              <h3 className="font-display text-xs uppercase tracking-widest text-leather-light mb-3 border-b border-parchment-dark/20 pb-1.5">
                                ✦ Key Chronicles & Feats
                              </h3>
                              
                              <ul className="space-y-2">
                                {entry.description.map((bullet, bi) => (
                                  <li key={bi} className="flex items-start gap-2 font-serif text-sm text-ink-faded leading-relaxed">
                                    <span className="text-gold shrink-0 mt-1 text-[10px]" aria-hidden="true">✦</span>
                                    <span>{bullet}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>

                        </div>
                      </div>

                    </div>

                  </div>
                );
              })}
            </div>

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
