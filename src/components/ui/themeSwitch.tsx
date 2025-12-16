'use client'

import React, { useState, useEffect } from "react";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

const ThemeSwitch = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  // Avoid hydration mismatch by not rendering until mounted
  if (!mounted) {
    return (
      <div className="relative">
        <Button className="p-2 rounded-full relative opacity-0">
          <SunIcon className="h-6 w-6" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </div>
    );
  }

  return (
    <div className="relative">
      <Button
        onClick={toggleTheme}
        className="p-2 rounded-full hover:ring-2 hover:ring-offset-2 hover:ring-primary transition relative hover:shadow-lg hover:scale-105 touch-feedback"
      >
        <SunIcon className={`h-6 w-6 transition-transform duration-300 ${theme === 'dark' ? 'rotate-0 scale-0' : '-rotate-90 scale-100'}`} />
        <MoonIcon className={`h-6 w-6 transition-transform duration-300 absolute ${theme === 'dark' ? 'rotate-0 scale-100' : 'rotate-90 scale-0'}`} />
        <span className="sr-only">Toggle theme</span>
      </Button>
    </div>
  );
};

export default ThemeSwitch;
