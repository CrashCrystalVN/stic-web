"use client";

import React, { useState } from "react";
import Image from "next/image";
import { 
  Sparkles, 
  ChevronDown, 
  Rocket, 
  Users, 
  Trophy, 
  GraduationCap,
  ExternalLink,
  Send,
  CheckCircle2,
  FileText
} from "lucide-react";
import { FAQS, BENEFITS, RECRUITMENT_STEPS, CLUB_INFO } from "@/lib/data";
import { useLang } from "@/context/LangContext";
import { JoinSection } from "@/components/sections/JoinSection";

const BENEFIT_ICONS: Record<string, React.ElementType> = {
  Rocket,
  Users,
  Trophy,
  GraduationCap,
};

export default function JoinPage() {
  const { lang } = useLang();
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [formMode, setFormMode] = useState<"stic" | "google">("stic");
  const [isIframeLoading, setIsIframeLoading] = useState(true);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen pt-32 pb-24 bg-gradient-to-b from-[#edf4fe] via-[#f4f9ff] to-[#e4effd] dark:from-[#050914] dark:via-[#090e1e] dark:to-[#070b17] transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white dark:bg-slate-800 border border-blue-200 dark:border-slate-700 text-blue-700 dark:text-blue-400 text-xs font-semibold uppercase mb-4 shadow-xs">
            <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span>{lang === "vi" ? "Đơn Tuyển Thành Viên GEN 1.0" : "GEN 1.0 Recruitment Application"}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
            {lang === "vi" ? "Gia Nhập CLB KHKT STIC" : "Join STIC Club"}
          </h1>

          <p className="mt-4 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            {lang === "vi"
              ? "Dành cho học sinh THPT trên địa bàn TP. Đà Nẵng có niềm đam mê với Khoa học, Công nghệ và Đổi mới sáng tạo."
              : "Built for Da Nang high school students passionate about Science, Technology, and Innovation."}
          </p>
        </div>

        {/* Banner Dang Ky Tuyen Quan GEN 1.0 */}
        <div className="relative w-full aspect-[2.55/1] rounded-3xl overflow-hidden border border-blue-100 dark:border-white/10 shadow-xl shadow-blue-500/10 mb-10">
          <Image
            src="/banner.png"
            alt="STIC GEN 1.0 Recruitment Banner"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* ========================================================
            TAB SELECTOR: Giao diện STIC vs Google Form Trực Tiếp
            ======================================================== */}
        <div className="mb-10 flex flex-col items-center">
          <div className="p-1.5 rounded-2xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-slate-200/80 dark:border-slate-800 shadow-xl shadow-blue-500/5 inline-flex items-center gap-1.5 sm:gap-2 max-w-full">
            <button
              onClick={() => setFormMode("stic")}
              className={`px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer ${
                formMode === "stic"
                  ? "bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white shadow-md shadow-blue-500/25 scale-[1.02]"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>{lang === "vi" ? "Giao diện STIC Tương Tác" : "STIC Interactive Form"}</span>
            </button>

            <button
              onClick={() => setFormMode("google")}
              className={`px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer ${
                formMode === "google"
                  ? "bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white shadow-md shadow-blue-500/25 scale-[1.02]"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>{lang === "vi" ? "Google Form Nhúng Trực Tiếp" : "Direct Google Form"}</span>
            </button>
          </div>

          <p className="mt-3 text-xs text-slate-500 dark:text-slate-400 text-center max-w-md">
            {formMode === "stic"
              ? (lang === "vi"
                  ? "✦ Điền form với giao diện tối ưu của STIC, tự động chuẩn bị dữ liệu gửi về Google Form."
                  : "✦ Fill with STIC's modern design, pre-filled automatically for Google Form.")
              : (lang === "vi"
                  ? "✦ Biểu mẫu Google Form chính thức được nhúng trực tiếp. Điền và nộp ngay tại đây mà không cần rời trang!"
                  : "✦ Official Google Form embedded directly on the page. Submit without leaving!")}
          </p>
        </div>

        {/* ========================================================
            TAB 1: GIAO DIỆN STIC INTERACTIVE
            ======================================================== */}
        {formMode === "stic" && (
          <div className="mb-20">
            {/* Quick Option Banner */}
            <div className="mb-10 p-6 sm:p-7 rounded-3xl liquid-glass border border-blue-400/40 dark:border-blue-500/30 shadow-xl shadow-blue-500/10 flex flex-col md:flex-row items-center justify-between gap-5">
              <div className="space-y-1.5 text-center md:text-left">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider">
                  <span className="w-2 h-2 rounded-full bg-blue-500 animate-ping" />
                  <span>{lang === "vi" ? "Tuỳ Chọn Linh Hoạt" : "Flexible Option"}</span>
                </div>
                <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
                  {lang === "vi" ? "Bạn muốn điền thẳng Google Form nhúng?" : "Prefer Direct Google Form Embed?"}
                </h2>
                <p className="text-xs text-slate-600 dark:text-slate-300 max-w-lg leading-relaxed">
                  {lang === "vi"
                    ? "Bạn có thể chuyển sang tab \"Google Form Nhúng Trực Tiếp\" phía trên để nộp đơn ngay tại chỗ, hoặc mở form ở tab riêng."
                    : "You can switch to the \"Direct Google Form\" tab above to submit right on-page, or open the form in a new tab."}
                </p>
              </div>

              <div className="flex items-center gap-2.5 shrink-0">
                <button
                  onClick={() => setFormMode("google")}
                  className="px-5 py-3 rounded-full bg-blue-50 dark:bg-blue-950/50 hover:bg-blue-100 dark:hover:bg-blue-900/50 text-blue-700 dark:text-blue-300 text-xs sm:text-sm font-bold border border-blue-200 dark:border-blue-800 transition-all cursor-pointer"
                >
                  {lang === "vi" ? "Đổi sang Form Nhúng" : "Switch to Embed"}
                </button>
                <a
                  href={CLUB_INFO.formLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-6 py-3 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:via-indigo-500 hover:to-purple-500 text-white text-xs sm:text-sm font-bold shadow-lg shadow-indigo-500/25 hover:scale-[1.03] transition-all cursor-pointer"
                >
                  <span>{lang === "vi" ? "Mở Tab Riêng ↗" : "New Tab ↗"}</span>
                </a>
              </div>
            </div>

            <JoinSection />
          </div>
        )}

        {/* ========================================================
            TAB 2: GOOGLE FORM NHÚNG TRỰC TIẾP (EMBEDDED IFRAME)
            ======================================================== */}
        {formMode === "google" && (
          <div className="mb-20">
            <div className="rounded-3xl liquid-glass border border-blue-400/40 dark:border-blue-500/30 shadow-2xl p-4 sm:p-7 relative overflow-hidden bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl">
              {/* Embed Bar Header */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 mb-4 border-b border-slate-200/80 dark:border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center font-extrabold text-lg">
                    G
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                      {lang === "vi" ? "Biểu Mẫu Google Form Chính Thức - STIC GEN 1.0" : "Official STIC GEN 1.0 Google Form"}
                    </h3>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      {lang === "vi" ? "Đơn sẽ gửi thẳng 100% vào Google Sheets của Ban chủ nhiệm" : "Submissions go directly to Club Board's Google Sheets"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setFormMode("stic")}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                  >
                    {lang === "vi" ? "← Trở về form STIC" : "← Back to STIC Form"}
                  </button>
                  <a
                    href={CLUB_INFO.formLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors"
                  >
                    <span>{lang === "vi" ? "Mở toàn màn hình" : "Full screen"}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Iframe Frame */}
              <div className="relative w-full rounded-2xl overflow-hidden bg-white dark:bg-slate-950 min-h-[900px] border border-slate-200/80 dark:border-slate-800 shadow-inner">
                {isIframeLoading && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/90 dark:bg-slate-900/90 backdrop-blur-xs z-10 gap-3">
                    <div className="w-9 h-9 border-3 border-blue-600/30 border-t-blue-600 rounded-full animate-spin" />
                    <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">
                      {lang === "vi" ? "Đang kết nối và tải Google Form..." : "Connecting & loading Google Form..."}
                    </p>
                  </div>
                )}
                <iframe
                  src="https://docs.google.com/forms/d/e/1FAIpQLSfEfAvIevbb0BFHFixLPn7TAy64tkk0lYzLv8ohGfm2EmizBw/viewform?embedded=true"
                  width="100%"
                  height="1850"
                  frameBorder="0"
                  marginHeight={0}
                  marginWidth={0}
                  className="w-full min-h-[1600px] border-none"
                  onLoad={() => setIsIframeLoading(false)}
                  title="STIC GEN 1.0 Recruitment Application Google Form"
                >
                  Đang tải Google Form...
                </iframe>
              </div>
            </div>
          </div>
        )}

        {/* Benefits Grid */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              {lang === "vi" ? "Quyền Lợi Khi Trở Thành Thành Viên STIC" : "Member Benefits"}
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {BENEFITS.map((b, idx) => {
              const Icon = BENEFIT_ICONS[b.icon] || Sparkles;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-3xl bg-white dark:bg-slate-900/90 border border-blue-100 dark:border-slate-800 shadow-sm flex items-start gap-4"
                >
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-slate-800 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-slate-900 dark:text-white">
                      {lang === "en" ? (b.titleEn || b.title) : (b.titleVi || b.title)}
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                      {lang === "en" ? (b.descriptionEn || b.description) : (b.descriptionVi || b.description)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recruitment Process Steps */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              {lang === "vi" ? "Quy Trình Tuyển Chọn 4 Bước" : "4-Step Recruitment Process"}
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {RECRUITMENT_STEPS.map((s) => (
              <div
                key={s.step}
                className="p-5 rounded-3xl bg-white dark:bg-slate-900/90 border border-blue-100 dark:border-slate-800 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="w-8 h-8 rounded-xl bg-blue-600 text-white font-bold text-xs flex items-center justify-center mb-3">
                    {s.step}
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    {lang === "en" ? (s.titleEn || s.title) : (s.titleVi || s.title)}
                  </h4>
                  <p className="text-[11px] text-blue-600 dark:text-blue-400 font-medium mt-0.5">
                    {lang === "en" ? (s.dateEn || s.date) : (s.dateVi || s.date)}
                  </p>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                    {lang === "en" ? (s.descriptionEn || s.description) : (s.descriptionVi || s.description)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              {lang === "vi" ? "Câu Hỏi Thường Gặp (FAQ)" : "Frequently Asked Questions (FAQ)"}
            </h3>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, idx) => (
              <div
                key={idx}
                className="rounded-2xl bg-white dark:bg-slate-900/90 border border-blue-100 dark:border-slate-800 overflow-hidden shadow-xs transition-colors"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 focus:outline-none cursor-pointer"
                >
                  <span className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200">
                    {lang === "en" ? (faq.questionEn || faq.question) : (faq.questionVi || faq.question)}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 transition-transform duration-200 ${
                      openFaq === idx ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openFaq === idx && (
                  <div className="px-4 sm:px-5 pb-5 pt-1 text-xs text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-50 dark:border-slate-800">
                    {lang === "en" ? (faq.answerEn || faq.answer) : (faq.answerVi || faq.answer)}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
