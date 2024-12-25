import { useState, useEffect } from "react";
import profilePic from "@/imgs/me-again.webp";
import { DirectionAwareHover } from "@/components/ui/direction-aware-hover";
import { Button } from "@/components/ui/button";
import MusicCard from "@/components/ui/music-card";
import { Dialog, DialogContent, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { PhotoEditor } from "@/components/ui/photo-editor";
import { X } from "lucide-react";

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
        <Dialog>
          <DialogTrigger asChild>
            <div className="cursor-pointer">
              <DirectionAwareHover imageUrl={profilePic} className="shadow-lg">
                <p className="font-bold text-xl">It's Andi</p>
                <p className="font-normal text-sm">Photo by John Flowers</p>
              </DirectionAwareHover>
              <p className="text-zinc-500 text-center text-xs mt-4 text-sm">I'm not sure how to edit this photo, tap to edit it for me!</p>
            </div>
          </DialogTrigger>
          <DialogContent className="flex flex-col w-full h-[100dvh] md:h-auto md:max-h-[90vh] p-0">
            <div className="relative">
              <DialogClose className="absolute right-4 top-4 z-50">
                <div className="rounded-full bg-background/80 backdrop-blur-sm p-2 hover:bg-background/90 transition-colors">
                  <X className="h-4 w-4" />
                </div>
              </DialogClose>
              <PhotoEditor imageUrl={profilePic} />
            </div>
          </DialogContent>
        </Dialog>
        <MusicCard />
      </div>
    </main>
  );
};

export default Banner;
