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
            Skills (Skill Matrix)
            <motion.div
              initial={{ width: 0 }}
              animate={isInView ? { width: "100%" } : {}}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="absolute bottom-0 left-0 h-[3px] bg-primary shadow-[0_0_8px_#FF6B00]"
            />
          </h2>
          <p className="text-xs font-mono text-muted uppercase tracking-widest mt-4 max-w-lg text-left">
            Interactive 3D orbital system. Click on nodes to pause their orbit and inspect technology logs, or view the clear matrix below.
          </p>
        </div>

        {/* 3D Skills System Container */}
        <div className="w-full mb-12">
          <SkillsUniverse />
        </div>

        {/* Skills Matrix Table */}
        <div className="w-full max-w-4xl mx-auto">
          <div className="p-6 rounded-2xl border border-white/5 bg-[#111]/20 backdrop-blur-md text-left">
            <h3 className="text-sm font-mono font-bold text-primary uppercase tracking-widest mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Technical Skills Matrix
            </h3>
            <div className="overflow-x-auto w-full">
              <table className="w-full text-left border-collapse text-xs font-mono">
                <thead>
                  <tr className="border-b border-white/10 text-muted">
                    <th className="py-2.5 pb-2 font-bold uppercase tracking-wider w-1/3">Category</th>
                    <th className="py-2.5 pb-2 font-bold uppercase tracking-wider">Skills</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-white/90">
                  <tr className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-3 font-bold text-primary">Cloud</td>
                    <td className="py-3 text-muted">AWS (SAA, CCP), Azure, VPC Private Networking</td>
                  </tr>
                  <tr className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-3 font-bold text-primary">Frontend</td>
                    <td className="py-3 text-muted">React, Next.js, HTML5, CSS3, Tailwind CSS</td>
                  </tr>
                  <tr className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-3 font-bold text-primary">Backend</td>
                    <td className="py-3 text-muted">Node.js, Express, WebSockets, Python FastAPI</td>
                  </tr>
                  <tr className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-3 font-bold text-primary">Database</td>
                    <td className="py-3 text-muted">MongoDB, PostgreSQL, Redis</td>
                  </tr>
                  <tr className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-3 font-bold text-primary">DevOps</td>
                    <td className="py-3 text-muted">Docker, GitHub Actions CI/CD</td>
                  </tr>
                  <tr className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-3 font-bold text-primary">Tools</td>
                    <td className="py-3 text-muted">Git, Linux Administration, Postman, VS Code</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Skills;
