import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import ScrollToTop from "@/components/ScrollToTop";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pioneer Middle East | Car Audio, Video, Speakers & Accessories",
  description:
    "Discover Pioneer Middle East's premium range of car audio and video systems, including stereo receivers, amplifiers, speakers, subwoofers, TV tuners, and more. Experience unmatched sound and innovation.",
  keywords: [
    "Pioneer",
    "Car Audio",
    "Car Video",
    "Speakers",
    "Subwoofers",
    "Amplifiers",
    "Receivers",
    "Car Stereo",
    "TV Tuners",
    "Car Entertainment",
    "Pioneer Middle East",
  ],
  authors: [{ name: "Pioneer Middle East", url: "https://pioneer-mea.com" }],
  creator: "Pioneer Middle East",
  publisher: "Pioneer Middle East",
  openGraph: {
    title: "Pioneer Middle East | Car Audio & Video Systems",
    description:
      "Explore Pioneer’s latest car audio innovations — stereo systems, subwoofers, speakers, amplifiers, and more.",
    url: "https://pioneer-mea.com",
    siteName: "Pioneer Middle East",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og-image.jpg", // Replace with actual OG image path
        width: 1200,
        height: 630,
        alt: "Pioneer Car Audio & Video Systems",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pioneer Middle East | Car Audio & Video Systems",
    description:
      "Experience high-performance car audio and video from Pioneer Middle East. Shop speakers, subwoofers, and more.",
    images: ["/og-image.jpg"], // Replace with actual image path
  },
  robots: {
    index: true,
    follow: true,
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
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} antialiased`}
      >
        <ScrollToTop />
        {children}
      </body>
    </html>
  );
}
