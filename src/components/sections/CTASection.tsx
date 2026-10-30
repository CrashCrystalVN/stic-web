"use client";

import React from "react";
import { Sparkles, ExternalLink, Mail } from "lucide-react";
import { SectionWrapper } from "@/components/common/SectionWrapper";
import { Button } from "@/components/ui/Button";
import { smoothScrollTo } from "@/lib/utils";

export function CTASection() {
  return (
    <SectionWrapper id="cta" className="py-20 bg-gradient-to-b from-[#e4effd] to-[#edf4fe] dark:from-[#070b17] dark:to-[#050914] relative overflow-hidden transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="rounded-3xl p-8 sm:p-12 bg-white/95 dark:bg-slate-900/95 border border-blue-200/90 dark:border-slate-800 shadow-xl text-center space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-slate-800 border border-blue-200 dark:border-slate-700 text-blue-700 dark:text-blue-400 text-xs font-bold tracking-wide uppercase">
            <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 animate-spin" />
            <span>Tham Gia Cùng STIC GEN 1.0</span>
          </div>

          {/* Heading */}
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
            Sẵn sàng cùng STIC{" "}
            <span className="text-blue-600 dark:text-blue-400">
              khám phá thế giới công nghệ?
            </span>
          </h2>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-xl mx-auto leading-relaxed">
            Đừng ngần ngại nếu bạn chưa từng tham gia dự án KHKT nào. Chỉ cần có niềm đam mê và tinh thần đồng đội, STIC luôn chào đón bạn!
          </p>

          {/* Action Button */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <Button
              onClick={() => smoothScrollTo("join")}
              variant="primary"
              size="lg"
              className="w-full sm:w-auto px-8 py-3.5 rounded-full text-base font-bold shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/35 cursor-pointer"
            >
              <span>Nộp đơn ứng tuyển trực tiếp</span>
            </Button>

            <a
              href="mailto:clbstic@gmail.com"
              className="w-full sm:w-auto"
            >
              <Button
                variant="secondary"
                size="lg"
                className="w-full sm:w-auto px-6 py-3.5 text-base rounded-full border border-blue-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400"
              >
                <Mail className="w-4 h-4 mr-2 text-blue-500" />
                <span>Gửi email thắc mắc</span>
              </Button>
            </a>
          </div>

          <p className="text-xs text-slate-500 dark:text-slate-400 pt-2">
            Mọi thắc mắc xin liên hệ qua email: <a href="mailto:clbstic@gmail.com" className="font-semibold text-blue-600 dark:text-blue-400 hover:underline">clbstic@gmail.com</a>
          </p>
        </div>
      </div>
    </SectionWrapper>
  );
}
