import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://stic.web.app";

export const metadata: Metadata = {
  title: "Bản Clone Tương Tác Chuyển Động · STIC Motion Experience",
  description: "Bản clone trang chủ CLB STIC ứng dụng trọn vẹn bộ hoạt ảnh: con trỏ quang học Difference Cursor, thấu kính Liquid Glass, 3D Tilt phản quang và tương tác từ tính Magnetic.",
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: `${siteUrl}/clone`,
    siteName: "CLB KHKT STIC",
    title: "Bản Clone Tương Tác Chuyển Động — CLB STIC",
    description: "Trải nghiệm trang chủ CLB STIC với toàn bộ hiệu ứng animation & con trỏ quang học cao cấp.",
  },
};

export default function CloneLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

