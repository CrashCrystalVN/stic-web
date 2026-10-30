"use client";

import React from "react";
import { motion } from "framer-motion";
import { SectionWrapper } from "@/components/common/SectionWrapper";
import { useLang } from "@/context/LangContext";
import { translations as T } from "@/lib/i18n";

export function AboutSection() {
  const { t } = useLang();

  const ITEMS = [
    { title: t(T.about.item1t), desc: t(T.about.item1d) },
    { title: t(T.about.item2t), desc: t(T.about.item2d) },
    { title: t(T.about.item3t), desc: t(T.about.item3d) },
  ];

  const INFO_ROWS = [
    { label: t(T.about.r1l), value: t(T.about.r1v) },
    { label: t(T.about.r2l), value: t(T.about.r2v) },
    { label: t(T.about.r3l), value: t(T.about.r3v) },
    { label: t(T.about.r4l), value: t(T.about.r4v) },
    { label: t(T.about.r5l), value: "clbstic@gmail.com", link: "mailto:clbstic@gmail.com" },
    { label: t(T.about.r6l), value: t(T.about.r6v) },
  ];

  return (
    <SectionWrapper
      id="about"
      className="py-24 bg-white dark:bg-[#0a0a0a] border-t border-slate-100 dark:border-slate-900"
    >
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-blue-600 dark:text-blue-400 mb-5">
          {t(T.about.label)}
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
          {/* Left */}
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white leading-tight tracking-tight">
              {t(T.about.h2a)}<br />
              <span className="text-blue-600 dark:text-blue-400">{t(T.about.h2b)}</span> {t(T.about.h2c)}<br />
              {t(T.about.h2d)}
            </h2>
            <p className="mt-5 text-slate-500 dark:text-slate-400 leading-relaxed text-sm">
              <strong className="text-slate-700 dark:text-slate-200 font-medium">STIC</strong>{" "}
              {t(T.about.desc)}
            </p>

            <div className="mt-8 space-y-5">
              {ITEMS.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="flex gap-3"
                >
                  <div className="mt-0.5 w-4 h-4 rounded-full bg-blue-600 dark:bg-blue-500 shrink-0 flex items-center justify-center">
                    <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">{item.title}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="border border-slate-100 dark:border-slate-800 rounded-2xl overflow-hidden accent-glow"
          >
            <div className="px-5 py-4 bg-slate-50/50 dark:bg-slate-900/50 border-b border-slate-100 dark:border-slate-800">
              <p className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">{t(T.about.infoTitle)}</p>
              <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">{t(T.about.infoSub)}</p>
            </div>
            {INFO_ROWS.map((row, i) => (
              <div
                key={row.label}
                className={`flex items-center justify-between px-5 py-3 text-xs ${i < INFO_ROWS.length - 1 ? "border-b border-slate-100 dark:border-slate-800/80" : ""}`}
              >
                <span className="text-slate-400 dark:text-slate-500 shrink-0 w-32">{row.label}</span>
                {row.link ? (
                  <a href={row.link} className="text-blue-600 dark:text-blue-400 font-medium hover:underline text-right">
                    {row.value}
                  </a>
                ) : (
                  <span className="text-slate-800 dark:text-slate-200 font-medium text-right">{row.value}</span>
                )}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  );
}
