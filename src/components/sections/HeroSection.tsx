"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { smoothScrollTo } from "@/lib/utils";
import { useLang } from "@/context/LangContext";
import { translations as T } from "@/lib/i18n";

const fade = (delay = 0) => ({
  initial: { y: 12 },
  animate: { y: 0 },
  transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] },
});

export function HeroSection() {
  const { t } = useLang();

  return (
    <section
      id="hero"
      className="relative bg-[#fafbfc] dark:bg-[#080c14] overflow-hidden"
    >
      {/* Google Antigravity Ambient Background Atmosphere (Zero-Blur Radial Gradients) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none">
        <div
          className="absolute -top-[18%] left-1/2 -translate-x-1/2 w-[1100px] h-[700px] rounded-full"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(59,130,246,0.14) 0%, rgba(99,102,241,0.08) 42%, transparent 72%)",
          }}
        />
        <div
          className="absolute top-[30%] right-[-15%] w-[700px] h-[700px] rounded-full"
          style={{
            background:
              "radial-gradient(circle at center, rgba(168,85,247,0.08) 0%, transparent 65%)",
          }}
        />
      </div>

      {/* ========================================================
          SCREEN 1: WELCOME / HERO CONTENT (Google Antigravity Style)
          ======================================================== */}
      <div className="relative z-10 min-h-[85vh] lg:min-h-[92vh] flex flex-col items-center justify-center px-4 pt-28 pb-12 text-center max-w-5xl mx-auto">
        {/* Google Gemini Style Liquid Glass Live Badge */}
        <motion.div {...fade(0.04)} className="mb-6">
          <div
            data-swarm-atomic="true"
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full liquid-glass-pill shadow-sm hover:scale-[1.02] transition-transform"
          >
            <span className="text-blue-500 dark:text-blue-400 font-bold text-xs animate-pulse">✦</span>
            <span className="text-[11px] font-semibold text-slate-800 dark:text-slate-200 tracking-wider uppercase">
              {t(T.hero.badge)}
            </span>
            <span className="relative flex h-2 w-2 ml-0.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-60" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-gradient-to-r from-blue-500 to-purple-500 animate-gradient-flow" />
            </span>
          </div>
        </motion.div>

        {/* Heading with Google Gemini Aurora Gradient */}
        <motion.h1
          {...fade(0.1)}
          className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900 dark:text-white leading-[1.12] max-w-4xl drop-shadow-sm px-2"
        >
          {t(T.hero.heading1)}<br />{t(T.hero.heading2)}{" "}
          <span className="gradient-text gradient-text-home">STIC</span>
        </motion.h1>

        {/* Subtitle Tagline */}
        <motion.p {...fade(0.14)} className="mt-3 sm:mt-4 text-[10px] sm:text-xs text-slate-600 dark:text-slate-400 tracking-[0.2em] sm:tracking-[0.25em] uppercase font-semibold">
          {t(T.hero.tagline)}
        </motion.p>

        {/* Description */}
        <motion.p {...fade(0.18)} className="mt-5 sm:mt-6 text-sm sm:text-lg text-slate-700 dark:text-slate-300 max-w-xl leading-relaxed font-normal px-2">
          {t(T.hero.desc)}{" "}
          <span className="text-slate-900 dark:text-white font-semibold">{t(T.hero.descBold)}</span>
          {t(T.hero.descEnd)}
        </motion.p>

        {/* Google Gemini Style Liquid Glass CTA Buttons */}
        <motion.div {...fade(0.24)} className="mt-7 sm:mt-8 flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto max-w-xs sm:max-w-none">
          {/* Primary Gemini Gradient Button (Navigates to /join subpage) */}
          <Link
            href="/join"
            className="w-full sm:w-auto justify-center group relative inline-flex items-center gap-2.5 px-7 py-3.5 sm:py-3 rounded-full text-white text-sm font-semibold transition-all duration-300 cursor-pointer gradient-btn-home hover:brightness-110 text-center"
          >
            <span>{t(T.hero.cta1)}</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>

          {/* Secondary Liquid Glass Pill Button */}
          <button
            onClick={() => smoothScrollTo("about")}
            className="w-full sm:w-auto justify-center inline-flex items-center gap-2 px-7 py-3.5 sm:py-3 rounded-full liquid-glass text-slate-800 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white text-sm font-semibold transition-all duration-300 cursor-pointer hover:scale-[1.03] active:scale-[0.98] text-center"
          >
            <span>{t(T.hero.cta2)}</span>
          </button>
        </motion.div>

        {/* Quick Highlights / Stats Grid: 3 cột gọn gàng trên cả mobile & desktop */}
        <motion.div
          {...fade(0.3)}
          className="w-full max-w-lg sm:max-w-2xl grid grid-cols-3 gap-2 sm:gap-3 mt-8 sm:mt-10 px-2"
        >
          {([
            { value: t(T.hero.stat1v), label: t(T.hero.stat1l), icon: "✦" },
            { value: t(T.hero.stat2v), label: t(T.hero.stat2l), icon: "⚡" },
            { value: t(T.hero.stat3v), label: t(T.hero.stat3l), icon: "🚀" },
          ]).map((s) => (
            <div
              key={s.label}
              data-swarm-atomic="true"
              className="liquid-glass rounded-2xl py-2.5 sm:py-3 px-2 sm:px-4 transition-transform duration-300 hover:scale-[1.02] text-center"
            >
              <div className="flex items-center justify-center gap-1 sm:gap-1.5">
                <span className="text-blue-500 text-[10px] sm:text-xs font-bold">{s.icon}</span>
                <p className="text-lg sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">{s.value}</p>
              </div>
              <p className="text-[10px] sm:text-[11px] text-slate-600 dark:text-slate-400 mt-0.5 font-medium truncate">{s.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Scroll hint button inviting scroll into about */}
        <motion.button
          onClick={() => smoothScrollTo("about")}
          initial={{ y: 6 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.4 }}
          className="mt-8 inline-flex items-center justify-center w-9 h-9 rounded-full liquid-glass text-slate-500 dark:text-slate-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors cursor-pointer hover:scale-110"
          aria-label="Scroll to about"
        >
          <ArrowRight className="w-4 h-4 rotate-90" />
        </motion.button>
      </div>
    </section>
  );
}
