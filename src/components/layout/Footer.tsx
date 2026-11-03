"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Mail, Heart } from "lucide-react";
import { smoothScrollTo } from "@/lib/utils";
import { useLang } from "@/context/LangContext";
import { translations as T } from "@/lib/i18n";
import { CLUB_INFO } from "@/lib/data";

export function Footer() {
  const { t } = useLang();
  const currentYear = new Date().getFullYear();

  const NAV_LINKS = [
    { id: "hero",     label: t(T.nav.home),     href: "/#hero" },
    { id: "about",    label: t(T.nav.about),    href: "/#about" },
    { id: "teams",    label: t(T.nav.teams),    href: "/#teams" },
    { id: "projects", label: t(T.nav.projects), href: "/#projects" },
    { id: "join",     label: t(T.nav.join),     href: "/join" },
  ];

  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    if (typeof window !== "undefined" && document.getElementById(targetId)) {
      e.preventDefault();
      smoothScrollTo(targetId);
    }
  };

  return (
    <footer className="bg-white dark:bg-[#080c14] border-t border-slate-100 dark:border-slate-900 py-12 transition-colors">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start justify-between gap-8">
          {/* Brand */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="relative w-8 h-8 rounded-full overflow-hidden shadow-xs shrink-0">
                <Image
                  src="/logo.png"
                  alt="STIC Logo"
                  width={32}
                  height={32}
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-sm font-bold text-slate-900 dark:text-white">
                {t({ vi: "CLB KHKT STIC", en: "STIC S&T Club" })}
              </span>
            </div>
            <p className="text-xs text-slate-400 dark:text-slate-500 max-w-xs leading-relaxed whitespace-pre-line">
              {t(T.footer.sub)}
            </p>
            <a href="mailto:clbstic@gmail.com" className="inline-flex items-center gap-1.5 text-xs text-blue-600 dark:text-blue-400 hover:underline">
              <Mail className="w-3.5 h-3.5" />
              clbstic@gmail.com
            </a>
          </div>

          {/* Nav */}
          <div className="space-y-2">
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-600 mb-3">
              {t(T.footer.nav)}
            </p>
            {NAV_LINKS.map((link) => (
              <div key={link.id}>
                <Link
                  href={link.href}
                  onClick={(e) => link.id !== "join" && handleNav(e, link.id)}
                  className="text-xs text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  {link.label}
                </Link>
              </div>
            ))}
          </div>

          {/* Leadership */}
          <div className="space-y-2">
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-600 mb-3">
              {t(T.footer.bcn)}
            </p>
            {[
              { role: t(T.footer.r1), name: t({ vi: "Lương Phú Hưng", en: "Luong Phu Hung" }) },
              { role: t(T.footer.r2), name: t({ vi: "Lê Hoài An", en: "Le Hoai An" }) },
              { role: t(T.footer.r3), name: t({ vi: "Trương Văn Đăng Huy", en: "Truong Van Dang Huy" }) },
            ].map((p) => (
              <div key={p.role}>
                <span className="text-[10px] text-slate-400 dark:text-slate-600">{p.role} · </span>
                <span className="text-xs text-slate-600 dark:text-slate-300 font-medium">{p.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 pt-6 border-t border-slate-100 dark:border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-400 dark:text-slate-600">
          <p>© {currentYear} {t({ vi: "CLB KHKT STIC", en: "STIC S&T Club" })} · {t(T.footer.copy)}</p>
          <p className="flex items-center gap-1">
            Made with <Heart className="w-3 h-3 text-rose-400 fill-rose-400" /> {t(T.footer.made)}
          </p>
        </div>
      </div>
    </footer>
  );
}
