"use client";

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react";

export type Rank = "rookie" | "agent" | "expert" | "elite";
export type Difficulty = "easy" | "medium" | "hard";

interface GameState {
  totalXP: number;
  currentStreak: number;
  bestStreak: number;
  correctAnswers: number;
  totalAnswers: number;
  sessionXP: number;
}

interface GameContextType extends GameState {
  rank: Rank;
  xpToNextRank: number;
  xpInCurrentRank: number;
  rankProgress: number;
  addXP: (basePoints: number, speedSeconds: number, difficulty: Difficulty) => number;
  recordAnswer: (correct: boolean) => void;
  resetSession: () => void;
}

function getRank(xp: number): Rank {
  if (xp >= 600) return "elite";
  if (xp >= 300) return "expert";
  if (xp >= 100) return "agent";
  return "rookie";
}

const rankThresholds: Record<Rank, number> = {
  rookie: 0,
  agent: 100,
  expert: 300,
  elite: 600,
};

const nextRankThresholds: Record<Rank, number> = {
  rookie: 100,
  agent: 300,
  expert: 600,
  elite: 1000,
};

function getSpeedBonus(seconds: number): number {
  if (seconds < 5) return 50;
  if (seconds < 10) return 25;
  if (seconds < 15) return 12;
  return 0;
}

const difficultyMultiplier: Record<Difficulty, number> = {
  easy: 1,
  medium: 1.5,
  hard: 2,
};

const GameContext = createContext<GameContextType>({
  totalXP: 0,
  currentStreak: 0,
  bestStreak: 0,
  correctAnswers: 0,
  totalAnswers: 0,
  sessionXP: 0,
  rank: "rookie",
  xpToNextRank: 100,
  xpInCurrentRank: 0,
  rankProgress: 0,
  addXP: () => 0,
  recordAnswer: () => {},
  resetSession: () => {},
});

export function GameProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<GameState>({
    totalXP: 0,
    currentStreak: 0,
    bestStreak: 0,
    correctAnswers: 0,
    totalAnswers: 0,
    sessionXP: 0,
  });

  // Hydrate totalXP from localStorage after mount to avoid SSR mismatch
  useEffect(() => {
    const stored = localStorage.getItem("SidiCyber-xp");
    if (stored) {
      const savedXP = parseInt(stored, 10) || 0;
      if (savedXP > 0) {
        setState((prev) => ({ ...prev, totalXP: savedXP }));
      }
    }
  }, []);

  const rank = getRank(state.totalXP);
  const currentThreshold = rankThresholds[rank];
  const nextThreshold = nextRankThresholds[rank];
  const xpInCurrentRank = state.totalXP - currentThreshold;
  const xpToNextRank = nextThreshold - currentThreshold;
  const rankProgress = Math.min(xpInCurrentRank / xpToNextRank, 1);

  const addXP = useCallback((basePoints: number, speedSeconds: number, difficulty: Difficulty): number => {
    const streak = state.currentStreak;
    const speedBonus = getSpeedBonus(speedSeconds);
    const xp = Math.round(
      basePoints * difficultyMultiplier[difficulty] * (1 + streak * 0.1) + speedBonus
    );

    setState((prev) => {
      const newTotal = prev.totalXP + xp;
      if (typeof window !== "undefined") {
        localStorage.setItem("SidiCyber-xp", String(newTotal));
      }
      return {
        ...prev,
        totalXP: newTotal,
        sessionXP: prev.sessionXP + xp,
      };
    });

    return xp;
  }, [state.currentStreak]);

  const recordAnswer = useCallback((correct: boolean) => {
    setState((prev) => {
      const newStreak = correct ? prev.currentStreak + 1 : 0;
      return {
        ...prev,
        currentStreak: newStreak,
        bestStreak: Math.max(prev.bestStreak, newStreak),
        correctAnswers: prev.correctAnswers + (correct ? 1 : 0),
        totalAnswers: prev.totalAnswers + 1,
      };
    });
  }, []);

  const resetSession = useCallback(() => {
    setState((prev) => ({
      ...prev,
      sessionXP: 0,
      currentStreak: 0,
    }));
  }, []);

  return (
    <GameContext.Provider
      value={{
        ...state,
        rank,
        xpToNextRank,
        xpInCurrentRank,
        rankProgress,
        addXP,
        recordAnswer,
        resetSession,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  return useContext(GameContext);
}
