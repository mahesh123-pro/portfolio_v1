"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import dynamic from "next/dynamic";
import Lenis from "lenis";
import { AnimatePresence } from "framer-motion";
import LoadingScreen from "../components/layout/LoadingScreen";
import CommandPalette from "../components/ui/CommandPalette";

// Dynamic imports for Canvas and HUD to maintain fast initial loading times
const JourneyCanvas = dynamic(() => import("../components/three/JourneyCanvas"), { ssr: false });
const JourneyOverlays = dynamic(() => import("../components/ui/JourneyOverlays"), { ssr: false });

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollProgress = useRef(0);
  const [activeScene, setActiveScene] = useState(0);

  useEffect(() => {
    // If the user prefers reduced motion, skip smooth scrolling & ScrollTrigger animations
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setIsLoading(false);
      return;
    }

    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Register GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // Sync GSAP ScrollTrigger with Lenis
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    // Set up GSAP ScrollTrigger timeline to trace coordinates progress (0 to 1)
    const trigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "bottom bottom",
      scrub: 1.2, // Damping for camera inertia
      onUpdate: (self) => {
        // Feed progress into the shared mutable ref for R3F frame updates
        scrollProgress.current = self.progress;

        // Map scroll fractions into active scene index offsets
        const progress = self.progress;
        let sceneIndex = 0;
        if (progress < 0.08) sceneIndex = 0;         // Scene 1: Arrival
        else if (progress < 0.25) sceneIndex = 1;    // Scene 2: Skills Galaxy
        else if (progress < 0.42) sceneIndex = 2;    // Scene 3: Projects Galaxy
        else if (progress < 0.58) sceneIndex = 3;    // Scene 4: Experience Timeline
        else if (progress < 0.75) sceneIndex = 4;    // Scene 5: Mission Control
        else sceneIndex = 5;                         // Scene 6: Contact Portal

        setActiveScene(sceneIndex);
      }
    });

    return () => {
      trigger.kill();
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

      {/* Scrollable Container Wrapper */}
      <div 
        ref={containerRef} 
        className={`relative w-full min-h-[600vh] bg-[#050505] transition-all duration-500 ${
          isLoading ? "hidden pointer-events-none" : "block"
        }`}
      >
        {/* Fixed Background 3D Canvas rendering layer */}
        <JourneyCanvas scrollProgress={scrollProgress} activeScene={activeScene} />

        {/* Floating HTML HUD Overlays (Z-Index is higher than background Canvas) */}
        <JourneyOverlays activeScene={activeScene} />

        {/* Invisible Spacer Sections that drive the scroll heights for Navbar navigation anchors */}
        <div id="hero" className="h-screen w-full relative pointer-events-none" />
        <div id="skills" className="h-screen w-full relative pointer-events-none" />
        <div id="projects" className="h-screen w-full relative pointer-events-none" />
        <div id="experience" className="h-screen w-full relative pointer-events-none" />
        <div id="github" className="h-screen w-full relative pointer-events-none" />
        <div id="contact" className="h-screen w-full relative pointer-events-none" />
      </div>
    </>
  );
}

