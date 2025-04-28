import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import CreativeCursor from "@/components/cursor/creative-cursor";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Yash Hulle | Web Developer",
  description: "Passionate Web Developer skilled in JavaScript, Next.js, and MERN stack",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={cn(
          inter.className,
          "min-h-screen bg-background antialiased overflow-x-hidden"
        )}
      >
        <CreativeCursor />
        {children}
      </body>
    </html>
  );
}
