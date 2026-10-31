"use client";

import React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, Send, Home, Compass, Layers, Rocket, Calendar } from "lucide-react";
import { useLang } from "@/context/LangContext";
import { translations as T } from "@/lib/i18n";

const ICONS = [Home, Compass, Layers, Rocket, Calendar, Send];

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (sectionId: string) => void;
}

export function TableOfContentsDrawer({ isOpen, onClose, onNavigate }: Props) {
  const { t } = useLang();
  const items = T.toc.items;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/20 dark:bg-black/50 backdrop-blur-[2px] cursor-pointer"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 320 }}
            className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-sm bg-white dark:bg-[#0e1420] border-l border-slate-100 dark:border-slate-800 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="relative w-8 h-8 rounded-lg overflow-hidden liquid-glass-pill bg-white/95 dark:bg-white/90 flex items-center justify-center p-0.5 shadow-sm">
                  <Image
                    src="/logo.png"
                    alt="STIC Logo"
                    width={32}
                    height={32}
                    className="w-full h-full object-contain rounded-md"
                  />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900 dark:text-white">{t(T.toc.title)}</p>
                  <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5">{t(T.toc.sub)}</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer"
              >
                <X className="w-[18px] h-[18px]" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-1">
              {items.map((item, index) => {
                const Icon = ICONS[index] ?? Send;
                return (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 * index, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    onClick={() => onNavigate(item.id)}
                    className="w-full text-left px-3 py-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/70 group transition-all flex items-center justify-between cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-mono text-slate-300 dark:text-slate-700 w-4 shrink-0">
                        0{index + 1}
                      </span>
                      <div className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-slate-800 group-hover:bg-blue-600 group-hover:text-white flex items-center justify-center text-slate-500 dark:text-slate-400 transition-all shrink-0">
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {t({ vi: item.vi, en: item.en })}
                        </p>
                        <p className="text-[10px] text-slate-400 dark:text-slate-500">
                          {t({ vi: item.dvi, en: item.den })}
                        </p>
                      </div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-200 dark:text-slate-700 group-hover:text-blue-500 group-hover:translate-x-0.5 transition-all shrink-0" />
                  </motion.button>
                );
              })}
            </div>

            {/* Bottom CTA */}
            <div className="px-4 py-5 border-t border-slate-100 dark:border-slate-800 space-y-2">
              <button
                onClick={() => onNavigate("join")}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-semibold transition-all cursor-pointer flex items-center justify-center gap-2 shadow-md shadow-blue-500/20"
              >
                <Send className="w-3.5 h-3.5" />
                {t(T.toc.applyCta)}
              </button>
              <p className="text-center text-[10px] text-slate-400 dark:text-slate-600">{t(T.toc.email)}</p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
