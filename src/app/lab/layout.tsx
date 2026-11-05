import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://stic.web.app";

export const metadata: Metadata = {
  title: "Animation Lab · Interactive Motion & Liquid Glass Studio",
  description: "Trang thử nghiệm các hiệu ứng animation cao cấp lấy cảm hứng từ artru.net: con trỏ chuột Difference Cursor, bộ lọc kính lỏng khúc xạ Liquid Glass, 3D Tilt Card và tương tác Magnetic.",
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: `${siteUrl}/lab`,
    siteName: "CLB KHKT STIC",
    title: "Animation Lab · STIC Studio",
    description: "Thử nghiệm Motion, Liquid Glass & Interactive Cursors cảm hứng từ artru.net.",
  },
};

export default function LabLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
