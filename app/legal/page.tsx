"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Scale,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Gavel,
  AlertTriangle,
  Flame,
} from "lucide-react";
import { useI18n, type Locale } from "@/lib/i18n";
import { useGame } from "@/lib/game";
import { QuestionTimer } from "@/components/QuestionTimer";
import { ConfettiBurst } from "@/components/ConfettiBurst";
import { XPToast } from "@/components/XPToast";
import { GameResults } from "@/components/GameResults";

interface LegalQuestion {
  id: number;
  question: Record<Locale, string>;
  options: { label: Record<Locale, string>; correct: boolean }[];
  explanation: Record<Locale, string>;
  law: string;
}

export default function LegalPage() {
  const { t, locale } = useI18n();
  const { addXP, recordAnswer, currentStreak, resetSession } = useGame();
  const Arrow = locale === "ar" ? ChevronLeft : ChevronRight;

  const [questions, setQuestions] = useState<LegalQuestion[]>([]);
  const [loadingQuestions, setLoadingQuestions] = useState(true);
  const [questionsError, setQuestionsError] = useState<string | null>(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);

  // Game state
  const [timerKey, setTimerKey] = useState(0);
  const [timerActive, setTimerActive] = useState(true);
  const [showConfetti, setShowConfetti] = useState(false);
  const [shake, setShake] = useState(false);
  const [sessionXP, setSessionXP] = useState(0);
  const [xpToast, setXpToast] = useState<{ xp: number; reason: string; show: boolean }>({
    xp: 0,
    reason: "",
    show: false,
  });
  const [sessionBestStreak, setSessionBestStreak] = useState(0);
  const timerRef = useRef<HTMLDivElement>(null);

  const loadQuestions = useCallback(async () => {
    setLoadingQuestions(true);
    setQuestionsError(null);
    try {
      const res = await fetch("/api/generate-questions", { method: "POST" });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.details || `API error: ${res.status}`);
      }
      const data = await res.json();
      setQuestions(data.questions);
    } catch (err) {
      setQuestionsError(err instanceof Error ? err.message : "Failed to generate questions");
    } finally {
      setLoadingQuestions(false);
    }
  }, []);

  useEffect(() => {
    resetSession();
    loadQuestions();
  }, [loadQuestions, resetSession]);

  const question = questions[currentIndex];
  const total = questions.length;
  const answered = selectedOption !== null;

  const showXPToast = useCallback((xp: number, reason: string) => {
    setXpToast({ xp, reason, show: true });
    setTimeout(() => setXpToast((prev) => ({ ...prev, show: false })), 2000);
  }, []);

  const selectOption = (index: number) => {
    if (answered) return;
    setSelectedOption(index);
    setTimerActive(false);

    const correct = question.options[index].correct;

    // Get elapsed time from timer
    const timerEl = timerRef.current?.querySelector("[data-elapsed]");
    const elapsed = timerEl ? parseFloat(timerEl.getAttribute("data-elapsed") || "20") : 20;

    if (correct) {
      setScore((s) => s + 1);
      recordAnswer(true);
      const xp = addXP(50, elapsed, "medium");
      setSessionXP((s) => s + xp);

      const reasons: string[] = [];
      if (elapsed < 5) reasons.push(t("game.speedBonus"));
      if (currentStreak + 1 > 1) reasons.push(`${currentStreak + 1}x ${t("game.combo")}`);
      showXPToast(xp, reasons.join(" "));

      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 2000);
    } else {
      recordAnswer(false);
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }

    setSessionBestStreak((prev) => Math.max(prev, correct ? currentStreak + 1 : prev));
  };

  const handleTimeout = useCallback(() => {
    if (selectedOption !== null) return;
    setTimerActive(false);
    recordAnswer(false);
    setShake(true);
    setTimeout(() => setShake(false), 500);
    // Auto-advance after timeout
    setTimeout(() => {
      if (currentIndex < total - 1) {
        setCurrentIndex((i) => i + 1);
        setSelectedOption(null);
        setTimerKey((k) => k + 1);
        setTimerActive(true);
      } else {
        setShowResults(true);
      }
    }, 1500);
  }, [selectedOption, currentIndex, total, recordAnswer]);

  const next = () => {
    if (currentIndex < total - 1) {
      setCurrentIndex((i) => i + 1);
      setSelectedOption(null);
      setTimerKey((k) => k + 1);
      setTimerActive(true);
    } else {
      setShowResults(true);
    }
  };

  const restart = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setScore(0);
    setShowResults(false);
    setTimerKey((k) => k + 1);
    setTimerActive(true);
    setSessionXP(0);
    setSessionBestStreak(0);
    resetSession();
    loadQuestions();
  };

  // --------------- Loading questions ---------------
  if (loadingQuestions) {
    return (
      <div className="cyber-grid flex flex-1 items-center justify-center px-5 py-10 sm:px-8 sm:py-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center gap-6 text-center"
        >
          <div className="relative h-20 w-20">
            <div className="absolute inset-0 animate-spin rounded-full border-4 border-cyber-border border-t-cyber-purple" />
            <Scale className="absolute inset-4 h-12 w-12 text-cyber-purple" />
          </div>
          <div>
            <h2 className="mb-2 text-xl font-bold">{t("legal.title")}</h2>
            <p className="text-sm text-cyber-text-dim">
              {t("legal.generating")}
            </p>
          </div>
        </motion.div>
      </div>
    );
  }

  // --------------- Error ---------------
  if (questionsError) {
    return (
      <div className="cyber-grid flex flex-1 items-center justify-center px-5 py-10 sm:px-8 sm:py-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-lg rounded-2xl border border-cyber-red/30 bg-cyber-red/5 p-8 text-center sm:p-10"
        >
          <AlertTriangle className="mx-auto mb-6 h-12 w-12 text-cyber-red" />
          <h2 className="mb-3 text-xl font-bold text-cyber-red">
            {t("legal.error")}
          </h2>
          <p className="mb-6 text-sm leading-relaxed text-cyber-text-dim">
            {questionsError}
          </p>
          <button
            onClick={loadQuestions}
            className="mx-auto flex items-center gap-2 rounded-xl bg-cyber-purple px-6 py-3 font-bold text-white transition hover:bg-cyber-purple/80"
          >
            <RotateCcw className="h-5 w-5" />
            {t("legal.retry")}
          </button>
        </motion.div>
      </div>
    );
  }

  if (!question) return null;

  // --------------- Results screen ---------------
  if (showResults) {
    return (
      <GameResults
        sessionXP={sessionXP}
        correctCount={score}
        totalCount={total}
        bestStreak={sessionBestStreak}
        onRestart={restart}
        mode="legal"
      />
    );
  }

  // --------------- Quiz ---------------
  return (
    <div className={`cyber-grid flex flex-1 flex-col items-center justify-center px-5 py-10 sm:px-8 sm:py-16 ${shake ? "animate-shake" : ""}`}>
      <ConfettiBurst trigger={showConfetti} />
      <XPToast xp={xpToast.xp} reason={xpToast.reason} show={xpToast.show} />

      <div className="w-full max-w-3xl">
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
          <div className="flex items-center gap-3">
            {/* Combo badge */}
            {currentStreak > 1 && (
              <div className="animate-combo-pop flex items-center gap-1 rounded-lg border border-cyber-yellow/30 bg-cyber-yellow/10 px-2.5 py-1">
                <Flame className="h-3 w-3 text-cyber-yellow" />
                <span className="text-xs font-bold text-cyber-yellow">
                  {currentStreak}x
                </span>
              </div>
            )}
            <span>
              {t("legal.score")}: {score}/{total}
            </span>
          </div>
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

        {/* Timer bar */}
        <div ref={timerRef} className="mb-6">
          <QuestionTimer
            key={timerKey}
            duration={20}
            onTimeout={handleTimeout}
            isActive={timerActive}
            isPaused={answered}
            variant="bar"
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
