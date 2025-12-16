'use client';

import React, { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';

const experiences = [
  {
    year: 2025,
    events: [
      '1+ years at The Walt Disney Company as IT Technician',
      'Developed internal tools across all Disney offices for IT analysts to utilize',
      'Developing Speck — finance management for friends and businesses',
      'Exploring BrightScript for Roku channel development',
      'Developed Doccy — a CLI documentation generator powered by AI agents',
      'Picked up skiing as a new passion',
    ],
  },
  {
    year: 2024,
    events: [
      'Published first NPM package: EZOdometer-react',
      'Started IT Technician role at The Walt Disney Company',
      'Designed menus for local restaurants and cafés',
      'Self-taught Firebase and expanded AWS knowledge',
    ],
  },
  {
    year: 2023,
    events: [
      'Graduated from Pace University — BA in Computer Science, Minor in Mathematics',
      'Full-time Data Analyst at MOT Restaurant Group',
      'Built several OpenAI-powered applications',
      'Created Reddit web scraper for TikTok content generation',
    ],
  },
  {
    year: 2022,
    events: [
      'Developed first Android app as academic project',
      'Completed Computer Science coursework',
      'Offered full-time Data Analytics position',
    ],
  },
  {
    year: 2021,
    events: [
      'Front-end Development Internship — enhanced React and Next.js skills',
      'Part-time Data Analyst role — strengthened SQL expertise',
      'Founded Albanian Software Engineering Club at Pace University',
    ],
  },
  {
    year: 2020,
    events: [
      'Started BA in Computer Science at Pace University',
      'Discovered AWS cloud deployment',
      'Learned OOP and Data Structures fundamentals',
    ],
  },
  {
    year: 2018,
    events: [
      'First role as Front-end Developer (apprenticeship)',
      'Learned React, Next.js, TailwindCSS, and TypeScript',
    ],
  },
];

const About = () => {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  // Parallax for background elements
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const orbY = useTransform(scrollYProgress, [0, 1], [0, -150]);

  return (
    <section ref={containerRef} className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-secondary/30" />

      {/* Floating Orbs with scroll parallax */}
      <motion.div
        style={{ y: orbY }}
        className="floating-orb floating-orb-accent w-[400px] h-[400px] -top-32 -left-32 opacity-25 hidden lg:block"
      />
      <motion.div
        style={{ y: backgroundY }}
        className="floating-orb floating-orb-primary w-[300px] h-[300px] bottom-20 -right-20 opacity-20 hidden lg:block animate-float-slow"
      />

      {/* Geometric shapes */}
      <div className="floating-shape shape-ring w-40 h-40 top-1/4 right-[10%] hidden lg:block animate-drift opacity-30" />
      <div className="floating-shape shape-square w-20 h-20 bottom-1/4 left-[5%] hidden lg:block animate-float-medium opacity-25" />
      <div className="floating-shape shape-ring w-16 h-16 top-[60%] right-[25%] hidden lg:block animate-float-slow opacity-20" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="mb-16 sm:mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">
            <span className="w-8 h-px bg-primary" />
            Career Path
          </span>
          <h2 className="font-display text-4xl sm:text-5xl tracking-tight">
            The Journey
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line - Enhanced with glow */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px md:-translate-x-1/2">
            <div className="absolute inset-0 bg-border" />
            <motion.div
              className="absolute inset-0 bg-gradient-to-b from-primary/50 via-primary/30 to-transparent"
              initial={{ scaleY: 0 }}
              animate={isInView ? { scaleY: 1 } : {}}
              transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
              style={{ transformOrigin: 'top' }}
            />
          </div>

          <div className="space-y-12 sm:space-y-16">
            {experiences.map((experience, experienceIndex) => {
              const isEven = experienceIndex % 2 === 0;

              return (
                <motion.div
                  key={experience.year}
                  className="relative"
                  initial={{ opacity: 0, y: 40 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: experienceIndex * 0.1, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="md:grid md:grid-cols-2 md:gap-16 items-start">
                    {/* Year Badge */}
                    <div
                      className={`flex ${isEven ? 'md:justify-end' : 'md:order-2 md:justify-start'} mb-4 md:mb-0`}
                    >
                      <div className="relative pl-8 md:pl-0">
                        {/* Dot on timeline - Enhanced */}
                        <motion.div
                          className="absolute left-0 md:left-auto md:right-[-2.5rem] md:top-2 hidden md:block"
                          initial={{ scale: 0 }}
                          animate={isInView ? { scale: 1 } : {}}
                          transition={{ duration: 0.4, delay: experienceIndex * 0.1 + 0.2, type: "spring" }}
                        >
                          <div className="w-3 h-3 rounded-full bg-primary border-4 border-background shadow-depth-sm" />
                          <div className="absolute inset-0 w-3 h-3 rounded-full bg-primary/50 animate-pulse-glow" />
                        </motion.div>
                        <div className="absolute left-[-1px] top-2 w-2 h-2 rounded-full bg-primary md:hidden" />

                        <motion.span
                          className="font-display text-5xl sm:text-6xl text-foreground/10"
                          whileHover={{ scale: 1.05, color: 'hsl(var(--primary) / 0.2)' }}
                          transition={{ duration: 0.2 }}
                        >
                          {experience.year}
                        </motion.span>
                      </div>
                    </div>

                    {/* Events - Enhanced cards */}
                    <div className={`${isEven ? '' : 'md:order-1 md:text-right'} pl-8 md:pl-0`}>
                      <div className="space-y-3">
                        {experience.events.map((event, index) => (
                          <motion.div
                            key={index}
                            className={`flex items-start gap-3 ${isEven ? '' : 'md:flex-row-reverse'}`}
                            initial={{ opacity: 0, x: isEven ? -20 : 20 }}
                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                            transition={{
                              duration: 0.4,
                              delay: experienceIndex * 0.1 + index * 0.05,
                              ease: [0.22, 1, 0.36, 1]
                            }}
                          >
                            <motion.span
                              className="flex-shrink-0 w-1.5 h-1.5 mt-2 rounded-full bg-primary/50"
                              whileHover={{ scale: 1.5, backgroundColor: 'hsl(var(--primary))' }}
                            />
                            <motion.p
                              className="text-muted-foreground text-sm leading-relaxed glass-subtle rounded-lg px-3 py-2 hover:bg-background/50 transition-colors touch-feedback"
                              whileHover={{ x: isEven ? 4 : -4 }}
                              transition={{ duration: 0.2 }}
                            >
                              {event}
                            </motion.p>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* End marker */}
          <motion.div
            className="absolute left-0 md:left-1/2 bottom-0 md:-translate-x-1/2 translate-y-full pt-4"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <div className="text-xs text-muted-foreground uppercase tracking-widest hidden md:block">
              The beginning
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
