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
  title: "Skyrider High School",
  description:
    "Skyrider High School — modern education, community, and student success in Nepal.",
  openGraph: {
    title: "Skyrider High School",
    description:
      "Skyrider High School — modern education, community, and student success in Nepal.",
    url: "https://skyrider.edu.np/",
    siteName: "Skyrider High School",
  },
  twitter: {
    card: "summary_large_image",
    title: "Skyrider High School",
    description:
      "Skyrider High School — modern education, community, and student success in Nepal.",
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
