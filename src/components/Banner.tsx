import { useState, useEffect } from "react";
import profilePic from "@/imgs/me.webp";
import { DirectionAwareHover } from "@/components/ui/direction-aware-hover";
import { Button } from "@/components/ui/button";
import MusicCard from "@/components/ui/music-card";

const Banner = () => {


    const scrollToProjects = () => {
        const projectsSection = document.getElementById('projects');
        if (projectsSection) {
          projectsSection.scrollIntoView({ behavior: 'smooth' });
        }
      };

  return (
    <main className="overflow-x-hidden flex flex-col-reverse md:flex-row items-center justify-center p-12 gap-8 md:gap-32">
      <div className="animate-load-in-from-left">
        <h1 className="text-3xl font-bold mb-4">Really, it's Andi's Portfolio</h1>
        <p className="text-lg mb-6">
          <i>Really, another portfolio site?</i>
          <br/>
          Yes it is! And it won't be the last!
        </p>
        <div className="flex gap-4">
          <Button onClick={scrollToProjects}>
            Explore Projects
            </Button>
        </div>
      </div>
      <div className="flex flex-col animate-load-in-from-right items-center self-center gap-8">
        <DirectionAwareHover imageUrl={profilePic} className="shadow-lg">
          <p className="font-bold text-xl">It's Andi</p>
          <p className="font-normal text-sm">Photo by Yoonji Cho</p>
        </DirectionAwareHover>
        <MusicCard />
      </div>
    </main>
  );
};

export default Banner;
