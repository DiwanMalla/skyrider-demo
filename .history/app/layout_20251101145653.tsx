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

export const metadata: Metadata = {
  title: "Skyrider School",
  description:
    "Skyrider School — Excellence in education, empowering minds and shaping futures in Nepal.",
  openGraph: {
    title: "Skyrider School",
    description:
      "Skyrider School — Excellence in education, empowering minds and shaping futures in Nepal.",
    url: "https://skyrider.edu.np/",
    siteName: "Skyrider School",
  },
  twitter: {
    card: "summary_large_image",
    title: "Skyrider School",
    description:
      "Skyrider School — Excellence in education, empowering minds and shaping futures in Nepal.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
