import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://stic.web.app";

export const metadata: Metadata = {
  title: "STIC Research & Frontier Lab · Inspired by Google DeepMind",
  description:
    "Showcase nghiên cứu khoa học kỹ thuật và trí tuệ nhân tạo thế hệ mới của CLB STIC. Giao diện trực quan, khoa học và đột phá lấy cảm hứng từ ngôn ngữ thiết kế của Google DeepMind.",
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: `${siteUrl}/preview`,
    siteName: "CLB KHKT STIC",
    title: "STIC Research & Frontier Lab · Inspired by Google DeepMind",
    description:
      "Khám phá các đột phá công nghệ và nghiên cứu thực chiến của học sinh THPT Đà Nẵng theo triết lý khoa học Google DeepMind.",
  },
};

export default function PreviewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
