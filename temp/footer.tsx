"use client";

import { motion } from "framer-motion";
import { personal, social } from "@/lib/data";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const navLinks = [
    { name: "Home", path: "#home" },
    { name: "About", path: "#about" },
    { name: "Skills", path: "#skills" },
    { name: "Projects", path: "#projects" },
    { name: "Contact", path: "#contact" },
  ];

  return (
    <footer className="py-10 bg-background relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-1">
            <a href="#home" className="text-xl font-bold text-gradient inline-block mb-4">
              {personal.name}
            </a>
            <p className="text-muted-foreground mb-6 max-w-xs">
              Building scalable and user-friendly web applications using modern technologies.
            </p>
            <div className="flex space-x-3">
              {social.map((item) => (
                <a
                  key={item.id}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-black/30 flex items-center justify-center hover:bg-primary/20 transition-colors"
                >
                  <img src={item.icon} alt={item.platform} className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Links</h3>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.path}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="text-muted-foreground">
                <span className="block">Phone</span>
                <a
                  href={`tel:${personal.phone}`}
                  className="hover:text-primary transition-colors"
                >
                  {personal.phone}
                </a>
              </li>
              <li className="text-muted-foreground">
                <span className="block">Email</span>
                <a
                  href={`mailto:${personal.email}`}
                  className="hover:text-primary transition-colors"
                >
                  {personal.email}
                </a>
              </li>
              <li className="text-muted-foreground">
                <span className="block">Location</span>
                {personal.location}
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Languages</h3>
            <ul className="space-y-2">
              {personal.languages.map((language) => (
                <li key={language} className="text-muted-foreground">
                  {language}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm mb-4 md:mb-0">
            © {currentYear} {personal.name}. All rights reserved.
          </p>
          <div className="text-xs text-muted-foreground">
            <p>
              Designed & Built with
              <span className="inline-block mx-1 text-red-500">❤</span>
              using Next.js & Tailwind CSS
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
