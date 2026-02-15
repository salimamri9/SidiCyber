"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Send,
  AlertTriangle,
  ShieldCheck,
  ShieldX,
  Sparkles,
  RotateCcw,
  MessageSquare,
  Link2,
  Mail,
} from "lucide-react";
import { RiskMeter } from "@/components/RiskMeter";
import { useI18n } from "@/lib/i18n";

interface AnalysisResult {
  riskScore: number;
  verdict: string;
  redFlags: string[];
  explanation: string;
  recommendation: string;
}

export default function AnalyzerPage() {
  const { t } = useI18n();
  const [input, setInput] = useState("");
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [streamText, setStreamText] = useState("");

  const exampleMessages = [
    {
      icon: MessageSquare,
      label: t("analyzer.example.sms"),
      text: "البريد التونسي: طردك في انتظارك. ادفع 12 دينار رسوم التوصيل عبر الرابط: http://poste-tn.xyz/pay قبل انتهاء المهلة خلال 24 ساعة.",
    },
    {
      icon: Mail,
      label: t("analyzer.example.email"),
      text: "تهانينا! ربحت جائزة 50000 دينار من Ooredoo. لاستلام الجائزة أرسل رقم بطاقة هويتك ورقم حسابك البنكي إلى: prizes@ooredoo-win.com",
    },
    {
      icon: Link2,
      label: t("analyzer.example.link"),
      text: "http://facebook-login-secure.tk/verify?user=tn",
    },
  ];

  const analyze = async (text?: string) => {
    const message = text || input;
    if (!message.trim()) return;

    setLoading(true);
    setResult(null);
    setError(null);
    setStreamText("");

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      if (!res.ok) throw new Error("API error");

      if (res.headers.get("content-type")?.includes("text/event-stream")) {
        const reader = res.body?.getReader();
        const decoder = new TextDecoder();
        let fullText = "";
        if (reader) {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            const chunk = decoder.decode(value);
            const lines = chunk.split("\n");
            for (const line of lines) {
              if (line.startsWith("data: ")) {
                const data = line.slice(6);
                if (data === "[DONE]") continue;
                try {
                  const parsed = JSON.parse(data);
                  if (parsed.text) {
                    fullText += parsed.text;
                    setStreamText(fullText);
                  }
                  if (parsed.result) setResult(parsed.result);
                } catch { /* skip */ }
              }
            }
          }
        }
      } else {
        const data = await res.json();
        setResult(data);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "AI analysis failed");
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setInput("");
    setResult(null);
    setError(null);
    setStreamText("");
  };

  return (
    <div className="cyber-grid flex flex-1 flex-col items-center px-5 py-10 sm:px-8 sm:py-16">
      <div className="my-auto w-full max-w-3xl">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center sm:mb-16"
        >
          <div className="mx-auto mb-6 inline-flex rounded-full border border-cyber-yellow/20 bg-cyber-yellow/10 p-5 sm:p-6">
            <Search className="h-8 w-8 text-cyber-yellow sm:h-10 sm:w-10" />
          </div>
          <h1 className="mb-4 text-3xl font-black sm:text-4xl">
            {t("analyzer.title")}
          </h1>
          <p className="text-sm text-cyber-text-dim sm:text-base">
            {t("analyzer.subtitle")}
          </p>
        </motion.div>

        {/* Input */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12 sm:mb-14"
        >
          <div className="overflow-hidden rounded-2xl border border-cyber-border bg-cyber-card">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t("analyzer.placeholder")}
              rows={5}
              dir="auto"
              className="w-full resize-none bg-transparent p-5 text-sm leading-relaxed text-cyber-text placeholder:text-cyber-text-dim/50 focus:outline-none sm:p-6 sm:text-base"
            />
            <div className="flex items-center justify-between border-t border-cyber-border px-5 py-3.5 sm:px-6 sm:py-4">
              <span className="text-[11px] text-cyber-text-dim sm:text-xs">
                {input.length > 0
                  ? `${input.length} ${t("analyzer.chars")}`
                  : t("analyzer.inputHint")}
              </span>
              <div className="flex gap-2.5">
                {result && (
                  <button
                    onClick={reset}
                    className="flex items-center gap-1.5 rounded-lg border border-cyber-border px-3 py-1.5 text-xs text-cyber-text-dim transition hover:bg-cyber-border/50 sm:px-4 sm:py-2 sm:text-sm"
                  >
                    <RotateCcw className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    {t("analyzer.clear")}
                  </button>
                )}
                <button
                  onClick={() => analyze()}
                  disabled={!input.trim() || loading}
                  className="glow-cyan flex items-center gap-1.5 rounded-lg bg-cyber-cyan px-4 py-1.5 text-xs font-bold text-cyber-darker transition-all hover:bg-cyber-cyan/90 disabled:opacity-50 disabled:shadow-none sm:gap-2 sm:px-6 sm:py-2 sm:text-sm"
                >
                  {loading ? (
                    <div className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-cyber-darker border-t-transparent sm:h-4 sm:w-4" />
                  ) : (
                    <Send className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  )}
                  {loading ? t("analyzer.analyzing") : t("analyzer.analyze")}
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Examples */}
        {!result && !loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-12 sm:mb-14"
          >
            <p className="mb-5 text-xs font-semibold tracking-wide text-cyber-text-dim sm:mb-6 sm:text-sm">
              {t("analyzer.tryExamples")}
            </p>
            <div className="grid gap-4 sm:grid-cols-3 sm:gap-5">
              {exampleMessages.map((ex, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setInput(ex.text);
                    analyze(ex.text);
                  }}
                  className="flex items-center gap-4 rounded-xl border border-cyber-border bg-cyber-card p-5 text-start transition-all hover:border-cyber-yellow/30 hover:bg-cyber-yellow/5 sm:gap-5 sm:p-6"
                >
                  <ex.icon className="h-5 w-5 shrink-0 text-cyber-yellow" />
                  <span className="text-xs text-cyber-text-dim sm:text-sm">
                    {ex.label}
                  </span>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Error */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl border border-cyber-red/30 bg-cyber-red/5 p-6 sm:p-8"
          >
            <div className="flex items-center gap-4">
              <AlertTriangle className="h-8 w-8 shrink-0 text-cyber-red" />
              <div>
                <p className="text-lg font-bold text-cyber-red">
                  {t("analyzer.error") || "Error"}
                </p>
                <p className="mt-2 text-sm text-cyber-text-dim">{error}</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Results */}
        <AnimatePresence>
          {(loading || result) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-6 sm:space-y-8"
            >
              {loading && (
                <div className="flex flex-col items-center gap-5 rounded-2xl border border-cyber-border bg-cyber-card py-12 sm:py-14">
                  <div className="relative h-14 w-14 sm:h-16 sm:w-16">
                    <div className="absolute inset-0 animate-spin rounded-full border-4 border-cyber-border border-t-cyber-yellow" />
                    <Search className="absolute inset-2.5 h-9 w-9 text-cyber-yellow sm:inset-3 sm:h-10 sm:w-10" />
                  </div>
                  <p className="text-sm text-cyber-text-dim">
                    {t("analyzer.loadingMsg")}
                  </p>
                  {streamText && (
                    <p className="max-w-md px-6 text-center text-xs leading-relaxed text-cyber-text-dim sm:text-sm">
                      {streamText}
                    </p>
                  )}
                </div>
              )}

              {result && (
                <div className="grid gap-6 sm:gap-8 lg:grid-cols-3">
                  {/* Risk meter */}
                  <div className="flex flex-col items-center rounded-2xl border border-cyber-border bg-cyber-card p-8 sm:p-10">
                    <h3 className="mb-6 text-sm font-bold tracking-wide text-cyber-text-dim sm:mb-8">
                      {t("analyzer.riskLevel")}
                    </h3>
                    <RiskMeter score={result.riskScore} />
                    <p className="mt-6 text-center text-sm font-semibold text-cyber-text-dim">
                      {result.verdict}
                    </p>
                  </div>

                  {/* Details */}
                  <div className="space-y-6 sm:space-y-8 lg:col-span-2">
                    {/* Red Flags */}
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                      className="rounded-2xl border border-cyber-red/20 bg-cyber-red/5 p-6 sm:p-8"
                    >
                      <div className="mb-4 flex items-center gap-3 sm:mb-5">
                        <AlertTriangle className="h-5 w-5 text-cyber-red sm:h-6 sm:w-6" />
                        <h3 className="text-base font-bold text-cyber-red">
                          {t("analyzer.redFlags")}
                        </h3>
                      </div>
                      <ul className="space-y-2.5 sm:space-y-3">
                        {result.redFlags.map((flag, i) => (
                          <motion.li
                            key={i}
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 + i * 0.1 }}
                            className="flex items-start gap-3 text-sm leading-relaxed text-cyber-text-dim"
                          >
                            <ShieldX className="mt-0.5 h-4 w-4 shrink-0 text-cyber-red sm:h-5 sm:w-5" />
                            {flag}
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>

                    {/* Analysis */}
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 }}
                      className="rounded-2xl border border-cyber-border bg-cyber-card p-6 sm:p-8"
                    >
                      <div className="mb-4 flex items-center gap-3 sm:mb-5">
                        <Sparkles className="h-5 w-5 text-cyber-cyan sm:h-6 sm:w-6" />
                        <h3 className="text-base font-bold text-cyber-cyan">
                          {t("analyzer.analysis")}
                        </h3>
                      </div>
                      <p className="text-sm leading-relaxed text-cyber-text-dim sm:text-base sm:leading-relaxed">
                        {result.explanation}
                      </p>
                    </motion.div>

                    {/* Recommendation */}
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 }}
                      className="rounded-2xl border border-cyber-green/20 bg-cyber-green/5 p-6 sm:p-8"
                    >
                      <div className="mb-4 flex items-center gap-3 sm:mb-5">
                        <ShieldCheck className="h-5 w-5 text-cyber-green sm:h-6 sm:w-6" />
                        <h3 className="text-base font-bold text-cyber-green">
                          {t("analyzer.whatToDo")}
                        </h3>
                      </div>
                      <p className="text-sm leading-relaxed text-cyber-text-dim sm:text-base sm:leading-relaxed">
                        {result.recommendation}
                      </p>
                    </motion.div>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
