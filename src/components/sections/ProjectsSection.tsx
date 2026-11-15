"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { SectionWrapper } from "@/components/common/SectionWrapper";
import {
  ArrowRight,
  Sparkles,
  Rocket,
  ExternalLink,
  BookOpen,
  Navigation,
  Plane
} from "lucide-react";
import { useLang } from "@/context/LangContext";
import { translations as T } from "@/lib/i18n";
import { TEAMS, PROJECTS, type ProjectItem } from "@/lib/data";

const ProjectModal = dynamic(
  () => import("./ProjectModal").then((m) => m.ProjectModal),
  { ssr: false }
);

export function ProjectsSection() {
  const { t, lang } = useLang();
  const [selectedTeam, setSelectedTeam] = useState<string>("all");
  const [activeModalProject, setActiveModalProject] = useState<ProjectItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenSpecificProject = (proj: ProjectItem) => {
    setActiveModalProject({
      ...proj,
      title: lang === "en" ? (proj.titleEn || proj.title) : (proj.titleVi || proj.title),
      tagline: lang === "en" ? (proj.taglineEn || proj.tagline) : (proj.taglineVi || proj.tagline),
      description: lang === "en" ? (proj.descriptionEn || proj.description) : (proj.descriptionVi || proj.description),
      team: lang === "en" ? (proj.teamEn || proj.team) : (proj.teamVi || proj.team),
      category: lang === "en" ? (proj.categoryEn || proj.category) : (proj.categoryVi || proj.category),
      metrics: lang === "en" ? (proj.metricsEn || proj.metrics) : (proj.metricsVi || proj.metrics),
    });
    setIsModalOpen(true);
  };

  const handleOpenModal = (teamName?: string) => {
    const targetName = teamName || (selectedTeam === "all" ? "AI & Coding" : selectedTeam);
    const match = PROJECTS.find((p) => p.team.toLowerCase().includes(targetName.toLowerCase()));
    if (match) {
      handleOpenSpecificProject(match);
    } else {
      setActiveModalProject({
        id: "incubation-preview",
        title: `${targetName} // GEN 1.0 Incubation Project`,
        tagline: lang === "vi" ? "Dự án nghiên cứu & phát triển chuyên sâu do GEN 1.0 thực hiện" : "Advanced R&D project initiated by GEN 1.0 cohort",
        description: lang === "vi" ? "Dự án KHKT đang ươm mầm cho GEN 1.0" : "Flagship STEM project under incubation for GEN 1.0",
        team: targetName,
        category: lang === "vi" ? "Dự án chuyên môn" : "Department Project",
        tags: lang === "vi" ? ["STEM", "KHKT", "STIC Lab", "GEN 1.0"] : ["STEM", "Robotics & AI", "STIC Lab", "GEN 1.0"],
        githubLink: "https://github.com/CrashCrystalVN/stic-web",
        liveLink: "#",
        status: "upcoming" as const,
        image: "",
        metrics: "GEN 1.0",
      });
      setIsModalOpen(true);
    }
  };

  // Filter projects according to department tabs
  const featuredProjects = useMemo(() => {
    const mainTwo = PROJECTS.filter((p) => ["ai-book-classifier", "ai-delivery-drone"].includes(p.id));
    if (selectedTeam === "all") {
      return mainTwo;
    }
    return PROJECTS.filter((p) => p.team.toLowerCase().includes(selectedTeam.toLowerCase()));
  }, [selectedTeam]);

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

          <Link
            href="/join"
            className="self-start md:self-auto shrink-0 inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition-all cursor-pointer shadow-lg shadow-blue-600/20 group"
          >
            <span>{t(T.projects.cta)}</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
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
              {lang === "en" ? (tm.nameEn || tm.name) : (tm.nameVi || tm.name)}
            </button>
          ))}
        </div>

        {/* 2. DỰ ÁN GEN 1.0 SHOWCASE CARDS */}
        {featuredProjects.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-12">
            {featuredProjects.map((proj) => {
              const isBook = proj.id === "ai-book-classifier";
              const isDrone = proj.id === "ai-delivery-drone";
              const title = lang === "en" ? (proj.titleEn || proj.title) : (proj.titleVi || proj.title);
              const tagline = lang === "en" ? (proj.taglineEn || proj.tagline) : (proj.taglineVi || proj.tagline);
              const desc = lang === "en" ? (proj.descriptionEn || proj.description) : (proj.descriptionVi || proj.description);
              const category = lang === "en" ? (proj.categoryEn || proj.category) : (proj.categoryVi || proj.category);

              return (
                <div
                  key={proj.id}
                  className="group relative rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-white via-slate-50 to-blue-50/20 dark:from-[#0d1424] dark:via-[#090e1a] dark:to-[#070b14] border border-slate-200/90 dark:border-white/10 hover:border-blue-400/50 dark:hover:border-cyan-400/40 shadow-xl transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10 flex flex-col justify-between overflow-hidden"
                >
                  {/* Ambient Glow */}
                  <div
                    className={`absolute -top-16 -right-16 w-48 h-48 rounded-full blur-3xl pointer-events-none opacity-40 group-hover:opacity-80 transition-opacity ${
                      isBook ? "bg-cyan-500/30" : "bg-blue-600/30"
                    }`}
                  />

                  <div>
                    {/* Top Row: Department & Status Badges */}
                    <div className="flex items-center justify-between gap-2 mb-6">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-bold uppercase tracking-wider bg-blue-50 dark:bg-blue-950/70 text-blue-600 dark:text-cyan-400 border border-blue-200 dark:border-cyan-500/30">
                        {isBook ? <BookOpen className="w-3.5 h-3.5" /> : <Plane className="w-3.5 h-3.5" />}
                        <span>{category}</span>
                      </span>

                      <span className="inline-flex items-center gap-1.5 text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800/40">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span>GEN 1.0 INCUBATOR</span>
                      </span>
                    </div>

                    {/* Project Visual Visor Hologram Box */}
                    <div className="relative w-full h-36 rounded-2xl bg-gradient-to-br from-slate-100 to-blue-100/40 dark:from-slate-900/90 dark:to-cyan-950/30 border border-slate-200/80 dark:border-white/10 flex items-center justify-center p-4 mb-6 overflow-hidden">
                      <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px] opacity-20" />
                      
                      <div className="relative z-10 flex flex-col items-center text-center">
                        <div className="w-14 h-14 rounded-2xl bg-blue-600 dark:bg-cyan-500/20 text-white dark:text-cyan-300 border border-blue-500 dark:border-cyan-400/40 flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform">
                          {isBook ? <BookOpen className="w-7 h-7" /> : <Navigation className="w-7 h-7" />}
                        </div>
                        <span className="mt-2 text-[11px] font-mono font-bold tracking-wider uppercase text-slate-700 dark:text-cyan-300">
                          {isBook ? "AI COMPUTER VISION // OCR" : "AUTONOMOUS UAV // LIDAR"}
                        </span>
                      </div>
                    </div>

                    {/* Titles */}
                    <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight mb-2 group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors">
                      {title}
                    </h3>
                    <p className="text-xs sm:text-sm font-semibold text-blue-600 dark:text-cyan-400/90 mb-3 leading-snug">
                      {tagline}
                    </p>
                    <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-300/80 line-clamp-3 mb-6">
                      {desc}
                    </p>

                    {/* Tech Stack Tags */}
                    <div className="flex flex-wrap items-center gap-1.5 mb-6">
                      {proj.tags.map((t) => (
                        <span
                          key={t}
                          className="px-2.5 py-1 rounded-lg text-[10px] font-mono font-medium bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-white/10"
                        >
                          #{t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions Row */}
                  <div className="pt-4 border-t border-slate-100 dark:border-white/10 flex items-center justify-between gap-3">
                    <button
                      onClick={() => handleOpenSpecificProject(proj)}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors cursor-pointer"
                    >
                      <span>{lang === "vi" ? "Xem chi tiết dự án" : "View Project Details"}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>

                    <Link
                      href="/join"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 dark:bg-cyan-500 dark:hover:bg-cyan-400 dark:text-slate-950 transition-all shadow-md shadow-blue-500/20 cursor-pointer"
                    >
                      <span>{lang === "vi" ? "Đăng ký tham gia" : "Join Project"}</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* 3. Incubation Callout: Mở rộng ý tưởng cho GEN 1.0 */}
        <div className="relative rounded-3xl p-8 sm:p-10 mb-14 bg-gradient-to-br from-slate-50 via-blue-50/20 to-indigo-50/20 dark:from-slate-900/80 dark:via-[#0c121e] dark:to-slate-900/60 border border-slate-200/80 dark:border-white/10 text-center overflow-hidden shadow-xl shadow-blue-500/5">
          <div className="relative inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-xl shadow-blue-500/30 mb-4">
            <Rocket className="w-6 h-6 animate-bounce" />
          </div>

          <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {lang === "vi"
              ? "Cùng ươm mầm các đề tài KHKT đột phá cùng GEN 1.0"
              : "Incubate Groundbreaking STEM Projects with GEN 1.0"}
          </h3>

          <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-xl mx-auto leading-relaxed">
            {lang === "vi"
              ? "Ngoài 2 đề tài tiêu điểm trên, các thành viên trúng tuyển GEN 1.0 sẽ tiếp tục đề xuất ý tưởng mới, thành lập nhóm liên chuyên môn và được Ban chủ nhiệm hỗ trợ tài nguyên, thiết bị và cố vấn kỹ thuật từ A-Z."
              : "Beyond these two flagship initiatives, incoming GEN 1.0 members will propose new ideas, form interdisciplinary squads, and receive full hardware resources and engineering mentorship from day one."}
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => handleOpenModal()}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 text-xs font-bold transition-all cursor-pointer border border-slate-300 dark:border-slate-700 shadow-sm"
            >
              <span>{lang === "vi" ? "Mở Project Window (Xem danh mục)" : "Open Project Window"}</span>
              <ExternalLink className="w-3.5 h-3.5 text-blue-500" />
            </button>

            <Link
              href="/join"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-white text-xs font-bold transition-all cursor-pointer gradient-btn-projects"
            >
              <span>{lang === "vi" ? "Nộp đơn tham gia dự án GEN 1.0" : "Apply for GEN 1.0 Projects"}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* 4. Incubation Features Highlights */}
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
      {isModalOpen && (
        <ProjectModal
          project={activeModalProject}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </SectionWrapper>
  );
}
