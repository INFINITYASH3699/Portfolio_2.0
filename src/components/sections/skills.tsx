"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Tilt from "react-parallax-tilt";
import { Card, CardContent } from "@/components/ui/card";
import { skills } from "@/lib/data";
import { useMemo } from "react";

export default function Skills() {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.165, 0.84, 0.44, 1],
      },
    },
  };

  const particles = useMemo(() => {
    return Array.from({ length: 10 }, (_, i) => ({
      id: `particle-${i}`,
      x: [Math.random() * 100, Math.random() * 100 + 50],
      y: [Math.random() * 100, Math.random() * 100 + 50],
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      duration: Math.random() * 5 + 5,
    }));
  }, []);

  return (
    <section id="skills" className="section py-24 bg-grid relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-3/4 h-3/4 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-2/3 h-2/3 bg-blue-400/5 rounded-full blur-3xl" />
      </div>

      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="container relative z-10"
      >
        <motion.div variants={itemVariants} className="flex flex-col items-center mb-16">
          <span className="px-3 py-1 text-sm font-medium bg-primary/10 text-primary rounded-full mb-3">
            My Skills
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gradient">
            Technical Expertise
          </h2>
          <div className="w-24 h-1 bg-primary mt-6 rounded-full" />
          <p className="mt-4 text-center text-muted-foreground max-w-2xl">
            A showcase of my technical skills and proficiency in various technologies
            I've worked with throughout my journey as a web developer.
          </p>
        </motion.div>

        <div className="space-y-12">
          {skills.categories.map((category) => (
            <motion.div
              key={category.id}
              variants={itemVariants}
              className="space-y-6"
            >
              <h3 className="text-2xl font-semibold text-foreground relative inline-block">
                {category.title}
                <div className="absolute -bottom-1 left-0 h-0.5 w-full bg-primary/50 rounded-full" />
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {category.skills.map((skill) => (
                  <Tilt
                    key={skill.id}
                    tiltMaxAngleX={10}
                    tiltMaxAngleY={10}
                    perspective={800}
                    transitionSpeed={1500}
                    scale={1.02}
                    className="w-full h-full"
                  >
                    <motion.div
                      variants={itemVariants}
                      whileHover={{ y: -5 }}
                      className="h-full"
                    >
                      <Card className="overflow-hidden h-full bg-black/20 backdrop-blur-sm border-primary/10 hover:border-primary/30 transition-all duration-300">
                        <CardContent className="p-4 flex flex-col items-center justify-center">
                          <div className="flex justify-center h-14 w-14 mb-3 relative">
                            <img
                              src={skill.icon}
                              alt={skill.name}
                              className="w-full h-full object-contain"
                            />
                            <motion.div
                              className="absolute inset-0 bg-primary/10 rounded-full"
                              animate={{
                                scale: [1, 1.1, 1],
                              }}
                              transition={{
                                duration: 2,
                                ease: "easeInOut",
                                repeat: Infinity,
                              }}
                            />
                          </div>
                          <h4 className="text-base font-medium text-foreground text-center">
                            {skill.name}
                          </h4>
                          <div className="w-full mt-2 bg-black/30 h-1.5 rounded-full overflow-hidden">
                            <motion.div
                              className="h-full bg-primary rounded-full"
                              initial={{ width: 0 }}
                              animate={{ width: `${skill.level}%` }}
                              transition={{
                                duration: 1.5,
                                ease: "easeOut",
                                delay: 0.3
                              }}
                            />
                          </div>
                          <span className="text-xs text-primary/80 font-medium mt-1">
                            {skill.level}%
                          </span>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </Tilt>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Floating particles effect */}
        <div className="absolute inset-0 pointer-events-none">
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute w-2 h-2 rounded-full bg-primary/20"
              animate={{
                x: particle.x,
                y: particle.y,
                opacity: [0.2, 0.5, 0.2],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: particle.duration,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              style={{
                left: particle.left,
                top: particle.top,
              }}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
