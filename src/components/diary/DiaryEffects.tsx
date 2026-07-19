"use client";

import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";

interface DiaryEffectsProps {
  phase: string;
}

export default function DiaryEffects({ phase }: DiaryEffectsProps) {
  const turbRef = useRef<SVGFETurbulenceElement>(null);

  useEffect(() => {
    if (phase === "thinking") {
      // Animate the ink ripple turbulence frequency to simulate ink floating / dispersing
      if (turbRef.current) {
        gsap.fromTo(
          turbRef.current,
          { attr: { baseFrequency: "0" } },
          {
            attr: { baseFrequency: "0.05" },
            duration: 1.8,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          }
        );
      }
    } else {
      if (turbRef.current) {
        gsap.to(turbRef.current, {
          attr: { baseFrequency: "0" },
          duration: 0.5,
        });
      }
    }
  }, [phase]);

  return (
    <svg className="absolute w-0 h-0 overflow-hidden" aria-hidden="true">
      <defs>
        {/* Ink ripple turbulence filter */}
        <filter id="diary-ink-ripple">
          <feTurbulence
            ref={turbRef}
            type="fractalNoise"
            baseFrequency="0"
            numOctaves="3"
            result="noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="15"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>

        {/* Ink dissolve filter */}
        <filter id="diary-ink-dissolve">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.08"
            numOctaves="4"
            result="noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="45"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>

        {/* Paper texture filter for parchment background overlay */}
        <filter id="parchment-grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.95"
            numOctaves="4"
            result="noise"
          />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.46 
                    0 0 0 0 0.33 
                    0 0 0 0 0.18 
                    0 0 0 0.08 0"
          />
          <feComposite operator="in" in2="SourceGraphic" />
        </filter>
      </defs>
    </svg>
  );
}
