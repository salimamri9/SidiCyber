"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Shield,
  Smartphone,
  Search,
  Scale,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  Wifi,
  Lock,
  Eye,
  BookOpen,
  ArrowUpRight,
} from "lucide-react";
import { useI18n } from "@/lib/i18n";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

export default function Home() {
  const { t, locale } = useI18n();
  const isRtl = locale === "ar";
  const Arrow = isRtl ? ChevronLeft : ChevronRight;

  const features = [
    {
      id: "simulator",
      icon: Smartphone,
      title: t("features.sim.title"),
      description: t("features.sim.desc"),
      href: "/simulator",
      accent: "cyber-cyan",
      iconBg: "bg-cyber-cyan/10",
      iconColor: "text-cyber-cyan",
      hoverBorder: "hover:border-cyber-cyan/30",
    },
    {
      id: "analyzer",
      icon: Search,
      title: t("features.analyzer.title"),
      description: t("features.analyzer.desc"),
      href: "/analyzer",
      accent: "cyber-yellow",
      iconBg: "bg-cyber-yellow/10",
      iconColor: "text-cyber-yellow",
      hoverBorder: "hover:border-cyber-yellow/30",
    },
    {
      id: "legal",
      icon: Scale,
      title: t("features.legal.title"),
      description: t("features.legal.desc"),
      href: "/legal",
      accent: "cyber-purple",
      iconBg: "bg-cyber-purple/10",
      iconColor: "text-cyber-purple",
      hoverBorder: "hover:border-cyber-purple/30",
    },
    {
      id: "tips",
      icon: BookOpen,
      title: t("tips.title"),
      description: t("tips.subtitle"),
      href: "/tips",
      accent: "cyber-green",
      iconBg: "bg-cyber-green/10",
      iconColor: "text-cyber-green",
      hoverBorder: "hover:border-cyber-green/30",
    },
  ];

  const threats = [
    { id: "sms", icon: Smartphone, label: t("hero.threat.sms") },
    { id: "wifi", icon: Wifi, label: t("hero.threat.wifi") },
    { id: "password", icon: Lock, label: t("hero.threat.password") },
    { id: "privacy", icon: Eye, label: t("hero.threat.privacy") },
    { id: "fake", icon: AlertTriangle, label: t("hero.threat.fake") },
  ];

  return (
    <div className="cyber-grid">
      {/* ── Hero ── */}
      <section className="relative flex min-h-[calc(100dvh-4rem)] flex-col items-center justify-center overflow-hidden px-5 sm:px-8">
        {/* Background blurs */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-1/4 right-1/4 h-64 w-64 rounded-full bg-cyber-cyan/4 blur-[120px] sm:h-[420px] sm:w-[420px]" />
          <div className="absolute bottom-1/3 left-1/4 h-64 w-64 rounded-full bg-cyber-purple/4 blur-[120px] sm:h-[350px] sm:w-[350px]" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative z-10 mx-auto w-full max-w-5xl flex flex-col items-center text-center"
        >
          {/* Shield icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", bounce: 0.35, delay: 0.15 }}
            className="relative mb-8 sm:mb-10"
          >
            <div className="relative rounded-2xl border border-cyber-cyan/15 bg-cyber-cyan/5 p-5 sm:p-7">
              <Shield className="h-10 w-10 text-cyber-cyan sm:h-14 sm:w-14" />
              <div className="absolute inset-0 animate-pulse-glow rounded-2xl border border-cyber-cyan/20" />
            </div>
          </motion.div>

          {/* Alert badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.35 }}
            className="mb-6 flex items-center gap-2 rounded-full border border-cyber-red/20 bg-cyber-red/8 px-4 py-2"
          >
            <AlertTriangle className="h-3.5 w-3.5 shrink-0 text-cyber-red" />
            <span className="text-xs font-semibold text-cyber-red">
              {t("hero.alert")}
            </span>
          </motion.div>

          {/* Headline */}
          <h1 className="mb-5 max-w-3xl text-3xl font-black leading-[1.15] tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
            <span className="text-cyber-text">{t("hero.title1")}</span>
            <br />
            <span className="text-glow-cyan text-cyber-cyan">
              {t("hero.title2")}
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mb-10 max-w-lg text-sm leading-relaxed text-cyber-text-dim sm:max-w-xl sm:text-base md:text-lg">
            {t("hero.subtitle")}
          </p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:gap-4"
          >
            <Link
              href="/simulator"
              className="glow-cyan group flex items-center justify-center gap-2 rounded-xl bg-cyber-cyan px-7 py-3.5 text-sm font-bold text-cyber-darker transition-all hover:bg-cyber-cyan/90 hover:scale-[1.02] sm:px-8 sm:py-4 sm:text-base"
            >
              {t("hero.cta")}
              <Arrow className="h-4 w-4 transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" />
            </Link>
            <Link
              href="/analyzer"
              className="flex items-center justify-center gap-2 rounded-xl border border-cyber-border px-7 py-3.5 text-sm font-semibold text-cyber-text transition-all hover:border-cyber-cyan/30 hover:bg-cyber-cyan/5 sm:px-8 sm:py-4 sm:text-base"
            >
              {t("hero.cta2")}
            </Link>
          </motion.div>
        </motion.div>

        {/* Threat tags */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="absolute bottom-8 flex flex-wrap justify-center gap-2 px-5 sm:bottom-12 sm:gap-3"
        >
          {threats.map((threat) => (
            <motion.div
              key={threat.id}
              variants={item}
              className="flex items-center gap-2 rounded-full border border-cyber-border/60 bg-cyber-card/50 px-3.5 py-2 backdrop-blur-sm sm:px-4 sm:py-2.5"
            >
              <threat.icon className="h-3 w-3 text-cyber-red sm:h-3.5 sm:w-3.5" />
              <span className="text-[10px] font-medium text-cyber-text-dim sm:text-xs">
                {threat.label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── Features ── */}
      <section className="py-20 sm:py-28 px-5 sm:px-8">
        <div className="mx-auto w-full max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 text-center sm:mb-16"
          >
            <h2 className="mb-4 text-2xl font-black tracking-tight sm:text-3xl lg:text-4xl">
              {t("features.title")}
            </h2>
            <p className="mx-auto max-w-md text-sm text-cyber-text-dim sm:text-base">
              {t("features.subtitle")}
            </p>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:gap-6"
          >
            {features.map((feature) => (
              <motion.div key={feature.id} variants={item}>
                <Link
                  href={feature.href}
                  className={`card-hover group flex h-full flex-col rounded-2xl border border-cyber-border bg-cyber-card p-6 transition-all sm:p-8 ${feature.hoverBorder}`}
                >
                  <div className="mb-5 flex items-start justify-between">
                    <div
                      className={`inline-flex rounded-xl ${feature.iconBg} p-3.5`}
                    >
                      <feature.icon
                        className={`h-6 w-6 ${feature.iconColor}`}
                      />
                    </div>
                    <ArrowUpRight className="h-4 w-4 text-cyber-text-dim opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                  <h3 className="mb-2.5 text-base font-bold sm:text-lg">
                    {feature.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-cyber-text-dim">
                    {feature.description}
                  </p>
                  <div className="mt-auto pt-5 flex items-center gap-1.5 text-xs font-semibold text-cyber-text-dim opacity-0 transition-opacity group-hover:opacity-100">
                    <span>{t("features.start")}</span>
                    <Arrow className="h-3.5 w-3.5" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="py-16 sm:py-24 px-5 sm:px-8">
        <div className="mx-auto w-full max-w-5xl">
          <div className="mx-auto grid max-w-3xl gap-4 sm:grid-cols-3 sm:gap-5">
            {[
              {
                id: "attacks",
                value: "+200%",
                label: t("stats.attacks"),
                color: "text-cyber-red",
                bg: "bg-cyber-red/8",
                border: "border-cyber-red/15",
              },
              {
                id: "unaware",
                value: "70%",
                label: t("stats.unaware"),
                color: "text-cyber-yellow",
                bg: "bg-cyber-yellow/8",
                border: "border-cyber-yellow/15",
              },
              {
                id: "phishing",
                value: "#1",
                label: t("stats.phishing"),
                color: "text-cyber-cyan",
                bg: "bg-cyber-cyan/8",
                border: "border-cyber-cyan/15",
              },
            ].map((stat) => (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`rounded-2xl border ${stat.border} ${stat.bg} p-6 text-center sm:p-8`}
              >
                <div
                  className={`text-3xl font-black sm:text-4xl ${stat.color}`}
                >
                  {stat.value}
                </div>
                <p className="mt-2 text-xs text-cyber-text-dim sm:text-sm">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-cyber-border/40 py-10 sm:py-12 px-5 sm:px-8">
        <div className="mx-auto w-full max-w-5xl flex flex-col items-center justify-between gap-3 sm:flex-row">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-cyber-cyan" />
            <span className="text-sm font-semibold text-cyber-text-dim">
              SidiCyber Tunisia
            </span>
          </div>
          <p className="text-xs text-cyber-text-dim/60 text-center sm:text-start">
            {t("footer.desc")}
          </p>
        </div>
      </footer>
    </div>
  );
}
