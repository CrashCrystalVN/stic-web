"use client";

import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, Layers, Tag, Rocket, CheckCircle2, Sparkles, Compass } from "lucide-react";
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
  const { t, lang } = useLang();
  const [mounted, setMounted] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Ensure portal target (document.body) is ready after hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock body scroll and handle keyboard shortcuts
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;
    
    // Prevent layout shift on Windows scrollbar hide
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
      // Allow scrolling modal with arrow keys or PageUp/PageDown
      if (scrollContainerRef.current) {
        if (e.key === "ArrowDown") {
          scrollContainerRef.current.scrollTop += 60;
        } else if (e.key === "ArrowUp") {
          scrollContainerRef.current.scrollTop -= 60;
        } else if (e.key === "PageDown") {
          scrollContainerRef.current.scrollTop += 240;
        } else if (e.key === "PageUp") {
          scrollContainerRef.current.scrollTop -= 240;
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Forward mouse wheel events from anywhere inside the modal frame to the scrollable container
  const handleFrameWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (!scrollContainerRef.current) return;
    // If the event target is not already inside the scrollable container, forward the scroll
    if (!scrollContainerRef.current.contains(e.target as Node)) {
      scrollContainerRef.current.scrollTop += e.deltaY;
    }
  };

  const handleJoinProject = () => {
    onClose();
    setTimeout(() => {
      smoothScrollTo("join");
    }, 150);
  };

  if (!mounted || !isOpen || !project) return null;

  const modalContent = (
    <AnimatePresence>
      {/* 
        CRITICAL FIX FOR SCROLLING:
        1. createPortal mounts this directly at <body> - completely immune to any parent CSS transforms.
        2. fixed inset-0 z-[99999] guarantees full viewport coverage.
        3. flex items-center justify-center p-3 sm:p-6 centers the window cleanly.
        4. Frame has max-h-[85vh] and flex-col: Header (shrink-0) + Body (flex-1 overflow-y-auto) + Footer (shrink-0).
      */}
      <div
        className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-6"
        style={{ pointerEvents: "auto" }}
      >
        {/* Backdrop (Click to close) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-sm cursor-pointer"
          aria-hidden="true"
        />

        {/* macOS / Antigravity Window Frame with Liquid Glass Aesthetics */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 16 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          onClick={(e) => e.stopPropagation()}
          onWheel={handleFrameWheel}
          className="relative z-10 w-full max-w-2xl max-h-[85vh] sm:max-h-[82vh] bg-white/95 dark:bg-[#0c121e]/95 backdrop-blur-2xl border border-white/80 dark:border-white/15 rounded-2xl sm:rounded-3xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.25),inset_0_1px_1.5px_rgba(255,255,255,0.9)] dark:shadow-[0_30px_70px_rgba(0,0,0,0.8),inset_0_1px_1.5px_rgba(255,255,255,0.15)] flex flex-col overflow-hidden"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          {/* 1. Window Titlebar (Fixed header, never scrolls away, frosted liquid glass) */}
          <div className="shrink-0 flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-slate-200/80 dark:border-white/10 bg-white/85 dark:bg-slate-900/85 backdrop-blur-xl select-none z-10">
            {/* macOS 3 Window Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={onClose}
                className="w-3.5 h-3.5 rounded-full bg-rose-500 hover:bg-rose-600 transition-colors cursor-pointer flex items-center justify-center group"
                title={lang === "vi" ? "Đóng cửa sổ" : "Close Window"}
                aria-label="Close modal"
              >
                <X className="w-2.5 h-2.5 text-rose-950 opacity-0 group-hover:opacity-100" />
              </button>
              <div className="w-3.5 h-3.5 rounded-full bg-amber-400/80" />
              <div className="w-3.5 h-3.5 rounded-full bg-emerald-400/80" />
            </div>

            {/* Window Center Title */}
            <div className="flex items-center gap-1.5 text-xs font-mono font-medium text-slate-600 dark:text-slate-300 truncate max-w-[200px] sm:max-w-xs">
              <span className="text-blue-500">✦</span>
              <span className="truncate">{t(T.projectModal.windowTitle)}</span>
            </div>

            {/* Top Right Soon Badge */}
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-500/10 dark:bg-blue-400/10 border border-blue-500/25 text-blue-600 dark:text-blue-400 text-[10px] font-bold font-mono uppercase tracking-wider shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
              <span>SOON!</span>
            </div>
          </div>

          {/* 
            2. Window Scrollable Body:
            - flex-1 min-h-0: Essential flexbox rule that enables vertical scrolling.
            - overflow-y-scroll / overflow-y-auto with smooth scrolling.
            - touchAction: pan-y for touch devices.
            - Styled scrollbar for clear visual indicator.
          */}
          <div
            ref={scrollContainerRef}
            tabIndex={0}
            className="flex-1 min-h-0 overflow-y-auto overscroll-contain p-5 sm:p-7 space-y-6 focus:outline-none select-text"
            style={{
              WebkitOverflowScrolling: "touch",
              touchAction: "pan-y",
              scrollbarWidth: "thin",
            }}
          >
            {/* Category & Department Header */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-100 dark:border-blue-900/60 text-blue-600 dark:text-blue-400 text-xs font-semibold">
                <Layers className="w-3.5 h-3.5" />
                <span>{project.team}</span>
              </span>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-medium">
                <Tag className="w-3 h-3" />
                <span>{project.category}</span>
              </span>
            </div>

            {/* Title & Tagline */}
            <div>
              <h2
                id="modal-title"
                className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight"
              >
                {project.title}
              </h2>
              <p className="mt-1.5 text-sm font-medium text-slate-600 dark:text-slate-400 leading-relaxed">
                {project.tagline}
              </p>
            </div>

            {/* EYE-CATCHING "SOON!" INCUBATION STAGE BANNER */}
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

            {/* Detailed Incubation Roadmap for GEN 1.0 */}
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-white/10 space-y-3">
              <p className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                <span>
                  {lang === "vi" ? "Lộ trình ươm mầm dự án" : "Incubation Roadmap"}
                </span>
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                <div className="p-3 rounded-xl bg-white dark:bg-[#111827] border border-slate-200/70 dark:border-slate-800">
                  <div className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400 font-bold text-xs">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Phase 1</span>
                  </div>
                  <p className="text-[11px] font-semibold text-slate-800 dark:text-slate-200 mt-1">
                    {lang === "vi" ? "Đề xuất & Bỏ phiếu" : "Propose & Vote"}
                  </p>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
                    {lang === "vi" ? "Thành viên GEN 1.0 cùng thảo luận ý tưởng" : "GEN 1.0 members pitch initial concepts"}
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-white dark:bg-[#111827] border border-slate-200/70 dark:border-slate-800">
                  <div className="flex items-center gap-1.5 text-indigo-600 dark:text-indigo-400 font-bold text-xs">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Phase 2</span>
                  </div>
                  <p className="text-[11px] font-semibold text-slate-800 dark:text-slate-200 mt-1">
                    {lang === "vi" ? "Chế tạo mẫu thử (MVP)" : "Build MVP Prototype"}
                  </p>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
                    {lang === "vi" ? "Được mentor hướng dẫn kỹ thuật chuyên sâu" : "Hands-on engineering with advisor mentors"}
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-white dark:bg-[#111827] border border-slate-200/70 dark:border-slate-800">
                  <div className="flex items-center gap-1.5 text-purple-600 dark:text-purple-400 font-bold text-xs">
                    <Rocket className="w-3.5 h-3.5" />
                    <span>Phase 3</span>
                  </div>
                  <p className="text-[11px] font-semibold text-slate-800 dark:text-slate-200 mt-1">
                    {lang === "vi" ? "Công bố & Đi thi KHKT" : "Showcase & Compete"}
                  </p>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
                    {lang === "vi" ? "Trình diễn sản phẩm tại Demo Day STIC" : "Showcase project at STIC Demo Day"}
                  </p>
                </div>
              </div>
            </div>

            {/* Expected Skills & Tags */}
            <div>
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2.5">
                {t(T.projectModal.techLabel)}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-xs font-mono font-medium rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200/80 dark:border-slate-700"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Hint for scrolling */}
            <div className="pt-2 text-center">
              <span className="text-[11px] font-medium text-slate-400 dark:text-slate-500">
                ✦ {lang === "vi" ? "Cuộn chuột lên / xuống hoặc dùng phím mũi tên để xem toàn bộ" : "Scroll with mouse wheel or use arrow keys to navigate"}
              </span>
            </div>
          </div>

          {/* 3. Window Action Footer (Fixed bottom dock, frosted liquid glass) */}
          <div className="shrink-0 flex flex-col sm:flex-row items-center justify-between gap-3 px-5 sm:px-6 py-3.5 border-t border-slate-200/80 dark:border-white/10 bg-white/85 dark:bg-slate-900/85 backdrop-blur-xl z-10">
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-5 py-2.5 rounded-full text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-200/70 dark:hover:bg-slate-800 transition-colors cursor-pointer text-center"
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

  return createPortal(modalContent, document.body);
}
