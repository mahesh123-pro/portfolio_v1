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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "py-4" : "py-6"
        }`}
      >
        {/* Scroll Progress Bar */}
        <div 
          className="fixed top-0 left-0 h-[3px] bg-gradient-to-r from-primary to-purple-500 shadow-[0_0_15px_#FF6B00] transition-all duration-100 z-[60]"
          style={{ width: `${scrollProgress}%` }}
        />

        <div 
          className={`mx-auto flex justify-between items-center transition-all duration-500 ${
            scrolled 
              ? "max-w-5xl bg-dark/60 backdrop-blur-xl border border-white/10 rounded-full py-3 px-8 shadow-[0_8px_32px_rgba(0,0,0,0.5)] ring-1 ring-white/5" 
              : "max-w-7xl bg-transparent px-6"
          }`}
        >
          {/* Logo Monogram */}
          <div
            onClick={() => handleNavClick({ label: "Hero", id: "hero" })}
            className="text-2xl font-bold font-space text-white cursor-pointer select-none tracking-widest flex items-center gap-1 group relative"
          >
            <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-300 transition-all duration-500 group-hover:drop-shadow-[0_0_15px_rgba(255,107,0,0.8)] z-10">MK</span>
            <span className="text-xs font-mono text-muted group-hover:text-white transition-colors z-10">v2.0</span>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-2 lg:gap-6">
            {navLinks.map((link) => {
              const isActive = (!link.isPage && activeSection === link.id) || (link.isPage && pathname.startsWith(link.id));
              return (
                <div
                  key={link.id}
                  onClick={() => handleNavClick(link)}
                  className={`relative text-sm font-space font-medium cursor-pointer tracking-wide select-none py-2 px-4 rounded-full transition-all duration-300 hover:scale-105 ${
                    isActive ? "text-white bg-white/5" : "text-muted hover:text-white hover:bg-white/5"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute inset-0 border border-primary/30 rounded-full shadow-[inset_0_0_15px_rgba(255,107,0,0.2)] bg-primary/10"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </div>
              );
            })}
          </nav>

          {/* CTA hire button */}
          <div className="hidden md:block relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-orange-500 rounded-full blur opacity-40 group-hover:opacity-75 transition-opacity duration-500 group-hover:scale-110" />
            <button
              onClick={() => handleNavClick({ label: "Contact", id: "contact" })}
              className="relative flex items-center gap-2 px-6 py-2.5 rounded-full bg-dark/80 backdrop-blur-md border border-primary/50 text-sm font-space font-bold text-white hover:bg-primary hover:text-dark transition-all duration-300 cursor-pointer hover:scale-105 active:scale-95"
            >
              Hire Me
              <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-transform duration-300" />
            </button>
          </div>

          {/* Mobile hamburger icon */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white hover:text-primary transition-colors cursor-pointer p-2 rounded-full bg-white/5 border border-white/10"
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
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 bg-dark/95 backdrop-blur-2xl z-40 flex flex-col justify-center px-8 py-20 md:hidden"
          >
            {/* Background elements */}
            <div className="absolute inset-0 bg-grid-pattern opacity-10" />
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/20 rounded-full blur-[100px] pointer-events-none" />
            
            <nav className="flex flex-col gap-6 relative z-10">
              {navLinks.map((link, idx) => (
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 + 0.1 }}
                  key={link.id}
                  onClick={() => handleNavClick(link)}
                  className="group flex items-center text-3xl font-space font-bold text-muted hover:text-white cursor-pointer transition-all duration-300 hover:translate-x-4"
                >
                  <span className="text-primary mr-4 font-mono text-sm opacity-50 group-hover:opacity-100 transition-opacity">0{idx + 1}.</span>
                  <span className="bg-clip-text group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-primary transition-all duration-300">
                    {link.label}
                  </span>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.05 + 0.2 }}
                className="mt-12 relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-orange-500 rounded-xl blur opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
                <button
                  onClick={() => handleNavClick({ label: "Contact", id: "contact" })}
                  className="relative w-full py-4 rounded-xl bg-dark border border-primary/50 text-lg font-space font-bold text-white hover:bg-primary hover:text-dark transition-all duration-300 cursor-pointer tracking-wider text-center flex items-center justify-center gap-3 shadow-2xl hover:scale-[1.02] active:scale-[0.98]"
                >
                  Hire Me
                  <ArrowUpRight className="w-5 h-5 group-hover:rotate-45 transition-transform duration-300" />
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
