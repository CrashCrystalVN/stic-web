"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Image from "next/image";

interface ScrollScaleBannerProps {
  imageSrc?: string | null;
  videoSrc?: string | null;
  title?: string;
}

export function ScrollScaleBanner({
  imageSrc = "/banner.png",
  videoSrc = null,
  title = "STIC Ecosystem Showcase",
}: ScrollScaleBannerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Theo dõi trực tiếp vị trí cuộn scrollY của trang web
  const { scrollY } = useScroll();

  // Điểm cuộn mục tiêu để đạt kích thước 1.0 (khi banner nằm chính giữa màn hình)
  const [targetScroll, setTargetScroll] = useState(380);

  useEffect(() => {
    const updateTarget = () => {
      // Khi cuộn khoảng 35% - 40% chiều cao màn hình thì banner sẽ đạt cực đại
      setTargetScroll(Math.max(260, Math.min(window.innerHeight * 0.4, 420)));
    };
    updateTarget();
    window.addEventListener("resize", updateTarget);
    return () => window.removeEventListener("resize", updateTarget);
  }, []);

  // Lò xo theo dõi scrollY cực nhạy, phản hồi lập tức và mượt mà 60-120fps
  const smoothY = useSpring(scrollY, {
    stiffness: 120,
    damping: 22,
    restDelta: 0.5,
  });

  // ĐÚNG THỜI ĐIỂM:
  // - scroll = 0 (đang ở đầu trang): banner thu nhỏ 0.80, nghiêng 3D 14deg (dạng card preview)
  // - cuộn từ 0 -> targetScroll: banner phóng to lên 1.0, phẳng 0deg và tràn màn hình
  // - cuộn tiếp: giữ nguyên 1.0 để xem trọn vẹn
  const scale = useTransform(
    smoothY,
    [0, targetScroll, targetScroll + 400, targetScroll + 850],
    [0.80, 1.0, 1.0, 0.95]
  );

  const rotateX = useTransform(
    smoothY,
    [0, targetScroll],
    [14, 0]
  );

  const borderRadius = useTransform(
    smoothY,
    [0, targetScroll],
    [32, 18]
  );

  const translateY = useTransform(
    smoothY,
    [0, targetScroll],
    [25, 0]
  );

  return (
    <div
      ref={containerRef}
      className="relative w-full py-2 [perspective:1400px]"
    >
      {/* 1. Google Gemini Fluid Aurora Mesh Glow phía sau */}
      <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center overflow-visible">
        <div className="w-[90%] h-[360px] rounded-full bg-gradient-to-r from-blue-400/25 via-sky-400/20 to-indigo-500/20 blur-[100px]" />
      </div>

      {/* 2. Banner ẩn dưới nền blur đồng điệu theo khung: Lan tỏa quầng sáng ra ngoài mép kính */}
      <motion.div
        style={{
          scale,
          translateY,
          transformStyle: "preserve-3d",
          willChange: "transform",
        }}
        className="pointer-events-none absolute -inset-x-8 -inset-y-8 z-0 flex items-center justify-center overflow-visible"
      >
        <div className="relative w-full h-full rounded-[36px] overflow-hidden blur-2xl md:blur-3xl opacity-80 dark:opacity-60 scale-105">
          {imageSrc && (
            <Image
              src={imageSrc}
              alt="Blurred Banner Reflection"
              fill
              sizes="100vw"
              className="object-cover object-top saturate-150"
            />
          )}
        </div>
      </motion.div>

      {/* 3. KHUNG NGOÀI LIQUID GLASS (Nổi phía trên z-10) */}
      <motion.div
        style={{
          scale,
          rotateX,
          translateY,
          borderRadius,
          transformStyle: "preserve-3d",
          willChange: "transform",
        }}
        className="relative z-10 mx-auto w-full overflow-hidden liquid-glass shadow-2xl shadow-blue-500/10 dark:shadow-blue-500/5"
      >
        {/* Lớp gương bóng kính lỏng trên mặt khung */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-transparent pointer-events-none z-20" />
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/80 dark:via-white/30 to-transparent pointer-events-none z-20" />

        {/* Khung ảnh CĂN VỪA KHÍT 1 TRANG MÀN HÌNH (max-h: calc(100vh - 130px)) — Không bị lòi xuống đáy */}
        <div className="relative w-full h-[65vh] sm:h-[72vh] md:h-[78vh] lg:h-[80vh] max-h-[calc(100vh-130px)] min-h-[360px] bg-[#c8e0f8] dark:bg-slate-900 overflow-hidden flex items-center justify-center">
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
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1600px) 98vw, 1800px"
                className="object-cover object-top w-full h-full block"
              />
              {/* Ánh sáng phản chiếu kính lỏng */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-white/5 pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent pointer-events-none" />
            </div>
          ) : (
            <div className="relative w-full h-full flex items-center justify-center text-slate-400 dark:text-slate-600 text-sm font-medium">
              ✦ Banner Placeholder
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
