"use client";

import React from "react";
import { motion } from "framer-motion";
import { SectionWrapper } from "@/components/common/SectionWrapper";
import { smoothScrollTo } from "@/lib/utils";
import { Calendar, MapPin, Clock, ArrowRight } from "lucide-react";
import { useLang } from "@/context/LangContext";
import { translations as T } from "@/lib/i18n";

export function EventsSection() {
  const { t } = useLang();

  return (
    <SectionWrapper
      id="events"
      className="py-24 bg-slate-50/60 dark:bg-[#0d1117] border-t border-slate-100 dark:border-slate-900"
    >
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-blue-600 dark:text-blue-400 mb-4">
          {t(T.events.label)}
        </p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="p-8 sm:p-10 rounded-2xl bg-white dark:bg-[#111827] border border-slate-100 dark:border-slate-800 accent-glow"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-600 text-white text-[10px] font-bold uppercase tracking-wider mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
            {t(T.events.badge)}
          </div>

          <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white leading-tight tracking-tight">
            {t(T.events.h3a)}<br />
            <span className="text-blue-600 dark:text-blue-400">{t(T.events.h3b)}</span>
          </h3>

          <p className="mt-4 text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-2xl">
            {t(T.events.desc)}
          </p>

          <div className="mt-6 flex flex-wrap gap-4">
            {[
              { Icon: Calendar, text: t(T.events.m1) },
              { Icon: MapPin,   text: t(T.events.m2) },
              { Icon: Clock,    text: t(T.events.m3) },
            ].map(({ Icon, text }) => (
              <div key={text} className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                <Icon className="w-3.5 h-3.5 text-blue-500 dark:text-blue-400 shrink-0" />
                <span>{text}</span>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <button
              onClick={() => smoothScrollTo("join")}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition-all cursor-pointer shadow-lg shadow-blue-600/20 group"
            >
              {t(T.events.cta)}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <span className="text-xs text-slate-400 dark:text-slate-500 italic">{t(T.events.hint)}</span>
          </div>
        </motion.div>

        <p className="mt-6 text-xs text-slate-400 dark:text-slate-600 text-center">{t(T.events.note)}</p>
      </div>
    </SectionWrapper>
  );
}
