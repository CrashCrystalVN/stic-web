import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://stic.web.app";

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
        url: `${siteUrl}/banner.jpg?v=2`,
        secureUrl: `${siteUrl}/banner.jpg?v=2`,
        width: 1024,
        height: 576,
        type: "image/jpeg",
        alt: "Đơn Tuyển Thành Viên GEN 1.0 — CLB KHKT STIC",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Đơn Tuyển Thành Viên GEN 1.0 — CLB STIC",
    description: "Đăng ký tuyển thành viên GEN 1.0 — CLB KHKT STIC Đà Nẵng!",
    images: [`${siteUrl}/banner.jpg?v=2`],
  },
};

export default function JoinLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <head>
        {/* Kết nối cực sớm tới máy chủ Google Form để triệt tiêu độ trễ mạng trên mobile */}
        <link rel="preconnect" href="https://docs.google.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://docs.google.com" />
        <link rel="preconnect" href="https://lh3.googleusercontent.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://lh3.googleusercontent.com" />
        <link rel="preconnect" href="https://ssl.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://ssl.gstatic.com" />
      </head>
      {children}
    </>
  );
}

