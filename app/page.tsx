"use client";

import { useState, useEffect } from "react";
import Lenis from "lenis";
import { AnimatePresence } from "framer-motion";
import LoadingScreen from "../components/layout/LoadingScreen";
import Hero from "../components/sections/Hero";
import About from "../components/sections/About";
import Skills from "../components/sections/Skills";
import Projects from "../components/sections/Projects";
import Experience from "../components/sections/Experience";
import Certifications from "../components/sections/Certifications";
import Contact from "../components/sections/Contact";
import Footer from "../components/layout/Footer";
import CommandPalette from "../components/ui/CommandPalette";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  // Setup smooth scroll inertia using Lenis
  useEffect(() => {
    // If the user prefers reduced motion, skip smooth scrolling
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <>
      {/* Spotlight Command Center Overlay */}
      <CommandPalette />

      {/* Cinematic entry sequence */}
      <AnimatePresence>
        {isLoading && (
          <LoadingScreen onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {/* Main Sections Assembly */}
      <div className={`transition-all duration-500 ${isLoading ? "hidden pointer-events-none" : "block"}`}>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Certifications />
        <Contact />
        <Footer />
      </div>
    </>
  );
}
