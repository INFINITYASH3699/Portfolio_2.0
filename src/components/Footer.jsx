"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const Footer = ({ data }) => {
  const currentYear = new Date().getFullYear();

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  // Social media links
  const socialLinks = [
    {
      name: "LinkedIn",
      url: data.linkedin,
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
    },
    {
      name: "Email",
      url: `mailto:${data.email}`,
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
    },
    {
      name: "Phone",
      url: `tel:${data.phone}`,
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
    }
  ];

  return (
    <footer className="bg-background border-t border-border py-10 mt-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Left column - Logo and copyright */}
          <motion.div
            className="mb-6 md:mb-0"
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
          >
            <Link href="/" className="inline-block mb-4">
              <span className="text-2xl font-bold text-gradient">
                Yash<span className="text-foreground">.dev</span>
              </span>
            </Link>
            <p className="text-foreground/60 text-sm">
              &copy; {currentYear} {data.name}. All rights reserved.
            </p>
          </motion.div>

          {/* Right column - links */}
          <div className="flex flex-col md:flex-row gap-8">
            {/* Navigation links */}
            <motion.div
              className="space-y-2"
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              custom={1}
            >
              <h3 className="text-sm font-semibold uppercase tracking-wider mb-3">Navigation</h3>
              <ul className="space-y-2">
                {["Home", "About", "Skills", "Experience", "Projects", "Contact"].map((item, index) => (
                  <motion.li
                    key={index}
                    whileHover={{ x: 3 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Link
                      href={item === "Home" ? "/" : `#${item.toLowerCase()}`}
                      className="text-foreground/70 hover:text-foreground transition-colors text-sm"
                    >
                      {item}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Social links */}
            <motion.div
              className="space-y-2"
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              custom={2}
            >
              <h3 className="text-sm font-semibold uppercase tracking-wider mb-3">Connect</h3>
              <ul className="space-y-2">
                {socialLinks.map((link, index) => (
                  <motion.li
                    key={index}
                    whileHover={{ x: 3 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Link
                      href={link.url}
                      target={link.name === "LinkedIn" ? "_blank" : ""}
                      rel={link.name === "LinkedIn" ? "noopener noreferrer" : ""}
                      className="text-foreground/70 hover:text-foreground transition-colors text-sm flex items-center gap-2"
                    >
                      <span className="text-blue-400">{link.icon}</span>
                      <span>{link.name}</span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>

        {/* Bottom text */}
        <motion.div
          className="text-center text-foreground/50 text-xs mt-10"
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          custom={3}
        >
          <p>Designed and built with ❤️ using Next.js, Tailwind CSS, Framer Motion and Three.js</p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
