"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Mail, Heart } from "lucide-react";
import { smoothScrollTo } from "@/lib/utils";
import { useLang } from "@/context/LangContext";
import { translations as T } from "@/lib/i18n";

export function Footer() {
  const { t } = useLang();
  const currentYear = new Date().getFullYear();

  const NAV_LINKS = [
    { id: "hero",     label: t(T.nav.home) },
    { id: "about",    label: t(T.nav.about) },
    { id: "teams",    label: t(T.nav.teams) },
    { id: "projects", label: t(T.nav.projects) },
    { id: "join",     label: t(T.nav.join) },
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
              <div className="relative w-8 h-8 rounded-full overflow-hidden liquid-glass-pill bg-white/95 dark:bg-white/90 flex items-center justify-center p-0.5 shadow-sm">
                <Image
                  src="/logo.png"
                  alt="STIC Logo"
                  width={32}
                  height={32}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <span className="text-sm font-bold text-slate-900 dark:text-white">CLB KHKT STIC</span>
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
                  href={`/#${link.id}`}
                  onClick={(e) => handleNav(e, link.id)}
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
              { role: t(T.footer.r1), name: "Lương Phú Hưng" },
              { role: t(T.footer.r2), name: "Lê Hoài An" },
              { role: t(T.footer.r3), name: "Trương Văn Đăng Huy" },
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
          <p>© {currentYear} CLB KHKT STIC · {t(T.footer.copy)}</p>
          <p className="flex items-center gap-1">
            Made with <Heart className="w-3 h-3 text-rose-400 fill-rose-400" /> {t(T.footer.made)}
          </p>
        </div>
      </div>
    </footer>
  );
}
