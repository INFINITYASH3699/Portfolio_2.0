"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Experience", href: "#experience" },
    { name: "Projects", href: "#projects" },
    { name: "Education", href: "#education" },
    { name: "Contact", href: "#contact" }
  ];

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleNavLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-background/95 backdrop-blur shadow-lg" : "bg-transparent"}`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="text-xl sm:text-2xl font-bold"
            >
              <Link href="/" className="text-gradient">
                Yash<span className="text-foreground">.dev</span>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <motion.nav
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="hidden md:flex items-center space-x-6"
            >
              {navLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className="text-foreground/80 hover:text-foreground transition-colors duration-300 text-sm font-medium"
                >
                  {link.name}
                </Link>
              ))}

              <Link
                href="#contact"
                className="bg-foreground text-background px-4 py-2 rounded-md text-sm font-medium hover:bg-foreground/90 transition-colors duration-300"
              >
                Hire Me
              </Link>
            </motion.nav>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={toggleMobileMenu}
                className="flex flex-col items-center justify-center p-2"
                aria-label="Toggle mobile menu"
              >
                <div className={`hamburger-line ${mobileMenuOpen ? "rotate-45 translate-y-1.5" : ""}`} />
                <div className={`hamburger-line ${mobileMenuOpen ? "opacity-0" : ""}`} />
                <div className={`hamburger-line ${mobileMenuOpen ? "-rotate-45 -translate-y-1.5" : ""}`} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${mobileMenuOpen ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex flex-col items-center justify-center h-full space-y-8">
          {navLinks.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              onClick={handleNavLinkClick}
              className="text-foreground text-xl font-medium"
            >
              {link.name}
            </Link>
          ))}

          <Link
            href="#contact"
            onClick={handleNavLinkClick}
            className="bg-foreground text-background px-6 py-3 rounded-md text-lg font-medium mt-4"
          >
            Hire Me
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;
