"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useLang } from "@/context/LangContext";

export function LangToggle() {
  const { lang, toggle } = useLang();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-16 h-8 rounded-full bg-slate-100 dark:bg-slate-800 animate-pulse" />;
  }

  return (
    <button
      onClick={toggle}
      className="relative flex items-center p-0.5 w-16 h-8 rounded-full bg-slate-100 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 shadow-inner cursor-pointer focus:outline-none select-none transition-colors"
      title={lang === "vi" ? "Chuyển sang Tiếng Anh (English)" : "Switch to Vietnamese (Tiếng Việt)"}
      aria-label="Toggle language"
    >
      {/* Animated Sliding Pill Background */}
      <motion.div
        className="absolute top-0.5 bottom-0.5 w-[30px] rounded-full bg-white dark:bg-slate-700 shadow-sm border border-slate-200/50 dark:border-slate-600/50"
        animate={{
          left: lang === "vi" ? "2px" : "32px",
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 32,
        }}
      />

      {/* VI Label */}
      <div className="relative z-10 flex-1 text-center">
        <span
          className={`text-[11px] font-bold transition-colors duration-200 ${
            lang === "vi"
              ? "text-blue-600 dark:text-blue-400"
              : "text-slate-400 dark:text-slate-500 hover:text-slate-600"
          }`}
        >
          VI
        </span>
      </div>

      {/* EN Label */}
      <div className="relative z-10 flex-1 text-center">
        <span
          className={`text-[11px] font-bold transition-colors duration-200 ${
            lang === "en"
              ? "text-blue-600 dark:text-blue-400"
              : "text-slate-400 dark:text-slate-500 hover:text-slate-600"
          }`}
        >
          EN
        </span>
      </div>
    </button>
  );
}
