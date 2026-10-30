"use client";

import React from "react";
import { Calendar, MapPin, Clock, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function EventsPage() {
  return (
    <div className="min-h-screen pt-32 pb-24 bg-gradient-to-b from-[#edf4fe] via-[#f4f9ff] to-[#e4effd] dark:from-[#050914] dark:via-[#090e1e] dark:to-[#070b17] transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white dark:bg-slate-800 border border-blue-200 dark:border-slate-700 text-blue-700 dark:text-blue-400 text-xs font-semibold uppercase mb-4 shadow-xs">
            <Calendar className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span>Sự Kiện & Lịch Hoạt Động</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Lịch Hoạt Động STIC
          </h1>

          <p className="mt-4 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            Theo dõi các hoạt động, đợt tuyển quân và sự kiện học thuật của CLB Khoa học Kỹ thuật STIC.
          </p>
        </div>

        {/* Real Event Card */}
        <div className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-slate-900/90 border-2 border-blue-200 dark:border-slate-800 shadow-sm relative overflow-hidden mb-12">
          <div className="flex items-center justify-between mb-4">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-600 text-white text-xs font-bold">
              <span className="w-2 h-2 rounded-full bg-white animate-ping" />
              ĐANG MỞ ĐƠN
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold">STIC GEN 1.0</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Tuyển Thành Viên Thế Hệ GEN 1.0
          </h2>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-3 leading-relaxed">
            Đợt tuyển chọn thành viên chính thức đầu tiên dành cho học sinh THPT trên địa bàn TP. Đà Nẵng. Hãy cùng nhau đặt những viên gạch đầu tiên cho CLB Khoa học Kỹ thuật STIC.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-6 text-xs text-slate-700 dark:text-slate-300">
            <div className="p-3.5 rounded-2xl bg-blue-50/60 dark:bg-slate-800/60 border border-blue-100 dark:border-slate-700 flex items-center gap-2.5">
              <Calendar className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span>Thời gian: Đang mở đơn</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-blue-50/60 dark:bg-slate-800/60 border border-blue-100 dark:border-slate-700 flex items-center gap-2.5">
              <MapPin className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span>Địa điểm: Đăng ký online</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-blue-50/60 dark:bg-slate-800/60 border border-blue-100 dark:border-slate-700 flex items-center gap-2.5">
              <Clock className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span>Kết quả: Qua email cá nhân</span>
            </div>
          </div>

          <div>
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSfEfAvIevbb0BFHFixLPn7TAy64tkk0lYzLv8ohGfm2EmizBw/viewform"
              target="_blank"
              rel="noreferrer"
            >
              <Button variant="primary" size="md" className="rounded-full px-6">
                <span>Điền đơn ứng tuyển Google Form</span>
                <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
            </a>
          </div>
        </div>

        {/* Upcoming Activities Notice */}
        <div className="p-6 rounded-3xl bg-blue-50/50 dark:bg-slate-800/50 border border-dashed border-blue-200 dark:border-slate-700 text-center space-y-2">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">
            Các Hoạt Động Tiếp Theo Sau Khi Tuyển Quân
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-lg mx-auto">
            1. Buổi gặp mặt Tân thành viên GEN 1.0 (Orientation Day)<br />
            2. Phân ban & Chia nhóm dự án chuyên môn<br />
            3. Workshop kỹ năng kỹ thuật & phương pháp nghiên cứu KHKT
          </p>
          <p className="text-[11px] text-blue-600 dark:text-blue-400 font-medium pt-1">
            *Lịch trình chi tiết sẽ được gửi trực tiếp qua email cho các bạn thành viên trúng tuyển.
          </p>
        </div>
      </div>
    </div>
  );
}
