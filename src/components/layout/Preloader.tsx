"use client";

import React, { useEffect, useState } from "react";
import ThemeLogo from "./ThemeLogo";

export default function Preloader() {
  const [loading, setLoading] = useState(true);
  const [fade, setFade] = useState(false);
  const [message, setMessage] = useState("Holding the wand...");

  useEffect(() => {
    const messages = [
      "Holding the wand...",
      "Unfolding the parchment...",
      "Drawing secret pathways...",
      "Revealing the castle...",
      "I solemnly swear that I am up to no good..."
    ];

    let msgIndex = 0;
    const interval = setInterval(() => {
      msgIndex++;
      if (msgIndex < messages.length) {
        setMessage(messages[msgIndex]);
      }
    }, 700);

    // Minimum preloader time of 3.8 seconds for cinematic feel
    const timer = setTimeout(() => {
      setFade(true);
      const exitTimer = setTimeout(() => {
        setLoading(false);
      }, 700); // matches fade-out transition duration
      return () => clearTimeout(exitTimer);
    }, 3800);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, []);

  if (!loading) return null;

  return (
    <div
      className={`fixed inset-0 z-9999 flex flex-col items-center justify-center select-none transition-opacity duration-700 ease-in-out ${
        fade ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      style={{
        background: "radial-gradient(circle at center, #23160f 0%, #100b08 100%)"
      }}
    >
      {/* Astrolabe / Spinning Rings Wrapper */}
      <div className="relative w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center">
        {/* Ring 1 - Outer slow counter-clockwise */}
        <div className="absolute inset-0 rounded-full border border-dashed border-gold/30 preloader-ring-slow" />
        {/* Ring 2 - Middle fast clockwise */}
        <div className="absolute inset-4 rounded-full border border-dashed border-blood-ink/40 preloader-ring-fast" />
        {/* Ring 3 - Inner thin counter-clockwise */}
        <div className="absolute inset-8 rounded-full border border-double border-gold/20 preloader-ring-medium" />
        {/* Ring 4 - Innermost dotted clockwise */}
        <div className="absolute inset-12 rounded-full border border-dotted border-parchment/25 preloader-ring-dotted" />

        {/* Center Pulsing Theme Logo */}
        <div className="relative z-10 scale-90 sm:scale-100 animate-pulse">
          <ThemeLogo size={90} />
        </div>
      </div>

      {/* Loading thematic text label */}
      <div className="mt-8 text-center space-y-2">
        <p className="font-handwritten text-xl text-gold/90 animate-pulse tracking-wide h-6">
          {message}
        </p>
        <p className="font-handwritten text-xs text-ink-faded/60 uppercase tracking-widest">
          Ved Patil&apos;s Journal
        </p>
      </div>
    </div>
  );
}
