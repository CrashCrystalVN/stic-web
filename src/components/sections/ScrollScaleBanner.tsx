"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
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

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: isMobile ? ["start end", "start 80%"] : ["start end", "start 50%"],
  });

  const rawScale = useTransform(
    scrollYProgress,
    [0, 1],
    [isMobile ? 0.92 : 0.5, 1.0]
  );

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
      {/* Dynamic Ambient Aura Glow */}
      <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center overflow-visible">
        <div className="w-[85%] h-[320px] rounded-full bg-gradient-to-r from-blue-500/10 via-sky-500/15 to-indigo-500/10 dark:from-blue-500/15 dark:via-sky-500/10 dark:to-indigo-500/15 blur-[100px]" />
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
        <div className="relative w-full aspect-[16/9] max-h-[calc(100vh-140px)] min-h-[190px] sm:min-h-[280px] rounded-[18px] sm:rounded-[30px] md:rounded-[36px] overflow-hidden bg-slate-100/90 dark:bg-[#070a12]/95 backdrop-blur-2xl border border-slate-200/80 dark:border-white/10 shadow-2xl shadow-blue-500/5 dark:shadow-blue-500/10 group cursor-pointer transition-colors duration-500 hover:shadow-blue-500/15">
          {/* Top specular edge reflection */}
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 dark:via-white/30 to-transparent pointer-events-none z-20" />
          <div className="absolute inset-0 bg-gradient-to-b from-white/40 dark:from-white/[0.04] via-transparent to-transparent pointer-events-none z-10" />

          {/* Banner Content */}
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
                priority
              />
              <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 z-20">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/65 dark:bg-black/70 backdrop-blur-xl border border-white/25 text-white text-xs font-semibold shadow-2xl transition-all duration-300 group-hover:bg-slate-900/85">
                  <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                  <span>STIC Lab // GEN 1.0</span>
                </div>
              </div>
            </div>
          ) : (
            /* ========================================================
               INTEGRATED VECTOR BANNER (DARK / LIGHT THEME AWARE)
               ======================================================== */
            <div className="relative w-full h-full flex flex-col items-center justify-center select-none overflow-hidden transition-colors duration-500">
              {/* Radial gradient atmosphere behind vector */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-sky-100/70 via-slate-50/90 to-slate-100 dark:from-[#0d172a] dark:via-[#070b14] dark:to-[#020408] pointer-events-none" />

              {/* Minimalist Grid Overlay */}
              <div
                className="absolute inset-0 opacity-[0.04] dark:opacity-[0.05] pointer-events-none"
                style={{
                  backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
                  backgroundSize: "28px 28px",
                }}
              />

              {/* Vector SVG Graphic - Adaptive Theme */}
              <div className="relative z-10 w-full h-full flex items-center justify-center p-4 sm:p-8">
                <svg
                  viewBox="0 0 1600 640"
                  className="w-full h-full max-h-[560px] object-contain drop-shadow-sm select-none"
                  preserveAspectRatio="xMidYMid meet"
                >
                  <defs>
                    {/* STIC Text Gradient: Dark Mode */}
                    <linearGradient id="liveSticGradDark" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#ffffff" />
                      <stop offset="35%" stopColor="#e0f2fe" />
                      <stop offset="70%" stopColor="#bae6fd" />
                      <stop offset="100%" stopColor="#7dd3fc" />
                    </linearGradient>

                    {/* STIC Text Gradient: Light Mode */}
                    <linearGradient id="liveSticGradLight" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#0f172a" />
                      <stop offset="45%" stopColor="#0369a1" />
                      <stop offset="75%" stopColor="#0284c7" />
                      <stop offset="100%" stopColor="#2563eb" />
                    </linearGradient>

                    {/* Ambient Aura Glow Blur */}
                    <filter id="liveAuraBlur" x="-30%" y="-30%" width="160%" height="160%">
                      <feGaussianBlur stdDeviation="35" />
                    </filter>
                  </defs>

                  {/* Central Glow Vector */}
                  <circle
                    cx="800"
                    cy="300"
                    r="280"
                    className="fill-sky-500/15 dark:fill-sky-400/15"
                    filter="url(#liveAuraBlur)"
                  />

                  {/* Top Minimalist Pill Badge */}
                  <g transform="translate(800, 160)">
                    <rect
                      x="-85"
                      y="-14"
                      width="170"
                      height="28"
                      rx="14"
                      className="fill-slate-900/[0.04] dark:fill-white/[0.05] stroke-slate-900/15 dark:stroke-white/15"
                      strokeWidth="0.8"
                    />
                    <circle cx="-56" cy="0" r="2.5" className="fill-sky-600 dark:fill-sky-400" />
                    <text
                      x="8"
                      y="4"
                      fontFamily="'Plus Jakarta Sans', system-ui, sans-serif"
                      fontSize="11"
                      fontWeight="600"
                      letterSpacing="2.5"
                      textAnchor="middle"
                      className="fill-slate-600 dark:fill-slate-400"
                    >
                      DANANG TECH HUB
                    </text>
                  </g>

                  {/* Main Wordmark: STIC */}
                  <g transform="translate(800, 310)">
                    {/* Dark mode version */}
                    <text
                      x="0"
                      y="0"
                      fontFamily="'Plus Jakarta Sans', system-ui, sans-serif"
                      fontSize="116"
                      fontWeight="800"
                      letterSpacing="18"
                      textAnchor="middle"
                      fill="url(#liveSticGradDark)"
                      className="hidden dark:block"
                    >
                      STIC
                    </text>
                    {/* Light mode version */}
                    <text
                      x="0"
                      y="0"
                      fontFamily="'Plus Jakarta Sans', system-ui, sans-serif"
                      fontSize="116"
                      fontWeight="800"
                      letterSpacing="18"
                      textAnchor="middle"
                      fill="url(#liveSticGradLight)"
                      className="block dark:hidden"
                    >
                      STIC
                    </text>
                  </g>

                  {/* Single Minimalist Line Divider */}
                  <line
                    x1="620"
                    y1="365"
                    x2="980"
                    y2="365"
                    strokeWidth="1"
                    className="stroke-sky-600/30 dark:stroke-sky-400/40"
                  />

                  {/* Club Subtitle English */}
                  <text
                    x="800"
                    y="415"
                    fontFamily="'Plus Jakarta Sans', system-ui, sans-serif"
                    fontSize="15"
                    fontWeight="600"
                    letterSpacing="7"
                    textAnchor="middle"
                    className="fill-slate-800 dark:fill-slate-200"
                  >
                    SCIENCE &amp; TECHNOLOGY INNOVATION CLUB
                  </text>

                  {/* Club Subtitle Vietnamese */}
                  <text
                    x="800"
                    y="450"
                    fontFamily="'Plus Jakarta Sans', system-ui, sans-serif"
                    fontSize="13"
                    fontWeight="400"
                    letterSpacing="2"
                    textAnchor="middle"
                    className="fill-slate-500 dark:fill-slate-400"
                  >
                    CLB Khoa Học Kỹ Thuật • THPT Đà Nẵng
                  </text>

                  {/* Bottom Minimalist Tech Coordinates */}
                  <text
                    x="800"
                    y="545"
                    fontFamily="'JetBrains Mono', monospace"
                    fontSize="10"
                    fontWeight="500"
                    letterSpacing="3"
                    textAnchor="middle"
                    className="fill-slate-400 dark:fill-slate-600"
                  >
                    [ 16.0544° N, 108.2022° E ] — GEN 1.0
                  </text>
                </svg>
              </div>

              {/* Status pill in bottom-right corner */}
              <div className="absolute bottom-5 right-5 sm:bottom-7 sm:right-7 z-20">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/5 dark:bg-white/10 backdrop-blur-xl border border-slate-900/10 dark:border-white/15 text-slate-700 dark:text-white text-xs font-medium shadow-md transition-all duration-300 group-hover:bg-slate-900/10 dark:group-hover:bg-white/20">
                  <span className="w-2 h-2 rounded-full bg-blue-500 dark:bg-blue-400 animate-pulse" />
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