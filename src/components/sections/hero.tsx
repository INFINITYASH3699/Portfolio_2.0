"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useRef, useEffect } from "react";
import Tilt from "react-parallax-tilt";
import { useInView } from "react-intersection-observer";
import { personal } from "@/lib/data";

export default function Hero() {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!textRef.current) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!textRef.current) return;

      const { left, top, width, height } = textRef.current.getBoundingClientRect();
      const x = e.clientX - left;
      const y = e.clientY - top;

      const centerX = width / 2;
      const centerY = height / 2;

      const distanceX = (x - centerX) / centerX;
      const distanceY = (y - centerY) / centerY;

      textRef.current.style.textShadow = `
        ${distanceX * 5}px ${distanceY * 5}px 10px rgba(58, 134, 255, 0.4),
        ${-distanceX * 5}px ${-distanceY * 5}px 10px rgba(113, 47, 255, 0.4)
      `;
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.165, 0.84, 0.44, 1],
      },
    },
  };

  const glow = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: [0.3, 0.5, 0.3],
      scale: 1,
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse" as const,
      },
    },
  };

  return (
    <section id="home" ref={ref} className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-grid">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="absolute -bottom-[40%] -right-[20%] w-[70%] h-[70%] rounded-full bg-primary/20 blur-[120px]"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="absolute -top-[30%] -left-[10%] w-[50%] h-[60%] rounded-full bg-blue-500/20 blur-[100px]"
        />
      </div>

      {/* Animated Dots Pattern */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(58,134,255,0.15)_1px,transparent_1px)] bg-[length:30px_30px]" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="relative z-10 container mx-auto px-4 flex flex-col lg:flex-row items-center justify-between"
      >
        <div className="w-full lg:w-1/2 space-y-8 mb-12 lg:mb-0">
          <motion.div variants={itemVariants}>
            <h3 className="text-lg md:text-xl text-primary">Hello, I am</h3>
          </motion.div>

          <motion.h1
            ref={textRef}
            variants={itemVariants}
            className="text-5xl md:text-7xl font-bold tracking-tight text-gradient"
          >
            {personal.name}
          </motion.h1>

          <motion.div
            variants={itemVariants}
            className="relative pl-6 border-l-2 border-primary my-6"
          >
            <div className="typewriter font-medium text-xl md:text-2xl">
              <span className="text-foreground">Passionate </span>
              <span className="text-primary typing">
                {personal.title}
              </span>
            </div>
          </motion.div>

          <motion.p
            variants={itemVariants}
            className="text-lg text-muted-foreground max-w-lg"
          >
            {personal.shortBio}
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-wrap gap-4 pt-4"
          >
            <a href="#projects">
              <Button size="lg" className="text-base">
                View Projects
              </Button>
            </a>
            <a href="#contact">
              <Button size="lg" variant="outline" className="text-base">
                Contact Me
              </Button>
            </a>
          </motion.div>
        </div>

        <div className="w-full lg:w-1/2 flex justify-center relative">
          <motion.div
            variants={glow}
            initial="hidden"
            animate="visible"
            className="absolute inset-0 bg-primary/20 rounded-full blur-[60px] z-0"
          />

          <Tilt
            tiltMaxAngleX={15}
            tiltMaxAngleY={15}
            perspective={800}
            scale={1.05}
            transitionSpeed={2000}
            gyroscope={true}
            className="z-10"
          >
            <motion.div
              variants={itemVariants}
              className="h-72 w-72 sm:h-80 sm:w-80 md:h-96 md:w-96 relative rounded-lg overflow-hidden border-2 border-primary/20 backdrop-blur-sm bg-black/10"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-primary/5 to-primary/30" />
              <div className="flex h-full w-full items-center justify-center">
                <div className="relative z-10 text-center">
                  <div className="relative h-40 w-40 md:h-60 md:w-60 mx-auto overflow-hidden mb-4">
                    <motion.img
                      src={personal.profileImage}
                      alt={personal.name}
                      className="h-full w-full object-cover rounded-full"
                      initial={{ scale: 1.2, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.8 }}
                    />
                  </div>
                  <div className="space-y-2">
                    <motion.div
                      variants={itemVariants}
                      className="flex flex-wrap gap-2 justify-center"
                    >
                      <span className="px-3 py-1 text-xs font-medium text-white bg-blue-600 rounded-full">React</span>
                      <span className="px-3 py-1 text-xs font-medium text-white bg-green-600 rounded-full">Node.js</span>
                      <span className="px-3 py-1 text-xs font-medium text-white bg-yellow-600 rounded-full">JavaScript</span>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          </Tilt>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <p className="text-muted-foreground text-sm mb-2">Scroll Down</p>
        <motion.div
          className="w-5 h-10 rounded-full border-2 border-muted-foreground flex justify-center"
          initial={{ opacity: 0.5 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="w-1.5 h-1.5 bg-primary rounded-full"
            initial={{ y: 0 }}
            animate={{ y: 24 }}
            transition={{
              repeat: Infinity,
              repeatType: "reverse",
              duration: 1.5,
              ease: "easeInOut"
            }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
