import { HoverEffect } from "./ui/card-hover-effect";

export const projects = [
    {
      title: "hvh.exchange",
      description:
        "A firebase project to share settings for the popular game CS:GO. This project goal is to make a reddit-like system with security in mind.",
      link: "https://stripe.com",
      tags: ["firebase", "react", "typescript", "nextjs"]
    },
    {
      title: "Newsletter Admin Panel",
      description:
        "An AWS Project to create a visual database viewer and an email builder. This project has remained unfinished indefintely.",
      link: "https://stripe.com",
      tags: ["aws dynamodb", "react"]
    },
    {
      title: "MaiNotes",
      description:
        "A react nextjs project that simply creates notes in rich text and stores locally. This project is currently under development.",
      link: "https://stripe.com",
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
        link: "https://stripe.com",
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
  

export function Projects() {
  return (
    <div className="flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold animate-load-in-from-top">My Projects</h1>
        <div className="max-w-5xl mx-auto px-8">
        <HoverEffect items={projects} />
        </div>
    </div>
  );
}
export default Projects;