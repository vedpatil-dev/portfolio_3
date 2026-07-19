"use client";

import React, { useRef, useState, useEffect } from "react";
import DiaryCover from "./DiaryCover";
import DiaryPages from "./DiaryPages";
import DiaryEffects from "./DiaryEffects";
import DiaryParticles from "./DiaryParticles";
import DiaryWriter from "./DiaryWriter";
import DiaryInput from "./DiaryInput";
import DiaryAnswer from "./DiaryAnswer";
import { useDiaryAnimation } from "./useDiaryAnimation";
import { DiaryPhase } from "./useDiaryMachine";
import { Search, Compass, BookOpen, Clock, FolderGit, MessageCircle, X } from "lucide-react";
import diaryConfig from "@/src/data/config/diary.json";

interface DiaryBookProps {
  phase: DiaryPhase;
  transitionTo: (next: DiaryPhase) => void;
  onCloseComplete: () => void;
  query: string;
  setQuery: (val: string) => void;
  answer: any | null;
  setAnswer: (ans: any | null) => void;
  onSubmit: (cmd?: any) => void;
  filtered: any[];
  highlighted: number;
  setHighlighted: (idx: number) => void;
  handleKeyDown: (e: React.KeyboardEvent) => void;
  overlayRef: React.RefObject<HTMLDivElement | null>;
}

export default function DiaryBook({
  phase,
  transitionTo,
  onCloseComplete,
  query,
  setQuery,
  answer,
  setAnswer,
  onSubmit,
  filtered,
  highlighted,
  setHighlighted,
  handleKeyDown,
  overlayRef,
}: DiaryBookProps) {
  // DOM Refs for GSAP
  const bookRef = useRef<HTMLDivElement>(null);
  const coverLeftRef = useRef<HTMLDivElement>(null);
  const lockRef = useRef<HTMLDivElement>(null);
  const leftPageRef = useRef<HTMLDivElement>(null);
  const rightPageRef = useRef<HTMLDivElement>(null);
  const flippingPageRef = useRef<HTMLDivElement>(null);

  // Flipping State
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipDirection, setFlipDirection] = useState<"forward" | "backward" | null>(null);
  const [greetingFading, setGreetingFading] = useState(false);

  // Timer & Callback Refs
  const typingIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const typingDelayTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const greetingFadeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const greetingWaitingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const pageTurnCallbackRef = useRef<(() => void) | null>(null);

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);
      if (typingDelayTimeoutRef.current) clearTimeout(typingDelayTimeoutRef.current);
      if (greetingFadeTimeoutRef.current) clearTimeout(greetingFadeTimeoutRef.current);
      if (greetingWaitingTimeoutRef.current) clearTimeout(greetingWaitingTimeoutRef.current);
    };
  }, []);

  // Clear timers when phase changes to closing or closed
  useEffect(() => {
    if (phase === "closing" || phase === "closed") {
      if (typingIntervalRef.current) {
        clearInterval(typingIntervalRef.current);
        typingIntervalRef.current = null;
      }
      if (typingDelayTimeoutRef.current) {
        clearTimeout(typingDelayTimeoutRef.current);
        typingDelayTimeoutRef.current = null;
      }
      if (greetingFadeTimeoutRef.current) {
        clearTimeout(greetingFadeTimeoutRef.current);
        greetingFadeTimeoutRef.current = null;
      }
      if (greetingWaitingTimeoutRef.current) {
        clearTimeout(greetingWaitingTimeoutRef.current);
        greetingWaitingTimeoutRef.current = null;
      }
      pageTurnCallbackRef.current = null;
    }
  }, [phase]);

  // Initialize GSAP orchestration hook
  useDiaryAnimation({
    phase,
    transitionTo,
    bookRef,
    coverLeftRef,
    lockRef,
    leftPageRef,
    rightPageRef,
    flippingPageRef,
    onCloseComplete,
    isFlipping,
    setIsFlipping,
    flipDirection,
    onPageTurnMidpoint: () => {
      if (pageTurnCallbackRef.current) {
        pageTurnCallbackRef.current();
        pageTurnCallbackRef.current = null;
      }
    },
    overlayRef,
  });

  // Handle page turns
  const triggerPageTurn = (direction: "forward" | "backward", nextAction: () => void) => {
    pageTurnCallbackRef.current = nextAction;
    setFlipDirection(direction);
    setIsFlipping(true);
    transitionTo("page_turn");
  };

  const handleSelectAnswer = (ans: any) => {
    const textToType = ans.label || ans.title || "";
    setQuery(""); // Clear input first
    let currentText = "";
    let i = 0;
    
    // Put into thinking state to disable interactions
    transitionTo("thinking");

    if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);
    typingIntervalRef.current = setInterval(() => {
      if (i < textToType.length) {
        currentText += textToType[i];
        setQuery(currentText);
        i++;
      } else {
        if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);
        typingIntervalRef.current = null;
        // Small pause after typing finishes, then turn page
        if (typingDelayTimeoutRef.current) clearTimeout(typingDelayTimeoutRef.current);
        typingDelayTimeoutRef.current = setTimeout(() => {
          typingDelayTimeoutRef.current = null;
          triggerPageTurn("forward", () => {
            onSubmit(ans);
          });
        }, 550);
      }
    }, 45); // Elegant typing speed
  };

  const handleReturnToIndex = () => {
    triggerPageTurn("backward", () => {
      setAnswer(null);
    });
  };

  // Pre-render content sections for left and right pages
  const renderLeftPage = () => {
    if (
      phase === "closed" ||
      phase === "appearing" ||
      phase === "landing" ||
      phase === "opening"
    ) {
      return null;
    }

    if (phase === "writing") {
      return (
        <div 
          className="flex flex-col justify-center h-full text-center py-10"
          style={{
            transition: "opacity 1.0s ease-in-out",
            opacity: greetingFading ? 0 : 1,
          }}
        >
          <DiaryWriter
            text={diaryConfig.greeting}
            speed={60}
            delay={1500}
            fontClass="diary-ink-text font-display text-3xl md:text-4xl lg:text-5xl font-bold leading-normal"
            center={true}
            onComplete={() => {
              // Wait 2.5s, then trigger fade out
              if (greetingFadeTimeoutRef.current) clearTimeout(greetingFadeTimeoutRef.current);
              greetingFadeTimeoutRef.current = setTimeout(() => {
                greetingFadeTimeoutRef.current = null;
                setGreetingFading(true);
              }, 2500);

              // Wait 3.5s total (1s after fade starts), then transition to waiting
              if (greetingWaitingTimeoutRef.current) clearTimeout(greetingWaitingTimeoutRef.current);
              greetingWaitingTimeoutRef.current = setTimeout(() => {
                greetingWaitingTimeoutRef.current = null;
                transitionTo("waiting");
                setGreetingFading(false);
              }, 3500);
            }}
          />
        </div>
      );
    }

    // Default waiting/thinking/answer/page_turn left-page interface
    return (
      <div className="relative w-full h-full" onKeyDown={handleKeyDown}>
        <DiaryInput
          value={query}
          onChange={(val) => {
            setQuery(val);
            setHighlighted(0);
          }}
          onSubmit={() => {
            // Keyboard Enter: if there's a highlighted autocomplete result, select it with simulated typing
            if (filtered.length > 0 && query.trim().length > 0) {
              handleSelectAnswer(filtered[highlighted]);
            } else {
              // Otherwise, search directly
              transitionTo("thinking");
              setTimeout(() => {
                onSubmit();
              }, 1000); // 1s thinking delay
            }
          }}
          placeholder="Ask a question, or search my memories..."
          disabled={phase === "thinking" || phase === "page_turn"}
        />

        {/* Quick results dropdown - floats elegantly above index */}
        {phase === "waiting" && query.trim().length > 0 && filtered.length > 0 && (
          <div 
            className="absolute bottom-2 left-2 right-2 diary-quick-dropdown max-h-36 overflow-y-auto rounded p-1 space-y-1 z-20"
            onWheel={(e) => e.stopPropagation()}
          >
            {filtered.map((cmd, i) => (
              <button
                key={cmd.id}
                onClick={() => handleSelectAnswer(cmd)}
                className={`w-full text-left font-handwritten text-base p-1.5 rounded flex items-center gap-2 transition-all ${
                  i === highlighted ? "bg-gold/20 text-blood-ink pl-3" : "text-ink-faded"
                }`}
                onMouseEnter={() => setHighlighted(i)}
              >
                <span className="opacity-60">{cmd.icon}</span>
                <span>{cmd.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };

  const renderRightPage = () => {
    if (
      phase === "closed" ||
      phase === "appearing" ||
      phase === "landing" ||
      phase === "opening"
    ) {
      return null;
    }

    if (phase === "writing") {
      return (
        <div 
          className="flex flex-col items-center justify-center h-full text-center py-10 opacity-75"
          style={{
            transition: "opacity 1.0s ease-in-out",
            opacity: greetingFading ? 0 : 1,
          }}
        >
          <div 
            className="w-20 h-20 border-2 border-double border-gold rounded-full flex items-center justify-center font-display text-blood-ink text-4xl mb-4"
            style={{ animation: "emblem-glow 4s ease-in-out infinite alternate" }}
          >
            VP
          </div>
          <h3 className="font-display text-ink text-xl mb-1">The Developer&apos;s Journal</h3>
          <p className="font-handwritten text-ink-faded text-base max-w-[280px]">
            A chronicle of skills, artifacts, and experiences, preserved in ink.
          </p>
        </div>
      );
    }

    if (answer) {
      return <DiaryAnswer answer={answer} onBack={handleReturnToIndex} />;
    }

    // Default right-page Index
    return (
      <div className="flex flex-col h-full justify-between">
        <div>
          <div className="border-b border-[rgba(118,83,46,0.18)] pb-2 mb-4">
            <h3 className="font-display text-blood-ink text-xl tracking-wide">Journal Index</h3>
          </div>
          
          <p className="font-handwritten text-ink-faded text-base leading-relaxed mb-4">
            Select one of my chapters to directly summon my memories:
          </p>

          <div className="space-y-2.5">
            <button
              onClick={() => handleSelectAnswer({ id: "about", label: "Who is the Author?" })}
              className="w-full text-left font-handwritten text-lg text-ink hover:text-blood-ink flex items-center gap-3 p-1.5 border-b border-dotted border-[rgba(118,83,46,0.15)] hover:bg-gold/5 transition-all hover:pl-3"
            >
              <span className="font-display text-sm text-blood-ink w-6">I.</span>
              <span>The Author (About)</span>
            </button>
            <button
              onClick={() => handleSelectAnswer({ id: "skills", label: "Show me your Arcane Library." })}
              className="w-full text-left font-handwritten text-lg text-ink hover:text-blood-ink flex items-center gap-3 p-1.5 border-b border-dotted border-[rgba(118,83,46,0.15)] hover:bg-gold/5 transition-all hover:pl-3"
            >
              <span className="font-display text-sm text-blood-ink w-6">II.</span>
              <span>The Arcane Library (Skills)</span>
            </button>
            <button
              onClick={() => handleSelectAnswer({ id: "experience", label: "Show me the Chronicles." })}
              className="w-full text-left font-handwritten text-lg text-ink hover:text-blood-ink flex items-center gap-3 p-1.5 border-b border-dotted border-[rgba(118,83,46,0.15)] hover:bg-gold/5 transition-all hover:pl-3"
            >
              <span className="font-display text-sm text-blood-ink w-6">III.</span>
              <span>The Chronicles (Experience)</span>
            </button>
            <button
              onClick={() => handleSelectAnswer({ id: "projects", label: "Show me the Magical Artifacts." })}
              className="w-full text-left font-handwritten text-lg text-ink hover:text-blood-ink flex items-center gap-3 p-1.5 border-b border-dotted border-[rgba(118,83,46,0.15)] hover:bg-gold/5 transition-all hover:pl-3"
            >
              <span className="font-display text-sm text-blood-ink w-6">IV.</span>
              <span>Magical Artifacts (Projects)</span>
            </button>
            <button
              onClick={() => handleSelectAnswer({ id: "contact", label: "How do I send an owl?" })}
              className="w-full text-left font-handwritten text-lg text-ink hover:text-blood-ink flex items-center gap-3 p-1.5 border-b border-dotted border-[rgba(118,83,46,0.15)] hover:bg-gold/5 transition-all hover:pl-3"
            >
              <span className="font-display text-sm text-blood-ink w-6">V.</span>
              <span>Send an Owl (Contact)</span>
            </button>
          </div>
        </div>

        <div className="font-handwritten text-xs text-ink-faded/45 text-center mt-4">
          Ved Patil&apos;s Diary © 2026
        </div>
      </div>
    );
  };

  return (
    <div ref={bookRef} className="diary-book-3d select-none">
      {/* 3D Spine Crease Binding */}
      <div className="diary-spine" />

      {/* Leather cover skins */}
      <DiaryCover leftCoverRef={coverLeftRef} lockRef={lockRef} />

      {/* Pages sheets stack container */}
      <DiaryPages
        leftPageRef={leftPageRef}
        rightPageRef={rightPageRef}
        flippingPageRef={flippingPageRef}
        childrenLeft={renderLeftPage()}
        childrenRight={renderRightPage()}
        isFlipping={isFlipping}
        flipDirection={flipDirection}
        phase={phase}
      />

      {/* SVG ink filter effects */}
      <DiaryEffects phase={phase} />

      {/* Floating canvas dust particles */}
      <DiaryParticles phase={phase} />
    </div>
  );
}
