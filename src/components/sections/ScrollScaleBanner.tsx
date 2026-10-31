"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Play } from "lucide-react";
import { useLang } from "@/context/LangContext";

interface ScrollScaleBannerProps {
  imageSrc?: string | null;
  videoSrc?: string | null;
  title?: string;
  className?: string;
}

export function ScrollScaleBanner({
  imageSrc = null,
  videoSrc = null,
  title = "STIC Showcase",
  className = "",
}: ScrollScaleBannerProps) {
  const { lang } = useLang();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Chuẩn cấu hình ScrollTrigger từ Google Antigravity (antigravity.google):
  // trigger: r, start: 'top bottom', end: isMobile ? 'top 80%' : 'top center', scrub: 1
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: isMobile ? ["start end", "start 80%"] : ["start end", "start 50%"],
  });

  // Antigravity GSAP: scale bắt đầu từ 0.5 (desktop) hoặc 0.92 (mobile), phóng to đến 1.0
  const rawScale = useTransform(
    scrollYProgress,
    [0, 1],
    [isMobile ? 0.92 : 0.5, 1.0]
  );

  // Hiệu ứng scrub siêu mượt 60-120fps (tương đương GSAP scrub: 1)
  const scale = useSpring(rawScale, {
    stiffness: 90,
    damping: 22,
    mass: 0.5,
    restDelta: 0.001,
  });

  return (
    <div
      ref={containerRef}
      className={`relative w-full flex items-center justify-center overflow-visible px-4 sm:px-6 md:px-8 ${className}`}
    >
      {/* Google Antigravity Aura Glow */}
      <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center overflow-visible">
        <div className="w-[85%] h-[320px] rounded-full bg-gradient-to-r from-blue-500/15 via-sky-500/10 to-indigo-500/15 blur-[100px]" />
      </div>

      {/* Main Animated Showcase Card */}
      <motion.div
        style={{
          scale,
          transformOrigin: "center center",
          willChange: "transform",
        }}
        className="relative z-10 w-full max-w-[1400px] 2xl:max-w-[1560px] mx-auto"
      >
        {/* Antigravity Video/Banner Wrapper Container */}
        <div className="relative w-full aspect-[16/9] max-h-[calc(100vh-140px)] min-h-[300px] rounded-[24px] sm:rounded-[30px] md:rounded-[36px] overflow-hidden bg-[#0d121f]/90 dark:bg-[#070a12]/95 backdrop-blur-2xl border border-slate-700/40 dark:border-white/10 shadow-2xl shadow-blue-500/10 group cursor-pointer transition-shadow duration-500 hover:shadow-blue-500/20">
          {/* Top specular edge reflection */}
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none z-20" />
          <div className="absolute inset-0 bg-gradient-to-b from-white/[0.04] via-transparent to-transparent pointer-events-none z-10" />

          {/* Banner Content (Tạm thời để trống theo yêu cầu) */}
          {videoSrc ? (
            <video
              src={videoSrc}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover block"
            />
          ) : imageSrc ? (
            <div className="relative w-full h-full">
              <Image
                src={imageSrc}
                alt={title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1600px) 95vw, 1500px"
                className="w-full h-full object-cover block"
              />
            </div>
          ) : (
            /* Antigravity Elegant Empty Stage */
            <div className="relative w-full h-full flex flex-col items-center justify-center select-none overflow-hidden">
              {/* Subtle tech background grid pattern */}
              <div
                className="absolute inset-0 opacity-[0.04] dark:opacity-[0.06] pointer-events-none"
                style={{
                  backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
                  backgroundSize: "32px 32px",
                }}
              />

              {/* Minimalist Antigravity Center Accent */}
              <div className="relative z-10 flex flex-col items-center text-center px-4">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white/5 dark:bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-md shadow-inner transition-transform duration-300 group-hover:scale-110">
                  <Play className="w-5 h-5 sm:w-6 sm:h-6 text-white/80 fill-white/80 translate-x-0.5" />
                </div>
                <p className="mt-4 text-xs sm:text-sm font-medium text-slate-300 dark:text-slate-300 tracking-wide">
                  STIC Innovation & Showcase
                </p>
                <span className="mt-1 text-[11px] text-slate-500 dark:text-slate-500 font-mono">
                  [ Banner Showcase ]
                </span>
              </div>

              {/* Antigravity status badge in bottom-right corner */}
              <div className="absolute bottom-5 right-5 sm:bottom-7 sm:right-7 z-20">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 dark:bg-white/10 backdrop-blur-xl border border-white/15 text-white text-xs font-medium shadow-lg transition-all duration-300 group-hover:bg-white/20">
                  <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                  <span>{lang === "vi" ? "Sẵn sàng kết nối" : "Ready to Connect"}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
