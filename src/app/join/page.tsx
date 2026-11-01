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
  ExternalLink
} from "lucide-react";
import { FAQS, BENEFITS, RECRUITMENT_STEPS, CLUB_INFO } from "@/lib/data";
import { useLang } from "@/context/LangContext";

const BENEFIT_ICONS: Record<string, React.ElementType> = {
  Rocket,
  Users,
  Trophy,
  GraduationCap,
};

export default function JoinPage() {
  const { lang } = useLang();
  const [openFaq, setOpenFaq] = useState<number | null>(0);
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
            {lang === "vi" ? (
              <>
                Gia Nhập <span className="gradient-text-join font-black">CLB KHKT STIC</span>
              </>
            ) : (
              <>
                Join <span className="gradient-text-join font-black">STIC Club</span>
              </>
            )}
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
            GOOGLE FORM NHÚNG TRỰC TIẾP (MAIN APPLICATION FORM)
            ======================================================== */}
        <div id="application-form" className="mb-20 scroll-mt-28">
          <div className="rounded-3xl liquid-glass border border-blue-400/40 dark:border-blue-500/30 shadow-2xl p-4 sm:p-7 relative overflow-hidden bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl">
            {/* Embed Bar Header */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 mb-4 border-b border-slate-200/80 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center font-extrabold text-lg">
                  G
                </div>
                <div>
                  <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                    {lang === "vi" ? "Biểu Mẫu Đăng Ký Tuyển Thành Viên GEN 1.0" : "Official STIC GEN 1.0 Application Form"}
                  </h2>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    {lang === "vi" ? "Điền và bấm 'Gửi' trực tiếp ngay bên dưới — dữ liệu chuyển thẳng về Google Sheets của BCN" : "Fill and submit directly below — responses are stored in Club Board's Google Sheets"}
                  </p>
                </div>
              </div>

              <a
                href={CLUB_INFO.formLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors shrink-0"
              >
                <span>{lang === "vi" ? "Mở tab riêng" : "Open in new tab"}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
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

        {/* Recruitment Timeline */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              {lang === "vi" ? "Lộ Trình Tuyển Thành Viên GEN 1.0" : "Recruitment Timeline"}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {RECRUITMENT_STEPS.map((s, idx) => (
              <div
                key={idx}
                className="relative p-6 rounded-3xl bg-white dark:bg-slate-900/90 border border-blue-100 dark:border-slate-800 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="inline-block px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-400 text-xs font-bold mb-3">
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
