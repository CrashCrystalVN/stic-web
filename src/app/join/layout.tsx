import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sticdanang.web.app";

export const metadata: Metadata = {
  title: "Đơn Tuyển Thành Viên GEN 1.0",
  description:
    "Đơn ứng tuyển CLB Khoa học Kỹ thuật STIC GEN 1.0. Dành cho học sinh THPT trên địa bàn TP. Đà Nẵng đam mê STEM, Robotics, AI, Lập trình, Thiết kế.",
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: `${siteUrl}/join`,
    siteName: "CLB KHKT STIC",
    title: "Đơn Tuyển Thành Viên GEN 1.0 — CLB STIC",
    description:
      "Đơn ứng tuyển CLB Khoa học Kỹ thuật STIC GEN 1.0. Dành cho học sinh THPT trên địa bàn TP. Đà Nẵng.",
    images: [
      {
        url: `${siteUrl}/banner.png`,
        secureUrl: `${siteUrl}/banner.png`,
        width: 1024,
        height: 402,
        type: "image/png",
        alt: "Đơn Tuyển Thành Viên GEN 1.0 — CLB KHKT STIC",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Đơn Tuyển Thành Viên GEN 1.0 — CLB STIC",
    description:
      "Đơn ứng tuyển CLB Khoa học Kỹ thuật STIC GEN 1.0. Dành cho học sinh THPT trên địa bàn TP. Đà Nẵng.",
    images: [`${siteUrl}/banner.png`],
  },
};

export default function JoinLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

