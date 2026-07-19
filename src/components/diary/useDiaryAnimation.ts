"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import {
  animateBookEntrance,
  animateBookOpening,
  animatePageFlip,
  animateBookClosing,
} from "./animations";
import { DiaryPhase } from "./useDiaryMachine";

interface UseDiaryAnimationProps {
  phase: DiaryPhase;
  transitionTo: (next: DiaryPhase) => void;
  bookRef: React.RefObject<HTMLDivElement | null>;
  coverLeftRef: React.RefObject<HTMLDivElement | null>;
  lockRef: React.RefObject<HTMLDivElement | null>;
  leftPageRef: React.RefObject<HTMLDivElement | null>;
  rightPageRef: React.RefObject<HTMLDivElement | null>;
  flippingPageRef: React.RefObject<HTMLDivElement | null>;
  onCloseComplete: () => void;
  isFlipping: boolean;
  setIsFlipping: (val: boolean) => void;
  flipDirection: "forward" | "backward" | null;
}

export function useDiaryAnimation({
  phase,
  transitionTo,
  bookRef,
  coverLeftRef,
  lockRef,
  leftPageRef,
  rightPageRef,
  flippingPageRef,
  onCloseComplete,
  isFlipping,
  setIsFlipping,
  flipDirection,
}: UseDiaryAnimationProps) {
  const currentTimelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    // Kill any active timeline to avoid overlaps
    if (currentTimelineRef.current) {
      currentTimelineRef.current.kill();
      currentTimelineRef.current = null;
    }

    const book = bookRef.current;
    const coverLeft = coverLeftRef.current;
    const lock = lockRef.current;
    const leftPage = leftPageRef.current;
    const rightPage = rightPageRef.current;

    if (!book) return;

    switch (phase) {
      case "appearing": {
        // Set closed states on covers and pages so it flies in closed!
        if (coverLeft) {
          gsap.set(coverLeft, { rotateY: 180 });
        }
        if (leftPage) {
          gsap.set(leftPage, { rotateY: 180 });
        }
        if (rightPage) {
          gsap.set(rightPage, { rotateY: 0 });
        }
        if (lock) {
          gsap.set(lock, { rotateY: 0 });
        }

        // Play book flight in
        currentTimelineRef.current = animateBookEntrance(book, () => {
          transitionTo("landing");
        });
        break;
      }

      case "landing": {
        // Landing compression & dust puff trigger
        const tl = gsap.timeline({
          onComplete: () => {
            transitionTo("opening");
          },
        });
        currentTimelineRef.current = tl;

        // Compression bounce
        tl.to(book, {
          y: 8,
          scaleY: 0.96,
          scaleX: 1.02,
          rotationX: 8,
          duration: 0.25,
          ease: "power2.out",
        })
        .to(book, {
          y: 0,
          scaleY: 1,
          scaleX: 1,
          rotationX: 12,
          duration: 0.45,
          ease: "elastic.out(1, 0.6)",
        });
        break;
      }

      case "opening": {
        if (!coverLeft) {
          transitionTo("writing");
          return;
        }

        const pages = [leftPage, rightPage].filter(Boolean) as HTMLElement[];
        currentTimelineRef.current = animateBookOpening(coverLeft, lock, pages, () => {
          transitionTo("writing");
        });
        break;
      }

      case "page_turn": {
        const flipPage = flippingPageRef.current;
        if (!flipPage) {
          setIsFlipping(false);
          transitionTo(flipDirection === "forward" ? "answer" : "waiting");
          return;
        }

        // Play 3D flip animation
        currentTimelineRef.current = animatePageFlip(
          flipPage,
          flipDirection === "forward",
          () => {
            setIsFlipping(false);
            transitionTo(flipDirection === "forward" ? "answer" : "waiting");
          }
        );
        break;
      }

      case "closing": {
        const pages = [leftPage, rightPage].filter(Boolean) as HTMLElement[];
        currentTimelineRef.current = animateBookClosing(book, coverLeft!, lock, pages, () => {
          onCloseComplete();
          transitionTo("closed");
        });
        break;
      }

      default:
        break;
    }
  }, [phase, transitionTo, bookRef, coverLeftRef, lockRef, leftPageRef, rightPageRef, flippingPageRef, isFlipping, flipDirection, setIsFlipping, onCloseComplete]);

  // Idle page movement / breathing effect when waiting
  useEffect(() => {
    if (phase !== "waiting" && phase !== "answer") return;

    const book = bookRef.current;
    if (!book) return;

    // Add breathing class to start CSS keyframe animations
    book.classList.add("breathing");

    return () => {
      book.classList.remove("breathing");
    };
  }, [phase, bookRef]);
}
