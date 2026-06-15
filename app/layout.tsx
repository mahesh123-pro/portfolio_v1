import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../components/layout/Navbar";
import ClientWrapper from "../components/layout/ClientWrapper";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#0A0A0A",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Mahesh | Cloud & Full-Stack Developer",
  description: "Portfolio of Mahesh, a Cloud & Full-Stack Developer. Explored my work in AWS, Docker, Next.js, and systems design.",
  keywords: ["Mahesh", "Cloud & Full-Stack Developer", "AWS Developer", "Docker", "Next.js", "Three.js", "GKLT", "Manakrishi", "Terraform", "Systems Design"],
  authors: [{ name: "Mahesh" }],
  openGraph: {
    title: "Mahesh | Cloud & Full-Stack Developer",
    description: "Cloud-native configurations and interactive full-stack interfaces built with React Three Fiber and GSAP timelines.",
    url: "https://maheshkumar.tech",
    siteName: "Mahesh Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mahesh | Cloud & Full-Stack Developer",
    description: "Cloud-native systems provisioning and WebGL portfolio UI.",
    creator: "@kolim5263",
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
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-dark overflow-x-hidden">
        {/* Client Wrapper (Cursor, DevConsole) */}
        <ClientWrapper />
        {/* Sticky navbar */}
        <Navbar />
        {/* Main page render content */}
        <main className="flex-1 flex flex-col">{children}</main>
      </body>
    </html>
  );
}
