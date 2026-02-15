"use client";

import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";

interface RiskMeterProps {
  score: number;
  size?: "sm" | "lg";
}

export function RiskMeter({ score, size = "lg" }: RiskMeterProps) {
  const { t } = useI18n();

  const getColor = (s: number) => {
    if (s <= 30)
      return { text: "text-cyber-green", label: t("risk.safe") };
    if (s <= 60)
      return { text: "text-cyber-yellow", label: t("risk.suspicious") };
    return { text: "text-cyber-red", label: t("risk.dangerous") };
  };

  const config = getColor(score);
  const isLarge = size === "lg";

  return (
    <div className={`flex flex-col items-center gap-4 ${isLarge ? "" : "scale-75"}`}>
      {/* Circular gauge */}
      <div className="relative h-36 w-36 sm:h-44 sm:w-44">
        <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
          <circle
            cx="60"
            cy="60"
            r="50"
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            className="text-cyber-border"
            strokeDasharray="314"
            strokeLinecap="round"
          />
          <motion.circle
            cx="60"
            cy="60"
            r="50"
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            className={config.text}
            strokeDasharray="314"
            strokeLinecap="round"
            initial={{ strokeDashoffset: 314 }}
            animate={{ strokeDashoffset: 314 - (314 * score) / 100 }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span
            className={`text-4xl font-black sm:text-5xl ${config.text}`}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, type: "spring" }}
          >
            {score}
          </motion.span>
          <span className="text-xs text-cyber-text-dim sm:text-sm">/ 100</span>
        </div>
      </div>

      {/* Label */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className={`rounded-full px-5 py-1.5 text-sm font-bold sm:px-6 sm:py-2 ${config.text} ${
          score > 60
            ? "bg-cyber-red-dim"
            : score > 30
            ? "bg-cyber-yellow-dim"
            : "bg-cyber-green-dim"
        }`}
      >
        {config.label}
      </motion.div>
    </div>
  );
}
