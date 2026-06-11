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
  const fullText = "Cloud Solutions Architect · Full Stack Developer · Tech Lead";

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
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
      <div className="absolute inset-0 bg-dot-pattern opacity-10 pointer-events-none" />

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
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10 w-full">
        {/* Left Side: Copy */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">
          {/* Label with Typewriter effect */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-mono mb-6 shadow-[0_0_15px_rgba(255,107,0,0.1)]">
            <Terminal className="w-3.5 h-3.5 animate-pulse" />
            <span className="min-h-[16px] tracking-wide">{typedText}</span>
            <span className="w-1.5 h-3.5 bg-primary animate-ping" />
          </div>

          {/* Staggered Name entrance */}
          <h1 className="text-5xl md:text-7xl font-bold font-space text-white tracking-tight mb-4 select-none leading-none">
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
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-lg md:text-xl font-space text-muted max-w-xl mb-8 leading-relaxed"
          >
            Building high-availability <span className="text-white font-medium">cloud architectures</span> and blazing-fast <span className="text-white font-medium">full-stack systems</span> engineered from the ground up.
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
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-primary border border-primary text-sm font-mono font-bold text-white hover:bg-transparent hover:text-primary transition-all cursor-pointer shadow-[0_0_20px_rgba(255,107,0,0.25)] hover:shadow-[0_0_35px_rgba(255,107,0,0.5)] hover:scale-105"
            >
              View Projects
              <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href="/BakkiMahesh_Resume_2026.pdf"
              download="BakkiMahesh_Resume_2026.pdf"
              className="flex items-center gap-2 px-6 py-3 rounded-xl border border-white/10 hover:border-primary text-sm font-mono text-muted hover:text-white transition-all bg-surface/50 hover:bg-transparent hover:scale-105"
            >
              <Download className="w-4 h-4 animate-bounce" />
              Download CV
            </a>
          </motion.div>
        </div>

        {/* Right Side: Minimalist Glassmorphism Profile Frame & 3D Cloud Toggle */}
        <div className="lg:col-span-5 w-full flex flex-col items-center justify-center relative select-none mt-10 lg:mt-0">
          {/* Soft ambient glow behind the frame */}
          <div className="absolute w-[350px] h-[350px] md:w-[500px] md:h-[500px] bg-primary/20 rounded-full blur-[90px] pointer-events-none animate-pulse opacity-60" />
          <div className="absolute w-[280px] h-[280px] md:w-[400px] md:h-[400px] bg-accent/20 rounded-full blur-[70px] pointer-events-none translate-x-12 translate-y-12 opacity-50" />

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

          {/* Interactive Tilt Card container - Glassmorphism */}
          <div className="relative w-full max-w-[400px] md:max-w-[480px] aspect-square">
            <TiltCard 
              maxTilt={8} 
              glowColor="rgba(255, 255, 255, 0.1)" 
              className="w-full h-full p-3 bg-white/5 backdrop-blur-xl border border-white/10 relative overflow-hidden group shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] rounded-3xl"
            >
              {/* Subtle light reflection highlight */}
              <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent z-20" />
              <div className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent z-20" />

              <div className="relative w-full h-full rounded-2xl overflow-hidden bg-black/20 shadow-inner">
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
                        className="object-cover transition-all duration-700 scale-100 group-hover:scale-105"
                        sizes="(max-width: 768px) 300px, 450px"
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
