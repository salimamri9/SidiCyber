"use client";

import { useEffect } from "react";
import { useI18n } from "@/lib/i18n";

export function DirUpdater() {
  const { locale, dir } = useI18n();

  useEffect(() => {
    document.documentElement.dir = dir;
    document.documentElement.lang = locale;
    document.body.style.fontFamily =
      locale === "ar"
        ? "var(--font-cairo), sans-serif"
        : "var(--font-inter), sans-serif";
  }, [locale, dir]);

  return null;
}
