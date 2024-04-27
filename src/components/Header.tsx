import { useState, useRef, useEffect } from "react";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import ThemeSwitch from "@/components/ui/themeSwitch";
import { GitHubLogoIcon, LinkedInLogoIcon, EnvelopeClosedIcon } from "@radix-ui/react-icons";

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

    return () => {
      if (headerRef.current) {
        observer.unobserve(headerRef.current);
      }
    };
  }, []);

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
    <header ref={headerRef} className="flex justify-between items-center p-4">
      <div className="block lg:hidden">
        <Button variant="outline" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <HamburgerMenuIcon className="h-4 w-4"/>
        </Button>
      </div>
      <div className="hidden lg:flex items-center space-x-4">
        <h1 className={`text-xl z-1 font-bold ${isVisible ? 'animate-load-in-from-left' : 'opacity-0'}`}>Really it's Andi</h1>
        {headerIcons.map((item, index) => (
          <a
            key={item.href}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center space-x-1 ${isVisible ? `animate-load-in-from-left` : 'opacity-0'}`}
          >
            <item.icon className="h-5 w-5" />
            <span>{item.text}</span>
          </a>
        ))}
      </div>
      {isMenuOpen && (
        <div ref={menuRef} className={`fixed top-0 left-0 w-3/4 max-w-sm h-full bg-background border shadow-lg z-50 transform ${isMenuOpen ? 'animate-slide-in-from-left' : 'animate-slide-out-to-left'}`}>
          <div className="flex flex-col items-center p-4">
            <h1 className="text-xl font-bold">Really it's Andi</h1>
            <p className="font-normal text-sm">Front End Developer</p>
            <div className="mt-4 space-y-2">
              {headerIcons.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-1"
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.text}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
      <ThemeSwitch />
    </header>
  );
}