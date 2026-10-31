"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { SectionWrapper } from "@/components/common/SectionWrapper";
import { TEAMS, PROJECTS, type ProjectItem, type TeamItem } from "@/lib/data";
import { smoothScrollTo } from "@/lib/utils";
import {
  Brain, Cpu, Lightbulb, Leaf, Palette, BarChart2, FlaskConical,
  Sparkles, ArrowRight, ExternalLink, Rocket
} from "lucide-react";
import { useLang } from "@/context/LangContext";
import { translations as T } from "@/lib/i18n";
import { ProjectModal } from "./ProjectModal";

const ICON_MAP: Record<string, React.ElementType> = {
  Brain, Cpu, Lightbulb, Leaf, Palette, BarChart2, FlaskConical,
};

export function TeamsSection() {
  const { t } = useLang();
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenTeamProject = (team: TeamItem) => {
    // Find project matching this team, or construct a representative project
    const match = PROJECTS.find((p) => p.team.toLowerCase().includes(team.name.toLowerCase())) || {
      id: team.id,
      title: `${team.name} // GEN 1.0 Flagship Project`,
      tagline: team.tagline,
      description: team.description,
      team: team.name,
      category: "Dự án chuyên môn",
      tags: team.skills,
      githubLink: "https://github.com/CrashCrystalVN/stic-web",
      liveLink: "#",
      status: "upcoming" as const,
      image: "",
      metrics: "GEN 1.0",
    };
    setActiveProject(match);
    setIsModalOpen(true);
  };

  return (
    <SectionWrapper
      id="teams"
      className="py-24 bg-slate-50/60 dark:bg-[#0d1117] border-t border-slate-100 dark:border-slate-900"
    >
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <div className="mb-14">
          <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-blue-600 dark:text-blue-400 mb-4 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t(T.teams.label)}</span>
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
                whileHover={{ y: -4 }}
                onClick={() => handleOpenTeamProject(team)}
                className="group p-5 rounded-2xl bg-white dark:bg-[#111827] border border-slate-100 dark:border-slate-800 hover:border-blue-400/50 dark:hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-950/50 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                      <Icon className="w-[18px] h-[18px]" />
                    </div>
                    <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-[10px] font-mono font-bold">
                      <Rocket className="w-2.5 h-2.5" />
                      <span>SOON!</span>
                    </div>
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
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] font-semibold text-blue-600 dark:text-blue-400 group-hover:translate-x-0.5 transition-transform">
                  <span>{t(T.projectModal.openWindow)}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
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

      {/* Project Window Modal */}
      <ProjectModal
        project={activeProject}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </SectionWrapper>
  );
}
