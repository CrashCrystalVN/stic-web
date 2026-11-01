"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

const GOOGLE_FORM_EMBED_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSfEfAvIevbb0BFHFixLPn7TAy64tkk0lYzLv8ohGfm2EmizBw/viewform?embedded=true";

/**
 * FormPreloader:
 * Khi người dùng truy cập trang chủ (/) hoặc các trang khác (ngoài /join),
 * component này sẽ:
 * 1. Tự động prefetch bundle JavaScript của trang `/join`.
 * 2. Khi trình duyệt rảnh rỗi (idle), tự động tải trước toàn bộ HTML, CSS, Font và Scripts
 *    của Google Form vào bộ nhớ đệm HTTP của trình duyệt.
 * -> Nhờ đó, khi người dùng bấm vào nút ứng tuyển hoặc chuyển sang /join,
 *    Google Form sẽ hiển thị NGAY LẬP TỨC mà không phải chờ quay vòng tải.
 */
export function FormPreloader() {
  const pathname = usePathname();
  const router = useRouter();
  const [shouldPreload, setShouldPreload] = useState(false);

  useEffect(() => {
    // Nếu người dùng đã ở trang /join thì trang đó đã có form chính thức, không cần prefetch nữa
    if (pathname === "/join") return;

    // 1. Prefetch trang /join của Next.js
    try {
      router.prefetch("/join");
    } catch {
      // ignore prefetch errors
    }

    // 2. Tải trước Google Form sau khi trang chủ đã tải xong và CPU rảnh rỗi (idle)
    let timerId: NodeJS.Timeout | null = null;

    if (typeof window !== "undefined") {
      const schedulePreload = () => {
        timerId = setTimeout(() => {
          setShouldPreload(true);
        }, 1200);
      };

      if ("requestIdleCallback" in window) {
        (window as unknown as { requestIdleCallback: (fn: () => void) => void }).requestIdleCallback(
          schedulePreload
        );
      } else {
        schedulePreload();
      }
    }

    return () => {
      if (timerId) clearTimeout(timerId);
    };
  }, [pathname, router]);

  // Nếu đang ở /join hoặc chưa đến thời điểm idle, không render iframe ngầm
  if (!shouldPreload || pathname === "/join") {
    return null;
  }

  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        width: 1,
        height: 1,
        padding: 0,
        margin: -1,
        overflow: "hidden",
        clip: "rect(0, 0, 0, 0)",
        whiteSpace: "nowrap",
        border: 0,
        pointerEvents: "none",
        visibility: "hidden",
      }}
    >
      <iframe
        src={GOOGLE_FORM_EMBED_URL}
        title="Google Form Background Preloader"
        tabIndex={-1}
        loading="eager"
      />
    </div>
  );
}
