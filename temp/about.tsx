"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { about, personal } from "@/lib/data";

export default function About() {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
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
        duration: 0.6,
      },
    },
  };

  // Add unique ids to summary paragraphs
  const summaryWithIds = about.summary.map((paragraph, index) => ({
    id: `summary-${index}`,
    text: paragraph
  }));

  return (
    <section id="about" className="section py-24 bg-grid">
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="container"
      >
        <motion.div variants={itemVariants} className="flex flex-col items-center mb-12">
          <span className="px-3 py-1 text-sm font-medium bg-primary/10 text-primary rounded-full mb-3">
            About Me
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gradient">
            My Background
          </h2>
          <div className="w-24 h-1 bg-primary mt-6 rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Personal Info */}
          <motion.div
            variants={itemVariants}
            className="md:col-span-2 bg-black/20 backdrop-blur-sm rounded-xl p-6 border border-primary/10"
          >
            <h3 className="text-xl font-semibold mb-4 text-foreground">
              Passionate Web Developer
            </h3>
            <div className="space-y-4 text-muted-foreground">
              {summaryWithIds.map((item) => (
                <p key={item.id}>
                  {item.text.includes("Yash Hulle") ? (
                    <>
                      Hello! I'm <span className="text-primary font-medium">{personal.name}</span>
                      {item.text.substring(item.text.indexOf(","))}
                    </>
                  ) : (
                    item.text
                  )}
                </p>
              ))}
              <div className="pt-4">
                <a href="#contact">
                  <Button className="relative overflow-hidden group">
                    <span className="relative z-10">Contact Me</span>
                    <span className="absolute inset-0 bg-gradient-to-r from-primary to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </Button>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Skills & Tools */}
          <motion.div
            variants={itemVariants}
            className="bg-black/20 backdrop-blur-sm rounded-xl p-6 border border-primary/10 flex flex-col"
          >
            <h3 className="text-xl font-semibold mb-4 text-foreground">
              Education
            </h3>
            <div className="space-y-4 text-muted-foreground flex-grow">
              {about.education.map((edu) => (
                <div key={edu.id} className="relative pl-5 border-l-2 border-primary/50 pb-6 last:pb-0">
                  <div className="absolute w-3 h-3 bg-primary rounded-full -left-[7px] top-1" />
                  <h4 className="text-foreground font-medium">{edu.institution}</h4>
                  <p className="text-sm text-primary">{edu.degree}</p>
                  <p className="text-sm">{edu.grade}</p>
                  <p className="text-sm text-muted-foreground">{edu.year}</p>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-4 text-foreground">
                Certifications
              </h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                {about.certifications.map((cert) => (
                  <li key={cert.id}>{cert.name}</li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>

        {/* Professional Experience */}
        <motion.div
          variants={itemVariants}
          className="mt-12"
        >
          <h3 className="text-2xl font-semibold mb-6 text-gradient text-center">
            Professional Experience
          </h3>

          <div className="space-y-6">
            {about.experience.map((experience) => (
              <motion.div
                key={experience.id}
                variants={itemVariants}
                className={cn(
                  "relative pl-6 md:pl-0",
                  experience.id !== about.experience[about.experience.length - 1].id && "pb-8",
                  "md:grid md:grid-cols-5 md:gap-6"
                )}
              >
                {/* Timeline connector */}
                <div className="hidden md:block md:col-span-1" />
                {experience.id !== about.experience[about.experience.length - 1].id && (
                  <div className="absolute top-10 left-3 h-full border-l-2 border-primary/30 md:hidden" />
                )}

                <div className="flex items-center md:contents">
                  <div className="absolute left-0 md:relative md:col-span-1 flex md:justify-end">
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center z-10">
                      <div className="w-3 h-3 bg-background rounded-full" />
                    </div>
                  </div>

                  <div className="ml-6 md:ml-0 md:col-span-4 bg-black/20 backdrop-blur-sm p-5 rounded-xl border border-primary/10">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                      <h4 className="text-lg font-semibold text-foreground">{experience.company}</h4>
                      <span className="text-sm text-primary">{experience.duration}</span>
                    </div>
                    <p className="text-primary font-medium mb-3">{experience.position}</p>
                    <ul className="space-y-2 text-muted-foreground">
                      {experience.description.map((item, idx) => (
                        <li key={`${experience.id}-desc-${idx}`} className="flex items-start">
                          <span className="mr-2 text-primary">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
