"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { getBasicInfo } from "@/lib/resume";
import { Button } from "@/components/ui/button";
import { Linkedin, Mail, Download } from "lucide-react";

export function AboutSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });
  const { name, location, objective } = getBasicInfo();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section id="about" className="py-20 overflow-hidden relative z-10">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        >
          {/* Left side - Image with parallax effect */}
          <motion.div
            variants={itemVariants}
            className="relative flex justify-center"
          >
            <div className="relative w-full max-w-md aspect-square">
              {/* Decorative elements */}
              <div className="absolute -top-5 -left-5 w-64 h-64 bg-primary/5 rounded-lg -z-10" />
              <div className="absolute -bottom-5 -right-5 w-64 h-64 bg-primary/10 rounded-lg -z-10" />

              {/* Main image container */}
              <div className="card-3d w-full h-full overflow-hidden rounded-lg border border-primary/10 shadow-lg">
                <Image
                  src="/images/profile.png"
                  alt={name}
                  fill
                  className="object-cover card-3d-content"
                  sizes="(max-width: 768px) 100vw, 500px"
                />
              </div>

              {/* Stats card */}
              <div className="absolute -right-10 bottom-20 bg-card/80 backdrop-blur-sm p-4 rounded-lg border border-border/50 shadow-lg card-3d-content">
                <div className="text-sm space-y-1">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-green-500"></div>
                    <span className="font-medium">2+ Years Experience</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                    <span className="font-medium">10+ Projects</span>
                  </div>
                </div>
              </div>

              {/* Location card */}
              <div className="absolute -left-10 top-20 bg-card/80 backdrop-blur-sm p-4 rounded-lg border border-border/50 shadow-lg card-3d-content">
                <div className="text-sm">
                  <p className="font-medium">📍 {location}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right side - Text content */}
          <div className="space-y-6">
            <motion.div variants={itemVariants}>
              <h4 className="text-primary font-medium mb-2">ABOUT ME</h4>
              <h2 className="text-3xl md:text-4xl font-bold font-display mb-6">
                Crafting digital experiences with code & creativity
              </h2>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="space-y-4 text-muted-foreground"
            >
              <p>
                I'm a passionate Web Developer specializing in creating modern, responsive, and user-friendly web applications. With expertise in the MERN stack and Next.js, I bring ideas to life through clean, efficient code.
              </p>
              <p>
                {objective}
              </p>
              <p>
                When I'm not coding, you'll find me exploring new technologies, contributing to open-source projects, or experimenting with creative UI/UX designs to enhance user experiences.
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="pt-4 flex flex-wrap gap-4"
            >
              <Button className="group" asChild>
                <a href="https://www.linkedin.com/in/yash-hulle/" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="mr-2 h-4 w-4" />
                  <span>LinkedIn</span>
                </a>
              </Button>
              <Button variant="outline" className="group" asChild>
                <a href="mailto:yash.hulle3699@gmail.com">
                  <Mail className="mr-2 h-4 w-4" />
                  <span>Contact Me</span>
                </a>
              </Button>
              <Button variant="secondary" className="group" asChild>
                <a href="/resume/Yash_Hulle_Frontend_Developer.pdf" target="_blank" rel="noopener noreferrer">
                  <Download className="mr-2 h-4 w-4" />
                  <span>Resume</span>
                </a>
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Background decoration */}
      <div className="absolute right-0 top-1/4 w-1/3 h-72 bg-primary/5 rounded-l-full -z-10 blur-3xl" />
    </section>
  );
}
