"use client";

import React, { useEffect, useRef } from "react";

/**
 * CursorSerpent
 *
 * Performance strategy:
 * - 56 SVG segments instead of 120.
 * - No React state updates during animation.
 * - requestAnimationFrame stops completely when idle and fully faded out.
 * - Path-history body movement instead of running interpolation + rigid
 *   constraints on every body segment.
 * - Delta-time-independent head interpolation.
 * - Disabled for touch-only devices and prefers-reduced-motion users.
 * - DOM writes are limited to transforms and container opacity.
 */

const SEGMENT_COUNT = 56;

/**
 * Distance, in pixels, between consecutive body samples.
 * Smaller = denser/smoother snake.
 * Larger = longer snake with fewer elements.
 */
const SEGMENT_SPACING = 7;

/**
 * Maximum distance between recorded path-history points.
 * Keeping this below SEGMENT_SPACING makes path sampling smooth.
 */
const PATH_POINT_DISTANCE = 1.5;

/**
 * Keep enough history to cover the entire snake, plus extra room
 * for fast movement and interpolation.
 */
const MAX_PATH_LENGTH =
  SEGMENT_COUNT * SEGMENT_SPACING + 100;

/**
 * Distance between the actual cursor and serpent head.
 */
const CURSOR_OFFSET = 24;

/**
 * Seconds before the serpent begins fading out.
 */
const IDLE_TIMEOUT = 3;

/**
 * Fade speeds are expressed per second and therefore behave
 * consistently across different refresh rates.
 */
const FADE_IN_SPEED = 8;
const FADE_OUT_SPEED = 5;

/**
 * Head responsiveness.
 *
 * Higher = follows cursor more aggressively.
 * Lower = more delayed / fluid.
 */
const HEAD_FOLLOW_SPEED = 10;

/**
 * Clamp frame delta so returning from a background tab
 * cannot cause a giant simulation jump.
 */
const MAX_DELTA_TIME = 1 / 20;

type Point = {
  x: number;
  y: number;
};

type SegmentPosition = {
  x: number;
  y: number;
  angle: number;
};

export default function CursorSerpent() {
  const containerRef = useRef<HTMLDivElement>(null);

  /**
   * Direct references to individual SVG segment groups.
   * We mutate transforms directly instead of triggering React renders.
   */
  const segmentsRef = useRef<(SVGGElement | null)[]>([]);

  /**
   * Current pointer target.
   */
  const pointerRef = useRef<Point>({
    x: 0,
    y: 0,
  });

  /**
   * Smoothed head position.
   */
  const headRef = useRef<Point>({
    x: 0,
    y: 0,
  });

  /**
   * Previous head angle is preserved while almost stationary
   * to prevent rotation jitter.
   */
  const headAngleRef = useRef(0);

  /**
   * History of actual head movement.
   *
   * Index 0 is always the newest point.
   * Body segments sample progressively older distances from this path.
   */
  const pathHistoryRef = useRef<Point[]>([]);

  /**
   * Final calculated positions of every rendered segment.
   */
  const positionsRef = useRef<SegmentPosition[]>(
    Array.from({ length: SEGMENT_COUNT }, () => ({
      x: 0,
      y: 0,
      angle: 0,
    }))
  );

  /**
   * Animation lifecycle refs.
   */
  const animationFrameRef = useRef<number | null>(null);
  const lastFrameTimeRef = useRef(0);
  const lastInteractionTimeRef = useRef(0);

  /**
   * Visual opacity.
   */
  const opacityRef = useRef(0);

  /**
   * Prevent multiple RAF loops from starting simultaneously.
   */
  const isAnimatingRef = useRef(false);

  useEffect(() => {
    const finePointerQuery = window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    );

    const reducedMotionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    /**
     * Don't initialize this decorative animation for:
     * - touch-only devices
     * - users requesting reduced motion
     */
    if (!finePointerQuery.matches || reducedMotionQuery.matches) {
      return;
    }

    const initialX = window.innerWidth / 2;
    const initialY = window.innerHeight / 2;

    pointerRef.current = {
      x: initialX,
      y: initialY,
    };

    headRef.current = {
      x: initialX,
      y: initialY,
    };

    positionsRef.current.forEach((position) => {
      position.x = initialX;
      position.y = initialY;
      position.angle = 0;
    });

    /**
     * Fill initial history so the entire snake begins collapsed
     * at the same point rather than stretching across the screen.
     */
    pathHistoryRef.current = [
      {
        x: initialX,
        y: initialY,
      },
    ];

    /**
     * Samples a position at a specific traveled distance
     * along the recorded head path.
     */
    const samplePathAtDistance = (
      targetDistance: number
    ): Point => {
      const history = pathHistoryRef.current;

      if (history.length === 0) {
        return {
          x: headRef.current.x,
          y: headRef.current.y,
        };
      }

      if (targetDistance <= 0) {
        return history[0];
      }

      let accumulatedDistance = 0;

      for (let i = 0; i < history.length - 1; i++) {
        const current = history[i];
        const next = history[i + 1];

        const dx = next.x - current.x;
        const dy = next.y - current.y;

        const segmentDistance = Math.hypot(dx, dy);

        if (
          accumulatedDistance + segmentDistance >=
          targetDistance
        ) {
          const remainingDistance =
            targetDistance - accumulatedDistance;

          const t =
            segmentDistance > 0
              ? remainingDistance / segmentDistance
              : 0;

          return {
            x: current.x + dx * t,
            y: current.y + dy * t,
          };
        }

        accumulatedDistance += segmentDistance;
      }

      /**
       * Requested distance exceeds available path.
       * Use oldest recorded point.
       */
      return history[history.length - 1];
    };

    /**
     * Remove old path points after enough traveled distance
     * has been retained for the complete snake.
     */
    const trimPathHistory = () => {
      const history = pathHistoryRef.current;

      let totalDistance = 0;

      for (let i = 0; i < history.length - 1; i++) {
        const current = history[i];
        const next = history[i + 1];

        totalDistance += Math.hypot(
          next.x - current.x,
          next.y - current.y
        );

        if (totalDistance > MAX_PATH_LENGTH) {
          history.length = i + 2;
          return;
        }
      }
    };

    /**
     * Add the current head position to path history only after
     * it has moved enough. This prevents thousands of almost
     * identical coordinates from accumulating.
     */
    const recordHeadPosition = () => {
      const history = pathHistoryRef.current;
      const head = headRef.current;

      const latest = history[0];

      if (!latest) {
        history.unshift({
          x: head.x,
          y: head.y,
        });

        return;
      }

      const dx = head.x - latest.x;
      const dy = head.y - latest.y;

      const distance = Math.hypot(dx, dy);

      if (distance >= PATH_POINT_DISTANCE) {
        history.unshift({
          x: head.x,
          y: head.y,
        });

        trimPathHistory();
      } else {
        /**
         * Keep newest point exactly aligned with the head.
         * This makes the neck respond immediately without creating
         * unnecessary history entries.
         */
        latest.x = head.x;
        latest.y = head.y;
      }
    };

    /**
     * Calculate the target head point behind the cursor.
     *
     * Direction is calculated from the current head toward the pointer.
     * The offset prevents the snake from covering the actual cursor.
     */
    const getOffsetHeadTarget = (): Point => {
      const head = headRef.current;
      const pointer = pointerRef.current;

      const dx = pointer.x - head.x;
      const dy = pointer.y - head.y;

      const distance = Math.hypot(dx, dy);

      if (distance > 0.1) {
        const angle = Math.atan2(dy, dx);

        headAngleRef.current = angle;

        return {
          x: pointer.x - Math.cos(angle) * CURSOR_OFFSET,
          y: pointer.y - Math.sin(angle) * CURSOR_OFFSET,
        };
      }

      return {
        x: pointer.x -
          Math.cos(headAngleRef.current) * CURSOR_OFFSET,

        y: pointer.y -
          Math.sin(headAngleRef.current) * CURSOR_OFFSET,
      };
    };

    const updateBodyPositions = (deltaTime: number) => {
      const positions = positionsRef.current;

      /**
       * Head is always segment 0.
       */
      positions[0].x = headRef.current.x;
      positions[0].y = headRef.current.y;
      positions[0].angle = headAngleRef.current;

      for (let i = 1; i < SEGMENT_COUNT; i++) {
        const distanceBehindHead =
          i * SEGMENT_SPACING;

        const sampledPoint = samplePathAtDistance(
          distanceBehindHead
        );

        const previous = positions[i - 1];
        const current = positions[i];

        current.x = sampledPoint.x;
        current.y = sampledPoint.y;

        const dx = previous.x - current.x;
        const dy = previous.y - current.y;

        if (Math.abs(dx) > 0.01 || Math.abs(dy) > 0.01) {
          const targetAngle = Math.atan2(dy, dx);
          let diff = targetAngle - current.angle;
          while (diff < -Math.PI) diff += Math.PI * 2;
          while (diff > Math.PI) diff -= Math.PI * 2;

          // Smooth angle tracking speed (rad/sec)
          const angleFollowSpeed = 12.0;
          const angleFactor = 1 - Math.exp(-angleFollowSpeed * deltaTime);
          current.angle += diff * angleFactor;
        } else {
          current.angle = previous.angle;
        }
      }
    };

    /**
     * Apply calculated transforms directly to SVG elements.
     *
     * No React state updates.
     * No component rerender.
     */
    const renderSegments = () => {
      const positions = positionsRef.current;

      for (let i = 0; i < SEGMENT_COUNT; i++) {
        const element = segmentsRef.current[i];

        if (!element) continue;

        const position = positions[i];

        const angleDegrees =
          position.angle * (180 / Math.PI);

        element.setAttribute(
          "transform",
          `translate(${position.x.toFixed(2)} ${position.y.toFixed(
            2
          )}) rotate(${angleDegrees.toFixed(2)})`
        );
      }
    };

    /**
     * Main animation loop.
     *
     * Important:
     * This loop completely stops once the serpent has faded out.
     */
    const animate = (timestamp: number) => {
      if (!isAnimatingRef.current) return;

      if (lastFrameTimeRef.current === 0) {
        lastFrameTimeRef.current = timestamp;
      }

      const rawDelta =
        (timestamp - lastFrameTimeRef.current) / 1000;

      const deltaTime = Math.min(
        rawDelta,
        MAX_DELTA_TIME
      );

      lastFrameTimeRef.current = timestamp;

      const idleDuration =
        (timestamp - lastInteractionTimeRef.current) / 1000;

      const isIdle = idleDuration >= IDLE_TIMEOUT;

      /**
       * Delta-time-independent opacity.
       */
      const targetOpacity = isIdle ? 0 : 1;

      const fadeSpeed = isIdle
        ? FADE_OUT_SPEED
        : FADE_IN_SPEED;

      const fadeFactor =
        1 - Math.exp(-fadeSpeed * deltaTime);

      opacityRef.current +=
        (targetOpacity - opacityRef.current) *
        fadeFactor;

      const container = containerRef.current;

      if (container) {
        container.style.opacity =
          opacityRef.current.toFixed(3);
      }

      /**
       * Once completely faded out, stop all work.
       */
      if (isIdle && opacityRef.current < 0.01) {
        opacityRef.current = 0;

        if (container) {
          container.style.opacity = "0";
        }

        isAnimatingRef.current = false;
        animationFrameRef.current = null;
        lastFrameTimeRef.current = 0;

        return;
      }

      /**
       * Update movement only while visible/fading.
       */
      const target = getOffsetHeadTarget();
      const head = headRef.current;

      /**
       * Exponential smoothing gives consistent behavior across
       * 60 Hz, 120 Hz, and 144 Hz displays.
       */
      const followFactor =
        1 - Math.exp(-HEAD_FOLLOW_SPEED * deltaTime);

      const previousHeadX = head.x;
      const previousHeadY = head.y;

      head.x +=
        (target.x - head.x) * followFactor;

      head.y +=
        (target.y - head.y) * followFactor;

      const movementX = head.x - previousHeadX;
      const movementY = head.y - previousHeadY;

      if (
        Math.abs(movementX) > 0.01 ||
        Math.abs(movementY) > 0.01
      ) {
        headAngleRef.current = Math.atan2(
          movementY,
          movementX
        );
      }

      recordHeadPosition();
      updateBodyPositions(deltaTime);
      renderSegments();

      if (typeof window !== "undefined") {
        (window as any).__serpentPositions = positionsRef.current;
        (window as any).__serpentOpacity = opacityRef.current;
      }

      animationFrameRef.current =
        requestAnimationFrame(animate);
    };

    /**
     * Start animation only if not already running.
     */
    const startAnimation = () => {
      if (isAnimatingRef.current) return;

      isAnimatingRef.current = true;
      lastFrameTimeRef.current = 0;

      animationFrameRef.current =
        requestAnimationFrame(animate);
    };

    const handlePointerMove = (event: PointerEvent) => {
      pointerRef.current.x = event.clientX;
      pointerRef.current.y = event.clientY;

      /**
       * performance.now() uses the same time origin as RAF timestamps.
       */
      lastInteractionTimeRef.current = performance.now();

      startAnimation();
    };

    /**
     * Prevent stale timing after switching browser tabs.
     */
    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (animationFrameRef.current !== null) {
          cancelAnimationFrame(animationFrameRef.current);
        }

        animationFrameRef.current = null;
        isAnimatingRef.current = false;
        lastFrameTimeRef.current = 0;

        return;
      }

      /**
       * Do not automatically restart.
       * Wait until the user actually moves the pointer.
       */
    };

    window.addEventListener(
      "pointermove",
      handlePointerMove,
      { passive: true }
    );

    document.addEventListener(
      "visibilitychange",
      handleVisibilityChange
    );

    return () => {
      window.removeEventListener(
        "pointermove",
        handlePointerMove
      );

      document.removeEventListener(
        "visibilitychange",
        handleVisibilityChange
      );

      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      animationFrameRef.current = null;
      isAnimatingRef.current = false;

      if (typeof window !== "undefined") {
        (window as any).__serpentOpacity = 0;
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="hidden lg:block fixed inset-0 pointer-events-none z-999"
      style={{
        opacity: 0,
        contain: "strict",
      }}
    >
      <svg
        className="h-full w-full"
        width="100%"
        height="100%"
        aria-hidden="true"
      >
        {/* Render tail first so the head naturally appears above it. */}
        {Array.from({
          length: SEGMENT_COUNT - 1,
        }).map((_, iteration) => {
          const index =
            SEGMENT_COUNT - 1 - iteration;

          const neckEnd = Math.max(
            2,
            Math.floor(SEGMENT_COUNT * 0.12)
          );

          const bodyEnd = Math.floor(
            SEGMENT_COUNT * 0.65
          );

          let scale: number;

          if (index < neckEnd) {
            /**
             * Neck gradually narrows away from head.
             */
            const t = index / neckEnd;

            scale = 1.02 - t * 0.1;
          } else if (index < bodyEnd) {
            /**
             * Mid-body becomes slightly thicker before tapering.
             */
            const t =
              (index - neckEnd) /
              (bodyEnd - neckEnd);

            scale =
              0.92 +
              Math.sin(t * Math.PI) * 0.14 -
              t * 0.25;
          } else {
            /**
             * Progressive biological tail taper.
             */
            const t =
              (index - bodyEnd) /
              (SEGMENT_COUNT - 1 - bodyEnd);

            scale =
              0.62 *
                Math.pow(Math.max(0, 1 - t), 1.4) +
              0.07;
          }

          const isTailTip =
            index === SEGMENT_COUNT - 1;

          return (
            <g
              key={index}
              ref={(element) => {
                segmentsRef.current[index] = element;
              }}
            >
              <g transform={`scale(${scale.toFixed(4)})`}>
                {isTailTip ? (
                  <path
                    d="
                      M -14,1.5
                      C -8,1 -4,0.5 4,0
                      Q 12,-1 18,-2.5
                    "
                    fill="none"
                    stroke="var(--ink)"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                  />
                ) : (
                  <g className="serpent-segment-animate">
                    <ellipse
                      cx="0"
                      cy="0"
                      rx="13"
                      ry="9.5"
                      fill="none"
                      stroke="var(--ink)"
                      strokeWidth="1.3"
                    />

                    {/* Scale cross-hatching */}
                    <path
                      d="
                        M -13,-3 C -6,-1 6,1 13,3
                        M -13,3 C -6,1 6,-1 13,-3
                        M -7,-8 C -3,-3 -3,3 -7,8
                        M 7,-8 C 3,-3 3,3 7,8
                      "
                      fill="none"
                      stroke="var(--ink-faded)"
                      strokeWidth="0.8"
                      opacity="0.55"
                    />

                    {/* Gold scale accents */}
                    <path
                      d="
                        M -3,-3 L 0,-1 L 3,-3
                        M -3,3 L 0,1 L 3,3
                      "
                      fill="none"
                      stroke="var(--gold)"
                      strokeWidth="0.8"
                      opacity="0.45"
                    />
                  </g>
                )}
              </g>
            </g>
          );
        })}

        {/* Head — rendered last so it stays above the body. */}
        <g
          ref={(element) => {
            segmentsRef.current[0] = element;
          }}
        >
          <g transform="scale(1.15)">
            <g className="serpent-segment-animate">
              {/* Outer head silhouette */}
              <path
                d="
                  M -13,0
                  C -12,-5 -8,-8 -3,-8
                  C 3,-8 10,-6 16,-1
                  L 18,0
                  L 16,1
                  C 10,6 3,8 -3,8
                  C -8,8 -12,5 -13,0
                  Z
                "
                fill="none"
                stroke="var(--ink)"
                strokeWidth="1.5"
                strokeLinecap="round"
              />

              {/* Head plate divisions */}
              <path
                d="
                  M -8,-6 C -6,-3 -6,3 -8,6
                  M -8,-3 C -4,-1 4,1 8,3
                  M -8,3 C -4,1 4,-1 8,-3
                "
                fill="none"
                stroke="var(--ink-faded)"
                strokeWidth="0.8"
                opacity="0.8"
              />

              <path
                d="
                  M -6,0 L 0,-4 L 6,0 L 0,4 Z
                  M 0,-4 L 0,4
                  M 6,0 L 12,0
                "
                fill="none"
                stroke="var(--ink)"
                strokeWidth="0.9"
                opacity="0.75"
              />

              {/* Vintage stippling */}
              <circle
                cx="-10"
                cy="-2"
                r="0.5"
                fill="var(--ink)"
                opacity="0.6"
              />

              <circle
                cx="-9"
                cy="3"
                r="0.4"
                fill="var(--ink)"
                opacity="0.6"
              />

              <circle
                cx="-4"
                cy="-4"
                r="0.5"
                fill="var(--ink)"
                opacity="0.5"
              />

              <circle
                cx="-2"
                cy="4"
                r="0.4"
                fill="var(--ink)"
                opacity="0.5"
              />

              <circle
                cx="4"
                cy="-5"
                r="0.5"
                fill="var(--ink)"
                opacity="0.7"
              />

              <circle
                cx="5"
                cy="5"
                r="0.4"
                fill="var(--ink)"
                opacity="0.7"
              />

              <circle
                cx="11"
                cy="-2"
                r="0.4"
                fill="var(--ink)"
                opacity="0.6"
              />

              <circle
                cx="12"
                cy="2"
                r="0.5"
                fill="var(--ink)"
                opacity="0.6"
              />

              {/* Forked tongue */}
              <path
                d="
                  M 18,0 L 23,0
                  M 23,0 C 25,-1.2 27,-2.2 30,-2.6
                  M 23,0 C 25,1.2 27,2.2 30,2.6
                "
                fill="none"
                stroke="var(--ink)"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
            </g>

            {/* Eyes */}
            <circle
              cx="3"
              cy="-3"
              r="1.3"
              fill="var(--gold)"
              className="serpent-glow"
            />

            <circle
              cx="3"
              cy="3"
              r="1.3"
              fill="var(--gold)"
              className="serpent-glow"
            />
          </g>
        </g>
      </svg>
    </div>
  );
}