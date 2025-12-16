'use client';

import { motion } from "framer-motion";
import Header from "@/components/Header";
import Banner from "@/components/Banner";
import Projects from "@/components/Projects";
import About from "@/components/About";
import { GitHubLogoIcon, LinkedInLogoIcon, EnvelopeClosedIcon } from "@radix-ui/react-icons";

const footerLinks = [
  { href: "https://github.com/realandi", icon: GitHubLogoIcon, text: "GitHub" },
  { href: "https://www.linkedin.com/in/anditafilaj", icon: LinkedInLogoIcon, text: "LinkedIn" },
  { href: "mailto:tafilajandi@gmail.com", icon: EnvelopeClosedIcon, text: "Email" },
];

export default function Home() {
  return (
    <div className="relative min-h-screen">
      <Header />

      <main>
        <Banner />

        {/* Section Divider - Enhanced */}
        <div className="relative">
          <div className="section-divider-glow mx-auto max-w-6xl" />
        </div>

        <About />

        {/* Section Divider - Enhanced */}
        <div className="relative">
          <div className="section-divider-glow mx-auto max-w-6xl" />
        </div>

        <Projects id="projects" />
      </main>

      {/* Footer */}
      <footer className="relative py-16 sm:py-20 border-t border-border">
        {/* Floating orb */}
        <div className="floating-orb floating-orb-primary w-[300px] h-[300px] -bottom-32 left-1/4 opacity-20 hidden lg:block" />

        <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-10 sm:gap-12 items-end">
            {/* Left */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <h2 className="font-display text-3xl sm:text-4xl mb-4">
                Let's build something <span className="text-gradient">together</span>
              </h2>
              <p className="text-muted-foreground max-w-md text-sm sm:text-base">
                Always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
              </p>
            </motion.div>

            {/* Right */}
            <motion.div
              className="md:text-right"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex md:justify-end gap-4 sm:gap-6 mb-6">
                {footerLinks.map((link, index) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors p-2 -m-2 touch-feedback"
                    aria-label={link.text}
                    whileHover={{ y: -3 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <link.icon className="h-5 w-5" />
                  </motion.a>
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                © 2025 Andi Tafilaj. Built with Next.js & TailwindCSS.
              </p>
            </motion.div>
          </div>
        </div>
      </footer>
    </div>
  );
}
