"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Scale,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Trophy,
  Gavel,
} from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { legalQuestions } from "@/lib/legal-questions";

export default function LegalPage() {
  const { t, locale } = useI18n();
  const Arrow = locale === "ar" ? ChevronLeft : ChevronRight;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const question = legalQuestions[currentIndex];
  const total = legalQuestions.length;
  const answered = selectedOption !== null;

  const selectOption = (index: number) => {
    if (answered) return;
    setSelectedOption(index);
    if (question.options[index].correct) setScore((s) => s + 1);
  };

  const next = () => {
    if (currentIndex < total - 1) {
      setCurrentIndex((i) => i + 1);
      setSelectedOption(null);
    } else {
      setShowResults(true);
    }
  };

  const restart = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setScore(0);
    setShowResults(false);
  };

  if (showResults) {
    const pct = Math.round((score / total) * 100);
    return (
      <div className="cyber-grid flex flex-1 items-center justify-center px-5 py-10 sm:px-8 sm:py-16">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="mx-auto w-full max-w-[800px] px-6 sm:px-12 md:px-16"
        >
          <div className="rounded-2xl border border-cyber-border bg-cyber-card p-10 sm:p-14 text-center">
            <Trophy
              className={`mx-auto mb-4 h-14 w-14 sm:h-16 sm:w-16 ${
                pct >= 70 ? "text-cyber-green" : "text-cyber-yellow"
              }`}
            />
            <h2 className="mb-2 text-2xl font-black sm:text-3xl">
              {t("legal.complete")}
            </h2>
            <div
              className={`my-5 text-5xl font-black sm:my-6 sm:text-6xl ${
                pct >= 70 ? "text-cyber-green" : pct >= 40 ? "text-cyber-yellow" : "text-cyber-red"
              }`}
            >
              {pct}%
            </div>
            <p className="mb-2 text-base text-cyber-text-dim sm:text-lg">
              {t("legal.correctCount")}{" "}
              <span className="font-bold text-cyber-text">{score}</span>{" "}
              {t("legal.of")}{" "}
              <span className="font-bold text-cyber-text">{total}</span>{" "}
              {t("legal.questions")}
            </p>
            <p className="mb-8 text-cyber-text-dim">
              {pct >= 70 ? t("legal.excellent") : t("legal.needMore")}
            </p>
            <button
              onClick={restart}
              className="mx-auto flex items-center gap-2 rounded-xl bg-cyber-purple px-6 py-3 font-bold text-white transition hover:bg-cyber-purple/80"
            >
              <RotateCcw className="h-5 w-5" />
              {t("legal.restart")}
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="cyber-grid flex flex-1 flex-col items-center px-5 py-10 sm:px-8 sm:py-16">
      <div className="my-auto w-full max-w-3xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center sm:mb-16"
        >
          <div className="mx-auto mb-6 inline-flex rounded-full border border-cyber-purple/20 bg-cyber-purple/10 p-5 sm:p-6">
            <Scale className="h-8 w-8 text-cyber-purple sm:h-9 sm:w-9" />
          </div>
          <h1 className="mb-4 text-2xl font-black sm:text-3xl">
            {t("legal.title")}
          </h1>
          <p className="text-sm text-cyber-text-dim sm:text-base">
            {t("legal.subtitle")}
          </p>
        </motion.div>

        {/* Progress */}
        <div className="mb-4 flex items-center justify-between text-xs text-cyber-text-dim sm:mb-6 sm:text-sm">
          <span>
            {t("legal.question")} {currentIndex + 1} {t("legal.of")} {total}
          </span>
          <span>
            {t("legal.score")}: {score}/{total}
          </span>
        </div>
        <div className="mb-8 h-2.5 overflow-hidden rounded-full bg-cyber-border sm:mb-10">
          <motion.div
            className="h-full rounded-full bg-cyber-purple"
            animate={{
              width: `${((currentIndex + (answered ? 1 : 0)) / total) * 100}%`,
            }}
            transition={{ duration: 0.5 }}
          />
        </div>

        {/* Question */}
        <AnimatePresence mode="wait">
          <motion.div
            key={question.id}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
          >
            <div className="mb-6 rounded-2xl border border-cyber-border bg-cyber-card p-6 sm:mb-8 sm:p-8">
              <div className="mb-5 flex items-center gap-3 sm:mb-6">
                <Gavel className="h-4 w-4 text-cyber-purple sm:h-5 sm:w-5" />
                <span className="text-xs font-bold text-cyber-purple sm:text-sm">
                  {t("legal.legalQ")}
                </span>
              </div>
              <h2 className="text-base font-bold leading-relaxed sm:text-xl">
                {question.question[locale]}
              </h2>
            </div>

            {/* Options */}
            <div className="space-y-3 sm:space-y-4">
              {question.options.map((opt, i) => {
                let borderColor =
                  "border-cyber-border hover:border-cyber-purple/40";
                let bg = "bg-cyber-card";
                let icon = null;

                if (answered) {
                  if (opt.correct) {
                    borderColor = "border-cyber-green/50";
                    bg = "bg-cyber-green/10";
                    icon = (
                      <CheckCircle2 className="h-5 w-5 shrink-0 text-cyber-green sm:h-6 sm:w-6" />
                    );
                  } else if (i === selectedOption && !opt.correct) {
                    borderColor = "border-cyber-red/50";
                    bg = "bg-cyber-red/10";
                    icon = (
                      <XCircle className="h-5 w-5 shrink-0 text-cyber-red sm:h-6 sm:w-6" />
                    );
                  }
                }

                return (
                  <button
                    key={i}
                    onClick={() => selectOption(i)}
                    disabled={answered}
                    className={`flex w-full items-center gap-5 rounded-xl border ${borderColor} ${bg} p-5 text-start transition-all sm:p-6`}
                  >
                    {icon || (
                      <div className="h-5 w-5 shrink-0 rounded-full border-2 border-cyber-border sm:h-6 sm:w-6" />
                    )}
                    <span className="text-sm font-semibold sm:text-base">
                      {opt.label[locale]}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Explanation */}
            <AnimatePresence>
              {answered && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-6 space-y-5 sm:mt-8 sm:space-y-6"
                >
                  <div className="rounded-2xl border border-cyber-border bg-cyber-card p-6 sm:p-8">
                    <p className="mb-4 text-xs font-bold text-cyber-cyan sm:mb-5 sm:text-sm">
                      {t("legal.explanation")}:
                    </p>
                    <p className="text-xs leading-relaxed text-cyber-text-dim sm:text-sm">
                      {question.explanation[locale]}
                    </p>
                    <div className="mt-3 inline-flex rounded-lg bg-cyber-purple/10 px-3 py-1">
                      <span className="text-[11px] font-semibold text-cyber-purple sm:text-xs">
                        {question.law}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={next}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-cyber-purple py-4 text-sm font-bold text-white transition hover:bg-cyber-purple/80 sm:text-base"
                  >
                    {currentIndex < total - 1
                      ? t("legal.next")
                      : t("legal.showResults")}
                    <Arrow className="h-5 w-5" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
