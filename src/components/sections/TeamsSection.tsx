"use client";

import React from "react";
import { motion } from "framer-motion";
import { SectionWrapper } from "@/components/common/SectionWrapper";
import { TEAMS } from "@/lib/data";
import { smoothScrollTo } from "@/lib/utils";
import { Brain, Cpu, Lightbulb, Leaf, Palette, BarChart2, FlaskConical, Sparkles, ArrowRight } from "lucide-react";
import { useLang } from "@/context/LangContext";
import { translations as T } from "@/lib/i18n";

const ICON_MAP: Record<string, React.ElementType> = {
  Brain, Cpu, Lightbulb, Leaf, Palette, BarChart2, FlaskConical,
};

export function TeamsSection() {
  const { t } = useLang();

  return (
    <SectionWrapper
      id="teams"
      className="py-24 bg-slate-50/60 dark:bg-[#0d1117] border-t border-slate-100 dark:border-slate-900"
    >
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <div className="mb-14">
          <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-blue-600 dark:text-blue-400 mb-4">
            {t(T.teams.label)}
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
            {t(T.teams.h2)}
          </h2>
          <p className="mt-3 text-slate-500 dark:text-slate-400 text-sm max-w-md leading-relaxed">
            {t(T.teams.desc)}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {TEAMS.map((team, index) => {
            const Icon = ICON_MAP[team.icon] || Sparkles;
            return (
              <motion.div
                key={team.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -3 }}
                className="group p-5 rounded-2xl bg-white dark:bg-[#111827] border border-slate-100 dark:border-slate-800 hover:border-blue-200 dark:hover:border-blue-900 hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-300 cursor-default"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-950/50 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                    <Icon className="w-[18px] h-[18px]" />
                  </div>
                  <span className="text-[10px] font-mono text-slate-300 dark:text-slate-700">0{index + 1}</span>
                </div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug">
                  {team.name}
                </h3>
                <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-2 leading-relaxed line-clamp-2">
                  {team.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-1">
                  {team.skills.slice(0, 3).map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-2 py-0.5 text-[10px] font-medium bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 rounded-md border border-slate-100 dark:border-slate-700"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-10">
          <button
            onClick={() => smoothScrollTo("join")}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors cursor-pointer group"
          >
            {t(T.teams.cta)}
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </SectionWrapper>
  );
}
