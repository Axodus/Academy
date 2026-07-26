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
  metadataBase: new URL("https://academy.country"),
  title: "Academy — Verifiable learning infrastructure",
  description:
    "Academy is an open-development infrastructure exploring Proof-of-Knowledge, portable reputation and programmable participation.",
  keywords: [
    "Proof-of-Knowledge",
    "on-chain education",
    "verifiable credentials",
    "Web3 education",
    "$Neurons",
    "Axodus Academy",
  ],
  openGraph: {
    title: "Academy — Knowledge should create verifiable progress",
    description:
      "Explore an open-development learning infrastructure connecting knowledge, evidence, reputation and participation.",
    type: "website",
    siteName: "Axodus Academy",
  },
  twitter: {
    card: "summary_large_image",
    title: "Academy — Verifiable learning infrastructure",
    description:
      "Proof-of-Knowledge, portable reputation and programmable participation — built in the open.",
  },
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/assets/favicon.png",
    shortcut: "/assets/favicon.png",
    apple: "/assets/A-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
