import React, { useRef, useState, useMemo } from 'react';
import { motion, useMotionValue, useTransform, useAnimation, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CodeIcon, CopyIcon, CheckIcon } from "@radix-ui/react-icons";
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
  
  const SWIPE_THRESHOLD = 100; // minimum distance to trigger swipe
  const ROTATION_RANGE = 25; // maximum rotation in degrees

  // Keep CARD_SUITES array outside component
  const CARD_SUITES = [
    { symbol: '♠', isRed: false },
    { symbol: '♥', isRed: true },
    { symbol: '♣', isRed: false },
    { symbol: '♦', isRed: true }
  ];

  export function Projects({ id }: ProjectsProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    
    // Use useMemo to ensure consistent suite assignment
    const projectsWithSuites = useMemo(() => 
      projects.map((project, index) => ({
        ...project,
        suite: CARD_SUITES[index % CARD_SUITES.length], // Use index instead of random
      })),
      [] // Empty dependency array as projects is static
    );

    const [projectStack, setProjectStack] = useState(projectsWithSuites);
    
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotate = useTransform(x, [-200, 200], [-ROTATION_RANGE, ROTATION_RANGE]);
    const controls = useAnimation();
    const [copied, setCopied] = useState(false);

    const handleDragEnd = async (event: any, info: any) => {
      const offset = info.offset.x;
      const velocity = info.velocity.x;

      if (Math.abs(offset) > SWIPE_THRESHOLD || Math.abs(velocity) > 500) {
        // Determine direction and animate card off screen
        const direction = offset > 0 ? 1 : -1;
        await controls.start({
          x: direction * window.innerWidth * 1.5,
          rotate: direction * ROTATION_RANGE,
          transition: { duration: 0.4 }
        });

        // Move first card to end of stack
        setProjectStack(stack => {
          const [first, ...rest] = stack;
          return [...rest, first];
        });

        // Reset position for next card
        controls.set({ x: 0, y: 0, rotate: 0 });
      } else {
        // Return to center if not swiped far enough
        controls.start({ x: 0, y: 0, rotate: 0 });
      }
    };

    const codeSnippet = `import { motion, useMotionValue, useTransform, useAnimation, AnimatePresence } from 'framer-motion';

const SWIPE_THRESHOLD = 100; // minimum distance to trigger swipe
const ROTATION_RANGE = 25; // maximum rotation in degrees

interface Project {
  title: string;
  description: string;
  tags: string[];
}

interface Props {
  projects: Project[];
}

export function SwipeableCards({ projects }: Props) {
  const [projectStack, setProjectStack] = useState(projects);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-ROTATION_RANGE, ROTATION_RANGE]);
  const controls = useAnimation();

  const handleDragEnd = async (event: any, info: any) => {
    const offset = info.offset.x;
    const velocity = info.velocity.x;

    if (Math.abs(offset) > SWIPE_THRESHOLD || Math.abs(velocity) > 500) {
      // Determine direction and animate card off screen
      const direction = offset > 0 ? 1 : -1;
      await controls.start({
        x: direction * window.innerWidth * 1.5,
        rotate: direction * ROTATION_RANGE,
        transition: { duration: 0.4 }
      });

      // Move first card to end of stack
      setProjectStack(stack => {
        const [first, ...rest] = stack;
        return [...rest, first];
      });

      // Reset position for next card
      controls.set({ x: 0, y: 0, rotate: 0 });
    } else {
      // Return to center if not swiped far enough
      controls.start({ x: 0, y: 0, rotate: 0 });
    }
  };

  return (
    <div className="relative w-full max-w-[320px] h-[420px]">
      <AnimatePresence mode="popLayout">
        {projectStack.slice(0, 4).map((project, index) => (
          <motion.div
            key={project.title}
            style={{
              x: index === 0 ? x : 0,
              y: index === 0 ? y : 0,
              rotate: index === 0 ? rotate : 0,
              zIndex: projectStack.length - index,
              filter: \`blur(\${index * 2}px)\`,
            }}
            animate={{
              ...((index === 0 && controls) || {}),
              scale: 1 - index * 0.05,
              y: index * -20,
              opacity: 1 - index * 0.15,
            }}
            drag={index === 0}
            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
            onDragEnd={handleDragEnd}
            initial={index === projectStack.length - 1 ? { scale: 0, y: 100 } : false}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-card border-2 rounded-xl shadow-xl p-5 
              cursor-grab active:cursor-grabbing backdrop-blur-sm"
          >
            <div className="h-full flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold mb-3">{project.title}</h3>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 bg-primary/10 text-primary rounded-md text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="text-muted-foreground text-sm">{project.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}`;

    return (
      <motion.div
        ref={ref}
        id={id}
        className="flex flex-col items-center justify-center min-h-[600px] py-20"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="flex items-center gap-4 mb-12">
          <motion.h1
            className="text-2xl font-bold"
            initial={{ y: 50, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
          >
            My Projects
          </motion.h1>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon"
                className="hover:bg-primary/10"
              >
                <CodeIcon className="h-5 w-5" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-3xl max-h-[90vh] w-[95vw] p-6">
              <DialogHeader className="pb-4">
                <DialogTitle>Card Swipe Animation Code</DialogTitle>
                <div className="mt-2 space-y-3">
                  <p className="text-sm text-muted-foreground">
                    A smooth card swiping animation built with <span className="text-blue-500"><u><b><a href="https://www.npmjs.com/package/framer-motion" target="_blank" rel="noopener noreferrer">Framer Motion</a></b></u></span>. Cards can be swiped left or right, 
                    with rotation based on swipe direction. When released, cards automatically animate to their new position.
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Yes I made my own code-block component, I'm proud of it.
                  </p>
                </div>
              </DialogHeader>
              
              <div className="relative flex-1 overflow-hidden rounded-lg">
                <div className="overflow-auto max-h-[60vh]">
                  <CodeBlock 
                    code={codeSnippet}
                    className="w-full"
                    language="typescript"
                  />
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <p className="text-muted-foreground text-sm mb-20 text-center">
          Swipe cards to browse projects
        </p>
        <div className="relative w-full max-w-[320px] h-[420px]">
          <AnimatePresence mode="popLayout">
            {projectStack.slice(0, 4).map((project, index) => (
              <motion.div
                key={project.title}
                style={{
                  x: index === 0 ? x : 0,
                  y: index === 0 ? y : 0,
                  rotate: index === 0 ? rotate : 0,
                  zIndex: projectStack.length - index,
                  filter: `blur(${index * 2}px)`,
                }}
                animate={{
                  ...((index === 0 && controls) || {}),
                  scale: 1 - index * 0.05,
                  y: index * -20,
                  opacity: 1 - index * 0.15,
                }}
                drag={index === 0}
                dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                onDragEnd={handleDragEnd}
                initial={index === projectStack.length - 1 ? { scale: 0, y: 100 } : false}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 bg-card border-2 rounded-xl shadow-xl p-5 cursor-grab active:cursor-grabbing backdrop-blur-sm aspect-[3/4] playing-card"
              >
                <div className="h-full flex flex-col justify-between relative">
                  <div>
                    <h3 className="text-xl font-bold mb-3">{project.title}</h3>
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 bg-primary/10 text-primary rounded-md text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <p className="text-muted-foreground text-sm">{project.description}</p>
                  </div>
                  
                  <div 
                    className={`absolute p-2 -bottom-0 -right-0 text-5xl opacity-20 blur-[1px] transform rotate-180 ${
                      project.suite.isRed ? 'text-red-600' : 'text-current'
                    }`}
                  >
                    {project.suite.symbol}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </motion.div>
    );
  }
  
  export default Projects;