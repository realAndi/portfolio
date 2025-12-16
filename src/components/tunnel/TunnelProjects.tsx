'use client';

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";

const projects = [
  {
    title: "usespeck.com",
    description: "An event planner and expense tracker that makes planning and tracking a bit more fun.",
    link: "https://usespeck.com",
    tags: ["nextjs", "typescript", "supabase"],
    color: "from-orange-500/20 to-amber-500/20",
  },
  {
    title: "doesmyipcam.work",
    description: "A simple PWA to view your Sharx IP camera feed via MJPEG.",
    link: "https://doesmyipcam.work",
    tags: ["nextjs", "typescript"],
    color: "from-blue-500/20 to-cyan-500/20",
  },
  {
    title: "PWAChat",
    description: "Progressive Web App for group chats, hosted on your own domain and server.",
    link: "https://github.com/realAndi/PWAChat",
    tags: ["nextjs", "typescript", "pusher"],
    color: "from-purple-500/20 to-pink-500/20",
  },
  {
    title: "EZOdometer-react",
    description: "A react package to create visual odometers that are easy to use.",
    link: "https://github.com/realAndi/EZOdometer-react",
    tags: ["react", "npm", "javascript"],
    color: "from-green-500/20 to-emerald-500/20",
  },
  {
    title: "Subreddit Stories Finder",
    description: "Python script to scrape reddit stories and convert them to short video content.",
    link: "https://github.com/realAndi/SubRedditStoriesFinder",
    tags: ["python", "openai", "aws"],
    color: "from-red-500/20 to-orange-500/20",
  },
  {
    title: "RestaurantLaunch",
    description: "WordPress website for Ryan, a restaurant owner selling online courses.",
    link: "https://ryanspeier.com/",
    tags: ["wordpress", "css", "javascript"],
    color: "from-indigo-500/20 to-violet-500/20",
  },
];

export default function TunnelProjects() {
  const [activeIndex, setActiveIndex] = useState(0);

  const goNext = () => setActiveIndex((i) => (i + 1) % projects.length);
  const goPrev = () => setActiveIndex((i) => (i - 1 + projects.length) % projects.length);

  const activeProject = projects[activeIndex];

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
              Selected Work
              <span className="w-6 h-px bg-primary" />
            </span>
            <h2 className="font-display text-3xl md:text-4xl tracking-tight">
              Projects
            </h2>
            <p className="text-muted-foreground mt-2">
              {projects.length} projects built over the years
            </p>
          </div>

          {/* Project showcase */}
          <div className="relative">
            {/* Card stack visual */}
            <div className="relative h-[320px] md:h-[280px]">
              <AnimatePresence mode="popLayout">
                {/* Background cards */}
                {[2, 1].map((offset) => {
                  const idx = (activeIndex + offset) % projects.length;
                  return (
                    <motion.div
                      key={`bg-${idx}`}
                      className="absolute inset-x-0 top-0 glass rounded-2xl"
                      style={{
                        height: '100%',
                        transform: `translateY(${offset * 8}px) scale(${1 - offset * 0.03})`,
                        opacity: 1 - offset * 0.3,
                        zIndex: -offset,
                      }}
                    />
                  );
                })}

                {/* Active card */}
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, x: 50, rotateY: -10 }}
                  animate={{ opacity: 1, x: 0, rotateY: 0 }}
                  exit={{ opacity: 0, x: -50, rotateY: 10 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className={`relative h-full glass rounded-2xl p-6 md:p-8 overflow-hidden`}
                >
                  {/* Gradient background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${activeProject.color} opacity-50`} />

                  {/* Content */}
                  <div className="relative z-10 h-full flex flex-col">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="font-display text-2xl md:text-3xl">
                        {activeProject.title}
                      </h3>
                      <a
                        href={activeProject.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-full glass hover:bg-primary/10 transition-colors"
                      >
                        <ExternalLink className="w-5 h-5" />
                      </a>
                    </div>

                    <p className="text-muted-foreground text-base md:text-lg mb-6 flex-1">
                      {activeProject.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {activeProject.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 rounded-full glass text-xs font-medium text-primary"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-6">
              <button
                onClick={goPrev}
                className="p-3 rounded-full glass hover:bg-primary/10 transition-all"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <div className="flex gap-2">
                {projects.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveIndex(i)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      i === activeIndex ? 'bg-primary w-6' : 'bg-border hover:bg-primary/50'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={goNext}
                className="p-3 rounded-full glass hover:bg-primary/10 transition-all"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute -top-4 -right-4 w-24 h-24 border border-primary/10 rounded-full" />
        <div className="absolute -bottom-5 -left-5 w-32 h-32 border border-primary/5 rounded-full" />
      </motion.div>
    </div>
  );
}
