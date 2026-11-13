// Why: re-mounts per navigation so every route change gets a soft fade (page-turn feel).
// Impact: opacity-only CSS animation, disabled for reduced-motion; no JS.
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-enter">{children}</div>;
}
