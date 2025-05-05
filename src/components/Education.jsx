"use client";

import { motion } from "framer-motion";

const Education = ({ data, certifications, languages }) => {
  const educationVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="container mx-auto">
      <h2 className="section-title">Education & Certifications</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {/* Education column */}
        <div className="md:col-span-2">
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <svg className="mr-2" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"/></svg>
            Education
          </h3>

          <motion.div
            className="space-y-4"
            variants={educationVariants}
            initial="hidden"
            animate="visible"
          >
            {data.map((edu, index) => (
              <motion.div
                key={index}
                className="p-5 rounded-lg border border-border bg-card/70"
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-lg font-medium">{edu.institution}</h4>
                    <p className="text-foreground/60">{edu.degree}</p>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-blue-400 font-semibold">{edu.year}</span>
                    <span className="text-sm text-foreground/60">{edu.grade}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Certifications and Languages column */}
        <div>
          {/* Certifications */}
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <svg className="mr-2" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="14" x="3" y="5" rx="2"/><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
            Certifications
          </h3>

          <motion.div
            className="mb-8 space-y-3"
            variants={educationVariants}
            initial="hidden"
            animate="visible"
          >
            {certifications.map((cert, index) => (
              <motion.div
                key={index}
                className="p-3 rounded-md flex items-start gap-3 border border-border/50 bg-card/30"
                variants={itemVariants}
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <span className="text-blue-400 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
                </span>
                <span>{cert}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Languages */}
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <svg className="mr-2" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m5 8 6 6"/><path d="m4 14 6-6 2-3"/><path d="M2 5h12"/><path d="M7 2h1"/><path d="m22 22-5-10-5 10"/><path d="M14 18h6"/></svg>
            Languages
          </h3>

          <motion.div
            className="flex flex-wrap gap-2"
            variants={educationVariants}
            initial="hidden"
            animate="visible"
          >
            {languages.map((lang, index) => (
              <motion.div
                key={index}
                className="px-4 py-2 rounded-full bg-blue-500/10 text-foreground/90 border border-blue-500/20"
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                {lang}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Education;
