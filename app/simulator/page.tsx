"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shield,
  ShieldAlert,
  ShieldCheck,
  ShieldX,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Zap,
  Trophy,
  Sparkles,
} from "lucide-react";
import { PhoneFrame } from "@/components/PhoneFrame";
import { scenarios, type Scenario } from "@/lib/scenarios";
import { useI18n } from "@/lib/i18n";

type Choice = "safe" | "suspicious" | "scam";

interface AnalysisResult {
  correct: boolean;
  explanation: string;
  redFlags: string[];
  tactic: string;
  advice: string;
}

export default function SimulatorPage() {
  const { t, locale } = useI18n();
  const Arrow = locale === "ar" ? ChevronLeft : ChevronRight;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [choice, setChoice] = useState<Choice | null>(null);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const scenario = scenarios[currentIndex];
  const total = scenarios.length;

  const analyzeChoice = useCallback(
    async (userChoice: Choice, sc: Scenario) => {
      setChoice(userChoice);
      setLoading(true);
      try {
        const res = await fetch("/api/simulate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ scenario: sc, userChoice }),
        });
        if (!res.ok) throw new Error("API error");
        const data = await res.json();
        const correct = userChoice === sc.answer;
        if (correct) setScore((s) => s + 1);
        setAnalysis({ correct, ...data });
      } catch {
        const correct = userChoice === sc.answer;
        if (correct) setScore((s) => s + 1);
        setAnalysis({
          correct,
          explanation:
            sc.answer === "scam"
              ? "This message is a scam attempt. Suspicious links and urgent language are clear warning signs."
              : "This message appears legitimate.",
          redFlags:
            sc.answer === "scam"
              ? ["Suspicious link", "Urgent language", "Requests personal info"]
              : [],
          tactic:
            sc.answer === "scam"
              ? "Uses fear and urgency to pressure the victim"
              : "None",
          advice:
            sc.answer === "scam"
              ? "Never click suspicious links. Always verify with the official source."
              : "This type of notification is normal, but always verify the source.",
        });
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const nextScenario = () => {
    if (currentIndex < total - 1) {
      setCurrentIndex((i) => i + 1);
      setChoice(null);
      setAnalysis(null);
    } else {
      setShowResults(true);
    }
  };

  const restart = () => {
    setCurrentIndex(0);
    setChoice(null);
    setAnalysis(null);
    setScore(0);
    setShowResults(false);
  };

  const diffLabel =
    scenario.difficulty === "easy"
      ? t("sim.easy")
      : scenario.difficulty === "medium"
      ? t("sim.medium")
      : t("sim.hard");

  const answerLabel =
    scenario.answer === "scam"
      ? t("sim.answerScam")
      : scenario.answer === "suspicious"
      ? t("sim.answerSuspicious")
      : t("sim.answerSafe");

  // --------------- Results screen ---------------
  if (showResults) {
    const pct = Math.round((score / total) * 100);
    return (
      <div className="cyber-grid flex flex-1 items-center justify-center px-4 py-10 sm:px-8 sm:py-16">
        <div className="w-full max-w-3xl">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="mx-auto w-full max-w-lg rounded-2xl border border-cyber-border bg-cyber-card p-10 text-center sm:max-w-xl sm:p-14"
          >
            <Trophy
              className={`mx-auto mb-8 h-16 w-16 sm:h-20 sm:w-20 ${
                pct >= 70 ? "text-cyber-green" : "text-cyber-yellow"
              }`}
            />
            <h2 className="mb-4 text-2xl font-black sm:text-3xl">
              {t("sim.complete")}
            </h2>
            <div
              className={`my-10 text-6xl font-black sm:text-7xl ${
                pct >= 70
                  ? "text-cyber-green"
                  : pct >= 40
                  ? "text-cyber-yellow"
                  : "text-cyber-red"
              }`}
            >
              {pct}%
            </div>
            <p className="mb-3 text-base text-cyber-text-dim sm:text-lg">
              {t("sim.correctCount")}{" "}
              <span className="font-bold text-cyber-text">{score}</span>{" "}
              {t("sim.of")}{" "}
              <span className="font-bold text-cyber-text">{total}</span>{" "}
              {t("sim.scenarios")}
            </p>
            <p className="mb-12 text-cyber-text-dim">
              {pct >= 70 ? t("sim.excellent") : t("sim.needMore")}
            </p>
            <button
              onClick={restart}
              className="mx-auto flex items-center gap-2 rounded-xl bg-cyber-cyan px-8 py-4 font-bold text-cyber-darker transition hover:bg-cyber-cyan/80"
            >
              <RotateCcw className="h-5 w-5" />
              {t("sim.restart")}
            </button>
          </motion.div>
        </div>
      </div>
    );
  }

  // --------------- Main simulator screen ---------------
  return (
    <div className="cyber-grid flex flex-1 flex-col items-center px-4 py-10 sm:px-8 sm:py-16">
      <div className="my-auto w-full max-w-4xl">
        {/* ---- Header with title + badges ---- */}
        <div className="mb-10 flex flex-col gap-6 sm:mb-12 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="flex items-center gap-3 text-xl font-black sm:text-2xl lg:text-3xl">
              <Zap className="h-6 w-6 text-cyber-cyan sm:h-7 sm:w-7" />
              {t("sim.title")}
            </h1>
            <p className="mt-2.5 text-xs text-cyber-text-dim sm:text-sm">
              {t("sim.subtitle")}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="rounded-lg border border-cyber-border bg-cyber-card px-6 py-3 text-xs sm:px-7 sm:py-3.5 sm:text-sm">
              {t("sim.score")}:{" "}
              <span className="font-bold text-cyber-cyan">{score}</span>/
              {total}
            </div>
            <div className="rounded-lg border border-cyber-border bg-cyber-card px-6 py-3 text-xs sm:px-7 sm:py-3.5 sm:text-sm">
              {t("sim.scenario")}:{" "}
              <span className="font-bold text-cyber-cyan">
                {currentIndex + 1}
              </span>
              /{total}
            </div>
          </div>
        </div>

        {/* ---- Progress bar ---- */}
        <div className="mb-10 h-2.5 overflow-hidden rounded-full bg-cyber-border sm:mb-12">
          <motion.div
            className="h-full rounded-full bg-cyber-cyan"
            initial={{ width: 0 }}
            animate={{
              width: `${((currentIndex + (choice ? 1 : 0)) / total) * 100}%`,
            }}
            transition={{ duration: 0.5 }}
          />
        </div>

        {/* ---- Two-column grid: phone | choices/analysis ---- */}
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Phone column */}
          <div>
            <div className="mb-5 flex flex-wrap items-center gap-3">
              <span
                className={`rounded-full px-3.5 py-1 text-xs font-bold ${
                  scenario.difficulty === "easy"
                    ? "bg-cyber-green-dim text-cyber-green"
                    : scenario.difficulty === "medium"
                    ? "bg-cyber-yellow-dim text-cyber-yellow"
                    : "bg-cyber-red-dim text-cyber-red"
                }`}
              >
                {diffLabel}
              </span>
              <span className="text-sm font-semibold text-cyber-text-dim">
                {scenario.title}
              </span>
            </div>
            <PhoneFrame sender={scenario.sender} type={scenario.category}>
              {scenario.message}
            </PhoneFrame>
          </div>

          {/* Choices / Analysis column */}
          <div>
            <AnimatePresence mode="wait">
              {!choice ? (
                <motion.div
                  key="choices"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4"
                >
                  <h3 className="mb-10 text-lg font-bold sm:text-xl">
                    {t("sim.question")}
                  </h3>
                  {[
                    {
                      value: "safe" as Choice,
                      label: t("sim.safe"),
                      icon: ShieldCheck,
                      border:
                        "border-cyber-green/30 hover:bg-cyber-green/10 hover:border-cyber-green/50",
                      iconColor: "text-cyber-green",
                    },
                    {
                      value: "suspicious" as Choice,
                      label: t("sim.suspicious"),
                      icon: ShieldAlert,
                      border:
                        "border-cyber-yellow/30 hover:bg-cyber-yellow/10 hover:border-cyber-yellow/50",
                      iconColor: "text-cyber-yellow",
                    },
                    {
                      value: "scam" as Choice,
                      label: t("sim.scam"),
                      icon: ShieldX,
                      border:
                        "border-cyber-red/30 hover:bg-cyber-red/10 hover:border-cyber-red/50",
                      iconColor: "text-cyber-red",
                    },
                  ].map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => analyzeChoice(opt.value, scenario)}
                      className={`flex w-full items-center gap-4 rounded-2xl border bg-cyber-card p-5 text-start transition-all sm:p-6 ${opt.border}`}
                    >
                      <opt.icon
                        className={`h-8 w-8 shrink-0 ${opt.iconColor}`}
                      />
                      <span className="text-base font-semibold sm:text-lg">
                        {opt.label}
                      </span>
                    </button>
                  ))}
                </motion.div>
              ) : loading ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center gap-5 rounded-2xl border border-cyber-border bg-cyber-card py-20"
                >
                  <div className="relative h-16 w-16">
                    <div className="absolute inset-0 animate-spin rounded-full border-4 border-cyber-border border-t-cyber-cyan" />
                    <Shield className="absolute inset-3 h-10 w-10 text-cyber-cyan" />
                  </div>
                  <p className="text-sm text-cyber-text-dim">
                    {t("sim.analyzing")}
                  </p>
                </motion.div>
              ) : analysis ? (
                <motion.div
                  key="analysis"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-5"
                >
                  {/* Result header */}
                  <div
                    className={`flex items-center gap-4 rounded-2xl p-6 sm:p-8 ${
                      analysis.correct
                        ? "border border-cyber-green/40 bg-cyber-green/10"
                        : "border border-cyber-red/40 bg-cyber-red/10"
                    }`}
                  >
                    {analysis.correct ? (
                      <ShieldCheck className="h-8 w-8 shrink-0 text-cyber-green" />
                    ) : (
                      <ShieldX className="h-8 w-8 shrink-0 text-cyber-red" />
                    )}
                    <div>
                      <p
                        className={`text-lg font-bold ${
                          analysis.correct
                            ? "text-cyber-green"
                            : "text-cyber-red"
                        }`}
                      >
                        {analysis.correct ? t("sim.correct") : t("sim.wrong")}
                      </p>
                      <p className="text-sm text-cyber-text-dim">
                        {t("sim.correctAnswer")}: {answerLabel}
                      </p>
                    </div>
                  </div>

                  {/* Explanation */}
                  <div className="rounded-2xl border border-cyber-border bg-cyber-card p-6 sm:p-8">
                    <div className="mb-4 flex items-center gap-2 text-sm font-bold text-cyber-cyan">
                      <Sparkles className="h-4 w-4" />
                      {t("sim.analysis")}
                    </div>
                    <p className="text-sm leading-relaxed text-cyber-text-dim">
                      {analysis.explanation}
                    </p>
                  </div>

                  {/* Red flags */}
                  {analysis.redFlags.length > 0 && (
                    <div className="rounded-2xl border border-cyber-red/30 bg-cyber-red/5 p-6 sm:p-8">
                      <p className="mb-4 text-sm font-bold text-cyber-red">
                        {t("sim.redFlags")}:
                      </p>
                      <ul className="space-y-2.5">
                        {analysis.redFlags.map((flag, i) => (
                          <li
                            key={i}
                            className="flex items-center gap-2.5 text-sm text-cyber-text-dim"
                          >
                            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-cyber-red" />
                            {flag}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Tactic */}
                  {analysis.tactic &&
                    analysis.tactic !== "None" &&
                    analysis.tactic !== "\u0644\u0627 \u064a\u0648\u062c\u062f" && (
                      <div className="rounded-2xl border border-cyber-yellow/30 bg-cyber-yellow/5 p-6 sm:p-8">
                        <p className="mb-3 text-sm font-bold text-cyber-yellow">
                          {t("sim.tactic")}:
                        </p>
                        <p className="text-sm text-cyber-text-dim">
                          {analysis.tactic}
                        </p>
                      </div>
                    )}

                  {/* Advice */}
                  <div className="rounded-2xl border border-cyber-green/30 bg-cyber-green/5 p-6 sm:p-8">
                    <p className="mb-3 text-sm font-bold text-cyber-green">
                      {t("sim.advice")}:
                    </p>
                    <p className="text-sm text-cyber-text-dim">
                      {analysis.advice}
                    </p>
                  </div>

                  {/* Next button */}
                  <button
                    onClick={nextScenario}
                    className="glow-cyan flex w-full items-center justify-center gap-2 rounded-2xl bg-cyber-cyan py-4 text-base font-bold text-cyber-darker transition-all hover:bg-cyber-cyan/90"
                  >
                    {currentIndex < total - 1
                      ? t("sim.next")
                      : t("sim.showResults")}
                    <Arrow className="h-5 w-5" />
                  </button>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
