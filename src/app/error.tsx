"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const isChunkError = Boolean(
    error?.message &&
      /Loading chunk|ChunkLoadError|failed to fetch dynamically imported module/i.test(error.message)
  );

  useEffect(() => {
    console.error(error);
    // Tự động tải lại trang nếu phát hiện lỗi mismatch chunk do deploy mới
    if (isChunkError && typeof window !== "undefined") {
      const reloadKey = "stic_chunk_reload_guard";
      const lastReload = sessionStorage.getItem(reloadKey);
      const now = Date.now();
      if (!lastReload || now - parseInt(lastReload, 10) > 15000) {
        sessionStorage.setItem(reloadKey, now.toString());
        window.location.reload();
      }
    }
  }, [error, isChunkError]);

  const handleAction = () => {
    if (isChunkError && typeof window !== "undefined") {
      window.location.reload();
    } else {
      reset();
    }
  };

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-950/60 flex items-center justify-center mb-4 text-2xl">
        🔄
      </div>
      <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
        {isChunkError ? "Đã có bản cập nhật mới!" : "Đã có lỗi xảy ra!"}
      </h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 max-w-md">
        {isChunkError
          ? "Hệ thống vừa cập nhật phiên bản mới. Nhấn bên dưới để tải lại dữ liệu mới nhất."
          : error.message || "Đã xảy ra sự cố trong quá trình hiển thị trang."}
      </p>
      <button
        onClick={handleAction}
        className="mt-6 px-6 py-2.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm transition-colors shadow-sm"
      >
        {isChunkError ? "Tải lại trang ngay" : "Thử lại"}
      </button>
    </div>
  );
}
