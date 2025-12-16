'use client';

import { motion } from "framer-motion";
import { GitHubLogoIcon, LinkedInLogoIcon, EnvelopeClosedIcon } from "@radix-ui/react-icons";

const contactLinks = [
  {
    href: "https://github.com/realandi",
    icon: GitHubLogoIcon,
    label: "GitHub",
    description: "Check out my code",
  },
  {
    href: "https://www.linkedin.com/in/anditafilaj",
    icon: LinkedInLogoIcon,
    label: "LinkedIn",
    description: "Connect with me",
  },
  {
    href: "mailto:tafilajandi@gmail.com",
    icon: EnvelopeClosedIcon,
    label: "Email",
    description: "Get in touch",
  },
];

export default function TunnelContact() {
  return (
    <div className="w-full h-full flex items-center justify-center p-8">
      <motion.div
        className="relative max-w-2xl w-full"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Main panel */}
        <div className="glass-strong rounded-3xl p-8 md:p-12 shadow-depth-xl text-center">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">
              <span className="w-6 h-px bg-primary" />
              Let's Connect
              <span className="w-6 h-px bg-primary" />
            </span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl tracking-tight mb-4">
              Build something{' '}
              <span className="text-gradient">together</span>
            </h2>
            <p className="text-muted-foreground max-w-md mx-auto mb-8">
              Always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
            </p>
          </motion.div>

          {/* Contact links */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {contactLinks.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="glass rounded-2xl p-6 hover:bg-primary/5 transition-all group"
                whileHover={{ y: -4, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
              >
                <link.icon className="w-8 h-8 mx-auto mb-3 text-muted-foreground group-hover:text-primary transition-colors" />
                <p className="font-medium mb-1">{link.label}</p>
                <p className="text-xs text-muted-foreground">{link.description}</p>
              </motion.a>
            ))}
          </motion.div>

          {/* Footer */}
          <motion.div
            className="pt-6 border-t border-border/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <p className="text-sm text-muted-foreground">
              © 2025 Andi Tafilaj
            </p>
            <p className="text-xs text-muted-foreground/60 mt-1">
              Built with Next.js & TailwindCSS
            </p>
          </motion.div>
        </div>

        {/* Decorative elements */}
        <div className="absolute -top-3 -left-3 w-20 h-20 border border-primary/10 rounded-full" />
        <div className="absolute -bottom-4 -right-4 w-28 h-28 border border-primary/5 rounded-full" />
      </motion.div>
    </div>
  );
}
