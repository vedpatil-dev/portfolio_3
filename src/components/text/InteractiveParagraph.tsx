"use client";

import React, { useEffect, useRef, useState } from "react";
import { prepareWithSegments, PreparedTextWithSegments } from "@chenglou/pretext";

interface InteractiveParagraphProps {
  text: string;
  className?: string;  // Styling for the outer wrapper
  fontClass?: string;  // Styling for the text inside, e.g. "font-handwritten text-lg text-ink-faded"
  fontSpec?: string;   // Font spec for canvas measurement, e.g. "18px Caveat"
  lineHeight?: number; // Optional lineHeight (for backward compatibility)
}

interface WordInfo {
  element: HTMLSpanElement;
  initialX: number;
  initialY: number;
  currentX: number;
  currentY: number;
}

export default function InteractiveParagraph({
  text,
  className = "",
  fontClass = "font-handwritten text-lg text-ink-faded leading-relaxed",
  fontSpec = "18px Caveat, cursive",
  lineHeight = 26, // Kept for prop conformance
}: InteractiveParagraphProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [layoutKey, setLayoutKey] = useState(0);
  const preparedRef = useRef<PreparedTextWithSegments | null>(null);
  const wordsInfoRef = useRef<WordInfo[]>([]);

  // 1. Prepare pretext text layout once
  useEffect(() => {
    if (!preparedRef.current && typeof window !== "undefined") {
      try {
        preparedRef.current = prepareWithSegments(text, fontSpec);
      } catch (e) {
        console.warn("Failed to prepare pretext text layout:", e);
      }
    }
  }, [text, fontSpec]);

  // 2. Trigger remeasurement on window resize
  useEffect(() => {
    const handleResize = () => {
      setLayoutKey((k) => k + 1);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 3. Measure word positions after font loading or layout changes
  useEffect(() => {
    let active = true;

    const measure = () => {
      if (!containerRef.current || !active) return;

      const spans = containerRef.current.querySelectorAll(".interactive-word");
      const info: WordInfo[] = [];

      spans.forEach((span) => {
        const el = span as HTMLSpanElement;
        // Reset styles first to get untransformed base layout offsets
        el.style.transform = "";
        el.style.color = "";

        info.push({
          element: el,
          initialX: el.offsetLeft,
          initialY: el.offsetTop,
          currentX: 0,
          currentY: 0,
        });
      });

      wordsInfoRef.current = info;
    };

    // Initial measurement
    measure();

    // Remeasure once fonts are loaded
    if (typeof document !== "undefined" && (document as any).fonts) {
      (document as any).fonts.ready.then(() => {
        measure();
      });
    }

    // Fallback remeasure after a small delay
    const timer = setTimeout(measure, 400);

    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, [layoutKey, text]);

  // 4. Animation loop for dragon deflection
  useEffect(() => {
    let active = true;

    const tick = () => {
      if (!active) return;

      const dragonPositions = (window as any).__dragonPositions;
      const dragonOpacity = (window as any).__dragonOpacity ?? 0;

      if (containerRef.current && wordsInfoRef.current.length > 0) {
        const dragonActive =
          dragonPositions && dragonPositions.length > 0 && dragonOpacity > 0.05;
        // Why: getBoundingClientRect() ran every frame on every paragraph even with no dragon on screen.
        // Impact: layout is only read while the dragon is active (the idle loop becomes nearly free).
        const rect = dragonActive ? containerRef.current.getBoundingClientRect() : null;

        if (dragonActive && rect) {
          // Why: only the dragon's head pushed words, so the body slid through text untouched.
          // Impact: every 4th body segment acts as a (slightly weaker) repeller, so the whole snake parts the text.
          // Cost: ~14 distance checks per word per frame, only while the dragon is visible.
          wordsInfoRef.current.forEach((word) => {
            const radius = 80; // Interaction radius (px)
            const maxForce = 70; // Max displacement force (px)

            let targetX = 0;
            let targetY = 0;
            let strongest = 0;

            for (let i = 0; i < dragonPositions.length; i += 4) {
              const seg = dragonPositions[i];
              const dx = word.initialX - (seg.x - rect.left);
              const dy = word.initialY - (seg.y - rect.top);
              const dist = Math.sqrt(dx * dx + dy * dy);
              if (dist >= radius) continue;

              const bodyFalloff = i === 0 ? 1 : 0.7; // head pushes hardest
              const force = (1 - dist / radius) * maxForce * dragonOpacity * bodyFalloff;
              if (force > strongest) {
                strongest = force;
                const angle = dist > 0.1 ? Math.atan2(dy, dx) : Math.random() * Math.PI * 2;
                targetX = Math.cos(angle) * force;
                targetY = Math.sin(angle) * force;
              }
            }

            // Smooth interpolation (spring-like effect)
            word.currentX += (targetX - word.currentX) * 0.15;
            word.currentY += (targetY - word.currentY) * 0.15;

            if (
              Math.abs(word.currentX) > 0.05 ||
              Math.abs(word.currentY) > 0.05
            ) {
              word.element.style.transform = `translate(${word.currentX.toFixed(
                2
              )}px, ${word.currentY.toFixed(2)}px)`;
              word.element.style.color = "var(--blood-ink)";
            } else {
              word.element.style.transform = "";
              word.element.style.color = "";
            }
          });
        } else {
          // Smoothly return words to original positions if dragon is gone
          wordsInfoRef.current.forEach((word) => {
            if (
              Math.abs(word.currentX) > 0.05 ||
              Math.abs(word.currentY) > 0.05
            ) {
              word.currentX += (0 - word.currentX) * 0.15;
              word.currentY += (0 - word.currentY) * 0.15;
              word.element.style.transform = `translate(${word.currentX.toFixed(
                2
              )}px, ${word.currentY.toFixed(2)}px)`;
            } else {
              word.element.style.transform = "";
              word.element.style.color = "";
            }
          });
        }
      }

      requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);

    return () => {
      active = false;
    };
  }, [layoutKey]);

  // Split text into words for natural inline-block layout flow
  const words = text.split(" ");

  return (
    <div
      ref={containerRef}
      className={`${className} ${fontClass} relative flex flex-wrap select-none`}
    >
      {words.map((word, wordIndex) => (
        <React.Fragment key={wordIndex}>
        <span
          className="interactive-word inline-block mr-1.5 shrink-0 cursor-default select-text"
          style={{ willChange: "transform, color" }}
        >
          {word}
        </span>
        {/* Why: whitespace between inline-block spans keeps copy/paste and screen-reader text word-separated. */}
        {" "}
        </React.Fragment>
      ))}
    </div>
  );
}
