import React, {useRef, useEffect } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';

const experiences = [
  {
    year: 2024,
    events: [
      'Designed Menu\'s for local restaurants and cafe\'s.',
      'Published first NPM package for React, giving the ability to implement an Odometer easily onto any project',
      'Self-taught Firebase and further into AWS, learning about back-end design and efficient data management',
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
  const lineControls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  
  const calculateLineProgress = () => {
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const progress = scrollPosition / (documentHeight - windowHeight);

    lineControls.set({ height: `${Math.min(progress * 150, 100)}%` });
  };

  useEffect(() => {
    window.addEventListener('scroll', calculateLineProgress);
    return () => {
      window.removeEventListener('scroll', calculateLineProgress);
    };
  }, []);

  return (
    
    <motion.div
        ref={ref}
        className="flex flex-col items-center justify-center p-12"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        >
        <motion.h1
          className="text-2xl font-bold"
          initial={{ y: -20, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: -20, opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
        >
          My Timeline
        </motion.h1>
      <div className="divide-zinc-800 relative">
        <motion.div
          className="absolute h-full w-[4px] bg-gradient-to-b from-transparent from-0% via-foreground via-95% to-transparent -left-4 md:-left-10"
          initial={{ height: 0 }}
          animate={lineControls}
        ></motion.div>
        {experiences.map((experience) => {
          const sectionRef = useRef(null);
          const isInView = useInView(sectionRef, { once: true });

          return (
            <motion.div
              key={experience.year}
              ref={sectionRef}
              className="border-b border-zinc-800"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: 0.2 }}
            >
              <h1 className="text-xl font-bold text-foreground my-8 relative">
                <motion.div
                  className="h-3 md:h-4 w-3 md:w-4 border-2 border-foreground bg-background rounded-full absolute -left-[20px] md:-left-[46px] top-2 md:top-1"
                  initial={{ pathLength: 0 }}
                  animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
                  transition={{ duration: 0.5, ease: 'easeInOut' }}
                ></motion.div>
                <motion.span
                  initial={{ x: 20, opacity: 0 }}
                  animate={isInView ? { x: 0, opacity: 1 } : { x: 20, opacity: 0 }}
                  transition={{ duration: 0.5, ease: 'easeOut', delay: 0.2 }}
                >
                  {experience.year}
                </motion.span>
              </h1>
              <div className="mb-8">
                {experience.events.map((event, index) => (
                  <motion.div
                    key={index}
                    className="flex flex-row space-x-2 items-start my-2"
                    initial={{ x: 20, opacity: 0 }}
                    animate={isInView ? { x: 0, opacity: 1 } : { x: 20, opacity: 0 }}
                    transition={{ duration: 0.5, ease: 'easeOut', delay: 0.2 }}
                  >
                    <svg stroke="currentColor" fill="none" strokeWidth="1.5" viewBox="0 0 24 24" aria-hidden="true" className="text-foreground mt-[3px] flex-shrink-0" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <span className="text-zinc-400 text-sm md:text-base">{event}</span>
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