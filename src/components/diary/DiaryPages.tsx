"use client";

import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";

interface DiaryPagesProps {
  leftPageRef: React.RefObject<HTMLDivElement | null>;
  rightPageRef: React.RefObject<HTMLDivElement | null>;
  flippingPageRef: React.RefObject<HTMLDivElement | null>;
  childrenLeft: React.ReactNode;
  childrenRight: React.ReactNode;
  isFlipping: boolean;
  flipDirection: "forward" | "backward" | null;
  phase: string;
}

export default function DiaryPages({
  leftPageRef,
  rightPageRef,
  flippingPageRef,
  childrenLeft,
  childrenRight,
  isFlipping,
  flipDirection,
  phase,
}: DiaryPagesProps) {
  // Setup mobile layout tracking or simple phase visibility class
  const getMobileClass = () => {
    if (phase === "answer") {
      return "mobile-show-right";
    }
    return "mobile-show-left";
  };

  return (
    <div className={`w-full h-full flex transform-style-preserve-3d ${getMobileClass()}`}>
      
      {/* ── LEFT PAGE SHEET ── */}
      <div
        ref={leftPageRef}
        className="diary-page-sheet left"
      >
        <div className="diary-spine-shadow" />
        <div className="diary-ruled-lines-bg" />
        <div className="diary-ruled-parchment relative z-10 select-text">
          {childrenLeft}
        </div>
      </div>

      {/* ── RIGHT PAGE SHEET ── */}
      <div
        ref={rightPageRef}
        className="diary-page-sheet right"
      >
        <div className="diary-spine-shadow" />
        <div className="diary-ruled-lines-bg" />
        <div className="diary-ruled-parchment relative z-10 select-text">
          {childrenRight}
        </div>
      </div>

      {/* ── TRANSIENT 3D FLIPPING SHEET ── */}
      <div
        ref={flippingPageRef}
        className="diary-page-sheet flipping-page z-30"
        style={{
          display: isFlipping ? "block" : "none",
          left: flipDirection === "forward" ? "auto" : "6px",
          right: flipDirection === "forward" ? "6px" : "auto",
          transformOrigin: flipDirection === "forward" ? "left center" : "right center",
          transform: flipDirection === "forward" ? "perspective(2000px) rotateY(0deg)" : "perspective(2000px) rotateY(-180deg)",
          backgroundColor: "var(--parchment-light)",
          boxShadow: "0 15px 35px rgba(0,0,0,0.3)",
        }}
      >
        <div className="diary-spine-shadow" />
        <div className="diary-ruled-lines-bg" />
        
        {/* Visual representations of aged paper textures on turning page */}
        <div className="diary-ruled-parchment flex items-center justify-center opacity-85">
          <div className="w-16 h-16 border-4 border-dashed border-[rgba(118,83,46,0.15)] rounded-full animate-spin opacity-20" />
        </div>
      </div>

    </div>
  );
}
