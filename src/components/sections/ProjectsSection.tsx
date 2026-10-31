"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { SectionWrapper } from "@/components/common/SectionWrapper";
import { smoothScrollTo } from "@/lib/utils";
import { ArrowRight, Sparkles, Rocket, Layers } from "lucide-react";
import { useLang } from "@/context/LangContext";
import { translations as T } from "@/lib/i18n";
import { TEAMS } from "@/lib/data";

export function ProjectsSection() {
  const { t, lang } = useLang();
  const [selectedTeam, setSelectedTeam] = useState<string>("all");

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
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-blue-600 dark:text-blue-400 mb-3 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t(T.projects.label)}</span>
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight leading-tight">
              {t(T.projects.h2a)} <span className="text-blue-600 dark:text-blue-400">{t(T.projects.h2b)}</span> {t(T.projects.h2c)}
            </h2>
            <p className="mt-3 text-sm text-slate-500 dark:text-slate-400 max-w-xl leading-relaxed">
              {t(T.projects.desc)}
            </p>
          </div>

          <button
            onClick={() => smoothScrollTo("join")}
            className="self-start md:self-auto shrink-0 inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition-all cursor-pointer shadow-lg shadow-blue-600/20 group"
          >
            <span>{t(T.projects.cta)}</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* 1. Department Tabs Filter */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-4 mb-8 scrollbar-none select-none">
          <button
            onClick={() => setSelectedTeam("all")}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all shrink-0 cursor-pointer ${
              selectedTeam === "all"
                ? "bg-blue-600 text-white shadow-md shadow-blue-500/25"
                : "bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            {t(T.projectModal.allDepartments)}
          </button>

          {TEAMS.map((tm) => (
            <button
              key={tm.id}
              onClick={() => setSelectedTeam(tm.name)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all shrink-0 cursor-pointer ${
                selectedTeam === tm.name
                  ? "bg-blue-600 text-white shadow-md shadow-blue-500/25"
                  : "bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              {tm.name}
            </button>
          ))}
        </div>

        {/* 2. Elegant "SOON!" Showcase Stage (Để trống theo yêu cầu của user) */}
        <div className="relative rounded-3xl p-8 sm:p-12 mb-14 bg-gradient-to-br from-slate-50 via-blue-50/20 to-indigo-50/20 dark:from-slate-900/80 dark:via-[#0c121e] dark:to-slate-900/60 border border-slate-200/80 dark:border-white/10 text-center overflow-hidden shadow-xl shadow-blue-500/5">
          {/* Subtle Ambient Glow */}
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-blue-500/10 dark:bg-blue-500/15 blur-3xl pointer-events-none" />

          {/* Icon Rocket Animation */}
          <div className="relative inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-xl shadow-blue-500/30 mb-5">
            <Rocket className="w-8 h-8 animate-bounce" />
          </div>

          {/* Prominent Glowing Badge */}
          <div className="flex items-center justify-center gap-2">
            <span className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-blue-500/10 dark:bg-blue-400/10 border border-blue-500/25 text-blue-600 dark:text-blue-400 text-xs sm:text-sm font-bold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              <span>
                {selectedTeam === "all"
                  ? lang === "vi" ? "Dự án GEN 1.0 · Soon!" : "GEN 1.0 Projects · Soon!"
                  : `${selectedTeam} // Soon!`}
              </span>
            </span>
          </div>

          {/* Heading */}
          <h3 className="mt-4 text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {lang === "vi"
              ? "Dự án đang trong giai đoạn ươm mầm"
              : "Projects Under Incubation Phase"}
          </h3>

          {/* Detailed explanation */}
          <p className="mt-3 text-sm text-slate-600 dark:text-slate-300 max-w-xl mx-auto leading-relaxed">
            {lang === "vi"
              ? "Chưa có dự án cố định — các bạn thành viên trúng tuyển GEN 1.0 sẽ trực tiếp đề xuất ý tưởng, thành lập nhóm và chế tạo sản phẩm thực chiến đầu tiên cho CLB STIC."
              : "No pre-set projects — selected GEN 1.0 members will directly propose ideas, form project teams, and build the first real-world innovations for STIC Club."}
          </p>

          {/* Department tags list */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-1.5">
            {["AI & Machine Learning", "Robotics & Hardware", "IoT Sensors", "Green Technology", "UI/UX & Media", "Data Analytics", "STEM Experiments"].map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full text-xs font-mono font-medium bg-white/80 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700 text-slate-600 dark:text-slate-300 shadow-sm"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Quick Apply CTA */}
          <div className="mt-8">
            <button
              onClick={() => smoothScrollTo("join")}
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-[1.03] transition-all cursor-pointer"
            >
              <span>{lang === "vi" ? "Nộp đơn để cùng xây dựng dự án GEN 1.0" : "Apply to Build GEN 1.0 Projects"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 3. Incubation Features Highlights */}
        <div className="p-6 sm:p-8 rounded-3xl liquid-glass border border-slate-200/80 dark:border-white/10 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          {FEATURES.map((f, i) => (
            <div key={f.label} className="flex gap-3.5">
              <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400 mt-0.5 shrink-0 bg-blue-50 dark:bg-blue-950/60 w-6 h-6 rounded-full flex items-center justify-center border border-blue-100 dark:border-blue-900/60">
                0{i + 1}
              </span>
              <div>
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">{f.label}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
