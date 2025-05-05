"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Card, CardContent } from "@/components/ui/card";
import { Code, Server, Database, PenTool, Sparkles } from "lucide-react";

interface Skill {
  name: string;
  level: number;
}

interface SkillCategory {
  title: string;
  icon: JSX.Element;
  skills: Skill[];
}

const skillCategories: SkillCategory[] = [
  {
    title: "Frontend",
    icon: <Code className="w-6 h-6 text-primary" />,
    skills: [
      { name: "HTML", level: 90 },
      { name: "CSS", level: 85 },
      { name: "JavaScript", level: 85 },
      { name: "React.js", level: 80 },
      { name: "Next.js", level: 80 },
      { name: "Bootstrap", level: 85 },
      { name: "Tailwind CSS", level: 90 },
    ],
  },
  {
    title: "Backend",
    icon: <Server className="w-6 h-6 text-primary" />,
    skills: [
      { name: "Node.js", level: 75 },
      { name: "Express.js", level: 75 },
    ],
  },
  {
    title: "Database",
    icon: <Database className="w-6 h-6 text-primary" />,
    skills: [
      { name: "MongoDB", level: 70 },
      { name: "SQL", level: 65 },
      { name: "Firebase", level: 60 },
    ],
  },
  {
    title: "PenTool & Platforms",
    icon: <PenTool className="w-6 h-6 text-primary" />,
    skills: [
      { name: "Git", level: 80 },
      { name: "Postman", level: 85 },
      { name: "VS Code", level: 90 },
    ],
  },
  {
    title: "Other",
    icon: <Sparkles className="w-6 h-6 text-primary" />,
    skills: [
      { name: "REST APIs", level: 75 },
      { name: "Agile Development", level: 70 },
    ],
  },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export function SkillsSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section
      id="skills"
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
            My <span className="text-primary">Skills</span>
          </h2>
          <div className="h-1 w-20 bg-primary mx-auto mb-6" />
          <p className="text-muted-foreground">
            Here are my technical skills and expertise. I continuously learn and improve to stay up-to-date with the latest technologies.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {skillCategories.map((category, index) => (
            <motion.div key={category.title} variants={fadeInUp}>
              <Card className="overflow-hidden border border-border/50 hover:border-primary/50 transition-colors duration-300 h-full">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-6">
                    {category.icon}
                    <h3 className="text-xl font-semibold">{category.title}</h3>
                  </div>

                  <div className="space-y-4">
                    {category.skills.map((skill) => (
                      <div key={skill.name} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">{skill.name}</span>
                          <span className="text-xs text-muted-foreground">{skill.level}%</span>
                        </div>
                        <div className="h-2 w-full bg-muted/50 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
                            transition={{ duration: 1, delay: 0.3 + index * 0.1 }}
                            className="h-full bg-primary rounded-full"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional skills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <h3 className="text-2xl font-semibold mb-6">Other Technologies & Tools</h3>

          <div className="flex flex-wrap justify-center gap-3">
            {[
              "Git", "GitHub", "VS Code", "Figma", "Responsive Design",
              "RESTful APIs", "JWT", "Material UI", "GSAP", "Framer Motion",
              "TypeScript", "Firebase", "Vercel", "Netlify"
            ].map((tech) => (
              <span
                key={tech}
                className="skill-tag px-4 py-2 bg-muted rounded-full text-sm font-medium hover:bg-primary/10 hover:text-primary cursor-default"
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
