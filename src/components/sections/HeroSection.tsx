"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { smoothScrollTo } from "@/lib/utils";
import { useLang } from "@/context/LangContext";
import { translations as T } from "@/lib/i18n";
import { ScrollScaleBanner } from "./ScrollScaleBanner";

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
      className="relative min-h-screen flex flex-col items-center justify-center px-2 sm:px-4 pt-28 pb-16 bg-[#fafbfc] dark:bg-[#080c14] overflow-hidden"
    >
      {/* 0. Banner ẩn dưới nền toàn trang (Hiển thị rõ nét qua lớp blur nhẹ, tạo không gian vũ trụ STIC) */}
      <div className="absolute inset-x-0 top-0 h-[90vh] max-h-[920px] pointer-events-none overflow-hidden z-0 select-none">
        <Image
          src="/banner.png"
          alt="Ambient Background Banner"
          fill
          priority
          sizes="100vw"
          className="object-cover object-top scale-105 blur-xl md:blur-2xl opacity-70 dark:opacity-45"
        />
        {/* Lớp gradient làm dịu chữ phía trên và hòa dần vào màu nền ở chân đáy */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#fafbfc]/40 via-[#fafbfc]/20 to-[#fafbfc] dark:from-[#080c14]/50 dark:via-[#080c14]/30 dark:to-[#080c14]" />
      </div>

      {/* 1. Header Text Area (Nằm nổi phía trên z-10) */}
      <div className="relative z-10 max-w-4xl w-full mx-auto text-center flex flex-col items-center px-4">
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
        <motion.div {...fade(0.24)} className="mt-9 flex flex-col sm:flex-row items-center gap-3.5">
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
      </div>

      {/* 2. Banner Showcase Container — Nổi trên z-10 */}
      <div className="relative z-10 w-full max-w-[98vw] 2xl:max-w-[1720px] mx-auto mt-6 md:mt-8">
        <ScrollScaleBanner
          imageSrc="/banner.png"
          title="STIC Club Showcase"
        />
      </div>

      {/* 3. Stats Grid Container */}
      <div className="relative z-10 max-w-3xl w-full mx-auto text-center mt-6 px-4">
        <motion.div
          {...fade(0.32)}
          className="w-full grid grid-cols-1 sm:grid-cols-3 gap-3.5"
        >
          {[
            { value: t(T.hero.stat1v), label: t(T.hero.stat1l), icon: "✦" },
            { value: t(T.hero.stat2v), label: t(T.hero.stat2l), icon: "⚡" },
            { value: t(T.hero.stat3v), label: t(T.hero.stat3l), icon: "🚀" },
          ].map((s) => (
            <div
              key={s.label}
              className="liquid-glass rounded-2xl p-4 transition-transform duration-300 hover:scale-[1.03] text-center"
            >
              <div className="flex items-center justify-center gap-1.5">
                <span className="text-blue-500 text-xs font-bold">{s.icon}</span>
                <p className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">{s.value}</p>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 font-medium">{s.label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll hint with Liquid Glass Pill */}
      <motion.button
        onClick={() => smoothScrollTo("about")}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="relative z-10 mt-14 inline-flex items-center justify-center w-10 h-10 rounded-full liquid-glass text-slate-500 dark:text-slate-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors cursor-pointer hover:scale-110"
        aria-label="Cuộn xuống"
      >
        <motion.div animate={{ y: [0, 4, 0] }} transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}>
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </motion.button>
    </section>
  );
}
