"use client";

import React, { useEffect, useRef } from "react";

interface StarParticle {
  x: number;
  y: number;
  size: number;
  alpha: number;
  alphaSpeed: number;
  color: string;
  isSparkle: boolean;
  vx: number;
  vy: number;
}

export function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    // Ethereal pastel palette: soft blue, sky cyan, soft lavender, white gold
    const colors = ["#93c5fd", "#60a5fa", "#38bdf8", "#a5b4fc", "#ffffff", "#fef08a"];
    const count = 55;
    const particles: StarParticle[] = [];

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    // Create dreamy sparkling particles
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2.5 + 1.2,
        alpha: Math.random() * 0.6 + 0.2,
        alphaSpeed: (Math.random() * 0.015 + 0.005) * (Math.random() > 0.5 ? 1 : -1),
        color: colors[Math.floor(Math.random() * colors.length)],
        isSparkle: i % 4 === 0, // Every 4th particle is a 4-point star sparkle
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
      });
    }

    // Draw 4-point star
    const drawStar = (x: number, y: number, r: number, color: string, alpha: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.globalAlpha = Math.max(0, Math.min(1, alpha));
      ctx.fillStyle = color;
      ctx.shadowBlur = 10;
      ctx.shadowColor = color;

      ctx.beginPath();
      // 4-point star sparkle
      for (let i = 0; i < 4; i++) {
        ctx.lineTo(Math.cos((i * Math.PI) / 2) * (r * 2.4), Math.sin((i * Math.PI) / 2) * (r * 2.4));
        ctx.lineTo(Math.cos((i * Math.PI) / 2 + Math.PI / 4) * (r * 0.6), Math.sin((i * Math.PI) / 2 + Math.PI / 4) * (r * 0.6));
      }
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.x += p.vx;
        p.y += p.vy;
        p.alpha += p.alphaSpeed;

        if (p.alpha > 0.85 || p.alpha < 0.15) {
          p.alphaSpeed *= -1;
        }

        // Loop boundaries
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;

        if (p.isSparkle) {
          drawStar(p.x, p.y, p.size, p.color, p.alpha);
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = Math.max(0, Math.min(1, p.alpha));
          ctx.shadowBlur = 8;
          ctx.shadowColor = p.color;
          ctx.fill();
        }
      }

      ctx.shadowBlur = 0;
      ctx.globalAlpha = 1;
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-0 w-full h-full opacity-80"
    />
  );
}
