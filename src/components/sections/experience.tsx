"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { BriefcaseIcon, CalendarIcon, CheckCircle2Icon } from "lucide-react";
import { getExperience, getEducation, getCertifications } from "@/lib/resume";

export function ExperienceSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });

  const experiences = getExperience();
  const education = getEducation();
  const certifications = getCertifications();

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
    <section id="experience" className="py-20 relative overflow-hidden z-10">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-primary/5 rounded-bl-full -z-10 blur-3xl opacity-60" />

      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="max-w-4xl mx-auto"
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h4 className="text-primary font-medium mb-2">MY JOURNEY</h4>
            <h2 className="text-3xl md:text-4xl font-bold font-display mb-6">
              Experience & Education
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              My professional journey and educational background that have shaped my skills and expertise in web development.
            </p>
          </motion.div>

          {/* Work Experience Timeline */}
          <motion.div variants={itemVariants} className="mb-16">
            <h3 className="text-2xl font-bold font-display mb-8 flex items-center">
              <BriefcaseIcon className="mr-2 text-primary" />
              Work Experience
            </h3>

            <div className="timeline-container relative pl-6 md:pl-0 space-y-12">
              {/* Timeline vertical line */}
              <div className="timeline-line" />

              {experiences.map((job, index) => (
                <motion.div
                  key={`${job.company}-${index}`}
                  variants={itemVariants}
                  custom={index}
                  className="relative md:grid md:grid-cols-2 md:gap-8 md:[&:nth-child(odd)]:text-right"
                >
                  {/* Timeline dot */}
                  <div className="timeline-item-dot" />

                  {/* Date (desktop: alternating sides) */}
                  <div className={`mb-4 md:mb-0 ${index % 2 === 0 ? 'md:col-start-1' : 'md:col-start-2 md:order-1'}`}>
                    <div className="bg-card p-4 rounded-lg border border-border/50 shadow-sm inline-block">
                      <div className="flex items-center space-x-2 text-primary">
                        <CalendarIcon className="h-4 w-4" />
                        <span className="font-medium">{job.duration}</span>
                      </div>
                    </div>
                  </div>

                  {/* Content (desktop: alternating sides) */}
                  <div className={index % 2 === 0 ? 'md:col-start-2' : 'md:col-start-1 md:order-0'}>
                    <div className="bg-card p-6 rounded-lg border border-border/50 shadow-sm hover:shadow-md transition-shadow">
                      <h4 className="text-xl font-bold">{job.position}</h4>
                      <p className="text-primary font-medium mb-4">{job.company}</p>
                      <ul className="space-y-2">
                        {job.duties.map((duty, dutyIndex) => (
                          <li key={dutyIndex} className="flex items-start">
                            <CheckCircle2Icon className="h-5 w-5 text-primary shrink-0 mr-2 mt-0.5" />
                            <span className="text-muted-foreground">{duty}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Education Section */}
          <motion.div variants={itemVariants} className="mb-16">
            <h3 className="text-2xl font-bold font-display mb-8 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 mr-2 text-primary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M12 14l9-5-9-5-9 5 9 5z" />
                <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
              </svg>
              Education
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {education.map((edu, index) => (
                <motion.div
                  key={`${edu.institution}-${index}`}
                  variants={itemVariants}
                  custom={index}
                  className="bg-card p-6 rounded-lg border border-border/50 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="text-xl font-bold">{edu.degree}</h4>
                      <p className="text-primary font-medium">{edu.institution}</p>
                    </div>
                    <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                      {edu.year}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-primary"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{edu.grade}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Certifications Section */}
          <motion.div variants={itemVariants}>
            <h3 className="text-2xl font-bold font-display mb-8 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 mr-2 text-primary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
              Certifications
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {certifications.map((cert, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  custom={index}
                  className="bg-card/50 p-4 rounded-lg border border-border/30 flex items-center space-x-3 hover:bg-card transition-colors"
                >
                  <div className="bg-primary/10 p-2 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-primary"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <span className="font-medium">{cert}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
