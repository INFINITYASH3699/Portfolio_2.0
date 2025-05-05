"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ArrowUp } from "lucide-react";
import { getSocialLinks, getBasicInfo } from "@/lib/resume";

const socialIcons: Record<string, React.ReactNode> = {
  GitHub: <Github className="h-5 w-5" />,
  LinkedIn: <Linkedin className="h-5 w-5" />,
  Email: <Mail className="h-5 w-5" />,
};

export function Footer() {
  const socialLinks = getSocialLinks();
  const { name } = getBasicInfo();
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="bg-muted/10 border-t border-border/20 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          <div className="text-center md:text-left">
            <h3 className="text-xl font-display font-bold mb-2">
              <span className="text-primary">Yash</span>.dev
            </h3>
            <p className="text-muted-foreground text-sm">
              Web Developer | MERN Stack | Next.js
            </p>
          </div>

          <div className="text-center">
            <div className="flex justify-center space-x-4">
              {socialLinks.map((link) => (
                <motion.a
                  key={link.url}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-muted/50 rounded-full hover:bg-primary/10 hover:text-primary transition-colors"
                  aria-label={link.platform}
                  whileHover={{ y: -3 }}
                >
                  {socialIcons[link.platform] || null}
                </motion.a>
              ))}
            </div>
          </div>

          <div className="text-center md:text-right">
            <button
              onClick={scrollToTop}
              className="p-3 bg-primary/10 rounded-full text-primary hover:bg-primary/20 transition-colors inline-flex items-center justify-center mb-4"
              aria-label="Scroll to top"
            >
              <ArrowUp className="h-5 w-5" />
            </button>

            <p className="text-muted-foreground text-sm">
              &copy; {currentYear} {name}. All rights reserved.
            </p>
          </div>
        </div>

        <div className="mt-8 pt-4 border-t border-border/10 text-center text-muted-foreground text-xs">
          <p>Designed and built with Next.js, Tailwind CSS, and Framer Motion</p>
        </div>
      </div>
    </footer>
  );
}
