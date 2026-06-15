"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Search, Terminal, ArrowRight, FolderGit, Cpu, Layers } from "lucide-react";
import { projects } from "../../content/projects";

export default function ProjectsDirectory() {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<"all" | "cloud" | "frontend" | "backend">("all");

  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const matchesSearch =
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tech.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCat = categoryFilter === "all" || p.category === categoryFilter;

      return matchesSearch && matchesCat;
    });
  }, [searchQuery, categoryFilter]);

  return (
    <div className="min-h-screen w-full bg-[#050505] text-white pt-28 pb-16 relative">
      {/* Background elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Header section */}
        <div className="flex flex-col items-start text-left mb-12">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-[10px] font-mono mb-4 shadow-[0_0_10px_rgba(255,107,0,0.05)]">
            <Terminal className="w-3.5 h-3.5 animate-pulse" />
            <span>PROJECTS // ARCHITECTURE BLUEPRINTS</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold font-space text-gradient-aurora tracking-tight mb-4">
            Showroom Directory
          </h1>
          <p className="text-sm text-muted max-w-xl leading-relaxed">
            Telemetry reports, deployment targets, and systems schemas. Dive deep into structural specs, database segregation, and responsive UI canvases.
          </p>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8 border-b border-white/5 pb-6">
          <div className="w-full md:max-w-md flex items-center gap-3 px-4 py-2.5 rounded-xl border border-white/5 bg-white/[0.01] focus-within:border-primary/40 transition-all">
            <Search className="w-4 h-4 text-muted" />
            <input
              type="text"
              placeholder="Search specs or tech stack (e.g. AWS, React)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent text-xs text-white focus:outline-none placeholder-muted font-mono"
            />
          </div>

          <div className="flex bg-[#111] p-1 rounded-full border border-white/5 self-stretch md:self-auto gap-1">
            {(["all", "cloud", "frontend", "backend"] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`flex-1 md:flex-none px-4 py-1.5 rounded-full text-[10px] font-mono uppercase transition-all cursor-pointer ${
                  categoryFilter === cat
                    ? "bg-primary text-white shadow-[0_0_10px_rgba(255,107,0,0.3)] font-bold"
                    : "text-muted hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredProjects.map((proj, idx) => (
              <motion.div
                key={proj.id}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.08, duration: 0.4 }}
                className="group relative flex flex-col justify-between h-full rounded-2xl border border-white/5 bg-[#111]/30 hover:bg-[#111]/55 hover:border-primary/20 backdrop-blur-md transition-all duration-300 p-6 text-left hover:shadow-[0_0_30px_rgba(255,107,0,0.04)]"
              >
                <div>
                  {/* Top specifications bar */}
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-[9px] font-mono text-primary bg-primary/5 border border-primary/25 px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                      {proj.category}
                    </span>
                    <span className="text-[9px] font-mono text-success bg-success/5 border border-success/20 px-2 py-0.5 rounded font-bold">
                      {proj.metric}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-space font-bold text-white mb-2 group-hover:text-primary transition-colors flex items-center gap-2">
                    <FolderGit className="w-5 h-5 text-primary shrink-0" />
                    {proj.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-muted font-sans leading-relaxed mb-6">
                    {proj.description}
                  </p>
                </div>

                <div>
                  {/* Tech stack tags */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {proj.tech.map((t) => (
                      <span key={t} className="px-2 py-0.5 bg-white/5 rounded text-[8px] font-mono text-white/80 uppercase">
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Action link */}
                  <Link
                    href={`/projects/${proj.id}`}
                    className="w-full py-2.5 rounded-xl border border-white/10 hover:border-primary bg-surface/30 group-hover:bg-primary/5 transition-all text-xs font-mono font-bold text-muted group-hover:text-white flex items-center justify-center gap-2"
                  >
                    INVESTIGATE BLUEPRINT
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="py-24 border border-dashed border-white/5 rounded-2xl flex flex-col items-center justify-center text-center">
            <Layers className="w-12 h-12 text-muted mb-3 animate-pulse" />
            <h3 className="text-lg font-space font-bold text-white mb-1">No Projects Found</h3>
            <p className="text-xs font-mono text-muted max-w-xs leading-relaxed">
              No project modules matched the search guidelines in this directory.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
