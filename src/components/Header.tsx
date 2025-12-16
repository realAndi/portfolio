'use client';

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HamburgerMenuIcon, Cross1Icon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import ThemeSwitch from "@/components/ui/themeSwitch";
import { GitHubLogoIcon, LinkedInLogoIcon, EnvelopeClosedIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";

const headerIcons = [
  { href: "https://github.com/realandi", icon: GitHubLogoIcon, text: "GitHub" },
  { href: "https://www.linkedin.com/in/anditafilaj", icon: LinkedInLogoIcon, text: "LinkedIn" },
  { href: "mailto:tafilajandi@gmail.com", icon: EnvelopeClosedIcon, text: "Email" },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled
            ? "py-3 glass-strong shadow-depth-sm"
            : "py-6 bg-transparent"
        )}
      >
        <div className="max-w-6xl mx-auto px-6 lg:px-8 flex justify-between items-center">
          {/* Left Side - Tagline */}
          <motion.div
            className="flex items-center gap-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="hidden sm:flex items-center gap-2">
              <span className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground/60 font-medium">
                Yet another portfolio site
              </span>
              <span className="w-6 h-px bg-primary/40" />
            </div>
          </motion.div>

          {/* Center - Logo */}
          <motion.a
            href="#"
            className="absolute left-1/2 -translate-x-1/2 font-display text-xl tracking-tight group"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="relative">
              <span className="text-foreground group-hover:text-primary transition-colors duration-300">andi</span>
              <motion.span
                className="absolute -top-1 -right-2 text-[8px] text-primary font-mono"
                animate={{ rotate: [0, 15, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                ✦
              </motion.span>
            </span>
          </motion.a>

          {/* Right Side - Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            {headerIcons.map((item, index) => (
              <motion.a
                key={item.href}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors p-2 -m-2"
                aria-label={item.text}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.05, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <item.icon className="h-4 w-4" />
              </motion.a>
            ))}
            <motion.div
              className="w-px h-4 bg-border mx-1"
              initial={{ opacity: 0, scaleY: 0 }}
              animate={{ opacity: 1, scaleY: 1 }}
              transition={{ duration: 0.4, delay: 0.35 }}
            />
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <ThemeSwitch />
            </motion.div>
          </nav>

          {/* Mobile Menu Button */}
          <motion.div
            className="flex items-center gap-3 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <ThemeSwitch />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
              className="relative w-10 h-10 touch-feedback"
            >
              <motion.div
                animate={{ rotate: isMenuOpen ? 90 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <HamburgerMenuIcon className="h-5 w-5" />
              </motion.div>
            </Button>
          </motion.div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-background/60 backdrop-blur-md z-[60] lg:hidden"
            onClick={() => setIsMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            ref={menuRef}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 h-full w-[280px] glass-strong z-[70] lg:hidden shadow-depth-xl"
          >
            <div className="flex flex-col h-full">
              {/* Close Button */}
              <motion.div
                className="flex justify-end p-4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsMenuOpen(false)}
                  aria-label="Close menu"
                  className="touch-feedback"
                >
                  <Cross1Icon className="h-5 w-5" />
                </Button>
              </motion.div>

              {/* Menu Content */}
              <div className="flex-1 px-6 py-4">
                <motion.div
                  className="mb-8"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                >
                  <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground/60 mb-4">
                    Yet another portfolio site
                  </p>
                  <div className="h-px bg-gradient-to-r from-primary/50 to-transparent" />
                </motion.div>

                <nav className="space-y-1">
                  {headerIcons.map((item, index) => (
                    <motion.a
                      key={item.href}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 py-4 text-foreground hover:text-primary transition-colors group touch-feedback rounded-lg px-2 -mx-2 hover:bg-primary/5"
                      onClick={() => setIsMenuOpen(false)}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + index * 0.05, type: "spring", damping: 25 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <motion.div
                        whileHover={{ rotate: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        <item.icon className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                      </motion.div>
                      <span className="text-lg">{item.text}</span>
                      <motion.span
                        className="ml-auto opacity-0 group-hover:opacity-100 text-primary"
                        initial={{ x: -10 }}
                        whileHover={{ x: 0 }}
                      >
                        →
                      </motion.span>
                    </motion.a>
                  ))}
                </nav>
              </div>

              {/* Footer */}
              <motion.div
                className="p-6 border-t border-border/50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <p className="text-xs text-muted-foreground">
                  © 2025 Andi Tafilaj
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
