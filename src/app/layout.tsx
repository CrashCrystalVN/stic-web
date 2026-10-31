import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/common/ThemeProvider";
import { LangProvider } from "@/context/LangContext";
import { MainWrapper } from "@/components/common/MainWrapper";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const font = Plus_Jakarta_Sans({
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-sans",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://stic-club.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "STIC — CLB Khoa học Kỹ thuật Đà Nẵng",
    template: "%s | STIC Club",
  },
  description:
    "CLB Khoa học Kỹ thuật STIC — Sân chơi STEM thực chiến dành cho học sinh THPT TP. Đà Nẵng. Đang tuyển thành viên GEN 1.0.",
  keywords: [
    "STIC",
    "CLB Khoa học kỹ thuật",
    "Science Technology Innovation Club",
    "Đà Nẵng",
    "học sinh THPT Đà Nẵng",
    "STEM",
    "GEN 1.0",
    "tuyển thành viên",
    "clb stem da nang",
    "clbstic",
    "robotics",
    "coding",
  ],
  authors: [{ name: "CLB KHKT STIC", url: siteUrl }],
  creator: "CLB KHKT STIC — Đà Nẵng",

  // Open Graph: preview đẹp khi chia sẻ lên Facebook / Zalo / Discord
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: siteUrl,
    siteName: "CLB KHKT STIC",
    title: "STIC — CLB Khoa học Kỹ thuật Đà Nẵng | Đang tuyển GEN 1.0 🔥",
    description:
      "Sân chơi STEM thực chiến cho học sinh THPT TP. Đà Nẵng. 7 mảng chuyên môn: AI, Robotics, Design, STEM… Nộp đơn GEN 1.0 ngay!",
    images: [
      {
        url: "/banner.png",
        width: 1200,
        height: 630,
        alt: "CLB Khoa học Kỹ thuật STIC — GEN 1.0",
      },
    ],
  },

  // Twitter / X card
  twitter: {
    card: "summary_large_image",
    title: "STIC — CLB Khoa học Kỹ thuật Đà Nẵng",
    description:
      "Sân chơi STEM thực chiến cho học sinh THPT TP. Đà Nẵng. Đang tuyển GEN 1.0.",
    images: ["/banner.png"],
  },

  // Icons
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },

  // Cho phép Google index toàn bộ website
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body
        className={`${font.variable} font-sans min-h-screen antialiased flex flex-col`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
        >
          <LangProvider>
            <Navbar />
            <MainWrapper>{children}</MainWrapper>
            <Footer />
          </LangProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
