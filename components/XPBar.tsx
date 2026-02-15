"use client";

import { Shield, Star, Award, Crown } from "lucide-react";
import { useGame, type Rank } from "@/lib/game";
import { useI18n } from "@/lib/i18n";

const rankConfig: Record<Rank, { icon: typeof Shield; color: string; bg: string }> = {
  rookie: { icon: Shield, color: "text-cyber-text-dim", bg: "bg-cyber-border/30" },
  agent: { icon: Star, color: "text-cyber-cyan", bg: "bg-cyber-cyan/10" },
  expert: { icon: Award, color: "text-cyber-green", bg: "bg-cyber-green/10" },
  elite: { icon: Crown, color: "text-cyber-purple", bg: "bg-cyber-purple/10" },
};

const rankBarColor: Record<Rank, string> = {
  rookie: "bg-cyber-text-dim",
  agent: "bg-cyber-cyan",
  expert: "bg-cyber-green",
  elite: "bg-cyber-purple",
};

export function XPBar() {
  const { totalXP, rank, rankProgress } = useGame();
  const { t } = useI18n();

  const config = rankConfig[rank];
  const Icon = config.icon;
  const rankLabel = t(`game.${rank}`);

  return (
    <>
      {/* Desktop: full badge + progress bar */}
      <div className="hidden items-center gap-4 md:flex lg:gap-6">
        <div className={`flex items-center gap-2 rounded-lg ${config.bg} px-3 py-1.5`}>
          <Icon className={`h-3.5 w-3.5 ${config.color}`} />
          <span className={`text-xs font-bold ${config.color}`}>{rankLabel}</span>
        </div>
        <div className="flex items-center gap-4 lg:gap-5">
          <span className="text-xs font-semibold text-cyber-text-dim tabular-nums">
            {totalXP} XP
          </span>
          <div className="h-1.5 w-20 overflow-hidden rounded-full bg-cyber-border/50">
            <div
              className={`h-full rounded-full ${rankBarColor[rank]} shadow-[0_0_8px_rgba(var(--cyber-cyan-rgb),0.5)] transition-all duration-500`}
              style={{ width: `${rankProgress * 100}%` }}
            />
          </div>
        </div>
      </div>
      {/* Mobile: compact icon + XP number */}
      <div className="flex items-center gap-1.5 md:hidden">
        <div className={`flex items-center gap-1 rounded-md ${config.bg} px-2 py-1`}>
          <Icon className={`h-3 w-3 ${config.color}`} />
          <span className={`text-[10px] font-bold ${config.color}`}>{totalXP}</span>
        </div>
      </div>
    </>
  );
}
