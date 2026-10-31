"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import type { Lang } from "@/lib/i18n";

interface LangContextValue {
  lang: Lang;
  toggle: () => void;
  t: (obj: { vi: string; en: string }) => string;
  contentVisible: boolean;
}

const LangContext = createContext<LangContextValue>({
  lang: "en",
  toggle: () => {},
  t: (obj) => obj.en,
  contentVisible: true,
});

export function LangProvider({ children }: { children: React.ReactNode }) {
  // Mặc định ngôn ngữ Tiếng Anh (English)
  const [lang, setLang] = useState<Lang>("en");
  const [contentVisible, setContentVisible] = useState(true);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("stic_lang_v2") as Lang;
      if (saved === "vi" || saved === "en") {
        setLang(saved);
      } else {
        setLang("en");
        localStorage.setItem("stic_lang_v2", "en");
      }
    } catch {
      // Ignore localStorage errors in SSR / private mode
    }
  }, []);

  const toggle = useCallback(() => {
    // Step 1: fade OUT (250ms)
    setContentVisible(false);

    // Step 2: switch language at the middle of transition
    setTimeout(() => {
      setLang((prev) => {
        const next: Lang = prev === "vi" ? "en" : "vi";
        try {
          localStorage.setItem("stic_lang_v2", next);
        } catch {
          // Ignore
        }
        return next;
      });

      // Step 3: fade IN
      setTimeout(() => {
        setContentVisible(true);
      }, 50);
    }, 280);
  }, []);

  const t = useCallback(
    (obj: { vi: string; en: string }) => obj[lang] || obj.en,
    [lang]
  );

  return (
    <LangContext.Provider value={{ lang, toggle, t, contentVisible }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}
