"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { smoothScrollTo } from "@/lib/utils";
import { useLang } from "@/context/LangContext";
import { translations as T } from "@/lib/i18n";
import { ScrollScaleBanner } from "./ScrollScaleBanner";
import { CountdownTimer } from "@/components/common/CountdownTimer";

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] },
});

export function HeroSection() {
  const { t } = useLang();

  return (
    <section
      id="hero"
      className="relative bg-[#fafbfc] dark:bg-[#080c14] overflow-hidden"
    >
      {/* Google Antigravity Ambient Background Atmosphere */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none">
        <div className="absolute -top-[10%] left-1/2 -translate-x-1/2 w-[1000px] h-[600px] rounded-full bg-gradient-to-b from-blue-500/15 via-indigo-500/10 to-transparent blur-[130px]" />
        <div className="absolute top-[40%] right-[-10%] w-[500px] h-[500px] rounded-full bg-purple-500/5 blur-[100px]" />
      </div>

      {/* ========================================================
          SCREEN 1: WELCOME / HERO CONTENT (Google Antigravity Style)
          ======================================================== */}
      <div className="relative z-10 min-h-[85vh] lg:min-h-[92vh] flex flex-col items-center justify-center px-4 pt-28 pb-12 text-center max-w-5xl mx-auto">
        {/* Google Gemini Style Liquid Glass Live Badge */}
        <motion.div {...fade(0.04)} className="mb-6">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full liquid-glass-pill shadow-sm hover:scale-[1.02] transition-transform">
            <span className="text-blue-500 dark:text-blue-400 font-bold text-xs animate-pulse">✦</span>
            <span className="text-[11px] font-semibold text-slate-800 dark:text-slate-200 tracking-wider uppercase">
              {t(T.hero.badge)}
            </span>
            <span className="relative flex h-2 w-2 ml-0.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-60" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-gradient-to-r from-blue-500 to-purple-500" />
            </span>
          </div>
        </motion.div>

        {/* Heading with Google Gemini Aurora Gradient */}
        <motion.h1
          {...fade(0.1)}
          className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-slate-900 dark:text-white leading-[1.1] max-w-4xl drop-shadow-sm"
        >
          {t(T.hero.heading1)}<br />{t(T.hero.heading2)}{" "}
          <span className="gradient-text">STIC</span>
        </motion.h1>

        {/* Subtitle Tagline */}
        <motion.p {...fade(0.14)} className="mt-4 text-[11px] sm:text-xs text-slate-600 dark:text-slate-400 tracking-[0.25em] uppercase font-semibold">
          {t(T.hero.tagline)}
        </motion.p>

        {/* Description */}
        <motion.p {...fade(0.18)} className="mt-6 text-base sm:text-lg text-slate-700 dark:text-slate-300 max-w-xl leading-relaxed font-normal">
          {t(T.hero.desc)}{" "}
          <span className="text-slate-900 dark:text-white font-semibold">{t(T.hero.descBold)}</span>
          {t(T.hero.descEnd)}
        </motion.p>

        {/* Google Gemini Style Liquid Glass CTA Buttons */}
        <motion.div {...fade(0.24)} className="mt-8 flex flex-col sm:flex-row items-center gap-3.5">
          {/* Primary Gemini Gradient Button */}
          <button
            onClick={() => smoothScrollTo("join")}
            className="group relative inline-flex items-center gap-2.5 px-7 py-3 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:via-indigo-500 hover:to-purple-500 text-white text-sm font-semibold transition-all duration-300 cursor-pointer shadow-xl shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-[1.03] active:scale-[0.98]"
          >
            <span className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            <span>{t(T.hero.cta1)}</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>

          {/* Secondary Liquid Glass Pill Button */}
          <button
            onClick={() => smoothScrollTo("about")}
            className="inline-flex items-center gap-2 px-7 py-3 rounded-full liquid-glass text-slate-800 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white text-sm font-semibold transition-all duration-300 cursor-pointer hover:scale-[1.03] active:scale-[0.98]"
          >
            <span>{t(T.hero.cta2)}</span>
          </button>
        </motion.div>

        {/* Quick Highlights / Stats Grid */}
        <motion.div
          {...fade(0.3)}
          className="w-full max-w-2xl grid grid-cols-1 sm:grid-cols-3 gap-3 mt-10"
        >
          {[
            { value: t(T.hero.stat1v), label: t(T.hero.stat1l), icon: "✦" },
            { value: t(T.hero.stat2v), label: t(T.hero.stat2l), icon: "⚡" },
            { value: t(T.hero.stat3v), label: t(T.hero.stat3l), icon: "🚀" },
          ].map((s) => (
            <div
              key={s.label}
              className="liquid-glass rounded-2xl py-3 px-4 transition-transform duration-300 hover:scale-[1.02] text-center"
            >
              <div className="flex items-center justify-center gap-1.5">
                <span className="text-blue-500 text-xs font-bold">{s.icon}</span>
                <p className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">{s.value}</p>
              </div>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5 font-medium">{s.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Countdown Timer (Đóng đơn GEN 1.0 - Trạng thái Soon!) */}
        <motion.div {...fade(0.36)} className="w-full max-w-3xl mt-8">
          <CountdownTimer />
        </motion.div>

        {/* Scroll hint button inviting scroll into showcase */}
        <motion.button
          onClick={() => smoothScrollTo("showcase")}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-8 inline-flex items-center justify-center w-9 h-9 rounded-full liquid-glass text-slate-500 dark:text-slate-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors cursor-pointer hover:scale-110"
          aria-label="Cuộn xuống khám phá"
        >
          <motion.div animate={{ y: [0, 4, 0] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}>
            <ChevronDown className="w-4 h-4" />
          </motion.div>
        </motion.button>
      </div>

      {/* ========================================================
          SCREEN 2: GOOGLE ANTIGRAVITY SHOWCASE BANNER
          ======================================================== */}
      <div id="showcase" className="relative z-10 w-full pb-16 md:pb-24">
        <ScrollScaleBanner
          imageSrc={null}
          title="STIC Ecosystem Showcase"
        />
      </div>
    </section>
  );
}
