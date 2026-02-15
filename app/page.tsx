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
  LayoutDashboard,
} from "lucide-react";
import { useI18n } from "@/lib/i18n";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 },
};

export default function Home() {
  const { t, locale } = useI18n();
  const isRtl = locale === "ar";
  const Arrow = isRtl ? ChevronLeft : ChevronRight;

  const features = [
    {
      icon: Smartphone,
      title: t("features.sim.title"),
      description: t("features.sim.desc"),
      href: "/simulator",
      borderHover: "hover:border-cyan-500/40",
      iconBg: "bg-cyan-500/10",
      iconColor: "text-cyber-cyan",
    },
    {
      icon: Search,
      title: t("features.analyzer.title"),
      description: t("features.analyzer.desc"),
      href: "/analyzer",
      borderHover: "hover:border-yellow-500/40",
      iconBg: "bg-yellow-500/10",
      iconColor: "text-cyber-yellow",
    },
    {
      icon: Scale,
      title: t("features.legal.title"),
      description: t("features.legal.desc"),
      href: "/legal",
      borderHover: "hover:border-purple-500/40",
      iconBg: "bg-purple-500/10",
      iconColor: "text-cyber-purple",
    },
    {
      icon: BookOpen,
      title: t("dash.tipsModule"),
      description: t("tips.subtitle"),
      href: "/tips",
      borderHover: "hover:border-green-500/40",
      iconBg: "bg-green-500/10",
      iconColor: "text-cyber-green",
    },
  ];

  const threats = [
    { icon: Smartphone, label: t("hero.threat.sms") },
    { icon: Wifi, label: t("hero.threat.wifi") },
    { icon: Lock, label: t("hero.threat.password") },
    { icon: Eye, label: t("hero.threat.privacy") },
    { icon: AlertTriangle, label: t("hero.threat.fake") },
  ];

  return (
    <div className="cyber-grid">
      {/* ── Hero ── */}
      <section className="relative flex min-h-[calc(100dvh-5rem)] flex-col items-center justify-center overflow-hidden">
        {/* Background blurs */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-1/4 right-1/4 h-72 w-72 rounded-full bg-cyber-cyan/5 blur-[100px] sm:h-[500px] sm:w-[500px] sm:blur-[150px]" />
          <div className="absolute bottom-1/4 left-1/4 h-72 w-72 rounded-full bg-cyber-purple/5 blur-[100px] sm:h-[400px] sm:w-[400px] sm:blur-[150px]" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="page-container relative z-10 flex flex-col items-center text-center"
        >
          {/* Shield */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", bounce: 0.4, delay: 0.2 }}
            className="relative mb-10 sm:mb-14"
          >
            <div className="relative rounded-full border border-cyber-cyan/20 bg-cyber-cyan/5 p-7 sm:p-10">
              <Shield className="h-14 w-14 text-cyber-cyan sm:h-20 sm:w-20" />
              <div className="absolute inset-0 animate-pulse-glow rounded-full border border-cyber-cyan/30" />
            </div>
          </motion.div>

          {/* Alert badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="mb-8 sm:mb-10 flex items-center gap-2.5 rounded-full border border-cyber-red/30 bg-cyber-red/10 px-5 py-2.5"
          >
            <AlertTriangle className="h-4 w-4 shrink-0 text-cyber-red" />
            <span className="text-xs font-semibold text-cyber-red sm:text-sm">
              {t("hero.alert")}
            </span>
          </motion.div>

          {/* Headline */}
          <h1 className="mb-6 max-w-4xl text-4xl font-black leading-[1.15] sm:text-5xl md:text-6xl lg:text-7xl">
            <span className="text-cyber-text">{t("hero.title1")}</span>
            <br />
            <span className="text-glow-cyan text-cyber-cyan">
              {t("hero.title2")}
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mb-12 sm:mb-16 max-w-xl text-base leading-relaxed text-cyber-text-dim sm:max-w-2xl sm:text-lg md:text-xl">
            {t("hero.subtitle")}
          </p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex w-full flex-col gap-5 sm:w-auto sm:flex-row sm:gap-6"
          >
            <Link
              href="/simulator"
              className="glow-cyan group flex items-center justify-center gap-2 rounded-2xl bg-cyber-cyan px-8 py-4 text-base font-bold text-cyber-darker transition-all hover:bg-cyber-cyan/90 hover:scale-105 sm:px-10 sm:py-5 sm:text-lg"
            >
              {t("hero.cta")}
              <Arrow className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/analyzer"
              className="flex items-center justify-center gap-2 rounded-2xl border border-cyber-border px-8 py-4 text-base font-semibold text-cyber-text transition-all hover:border-cyber-cyan/50 hover:bg-cyber-cyan/5 sm:px-10 sm:py-5 sm:text-lg"
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
          className="absolute bottom-12 sm:bottom-16 flex flex-wrap justify-center gap-3 px-6 sm:gap-4"
        >
          {threats.map((threat) => (
            <motion.div
              key={threat.label}
              variants={item}
              className="flex items-center gap-2.5 rounded-full border border-cyber-border bg-cyber-card/60 px-5 py-2.5 backdrop-blur-sm sm:px-6 sm:py-3"
            >
              <threat.icon className="h-3.5 w-3.5 text-cyber-red sm:h-4 sm:w-4" />
              <span className="text-[11px] font-semibold text-cyber-text-dim sm:text-xs">
                {threat.label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── Features ── */}
      <section className="py-24 sm:py-32">
        <div className="page-container">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <h2 className="mb-6 text-2xl font-black sm:text-3xl lg:text-4xl">
              {t("features.title")}
            </h2>
            <p className="text-base text-cyber-text-dim sm:text-lg">
              {t("features.subtitle")}
            </p>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid gap-8 sm:grid-cols-2"
          >
            {features.map((feature) => (
              <motion.div key={feature.title} variants={item}>
                <Link
                  href={feature.href}
                  className={`group block h-full rounded-2xl border border-cyber-border bg-cyber-card p-8 sm:p-10 transition-all ${feature.borderHover}`}
                >
                  <div
                    className={`mb-8 inline-flex rounded-xl ${feature.iconBg} p-4 sm:p-5`}
                  >
                    <feature.icon
                      className={`h-7 w-7 sm:h-8 sm:w-8 ${feature.iconColor}`}
                    />
                  </div>
                  <h3 className="mb-5 text-lg font-bold sm:text-xl">
                    {feature.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-cyber-text-dim sm:text-base">
                    {feature.description}
                  </p>
                  <div className="mt-8 flex items-center gap-2 text-sm font-semibold text-cyber-cyan opacity-0 transition-opacity group-hover:opacity-100">
                    <span>{t("features.start")}</span>
                    <Arrow className="h-4 w-4" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="border-t border-cyber-border py-24 sm:py-32">
        <div className="page-container">
          <div className="mx-auto grid max-w-4xl gap-14 sm:grid-cols-3 sm:gap-16">
            {[
              {
                value: "+200%",
                label: t("stats.attacks"),
                color: "text-cyber-red",
              },
              {
                value: "70%",
                label: t("stats.unaware"),
                color: "text-cyber-yellow",
              },
              {
                value: "#1",
                label: t("stats.phishing"),
                color: "text-cyber-cyan",
              },
            ].map((stat) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div
                  className={`text-4xl font-black sm:text-5xl ${stat.color}`}
                >
                  {stat.value}
                </div>
                <p className="mt-3 text-sm text-cyber-text-dim sm:text-base">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-cyber-border py-14 sm:py-16">
        <div className="page-container flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-2.5">
            <Shield className="h-5 w-5 text-cyber-cyan" />
            <span className="text-sm font-semibold text-cyber-text-dim">
              CyberGuard Tunisia
            </span>
          </div>
          <p className="text-xs text-cyber-text-dim text-center sm:text-start">
            {t("footer.desc")}
          </p>
        </div>
      </footer>
    </div>
  );
}
