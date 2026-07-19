"use client";

import React, { useState, useEffect, useCallback } from "react";
import MapNav from "@/src/components/layout/MapNav";
import Diary from "@/src/components/diary/Diary";
import { BookOpen } from "lucide-react";
import MaraudersMapBg from "@/src/components/layout/MaraudersMapBg";

interface MapShellProps {
  children: React.ReactNode;
}

export default function MapShell({ children }: MapShellProps) {
  const [diaryOpen, setDiaryOpen] = useState(false);

  const openDiary = useCallback(() => setDiaryOpen(true), []);
  const closeDiary = useCallback(() => setDiaryOpen(false), []);

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
      <Diary open={diaryOpen} onClose={closeDiary} />

      {/* Diary trigger button */}
      <button
        onClick={openDiary}
        className="fixed top-4 right-4 sm:top-auto sm:bottom-6 sm:right-6 z-50 flex items-center gap-2 px-3 py-2 rounded border border-parchment-dark/40 shadow-md font-handwritten text-xs text-ink-faded cursor-pointer transition-all duration-200 hover:border-gold hover:text-ink"
        style={{
          background: "rgba(214, 189, 137, 0.82)",
          backdropFilter: "blur(4px)",
          WebkitBackdropFilter: "blur(4px)",
        }}
        aria-label="Open Ved's Diary"
        title="Ved's Diary (Ctrl+K)"
      >
        <BookOpen className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
        <span>Ved&apos;s Diary (⌘K)</span>
      </button>

      <main className="page-content">
        {children}
      </main>
    </>
  );
}
