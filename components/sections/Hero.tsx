"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Download, Terminal, User, Cloud } from "lucide-react";
import dynamic from "next/dynamic";
import { Canvas } from "@react-three/fiber";
import { TiltCard } from "../ui/TiltCard";

// Dynamic import for WebGL Canvas background to maintain performance
const ParticleField = dynamic(() => import("../three/ParticleField"), { ssr: false });
const CloudModel = dynamic(() => import("../three/CloudModel"), { ssr: false });

export function Hero() {
  const [typedText, setTypedText] = useState("");
  const [viewMode, setViewMode] = useState<"bio" | "cloud">("bio");
  const fullText = "Cloud Engineer · Full Stack Developer · Tech Lead";

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setTypedText((prev) => prev + fullText.charAt(index));
      index++;
      if (index >= fullText.length) {
        clearInterval(interval);
      }
    }, 45);
    return () => clearInterval(interval);
  }, []);

  const nameLetters = "Bakki Mahesh".split("");

  const handleScrollToProjects = () => {
    const el = document.getElementById("projects");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full flex items-center justify-center pt-24 pb-16 overflow-hidden bg-dark"
    >
      {/* Background Layers */}
      <div className="absolute inset-0 bg-aurora animate-aurora pointer-events-none z-0" />
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none z-0" />
      <div className="absolute inset-0 bg-dot-pattern opacity-10 pointer-events-none z-0" />

      {/* Floating Ambient Orbs */}
      <div className="absolute top-[20%] left-[10%] w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px] animate-float pointer-events-none z-0" />
      <div className="absolute bottom-[20%] right-[10%] w-[500px] h-[500px] bg-[#8a2be2]/10 rounded-full blur-[120px] animate-float-delayed pointer-events-none z-0" />

      {/* R3F WebGL Particle Starfield background */}
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full">
          <Canvas camera={{ position: [0, 0, 15], fov: 60 }} dpr={[1, 2]}>
            <ambientLight intensity={0.2} />
            <ParticleField count={1000} />
          </Canvas>
        </div>
      </div>

      {/* Hero Content Grid */}
      <div className="max-w-8xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10 w-full">
        {/* Left Side: Copy */}
        <div className="lg:col-span-6 flex flex-col items-start text-left">
          {/* Label with Typewriter effect */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-mono mb-6 shadow-[0_0_15px_rgba(255,107,0,0.1)]">
            <Terminal className="w-3.5 h-3.5 animate-pulse" />
            <span className="min-h-[16px] tracking-wide">{typedText}</span>
            <span className="w-1.5 h-3.5 bg-primary animate-ping" />
          </div>

          {/* Staggered Name entrance */}
          <h1 className="text-5xl md:text-7xl font-bold font-space text-gradient-aurora tracking-tight mb-4 select-none leading-none drop-shadow-lg pb-2">
            {nameLetters.map((char, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.05,
                  type: "spring",
                  stiffness: 120
                }}
                className="inline-block"
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </h1>

          {/* Tagline */}
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-xl md:text-2xl font-space font-bold text-primary mb-3"
          >
            Cloud Engineer | Full Stack Developer | Tech Lead
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-sm md:text-base font-sans text-muted max-w-xl mb-8 leading-relaxed"
          >
            Building scalable web applications, cloud infrastructure, and startup products using AWS, React, Next.js, Node.js, and modern DevOps practices.
          </motion.p>

          {/* Call-to-actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="flex flex-wrap gap-4"
          >
            <button
              onClick={handleScrollToProjects}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-primary border border-primary text-sm font-mono font-bold text-white hover:bg-transparent hover:text-primary transition-all cursor-pointer shadow-[0_0_20px_rgba(255,107,0,0.25)] hover:scale-105"
            >
              View Projects
              <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href="/BakkiMahesh_Resume_2026.pdf"
              download="BakkiMahesh_Resume_2026.pdf"
              className="flex items-center gap-2 px-6 py-3 rounded-xl border border-white/10 hover:border-primary text-sm font-mono text-muted hover:text-white transition-all bg-surface/50 hover:bg-transparent hover:scale-105"
            >
              <Download className="w-4 h-4" />
              Download Resume
            </a>
            <button
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              className="flex items-center gap-2 px-6 py-3 rounded-xl border border-white/10 hover:border-primary text-sm font-mono text-muted hover:text-white transition-all bg-surface/50 hover:bg-transparent hover:scale-105"
            >
              Contact Me
            </button>
          </motion.div>
        </div>

        {/* Right Side: Minimalist Glassmorphism Profile Frame & 3D Cloud Toggle */}
        <div className="lg:col-span-6 w-full flex flex-col items-center justify-center relative select-none mt-10 lg:mt-0">
          {/* Soft ambient glow behind the frame */}
          <div className="absolute w-[400px] h-[400px] md:w-[600px] md:h-[600px] bg-primary/25 rounded-full blur-[110px] pointer-events-none animate-pulse opacity-70" />
          <div className="absolute w-[320px] h-[320px] md:w-[500px] md:h-[500px] bg-accent/25 rounded-full blur-[90px] pointer-events-none translate-x-16 translate-y-16 opacity-60" />

          {/* Interactive Toggle tabs */}
          <div className="flex bg-[#111]/80 p-1.5 rounded-full border border-white/5 backdrop-blur-md mb-6 z-20 gap-1">
            <button
              onClick={() => setViewMode("bio")}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono tracking-wider transition-all uppercase cursor-pointer ${
                viewMode === "bio"
                  ? "bg-primary text-white shadow-[0_0_15px_rgba(255,107,0,0.4)]"
                  : "text-muted hover:text-white"
              }`}
            >
              <User className="w-3.5 h-3.5" />
              Bio Unit
            </button>
            <button
              onClick={() => setViewMode("cloud")}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono tracking-wider transition-all uppercase cursor-pointer ${
                viewMode === "cloud"
                  ? "bg-primary text-white shadow-[0_0_15px_rgba(255,107,0,0.4)]"
                  : "text-muted hover:text-white"
              }`}
            >
              <Cloud className="w-3.5 h-3.5 animate-pulse" />
              Cloud Node
            </button>
          </div>

          {/* Interactive Image container */}
          <div className="relative w-full max-w-[550px] lg:max-w-[620px] aspect-[4/5] lg:aspect-[4/5] animate-float">
            <TiltCard 
              maxTilt={6} 
              glowColor="rgba(255, 107, 0, 0.45)" 
              className="w-full h-full relative group border-2 border-primary/30 hover:border-primary/70 transition-colors duration-500 rounded-[2.2rem]"
            >
              <div className="relative w-full h-full rounded-[2rem] overflow-hidden drop-shadow-2xl bg-black/40">
                
                {/* Cyberpunk corner brackets */}
                <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-primary/40 z-20 pointer-events-none group-hover:border-primary group-hover:scale-110 transition-all duration-300" />
                <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-primary/40 z-20 pointer-events-none group-hover:border-primary group-hover:scale-110 transition-all duration-300" />
                <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-primary/40 z-20 pointer-events-none group-hover:border-primary group-hover:scale-110 transition-all duration-300" />
                <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-primary/40 z-20 pointer-events-none group-hover:border-primary group-hover:scale-110 transition-all duration-300" />

                {/* Cyber Scan-line Overlay */}
                <div className="absolute inset-x-0 h-1/2 w-full bg-gradient-to-b from-primary/0 via-primary/5 to-primary/0 animate-scanline z-20 pointer-events-none opacity-40 group-hover:opacity-100 transition-opacity duration-300" />

                <AnimatePresence mode="wait">
                  {viewMode === "bio" ? (
                    <motion.div
                      key="bio"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.4 }}
                      className="absolute inset-0"
                    >
                      <Image
                        src="/portfolio1assests/maheshmain.png"
                        alt="Mahesh Profile Image"
                        fill
                        className="object-cover transition-all duration-700 scale-[1.12] group-hover:scale-[1.18]"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 600px"
                        priority
                      />
                      {/* Overlay gradient for extra depth */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="cloud"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.4 }}
                      className="absolute inset-0 bg-dark/40"
                    >
                      <Canvas camera={{ position: [0, 0, 4.3], fov: 60 }} dpr={[1, 2]}>
                        <CloudModel />
                      </Canvas>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </TiltCard>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
