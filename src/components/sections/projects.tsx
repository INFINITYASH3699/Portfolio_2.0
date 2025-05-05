"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import { ExternalLinkIcon, GithubIcon, MonitorIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface Project {
  name: string;
  description: string[];
  technologies: string[];
  image: string;
  previewImage: string;
  liveLink?: string;
  githubLink?: string;
}

const projects: Project[] = [
  {
    name: "Opex Home Solutions",
    description: [
      "Developed a MERN stack web app for home design solutions using React.js, Node.js, and MongoDB, AWS.",
      "Optimized UI performance, integrated authentication, and enabled real-time database updates."
    ],
    technologies: ["React.js", "Node.js", "MongoDB", "AWS", "Express.js"],
    image: "/images/projects/opex.jpg",
    previewImage: "/images/project-previews/opex.jpg",
    liveLink: "https://opex-home-solutions.vercel.app/",
    githubLink: "https://github.com/INFINITYASH3699/Opex-Home-Solution"
  },
  {
    name: "Portfolio Hub",
    description: [
      "Built a responsive portfolio builder with real-time project management using Next.js, Tailwind CSS, and Node.js.",
      "Integrated secure user authentication and customizable UI for seamless portfolio creation and sharing."
    ],
    technologies: ["Next.js", "Tailwind CSS", "Node.js", "MongoDB", "TypeScript"],
    image: "/images/projects/portfolio-hub.jpg",
    previewImage: "/images/project-previews/portfolio-hub.jpg",
    liveLink: "https://portfolio-hubspot.vercel.app/",
    githubLink: "https://github.com/INFINITYASH3699/Portfolio-Hub"
  },
  {
    name: "THE CAKE HEAVEN",
    description: [
      "Designed and deployed a cake ecom website with tech stack using Next.js, Tailwind, Cloudinary and MongoDB.",
      "Improved accessibility and boosting user engagement and mobile usability."
    ],
    technologies: ["Next.js", "Tailwind CSS", "Cloudinary", "MongoDB", "Firebase Auth"],
    image: "/images/projects/cake-heaven.jpg",
    previewImage: "/images/project-previews/cake-heaven.jpg",
    liveLink: "https://the-cake-heaven.vercel.app/",
    githubLink: "https://github.com/INFINITYASH3699/THE-CAKE-HEAVEN"
  }
];

export function ProjectsSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const handleOpenPreview = (project: Project) => {
    setSelectedProject(project);
  };

  const handleClosePreview = () => {
    setSelectedProject(null);
  };

  return (
    <section
      id="projects"
      ref={ref}
      className="py-20 px-4"
    >
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            My <span className="text-primary">Projects</span>
          </h2>
          <div className="h-1 w-20 bg-primary mx-auto mb-6" />
          <p className="text-muted-foreground">
            Showcasing my latest work and projects. Each project reflects my skills, creativity, and problem-solving approach.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.name}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="project-card h-full overflow-hidden hover:shadow-lg border border-border/50 hover:border-primary/30 transition-all">
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.name}
                    fill
                    className="object-cover transition-transform hover:scale-105 duration-300"
                  />

                  {/* Overlay with buttons */}
                  <div className="absolute inset-0 bg-background/80 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="flex gap-3">
                      <Button
                        size="sm"
                        onClick={() => handleOpenPreview(project)}
                        className="rounded-full"
                      >
                        <MonitorIcon className="h-4 w-4 mr-2" />
                        Preview
                      </Button>
                      {project.liveLink && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="rounded-full"
                          asChild
                        >
                          <a href={project.liveLink} target="_blank" rel="noopener noreferrer">
                            <ExternalLinkIcon className="h-4 w-4" />
                          </a>
                        </Button>
                      )}
                      {project.githubLink && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="rounded-full"
                          asChild
                        >
                          <a href={project.githubLink} target="_blank" rel="noopener noreferrer">
                            <GithubIcon className="h-4 w-4" />
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>

                <CardContent className="p-5">
                  <h3 className="text-xl font-semibold mb-2">{project.name}</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {project.description[0].length > 100
                      ? `${project.description[0].substring(0, 100)}...`
                      : project.description[0]}
                  </p>

                  <div className="flex flex-wrap gap-2 mt-3">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-md"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Project Preview Dialog */}
      <Dialog open={!!selectedProject} onOpenChange={handleClosePreview}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden">
          {selectedProject && (
            <>
              <DialogHeader className="px-6 pt-6">
                <DialogTitle className="text-2xl">{selectedProject.name}</DialogTitle>
              </DialogHeader>

              <div className="relative h-[400px] w-full overflow-hidden">
                <Image
                  src={selectedProject.previewImage}
                  alt={`${selectedProject.name} preview`}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <h4 className="font-medium text-sm text-muted-foreground mb-2">PROJECT DESCRIPTION</h4>
                  <div className="space-y-2">
                    {selectedProject.description.map((paragraph, idx) => (
                      <p key={idx} className="text-sm">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-sm text-muted-foreground mb-2">TECHNOLOGIES USED</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-md"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-4 pt-2">
                  {selectedProject.liveLink && (
                    <Button asChild>
                      <a href={selectedProject.liveLink} target="_blank" rel="noopener noreferrer">
                        <ExternalLinkIcon className="h-4 w-4 mr-2" />
                        Visit Website
                      </a>
                    </Button>
                  )}
                  {selectedProject.githubLink && (
                    <Button variant="outline" asChild>
                      <a href={selectedProject.githubLink} target="_blank" rel="noopener noreferrer">
                        <GithubIcon className="h-4 w-4 mr-2" />
                        View Code
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
