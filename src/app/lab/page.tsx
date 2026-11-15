"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { motion, useSpring } from "framer-motion";
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
  VolumeX,
  Code2,
  Cpu,
  Monitor,
  Play,
  Users,
  Keyboard
} from "lucide-react";
import { useLang } from "@/context/LangContext";
import { useSwarm } from "@/components/swarm/NativeSwarmProvider";
import { swarmAudio } from "@/lib/swarmAudio";

// ── Types ─────────────────────────────────────────────────────────────
type CursorMode =
  | "difference"
  | "magnetic-ring"
  | "cyber-cross"
  | "swarm-flock"
  | "system";

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
  swarmId?: string;
  swarmDupFrom?: string;
}

function TiltCard({
  title,
  subtitle,
  tag,
  desc,
  enableTilt,
  tiltIntensity,
  useLiquidFilter,
  swarmId,
  swarmDupFrom,
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  const tiltReadoutRef = useRef<HTMLSpanElement>(null);
  const rectRef = useRef<DOMRect | null>(null);

  const handleMouseEnter = () => {
    if (!enableTilt || !cardRef.current) return;
    rectRef.current = cardRef.current.getBoundingClientRect();
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!enableTilt || !cardRef.current) return;
    const rect = rectRef.current || cardRef.current.getBoundingClientRect();
    rectRef.current = rect;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = ((y - centerY) / centerY) * -tiltIntensity;
    const rotY = ((x - centerX) / centerX) * tiltIntensity;

    cardRef.current.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg)`;

    if (glareRef.current) {
      const gx = (x / rect.width) * 100;
      const gy = (y / rect.height) * 100;
      glareRef.current.style.background = `radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,0.25), transparent 60%)`;
      glareRef.current.style.opacity = "1";
    }

    if (tiltReadoutRef.current) {
      tiltReadoutRef.current.textContent = `TILT: (${rotX.toFixed(1)}°, ${rotY.toFixed(1)}°)`;
    }
  };

  const handleMouseLeave = () => {
    rectRef.current = null;
    if (cardRef.current) {
      cardRef.current.style.transform = "rotateX(0deg) rotateY(0deg)";
    }
    if (glareRef.current) {
      glareRef.current.style.opacity = "0";
    }
    if (tiltReadoutRef.current) {
      tiltReadoutRef.current.textContent = "TILT: (0.0°, 0.0°)";
    }
  };

  return (
    <div
      style={{ perspective: 1000 }}
      className="w-full relative group select-none"
    >
      <div
        ref={cardRef}
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        data-swarm-task={swarmDupFrom ? "dup" : "box"}
        data-swarm-id={swarmId}
        data-swarm-dup-from={swarmDupFrom}
        style={{
          transform: "rotateX(0deg) rotateY(0deg)",
          transition: "transform 0.15s ease-out, filter 0.3s ease",
          filter: useLiquidFilter ? "url(#stic-liquid-glass)" : "none",
        }}
        className="relative overflow-hidden rounded-3xl p-6 sm:p-8 bg-slate-900/95 dark:bg-[#0c121e]/95 border border-white/15 dark:border-white/10 shadow-2xl transition-shadow duration-300 hover:shadow-cyan-500/10 hover:border-cyan-400/40"
      >
        {/* Specular Glare Layer */}
        <div
          ref={glareRef}
          style={{ opacity: 0 }}
          className="pointer-events-none absolute inset-0 transition-opacity duration-300 z-10"
        />

        {/* Top Badges */}
        <div data-swarm-task="line" className="flex items-center justify-between gap-2 mb-6">
          <span className="px-3 py-1 rounded-full text-[11px] font-mono font-bold tracking-wider uppercase bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
            {tag}
          </span>
          <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            LIVE SPECIMEN
          </span>
        </div>

        {/* Hologram Visor Visual */}
        <div
          data-swarm-task="media"
          className="relative w-full h-36 rounded-2xl bg-gradient-to-b from-cyan-950/40 to-slate-950/80 border border-cyan-500/20 flex flex-col items-center justify-center p-4 mb-6 overflow-hidden"
        >
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
              <span
                key={i}
                style={
                  {
                    animationDelay: `${i * 80}ms`,
                    "--eq-min": ((h * 0.3) / 100).toFixed(2),
                    "--eq-max": (h / 100).toFixed(2),
                  } as React.CSSProperties
                }
                className="w-1 h-full bg-cyan-400/80 rounded-full lab-eq-bar"
              />
            ))}
          </div>
        </div>

        {/* Content */}
        <h3 data-swarm-task="text" className="text-xl font-black text-white mb-1 tracking-tight">
          {title}
        </h3>
        <p data-swarm-task="text" className="text-xs font-semibold text-cyan-400/90 mb-3">
          {subtitle}
        </p>
        <p data-swarm-task="text" className="text-xs leading-relaxed text-slate-300/80">
          {desc}
        </p>

        {/* Interactive Bottom Bar */}
        <div
          data-swarm-task="line"
          className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-slate-400"
        >
          <span ref={tiltReadoutRef}>TILT: (0.0°, 0.0°)</span>
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
  swarmTask?: "box" | "dup";
  swarmId?: string;
  swarmDupFrom?: string;
}

function MagneticButton({
  children,
  className = "",
  onClick,
  radius = 90,
  swarmTask,
  swarmId,
  swarmDupFrom,
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
      data-swarm-task={swarmTask}
      data-swarm-id={swarmId}
      data-swarm-dup-from={swarmDupFrom}
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

  // State controls (Swarm Flock cursor active immediately on /lab)
  const [cursorMode, setCursorMode] = useState<CursorMode>("swarm-flock");
  const [hideSystemCursor, setHideSystemCursor] = useState(true);
  const [tiltIntensity, setTiltIntensity] = useState(15);
  const [enableTilt, setEnableTilt] = useState(true);
  const [useLiquidFilter, setUseLiquidFilter] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [isHoveringClickable, setIsHoveringClickable] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Global Native Swarm Context (drives Swarm Rebuild + Flock across the entire site)
  const {
    phase: swarmPhase,
    speed: swarmSpeed,
    tourMode: swarmTour,
    soundEnabled: swarmSound,
    setSpeed: setSwarmSpeed,
    setTourMode: setSwarmTour,
    setSoundEnabled: setSwarmSound,
    setFlockEnabled,
    launchRebuild,
  } = useSwarm();

  // Direct ref for zero-latency, 100% physically aligned cursor tracking
  const cursorRef = useRef<HTMLDivElement>(null);
  const scrollBarRef = useRef<HTMLDivElement>(null);
  const hoveringRef = useRef(false);
  const mouseCoords = useRef({ x: -100, y: -100, hasMoved: false });

  const isCustomCursorActive =
    cursorMode !== "system" && cursorMode !== "swarm-flock";
  const shouldHideSystemCursor =
    swarmPhase === "idle" && isCustomCursorActive && hideSystemCursor;

  const handleSelectCursorMode = useCallback(
    (mode: CursorMode) => {
      setCursorMode(mode);
      setFlockEnabled(mode === "swarm-flock");
    },
    [setFlockEnabled]
  );

  const handleLaunchSwarm = useCallback(() => {
    launchRebuild({ scrollTop: true });
  }, [launchRebuild]);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Global cursor-none override on body to ensure default cursor is completely hidden
  useEffect(() => {
    if (shouldHideSystemCursor) {
      document.body.classList.add("custom-cursor-active");
      document.documentElement.classList.add("custom-cursor-active");
      return () => {
        document.body.classList.remove("custom-cursor-active");
        document.documentElement.classList.remove("custom-cursor-active");
      };
    }
  }, [shouldHideSystemCursor]);

  useEffect(() => {
    let scrollRafId: number | null = null;
    let scrollTicking = false;

    const syncScrollBar = () => {
      scrollTicking = false;
      if (!scrollBarRef.current) return;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const progress = total > 0 ? Math.min(1, Math.max(0, window.scrollY / total)) : 0;
      scrollBarRef.current.style.transform = `scaleX(${progress})`;
    };

    const handleScroll = () => {
      if (!scrollTicking) {
        scrollTicking = true;
        scrollRafId = requestAnimationFrame(syncScrollBar);
      }
    };

    syncScrollBar();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollRafId !== null) cancelAnimationFrame(scrollRafId);
    };
  }, []);

  useEffect(() => {
    if (!isCustomCursorActive || swarmPhase !== "idle") {
      hoveringRef.current = false;
      setIsHoveringClickable(false);
      return;
    }

    const updateCursorPosition = (clientX: number, clientY: number) => {
      mouseCoords.current = { x: clientX, y: clientY, hasMoved: true };
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${clientX}px, ${clientY}px, 0)`;
        cursorRef.current.style.opacity = "1";
      }
    };

    const handleMove = (e: MouseEvent) => {
      updateCursorPosition(e.clientX, e.clientY);
      const target = e.target as Element | null;
      const isInteractive = Boolean(
        target?.closest(
          "a, button, input, textarea, select, [data-interactive], .clickable, code"
        )
      );
      if (isInteractive !== hoveringRef.current) {
        hoveringRef.current = isInteractive;
        setIsHoveringClickable(isInteractive);
      }
    };

    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMove);
    };
  }, [isCustomCursorActive, swarmPhase]);

  const copyCustomCss = () => {
    const css = `.stic-cursor {
  opacity: 1;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: #fff;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999999999;
  pointer-events: none;
  mix-blend-mode: difference;
  box-shadow: 0 0 20px 0 #fff;
  will-change: transform;
}

.stic-cursor.hover {
  width: 36px;
  height: 36px;
}

/* Zero-lag instant position tracking */
window.addEventListener("mousemove", (e) => {
  cursor.style.transform = \`translate3d(\${e.clientX}px, \${e.clientY}px, 0)\`;
}, { passive: true });`;
    navigator.clipboard.writeText(css);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div
      className={`swarm-canvas-bg min-h-screen bg-[#070b12] text-slate-100 selection:bg-blue-500/30 selection:text-blue-200 font-sans relative overflow-x-hidden ${
        shouldHideSystemCursor ? "cursor-none" : ""
      }`}
    >
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

      {/* ── READING PROGRESS TOP BAR ── */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-transparent z-50 pointer-events-none">
        <div
          ref={scrollBarRef}
          style={{ transform: "scaleX(0)", transformOrigin: "left center" }}
          className="w-full h-full bg-gradient-to-r from-blue-500 via-cyan-400 to-indigo-500 shadow-[0_0_12px_#38bdf8] will-change-transform"
        />
      </div>

      {/* ── ZERO-LAG PHYSICALLY ALIGNED CURSOR FOLLOWER (PORTALED TO BODY) ── */}
      {mounted && swarmPhase === "idle" && isCustomCursorActive && typeof document !== "undefined" && createPortal(
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
                    ? "w-10 h-10 opacity-75 scale-110"
                    : "w-4 h-4 opacity-100"
                }`}
              />
              {/* Center physical pinpoint for 100% targeting clarity */}
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

      {/* ── BACKGROUND AMBIENCE ── */}
      <div
        data-swarm-ignore="true"
        className={`fixed inset-0 pointer-events-none z-0 transition-opacity duration-300 ${
          swarmPhase === "building" ? "opacity-25" : "opacity-100"
        }`}
      >
        <div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[760px] h-[760px] rounded-full opacity-75"
          style={{
            background:
              "radial-gradient(circle, rgba(6,182,212,0.12) 0%, rgba(37,99,235,0.09) 42%, rgba(79,70,229,0) 72%)",
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-40" />
      </div>

      <div
        data-swarm-root
        className="relative z-10 pt-28 pb-24 px-4 sm:px-6 max-w-7xl mx-auto"
      >
        {/* Top Breadcrumb & Return to Main */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <Link
            href="/"
            data-swarm-task="box"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold text-slate-300 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-blue-400/40 transition-all group"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
            <span>{lang === "vi" ? "Về trang chủ STIC" : "Back to STIC Home"}</span>
          </Link>

          <div
            data-swarm-task="box"
            className="flex items-center gap-2 text-xs font-mono text-cyan-400 bg-cyan-950/60 border border-cyan-500/30 px-3.5 py-1.5 rounded-full shadow-inner"
          >
            <Sparkles className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: "6s" }} />
            <span>LAB ENGINE // STIC MOTION MATRIX</span>
          </div>
        </div>

        {/* Hero Title Section */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div
            data-swarm-task="box"
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono text-cyan-300 bg-cyan-950/40 border border-cyan-500/30 mb-4"
          >
            <Activity className="w-3 h-3 text-cyan-400 animate-pulse" />
            <span>INTERACTIVE ANIMATION PLAYGROUND</span>
          </div>

          <h1
            data-swarm-task="text"
            data-swarm-guide="true"
            className="text-4xl sm:text-6xl font-black tracking-tight mb-4 text-white"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-400">
              Animation &amp; Motion Lab
            </span>
          </h1>

          <p
            data-swarm-task="text"
            className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal"
          >
            Không gian thử nghiệm các cơ chế hoạt ảnh chuyển động hiện đại dành cho STIC: tái dựng DOM theo phong cách{" "}
            <span className="font-mono text-xs text-cyan-300">Swarm Rebuild</span>, con trỏ quang học{" "}
            <span className="font-mono text-xs text-cyan-300">mix-blend-mode: difference</span>, thấu kính{" "}
            <span className="font-mono text-xs text-cyan-300">Liquid Glass</span> và lực kéo từ tính{" "}
            <span className="font-mono text-xs text-cyan-300">Magnetic Physics</span>.
          </p>
        </div>

        {/* ── SWARM REBUILD STUDIO DECK (INSPIRED BY SWARM REBUILD EXTENSION) ── */}
        <div
          data-swarm-task="box"
          data-swarm-id="swarm-studio"
          data-swarm-guide="true"
          className="mb-10 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900/95 via-[#0a1324]/95 to-cyan-950/60 border border-cyan-500/30 shadow-[0_0_50px_rgba(34,211,238,0.12)]"
        >
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="max-w-2xl">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-bold bg-cyan-500/15 text-cyan-300 border border-cyan-400/40">
                  <Users className="w-3.5 h-3.5 text-cyan-400" />
                  SWARM REBUILD ENGINE
                </span>
                <span className="px-2.5 py-1 rounded-full text-[11px] font-mono text-slate-300 bg-white/5 border border-white/10">
                  Multiplayer DOM Choreography
                </span>
              </div>

              <h2
                data-swarm-task="text"
                className="text-xl sm:text-2xl font-black text-white tracking-tight mb-2"
              >
                {lang === "vi"
                  ? "Xem đội ngũ AI Figma tái dựng trực tiếp trang /lab"
                  : "Watch a Multiplayer Figma Swarm Rebuild This Page Live"}
              </h2>

              <p
                data-swarm-task="text"
                className="text-xs sm:text-sm text-slate-300 leading-relaxed"
              >
                {lang === "vi"
                  ? "Xóa trang về lưới blueprint kỹ thuật và triệu hồi 10 con trỏ đồng đội (6 chính + 4 chaser khi cuộn) phối hợp vẽ khung W×H, gõ từng ký tự, nhân bản Option-Drag đo pixel, căn thước ruler và quét media cùng hiệu ứng âm thanh Web Audio."
                  : "Wipes the page to an engineering blueprint grid and spawns 10 multiplayer cursors with flocking physics: crosshair box dragging (W×H), caret typing, Option-drag duplication, ruler guides, scanline sweeps, Tour auto-follow, and Web Audio SFX."}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col items-stretch sm:items-center lg:items-end gap-3 shrink-0">
              <button
                onClick={handleLaunchSwarm}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl text-sm font-bold text-white bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-600 hover:brightness-110 active:scale-[0.98] transition-all shadow-[0_0_25px_rgba(34,211,238,0.35)]"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>
                  {swarmPhase === "idle"
                    ? lang === "vi"
                      ? "Khởi chạy Swarm Rebuild"
                      : "Launch Swarm Rebuild"
                    : lang === "vi"
                    ? "Chạy lại Swarm Rebuild"
                    : "Replay Swarm Rebuild"}
                </span>
              </button>

              <div className="flex flex-wrap items-center justify-center gap-2">
                {/* Speed selector */}
                <div className="inline-flex items-center rounded-xl bg-black/40 border border-white/10 p-1">
                  {([1, 2, 3] as const).map((s) => (
                    <button
                      key={s}
                      onClick={() => setSwarmSpeed(s)}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-mono font-bold transition-colors ${
                        swarmSpeed === s
                          ? "bg-cyan-500/25 text-cyan-300 border border-cyan-400/40"
                          : "text-slate-400 hover:text-white"
                      }`}
                    >
                      {s}x
                    </button>
                  ))}
                </div>

                {/* Tour Mode toggle */}
                <button
                  onClick={() => setSwarmTour(!swarmTour)}
                  className={`px-3 py-1.5 rounded-xl text-[11px] font-mono font-bold border transition-all ${
                    swarmTour
                      ? "bg-emerald-500/20 text-emerald-300 border-emerald-400/50"
                      : "bg-black/40 text-slate-400 border-white/10 hover:text-white"
                  }`}
                >
                  Tour {swarmTour ? "ON" : "OFF"}
                </button>

                {/* Web Audio Sound toggle */}
                <button
                  onClick={() => {
                    const next = !swarmSound;
                    if (next) swarmAudio.unlock();
                    setSwarmSound(next);
                  }}
                  title="Toggle Web Audio SFX (M)"
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] font-mono font-bold border transition-all ${
                    swarmSound
                      ? "bg-cyan-500/15 text-cyan-300 border-cyan-400/40"
                      : "bg-black/40 text-slate-400 border-white/10 hover:text-white"
                  }`}
                >
                  {swarmSound ? (
                    <Volume2 className="w-3.5 h-3.5" />
                  ) : (
                    <VolumeX className="w-3.5 h-3.5" />
                  )}
                  <span>SFX</span>
                </button>
              </div>
            </div>
          </div>

          {/* Choreography legend & Keyboard shortcuts */}
          <div className="mt-5 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-[11px] font-mono text-slate-400">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-white/5 text-cyan-300 border border-white/10">
                + Box Drag W×H
              </span>
              <span className="px-2 py-0.5 rounded bg-white/5 text-emerald-300 border border-white/10">
                I Caret Typing
              </span>
              <span className="px-2 py-0.5 rounded bg-white/5 text-amber-300 border border-white/10">
                ⌥ Duplicate + px Gap
              </span>
              <span className="px-2 py-0.5 rounded bg-white/5 text-fuchsia-300 border border-white/10">
                ⌗ Ruler Guides
              </span>
              <span className="px-2 py-0.5 rounded bg-white/5 text-sky-300 border border-white/10">
                ▮ Scanline Sweep
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-1.5 text-slate-400">
              <Keyboard className="w-3.5 h-3.5 text-cyan-400" />
              <span>Alt+Shift+S</span>
              <span>·</span>
              <span>1/2/3 Speed</span>
              <span>·</span>
              <span>T Tour</span>
              <span>·</span>
              <span>M Sound</span>
              <span>·</span>
              <span>R Replay</span>
              <span>·</span>
              <span>L Live</span>
              <span>·</span>
              <span>H HUD</span>
              <span>·</span>
              <span>Esc Exit</span>
            </div>
          </div>
        </div>

        {/* ── INTERACTIVE CONTROL DECK / TOOLBAR ── */}
        <div
          data-swarm-task="box"
          data-swarm-id="control-deck"
          data-swarm-guide="true"
          className="mb-14 p-6 sm:p-8 rounded-3xl bg-slate-900/95 border border-white/10 shadow-2xl"
        >
          <div className="flex flex-wrap items-center justify-between border-b border-white/10 pb-4 mb-6 gap-3">
            <div className="flex items-center gap-2.5">
              <Sliders className="w-5 h-5 text-cyan-400" />
              <h2
                data-swarm-task="text"
                className="text-base sm:text-lg font-bold text-white tracking-wide"
              >
                Bảng điều khiển thông số tương tác (Live Matrix Control)
              </h2>
            </div>

            {/* Toggle Hide/Show System Cursor */}
            {isCustomCursorActive && (
              <button
                onClick={() => setHideSystemCursor(!hideSystemCursor)}
                className="text-xs font-mono px-3 py-1.5 rounded-full border border-cyan-400/40 bg-cyan-950/50 text-cyan-300 hover:bg-cyan-900/50 transition-colors flex items-center gap-1.5"
              >
                <MousePointer2 className="w-3 h-3" />
                <span>
                  {hideSystemCursor
                    ? "Đang ẩn con trỏ gốc (Khớp chuẩn 100%)"
                    : "Đang hiện song song cả 2 con trỏ"}
                </span>
              </button>
            )}

            {cursorMode === "swarm-flock" && (
              <span className="text-xs font-mono px-3 py-1.5 rounded-full border border-emerald-400/40 bg-emerald-950/50 text-emerald-300 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5" />
                <span>5 con trỏ đồng đội đang bay theo chuột</span>
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Cursor Selector */}
            <div
              data-swarm-task="box"
              data-swarm-id="ctrl-1"
              className="flex flex-col gap-2"
            >
              <label className="text-xs font-mono uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                <MousePointer2 className="w-3.5 h-3.5 text-cyan-400" />
                Kiểu con trỏ (Cursor Mode)
              </label>
              <div className="grid grid-cols-2 gap-1.5">
                {[
                  { id: "difference", name: "Đảo màu Diff" },
                  { id: "magnetic-ring", name: "Cyan Ring" },
                  { id: "cyber-cross", name: "Sci-Fi Cross" },
                  { id: "system", name: "Mặc định" },
                  { id: "swarm-flock", name: "Swarm Flock (5)", spanTwo: true },
                ].map((mode) => (
                  <button
                    key={mode.id}
                    onClick={() => handleSelectCursorMode(mode.id as CursorMode)}
                    className={`px-3 py-2 rounded-xl text-xs font-mono font-medium transition-all ${
                      mode.spanTwo ? "col-span-2" : ""
                    } ${
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
            <div
              data-swarm-task="dup"
              data-swarm-dup-from="ctrl-1"
              className="flex flex-col gap-2"
            >
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
                <span>15° (Tiêu chuẩn)</span>
                <span>30° (Cyber Extreme)</span>
              </div>
            </div>

            {/* Liquid Glass Filter Toggle */}
            <div
              data-swarm-task="dup"
              data-swarm-dup-from="ctrl-1"
              className="flex flex-col gap-2"
            >
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
                Hiệu ứng tán sắc màu RGB (Chromatic Aberration SVG Filter).
              </p>
            </div>

            {/* Tilt Active Toggle */}
            <div
              data-swarm-task="dup"
              data-swarm-dup-from="ctrl-1"
              className="flex flex-col gap-2"
            >
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
            <h2
              data-swarm-task="text"
              data-swarm-guide="true"
              className="text-2xl font-black text-white tracking-tight"
            >
              1. Thử nghiệm thẻ phản quang 3D Perspective &amp; Specular Glare
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <TiltCard
              swarmId="tilt-card-1"
              title="Autonomous Robotics Track"
              subtitle="HARDWARE & EMBEDDED AI"
              tag="CORE SPECIMEN #01"
              desc="Nghiên cứu chế tạo xe tự hành, cánh tay robot 6 bậc tự do và vi điều khiển tích hợp computer vision thời gian thực."
              enableTilt={enableTilt}
              tiltIntensity={tiltIntensity}
              useLiquidFilter={useLiquidFilter}
            />

            <TiltCard
              swarmDupFrom="tilt-card-1"
              title="Generative AI & LLM Systems"
              subtitle="MACHINE LEARNING & AGENTS"
              tag="CORE SPECIMEN #02"
              desc="Huấn luyện mô hình xử lý ngôn ngữ tự nhiên, hệ thống Multi-Agent và các giao diện người dùng thế hệ tiếp theo."
              enableTilt={enableTilt}
              tiltIntensity={tiltIntensity}
              useLiquidFilter={useLiquidFilter}
            />

            <TiltCard
              swarmDupFrom="tilt-card-1"
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
        <section
          data-swarm-task="box"
          data-swarm-id="magnetic-sec"
          data-swarm-guide="true"
          className="mb-20 p-8 sm:p-12 rounded-3xl bg-slate-900/95 border border-white/10 shadow-xl"
        >
          <div className="max-w-2xl mb-8">
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-2">
              <Zap className="w-3.5 h-3.5" />
              <span>MAGNETIC ATTRACTION PHYSICS</span>
            </div>
            <h2
              data-swarm-task="text"
              className="text-2xl font-black text-white tracking-tight mb-2"
            >
              2. Nút hút từ tính theo lực kéo con trỏ (Magnetic Spring Pull)
            </h2>
            <p
              data-swarm-task="text"
              className="text-xs text-slate-300 leading-relaxed"
            >
              Rà chuột lại gần các nút bên dưới trong bán kính 90px để cảm nhận lực hút từ tính tự nhiên dựa trên mô hình lò xo vật lý Framer Motion.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 justify-center sm:justify-start">
            <MagneticButton
              swarmTask="box"
              swarmId="mag-btn-1"
              className="px-8 py-4 rounded-full text-sm font-bold text-white bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-600 shadow-[0_4px_25px_rgba(37,99,235,0.4)] hover:brightness-110 cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-white" />
                <span>Nút Từ Tính Chính</span>
              </span>
            </MagneticButton>

            <MagneticButton
              swarmTask="dup"
              swarmDupFrom="mag-btn-1"
              className="px-7 py-3.5 rounded-full text-xs font-mono font-bold text-cyan-300 bg-cyan-950/80 border border-cyan-400/50 shadow-[0_0_15px_rgba(34,211,238,0.2)] hover:bg-cyan-900/80 cursor-pointer"
            >
              <span>EXPLORE GEN 1.0</span>
            </MagneticButton>

            <MagneticButton
              swarmTask="dup"
              swarmDupFrom="mag-btn-1"
              className="px-6 py-3 rounded-full text-xs font-bold text-slate-200 bg-white/10 border border-white/20 hover:bg-white/20 cursor-pointer"
            >
              <span>Thành Viên STIC</span>
            </MagneticButton>

            <MagneticButton
              swarmTask="dup"
              swarmDupFrom="mag-btn-1"
              className="w-12 h-12 rounded-full flex items-center justify-center bg-cyan-500/20 border border-cyan-400 text-cyan-300 shadow-[0_0_12px_#22d3ee] cursor-pointer"
            >
              <Volume2 className="w-5 h-5" />
            </MagneticButton>
          </div>
        </section>

        {/* ── SECTION 3: KINETIC TYPOGRAPHY & TEXT SCRAMBLE ── */}
        <section className="mb-20 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card A: Scramble Matrix */}
          <div
            data-swarm-task="box"
            data-swarm-id="typo-card-a"
            data-swarm-guide="true"
            className="p-8 rounded-3xl bg-slate-900/95 border border-white/10 shadow-xl"
          >
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-3">
              <Code2 className="w-3.5 h-3.5" />
              <span>TERMINAL DECODE MATRIX</span>
            </div>
            <h3 data-swarm-task="text" className="text-xl font-bold text-white mb-2">
              Chữ giải mã Cybernetic (Hover Scramble)
            </h3>
            <p data-swarm-task="text" className="text-xs text-slate-400 mb-6">
              Rê chuột vào dòng chữ bên dưới để kích hoạt thuật toán đảo ký tự ma trận:
            </p>

            <div
              data-swarm-task="media"
              className="p-6 rounded-2xl bg-black/60 border border-cyan-500/30 flex flex-col gap-3 font-mono"
            >
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

          {/* Card B: Bloom Glow Text Animation */}
          <div
            data-swarm-task="dup"
            data-swarm-dup-from="typo-card-a"
            className="p-8 rounded-3xl bg-slate-900/95 border border-white/10 shadow-xl flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-3">
                <Wand2 className="w-3.5 h-3.5" />
                <span>CHROMA BLOOM GLOW</span>
              </div>
              <h3 data-swarm-task="text" className="text-xl font-bold text-white mb-2">
                Hiệu ứng Typography Drop Shadow Bloom
              </h3>
              <p data-swarm-task="text" className="text-xs text-slate-400 mb-6">
                Chữ phát sáng đa tầng kết hợp độ sâu bóng đổ quang học:
              </p>

              <div
                data-swarm-task="media"
                className="p-6 rounded-2xl bg-black/60 border border-white/10 text-center"
              >
                <span
                  style={{
                    textShadow: "0.075em 0.2em 0px rgba(0,0,0,0.8)",
                    filter: "drop-shadow(0px -0.25em 35px rgba(56,189,248,0.7))",
                  }}
                  className="text-3xl sm:text-4xl font-black text-cyan-100 tracking-wider block"
                >
                  STIC GLOW
                </span>
                <span className="text-xs font-mono text-cyan-400 mt-2 block">
                  filter: drop-shadow(0px -0.25em 35px rgba(56,189,248,0.7))
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
        <section
          data-swarm-task="box"
          data-swarm-id="code-sec"
          data-swarm-guide="true"
          className="p-8 rounded-3xl bg-slate-900/95 border border-cyan-500/20 shadow-2xl"
        >
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-2.5">
              <Monitor className="w-5 h-5 text-cyan-400" />
              <h2 data-swarm-task="text" className="text-lg font-bold text-white">
                Mã nguồn con trỏ chuẩn `.stic-cursor` (Zero-latency)
              </h2>
            </div>

            <button
              onClick={copyCustomCss}
              data-swarm-task="box"
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
                  <span>COPY CSS CON TRỎ</span>
                </>
              )}
            </button>
          </div>

          <pre
            data-swarm-task="text"
            className="p-5 rounded-2xl bg-black/80 border border-white/10 text-xs font-mono text-cyan-300/90 overflow-x-auto leading-relaxed"
          >
{`.stic-cursor {
  opacity: 1;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: #fff;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999999999;
  pointer-events: none;
  mix-blend-mode: difference;
  box-shadow: 0 0 20px 0 #fff;
  will-change: transform;
}

.stic-cursor.hover {
  width: 36px;
  height: 36px;
}

/* Zero-lag physical instant mouse tracker */
window.addEventListener("mousemove", (e) => {
  cursor.style.transform = \`translate3d(\${e.clientX}px, \${e.clientY}px, 0)\`;
}, { passive: true });`}
          </pre>
        </section>
      </div>
    </div>
  );
}
