"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Shield, Menu, X, Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useI18n, type Locale } from "@/lib/i18n";
import { XPBar } from "@/components/XPBar";

const langLabels: Record<Locale, string> = {
  ar: "عربي",
  en: "EN",
  fr: "FR",
};

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const { t, locale, setLocale } = useI18n();

  const links = [
    { href: "/", label: t("nav.home") },
    { href: "/simulator", label: t("nav.simulator") },
    { href: "/analyzer", label: t("nav.analyzer") },
    { href: "/legal", label: t("nav.legal") },
    { href: "/news", label: t("nav.news") },
    { href: "/tips", label: t("nav.tips") },
  ];

  return (
    <nav className="fixed top-0 right-0 left-0 z-50 border-b border-cyber-border bg-cyber-darker/90 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <Shield className="h-6 w-6 text-cyber-cyan" />
          <span className="text-base font-bold text-cyber-cyan">
            SidiCyber
          </span>
        </Link>

        {/* Center nav links — desktop */}
        <div className="hidden flex-1 justify-center md:flex">
          <div className="flex items-center gap-1">
            {links.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative whitespace-nowrap rounded-lg px-3.5 py-2 text-sm tracking-wide transition-colors ${
                    active
                      ? "font-bold text-cyber-cyan"
                      : "font-medium text-cyber-text-dim hover:text-cyber-text"
                  }`}
                >
                  {active && (
                    <motion.div
                      layoutId="navbar-active"
                      className="absolute inset-0 rounded-lg bg-cyber-cyan/10"
                      transition={{
                        type: "spring",
                        bounce: 0.2,
                        duration: 0.5,
                      }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* XP Bar — desktop only */}
        <XPBar />

        {/* Language — right side */}
        <div className="relative ms-auto shrink-0 md:ms-0">
          <button
            onClick={() => setLangOpen(!langOpen)}
            className="flex items-center gap-1.5 rounded-lg border border-cyber-border px-3 py-1.5 text-xs font-semibold text-cyber-text-dim transition-colors hover:border-cyber-cyan/30 hover:text-cyber-text"
          >
            <Globe className="h-3.5 w-3.5" />
            {langLabels[locale]}
          </button>
          <AnimatePresence>
            {langOpen && (
              <motion.div
                initial={{ opacity: 0, y: -4, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -4, scale: 0.95 }}
                transition={{ duration: 0.12 }}
                className="absolute top-full mt-2 end-0 w-32 overflow-hidden rounded-xl border border-cyber-border bg-cyber-card shadow-2xl"
              >
                {(["ar", "en", "fr"] as Locale[]).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => {
                      setLocale(lang);
                      setLangOpen(false);
                    }}
                    className={`flex w-full items-center gap-2 px-4 py-2.5 text-sm transition-colors ${
                      locale === lang
                        ? "bg-cyber-cyan/10 font-semibold text-cyber-cyan"
                        : "text-cyber-text-dim hover:bg-cyber-border/30 hover:text-cyber-text"
                    }`}
                  >
                    {lang === "ar"
                      ? "العربية"
                      : lang === "en"
                        ? "English"
                        : "Français"}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Mobile hamburger */}
        <button
          className="ms-3 p-1.5 text-cyber-text-dim md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="max-h-[calc(100vh-4rem)] overflow-y-auto border-t border-cyber-border bg-cyber-darker/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col gap-1 p-3">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
                    pathname === link.href
                      ? "bg-cyber-cyan/10 text-cyber-cyan"
                      : "text-cyber-text-dim hover:text-cyber-text"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
