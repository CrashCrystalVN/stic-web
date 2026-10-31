"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Đã có lỗi xảy ra!</h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{error.message}</p>
      <button
        onClick={() => reset()}
        className="mt-6 px-6 py-2.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm transition-colors"
      >
        Thử lại
      </button>
    </div>
  );
}

