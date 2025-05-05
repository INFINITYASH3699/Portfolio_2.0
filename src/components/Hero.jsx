"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const Hero = ({ data, mousePosition }) => {
  const heroRef = useRef(null);

  // Parallax effect on hero elements
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!heroRef.current) return;

      const elements = heroRef.current.querySelectorAll('.parallax');
      const xValue = (e.clientX - window.innerWidth / 2) / 25;
      const yValue = (e.clientY - window.innerHeight / 2) / 25;

      elements.forEach((element, i) => {
        const depth = i + 1;
        const moveX = xValue * depth * 0.5;
        const moveY = yValue * depth * 0.5;
        element.style.transform = `translate(${moveX}px, ${moveY}px)`;
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Text animation variants
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: custom * 0.2,
        duration: 0.8,
        ease: [0.2, 0.65, 0.3, 0.9]
      }
    })
  };

  return (
    <section
      ref={heroRef}
      className="h-screen flex items-center justify-center relative overflow-hidden"
      style={{
        backgroundImage: "url('/images/hero-bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
    >
      {/* Overlay gradient */}
      <div className="absolute inset-0 hero-gradient"></div>

      {/* Content container */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 z-10 relative">
        <div className="flex flex-col md:flex-row items-center justify-between gap-10">

          {/* Left column - text content */}
          <motion.div
            className="w-full md:w-1/2 text-center md:text-left"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <motion.div
              className="inline-block font-semibold text-sm sm:text-base mb-3 border border-blue-400/30 bg-blue-500/10 px-4 py-1 rounded-full parallax"
              variants={textVariants}
              initial="hidden"
              animate="visible"
              custom={0}
            >
              Web Developer
            </motion.div>

            <motion.h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 tracking-tight parallax"
              variants={textVariants}
              initial="hidden"
              animate="visible"
              custom={1}
            >
              Hi, I'm <span className="text-gradient">{data.name}</span>
            </motion.h1>

            <motion.p
              className="text-foreground/80 text-lg sm:text-xl mb-8 max-w-2xl parallax"
              variants={textVariants}
              initial="hidden"
              animate="visible"
              custom={2}
            >
              {data.objective}
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4 justify-center md:justify-start parallax"
              variants={textVariants}
              initial="hidden"
              animate="visible"
              custom={3}
            >
              <Link
                href="#projects"
                className="bg-foreground text-background px-6 py-3 rounded-md font-medium hover:opacity-90 transition-opacity text-sm sm:text-base"
              >
                View Projects
              </Link>

              <Link
                href="#contact"
                className="border border-foreground/30 px-6 py-3 rounded-md font-medium hover:bg-foreground/10 transition-colors text-sm sm:text-base"
              >
                Contact Me
              </Link>
            </motion.div>
          </motion.div>

          {/* Right column - animated elements */}
          <div className="w-full md:w-1/2 relative">
            <motion.div
              className="relative mx-auto w-64 h-64 sm:w-80 sm:h-80 rounded-full bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm parallax"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              style={{
                transform: `perspective(1000px) rotateX(${mousePosition.y * 5}deg) rotateY(${mousePosition.x * 5}deg)`
              }}
            >
              {/* Floating animated elements */}
              <div className="animated-shadow" style={{ top: '10%', left: '20%' }}></div>
              <div className="animated-shadow" style={{ bottom: '20%', right: '15%', animationDelay: '-3s' }}></div>

              {/* Tech stack symbols */}
              <motion.div
                className="absolute w-14 h-14 rounded-full bg-accent flex items-center justify-center shadow-lg transform"
                animate={{ y: [0, -15, 0], x: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                style={{ top: '10%', right: '10%' }}
              >
                <span className="font-bold text-xl">JS</span>
              </motion.div>

              <motion.div
                className="absolute w-14 h-14 rounded-full bg-accent flex items-center justify-center shadow-lg transform"
                animate={{ y: [0, 15, 0], x: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                style={{ bottom: '15%', left: '5%' }}
              >
                <span className="font-bold text-xl">React</span>
              </motion.div>

              <motion.div
                className="absolute w-14 h-14 rounded-full bg-accent flex items-center justify-center shadow-lg transform"
                animate={{ y: [0, 10, 0], x: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                style={{ bottom: '10%', right: '30%' }}
              >
                <span className="font-bold text-xl">Next</span>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
