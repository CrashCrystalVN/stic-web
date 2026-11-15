"use client";

import React, { useEffect, useLayoutEffect, useRef, useState, useCallback } from "react";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;
import { createPortal } from "react-dom";
import {
  Play,
  RotateCcw,
  Volume2,
  VolumeX,
  Compass,
  Zap,
  Eye,
  EyeOff,
  X,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { swarmAudio } from "@/lib/swarmAudio";

export type SwarmPhase = "idle" | "building" | "live";
export type SwarmSpeed = 1 | 2 | 3;

interface BuilderProfile {
  name: string;
  color: string;
  textColor: string;
}

const BUILDER_ROSTER: BuilderProfile[] = [
  { name: "L.P. Hưng", color: "#3b82f6", textColor: "#ffffff" },
  { name: "L.H. An", color: "#10b981", textColor: "#042f2e" },
  { name: "T.V.Đ. Huy", color: "#a855f7", textColor: "#ffffff" },
  { name: "STIC-AI", color: "#06b6d4", textColor: "#042f2e" },
  { name: "Robotics", color: "#f59e0b", textColor: "#1c1917" },
  { name: "Design", color: "#ec4899", textColor: "#ffffff" },
  { name: "Data-Bot", color: "#6366f1", textColor: "#ffffff" },
  { name: "STEM-Lab", color: "#14b8a6", textColor: "#042f2e" },
  { name: "Media-01", color: "#f43f5e", textColor: "#ffffff" },
  { name: "Dev-Ops", color: "#38bdf8", textColor: "#082f49" },
];

type TaskKind = "box" | "dup" | "text" | "media" | "line";
type TaskStatus = "pending" | "active" | "done";

interface BuildTask {
  index: number;
  el: HTMLElement;
  kind: TaskKind;
  id: string | null;
  dupFromId: string | null;
  dupFromIndex: number;
  parentEl: HTMLElement | null;
  parentIndex: number;
  guide: boolean;
  isFixed: boolean;
  fixedLeft: number;
  fixedTop: number;
  x: number;
  y: number;
  w: number;
  h: number;
  borderRadius: string;
  rawText: string;
  fontCss: {
    fontFamily: string;
    fontSize: string;
    fontWeight: string;
    lineHeight: string;
    letterSpacing: string;
    textAlign: string;
    color: string;
    paddingTop: string;
    paddingRight: string;
    paddingBottom: string;
    paddingLeft: string;
  };
  origClipPath: string;
  status: TaskStatus;
}

type AgentStage = "idle" | "travel" | "act";

interface CursorAgent {
  idx: number;
  profile: BuilderProfile;
  x: number;
  y: number;
  vx: number;
  vy: number;
  active: boolean;
  stage: AgentStage;
  task: BuildTask | null;
  progress: number;
  duration: number;
  cooldown: number;
  lastTypedLen: number;
  startX: number;
  startY: number;
  targetX: number;
  targetY: number;
  orbitAngle: number;
  orbitRadius: number;
  // Imperative DOM refs for zero-React-rerender 120fps rendering
  cursorEl: HTMLDivElement;
  arrowSvg: SVGSVGElement;
  crossSvg: SVGSVGElement;
  badgeEl: HTMLSpanElement;
  actionEl: HTMLSpanElement;
  boxEl: HTMLDivElement;
  sizePillEl: HTMLDivElement;
  dupGhostEl: HTMLDivElement;
  gapLineEl: HTMLDivElement;
  gapLabelEl: HTMLSpanElement;
  typingEl: HTMLDivElement;
  typingSpanEl: HTMLSpanElement;
  scanLineEl: HTMLDivElement;
}

function attachFigmaCornerHandles(box: HTMLDivElement, color: string) {
  const corners = [
    "top:-3.5px;left:-3.5px;",
    "top:-3.5px;right:-3.5px;",
    "bottom:-3.5px;left:-3.5px;",
    "bottom:-3.5px;right:-3.5px;",
  ];
  for (let i = 0; i < corners.length; i++) {
    const h = document.createElement("span");
    h.style.cssText = `position:absolute;${corners[i]}width:6px;height:6px;background:#ffffff;border:1.5px solid ${color};box-sizing:border-box;pointer-events:none;`;
    box.appendChild(h);
  }
}

function createPointerSvg(color: string): SVGSVGElement {
  const ns = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(ns, "svg");
  svg.setAttribute("width", "20");
  svg.setAttribute("height", "20");
  svg.setAttribute("viewBox", "0 0 20 20");
  svg.style.display = "block";

  const path = document.createElementNS(ns, "path");
  path.setAttribute(
    "d",
    "M2.5 1.8L16.5 9.2L10.3 11.4L7.7 17.5L2.5 1.8Z"
  );
  path.setAttribute("fill", color);
  path.setAttribute("stroke", "#ffffff");
  path.setAttribute("stroke-width", "1.4");
  path.setAttribute("stroke-linejoin", "round");
  svg.appendChild(path);
  return svg;
}

function createCrosshairSvg(color: string): SVGSVGElement {
  const ns = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(ns, "svg");
  svg.setAttribute("width", "20");
  svg.setAttribute("height", "20");
  svg.setAttribute("viewBox", "0 0 20 20");
  svg.style.display = "none";
  svg.style.transform = "translate(-10px, -10px)";

  const h = document.createElementNS(ns, "line");
  h.setAttribute("x1", "2");
  h.setAttribute("y1", "10");
  h.setAttribute("x2", "18");
  h.setAttribute("y2", "10");
  h.setAttribute("stroke", color);
  h.setAttribute("stroke-width", "1.8");

  const v = document.createElementNS(ns, "line");
  v.setAttribute("x1", "10");
  v.setAttribute("y1", "2");
  v.setAttribute("x2", "10");
  v.setAttribute("y2", "18");
  v.setAttribute("stroke", color);
  v.setAttribute("stroke-width", "1.8");

  const c = document.createElementNS(ns, "circle");
  c.setAttribute("cx", "10");
  c.setAttribute("cy", "10");
  c.setAttribute("r", "2.2");
  c.setAttribute("fill", "#ffffff");
  c.setAttribute("stroke", color);
  c.setAttribute("stroke-width", "1.2");

  svg.appendChild(h);
  svg.appendChild(v);
  svg.appendChild(c);
  return svg;
}

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

function easeInOutQuad(t: number): number {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

const SKIP_TAGS = new Set([
  "SCRIPT",
  "STYLE",
  "NOSCRIPT",
  "CANVAS",
  "IFRAME",
  "LINK",
  "META",
  "BR",
  "HR",
  "PATH",
  "CIRCLE",
  "RECT",
  "POLYGON",
  "POLYLINE",
  "LINE",
  "ELLIPSE",
  "DEFS",
  "FILTER",
]);

const TEXT_BLOCK_SELECTOR = "h1, h2, h3, h4, h5, h6, p, blockquote, pre, li, dt, dd";

function isElementFixed(
  el: HTMLElement,
  rootEl: HTMLElement,
  cache?: WeakMap<HTMLElement, boolean>
): boolean {
  const chain: HTMLElement[] = [];
  let cur: HTMLElement | null = el;
  let result = false;
  while (cur && cur !== rootEl && cur !== document.body) {
    if (cache?.has(cur)) {
      result = cache.get(cur)!;
      break;
    }
    chain.push(cur);
    if (window.getComputedStyle(cur).position === "fixed") {
      result = true;
      break;
    }
    cur = cur.parentElement;
  }
  if (cache) {
    for (let i = 0; i < chain.length; i++) {
      cache.set(chain[i], result);
    }
  }
  return result;
}

function makeBuildTask(
  el: HTMLElement,
  kind: TaskKind,
  rootEl: HTMLElement,
  rootRect: DOMRect,
  options?: {
    id?: string | null;
    dupFromId?: string | null;
    parentEl?: HTMLElement | null;
    guide?: boolean;
    isDarkCanvas?: boolean;
    fixedCache?: WeakMap<HTMLElement, boolean>;
    rect?: DOMRect;
    computed?: CSSStyleDeclaration;
  }
): BuildTask {
  const rect = options?.rect ?? el.getBoundingClientRect();
  const computed = options?.computed ?? window.getComputedStyle(el);
  const isFixed = isElementFixed(el, rootEl, options?.fixedCache);
  const isText = kind === "text";
  const rawText = isText ? (el.textContent || "").trim() : "";

  const isTransparentText =
    computed.webkitTextFillColor === "transparent" ||
    computed.color === "rgba(0, 0, 0, 0)" ||
    computed.color === "transparent";
  const isDark =
    options?.isDarkCanvas ?? document.documentElement.classList.contains("dark");
  const fallbackColor = isDark ? "#67e8f9" : "#2563eb";

  return {
    index: 0,
    el,
    kind,
    id: options?.id ?? el.getAttribute("data-swarm-id"),
    dupFromId: options?.dupFromId ?? el.getAttribute("data-swarm-dup-from"),
    dupFromIndex: -1,
    parentEl: options?.parentEl ?? null,
    parentIndex: -1,
    guide: options?.guide ?? el.getAttribute("data-swarm-guide") === "true",
    isFixed,
    fixedLeft: rect.left,
    fixedTop: rect.top,
    x: rect.left - rootRect.left,
    y: rect.top - rootRect.top,
    w: Math.max(12, rect.width),
    h: Math.max(12, rect.height),
    borderRadius: computed.borderRadius || "12px",
    rawText,
    fontCss: {
      fontFamily: computed.fontFamily,
      fontSize: computed.fontSize,
      fontWeight: computed.fontWeight,
      lineHeight: computed.lineHeight,
      letterSpacing: computed.letterSpacing,
      textAlign: computed.textAlign,
      color: isTransparentText ? fallbackColor : computed.color,
      paddingTop: computed.paddingTop,
      paddingRight: computed.paddingRight,
      paddingBottom: computed.paddingBottom,
      paddingLeft: computed.paddingLeft,
    },
    origClipPath: el.style.clipPath,
    status: "pending",
  };
}

function collectPageBuildTasks(
  rootEl: HTMLElement,
  rootRect: DOMRect,
  autoScan: boolean,
  isDarkCanvas: boolean
): BuildTask[] {
  const curatedRootEls = new Set<HTMLElement>();
  if (rootEl.hasAttribute("data-swarm-root")) {
    curatedRootEls.add(rootEl);
  }
  rootEl.querySelectorAll<HTMLElement>("[data-swarm-root]").forEach((el) => {
    curatedRootEls.add(el);
  });

  const collected: Array<{
    task: BuildTask;
    autoDupFromEl: HTMLElement | null;
    domOrder: number;
  }> = [];

  const queuedEls = new Set<HTMLElement>();
  const dupEls = new Set<HTMLElement>();
  const fixedCache = new WeakMap<HTMLElement, boolean>();
  const lastSiblingByParent = new Map<
    HTMLElement,
    { el: HTMLElement; w: number; h: number; kind: TaskKind; tag: string }
  >();
  let domCounter = 0;

  const findQueuedAncestor = (el: HTMLElement): HTMLElement | null => {
    let p = el.parentElement;
    while (p && p !== rootEl) {
      if (queuedEls.has(p)) return p;
      p = p.parentElement;
    }
    return null;
  };

  const hasDupAncestor = (node: HTMLElement): boolean => {
    let cur = node.parentElement;
    while (cur && cur !== rootEl) {
      if (dupEls.has(cur)) return true;
      cur = cur.parentElement;
    }
    return false;
  };

  // 1. Always capture curated [data-swarm-task] trees explicitly (e.g. /lab specimens)
  curatedRootEls.forEach((cRoot) => {
    const curatedNodes = Array.from(cRoot.querySelectorAll<HTMLElement>("[data-swarm-task]"));
    for (let i = 0; i < curatedNodes.length; i++) {
      const el = curatedNodes[i];
      if (el.closest("[data-swarm-ignore], [data-swarm-overlay]")) continue;
      if (hasDupAncestor(el)) continue;
      const rect = el.getBoundingClientRect();
      if (rect.width < 4 || rect.height < 4) continue;
      const kind = (el.getAttribute("data-swarm-task") as TaskKind) || "box";
      const task = makeBuildTask(el, kind, rootEl, rootRect, {
        parentEl: findQueuedAncestor(el),
        isDarkCanvas,
        fixedCache,
        rect,
      });
      queuedEls.add(el);
      if (kind === "dup") {
        dupEls.add(el);
      }
      collected.push({ task, autoDupFromEl: null, domOrder: domCounter++ });
    }
  });

  // 2. Auto-discover DOM elements on general pages (Header, Main, Footer)
  if (autoScan) {
    const walk = (el: HTMLElement, depth: number) => {
      if (depth > 18) return;
      if (dupEls.has(el) || hasDupAncestor(el)) return;
      if (el !== rootEl && curatedRootEls.has(el)) return;
      if (el.hasAttribute("data-swarm-ignore") || el.hasAttribute("data-swarm-overlay")) return;
      if (SKIP_TAGS.has(el.tagName)) return;

      const computed = window.getComputedStyle(el);
      if (computed.display === "none" || computed.visibility === "hidden") return;

      const rect = el.getBoundingClientRect();
      if (el !== rootEl && (rect.width < 6 || rect.height < 6)) return;

      // Ignore ambient full-bleed background atmosphere layers
      if (
        el !== rootEl &&
        computed.pointerEvents === "none" &&
        rect.width > rootRect.width * 0.78 &&
        rect.height > 240 &&
        (el.textContent || "").trim().length < 4
      ) {
        return;
      }

      if (el !== rootEl && !queuedEls.has(el)) {
        const tag = el.tagName.toLowerCase();

        // A. Atomic Interactive Controls & Pills (prevents empty pill buttons!)
        const isAtomic =
          el.hasAttribute("data-swarm-atomic") ||
          tag === "a" ||
          tag === "button" ||
          tag === "input" ||
          tag === "select" ||
          tag === "textarea" ||
          el.getAttribute("role") === "button" ||
          el.classList.contains("liquid-glass-pill");

        if (isAtomic) {
          const parentKey = el.parentElement || rootEl;
          const prevSib = lastSiblingByParent.get(parentKey);
          const canDup =
            prevSib &&
            prevSib.tag === tag &&
            Math.abs(prevSib.w - rect.width) <= 36 &&
            Math.abs(prevSib.h - rect.height) <= 18;

          const task = makeBuildTask(el, canDup ? "dup" : "box", rootEl, rootRect, {
            parentEl: findQueuedAncestor(el),
            isDarkCanvas,
            fixedCache,
            rect,
            computed,
          });
          queuedEls.add(el);
          lastSiblingByParent.set(parentKey, {
            el,
            w: rect.width,
            h: rect.height,
            kind: task.kind,
            tag,
          });
          collected.push({
            task,
            autoDupFromEl: canDup && prevSib ? prevSib.el : null,
            domOrder: domCounter++,
          });
          return; // Atomic: never tear apart text/icons inside a button or link
        }

        // B. Visual Media & Large SVGs
        const isMedia =
          el.hasAttribute("data-swarm-media") ||
          tag === "img" ||
          tag === "picture" ||
          tag === "figure" ||
          tag === "video" ||
          (tag === "svg" && rect.width >= 26 && rect.height >= 26);

        if (isMedia) {
          const task = makeBuildTask(el, "media", rootEl, rootRect, {
            parentEl: findQueuedAncestor(el),
            isDarkCanvas,
            fixedCache,
            rect,
            computed,
          });
          queuedEls.add(el);
          collected.push({ task, autoDupFromEl: null, domOrder: domCounter++ });
          return;
        }

        // C. Typography Headings & Paragraphs
        if (el.matches(TEXT_BLOCK_SELECTOR)) {
          const txt = (el.textContent || "").trim();
          if (txt.length > 0 && rect.height <= 420) {
            const task = makeBuildTask(el, "text", rootEl, rootRect, {
              parentEl: findQueuedAncestor(el),
              guide: tag === "h1" || tag === "h2",
              isDarkCanvas,
              fixedCache,
              rect,
              computed,
            });
            queuedEls.add(el);
            collected.push({ task, autoDupFromEl: null, domOrder: domCounter++ });
          }
          return;
        }

        // D. Card Surfaces & Highlighted Containers
        const hasSurfaceStyle =
          el.classList.contains("liquid-glass") ||
          el.classList.contains("accent-glow") ||
          parseFloat(computed.borderTopWidth) >= 1 ||
          (computed.backgroundColor !== "rgba(0, 0, 0, 0)" &&
            computed.backgroundColor !== "transparent");

        const isCardSurface =
          tag !== "section" &&
          tag !== "header" &&
          tag !== "footer" &&
          tag !== "main" &&
          tag !== "nav" &&
          (tag === "article" ||
            tag === "form" ||
            el.classList.contains("liquid-glass") ||
            el.classList.contains("accent-glow") ||
            (hasSurfaceStyle &&
              rect.width >= 100 &&
              rect.width <= 760 &&
              rect.height >= 54 &&
              rect.height <= 680 &&
              el.children.length >= 2));

        if (isCardSurface) {
          const parentKey = el.parentElement || rootEl;
          const prevSib = lastSiblingByParent.get(parentKey);
          const canDup =
            prevSib &&
            (prevSib.kind === "box" || prevSib.kind === "dup") &&
            Math.abs(prevSib.w - rect.width) <= 40 &&
            Math.abs(prevSib.h - rect.height) <= 44;

          const task = makeBuildTask(el, canDup ? "dup" : "box", rootEl, rootRect, {
            parentEl: findQueuedAncestor(el),
            isDarkCanvas,
            fixedCache,
            rect,
            computed,
          });
          queuedEls.add(el);
          if (canDup) {
            dupEls.add(el);
          }
          lastSiblingByParent.set(parentKey, {
            el,
            w: rect.width,
            h: rect.height,
            kind: task.kind,
            tag,
          });
          collected.push({
            task,
            autoDupFromEl: canDup && prevSib ? prevSib.el : null,
            domOrder: domCounter++,
          });
          if (canDup) {
            return; // Keep duplicated card's inner content intact during Option-Drag
          }
          // Continue descending so inner headings/buttons animate cleanly after card frame
        }
      }

      const kids = el.children;
      for (let i = 0; i < kids.length; i++) {
        walk(kids[i] as HTMLElement, depth + 1);
      }
    };

    if (!curatedRootEls.has(rootEl)) {
      walk(rootEl, 0);
    }
  }

  // Sort: fixed header items top-left->right first, then vertical bands top->bottom, keeping ancestor < descendant order
  collected.sort((a, b) => {
    if (a.task.isFixed !== b.task.isFixed) {
      return a.task.isFixed ? -1 : 1;
    }
    if (a.task.isFixed && b.task.isFixed) {
      return a.task.x - b.task.x;
    }
    const bucketDiff = Math.round(a.task.y / 18) - Math.round(b.task.y / 18);
    if (bucketDiff !== 0) return bucketDiff;
    return a.domOrder - b.domOrder;
  });

  const elToFinalIndex = new Map<HTMLElement, number>();
  const idToFinalIndex = new Map<string, number>();

  for (let i = 0; i < collected.length; i++) {
    const item = collected[i];
    item.task.index = i;
    elToFinalIndex.set(item.task.el, i);
    if (item.task.id) {
      idToFinalIndex.set(item.task.id, i);
    }
  }

  for (let i = 0; i < collected.length; i++) {
    const item = collected[i];
    if (item.task.parentEl && elToFinalIndex.has(item.task.parentEl)) {
      const pIdx = elToFinalIndex.get(item.task.parentEl)!;
      if (pIdx !== i) {
        item.task.parentIndex = pIdx;
      }
    }
    if (item.task.dupFromId && idToFinalIndex.has(item.task.dupFromId)) {
      const dIdx = idToFinalIndex.get(item.task.dupFromId)!;
      if (dIdx !== i) item.task.dupFromIndex = dIdx;
    } else if (item.autoDupFromEl && elToFinalIndex.has(item.autoDupFromEl)) {
      const dIdx = elToFinalIndex.get(item.autoDupFromEl)!;
      if (dIdx !== i) item.task.dupFromIndex = dIdx;
    }
  }

  return collected.map((c) => c.task);
}

export interface SwarmRebuildEngineProps {
  rootRef: React.RefObject<HTMLElement | null>;
  phase: SwarmPhase;
  onPhaseChange: (phase: SwarmPhase) => void;
  speed: SwarmSpeed;
  onSpeedChange: (speed: SwarmSpeed) => void;
  tourMode: boolean;
  onTourModeChange: (tour: boolean) => void;
  soundEnabled: boolean;
  onSoundEnabledChange: (sound: boolean) => void;
  runToken: number;
  onReplay: () => void;
  autoScan?: boolean;
  onProgressChange?: (pct: number, activeAgents: number) => void;
}

export function SwarmRebuildEngine({
  rootRef,
  phase,
  onPhaseChange,
  speed,
  onSpeedChange,
  tourMode,
  onTourModeChange,
  soundEnabled,
  onSoundEnabledChange,
  runToken,
  onReplay,
  autoScan = true,
  onProgressChange,
}: SwarmRebuildEngineProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const guideLayerRef = useRef<HTMLDivElement>(null);
  const hudBarRef = useRef<HTMLDivElement>(null);
  const hudPctRef = useRef<HTMLSpanElement>(null);
  const hudAgentsRef = useRef<HTMLSpanElement>(null);
  const hudScrollHintRef = useRef<HTMLSpanElement>(null);

  const [mounted] = useState(true);
  const [hudHidden, setHudHidden] = useState(false);
  const [progressDisplay, setProgressDisplay] = useState(0);

  // Refs synced with reactive props so RAF never needs to restart when speed/tour/sound changes
  const phaseRef = useRef<SwarmPhase>(phase);
  const speedRef = useRef<SwarmSpeed>(speed);
  const tourRef = useRef<boolean>(tourMode);
  const soundRef = useRef<boolean>(soundEnabled);

  phaseRef.current = phase;
  speedRef.current = speed;
  tourRef.current = tourMode;
  soundRef.current = soundEnabled;

  // Store restore handle so Go Live / Exit / unmount always restores 100% DOM state
  const tasksRef = useRef<BuildTask[]>([]);
  const agentsRef = useRef<CursorAgent[]>([]);
  const mouseStateRef = useRef({ clientX: -1, clientY: -1, active: false });
  const lastHudPctRef = useRef(-1);

  useEffect(() => {
    swarmAudio.setEnabled(soundEnabled);
  }, [soundEnabled]);

  // Global mouse & keyboard shortcuts matching Swarm Rebuild extension
  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      mouseStateRef.current = { clientX: e.clientX, clientY: e.clientY, active: true };
    };

    const onKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const isInput =
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.tagName === "SELECT" ||
          target.isContentEditable);

      if (e.altKey && e.shiftKey && (e.key === "S" || e.key === "s")) {
        e.preventDefault();
        swarmAudio.unlock();
        if (phaseRef.current === "idle") {
          onReplay();
        } else {
          onPhaseChange("idle");
        }
        return;
      }

      if (phaseRef.current === "idle" || isInput) return;

      if (e.key === "Escape") {
        e.preventDefault();
        onPhaseChange("idle");
      } else if (e.key === "1") {
        onSpeedChange(1);
      } else if (e.key === "2") {
        onSpeedChange(2);
      } else if (e.key === "3") {
        onSpeedChange(3);
      } else if (e.key === "t" || e.key === "T") {
        onTourModeChange(!tourRef.current);
      } else if (e.key === "m" || e.key === "M") {
        const nextSound = !soundRef.current;
        if (nextSound) swarmAudio.unlock();
        onSoundEnabledChange(nextSound);
      } else if (e.key === "r" || e.key === "R") {
        swarmAudio.unlock();
        onReplay();
      } else if (e.key === "l" || e.key === "L") {
        onPhaseChange("live");
      } else if (e.key === "h" || e.key === "H") {
        setHudHidden((prev) => !prev);
      }
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onPhaseChange, onReplay, onSoundEnabledChange, onSpeedChange, onTourModeChange]);

  const restoreAllTasks = useCallback(() => {
    const tasks = tasksRef.current;
    for (let i = 0; i < tasks.length; i++) {
      const t = tasks[i];
      t.el.removeAttribute("data-swarm-wiped");
      t.el.style.clipPath = t.origClipPath;
      t.el.style.transition = "";
    }
    document.documentElement.classList.remove("swarm-booting");
  }, []);

  const revealRemainingImmediately = useCallback(() => {
    const tasks = tasksRef.current;
    for (let i = 0; i < tasks.length; i++) {
      const t = tasks[i];
      if (t.status !== "done") {
        t.status = "done";
        t.el.setAttribute("data-swarm-wiped", "done");
        t.el.style.clipPath = t.origClipPath;
        t.el.style.transition = "";
      }
    }
    const agents = agentsRef.current;
    for (let i = 0; i < agents.length; i++) {
      const a = agents[i];
      a.stage = "idle";
      a.task = null;
      a.boxEl.style.display = "none";
      a.sizePillEl.style.display = "none";
      a.dupGhostEl.style.display = "none";
      a.gapLineEl.style.display = "none";
      a.typingEl.style.display = "none";
      a.scanLineEl.style.display = "none";
      a.crossSvg.style.display = "none";
      a.arrowSvg.style.display = "block";
      a.actionEl.style.display = "none";
    }
    if (hudBarRef.current) hudBarRef.current.style.transform = "scaleX(1)";
    if (hudPctRef.current) hudPctRef.current.textContent = "100%";
    if (hudScrollHintRef.current) hudScrollHintRef.current.style.display = "none";
    setProgressDisplay(100);
    onProgressChange?.(100, agents.length);
  }, [onProgressChange]);

  // Sync HTML phase classes for Framer-Motion-safe visibility locking
  useIsomorphicLayoutEffect(() => {
    const rootHtml = document.documentElement;
    if (phase === "building") {
      rootHtml.classList.add("swarm-rebuilding");
      rootHtml.classList.remove("swarm-live");
    } else if (phase === "live") {
      rootHtml.classList.remove("swarm-rebuilding", "swarm-booting");
      rootHtml.classList.add("swarm-live");
    } else {
      rootHtml.classList.remove("swarm-rebuilding", "swarm-live", "swarm-booting");
    }
    return () => {
      rootHtml.classList.remove("swarm-rebuilding", "swarm-live", "swarm-booting");
    };
  }, [phase]);

  // Handle transition into "live" via Go Live button / shortcut
  useEffect(() => {
    if (phase === "live" && tasksRef.current.length > 0) {
      const hasUnfinished = tasksRef.current.some((t) => t.status !== "done");
      revealRemainingImmediately();
      restoreAllTasks();
      if (hasUnfinished && soundRef.current) {
        swarmAudio.playCompletionChord();
      }
    }
  }, [phase, revealRemainingImmediately, restoreAllTasks]);

  const isEngineActive = phase !== "idle";

  // Main Swarm Rebuild Engine Lifecycle
  useIsomorphicLayoutEffect(() => {
    const guideEl = guideLayerRef.current;

    if (!isEngineActive || runToken === 0) {
      restoreAllTasks();
      tasksRef.current = [];
      agentsRef.current = [];
      if (overlayRef.current) overlayRef.current.innerHTML = "";
      if (guideEl) guideEl.innerHTML = "";
      setHudHidden(false);
      setProgressDisplay(0);
      lastHudPctRef.current = -1;
      return;
    }

    const rootEl = rootRef.current;
    const overlayEl = overlayRef.current;
    if (!rootEl || !overlayEl) {
      document.documentElement.classList.remove("swarm-booting");
      return;
    }

    overlayEl.innerHTML = "";
    if (guideEl) guideEl.innerHTML = "";

    // 1. Detect dark canvas surface (respects dark-only routes like /lab even in light global theme)
    const darkSurface =
      document.documentElement.classList.contains("dark") ||
      Boolean(rootEl.querySelector(".swarm-canvas-bg"));

    // Ensure building lock (transform: none !important) is active before measuring rects
    document.documentElement.classList.add("swarm-rebuilding");

    // Collect curated + auto-scanned DOM tasks cleanly
    const rootRect = rootEl.getBoundingClientRect();
    const tasks = collectPageBuildTasks(rootEl, rootRect, autoScan, darkSurface);

    tasksRef.current = tasks;

    // 2. Wipe Canvas via CSS data attribute (preserves geometry & overrides Framer inline opacity safely)
    for (let i = 0; i < tasks.length; i++) {
      const t = tasks[i];
      t.el.setAttribute("data-swarm-wiped", t.kind === "media" ? "media-wiped" : "pending");
      if (t.kind === "media") {
        t.el.style.clipPath = "inset(0 0 100% 0)";
      }
    }
    document.documentElement.classList.remove("swarm-booting");

    // 3. Create 10 Multiplayer Cursor Agents (up to 8 base active + 2 extra scroll burst chasers)
    const startCenterX = Math.max(120, rootRect.width * 0.5);
    const startCenterY = Math.max(80, window.scrollY - rootRect.top + 140);

    const agents: CursorAgent[] = BUILDER_ROSTER.map((profile, idx) => {
      // Cursor wrapper
      const cursorEl = document.createElement("div");
      cursorEl.style.cssText =
        "position:absolute;top:0;left:0;z-index:60;pointer-events:none;will-change:transform;opacity:0;";

      const arrowSvg = createPointerSvg(profile.color);
      const crossSvg = createCrosshairSvg(profile.color);

      const labelWrap = document.createElement("div");
      labelWrap.style.cssText =
        "display:inline-flex;align-items:center;gap:4px;margin-left:14px;margin-top:2px;padding:2px 7px;border-radius:9999px;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:10px;font-weight:700;white-space:nowrap;box-shadow:0 4px 12px rgba(0,0,0,0.35);border:1px solid rgba(255,255,255,0.28);";
      labelWrap.style.backgroundColor = profile.color;
      labelWrap.style.color = profile.textColor;

      const badgeEl = document.createElement("span");
      badgeEl.textContent = profile.name;

      const actionEl = document.createElement("span");
      actionEl.style.cssText =
        "display:none;padding:0 4px;border-radius:9999px;background:rgba(0,0,0,0.22);color:#fff;font-size:9px;letter-spacing:0.03em;";

      labelWrap.appendChild(badgeEl);
      labelWrap.appendChild(actionEl);
      cursorEl.appendChild(arrowSvg);
      cursorEl.appendChild(crossSvg);
      cursorEl.appendChild(labelWrap);
      overlayEl.appendChild(cursorEl);

      // Box drag wireframe with crisp Figma corner handles (CSS containment avoids page reflow)
      const boxEl = document.createElement("div");
      boxEl.style.cssText = `display:none;position:absolute;top:0;left:0;z-index:45;pointer-events:none;border:1.5px solid ${profile.color};background:${profile.color}12;box-sizing:border-box;contain:layout style;will-change:transform,width,height;`;
      attachFigmaCornerHandles(boxEl, profile.color);
      overlayEl.appendChild(boxEl);

      // Dimension pill (W x H) centered below selection box
      const sizePillEl = document.createElement("div");
      sizePillEl.style.cssText = `display:none;position:absolute;top:0;left:0;z-index:55;pointer-events:none;padding:2px 7px;border-radius:5px;background:${profile.color};color:${profile.textColor};font-family:ui-monospace,monospace;font-size:10px;font-weight:700;white-space:nowrap;box-shadow:0 3px 10px rgba(0,0,0,0.3);transform-origin:center top;`;
      overlayEl.appendChild(sizePillEl);

      // Option-Drag Duplicate Ghost + corner handles
      const dupGhostEl = document.createElement("div");
      dupGhostEl.style.cssText = `display:none;position:absolute;top:0;left:0;z-index:46;pointer-events:none;border:1.5px dashed ${profile.color};background:${profile.color}18;box-sizing:border-box;`;
      attachFigmaCornerHandles(dupGhostEl, profile.color);
      overlayEl.appendChild(dupGhostEl);

      // Spacing gap measurement line
      const gapLineEl = document.createElement("div");
      gapLineEl.style.cssText = `display:none;position:absolute;top:0;left:0;height:1px;z-index:52;pointer-events:none;border-top:1px dashed ${profile.color};`;
      const gapLabelEl = document.createElement("span");
      gapLabelEl.style.cssText = `position:absolute;left:50%;top:-10px;transform:translateX(-50%);padding:1px 5px;border-radius:4px;background:${profile.color};color:${profile.textColor};font-family:ui-monospace,monospace;font-size:9px;font-weight:700;white-space:nowrap;`;
      gapLineEl.appendChild(gapLabelEl);
      overlayEl.appendChild(gapLineEl);

      // Typing ghost container
      const typingEl = document.createElement("div");
      typingEl.style.cssText =
        "display:none;position:absolute;top:0;left:0;z-index:48;pointer-events:none;overflow:hidden;word-break:break-word;white-space:pre-wrap;";
      const typingSpanEl = document.createElement("span");
      const caretEl = document.createElement("span");
      caretEl.textContent = "|";
      caretEl.style.cssText = `display:inline-block;margin-left:1px;font-weight:700;color:${profile.color};`;
      typingEl.appendChild(typingSpanEl);
      typingEl.appendChild(caretEl);
      overlayEl.appendChild(typingEl);

      // Scanline for media sweep reveal
      const scanLineEl = document.createElement("div");
      scanLineEl.style.cssText = `display:none;position:absolute;top:0;left:0;height:2px;z-index:49;pointer-events:none;background:linear-gradient(90deg,transparent,${profile.color},#ffffff,${profile.color},transparent);box-shadow:0 0 12px ${profile.color};`;
      overlayEl.appendChild(scanLineEl);

      const angle = (idx / BUILDER_ROSTER.length) * Math.PI * 2;
      const radius = 55 + (idx % 3) * 28;
      const sx = startCenterX + Math.cos(angle) * radius;
      const sy = startCenterY + Math.sin(angle) * radius;

      cursorEl.style.transform = `translate3d(${sx}px, ${sy}px, 0)`;

      return {
        idx,
        profile,
        x: sx,
        y: sy,
        vx: 0,
        vy: 0,
        active: idx < 4,
        stage: "idle",
        task: null,
        progress: 0,
        duration: 0.45,
        cooldown: idx * 0.04,
        lastTypedLen: -1,
        startX: sx,
        startY: sy,
        targetX: sx,
        targetY: sy,
        orbitAngle: angle,
        orbitRadius: 44 + (idx % 4) * 18,
        cursorEl,
        arrowSvg,
        crossSvg,
        badgeEl,
        actionEl,
        boxEl,
        sizePillEl,
        dupGhostEl,
        gapLineEl,
        gapLabelEl,
        typingEl,
        typingSpanEl,
        scanLineEl,
      };
    });

    agentsRef.current = agents;

    // Cached layout metrics (avoid forcing synchronous reflows inside RAF tick)
    let cachedScrollY = window.scrollY;
    let cachedWinH = window.innerHeight;
    const initRootRect = rootEl.getBoundingClientRect();
    let cachedRootLeft = initRootRect.left;
    let cachedRootDocTop = initRootRect.top + cachedScrollY;
    let cachedRootWidth = initRootRect.width;
    let cachedMaxScrollY = Math.max(0, document.documentElement.scrollHeight - cachedWinH);

    // 4. Ruler Guide Helper (Viewport-aligned flash guides)
    const spawnRulerGuides = (task: BuildTask, color: string) => {
      const guideRoot = guideLayerRef.current;
      if (!guideRoot) return;
      const viewX = cachedRootLeft + task.x;
      const viewY = cachedRootDocTop - cachedScrollY + task.y;
      if (viewY < -80 || viewY > cachedWinH + 80) return;

      const hLine = document.createElement("div");
      hLine.style.cssText = `position:fixed;left:0;right:0;top:${viewY}px;height:1px;border-top:1px dashed ${color}99;pointer-events:none;transition:opacity 240ms ease;opacity:0.95;`;
      const tag = document.createElement("span");
      tag.textContent = `y: ${Math.round(task.y)}px`;
      tag.style.cssText = `position:absolute;left:12px;top:-16px;padding:1px 5px;border-radius:4px;background:${color};color:#fff;font-family:ui-monospace,monospace;font-size:9px;font-weight:700;`;
      hLine.appendChild(tag);

      const vLine = document.createElement("div");
      vLine.style.cssText = `position:fixed;top:0;bottom:0;left:${viewX}px;width:1px;border-left:1px dashed ${color}77;pointer-events:none;transition:opacity 240ms ease;opacity:0.8;`;

      guideRoot.innerHTML = "";
      guideRoot.appendChild(hLine);
      guideRoot.appendChild(vLine);

      swarmAudio.playGuideSnap();

      requestAnimationFrame(() => {
        hLine.style.opacity = "0";
        vLine.style.opacity = "0";
      });
      setTimeout(() => {
        hLine.remove();
        vLine.remove();
      }, 280);
    };

    // 5. Recalculate rects cleanly on resize
    let resizeTimer: ReturnType<typeof setTimeout> | null = null;
    const recalcBounds = () => {
      cachedScrollY = window.scrollY;
      cachedWinH = window.innerHeight;
      const rRect = rootEl.getBoundingClientRect();
      cachedRootLeft = rRect.left;
      cachedRootDocTop = rRect.top + cachedScrollY;
      cachedRootWidth = rRect.width;
      cachedMaxScrollY = Math.max(0, document.documentElement.scrollHeight - cachedWinH);
      for (let i = 0; i < tasks.length; i++) {
        const t = tasks[i];
        const rect = t.el.getBoundingClientRect();
        t.fixedLeft = rect.left;
        t.fixedTop = rect.top;
        t.x = rect.left - rRect.left;
        t.y = rect.top - rRect.top;
        t.w = Math.max(12, rect.width);
        t.h = Math.max(12, rect.height);
      }
    };
    const onResize = () => {
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = setTimeout(recalcBounds, 150);
    };
    window.addEventListener("resize", onResize, { passive: true });

    // Detect manual scroll velocity for Scroll Chasing burst agents + Tour interruption
    let lastScrollY = window.scrollY;
    let scrollBurstUntil = 0;
    const onUserScroll = () => {
      const sy = window.scrollY;
      const delta = Math.abs(sy - lastScrollY);
      lastScrollY = sy;
      cachedScrollY = sy;
      if (delta > 16) {
        scrollBurstUntil = performance.now() + 1800;
      }
    };
    const cancelTourOnUserInput = () => {
      if (tourRef.current) {
        onTourModeChange(false);
      }
    };
    window.addEventListener("scroll", onUserScroll, { passive: true });
    window.addEventListener("wheel", cancelTourOnUserInput, { passive: true });
    window.addEventListener("touchstart", cancelTourOnUserInput, { passive: true });

    // 6. Scroll-Driven Task Queue: only unlock tasks inside or above current viewport
    let maxUnlockedY = cachedScrollY - cachedRootDocTop + cachedWinH + 48;

    const pickTaskForAgent = (agent: CursorAgent): BuildTask | null => {
      const viewTop = cachedScrollY - cachedRootDocTop;
      const viewBottom = viewTop + cachedWinH;
      const viewFocusY = viewTop + cachedWinH * 0.38;
      maxUnlockedY = Math.max(maxUnlockedY, viewBottom + (tourRef.current ? 180 : 48));

      let bestTask: BuildTask | null = null;
      let bestScore = Infinity;

      for (let i = 0; i < tasks.length; i++) {
        const t = tasks[i];
        if (t.status !== "pending") continue;
        if (t.parentIndex !== -1 && tasks[t.parentIndex].status !== "done") continue;
        if (t.dupFromIndex !== -1 && tasks[t.dupFromIndex].status !== "done") continue;
        if (!t.isFixed && t.y > maxUnlockedY) continue;

        const inViewport = t.isFixed || (t.y + t.h >= viewTop - 60 && t.y <= viewBottom + 48);
        const distFromAgent = Math.hypot(t.x - agent.x, t.y - agent.y);
        const distFromView = Math.abs(t.y - viewFocusY);

        let score = distFromAgent * 0.25 + t.y * 0.7;
        if (inViewport) {
          score -= 5000;
          score += distFromView * 0.3;
        }

        // Slightly prioritize boxes before inner children
        if (t.kind === "box" || t.kind === "dup") score -= 140;

        if (score < bestScore) {
          bestScore = score;
          bestTask = t;
        }
      }

      return bestTask;
    };

    const completeTask = (agent: CursorAgent, task: BuildTask, completedCountRef: { count: number }) => {
      task.status = "done";
      completedCountRef.count += 1;

      task.el.setAttribute("data-swarm-wiped", "done");
      task.el.style.clipPath = task.origClipPath;
      task.el.style.transition = "";

      if (task.kind === "dup") {
        swarmAudio.playDuplicatePop();
      } else if (task.kind === "box" || task.kind === "media") {
        swarmAudio.playPlaceTone(completedCountRef.count);
      }

      agent.boxEl.style.display = "none";
      agent.sizePillEl.style.display = "none";
      agent.dupGhostEl.style.display = "none";
      agent.gapLineEl.style.display = "none";
      agent.typingEl.style.display = "none";
      agent.scanLineEl.style.display = "none";
      agent.crossSvg.style.display = "none";
      agent.arrowSvg.style.display = "block";
      agent.actionEl.style.display = "none";
      agent.task = null;
      agent.stage = "idle";
      agent.cooldown = 0.06 + (agent.idx % 3) * 0.03;
      agent.lastTypedLen = -1;
    };

    const startTaskAction = (agent: CursorAgent, task: BuildTask) => {
      agent.stage = "act";
      agent.progress = 0;
      agent.lastTypedLen = -1;

      if (task.guide) {
        spawnRulerGuides(task, agent.profile.color);
      }

      if (task.kind === "box") {
        agent.arrowSvg.style.display = "none";
        agent.crossSvg.style.display = "block";
        agent.actionEl.textContent = "BOX";
        agent.actionEl.style.display = "inline-block";
        agent.boxEl.style.display = "block";
        agent.boxEl.style.borderRadius = task.borderRadius;
        agent.boxEl.style.width = "8px";
        agent.boxEl.style.height = "8px";
        agent.boxEl.style.transform = `translate3d(${task.x}px, ${task.y}px, 0)`;
        agent.duration = Math.min(0.72, Math.max(0.48, (task.w + task.h) / 1100));
        const effDurMs = Math.max(
          120,
          Math.round((agent.duration / Math.max(0.8, speedRef.current)) * 1000)
        );
        task.el.style.transition = "none";
        task.el.style.clipPath = "inset(0 100% 100% 0)";
        task.el.setAttribute("data-swarm-wiped", "media-sweep");
        requestAnimationFrame(() => {
          if (task.status === "active") {
            task.el.style.transition = `clip-path ${effDurMs}ms cubic-bezier(0.22, 1, 0.36, 1)`;
            task.el.style.clipPath = "inset(0 0% 0% 0)";
          }
        });
        agent.sizePillEl.style.display = "block";
        agent.sizePillEl.textContent = "8 × 8";
        agent.sizePillEl.style.transform = `translate3d(${task.x + 4}px, ${task.y + 14}px, 0) translateX(-50%)`;
        swarmAudio.playDragStart();
      } else if (task.kind === "dup") {
        const src = task.dupFromIndex !== -1 ? tasks[task.dupFromIndex] : task;
        agent.arrowSvg.style.display = "block";
        agent.crossSvg.style.display = "none";
        agent.actionEl.textContent = "⌥ DUP";
        agent.actionEl.style.display = "inline-block";
        agent.startX = src.x + src.w * 0.5;
        agent.startY = src.y + src.h * 0.25;
        agent.dupGhostEl.style.display = "block";
        agent.dupGhostEl.style.width = `${task.w}px`;
        agent.dupGhostEl.style.height = `${task.h}px`;
        agent.dupGhostEl.style.borderRadius = task.borderRadius;
        agent.dupGhostEl.style.transform = `translate3d(${src.x}px, ${src.y}px, 0)`;

        // Gap line indicator between source and clone
        const dx = task.x - src.x;
        const dy = task.y - src.y;
        const gap = Math.round(
          Math.abs(dx) > Math.abs(dy)
            ? Math.max(8, Math.abs(task.x - (src.x + src.w)))
            : Math.max(8, Math.abs(task.y - (src.y + src.h)))
        );
        agent.gapLineEl.style.display = "block";
        const midX = src.x + src.w * 0.5;
        const midY = src.y + src.h * 0.5;
        const tMidX = task.x + task.w * 0.5;
        const tMidY = task.y + task.h * 0.5;
        const len = Math.hypot(tMidX - midX, tMidY - midY);
        const angleDeg = (Math.atan2(tMidY - midY, tMidX - midX) * 180) / Math.PI;
        agent.gapLineEl.style.width = `${len}px`;
        agent.gapLineEl.style.transformOrigin = "0 50%";
        agent.gapLineEl.style.transform = `translate3d(${midX}px, ${midY}px, 0) rotate(${angleDeg}deg)`;
        agent.gapLabelEl.textContent = `${gap}px`;

        agent.duration = 0.52;
        swarmAudio.playDragStart();
      } else if (task.kind === "text") {
        agent.arrowSvg.style.display = "block";
        agent.crossSvg.style.display = "none";
        agent.actionEl.textContent = "TYPE";
        agent.actionEl.style.display = "inline-block";
        agent.typingEl.style.display = "none";

        const charCount = Math.max(1, Math.min(task.rawText.length, 130));
        agent.duration = Math.min(0.68, Math.max(0.44, charCount * 0.0075));
        const effDurMs = Math.max(
          120,
          Math.round((agent.duration / Math.max(0.8, speedRef.current)) * 1000)
        );
        task.el.style.transition = "none";
        task.el.style.clipPath = task.h > 48 ? "inset(0 0 100% 0)" : "inset(0 100% 0 0)";
        task.el.setAttribute("data-swarm-wiped", "media-sweep");
        requestAnimationFrame(() => {
          if (task.status === "active") {
            task.el.style.transition = `clip-path ${effDurMs}ms cubic-bezier(0.22, 1, 0.36, 1)`;
            task.el.style.clipPath = "inset(0 0% 0% 0)";
          }
        });
      } else if (task.kind === "media") {
        agent.arrowSvg.style.display = "none";
        agent.crossSvg.style.display = "block";
        agent.actionEl.textContent = "SCAN";
        agent.actionEl.style.display = "inline-block";
        agent.scanLineEl.style.display = "block";
        agent.scanLineEl.style.width = `${task.w}px`;
        agent.scanLineEl.style.transform = `translate3d(${task.x}px, ${task.y}px, 0)`;
        agent.duration = 0.54;
        const effDurMs = Math.max(
          120,
          Math.round((agent.duration / Math.max(0.8, speedRef.current)) * 1000)
        );
        task.el.style.transition = "none";
        task.el.style.clipPath = "inset(0 0 100% 0)";
        task.el.setAttribute("data-swarm-wiped", "media-sweep");
        requestAnimationFrame(() => {
          if (task.status === "active") {
            task.el.style.transition = `clip-path ${effDurMs}ms cubic-bezier(0.22, 1, 0.36, 1)`;
            task.el.style.clipPath = "inset(0 0 0% 0)";
          }
        });
      } else {
        // line / pen stroke
        agent.arrowSvg.style.display = "none";
        agent.crossSvg.style.display = "block";
        agent.actionEl.textContent = "PEN";
        agent.actionEl.style.display = "inline-block";
        agent.boxEl.style.display = "block";
        agent.boxEl.style.borderRadius = task.borderRadius;
        agent.boxEl.style.width = "4px";
        agent.boxEl.style.height = `${task.h}px`;
        agent.boxEl.style.transform = `translate3d(${task.x}px, ${task.y}px, 0)`;
        agent.duration = 0.38;
      }
    };

    // 7. Single Zero-Allocation RAF Loop
    let rafId: number | null = null;
    let lastTs = 0;
    let introDelay = 0; // start builders immediately without artificial pause
    const completedCountRef = { count: 0 };
    let completionNotified = false;
    let tourSmoothY = window.scrollY;

    const tick = (ts: number) => {
      if (lastTs === 0) lastTs = ts;
      const rawDt = Math.min(0.05, (ts - lastTs) / 1000);
      lastTs = ts;

      const sp = speedRef.current;
      const dt = rawDt * sp;
      const isBuilding = phaseRef.current === "building";
      const isLive = phaseRef.current === "live";

      if (introDelay > 0 && isBuilding) {
        introDelay -= rawDt;
      }

      // Parallel builder count tuned for calm, fluid visual readability
      const burstActive = ts < scrollBurstUntil;
      const activeTargetCount = isLive ? 4 : sp >= 3 ? 8 : sp >= 2 ? 6 : burstActive ? 5 : 4;

      cachedScrollY = window.scrollY;
      const rLeft = cachedRootLeft;
      const rTop = cachedRootDocTop - cachedScrollY;
      const viewTop = cachedScrollY - cachedRootDocTop;
      const viewBottom = viewTop + cachedWinH;
      maxUnlockedY = Math.max(
        maxUnlockedY,
        viewBottom + (tourRef.current ? 180 : 48)
      );
      // Keep fixed header task coordinates synchronized & auto-reveal tasks scrolled past above viewport
      if (isBuilding) {
        for (let i = 0; i < tasks.length; i++) {
          const t = tasks[i];
          if (t.isFixed && t.status !== "done") {
            t.x = t.fixedLeft - rLeft;
            t.y = t.fixedTop - rTop;
          } else if (!t.isFixed && t.status === "pending" && t.y + t.h < viewTop - 40) {
            t.status = "done";
            completedCountRef.count += 1;
            t.el.setAttribute("data-swarm-wiped", "done");
            t.el.style.clipPath = t.origClipPath;
            t.el.style.transition = "";
          }
        }
      }
      const pointerDocX = mouseStateRef.current.active
        ? mouseStateRef.current.clientX - rLeft
        : cachedRootWidth * 0.5;
      const pointerDocY = mouseStateRef.current.active
        ? mouseStateRef.current.clientY - rTop
        : viewTop + cachedWinH * 0.4;

      let activeBuilderCount = 0;
      let earliestPendingY = Infinity;

      if (isBuilding) {
        for (let i = 0; i < tasks.length; i++) {
          if (tasks[i].status !== "done" && tasks[i].y < earliestPendingY) {
            earliestPendingY = tasks[i].y;
          }
        }
      }

      for (let i = 0; i < agents.length; i++) {
        const a = agents[i];
        const shouldShow = i < activeTargetCount || a.stage !== "idle";

        if (!shouldShow) {
          a.cursorEl.style.opacity = "0";
          continue;
        }
        a.cursorEl.style.opacity = "1";

        if (isBuilding && introDelay <= 0) {
          if (a.task && !a.task.isFixed && a.task.y + a.task.h < viewTop - 40) {
            completeTask(a, a.task, completedCountRef);
            a.cooldown = 0.08;
          }

          if (a.stage === "idle") {
            if (a.cooldown > 0) {
              a.cooldown = Math.max(0, a.cooldown - dt);
            } else {
              const nextTask = pickTaskForAgent(a);
              if (nextTask) {
                nextTask.status = "active";
                a.task = nextTask;
                a.stage = "travel";
                if (a.y < viewTop - 160) {
                  a.y = viewTop - 36;
                } else if (a.y > viewBottom + 160) {
                  a.y = viewBottom + 36;
                }
                if (nextTask.kind === "dup" && nextTask.dupFromIndex !== -1) {
                  const src = tasks[nextTask.dupFromIndex];
                  a.targetX = src.x + src.w * 0.5;
                  a.targetY = src.y + src.h * 0.25;
                } else {
                  a.targetX = nextTask.x;
                  a.targetY = nextTask.y;
                }
                a.startX = a.x;
                a.startY = a.y;
                a.progress = 0;
                const dist = Math.hypot(a.targetX - a.startX, a.targetY - a.startY);
                a.duration = Math.min(0.48, Math.max(0.28, dist / 1200));
              }
            }
          }

          if (a.stage === "travel" && a.task) {
            activeBuilderCount++;
            if (a.task.isFixed) {
              if (a.task.kind === "dup" && a.task.dupFromIndex !== -1) {
                const src = tasks[a.task.dupFromIndex];
                a.targetX = src.x + src.w * 0.5;
                a.targetY = src.y + src.h * 0.25;
              } else {
                a.targetX = a.task.x;
                a.targetY = a.task.y;
              }
            }
            const travelDur = Math.max(0.12, a.duration / Math.max(0.8, 0.8 + (sp - 1) * 0.55));
            a.progress = Math.min(1, a.progress + rawDt / travelDur);
            const tEase = easeInOutCubic(a.progress);
            const dx = a.targetX - a.startX;
            const dy = a.targetY - a.startY;
            const dist = Math.hypot(dx, dy);
            const arcOffset =
              Math.min(32, dist * 0.08) *
              Math.sin(a.progress * Math.PI) *
              (i % 2 === 0 ? 1 : -1);
            const invDist = dist > 1 ? 1 / dist : 0;
            a.x = a.startX + dx * tEase + -dy * invDist * arcOffset;
            a.y = a.startY + dy * tEase + dx * invDist * arcOffset;

            if (a.progress >= 1) {
              a.x = a.targetX;
              a.y = a.targetY;
              a.vx = 0;
              a.vy = 0;
              startTaskAction(a, a.task);
            }
          } else if (a.stage === "act" && a.task) {
            activeBuilderCount++;
            const task = a.task;
            a.progress = Math.min(1, a.progress + dt / a.duration);
            const eased = easeInOutCubic(a.progress);

            if (task.kind === "box") {
              const cw = Math.max(8, task.w * eased);
              const ch = Math.max(8, task.h * eased);
              a.x = task.x + cw;
              a.y = task.y + ch;
              a.boxEl.style.width = `${cw.toFixed(1)}px`;
              a.boxEl.style.height = `${ch.toFixed(1)}px`;
              a.boxEl.style.transform = `translate3d(${task.x}px, ${task.y}px, 0)`;
              const rw = Math.round(cw);
              const rh = Math.round(ch);
              const sizeKey = rw * 10000 + rh;
              if (a.lastTypedLen !== sizeKey) {
                a.lastTypedLen = sizeKey;
                a.sizePillEl.textContent = `${rw} × ${rh}`;
              }
              a.sizePillEl.style.transform = `translate3d(${task.x + cw * 0.5}px, ${task.y + ch + 6}px, 0) translateX(-50%)`;
            } else if (task.kind === "dup") {
              const src = task.dupFromIndex !== -1 ? tasks[task.dupFromIndex] : task;
              const gx = src.x + (task.x - src.x) * eased;
              const gy = src.y + (task.y - src.y) * eased;
              a.dupGhostEl.style.transform = `translate3d(${gx}px, ${gy}px, 0)`;
              a.x = gx + task.w * 0.5;
              a.y = gy + task.h * 0.25;
            } else if (task.kind === "text") {
              const stepBucket = Math.floor(a.progress * 10);
              if (stepBucket !== a.lastTypedLen) {
                a.lastTypedLen = stepBucket;
                if (soundRef.current && stepBucket % 2 === 0) {
                  swarmAudio.playTypeTick();
                }
              }

              // Glide cursor smoothly across real formatted element edge
              const cursorGoalX =
                task.h > 48
                  ? task.x + task.w * (0.15 + 0.7 * (0.5 + 0.5 * Math.sin(a.progress * Math.PI * 2)))
                  : task.x + task.w * eased;
              const cursorGoalY =
                task.h > 48
                  ? task.y + task.h * eased
                  : task.y + task.h * 0.55;
              const smoothFollow = 1 - Math.exp(-18 * rawDt);
              a.x += (cursorGoalX - a.x) * smoothFollow;
              a.y += (cursorGoalY - a.y) * smoothFollow;
            } else if (task.kind === "media") {
              const sweepY = task.y + task.h * eased;
              a.scanLineEl.style.transform = `translate3d(${task.x}px, ${sweepY}px, 0)`;
              a.x = task.x + task.w * (0.2 + 0.6 * Math.sin(a.progress * Math.PI));
              a.y = sweepY;
            } else {
              // pen line
              const cw = Math.max(4, task.w * eased);
              a.boxEl.style.width = `${cw.toFixed(1)}px`;
              a.boxEl.style.transform = `translate3d(${task.x}px, ${task.y}px, 0)`;
              a.x = task.x + cw;
              a.y = task.y + task.h * 0.5;
            }

            if (a.progress >= 1) {
              completeTask(a, task, completedCountRef);
            }
          } else {
            // Idle cursor orbiting cleanly near current viewport focus
            a.orbitAngle += rawDt * 1.1;
            const idleTx = cachedRootWidth * 0.5 + Math.cos(a.orbitAngle + i) * 140;
            const idleTy = viewTop + cachedWinH * 0.45 + Math.sin(a.orbitAngle + i) * 60;
            const idleSmooth = 1 - Math.exp(-3.6 * rawDt);
            a.x += (idleTx - a.x) * idleSmooth;
            a.y += (idleTy - a.y) * idleSmooth;
          }
        } else {
          // LIVE MODE (or initial gather): Frame-rate-independent orbit smoothing around user's cursor
          a.orbitAngle += rawDt * (0.85 + (i % 3) * 0.2);
          const tx = pointerDocX + Math.cos(a.orbitAngle) * a.orbitRadius;
          const ty = pointerDocY + Math.sin(a.orbitAngle) * a.orbitRadius;
          const flockSmooth = 1 - Math.exp(-(6.5 - (i % 3) * 0.8) * rawDt);
          a.x += (tx - a.x) * flockSmooth;
          a.y += (ty - a.y) * flockSmooth;
        }

        a.cursorEl.style.transform = `translate3d(${a.x}px, ${a.y}px, 0)`;
      }

      // Tour Mode cinematic auto-scroll following frontier
      if (isBuilding && tourRef.current && earliestPendingY < Infinity) {
        const docFrontierY = cachedRootDocTop + earliestPendingY;
        const desiredScrollY = Math.max(
          0,
          Math.min(cachedMaxScrollY, docFrontierY - cachedWinH * 0.28)
        );
        const tourSmooth = 1 - Math.exp(-(1.4 + sp * 0.5) * rawDt);
        tourSmoothY += (desiredScrollY - tourSmoothY) * tourSmooth;
        window.scrollTo(0, tourSmoothY);
      }

      // Update HUD Progress directly in DOM (zero React re-renders during active RAF rebuild)
      if (isBuilding && tasks.length > 0) {
        const pct = Math.round((completedCountRef.count / tasks.length) * 100);
        if (hudBarRef.current) {
          hudBarRef.current.style.transform = `scaleX(${completedCountRef.count / tasks.length})`;
        }
        if (hudPctRef.current) {
          hudPctRef.current.textContent = `${pct}%`;
        }
        if (hudAgentsRef.current) {
          hudAgentsRef.current.textContent = `${activeBuilderCount}`;
        }
        if (hudScrollHintRef.current) {
          const waitingForScroll =
            isBuilding &&
            !tourRef.current &&
            activeBuilderCount === 0 &&
            completedCountRef.count < tasks.length;
          hudScrollHintRef.current.style.display = waitingForScroll ? "inline-flex" : "none";
        }

        if (completedCountRef.count >= tasks.length && !completionNotified) {
          completionNotified = true;
          lastHudPctRef.current = 100;
          setProgressDisplay(100);
          onProgressChange?.(100, 0);
          if (hudScrollHintRef.current) hudScrollHintRef.current.style.display = "none";
          restoreAllTasks();
          swarmAudio.playCompletionChord();
          onPhaseChange("live");
        }
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      if (resizeTimer) clearTimeout(resizeTimer);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onUserScroll);
      window.removeEventListener("wheel", cancelTourOnUserInput);
      window.removeEventListener("touchstart", cancelTourOnUserInput);
      restoreAllTasks();
      if (overlayEl) overlayEl.innerHTML = "";
      if (guideEl) guideEl.innerHTML = "";
    };
  }, [
    isEngineActive,
    runToken,
    autoScan,
    rootRef,
    onPhaseChange,
    onTourModeChange,
    onProgressChange,
    restoreAllTasks,
  ]);

  if (!mounted || phase === "idle") {
    return null;
  }

  return (
    <>
      {/* 1. Overlay inside root for cursors, boxes, corner handles, clones, typing */}
      <div
        ref={overlayRef}
        data-swarm-overlay="true"
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-50 overflow-visible"
      />

      {/* 3. Portaled Viewport Ruler Guides & Floating Swarm Rebuild HUD */}
      {typeof document !== "undefined" &&
        createPortal(
          <div data-swarm-ignore="true">
            <div
              ref={guideLayerRef}
              aria-hidden="true"
              className="pointer-events-none fixed inset-0 z-[999990]"
            />

            {hudHidden ? (
              <button
                onClick={() => setHudHidden(false)}
                className="fixed bottom-5 right-5 z-[999995] inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-slate-950/95 hover:bg-slate-900 border border-cyan-500/40 text-cyan-300 text-xs font-mono font-bold shadow-xl backdrop-blur-md cursor-pointer transition-transform hover:scale-105"
                title="Show Swarm HUD (H)"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>SWARM HUD (H)</span>
              </button>
            ) : (
              <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-[999995] w-[calc(100%-24px)] max-w-3xl pointer-events-auto">
                <div className="rounded-2xl bg-slate-950/95 border border-cyan-500/35 shadow-[0_20px_50px_rgba(0,0,0,0.65)] backdrop-blur-xl px-3.5 py-2.5 sm:px-4 sm:py-3 text-slate-100">
                  {/* Top progress track */}
                  <div className="w-full h-1 rounded-full bg-slate-800 overflow-hidden mb-2.5">
                    <div
                      ref={hudBarRef}
                      style={{
                        transform: `scaleX(${progressDisplay / 100})`,
                        transformOrigin: "left center",
                      }}
                      className="w-full h-full bg-gradient-to-r from-blue-500 via-cyan-400 to-emerald-400 will-change-transform"
                    />
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-2">
                    {/* Status */}
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-cyan-500/15 border border-cyan-400/40 text-cyan-300 text-[11px] font-mono font-bold">
                        {phase === "building" ? (
                          <Sparkles className="w-3 h-3 animate-spin" style={{ animationDuration: "3s" }} />
                        ) : (
                          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                        )}
                        <span>{phase === "building" ? "SWARM REBUILD" : "LIVE FLOCK"}</span>
                      </span>

                      <span className="text-[11px] font-mono text-slate-300">
                        <span ref={hudPctRef} className="font-bold text-white">
                          {progressDisplay}%
                        </span>{" "}
                        <span className="hidden sm:inline text-slate-400">
                          · <span ref={hudAgentsRef}>4</span> agents
                        </span>
                      </span>

                      <span
                        ref={hudScrollHintRef}
                        style={{ display: "none" }}
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-[10px] font-mono font-bold animate-pulse"
                      >
                        ↓ Cuộn chuột để dựng tiếp
                      </span>
                    </div>

                    {/* Controls */}
                    <div className="flex flex-wrap items-center gap-1.5">
                      {/* Speed 1x / 2x / 3x */}
                      <div className="inline-flex items-center rounded-lg bg-white/5 border border-white/10 p-0.5">
                        {([1, 2, 3] as SwarmSpeed[]).map((s) => (
                          <button
                            key={s}
                            onClick={() => onSpeedChange(s)}
                            className={`px-2 py-1 rounded-md text-[11px] font-mono font-bold transition-colors cursor-pointer ${
                              speed === s
                                ? "bg-cyan-500 text-slate-950"
                                : "text-slate-300 hover:text-white"
                            }`}
                            title={`Speed ${s}x (Key ${s})`}
                          >
                            {s}×
                          </button>
                        ))}
                      </div>

                      {/* Tour Mode */}
                      <button
                        onClick={() => onTourModeChange(!tourMode)}
                        className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] font-mono font-semibold border transition-colors cursor-pointer ${
                          tourMode
                            ? "bg-blue-500/25 border-blue-400/60 text-blue-200"
                            : "bg-white/5 border-white/10 text-slate-300 hover:bg-white/10"
                        }`}
                        title="Auto-Scroll Tour (T)"
                      >
                        <Compass className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Tour</span>
                      </button>

                      {/* Sound Toggle */}
                      <button
                        onClick={() => {
                          const next = !soundEnabled;
                          if (next) swarmAudio.unlock();
                          onSoundEnabledChange(next);
                        }}
                        className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] font-mono font-semibold border transition-colors cursor-pointer ${
                          soundEnabled
                            ? "bg-emerald-500/20 border-emerald-400/50 text-emerald-200"
                            : "bg-white/5 border-white/10 text-slate-400 hover:bg-white/10"
                        }`}
                        title="Toggle Web Audio Sound (M)"
                      >
                        {soundEnabled ? (
                          <Volume2 className="w-3.5 h-3.5" />
                        ) : (
                          <VolumeX className="w-3.5 h-3.5" />
                        )}
                      </button>

                      {/* Replay */}
                      <button
                        onClick={() => {
                          swarmAudio.unlock();
                          onReplay();
                        }}
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] font-mono font-semibold bg-white/5 hover:bg-white/15 border border-white/10 text-slate-200 transition-colors cursor-pointer"
                        title="Replay Rebuild (R)"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Replay</span>
                      </button>

                      {/* Go Live */}
                      {phase === "building" && (
                        <button
                          onClick={() => onPhaseChange("live")}
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] font-mono font-bold bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-sm cursor-pointer hover:brightness-110"
                          title="Finish & Go Live (L)"
                        >
                          <Zap className="w-3.5 h-3.5" />
                          <span>Go Live</span>
                        </button>
                      )}

                      {/* Hide HUD */}
                      <button
                        onClick={() => setHudHidden(true)}
                        className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 cursor-pointer"
                        title="Hide HUD for Clean Capture (H)"
                      >
                        <EyeOff className="w-3.5 h-3.5" />
                      </button>

                      {/* Exit */}
                      <button
                        onClick={() => onPhaseChange("idle")}
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] font-mono font-bold bg-rose-500/20 hover:bg-rose-500/35 border border-rose-500/40 text-rose-200 transition-colors cursor-pointer"
                        title="Exit Swarm Rebuild (Esc)"
                      >
                        <X className="w-3.5 h-3.5" />
                        <span className="hidden md:inline">Esc</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>,
          document.body
        )}
    </>
  );
}

// ── Standalone Swarm Flock Cursor Mode (for normal browsing inside /lab) ──
export function SwarmFlockCursors({ active }: { active: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!active || !mounted) return;
    const container = containerRef.current;
    if (!container) return;

    container.innerHTML = "";
    const flockAgents = BUILDER_ROSTER.slice(0, 5).map((profile, idx) => {
      const el = document.createElement("div");
      el.style.cssText =
        "position:fixed;top:0;left:0;pointer-events:none;will-change:transform;opacity:0;";
      const svg = createPointerSvg(profile.color);
      const pill = document.createElement("span");
      pill.textContent = profile.name;
      pill.style.cssText = `display:inline-block;margin-left:14px;margin-top:2px;padding:1px 7px;border-radius:9999px;background:${profile.color};color:${profile.textColor};font-family:ui-monospace,monospace;font-size:10px;font-weight:700;box-shadow:0 3px 10px rgba(0,0,0,0.35);border:1px solid rgba(255,255,255,0.28);`;
      el.appendChild(svg);
      el.appendChild(pill);
      container.appendChild(el);

      return {
        el,
        x: window.innerWidth * 0.5,
        y: window.innerHeight * 0.4,
        vx: 0,
        vy: 0,
        angle: (idx / 5) * Math.PI * 2,
        radius: 38 + idx * 14,
      };
    });

    let mx = window.innerWidth * 0.5;
    let my = window.innerHeight * 0.42;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    let rafId: number | null = null;
    let lastTs = 0;

    const loop = (ts: number) => {
      if (lastTs === 0) lastTs = ts;
      const dt = Math.min(0.05, (ts - lastTs) / 1000);
      lastTs = ts;

      for (let i = 0; i < flockAgents.length; i++) {
        const a = flockAgents[i];
        a.angle += dt * (1.1 + i * 0.2);
        const tx = mx + Math.cos(a.angle) * a.radius;
        const ty = my + Math.sin(a.angle) * a.radius;
        const smooth = 1 - Math.exp(-(9 - i * 0.7) * dt);
        a.x += (tx - a.x) * smooth;
        a.y += (ty - a.y) * smooth;
        a.el.style.opacity = "1";
        a.el.style.transform = `translate3d(${a.x}px, ${a.y}px, 0)`;
      }

      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      if (rafId !== null) cancelAnimationFrame(rafId);
      container.innerHTML = "";
    };
  }, [active, mounted]);

  if (!mounted || !active || typeof document === "undefined") return null;

  return createPortal(
    <div
      ref={containerRef}
      data-swarm-ignore="true"
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-[999994]"
    />,
    document.body
  );
}

// Re-export Play icon cleanly if needed by callers
export { Play as SwarmPlayIcon };
