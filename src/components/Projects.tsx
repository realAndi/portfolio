'use client';

import React, { useRef, useState, useMemo } from 'react';
import { motion, useMotionValue, useTransform, useAnimation, AnimatePresence, useInView, useSpring } from 'framer-motion';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CodeIcon, ExternalLinkIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { CodeBlock } from "@/components/ui/code-block";

interface ProjectsProps {
  id?: string;
}

export const projects = [
  {
    title: "usespeck.com",
    description:
      "An event planner and expense tracker that makes planning and tracking a bit more fun.",
    link: "https://usespeck.com",
    tags: ["nextjs", "typescript", "supabase"]
  },
  {
    title: "doesmyipcam.work",
    description:
      "A simple PWA to view your Sharx IP camera feed via MJPEG.",
    link: "https://doesmyipcam.work",
    tags: ["nextjs", "typescript"]
  },
  {
    title: "PWAChat",
    description:
      "PWAChat is a Progressive Web App that allows you to be in 1 conjoined group chat with your friends, hosted on your own domain, database, and server. This project is currently under development.",
    link: "https://github.com/realAndi/PWAChat",
    tags: ["nextjs", "typescript", "pusher"]
  },
  {
    title: "EZOdometer-react",
    description:
      "A react package to create a visual odometer that is easy to use. ",
    link: "https://github.com/realAndi/EZOdometer-react",
    tags: ["react", "git", "npm", "javascript"]
  },
  {
    title: "Subreddit Stories Finder",
    description:
      "A python script to scrape reddit stories and make them to short video content. Utilizes OpenAI Whisper to generate subtitles and AWS TTS for the narration.",
    link: "https://github.com/realAndi/SubRedditStoriesFinder",
    tags: ["python", "pandas", "nodejs", "openai", "aws"]
  },
  {
    title: "RestaurantLaunch",
    description:
      "Wordpress website made for Ryan, a restaurant owner. He wishes to sell his own online course and needed a well put together website.",
    link: "https://ryanspeier.com/",
    tags: ["wordpress", "css", "html", "javascript"]
  },
];

const SWIPE_THRESHOLD = 100;
const ROTATION_RANGE = 25;

const CARD_SUITES = [
  { symbol: '♠', isRed: false },
  { symbol: '♥', isRed: true },
  { symbol: '♣', isRed: false },
  { symbol: '♦', isRed: true }
];

const codeSnippet = `// Swipeable Card Stack with Framer Motion
const x = useMotionValue(0);
const rotate = useTransform(x, [-200, 200], [-25, 25]);

const handleDragEnd = async (event, info) => {
  const offset = info.offset.x;
  if (Math.abs(offset) > SWIPE_THRESHOLD) {
    const direction = offset > 0 ? 1 : -1;
    await controls.start({
      x: direction * window.innerWidth * 1.5,
      rotate: direction * 25,
    });
    // Cycle card to back of stack
    setStack(s => [...s.slice(1), s[0]]);
    controls.set({ x: 0, rotate: 0 });
  }
};`;

export function Projects({ id }: ProjectsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [isDragging, setIsDragging] = useState(false);
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);

  const projectsWithSuites = useMemo(() =>
    projects.map((project, index) => ({
      ...project,
      suite: CARD_SUITES[index % CARD_SUITES.length],
    })),
    []
  );

  const [projectStack, setProjectStack] = useState(projectsWithSuites);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-ROTATION_RANGE, ROTATION_RANGE]);
  const controls = useAnimation();

  // Spring for smooth card shadow response
  const springX = useSpring(x, { damping: 30, stiffness: 300 });
  const shadowX = useTransform(springX, [-200, 0, 200], [20, 0, -20]);

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDrag = (_: any, info: any) => {
    if (info.offset.x > 30) {
      setSwipeDirection('right');
    } else if (info.offset.x < -30) {
      setSwipeDirection('left');
    } else {
      setSwipeDirection(null);
    }
  };

  const handleDragEnd = async (_: any, info: any) => {
    setIsDragging(false);
    setSwipeDirection(null);
    const offset = info.offset.x;
    const velocity = info.velocity.x;

    if (Math.abs(offset) > SWIPE_THRESHOLD || Math.abs(velocity) > 500) {
      const direction = offset > 0 ? 1 : -1;
      await controls.start({
        x: direction * window.innerWidth * 1.5,
        rotate: direction * ROTATION_RANGE,
        transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
      });

      setProjectStack(stack => {
        const [first, ...rest] = stack;
        return [...rest, first];
      });

      controls.set({ x: 0, y: 0, rotate: 0 });
    } else {
      controls.start({
        x: 0,
        y: 0,
        rotate: 0,
        transition: { type: "spring", damping: 20, stiffness: 300 }
      });
    }
  };

  const cycleCard = (direction: 'next' | 'prev') => {
    setProjectStack(stack => {
      if (direction === 'next') {
        const [first, ...rest] = stack;
        return [...rest, first];
      } else {
        const last = stack[stack.length - 1];
        return [last, ...stack.slice(0, -1)];
      }
    });
  };

  return (
    <section id={id} className="relative py-24 sm:py-32 overflow-hidden" ref={sectionRef}>
      {/* Background */}
      <div className="absolute inset-0 gradient-mesh" />

      {/* Floating Orbs */}
      <div className="floating-orb floating-orb-primary w-[350px] h-[350px] -top-20 -right-20 opacity-30 hidden lg:block animate-float-slow" />
      <div className="floating-orb floating-orb-accent w-[250px] h-[250px] bottom-40 -left-20 opacity-25 hidden lg:block animate-float-medium" />

      {/* Geometric shapes */}
      <div className="floating-shape shape-ring w-24 h-24 top-1/4 right-[20%] hidden lg:block animate-drift opacity-50" />
      <div className="floating-shape shape-square w-12 h-12 bottom-1/3 left-[15%] hidden lg:block animate-float-slow opacity-40" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8" ref={containerRef}>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">

          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">
              <span className="w-8 h-px bg-primary" />
              Selected Work
            </span>
            <h2 className="font-display text-4xl sm:text-5xl tracking-tight mb-6">
              Projects
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8 max-w-md">
              A collection of projects I've built over the years. From web apps to NPM packages,
              each one taught me something new.
            </p>

            <div className="flex items-center gap-4 mb-8">
              <p className="text-sm text-muted-foreground">
                <span className="text-foreground font-medium">{projects.length}</span> projects
              </p>
              <span className="w-1 h-1 rounded-full bg-border" />
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <span className="animate-swipe-hint inline-block">←</span>
                Swipe to explore
              </p>
            </div>

            {/* Navigation buttons for mobile/touch */}
            <div className="flex items-center gap-3 mb-8 lg:hidden">
              <Button
                variant="outline"
                size="icon"
                onClick={() => cycleCard('prev')}
                className="touch-feedback border-border hover:border-primary/50 hover:bg-primary/5"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => cycleCard('next')}
                className="touch-feedback border-border hover:border-primary/50 hover:bg-primary/5"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
              <span className="text-xs text-muted-foreground">or swipe the card</span>
            </div>

            {/* Code Snippet Dialog */}
            <div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="group border-border hover:border-primary/50 hover:bg-primary/5 touch-feedback"
                  >
                    <CodeIcon className="h-4 w-4 mr-2" />
                    View Animation Code
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-2xl max-h-[90vh] p-6 bg-background border-border">
                  <DialogHeader className="pb-4">
                    <DialogTitle className="font-display">Card Swipe Animation</DialogTitle>
                    <p className="text-sm text-muted-foreground mt-2">
                      Built with{' '}
                      <a
                        href="https://www.npmjs.com/package/framer-motion"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        Framer Motion
                      </a>
                      . Cards rotate based on drag direction and cycle through the stack.
                    </p>
                  </DialogHeader>
                  <div className="relative overflow-hidden rounded-lg">
                    <CodeBlock
                      code={codeSnippet}
                      className="w-full"
                      language="typescript"
                    />
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </motion.div>

          {/* Right Column - Card Stack */}
          <motion.div
            className="flex justify-center lg:justify-end perspective-deep"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative w-full max-w-[320px] h-[420px] transform-3d">
              {/* Swipe direction indicators */}
              <AnimatePresence>
                {swipeDirection && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className={`absolute top-1/2 -translate-y-1/2 z-50 ${
                      swipeDirection === 'left' ? '-left-16' : '-right-16'
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      swipeDirection === 'left'
                        ? 'bg-muted-foreground/20'
                        : 'bg-primary/20'
                    }`}>
                      {swipeDirection === 'left' ? (
                        <ChevronLeft className="w-6 h-6 text-muted-foreground" />
                      ) : (
                        <ChevronRight className="w-6 h-6 text-primary" />
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <AnimatePresence mode="popLayout">
                {projectStack.slice(0, 4).map((project, index) => (
                  <motion.div
                    key={project.title}
                    style={{
                      x: index === 0 ? x : 0,
                      y: index === 0 ? y : 0,
                      rotate: index === 0 ? rotate : 0,
                      zIndex: projectStack.length - index,
                    }}
                    animate={{
                      ...((index === 0 && controls) || {}),
                      scale: 1 - index * 0.04,
                      y: index * -16,
                      opacity: 1 - index * 0.12,
                      filter: `blur(${index * 1.5}px)`,
                    }}
                    drag={index === 0}
                    dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                    dragElastic={0.1}
                    onDragStart={handleDragStart}
                    onDrag={handleDrag}
                    onDragEnd={handleDragEnd}
                    initial={index === projectStack.length - 1 ? { scale: 0, y: 100 } : false}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className={`absolute inset-0 rounded-2xl p-6 cursor-grab active:cursor-grabbing select-none touch-feedback
                      ${index === 0 ? 'shadow-depth-lg' : 'shadow-depth-sm'}
                      bg-card border border-border
                      ${isDragging && index === 0 ? 'shadow-depth-xl' : ''}
                    `}
                  >
                    <motion.div
                      className="h-full flex flex-col justify-between relative"
                      style={index === 0 ? { x: shadowX } : {}}
                    >
                      {/* Card Content */}
                      <div>
                        <div className="flex items-start justify-between mb-4">
                          <h3 className="font-display text-xl">{project.title}</h3>
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 -m-2 text-muted-foreground hover:text-primary transition-colors touch-feedback"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <ExternalLinkIcon className="h-4 w-4" />
                          </a>
                        </div>

                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {project.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2.5 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {project.description}
                        </p>
                      </div>

                      {/* Card Suite Decoration */}
                      <div
                        className={`absolute bottom-0 right-0 text-7xl opacity-[0.07] transform rotate-180 select-none font-serif ${
                          project.suite.isRed ? 'text-red-500' : 'text-foreground'
                        }`}
                      >
                        {project.suite.symbol}
                      </div>

                      {/* Card index indicator */}
                      <div className="absolute bottom-4 left-0 flex items-center gap-1">
                        {projectStack.slice(0, 4).map((_, i) => (
                          <div
                            key={i}
                            className={`w-1.5 h-1.5 rounded-full transition-colors ${
                              i === 0 ? 'bg-primary' : 'bg-border'
                            }`}
                          />
                        ))}
                      </div>
                    </motion.div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Projects;
