"use client";

import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import {
  Sparkles,
  MousePointer2,
  Compass,
  ArrowRight,
  ExternalLink,
  RotateCcw,
  Sliders,
  Check,
  Eye,
  Activity,
  Layers,
  ChevronUp,
  X
} from "lucide-react";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { StatsSection } from "@/components/sections/StatsSection";
import { TeamsSection } from "@/components/sections/TeamsSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { EventsSection } from "@/components/sections/EventsSection";
import { useLang } from "@/context/LangContext";

type CursorMode = "difference" | "magnetic-ring" | "cyber-cross" | "system";

export default function ClonePage() {
  const { lang } = useLang();

  // Motion matrix controls
  const [cursorMode, setCursorMode] = useState<CursorMode>("difference");
  const [hideSystemCursor, setHideSystemCursor] = useState(true);
  const [enable3DTilt, setEnable3DTilt] = useState(true);
  const [enableLiquidGlass, setEnableLiquidGlass] = useState(true);
  const [isHoveringClickable, setIsHoveringClickable] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isHudOpen, setIsHudOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const cursorRef = useRef<HTMLDivElement>(null);
  const mouseCoords = useRef({ x: -100, y: -100, hasMoved: false });

  const isCustomCursorActive = cursorMode !== "system";

  useEffect(() => {
    setMounted(true);
  }, []);

  // Global override for hiding default cursor when custom cursor is active
  useEffect(() => {
    if (isCustomCursorActive && hideSystemCursor) {
      document.body.classList.add("custom-cursor-active");
      document.documentElement.classList.add("custom-cursor-active");
      return () => {
        document.body.classList.remove("custom-cursor-active");
        document.documentElement.classList.remove("custom-cursor-active");
      };
    }
  }, [isCustomCursorActive, hideSystemCursor]);

  // Zero-lag tracking + scroll stability
  useEffect(() => {
    const updateCursorPosition = (clientX: number, clientY: number) => {
      mouseCoords.current = { x: clientX, y: clientY, hasMoved: true };
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${clientX}px, ${clientY}px, 0)`;
        cursorRef.current.style.opacity = "1";
      }
    };

    const checkHover = (x: number, y: number) => {
      if (x < 0 || y < 0) return;
      const el = document.elementFromPoint(x, y);
      if (
        el?.closest(
          "a, button, input, textarea, select, [data-interactive], .clickable, code, [role='button'], .cursor-pointer"
        )
      ) {
        setIsHoveringClickable(true);
      } else {
        setIsHoveringClickable(false);
      }
    };

    const handleMove = (e: MouseEvent) => {
      updateCursorPosition(e.clientX, e.clientY);
      checkHover(e.clientX, e.clientY);
    };

    const handleScrollOrWheel = () => {
      const total =
        document.documentElement.scrollHeight - window.innerHeight;
      if (total > 0) {
        setScrollProgress((window.scrollY / total) * 100);
      }

      // Re-pin cursor to current viewport coordinates on scroll
      if (mouseCoords.current.hasMoved && cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${mouseCoords.current.x}px, ${mouseCoords.current.y}px, 0)`;
        checkHover(mouseCoords.current.x, mouseCoords.current.y);
      }
    };

    window.addEventListener("mousemove", handleMove, { passive: true });
    window.addEventListener("scroll", handleScrollOrWheel, { passive: true });
    window.addEventListener("wheel", handleScrollOrWheel, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("scroll", handleScrollOrWheel);
      window.removeEventListener("wheel", handleScrollOrWheel);
    };
  }, []);

  // Subtle 3D card tilt & glare on hover for all cards across the main page
  useEffect(() => {
    if (!enable3DTilt) return;

    const cards = document.querySelectorAll<HTMLElement>(
      "#teams .group, #projects .group, #about .rounded-2xl, #about .rounded-3xl, .liquid-glass-card"
    );

    const onCardMove = (e: MouseEvent) => {
      const card = e.currentTarget as HTMLElement;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotX = ((y - centerY) / centerY) * -6;
      const rotY = ((x - centerX) / centerX) * 6;

      card.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-3px)`;
      card.style.transition = "transform 0.1s ease-out";
      card.style.setProperty("--mouse-x", `${(x / rect.width) * 100}%`);
      card.style.setProperty("--mouse-y", `${(y / rect.height) * 100}%`);
    };

    const onCardLeave = (e: MouseEvent) => {
      const card = e.currentTarget as HTMLElement;
      card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)";
      card.style.transition = "transform 0.3s ease";
    };

    cards.forEach((card) => {
      card.addEventListener("mousemove", onCardMove as EventListener);
      card.addEventListener("mouseleave", onCardLeave as EventListener);
    });

    return () => {
      cards.forEach((card) => {
        card.removeEventListener("mousemove", onCardMove as EventListener);
        card.removeEventListener("mouseleave", onCardLeave as EventListener);
        card.style.transform = "";
      });
    };
  }, [enable3DTilt]);

  return (
    <div className="flex flex-col min-h-screen relative">
      {/* ── CHROMATIC DISPERSION LIQUID GLASS SVG FILTER ── */}
      <svg
        className="hidden pointer-events-none absolute"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <filter
            id="stic-liquid-glass"
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

      {/* ── TOP READING SCROLL PROGRESS BAR ── */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-transparent z-50 pointer-events-none">
        <div
          style={{ width: `${scrollProgress}%` }}
          className="h-full bg-gradient-to-r from-blue-600 via-cyan-400 to-indigo-500 shadow-[0_0_12px_#38bdf8] transition-all duration-75"
        />
      </div>

      {/* ── ZERO-LAG PHYSICALLY ALIGNED CURSOR (PORTALED DIRECTLY TO BODY) ── */}
      {mounted && isCustomCursorActive && typeof document !== "undefined" && createPortal(
        <div
          ref={cursorRef}
          style={{ willChange: "transform", opacity: 0 }}
          className="fixed top-0 left-0 pointer-events-none z-[999999]"
        >
          {cursorMode === "difference" && (
            <div className="relative -translate-x-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none">
              <div
                style={{
                  mixBlendMode: "difference",
                  boxShadow: "0 0 20px 2px #fff",
                }}
                className={`rounded-full bg-white transition-all duration-200 ease-out ${
                  isHoveringClickable
                    ? "w-11 h-11 opacity-80 scale-110"
                    : "w-4 h-4 opacity-100"
                }`}
              />
              <div
                style={{ mixBlendMode: "difference" }}
                className="absolute w-1 h-1 bg-black rounded-full"
              />
            </div>
          )}

          {cursorMode === "magnetic-ring" && (
            <div className="relative -translate-x-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none">
              <div
                className={`rounded-full border-2 border-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.6)] transition-all duration-200 ${
                  isHoveringClickable
                    ? "w-12 h-12 bg-cyan-400/20 scale-110"
                    : "w-6 h-6 bg-transparent"
                }`}
              />
              <div className="absolute w-1.5 h-1.5 rounded-full bg-cyan-300 shadow-[0_0_6px_#22d3ee]" />
            </div>
          )}

          {cursorMode === "cyber-cross" && (
            <div className="-translate-x-1/2 -translate-y-1/2 w-8 h-8 pointer-events-none flex items-center justify-center">
              <div className="w-full h-[1px] bg-cyan-400/80 shadow-[0_0_6px_#22d3ee]" />
              <div className="h-full w-[1px] bg-cyan-400/80 shadow-[0_0_6px_#22d3ee] absolute" />
              <div className="w-3 h-3 border border-cyan-300 rounded-sm absolute" />
              <div className="w-1 h-1 bg-white rounded-full absolute" />
            </div>
          )}
        </div>,
        document.body
      )}

      {/* ── TOP NOTIFICATION PILL: INDICATING CLONE PREVIEW MODE ── */}
      <div className="fixed top-20 left-1/2 -translate-x-1/2 z-30 pointer-events-none px-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] font-mono font-bold bg-slate-900/90 text-cyan-300 border border-cyan-500/30 shadow-lg backdrop-blur-md">
          <Sparkles className="w-3 h-3 text-cyan-400 animate-spin" style={{ animationDuration: "5s" }} />
          <span>CLONE PREVIEW · FULL MOTION ENGINE ACTIVE</span>
        </div>
      </div>

      {/* ── HOMEPAGE SECTIONS (CLONED CONTENT) ── */}
      {/* 1. Trang chủ (Hero) */}
      <HeroSection />

      {/* 2. Về CLB STIC */}
      <AboutSection />

      {/* 3. Điểm nhấn thực tế */}
      <StatsSection />

      {/* 4. 7 Mảng hoạt động */}
      <TeamsSection />

      {/* 5. Dự án GEN 1.0 (Giai đoạn ươm mầm) */}
      <ProjectsSection />

      {/* 6. Sự kiện tuyển quân & Đăng ký Google Form */}
      <EventsSection />

      {/* ── FLOATING MOTION HUD CONTROLLER (BOTTOM-RIGHT) ── */}
      <div className="fixed bottom-6 right-6 z-40 select-none">
        {isHudOpen ? (
          <div className="w-80 rounded-2xl p-5 bg-slate-950/95 dark:bg-[#0c121e]/95 border border-cyan-500/40 shadow-2xl backdrop-blur-2xl text-slate-100 flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-cyan-400" />
                <span className="text-xs font-mono font-bold tracking-wide text-white">
                  MOTION MATRIX // CLONE
                </span>
              </div>
              <button
                onClick={() => setIsHudOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-md transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Cursor Mode Selector */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1">
                <MousePointer2 className="w-3 h-3 text-cyan-400" />
                Con trỏ (Cursor)
              </label>
              <div className="grid grid-cols-2 gap-1.5">
                {[
                  { id: "difference", name: "Đảo màu Diff" },
                  { id: "magnetic-ring", name: "Cyan Ring" },
                  { id: "cyber-cross", name: "Sci-Fi Cross" },
                  { id: "system", name: "Mặc định" },
                ].map((mode) => (
                  <button
                    key={mode.id}
                    onClick={() => setCursorMode(mode.id as CursorMode)}
                    className={`px-2.5 py-1.5 rounded-lg text-[11px] font-mono transition-all ${
                      cursorMode === mode.id
                        ? "bg-cyan-500/20 text-cyan-300 border border-cyan-400/60 font-bold"
                        : "bg-white/5 text-slate-400 hover:bg-white/10 hover:text-slate-200"
                    }`}
                  >
                    {mode.name}
                  </button>
                ))}
              </div>
            </div>

            {/* 3D Tilt Card Toggle */}
            <div className="flex items-center justify-between pt-1 border-t border-white/10">
              <span className="text-xs font-mono text-slate-300 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-cyan-400" />
                3D Tilt góc thẻ
              </span>
              <button
                onClick={() => setEnable3DTilt(!enable3DTilt)}
                className={`px-3 py-1 rounded-full text-[11px] font-mono font-bold transition-all ${
                  enable3DTilt
                    ? "bg-cyan-500/20 text-cyan-300 border border-cyan-400/40"
                    : "bg-white/5 text-slate-400"
                }`}
              >
                {enable3DTilt ? "BẬT" : "TẮT"}
              </button>
            </div>

            {/* Navigation links */}
            <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono">
              <Link
                href="/"
                className="text-slate-400 hover:text-white transition-colors flex items-center gap-1"
              >
                <span>← Về bản gốc</span>
              </Link>
              <Link
                href="/lab"
                className="text-cyan-400 hover:underline flex items-center gap-1 font-bold"
              >
                <span>Animation Lab 🧪</span>
              </Link>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setIsHudOpen(true)}
            className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-slate-950/90 hover:bg-slate-900 border border-cyan-500/50 text-cyan-300 shadow-xl shadow-cyan-500/10 backdrop-blur-xl transition-all hover:scale-105 cursor-pointer"
          >
            <Activity className="w-4 h-4 text-cyan-400 animate-pulse" />
            <span className="text-xs font-mono font-bold tracking-tight">
              MOTION CLONE // BẬT CÔNG CỤ
            </span>
            <ChevronUp className="w-3.5 h-3.5 text-cyan-400" />
          </button>
        )}
      </div>
    </div>
  );
}
