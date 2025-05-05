"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const Projects = ({ data, mousePosition }) => {
  return (
    <div className="container mx-auto">
      <h2 className="section-title">Projects</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {data.map((project, index) => (
          <ProjectCard key={index} project={project} index={index} mousePosition={mousePosition} />
        ))}
      </div>
    </div>
  );
};

// Interactive 3D project card
const ProjectCard = ({ project, index, mousePosition }) => {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  // Handle mouse movement for 3D effect
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;

    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const cardCenterX = rect.left + rect.width / 2;
    const cardCenterY = rect.top + rect.height / 2;

    // Calculate rotation based on mouse position relative to card center
    const rotateY = ((e.clientX - cardCenterX) / (rect.width / 2)) * 5; // max 5 degrees
    const rotateX = -((e.clientY - cardCenterY) / (rect.height / 2)) * 5; // max 5 degrees

    setRotateX(rotateX);
    setRotateY(rotateY);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: index * 0.2,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  return (
    <motion.div
      ref={cardRef}
      className="project-card overflow-hidden"
      style={{
        transform: isHovered ? `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)` : 'perspective(1000px)',
        transformStyle: 'preserve-3d',
        transition: 'transform 0.3s ease'
      }}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Project image */}
      <div className="w-full h-48 relative">
        <Image
          src={project.image || '/images/project-placeholder.jpg'}
          alt={project.name}
          fill
          style={{ objectFit: 'cover' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>

      {/* Content */}
      <div className="p-6 relative" style={{ transform: 'translateZ(30px)' }}>
        <h3 className="text-xl font-bold mb-2">{project.name}</h3>

        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map((tech, techIndex) => (
            <span
              key={techIndex}
              className="text-xs bg-accent/30 text-foreground/80 px-2 py-1 rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="space-y-2 text-sm text-foreground/70">
          {project.description.map((desc, descIndex) => (
            <p key={descIndex}>{desc}</p>
          ))}
        </div>

        {/* Project links */}
        <motion.div
          className="mt-6 flex justify-end gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 + index * 0.1 }}
        >
          <button className="px-3 py-1 text-sm rounded-md border border-border hover:bg-accent/20 transition-colors">
            Demo
          </button>
          <button className="px-3 py-1 text-sm rounded-md bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 transition-colors">
            Details
          </button>
        </motion.div>
      </div>

      {/* Hover effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};

export default Projects;
