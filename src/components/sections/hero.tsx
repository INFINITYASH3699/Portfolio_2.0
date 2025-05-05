"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { ArrowRight, ArrowDown, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getBasicInfo } from "@/lib/resume";

export function HeroSection() {
  const { name, objective } = getBasicInfo();
  const targetRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const blurValue = useTransform(scrollYProgress, [0, 0.5], [0, 8]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);
  const position = useTransform(scrollYProgress, (pos) => {
    return pos === 1 ? "relative" : "sticky";
  });

  // Split the first name and last name for animation
  const nameParts = name.split(" ");
  const firstName = nameParts[0];
  const lastName = nameParts.slice(1).join(" ");

  // 3D tilt effect for the profile container
  useEffect(() => {
    const profileContainer = document.querySelector(".profile-3d-container");
    if (!profileContainer) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!profileContainer) return;

      const rect = profileContainer.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      const container = profileContainer as HTMLElement;
      container.style.transform = `
        perspective(1000px)
        rotateY(${x * 0.01}deg)
        rotateX(${-y * 0.01}deg)
      `;
    };

    const handleMouseLeave = () => {
      if (!profileContainer) return;
      const container = profileContainer as HTMLElement;
      container.style.transform = `
        perspective(1000px)
        rotateY(0deg)
        rotateX(0deg)
      `;
    };

    profileContainer.addEventListener("mousemove", handleMouseMove);
    profileContainer.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      profileContainer.removeEventListener("mousemove", handleMouseMove);
      profileContainer.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <motion.section
      id="home"
      ref={targetRef}
      className="min-h-screen w-full flex flex-col items-center justify-center py-20 overflow-hidden bg-dotted-grid"
      style={{
        opacity,
        filter: `blur(${blurValue.get()}px)`,
        scale,
        position,
        top: 0,
        zIndex: 0
      }}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-1/4 w-72 h-72 bg-primary/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-float" />
        <div className="absolute bottom-20 right-1/4 w-72 h-72 bg-blue-400/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-float animation-delay-2000" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <div className="space-y-2">
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-primary font-medium"
                >
                  Hello, I&apos;m
                </motion.p>
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="text-4xl md:text-5xl lg:text-6xl font-bold font-display"
                >
                  <span className="gradient-text">{firstName}</span>{" "}
                  <span>{lastName}</span>
                </motion.h1>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="text-2xl md:text-3xl font-medium text-muted-foreground flex items-center h-12"
                >
                  <TypeAnimation
                    sequence={[
                      "Web Developer",
                      1500,
                      "Frontend Engineer",
                      1500,
                      "MERN Stack Developer",
                      1500,
                      "JavaScript Enthusiast",
                      1500,
                    ]}
                    wrapper="div"
                    speed={50}
                    repeat={Number.POSITIVE_INFINITY}
                    cursor={true}
                    className="text-primary"
                  />
                </motion.div>
              </div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="text-muted-foreground max-w-md"
              >
                {objective}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="flex flex-wrap gap-4 pt-4"
              >
                <Button size="lg" className="rounded-full group">
                  <span>Get in touch</span>
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button size="lg" variant="outline" className="rounded-full group" asChild>
                  <a href="/resume/Yash_Hulle_Frontend_Developer.pdf" target="_blank" rel="noopener noreferrer">
                    <Download className="mr-2 h-4 w-4 transition-transform group-hover:translate-y-1" />
                    <span>Download CV</span>
                  </a>
                </Button>
              </motion.div>
            </motion.div>
          </div>

          <div className="order-1 lg:order-2 flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="profile-3d-container relative w-[280px] h-[280px] md:w-[320px] md:h-[320px] lg:w-[380px] lg:h-[380px] transition-transform duration-200"
            >
              {/* Outer glowing circle */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-lg animate-pulse" />

              {/* Middle circle with pattern */}
              <div className="absolute inset-3 rounded-full bg-gradient-to-br from-primary/10 to-primary/5" />

              {/* Inner circle with profile image */}
              <div className="absolute inset-5 rounded-full overflow-hidden border-2 border-primary/10">
                <Image
                  src="/images/profile.png"
                  alt={name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 280px, (max-width: 1024px) 320px, 380px"
                  priority
                />
              </div>

              {/* 3D floating elements */}
              <div className="absolute top-0 -right-4 w-12 h-12 bg-blue-500/80 rounded-full blur-sm animate-float" />
              <div className="absolute -bottom-5 left-10 w-8 h-8 bg-purple-500/80 rounded-full blur-sm animate-float animation-delay-1000" />
              <div className="absolute top-1/4 -left-6 w-6 h-6 bg-pink-500/80 rounded-full blur-sm animate-float animation-delay-2000" />
            </motion.div>
          </div>
        </div>
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
        <ArrowDown className="w-5 h-5 text-primary animate-bounce" />
      </motion.a>
    </motion.section>
  );
}
