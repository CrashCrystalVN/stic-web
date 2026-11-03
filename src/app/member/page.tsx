"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Users, 
  Sparkles, 
  ShieldCheck, 
  Cpu, 
  Palette, 
  ArrowRight, 
  UserCheck, 
  Search,
  ExternalLink
} from "lucide-react";
import { useLang } from "@/context/LangContext";

// Dữ liệu Ban Chủ Nhiệm (3 khung đầu tiên)
const CORE_LEADERS = [
  {
    id: "president",
    nameVi: "Lương Phú Hưng",
    nameEn: "Luong Phu Hung",
    roleVi: "Chủ nhiệm CLB",
    roleEn: "President & Founder",
    gen: "GEN 1.0",
    image: "/leaders/president.svg",
    glowColor: "from-blue-500/20 via-sky-500/10 to-transparent",
    accentBadge: "text-blue-400 bg-blue-500/10 border-blue-500/20",
  },
  {
    id: "vice-president",
    nameVi: "Lê Hoài An",
    nameEn: "Le Hoai An",
    roleVi: "Phó Chủ nhiệm",
    roleEn: "Vice President",
    gen: "GEN 1.0",
    image: "/leaders/vice-president.svg",
    glowColor: "from-emerald-500/20 via-teal-500/10 to-transparent",
    accentBadge: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
  },
  {
    id: "coordinator",
    nameVi: "Trương Văn Đăng Huy",
    nameEn: "Truong Van Dang Huy",
    roleVi: "Điều phối viên",
    roleEn: "Coordinator",
    gen: "GEN 1.0",
    image: "/leaders/coordinator.svg",
    glowColor: "from-purple-500/20 via-indigo-500/10 to-transparent",
    accentBadge: "text-purple-400 bg-purple-500/10 border-purple-500/20",
  },
];

// Dữ liệu 2 khung Đại diện Kỹ thuật & Media (Tạm thời để trống theo yêu cầu)
const TRACK_LEADERS = [
  {
    id: "tech-lead",
    trackVi: "Đại diện Mảng Kỹ thuật & Nghiên cứu",
    trackEn: "Technical & Innovation Lead",
    descVi: "Phụ trách định hướng công nghệ, Robotics, lập trình AI & các đề tài NCKH STEM thực chiến.",
    descEn: "Leading technology directions, Robotics, AI programming & practical STEM research.",
    nameVi: "— Đang cập nhật —",
    nameEn: "— To be announced —",
    roleVi: "Trưởng ban Kỹ thuật",
    roleEn: "Head of Technical",
    gen: "GEN 1.0",
    image: "/leaders/tech-lead.svg",
    icon: Cpu,
    colorTheme: "cyan",
  },
  {
    id: "media-lead",
    trackVi: "Đại diện Mảng Truyền thông & Sáng tạo",
    trackEn: "Media & Creative Lead",
    descVi: "Phụ trách xây dựng hình ảnh, sản xuất nội dung số, thiết kế đồ họa & lan tỏa giá trị CLB.",
    descEn: "Leading brand visuals, digital media production, graphic design & club outreach.",
    nameVi: "— Đang cập nhật —",
    nameEn: "— To be announced —",
    roleVi: "Trưởng ban Truyền thông",
    roleEn: "Head of Media",
    gen: "GEN 1.0",
    image: "/leaders/media-lead.svg",
    icon: Palette,
    colorTheme: "pink",
  },
];

// Danh sách thành viên (Tạm thời để trống theo yêu cầu)
const MEMBERS_LIST: Array<{
  id: string;
  name: string;
  grade: string;
  team: string;
  role: string;
}> = [];

export default function MemberPage() {
  const { lang } = useLang();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredMembers = MEMBERS_LIST.filter((m) =>
    m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.team.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen pt-32 pb-24 bg-[#fafbfc] dark:bg-[#070a12] text-slate-900 dark:text-white transition-colors relative overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center overflow-hidden">
        <div className="w-[800px] h-[400px] rounded-full bg-gradient-to-tr from-blue-500/10 via-purple-500/5 to-transparent blur-[140px]" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        {/* ========================================================
            HEADER
            ======================================================== */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full liquid-glass border border-blue-400/30 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider">
            <Users className="w-4 h-4" />
            <span>{lang === "vi" ? "ĐỘI NGŨ THÀNH VIÊN STIC" : "STIC CLUB DIRECTORY"}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            {lang === "vi" ? (
              <>
                Những Con Người Tạo Nên <span className="gradient-text gradient-text-home">STIC</span>
              </>
            ) : (
              <>
                The People Behind <span className="gradient-text gradient-text-home">STIC</span>
              </>
            )}
          </h1>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
            {lang === "vi"
              ? "Cộng đồng đam mê Khoa học Kỹ thuật, Lập trình và Đổi mới Sáng tạo thế hệ học sinh THPT Đà Nẵng."
              : "A dedicated community of high school innovators, developers, and STEM enthusiasts in Da Nang."}
          </p>
        </div>

        {/* ========================================================
            PHẦN 1: BAN CHỦ NHIỆM (3 KHUNG MỞ ĐẦU NHƯ HÌNH)
            ======================================================== */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
            <ShieldCheck className="w-4 h-4 text-blue-500" />
            <span>{lang === "vi" ? "Ban Chủ Nhiệm CLB" : "Leadership Board"}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {CORE_LEADERS.map((leader, idx) => (
              <motion.div
                key={leader.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group relative rounded-3xl overflow-hidden liquid-glass border border-slate-200/90 dark:border-white/10 shadow-xl bg-white/70 dark:bg-[#0c1322]/80 backdrop-blur-2xl transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl"
              >
                {/* 3:4 Hologram Cyber Canvas */}
                <div className="relative w-full aspect-[3/4] overflow-hidden bg-slate-950">
                  <Image
                    src={leader.image}
                    alt={lang === "vi" ? leader.nameVi : leader.nameEn}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    priority
                  />
                  {/* Subtle edge overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
                </div>

                {/* Footer Info Block */}
                <div className="p-5 sm:p-6 bg-slate-900/95 border-t border-slate-800 flex items-center justify-between">
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                      {lang === "vi" ? leader.nameVi : leader.nameEn}
                    </h3>
                    <p className="text-xs sm:text-sm font-medium text-slate-400 mt-0.5">
                      {lang === "vi" ? leader.roleVi : leader.roleEn}
                    </p>
                  </div>
                  <span className="px-3 py-1 rounded-full text-[11px] font-mono font-bold bg-white/10 text-slate-300 border border-white/15">
                    {leader.gen}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ========================================================
            PHẦN 2: 2 KHUNG ĐẠI DIỆN KỸ THUẬT & MEDIA
            ======================================================== */}
        <div className="space-y-6 pt-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
            <Sparkles className="w-4 h-4 text-purple-500" />
            <span>{lang === "vi" ? "Đại Diện Các Mảng Hoạt Động" : "Track Leads"}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {TRACK_LEADERS.map((lead, idx) => {
              const Icon = lead.icon;
              const isCyan = lead.colorTheme === "cyan";

              return (
                <motion.div
                  key={lead.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + idx * 0.1 }}
                  className="group relative rounded-3xl overflow-hidden liquid-glass border border-slate-200/90 dark:border-white/10 shadow-xl bg-white/70 dark:bg-[#0c1322]/80 backdrop-blur-2xl transition-all duration-300 hover:scale-[1.01] hover:shadow-2xl flex flex-col"
                >
                  {/* Cyber Hologram Card */}
                  <div className="relative w-full aspect-[16/10] sm:aspect-[3/2] overflow-hidden bg-slate-950">
                    <Image
                      src={lead.image}
                      alt={lang === "vi" ? lead.trackVi : lead.trackEn}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-85" />
                    
                    {/* Top Floating Badge */}
                    <div className="absolute top-4 left-4 z-10">
                      <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold backdrop-blur-md border ${
                        isCyan 
                          ? "bg-cyan-950/60 text-cyan-300 border-cyan-500/30" 
                          : "bg-pink-950/60 text-pink-300 border-pink-500/30"
                      }`}>
                        <Icon className="w-3.5 h-3.5" />
                        <span>{lang === "vi" ? lead.trackVi : lead.trackEn}</span>
                      </div>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 bg-slate-900/95 border-t border-slate-800 flex-1 flex flex-col justify-between space-y-4">
                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                      {lang === "vi" ? lead.descVi : lead.descEn}
                    </p>

                    <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                      <div>
                        <h4 className="text-base font-bold text-white tracking-tight">
                          {lang === "vi" ? lead.nameVi : lead.nameEn}
                        </h4>
                        <p className="text-xs text-slate-400 mt-0.5">
                          {lang === "vi" ? lead.roleVi : lead.roleEn}
                        </p>
                      </div>

                      <span className="px-3 py-1 rounded-full text-[11px] font-mono font-bold bg-white/10 text-slate-300 border border-white/15">
                        {lead.gen}
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ========================================================
            PHẦN 3: DANH SÁCH THÀNH VIÊN (TẠM THỜI ĐỂ TRỐNG)
            ======================================================== */}
        <div className="space-y-6 pt-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-slate-200 dark:border-slate-800">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
                {lang === "vi" ? "Danh Sách Thành Viên GEN 1.0" : "GEN 1.0 Members Directory"}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                {lang === "vi"
                  ? "Danh sách thành viên chính thức sau đợt tuyển quân GEN 1.0"
                  : "Official members after the GEN 1.0 recruitment round"}
              </p>
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={lang === "vi" ? "Tìm kiếm thành viên..." : "Search member..."}
                className="w-full pl-9 pr-4 py-2 rounded-xl text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/40 text-slate-900 dark:text-white placeholder:text-slate-400"
              />
            </div>
          </div>

          {/* Empty Stage (Tạm thời để trống theo yêu cầu) */}
          {filteredMembers.length === 0 ? (
            <div className="rounded-3xl p-10 sm:p-14 text-center liquid-glass border border-slate-200/80 dark:border-white/10 bg-white/50 dark:bg-slate-900/50 space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-blue-500/10 dark:bg-blue-400/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto">
                <UserCheck className="w-7 h-7" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                {lang === "vi" ? "Đang Cập Nhật Danh Sách Thành Viên" : "Member Directory Under Update"}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
                {lang === "vi"
                  ? "Danh sách thành viên chính thức sẽ được công bố ngay sau khi hoàn tất vòng phỏng vấn & công bố kết quả tuyển quân GEN 1.0."
                  : "The official member list will be announced right after the completion of the GEN 1.0 recruitment round."}
              </p>
              <div className="pt-2">
                <Link
                  href="/join"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold text-white gradient-btn-join shadow-md shadow-blue-500/20 hover:scale-[1.02] transition-transform"
                >
                  <span>{lang === "vi" ? "Đăng ký ứng tuyển ngay" : "Apply Now"}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredMembers.map((m) => (
                <div
                  key={m.id}
                  className="p-4 rounded-2xl liquid-glass border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 space-y-1"
                >
                  <p className="text-sm font-bold text-slate-900 dark:text-white">{m.name}</p>
                  <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">{m.role}</p>
                  <p className="text-[11px] text-slate-400">{m.team} • {m.grade}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

