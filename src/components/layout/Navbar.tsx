"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
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

  const NAV_SECTIONS = [
    { id: "hero",     name: t(T.nav.home) },
    { id: "about",    name: t(T.nav.about) },
    { id: "teams",    name: t(T.nav.teams) },
    { id: "projects", name: t(T.nav.projects) },
    { id: "join",     name: t(T.nav.join) },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
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
          "fixed top-0 left-0 right-0 z-40 transition-all duration-500",
          isScrolled
            ? "bg-white/80 dark:bg-[#080c14]/85 backdrop-blur-xl border-b border-slate-200/60 dark:border-slate-800/60 py-3"
            : "bg-transparent py-4"
        )}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Left: hamburger + logo */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsTocOpen(true)}
                className="p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/40 transition-all cursor-pointer"
                aria-label={t(T.nav.toc)}
              >
                <Menu className="w-5 h-5" />
              </button>

              <Link
                href="#hero"
                onClick={(e) => { e.preventDefault(); scrollToSection("hero"); }}
                className="flex items-center gap-2 group focus-visible:outline-none"
              >
                <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-white text-[10px] font-bold tracking-tight group-hover:bg-blue-700 transition-colors">
                  ST
                </div>
                <div className="flex flex-col">
                  <span className="text-[11px] font-bold tracking-widest uppercase text-slate-400 dark:text-slate-500 leading-none">{t(T.nav.clubName)}</span>
                  <span className="text-sm font-bold text-slate-900 dark:text-white leading-tight">STIC</span>
                </div>
              </Link>
            </div>

            {/* Center nav — desktop */}
            <nav className="hidden lg:flex items-center gap-1">
              {NAV_SECTIONS.map((sec) => {
                const isActive = activeSection === sec.id;
                return (
                  <button
                    key={sec.id}
                    onClick={() => scrollToSection(sec.id)}
                    className={cn(
                      "relative px-4 py-1.5 text-xs font-medium rounded-full transition-all duration-200 cursor-pointer",
                      isActive
                        ? "text-blue-600 dark:text-blue-400"
                        : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
                    )}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 bg-blue-50 dark:bg-blue-950/50 rounded-full border border-blue-200/60 dark:border-blue-800/60"
                        transition={{ type: "spring", stiffness: 400, damping: 35 }}
                      />
                    )}
                    <span className="relative">{sec.name}</span>
                  </button>
                );
              })}
            </nav>

            {/* Right: lang + theme + CTA */}
            <div className="flex items-center gap-1.5">
              <LangToggle />
              <ThemeToggle />
              <button
                onClick={() => scrollToSection("join")}
                className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition-colors cursor-pointer"
              >
                {t(T.nav.apply)}
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
