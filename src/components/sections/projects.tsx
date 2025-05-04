"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Tilt from "react-parallax-tilt";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { projects } from "@/lib/data";
import Link from "next/link";
import { useState } from "react";

export default function Projects() {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  const [filter, setFilter] = useState<string | null>(null);

  // Extract unique tags for filtering
  const allTags = Array.from(
    new Set(
      projects.flatMap((project) => project.tags)
    )
  );

  // Filter projects based on selected tag
  const filteredProjects = filter
    ? projects.filter(project => project.tags.includes(filter))
    : projects;

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

  return (
    <section id="projects" className="section py-24 bg-grid relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 z-0">
        <div className="absolute -top-[40%] right-0 w-2/3 h-2/3 bg-primary/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-3/4 h-3/4 bg-blue-500/5 rounded-full blur-[100px]" />
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
            My Work
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gradient">
            Featured Projects
          </h2>
          <div className="w-24 h-1 bg-primary mt-6 rounded-full" />
          <p className="mt-4 text-center text-muted-foreground max-w-2xl">
            A showcase of my best work, personal projects, and contributions. Each project represents unique challenges and solutions.
          </p>
        </motion.div>

        {/* Filter Tags */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap gap-2 justify-center mb-12"
        >
          <Badge
            variant={filter === null ? "default" : "outline"}
            className="cursor-pointer text-sm px-4 py-2 hover:bg-primary/20 transition-all"
            onClick={() => setFilter(null)}
          >
            All
          </Badge>
          {allTags.map((tag) => (
            <Badge
              key={tag}
              variant={filter === tag ? "default" : "outline"}
              className="cursor-pointer text-sm px-4 py-2 hover:bg-primary/20 transition-all"
              onClick={() => setFilter(tag)}
            >
              {tag}
            </Badge>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              className="flex h-full"
            >
              <Tilt
                tiltMaxAngleX={5}
                tiltMaxAngleY={5}
                perspective={1000}
                scale={1.02}
                transitionSpeed={1500}
                className="w-full h-full"
              >
                <Card className="h-full overflow-hidden border-primary/10 bg-black/20 backdrop-blur-sm hover:border-primary/30 transition-all duration-300">
                  <div className="relative h-48 overflow-hidden group">
                    {project.image ? (
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-primary/10 to-blue-600/20 flex items-center justify-center">
                        <span className="text-xl font-medium text-foreground/70">{project.title}</span>
                      </div>
                    )}
                    {/* Overlay for hover effect */}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="flex gap-3">
                        {project.liveLink && (
                          <Link href={project.liveLink} target="_blank" rel="noopener noreferrer">
                            <Button size="sm" className="bg-primary hover:bg-primary/80">
                              Live Demo
                            </Button>
                          </Link>
                        )}
                        {project.githubLink && (
                          <Link href={project.githubLink} target="_blank" rel="noopener noreferrer">
                            <Button variant="outline" size="sm">
                              GitHub
                            </Button>
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="flex justify-between items-center">
                      {project.title}
                      {project.featured && (
                        <Badge variant="default" className="ml-2">
                          Featured
                        </Badge>
                      )}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-muted-foreground">
                      {project.description}
                    </CardDescription>
                  </CardContent>
                  <CardFooter className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <Badge key={`${project.id}-${tag}`} variant="secondary" className="bg-primary/10">
                        {tag}
                      </Badge>
                    ))}
                  </CardFooter>
                </Card>
              </Tilt>
            </motion.div>
          ))}
        </div>

        {/* More projects link */}
        <motion.div
          variants={itemVariants}
          className="mt-12 flex justify-center"
        >
          <Link href="https://github.com/INFINITYASH3699" target="_blank" rel="noopener noreferrer">
            <Button variant="outline" className="group relative overflow-hidden">
              <span className="relative z-10">
                View More on GitHub
                <span className="inline-block transition-transform group-hover:translate-x-1 ml-1">
                  →
                </span>
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Button>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
