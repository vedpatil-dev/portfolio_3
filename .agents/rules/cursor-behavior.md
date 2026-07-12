---
trigger: always_on
---

## Interactive Cursor Serpent

On desktop devices with a fine mouse pointer, an ancient magical serpent will follow the visitor's cursor across the portfolio.

The serpent should look like a hand-drawn ink illustration that belongs naturally on the parchment rather than a modern cursor effect.

```text
Mouse pointer
      ↓
      ●
       ╲
        ◉───◉───◉───◉───◉───◉
          Serpent follows with delay
```

### Behavior

The serpent's head follows the mouse pointer with smooth interpolation. Each following body segment follows the previous segment with a slight delay, producing organic snake-like movement.

The serpent should:

* Follow the cursor smoothly.
* Move with natural delayed body motion.
* Rotate its head toward the movement direction.
* Bend naturally around turns.
* Become slightly more active when the cursor moves quickly.
* Slow down naturally when the cursor stops.
* Remain subtle and avoid blocking important content.
* Move behind text where appropriate.
* Potentially cause nearby Pretext-powered text to react or reflow around it.
* Disappear or rest when the pointer is inactive for a configurable period.

### Technology Ownership

```text
Serpent rendering        → SVG
Cursor position tracking → Native Pointer Events
Movement calculation     → requestAnimationFrame
Complex sequences        → GSAP only where necessary
Text reaction            → Pretext
Visual appearance        → CSS
```

For continuous cursor tracking, prefer `requestAnimationFrame` with interpolation rather than creating a new GSAP tween on every `pointermove` event.

Example movement concept:

```typescript
currentX += (targetX - currentX) * 0.12;
currentY += (targetY - currentY) * 0.12;
```

Each body segment follows the segment before it:

```text
Cursor
   ↓
 Head
   ↓ delayed
 Segment 1
   ↓ delayed
 Segment 2
   ↓ delayed
 Segment 3
   ↓ delayed
 Tail
```

### Device Rules

Enable the full cursor serpent only when:

```css
@media (hover: hover) and (pointer: fine) {
    /* Full serpent experience */
}
```

This generally targets devices with a precise mouse or trackpad pointer.

Do not enable the continuous cursor-following serpent on touch-only devices.

```text
Desktop with mouse       → Full serpent
Laptop with trackpad     → Full or reduced serpent
Tablet with touch        → Disabled
Mobile                   → Disabled
Reduced-motion enabled   → Disabled or static
Low-performance device   → Simplified or disabled
```

### Performance Rules

The serpent must:

* Use one `requestAnimationFrame` loop.
* Avoid React state updates for every mouse movement.
* Store cursor coordinates in refs.
* Avoid triggering React rerenders during movement.
* Prefer SVG transforms.
* Avoid expensive blur filters during continuous movement.
* Pause when the browser tab is hidden.
* Stop animation when the component unmounts.
* Respect `prefers-reduced-motion`.
* Be dynamically loaded because it is not required for SEO or initial content.

Suggested component:

```text
src/components/effects/
└── CursorSerpent.tsx
```

The component should be client-only and dynamically loaded.

### Pretext Interaction

The serpent may interact with selected text elements.

Example:

```text
Before:

I build modern applications that solve complex problems.


Serpent approaches:

I build modern         🐍
applications that       ╲
solve complex problems.  ╲


Text reacts:

I build modern       ╭────🐍
applications         │
that solve complex   ╰──────
problems.
```

Only selected decorative paragraphs should react to the serpent. Long project descriptions and essential content should not continuously reflow because that could hurt readability and performance.

### Visual Design

The serpent should match the magical diary aesthetic:

```text
Style:
Ancient hand-drawn ink illustration

Primary color:
Dark faded ink

Secondary details:
Subtle deep green or aged gold accents

Body:
Thin, elegant and slightly irregular

Eyes:
Very subtle magical glow

Movement:
Smooth, delayed and organic
```

Avoid making the serpent look like a realistic 3D animal or a bright game character. It should appear as if an illustration from the diary has come alive.

### Final Animation Ownership

```text
Pointer tracking
    → Native Pointer Events

Continuous body movement
    → requestAnimationFrame + interpolation

SVG rendering
    → React SVG component

Special entrance/exit sequences
    → GSAP

Nearby text reaction
    → Pretext

Appearance and subtle effects
    → CSS
```

The cursor serpent is a decorative enhancement and must never be required for navigation or accessing portfolio content.
