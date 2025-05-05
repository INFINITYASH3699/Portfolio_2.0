"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export function AboutSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section
      id="about"
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
            About <span className="text-primary">Me</span>
          </h2>
          <div className="h-1 w-20 bg-primary mx-auto mb-6"></div>
          <p className="text-muted-foreground">
            A passionate web developer with a focus on creating beautiful,
            functional, and user-centered digital experiences.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-semibold">Get to know me!</h3>
            <div className="space-y-4 text-muted-foreground">
              <p>
                I'm a <span className="font-medium text-foreground">Web Developer</span> with a
                passion for building digital experiences that are both beautiful and functional.
                I enjoy the process of turning complex problems into simple, elegant solutions.
              </p>
              <p>
                With experience in both frontend and backend development, I bring a holistic
                approach to building web applications. I'm proficient in JavaScript, React.js,
                Next.js, and Node.js, and I have a strong understanding of UI/UX principles.
              </p>
              <p>
                I am currently pursuing my degree in <span className="font-medium text-foreground">Computer Science</span> at
                G H Raisoni University, Amravati, while working as a Web Developer Intern at
                Atorix IT Solutions Pvt. Ltd.
              </p>
              <p>
                I'm always interested in hearing about new projects and opportunities, so feel free to reach out!
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-semibold">Education & Certifications</h3>

            <div className="space-y-6">
              {/* Education */}
              <div className="space-y-4">
                <h4 className="text-lg font-medium text-primary">Education</h4>

                <div className="border-l-2 border-primary/30 pl-4 space-y-4">
                  <div className="relative">
                    <div className="absolute -left-6 top-1 w-4 h-4 rounded-full bg-primary"></div>
                    <h5 className="font-medium">G H Raisoni University, Amravati</h5>
                    <p className="text-sm text-muted-foreground">Computer Science</p>
                    <p className="text-sm text-muted-foreground">2025 | CGPA 8.3</p>
                  </div>

                  <div className="relative">
                    <div className="absolute -left-6 top-1 w-4 h-4 rounded-full bg-primary/70"></div>
                    <h5 className="font-medium">Latthe Education Society Polytechnic, Kupwad</h5>
                    <p className="text-sm text-muted-foreground">Electrical Engineering</p>
                    <p className="text-sm text-muted-foreground">2022 | First Class Dist.</p>
                  </div>
                </div>
              </div>

              {/* Certifications */}
              <div className="space-y-4">
                <h4 className="text-lg font-medium text-primary">Certifications</h4>

                <div className="border-l-2 border-primary/30 pl-4 space-y-4">
                  <div className="relative">
                    <div className="absolute -left-6 top-1 w-4 h-4 rounded-full bg-primary"></div>
                    <h5 className="font-medium">HackerRank - Frontend Developer (React)</h5>
                  </div>

                  <div className="relative">
                    <div className="absolute -left-6 top-1 w-4 h-4 rounded-full bg-primary/70"></div>
                    <h5 className="font-medium">Postman - API Fundamentals Student Expert</h5>
                  </div>
                </div>
              </div>

              {/* Languages */}
              <div className="space-y-4">
                <h4 className="text-lg font-medium text-primary">Languages</h4>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">English</span>
                  <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">Hindi</span>
                  <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">Marathi</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
