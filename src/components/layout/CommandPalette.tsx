"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { COMMANDS } from "@/src/lib/navigationCommands";

interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
}

export default function CommandPalette({ open, onClose }: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const [highlighted, setHighlighted] = useState(0);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = query.trim()
    ? COMMANDS.filter((c) =>
        c.label.toLowerCase().includes(query.toLowerCase()) ||
        c.id.toLowerCase().includes(query.toLowerCase())
      )
    : COMMANDS;

  const navigate = useCallback(
    (route: string) => {
      onClose();
      setQuery("");
      setHighlighted(0);
      router.push(route);
    },
    [onClose, router]
  );

  useEffect(() => {
    if (open) {
      setQuery("");
      setHighlighted(0);
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setHighlighted((h) => Math.min(h + 1, filtered.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setHighlighted((h) => Math.max(h - 1, 0));
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (filtered[highlighted]) navigate(filtered[highlighted].route);
      } else if (e.key === "Escape") {
        onClose();
      }
    },
    [filtered, highlighted, navigate, onClose]
  );

  if (!open) return null;

  return (
    <div
      className="cmd-palette-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Quick navigation"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="cmd-palette-box mx-4" role="search">
        {/* Header */}
        <div className="flex items-center gap-3 border-b border-parchment-dark/20 px-5 py-2">
          <span className="font-handwritten text-blood-ink text-lg" aria-hidden="true">✦</span>
          <span className="font-handwritten text-sm text-ink-faded tracking-wide">
            Navigate to…
          </span>
          <span className="ml-auto font-handwritten text-xs text-ink-faded opacity-60">
            Esc to close
          </span>
        </div>

        {/* Input */}
        <input
          ref={inputRef}
          className="cmd-palette-input"
          type="text"
          value={query}
          onChange={(e) => { setQuery(e.target.value); setHighlighted(0); }}
          onKeyDown={handleKeyDown}
          placeholder="Search pages, projects, experience…"
          autoComplete="off"
          spellCheck={false}
          aria-label="Search"
          aria-autocomplete="list"
        />

        {/* Results */}
        <div
          role="listbox"
          aria-label="Navigation options"
          style={{ maxHeight: 320, overflowY: "auto" }}
        >
          {filtered.length === 0 ? (
            <div className="px-5 py-4 font-handwritten text-sm text-ink-faded opacity-60 italic">
              Nothing found. Even the Marauder&apos;s Map has limits.
            </div>
          ) : (
            filtered.map((cmd, i) => (
              <button
                key={cmd.id}
                role="option"
                aria-selected={i === highlighted}
                className={`cmd-palette-item w-full text-left ${i === highlighted ? "highlighted" : ""}`}
                onClick={() => navigate(cmd.route)}
                onMouseEnter={() => setHighlighted(i)}
              >
                <span className="cmd-palette-item-icon" aria-hidden="true">
                  {cmd.icon}
                </span>
                <span>{cmd.label}</span>
                {i === highlighted && (
                  <span className="ml-auto font-handwritten text-xs text-ink-faded opacity-50">
                    ↵ open
                  </span>
                )}
              </button>
            ))
          )}
        </div>

        {/* Footer hint */}
        <div className="px-5 py-2 border-t border-parchment-dark/15 flex items-center gap-4">
          <span className="font-handwritten text-xs text-ink-faded opacity-50">↑↓ navigate</span>
          <span className="font-handwritten text-xs text-ink-faded opacity-50">↵ open</span>
        </div>
      </div>
    </div>
  );
}
