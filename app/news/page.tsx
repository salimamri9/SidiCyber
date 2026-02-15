"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Newspaper,
  AlertTriangle,
  ShieldAlert,
  RotateCcw,
  ChevronDown,
  Lightbulb,
  Shield,
  Bug,
  Mail,
  Users,
  FileText,
} from "lucide-react";
import { useI18n, type Locale } from "@/lib/i18n";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

interface NewsArticle {
  id: string;
  title: Record<Locale, string>;
  summary: Record<Locale, string>;
  whyItMatters: Record<Locale, string>;
  lessons: Record<Locale, string>[];
  actions: Record<Locale, string>[];
  severity: "critical" | "high" | "medium";
  category: "phishing" | "data_breach" | "malware" | "social_engineering" | "policy";
  date: string;
}

const severityConfig = {
  critical: { color: "text-cyber-red", bg: "bg-cyber-red/10", border: "border-cyber-red/30", label: { ar: "حرج", en: "Critical", fr: "Critique" } },
  high: { color: "text-cyber-yellow", bg: "bg-cyber-yellow/10", border: "border-cyber-yellow/30", label: { ar: "عالي", en: "High", fr: "Eleve" } },
  medium: { color: "text-cyber-cyan", bg: "bg-cyber-cyan/10", border: "border-cyber-cyan/30", label: { ar: "متوسط", en: "Medium", fr: "Moyen" } },
};

const categoryIcon = {
  phishing: Mail,
  data_breach: ShieldAlert,
  malware: Bug,
  social_engineering: Users,
  policy: FileText,
};

export default function NewsPage() {
  const { t, locale } = useI18n();

  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const loadNews = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/news", { method: "POST" });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.details || `API error: ${res.status}`);
      }
      const data = await res.json();
      setArticles(data.articles);
      if (data.articles.length > 0) setExpandedId(data.articles[0].id);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load news");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadNews();
  }, [loadNews]);

  // --------------- Loading ---------------
  if (loading) {
    return (
      <div className="cyber-grid flex flex-1 items-center justify-center px-5 py-10 sm:px-8 sm:py-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center gap-6 text-center"
        >
          <div className="relative h-20 w-20">
            <div className="absolute inset-0 animate-spin rounded-full border-4 border-cyber-border border-t-cyber-red" />
            <Newspaper className="absolute inset-4 h-12 w-12 text-cyber-red" />
          </div>
          <div>
            <h2 className="mb-2 text-xl font-bold">{t("news.title")}</h2>
            <p className="text-sm text-cyber-text-dim">{t("news.loading")}</p>
          </div>
        </motion.div>
      </div>
    );
  }

  // --------------- Error ---------------
  if (error) {
    return (
      <div className="cyber-grid flex flex-1 items-center justify-center px-5 py-10 sm:px-8 sm:py-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-lg rounded-2xl border border-cyber-red/30 bg-cyber-red/5 p-8 text-center sm:p-10"
        >
          <AlertTriangle className="mx-auto mb-6 h-12 w-12 text-cyber-red" />
          <h2 className="mb-3 text-xl font-bold text-cyber-red">{t("news.error")}</h2>
          <p className="mb-6 text-sm leading-relaxed text-cyber-text-dim">{error}</p>
          <button
            onClick={loadNews}
            className="mx-auto flex items-center gap-2 rounded-xl bg-cyber-cyan px-6 py-3 font-bold text-cyber-darker transition hover:bg-cyber-cyan/80"
          >
            <RotateCcw className="h-5 w-5" />
            {t("news.retry")}
          </button>
        </motion.div>
      </div>
    );
  }

  // --------------- News list ---------------
  return (
    <div className="cyber-grid flex flex-1 flex-col items-center px-5 py-10 sm:px-8 sm:py-16">
      <div className="my-auto w-full max-w-3xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center sm:mb-16"
        >
          <div className="mx-auto mb-6 inline-flex rounded-full border border-cyber-red/20 bg-cyber-red/10 p-5 sm:p-6">
            <Newspaper className="h-8 w-8 text-cyber-red sm:h-9 sm:w-9" />
          </div>
          <h1 className="mb-4 text-2xl font-black sm:text-3xl">
            {t("news.title")}
          </h1>
          <p className="text-sm text-cyber-text-dim sm:text-base">
            {t("news.subtitle")}
          </p>
        </motion.div>

        {/* Articles */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="space-y-4 sm:space-y-5"
        >
          {articles.map((article) => {
            const isExpanded = expandedId === article.id;
            const sev = severityConfig[article.severity];
            const CatIcon = categoryIcon[article.category] || ShieldAlert;

            return (
              <motion.div key={article.id} variants={item}>
                <div
                  className={`overflow-hidden rounded-2xl border transition-all ${
                    isExpanded ? sev.border : "border-cyber-border"
                  } bg-cyber-card`}
                >
                  {/* Header */}
                  <button
                    onClick={() => setExpandedId(isExpanded ? null : article.id)}
                    className="flex w-full items-center gap-4 p-6 text-start transition-colors hover:bg-white/[0.02] sm:gap-5 sm:p-8"
                  >
                    <div className={`shrink-0 rounded-xl ${sev.bg} p-3`}>
                      <CatIcon className={`h-6 w-6 ${sev.color}`} />
                    </div>
                    <div className="flex-1">
                      <div className="mb-2 flex flex-wrap items-center gap-2">
                        <span className={`rounded-full ${sev.bg} ${sev.color} px-2.5 py-0.5 text-[10px] font-bold sm:text-xs`}>
                          {sev.label[locale]}
                        </span>
                        <span className="text-[10px] text-cyber-text-dim sm:text-xs">
                          {article.date}
                        </span>
                      </div>
                      <h3 className="text-base font-bold sm:text-lg">
                        {article.title[locale]}
                      </h3>
                      {!isExpanded && (
                        <p className="mt-1 line-clamp-1 text-xs text-cyber-text-dim sm:text-sm">
                          {article.summary[locale]}
                        </p>
                      )}
                    </div>
                    <ChevronDown
                      className={`h-5 w-5 shrink-0 text-cyber-text-dim transition-transform ${
                        isExpanded ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {/* Expanded content */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="space-y-5 border-t border-cyber-border px-6 pb-6 pt-5 sm:space-y-6 sm:px-8 sm:pb-8 sm:pt-6">
                          {/* Summary */}
                          <div>
                            <p className="mb-2 text-xs font-bold text-cyber-cyan sm:text-sm">
                              {t("news.whatHappened")}
                            </p>
                            <p className="text-sm leading-relaxed text-cyber-text-dim">
                              {article.summary[locale]}
                            </p>
                          </div>

                          {/* Why it matters */}
                          <div className={`rounded-xl ${sev.bg} border ${sev.border} p-5 sm:p-6`}>
                            <p className={`mb-2 text-xs font-bold ${sev.color} sm:text-sm`}>
                              {t("news.whyMatters")}
                            </p>
                            <p className="text-xs text-cyber-text-dim sm:text-sm">
                              {article.whyItMatters[locale]}
                            </p>
                          </div>

                          {/* Lessons */}
                          <div>
                            <div className="mb-3 flex items-center gap-2">
                              <Lightbulb className="h-4 w-4 text-cyber-yellow" />
                              <span className="text-xs font-bold text-cyber-yellow sm:text-sm">
                                {t("news.lessons")}
                              </span>
                            </div>
                            <ul className="space-y-2">
                              {article.lessons.map((lesson, i) => (
                                <li key={i} className="flex items-start gap-2.5 text-sm text-cyber-text-dim">
                                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyber-yellow" />
                                  {lesson[locale]}
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Actions */}
                          <div>
                            <div className="mb-3 flex items-center gap-2">
                              <Shield className="h-4 w-4 text-cyber-green" />
                              <span className="text-xs font-bold text-cyber-green sm:text-sm">
                                {t("news.actions")}
                              </span>
                            </div>
                            <ul className="space-y-2">
                              {article.actions.map((action, i) => (
                                <li key={i} className="flex items-start gap-2.5 text-sm text-cyber-text-dim">
                                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyber-green" />
                                  {action[locale]}
                                </li>
                              ))}
                            </ul>
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

        {/* Refresh button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-10 text-center sm:mt-12"
        >
          <button
            onClick={loadNews}
            className="inline-flex items-center gap-2 rounded-xl border border-cyber-border px-6 py-3 text-sm font-semibold text-cyber-text-dim transition hover:border-cyber-cyan/30 hover:text-cyber-text"
          >
            <RotateCcw className="h-4 w-4" />
            {t("news.refresh")}
          </button>
        </motion.div>
      </div>
    </div>
  );
}
