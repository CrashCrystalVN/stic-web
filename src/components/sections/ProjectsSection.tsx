"use client";

import React from "react";
import { motion } from "framer-motion";
import { SectionWrapper } from "@/components/common/SectionWrapper";
import { smoothScrollTo } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { useLang } from "@/context/LangContext";
import { translations as T } from "@/lib/i18n";

export function ProjectsSection() {
  const { t } = useLang();

  const FEATURES = [
    { label: t(T.projects.f1l), desc: t(T.projects.f1d) },
    { label: t(T.projects.f2l), desc: t(T.projects.f2d) },
    { label: t(T.projects.f3l), desc: t(T.projects.f3d) },
  ];

  return (
    <SectionWrapper
      id="projects"
      className="py-24 bg-white dark:bg-[#0a0a0a] border-t border-slate-100 dark:border-slate-900"
    >
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-blue-600 dark:text-blue-400 mb-4">
              {t(T.projects.label)}
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight leading-tight">
              {t(T.projects.h2a)}<br />
              <span className="text-blue-600 dark:text-blue-400">{t(T.projects.h2b)}</span> {t(T.projects.h2c)}
            </h2>
            <p className="mt-5 text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              {t(T.projects.desc)}
            </p>
            <button
              onClick={() => smoothScrollTo("join")}
              className="mt-8 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition-all cursor-pointer shadow-lg shadow-blue-600/20 group"
            >
              {t(T.projects.cta)}
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="space-y-3">
            <div className="mb-5 px-4 py-3 rounded-xl bg-blue-50/60 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/50 text-center">
              <span className="text-[10px] font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
                {t(T.projects.badge)}
              </span>
            </div>
            {FEATURES.map((f, i) => (
              <motion.div
                key={f.label}
                initial={{ opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="flex gap-4 p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/40 dark:bg-slate-900/40 hover:border-blue-100 dark:hover:border-blue-900 transition-colors"
              >
                <span className="text-[10px] font-mono font-bold text-blue-500 dark:text-blue-600 mt-0.5 shrink-0">0{i + 1}</span>
                <div>
                  <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">{f.label}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
