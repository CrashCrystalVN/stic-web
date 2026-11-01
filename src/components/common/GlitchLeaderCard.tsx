"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { LeaderItem } from "@/lib/data";
import { useLang } from "@/context/LangContext";

interface GlitchLeaderCardProps {
  leader: LeaderItem;
  index: number;
}

export function GlitchLeaderCard({ leader, index }: GlitchLeaderCardProps) {
  const { lang } = useLang();
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { amount: 0.2, once: true });
  const [isGlitching, setIsGlitching] = useState(false);

  // Kích hoạt hiệu ứng glitch hiện đại siêu mượt khi cuộn trang tới (chỉ 450ms, không lag)
  useEffect(() => {
    if (isInView) {
      setIsGlitching(true);
      const timer = setTimeout(() => {
        setIsGlitching(false);
      }, 480);
      return () => clearTimeout(timer);
    }
  }, [isInView]);

  // Phản hồi glitch tương tác xúc giác khi rê chuột vào
  const handleMouseEnter = () => {
    if (!isGlitching) {
      setIsGlitching(true);
      const timer = setTimeout(() => {
        setIsGlitching(false);
      }, 480);
    }
  };

  const name = lang === "en" ? (leader.nameEn || leader.name) : (leader.nameVi || leader.name);
  const role = lang === "en" ? (leader.roleEn || leader.role) : (leader.roleVi || leader.role);

  // Cấu hình viền sáng công nghệ cao (Google Antigravity palette)
  const accentConfigs = [
    {
      borderGlow: "hover:border-blue-500/60 hover:shadow-blue-500/20",
      hudColor: "text-blue-500 dark:text-blue-400",
      crosshair: "text-blue-400",
      beamColor: "via-cyan-400/40",
    },
    {
      borderGlow: "hover:border-emerald-500/60 hover:shadow-emerald-500/20",
      hudColor: "text-emerald-500 dark:text-emerald-400",
      crosshair: "text-emerald-400",
      beamColor: "via-emerald-400/40",
    },
    {
      borderGlow: "hover:border-purple-500/60 hover:shadow-purple-500/20",
      hudColor: "text-purple-500 dark:text-purple-400",
      crosshair: "text-purple-400",
      beamColor: "via-purple-400/40",
    },
  ];

  const config = accentConfigs[index % accentConfigs.length];

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={handleMouseEnter}
      className={`group relative flex flex-col rounded-3xl p-3 sm:p-3.5 transition-all duration-300 liquid-glass hover:scale-[1.02] ${config.borderGlow} shadow-xl`}
    >
      {/* ========================================================
          KHUNG ẢNH CHÂN DUNG 3:4 HIỆN ĐẠI (ZERO-LAG, KHÔNG SỌC NGANG TV)
          ======================================================== */}
      <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden bg-slate-950 border border-slate-800/80 shadow-inner select-none will-change-transform">
        {/* Bức ảnh chân dung 3:4 gốc sắc nét */}
        <Image
          src={leader.avatar}
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover object-center filter saturate-[1.08] brightness-[1.02] transition-transform duration-500 ease-out group-hover:scale-105"
          priority
        />

        {/* Lớp Glitch hiện đại quang sai (Chỉ render 1 layer khi kích hoạt, 0% CPU overhead) */}
        {isGlitching && (
          <>
            <div className="absolute inset-0 pointer-events-none overflow-hidden mix-blend-screen opacity-90 modern-glitch-layer">
              <Image
                src={leader.avatar}
                alt=""
                fill
                aria-hidden
                className="object-cover object-center filter saturate-200 hue-rotate-[180deg]"
              />
            </div>

            {/* Vệt quét lăng kính khúc xạ ánh sáng (Prism Refraction Sweep) */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div className={`absolute w-[200%] h-16 -left-[50%] -top-[50%] bg-gradient-to-r from-transparent ${config.beamColor} to-transparent modern-prism-sweep`} />
            </div>
          </>
        )}

        {/* Viewfinder crosshairs tối giản ở 4 góc */}
        <span className={`absolute top-2.5 left-2.5 text-[10px] font-mono leading-none ${config.crosshair} opacity-70`}>+</span>
        <span className={`absolute top-2.5 right-2.5 text-[10px] font-mono leading-none ${config.crosshair} opacity-70`}>+</span>
        <span className={`absolute bottom-2.5 left-2.5 text-[10px] font-mono leading-none ${config.crosshair} opacity-70`}>+</span>
        <span className={`absolute bottom-2.5 right-2.5 text-[10px] font-mono leading-none ${config.crosshair} opacity-70`}>+</span>
      </div>

      {/* ========================================================
          KHUNG CAM: TÊN VÀ CHỨC VỤ TRONG CLB
          (Gọn gàng, tinh tế, sang trọng)
          ======================================================== */}
      <div className="mt-3 px-4 py-3 rounded-2xl bg-white/70 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm flex items-center justify-between transition-colors group-hover:border-blue-500/40">
        <div className="flex flex-col">
          <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white tracking-tight leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {name}
          </h3>
          <p className={`text-xs font-bold mt-0.5 ${config.hudColor}`}>
            {role}
          </p>
        </div>

        <span className="shrink-0 text-[10px] font-mono font-extrabold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700/60">
          GEN 1.0
        </span>
      </div>
    </motion.div>
  );
}
