import React from "react";

interface ThemeLogoProps {
  className?: string;
  size?: number | string;
}

export default function ThemeLogo({ className = "", size }: ThemeLogoProps) {
  const styleObj = size ? { width: size, height: size } : undefined;

  return (
    <div 
      className={`inline-block transition duration-300 ease-in-out transform hover:scale-115 ${className}`}
      style={styleObj}
    >
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-[0_3px_6px_rgba(33,23,15,0.45)]"
      >
        <defs>
          {/* Ancient gold/crimson/dark-leather gradient for high visibility */}
          <linearGradient id="hpLogoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8d6c2c" /> {/* Dark Gold */}
            <stop offset="50%" stopColor="#681d18" /> {/* Blood Red */}
            <stop offset="100%" stopColor="#21170f" /> {/* Dark Leather/Ink */}
          </linearGradient>
          {/* Subtle drop shadow filter for organic/hand-inked feel */}
          <filter id="inkBleed" x="-10%" y="-10%" width="120%" height="120%">
            <feGaussianBlur stdDeviation="0.5" result="blur" />
            <feOffset dx="0.5" dy="0.8" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Outer triangle (The Cloak of Invisibility) */}
        <polygon
          points="50,15 15,80 85,80"
          fill="none"
          stroke="url(#hpLogoGrad)"
          strokeWidth="3.5"
          strokeLinejoin="round"
          filter="url(#inkBleed)"
          opacity="0.9"
        />

        {/* Inscribed circle (The Resurrection Stone) */}
        <circle
          cx="50"
          cy="56.7"
          r="23.3"
          fill="none"
          stroke="url(#hpLogoGrad)"
          strokeWidth="3.5"
          filter="url(#inkBleed)"
          opacity="0.9"
        />

        {/* Lightning bolt wand (The Elder Wand) */}
        <path
          d="M 50 8 L 54 38 L 44 44 L 51 86"
          fill="none"
          stroke="url(#hpLogoGrad)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#inkBleed)"
        />

        {/* Decorative magical sparkles */}
        <path
          d="M20,25 L21,27 L23,28 L21,29 L20,31 L19,29 L17,28 L19,27 Z"
          fill="#967331"
          opacity="0.65"
        />
        <path
          d="M80,25 L81,27 L83,28 L81,29 L80,31 L79,29 L77,28 L79,27 Z"
          fill="#967331"
          opacity="0.65"
        />
        <path
          d="M50,92 L50.5,93 L51.5,93.5 L50.5,94 L50,95 L49.5,94 L48.5,93.5 L49.5,93 Z"
          fill="#681d18"
          opacity="0.5"
        />
      </svg>
    </div>
  );
}
