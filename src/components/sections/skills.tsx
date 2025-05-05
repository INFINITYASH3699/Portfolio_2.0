"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getSkills } from "@/lib/resume";

// Skill proficiency based on category and skill name
const getSkillProficiency = (category: string, skill: string): number => {
  // Frontend skills
  if (category === "Frontend") {
    if (["HTML", "CSS", "JavaScript", "React.js"].includes(skill)) return 90;
    if (["Next.js", "Tailwind CSS"].includes(skill)) return 85;
    return 80;
  }

  // Backend skills
  if (category === "Backend") {
    if (["Node.js"].includes(skill)) return 85;
    if (["Express.js"].includes(skill)) return 80;
    return 75;
  }

  // Database skills
  if (category === "Database") {
    if (["MongoDB"].includes(skill)) return 85;
    if (["Firebase"].includes(skill)) return 80;
    if (["SQL"].includes(skill)) return 75;
    return 70;
  }

  // Default for other categories
  return 75;
};

// Generate appropriate skill level label
const getSkillLevelLabel = (proficiency: number): string => {
  if (proficiency >= 90) return "Expert";
  if (proficiency >= 80) return "Advanced";
  if (proficiency >= 70) return "Intermediate";
  return "Familiar";
};

// Get color based on proficiency
const getSkillColor = (proficiency: number): string => {
  if (proficiency >= 90) return "bg-green-500";
  if (proficiency >= 80) return "bg-blue-500";
  if (proficiency >= 70) return "bg-yellow-500";
  return "bg-red-500";
};

export function SkillsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });
  const skills = getSkills();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
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
    <section id="skills" className="py-20 relative overflow-hidden z-10">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full bg-dotted-grid opacity-5 pointer-events-none" />
      <div className="absolute left-0 top-1/3 w-1/3 h-72 bg-primary/5 rounded-r-full -z-10 blur-3xl" />

      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="max-w-4xl mx-auto"
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h4 className="text-primary font-medium mb-2">MY SKILLS</h4>
            <h2 className="text-3xl md:text-4xl font-bold font-display mb-6">
              Technical Expertise & Proficiency
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              I've built expertise in various technologies, focusing on the MERN stack and modern frontend frameworks to create responsive, user-friendly web applications.
            </p>
          </motion.div>

          <Tabs defaultValue={skills[0].category.toLowerCase()} className="w-full">
            <TabsList className="grid grid-cols-3 md:grid-cols-5 mb-8">
              {skills.map((category) => (
                <TabsTrigger
                  key={category.category}
                  value={category.category.toLowerCase()}
                  className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
                >
                  {category.category}
                </TabsTrigger>
              ))}
            </TabsList>

            {skills.map((category) => (
              <TabsContent
                key={category.category}
                value={category.category.toLowerCase()}
                className="mt-6"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {category.skills.map((skill, index) => {
                    const proficiency = getSkillProficiency(category.category, skill);
                    const level = getSkillLevelLabel(proficiency);
                    const color = getSkillColor(proficiency);

                    return (
                      <motion.div
                        key={skill}
                        variants={itemVariants}
                        transition={{ delay: index * 0.05 }}
                        className="relative group"
                      >
                        <HoverCard>
                          <HoverCardTrigger asChild>
                            <div className="bg-card/50 hover:bg-card/80 border border-border/30 rounded-lg p-5 shadow-sm hover:shadow transition-all duration-300 h-full cursor-pointer">
                              <div className="flex flex-col space-y-2">
                                <h3 className="font-medium">{skill}</h3>
                                <div className="h-2 bg-muted rounded-full overflow-hidden mt-2">
                                  <motion.div
                                    className={`h-full ${color}`}
                                    initial={{ width: 0 }}
                                    animate={{ width: isInView ? `${proficiency}%` : 0 }}
                                    transition={{ duration: 1, delay: 0.2 + index * 0.05 }}
                                  />
                                </div>
                                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                                  <span>{level}</span>
                                  <span>{proficiency}%</span>
                                </div>
                              </div>
                            </div>
                          </HoverCardTrigger>
                          <HoverCardContent className="w-80">
                            <div className="space-y-2">
                              <h4 className="text-lg font-semibold">{skill}</h4>
                              <p className="text-sm text-muted-foreground">
                                {getSkillDescription(skill)}
                              </p>
                              <div className="pt-2">
                                <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                                  {level}
                                </span>
                              </div>
                            </div>
                          </HoverCardContent>
                        </HoverCard>
                      </motion.div>
                    );
                  })}
                </div>
              </TabsContent>
            ))}
          </Tabs>

          <motion.div
            variants={itemVariants}
            className="mt-16 text-center"
          >
            <p className="text-muted-foreground">
              I'm constantly expanding my skillset and exploring new technologies to stay current with industry trends.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// Helper function to get descriptions for skills
function getSkillDescription(skill: string): string {
  const descriptions: Record<string, string> = {
    "HTML": "Proficient in writing semantic HTML5, creating accessible and SEO-friendly web pages.",
    "CSS": "Strong understanding of CSS3, including Flexbox, Grid, animations, and responsive design principles.",
    "JavaScript": "Expert in modern JavaScript (ES6+), including asynchronous programming, DOM manipulation, and API integration.",
    "React.js": "Advanced knowledge of React, including hooks, context API, state management, and component architecture.",
    "Next.js": "Experienced with server-side rendering, static site generation, API routes, and page optimization in Next.js.",
    "Bootstrap": "Skilled in using Bootstrap framework for responsive layouts and UI components.",
    "Tailwind CSS": "Proficient in utility-first CSS with Tailwind for efficient, consistent styling.",
    "Node.js": "Strong foundation in Node.js for server-side JavaScript, including event-driven architecture.",
    "Express.js": "Experienced in building RESTful APIs and web servers with Express.js.",
    "MongoDB": "Skilled in NoSQL database design, aggregation pipelines, and CRUD operations with MongoDB.",
    "SQL": "Understanding of relational database concepts, queries, and schema design.",
    "Firebase": "Experience with Firebase services including authentication, Firestore, and hosting.",
    "Git": "Proficient in version control using Git, including branching, merging, and collaborative workflows.",
    "Postman": "Skilled in API testing and documentation using Postman.",
    "VS Code": "Expert in using VS Code with various extensions for efficient development.",
    "REST APIs": "Strong knowledge of RESTful principles, designing and consuming APIs.",
    "Agile Development": "Experienced with Agile methodologies, including Scrum and Kanban.",
  };

  return descriptions[skill] || `Proficient in ${skill} for web development projects.`;
}
