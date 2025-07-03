"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, EffectCoverflow, Autoplay } from "swiper/modules";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { GithubIcon, ExternalLinkIcon, FolderIcon, InfoIcon, PanelRightIcon } from "lucide-react";
import { getProjects } from "@/lib/resume";

// Make sure to import the necessary Swiper CSS in the component
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";

export function ProjectsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  const [isIframeLoaded, setIsIframeLoaded] = useState<Record<string, boolean>>({});
  const projects = getProjects();

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

  // Create infinite loop by duplicating projects
  const createInfiniteProjects = () => {
    if (projects.length === 0) return [];
    
    // Duplicate projects multiple times for smooth infinite scroll
    const duplicateCount = Math.max(3, Math.ceil(10 / projects.length));
    const infiniteProjects = [];
    
    for (let i = 0; i < duplicateCount; i++) {
      infiniteProjects.push(...projects.map((project, index) => ({
        ...project,
        uniqueId: `${i}-${index}`, // Add unique ID for React keys
        isLiveFrameLoaded: !!isIframeLoaded[project.name]
      })));
    }
    
    return infiniteProjects;
  };

  const infiniteProjects = createInfiniteProjects();
  
  // Calculate initial slide (start from 2nd project)
  const getInitialSlide = () => {
    if (projects.length === 0) return 0;
    // Start from the middle batch, 2nd project (index 1)
    const middleBatchStart = Math.floor(infiniteProjects.length / 2 / projects.length) * projects.length;
    return middleBatchStart + 1; // +1 for 2nd project (0-indexed)
  };

  const handleOpenProject = (project: typeof projects[0]) => {
    setSelectedProject(project);
  };

  const handleIframeLoad = (projectName: string) => {
    setIsIframeLoaded(prev => ({ ...prev, [projectName]: true }));
  };

  return (
    <section id="projects" className="py-20 relative overflow-hidden z-10">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-dotted-grid opacity-5 pointer-events-none" />
      <div className="absolute -left-64 top-1/3 w-96 h-96 bg-primary/10 rounded-full filter blur-3xl" />
      <div className="absolute -right-64 bottom-1/3 w-96 h-96 bg-blue-400/10 rounded-full filter blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="max-w-5xl mx-auto"
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h4 className="text-primary font-medium mb-2">MY WORK</h4>
            <h2 className="text-3xl md:text-4xl font-bold font-display mb-6">
              Recent Projects
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A showcase of my latest web development projects, demonstrating my skills in frontend development, responsive design, and full-stack capabilities.
            </p>
          </motion.div>

          {/* Featured Projects - Swiper Carousel */}
          <motion.div variants={itemVariants} className="mb-20">
            <Swiper
              effect="coverflow"
              grabCursor={true}
              centeredSlides={true}
              slidesPerView={"auto"}
              initialSlide={getInitialSlide()}
              loop={true}
              loopAdditionalSlides={2}
              coverflowEffect={{
                rotate: 50,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: false,
              }}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              pagination={{
                clickable: true,
                dynamicBullets: true,
              }}
              navigation={true}
              modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
              className="mySwiper"
              breakpoints={{
                320: {
                  slidesPerView: 1,
                  spaceBetween: 20,
                },
                768: {
                  slidesPerView: 1.5,
                  spaceBetween: 30,
                },
                1024: {
                  slidesPerView: 2,
                  spaceBetween: 40,
                },
              }}
            >
              {infiniteProjects.map((project, index) => (
                <SwiperSlide
                  key={project.uniqueId}
                  className="max-w-2xl rounded-xl overflow-hidden"
                >
                  <div className="relative group card-3d">
                    <div className="aspect-video w-full relative overflow-hidden rounded-t-xl">
                      {project.liveLink ? (
                        <>
                          {/* Fallback image shown while iframe is loading */}
                          {!project.isLiveFrameLoaded && (
                            <div className="absolute inset-0 bg-card flex items-center justify-center">
                              <div className="text-center p-4">
                                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent mb-4"></div>
                                <p className="text-sm">Loading live preview...</p>
                              </div>
                              <Image
                                src={project.previewImage || project.image}
                                alt={project.name}
                                fill
                                className="object-cover opacity-30"
                              />
                            </div>
                          )}

                          {/* Live iframe of the website */}
                          <iframe
                            src={project.liveLink}
                            className={`w-full h-full absolute inset-0 border-0 transition-opacity duration-500 ${project.isLiveFrameLoaded ? 'opacity-100' : 'opacity-0'}`}
                            loading="lazy"
                            onLoad={() => handleIframeLoad(project.name)}
                            title={project.name}
                          />
                        </>
                      ) : (
                        <Image
                          src={project.image}
                          alt={project.name}
                          fill
                          className="object-cover"
                        />
                      )}

                      {/* Overlay with gradient */}
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>

                    <div className="p-6 bg-card rounded-b-xl">
                      <h3 className="text-xl font-bold mb-2">{project.name}</h3>
                      <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                        {project.description[0]}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.technologies.map((tech, techIndex) => (
                          <span
                            key={`${project.uniqueId}-${tech}-${techIndex}`}
                            className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      <div className="flex justify-between items-center">
                        <Button
                          size="sm"
                          onClick={() => handleOpenProject(project)}
                          className="rounded-full"
                        >
                          <InfoIcon className="mr-2 h-4 w-4" />
                          Details
                        </Button>

                        <div className="flex gap-2">
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
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>

          {/* Project Grid */}
          <motion.div variants={itemVariants}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project, index) => (
                <motion.div
                  key={`grid-${project.name}`}
                  variants={itemVariants}
                  className="bg-card border border-border/50 rounded-lg overflow-hidden group hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="relative h-48 w-full overflow-hidden">
                    {project.liveLink ? (
                      <>
                        {/* Fallback image shown while iframe is loading */}
                        {!isIframeLoaded[project.name] && (
                          <Image
                            src={project.previewImage || project.image}
                            alt={project.name}
                            fill
                            className="object-cover transition-transform group-hover:scale-105 duration-500"
                          />
                        )}

                        {/* Only show iframe if it has loaded */}
                        {isIframeLoaded[project.name] && (
                          <iframe
                            src={project.liveLink}
                            className="w-full h-full border-0"
                            title={project.name}
                          />
                        )}
                      </>
                    ) : (
                      <Image
                        src={project.image}
                        alt={project.name}
                        fill
                        className="object-cover transition-transform group-hover:scale-105 duration-500"
                      />
                    )}

                    {/* Overlay with buttons */}
                    <div className="absolute inset-0 bg-background/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={() => handleOpenProject(project)}
                          className="rounded-full"
                        >
                          <PanelRightIcon className="mr-2 h-4 w-4" />
                          View Project
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="p-4">
                    <h3 className="font-bold mb-1">{project.name}</h3>
                    <p className="text-muted-foreground text-sm line-clamp-2 mb-3">
                      {project.description[0]}
                    </p>

                    <div className="flex flex-wrap gap-1">
                      {project.technologies.slice(0, 3).map((tech, techIndex) => (
                        <span
                          key={`${project.name}-grid-${tech}-${techIndex}`}
                          className="px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-full"
                        >
                          {tech}
                        </span>
                      ))}

                      {project.technologies.length > 3 && (
                        <span className="px-2 py-0.5 bg-muted text-muted-foreground text-xs rounded-full">
                          +{project.technologies.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="text-center mt-12">
            <p className="text-muted-foreground mb-6">
              Interested in seeing more of my work? Check out my GitHub repositories.
            </p>
            <Button asChild>
              <a
                href="https://github.com/INFINITYASH3699"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full px-6 group"
              >
                <GithubIcon className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
                View More on GitHub
              </a>
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Project Details Dialog */}
      {selectedProject && (
        <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
          <DialogContent className="max-w-4xl p-0 overflow-hidden">
            <div className="relative h-[300px] md:h-[400px] w-full overflow-hidden">
              {selectedProject.liveLink ? (
                <iframe
                  src={selectedProject.liveLink}
                  className="w-full h-full border-0"
                  title={selectedProject.name}
                />
              ) : (
                <Image
                  src={selectedProject.previewImage || selectedProject.image}
                  alt={selectedProject.name}
                  fill
                  className="object-cover"
                />
              )}

              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background to-transparent h-20" />
            </div>

            <div className="p-6">
              <DialogHeader className="mb-6">
                                <DialogTitle className="text-2xl font-bold">{selectedProject.name}</DialogTitle>
              </DialogHeader>

              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-semibold text-primary mb-2">DESCRIPTION</h4>
                  {selectedProject.description.map((paragraph, idx) => (
                    <p key={idx} className="text-muted-foreground mb-2">
                      {paragraph}
                    </p>
                  ))}
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-primary mb-2">TECHNOLOGIES USED</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map((tech, techIndex) => (
                      <span
                        key={`dialog-${tech}-${techIndex}`}
                        className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 pt-2">
                  {selectedProject.liveLink && (
                    <Button asChild>
                      <a href={selectedProject.liveLink} target="_blank" rel="noopener noreferrer">
                        <ExternalLinkIcon className="mr-2 h-4 w-4" />
                        Visit Website
                      </a>
                    </Button>
                  )}

                  {selectedProject.githubLink && (
                    <Button variant="outline" asChild>
                      <a href={selectedProject.githubLink} target="_blank" rel="noopener noreferrer">
                        <GithubIcon className="mr-2 h-4 w-4" />
                        View Code
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </section>
  );
}