"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Shield,
  Zap,
  Search,
  Scale,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Target,
  TrendingUp,
  Award,
  Flame,
} from "lucide-react";
import { useI18n } from "@/lib/i18n";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function DashboardPage() {
  const { t, locale } = useI18n();
  const Arrow = locale === "ar" ? ChevronLeft : ChevronRight;

  const stats = [
    {
      label: t("dash.overallScore"),
      value: "\u2014",
      icon: Target,
      color: "text-cyber-cyan",
      bg: "bg-cyber-cyan/10",
      border: "border-cyber-cyan/20",
    },
    {
      label: t("dash.trainingSessions"),
      value: "0",
      icon: Flame,
      color: "text-cyber-yellow",
      bg: "bg-cyber-yellow/10",
      border: "border-cyber-yellow/20",
    },
    {
      label: t("dash.threatsDetected"),
      value: "0",
      icon: Shield,
      color: "text-cyber-red",
      bg: "bg-cyber-red/10",
      border: "border-cyber-red/20",
    },
    {
      label: t("dash.legalKnowledge"),
      value: "\u2014",
      icon: Award,
      color: "text-cyber-purple",
      bg: "bg-cyber-purple/10",
      border: "border-cyber-purple/20",
    },
  ];

  const modules = [
    {
      title: t("dash.phishingModule"),
      description: t("features.sim.desc"),
      icon: Zap,
      href: "/simulator",
      color: "text-cyber-cyan",
      bg: "bg-cyber-cyan/10",
      border: "hover:border-cyber-cyan/40",
      progress: 0,
    },
    {
      title: t("dash.analyzerModule"),
      description: t("features.analyzer.desc"),
      icon: Search,
      href: "/analyzer",
      color: "text-cyber-yellow",
      bg: "bg-cyber-yellow/10",
      border: "hover:border-cyber-yellow/40",
      progress: 0,
    },
    {
      title: t("dash.legalModule"),
      description: t("features.legal.desc"),
      icon: Scale,
      href: "/legal",
      color: "text-cyber-purple",
      bg: "bg-cyber-purple/10",
      border: "hover:border-cyber-purple/40",
      progress: 0,
    },
    {
      title: t("dash.tipsModule"),
      description: t("tips.subtitle"),
      icon: BookOpen,
      href: "/tips",
      color: "text-cyber-green",
      bg: "bg-cyber-green/10",
      border: "hover:border-cyber-green/40",
      progress: 0,
    },
  ];

  const quickActions = [
    {
      label: t("dash.startSim"),
      href: "/simulator",
      icon: Zap,
      color: "bg-cyber-cyan text-cyber-darker",
    },
    {
      label: t("dash.analyzeMsg"),
      href: "/analyzer",
      icon: Search,
      color: "bg-cyber-yellow/20 text-cyber-yellow border border-cyber-yellow/30",
    },
    {
      label: t("dash.takeLegalQuiz"),
      href: "/legal",
      icon: Scale,
      color: "bg-cyber-purple/20 text-cyber-purple border border-cyber-purple/30",
    },
    {
      label: t("dash.readTips"),
      href: "/tips",
      icon: BookOpen,
      color: "bg-cyber-green/20 text-cyber-green border border-cyber-green/30",
    },
  ];

  return (
    <div className="cyber-grid flex flex-1 flex-col items-center px-4 py-10 sm:px-8 sm:py-16">
      <div className="my-auto w-full max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 sm:mb-10"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="rounded-xl bg-cyber-cyan/10 p-3">
              <LayoutDashboard className="h-7 w-7 text-cyber-cyan" />
            </div>
            <div>
              <h1 className="text-2xl font-black sm:text-3xl">
                {t("dash.title")}
              </h1>
              <p className="mt-1 text-sm text-cyber-text-dim sm:text-base">
                {t("dash.subtitle")}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Stats grid */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="mb-10 grid grid-cols-1 gap-4 sm:mb-12 sm:grid-cols-2 sm:gap-5 xl:grid-cols-4"
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={item}
              className={`rounded-2xl border ${stat.border} ${stat.bg} p-5 sm:p-6`}
            >
              <stat.icon className={`mb-4 h-6 w-6 ${stat.color}`} />
              <p className="text-3xl font-black sm:text-4xl">{stat.value}</p>
              <p className="mt-2 text-xs text-cyber-text-dim sm:text-sm">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Quick actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-10 sm:mb-12"
        >
          <h2 className="mb-5 text-lg font-bold sm:mb-6 sm:text-xl">
            {t("dash.quickActions")}
          </h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4 sm:gap-4">
            {quickActions.map((action) => (
              <Link
                key={action.label}
                href={action.href}
                className={`flex items-center gap-3 rounded-xl ${action.color} px-5 py-4 text-sm font-bold transition-all hover:scale-[1.02] sm:px-6 sm:py-5`}
              >
                <action.icon className="h-5 w-5 shrink-0" />
                <span className="text-xs sm:text-sm">{action.label}</span>
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Training modules */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-10 sm:mb-12"
        >
          <h2 className="mb-5 text-lg font-bold sm:mb-6 sm:text-xl">
            {t("dash.modules")}
          </h2>
          <div className="grid gap-5 sm:grid-cols-2 sm:gap-6">
            {modules.map((mod) => (
              <Link
                key={mod.title}
                href={mod.href}
                className={`group rounded-2xl border border-cyber-border bg-cyber-card p-5 transition-all sm:p-6 ${mod.border}`}
              >
                <div className="mb-4 flex items-start justify-between">
                  <div className={`rounded-xl ${mod.bg} p-3`}>
                    <mod.icon className={`h-6 w-6 ${mod.color}`} />
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-cyber-text-dim opacity-0 transition-opacity group-hover:opacity-100">
                    <span>{t("dash.explore")}</span>
                    <Arrow className="h-3.5 w-3.5" />
                  </div>
                </div>
                <h3 className="mb-2 text-base font-bold sm:text-lg">
                  {mod.title}
                </h3>
                <p className="mb-5 text-xs leading-relaxed text-cyber-text-dim sm:text-sm">
                  {mod.description}
                </p>
                {/* Progress bar */}
                <div>
                  <div className="mb-1.5 flex justify-between text-[11px] text-cyber-text-dim">
                    <span>{t("dash.progress")}</span>
                    <span>{mod.progress}%</span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-cyber-border">
                    <div
                      className={`h-full rounded-full ${mod.bg.replace("/10", "")}`}
                      style={{ width: `${mod.progress}%` }}
                    />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Level indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 rounded-2xl border border-cyber-border bg-cyber-card p-5 sm:mt-10 sm:p-6"
        >
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-lg font-bold sm:text-xl">
              {t("dash.level")}
            </h2>
            <span className="rounded-full bg-cyber-cyan/10 px-4 py-1.5 text-xs font-bold text-cyber-cyan sm:text-sm">
              {t("dash.beginner")}
            </span>
          </div>
          <div className="flex items-center gap-3">
            {[t("dash.beginner"), t("dash.intermediate"), t("dash.advanced"), t("dash.expert")].map(
              (level, i) => (
                <div key={level} className="flex-1">
                  <div
                    className={`h-2 rounded-full ${
                      i === 0 ? "bg-cyber-cyan" : "bg-cyber-border"
                    }`}
                  />
                  <p className="mt-2 text-center text-[10px] text-cyber-text-dim sm:text-xs">
                    {level}
                  </p>
                </div>
              )
            )}
          </div>
          <div className="mt-6 flex items-center gap-2 text-sm text-cyber-text-dim">
            <TrendingUp className="h-4 w-4 text-cyber-cyan" />
            <span>{t("dash.noActivity")}</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
