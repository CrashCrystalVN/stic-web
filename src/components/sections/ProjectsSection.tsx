"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { SectionWrapper } from "@/components/common/SectionWrapper";
import { smoothScrollTo } from "@/lib/utils";
import { ArrowRight, Sparkles, ExternalLink, Layers, Rocket } from "lucide-react";
import { useLang } from "@/context/LangContext";
import { translations as T } from "@/lib/i18n";
import { PROJECTS, TEAMS, type ProjectItem } from "@/lib/data";
import { ProjectModal } from "./ProjectModal";

export function ProjectsSection() {
  const { t } = useLang();
  const [selectedTeam, setSelectedTeam] = useState<string>("all");
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenProject = (project: ProjectItem) => {
    setActiveProject(project);
    setIsModalOpen(true);
  };

  const filteredProjects =
    selectedTeam === "all"
      ? PROJECTS
      : PROJECTS.filter((p) => p.team.toLowerCase().includes(selectedTeam.toLowerCase()));

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
                : "bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
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
                  : "bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              {tm.name}
            </button>
          ))}
        </div>

        {/* 2. Interactive Projects Grid — Click opens Project Window */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-14">
          {filteredProjects.map((p, idx) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05, duration: 0.4 }}
              onClick={() => handleOpenProject(p)}
              className="group relative rounded-2xl sm:rounded-3xl p-5 bg-slate-50/70 dark:bg-[#111827] border border-slate-200/80 dark:border-slate-800 hover:border-blue-500/50 dark:hover:border-blue-400/50 shadow-sm hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 cursor-pointer flex flex-col justify-between"
            >
              <div>
                {/* Top bar with team and Soon badge */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2.5 py-0.5 rounded-full border border-blue-100 dark:border-blue-900/60">
                    <Layers className="w-3 h-3" />
                    <span className="truncate max-w-[130px]">{p.team}</span>
                  </span>

                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500/10 dark:bg-amber-400/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-[10px] font-mono font-bold uppercase">
                    <Rocket className="w-2.5 h-2.5 animate-bounce" />
                    <span>SOON!</span>
                  </span>
                </div>

                {/* Title & Tagline */}
                <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {p.title}
                </h3>
                <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                  {p.tagline}
                </p>

                {/* Tags */}
                <div className="mt-4 flex flex-wrap gap-1">
                  {p.tags.slice(0, 3).map((tg) => (
                    <span
                      key={tg}
                      className="px-2 py-0.5 text-[10px] font-mono rounded bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700/60"
                    >
                      {tg}
                    </span>
                  ))}
                  {p.tags.length > 3 && (
                    <span className="px-1.5 py-0.5 text-[10px] font-mono rounded text-slate-400">
                      +{p.tags.length - 3}
                    </span>
                  )}
                </div>
              </div>

              {/* Click trigger action */}
              <div className="mt-6 pt-3 border-t border-slate-200/60 dark:border-slate-800/80 flex items-center justify-between text-xs font-semibold text-blue-600 dark:text-blue-400 group-hover:translate-x-0.5 transition-transform">
                <span>{t(T.projectModal.openWindow)}</span>
                <ExternalLink className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
              </div>
            </motion.div>
          ))}
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

      {/* Project Window Modal */}
      <ProjectModal
        project={activeProject}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </SectionWrapper>
  );
}
