"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { useScrollProgress } from "../../hooks/useScrollProgress";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

interface NavLink {
  label: string;
  id: string;
  isPage?: boolean;
}

const navLinks: NavLink[] = [
  { label: "About", id: "about" },
  { label: "Skills", id: "skills" },
  { label: "Projects", id: "/projects", isPage: true },
  { label: "Experience", id: "experience" },
  { label: "Certifications", id: "/certifications", isPage: true },
  { label: "Blog", id: "/blog", isPage: true },
  { label: "Sandbox", id: "/playground", isPage: true },
  { label: "Contact", id: "contact" }
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const scrollProgress = useScrollProgress();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Track active section during scroll
      const sections = navLinks.map((link) => link.isPage ? null : document.getElementById(link.id));
      let currentSection = "";

      sections.forEach((sec) => {
        if (!sec) return;
        const rect = sec.getBoundingClientRect();
        if (rect.top <= 120 && rect.bottom >= 120) {
          currentSection = sec.id;
        }
      });

      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (link: NavLink) => {
    setMobileMenuOpen(false);
    if (link.isPage) {
      router.push(link.id);
      return;
    }

    if (pathname === "/") {
      const element = document.getElementById(link.id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      router.push(`/#${link.id}`);
    }
  };

  return (
    <>
      {/* Sticky container wrapper */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-dark/80 backdrop-blur-md border-b border-white/5 py-3 shadow-[0_4px_30px_rgba(0,0,0,0.3)]"
            : "bg-transparent py-5"
        }`}
      >
        {/* Scroll Progress Bar */}
        <div 
          className="absolute top-0 left-0 h-[2px] bg-primary shadow-[0_0_8px_#FF6B00] transition-all duration-100"
          style={{ width: `${scrollProgress}%` }}
        />

        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          {/* Logo Monogram */}
          <div
            onClick={() => handleNavClick({ label: "Hero", id: "hero" })}
            className="text-xl font-bold font-space text-white cursor-pointer select-none tracking-widest flex items-center gap-1 group"
          >
            <span className="text-primary transition-all duration-300 group-hover:shadow-[0_0_15px_rgba(255,107,0,0.6)]">MK</span>
            <span className="text-[10px] font-mono text-muted group-hover:text-primary transition-colors">v2.0</span>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = (!link.isPage && activeSection === link.id) || (link.isPage && pathname.startsWith(link.id));
              return (
                <div
                  key={link.id}
                  onClick={() => handleNavClick(link)}
                  className="relative text-xs font-mono text-muted hover:text-white cursor-pointer tracking-wider select-none py-1 transition-colors"
                >
                  {link.label.toUpperCase()}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-primary shadow-[0_0_8px_#FF6B00]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </div>
              );
            })}
          </nav>

          {/* CTA hire button */}
          <div className="hidden md:block">
            <button
              onClick={() => handleNavClick({ label: "Contact", id: "contact" })}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-primary border border-primary text-xs font-mono font-bold text-white hover:bg-transparent hover:text-primary transition-all cursor-pointer shadow-[0_0_15px_rgba(255,107,0,0.2)] hover:shadow-[0_0_25px_rgba(255,107,0,0.4)] hover:scale-105 active:scale-95"
            >
              Hire Me
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile hamburger icon */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white hover:text-primary transition-colors cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen Mobile Navigation Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-dark z-40 flex flex-col justify-center px-8 py-20 md:hidden"
          >
            {/* Background elements */}
            <div className="absolute inset-0 bg-grid-pattern opacity-10" />
            
            <nav className="flex flex-col gap-6 relative z-10">
              {navLinks.map((link, idx) => (
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  key={link.id}
                  onClick={() => handleNavClick(link)}
                  className="text-2xl font-space font-bold text-muted hover:text-white cursor-pointer transition-colors"
                >
                  <span className="text-primary mr-3 font-mono text-sm">0{idx + 1}.</span>
                  {link.label}
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navLinks.length * 0.05 }}
                className="mt-8"
              >
                <button
                  onClick={() => handleNavClick({ label: "Contact", id: "contact" })}
                  className="w-full py-3 rounded-xl bg-primary text-sm font-mono font-bold text-white hover:bg-transparent border border-primary transition-all cursor-pointer uppercase tracking-wider text-center flex items-center justify-center gap-2"
                >
                  Hire Me
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;
