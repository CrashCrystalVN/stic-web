import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://stic.web.app";

export const metadata: Metadata = {
  title: "Đội Ngũ Thành Viên & Ban Chủ Nhiệm",
  description: "Danh sách Ban Chủ Nhiệm, Trưởng ban Kỹ thuật, Media và các Thành viên CLB Khoa học Kỹ thuật STIC — THPT Đà Nẵng.",
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: `${siteUrl}/member`,
    siteName: "CLB KHKT STIC",
    title: "Đội Ngũ Thành Viên & Ban Chủ Nhiệm — CLB STIC",
    description: "Danh sách Ban Chủ Nhiệm, Trưởng ban Kỹ thuật, Media và các Thành viên CLB Khoa học Kỹ thuật STIC.",
    images: [
      {
        url: `${siteUrl}/banner.jpg?v=2`,
        secureUrl: `${siteUrl}/banner.jpg?v=2`,
        width: 1024,
        height: 576,
        type: "image/jpeg",
        alt: "Thành Viên CLB KHKT STIC",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Đội Ngũ Thành Viên — CLB STIC",
    description: "Danh sách Ban Chủ Nhiệm và Thành viên CLB STIC.",
    images: [`${siteUrl}/banner.jpg?v=2`],
  },
};

export default function MemberLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

