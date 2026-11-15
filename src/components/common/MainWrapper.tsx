"use client";

import React from "react";
import { useLang } from "@/context/LangContext";

export function MainWrapper({ children }: { children: React.ReactNode }) {
  const { contentVisible } = useLang();

  return (
    <main
      className={`flex-1 transition-opacity duration-200 ease-out ${
        contentVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      {children}
    </main>
  );
}
