import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sticdanang.web.app";

export const metadata: Metadata = {
  title: "Đơn Tuyển Thành Viên GEN 1.0",
  description: "Đăng ký tuyển thành viên GEN 1.0 — CLB KHKT STIC Đà Nẵng!",
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: `${siteUrl}/join`,
    siteName: "CLB KHKT STIC",
    title: "Đơn Tuyển Thành Viên GEN 1.0 — CLB STIC",
    description: "Đăng ký tuyển thành viên GEN 1.0 — CLB KHKT STIC Đà Nẵng!",
    images: [
      {
        url: `${siteUrl}/banner.jpg`,
        secureUrl: `${siteUrl}/banner.jpg`,
        width: 1024,
        height: 402,
        type: "image/jpeg",
        alt: "Đơn Tuyển Thành Viên GEN 1.0 — CLB KHKT STIC",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Đơn Tuyển Thành Viên GEN 1.0 — CLB STIC",
    description: "Đăng ký tuyển thành viên GEN 1.0 — CLB KHKT STIC Đà Nẵng!",
    images: [`${siteUrl}/banner.jpg`],
  },
};

export default function JoinLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

