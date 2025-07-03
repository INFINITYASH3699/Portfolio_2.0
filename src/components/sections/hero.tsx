"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import {
  ArrowRight,
  Download,
  Github,
  Linkedin,
  Mail,
  Code,
  Sparkles,
  Star,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { getBasicInfo } from "@/lib/resume";

export function HeroSection() {
  const { name, objective } = getBasicInfo();
  const targetRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  // Mouse tracking for parallax effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-300, 300], [5, -5]));
  const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-5, 5]));

  // Split the first name and last name for animation
  const nameParts = name.split(" ");
  const firstName = nameParts[0];
  const lastName = nameParts.slice(1).join(" ");

  // Enhanced 3D tilt effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;

      const x = (clientX - innerWidth / 2) / (innerWidth / 2);
      const y = (clientY - innerHeight / 2) / (innerHeight / 2);

      mouseX.set(x * 50);
      mouseY.set(y * 50);
      setMousePosition({ x: clientX, y: clientY });

      // Check if hovering over interactive elements
      const target = e.target as HTMLElement;
      const isInteractive = target.closest('button, a, [role="button"]') !== null;
      setIsHovering(isInteractive);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // Floating animation variants
  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      rotate: [0, 3, 0, -3, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const socialLinks = [
    { icon: Github, href: "https://github.com/INFINITYASH3699", label: "GitHub" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/yash-hulle/", label: "LinkedIn" },
    { icon: Mail, href: "mailto:yash.hulle3699@gmail.com", label: "Email" },
  ];

  return (
    <section
      id="home"
      ref={targetRef}
      className="min-h-screen w-full flex flex-col items-center justify-center py-16 overflow-hidden relative"
    >
      {/* Simplified animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            x: [0, 50, 0],
            y: [0, -25, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute top-20 left-1/4 w-72 h-72 bg-gradient-to-r from-primary/15 to-blue-500/15 rounded-full mix-blend-multiply filter blur-3xl opacity-70"
        />
        <motion.div
          animate={{
            x: [0, -50, 0],
            y: [0, 25, 0],
            scale: [1.1, 1, 1.1],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-20 right-1/4 w-72 h-72 bg-gradient-to-l from-purple-500/15 to-pink-500/15 rounded-full mix-blend-multiply filter blur-3xl opacity-70"
        />
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.01]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Left side - Content */}
          <div className="order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="space-y-6"
            >
              {/* Greeting */}
              <div className="space-y-3">
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-muted-foreground"
                >
                  Hello, I&apos;m
                </motion.p>

                {/* Name */}
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="text-4xl md:text-5xl lg:text-6xl font-bold font-display leading-tight"
                >
                  <motion.span
                    className="bg-gradient-to-r from-primary via-blue-500 to-purple-500 bg-clip-text text-transparent"
                    animate={{
                      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    {firstName}
                  </motion.span>{" "}
                  <span>{lastName}</span>
                </motion.h1>

                {/* Typing animation */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="text-xl md:text-2xl font-medium flex items-center h-12"
                >
                  <span className="text-muted-foreground mr-2">I'm a</span>
                  <TypeAnimation
                    sequence={[
                      "Full-Stack Developer",
                      2000,
                      "React Specialist",
                      2000,
                      "MERN Stack Expert",
                      2000,
                      "Problem Solver",
                      2000,
                    ]}
                    wrapper="span"
                    speed={50}
                    repeat={Infinity}
                    className="text-primary font-bold"
                    cursor={true}
                  />
                </motion.div>
              </div>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="text-muted-foreground max-w-lg leading-relaxed"
              >
                {objective}
              </motion.p>

              {/* Action buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="flex flex-wrap gap-4 pt-2"
              >
                <Button
                  size="lg"
                  className="rounded-full group bg-gradient-to-r from-primary to-blue-600"
                  asChild
                >
                  <a href="#contact">
                    <Mail className="mr-2 h-4 w-4" />
                    <span>Get in touch</span>
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </a>
                </Button>

                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full group"
                  asChild
                >
                  <a
                    href="/resume/Yash_Hulle_Frontend_Developer.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    <span>Resume</span>
                  </a>
                </Button>
              </motion.div>

              {/* Social links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="flex gap-3 pt-2"
              >
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-full bg-card border border-border hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 group"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <social.icon className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>
          </div>

          {/* Right side - Enhanced profile (30% larger) */}
          <div className="order-1 lg:order-2 flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              style={{ rotateX, rotateY }}
              className="relative w-[364px] h-[364px] md:w-[416px] md:h-[416px]" // Increased by 30%
            >
              {/* Outer ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full border border-dashed border-primary/20"
              />

              {/* Glowing circle */}
              <motion.div
                animate={{
                  scale: [1, 1.02, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute inset-3 rounded-full bg-gradient-to-r from-primary/15 via-blue-500/15 to-purple-500/15 blur-lg"
              />

              {/* Profile image */}
              <div className="absolute inset-6 rounded-full overflow-hidden border-2 border-primary/20 shadow-xl bg-gradient-to-br from-card to-card/80">
                <Image
                  src="/images/profile.png"
                  alt={name}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-105"
                  sizes="(max-width: 768px) 364px, 416px" // Updated sizes
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/5 via-transparent to-transparent" />
              </div>

              {/* Compact floating elements */}
              <motion.div
                variants={floatingVariants}
                animate="animate"
                className="absolute -top-2 -right-2 w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl shadow-lg flex items-center justify-center"
              >
                <Code className="w-6 h-6 text-white" />
              </motion.div>

              <motion.div
                variants={floatingVariants}
                animate="animate"
                style={{ animationDelay: "1s" }}
                className="absolute -bottom-3 -left-3 w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl shadow-lg flex items-center justify-center"
              >
                <Sparkles className="w-5 h-5 text-white" />
              </motion.div>

              <motion.div
                variants={floatingVariants}
                animate="animate"
                style={{ animationDelay: "2s" }}
                className="absolute top-1/4 -left-4 w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg shadow-lg flex items-center justify-center"
              >
                <Zap className="w-4 h-4 text-white" />
              </motion.div>

              <motion.div
                variants={floatingVariants}
                animate="animate"
                style={{ animationDelay: "0.5s" }}
                className="absolute bottom-1/3 -right-4 w-8 h-8 bg-gradient-to-br from-orange-500 to-red-500 rounded-full shadow-lg flex items-center justify-center"
              >
                <Star className="w-4 h-4 text-white" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Compact scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.5 }}
        className="absolute bottom-6 left-1/2 transform -translate-x-1/2"
      >
        <motion.a
          href="#about"
          className="flex flex-col items-center group cursor-pointer"
          animate={{ y: [0, 5, 0] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <span className="text-xs text-muted-foreground mb-1 group-hover:text-primary transition-colors">
            Scroll
          </span>
          <div className="w-5 h-8 border border-muted-foreground group-hover:border-primary rounded-full flex justify-center transition-colors">
            <motion.div
              className="w-0.5 h-2 bg-muted-foreground group-hover:bg-primary rounded-full mt-1.5"
              animate={{ y: [0, 8, 0] }}
              transition={{
                                duration: 1.2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>
        </motion.a>
      </motion.div>
    </section>
  );
}