"use client";

import { useEffect } from "react";
import { useI18n } from "@/lib/i18n";

export function DirUpdater() {
  const { locale, dir } = useI18n();

  useEffect(() => {
    document.documentElement.dir = dir;
    document.documentElement.lang = locale;
  }, [locale, dir]);

  return null;
}
