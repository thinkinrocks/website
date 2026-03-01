import { useState, useEffect } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { FaDiscord, FaLinkedin, FaTelegram, FaInstagram, FaBars } from "react-icons/fa";

interface MobileNavProps {
  currentPath: string;
}

export default function MobileNav({ currentPath }: MobileNavProps) {
  const [open, setOpen] = useState(false);

  // Close menu on navigation
  useEffect(() => {
    const handleNavigation = () => {
      setOpen(false);
    };

    // Listen to Astro's page load event
    document.addEventListener('astro:page-load', handleNavigation);
    
    return () => {
      document.removeEventListener('astro:page-load', handleNavigation);
    };
  }, []);

  const isActive = (path: string) => {
    if (path === "/") {
      return currentPath === "/" || currentPath === "";
    }
    return currentPath.startsWith(path);
  };

  const navLinks = [
    { href: "/", label: "Thinkin' Rocks*", path: "/" },
    { href: "/hardware", label: "hardware", path: "/hardware" },
    { href: "/about", label: "about", path: "/about" },
    { href: "/events", label: "events", path: "/events" },
    { href: "/log", label: "log", path: "/log" },
    { href: "/code-of-conduct", label: "conduct", path: "/code-of-conduct" },
  ];

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          className="flex items-center justify-center text-gray-500 hover:text-purple-600 transition-colors duration-200"
          aria-label="Open menu"
        >
          <FaBars className="w-[18px] h-[18px]" />
        </button>
      </SheetTrigger>
      <SheetContent side="right" className="w-80 sm:w-96 p-0" showCloseButton={false}>
        <SheetHeader className="sr-only">
          <SheetTitle>Navigation Menu</SheetTitle>
        </SheetHeader>
        <nav className="pt-3 px-6 flex flex-col space-y-0.5">
          {navLinks.map((link) => (
            <a
              key={link.path}
              href={link.href}
              className={`font-mono text-base py-3 px-4 transition-all duration-200 ${
                isActive(link.path)
                  ? "text-purple-600 font-semibold"
                  : "text-gray-700 hover:text-purple-600 hover:bg-gray-50"
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>
        
        <div className="px-6 mt-6 pt-6 border-t border-gray-200">
          <p className="text-sm font-mono text-gray-600 mb-4">
            more hardware • faster build cycles • stronger aura
          </p>
          <div className="flex items-center gap-1.5">
            <a
              data-umami-event="discord-mobile-menu"
              href="https://discord.gg/5MEu6njksN"
              className="flex-1 flex items-center justify-center p-3 bg-white text-gray-600 hover:text-purple-600 hover:bg-purple-50 transition-all duration-200"
              aria-label="Discord"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaDiscord className="w-5 h-5" />
            </a>
            
            <a
              data-umami-event="linkedin-mobile-menu"
              href="https://www.linkedin.com/company/thinkin-rocks/"
              className="flex-1 flex items-center justify-center p-3 bg-white text-gray-600 hover:text-purple-600 hover:bg-purple-50 transition-all duration-200"
              aria-label="LinkedIn"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin className="w-5 h-5" />
            </a>
            
            <a
              data-umami-event="telegram-mobile-menu"
              href="https://t.me/thinkinrocks"
              className="flex-1 flex items-center justify-center p-3 bg-white text-gray-600 hover:text-purple-600 hover:bg-purple-50 transition-all duration-200"
              aria-label="Telegram"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTelegram className="w-5 h-5" />
            </a>
            
            <a
              data-umami-event="instagram-mobile-menu"
              href="https://instagram.com/thinkinrocks"
              className="flex-1 flex items-center justify-center p-3 bg-white text-gray-600 hover:text-purple-600 hover:bg-purple-50 transition-all duration-200"
              aria-label="Instagram"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram className="w-5 h-5" />
            </a>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
