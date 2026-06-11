"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import dynamic from "next/dynamic";

// Dynamically load 3D Skills Universe to prevent SSR crashes and maintain fast performance
const SkillsUniverse = dynamic(() => import("../three/SkillsUniverse"), { ssr: false });

export function Skills() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true });

  return (
    <section
      id="skills"
      className="relative min-h-screen py-24 flex items-center bg-dark"
    >
      {/* Background patterns */}
      <div className="absolute inset-0 bg-dot-pattern opacity-5 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
        {/* Title */}
        <div ref={sectionRef} className="flex flex-col items-start mb-16">
          <h2 className="text-3xl md:text-5xl font-bold font-space text-white tracking-tight relative pb-4">
            Skills Universe
            <motion.div
              initial={{ width: 0 }}
              animate={isInView ? { width: "100%" } : {}}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="absolute bottom-0 left-0 h-[3px] bg-primary shadow-[0_0_8px_#FF6B00]"
            />
          </h2>
          <p className="text-xs font-mono text-muted uppercase tracking-widest mt-4 max-w-lg text-left">
            Interactive 3D orbital system. Click on nodes to pause their orbit and inspect technology logs, or filter by category.
          </p>
        </div>

        {/* 3D Skills System Container */}
        <div className="w-full">
          <SkillsUniverse />
        </div>
      </div>
    </section>
  );
}

export default Skills;
