'use client';

import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const experiences = [
  {
    year: 2025,
    title: "Disney & Beyond",
    events: [
      '1+ years at The Walt Disney Company as IT Technician',
      'Developed internal tools across all Disney offices',
      'Developing Speck — finance management app',
      'Built Doccy — CLI documentation generator with AI',
      'Picked up skiing as a new passion',
    ],
  },
  {
    year: 2024,
    title: "New Beginnings",
    events: [
      'Published first NPM package: EZOdometer-react',
      'Started IT Technician role at Disney',
      'Designed menus for local restaurants',
      'Self-taught Firebase and AWS',
    ],
  },
  {
    year: 2023,
    title: "Graduation",
    events: [
      'Graduated from Pace University — BA in Computer Science',
      'Full-time Data Analyst at MOT Restaurant Group',
      'Built several OpenAI-powered applications',
      'Created Reddit scraper for TikTok content',
    ],
  },
  {
    year: 2022,
    title: "Growth",
    events: [
      'Developed first Android app',
      'Completed CS coursework',
      'Offered full-time Data Analytics position',
    ],
  },
  {
    year: 2021,
    title: "Internships",
    events: [
      'Front-end Development Internship',
      'Part-time Data Analyst role',
      'Founded Albanian Software Engineering Club',
    ],
  },
  {
    year: 2020,
    title: "College Start",
    events: [
      'Started BA in CS at Pace University',
      'Discovered AWS cloud deployment',
      'Learned OOP and Data Structures',
    ],
  },
  {
    year: 2018,
    title: "The Beginning",
    events: [
      'First role as Front-end Developer',
      'Learned React, Next.js, TailwindCSS',
    ],
  },
];

export default function TunnelTimeline() {
  const [activeIndex, setActiveIndex] = useState(0);

  const goNext = () => setActiveIndex((i) => Math.min(i + 1, experiences.length - 1));
  const goPrev = () => setActiveIndex((i) => Math.max(i - 1, 0));

  return (
    <div className="w-full h-full flex items-center justify-center p-8">
      <motion.div
        className="relative max-w-4xl w-full"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Main panel */}
        <div className="glass-strong rounded-3xl p-8 md:p-12 shadow-depth-xl">
          {/* Header */}
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3">
              <span className="w-6 h-px bg-primary" />
              Career Path
              <span className="w-6 h-px bg-primary" />
            </span>
            <h2 className="font-display text-3xl md:text-4xl tracking-tight">
              The Journey
            </h2>
          </div>

          {/* Year selector */}
          <div className="flex items-center justify-center gap-2 mb-8 flex-wrap">
            {experiences.map((exp, i) => (
              <button
                key={exp.year}
                onClick={() => setActiveIndex(i)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                  i === activeIndex
                    ? 'bg-primary text-primary-foreground'
                    : 'glass hover:bg-primary/10 text-muted-foreground'
                }`}
              >
                {exp.year}
              </button>
            ))}
          </div>

          {/* Content card */}
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="glass rounded-2xl p-6 md:p-8"
          >
            {/* Year & Title */}
            <div className="flex items-baseline gap-4 mb-6">
              <span className="font-display text-5xl md:text-6xl text-primary/20">
                {experiences[activeIndex].year}
              </span>
              <h3 className="font-display text-xl md:text-2xl">
                {experiences[activeIndex].title}
              </h3>
            </div>

            {/* Events */}
            <ul className="space-y-3">
              {experiences[activeIndex].events.map((event, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <span className="text-muted-foreground">{event}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-6">
            <button
              onClick={goPrev}
              disabled={activeIndex === 0}
              className="p-2 rounded-full glass hover:bg-primary/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex gap-1.5">
              {experiences.map((_, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    i === activeIndex ? 'bg-primary' : 'bg-border'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={goNext}
              disabled={activeIndex === experiences.length - 1}
              className="p-2 rounded-full glass hover:bg-primary/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute -top-3 -left-3 w-20 h-20 border border-primary/10 rounded-full" />
        <div className="absolute -bottom-4 -right-4 w-28 h-28 border border-primary/5 rounded-full" />
      </motion.div>
    </div>
  );
}
