'use client';

import { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import profilePic from "@/imgs/me-again.webp";
import { DirectionAwareHover } from "@/components/ui/direction-aware-hover";
import { Button } from "@/components/ui/button";
import MusicCard from "@/components/ui/music-card";
import { Dialog, DialogContent, DialogTrigger, DialogClose, DialogTitle } from "@/components/ui/dialog";
import { PhotoEditor } from "@/components/ui/photo-editor";
import { X, ArrowDown } from "lucide-react";

const Banner = () => {
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLElement>(null);

  // Mouse position for parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring physics for mouse movement
  const springConfig = { damping: 25, stiffness: 150 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  // Transform mouse position to parallax offsets (different depths)
  const parallaxX1 = useTransform(smoothMouseX, [-0.5, 0.5], [-30, 30]);
  const parallaxY1 = useTransform(smoothMouseY, [-0.5, 0.5], [-30, 30]);
  const parallaxX2 = useTransform(smoothMouseX, [-0.5, 0.5], [-15, 15]);
  const parallaxY2 = useTransform(smoothMouseY, [-0.5, 0.5], [-15, 15]);
  const parallaxX3 = useTransform(smoothMouseX, [-0.5, 0.5], [-8, 8]);
  const parallaxY3 = useTransform(smoothMouseY, [-0.5, 0.5], [-8, 8]);

  // 3D rotation for photo
  const rotateX = useTransform(smoothMouseY, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(smoothMouseX, [-0.5, 0.5], [-8, 8]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const scrollToProjects = () => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 gradient-mesh" />
      <div className="absolute inset-0 noise-overlay pointer-events-none" />

      {/* Floating Orbs - Different depths */}
      <motion.div
        style={{ x: parallaxX1, y: parallaxY1 }}
        className="floating-orb floating-orb-primary w-[500px] h-[500px] -top-32 -left-32 opacity-60 hidden lg:block"
      />
      <motion.div
        style={{ x: parallaxX2, y: parallaxY2 }}
        className="floating-orb floating-orb-accent w-[400px] h-[400px] top-1/3 -right-20 opacity-50 hidden lg:block animate-float-slow"
      />
      <motion.div
        style={{ x: parallaxX1, y: parallaxY1 }}
        className="floating-orb floating-orb-primary w-[300px] h-[300px] bottom-20 left-1/4 opacity-40 hidden lg:block animate-float-medium"
      />

      {/* Geometric Shapes - Floating at different speeds */}
      <motion.div
        style={{ x: parallaxX3, y: parallaxY3 }}
        className="floating-shape shape-ring w-32 h-32 top-1/4 left-[15%] hidden lg:block animate-drift"
      />
      <motion.div
        style={{ x: parallaxX2, y: parallaxY2 }}
        className="floating-shape shape-ring w-48 h-48 bottom-1/3 right-[10%] hidden lg:block animate-float-slow"
      />
      <motion.div
        style={{ x: parallaxX1, y: parallaxY1 }}
        className="floating-shape shape-square w-16 h-16 top-[60%] left-[8%] hidden lg:block animate-float-medium"
      />

      {/* Decorative Lines */}
      <motion.div
        style={{ y: parallaxY3 }}
        className="absolute top-1/4 left-10 w-px h-32 bg-gradient-to-b from-transparent via-primary/30 to-transparent hidden lg:block"
      />
      <motion.div
        style={{ y: parallaxY3 }}
        className="absolute bottom-1/4 right-10 w-px h-32 bg-gradient-to-b from-transparent via-primary/30 to-transparent hidden lg:block"
      />

      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8 py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left Column - Text Content */}
          <div className="order-2 lg:order-1 space-y-8">
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={mounted ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                <span className="w-8 h-px bg-primary" />
                Developer & Designer
              </span>
            </motion.div>

            {/* Main Headline */}
            <div className="space-y-4">
              <motion.h1
                className="font-display text-5xl sm:text-6xl lg:text-7xl leading-[0.9] tracking-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={mounted ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="block">Really,</span>
                <span className="block">it's <span className="text-gradient">Andi</span></span>
              </motion.h1>

              <motion.p
                className="text-base sm:text-lg text-muted-foreground max-w-md leading-relaxed"
                initial={{ opacity: 0, y: 30 }}
                animate={mounted ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              >
                Front-end developer crafting digital experiences with code and creativity. Based in New York, building for the world.
              </motion.p>
            </div>

            {/* CTA */}
            <motion.div
              className="flex flex-wrap items-center gap-4 sm:gap-6"
              initial={{ opacity: 0, y: 30 }}
              animate={mounted ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <Button
                onClick={scrollToProjects}
                className="group bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-5 text-sm font-medium touch-feedback"
              >
                Explore Work
                <ArrowDown className="ml-2 h-4 w-4 transition-transform group-hover:translate-y-0.5" />
              </Button>
              <a
                href="mailto:tafilajandi@gmail.com"
                className="editorial-link text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Get in touch
              </a>
            </motion.div>

            {/* Stats - Glassmorphism Cards */}
            <motion.div
              className="pt-8 border-t border-border/50"
              initial={{ opacity: 0, y: 30 }}
              animate={mounted ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="grid grid-cols-3 gap-3 sm:gap-6">
                {[
                  { value: "7+", label: "Years Experience" },
                  { value: "20+", label: "Projects Built" },
                  { value: "∞", label: "Ideas Brewing" },
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    className="glass rounded-xl p-3 sm:p-4 shadow-depth-sm hover:shadow-depth-md transition-shadow duration-300"
                    style={{ x: parallaxX3, y: parallaxY3 }}
                    whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  >
                    <p className="font-display text-xl sm:text-2xl text-foreground">{stat.value}</p>
                    <p className="text-[10px] sm:text-xs text-muted-foreground mt-1">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column - Photo & Music */}
          <div className="order-1 lg:order-2 flex flex-col items-center lg:items-end gap-6 sm:gap-8">
            {/* Photo with 3D Tilt Effect */}
            <Dialog>
              <DialogTrigger asChild>
                <motion.div
                  className="cursor-pointer group perspective-container"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={mounted ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                >
                  <motion.div
                    className="relative transform-3d"
                    style={{
                      rotateX: rotateX,
                      rotateY: rotateY,
                    }}
                  >
                    {/* Decorative frames - respond to mouse */}
                    <motion.div
                      className="absolute -inset-3 border border-primary/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{ x: parallaxX3, y: parallaxY3 }}
                    />
                    <motion.div
                      className="absolute -inset-6 border border-primary/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                      style={{ x: parallaxX2, y: parallaxY2 }}
                    />

                    <div className="shadow-depth-xl rounded-xl overflow-hidden">
                      <DirectionAwareHover imageUrl={profilePic} className="glow-primary">
                        <p className="font-display text-xl">It's Andi</p>
                        <p className="text-sm text-white/70">Photo by John Flowers</p>
                      </DirectionAwareHover>
                    </div>
                  </motion.div>
                  <p className="text-center text-xs text-muted-foreground mt-4 opacity-60 group-hover:opacity-100 transition-opacity">
                    Tap to edit this photo
                  </p>
                </motion.div>
              </DialogTrigger>
              <DialogContent className="flex flex-col w-full h-[100dvh] md:h-auto md:max-h-[90vh] p-0 border-border bg-background">
                <DialogTitle className="sr-only">Photo Editor</DialogTitle>
                <div className="relative">
                  <DialogClose className="absolute right-4 top-4 z-50">
                    <div className="rounded-full bg-background/80 backdrop-blur-sm p-2 hover:bg-background/90 transition-colors border border-border">
                      <X className="h-4 w-4" />
                    </div>
                  </DialogClose>
                  <PhotoEditor imageUrl={profilePic} />
                </div>
              </DialogContent>
            </Dialog>

            {/* Music Card with depth */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={mounted ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              style={{ x: parallaxX3, y: parallaxY3 }}
              className="w-full max-w-[280px]"
            >
              <MusicCard />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={mounted ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <div className="flex flex-col items-center gap-2 text-muted-foreground">
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <motion.div
            className="w-px h-8 bg-gradient-to-b from-primary/50 to-transparent"
            animate={{ scaleY: [1, 0.6, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Banner;
