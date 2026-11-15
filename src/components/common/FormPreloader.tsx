"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

/**
 * FormPreloader:
 * Khi người dùng truy cập trang chủ (/) hoặc các trang khác (ngoài /join),
 * component này chỉ tự động prefetch bundle JavaScript của trang `/join` khi trình duyệt rảnh (idle)
 * để chuyển trang tức thì mà không tải ngầm iframe Google Form gây lag Main Thread.
 */
export function FormPreloader() {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (pathname === "/join" || typeof window === "undefined") return;

    let timerId: ReturnType<typeof setTimeout> | null = null;
    let idleId: number | null = null;

    const prefetchJoin = () => {
      timerId = setTimeout(() => {
        try {
          router.prefetch("/join");
        } catch {
          // ignore prefetch errors
        }
      }, 1000);
    };

    const win = window as unknown as {
      requestIdleCallback?: (fn: () => void, opts?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };

    if (typeof win.requestIdleCallback === "function") {
      idleId = win.requestIdleCallback(prefetchJoin, { timeout: 2500 });
    } else {
      prefetchJoin();
    }

    return () => {
      if (timerId) clearTimeout(timerId);
      if (idleId !== null && typeof win.cancelIdleCallback === "function") {
        win.cancelIdleCallback(idleId);
      }
    };
  }, [pathname, router]);

  return null;
}
