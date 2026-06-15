"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, Tag, Share2, Clipboard, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { blogPosts } from "../../../content/blog";
import { useState } from "react";

export default function BlogPostReader() {
  const { slug } = useParams();
  const router = useRouter();
  const [copied, setCopied] = useState(false);

  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="min-h-screen w-full bg-[#050505] text-white flex flex-col items-center justify-center text-center px-6">
        <h2 className="text-2xl font-space font-bold text-primary mb-2">404: SPEC NOT FOUND</h2>
        <p className="text-xs font-mono text-muted mb-6">The database node you requested is unavailable or has been archived.</p>
        <button
          onClick={() => router.push("/blog")}
          className="px-5 py-2.5 rounded-xl bg-primary text-xs font-mono font-bold text-white border border-primary hover:bg-transparent hover:text-primary transition-all cursor-pointer"
        >
          Return to directory
        </button>
      </div>
    );
  }

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen w-full bg-[#050505] text-white pt-28 pb-16 relative">
      {/* Background patterns */}
      <div className="absolute inset-0 bg-dot-pattern opacity-10 pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10 text-left">
        {/* Breadcrumb row */}
        <div className="flex items-center gap-2 text-[10px] font-mono text-muted mb-8">
          <Link href="/blog" className="hover:text-primary transition-colors">
            DIRECTORY
          </Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-white font-bold truncate max-w-[200px]">{post.title.toUpperCase()}</span>
        </div>

        {/* Back navigation */}
        <button
          onClick={() => router.push("/blog")}
          className="group flex items-center gap-2 text-xs font-mono text-muted hover:text-white transition-colors mb-6 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          BACK TO DIRECTORY
        </button>

        {/* Article Meta Data */}
        <div className="flex flex-wrap items-center gap-4 text-[10px] font-mono text-muted mb-4">
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-primary" />
            {post.date}
          </span>
          <span className="w-1 h-1 rounded-full bg-white/20" />
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-primary" />
            {post.readTime}
          </span>
          <span className="w-1 h-1 rounded-full bg-white/20" />
          <span className={`px-2 py-0.5 rounded uppercase font-bold ${
            post.category === "cloud" ? "bg-[#38bdf8]/10 text-[#38bdf8]" :
            post.category === "frontend" ? "bg-[#d946ef]/10 text-[#d946ef]" :
            "bg-[#22c55e]/10 text-[#22c55e]"
          }`}>
            {post.category}
          </span>
        </div>

        {/* Main Title */}
        <h1 className="text-3xl md:text-5xl font-bold font-space text-white leading-tight mb-8">
          {post.title}
        </h1>

        {/* Action controls panel */}
        <div className="flex justify-between items-center border-y border-white/5 py-3 mb-10 text-muted">
          <div className="flex items-center gap-2">
            <Tag className="w-4 h-4 text-primary" />
            <div className="flex gap-2">
              {post.tags.map((t) => (
                <span key={t} className="text-[9px] font-mono bg-white/5 px-2 py-0.5 rounded text-white/80">
                  #{t}
                </span>
              ))}
            </div>
          </div>
          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 text-[10px] font-mono hover:text-white transition-colors cursor-pointer bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg"
          >
            {copied ? (
              <>
                <Clipboard className="w-3.5 h-3.5 text-success animate-bounce" />
                LINK COPIED!
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5 text-primary" />
                SHARE NODE
              </>
            )}
          </button>
        </div>

        {/* Document content */}
        <div className="prose prose-invert max-w-none text-white/80 font-sans text-sm md:text-base leading-relaxed flex flex-col gap-6">
          {post.content.split("\n\n").map((paragraph, pIdx) => {
            // Render basic lists
            if (paragraph.startsWith("- ")) {
              return (
                <ul key={pIdx} className="list-disc list-inside flex flex-col gap-2 pl-4 text-white/80">
                  {paragraph.split("\n").map((li, liIdx) => (
                    <li key={liIdx}>{li.replace("- ", "")}</li>
                  ))}
                </ul>
              );
            }

            // Render headers
            if (paragraph.startsWith("### ")) {
              return (
                <h3 key={pIdx} className="text-xl font-space font-bold text-white mt-6 mb-2 border-l-2 border-primary pl-3">
                  {paragraph.replace("### ", "")}
                </h3>
              );
            }

            // Render syntax-highlighted code block simulations
            if (paragraph.startsWith("```")) {
              const lines = paragraph.split("\n");
              const lang = lines[0].replace("```", "").toUpperCase();
              const code = lines.slice(1, -1).join("\n");
              return (
                <div key={pIdx} className="my-6 rounded-xl border border-white/5 overflow-hidden bg-black/60 shadow-xl font-mono text-xs">
                  <div className="bg-[#141414] border-b border-white/5 px-4 py-2.5 flex justify-between items-center text-muted">
                    <span className="text-[9px] font-bold tracking-wider">{lang || "CODE"} SPECIFICATION</span>
                    <span className="text-[8px] bg-primary/10 text-primary px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">Active</span>
                  </div>
                  <pre className="p-4 overflow-x-auto text-left text-white/70 select-all leading-normal whitespace-pre">
                    <code>{code}</code>
                  </pre>
                </div>
              );
            }

            // Render normal paragraphs with dynamic inline highlights
            const formattedParagraph = paragraph.split("`").map((chunk, cIdx) => {
              if (cIdx % 2 !== 0) {
                return (
                  <code key={cIdx} className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 font-mono text-xs text-primary font-bold">
                    {chunk}
                  </code>
                );
              }
              return chunk;
            });

            return (
              <p key={pIdx} className="leading-relaxed">
                {formattedParagraph}
              </p>
            );
          })}
        </div>

        {/* Footer actions */}
        <div className="mt-16 pt-8 border-t border-white/5 flex justify-between items-center">
          <button
            onClick={() => router.push("/blog")}
            className="flex items-center gap-1.5 text-xs font-mono text-muted hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            BACK TO DIRECTORY
          </button>
        </div>
      </div>
    </div>
  );
}
