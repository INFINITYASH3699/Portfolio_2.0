"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navigationLinks = [
  { name: "Home", path: "#home" },
  { name: "About", path: "#about" },
  { name: "Skills", path: "#skills" },
  { name: "Projects", path: "#projects" },
  { name: "Contact", path: "#contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.2,
        duration: 0.5,
      },
    },
  };

  const linkVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.3 + i * 0.1,
        duration: 0.5,
        ease: "easeInOut",
      },
    }),
  };

  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: 0.2,
      },
    },
    open: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.2,
      },
    },
  };

  // Function to check active link
  const isActive = (path: string) => {
    if (path === "#home" && (pathname === "/" || !pathname)) {
      return true;
    }
    if (typeof window !== 'undefined') {
      return window.location.hash === path;
    }
    return false;
  };

  return (
    <motion.nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out py-4 px-6 flex items-center justify-between",
        isScrolled
          ? "bg-background/80 backdrop-blur-md border-b"
          : "bg-transparent"
      )}
      initial="hidden"
      animate="visible"
      variants={navVariants}
    >
      <motion.div
        className="text-2xl font-bold text-gradient"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
      >
        <a href="#home">Yash Hulle</a>
      </motion.div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center space-x-1">
        {navigationLinks.map((link, i) => (
          <motion.div
            key={link.name}
            custom={i}
            variants={linkVariants}
            initial="hidden"
            animate="visible"
          >
            <a href={link.path}>
              <Button
                variant={isActive(link.path) ? "default" : "ghost"}
                className={cn(
                  "relative px-4 py-2 transition-all duration-300 ease-in-out hover:text-primary",
                  isActive(link.path)
                    ? "text-foreground"
                    : "text-muted-foreground"
                )}
              >
                {link.name}
                {isActive(link.path) && (
                  <motion.div
                    className="absolute bottom-0 left-0 h-0.5 w-full bg-primary"
                    layoutId="navbar-indicator"
                    transition={{ duration: 0.3 }}
                  />
                )}
              </Button>
            </a>
          </motion.div>
        ))}
      </div>

      {/* Mobile Navigation Button */}
      <div className="md:hidden">
        <Button
          variant="ghost"
          className="p-1"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          <motion.div
            animate={isMobileMenuOpen ? "open" : "closed"}
            className="w-6 h-6 flex flex-col justify-center items-center"
          >
            <motion.span
              className="w-5 h-0.5 bg-foreground rounded-full block mb-1"
              variants={{
                closed: { rotate: 0 },
                open: { rotate: 45, y: 5 },
              }}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              className="w-5 h-0.5 bg-foreground rounded-full block mb-1"
              variants={{
                closed: { opacity: 1 },
                open: { opacity: 0 },
              }}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              className="w-5 h-0.5 bg-foreground rounded-full block"
              variants={{
                closed: { rotate: 0 },
                open: { rotate: -45, y: -5 },
              }}
              transition={{ duration: 0.2 }}
            />
          </motion.div>
        </Button>
      </div>

      {/* Mobile Menu */}
      <motion.div
        className={cn(
          "absolute top-full left-0 right-0 bg-background/95 backdrop-blur-md shadow-lg px-6 py-5 md:hidden",
          !isMobileMenuOpen && "hidden"
        )}
        variants={mobileMenuVariants}
        initial="closed"
        animate={isMobileMenuOpen ? "open" : "closed"}
      >
        <div className="flex flex-col space-y-3">
          {navigationLinks.map((link, i) => (
            <a
              key={link.name}
              href={link.path}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Button
                variant={isActive(link.path) ? "default" : "ghost"}
                className={cn(
                  "w-full justify-start",
                  isActive(link.path)
                    ? "text-foreground"
                    : "text-muted-foreground"
                )}
              >
                {link.name}
              </Button>
            </a>
          ))}
        </div>
      </motion.div>
    </motion.nav>
  );
}
