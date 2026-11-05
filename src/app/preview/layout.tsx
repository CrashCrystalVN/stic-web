import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bản Clone Tương Tác Chuyển Động · STIC Motion Experience",
  description: "Bản clone trang chủ CLB STIC ứng dụng trọn vẹn bộ hoạt ảnh: con trỏ quang học Difference Cursor, thấu kính Liquid Glass, 3D Tilt phản quang và tương tác từ tính Magnetic.",
};

export default function PreviewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
