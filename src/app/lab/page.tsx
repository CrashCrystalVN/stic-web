"use client";

import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useSpring } from "framer-motion";
import {
  Sparkles,
  ArrowLeft,
  Sliders,
  MousePointer2,
  Layers,
  Wand2,
  RefreshCw,
  Copy,
  Check,
  Eye,
  Activity,
  Compass,
  Zap,
  Flame,
  Volume2,
  Code2,
  Cpu,
  Monitor
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useLang } from "@/context/LangContext";

// ── Types ─────────────────────────────────────────────────────────────
type CursorMode = "artru-diff" | "magnetic-ring" | "cyber-cross" | "system";

// ── Cyber Text Scramble Hook ─────────────────────────────────────────
function useTextScramble(finalText: string) {
  const [text, setText] = useState(finalText);
  const [isScrambling, setIsScrambling] = useState(false);
  const chars = "!<>-_\\/[]{}—=+*^?#________";

  const trigger = useCallback(() => {
    if (isScrambling) return;
    setIsScrambling(true);
    let iteration = 0;
    const interval = setInterval(() => {
      setText(() =>
        finalText
          .split("")
          .map((letter, index) => {
            if (index < iteration) {
              return finalText[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );

      if (iteration >= finalText.length) {
        clearInterval(interval);
        setIsScrambling(false);
      }
      iteration += 1 / 2;
    }, 30);
  }, [finalText, isScrambling]);

  return { text, trigger };
}

// ── Scramble Text Component ──────────────────────────────────────────
function ScrambleHeading({ text }: { text: string }) {
  const { text: displayText, trigger } = useTextScramble(text);
  return (
    <span
      onMouseEnter={trigger}
      className="cursor-pointer select-none font-mono tracking-tight transition-colors hover:text-blue-400"
    >
      {displayText}
    </span>
  );
}

// ── 3D Tilt Card Component ───────────────────────────────────────────
interface TiltCardProps {
  title: string;
  subtitle: string;
  tag: string;
  desc: string;
  enableTilt: boolean;
  tiltIntensity: number;
  useLiquidFilter: boolean;
}

function TiltCard({
  title,
  subtitle,
  tag,
  desc,
  enableTilt,
  tiltIntensity,
  useLiquidFilter,
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!enableTilt || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = ((y - centerY) / centerY) * -tiltIntensity;
    const rotY = ((x - centerX) / centerX) * tiltIntensity;

    setRotateX(rotX);
    setRotateY(rotY);
    setGlarePos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.25,
    });
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setGlarePos((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <div
      style={{ perspective: 1000 }}
      className="w-full relative group select-none"
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transition: "transform 0.15s ease-out, filter 0.3s ease",
          filter: useLiquidFilter ? "url(#artru-liquid-glass)" : "none",
        }}
        className="relative overflow-hidden rounded-3xl p-6 sm:p-8 bg-slate-900/90 dark:bg-[#0c121e]/90 border border-white/15 dark:border-white/10 shadow-2xl backdrop-blur-xl transition-shadow duration-300 hover:shadow-cyan-500/10 hover:border-cyan-400/40"
      >
        {/* Specular Glare Layer */}
        <div
          style={{
            background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255,255,255,${glarePos.opacity}), transparent 60%)`,
          }}
          className="pointer-events-none absolute inset-0 transition-opacity duration-300 z-10"
        />

        {/* Top Badges */}
        <div className="flex items-center justify-between gap-2 mb-6">
          <span className="px-3 py-1 rounded-full text-[11px] font-mono font-bold tracking-wider uppercase bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
            {tag}
          </span>
          <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            LIVE SPECIMEN
          </span>
        </div>

        {/* Hologram Visor Visual */}
        <div className="relative w-full h-36 rounded-2xl bg-gradient-to-b from-cyan-950/40 to-slate-950/80 border border-cyan-500/20 flex flex-col items-center justify-center p-4 mb-6 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px] opacity-25" />

          {/* Hologram Avatar Silhouette */}
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-14 h-14 rounded-full border-2 border-cyan-400/60 bg-cyan-950/60 flex items-center justify-center shadow-[0_0_20px_rgba(34,211,238,0.3)]">
              <Cpu className="w-7 h-7 text-cyan-300" />
            </div>
            <div className="w-10 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_12px_#22d3ee] mt-2 animate-pulse" />
          </div>

          {/* Dynamic Frequency Bars */}
          <div className="flex items-end gap-1 mt-3 z-10 h-5">
            {[40, 75, 55, 90, 60, 85, 45, 95, 70, 50, 80, 65].map((h, i) => (
              <motion.span
                key={i}
                animate={{ height: [`${h * 0.3}%`, `${h}%`, `${h * 0.4}%`] }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  delay: i * 0.08,
                  ease: "easeInOut",
                }}
                className="w-1 bg-cyan-400/80 rounded-full"
              />
            ))}
          </div>
        </div>

        {/* Content */}
        <h3 className="text-xl font-black text-white mb-1 tracking-tight">
          {title}
        </h3>
        <p className="text-xs font-semibold text-cyan-400/90 mb-3">{subtitle}</p>
        <p className="text-xs leading-relaxed text-slate-300/80">{desc}</p>

        {/* Interactive Bottom Bar */}
        <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-slate-400">
          <span>TILT: ({rotateX.toFixed(1)}°, {rotateY.toFixed(1)}°)</span>
          <span className="text-cyan-400 group-hover:translate-x-1 transition-transform">
            HOVER TO TEST →
          </span>
        </div>
      </div>
    </div>
  );
}

// ── Magnetic Button Component ─────────────────────────────────────────
interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  radius?: number;
}

function MagneticButton({
  children,
  className = "",
  onClick,
  radius = 90,
}: MagneticButtonProps) {
  const btnRef = useRef<HTMLButtonElement>(null);
  const x = useSpring(0, { stiffness: 250, damping: 20 });
  const y = useSpring(0, { stiffness: 250, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distX = e.clientX - centerX;
    const distY = e.clientY - centerY;
    const dist = Math.hypot(distX, distY);

    if (dist < radius) {
      x.set(distX * 0.35);
      y.set(distY * 0.35);
    } else {
      x.set(0);
      y.set(0);
    }
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={btnRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{ x, y }}
      className={className}
    >
      {children}
    </motion.button>
  );
}

// ── Main Animation Lab Page ──────────────────────────────────────────
export default function AnimationLabPage() {
  const { lang } = useLang();

  // State controls
  const [cursorMode, setCursorMode] = useState<CursorMode>("artru-diff");
  const [tiltIntensity, setTiltIntensity] = useState(15);
  const [enableTilt, setEnableTilt] = useState(true);
  const [useLiquidFilter, setUseLiquidFilter] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [mouseCoord, setMouseCoord] = useState({ x: -100, y: -100 });
  const [isHoveringClickable, setIsHoveringClickable] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Mouse follower listener (matches artru.net)
  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setMouseCoord({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target?.closest(
          "a, button, input, textarea, [data-interactive], .clickable, code"
        )
      ) {
        setIsHoveringClickable(true);
      } else {
        setIsHoveringClickable(false);
      }
    };

    const handleScroll = () => {
      const total =
        document.documentElement.scrollHeight - window.innerHeight;
      if (total > 0) {
        setScrollProgress((window.scrollY / total) * 100);
      }
    };

    window.addEventListener("mousemove", handleMove, { passive: true });
    window.addEventListener("mouseover", handleMouseOver, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const copyArtruCss = () => {
    const css = `.artru-mouse {
  opacity: 1;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: #fff;
  position: fixed;
  z-index: 9999999999;
  pointer-events: none;
  mix-blend-mode: difference;
  box-shadow: 0 0 20px 0 #fff;
  transition: transform .2s ease-out, width .3s, height .3s, opacity .5s;
  will-change: transform;
}
.artru-mouse.hover {
  width: 0px;
  height: 0px;
}`;
    navigator.clipboard.writeText(css);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#070b12] text-slate-100 selection:bg-blue-500/30 selection:text-blue-200 font-sans relative overflow-x-hidden">
      {/* ── ARTRU.NET CHROMATIC DISPERSION LIQUID GLASS SVG FILTER ── */}
      <svg
        className="hidden pointer-events-none absolute"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <filter
            id="artru-liquid-glass"
            colorInterpolationFilters="sRGB"
            x="-2%"
            y="-2%"
            width="104%"
            height="104%"
          >
            <feImage
              x="0"
              y="0"
              width="100%"
              height="100%"
              preserveAspectRatio="none"
              result="map"
              href="data:image/svg+xml,%3Csvg viewBox='0 0 100 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3ClinearGradient id='r' x1='1' y1='0' x2='0' y2='0'%3E%3Cstop offset='0%25' stop-color='%230000'/%3E%3Cstop offset='100%25' stop-color='red'/%3E%3C/linearGradient%3E%3ClinearGradient id='b' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0%25' stop-color='%230000'/%3E%3Cstop offset='12%25' stop-color='%230000'/%3E%3Cstop offset='88%25' stop-color='blue'/%3E%3Cstop offset='100%25' stop-color='blue'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='100' height='6' fill='black'/%3E%3Crect width='100' height='6' rx='2' fill='url(%23r)'/%3E%3Crect width='100' height='6' rx='2' fill='url(%23b)' opacity='0.5'/%3E%3C/svg%3E"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="map"
              result="dispRed"
              scale="-45"
              xChannelSelector="R"
              yChannelSelector="G"
            />
            <feColorMatrix
              in="dispRed"
              type="matrix"
              values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0"
              result="red"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="map"
              result="dispGreen"
              scale="-30"
              xChannelSelector="R"
              yChannelSelector="G"
            />
            <feColorMatrix
              in="dispGreen"
              type="matrix"
              values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0"
              result="green"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="map"
              result="dispBlue"
              scale="-18"
              xChannelSelector="R"
              yChannelSelector="G"
            />
            <feColorMatrix
              in="dispBlue"
              type="matrix"
              values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0"
              result="blue"
            />
            <feBlend in="red" in2="green" mode="screen" result="rg" />
            <feBlend in="rg" in2="blue" mode="screen" result="output" />
            <feGaussianBlur in="output" stdDeviation="0.6" />
          </filter>
        </defs>
      </svg>

      {/* ── ARTRU-STYLE READING PROGRESS TOP BAR ── */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-transparent z-50 pointer-events-none">
        <div
          style={{ width: `${scrollProgress}%` }}
          className="h-full bg-gradient-to-r from-blue-500 via-cyan-400 to-indigo-500 shadow-[0_0_12px_#38bdf8] transition-all duration-75"
        />
      </div>

      {/* ── ARTRU INTERACTIVE CURSOR FOLLOWER ── */}
      {cursorMode !== "system" && (
        <div
          style={{
            transform: `translate(${mouseCoord.x}px, ${mouseCoord.y}px)`,
          }}
          className="fixed top-0 left-0 pointer-events-none z-[99999] transition-transform duration-75 ease-out"
        >
          {cursorMode === "artru-diff" && (
            <div
              style={{
                mixBlendMode: "difference",
                boxShadow: "0 0 24px 2px #fff",
              }}
              className={`-translate-x-1/2 -translate-y-1/2 rounded-full bg-white transition-all duration-300 ease-out ${
                isHoveringClickable
                  ? "w-10 h-10 opacity-70 scale-125"
                  : "w-4 h-4 opacity-100"
              }`}
            />
          )}

          {cursorMode === "magnetic-ring" && (
            <div
              className={`-translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.6)] transition-all duration-200 ${
                isHoveringClickable
                  ? "w-12 h-12 bg-cyan-400/20 scale-110"
                  : "w-6 h-6 bg-transparent"
              }`}
            >
              <div className="absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-cyan-300" />
            </div>
          )}

          {cursorMode === "cyber-cross" && (
            <div className="-translate-x-1/2 -translate-y-1/2 w-8 h-8 pointer-events-none flex items-center justify-center">
              <div className="w-full h-[1px] bg-cyan-400/80 shadow-[0_0_6px_#22d3ee]" />
              <div className="h-full w-[1px] bg-cyan-400/80 shadow-[0_0_6px_#22d3ee] absolute" />
              <div className="w-3 h-3 border border-cyan-300 rounded-sm absolute" />
            </div>
          )}
        </div>
      )}

      {/* Main Navbar */}
      <Navbar />

      {/* ── BACKGROUND AMBIENCE ── */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-blue-600/15 via-cyan-500/10 to-indigo-600/15 rounded-full blur-[130px] opacity-70" />
        <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-40" />
      </div>

      <main className="relative z-10 pt-28 pb-24 px-4 sm:px-6 max-w-7xl mx-auto">
        {/* Top Breadcrumb & Return to Main */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold text-slate-300 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-blue-400/40 transition-all group"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
            <span>{lang === "vi" ? "Về trang chủ STIC" : "Back to STIC Home"}</span>
          </Link>

          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 bg-cyan-950/60 border border-cyan-500/30 px-3.5 py-1.5 rounded-full shadow-inner">
            <Sparkles className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: "6s" }} />
            <span>LAB ENGINE // ARTRU.NET MOTION MATRIX</span>
          </div>
        </div>

        {/* Hero Title Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono text-cyan-300 bg-cyan-950/40 border border-cyan-500/30 mb-4">
            <Activity className="w-3 h-3 text-cyan-400 animate-pulse" />
            <span>INTERACTIVE ANIMATION PLAYGROUND</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black tracking-tight mb-4 text-white">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-400">
              Animation &amp; Motion Lab
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
            Không gian thử nghiệm các cơ chế hoạt ảnh tiên tiến được trích xuất và tinh chỉnh từ thiết kế của{" "}
            <a
              href="https://artru.net"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-400 underline underline-offset-4 decoration-cyan-400/50 hover:text-cyan-300 font-semibold inline-flex items-center gap-1"
            >
              artru.net
            </a>
            : con trỏ chuột <span className="font-mono text-xs text-cyan-300">mix-blend-mode: difference</span>, thấu kính khúc xạ{" "}
            <span className="font-mono text-xs text-cyan-300">Liquid Glass</span>, 3D Tilt phản quang và hút từ tính{" "}
            <span className="font-mono text-xs text-cyan-300">Magnetic Physics</span>.
          </p>
        </div>

        {/* ── INTERACTIVE CONTROL DECK / TOOLBAR ── */}
        <div className="mb-14 p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-white/10 shadow-2xl backdrop-blur-2xl">
          <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
            <div className="flex items-center gap-2.5">
              <Sliders className="w-5 h-5 text-cyan-400" />
              <h2 className="text-base sm:text-lg font-bold text-white tracking-wide">
                Bảng điều khiển thông số tương tác (Live Matrix Control)
              </h2>
            </div>
            <span className="text-[11px] font-mono text-slate-400 bg-white/5 px-2.5 py-1 rounded-md border border-white/5">
              REALTIME TUNING
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Cursor Selector */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-mono uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                <MousePointer2 className="w-3.5 h-3.5 text-cyan-400" />
                Kiểu con trỏ (Cursor Mode)
              </label>
              <div className="grid grid-cols-2 gap-1.5">
                {[
                  { id: "artru-diff", name: "Artru Diff" },
                  { id: "magnetic-ring", name: "Cyan Ring" },
                  { id: "cyber-cross", name: "Sci-Fi Cross" },
                  { id: "system", name: "Mặc định" },
                ].map((mode) => (
                  <button
                    key={mode.id}
                    onClick={() => setCursorMode(mode.id as CursorMode)}
                    className={`px-3 py-2 rounded-xl text-xs font-mono font-medium transition-all ${
                      cursorMode === mode.id
                        ? "bg-cyan-500/20 text-cyan-300 border border-cyan-400/60 shadow-[0_0_12px_rgba(34,211,238,0.2)]"
                        : "bg-white/5 text-slate-400 border border-white/5 hover:bg-white/10 hover:text-slate-200"
                    }`}
                  >
                    {mode.name}
                  </button>
                ))}
              </div>
            </div>

            {/* 3D Tilt Intensity Slider */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-mono uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5 text-cyan-400" />
                  Độ nghiêng 3D Tilt
                </label>
                <span className="text-xs font-mono text-cyan-400 font-bold">
                  {tiltIntensity}°
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="30"
                step="1"
                value={tiltIntensity}
                onChange={(e) => setTiltIntensity(Number(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer h-2 bg-slate-800 rounded-lg"
              />
              <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
                <span>0° (Phẳng)</span>
                <span>15° (Chuẩn Artru)</span>
                <span>30° (Cyber Extreme)</span>
              </div>
            </div>

            {/* Liquid Glass Filter Toggle */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-mono uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-cyan-400" />
                Bộ lọc kính lỏng (Liquid Glass)
              </label>
              <button
                onClick={() => setUseLiquidFilter(!useLiquidFilter)}
                className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono font-semibold transition-all ${
                  useLiquidFilter
                    ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-[0_0_15px_rgba(34,211,238,0.4)]"
                    : "bg-white/5 text-slate-400 border border-white/10 hover:bg-white/10 hover:text-slate-200"
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>{useLiquidFilter ? "BẬT KÍNH LỎNG KHÚC XẠ" : "TẮT (CHUẨN SẮC NÉT)"}</span>
              </button>
              <p className="text-[10px] text-slate-400">
                Hiệu ứng tán sắc màu RGB (Chromatic Aberration SVG Filter) của artru.net.
              </p>
            </div>

            {/* Tilt Active Toggle */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-mono uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-cyan-400" />
                Trạng thái 3D Perspective
              </label>
              <button
                onClick={() => setEnableTilt(!enableTilt)}
                className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono font-semibold transition-all ${
                  enableTilt
                    ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 shadow-[0_0_12px_rgba(16,185,129,0.2)]"
                    : "bg-rose-500/20 text-rose-400 border border-rose-500/40"
                }`}
              >
                <RefreshCw className={`w-3.5 h-3.5 ${enableTilt ? "animate-spin" : ""}`} style={{ animationDuration: "8s" }} />
                <span>{enableTilt ? "3D TILT ĐANG HOẠT ĐỘNG" : "ĐÃ TẮT 3D TILT"}</span>
              </button>
              <p className="text-[10px] text-slate-400">
                Thẻ phản hồi góc chuột theo tọa độ thời gian thực.
              </p>
            </div>
          </div>
        </div>

        {/* ── SECTION 1: 3D SPECIMEN SHOWCASE CARDS ── */}
        <section className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_10px_#22d3ee]" />
            <h2 className="text-2xl font-black text-white tracking-tight">
              1. Thử nghiệm thẻ phản quang 3D Perspective &amp; Specular Glare
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <TiltCard
              title="Autonomous Robotics Track"
              subtitle="HARDWARE & EMBEDDED AI"
              tag="CORE SPECIMEN #01"
              desc="Nghiên cứu chế tạo xe tự hành, cánh tay robot 6 bậc tự do và vi điều khiển tích hợp computer vision thời gian thực."
              enableTilt={enableTilt}
              tiltIntensity={tiltIntensity}
              useLiquidFilter={useLiquidFilter}
            />

            <TiltCard
              title="Generative AI & LLM Systems"
              subtitle="MACHINE LEARNING & AGENTS"
              tag="CORE SPECIMEN #02"
              desc="Huấn luyện mô hình xử lý ngôn ngữ tự nhiên, hệ thống Multi-Agent và các giao diện người dùng thế hệ tiếp theo."
              enableTilt={enableTilt}
              tiltIntensity={tiltIntensity}
              useLiquidFilter={useLiquidFilter}
            />

            <TiltCard
              title="Media Production & UI/UX"
              subtitle="CYBER VISUALS & IDENTITY"
              tag="CORE SPECIMEN #03"
              desc="Thiết kế định vị hình ảnh kỹ thuật số, animation đồ họa động chuẩn studio và xây dựng ấn phẩm truyền thông toàn diện."
              enableTilt={enableTilt}
              tiltIntensity={tiltIntensity}
              useLiquidFilter={useLiquidFilter}
            />
          </div>
        </section>

        {/* ── SECTION 2: MAGNETIC INTERACTION BUTTONS ── */}
        <section className="mb-20 p-8 sm:p-12 rounded-3xl bg-slate-900/60 border border-white/10 shadow-xl backdrop-blur-xl">
          <div className="max-w-2xl mb-8">
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-2">
              <Zap className="w-3.5 h-3.5" />
              <span>MAGNETIC ATTRACTION PHYSICS</span>
            </div>
            <h2 className="text-2xl font-black text-white tracking-tight mb-2">
              2. Nút hút từ tính theo lực kéo con trỏ (Magnetic Spring Pull)
            </h2>
            <p className="text-xs text-slate-300 leading-relaxed">
              Rà chuột lại gần các nút bên dưới trong bán kính 90px để cảm nhận lực hút từ tính tự nhiên dựa trên mô hình lò xo vật lý Framer Motion.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 justify-center sm:justify-start">
            <MagneticButton className="px-8 py-4 rounded-full text-sm font-bold text-white bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-600 shadow-[0_4px_25px_rgba(37,99,235,0.4)] hover:brightness-110 cursor-pointer">
              <span className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-white" />
                <span>Nút Từ Tính Chính</span>
              </span>
            </MagneticButton>

            <MagneticButton className="px-7 py-3.5 rounded-full text-xs font-mono font-bold text-cyan-300 bg-cyan-950/80 border border-cyan-400/50 shadow-[0_0_15px_rgba(34,211,238,0.2)] hover:bg-cyan-900/80 cursor-pointer">
              <span>EXPLORE GEN 1.0</span>
            </MagneticButton>

            <MagneticButton className="px-6 py-3 rounded-full text-xs font-bold text-slate-200 bg-white/10 border border-white/20 hover:bg-white/20 cursor-pointer">
              <span>Thành Viên STIC</span>
            </MagneticButton>

            <MagneticButton className="w-12 h-12 rounded-full flex items-center justify-center bg-cyan-500/20 border border-cyan-400 text-cyan-300 shadow-[0_0_12px_#22d3ee] cursor-pointer">
              <Volume2 className="w-5 h-5" />
            </MagneticButton>
          </div>
        </section>

        {/* ── SECTION 3: KINETIC TYPOGRAPHY & TEXT SCRAMBLE ── */}
        <section className="mb-20 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card A: Scramble Matrix */}
          <div className="p-8 rounded-3xl bg-slate-900/80 border border-white/10 shadow-xl backdrop-blur-xl">
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-3">
              <Code2 className="w-3.5 h-3.5" />
              <span>TERMINAL DECODE MATRIX</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">
              Chữ giải mã Cybernetic (Hover Scramble)
            </h3>
            <p className="text-xs text-slate-400 mb-6">
              Rê chuột vào dòng chữ bên dưới để kích hoạt thuật toán đảo ký tự ma trận:
            </p>

            <div className="p-6 rounded-2xl bg-black/60 border border-cyan-500/30 flex flex-col gap-3 font-mono">
              <div className="text-lg sm:text-xl font-bold text-cyan-300">
                <ScrambleHeading text="> STIC_INNOVATION_CLUB" />
              </div>
              <div className="text-sm text-slate-300">
                <ScrambleHeading text="> HIGH_SCHOOL_DA_NANG_GEN_1.0" />
              </div>
              <div className="text-xs text-slate-400">
                <ScrambleHeading text="> SYSTEM_STATUS: READY_FOR_DEPLOYMENT" />
              </div>
            </div>
          </div>

          {/* Card B: Artru Rise Text Animation */}
          <div className="p-8 rounded-3xl bg-slate-900/80 border border-white/10 shadow-xl backdrop-blur-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-3">
                <Wand2 className="w-3.5 h-3.5" />
                <span>ARTRU-RISE BLOOM GLOW</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                Hiệu ứng Typography Drop Shadow Bloom
              </h3>
              <p className="text-xs text-slate-400 mb-6">
                Mô phỏng chính xác style chữ phát sáng đa tầng với drop shadow quang học của artru.net:
              </p>

              <div className="p-6 rounded-2xl bg-black/60 border border-white/10 text-center">
                <span
                  style={{
                    textShadow: "0.075em 0.2em 0px rgba(0,0,0,0.8)",
                    filter: "drop-shadow(0px -0.25em 35px rgba(56,189,248,0.7))",
                  }}
                  className="text-3xl sm:text-4xl font-black text-cyan-100 tracking-wider block"
                >
                  ARTRU GLOW
                </span>
                <span className="text-xs font-mono text-cyan-400 mt-2 block">
                  --artru-text-filter: 0px -0.25em 50px rgba(255,255,255,0.5)
                </span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-slate-400">
              <span>BLUR RADIUS: 35px</span>
              <span className="text-cyan-400">ACTIVE SHADOW</span>
            </div>
          </div>
        </section>

        {/* ── SECTION 4: CSS IMPLEMENTATION CODE SNIPPET ── */}
        <section className="p-8 rounded-3xl bg-slate-900/90 border border-cyan-500/20 shadow-2xl backdrop-blur-2xl">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-2.5">
              <Monitor className="w-5 h-5 text-cyan-400" />
              <h2 className="text-lg font-bold text-white">
                Mã nguồn trích xuất con trỏ `.artru-mouse` từ artru.net
              </h2>
            </div>

            <button
              onClick={copyArtruCss}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-bold text-white bg-cyan-600 hover:bg-cyan-500 transition-colors shadow-md shadow-cyan-500/20"
            >
              {copiedCode ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-300" />
                  <span>ĐÃ COPY CSS!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>COPY CSS ARTRU</span>
                </>
              )}
            </button>
          </div>

          <pre className="p-5 rounded-2xl bg-black/80 border border-white/10 text-xs font-mono text-cyan-300/90 overflow-x-auto leading-relaxed">
{`.artru-mouse {
  opacity: 0;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: #fff;
  position: fixed;
  z-index: 9999999999;
  pointer-events: none;
  mix-blend-mode: difference;
  transform: translate(calc(50vw - 50px), calc(50vh - 50px));
  transition: transform .2s ease-out, width .3s, height .3s, opacity .5s;
  left: 0;
  top: 0;
  box-shadow: 0 0 20px 0 #fff;
  will-change: transform;
}

.artru-mouse.hover {
  width: 0px;
  height: 0px;
}

/* JavaScript Driver Listener */
window.addEventListener("mousemove", (e) => {
  cursor.style.transform = \`translate(\${e.clientX - cursor.offsetWidth/2}px, \${e.clientY - cursor.offsetHeight/2}px)\`;
  cursor.style.opacity = "1";
}, { passive: true });`}
          </pre>
        </section>
      </main>

      <Footer />
    </div>
  );
}
