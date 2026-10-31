"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-6xl font-bold text-slate-900 dark:text-white">404</h1>
      <p className="mt-3 text-slate-600 dark:text-slate-400">Trang này không tồn tại.</p>
      <Link
        href="/"
        className="mt-6 px-6 py-2.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm transition-colors"
      >
        Về trang chủ
      </Link>
    </div>
  );
}

