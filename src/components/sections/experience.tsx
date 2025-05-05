"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { BriefcaseIcon, ChevronRight } from "lucide-react";

interface ExperienceItem {
  company: string;
  position: string;
  duration: string;
  duties: string[];
}

const experiences: ExperienceItem[] = [
  {
    company: "Atorix IT Solutions Pvt. Ltd.",
    position: "Web Developer Intern",
    duration: "Jan/2025 - Present",
    duties: [
      "Optimized UI with Next.js, Bootstrap, and JavaScript for a MERN stack project.",
      "Integrated backend APIs with MongoDB & Express.js, improving data flow.",
      "Debugged & deployed features in an Agile team, enhancing user experience."
    ]
  },
  {
    company: "Ennova Tech",
    position: "Web Development Intern",
    duration: "Feb/2024 - Aug/2024",
    duties: [
      "Designed and developed interactive web pages using HTML, CSS, and JavaScript, improving user experience.",
      "Integrated responsive design principles, ensuring mobile-friendly UI for improved accessibility.",
      "Worked in an Agile team, contributing to front-end enhancements and assisting with bug fixes."
    ]
  }
];

export function ExperienceSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section
      id="experience"
      ref={ref}
      className="py-20 px-4 bg-muted/30"
    >
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Work <span className="text-primary">Experience</span>
          </h2>
          <div className="h-1 w-20 bg-primary mx-auto mb-6" />
          <p className="text-muted-foreground">
            My professional journey in web development. I've had the opportunity to work with talented teams on diverse projects.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline center line */}
            <div className="absolute left-0 md:left-1/2 top-0 h-full w-px bg-primary/30 md:transform md:-translate-x-1/2" />

            {/* Experience items */}
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.company}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className={`relative mb-12 md:mb-24 ${
                  index % 2 === 0 ? "md:pr-12 md:text-right md:ml-0 md:mr-auto" : "md:pl-12 md:ml-auto md:mr-0"
                } md:w-1/2`}
              >
                {/* Timeline dot */}
                <div
                  className={`absolute top-0 h-5 w-5 rounded-full bg-primary border-4 border-background ${
                    index % 2 === 0
                      ? "left-0 md:left-auto md:right-0 md:translate-x-1/2"
                      : "left-0 md:translate-x-neg-1/2"
                  } transform -translate-y-1/2 md:translate-y-0`}
                />

                {/* Content box */}
                <div className="ml-8 md:ml-0 p-6 bg-card rounded-lg shadow-sm border border-border hover:border-primary/50 transition-colors">
                  <div className="flex items-center gap-2 text-primary mb-2">
                    <BriefcaseIcon className="h-4 w-4" />
                    <span className="font-medium">{exp.position}</span>
                  </div>

                  <h3 className="text-xl font-semibold mb-1">{exp.company}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{exp.duration}</p>

                  <ul className="space-y-2">
                    {exp.duties.map((duty, i) => (
                      <li key={i} className="flex gap-2 text-sm">
                        <ChevronRight className="h-5 w-5 flex-shrink-0 text-primary" />
                        <span>{duty}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
