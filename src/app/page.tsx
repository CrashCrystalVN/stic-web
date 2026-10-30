import React from "react";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { StatsSection } from "@/components/sections/StatsSection";
import { TeamsSection } from "@/components/sections/TeamsSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { EventsSection } from "@/components/sections/EventsSection";
import { JoinSection } from "@/components/sections/JoinSection";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
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

      {/* 6. Sự kiện tuyển quân */}
      <EventsSection />

      {/* 7. Đăng ký thành viên trực tiếp trên web */}
      <JoinSection />
    </div>
  );
}
