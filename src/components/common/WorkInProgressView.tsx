"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Hammer, Sparkles, Clock, Compass, ShieldCheck } from "lucide-react";
import { useLang } from "@/context/LangContext";

export function WorkInProgressView() {
  const { lang } = useLang();

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center px-4 py-16 overflow-hidden select-none">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center overflow-hidden">
        <div className="w-[600px] sm:w-[800px] h-[400px] rounded-full bg-gradient-to-tr from-blue-500/15 via-indigo-500/10 to-purple-500/15 dark:from-blue-500/20 dark:via-indigo-500/15 dark:to-purple-500/20 blur-[120px]" />
      </div>

      {/* Subtle tech background grid pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03] dark:opacity-[0.06]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
          backgroundSize: "32px 32px",
        }}
      />

      {/* Main glass card container */}
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-xl mx-auto rounded-3xl liquid-glass border border-slate-200/80 dark:border-white/10 shadow-2xl p-6 sm:p-10 text-center backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70"
      >
        {/* Top Floating Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 dark:bg-blue-400/10 border border-blue-500/20 dark:border-blue-400/20 text-blue-600 dark:text-blue-400 text-xs font-semibold uppercase tracking-wider mb-6">
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
          <span>{lang === "vi" ? "Hệ Thống Đang Nâng Cấp" : "System In Maintenance"}</span>
        </div>

        {/* STIC Official Logo with soft breathing animation */}
        <div className="relative w-24 h-24 mx-auto mb-6 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-blue-500/20 blur-xl animate-pulse" />
          <div className="relative w-20 h-20 rounded-2xl overflow-hidden border border-blue-400/40 dark:border-blue-500/30 shadow-lg p-2 bg-white/80 dark:bg-slate-950/80">
            <Image
              src="/logo.png"
              alt="STIC Logo"
              width={80}
              height={80}
              className="w-full h-full object-contain"
              priority
            />
          </div>
        </div>

        {/* Primary Heading */}
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Work In Progress
        </h1>

        {/* Secondary Title */}
        <p className="mt-2 text-sm sm:text-base font-semibold text-blue-600 dark:text-blue-400 tracking-wide uppercase">
          STIC // Science &amp; Technology Innovation Club
        </p>

        {/* Description text */}
        <p className="mt-4 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-md mx-auto">
          {lang === "vi"
            ? "Website CLB KHKT STIC đang trong giai đoạn hoàn thiện & chuẩn bị cho đợt công bố chính thức. Chúng tôi sẽ trở lại trong thời gian sớm nhất!"
            : "The STIC Club official website is currently undergoing planned upgrades and preparations for our official launch. We will be back very soon!"}
        </p>

        {/* Minimalist Info Chips */}
        <div className="mt-8 pt-6 border-t border-slate-200/80 dark:border-slate-800 grid grid-cols-2 gap-3 text-left">
          <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-slate-500/5 dark:bg-white/5 border border-slate-200/50 dark:border-white/5">
            <Clock className="w-4 h-4 text-sky-500 shrink-0" />
            <div>
              <p className="text-[10px] text-slate-400 uppercase font-mono tracking-wider">Status</p>
              <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                {lang === "vi" ? "Đang hoàn thiện" : "Under Dev"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-slate-500/5 dark:bg-white/5 border border-slate-200/50 dark:border-white/5">
            <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
            <div>
              <p className="text-[10px] text-slate-400 uppercase font-mono tracking-wider">Phase</p>
              <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                GEN 1.0 Release
              </p>
            </div>
          </div>
        </div>

        {/* Footer Contact note */}
        <div className="mt-8 text-xs text-slate-400 dark:text-slate-500 font-mono">
          © {new Date().getFullYear()} CLB KHKT STIC • THPT Đà Nẵng
        </div>
      </motion.div>
    </div>
  );
}

