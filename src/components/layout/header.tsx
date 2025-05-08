"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Sun, Moon, Menu, Github, Linkedin, Mail } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { getSocialLinks } from "@/lib/resume";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

const socialIcons = {
  GitHub: <Github className="h-5 w-5" />,
  LinkedIn: <Linkedin className="h-5 w-5" />,
  Email: <Mail className="h-5 w-5" />,
};

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [sheetOpen, setSheetOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const socialLinks = getSocialLinks();
  const [isDesktop, setIsDesktop] = useState(false);
  
  // Check if window is defined (for SSR)
  useEffect(() => {
    const checkIfDesktop = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    
    // Initial check
    checkIfDesktop();
    
    // Add event listener for window resize
    window.addEventListener("resize", checkIfDesktop);
    
    // Clean up
    return () => window.removeEventListener("resize", checkIfDesktop);
  }, []);

  // Debounced scroll handler for better performance
  const handleScroll = useCallback(() => {
    const scrollPosition = window.scrollY;
    setScrolled(scrollPosition > 20);

    // Update active section based on scroll position with Intersection Observer
    const sections = document.querySelectorAll("section[id]");
    
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id") || "";

      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        setActiveSection(sectionId);
      }
    });
  }, []);

  useEffect(() => {
    // Setting up Intersection Observer for better performance
    if ("IntersectionObserver" in window) {
      const sectionObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const sectionId = entry.target.getAttribute("id");
              if (sectionId) setActiveSection(sectionId);
            }
          });
        },
        { rootMargin: "-100px 0px -70% 0px" }
      );

      document.querySelectorAll("section[id]").forEach((section) => {
        sectionObserver.observe(section);
      });

      return () => sectionObserver.disconnect();
    } else {
      // Fallback for browsers that don't support Intersection Observer
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [handleScroll]);

  // Separate effect for scroll detection (needed regardless of IntersectionObserver)
  useEffect(() => {
    const handleScrollEffect = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScrollEffect);
    return () => window.removeEventListener("scroll", handleScrollEffect);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const handleSheetChange = (open) => {
    setSheetOpen(open);
  };

  const closeSheet = () => {
    setSheetOpen(false);
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "bg-background/80 backdrop-blur-md py-2 shadow-md" : "py-4"
      )}
    >
      <div className="container mx-auto flex items-center justify-between">
        <Link
          href="/#home"
          className="text-xl md:text-2xl font-bold font-display group"
          aria-label="Yash.dev - Go to homepage"
        >
          <motion.span
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-primary group-hover:text-primary/80 transition-colors"
          >
            Yash
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="group-hover:text-foreground/80 transition-colors"
          >
            .dev
          </motion.span>
        </Link>

        {/* Desktop Navigation with animations */}
        <nav className="hidden md:flex items-center space-x-1">
          <AnimatePresence>
            {navItems.map((item, i) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative px-3 py-2 text-sm font-medium transition-colors",
                  activeSection === item.href.substring(1)
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <motion.span
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 + i * 0.05 }}
                >
                  {item.name}
                </motion.span>
                {activeSection === item.href.substring(1) && (
                  <motion.span
                    layoutId="activeSection"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                    transition={{ 
                      type: "spring", 
                      stiffness: 380, 
                      damping: 30 
                    }}
                  />
                )}
              </Link>
            ))}
          </AnimatePresence>
        </nav>

        <div className="flex items-center space-x-2">
          {/* Social Icons (desktop) */}
          <div className="hidden md:flex items-center space-x-1">
            <AnimatePresence>
              {socialLinks.map((link, i) => (
                <motion.a
                  key={link.url}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-muted-foreground hover:text-primary hover:bg-muted/80 rounded-full transition-colors"
                  aria-label={link.platform}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 + i * 0.05 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {socialIcons[link.platform] || null}
                </motion.a>
              ))}
            </AnimatePresence>
          </div>

          {/* Theme Toggle Button */}
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.4 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleTheme}
            className="p-2 rounded-full bg-muted/50 hover:bg-muted transition-colors"
            aria-label={`Toggle to ${theme === 'dark' ? 'light' : 'dark'} theme`}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={theme}
                initial={{ opacity: 0, rotate: -30 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 30 }}
                transition={{ duration: 0.2 }}
              >
                {theme === "dark" ? (
                  <Sun className="h-5 w-5 text-yellow-400" />
                ) : (
                  <Moon className="h-5 w-5 text-primary" />
                )}
              </motion.div>
            </AnimatePresence>
          </motion.button>

          {/* Mobile Menu */}
          <Sheet open={sheetOpen} onOpenChange={handleSheetChange}>
            <SheetTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className="md:hidden"
                aria-label="Open navigation menu"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] sm:w-[350px]">
              <motion.div 
                className="flex flex-col h-full"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-xl font-bold font-display">
                    <span className="text-primary">Yash</span>.dev
                  </h2>
                </div>

                <nav className="flex flex-col space-y-4">
                  {navItems.map((item, i) => (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2, delay: i * 0.05 }}
                    >
                      <Link
                        href={item.href}
                        className={cn(
                          "text-lg transition-colors block p-2 rounded-md",
                          activeSection === item.href.substring(1)
                            ? "text-primary font-medium bg-muted/50"
                            : "text-muted-foreground hover:text-foreground hover:bg-muted/30"
                        )}
                        onClick={closeSheet}
                      >
                        {item.name}
                      </Link>
                    </motion.div>
                  ))}
                </nav>

                <div className="mt-auto mb-8">
                  <p className="text-sm text-muted-foreground mb-3">Connect with me</p>
                  <div className="flex flex-wrap gap-2">
                    {socialLinks.map((link, i) => (
                      <motion.a
                        key={link.url}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-md text-muted-foreground hover:text-primary hover:bg-muted/50 transition-colors flex items-center gap-2"
                        aria-label={link.platform}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2, delay: 0.2 + i * 0.05 }}
                      >
                        {socialIcons[link.platform] || null}
                        <span className="text-sm">{link.platform}</span>
                      </motion.a>
                    ))}
                    <motion.button
                      onClick={toggleTheme}
                      className="p-2 rounded-md bg-muted/50 hover:bg-muted transition-colors flex items-center gap-2 ml-auto"
                      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2, delay: 0.4 }}
                    >
                      {theme === "dark" ? (
                        <>
                          <Sun className="h-5 w-5 text-yellow-400" />
                          <span className="text-sm">Light Mode</span>
                        </>
                      ) : (
                        <>
                          <Moon className="h-5 w-5 text-primary" />
                          <span className="text-sm">Dark Mode</span>
                        </>
                      )}
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}