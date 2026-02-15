"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Shield, Star, Award, Crown, RotateCcw, Zap, Target, Flame, Trophy } from "lucide-react";
import { useGame, type Rank } from "@/lib/game";
import { useI18n } from "@/lib/i18n";
import { ConfettiBurst } from "./ConfettiBurst";

interface GameResultsProps {
  sessionXP: number;
  correctCount: number;
  totalCount: number;
  bestStreak: number;
  onRestart: () => void;
  mode: "simulator" | "legal";
}

const rankIcons: Record<Rank, typeof Shield> = {
  rookie: Shield,
  agent: Star,
  expert: Award,
  elite: Crown,
};

const rankColors: Record<Rank, string> = {
  rookie: "text-cyber-text-dim border-cyber-border",
  agent: "text-cyber-cyan border-cyber-cyan/40",
  expert: "text-cyber-green border-cyber-green/40",
  elite: "text-cyber-purple border-cyber-purple/40",
};

function AnimatedNumber({ value, duration = 1.5 }: { value: number; duration?: number }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const start = Date.now();
    const end = start + duration * 1000;

    function tick() {
      const now = Date.now();
      const progress = Math.min((now - start) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * value));

      if (now < end) requestAnimationFrame(tick);
    }

    tick();
  }, [value, duration]);

  return <>{display}</>;
}

export function GameResults({
  sessionXP,
  correctCount,
  totalCount,
  bestStreak,
  onRestart,
  mode,
}: GameResultsProps) {
  const { totalXP, rank } = useGame();
  const { t } = useI18n();

  const accuracy = totalCount > 0 ? Math.round((correctCount / totalCount) * 100) : 0;
  const showConfetti = accuracy >= 70;

  const accentText = mode === "simulator" ? "text-cyber-cyan" : "text-cyber-purple";
  const accentIconClass = mode === "simulator" ? "text-cyber-cyan" : "text-cyber-purple";
  const buttonClass =
    mode === "simulator"
      ? "bg-cyber-cyan text-cyber-darker hover:bg-cyber-cyan/80"
      : "bg-cyber-purple text-white hover:bg-cyber-purple/80";

  const RankIcon = rankIcons[rank];
  const rankLabel = t(`game.${rank}`);

  return (
    <div className="cyber-grid flex flex-1 items-center justify-center px-5 py-10 sm:px-8 sm:py-16">
      <ConfettiBurst trigger={showConfetti} />
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-full max-w-lg"
      >
        <div className="rounded-2xl border border-cyber-border bg-cyber-card p-8 text-center sm:p-12">
          {/* Rank badge */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", bounce: 0.5 }}
            className={`mx-auto mb-6 inline-flex rounded-full border-2 p-5 ${rankColors[rank]}`}
          >
            <RankIcon className="h-10 w-10 sm:h-12 sm:w-12" />
          </motion.div>

          <h2 className="mb-1 text-2xl font-black sm:text-3xl">
            {rankLabel}
          </h2>
          <p className="mb-8 text-sm text-cyber-text-dim">
            {mode === "simulator" ? t("sim.complete") : t("legal.complete")}
          </p>

          {/* Stats grid */}
          <div className="mb-8 grid grid-cols-2 gap-4">
            <div className="rounded-xl border border-cyber-border bg-cyber-darker p-4">
              <Zap className={`mx-auto mb-2 h-5 w-5 ${accentIconClass}`} />
              <div className={`text-2xl font-black ${accentText}`}>
                <AnimatedNumber value={sessionXP} />
              </div>
              <div className="text-[11px] text-cyber-text-dim">{t("game.xpEarned")}</div>
            </div>
            <div className="rounded-xl border border-cyber-border bg-cyber-darker p-4">
              <Target className={`mx-auto mb-2 h-5 w-5 ${accentIconClass}`} />
              <div className={`text-2xl font-black ${accuracy >= 70 ? "text-cyber-green" : accuracy >= 40 ? "text-cyber-yellow" : "text-cyber-red"}`}>
                <AnimatedNumber value={accuracy} />%
              </div>
              <div className="text-[11px] text-cyber-text-dim">{t("game.accuracy")}</div>
            </div>
            <div className="rounded-xl border border-cyber-border bg-cyber-darker p-4">
              <Flame className={`mx-auto mb-2 h-5 w-5 ${accentIconClass}`} />
              <div className={`text-2xl font-black ${accentText}`}>
                <AnimatedNumber value={bestStreak} />
              </div>
              <div className="text-[11px] text-cyber-text-dim">{t("game.bestStreak")}</div>
            </div>
            <div className="rounded-xl border border-cyber-border bg-cyber-darker p-4">
              <Trophy className={`mx-auto mb-2 h-5 w-5 ${accentIconClass}`} />
              <div className={`text-2xl font-black ${accentText}`}>
                <AnimatedNumber value={totalXP} />
              </div>
              <div className="text-[11px] text-cyber-text-dim">{t("game.totalXP")}</div>
            </div>
          </div>

          <p className="mb-8 text-sm text-cyber-text-dim">
            {accuracy >= 70
              ? mode === "simulator"
                ? t("sim.excellent")
                : t("legal.excellent")
              : mode === "simulator"
                ? t("sim.needMore")
                : t("legal.needMore")}
          </p>

          <button
            onClick={onRestart}
            className={`mx-auto flex items-center gap-2 rounded-xl px-8 py-4 font-bold transition ${buttonClass}`}
          >
            <RotateCcw className="h-5 w-5" />
            {mode === "simulator" ? t("sim.restart") : t("legal.restart")}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
