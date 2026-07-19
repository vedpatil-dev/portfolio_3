"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

interface DiaryWriterProps {
  text: string;
  onComplete?: () => void;
  speed?: number; // ms per character
  delay?: number; // ms delay before writing starts
  fontClass?: string;
  startWriting?: boolean;
  center?: boolean;
}

export default function DiaryWriter({
  text,
  onComplete,
  speed = 45,
  delay = 500,
  fontClass = "diary-ink-text",
  startWriting = true,
  center = false,
}: DiaryWriterProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [displayedText, setDisplayedText] = useState("");
  const [isDone, setIsDone] = useState(false);

  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    if (!startWriting) return;

    setDisplayedText("");
    setIsDone(false);

    let index = 0;
    let timer: NodeJS.Timeout;

    const startTyping = () => {
      timer = setInterval(() => {
        if (index < text.length) {
          const char = text[index];
          setDisplayedText((prev) => prev + char);
          index++;
        } else {
          clearInterval(timer);
          setIsDone(true);
          onCompleteRef.current?.();
        }
      }, speed);
    };

    const delayTimeout = setTimeout(startTyping, delay);

    return () => {
      clearTimeout(delayTimeout);
      if (timer) clearInterval(timer);
    };
  }, [text, speed, delay, startWriting]);

  // Apply clip-path and bloom styling on new letter spawns
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Select the last spawned characters
    const letters = containerRef.current.querySelectorAll(".writing-letter");
    if (letters.length > 0) {
      const lastLetter = letters[letters.length - 1] as HTMLElement;
      if (lastLetter && !lastLetter.classList.contains("animated")) {
        lastLetter.classList.add("animated");
        
        // Draw the ink path using GSAP clip-path reveal
        gsap.fromTo(
          lastLetter,
          {
            clipPath: "polygon(0 0, 0% 0, 0% 100%, 0 100%)",
            opacity: 0,
            filter: "blur(2px) contrast(200%)",
            scale: 0.95,
          },
          {
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
            opacity: 1,
            filter: "blur(0px) contrast(100%)",
            scale: 1,
            duration: 0.35,
            ease: "power1.out",
          }
        );
      }
    }
  }, [displayedText]);

  // Split text into lines for spacing
  const lines = displayedText.split("\n");

  return (
    <div ref={containerRef} className={fontClass}>
      {lines.map((line, lIdx) => (
        <div key={lIdx} className={`min-h-[1.5em] flex flex-wrap ${center ? "justify-center" : "justify-start"}`}>
          {line.split("").map((char, cIdx) => (
            <span
              key={cIdx}
              className="writing-letter inline-block whitespace-pre"
              style={{
                willChange: "clip-path, opacity, filter",
              }}
            >
              {char}
            </span>
          ))}
        </div>
      ))}
      {isDone && <span className="diary-cursor" aria-hidden="true" />}
    </div>
  );
}
