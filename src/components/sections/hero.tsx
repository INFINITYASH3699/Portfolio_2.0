"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowDown, Github, LinkedinIcon, Mail } from "lucide-react";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const socialLinks = [
  {
    icon: <Github className="h-5 w-5" />,
    href: "https://github.com/INFINITYASH3699/",
    label: "GitHub",
  },
  {
    icon: <LinkedinIcon className="h-5 w-5" />,
    href: "https://www.linkedin.com/in/yash-hulle/",
    label: "LinkedIn",
  },
  {
    icon: <Mail className="h-5 w-5" />,
    href: "mailto:yash.hulle3699@gmail.com",
    label: "Email",
  },
];

export function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center py-32 px-4 overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />

      <div className="container mx-auto grid md:grid-cols-2 gap-8 items-center z-10">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="flex flex-col space-y-6"
        >
          <motion.div variants={fadeInUp}>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2">
              Hi, I'm <span className="text-primary">Yash Hulle</span>
            </h1>
            <p className="text-2xl sm:text-3xl mb-4 text-muted-foreground">
              Web Developer
            </p>
          </motion.div>

          <motion.p
            variants={fadeInUp}
            className="text-muted-foreground max-w-md"
          >
            Passionate Web Developer skilled in JavaScript, Next.js, and MERN
            stack, eager to build scalable and user-friendly web applications.
          </motion.p>

          <motion.div variants={fadeInUp} className="flex flex-wrap gap-4 pt-2">
            <Button size="lg">
              <a href="#contact">Contact Me</a>
            </Button>
            <Button size="lg" variant="outline">
              <a href="#projects">View Projects</a>
            </Button>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="flex items-center space-x-4 pt-2"
          >
            {socialLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-muted rounded-full hover:bg-muted/80 transition-colors"
                aria-label={link.label}
              >
                {link.icon}
              </a>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] flex justify-center"
        >
          <div className="relative w-full max-w-md aspect-square">
            <div className="absolute inset-0 bg-primary/10 rounded-full animate-pulse" />
            <Image
              src="/images/profile.png"
              alt="Yash Hulle"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover rounded-full p-2"
              priority
            />
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#about"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.5,
          delay: 1,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
      >
        <span className="text-sm text-muted-foreground mb-2">Scroll Down</span>
        <ArrowDown className="w-5 h-5 text-primary" />
      </motion.a>
    </section>
  );
}
