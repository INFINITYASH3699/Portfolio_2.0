"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import portfolioData from "../data/portfolio-data.json";

// Dynamic imports for components
const Navbar = dynamic(() => import("../components/Navbar"), { ssr: false });
const Hero = dynamic(() => import("../components/Hero"), { ssr: false });
const About = dynamic(() => import("../components/About"), { ssr: false });
const Skills = dynamic(() => import("../components/Skills"), { ssr: false });
const Experience = dynamic(() => import("../components/Experience"), { ssr: false });
const Projects = dynamic(() => import("../components/Projects"), { ssr: false });
const Education = dynamic(() => import("../components/Education"), { ssr: false });
const Contact = dynamic(() => import("../components/Contact"), { ssr: false });
const Footer = dynamic(() => import("../components/Footer"), { ssr: false });

// 3D Canvas (will be rendered conditionally)
const Scene3D = dynamic(() => import("../components/Scene3D"), { ssr: false });

export default function HomePage() {
  const [loaded, setLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Refs for scroll animations
  const aboutRef = useRef(null);
  const skillsRef = useRef(null);
  const experienceRef = useRef(null);
  const projectsRef = useRef(null);
  const educationRef = useRef(null);
  const contactRef = useRef(null);

  useEffect(() => {
    setLoaded(true);

    // Function to handle mouse movement for 3D effects
    const handleMouseMove = (event) => {
      setMousePosition({
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1
      });
    };

    // Function to handle scroll animations
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const vh = window.innerHeight;

      // Handle each section's scroll animation
      const sections = [
        { ref: aboutRef, className: 'fade-in-up' },
        { ref: skillsRef, className: 'staggered-fade-in' },
        { ref: experienceRef, className: 'fade-in-up' },
        { ref: projectsRef, className: 'staggered-fade-in' },
        { ref: educationRef, className: 'fade-in-up' },
        { ref: contactRef, className: 'fade-in-up' }
      ];

      sections.forEach(({ ref, className }) => {
        if (ref.current) {
          const sectionTop = ref.current.offsetTop;
          if (scrollY > sectionTop - vh * 0.8) {
            ref.current.classList.add('active');
          }
        }
      });
    };

    // Add event listeners
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    // Initial check for elements in viewport
    setTimeout(handleScroll, 200);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Dynamic background circles animation
  const circleVariants = {
    animate: {
      x: [0, 30, 0],
      y: [0, 15, 0],
      transition: {
        duration: 20,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Background animated circles */}
      <motion.div
        className="animated-circle"
        variants={circleVariants}
        animate="animate"
        style={{ top: '15%', left: '10%', width: '250px', height: '250px', opacity: 0.6 }}
      />
      <motion.div
        className="animated-circle"
        variants={circleVariants}
        animate="animate"
        style={{ top: '60%', right: '15%', width: '300px', height: '300px', opacity: 0.5 }}
      />

      {/* Navbar */}
      <Navbar />

      {/* Hero section */}
      <Hero data={portfolioData.personalInfo} mousePosition={mousePosition} />

      {/* About section */}
      <section id="about" ref={aboutRef} className="py-16 px-4 sm:px-6 lg:px-8 fade-in-up">
        <About data={portfolioData.personalInfo} />
      </section>

      {/* Skills section */}
      <section id="skills" ref={skillsRef} className="py-16 px-4 sm:px-6 lg:px-8 bg-accent/20 staggered-fade-in">
        <Skills data={portfolioData.skills} />
      </section>

      {/* Experience section */}
      <section id="experience" ref={experienceRef} className="py-16 px-4 sm:px-6 lg:px-8 fade-in-up">
        <Experience data={portfolioData.experience} />
      </section>

      {/* Projects section */}
      <section id="projects" ref={projectsRef} className="py-16 px-4 sm:px-6 lg:px-8 bg-accent/20 staggered-fade-in">
        <Projects data={portfolioData.projects} mousePosition={mousePosition} />
      </section>

      {/* Education section */}
      <section id="education" ref={educationRef} className="py-16 px-4 sm:px-6 lg:px-8 fade-in-up">
        <Education data={portfolioData.education} certifications={portfolioData.certifications} languages={portfolioData.languages} />
      </section>

      {/* Contact section */}
      <section id="contact" ref={contactRef} className="py-16 px-4 sm:px-6 lg:px-8 bg-accent/20 fade-in-up">
        <Contact data={portfolioData.personalInfo} />
      </section>

      {/* Footer */}
      <Footer data={portfolioData.personalInfo} />

      {/* 3D background scene (conditionally rendered) */}
      {loaded && <Scene3D mousePosition={mousePosition} />}
    </main>
  );
}
