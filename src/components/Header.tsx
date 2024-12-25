import { useState, useRef, useEffect } from "react";
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
  const [isVisible, setIsVisible] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const headerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
        if (entry.isIntersecting) {
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (headerRef.current) {
      observer.observe(headerRef.current);
    }

    return () => observer.disconnect();
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
      // Prevent scrolling when menu is open
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
    <div className="w-full px-4 sm:px-6 lg:px-8 py-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <header ref={headerRef} className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="block lg:hidden">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <HamburgerMenuIcon className="h-5 w-5"/>
          </Button>
        </div>
        
        <nav className="hidden lg:flex items-center space-x-6">
          <h1 className={`text-xl font-bold ${isVisible ? 'animate-load-in-from-left' : 'opacity-0'}`}>
            Really it's Andi
          </h1>
          {headerIcons.map((item, index) => (
            <a
              key={item.href}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center space-x-2 hover:text-primary transition-colors ${
                isVisible ? `animate-load-in-from-left` : 'opacity-0'
              }`}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.text}</span>
            </a>
          ))}
        </nav>

        {/* Overlay */}
        {isMenuOpen && (
          <div 
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 lg:hidden"
            aria-hidden="true"
          />
        )}

        {/* Mobile Menu */}
        <div
          ref={menuRef}
          className={cn(
            "fixed inset-y-0 left-0 w-full sm:w-[300px] min-h-screen bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-r shadow-lg z-[100] lg:hidden transform transition-transform duration-300 ease-in-out",
            isMenuOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <div className="flex flex-col min-h-screen">
            {/* Header */}
            <div className="sticky top-0 p-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Menu</h2>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => setIsMenuOpen(false)}
                  aria-label="Close menu"
                >
                  <Cross1Icon className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto">
              <div className="p-6 space-y-6">
                <div>
                  <h3 className="text-xl font-bold">Really it's Andi</h3>
                  <p className="text-sm text-muted-foreground mt-1">Front End Developer</p>
                </div>

                <nav className="space-y-1">
                  {headerIcons.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center px-3 py-3 border-b"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <item.icon className="h-5 w-5 mr-3" />
                      <span className="text-sm">{item.text}</span>
                    </a>
                  ))}
                </nav>
              </div>
            </div>

            {/* Footer */}
            <div className="sticky bottom-0 p-4 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <div className="flex items-center space-x-2">
                <ThemeSwitch />
                <span className="text-sm text-muted-foreground">Toggle theme</span>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:block">
          <ThemeSwitch />
        </div>
      </header>
    </div>
  );
}