import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Biến lưu id animation cuộn hiện tại để có thể hủy khi có click mới
let activeAnimationId: number | null = null;

/**
 * Hàm cuộn lướt cực kỳ mượt mà sử dụng requestAnimationFrame và easing easeInOutCubic.
 * Hoạt động 100% mượt mà trên mọi trình duyệt, thiết bị và webview mà không phụ thuộc vào native scroll.
 */
export function smoothScrollTo(targetId: string, customDuration?: number) {
  if (typeof window === "undefined") return;

  const cleanId = targetId.replace(/^#/, "");
  const element = document.getElementById(cleanId);
  if (!element) return;

  // Hủy animation trước đó nếu đang chạy dở
  if (activeAnimationId !== null) {
    cancelAnimationFrame(activeAnimationId);
    activeAnimationId = null;
  }

  const headerOffset = 80;
  const startY = window.pageYOffset || document.documentElement.scrollTop;
  const elementRect = element.getBoundingClientRect();
  const targetY = Math.max(0, elementRect.top + startY - headerOffset);
  const distance = targetY - startY;

  // Nếu khoảng cách đã rất nhỏ (< 4px), không cần cuộn
  if (Math.abs(distance) < 4) {
    if (cleanId === "join") {
      highlightJoinSection(element);
    }
    return;
  }

  // Tính toán thời gian lướt mượt: từ 650ms đến 950ms tùy khoảng cách
  const calculatedDuration = Math.min(950, Math.max(650, Math.abs(distance) * 0.35));
  const duration = customDuration ?? calculatedDuration;

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

      // Nếu cuộn đến phần đăng ký (#join), tạo hiệu ứng sáng viền để thu hút sự chú ý
      if (cleanId === "join") {
        highlightJoinSection(element);
      }
    }
  };

  activeAnimationId = requestAnimationFrame(step);
}

function highlightJoinSection(element: HTMLElement) {
  element.classList.add("ring-4", "ring-blue-500/40", "transition-all", "duration-500");
  setTimeout(() => {
    element.classList.remove("ring-4", "ring-blue-500/40");
  }, 1600);
}
