import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const About = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const containerVariants = {
    initial: {
      height: "auto",
      width: "200px",
      padding: "1rem",
      cursor: "pointer",
    },
    expanded: {
      height: "auto",
      width: "100%",
      padding: "2rem",
      cursor: "default",
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    },
    collapsed: {
      height: "auto",
      width: "200px",
      padding: "1rem",
      cursor: "pointer",
      transition: {
        delay: 0.3,
        duration: 0.5,
        ease: "easeInOut",
      },
    },
  };

  const textVariants = {
    initial: {
      opacity: 0,
    },
    expanded: {
      opacity: 1,
      transition: {
        delay: 0.3,
        duration: 0.5,
        ease: "easeInOut",
      },
    },
    collapsed: {
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <motion.div
        className="max-w-lg bg-background border font-bold text-center text-xl text-foreground rounded-lg"
        variants={containerVariants}
        initial="initial"
        animate={isExpanded ? "expanded" : "collapsed"}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <motion.p className="py-2">Who Am I?</motion.p>
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <motion.h1
                className="text-2xl font-bold text-foreground mt-4"
                variants={textVariants}
                initial="initial"
                animate="expanded"
                exit="collapsed"
              >
                My Name is Andi
              </motion.h1>
              <motion.p
                className="text-foreground font-normal text-sm mt-2"
                variants={textVariants}
                initial="initial"
                animate="expanded"
                exit="collapsed"
              >
                Hello! I'm Andi, a passionate Front End Developer with a love for creating beautiful and functional web applications. I specialize in React, NextJs, TypeScript, and Tailwind CSS. Although I am knowledgable in all frameworks.
                I've started my Front End development journey back in high school learning jQuery, which quickly grew into learning React. Over time, I got myself an apprenticeship at a local company to further hone my skills. After deciding to
                pursue my education, I quickly learned more about Computer Science and what it is. And now with a completed degree in Computer Science, as well as experience within the industry, I am ready to tackle any project that I am given!
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default About;