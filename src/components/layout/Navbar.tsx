"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Menu } from "lucide-react";
import { cn, smoothScrollTo } from "@/lib/utils";
import { ThemeToggle } from "@/components/common/ThemeToggle";
import { LangToggle } from "@/components/common/LangToggle";
import { TableOfContentsDrawer } from "@/components/layout/TableOfContentsDrawer";
import { useLang } from "@/context/LangContext";
import { translations as T } from "@/lib/i18n";

export function Navbar() {
  const { t } = useLang();
  const [activeSection, setActiveSection] = useState("hero");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isTocOpen, setIsTocOpen] = useState(false);

  const NAV_SECTIONS = useMemo(() => [
    { id: "hero",     name: t(T.nav.home) },
    { id: "about",    name: t(T.nav.about) },
    { id: "teams",    name: t(T.nav.teams) },
    { id: "projects", name: t(T.nav.projects) },
    { id: "join",     name: t(T.nav.join) },
  ], [t]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      const scrollPosition = window.scrollY + 160;
      for (const sec of NAV_SECTIONS) {
        const el = document.getElementById(sec.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sec.id);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [NAV_SECTIONS]);

  const scrollToSection = (sectionId: string) => {
    setIsTocOpen(false);
    smoothScrollTo(sectionId);
  };

  return (
    <>
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
            "max-w-6xl mx-auto px-4 sm:px-6 transition-all duration-300 rounded-full",
            "bg-white/80 dark:bg-[#0c121e]/80 backdrop-blur-2xl backdrop-saturate-[190%]",
            "border border-white/90 dark:border-white/15",
            "shadow-[0_8px_30px_rgba(15,23,42,0.08),inset_0_1px_1.5px_rgba(255,255,255,0.95),inset_0_-1px_1px_rgba(0,0,0,0.03)]",
            "dark:shadow-[0_16px_40px_rgba(0,0,0,0.6),inset_0_1px_1.5px_rgba(255,255,255,0.2)]",
            isScrolled ? "py-2" : "py-2.5"
          )}
        >
          <div className="flex items-center justify-between">
            {/* Left: hamburger + logo */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsTocOpen(true)}
                className="p-2 rounded-full text-slate-950 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 hover:bg-white/60 dark:hover:bg-white/10 transition-all cursor-pointer"
                aria-label={t(T.nav.toc)}
              >
                <Menu className="w-5 h-5 stroke-[2.2]" />
              </button>

              <Link
                href="#hero"
                onClick={(e) => { e.preventDefault(); scrollToSection("hero"); }}
                className="flex items-center gap-2.5 group focus-visible:outline-none"
              >
                {/* Official STIC Logo with glass refraction badge */}
                <div className="relative w-9 h-9 rounded-xl overflow-hidden bg-white/90 dark:bg-white/10 border border-white/80 dark:border-white/20 flex items-center justify-center p-0.5 group-hover:scale-105 transition-transform shadow-sm backdrop-blur-md">
                  <Image
                    src="/logo.png"
                    alt="STIC Logo"
                    width={36}
                    height={36}
                    className="w-full h-full object-contain rounded-lg"
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
            </div>

            {/* Center nav — desktop: Chữ đen nền kính tương phản cao tuyệt đối */}
            <nav className="hidden lg:flex items-center gap-1">
              {NAV_SECTIONS.map((sec) => {
                const isActive = activeSection === sec.id;
                return (
                  <button
                    key={sec.id}
                    onClick={() => scrollToSection(sec.id)}
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
                    <span className="relative">{sec.name}</span>
                  </button>
                );
              })}
            </nav>

            {/* Right: lang + theme + CTA */}
            <div className="flex items-center gap-2">
              <LangToggle />
              <ThemeToggle />
              <button
                onClick={() => scrollToSection("join")}
                className="hidden sm:inline-flex items-center gap-1.5 px-4.5 py-2 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:via-indigo-500 hover:to-purple-500 text-white text-xs font-semibold shadow-md shadow-indigo-500/20 hover:shadow-indigo-500/35 hover:scale-[1.03] transition-all cursor-pointer"
              >
                <span>✦</span>
                <span>{t(T.nav.apply)}</span>
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      <TableOfContentsDrawer
        isOpen={isTocOpen}
        onClose={() => setIsTocOpen(false)}
        onNavigate={scrollToSection}
      />
    </>
  );
}
