"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  if (!mounted) {
    return <div className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-800 animate-pulse" />;
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative flex items-center justify-center w-8 h-8 rounded-xl text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-amber-400 hover:bg-blue-50 dark:hover:bg-slate-800 transition-all cursor-pointer focus:outline-none overflow-hidden"
      title={isDark ? "Chuyển sang giao diện sáng" : "Chuyển sang giao diện tối"}
      aria-label="Chuyển đổi giao diện"
    >
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.div
            key="sun"
            initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            className="text-amber-400"
          >
            <Sun className="w-4.5 h-4.5 w-[18px] h-[18px]" />
          </motion.div>
        ) : (
          <motion.div
            key="moon"
            initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            className="text-slate-600"
          >
            <Moon className="w-4.5 h-4.5 w-[18px] h-[18px]" />
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
}
