'use client'
import { useState, useRef, useEffect } from "react";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import profilePic from "@/imgs/me.webp";
import { DirectionAwareHover } from "@/components/ui/direction-aware-hover";
import ThemeSwitch from "@/components/ui/themeSwitch";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Banner from "@/components/Banner";
import Projects from "@/components/Projects";
import About from "@/components/About";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen dark:bg-black bg-white dark:bg-grid-small-white/[0.15] bg-grid-small-black/[0.15] relative flex">
      <Header />
      <Banner />
      <About />
      <Projects id="projects" />
    </div>
  );
}