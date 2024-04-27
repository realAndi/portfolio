import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { HoverEffect } from "./ui/card-hover-effect";

interface ProjectsProps {
    id?: string;
  }

export const projects = [
    {
      title: "hvh.exchange",
      description:
        "A firebase project to share settings for the popular game CS:GO. This project goal is to make a reddit-like system with security in mind.",
      link: "",
      tags: ["firebase", "react", "typescript", "nextjs"]
    },
    {
      title: "Newsletter Admin Panel",
      description:
        "An AWS Project to create a visual database viewer and an email builder. This project has remained unfinished indefintely.",
      link: "",
      tags: ["aws dynamodb", "lambda", "react"]
    },
    {
      title: "MaiNotes",
      description:
        "A react nextjs project that simply creates notes in rich text and stores locally. This project is currently under development.",
      link: "",
      tags: ["react", "nextjs", "typescript", "tailwindcss"]
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
  
  export function Projects({ id }: ProjectsProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
  
    return (
      <motion.div
        ref={ref}
        id={id}
        className="flex flex-col items-center justify-center"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <motion.h1
          className="text-2xl font-bold"
          initial={{ y: 50, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
        >
          My Projects
        </motion.h1>
        <motion.div
          className="max-w-5xl mx-auto px-8"
          initial={{ y: 50, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.4 }}
        >
          <HoverEffect items={projects} />
        </motion.div>
      </motion.div>
    );
  }
  
  export default Projects;