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
  rotation: number;
  rotSpeed: number;
}

export function ParticleBackground({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    const isMobile = window.innerWidth < 768;
    const count = isMobile ? 26 : 70; // 26 sao mượt mà trên mobile, 70 sao lấp lánh trên desktop
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let width = canvas.parentElement?.clientWidth || window.innerWidth;
    let height = canvas.parentElement?.clientHeight || window.innerHeight;

    const resizeCanvas = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.parentElement.clientWidth || window.innerWidth;
      height = canvas.parentElement.clientHeight || window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Bảng màu sao vũ trụ: Trắng kim cương, Xanh thiên hà, Tím tinh vân, Vàng ánh kim
    const colors = [
      "#ffffff", // Diamond White
      "#ffffff", 
      "#93c5fd", // Soft Ice Blue
      "#60a5fa", // Electric Cyan Blue
      "#38bdf8", // Sky Glow
      "#c084fc", // Lavender Violet
      "#fef08a", // Golden Starlight
    ];

    const particles: StarParticle[] = [];

    // Khởi tạo các vì sao lấp lánh
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2.4 + 1.1,
        alpha: Math.random() * 0.7 + 0.25,
        alphaSpeed: (Math.random() * 0.016 + 0.006) * (Math.random() > 0.5 ? 1 : -1),
        color: colors[Math.floor(Math.random() * colors.length)],
        isSparkle: i % 3 === 0, // 1/3 số sao là ngôi sao 4 cánh lấp lánh rực rỡ
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18,
        rotation: Math.random() * Math.PI,
        rotSpeed: (Math.random() - 0.5) * 0.008,
      });
    }

    // Hàm vẽ ngôi sao 4 cánh lấp lánh (Gemini Star Sparkle)
    const drawSparkle = (
      x: number,
      y: number,
      r: number,
      color: string,
      alpha: number,
      rot: number
    ) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rot);
      ctx.globalAlpha = Math.max(0, Math.min(1, alpha));
      ctx.fillStyle = color;
      
      // Hào quang tỏa sáng (Glow aura)
      if (!isMobile) {
        ctx.shadowBlur = 12;
        ctx.shadowColor = color;
      }

      ctx.beginPath();
      // Vẽ 4 tia nhọn vươn xa
      const spikes = 4;
      const outerRadius = r * 2.8;
      const innerRadius = r * 0.45;
      for (let i = 0; i < spikes * 2; i++) {
        const radius = i % 2 === 0 ? outerRadius : innerRadius;
        const angle = (i * Math.PI) / spikes;
        ctx.lineTo(Math.cos(angle) * radius, Math.sin(angle) * radius);
      }
      ctx.closePath();
      ctx.fill();

      // Tâm điểm sáng trắng ở chính giữa ngôi sao
      ctx.beginPath();
      ctx.arc(0, 0, r * 0.5, 0, Math.PI * 2);
      ctx.fillStyle = "#ffffff";
      ctx.globalAlpha = Math.min(1, alpha + 0.3);
      ctx.fill();

      ctx.restore();
    };

    // Vòng lặp diễn hoạt 60-120fps
    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.x += p.vx;
        p.y += p.vy;
        p.alpha += p.alphaSpeed;
        p.rotation += p.rotSpeed;

        // Đảo chiều nhấp nháy sáng tối mượt mà
        if (p.alpha > 0.95 || p.alpha < 0.2) {
          p.alphaSpeed *= -1;
        }

        // Tự động xoay vòng khi trôi khỏi màn hình
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;
        if (p.y < -20) p.y = height + 20;
        if (p.y > height + 20) p.y = -20;

        if (p.isSparkle) {
          drawSparkle(p.x, p.y, p.size, p.color, p.alpha, p.rotation);
        } else {
          // Điểm sao tròn phát sáng
          ctx.save();
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = Math.max(0, Math.min(1, p.alpha));
          if (!isMobile) {
            ctx.shadowBlur = 8;
            ctx.shadowColor = p.color;
          }
          ctx.fill();
          ctx.restore();
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none z-0 w-full h-full block ${className}`}
    />
  );
}
