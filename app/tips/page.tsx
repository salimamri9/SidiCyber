"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  Lock,
  Link2,
  ShieldCheck,
  Wifi,
  Users,
  Eye,
  Lightbulb,
  ChevronDown,
  Sparkles,
} from "lucide-react";
import { useI18n } from "@/lib/i18n";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function TipsPage() {
  const { t } = useI18n();
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const tips = [
    {
      icon: Lock,
      title: t("tips.passwords"),
      description: t("tips.passwordsDesc"),
      protip: t("tips.passwordsTip"),
      color: "text-cyber-cyan",
      bg: "bg-cyber-cyan/10",
      border: "border-cyber-cyan/30",
      iconBg: "bg-cyber-cyan/20",
    },
    {
      icon: Link2,
      title: t("tips.links"),
      description: t("tips.linksDesc"),
      protip: t("tips.linksTip"),
      color: "text-cyber-red",
      bg: "bg-cyber-red/10",
      border: "border-cyber-red/30",
      iconBg: "bg-cyber-red/20",
    },
    {
      icon: ShieldCheck,
      title: t("tips.twoFactor"),
      description: t("tips.twoFactorDesc"),
      protip: t("tips.twoFactorTip"),
      color: "text-cyber-green",
      bg: "bg-cyber-green/10",
      border: "border-cyber-green/30",
      iconBg: "bg-cyber-green/20",
    },
    {
      icon: Wifi,
      title: t("tips.wifi"),
      description: t("tips.wifiDesc"),
      protip: t("tips.wifiTip"),
      color: "text-cyber-yellow",
      bg: "bg-cyber-yellow/10",
      border: "border-cyber-yellow/30",
      iconBg: "bg-cyber-yellow/20",
    },
    {
      icon: Users,
      title: t("tips.socialEng"),
      description: t("tips.socialEngDesc"),
      protip: t("tips.socialEngTip"),
      color: "text-cyber-purple",
      bg: "bg-cyber-purple/10",
      border: "border-cyber-purple/30",
      iconBg: "bg-cyber-purple/20",
    },
    {
      icon: Eye,
      title: t("tips.privacy"),
      description: t("tips.privacyDesc"),
      protip: t("tips.privacyTip"),
      color: "text-cyber-cyan",
      bg: "bg-cyber-cyan/10",
      border: "border-cyber-cyan/30",
      iconBg: "bg-cyber-cyan/20",
    },
  ];

  return (
    <div className="cyber-grid flex flex-1 flex-col items-center px-5 py-10 sm:px-8 sm:py-16">
      <div className="my-auto w-full max-w-3xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center sm:mb-16"
        >
          <div className="mx-auto mb-6 inline-flex rounded-full border border-cyber-green/20 bg-cyber-green/10 p-5 sm:p-6">
            <BookOpen className="h-8 w-8 text-cyber-green sm:h-9 sm:w-9" />
          </div>
          <h1 className="mb-4 text-2xl font-black sm:text-3xl">
            {t("tips.title")}
          </h1>
          <p className="text-sm text-cyber-text-dim sm:text-base">
            {t("tips.subtitle")}
          </p>
        </motion.div>

        {/* Tips accordion */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="space-y-4 sm:space-y-5"
        >
          {tips.map((tip, index) => {
            const isExpanded = expandedIndex === index;
            return (
              <motion.div key={tip.title} variants={item}>
                <div
                  className={`overflow-hidden rounded-2xl border transition-all ${
                    isExpanded ? tip.border : "border-cyber-border"
                  } bg-cyber-card`}
                >
                  {/* Accordion header */}
                  <button
                    onClick={() =>
                      setExpandedIndex(isExpanded ? null : index)
                    }
                    className="flex w-full items-center gap-4 p-6 text-start transition-colors hover:bg-white/[0.02] sm:gap-5 sm:p-8"
                  >
                    <div
                      className={`shrink-0 rounded-xl ${tip.iconBg} p-3`}
                    >
                      <tip.icon
                        className={`h-6 w-6 ${tip.color}`}
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-base font-bold sm:text-lg">
                        {tip.title}
                      </h3>
                      {!isExpanded && (
                        <p className="mt-1 line-clamp-1 text-xs text-cyber-text-dim sm:text-sm">
                          {tip.description}
                        </p>
                      )}
                    </div>
                    <ChevronDown
                      className={`h-5 w-5 shrink-0 text-cyber-text-dim transition-transform ${
                        isExpanded ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {/* Accordion content */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="border-t border-cyber-border px-6 pb-6 pt-5 sm:px-8 sm:pb-8 sm:pt-6">
                          <p className="mb-6 text-sm leading-relaxed text-cyber-text-dim sm:text-base">
                            {tip.description}
                          </p>

                          {/* Pro tip */}
                          <div
                            className={`rounded-xl ${tip.bg} border ${tip.border} p-5 sm:p-6`}
                          >
                            <div className="mb-2 flex items-center gap-2">
                              <Lightbulb
                                className={`h-4 w-4 ${tip.color}`}
                              />
                              <span
                                className={`text-xs font-bold ${tip.color} sm:text-sm`}
                              >
                                {t("tips.protip")}
                              </span>
                            </div>
                            <p className="text-xs text-cyber-text-dim sm:text-sm">
                              {tip.protip}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-12 rounded-2xl border border-cyber-green/20 bg-cyber-green/5 p-8 text-center sm:mt-16 sm:p-10"
        >
          <Sparkles className="mx-auto mb-4 h-8 w-8 text-cyber-green" />
          <h3 className="mb-3 text-lg font-bold sm:text-xl">
            {t("tips.learnMore")}
          </h3>
          <p className="mb-6 text-sm text-cyber-text-dim">
            {t("tips.ctaDesc")}
          </p>
          <Link
            href="/simulator"
            className="inline-flex items-center gap-2 rounded-xl bg-cyber-green px-6 py-3 font-bold text-cyber-darker transition hover:bg-cyber-green/80"
          >
            {t("hero.cta")}
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
