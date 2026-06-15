"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Search, Calendar, Clock, ArrowRight, BookOpen, Terminal } from "lucide-react";
import { blogPosts } from "../../content/blog";

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"all" | "cloud" | "frontend" | "systems">("all");

  const filteredPosts = useMemo(() => {
    return blogPosts.filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesTab = activeTab === "all" || post.category === activeTab;

      return matchesSearch && matchesTab;
    });
  }, [searchQuery, activeTab]);

  return (
    <div className="min-h-screen w-full bg-[#050505] text-white pt-28 pb-16 relative">
      {/* Abstract Background Grids */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Header telemetry specs */}
        <div className="flex flex-col items-start text-left mb-12">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-[10px] font-mono mb-4 shadow-[0_0_10px_rgba(255,107,0,0.05)]">
            <Terminal className="w-3.5 h-3.5 animate-pulse" />
            <span>NODE // DEPLOYED ARTICLE STREAM</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold font-space text-gradient-aurora tracking-tight mb-4">
            Technical Logs
          </h1>
          <p className="text-sm text-muted max-w-xl leading-relaxed">
            Deep dives on cloud-native systems architecture, WebGL pipelines, and telemetry optimization. System specifications compiled from real-world operations.
          </p>
        </div>

        {/* Toolbar & Filters */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8 border-b border-white/5 pb-6">
          {/* Search bar */}
          <div className="w-full md:max-w-md flex items-center gap-3 px-4 py-2.5 rounded-xl border border-white/5 bg-white/[0.01] focus-within:border-primary/40 focus-within:shadow-[0_0_15px_rgba(255,107,0,0.1)] transition-all">
            <Search className="w-4 h-4 text-muted" />
            <input
              type="text"
              placeholder="Search parameters or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent text-xs text-white focus:outline-none placeholder-muted font-mono"
            />
          </div>

          {/* Categories Tab selectors */}
          <div className="flex bg-[#111] p-1 rounded-full border border-white/5 self-stretch md:self-auto gap-1">
            {(["all", "cloud", "frontend", "systems"] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`flex-1 md:flex-none px-4 py-1.5 rounded-full text-[10px] font-mono uppercase transition-all cursor-pointer ${
                  activeTab === cat
                    ? "bg-primary text-white shadow-[0_0_10px_rgba(255,107,0,0.3)] font-bold"
                    : "text-muted hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Blog Post Grid */}
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post, idx) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.4 }}
                className="group relative flex flex-col h-full rounded-2xl border border-white/5 bg-[#111]/30 hover:bg-[#111]/60 hover:border-primary/20 backdrop-blur-md transition-all duration-300 overflow-hidden hover:shadow-[0_0_25px_rgba(255,107,0,0.05)]"
              >
                {/* Visual indicator bar top */}
                <div className={`h-[2px] w-full transition-all duration-300 ${
                  post.category === "cloud" ? "bg-[#38bdf8]" :
                  post.category === "frontend" ? "bg-[#d946ef]" :
                  "bg-[#22c55e]"
                }`} />

                <div className="p-6 flex flex-col flex-1 text-left justify-between">
                  <div>
                    {/* Telemetry specs header */}
                    <div className="flex justify-between items-center text-[9px] font-mono text-muted mb-4">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-primary" />
                        {post.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-primary" />
                        {post.readTime}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-space font-bold text-white mb-2 group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                      {post.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-xs text-muted font-sans leading-relaxed mb-6 line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>

                  {/* Tags & Action row */}
                  <div>
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {post.tags.map((tag) => (
                        <span key={tag} className="px-2 py-0.5 bg-white/5 rounded text-[8px] font-mono text-white/60">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <Link
                      href={`/blog/${post.slug}`}
                      className="flex items-center gap-1.5 text-[10px] font-mono text-primary/80 group-hover:text-primary hover:underline transition-colors uppercase font-bold"
                    >
                      Retrieve Data Spec
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="py-24 border border-dashed border-white/5 rounded-2xl flex flex-col items-center justify-center text-center">
            <BookOpen className="w-12 h-12 text-muted mb-3 animate-pulse" />
            <h3 className="text-lg font-space font-bold text-white mb-1">No Spec Log Found</h3>
            <p className="text-xs font-mono text-muted max-w-xs leading-relaxed">
              Your search parameters yielded zero records in the current network directory.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
