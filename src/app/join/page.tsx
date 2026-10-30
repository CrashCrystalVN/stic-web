"use client";

import React, { useState } from "react";
import { 
  Sparkles, 
  ExternalLink, 
  ChevronDown, 
  Rocket, 
  Users, 
  Trophy, 
  GraduationCap,
  Image as ImageIcon 
} from "lucide-react";
import { FAQS, BENEFITS, RECRUITMENT_STEPS } from "@/lib/data";
import { Button } from "@/components/ui/Button";
import { JoinSection } from "@/components/sections/JoinSection";

const BENEFIT_ICONS: Record<string, React.ElementType> = {
  Rocket,
  Users,
  Trophy,
  GraduationCap,
};

export default function JoinPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

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
            <span>Đơn Tuyển Thành Viên GEN 1.0</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
            Gia Nhập CLB KHKT STIC
          </h1>

          <p className="mt-4 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            Dành cho học sinh THPT trên địa bàn TP. Đà Nẵng có niềm đam mê với Khoa học, Công nghệ và Đổi mới sáng tạo.
          </p>
        </div>

        {/* Khung Banner để trống theo yêu cầu */}
        <div className="rounded-3xl border-2 border-dashed border-blue-200/80 dark:border-slate-700 bg-white/40 dark:bg-slate-900/40 backdrop-blur-sm p-8 text-center mb-12">
          <div className="flex flex-col items-center justify-center space-y-1.5">
            <ImageIcon className="w-6 h-6 text-blue-500/80 dark:text-blue-400/80" />
            <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Khu Vực Ảnh Nền / Banner Đăng Ký
            </p>
            <p className="text-[11px] text-slate-400 dark:text-slate-500">
              (Khu vực để trống — Tự động hiển thị khi bạn cập nhật file ảnh nền sau này)
            </p>
          </div>
        </div>

        {/* Khung Form Đăng Ký Trực Tiếp 1 Trang Gọn Gàng */}
        <div className="mb-16">
          <JoinSection />
        </div>

        {/* Benefits Grid */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              Quyền Lợi Khi Trở Thành Thành Viên STIC
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
                    <h4 className="text-base font-bold text-slate-900 dark:text-white">{b.title}</h4>
                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">{b.description}</p>
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
              Quy Trình Tuyển Chọn 4 Bước
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
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">{s.title}</h4>
                  <p className="text-[11px] text-blue-600 dark:text-blue-400 font-medium mt-0.5">{s.date}</p>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">{s.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              Câu Hỏi Thường Gặp (FAQ)
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
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 transition-transform duration-200 ${
                      openFaq === idx ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openFaq === idx && (
                  <div className="px-4 sm:px-5 pb-5 pt-1 text-xs text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-50 dark:border-slate-800">
                    {faq.answer}
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
