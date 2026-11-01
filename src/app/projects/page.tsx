"use client";

import React from "react";
import { Rocket, Lightbulb, ExternalLink, Code2, Cpu, Leaf, Palette, FlaskConical, BarChart2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useLang } from "@/context/LangContext";

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
            {lang === "vi" ? "Nơi Biến Ý Tưởng Thành Sản Phẩm" : "Where Ideas Turn Into Working Products"}
          </h1>

          <p className="mt-4 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            {lang === "vi"
              ? "STIC là câu lạc bộ thế hệ đầu tiên. Các dự án nghiên cứu và kỹ thuật sẽ do chính các bạn thành viên GEN 1.0 cùng nhau khởi xướng và phát triển!"
              : "STIC is a first-generation club. Flagship engineering and scientific projects will be ideated, designed, and built by GEN 1.0 members themselves!"}
          </p>
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
              <Button variant="primary" size="md" className="rounded-full px-7">
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
    </div>
  );
}
