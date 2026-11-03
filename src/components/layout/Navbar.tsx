"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { cn, smoothScrollTo } from "@/lib/utils";
import { ThemeToggle } from "@/components/common/ThemeToggle";
import { LangToggle } from "@/components/common/LangToggle";
import { useLang } from "@/context/LangContext";
import { translations as T } from "@/lib/i18n";
import { CLUB_INFO } from "@/lib/data";
import { ExternalLink, ArrowRight, ArrowDown, Sparkles, Menu } from "lucide-react";
import { TableOfContentsDrawer } from "./TableOfContentsDrawer";

export function Navbar() {
  const { t, lang } = useLang();
  const pathname = usePathname();
  const isJoin = pathname === "/join";

  const [activeSection, setActiveSection] = useState(isJoin ? "join" : "hero");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);

  // Define nav items based on whether user is on the home page or the /join page
  const NAV_ITEMS = useMemo(() => {
    if (isJoin) {
      return [
        { id: "hero", href: "/", name: t(T.nav.home), isAnchor: false },
        { id: "about", href: "/#about", name: t(T.nav.about), isAnchor: false },
        { id: "teams", href: "/#teams", name: t(T.nav.teams), isAnchor: false },
        { id: "projects", href: "/#projects", name: t(T.nav.projects), isAnchor: false },
        {
          id: "join",
          href: "#application-form",
          name: lang === "vi" ? "Đơn ứng tuyển" : "Application",
          isAnchor: true,
        },
      ];
    }
    return [
      { id: "hero", href: "#hero", name: t(T.nav.home), isAnchor: true },
      { id: "about", href: "#about", name: t(T.nav.about), isAnchor: true },
      { id: "teams", href: "#teams", name: t(T.nav.teams), isAnchor: true },
      { id: "projects", href: "#projects", name: t(T.nav.projects), isAnchor: true },
    ];
  }, [isJoin, t, lang]);

  useEffect(() => {
    if (isJoin) {
      setActiveSection("join");
      const handleScroll = () => {
        setIsScrolled(window.scrollY > 20);
      };
      window.addEventListener("scroll", handleScroll, { passive: true });
      return () => window.removeEventListener("scroll", handleScroll);
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      const scrollPosition = window.scrollY + 160;
      for (const item of NAV_ITEMS) {
        if (!item.isAnchor) continue;
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(item.id);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isJoin, NAV_ITEMS]);

  const scrollToSection = (sectionId: string) => {
    smoothScrollTo(sectionId);
  };

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "fixed top-0 left-0 right-0 z-40 transition-all duration-300 px-3 sm:px-6",
        isScrolled ? "py-2.5 sm:py-3" : "py-3.5 sm:py-4"
      )}
    >
      {/* High-Contrast Liquid Glass Pill: Nền kính mờ khúc xạ sang trọng + chữ đen tương phản cao */}
      <div
        className={cn(
          "max-w-6xl mx-auto px-3 sm:px-6 transition-all duration-300 rounded-full",
          "bg-white/90 dark:bg-[#0c121e]/90 max-md:backdrop-blur-sm md:backdrop-blur-2xl md:backdrop-saturate-[190%]",
          "border border-white/90 dark:border-white/15",
          "shadow-[0_4px_16px_rgba(15,23,42,0.06),inset_0_1px_1.5px_rgba(255,255,255,0.95)] md:shadow-[0_8px_30px_rgba(15,23,42,0.08),inset_0_1px_1.5px_rgba(255,255,255,0.95),inset_0_-1px_1px_rgba(0,0,0,0.03)]",
          "dark:shadow-[0_8px_24px_rgba(0,0,0,0.4)] md:dark:shadow-[0_16px_40px_rgba(0,0,0,0.6),inset_0_1px_1.5px_rgba(255,255,255,0.2)]",
          isScrolled ? "py-1.5 sm:py-2" : "py-2 sm:py-2.5"
        )}
      >
        <div className="flex items-center justify-between">
          {/* Left: Official STIC Logo & Name */}
          <Link
            href={isJoin ? "/" : "#hero"}
            onClick={(e) => {
              if (!isJoin) {
                e.preventDefault();
                scrollToSection("hero");
              }
            }}
            className="flex items-center gap-2.5 group focus-visible:outline-none select-none shrink-0"
            title={isJoin ? (lang === "vi" ? "Về trang chủ" : "Back to Home") : "STIC"}
          >
            {/* Official STIC Circular Emblem */}
            <div className="relative w-9 h-9 rounded-full overflow-hidden group-hover:scale-105 transition-transform shadow-xs">
              <Image
                src="/logo.png"
                alt="STIC Logo"
                width={36}
                height={36}
                className="w-full h-full object-contain"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-extrabold tracking-widest uppercase text-slate-800 dark:text-slate-300 leading-none">
                {t(T.nav.clubName)}
              </span>
              <span className="text-sm font-black text-slate-950 dark:text-white leading-tight">
                STIC
              </span>
            </div>
          </Link>

          {/* Center nav — desktop: Chữ đen nền kính tương phản cao tuyệt đối */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;

              if (!item.isAnchor) {
                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    className={cn(
                      "relative px-4 py-1.5 text-xs font-bold rounded-full transition-all duration-200 cursor-pointer select-none",
                      isActive
                        ? "text-blue-600 dark:text-blue-400 font-extrabold"
                        : "text-slate-950 dark:text-slate-100 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-white/60 dark:hover:bg-white/10"
                    )}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 bg-white/90 dark:bg-white/15 border border-slate-200/90 dark:border-white/20 rounded-full shadow-sm"
                        transition={{ type: "spring", stiffness: 450, damping: 35 }}
                      />
                    )}
                    <span className="relative">{item.name}</span>
                  </Link>
                );
              }

              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id === "join" ? "application-form" : item.id)}
                  className={cn(
                    "relative px-4 py-1.5 text-xs font-bold rounded-full transition-all duration-200 cursor-pointer select-none",
                    isActive
                      ? "text-blue-600 dark:text-blue-400 font-extrabold"
                      : "text-slate-950 dark:text-slate-100 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-white/60 dark:hover:bg-white/10"
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 bg-white/90 dark:bg-white/15 border border-slate-200/90 dark:border-white/20 rounded-full shadow-sm"
                      transition={{ type: "spring", stiffness: 450, damping: 35 }}
                    />
                  )}
                  <span className="relative">{item.name}</span>
                </button>
              );
            })}
          </nav>

          {/* Right: lang + theme + CTA + Mobile Menu Button */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <LangToggle />
            <ThemeToggle />
            {isJoin ? (
              <button
                onClick={() => scrollToSection("application-form")}
                title={lang === "vi" ? "Cuộn nhanh xuống đơn ứng tuyển" : "Jump to application form"}
                className="hidden sm:inline-flex items-center justify-center gap-1.5 px-3.5 sm:px-4.5 py-2 rounded-full text-white text-xs font-bold leading-none shadow-md shadow-indigo-500/20 hover:scale-[1.03] transition-all cursor-pointer select-none gradient-btn-join"
              >
                <Sparkles className="w-3.5 h-3.5 shrink-0 text-white" />
                <span className="leading-none pt-px">{lang === "vi" ? "Điền đơn" : "Apply"}</span>
                <ArrowDown className="w-3.5 h-3.5 shrink-0 text-white/90" />
              </button>
            ) : (
              <Link
                href="/join"
                className="hidden sm:inline-flex items-center justify-center gap-1.5 px-3.5 sm:px-4.5 py-2 rounded-full text-white text-xs font-bold leading-none shadow-md shadow-indigo-500/20 hover:scale-[1.03] transition-all cursor-pointer select-none gradient-btn-home"
              >
                <Sparkles className="w-3.5 h-3.5 shrink-0 text-white" />
                <span className="leading-none pt-px">{t(T.nav.apply)}</span>
                <ArrowRight className="w-3.5 h-3.5 shrink-0 text-white/90" />
              </Link>
            )}

            {/* Mobile Drawer Menu Toggle (Version Điện thoại nhẹ & tiện lợi) */}
            <button
              onClick={() => setIsMobileDrawerOpen(true)}
              className="md:hidden inline-flex items-center justify-center w-8 h-8 rounded-full bg-slate-100/80 dark:bg-white/10 text-slate-800 dark:text-slate-200 hover:bg-slate-200/80 dark:hover:bg-white/20 transition-colors cursor-pointer select-none"
              aria-label="Mở menu danh mục"
            >
              <Menu className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Lightweight Drawer dành riêng cho Mobile */}
      <TableOfContentsDrawer
        isOpen={isMobileDrawerOpen}
        onClose={() => setIsMobileDrawerOpen(false)}
        onNavigate={(id) => {
          setIsMobileDrawerOpen(false);
          scrollToSection(id);
        }}
      />
    </motion.header>
  );
}
