"use client";

import { useState, useCallback } from "react";

export type DiaryPhase =
  | "closed"
  | "appearing"
  | "landing"
  | "opening"
  | "writing"
  | "waiting"
  | "thinking"
  | "page_turn"
  | "answer"
  | "closing";

const VALID_TRANSITIONS: Record<DiaryPhase, DiaryPhase[]> = {
  closed: ["appearing"],
  appearing: ["landing", "closed"],
  landing: ["opening", "closing", "closed"],
  opening: ["writing", "closing", "closed"],
  writing: ["waiting", "closing", "closed"],
  waiting: ["thinking", "closing", "closed"],
  thinking: ["page_turn", "waiting", "closing", "closed"],
  page_turn: ["answer", "waiting", "closing", "closed"],
  answer: ["thinking", "page_turn", "waiting", "closing", "closed"],
  closing: ["closed"],
};

export function useDiaryMachine(initialPhase: DiaryPhase = "closed") {
  const [phase, setPhase] = useState<DiaryPhase>(initialPhase);

  const canTransition = useCallback(
    (next: DiaryPhase) => {
      const allowed = VALID_TRANSITIONS[phase];
      return allowed.includes(next);
    },
    [phase]
  );

  const transitionTo = useCallback(
    (next: DiaryPhase) => {
      if (canTransition(next)) {
        setPhase(next);
        return true;
      } else {
        console.warn(`Invalid transition from ${phase} to ${next}`);
        // As a fallback to avoid getting stuck in production, set the phase anyway
        setPhase(next);
        return false;
      }
    },
    [phase, canTransition]
  );

  return { phase, transitionTo, canTransition };
}
