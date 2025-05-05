"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { ThemeProvider } from "next-themes";

export function ClientBody({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Effects for client-side features that should only run after hydration
  useEffect(() => {
    setMounted(true);

    // Simulate a loading time for the initial loader
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
          <div className="relative">
            <div className="h-24 w-24 rounded-full border-t-2 border-b-2 border-primary animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-primary font-medium">YH</span>
            </div>
          </div>
        </div>
      )}

      {mounted && children}
    </ThemeProvider>
  );
}
