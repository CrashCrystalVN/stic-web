"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import type { Lang } from "@/lib/i18n";

interface LangContextValue {
  lang: Lang;
  toggle: () => void;
  t: (obj: { vi: string; en: string }) => string;
  contentVisible: boolean;
}

const LangContext = createContext<LangContextValue>({
  lang: "vi",
  toggle: () => {},
  t: (obj) => obj.vi,
  contentVisible: true,
});

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("vi");
  const [contentVisible, setContentVisible] = useState(true);

  const toggle = useCallback(() => {
    // Step 1: fade OUT (250ms)
    setContentVisible(false);

    // Step 2: switch language at the middle of transition
    setTimeout(() => {
      setLang((prev) => (prev === "vi" ? "en" : "vi"));

      // Step 3: fade IN
      setTimeout(() => {
        setContentVisible(true);
      }, 50);
    }, 280);
  }, []);

  const t = useCallback(
    (obj: { vi: string; en: string }) => obj[lang],
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
