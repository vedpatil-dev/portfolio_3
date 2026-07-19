"use client";

import React from "react";

interface DiaryCoverProps {
  leftCoverRef: React.RefObject<HTMLDivElement | null>;
  lockRef: React.RefObject<HTMLDivElement | null>;
}

export default function DiaryCover({ leftCoverRef, lockRef }: DiaryCoverProps) {
  return (
    <>
      {/* Front Cover (Rotating open to the Left) */}
      <div
        ref={leftCoverRef}
        className="diary-cover-3d left"
        style={{
          backgroundImage: `
            radial-gradient(circle at 10% 15%, rgba(122, 59, 30, 0.25) 0%, transparent 40%),
            radial-gradient(circle at 80% 85%, rgba(16, 11, 8, 0.45) 0%, transparent 45%),
            url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='leatherNoise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='5' stitchTiles='stitch'/%3E%3CfeColorMatrix type='matrix' values='0 0 0 0 0.12 0 0 0 0 0.08 0 0 0 0 0.05 0 0 0 0.5 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23leatherNoise)'/%3E%3C/svg%3E")
          `,
        }}
      >
        {/* Leather details and inner margins */}
        <div className="absolute inset-4 border border-[rgba(150,115,49,0.15)] rounded pointer-events-none" />

        {/* Riddle's Gold Emblem Stamping on the Cover */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none"
          style={{ transform: "rotateY(180deg)" }}
        >
          <div
            className="font-display text-gold tracking-widest text-4xl mb-2"
            style={{ fontFamily: "var(--font-display)" }}
          >
            VED PATIL
          </div>
          <div className="w-16 h-px bg-gold/30 my-2" />
          <div className="font-handwritten text-gold/50 text-xs italic">
            Diary — 2005
          </div>
        </div>

        {/* Embossed corners */}
        <div className="absolute top-2 left-2 w-8 h-8 border-t-2 border-l-2 border-gold/25 pointer-events-none" />
        <div className="absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 border-gold/25 pointer-events-none" />
        <div className="absolute bottom-2 left-2 w-8 h-8 border-b-2 border-l-2 border-gold/25 pointer-events-none" />
        <div className="absolute bottom-2 right-2 w-8 h-8 border-b-2 border-r-2 border-gold/25 pointer-events-none" />

        {/* Lock clasp */}
        <div ref={lockRef} className="diary-lock-clasp">
          <div className="absolute left-[30%] top-[40%] w-[40%] h-[20%] bg-black/40 rounded-sm" />
        </div>
      </div>

      {/* Back Cover (Stationary Right side) */}
      <div
        className="diary-cover-3d right"
        style={{
          backgroundImage: `
            radial-gradient(circle at 90% 15%, rgba(122, 59, 30, 0.25) 0%, transparent 40%),
            radial-gradient(circle at 20% 85%, rgba(16, 11, 8, 0.45) 0%, transparent 45%),
            url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='leatherNoise2'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='5' stitchTiles='stitch'/%3E%3CfeColorMatrix type='matrix' values='0 0 0 0 0.12 0 0 0 0 0.08 0 0 0 0 0.05 0 0 0 0.5 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23leatherNoise2)'/%3E%3C/svg%3E")
          `,
        }}
      >
        <div className="absolute inset-4 border border-[rgba(150,115,49,0.15)] rounded pointer-events-none" />
        <div className="absolute top-2 left-2 w-8 h-8 border-t-2 border-l-2 border-gold/25 pointer-events-none" />
        <div className="absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 border-gold/25 pointer-events-none" />
        <div className="absolute bottom-2 left-2 w-8 h-8 border-b-2 border-l-2 border-gold/25 pointer-events-none" />
        <div className="absolute bottom-2 right-2 w-8 h-8 border-b-2 border-r-2 border-gold/25 pointer-events-none" />
      </div>
    </>
  );
}
