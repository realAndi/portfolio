'use client'
import { useState, useRef, useEffect } from "react";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import profilePic from "@/imgs/me.webp";
import { DirectionAwareHover } from "@/components/ui/direction-aware-hover";
import ThemeSwitch from "@/components/ui/themeSwitch";
import { Button } from "@/components/ui/button";
import Banner from "@/components/Banner";
import Projects from "@/components/Projects";
import About from "@/components/About";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      let targetElement = event.target;

      if ('touches' in event) {
        targetElement = event.touches[0].target;
      }

      if (menuRef.current && !(menuRef.current as HTMLDivElement).contains(targetElement as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [menuRef]);
  return (
    <div className="flex flex-col min-h-screen dark:bg-black bg-white  dark:bg-grid-small-white/[0.15] bg-grid-small-black/[0.15] relative flex">
      <header className="flex justify-between items-center p-4">
        <div className="block lg:hidden">
          <Button variant="outline" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <HamburgerMenuIcon className="h-4 w-4"/>
          </Button>
        </div>
        <h1 className="hidden lg:block text-xl z-1 font-bold animate-fade-in-down">Really it's Andi</h1>
        <ThemeSwitch />
      </header>
      {isMenuOpen && (
        <div ref={menuRef} className={`fixed top-0 left-0 w-3/4 max-w-sm h-full bg-background border shadow-lg z-50 transform ${isMenuOpen ? 'animate-slide-in-from-left' : 'animate-slide-out-to-left'}`}>
          <div className="flex flex-col items-center p-4">
            <h1 className="text-xl font-bold">Really it's Andi</h1>
            <p className="font-normal text-sm">Front End Developer</p>
          </div>
        </div>
      )}
      <Banner />
      <About />
      <Projects />
    </div>
  );
}