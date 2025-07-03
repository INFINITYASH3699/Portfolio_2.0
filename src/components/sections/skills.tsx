"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { getSkills } from "@/lib/resume";
import { 
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaNodeJs,
  FaBootstrap,
  FaGitAlt,
  FaDatabase,
  FaCode
} from "react-icons/fa";
import { 
  SiNextdotjs,
  SiTailwindcss,
  SiExpress,
  SiMongodb,
  SiFirebase,
  SiPostman,
  SiMysql
} from "react-icons/si";
import { Code, Settings } from "lucide-react";

// Technology icons mapping with original brand icons
const getTechIcon = (skill: string) => {
  const icons: Record<string, any> = {
    "HTML": FaHtml5,
    "CSS": FaCss3Alt,
    "JavaScript": FaJs,
    "React.js": FaReact,
    "Next.js": SiNextdotjs,
    "Bootstrap": FaBootstrap,
    "Tailwind CSS": SiTailwindcss,
    "Node.js": FaNodeJs,
    "Express.js": SiExpress,
    "MongoDB": SiMongodb,
    "SQL": SiMysql,
    "Firebase": SiFirebase,
    "Git": FaGitAlt,
    "Postman": SiPostman,
    "VS Code": FaCode,
    "REST APIs": FaDatabase,
    "Agile Development": Settings,
  };
  return icons[skill] || Code;
};

// Technology colors mapping for authentic brand colors
const getTechColor = (skill: string) => {
  const colors: Record<string, string> = {
    "HTML": "text-orange-500",
    "CSS": "text-blue-500",
    "JavaScript": "text-yellow-400",
    "React.js": "text-cyan-400",
    "Next.js": "text-black dark:text-white",
    "Bootstrap": "text-purple-600",
    "Tailwind CSS": "text-cyan-500",
    "Node.js": "text-green-500",
    "Express.js": "text-gray-600 dark:text-gray-300",
    "MongoDB": "text-green-600",
    "SQL": "text-blue-600",
    "Firebase": "text-orange-400",
    "Git": "text-red-500",
    "Postman": "text-orange-500",
    "VS Code": "text-blue-600",
    "REST APIs": "text-indigo-500",
    "Agile Development": "text-blue-500",
  };
  return colors[skill] || "text-primary";
};

// Technology background colors for hover states
const getTechBgColor = (skill: string) => {
  const bgColors: Record<string, string> = {
    "HTML": "bg-orange-50 dark:bg-orange-950/20",
    "CSS": "bg-blue-50 dark:bg-blue-950/20",
    "JavaScript": "bg-yellow-50 dark:bg-yellow-950/20",
    "React.js": "bg-cyan-50 dark:bg-cyan-950/20",
    "Next.js": "bg-gray-50 dark:bg-gray-950/20",
    "Bootstrap": "bg-purple-50 dark:bg-purple-950/20",
    "Tailwind CSS": "bg-cyan-50 dark:bg-cyan-950/20",
    "Node.js": "bg-green-50 dark:bg-green-950/20",
    "Express.js": "bg-gray-50 dark:bg-gray-950/20",
    "MongoDB": "bg-green-50 dark:bg-green-950/20",
    "SQL": "bg-blue-50 dark:bg-blue-950/20",
    "Firebase": "bg-orange-50 dark:bg-orange-950/20",
    "Git": "bg-red-50 dark:bg-red-950/20",
    "Postman": "bg-orange-50 dark:bg-orange-950/20",
    "VS Code": "bg-blue-50 dark:bg-blue-950/20",
    "REST APIs": "bg-indigo-50 dark:bg-indigo-950/20",
    "Agile Development": "bg-blue-50 dark:bg-blue-950/20",
  };
  return bgColors[skill] || "bg-primary/10";
};

// Enhanced skill descriptions
function getSkillDescription(skill: string): string {
  const descriptions: Record<string, string> = {
    "HTML": "Crafting semantic, accessible HTML5 structures that form the foundation of modern web applications with SEO optimization in mind.",
    "CSS": "Creating responsive, visually appealing designs using modern CSS3 features including Grid, Flexbox, animations, and custom properties.",
    "JavaScript": "Building dynamic, interactive web experiences with modern ES6+ features, async programming, and comprehensive DOM manipulation.",
    "React.js": "Developing scalable component-based applications using hooks, context API, state management patterns, and performance optimization techniques.",
    "Next.js": "Building full-stack applications with server-side rendering, static generation, API routes, and advanced optimization features.",
    "Bootstrap": "Rapidly prototyping responsive layouts and implementing consistent UI components using the Bootstrap framework.",
    "Tailwind CSS": "Implementing efficient, maintainable styling with utility-first approach for consistent design systems and rapid development.",
    "Node.js": "Building robust server-side applications with event-driven architecture, npm ecosystem integration, and scalable backend solutions.",
    "Express.js": "Creating RESTful APIs, middleware implementation, and server architecture for efficient web application backends.",
    "MongoDB": "Designing flexible NoSQL database schemas, implementing aggregation pipelines, and optimizing query performance.",
    "SQL": "Working with relational databases, writing complex queries, designing normalized schemas, and ensuring data integrity.",
    "Firebase": "Integrating real-time databases, authentication systems, cloud functions, and hosting solutions for rapid application development.",
    "Git": "Managing version control workflows, collaborative development, branching strategies, and maintaining clean project histories.",
    "Postman": "Comprehensive API testing, documentation creation, automated testing workflows, and team collaboration for robust backend development.",
    "VS Code": "Maximizing development efficiency with advanced extensions, debugging tools, integrated terminal, and customized development environments.",
    "REST APIs": "Designing and implementing RESTful web services following best practices for scalability, security, and maintainable API architecture.",
    "Agile Development": "Participating in Scrum ceremonies, sprint planning, iterative development cycles, and collaborative team-based project delivery.",
  };

  return descriptions[skill] || `Applying ${skill} effectively in modern web development projects with focus on best practices and industry standards.`;
}

export function SkillsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });
  const skills = getSkills();

  // Flatten all skills into one array
  const allSkills = skills.flatMap(category => category.skills);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0, scale: 0.9 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: { 
        duration: 0.5,
        type: "spring",
        stiffness: 120
      },
    },
  };

  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
      <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern opacity-[0.02] pointer-events-none" />
      <div className="absolute left-0 top-1/4 w-1/2 h-96 bg-gradient-to-r from-primary/10 to-transparent rounded-r-full blur-3xl -z-10" />
      <div className="absolute right-0 bottom-1/4 w-1/3 h-64 bg-gradient-to-l from-secondary/10 to-transparent rounded-l-full blur-3xl -z-10" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="max-w-6xl mx-auto"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Code className="w-4 h-4" />
              MY SKILLS
            </div>
            <h2 className="text-4xl md:text-5xl font-bold font-display mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Technical Expertise
            </h2>
            <p className="text-muted-foreground max-w-3xl mx-auto text-lg leading-relaxed">
              Technologies and tools I use to build modern, scalable web applications
            </p>
          </motion.div>

          {/* Skills Grid */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4"
          >
            {allSkills.map((skill, index) => {
              const IconComponent = getTechIcon(skill);
              const iconColor = getTechColor(skill);
              const bgColor = getTechBgColor(skill);

              return (
                <motion.div
                  key={skill}
                  variants={itemVariants}
                  transition={{ delay: index * 0.05 }}
                  className="group"
                >
                  <HoverCard>
                    <HoverCardTrigger asChild>
                      <div className="
                        relative p-6 rounded-xl cursor-pointer h-full
                        bg-card/80 backdrop-blur-sm border border-border/50
                        hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5
                        hover:-translate-y-1 transition-all duration-300
                        flex flex-col items-center justify-center text-center
                        min-h-[120px]
                      ">
                        {/* Icon */}
                        <div className={`mb-3 p-3 rounded-lg ${bgColor} group-hover:scale-105 transition-all duration-300`}>
                          <IconComponent className={`w-8 h-8 ${iconColor} group-hover:scale-110 transition-transform duration-300`} />
                        </div>
                        
                        {/* Skill Name */}
                        <h3 className="font-medium text-sm group-hover:text-primary transition-colors duration-300 leading-tight">
                          {skill}
                        </h3>

                        {/* Hover overlay */}
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
                      </div>
                    </HoverCardTrigger>
                    
                    <HoverCardContent className="w-80 p-6">
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${bgColor}`}>
                            <IconComponent className={`w-6 h-6 ${iconColor}`} />
                          </div>
                          <h4 className="text-lg font-semibold">{skill}</h4>
                        </div>
                        
                        <div className="pt-2 border-t">
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {getSkillDescription(skill)}
                          </p>
                        </div>
                      </div>
                    </HoverCardContent>
                  </HoverCard>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Footer */}
          <motion.div
            variants={itemVariants}
            className="mt-16 text-center"
          >
            <div className="max-w-2xl mx-auto p-6 rounded-2xl bg-gradient-to-r from-primary/5 to-secondary/5 border border-primary/10">
              <p className="text-muted-foreground leading-relaxed">
                Continuously learning and exploring new technologies to stay current with industry trends
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}