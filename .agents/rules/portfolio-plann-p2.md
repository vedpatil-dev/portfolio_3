---
trigger: always_on
---

12. The Enchanted Map

Route:

/map

The map is an interactive SVG castle-style parchment map.

                         Observatory
                           PROJECTS
                              │
                              │
        Library ───────── Great Hall ───────── Clock Tower
         SKILLS              ABOUT              EXPERIENCE
                              │
                              │
                            Owlery
                            CONTACT

Do not initially use Three.js, React Three Fiber, or WebGL. SVG provides better performance, accessibility, scalability, and easier animation control.

Map locations come from map-locations.json:

{
  "locations": [
    {
      "id": "great-hall",
      "name": "Great Hall",
      "section": "about",
      "route": "/about",
      "x": 800,
      "y": 450
    },
    {
      "id": "observatory",
      "name": "Observatory",
      "section": "projects",
      "route": "/projects",
      "x": 800,
      "y": 150
    }
  ]
}

Suggested SVG architecture:

<svg viewBox="0 0 1600 900">
  <g id="parchment-details" />
  <g id="castle-architecture" />
  <g id="secret-paths" />
  <g id="locations" />
  <g id="footprints" />
  <g id="labels" />
</svg>

Animation ownership:

Map unfolding    → GSAP
SVG path drawing → GSAP
Footprints       → GSAP
Tooltips         → Motion
Location hover   → CSS
Selected labels  → Pretext
13. Magical Footprints

Use reusable SVG footprint symbols instead of many React components.

<defs>
  <symbol id="footprint">
    {/* SVG footprint shape */}
  </symbol>
</defs>

<g id="footprints">
  <use href="#footprint" />
  <use href="#footprint" />
  <use href="#footprint" />
</g>

GSAP controls position, rotation, opacity, and timing.

Disable continuous footprints in reduced and minimal animation modes.

14. Diary-to-Map Transition

Sequence:

Current diary page
        ↓
Text fades
        ↓
Diary closes
        ↓
Camera pulls backward
        ↓
Screen darkens
        ↓
Folded parchment appears
        ↓
Map unfolds
        ↓
Castle paths draw themselves
        ↓
Location labels appear
        ↓
Footprints begin moving

GSAP owns the complete cinematic sequence. Pretext may handle selected map labels.

15. Map-to-Page Transition

When a visitor selects a map location:

Location activates
        ↓
Footprints move toward destination
        ↓
Camera zooms toward location
        ↓
Dark ink spreads outward
        ↓
Ink covers viewport
        ↓
Route changes
        ↓
Ink recedes
        ↓
Selected page appears

Full mode uses GSAP. Reduced and minimal modes use a Motion crossfade.

16. Contact — Send an Owl

Route:

/contact

The contact page should resemble an old handwritten letter:

╭──────────────────────────────────────────────╮
│                                              │
│    To whom it may concern,                   │
│                                              │
│    My name is _________________________      │
│                                              │
│    My email is ________________________      │
│                                              │
│    I wish to speak about...                  │
│                                              │
│    ____________________________________      │
│    ____________________________________      │
│                                              │
│                         Send the owl         │
╰──────────────────────────────────────────────╯

No separate backend is required. Possible contact implementations are a mailto link, third-party form service, or a lightweight Next.js Route Handler/Server Action.

Submission animation:

Submit succeeds
        ↓
Signature appears
        ↓
Letter folds
        ↓
Letter flies upward
        ↓
Feather falls
        ↓
Success message appears

GSAP handles letter folding. Motion handles the success message.

17. Typography and Visual Design

Use:

Body:
EB Garamond

Chapter headings:
IM Fell English SC

Handwritten notes:
Italianno or Caveat

Recommended ratio:

70% readable antique serif
20% decorative chapter typography
10% handwritten text

Suggested colors:

:root {
  --parchment-light: #d6bd89;
  --parchment: #b9955b;
  --parchment-dark: #76532e;
  --ink: #21170f;
  --ink-faded: #59402b;
  --blood-ink: #681d18;
  --leather: #28170f;
  --leather-light: #51301e;
  --gold: #967331;
  --shadow: #100b08;
}

Build parchment using layered CSS, compressed WebP/AVIF grain textures, edge darkening, subtle stains, and paper fibers. Avoid one huge unoptimized background image.

18. Performance Modes

Implement three animation levels:

type AnimationLevel = "full" | "reduced" | "minimal";

Full mode: 3D diary opening, physical page turns, map unfolding, SVG paths, footprints, ink transitions, and advanced text effects.

Reduced mode: simplified diary opening, crossfade page transitions, limited text effects, no continuous footprints, and fewer ambient animations.

Minimal mode: static diary, simple fades, static map, immediate text, no 3D effects, and no continuous animation.

Consider:

window.matchMedia("(prefers-reduced-motion: reduce)");
navigator.hardwareConcurrency;
navigator.deviceMemory;

Do not depend on one hardware signal alone. User accessibility preferences take priority.

19. SEO Strategy

All important content must be rendered as semantic HTML from JSON.

Example:

import profile from "@/data/content/profile.json";

export const metadata = {
  title: `${profile.name} | ${profile.title}`,
  description: profile.tagline
};

Implement:

Unique page titles.
Unique descriptions.
Canonical URLs.
Open Graph metadata.
Sitemap.
Robots.
JSON-LD.
Semantic headings.
Image alt text.

Important content must not exist exclusively inside Canvas, WebGL, SVG text, or inaccessible animations.20. Project Structure
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── about/page.tsx
│   ├── skills/page.tsx
│   ├── experience/page.tsx
│   ├── projects/
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   ├── map/page.tsx
│   └── contact/page.tsx
│
├── components/
│   ├── diary/
│   │   ├── Diary.tsx
│   │   ├── DiaryCover.tsx
│   │   ├── DiaryPage.tsx
│   │   ├── PageTurn.tsx
│   │   └── DiaryNavigation.tsx
│   ├── map/
│   │   ├── MagicalMap.tsx
│   │   ├── StaticMapFallback.tsx
│   │   ├── MapLocation.tsx
│   │   ├── MagicFootprints.tsx
│   │   └── MapTooltip.tsx
│   ├── text/
│   │   ├── MagicalText.tsx
│   │   ├── InkWriting.tsx
│   │   └── InteractiveParagraph.tsx
│   └── transitions/
│       ├── DiaryPageTurn.tsx
│       ├── DiaryToMap.tsx
│       ├── MapToDiary.tsx
│       └── InkTransition.tsx
│
├── data/
│   ├── content/
│   │   ├── profile.json
│   │   ├── about.json
│   │   ├── skills.json
│   │   ├── experience.json
│   │   ├── projects.json
│   │   ├── education.json
│   │   └── social.json
│   └── config/
│       ├── site.json
│       ├── navigation.json
│       ├── chapters.json
│       ├── map-locations.json
│       ├── animations.json
│       └── seo.json
│
├── hooks/
│   ├── useAnimationLevel.ts
│   ├── useReducedMotion.ts
│   └── useDeviceCapability.ts
│
├── lib/
│   ├── animations/
│   ├── data/
│   └── seo.ts
│
├── styles/
└── types/
21. Dependencies

Install only necessary packages:

npm install motion gsap @gsap/react clsx tailwind-merge

Add the exact Pretext package after confirming its official package/repository.

Do not initially install Three.js, React Three Fiber, Lenis, Anime.js, React Spring, SplitType, page-flip libraries, particle libraries, or Lottie.

Every dependency must solve a concrete requirement.

22. Development Roadmap

Phase 1 — Foundation: Create Next.js project, TypeScript setup, Tailwind, routes, JSON files, TypeScript types, SEO, fonts, and design tokens.

Phase 2 — Static Diary: Build the cover, leather appearance, parchment pages, spine, desktop two-page layout, and mobile single-page layout.

Phase 3 — Standard Motion: Add Motion for component reveals, cards, tooltips, mobile navigation, and fallback transitions.

Phase 4 — Pretext: Add advanced effects only to hero text, chapter titles, secret messages, interactive paragraphs, and selected map labels.

Phase 5 — GSAP Diary Opening: Build the closed-book-to-open-diary cinematic sequence.

Phase 6 — Page Turning: Create a reusable forward/backward page-turn system with route synchronization and reduced-motion fallback.

Phase 7 — Magical Map: Build the static accessible SVG first, then add unfolding, path drawing, footprints, and location transitions.

Phase 8 — Cinematic Transitions: Implement only Diary → Diary, Diary → Map, Map → Diary, Map → Project, and contact submission sequences.

Phase 9 — Performance: Test with Lighthouse, CPU throttling, slow networks, mobile simulation, and real devices.

Phase 10 — SEO and Accessibility: Finalize metadata, Open Graph, sitemap, JSON-LD, keyboard navigation, focus states, contrast, and reduced-motion support.

23. Core Development Rules
No separate backend.
No database.
All professional content comes from JSON.
Components must remain reusable and data-driven.
Important content must be server-rendered.
Pretext owns advanced text interactions.
Motion owns standard UI animations.
GSAP owns cinematic sequences.
CSS owns lightweight decorative effects.
Never let multiple animation libraries control the same property on the same element.
Do not animate every paragraph.
Never force recruiters to wait through long animations.
Every cinematic animation requires a fast fallback.
Respect reduced-motion preferences.
Use SVG for the magical map.
Avoid WebGL unless genuinely required.
Lazy-load heavy interactive enhancements.
Mobile usability is more important than preserving every desktop animation.
JSON contains data and configuration, never secrets or executable logic.
The portfolio must remain usable when all complex animations are disabled.
24. Final Architecture
NEXT.JS APP ROUTER
│
├── JSON DATA
│   ├── Profile
│   ├── About
│   ├── Skills
│   ├── Experience
│   ├── Projects
│   ├── Education
│   ├── Social links
│   └── Configuration
│
├── PRETEXT
│   ├── Magical handwriting
│   ├── Dynamic text interaction
│   ├── Text/object reflow
│   └── Secret messages
│
├── MOTION
│   ├── Component enter/exit
│   ├── Cards
│   ├── Tooltips
│   ├── Mobile UI
│   └── Fallback transitions
│
├── GSAP
│   ├── Diary opening
│   ├── Page turning
│   ├── Map unfolding
│   ├── SVG paths
│   ├── Footprints
│   ├── Ink transitions
│   └── Letter folding
│
└── CSS
    ├── Parchment
    ├── Leather
    ├── Shadows
    ├── Lighting
    ├── Hover effects
    └── Reduced-motion fallbacks
Final Objective

Build a fast, SEO-friendly, fully JSON-driven developer portfolio presented as an ancient magical diary. The visitor opens a mysterious leather journal, watches handwritten ink come alive, physically turns pages to explore professional experience and projects, and can unfold an enchanted castle map where magical footprints guide them between portfolio sections.

The site must achieve its cinematic identity without sacrificing loading speed, SEO, accessibility, mobile usability, or performance on low-end devices.