import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/common/ThemeProvider";
import { LangProvider } from "@/context/LangContext";
import { MainWrapper } from "@/components/common/MainWrapper";
import { FormPreloader } from "@/components/common/FormPreloader";
import { ServiceWorkerRegister } from "@/components/common/ServiceWorkerRegister";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { NativeSwarmProvider } from "@/components/swarm/NativeSwarmProvider";

// Tách tải Canvas hoạt ảnh ra khỏi Critical Path LCP
const ParticleBackground = dynamic(
  () => import("@/components/common/ParticleBackground").then((mod) => mod.ParticleBackground),
  { ssr: false }
);

const font = Plus_Jakarta_Sans({
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-sans",
  display: "swap",
  preload: true,
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://stic.web.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "STIC — CLB Khoa học Kỹ thuật Đà Nẵng",
    template: "%s | STIC Club",
  },
  description:
    "Sân chơi STEM thực chiến THPT Đà Nẵng. Đăng ký GEN 1.0 ngay!",
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

  // Open Graph: preview đẹp khi chia sẻ lên Facebook / Zalo / Discord / Messenger
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: siteUrl,
    siteName: "CLB KHKT STIC",
    title: "STIC — CLB Khoa học Kỹ thuật Đà Nẵng",
    description: "Sân chơi STEM thực chiến THPT Đà Nẵng. Đăng ký GEN 1.0 ngay!",
    images: [
      {
        url: `${siteUrl}/banner.jpg?v=2`,
        secureUrl: `${siteUrl}/banner.jpg?v=2`,
        width: 1024,
        height: 576,
        type: "image/jpeg",
        alt: "STIC — CLB Khoa học Kỹ thuật Đà Nẵng",
      },
    ],
  },

  // Twitter / X card
  twitter: {
    card: "summary_large_image",
    title: "STIC — CLB Khoa học Kỹ thuật Đà Nẵng",
    description: "Sân chơi STEM thực chiến THPT Đà Nẵng. Đăng ký GEN 1.0 ngay!",
    images: [`${siteUrl}/banner.jpg?v=2`],
  },

  // Icons (Favicon tròn dạng circular avatar trên tab trình duyệt Cốc Cốc / Chrome)
  icons: {
    icon: [
      { url: "/favicon.png?v=5", type: "image/png" },
      { url: "/icon.png?v=5", type: "image/png" },
      { url: "/favicon.ico?v=5" },
    ],
    shortcut: "/favicon.png?v=5",
    apple: "/apple-touch-icon.png?v=5",
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
      <head>
        {/* Packet Prioritization: Nạp tài nguyên quan trọng LCP và DNS sớm nhất */}
        <meta httpEquiv="x-dns-prefetch-control" content="on" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://docs.google.com" />
        <link rel="preconnect" href="https://docs.google.com" crossOrigin="anonymous" />
        <link rel="preload" as="image" href={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/logo.png`} fetchPriority="high" />

        {/* Zalo & In-App Browser Specific OpenGraph Fallbacks */}
        <meta property="og:image:secure_url" content={`${siteUrl}/banner.jpg?v=2`} />
        <link rel="image_src" href={`${siteUrl}/banner.jpg?v=2`} />
      </head>
      <body
        className={`${font.variable} font-sans min-h-screen antialiased flex flex-col relative`}
      >
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{if(!location.search.includes('swarm=0')){var c=document.documentElement.classList;c.add('swarm-rebuilding','swarm-booting');}}catch(e){}",
          }}
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
        >
          <LangProvider>
            {/* Version PC: Ethereal Star Particle Canvas (Ẩn hoàn toàn trên Mobile để tối ưu 100% pin & 120fps) */}
            <div className="hidden md:block pointer-events-none fixed inset-0 z-0 overflow-hidden">
              <ParticleBackground />
            </div>
            <NativeSwarmProvider>
              <Navbar />
              <MainWrapper>{children}</MainWrapper>
              <Footer />
            </NativeSwarmProvider>
            {/* Tự động tải trước Google Form ngầm trong thời gian rảnh của máy */}
            <FormPreloader />
            {/* Bộ tăng tốc Service Worker lưu cache cục bộ thiết bị 0ms cho 1000+ VU */}
            <ServiceWorkerRegister />
          </LangProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
