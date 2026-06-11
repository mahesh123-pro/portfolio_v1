"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ExternalLink, BookOpen, X, Terminal, Cpu, Database, Cloud, Globe, ArrowUpRight } from "lucide-react";
import { projects, Project } from "../../content/projects";
import { TiltCard } from "../ui/TiltCard";

export function Projects() {
  const [activeFilter, setActiveFilter] = useState<"all" | "cloud" | "frontend" | "backend">("all");
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<Project | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  // Filter projects list
  const filteredProjects = projects.filter(
    (proj) => activeFilter === "all" || proj.category === activeFilter
  );

  // Category glow mapping helper
  const getGlowStyle = (category: string) => {
    switch (category) {
      case "cloud":
        return {
          glow: "rgba(255, 107, 0, 0.25)",
          border: "border-primary/30",
          text: "text-primary",
          bg: "bg-primary/5",
          icon: <Cloud className="w-3.5 h-3.5" />
        };
      case "backend":
        return {
          glow: "rgba(34, 197, 94, 0.2)",
          border: "border-success/30",
          text: "text-success",
          bg: "bg-success/5",
          icon: <Database className="w-3.5 h-3.5" />
        };
      case "frontend":
        return {
          glow: "rgba(255, 200, 87, 0.2)",
          border: "border-accent/30",
          text: "text-accent",
          bg: "bg-accent/5",
          icon: <Cpu className="w-3.5 h-3.5" />
        };
      default:
        return {
          glow: "rgba(255, 107, 0, 0.2)",
          border: "border-primary/20",
          text: "text-primary",
          bg: "bg-primary/5",
          icon: <Globe className="w-3.5 h-3.5" />
        };
    }
  };

  return (
    <section
      id="projects"
      className="relative min-h-screen py-32 flex items-center bg-dark"
    >
      <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
        
        {/* Header Block */}
        <div ref={sectionRef} className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8 text-left">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold font-space text-white tracking-tight relative pb-4 inline-block">
              Project Showroom
              <motion.div
                initial={{ width: 0 }}
                animate={isInView ? { width: "100%" } : {}}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="absolute bottom-0 left-0 h-[3px] bg-primary shadow-[0_0_8px_#FF6B00]"
              />
            </h2>
            <p className="text-sm font-sans text-muted mt-4 max-w-xl">
              Exploring operational cloud architectures, IoT telemetry pipelines, and premium client-facing interfaces.
            </p>
          </div>

          {/* Filtering Tabs */}
          <div className="flex flex-wrap gap-2 bg-[#111]/80 p-1.5 rounded-full border border-white/5 backdrop-blur-md self-start md:self-auto">
            {(["all", "cloud", "backend", "frontend"] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-5 py-2 rounded-full text-xs font-mono tracking-wider transition-all uppercase cursor-pointer ${
                  activeFilter === filter
                    ? "bg-primary text-white shadow-[0_0_15px_rgba(255,107,0,0.4)]"
                    : "text-muted hover:text-white"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Project Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((proj) => {
              const meta = getGlowStyle(proj.category);
              return (
                <motion.div
                  key={proj.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  id={`project-${proj.id}`}
                  className="h-full"
                >
                  <TiltCard
                    maxTilt={8}
                    glowColor={meta.glow}
                    className={`h-full flex flex-col justify-between bg-[#111]/80 border ${meta.border} overflow-hidden group hover:scale-[1.02] transition-transform`}
                  >
                    {/* Card Top: Image / Screenshot */}
                    <div className="relative w-full aspect-[16/10] overflow-hidden bg-surface border-b border-white/5">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10" />
                      
                      {/* Image render */}
                      {proj.image ? (
                        <Image
                          src={proj.image}
                          alt={proj.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      ) : (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-dark/40 font-mono p-4 text-center">
                          <Terminal className="w-8 h-8 text-primary mb-2 animate-pulse" />
                        </div>
                      )}

                      {/* Floating Category tag */}
                      <span className={`absolute top-4 left-4 z-20 text-[9px] font-mono font-bold tracking-widest px-3 py-1 rounded-full uppercase border flex items-center gap-1.5 ${meta.text} ${meta.bg} ${meta.border}`}>
                        {meta.icon}
                        {proj.category}
                      </span>

                      {/* Hover action overlay indicator */}
                      <div className="absolute inset-0 flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-[2px]">
                        <span className="flex items-center gap-1 text-[10px] font-mono text-white bg-primary px-3 py-1.5 rounded-full shadow-[0_0_15px_#FF6B00]">
                          Inspect Node <ArrowUpRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>

                    {/* Card Body Details */}
                    <div className="p-6 flex-1 flex flex-col justify-between text-left">
                      <div>
                        {/* Metric performance tagline */}
                        <div className={`text-[10px] font-mono font-bold uppercase tracking-wider mb-2 flex items-center gap-1.5 ${meta.text}`}>
                          <span>●</span>
                          {proj.metric}
                        </div>
                        
                        <h3 className="text-xl font-space font-bold text-white mb-3 tracking-tight group-hover:text-primary transition-colors">
                          {proj.title}
                        </h3>
                        
                        <p className="text-xs text-muted leading-relaxed font-sans mb-6">
                          {proj.description}
                        </p>
                      </div>

                      {/* Tech Stack list */}
                      <div>
                        <div className="flex flex-wrap gap-1.5 mb-6">
                          {proj.tech.map((t) => (
                            <span
                              key={t}
                              className="px-2.5 py-0.5 rounded-full border border-white/5 bg-white/5 text-[9px] font-mono text-white/70"
                            >
                              {t}
                            </span>
                          ))}
                        </div>

                        {/* Interactive CTAs */}
                        <div className="flex items-center justify-between border-t border-white/5 pt-4">
                          <button
                            onClick={() => setSelectedCaseStudy(proj)}
                            className="flex items-center gap-1.5 text-xs font-mono font-bold text-white hover:text-primary transition-colors cursor-pointer"
                          >
                            <BookOpen className="w-3.5 h-3.5 text-primary" />
                            Case Study
                          </button>
                          
                          {proj.liveUrl && (
                            <button
                              onClick={() => setPreviewUrl(proj.liveUrl)}
                              className="flex items-center gap-1 text-xs font-mono text-muted hover:text-white transition-colors cursor-pointer"
                            >
                              Live Preview
                              <ExternalLink className="w-3 h-3" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </TiltCard>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Case Study Full Side Drawer Panel */}
      <AnimatePresence>
        {selectedCaseStudy && (
          <div className="fixed inset-0 z-50 flex justify-end">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCaseStudy(null)}
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="relative w-full max-w-xl bg-[#0C0C0C] border-l border-white/10 h-full overflow-y-auto p-6 md:p-8 flex flex-col justify-between z-10 shadow-2xl"
            >
              <div>
                {/* Header */}
                <div className="flex justify-between items-start border-b border-white/5 pb-4 mb-6 text-left">
                  <div>
                    <span className="text-[9px] font-mono text-primary font-bold tracking-widest uppercase">
                      SYSTEM ARCHITECTURE ANALYSIS
                    </span>
                    <h3 className="text-2xl font-space font-bold text-white">
                      {selectedCaseStudy.title}
                    </h3>
                  </div>
                  <button
                    onClick={() => setSelectedCaseStudy(null)}
                    className="p-1.5 rounded-lg border border-white/10 text-muted hover:text-white transition-colors cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Case Study Details Grid */}
                <div className="flex flex-col gap-6 text-left font-sans">
                  {/* Problem */}
                  <div>
                    <h4 className="text-[10px] font-mono font-bold tracking-wider text-primary uppercase mb-2 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                      The Problem
                    </h4>
                    <p className="text-xs text-muted leading-relaxed">
                      {selectedCaseStudy.caseStudy.problem}
                    </p>
                  </div>

                  {/* Solution */}
                  <div>
                    <h4 className="text-[10px] font-mono font-bold tracking-wider text-primary uppercase mb-2 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                      The Solution
                    </h4>
                    <p className="text-xs text-muted leading-relaxed">
                      {selectedCaseStudy.caseStudy.solution}
                    </p>
                  </div>

                  {/* Architecture */}
                  <div>
                    <h4 className="text-[10px] font-mono font-bold tracking-wider text-primary uppercase mb-2 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                      Technical Architecture
                    </h4>
                    <ul className="flex flex-col gap-2">
                      {selectedCaseStudy.caseStudy.architecture.map((item, idx) => (
                        <li key={idx} className="flex gap-2 text-xs text-muted leading-relaxed">
                          <span className="text-primary font-mono select-none">[{idx + 1}]</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Metrics */}
                  <div>
                    <h4 className="text-[10px] font-mono font-bold tracking-wider text-primary uppercase mb-2 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                      Key Impact Metrics
                    </h4>
                    <div className="grid grid-cols-1 gap-2.5">
                      {selectedCaseStudy.caseStudy.metrics.map((metric, idx) => (
                        <div
                          key={idx}
                          className="p-3 rounded-lg border border-white/5 bg-white/[0.02] flex items-center gap-3 text-xs text-white"
                        >
                          <Terminal className="w-4 h-4 text-primary shrink-0" />
                          <span className="font-mono text-muted">{metric}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom footer button */}
              {selectedCaseStudy.liveUrl && (
                <div className="mt-8 border-t border-white/5 pt-4">
                  <a
                    href={selectedCaseStudy.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-3 rounded-xl bg-primary hover:bg-transparent border border-primary text-xs font-mono font-bold text-white transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    Visit Live Link
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Live Preview Browser Lightbox Frame */}
      <AnimatePresence>
        {previewUrl && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setPreviewUrl(null)}
              className="absolute inset-0 bg-black/85 backdrop-blur-md"
            />

            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              className="relative w-full max-w-5xl h-[85vh] rounded-2xl border border-white/10 bg-[#0E0E0E] overflow-hidden flex flex-col z-10 shadow-2xl"
            >
              {/* Browser Header mockup chrome */}
              <div className="flex items-center justify-between bg-[#141414] border-b border-white/5 px-5 py-3 shrink-0">
                {/* Mock Window bullets */}
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-red-500/20 hover:bg-red-500 transition-colors" />
                  <span className="w-3 h-3 rounded-full bg-yellow-500/20 hover:bg-yellow-500 transition-colors" />
                  <span className="w-3 h-3 rounded-full bg-green-500/20 hover:bg-green-500 transition-colors" />
                </div>
                
                {/* Mock Address bar */}
                <div className="hidden sm:flex items-center justify-center gap-2 px-6 py-1 rounded-md bg-white/5 text-[10px] font-mono text-muted max-w-lg w-full truncate border border-white/5 select-none">
                  <span className="text-primary">secure://</span>
                  {previewUrl.replace("https://", "")}
                </div>

                {/* Close Button */}
                <button
                  onClick={() => setPreviewUrl(null)}
                  className="p-1 rounded-md text-muted hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Web preview rendering frame */}
              <div className="flex-1 bg-white relative">
                <iframe
                  src={previewUrl}
                  title="Live Website Sandbox Frame"
                  className="w-full h-full border-none"
                  sandbox="allow-scripts allow-same-origin"
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default Projects;
