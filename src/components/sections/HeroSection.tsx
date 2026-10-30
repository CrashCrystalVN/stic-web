"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown, Image as ImageIcon } from "lucide-react";
import { smoothScrollTo } from "@/lib/utils";
import { useLang } from "@/context/LangContext";
import { translations as T } from "@/lib/i18n";

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
});

export function HeroSection() {
  const { t } = useLang();

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-16 bg-[#fafafa] dark:bg-[#080c14] overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-blue-500/5 dark:bg-blue-500/8 blur-3xl" />
      </div>

      <div className="relative max-w-3xl w-full mx-auto text-center flex flex-col items-center">

        {/* Banner placeholder */}
        <motion.div {...fade(0)} className="w-full mb-10">
          <div className="relative h-32 sm:h-40 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-300 dark:text-slate-700 transition-colors group hover:border-slate-300 dark:hover:border-slate-700">
            <div className="flex flex-col items-center gap-1.5">
              <ImageIcon className="w-5 h-5" />
              <span className="text-[11px] font-medium tracking-wide">{t(T.hero.bannerAlt)}</span>
            </div>
          </div>
        </motion.div>

        {/* Live badge */}
        <motion.div {...fade(0.08)} className="mb-5">
          <span className="inline-flex items-center gap-2 text-[11px] font-semibold text-blue-600 dark:text-blue-400 tracking-widest uppercase bg-blue-50 dark:bg-blue-950/50 border border-blue-200/60 dark:border-blue-800/60 px-3.5 py-1.5 rounded-full">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-60" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-blue-500" />
            </span>
            {t(T.hero.badge)}
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          {...fade(0.14)}
          className="text-4xl sm:text-6xl font-bold tracking-tight text-slate-900 dark:text-white leading-[1.1]"
        >
          {t(T.hero.heading1)}<br />{t(T.hero.heading2)}{" "}
          <span className="gradient-text">STIC</span>
        </motion.h1>

        <motion.p {...fade(0.18)} className="mt-3 text-[11px] text-slate-400 dark:text-slate-500 tracking-[0.2em] uppercase font-medium">
          {t(T.hero.tagline)}
        </motion.p>

        {/* Description */}
        <motion.p {...fade(0.22)} className="mt-6 text-base text-slate-500 dark:text-slate-400 max-w-lg leading-relaxed">
          {t(T.hero.desc)}{" "}
          <span className="text-slate-700 dark:text-slate-200 font-semibold">{t(T.hero.descBold)}</span>
          {t(T.hero.descEnd)}
        </motion.p>

        {/* CTAs */}
        <motion.div {...fade(0.28)} className="mt-8 flex flex-col sm:flex-row items-center gap-3">
          <button
            onClick={() => smoothScrollTo("join")}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition-all cursor-pointer shadow-lg shadow-blue-600/20 hover:shadow-blue-600/30"
          >
            {t(T.hero.cta1)}
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => smoothScrollTo("about")}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700 text-sm font-medium transition-all cursor-pointer"
          >
            {t(T.hero.cta2)}
          </button>
        </motion.div>

        {/* Stats */}
        <motion.div
          {...fade(0.34)}
          className="mt-14 pt-8 border-t border-slate-100 dark:border-slate-900 w-full grid grid-cols-3 gap-4 text-center"
        >
          {[
            { value: t(T.hero.stat1v), label: t(T.hero.stat1l) },
            { value: t(T.hero.stat2v), label: t(T.hero.stat2l) },
            { value: t(T.hero.stat3v), label: t(T.hero.stat3l) },
          ].map((s) => (
            <div key={s.label}>
              <p className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">{s.value}</p>
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">{s.label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.button
        onClick={() => smoothScrollTo("about")}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-slate-300 dark:text-slate-700 hover:text-blue-500 dark:hover:text-blue-500 transition-colors cursor-pointer"
      >
        <motion.div animate={{ y: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 2.4, ease: "easeInOut" }}>
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </motion.button>
    </section>
  );
}
