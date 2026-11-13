// Why: the compass previously only lived (unrefined) inside the background SVG. This is a small, calm,
// reusable rose for the hero. Impact: needle swings on hover only (CSS transition) — no continuous animation.
export default function Compass({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" className={`compass ${className}`} role="img" aria-label="Compass rose">
      <circle cx="60" cy="60" r="54" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.6" />
      <circle cx="60" cy="60" r="46" fill="none" stroke="currentColor" strokeWidth="0.6" strokeDasharray="2 4" opacity="0.5" />
      <g stroke="currentColor" strokeWidth="0.8" opacity="0.5">
        <path d="M60 6v12M60 102v12M6 60h12M102 60h12" />
      </g>
      <g className="compass-needle">
        <path d="M60 14 L66 60 L60 106 L54 60 Z" fill="currentColor" opacity="0.18" />
        <path d="M60 14 L66 60 L54 60 Z" fill="var(--blood-ink)" opacity="0.85" />
        <path d="M60 106 L66 60 L54 60 Z" fill="currentColor" opacity="0.55" />
      </g>
      <circle cx="60" cy="60" r="3.5" fill="var(--gold)" stroke="currentColor" strokeWidth="0.8" />
      <text x="60" y="4.5" textAnchor="middle" fontSize="9" fill="currentColor" fontFamily="var(--font-pirata)">N</text>
    </svg>
  );
}
