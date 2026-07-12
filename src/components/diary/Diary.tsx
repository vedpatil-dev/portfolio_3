"use client";

import React, { useState, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import chaptersData from "@/src/data/config/chapters.json";
import profileData from "@/src/data/content/profile.json";
import projectsData from "@/src/data/content/projects.json";
import experienceData from "@/src/data/content/experience.json";

interface DiaryProps {
  activeChapter: string;
  leftPageContent?: React.ReactNode;
  rightPageContent?: React.ReactNode;
  initialHasWritten?: boolean;
}

export default function Diary({
  activeChapter,
  leftPageContent,
  rightPageContent,
  initialHasWritten,
}: DiaryProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Check if there are active params represent a selection
  const hasQuery = !!(searchParams && (
    searchParams.get("section") || 
    searchParams.get("search") || 
    searchParams.get("highlight")
  ));

  const [inputValue, setInputValue] = useState("");
  const [smokeText, setSmokeText] = useState("");
  const [isAnimatingSmoke, setIsAnimatingSmoke] = useState(false);
  const [inputFocus, setInputFocus] = useState(false);
  const [prevInitialHasWritten, setPrevInitialHasWritten] = useState(initialHasWritten);
  const [hasWritten, setHasWritten] = useState(
    initialHasWritten !== undefined ? initialHasWritten : hasQuery
  );

  // Sync prop changes in rendering
  if (initialHasWritten !== prevInitialHasWritten) {
    setPrevInitialHasWritten(initialHasWritten);
    setHasWritten(initialHasWritten !== undefined ? initialHasWritten : hasQuery);
  }

  const inputRef = useRef<HTMLInputElement>(null);

  // Chapters list helper
  const chapters = chaptersData.chapters;

  // Helper to get spells for a chapter from JSON
  const getChapterSpells = (chapterId: string, configuredSpells?: string[]) => {
    if (chapterId === "projects") {
      return projectsData.projects.map((p) => p.slug);
    }
    if (chapterId === "experience") {
      return experienceData.entries.map((e) => e.id);
    }
    return configuredSpells || [];
  };

  // Handle command submissions
  const executeCommand = (command: string) => {
    const cleanCmd = command.trim().toLowerCase();
    if (!cleanCmd) return;

    // Trigger smoke animation state
    setSmokeText(command);
    setIsAnimatingSmoke(true);
    setInputValue("");

    // Wait for smoke animation to complete before executing action
    setTimeout(() => {
      setIsAnimatingSmoke(false);
      setSmokeText("");
      setHasWritten(true); // Reveal content

      // Routing logic based on keywords with params to auto-reveal on load
      if (cleanCmd === "about" || cleanCmd === "author" || cleanCmd === "1") {
        router.push("/about?section=about");
      } else if (cleanCmd === "projects" || cleanCmd === "artifacts" || cleanCmd === "2" || cleanCmd === "project") {
        router.push("/projects?section=projects");
      } else if (cleanCmd === "experience" || cleanCmd === "chronicles" || cleanCmd === "map" || cleanCmd === "3") {
        router.push("/experience?highlight=1m1b");
      } else if (cleanCmd === "home" || cleanCmd === "index" || cleanCmd === "cover" || cleanCmd === "welcome") {
        router.push("/?section=welcome");
      } else if (projectsData.projects.map((p) => p.slug).includes(cleanCmd)) {
        router.push(`/projects/${cleanCmd}`);
      } else if (experienceData.entries.map((e) => e.id).includes(cleanCmd)) {
        router.push(`/experience?highlight=${cleanCmd}`);
      } else if (cleanCmd === "education") {
        router.push("/about?section=education");
      } else if (cleanCmd === "skills") {
        router.push("/about?section=skills");
      } else if (cleanCmd === "contact" || cleanCmd === "owl") {
        router.push("/contact");
      } else if (cleanCmd === "clear" || cleanCmd === "reset") {
        setHasWritten(false);
        router.push(window.location.pathname); // Clear query parameters
      } else {
        // Fallback for custom search
        router.push(`/projects?search=${encodeURIComponent(cleanCmd)}`);
      }
    }, 1100);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executeCommand(inputValue);
  };

  const handleIndexClick = (keyword: string) => {
    // Focus the input to let the user see it auto-filled
    setInputValue(keyword);
    inputRef.current?.focus();

    // Execute after a brief pause for visual effect
    setTimeout(() => {
      executeCommand(keyword);
    }, 400);
  };

  // Get chapter numbers for pagination
  const currentChapterIndex = chapters.findIndex((c) => c.id === activeChapter);
  const prevChapter = currentChapterIndex > 0 ? chapters[currentChapterIndex - 1] : null;
  const nextChapter = currentChapterIndex < chapters.length - 1 ? chapters[currentChapterIndex + 1] : null;

  return (
    <div className="h-screen w-screen bg-[#100b08] bg-[radial-gradient(circle_at_center,_#352216_0%,_#0b0705_100%)] text-ink font-serif flex items-center justify-center p-2 sm:p-4 md:p-6 lg:p-8 relative overflow-hidden select-none"
      style={{ perspective: "1200px" }}
    >
      
      {/* Desk surface ambient glow beneath book */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-[radial-gradient(ellipse_at_50%_100%,_rgba(100,60,20,0.22)_0%,_transparent_70%)] pointer-events-none" />
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-[85%] h-12 bg-[radial-gradient(ellipse_at_center,_rgba(0,0,0,0.7)_0%,_transparent_70%)] blur-sm pointer-events-none" />

      {/* Decorative Desk items / stains */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-[radial-gradient(circle,_rgba(118,53,46,0.1)_0%,_transparent_70%)] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-48 h-48 bg-[radial-gradient(circle,_rgba(150,115,49,0.05)_0%,_transparent_70%)] pointer-events-none" />

      {/* 3D Scene Wrapper — tilts the book so it looks like it's on a desk */}
      <div
        className="w-full max-w-6xl h-full max-h-[96vh] lg:max-h-[90vh] flex flex-col items-center justify-center overflow-hidden"
        style={{
          transform: "rotateX(6deg) scale(0.97)",
          transformOrigin: "center bottom",
          transformStyle: "preserve-3d",
        }}
      >
        
        {/* Book Container with leather cover — the outer book board */}
        <div className="w-full h-full relative leather-cover flex flex-col overflow-hidden">

          {/* Chapter bookmark tabs along the right edge */}
          <div className="absolute right-0 top-16 flex flex-col gap-3 z-30" style={{ transform: 'translateX(calc(100% - 2px))' }}>
            {chapters.map((chap) => (
              <button
                key={chap.id}
                onClick={() => handleIndexClick(chap.id)}
                className={`px-3 py-2 text-xs font-display rounded-r border-t border-b border-r shadow-md transition-all duration-300 ${
                  activeChapter === chap.id
                    ? "bg-[#b9955b] text-leather border-gold translate-x-0.5 font-semibold"
                    : "bg-[#5a3018] text-[#c8a96e] border-leather hover:bg-[#b9955b] hover:text-leather hover:translate-x-0.5"
                }`}
                style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
              >
                Ch.{chap.romanNumber}
              </button>
            ))}
          </div>

          {/* Open Book Pages — flex row with visible page stacks on each side */}
          <div className="flex-1 flex min-h-0 relative" style={{ padding: '10px 16px 14px 16px' }}>

            {/* ─── Leather Strap & Buckle ──────────────────────────────────────
                Positioned on the right edge of the open book.
                Clicking it "closes" the diary and returns home.
            ─────────────────────────────────────────────────────────────────── */}
            <button
              className="diary-strap group"
              onClick={() => router.push("/")}
              title="Close Diary"
              aria-label="Close diary and return to cover"
            >
              <svg
                width="52"
                height="220"
                viewBox="0 0 52 220"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* ── Strap band going upward (attaches to book edge) ── */}
                <rect
                  x="16" y="0" width="20" height="90"
                  rx="4"
                  fill="url(#strapGrad)"
                  className="diary-strap-tongue"
                />
                {/* Stitching on strap band */}
                <line x1="19" y1="6"  x2="19" y2="86" stroke="#3d1f0a" strokeWidth="0.7" strokeDasharray="4 4" opacity="0.5" />
                <line x1="33" y1="6"  x2="33" y2="86" stroke="#3d1f0a" strokeWidth="0.7" strokeDasharray="4 4" opacity="0.5" />

                {/* ── Metal Buckle frame ── */}
                <g className="diary-strap-buckle" transform="translate(8, 86)">
                  {/* Outer buckle ring */}
                  <rect x="0" y="0" width="36" height="28" rx="6" fill="url(#buckleGrad)" />
                  {/* Inner cutout */}
                  <rect x="5" y="5" width="26" height="18" rx="3" fill="#28170f" />
                  {/* Center bar / pin */}
                  <rect x="14" y="2" width="8" height="24" rx="3" fill="url(#buckleGrad)" />
                  {/* Buckle shine */}
                  <rect x="2" y="2" width="8" height="4" rx="2" fill="rgba(255,220,100,0.35)" />
                </g>

                {/* ── Strap tongue below buckle with pointed tip ── */}
                <g className="diary-strap-tongue" style={{ animationDelay: '0.2s' }}>
                  <path
                    d="M16,114 L36,114 L36,175 Q26,192 16,175 Z"
                    fill="url(#strapGrad)"
                  />
                  {/* Tongue hole */}
                  <circle cx="26" cy="130" r="4" fill="#1c0e08" />
                  <circle cx="26" cy="130" r="2.5" fill="#100b08" />
                  {/* Stitching on tongue */}
                  <line x1="19" y1="118" x2="19" y2="165" stroke="#3d1f0a" strokeWidth="0.7" strokeDasharray="4 4" opacity="0.5" />
                  <line x1="33" y1="118" x2="33" y2="165" stroke="#3d1f0a" strokeWidth="0.7" strokeDasharray="4 4" opacity="0.5" />
                </g>

                {/* ── Dangling label tag ── */}
                <g className="diary-strap-tag" transform="translate(30, 165)">
                  {/* String */}
                  <line x1="0" y1="0" x2="0" y2="14" stroke="#5a3018" strokeWidth="1.2" />
                  {/* Tag body */}
                  <rect x="-14" y="14" width="28" height="36" rx="3" fill="#3d1f0a" />
                  <rect x="-12" y="16" width="24" height="32" rx="2" fill="#51301e" />
                  {/* Hole at top of tag */}
                  <circle cx="0" cy="14" r="3" fill="#100b08" />
                  {/* Text on tag — "VP" initials */}
                  <text x="0" y="38" textAnchor="middle" fill="#c8a96e" fontSize="11" fontFamily="serif" fontStyle="italic" fontWeight="bold">VP</text>
                </g>

                {/* ── Tooltip on hover: "Close Diary" ── */}
                <g className="opacity-0 group-hover:opacity-100 transition-opacity duration-200" transform="translate(-82, 92)">
                  <rect x="0" y="0" width="78" height="24" rx="4" fill="#1c0e08" opacity="0.92" />
                  <text x="39" y="16" textAnchor="middle" fill="#c8a96e" fontSize="10" fontFamily="serif">Close Diary</text>
                </g>

                {/* ── SVG Gradients ── */}
                <defs>
                  <linearGradient id="strapGrad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%"   stopColor="#2e1508" />
                    <stop offset="30%"  stopColor="#51301e" />
                    <stop offset="60%"  stopColor="#6b3f24" />
                    <stop offset="100%" stopColor="#3d1f0a" />
                  </linearGradient>
                  <linearGradient id="buckleGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%"   stopColor="#c8a830" />
                    <stop offset="40%"  stopColor="#967331" />
                    <stop offset="80%"  stopColor="#6b4e18" />
                    <stop offset="100%" stopColor="#4a3010" />
                  </linearGradient>
                </defs>
              </svg>
            </button>

            {/* LEFT PAGE GROUP — shows stacked page edges on the left outer side */}
            <div className="relative flex-1 min-w-0 book-pages-left">
              {/* Subtle gradient to shade the left page edge inward */}
              <div className="absolute inset-y-0 left-0 w-4 bg-gradient-to-r from-black/10 to-transparent z-10 pointer-events-none rounded-l" />
              <div className="w-full h-full bg-[#d6bd89] parchment-page parchment-stains flex flex-col p-4 md:p-6 lg:p-8 overflow-hidden justify-between" style={{ borderRadius: '2px 0 0 2px' }}>

              {/* Header */}
              <div className="flex justify-between items-center border-b border-parchment-dark/30 pb-3 mb-4 shrink-0">
                <span className="font-display text-sm tracking-widest text-ink-faded uppercase">
                  {profileData.name}&apos;s Journal
                </span>
                <span className="font-handwritten text-lg text-blood-ink font-semibold">
                  Index of Spells
                </span>
              </div>

              {/* Index / Table of Contents Content */}
              <div className="flex-1 overflow-y-auto pr-1 scrollbar-thin min-h-0 space-y-4 my-2">
                <h2 className="font-display text-2xl text-center text-leather-light border-b border-dotted border-parchment-dark/40 pb-1">
                  Table of Contents
                </h2>

                <div className="space-y-3 font-serif text-base">
                  {chapters.map((chap) => {
                    const spells = getChapterSpells(chap.id, chap.spells);
                    return (
                      <div key={chap.id} className="group">
                        <div className="flex items-center justify-between">
                          <button
                            onClick={() => handleIndexClick(chap.id)}
                            className="font-display font-semibold hover:text-blood-ink hover:underline text-left"
                          >
                            Chapter {chap.romanNumber}: {chap.title}
                          </button>
                          <span className="text-sm font-handwritten text-ink-faded">
                            (type &apos;{chap.id}&apos;)
                          </span>
                        </div>
                        
                        {/* Sub-commands nested under chapters (dynamically generated!) */}
                        {spells && spells.length > 0 && (
                          <div className="pl-4 mt-1 flex flex-wrap gap-x-3 text-sm text-ink-faded font-handwritten">
                            {spells.map((spell, sIdx) => (
                              <React.Fragment key={spell}>
                                {sIdx > 0 && <span>•</span>}
                                <button onClick={() => handleIndexClick(spell)} className="hover:text-blood-ink">
                                  #{spell}
                                </button>
                              </React.Fragment>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Left Page Footer */}
              <div className="mt-4 pt-3 border-t border-parchment-dark/20 text-xs text-ink-faded flex justify-between items-center font-display shrink-0">
                <span>Page A</span>
                <span>VP • Dev Portfolio</span>
              </div>
              </div>{/* end inner parchment left */}
            </div>{/* end book-pages-left */}

            {/* CENTER SPINE — thick 3D spine with gradient and shadow */}
            <div className="hidden lg:flex flex-col relative z-20 shrink-0" style={{ width: '28px' }}>
              <div className="flex-1 rounded" style={{
                background: 'linear-gradient(to right, #0d0804 0%, #1c0e08 20%, #28170f 45%, #1c0e08 75%, #0d0804 100%)',
                boxShadow: 'inset 2px 0 6px rgba(0,0,0,0.7), inset -2px 0 6px rgba(0,0,0,0.7), 0 0 8px rgba(0,0,0,0.4)'
              }} />
            </div>

            {/* RIGHT PAGE GROUP — shows stacked page edges on the right outer side */}
            <div className="relative flex-1 min-w-0 book-pages-right">
              {/* Subtle gradient to shade the right page edge inward */}
              <div className="absolute inset-y-0 right-0 w-4 bg-gradient-to-l from-black/10 to-transparent z-10 pointer-events-none rounded-r" />
              <div className="w-full h-full bg-[#d6bd89] parchment-page parchment-stains flex flex-col overflow-hidden p-4 md:p-6 lg:p-8 justify-between" style={{ borderRadius: '0 2px 2px 0' }}>

              
              {/* Right Page Header */}
              <div className="flex justify-between items-center border-b border-parchment-dark/30 pb-3 mb-4 shrink-0">
                <span className="font-display text-sm tracking-widest text-ink-faded uppercase">
                  Chapter {currentChapterIndex >= 0 ? chapters[currentChapterIndex].romanNumber : "I"}
                </span>
                <span className="font-display text-sm tracking-widest text-ink-faded uppercase">
                  {currentChapterIndex >= 0 ? chapters[currentChapterIndex].title : "Welcome"}
                </span>
              </div>

              {/* Primary Content Render / Writing Area */}
              <div className="flex-1 flex flex-col min-h-0 overflow-hidden relative justify-center">
                
                {hasWritten && (leftPageContent || rightPageContent) ? (
                  <>
                    {/* Content is displayed here */}
                    <div className="flex-1 overflow-y-auto pr-1 select-text scrollbar-thin min-h-0 animate-fade-in">
                      {rightPageContent || leftPageContent}
                    </div>

                    {/* Typing is at the bottom when there is data */}
                    <div className="mt-4 pt-3 border-t border-parchment-dark/30 relative shrink-0">
                      {isAnimatingSmoke && (
                        <div className="absolute top-2 left-32 font-handwritten text-2xl text-blood-ink pointer-events-none z-30 select-none">
                          <span className="smoke-dissolve">{smokeText}</span>
                        </div>
                      )}

                      <form onSubmit={handleSubmit} className={`flex items-center gap-2 relative transition-opacity duration-300 ${
                        isAnimatingSmoke ? "opacity-0" : "opacity-100"
                      }`}>
                        <label 
                          htmlFor="diary-input-bottom" 
                          className="font-handwritten text-lg font-bold text-leather-light flex items-center gap-1 select-none shrink-0"
                        >
                          <span>Speak, diary, of:</span>
                        </label>
                        
                        <div className="relative flex-1">
                          <input
                            ref={inputRef}
                            id="diary-input-bottom"
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onFocus={() => setInputFocus(true)}
                            onBlur={() => setInputFocus(false)}
                            placeholder="type keyword..."
                            className="w-full bg-transparent border-b border-dashed border-parchment-dark/50 focus:border-blood-ink focus:outline-none font-handwritten text-xl text-blood-ink px-2 pb-1 focus:ring-0"
                            autoComplete="off"
                          />
                          {inputFocus && !inputValue && (
                            <span className="absolute right-2 bottom-2 text-ink-faded font-handwritten text-sm animate-pulse">✎</span>
                          )}
                        </div>

                        <button 
                          type="submit" 
                          className="p-1 text-ink-faded hover:text-blood-ink transition-colors font-handwritten text-base font-bold shrink-0 cursor-pointer"
                        >
                          [Enter]
                        </button>
                      </form>
                    </div>
                  </>
                ) : (
                  /* Typing is in the middle of the page if nothing is there */
                  <div className="w-full flex flex-col items-center justify-center p-4 relative">
                    {isAnimatingSmoke && (
                      <div className="absolute font-handwritten text-3xl md:text-4xl text-blood-ink pointer-events-none z-30 select-none text-center">
                        <span className="smoke-dissolve">{smokeText}</span>
                      </div>
                    )}
                    
                    <form onSubmit={handleSubmit} className={`w-full max-w-sm flex flex-col items-center space-y-4 transition-opacity duration-300 ${
                      isAnimatingSmoke ? "opacity-0" : "opacity-100"
                    }`}>
                      <input
                        ref={inputRef}
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Speak, diary, of..."
                        className="w-full bg-transparent border-b-2 border-dashed border-parchment-dark/40 focus:border-blood-ink focus:outline-none font-handwritten text-3xl text-blood-ink text-center pb-2 focus:ring-0 placeholder-blood-ink/20"
                        autoComplete="off"
                        autoFocus
                      />
                      <div className="text-xs text-ink-faded font-display select-none">
                        Press [Enter] or click <button type="submit" className="font-handwritten text-base font-bold text-blood-ink hover:underline cursor-pointer">[Cast Spell]</button>
                      </div>
                    </form>
                  </div>
                )}
              </div>

              {/* Right Page Footer & Pagination */}
              <div className="mt-3 pt-2 border-t border-parchment-dark/20 text-xs text-ink-faded flex justify-between items-center font-display select-none shrink-0">
                
                {/* Prev chapter pagination link */}
                <div>
                  {prevChapter ? (
                    <Link
                      href={prevChapter.route}
                      className="hover:text-blood-ink hover:underline flex items-center gap-1"
                    >
                      ← Ch. {prevChapter.romanNumber}
                    </Link>
                  ) : (
                    <span className="opacity-30">← Index</span>
                  )}
                </div>

                {/* Center text shows page plus reset trigger */}
                <div className="flex items-center gap-2">
                  <span>Page B</span>
                  {hasWritten && (
                    <>
                      <span>•</span>
                      <button
                        onClick={() => {
                          setInputValue("");
                          setHasWritten(false);
                          // Clear search/highlights from URL
                          router.push(window.location.pathname);
                        }}
                        className="hover:text-blood-ink hover:underline font-handwritten text-sm font-bold text-blood-ink cursor-pointer"
                      >
                        ✎ Wipe Page
                      </button>
                    </>
                  )}
                </div>

                {/* Next chapter pagination link */}
                <div>
                  {nextChapter ? (
                    <Link
                      href={nextChapter.route}
                      className="hover:text-blood-ink hover:underline flex items-center gap-1"
                    >
                      Ch. {nextChapter.romanNumber} →
                    </Link>
                  ) : (
                    <span className="opacity-30">End →</span>
                  )}
                </div>
              </div>

              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
