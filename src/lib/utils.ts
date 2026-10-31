import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Biến lưu id animation cuộn hiện tại để có thể hủy khi có click mới
let activeAnimationId: number | null = null;

function focusFirstInput() {
  setTimeout(() => {
    const firstInput = document.querySelector<HTMLInputElement>(
      "#application-form input:not([type='hidden']), #application-form textarea"
    );
    if (firstInput) {
      firstInput.focus({ preventScroll: true });
    }
  }, 100);
}

function highlightElement(element: HTMLElement) {
  element.classList.add("ring-4", "ring-blue-500/50", "transition-all", "duration-500");
  setTimeout(() => {
    element.classList.remove("ring-4", "ring-blue-500/50");
  }, 1600);
}

/**
 * Hàm cuộn lướt cực kỳ mượt mà và dứt khoát.
 * Khi bấm "join" hoặc "tuyển thành viên", ngay lập tức cuộn thẳng xuống vị trí điền đơn (#application-form).
 */
export function smoothScrollTo(targetId: string, customDuration?: number) {
  if (typeof window === "undefined") return;

  let cleanId = targetId.replace(/^#/, "");

  // Nếu người dùng chọn "join" hoặc "tuyển thành viên", ưu tiên cuộn thẳng xuống chỗ điền đơn luôn
  if (cleanId === "join") {
    const formElement = document.getElementById("application-form");
    if (formElement) {
      cleanId = "application-form";
    }
  }

  const element = document.getElementById(cleanId);
  if (!element) {
    if (window.location.pathname !== "/") {
      window.location.href = `/#${cleanId}`;
    }
    return;
  }

  // Hủy animation trước đó nếu đang chạy dở
  if (activeAnimationId !== null) {
    cancelAnimationFrame(activeAnimationId);
    activeAnimationId = null;
  }

  const headerOffset = 85;
  const startY = window.pageYOffset || document.documentElement.scrollTop;
  const elementRect = element.getBoundingClientRect();
  const targetY = Math.max(0, elementRect.top + startY - headerOffset);
  const distance = targetY - startY;

  // Nếu khoảng cách đã rất nhỏ (< 4px), không cần cuộn
  if (Math.abs(distance) < 4) {
    if (cleanId === "application-form" || cleanId === "join") {
      highlightElement(element);
      focusFirstInput();
    }
    return;
  }

  // Tốc độ cuộn: với form điền đơn thì cuộn nhanh dứt khoát (khoảng 420ms) để người dùng điền luôn
  const defaultDuration =
    cleanId === "application-form"
      ? 420
      : Math.min(800, Math.max(450, Math.abs(distance) * 0.28));
  const duration = customDuration ?? defaultDuration;

  const startTime = performance.now();

  // Easing curve: Khởi động êm ái, tăng tốc nhẹ ở giữa và dừng lại cực kỳ dịu dàng
  const easeInOutCubic = (t: number): number => {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  };

  // Nếu người dùng chủ động lăn chuột hoặc vuốt màn hình, dừng animation để không giật
  const onUserInterrupt = () => {
    if (activeAnimationId !== null) {
      cancelAnimationFrame(activeAnimationId);
      activeAnimationId = null;
    }
    cleanupListeners();
  };

  const cleanupListeners = () => {
    window.removeEventListener("wheel", onUserInterrupt);
    window.removeEventListener("touchmove", onUserInterrupt);
  };

  window.addEventListener("wheel", onUserInterrupt, { passive: true });
  window.addEventListener("touchmove", onUserInterrupt, { passive: true });

  const step = (currentTime: number) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easeProgress = easeInOutCubic(progress);

    window.scrollTo(0, startY + distance * easeProgress);

    if (progress < 1) {
      activeAnimationId = requestAnimationFrame(step);
    } else {
      activeAnimationId = null;
      cleanupListeners();

      // Khi đã cuộn tới đích, sáng viền và focus vào ô điền đầu tiên
      if (cleanId === "application-form" || cleanId === "join") {
        highlightElement(element);
        focusFirstInput();
      }
    }
  };

  activeAnimationId = requestAnimationFrame(step);
}
