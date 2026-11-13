"use client";

import React, { useEffect, useState } from "react";
import ThemeLogo from "./ThemeLogo";

// Why: the preloader was a fixed 2s timer that delayed every visit without any real loading behind it.
// Impact: it now renders nothing unless the page is genuinely still loading after SHOW_AFTER_MS, and it
// disappears the moment the window `load` event fires. Fast loads (the normal case) never see it.
const SHOW_AFTER_MS = 600;

export default function Preloader() {
  const [loading, setLoading] = useState(false);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    if (document.readyState === "complete") return;

    let exitTimer: ReturnType<typeof setTimeout>;
    const showTimer = setTimeout(() => setLoading(true), SHOW_AFTER_MS);
    const onLoad = () => {
      clearTimeout(showTimer);
      setFade(true);
      exitTimer = setTimeout(() => setLoading(false), 400);
    };
    window.addEventListener("load", onLoad, { once: true });

    return () => {
      clearTimeout(showTimer);
      clearTimeout(exitTimer);
      window.removeEventListener("load", onLoad);
    };
  }, []);

  if (!loading) return null;
  const message = "Unfolding the parchment...";

  return (
    <div
      className={`fixed inset-0 z-9999 flex flex-col items-center justify-center select-none transition-opacity duration-300 ease-in-out ${
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
