"use client";

import React, { useState, useEffect, useCallback } from "react";
import MapNav from "@/src/components/layout/MapNav";
import CommandPalette from "@/src/components/layout/CommandPalette";
import { Search } from "lucide-react";
import MaraudersMapBg from "@/src/components/layout/MaraudersMapBg";

interface MapShellProps {
  children: React.ReactNode;
}

export default function MapShell({ children }: MapShellProps) {
  const [paletteOpen, setPaletteOpen] = useState(false);

  const openPalette = useCallback(() => setPaletteOpen(true), []);
  const closePalette = useCallback(() => setPaletteOpen(false), []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setPaletteOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <>
      <MaraudersMapBg />
      <MapNav />
      <CommandPalette open={paletteOpen} onClose={closePalette} />

      {/* Only one unified interactive box for Quick Search */}
      <button
        onClick={openPalette}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-3 py-2 rounded border border-parchment-dark/40 shadow-md font-handwritten text-xs text-ink-faded cursor-pointer transition-all duration-200 hover:border-gold hover:text-ink"
        style={{
          background: "rgba(214, 189, 137, 0.82)",
          backdropFilter: "blur(4px)",
          WebkitBackdropFilter: "blur(4px)",
        }}
        aria-label="Open quick search"
        title="Quick search (Ctrl+K)"
      >
        <Search className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
        <span>Quick Search (⌘K)</span>
      </button>

      <main className="page-content">
        {children}
      </main>
    </>
  );
}
