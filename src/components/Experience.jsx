"use client";

import { motion } from "framer-motion";

const Experience = ({ data }) => {
  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (custom) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: custom * 0.2,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  return (
    <div className="container mx-auto">
      <h2 className="section-title">Experience</h2>

      <div className="relative">
        {/* Vertical timeline line */}
        <motion.div
          className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-blue-400/40 to-purple-400/40 transform md:-translate-x-1/2"
          initial={{ height: 0 }}
          animate={{ height: "100%" }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />

        {/* Experience items */}
        <div className="relative">
          {data.map((experience, index) => (
            <motion.div
              key={index}
              className={`flex flex-col md:flex-row items-start mb-16 relative ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
              variants={fadeInUpVariants}
              initial="hidden"
              animate="visible"
              custom={index}
            >
              {/* Timeline dot */}
              <motion.div
                className="absolute left-0 md:left-1/2 w-4 h-4 rounded-full bg-blue-400 transform -translate-x-1/2 z-10 glow-blue-400"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.2 + 0.5 }}
              />

              {/* Date badge */}
              <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:text-right md:pr-8' : 'md:text-left md:pl-8'}`}>
                <div className="inline-block px-4 py-2 bg-accent/30 rounded-lg mb-2 font-medium text-blue-400">
                  {experience.period}
                </div>
              </div>

              {/* Content card */}
              <motion.div
                className={`bg-card rounded-xl border border-border p-6 shadow-lg md:w-1/2 ${
                  index % 2 === 0 ? 'md:ml-8' : 'md:mr-8'
                }`}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <h3 className="text-xl font-bold">{experience.position}</h3>
                <h4 className="text-lg text-foreground/70 mb-4">{experience.company}</h4>

                <ul className="space-y-2">
                  {experience.responsibilities.map((responsibility, respIndex) => (
                    <motion.li
                      key={respIndex}
                      className="flex items-start gap-2"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: (index * 0.1) + (respIndex * 0.1) + 0.8 }}
                    >
                      <span className="text-blue-400 mt-1 flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                      </span>
                      <span className="text-foreground/90">{responsibility}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Experience;
