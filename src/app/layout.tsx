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

export const metadata: Metadata = {
  title: "STIC — CLB Khoa học kỹ thuật Đà Nẵng | Science, Technology & Innovation Club",
  description:
    "CLB Khoa học kỹ thuật STIC — Sân chơi STEM thực chiến dành cho học sinh THPT TP. Đà Nẵng. Đang tuyển thành viên GEN 1.0.",
  keywords: [
    "STIC",
    "CLB Khoa học kỹ thuật",
    "Science Technology Innovation Club",
    "Đà Nẵng",
    "học sinh THPT Đà Nẵng",
    "STEM",
    "GEN 1.0",
    "tuyển thành viên",
    "clbstic",
  ],
  authors: [{ name: "CLB KHKT STIC", url: "https://stic-club.dev" }],
  creator: "CLB KHKT STIC — Đà Nẵng",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" suppressHydrationWarning className="scroll-smooth">
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
