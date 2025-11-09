import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
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
        {process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY && (
          <Script
            src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`}
            strategy="afterInteractive"
          />
        )}
        {children}
      </body>
    </html>
  );
}
