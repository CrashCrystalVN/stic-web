"use client";

import React, { useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import {
  Rocket,
  Lightbulb,
  ExternalLink,
  Code2,
  Cpu,
  Leaf,
  Palette,
  FlaskConical,
  BarChart2,
  BookOpen,
  Navigation,
  ArrowRight,
  Sparkles,
  Plane
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useLang } from "@/context/LangContext";
import { PROJECTS, type ProjectItem } from "@/lib/data";

const ProjectModal = dynamic(
  () => import("@/components/sections/ProjectModal").then((m) => m.ProjectModal),
  { ssr: false }
);

const PROPOSED_FIELDS = [
  {
    icon: Code2,
    titleVi: "Mảng AI & Coding",
    titleEn: "AI & Coding Track",
    descVi: "Xây dựng các ứng dụng thông minh, website phục vụ học tập, chatbot hỏi đáp hoặc mô hình nhận diện thị giác máy tính.",
    descEn: "Build smart software, educational web tools, AI chatbots, and computer vision recognition pipelines.",
  },
  {
    icon: Cpu,
    titleVi: "Mảng Robotics & Engineering",
    titleEn: "Robotics & Engineering Track",
    descVi: "Thiết kế và lắp ráp robot dò đường, cánh tay robot, xe điều khiển từ xa, các mạch điều khiển tự động với Arduino & ESP32.",
    descEn: "Design and build line-followers, robotic arms, remote-controlled rovers, and IoT controllers with Arduino & ESP32.",
  },
  {
    icon: Leaf,
    titleVi: "Mảng Môi trường & Bền vững",
    titleEn: "Environment & Sustainability Track",
    descVi: "Nghiên cứu các giải pháp công nghệ xanh: đo chất lượng không khí trường học, tưới cây tự động, tái chế rác thông minh.",
    descEn: "Engineer green tech: school air quality monitoring, automated irrigation, and smart recycling sorting systems.",
  },
  {
    icon: FlaskConical,
    titleVi: "Mảng Experiments & STEM",
    titleEn: "Experiments & Applied STEM Track",
    descVi: "Thực hiện các thí nghiệm khoa học tự nhiên, mô phỏng hiện tượng vật lý / hóa học phục vụ các cuộc thi KHKT học sinh.",
    descEn: "Conduct captivating natural science experiments, simulate physical & chemical phenomena for science competitions.",
  },
  {
    icon: Palette,
    titleVi: "Mảng Design & Media",
    titleEn: "Design & Creative Media Track",
    descVi: "Sáng tạo giao diện UI/UX cho các sản phẩm của CLB, xây dựng bộ nhận diện thương hiệu và ấn phẩm truyền thông.",
    descEn: "Craft intuitive UI/UX for club products, create visual brand identities, and produce high-impact digital media.",
  },
  {
    icon: BarChart2,
    titleVi: "Mảng Data & Analysis",
    titleEn: "Data Analytics & Insight Track",
    descVi: "Thu thập và phân tích dữ liệu học tập, trực quan hóa biểu đồ và rút ra những số liệu thú vị về đời sống học sinh.",
    descEn: "Collect, process, and visualize data trends to reveal compelling insights about student life and community education.",
  },
];

export default function ProjectsPage() {
  const { lang } = useLang();
  const [activeModalProject, setActiveModalProject] = useState<ProjectItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const featuredProjects = PROJECTS.filter((p) =>
    ["ai-book-classifier", "ai-delivery-drone"].includes(p.id)
  );

  const handleOpenProject = (proj: ProjectItem) => {
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

  return (
    <div className="min-h-screen pt-32 pb-24 bg-gradient-to-b from-[#edf4fe] via-[#f4f9ff] to-[#e4effd] dark:from-[#050914] dark:via-[#090e1e] dark:to-[#070b17] transition-colors">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white dark:bg-slate-800 border border-blue-200 dark:border-slate-700 text-blue-700 dark:text-blue-400 text-xs font-semibold uppercase mb-4 shadow-xs">
            <Rocket className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span>{lang === "vi" ? "Dự Án STIC GEN 1.0" : "STIC GEN 1.0 Projects"}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {lang === "vi" ? (
              <>
                Nơi Biến Ý Tưởng Thành{" "}
                <span className="gradient-text-projects font-black">Sản Phẩm Thực Tế</span>
              </>
            ) : (
              <>
                Where Ideas Turn Into{" "}
                <span className="gradient-text-projects font-black">Working Products</span>
              </>
            )}
          </h1>

          <p className="mt-4 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            {lang === "vi"
              ? "STIC là câu lạc bộ thế hệ đầu tiên. Các dự án nghiên cứu và kỹ thuật sẽ do chính các bạn thành viên GEN 1.0 cùng nhau khởi xướng và phát triển!"
              : "STIC is a first-generation club. Flagship engineering and scientific projects will be ideated, designed, and built by GEN 1.0 members themselves!"}
          </p>
        </div>

        {/* 2 Flagship Projects Showcase */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-600 dark:text-cyan-400">
                {lang === "vi" ? "Dự Án Trọng Điểm // GEN 1.0" : "Flagship Initiatives // GEN 1.0"}
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-1">
                {lang === "vi" ? "Đề Tài Nghiên Cứu Tiêu Biểu" : "Incubated Flagship Projects"}
              </h2>
            </div>
            <Link
              href="/join"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-cyan-400 hover:underline"
            >
              <span>{lang === "vi" ? "Nộp đơn tham gia ngay" : "Apply to join"}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {featuredProjects.map((proj) => {
              const isBook = proj.id === "ai-book-classifier";
              const title = lang === "en" ? (proj.titleEn || proj.title) : (proj.titleVi || proj.title);
              const tagline = lang === "en" ? (proj.taglineEn || proj.tagline) : (proj.taglineVi || proj.tagline);
              const desc = lang === "en" ? (proj.descriptionEn || proj.description) : (proj.descriptionVi || proj.description);
              const category = lang === "en" ? (proj.categoryEn || proj.category) : (proj.categoryVi || proj.category);

              return (
                <div
                  key={proj.id}
                  className="group relative rounded-3xl p-6 sm:p-8 bg-white dark:bg-slate-900/90 border border-slate-200/90 dark:border-white/10 hover:border-blue-400/50 dark:hover:border-cyan-400/40 shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden"
                >
                  {/* Subtle Glow */}
                  <div
                    className={`absolute -top-16 -right-16 w-48 h-48 rounded-full blur-3xl pointer-events-none opacity-30 group-hover:opacity-70 transition-opacity ${
                      isBook ? "bg-cyan-500/30" : "bg-blue-600/30"
                    }`}
                  />

                  <div>
                    {/* Badges */}
                    <div className="flex items-center justify-between gap-2 mb-6">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-bold uppercase tracking-wider bg-blue-50 dark:bg-blue-950/70 text-blue-600 dark:text-cyan-400 border border-blue-200 dark:border-cyan-500/30">
                        {isBook ? <BookOpen className="w-3.5 h-3.5" /> : <Plane className="w-3.5 h-3.5" />}
                        <span>{category}</span>
                      </span>

                      <span className="inline-flex items-center gap-1.5 text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800/40">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span>GEN 1.0</span>
                      </span>
                    </div>

                    {/* Visor Box */}
                    <div className="relative w-full h-32 rounded-2xl bg-gradient-to-br from-slate-50 to-blue-50/60 dark:from-slate-800/80 dark:to-cyan-950/30 border border-slate-200/80 dark:border-white/10 flex items-center justify-center p-4 mb-6 overflow-hidden">
                      <div className="flex flex-col items-center text-center">
                        <div className="w-12 h-12 rounded-2xl bg-blue-600 dark:bg-cyan-500/20 text-white dark:text-cyan-300 border border-blue-500 dark:border-cyan-400/40 flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform">
                          {isBook ? <BookOpen className="w-6 h-6" /> : <Navigation className="w-6 h-6" />}
                        </div>
                        <span className="mt-2 text-[10px] font-mono font-bold tracking-wider uppercase text-slate-700 dark:text-cyan-300">
                          {isBook ? "AI COMPUTER VISION // OCR" : "AUTONOMOUS UAV // LIDAR"}
                        </span>
                      </div>
                    </div>

                    <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight mb-2 group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors">
                      {title}
                    </h3>
                    <p className="text-xs font-semibold text-blue-600 dark:text-cyan-400/90 mb-3 leading-snug">
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

                  {/* Actions */}
                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-3">
                    <button
                      onClick={() => handleOpenProject(proj)}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-blue-500" />
                      <span>{lang === "vi" ? "Xem chi tiết dự án" : "View Details"}</span>
                    </button>

                    <Link
                      href="/join"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-white text-xs font-bold transition-all cursor-pointer gradient-btn-projects"
                    >
                      <span>{lang === "vi" ? "Đăng ký tham gia" : "Join Project"}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Highlight Card */}
        <div className="p-8 sm:p-12 rounded-3xl bg-white dark:bg-slate-900/90 border border-blue-200 dark:border-slate-800 shadow-sm text-center mb-16 space-y-6">
          <div className="w-16 h-16 rounded-3xl bg-blue-50 dark:bg-slate-800 border border-blue-100 dark:border-slate-700 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto">
            <Lightbulb className="w-8 h-8" />
          </div>

          <div className="space-y-2 max-w-xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-slate-800 px-3 py-1 rounded-full border border-blue-100 dark:border-slate-700">
              {lang === "vi" ? "Giai đoạn chuẩn bị dự án" : "Incubation Phase"}
            </span>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white pt-1">
              {lang === "vi" ? "Bạn có một ý tưởng khoa học kỹ thuật?" : "Have an innovative STEM idea?"}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {lang === "vi"
                ? "Nếu bạn có một đề tài nghiên cứu, một ý tưởng sáng tạo hay đơn giản là muốn thử làm một sản phẩm công nghệ nhưng chưa biết cách bắt đầu — hãy nộp đơn gia nhập GEN 1.0 để cùng thực hiện!"
                : "Whether you have an ambitious research topic, a creative concept, or simply want to build real tech but need guidance — apply to GEN 1.0 to build it together!"}
            </p>
          </div>

          <div className="pt-2">
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSfEfAvIevbb0BFHFixLPn7TAy64tkk0lYzLv8ohGfm2EmizBw/viewform"
              target="_blank"
              rel="noreferrer"
            >
              <Button variant="primary" size="md" className="rounded-full px-7 py-3 font-bold gradient-btn-projects border-none shadow-lg shadow-purple-500/25">
                <span>{lang === "vi" ? "Nộp đơn ứng tuyển & Chia sẻ ý tưởng của bạn" : "Apply & Share Your Ideas"}</span>
                <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
            </a>
          </div>
        </div>

        {/* Định Hướng Dự Án Theo Mảng */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              {lang === "vi" ? "Định Hướng Đề Tài Theo Từng Mảng" : "Suggested Focus Areas by Track"}
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              {lang === "vi"
                ? "Các hướng đi gợi ý để thành viên GEN 1.0 cùng thảo luận và bắt tay thực hiện"
                : "Inspirational directions for GEN 1.0 members to discuss, prototype, and build"}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {PROPOSED_FIELDS.map((field, idx) => {
              const Icon = field.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-3xl bg-white dark:bg-slate-900/90 border border-blue-100 dark:border-slate-800 shadow-sm hover:border-blue-200 dark:hover:border-slate-700 transition-colors flex flex-col justify-between"
                >
                  <div>
                    <div className="w-10 h-10 rounded-2xl bg-blue-50 dark:bg-slate-800 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-4">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h4 className="text-base font-bold text-slate-900 dark:text-white">
                      {lang === "vi" ? field.titleVi : field.titleEn}
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                      {lang === "vi" ? field.descVi : field.descEn}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center text-[11px] font-semibold text-blue-600 dark:text-blue-400">
                    <span>{lang === "vi" ? "Đang chờ ý tưởng từ GEN 1.0" : "Awaiting proposals from GEN 1.0"}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Project Detail Modal */}
      {isModalOpen && (
        <ProjectModal
          project={activeModalProject}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}
