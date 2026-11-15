"use client";

import React, { useEffect, useRef } from "react";

interface StarParticle {
  x: number;
  y: number;
  size: number;
  alpha: number;
  alphaSpeed: number;
  colorIndex: number;
  isSparkle: boolean;
  vx: number;
  vy: number;
  rotation: number;
  rotSpeed: number;
}

const STAR_COLORS = [
  "#ffffff", // Diamond White
  "#93c5fd", // Soft Ice Blue
  "#60a5fa", // Electric Cyan Blue
  "#38bdf8", // Sky Glow
  "#c084fc", // Lavender Violet
  "#fef08a", // Golden Starlight
];

const DOT_SPRITE_SIZE = 24;
const SPARKLE_SPRITE_SIZE = 48;
const FRAME_INTERVAL_MS = 22; // ~45 FPS cap to keep 120Hz/144Hz displays light

function createDotSprite(color: string): HTMLCanvasElement {
  const sprite = document.createElement("canvas");
  sprite.width = DOT_SPRITE_SIZE;
  sprite.height = DOT_SPRITE_SIZE;
  const sctx = sprite.getContext("2d");
  if (!sctx) return sprite;

  const half = DOT_SPRITE_SIZE / 2;
  const grad = sctx.createRadialGradient(half, half, 0.5, half, half, half);
  grad.addColorStop(0, "#ffffff");
  grad.addColorStop(0.28, color);
  grad.addColorStop(0.6, `${color}55`);
  grad.addColorStop(1, "rgba(0,0,0,0)");

  sctx.fillStyle = grad;
  sctx.beginPath();
  sctx.arc(half, half, half, 0, Math.PI * 2);
  sctx.fill();

  return sprite;
}

function createSparkleSprite(color: string): HTMLCanvasElement {
  const sprite = document.createElement("canvas");
  sprite.width = SPARKLE_SPRITE_SIZE;
  sprite.height = SPARKLE_SPRITE_SIZE;
  const sctx = sprite.getContext("2d");
  if (!sctx) return sprite;

  const half = SPARKLE_SPRITE_SIZE / 2;

  // Soft pre-baked glow aura (replaces expensive runtime ctx.shadowBlur)
  const aura = sctx.createRadialGradient(half, half, 1, half, half, half * 0.9);
  aura.addColorStop(0, `${color}99`);
  aura.addColorStop(0.45, `${color}33`);
  aura.addColorStop(1, "rgba(0,0,0,0)");
  sctx.fillStyle = aura;
  sctx.beginPath();
  sctx.arc(half, half, half * 0.9, 0, Math.PI * 2);
  sctx.fill();

  // 4-point sparkle star shape
  sctx.save();
  sctx.translate(half, half);
  sctx.fillStyle = color;
  sctx.beginPath();
  const spikes = 4;
  const outerRadius = half * 0.78;
  const innerRadius = half * 0.13;
  for (let i = 0; i < spikes * 2; i++) {
    const radius = i % 2 === 0 ? outerRadius : innerRadius;
    const angle = (i * Math.PI) / spikes;
    if (i === 0) {
      sctx.moveTo(Math.cos(angle) * radius, Math.sin(angle) * radius);
    } else {
      sctx.lineTo(Math.cos(angle) * radius, Math.sin(angle) * radius);
    }
  }
  sctx.closePath();
  sctx.fill();

  // Bright diamond core
  sctx.beginPath();
  sctx.arc(0, 0, half * 0.14, 0, Math.PI * 2);
  sctx.fillStyle = "#ffffff";
  sctx.fill();
  sctx.restore();

  return sprite;
}

export function ParticleBackground({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId: number | null = null;
    let resizeTimeoutId: ReturnType<typeof setTimeout> | null = null;
    let pauseTimerId: ReturnType<typeof setTimeout> | null = null;
    let lastFrameTime = 0;
    let isPaused = document.hidden;

    const isMobile = window.innerWidth < 768;
    const count = isMobile ? 22 : 60;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let width = canvas.parentElement?.clientWidth || window.innerWidth;
    let height = canvas.parentElement?.clientHeight || window.innerHeight;

    const applyCanvasSize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.parentElement.clientWidth || window.innerWidth;
      height = canvas.parentElement.clientHeight || window.innerHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const handleResize = () => {
      if (resizeTimeoutId) clearTimeout(resizeTimeoutId);
      resizeTimeoutId = setTimeout(applyCanvasSize, 150);
    };

    applyCanvasSize();
    window.addEventListener("resize", handleResize, { passive: true });

    // Pre-bake offscreen sprites once per color (0 shadowBlur calls during animation)
    const dotSprites = STAR_COLORS.map(createDotSprite);
    const sparkleSprites = STAR_COLORS.map(createSparkleSprite);

    const particles: StarParticle[] = Array.from({ length: count }, (_, i) => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2.2 + 1.1,
      alpha: Math.random() * 0.7 + 0.25,
      alphaSpeed: (Math.random() * 0.016 + 0.006) * (Math.random() > 0.5 ? 1 : -1),
      colorIndex: i === 0 || Math.random() < 0.25 ? 0 : Math.floor(Math.random() * STAR_COLORS.length),
      isSparkle: i % 3 === 0,
      vx: (Math.random() - 0.5) * 0.22,
      vy: (Math.random() - 0.5) * 0.22,
      rotation: Math.random() * Math.PI,
      rotSpeed: (Math.random() - 0.5) * 0.01,
    }));

    const animate = (timestamp: number) => {
      if (isPaused) {
        animationFrameId = null;
        return;
      }

      if (document.documentElement.classList.contains("swarm-rebuilding")) {
        lastFrameTime = 0;
        pauseTimerId = setTimeout(() => {
          pauseTimerId = null;
          if (!isPaused) animationFrameId = requestAnimationFrame(animate);
        }, 250);
        return;
      }

      if (lastFrameTime !== 0 && timestamp - lastFrameTime < FRAME_INTERVAL_MS) {
        animationFrameId = requestAnimationFrame(animate);
        return;
      }
      lastFrameTime = timestamp;

      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.x += p.vx;
        p.y += p.vy;
        p.alpha += p.alphaSpeed;
        p.rotation += p.rotSpeed;

        if (p.alpha > 0.95 || p.alpha < 0.2) {
          p.alphaSpeed *= -1;
        }

        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;
        if (p.y < -20) p.y = height + 20;
        if (p.y > height + 20) p.y = -20;

        ctx.globalAlpha = Math.max(0, Math.min(1, p.alpha));

        if (p.isSparkle) {
          const drawSize = p.size * 8.5;
          const halfDraw = drawSize * 0.5;
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rotation);
          ctx.drawImage(sparkleSprites[p.colorIndex], -halfDraw, -halfDraw, drawSize, drawSize);
          ctx.restore();
        } else {
          const drawSize = p.size * 4.2;
          const halfDraw = drawSize * 0.5;
          ctx.drawImage(dotSprites[p.colorIndex], p.x - halfDraw, p.y - halfDraw, drawSize, drawSize);
        }
      }

      ctx.globalAlpha = 1;
      animationFrameId = requestAnimationFrame(animate);
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        isPaused = true;
        if (pauseTimerId) {
          clearTimeout(pauseTimerId);
          pauseTimerId = null;
        }
        if (animationFrameId !== null) {
          cancelAnimationFrame(animationFrameId);
          animationFrameId = null;
        }
      } else {
        isPaused = false;
        lastFrameTime = 0;
        if (pauseTimerId) {
          clearTimeout(pauseTimerId);
          pauseTimerId = null;
        }
        if (animationFrameId === null) {
          animationFrameId = requestAnimationFrame(animate);
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    if (!isPaused) {
      animationFrameId = requestAnimationFrame(animate);
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      if (resizeTimeoutId) clearTimeout(resizeTimeoutId);
      if (pauseTimerId) clearTimeout(pauseTimerId);
      if (animationFrameId !== null) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none z-0 w-full h-full block ${className}`}
    />
  );
}
