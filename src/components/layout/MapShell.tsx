"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import MapNav from "@/src/components/layout/MapNav";
import dynamic from "next/dynamic";
import { BookOpen } from "lucide-react";
// Why: the diary (plus GSAP and its effects) was bundled into the first load of EVERY page although it is
// only shown on demand — Lighthouse flagged ~234 KiB of unused JavaScript.
// Impact: it is split into its own chunk, fetched after the page is idle (or immediately on first open),
// so the initial bundle shrinks while the book still opens instantly in practice.
const Diary = dynamic(() => import("@/src/components/diary/Diary"), { ssr: false });
import MaraudersMapBg from "@/src/components/layout/MaraudersMapBg";

interface MapShellProps {
  children: React.ReactNode;
}

export default function MapShell({ children }: MapShellProps) {
  const [diaryOpen, setDiaryOpen] = useState(false);
  const [diaryReady, setDiaryReady] = useState(false);

  // Mount the diary lazily: once the browser is idle, or as soon as the user opens it.
  useEffect(() => {
    const ric = (window as unknown as { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number }).requestIdleCallback;
    const id = ric ? ric(() => setDiaryReady(true), { timeout: 4000 }) : window.setTimeout(() => setDiaryReady(true), 2500);
    return () => {
      if (ric) (window as unknown as { cancelIdleCallback: (n: number) => void }).cancelIdleCallback(id);
      else clearTimeout(id);
    };
  }, []);

  const openDiary = useCallback(() => setDiaryOpen(true), []);
  const triggerRef = useRef<HTMLButtonElement>(null);
  // Why: closing the diary dropped keyboard focus to <body>. Impact: focus returns to the diary button.
  const closeDiary = useCallback(() => {
    setDiaryOpen(false);
    triggerRef.current?.focus();
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setDiaryOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <>
      <MaraudersMapBg />
      <MapNav />
      {(diaryReady || diaryOpen) && <Diary open={diaryOpen} onClose={closeDiary} />}

      {/* Diary trigger button */}
      <button
        ref={triggerRef}
        onClick={openDiary}
        className="fixed top-3 right-3 sm:top-auto sm:bottom-6 sm:right-6 z-50 flex items-center justify-center gap-2 min-w-11 min-h-11 sm:min-w-0 sm:min-h-0 px-3 py-2 rounded border border-parchment-dark/40 shadow-md font-sans text-sm text-ink-faded cursor-pointer transition-all duration-200 hover:border-gold hover:text-ink"
        style={{
          background: "var(--parchment-light)",
        }}
        aria-label="Open Ved's Diary"
        title="Ved's Diary (Ctrl+K)"
      >
        <BookOpen className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
        {/* Why: the labelled pill covered chapter headings on mobile. Impact: icon-only (44px target) below sm, full label from sm up. */}
        <span className="hidden sm:inline">Ved&apos;s Diary (⌘K)</span>
      </button>

      <main className="page-content">
        {children}
      </main>
    </>
  );
}
