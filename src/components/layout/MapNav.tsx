import React, { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { LOCATION } from "@/src/lib/location";
import { Compass, Scroll, Swords, Trophy, Feather, Eye, EyeOff } from "lucide-react";

const NAV_LOCATIONS = [
  { id: "home", label: "Home", icon: <Compass className="w-5 h-5" />, route: "/" },
  { id: "about", label: "About", icon: <Scroll className="w-5 h-5" />, route: "/about" },
  { id: "experience", label: "Experience", icon: <Swords className="w-5 h-5" />, route: "/experience" },
  { id: "projects", label: "Projects", icon: <Trophy className="w-5 h-5" />, route: "/projects" },
  { id: "contact", label: "Contact", icon: <Feather className="w-5 h-5" />, route: "/contact" },
];

export default function MapNav() {
  const pathname = usePathname();
  const containerRef = useRef<HTMLDivElement>(null);
  const iconRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [paths, setPaths] = useState<string[]>([]);
  const [dots, setDots] = useState<{ x: number; y: number }[]>([]);
  const [svgSize, setSvgSize] = useState({ w: 0, h: 0 });

  useEffect(() => {
    const compute = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setSvgSize({ w: rect.width, h: rect.height });

      const centers = iconRefs.current.map((el) => {
        if (!el) return null;
        const r = el.getBoundingClientRect();
        return {
          x: r.left + r.width / 2 - rect.left,
          y: r.top + r.height / 2 - rect.top,
        };
      });

      const validDots = centers.filter((c): c is { x: number; y: number } => c !== null);
      setDots(validDots);

      const newPaths: string[] = [];
      for (let i = 0; i < centers.length - 1; i++) {
        const a = centers[i];
        const b = centers[i + 1];
        if (!a || !b) continue;
        const mx = (a.x + b.x) / 2;
        const my = (a.y + b.y) / 2 - 10;
        newPaths.push(`M ${a.x} ${a.y} Q ${mx} ${my} ${b.x} ${b.y}`);
      }
      setPaths(newPaths);
    };

    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, []);

  const [dragonEnabled, setDragonEnabled] = useState<boolean>(true);

  useEffect(() => {
    setDragonEnabled(localStorage.getItem("dragon_enabled") !== "false");
  }, []);

  const toggleDragon = () => {
    const next = !dragonEnabled;
    setDragonEnabled(next);
    localStorage.setItem("dragon_enabled", String(next));
    window.dispatchEvent(new CustomEvent("toggle-dragon", { detail: { enabled: next } }));
  };

  const getActiveId = () => {
    if (pathname === "/") return "home";
    const match = NAV_LOCATIONS.find(
      (l) => l.route !== "/" && pathname.startsWith(l.route)
    );
    return match?.id ?? "home";
  };
  const activeId = getActiveId();

  return (
    <nav className="map-nav" aria-label="Main navigation">
      {/* Coordinate decorations — map flavour only */}
      <div className="absolute top-2 left-3 map-coord-mark hidden lg:block">
        {LOCATION.lat} · {LOCATION.lon}
      </div>
      
      {/* Top right header: Ved Patil + Dragon toggle button */}
      {/* Why: the dragon is disabled on touch devices and this control overlapped the mobile bottom nav. Impact: shown from lg up only (at tablet widths it collided with the Contact icon). */}
      <div className="absolute top-1.5 right-3 hidden lg:flex items-center gap-3 z-20">
        <span className="map-coord-mark hidden md:inline">Ved Patil</span>
        <button
          onClick={toggleDragon}
          className="flex items-center gap-1.5 px-2 py-0.5 rounded border border-parchment-dark/40 hover:border-gold text-xs font-sans text-ink-faded hover:text-blood-ink transition-all cursor-pointer bg-parchment-light/70 shadow-xs"
          title={dragonEnabled ? "Turn off Cursor Dragon" : "Turn on Cursor Dragon"}
          aria-label={dragonEnabled ? "Turn off Cursor Dragon" : "Turn on Cursor Dragon"}
        >
          {dragonEnabled ? (
            <Eye className="w-3.5 h-3.5 shrink-0 text-blood-ink" />
          ) : (
            <EyeOff className="w-3.5 h-3.5 shrink-0 text-ink-faded opacity-60" />
          )}
          <span className="font-bold text-[11px] uppercase tracking-wider">
            {dragonEnabled ? "Dragon: ON" : "Dragon: OFF"}
          </span>
        </button>
      </div>

      <div
        ref={containerRef}
        className="relative flex items-center justify-center gap-4 sm:gap-8 md:gap-12 lg:gap-16 px-4 py-3"
        style={{ minHeight: 72 }}
      >
        {/* SVG dashed path between icons */}
        {svgSize.w > 0 && (
          <svg
            className="nav-path-svg"
            width={svgSize.w}
            height={svgSize.h}
            aria-hidden="true"
            style={{ position: "absolute", top: 0, left: 0, pointerEvents: "none" }}
          >
            {paths.map((d, i) => (
              <path key={i} d={d} className="nav-path-line" strokeLinecap="round" />
            ))}
            {dots.map((pt, i) => (
              <circle
                key={`dot-${i}`}
                cx={pt.x}
                cy={pt.y}
                r={3}
                fill="rgba(89, 64, 43, 0.4)"
              />
            ))}
          </svg>
        )}

        {NAV_LOCATIONS.map((loc, i) => (
          <Link
            key={loc.id}
            href={loc.route}
            className={`nav-location ${activeId === loc.id ? "active" : ""}`}
            aria-label={loc.label}
            aria-current={activeId === loc.id ? "page" : undefined}
          >
            <div ref={(el) => { iconRefs.current[i] = el; }} className="nav-location-icon relative" aria-hidden="true">
              {loc.icon}
              {activeId === loc.id && (
                <span className="absolute -top-2 -right-2 text-xs text-blood-ink font-bold font-display select-none bg-parchment-light w-4 h-4 flex items-center justify-center rounded-full border border-blood-ink/50 leading-none shadow-sm">
                  X
                </span>
              )}
            </div>
            <span className="nav-location-label">{loc.label}</span>
          </Link>
        ))}
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 h-px opacity-30"
        style={{ background: "linear-gradient(to right, transparent, #967331, transparent)" }}
        aria-hidden="true"
      />
    </nav>
  );
}
