"use client";

import React from "react";
import { SectionWrapper } from "@/components/common/SectionWrapper";
import { useLang } from "@/context/LangContext";
import { translations as T } from "@/lib/i18n";

export function StatsSection() {
  const { t } = useLang();

  const STATS = [
    { value: t(T.stats.s1v), label: t(T.stats.s1l), note: t(T.stats.s1n) },
    { value: t(T.stats.s2v), label: t(T.stats.s2l), note: t(T.stats.s2n) },
    { value: t(T.stats.s3v), label: t(T.stats.s3l), note: t(T.stats.s3n) },
    { value: t(T.stats.s4v), label: t(T.stats.s4l), note: t(T.stats.s4n) },
  ];

  return (
    <SectionWrapper
      id="stats"
      className="py-16 bg-white dark:bg-[#0a0a0a] border-t border-slate-100 dark:border-slate-900"
    >
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
          {STATS.map((s) => (
            <div key={s.label} className="flex flex-col items-center">
              <p className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">{s.value}</p>
              <p className="mt-1 text-xs font-semibold text-blue-600 dark:text-blue-400">{s.label}</p>
              <p className="mt-1 text-[11px] text-slate-400 dark:text-slate-600">{s.note}</p>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
