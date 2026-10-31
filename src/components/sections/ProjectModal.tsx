"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, Layers, Tag, Rocket } from "lucide-react";
import { smoothScrollTo } from "@/lib/utils";
import { useLang } from "@/context/LangContext";
import { translations as T } from "@/lib/i18n";
import type { ProjectItem } from "@/lib/data";

interface ProjectModalProps {
  project: ProjectItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  const { t } = useLang();

  // Close on Escape key & manage scroll lock
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !project) return null;

  const handleJoinProject = () => {
    onClose();
    smoothScrollTo("join");
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-hidden">
        {/* Backdrop (Click to close) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 dark:bg-black/75 backdrop-blur-md cursor-pointer"
        />

        {/* macOS / Antigravity Window Frame */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 14 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 14 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 w-full max-w-2xl max-h-[calc(100dvh-32px)] sm:max-h-[calc(100dvh-64px)] bg-white dark:bg-[#0c121e] border border-slate-200/80 dark:border-white/15 rounded-2xl sm:rounded-3xl shadow-2xl shadow-blue-500/10 overflow-hidden flex flex-col"
        >
          {/* 1. Window Titlebar (Fixed header, never scrolls away) */}
          <div className="shrink-0 flex items-center justify-between px-4 sm:px-5 py-3 border-b border-slate-100 dark:border-white/10 bg-slate-50/90 dark:bg-slate-900/90 backdrop-blur-md select-none z-10">
            {/* macOS 3 Window Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={onClose}
                className="w-3.5 h-3.5 rounded-full bg-rose-500 hover:bg-rose-600 transition-colors cursor-pointer flex items-center justify-center group"
                title="Đóng Window"
              >
                <X className="w-2.5 h-2.5 text-rose-950 opacity-0 group-hover:opacity-100" />
              </button>
              <div className="w-3.5 h-3.5 rounded-full bg-amber-400/80" />
              <div className="w-3.5 h-3.5 rounded-full bg-emerald-400/80" />
            </div>

            {/* Window Center Title */}
            <div className="flex items-center gap-1.5 text-xs font-mono font-medium text-slate-500 dark:text-slate-400 truncate max-w-[200px] sm:max-w-xs">
              <span className="text-blue-500">✦</span>
              <span className="truncate">{t(T.projectModal.windowTitle)}</span>
            </div>

            {/* Top Right Soon Badge */}
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-500/10 dark:bg-blue-400/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-[10px] font-bold font-mono uppercase tracking-wider shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
              <span>SOON!</span>
            </div>
          </div>

          {/* 2. Window Scrollable Body (flex-1 min-h-0 allows flawless mouse & touch scrolling) */}
          <div className="flex-1 min-h-0 overflow-y-auto p-5 sm:p-7 space-y-5 overscroll-contain">
            {/* Category & Department Header */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-100 dark:border-blue-900/60 text-blue-600 dark:text-blue-400 text-xs font-semibold">
                <Layers className="w-3.5 h-3.5" />
                <span>{project.team}</span>
              </span>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs font-medium">
                <Tag className="w-3 h-3" />
                <span>{project.category}</span>
              </span>
            </div>

            {/* Title & Tagline */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
                {project.title}
              </h2>
              <p className="mt-1 text-sm font-medium text-slate-500 dark:text-slate-400 leading-relaxed">
                {project.tagline}
              </p>
            </div>

            {/* BIG EYE-CATCHING "SOON!" INCUBATION STAGE BANNER */}
            <div className="relative rounded-2xl overflow-hidden p-6 sm:p-7 bg-gradient-to-br from-blue-600/10 via-indigo-600/5 to-purple-600/10 border border-blue-500/20 dark:border-blue-400/20 text-center">
              <div className="absolute -top-12 -right-12 w-36 h-36 rounded-full bg-blue-500/20 blur-2xl pointer-events-none" />

              <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/30 mb-3">
                <Rocket className="w-6 h-6 animate-bounce" />
              </div>

              <div className="flex items-center justify-center gap-2">
                <span className="text-2xl sm:text-3xl font-extrabold tracking-tight bg-gradient-to-r from-blue-600 via-sky-500 to-indigo-600 dark:from-blue-400 dark:via-sky-300 dark:to-indigo-400 bg-clip-text text-transparent">
                  {t(T.projectModal.statusBadge)}
                </span>
              </div>

              <p className="mt-2 text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">
                {t(T.projectModal.incubating)}
              </p>

              <p className="mt-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-lg mx-auto leading-relaxed">
                {t(T.projectModal.soonDesc)}
              </p>
            </div>

            {/* Expected Skills & Tags */}
            <div>
              <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2.5">
                {t(T.projectModal.techLabel)}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 text-xs font-mono font-medium rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* 3. Window Action Footer (Fixed bottom dock, always visible) */}
          <div className="shrink-0 flex flex-col sm:flex-row items-center justify-between gap-3 px-5 sm:px-6 py-3.5 border-t border-slate-100 dark:border-white/10 bg-slate-50/90 dark:bg-slate-900/90 backdrop-blur-md z-10">
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-5 py-2.5 rounded-full text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors cursor-pointer text-center"
            >
              {t(T.projectModal.closeBtn)}
            </button>

            <button
              onClick={handleJoinProject}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:via-indigo-500 hover:to-purple-500 text-white text-xs font-semibold shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-[1.02] transition-all cursor-pointer"
            >
              <span>{t(T.projectModal.joinCta)}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
