---
trigger: always_on
---

# Enchanted Diary Portfolio — Development Plan

## 1. Project Vision

Build a unique developer portfolio for **Ved Patil** inspired by an ancient magical diary and an enchanted castle map. The website should feel like opening a mysterious handwritten journal where ink comes alive, pages physically turn, secret messages appear, and visitors can explore professional information through an interactive parchment map.

The experience combines two worlds:

```text
THE ENCHANTED DIARY
        +
THE MAGICAL CASTLE MAP
```

The diary is the primary portfolio interface. The magical map is an optional exploration experience where different locations represent About, Skills, Experience, Projects, and Contact.

The website must be:

* SEO-friendly.
* Fast on low-end devices.
* Fully responsive.
* Accessible.
* Recruiter-friendly.
* Fully JSON-driven.
* Functional without complex animations.
* Deployable without a separate backend or database.

---

## 2. Fixed Technology Stack

```text
Framework:          Next.js App Router
Language:           TypeScript
Content Storage:    Local JSON files
Database:           None
Separate Backend:   None
Text Effects:       Pretext
UI Animation:       Motion
Cinematic Animation: GSAP + @gsap/react
Styling:            Tailwind CSS + Custom CSS
Map:                Interactive SVG
SEO:                Next.js Metadata API
```

Architecture:

```text
                 USER'S BROWSER
                        │
                        ▼
                NEXT.JS APPLICATION
                        │
       ┌────────────────┼────────────────┐
       ▼                ▼                ▼
 SERVER CONTENT    CLIENT ANIMATION    JSON DATA
       │                │                │
       │                ├── Pretext      ├── Profile
       │                ├── Motion       ├── About
       │                └── GSAP         ├── Skills
       │                                 ├── Experience
       ├── SEO                            ├── Projects
       ├── Pages                          ├── Education
       └── Metadata                       └── Config
```

There will be no Spring Boot backend, Express server, database, CMS, authentication system, or admin panel.

---

## 3. JSON-Driven Architecture

All portfolio content must come from JSON. React components should contain presentation logic but not hardcoded professional content.

```text
src/data/
├── content/
│   ├── profile.json
│   ├── about.json
│   ├── skills.json
│   ├── experience.json
│   ├── projects.json
│   ├── education.json
│   └── social.json
│
└── config/
    ├── site.json
    ├── navigation.json
    ├── chapters.json
    ├── map-locations.json
    ├── animations.json
    └── seo.json
```

Example `profile.json`:

```json
{
  "name": "Ved Patil",
  "initials": "VP",
  "title": "Full Stack Developer",
  "tagline": "Building thoughtful digital experiences through code.",
  "resumeUrl": "/resume/ved-patil-resume.pdf",
  "profileImage": "/images/profile/ved-patil.webp",
  "availableForWork": true
}
```

Example `projects.json`:

```json
{
  "projects": [
    {
      "id": "funddev",
      "slug": "funddev",
      "title": "FundDev",
      "subtitle": "Connecting ideas, investors and developers.",
      "shortDescription": "A collaborative platform connecting organizations, investors and developers.",
      "description": [
        "FundDev provides an environment where organizations can present ideas and connect with investors and developers."
      ],
      "technologies": ["React", "Node.js", "Express", "MongoDB"],
      "image": "/images/projects/funddev.webp",
      "githubUrl": "",
      "liveUrl": "",
      "featured": true
    }
  ]
}
```

Example `experience.json`:

```json
{
  "entries": [
    {
      "id": "experience-1",
      "company": "Company Name",
      "role": "Full Stack Developer",
      "startDate": "2025-01",
      "endDate": null,
      "current": true,
      "description": [
        "Developed and maintained full-stack applications.",
        "Worked across frontend and backend systems."
      ],
      "technologies": ["React", "Java", "Spring Boot", "SQL"]
    }
  ]
}
```

JSON should store content and configuration only. Never store API keys, credentials, functions, React components, or GSAP timelines in JSON.

---

## 4. Routes and Chapters

Use professional, SEO-friendly URLs:

```text
/
/about
/skills
/experience
/projects
/projects/[slug]
/map
/contact
```

Fantasy terminology appears visually, while URLs remain understandable:

```text
/about       → Chapter I: The Author
/skills      → Chapter II: The Arcane Library
/experience  → Chapter III: The Chronicles
/projects    → Chapter IV: Magical Artifacts
/map         → Chapter V: The Enchanted Map
/contact     → Chapter VI: Send an Owl
```

Navigation information should come from `chapters.json`:

```json
{
  "chapters": [
    {
      "id": "about",
      "number": 1,
      "romanNumber": "I",
      "title": "The Author",
      "route": "/about",
      "transition": "page-turn"
    },
    {
      "id": "skills",
      "number": 2,
      "romanNumber": "II",
      "title": "The Arcane Library",
      "route": "/skills",
      "transition": "page-turn"
    },
    {
      "id": "map",
      "number": 5,
      "romanNumber": "V",
      "title": "The Enchanted Map",
      "route": "/map",
      "transition": "diary-to-map"
    }
  ]
}
```

---

## 5. Animation Architecture

Every animation technology has one strict responsibility:

```text
PRETEXT
→ Advanced text manipulation and text/object interactions.

MOTION
→ Standard React UI animation.

GSAP
→ Complex cinematic sequences.

CSS
→ Lightweight decorative and ambient effects.
```

Never allow two animation libraries to control the same property on the same DOM element.

Bad:

```text
GSAP   → transform
Motion → transform
Pretext → transform

All targeting one element.
```

Good:

```tsx
<motion.div>
  <div ref={gsapRef}>
    <div ref={pretextRef}>
      Magical text
    </div>
  </div>
</motion.div>
```

Each animation layer owns a separate element.

---

## 6. Pretext Responsibilities

Use Pretext only for special text experiences:

* Magical handwriting.
* Text reacting to nearby animated objects.
* Dynamic text wrapping.
* Text displacement.
* Ink objects moving through paragraphs.
* Secret messages.
* Hero typography.
* Chapter titles.
* Selected magical map labels.

Do not use Pretext for every paragraph, project description, navigation item, contact field, or accessibility-critical information.

Normal long-form content must remain immediately readable.

---

## 7. Motion Responsibilities

Use Motion for:

* Component entrance and exit.
* Simple fades and slides.
* Project card reveals.
* Tooltips.
* Modals.
* Mobile navigation.
* Success messages.
* Simple fallback route transitions.

Do not use Motion for diary opening, physical page turns, map unfolding, complex SVG sequences, or cinematic transitions.

---

## 8. GSAP Responsibilities

Use GSAP only for major cinematic sequences:

* Diary opening and closing.
* Physical 3D page turning.
* Map unfolding and folding.
* SVG paths drawing themselves.
* Magical footprints.
* Camera-like map zoom.
* Full-screen ink transitions.
* Diary-to-map transition.
* Map-to-diary transition.
* Contact letter folding.

Do not use GSAP for basic button hover, normal card reveals, tooltips, or every scroll animation.

---

## 9. Landing Page and Diary Opening

The visitor first sees a closed ancient diary:

```text
┌───────────────────────────────────────────┐
│                                           │
│             [ ANCIENT DIARY ]             │
│                                           │
│                    VP                     │
│                                           │
│               VED PATIL                   │
│                                           │
│          A DEVELOPER'S JOURNAL            │
│                                           │
│              Open the diary               │
│                                           │
└───────────────────────────────────────────┘
```

Content comes from `profile.json` and `site.json`.

Animation ownership:

```text
Diary entrance      → Motion
Diary opening       → GSAP
Hero text           → Pretext
Leather texture     → CSS
Ambient lighting    → CSS
```

Opening sequence:

```text
Visitor clicks "Open the diary"
        ↓
Diary moves toward viewer
        ↓
Diary scales slightly
        ↓
Front cover rotates in 3D
        ↓
Pages become visible
        ↓
Camera settles above diary
        ↓
Introduction appears in magical ink
```

GSAP owns the entire cinematic timeline. Motion must not control transforms on the same book elements.

---

## 10. Diary Pages

### Chapter I — The Author

Data:

```text
profile.json
about.json
education.json
```

Contains introduction, professional journey, education, resume link, and optional profile image.

Animation:

```text
Chapter title       → Pretext
Text/object effects → Pretext
Page entrance       → Motion
Atmosphere          → CSS
```

### Chapter II — The Arcane Library

Data:

```text
skills.json
```

Display technologies by categories such as Languages, Frontend, Backend, Databases, and Tools.

Do not use arbitrary percentages like Java 90% or React 85%. Demonstrate ability through projects and experience.

Animation:

```text
Chapter title    → Pretext
Category reveals → Motion
Hover effects    → CSS
```

### Chapter III — The Chronicles

Data:

```text
experience.json
```

Display experience as an ancient chronological manuscript:

```text
             THE CHRONICLES

                    │
2024                ◆
                    │
             Experience Entry
                    │
                    ◆
2025                │
                    │
             Experience Entry
                    │
                    ▼
```

Use CSS scroll-driven animation for the timeline line where supported. Motion handles entry reveals. Avoid adding GSAP ScrollTrigger unless advanced synchronization is genuinely required.

### Chapter IV — Magical Artifacts

Data:

```text
projects.json
```

Each project appears as a documented magical artifact:

```text
╔═══════════════════════════════════════╗
║           ARTIFACT № 01               ║
║                                       ║
║              FUNDDEV                  ║
║                                       ║
║      [ Project illustration ]         ║
║                                       ║
║  A platform connecting developers,    ║
║  organizations and investors.         ║
║                                       ║
║  React · Node.js · MongoDB            ║
║                                       ║
║            Examine Artifact →         ║
╚═══════════════════════════════════════╝
```

Use Motion for card entrance, CSS for hover, and Pretext selectively for titles.

Individual project pages use `/projects/[slug]` and generate content and SEO metadata entirely from `projects.json`.

---

## 11. Physical Page Turning

Navigation between diary chapters should feel like turning a physical page.

Sequence:

```text
Current page
        ↓
Visitor clicks next
        ↓
Page corner lifts
        ↓
Page rotates in 3D
        ↓
New route content exists underneath
        ↓
Turning sheet reveals content
        ↓
Page settles
```

GSAP owns the full page-turn sequence.

For reduced-motion users, low-end devices, and unsupported browsers, use a simple Motion crossfade.

Animations must never prevent immediate navigation indefinitely.

---
