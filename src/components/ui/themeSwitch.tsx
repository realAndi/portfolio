'use client'

import React from "react";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

const ThemeSwitch = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className="relative">
      <Button onClick={toggleTheme} className="p-2 rounded-full hover:outline-none hover:ring-2 hover:ring-offset-2 hover:ring-primary transition relative hover:shadow-lg hover:scale-105">
        <SunIcon className={`h-6 w-6 transition-transform ${theme === 'dark' ? 'rotate-0 scale-0' : '-rotate-90 scale-100'}`} />
        <MoonIcon className={`h-6 w-6 transition-transform absolute ${theme === 'dark' ? 'rotate-0 scale-100' : 'rotate-90 scale-0'}`} />
        <span className="sr-only">Toggle theme</span>
      </Button>
    </div>
  );
};

export default ThemeSwitch;