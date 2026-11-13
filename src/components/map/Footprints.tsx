// Why: a quiet "someone walked here" divider between sections — Marauder's Map flavour without heavy art.
export default function Footprints() {
  return (
    <div className="footprints" aria-hidden="true">
      {[0, 1, 2, 3].map((i) => (
        <svg key={i} viewBox="0 0 14 26" fill="currentColor">
          <ellipse cx="7" cy="17" rx="4.5" ry="8" />
          <ellipse cx="7" cy="4" rx="3.5" ry="3.5" />
        </svg>
      ))}
    </div>
  );
}
