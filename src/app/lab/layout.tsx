import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://stic.web.app";

export const metadata: Metadata = {
  title: "Animation Lab · Interactive Motion, Swarm Rebuild & Liquid Glass Studio",
  description:
    "Trang thử nghiệm các hiệu ứng animation cao cấp: Swarm Rebuild Engine tái dựng DOM trực tiếp, con trỏ chuột Swarm Flock & Difference Cursor, Liquid Glass, 3D Tilt Card và Magnetic Physics.",
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: `${siteUrl}/lab`,
    siteName: "CLB KHKT STIC",
    title: "Animation Lab · STIC Motion & Swarm Studio",
    description:
      "Không gian thử nghiệm Swarm Rebuild, Motion, Liquid Glass và tương tác vật lý cao cấp của CLB STIC.",
  },
};

export default function LabLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
