"use client";

import React from "react";
import { motion } from "framer-motion";
import { SectionWrapper } from "@/components/common/SectionWrapper";
import { useLang } from "@/context/LangContext";
import { translations as T } from "@/lib/i18n";
import { LEADERS } from "@/lib/data";
import { GlitchLeaderCard } from "@/components/common/GlitchLeaderCard";

export function AboutSection() {
  const { t, lang } = useLang();

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
      className="py-24 bg-white dark:bg-[#080c14] border-t border-slate-100 dark:border-slate-900/80"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ========================================================
            PART 1: ABOUT US OVERVIEW & VISION
            ======================================================== */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full liquid-glass-pill mb-6">
          <span className="text-blue-500 font-bold text-xs animate-pulse">✦</span>
          <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-blue-600 dark:text-blue-400">
            {t(T.about.label)}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">
          {/* Left Column: Heading & 3 Pillars */}
          <div className="lg:col-span-7">
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white leading-[1.15] tracking-tight">
              {t(T.about.h2a)}<br />
              <span className="gradient-text">{t(T.about.h2b)}</span> {t(T.about.h2c)}<br />
              {t(T.about.h2d)}
            </h2>
            <p className="mt-5 text-slate-600 dark:text-slate-300 leading-relaxed text-sm sm:text-base font-normal">
              <strong className="text-slate-900 dark:text-white font-semibold">STIC</strong>{" "}
              {t(T.about.desc)}
            </p>

            <div className="mt-8 space-y-4 sm:space-y-5">
              {ITEMS.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="flex gap-3.5 p-3.5 rounded-2xl transition-colors hover:bg-slate-50 dark:hover:bg-slate-900/50"
                >
                  <div className="mt-0.5 w-5 h-5 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 shrink-0 flex items-center justify-center shadow-sm shadow-blue-500/20 animate-gradient-flow">
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">{item.title}</p>
                    <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Column: High-tech Info Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 rounded-3xl overflow-hidden liquid-glass border border-white/80 dark:border-white/10 shadow-xl"
          >
            <div className="px-6 py-5 bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-transparent border-b border-slate-200/80 dark:border-slate-800">
              <p className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">{t(T.about.infoTitle)}</p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{t(T.about.infoSub)}</p>
            </div>
            <div className="divide-y divide-slate-100 dark:divide-slate-800/80">
              {INFO_ROWS.map((row) => (
                <div
                  key={row.label}
                  className="flex items-center justify-between px-6 py-3.5 text-xs sm:text-[13px]"
                >
                  <span className="text-slate-500 dark:text-slate-400 shrink-0 font-medium">{row.label}</span>
                  {row.link ? (
                    <a href={row.link} className="text-blue-600 dark:text-blue-400 font-semibold hover:underline text-right">
                      {row.value}
                    </a>
                  ) : (
                    <span className="text-slate-900 dark:text-white font-semibold text-right">{row.value}</span>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ========================================================
            PART 2: 3 HORIZONTAL 4:3 GLITCH IMAGE LEADERSHIP SHOWCASE
            (Chủ nhiệm · Phó Chủ nhiệm · Điều phối viên)
            ======================================================== */}
        <div className="mt-24 pt-16 border-t border-slate-200/70 dark:border-slate-800/80">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full liquid-glass-pill mb-3">
              <span className="text-indigo-500 font-bold text-xs animate-pulse">✦</span>
              <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-indigo-600 dark:text-indigo-400">
                {t(T.about.leadersBadge)}
              </span>
            </div>
            <h3 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {t(T.about.leadersTitle)}
            </h3>
            <p className="mt-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-xl mx-auto">
              {t(T.about.leadersDesc)}
            </p>
          </div>

          {/* 3 Khung ảnh đặt ngang nhau tỉ lệ 4:3 với hiệu ứng glitchy khi lướt xuống */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {LEADERS.map((leader, idx) => (
              <GlitchLeaderCard
                key={leader.name}
                leader={leader}
                index={idx}
              />
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
