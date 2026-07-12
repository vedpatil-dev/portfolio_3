"use client";

import React, { useState } from "react";
import Diary from "@/src/components/diary/Diary";
import profileData from "@/src/data/content/profile.json";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);

  // Welcome Content for the Right Page of the Open Diary
  const rightPageContent = (
    <div className="flex-1 flex flex-col justify-center py-4 select-text">
      <div className="space-y-6">
        <h3 className="font-display text-3xl text-leather border-b border-double border-parchment-dark/30 pb-2">
          Salutations, Traveler!
        </h3>
        
        <p className="font-serif leading-relaxed text-ink-faded text-justify">
          You have unlocked the private chronicles of <strong className="text-leather font-semibold">{profileData.name}</strong>, 
          a {profileData.title.toLowerCase()} who weaves code into digital reality. Within these aged parchment pages, 
          you will discover my skills, projects, and professional timeline.
        </p>

        <div className="bg-[#c5a671]/20 border border-parchment-dark/20 rounded p-4 space-y-2">
          <h4 className="font-display text-sm font-bold tracking-widest text-leather-light uppercase">
            Instructions of Summoning
          </h4>
          <p className="font-serif text-sm text-ink-faded leading-relaxed">
            1. Click on any chapter in the <strong className="text-blood-ink font-semibold">Index of Spells</strong> on the left page.
          </p>
          <p className="font-serif text-sm text-ink-faded leading-relaxed">
            2. Or, type keywords directly in the prompt below (e.g. <code className="bg-parchment-dark/10 px-1 py-0.5 rounded text-blood-ink font-mono text-xs">skills</code>, <code className="bg-parchment-dark/10 px-1 py-0.5 rounded text-blood-ink font-mono text-xs">lms</code>, <code className="bg-parchment-dark/10 px-1 py-0.5 rounded text-blood-ink font-mono text-xs">elecon</code>) and press <strong className="font-display text-xs">[Enter]</strong>.
          </p>
        </div>

        <p className="font-handwritten text-2xl text-blood-ink text-center pt-2">
          ~ Speak, diary, and let the ink flow.
        </p>
      </div>
    </div>
  );

  if (!isOpen) {
    return (
      <div className="min-h-screen bg-[#100b08] bg-[radial-gradient(circle_at_center,_#352216_0%,_#0b0705_100%)] flex items-center justify-center p-4 md:p-8 relative overflow-hidden select-none">
        
        {/* Cover ambient glows */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-96 h-96 bg-[radial-gradient(circle,_rgba(150,115,49,0.06)_0%,_transparent_70%)] pointer-events-none" />

        {/* Closed Book Leather Cover */}
        <div className="w-full max-w-md aspect-[3/4] leather-cover p-8 flex flex-col justify-between items-center relative border border-gold/30 shadow-2xl">
          
          {/* Gold corners */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-gold/40 rounded-tl-lg" />
          <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-gold/40 rounded-tr-lg" />
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-gold/40 rounded-bl-lg" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-gold/40 rounded-br-lg" />

          {/* Book Header binding details */}
          <div className="w-full text-center border-b border-gold/20 pb-4">
            <span className="font-display text-sm tracking-widest text-[#d6bd89]/60 uppercase">
              Developer&apos;s Chronicle
            </span>
          </div>

          {/* Center Cover Embossing */}
          <div className="flex flex-col items-center justify-center flex-1 my-6 space-y-6">
            
            {/* Initials Shield */}
            <div className="w-24 h-24 rounded-full border-2 border-gold/50 flex items-center justify-center bg-black/40 shadow-inner relative group cursor-pointer hover:border-gold transition-colors duration-300">
              <span className="font-display text-4xl text-gold font-bold tracking-wider animate-pulse">
                {profileData.initials}
              </span>
            </div>

            {/* Author Title */}
            <div className="text-center space-y-2">
              <h1 className="font-display text-3xl md:text-4xl text-[#d6bd89] tracking-wider font-bold">
                {profileData.name}
              </h1>
              <p className="font-handwritten text-xl text-gold/80 italic">
                {profileData.tagline}
              </p>
            </div>
          </div>

          {/* Button to Open */}
          <div className="w-full text-center pt-4 border-t border-gold/20">
            <button
              onClick={() => setIsOpen(true)}
              className="px-6 py-3 font-display text-[#d6bd89] hover:text-[#28170f] bg-transparent hover:bg-gold/90 border border-gold/60 rounded-md transition-all duration-300 shadow-md transform hover:-translate-y-0.5 cursor-pointer font-semibold uppercase tracking-wider text-xs"
            >
              Open the Diary
            </button>
          </div>

        </div>
      </div>
    );
  }

  // Open Diary layout
  return (
    <Diary
      activeChapter="home"
      rightPageContent={rightPageContent}
    />
  );
}
