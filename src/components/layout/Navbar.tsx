"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { cn, smoothScrollTo } from "@/lib/utils";
import { ThemeToggle } from "@/components/common/ThemeToggle";
import { LangToggle } from "@/components/common/LangToggle";
import { useLang } from "@/context/LangContext";
import { translations as T } from "@/lib/i18n";
import { ArrowRight, ArrowDown, Sparkles, Menu, Users, FlaskConical } from "lucide-react";
import { TableOfContentsDrawer } from "./TableOfContentsDrawer";

export function Navbar() {
  const { t, lang } = useLang();
  const pathname = usePathname();
  const isJoin = pathname === "/join";
  const isMember = pathname === "/member";
  const isLab = pathname === "/lab";
  const isHome = pathname === "/";

  const [activeSection, setActiveSection] = useState(isHome ? "hero" : "");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);

  const isScrolledRef = useRef(false);
  const activeSectionRef = useRef(isHome ? "hero" : "");
  const sectionBoundsRef = useRef<Array<{ id: string; top: number; bottom: number }>>([]);
  const docHeightRef = useRef(0);

  // In-page section nav items (exclusive to home page scrolling)
  const NAV_ITEMS = useMemo(() => {
    if (!isHome) {
      return [
        { id: "hero", href: "/#hero", name: t(T.nav.home), isAnchor: false },
        { id: "about", href: "/#about", name: t(T.nav.about), isAnchor: false },
        { id: "teams", href: "/#teams", name: t(T.nav.teams), isAnchor: false },
        { id: "projects", href: "/#projects", name: t(T.nav.projects), isAnchor: false },
      ];
    }
    return [
      { id: "hero", href: "#hero", name: t(T.nav.home), isAnchor: true },
      { id: "about", href: "#about", name: t(T.nav.about), isAnchor: true },
      { id: "teams", href: "#teams", name: t(T.nav.teams), isAnchor: true },
      { id: "projects", href: "#projects", name: t(T.nav.projects), isAnchor: true },
    ];
  }, [isHome, t]);

  useEffect(() => {
    let rafId: number | null = null;
    let ticking = false;

    const updateSectionBounds = () => {
      if (!isHome) return;
      const bounds: Array<{ id: string; top: number; bottom: number }> = [];
      for (const item of NAV_ITEMS) {
        if (!item.isAnchor) continue;
        const el = document.getElementById(item.id);
        if (el) {
          bounds.push({
            id: item.id,
            top: el.offsetTop,
            bottom: el.offsetTop + el.offsetHeight,
          });
        }
      }
      sectionBoundsRef.current = bounds;
      docHeightRef.current = document.documentElement.scrollHeight;
    };

    const syncScrollState = () => {
      ticking = false;
      const scrollY = window.scrollY;
      const nextScrolled = scrollY > 20;

      if (nextScrolled !== isScrolledRef.current) {
        isScrolledRef.current = nextScrolled;
        setIsScrolled(nextScrolled);
      }

      if (!isHome) return;

      const totalHeight = docHeightRef.current || document.documentElement.scrollHeight;
      if (window.innerHeight + scrollY >= totalHeight - 60) {
        if (activeSectionRef.current !== "projects") {
          activeSectionRef.current = "projects";
          setActiveSection("projects");
        }
        return;
      }

      const scrollPosition = scrollY + 180;
      const bounds = sectionBoundsRef.current;
      for (let i = 0; i < bounds.length; i++) {
        const b = bounds[i];
        if (scrollPosition >= b.top && scrollPosition < b.bottom) {
          if (activeSectionRef.current !== b.id) {
            activeSectionRef.current = b.id;
            setActiveSection(b.id);
          }
          break;
        }
      }
    };

    const handleScroll = () => {
      if (!ticking) {
        ticking = true;
        rafId = requestAnimationFrame(syncScrollState);
      }
    };

    if (!isHome) {
      if (activeSectionRef.current !== "") {
        activeSectionRef.current = "";
        setActiveSection("");
      }
      syncScrollState();
      window.addEventListener("scroll", handleScroll, { passive: true });
      return () => {
        window.removeEventListener("scroll", handleScroll);
        if (rafId !== null) cancelAnimationFrame(rafId);
      };
    }

    updateSectionBounds();
    syncScrollState();

    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(updateSectionBounds);
      resizeObserver.observe(document.body);
    }

    window.addEventListener("resize", updateSectionBounds, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("resize", updateSectionBounds);
      window.removeEventListener("scroll", handleScroll);
      if (resizeObserver) resizeObserver.disconnect();
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [isHome, NAV_ITEMS]);

  const scrollToSection = (sectionId: string) => {
    smoothScrollTo(sectionId);
  };

  return (
    <motion.header
      initial={{ y: -12 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "fixed top-0 left-0 right-0 z-40 transition-all duration-300 px-3 sm:px-6",
        isScrolled ? "py-2.5 sm:py-3" : "py-3.5 sm:py-4"
      )}
    >
      {/* High-Contrast Liquid Glass Pill: Nền kính mờ khúc xạ sang trọng + chữ đen tương phản cao */}
      <div
        data-swarm-atomic="true"
        className={cn(
          "max-w-6xl mx-auto px-3 sm:px-4 lg:px-5 transition-all duration-300 rounded-full",
          "bg-white/95 dark:bg-[#0c121e]/95 max-md:backdrop-blur-none md:backdrop-blur-md md:backdrop-saturate-[160%]",
          "border border-white/90 dark:border-white/15",
          "shadow-[0_4px_16px_rgba(15,23,42,0.06),inset_0_1px_1.5px_rgba(255,255,255,0.95)] md:shadow-[0_8px_30px_rgba(15,23,42,0.08),inset_0_1px_1.5px_rgba(255,255,255,0.95),inset_0_-1px_1px_rgba(0,0,0,0.03)]",
          "dark:shadow-[0_8px_24px_rgba(0,0,0,0.4)] md:dark:shadow-[0_16px_40px_rgba(0,0,0,0.6),inset_0_1px_1.5px_rgba(255,255,255,0.2)]",
          isScrolled ? "py-1.5 sm:py-2" : "py-2 sm:py-2.5"
        )}
      >
        <div className="flex items-center justify-between gap-2">
          {/* Left: Official STIC Logo & Name */}
          <Link
            href={isHome ? "#hero" : "/"}
            data-swarm-atomic="true"
            onClick={(e) => {
              if (isHome) {
                e.preventDefault();
                scrollToSection("hero");
              }
            }}
            className="flex items-center gap-2.5 group focus-visible:outline-none select-none shrink-0"
            title={!isHome ? (lang === "vi" ? "Về trang chủ" : "Back to Home") : "STIC"}
          >
            {/* Official STIC Circular Emblem */}
            <div className="relative w-9 h-9 rounded-full overflow-hidden group-hover:scale-105 transition-transform shadow-xs">
              <Image
                src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/logo.png`}
                alt="STIC Logo"
                width={36}
                height={36}
                className="w-full h-full object-contain"
                priority
              />
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-[10px] font-extrabold tracking-widest uppercase text-slate-800 dark:text-slate-300 leading-none">
                {t(T.nav.clubName)}
              </span>
              <span className="text-sm font-black text-slate-950 dark:text-white leading-tight">
                STIC
              </span>
            </div>
          </Link>

          {/* Center nav — desktop: Chữ đen nền kính tương phản cao tuyệt đối */}
          <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1 min-w-0">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;

              if (!item.isAnchor) {
                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    className={cn(
                      "relative px-3 xl:px-4 py-1.5 text-xs font-bold whitespace-nowrap rounded-full transition-all duration-200 cursor-pointer select-none",
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
                    "relative px-3 xl:px-4 py-1.5 text-xs font-bold whitespace-nowrap rounded-full transition-all duration-200 cursor-pointer select-none",
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

          {/* Right: lang + theme + Thành viên + CTA + Mobile Menu Button */}
          <div className="flex items-center gap-1 sm:gap-1.5 xl:gap-2 shrink-0">
            <LangToggle />
            <ThemeToggle />

            {/* Swarm Rebuild / Lab Link */}
            <Link
              href="/lab"
              title={lang === "vi" ? "Mở STIC Lab & Swarm Rebuild" : "Open STIC Lab & Swarm Rebuild"}
              className={cn(
                "hidden sm:inline-flex items-center justify-center gap-1.5 px-2.5 xl:px-3 py-2 rounded-full text-xs font-bold leading-none whitespace-nowrap transition-all cursor-pointer select-none",
                isLab
                  ? "bg-cyan-600 dark:bg-cyan-500 text-white shadow-md shadow-cyan-500/25 border border-cyan-500/30"
                  : "bg-slate-100/90 dark:bg-white/10 text-slate-800 dark:text-slate-200 hover:text-cyan-600 dark:hover:text-cyan-300 hover:bg-slate-200/90 dark:hover:bg-white/15 border border-slate-200/90 dark:border-white/10 hover:scale-[1.03]"
              )}
            >
              <FlaskConical className="w-3.5 h-3.5 shrink-0" />
              <span className="leading-none pt-px">Lab</span>
            </Link>

            {/* Thành viên (Members) Page Link - Styled as a distinct route pill, just like apply */}
            <Link
              href="/member"
              title={lang === "vi" ? "Xem danh sách thành viên & Ban chủ nhiệm" : "View members & leadership"}
              className={cn(
                "hidden sm:inline-flex items-center justify-center gap-1.5 px-2.5 xl:px-3.5 py-2 rounded-full text-xs font-bold leading-none whitespace-nowrap transition-all cursor-pointer select-none",
                isMember
                  ? "bg-blue-600 dark:bg-blue-500 text-white shadow-md shadow-blue-500/25 border border-blue-500/30"
                  : "bg-slate-100/90 dark:bg-white/10 text-slate-800 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-200/90 dark:hover:bg-white/15 border border-slate-200/90 dark:border-white/10 hover:scale-[1.03]"
              )}
            >
              <Users className="w-3.5 h-3.5 shrink-0" />
              <span className="leading-none pt-px">{t(T.nav.member)}</span>
            </Link>

            {isJoin ? (
              <button
                onClick={() => scrollToSection("application-form")}
                title={lang === "vi" ? "Cuộn nhanh xuống đơn ứng tuyển" : "Jump to application form"}
                className="hidden sm:inline-flex items-center justify-center gap-1.5 px-3 xl:px-4 py-2 rounded-full text-white text-xs font-bold leading-none whitespace-nowrap shadow-md shadow-indigo-500/20 hover:scale-[1.03] transition-all cursor-pointer select-none gradient-btn-join"
              >
                <Sparkles className="w-3.5 h-3.5 shrink-0 text-white" />
                <span className="leading-none pt-px">{lang === "vi" ? "Điền đơn" : "Apply"}</span>
                <ArrowDown className="w-3.5 h-3.5 shrink-0 text-white/90" />
              </button>
            ) : (
              <Link
                href="/join"
                className="hidden sm:inline-flex items-center justify-center gap-1.5 px-3 xl:px-4 py-2 rounded-full text-white text-xs font-bold leading-none whitespace-nowrap shadow-md shadow-indigo-500/20 hover:scale-[1.03] transition-all cursor-pointer select-none gradient-btn-home"
              >
                <Sparkles className="w-3.5 h-3.5 shrink-0 text-white" />
                <span className="leading-none pt-px">{t(T.nav.apply)}</span>
                <ArrowRight className="w-3.5 h-3.5 shrink-0 text-white/90" />
              </Link>
            )}

            {/* Mobile & Tablet Drawer Menu Toggle */}
            <button
              onClick={() => setIsMobileDrawerOpen(true)}
              className="lg:hidden inline-flex items-center justify-center w-8 h-8 rounded-full bg-slate-100/80 dark:bg-white/10 text-slate-800 dark:text-slate-200 hover:bg-slate-200/80 dark:hover:bg-white/20 transition-colors cursor-pointer select-none"
              aria-label={lang === "vi" ? "Mở menu danh mục" : "Open navigation menu"}
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
