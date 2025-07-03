"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { getBasicInfo } from "@/lib/resume";
import { Button } from "@/components/ui/button";
import { 
  Linkedin, 
  Mail, 
  Download, 
  MapPin, 
  Calendar,
  Code,
  Coffee,
  Heart,
  Star,
  Clock,
  Sparkles,
  ArrowRight
} from "lucide-react";

export function AboutSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });
  const { name, location, objective } = getBasicInfo();
  
  // Mouse tracking for 3D effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(mouseY, { stiffness: 100, damping: 30 });
  const rotateY = useSpring(mouseX, { stiffness: 100, damping: 30 });

  // Counter animation states
  const [counters, setCounters] = useState({
    experience: 0,
    projects: 0,
    commits: 0
  });

  // Animate counters when in view
  useEffect(() => {
    if (isInView) {
      const targets = { experience: 1, projects: 15, commits: 500 };
      const duration = 2000;
      const steps = 60;
      const stepDuration = duration / steps;

      Object.keys(targets).forEach((key) => {
        const target = targets[key as keyof typeof targets];
        const increment = target / steps;
        let current = 0;
        let step = 0;

        const timer = setInterval(() => {
          step++;
          current = Math.min(current + increment, target);
          setCounters(prev => ({ ...prev, [key]: Math.floor(current) }));
          
          if (step >= steps) {
            clearInterval(timer);
            setCounters(prev => ({ ...prev, [key]: target }));
          }
        }, stepDuration);
      });
    }
  }, [isInView]);

  // Handle mouse move for 3D effect
  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const rotateXValue = (event.clientY - centerY) / 10;
    const rotateYValue = (centerX - event.clientX) / 10;
    
    mouseX.set(rotateYValue);
    mouseY.set(rotateXValue);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

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
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, type: "spring", stiffness: 100 },
    },
  };

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <section id="about" className="py-20 overflow-hidden relative">
      {/* Enhanced background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
      <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern opacity-[0.02] pointer-events-none" />
      <div className="absolute right-0 top-1/4 w-1/2 h-96 bg-gradient-to-l from-primary/10 to-transparent rounded-l-full blur-3xl -z-10" />
      <div className="absolute left-0 bottom-1/4 w-1/3 h-64 bg-gradient-to-r from-secondary/10 to-transparent rounded-r-full blur-3xl -z-10" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        >
          {/* Left side - Enhanced Image with 3D effects */}
          <motion.div
            variants={itemVariants}
            className="relative flex justify-center"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <div className="relative w-full max-w-md">
              {/* Floating decorative elements */}
              <motion.div 
                variants={floatingVariants}
                animate="animate"
                className="absolute -top-6 -left-6 w-12 h-12 bg-gradient-to-br from-primary to-primary/50 rounded-full opacity-20 blur-sm"
              />
              <motion.div 
                variants={floatingVariants}
                animate="animate"
                style={{ animationDelay: "1s" }}
                className="absolute -bottom-6 -right-6 w-16 h-16 bg-gradient-to-br from-secondary to-secondary/50 rounded-full opacity-20 blur-sm"
              />

              {/* Main image container with 3D effect */}
              <motion.div
                style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                className="relative aspect-square w-full"
              >
                {/* Background decorative layers */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl transform rotate-6 scale-105 blur-sm" />
                <div className="absolute inset-0 bg-gradient-to-tl from-primary/10 to-secondary/10 rounded-2xl transform -rotate-3 scale-102" />

                {/* Main image */}
                <div className="relative w-full h-full overflow-hidden rounded-2xl border-2 border-primary/20 shadow-2xl bg-gradient-to-br from-card to-card/80 backdrop-blur-sm">
                  <Image
                    src="/images/profile.png"
                    alt={name}
                    fill
                    className="object-cover transition-transform duration-700 hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 400px"
                    priority
                  />
                  
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/20 via-transparent to-transparent" />
                </div>

                {/* Enhanced floating cards */}
                <motion.div 
                  initial={{ opacity: 0, x: -50 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                  transition={{ delay: 0.5 }}
                  className="absolute -left-4 top-6 bg-card/95 backdrop-blur-md p-3 rounded-lg border border-primary/20 shadow-lg"
                >
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-primary/10 rounded-lg">
                      <MapPin className="w-3 h-3 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Based in</p>
                      <p className="font-semibold text-xs">{location}</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, x: 50 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                  transition={{ delay: 0.7 }}
                  className="absolute -right-4 bottom-6 bg-card/95 backdrop-blur-md p-3 rounded-lg border border-primary/20 shadow-lg"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                      <span className="text-xs font-medium">Available</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Coffee className="w-3 h-3 text-amber-500" />
                      <span className="text-xs">Coffee lover</span>
                    </div>
                  </div>
                </motion.div>

                {/* Status indicator */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                  transition={{ delay: 0.9 }}
                  className="absolute top-3 right-3 bg-green-500 w-3 h-3 rounded-full border-2 border-background shadow-lg animate-pulse"
                />
              </motion.div>
            </div>
          </motion.div>

          {/* Right side - Enhanced content */}
          <div className="space-y-6">
            {/* Header */}
            <motion.div variants={itemVariants}>
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1.5 rounded-full text-sm font-medium mb-4">
                <Sparkles className="w-4 h-4" />
                ABOUT ME
              </div>
              <h2 className="text-3xl md:text-4xl font-bold font-display mb-4 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                Crafting digital experiences with 
                <span className="text-primary"> passion</span>
              </h2>
            </motion.div>

            {/* Enhanced description */}
            <motion.div variants={itemVariants} className="space-y-3 text-muted-foreground leading-relaxed">
              <p>
                I'm a passionate <span className="text-primary font-semibold">Full-Stack Developer</span> specializing in creating modern, responsive, and user-friendly web applications. With expertise in the MERN stack and Next.js, I bring ideas to life through clean, efficient code.
              </p>
              <p className="text-sm">
                {objective}
              </p>
            </motion.div>

            {/* Compact stats counter */}
            <motion.div variants={itemVariants} className="grid grid-cols-3 gap-3">
              {[
                { icon: Calendar, label: "Years Exp.", value: counters.experience, suffix: "+" },
                { icon: Code, label: "Projects", value: counters.projects, suffix: "+" },
                { icon: Star, label: "Commits", value: counters.commits, suffix: "+" },
              ].map((stat, index) => (
                <div key={stat.label} className="text-center p-3 rounded-lg bg-card/50 border border-border/50">
                  <stat.icon className="w-5 h-5 text-primary mx-auto mb-1" />
                  <div className="text-xl font-bold text-primary">
                    {stat.value}{stat.suffix}
                  </div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </motion.div>

            {/* Compact action buttons */}
            <motion.div variants={itemVariants} className="pt-4 flex flex-wrap gap-3">
              <Button className="group" asChild>
                <a href="https://www.linkedin.com/in/yash-hulle/" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                  <span>LinkedIn</span>
                  <ArrowRight className="ml-2 h-3 w-3 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
              
              <Button variant="outline" className="group" asChild>
                <a href="mailto:yash.hulle3699@gmail.com">
                  <Mail className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                  <span>Contact</span>
                </a>
              </Button>
              
              <Button variant="secondary" className="group" asChild>
                <a href="/resume/Yash_Hulle_Frontend_Developer.pdf" target="_blank" rel="noopener noreferrer">
                  <Download className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                  <span>Resume</span>
                </a>
              </Button>
            </motion.div>

            {/* Compact fun facts section */}
            <motion.div variants={itemVariants} className="pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="flex items-center gap-2 p-3 rounded-lg bg-gradient-to-r from-primary/5 to-primary/10 border border-primary/20">
                  <Heart className="w-4 h-4 text-red-500" />
                  <div>
                    <p className="font-medium text-sm">Clean code & UX</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 p-3 rounded-lg bg-gradient-to-r from-secondary/5 to-secondary/10 border border-secondary/20">
                  <Clock className="w-4 h-4 text-blue-500" />
                  <div>
                    <p className="font-medium text-sm">Always learning</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}