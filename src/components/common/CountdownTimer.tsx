"use client";

import React from "react";
import { motion } from "framer-motion";
import { Clock, ArrowRight, Sparkles } from "lucide-react";
import { smoothScrollTo } from "@/lib/utils";
import { useLang } from "@/context/LangContext";
import { translations as T } from "@/lib/i18n";

interface CountdownTimerProps {
  className?: string;
}

export function CountdownTimer({ className = "" }: CountdownTimerProps) {
  const { t } = useLang();

  const BLOCKS = [
    { label: t(T.countdown.days) },
    { label: t(T.countdown.hours) },
    { label: t(T.countdown.minutes) },
    { label: t(T.countdown.seconds) },
  ];

  return (
    <div
      className={`relative w-full max-w-3xl mx-auto rounded-3xl liquid-glass border border-slate-200/50 dark:border-white/10 p-6 sm:p-8 overflow-hidden shadow-xl shadow-blue-500/5 ${className}`}
    >
      {/* Background ambient gradient glow */}
      <div className="absolute -top-24 -right-24 w-60 h-60 rounded-full bg-blue-500/10 dark:bg-blue-500/15 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-60 h-60 rounded-full bg-indigo-500/10 dark:bg-purple-500/10 blur-3xl pointer-events-none" />

      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6 text-center sm:text-left">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 dark:bg-blue-400/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <Clock className="w-3.5 h-3.5 animate-spin-slow" />
            <span>{t(T.countdown.badge)}</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
            {t(T.countdown.title)}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {t(T.countdown.sub)}
          </p>
        </div>

        {/* Action Button */}
        <button
          onClick={() => smoothScrollTo("join")}
          className="group shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-semibold shadow-md shadow-blue-600/20 hover:shadow-blue-600/35 hover:scale-[1.03] transition-all cursor-pointer"
        >
          <span>{t(T.countdown.cta)}</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* 4 Countdown Blocks (Displaying "SOON!" per user specification) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 my-2">
        {BLOCKS.map((block, idx) => (
          <motion.div
            key={block.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.08, duration: 0.4 }}
            className="relative flex flex-col items-center justify-center p-4 sm:p-5 rounded-2xl bg-white/70 dark:bg-slate-900/60 border border-slate-200/60 dark:border-white/10 shadow-inner group hover:border-blue-400/40 dark:hover:border-blue-400/30 transition-colors"
          >
            {/* Specular edge */}
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />

            {/* Glowing Soon text */}
            <div className="relative">
              <span className="text-2xl sm:text-3xl font-extrabold tracking-wider bg-gradient-to-r from-blue-600 via-sky-500 to-indigo-600 dark:from-blue-400 dark:via-sky-300 dark:to-indigo-400 bg-clip-text text-transparent uppercase select-none animate-pulse">
                {t(T.countdown.soon)}
              </span>
            </div>

            {/* Block label (Days, Hours, Mins, Secs) */}
            <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mt-1">
              {block.label}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Bottom Status bar */}
      <div className="mt-5 pt-4 border-t border-slate-200/40 dark:border-white/5 flex items-center justify-center gap-2 text-center text-xs text-slate-500 dark:text-slate-400 font-medium">
        <Sparkles className="w-3.5 h-3.5 text-blue-500 shrink-0 animate-pulse" />
        <span>{t(T.countdown.status)}</span>
      </div>
    </div>
  );
}

