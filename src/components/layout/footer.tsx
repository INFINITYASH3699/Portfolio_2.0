"use client";

import Link from "next/link";
import { Heart, ChevronRight, Github, Linkedin, Mail } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const navLinks = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Experience", href: "#experience" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
  ];

  const socialLinks = [
    {
      icon: <Github className="h-5 w-5" />,
      href: "https://github.com/INFINITYASH3699/",
      label: "GitHub",
    },
    {
      icon: <Linkedin className="h-5 w-5" />,
      href: "https://www.linkedin.com/in/yash-hulle/",
      label: "LinkedIn",
    },
    {
      icon: <Mail className="h-5 w-5" />,
      href: "mailto:yash.hulle3699@gmail.com",
      label: "Email",
    },
  ];

  return (
    <footer className="bg-muted/50 border-t border-border/50">
      <div className="container mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Yash Hulle</h3>
            <p className="text-muted-foreground text-sm">
              A passionate web developer specializing in creating beautiful and functional websites and web applications.
            </p>
            <div className="flex space-x-3">
              {socialLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-muted rounded-full hover:bg-primary/10 hover:text-primary transition-colors"
                  aria-label={link.label}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground text-sm flex items-center hover:text-primary transition-colors"
                  >
                    <ChevronRight className="h-3 w-3 mr-1" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact</h3>
            <ul className="space-y-2 text-muted-foreground text-sm">
              <li>Pune, Maharashtra</li>
              <li>
                <a
                  href="mailto:yash.hulle3699@gmail.com"
                  className="hover:text-primary transition-colors"
                >
                  yash.hulle3699@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="tel:9665187273"
                  className="hover:text-primary transition-colors"
                >
                  9665187273
                </a>
              </li>
            </ul>
          </div>

          {/* Subscribe */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Let's Connect</h3>
            <p className="text-muted-foreground text-sm">
              Follow me on social media to stay up to date with my latest projects and blog posts.
            </p>
            <div className="flex space-x-3">
              <a
                href="https://www.linkedin.com/in/yash-hulle/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-blue-500 transition-colors"
              >
                LinkedIn
              </a>
              <span className="text-muted-foreground">•</span>
              <a
                href="https://github.com/username"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-gray-900 dark:hover:text-gray-300 transition-colors"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border/50 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Yash Hulle. All rights reserved.
          </p>
          <div className="flex items-center mt-4 md:mt-0">
            <p className="text-sm text-muted-foreground flex items-center">
              Made with <Heart className="h-3 w-3 mx-1 text-red-500 animate-pulse" /> using Next.js & Tailwind CSS
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
