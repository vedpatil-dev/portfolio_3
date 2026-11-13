"use client";

import { useRef, type ReactNode } from "react";

// Why: subtle 3D depth for the hero map sheet. Impact: tilts a few degrees toward the pointer only on
// hover-capable devices with motion allowed; writes two CSS variables (no React state, no re-renders).
export default function TiltCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const frame = useRef(0);

  const allowed = () =>
    window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const onMove = (e: React.PointerEvent) => {
    if (!allowed() || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      ref.current?.style.setProperty("--ry", `${x * 7}deg`);
      ref.current?.style.setProperty("--rx", `${-y * 7}deg`);
    });
  };
  const onLeave = () => {
    cancelAnimationFrame(frame.current);
    ref.current?.style.setProperty("--ry", "0deg");
    ref.current?.style.setProperty("--rx", "0deg");
  };

  return (
    <div className="tilt-stage" onPointerMove={onMove} onPointerLeave={onLeave}>
      <div ref={ref} className={`tilt-card ${className}`}>{children}</div>
    </div>
  );
}
