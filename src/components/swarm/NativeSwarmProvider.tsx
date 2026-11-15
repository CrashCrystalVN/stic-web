"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";
import { Users, Sparkles, ChevronRight, MousePointer2 } from "lucide-react";
import { useLang } from "@/context/LangContext";
import {
  SwarmRebuildEngine,
  SwarmFlockCursors,
  type SwarmPhase,
  type SwarmSpeed,
} from "@/components/lab/SwarmRebuildEngine";
import { swarmAudio } from "@/lib/swarmAudio";

interface NativeSwarmContextValue {
  phase: SwarmPhase;
  speed: SwarmSpeed;
  tourMode: boolean;
  soundEnabled: boolean;
  flockEnabled: boolean;
  progressPct: number;
  activeAgents: number;
  setPhase: (phase: SwarmPhase) => void;
  setSpeed: (speed: SwarmSpeed) => void;
  setTourMode: (tour: boolean) => void;
  setSoundEnabled: (sound: boolean) => void;
  setFlockEnabled: (flock: boolean) => void;
  launchRebuild: (options?: { scrollTop?: boolean }) => void;
  replayRebuild: () => void;
}

const NativeSwarmContext = createContext<NativeSwarmContextValue | null>(null);

export function useSwarm(): NativeSwarmContextValue {
  const ctx = useContext(NativeSwarmContext);
  if (!ctx) {
    throw new Error("useSwarm must be used within NativeSwarmProvider");
  }
  return ctx;
}

export function NativeSwarmProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { lang } = useLang();

  const pageRootRef = useRef<HTMLDivElement>(null);
  const autoTriggeredPathRef = useRef<string | null>(null);

  const [mounted, setMounted] = useState(false);
  const [phase, setPhase] = useState<SwarmPhase>("building");
  const [speed, setSpeed] = useState<SwarmSpeed>(1);
  const [tourMode, setTourMode] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [flockEnabled, setFlockEnabled] = useState(true);
  const [runToken, setRunToken] = useState(1);
  const [dockCollapsed, setDockCollapsed] = useState(false);
  const [progressPct, setProgressPct] = useState(0);
  const [activeAgents, setActiveAgents] = useState(0);

  const launchRebuild = useCallback(
    (options?: { scrollTop?: boolean }) => {
      swarmAudio.unlock();
      swarmAudio.setEnabled(soundEnabled);
      if (options?.scrollTop !== false) {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      setRunToken((n) => n + 1);
      setPhase("building");
    },
    [soundEnabled]
  );

  const replayRebuild = useCallback(() => {
    swarmAudio.unlock();
    swarmAudio.setEnabled(soundEnabled);
    if (tourMode) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    setRunToken((n) => n + 1);
    setPhase("building");
  }, [soundEnabled, tourMode]);

  const handleProgressChange = useCallback((pct: number, count: number) => {
    setProgressPct(pct);
    setActiveAgents(count);
  }, []);

  // Mount & auto-launch Swarm Rebuild immediately on website entry (unless ?swarm=0)
  useIsomorphicLayoutEffect(() => {
    setMounted(true);
    const searchParams =
      typeof window !== "undefined"
        ? new URLSearchParams(window.location.search)
        : null;
    if (searchParams?.get("swarm") === "0") {
      document.documentElement.classList.remove("swarm-rebuilding", "swarm-booting");
      autoTriggeredPathRef.current = null;
      setPhase("idle");
      return;
    }
    setFlockEnabled(true);
    if (autoTriggeredPathRef.current === null) {
      autoTriggeredPathRef.current = pathname;
    } else if (autoTriggeredPathRef.current !== pathname) {
      autoTriggeredPathRef.current = pathname;
      setRunToken((n) => n + 1);
      setPhase("building");
    }
  }, [pathname]);

  // Passive Web Audio unlock on first gesture anywhere on the page
  useEffect(() => {
    if (!soundEnabled) return;
    const unlockOnce = () => {
      swarmAudio.unlock();
      swarmAudio.setEnabled(true);
    };
    window.addEventListener("pointerdown", unlockOnce, { once: true, passive: true });
    window.addEventListener("keydown", unlockOnce, { once: true, passive: true });
    return () => {
      window.removeEventListener("pointerdown", unlockOnce);
      window.removeEventListener("keydown", unlockOnce);
    };
  }, [soundEnabled]);

  const value = useMemo<NativeSwarmContextValue>(
    () => ({
      phase,
      speed,
      tourMode,
      soundEnabled,
      flockEnabled,
      progressPct,
      activeAgents,
      setPhase,
      setSpeed,
      setTourMode,
      setSoundEnabled,
      setFlockEnabled,
      launchRebuild,
      replayRebuild,
    }),
    [
      phase,
      speed,
      tourMode,
      soundEnabled,
      flockEnabled,
      progressPct,
      activeAgents,
      launchRebuild,
      replayRebuild,
    ]
  );

  const isLab = pathname === "/lab";

  return (
    <NativeSwarmContext.Provider value={value}>
      <div
        ref={pageRootRef}
        id="stic-swarm-root"
        className="relative z-10 flex-1 flex flex-col min-h-screen"
      >
        {children}

        {mounted && (
          <SwarmRebuildEngine
            rootRef={pageRootRef}
            phase={phase}
            onPhaseChange={setPhase}
            speed={speed}
            onSpeedChange={setSpeed}
            tourMode={tourMode}
            onTourModeChange={setTourMode}
            soundEnabled={soundEnabled}
            onSoundEnabledChange={setSoundEnabled}
            runToken={runToken}
            onReplay={replayRebuild}
            autoScan={true}
            onProgressChange={handleProgressChange}
          />
        )}
      </div>

      {/* Global Swarm Flock Cursors (5 teammate Figma cursors following mouse while browsing) */}
      {mounted && (
        <SwarmFlockCursors active={flockEnabled && phase === "idle"} />
      )}

      {/* Native Site-Wide Launcher Dock (visible when Swarm Rebuild is idle, zero extension needed) */}
      {mounted &&
        phase === "idle" &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            data-swarm-ignore="true"
            className="fixed bottom-4 right-4 sm:bottom-5 sm:right-5 z-[99990] flex items-center"
          >
            {dockCollapsed ? (
              <button
                onClick={() => setDockCollapsed(false)}
                title="Swarm Rebuild Native Dock (Alt+Shift+S)"
                className="group inline-flex items-center gap-1.5 px-3 py-2 rounded-full bg-white/95 dark:bg-slate-950/95 text-slate-900 dark:text-slate-100 border border-slate-200/90 dark:border-cyan-500/40 shadow-xl backdrop-blur-md text-xs font-mono font-bold cursor-pointer hover:scale-105 transition-transform"
              >
                <span className="flex -space-x-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-500 ring-1 ring-white dark:ring-slate-950" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 ring-1 ring-white dark:ring-slate-950" />
                  <span className="w-2.5 h-2.5 rounded-full bg-purple-500 ring-1 ring-white dark:ring-slate-950" />
                </span>
                <span>Swarm</span>
              </button>
            ) : (
              <div className="inline-flex items-center gap-1.5 p-1.5 rounded-2xl bg-white/95 dark:bg-slate-950/95 border border-slate-200/90 dark:border-cyan-500/40 shadow-[0_12px_36px_rgba(15,23,42,0.18)] dark:shadow-[0_12px_36px_rgba(0,0,0,0.6)] backdrop-blur-xl">
                {/* Launch full native Swarm Rebuild on current page */}
                <button
                  onClick={() => launchRebuild({ scrollTop: !isLab })}
                  title={
                    lang === "vi"
                      ? "Tái dựng trang hiện tại với Swarm Rebuild (Alt+Shift+S)"
                      : "Rebuild current page live with Native Swarm (Alt+Shift+S)"
                  }
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:brightness-110 active:scale-[0.98] transition-all shadow-md shadow-blue-500/25 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                  <span>
                    {lang === "vi" ? "Swarm Rebuild" : "Swarm Rebuild"}
                  </span>
                  <span className="hidden md:inline px-1.5 py-0.5 rounded bg-black/20 text-[10px] font-mono text-white/90">
                    Alt+Shift+S
                  </span>
                </button>

                {/* Toggle live multiplayer cursor flock */}
                <button
                  onClick={() => setFlockEnabled((prev) => !prev)}
                  title={
                    lang === "vi"
                      ? "Bật/tắt đàn con trỏ Figma theo chuột"
                      : "Toggle 5 Figma teammate cursors around pointer"
                  }
                  className={`inline-flex items-center gap-1.5 px-2.5 py-2 rounded-xl text-[11px] font-mono font-bold border transition-all cursor-pointer ${
                    flockEnabled
                      ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-300 border-emerald-500/40"
                      : "bg-slate-100/80 dark:bg-white/5 text-slate-600 dark:text-slate-300 border-slate-200/80 dark:border-white/10 hover:bg-slate-200/80 dark:hover:bg-white/10"
                  }`}
                >
                  {flockEnabled ? (
                    <Users className="w-3.5 h-3.5" />
                  ) : (
                    <MousePointer2 className="w-3.5 h-3.5" />
                  )}
                  <span className="hidden sm:inline">Flock</span>
                </button>

                {/* Minimize dock */}
                <button
                  onClick={() => setDockCollapsed(true)}
                  aria-label="Minimize Swarm launcher"
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>,
          document.body
        )}
    </NativeSwarmContext.Provider>
  );
}
