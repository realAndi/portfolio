import React, {useRef, useEffect } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';

const experiences = [
  {
    year: 2024,
    events: [
      'Designed Menu\'s for local restaurants and cafe\'s.',
      'Published first NPM package for React, giving the ability to implement an Odometer easily onto any project',
      'Self-taught Firebase and further into AWS, learning about back-end design and efficient data management',
      'Started career as IT Technician at The Walt Disney Company',
      'Bought my first car which I am very proud to write here',
    ],
  },
  {
    year: 2023,
    events: [
      'Started full time as a Data Analyst for MOT Restaurant Group',
      'OpenAI released, developed many fun projects utilizing OpenAI\'s API',
      'Graduated from Pace University, BA in Computer Science, Minor in Mathematics',
      'Self-taught UI/UX Design, further strenghting my skills in Figma',
      'Learned Web Scraping with Python and created a Reddit Web Scraper to get popular posts and make TikTok narration videos out of them',
    ],
  },
  {
    year: 2022,
    events: [
      'Developed first Android App as a part of my academic project, further strenghting my skills in Java',
      'Completed all necessary Computer Science courses for my academic career',
      'Data Analytics job offered full time position, starting early 2023.',
    ],
  },
  {
    year: 2021,
    events: [
      'Picked up part-time IT Help Desk job at a local company',
      'Achieved Front End Development Internship, further enhancing React and NextJS skills',
      'Started 2nd part-time job as a Data Analyst for a local restaurant company, further strenghting my skills and experience in SQL',
      'Created the Albanian Software Engineering Club for all Albanian Students in Pace University',
    ],
  },
  {
    year: 2020,
    events: [
      'Started my academic career at Pace University, pursuing a BA in Computer Science',
      'Discovered the world of Cloud Deployment with AWS',
      'Learned the world of OOP and Data Structures',
    ],
  },
  {
    year: 2018,
    events: [
      'First career as a Front End Developer under apprenticeship program',
      'Learned React, NextJS, TailwindCSS, and TypeScript',
      'Studied the world of JavaScript frameworks',
    ],
  },
];

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      className="flex flex-col items-center justify-center p-12"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <motion.h1
        className="text-2xl font-bold mb-16"
        initial={{ y: -20, opacity: 0 }}
        animate={isInView ? { y: 0, opacity: 1 } : { y: -20, opacity: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
      >
        My Timeline
      </motion.h1>

      <div className="max-w-4xl w-full space-y-8">
        {experiences.map((experience, experienceIndex) => {
          const sectionRef = useRef(null);
          const isInView = useInView(sectionRef, { once: true });
          const isEven = experienceIndex % 2 === 0;

          return (
            <motion.div
              key={experience.year}
              ref={sectionRef}
              className={`flex items-start gap-8 ${isEven ? 'flex-row' : 'flex-row-reverse'} md:mx-8`}
              initial={{ 
                x: isEven ? -100 : 100,
                opacity: 0
              }}
              animate={isInView ? {
                x: 0,
                opacity: 1
              } : {
                x: isEven ? -100 : 100,
                opacity: 0
              }}
              transition={{ 
                duration: 0.5,
                type: "spring",
                stiffness: 100
              }}
            >
              {/* Year Block */}
              <div className="flex-shrink-0 w-24 md:w-32">
                <motion.div
                  className="bg-primary/10 p-3 rounded-lg"
                  initial={{ scale: 0.8 }}
                  animate={isInView ? { scale: 1 } : { scale: 0.8 }}
                  transition={{ delay: 0.2 }}
                >
                  <span className="text-xl md:text-2xl font-bold text-primary">
                    {experience.year}
                  </span>
                </motion.div>
              </div>

              {/* Events Block */}
              <div className="flex-1 space-y-4 bg-secondary/20 rounded-lg p-4">
                {experience.events.map((event, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start gap-3"
                    initial={{ y: 20, opacity: 0 }}
                    animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
                    transition={{
                      duration: 0.4,
                      delay: index * 0.1,
                    }}
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={isInView ? { scale: 1 } : { scale: 0 }}
                      transition={{ delay: index * 0.1 + 0.2 }}
                      className="mt-2.5 flex-shrink-0"
                    >
                      <div className="h-[1px] w-3 bg-primary/50" />
                    </motion.div>
                    <span className="text-muted-foreground text-sm">
                      {event}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default About;