import React from "react";
import ThemeLogo from "./ThemeLogo";

interface SpinnerProps {
  size?: number; // size of the central logo
  className?: string;
}

export default function Spinner({ size = 48, className = "" }: SpinnerProps) {
  const ringsSize = size * 2.5; // proportionally sized rings

  return (
    <div className={`relative flex items-center justify-center select-none pointer-events-none ${className}`}>
      {/* Outer spinning dashed ring */}
      <div 
        className="absolute rounded-full border border-dashed border-gold/35 preloader-ring-slow" 
        style={{ width: ringsSize, height: ringsSize }}
      />
      {/* Middle spinning dashed ring */}
      <div 
        className="absolute rounded-full border border-dashed border-blood-ink/45 preloader-ring-fast" 
        style={{ width: ringsSize - 12, height: ringsSize - 12 }}
      />
      {/* Innermost dotted ring */}
      <div 
        className="absolute rounded-full border border-dotted border-parchment-dark/30 preloader-ring-dotted" 
        style={{ width: ringsSize - 24, height: ringsSize - 24 }}
      />
      
      {/* Center theme logo */}
      <div className="relative z-10 animate-pulse">
        <ThemeLogo size={size} />
      </div>
    </div>
  );
}
