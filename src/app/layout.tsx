import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ClientBody from "./ClientBody";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Yash Hulle | Web Developer",
  description:
    "Portfolio website of Yash Hulle, a passionate web developer specializing in JavaScript, React.js, Next.js and MERN stack",
  keywords: [
    "web developer",
    "portfolio",
    "React",
    "Next.js",
    "MERN stack",
    "JavaScript",
    "frontend developer",
  ],
  authors: [{ name: "Yash Hulle" }],
  creator: "Yash Hulle",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} scroll-smooth`}>
      <body suppressHydrationWarning className="antialiased font-sans">
        <ClientBody>{children}</ClientBody>
      </body>
    </html>
  );
}
