'use client';

import { motion } from "framer-motion";
import profilePic from "@/imgs/me-again.webp";
import Image from "next/image";
import MusicCard from "@/components/ui/music-card";
import { GitHubLogoIcon, LinkedInLogoIcon, EnvelopeClosedIcon } from "@radix-ui/react-icons";

const socialLinks = [
  { href: "https://github.com/realandi", icon: GitHubLogoIcon, label: "GitHub" },
  { href: "https://www.linkedin.com/in/anditafilaj", icon: LinkedInLogoIcon, label: "LinkedIn" },
  { href: "mailto:tafilajandi@gmail.com", icon: EnvelopeClosedIcon, label: "Email" },
];

export default function TunnelHero() {
  return (
    <div className="w-full h-full flex items-center justify-center p-8">
      {/* Main floating panel */}
      <motion.div
        className="relative max-w-4xl w-full"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Glassmorphic card */}
        <div className="glass-strong rounded-3xl p-8 md:p-12 shadow-depth-xl">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
            {/* Photo */}
            <motion.div
              className="relative flex-shrink-0"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="relative w-40 h-40 md:w-48 md:h-48 rounded-2xl overflow-hidden shadow-depth-lg">
                <Image
                  src={profilePic}
                  alt="Andi Tafilaj"
                  fill
                  className="object-cover"
                  priority
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" />
              </div>
              {/* Decorative ring */}
              <div className="absolute -inset-2 border border-primary/20 rounded-3xl" />
            </motion.div>

            {/* Content */}
            <div className="flex-1 text-center lg:text-left">
              {/* Eyebrow */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">
                  <span className="w-6 h-px bg-primary" />
                  Developer & Designer
                  <span className="w-6 h-px bg-primary" />
                </span>
              </motion.div>

              {/* Name */}
              <motion.h1
                className="font-display text-4xl md:text-5xl lg:text-6xl tracking-tight mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <span className="text-gradient">Andi</span> Tafilaj
              </motion.h1>

              {/* Description */}
              <motion.p
                className="text-muted-foreground text-base md:text-lg max-w-md mx-auto lg:mx-0 mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                Front-end developer crafting digital experiences with code and creativity. Based in New York.
              </motion.p>

              {/* Stats row */}
              <motion.div
                className="flex justify-center lg:justify-start gap-6 mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                {[
                  { value: "7+", label: "Years" },
                  { value: "20+", label: "Projects" },
                  { value: "∞", label: "Ideas" },
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <p className="font-display text-2xl text-foreground">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                  </div>
                ))}
              </motion.div>

              {/* Social links */}
              <motion.div
                className="flex justify-center lg:justify-start gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                {socialLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full glass hover:bg-primary/10 transition-colors"
                    aria-label={link.label}
                  >
                    <link.icon className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors" />
                  </a>
                ))}
              </motion.div>
            </div>
          </div>

          {/* Music card - bottom */}
          <motion.div
            className="mt-8 pt-8 border-t border-border/50 flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <MusicCard />
          </motion.div>
        </div>

        {/* Floating decorative elements */}
        <div className="absolute -top-4 -right-4 w-24 h-24 border border-primary/10 rounded-full" />
        <div className="absolute -bottom-6 -left-6 w-32 h-32 border border-primary/5 rounded-full" />
      </motion.div>
    </div>
  );
}
