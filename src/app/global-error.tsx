"use client";

import { useEffect } from "react";

export default function GlobalError({
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
    // Tự động tải lại trang 1 lần nếu gặp lỗi không tìm thấy chunk do phiên bản mới được deploy
    if (isChunkError && typeof window !== "undefined") {
      const reloadKey = "stic_chunk_reload_guard";
      const lastReload = sessionStorage.getItem(reloadKey);
      const now = Date.now();
      if (!lastReload || now - parseInt(lastReload, 10) > 15000) {
        sessionStorage.setItem(reloadKey, now.toString());
        window.location.reload();
      }
    }
  }, [isChunkError]);

  const handleAction = () => {
    if (typeof window !== "undefined") {
      window.location.reload();
    } else {
      reset();
    }
  };

  return (
    <html lang="vi">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>STIC — Đã có bản cập nhật mới</title>
      </head>
      <body style={{ margin: 0, padding: 0, background: "#f8fafc", color: "#0f172a" }}>
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "40px 20px",
            textAlign: "center",
            fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
          }}
        >
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "50%",
              background: "#dbeafe",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "16px",
              fontSize: "24px",
            }}
          >
            🔄
          </div>
          <h2 style={{ fontSize: "1.5rem", fontWeight: "700", color: "#0f172a", margin: "0 0 8px 0" }}>
            {isChunkError ? "Đã có bản cập nhật mới!" : "Đã có lỗi xảy ra!"}
          </h2>
          <p
            style={{
              color: "#64748b",
              fontSize: "0.875rem",
              lineHeight: "1.5",
              maxWidth: "420px",
              margin: "0 auto 24px auto",
            }}
          >
            {isChunkError
              ? "Trang web vừa được cập nhật phiên bản mới. Nhấn nút bên dưới để tải lại dữ liệu mới nhất."
              : error.message || "Không thể tải tài nguyên trang web."}
          </p>
          <button
            onClick={handleAction}
            style={{
              padding: "12px 28px",
              borderRadius: "999px",
              background: "#2563eb",
              color: "#ffffff",
              border: "none",
              fontWeight: 600,
              cursor: "pointer",
              fontSize: "0.875rem",
              boxShadow: "0 4px 12px rgba(37, 99, 235, 0.25)",
              transition: "transform 0.15s ease",
            }}
          >
            {isChunkError ? "Tải lại trang ngay" : "Thử lại"}
          </button>
        </div>
      </body>
    </html>
  );
}
