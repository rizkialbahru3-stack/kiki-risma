import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Kiki & Cimol",
  description:
    "Halaman kecil tentang Kiki dan Risma (Cimol) — cerita, galeri, dan lagu favorit kami berdua.",
  themeColor: "#e11d48",
  openGraph: {
    title: "Kiki ♥ Cimol",
    description:
      "Halaman kecil tentang kami berdua — kenalan, galeri, dan lagu favorit.",
    images: [{ url: "/kami-2.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kiki ♥ Cimol",
    description:
      "Halaman kecil tentang kami berdua — kenalan, galeri, dan lagu favorit.",
    images: ["/kami-2.png"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
