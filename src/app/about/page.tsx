"use client";

import React from "react";
import { 
  Sparkles, 
  BookOpen, 
  Users, 
  HeartHandshake, 
  Compass, 
  Mail, 
  Zap,
  Target,
  Wrench,
  ExternalLink,
  Image as ImageIcon
} from "lucide-react";
import { CORE_VALUES, LEADERS } from "@/lib/data";
import { Button } from "@/components/ui/Button";
import { useLang } from "@/context/LangContext";
import { GlitchLeaderCard } from "@/components/common/GlitchLeaderCard";

const CORE_VALUE_ICONS: Record<string, React.ElementType> = {
  Sparkles,
  BookOpen,
  Users,
  HeartHandshake,
  Wrench,
};

export default function AboutPage() {
  const { lang } = useLang();

  return (
    <div className="min-h-screen pt-32 pb-24 bg-gradient-to-b from-[#edf4fe] via-[#f4f9ff] to-[#e4effd] dark:from-[#050914] dark:via-[#090e1e] dark:to-[#070b17] transition-colors">
      {/* 1. Header Hero */}
      <section className="relative px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center py-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white dark:bg-slate-800 border border-blue-200 dark:border-slate-700 text-blue-700 dark:text-blue-400 text-xs font-semibold uppercase mb-6 shadow-xs">
          <Compass className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <span>{lang === "vi" ? "Về Câu Lạc Bộ STIC" : "About STIC Club"}</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
          {lang === "vi" ? (
            <>
              Sân chơi Khoa học Kỹ thuật{" "}
              <span className="gradient-text-about font-black">
                Thực Chiến
              </span>{" "}
              cho học sinh Đà Nẵng
            </>
          ) : (
            <>
              A Real-World STEM{" "}
              <span className="gradient-text-about font-black">
                Playground
              </span>{" "}
              for Da Nang Students
            </>
          )}
        </h1>

        <p className="mt-5 text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
          {lang === "vi"
            ? "CLB KHKT STIC (Science, Technology & Innovation Club) là không gian nghiên cứu, sáng tạo và thực hành dành cho các bạn học sinh THPT có niềm đam mê với công nghệ trên địa bàn TP. Đà Nẵng."
            : "STIC (Science, Technology & Innovation Club) is a hands-on research, innovation, and makerspace built for passionate high school students in Da Nang City."}
        </p>
      </section>

      {/* 2. Khung Banner */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 mb-16">
        <div className="relative rounded-3xl border-2 border-dashed border-blue-200/80 dark:border-slate-700 bg-white/40 dark:bg-slate-900/40 backdrop-blur-sm p-8 text-center">
          <div className="flex flex-col items-center justify-center space-y-1.5">
            <ImageIcon className="w-6 h-6 text-blue-500/80 dark:text-blue-400/80" />
            <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              {lang === "vi" ? "Khu Vực Ảnh Nền / Banner Giới Thiệu" : "Showcase Banner Area"}
            </p>
            <p className="text-[11px] text-slate-400 dark:text-slate-500">
              {lang === "vi"
                ? "(Khu vực để trống — Tự động hiển thị khi bạn cập nhật file ảnh nền sau này)"
                : "(Reserved area — Automatically displays when showcase media is uploaded)"}
            </p>
          </div>
        </div>
      </section>

      {/* 3. Sứ Mệnh & Định Hướng */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Mission */}
          <div className="p-8 rounded-3xl bg-white dark:bg-slate-900/90 border border-blue-100 dark:border-slate-800 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-slate-800 border border-blue-100 dark:border-slate-700 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-4">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              {lang === "vi" ? "Sứ Mệnh Của Chúng Mình" : "Our Mission"}
            </h3>
            <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
              {lang === "vi"
                ? "Tạo ra một cộng đồng kỹ thuật mở, nơi mọi bạn học sinh THPT đều có cơ hội tiếp cận công nghệ, tự do thử nghiệm các ý tưởng khoa học và được trang bị kỹ năng thực hành từ sớm."
                : "Building an open engineering community where every high schooler can access advanced tech, experiment with bold scientific ideas, and master real-world skills from day one."}
            </p>
          </div>

          {/* Hands-on approach */}
          <div className="p-8 rounded-3xl bg-white dark:bg-slate-900/90 border border-blue-100 dark:border-slate-800 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-sky-50 dark:bg-slate-800 border border-sky-100 dark:border-slate-700 flex items-center justify-center text-sky-600 dark:text-sky-400 mb-4">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              {lang === "vi" ? "Phương Châm \"Learn By Doing\"" : "Philosophy \"Learn By Doing\""}
            </h3>
            <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
              {lang === "vi"
                ? "Không chỉ học lý thuyết trên lớp, tại STIC bạn sẽ được trực tiếp bắt tay vào dự án: hàn mạch, lắp robot, code app, làm video hay thực hiện các thí nghiệm STEM thú vị."
                : "Beyond school theory, at STIC you build real prototypes: solder circuits, assemble robots, ship software, produce media, and lead engaging STEM experiments."}
            </p>
          </div>
        </div>
      </section>

      {/* 4. Core Values */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-slate-800 px-3 py-1 rounded-full border border-blue-100 dark:border-slate-700">
            {lang === "vi" ? "Giá trị cốt lõi" : "Core Values"}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-3">
            {lang === "vi" ? "Điều STIC Hướng Tới" : "What Guides STIC"}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {CORE_VALUES.map((val, idx) => {
            const IconComp = CORE_VALUE_ICONS[val.icon] || Sparkles;
            return (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-white dark:bg-slate-900/90 border border-blue-100 dark:border-slate-800 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-2xl bg-blue-50 dark:bg-slate-800 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-4">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <h4 className="text-base font-bold text-slate-900 dark:text-white">
                    {lang === "en" ? (val.titleEn || val.englishTitle) : (val.titleVi || val.title)}
                  </h4>
                  <p className="text-xs font-medium text-blue-600 dark:text-blue-400 mt-0.5">
                    {val.englishTitle}
                  </p>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-2.5 leading-relaxed">
                    {lang === "en" ? (val.descriptionEn || val.description) : (val.descriptionVi || val.description)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. Leadership Team */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-slate-800 px-3 py-1 rounded-full border border-blue-100 dark:border-slate-700">
            {lang === "vi" ? "Đội ngũ sáng lập" : "Founding Team"}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-3">
            {lang === "vi" ? "Ban Chủ Nhiệm CLB" : "Club Leadership"}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2">
            {lang === "vi"
              ? "Những người khởi xướng và đồng hành cùng các bạn trong suốt hành trình GEN 1.0."
              : "The pioneers walking alongside you throughout the entire GEN 1.0 journey."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {LEADERS.map((leader, idx) => (
            <GlitchLeaderCard
              key={leader.name}
              leader={leader}
              index={idx}
            />
          ))}
        </div>
      </section>

      {/* 6. Call to Action */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 mt-12 text-center">
        <div className="p-8 rounded-3xl bg-blue-600 text-white space-y-4 shadow-lg shadow-blue-500/20">
          <h3 className="text-xl sm:text-2xl font-bold">
            {lang === "vi" ? "Trở thành một phần của STIC GEN 1.0 ngay hôm nay!" : "Join STIC GEN 1.0 Today!"}
          </h3>
          <p className="text-xs sm:text-sm text-blue-100 max-w-lg mx-auto">
            {lang === "vi"
              ? "Cùng nhau đặt nền móng và viết nên những câu chuyện đầu tiên về khoa học kỹ thuật của học sinh Đà Nẵng."
              : "Laying the foundations and writing the inaugural chapter of STEM innovation for Da Nang students."}
          </p>
          <div className="pt-2">
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSfEfAvIevbb0BFHFixLPn7TAy64tkk0lYzLv8ohGfm2EmizBw/viewform"
              target="_blank"
              rel="noreferrer"
            >
              <Button variant="primary" size="md" className="rounded-full px-7 py-3 font-bold gradient-btn-about border-none shadow-lg shadow-cyan-500/20">
                <span>{lang === "vi" ? "Nộp đơn ứng tuyển Google Form" : "Apply via Google Form"}</span>
                <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
