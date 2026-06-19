"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import { Briefcase, Calendar, MapPin, Terminal, Cpu, Play, CheckCircle2, ChevronRight, Settings, Code, FileCode } from "lucide-react";
import { experiences, ExperienceEntry } from "../../content/experience";

interface TimelineCardProps {
  entry: ExperienceEntry;
  index: number;
}

function getStatusInfo(id: string) {
  switch (id) {
    case "tech-lead-gklt":
      return { label: "STABLE ACTIVE", color: "text-success border-success/30 bg-success/5", dotColor: "bg-success" };
    case "cloud-systems-eng":
      return { label: "ARCHIVED SUCCESS", color: "text-blue-400 border-blue-500/30 bg-blue-500/5", dotColor: "bg-blue-400" };
    case "fullstack-developer":
      return { label: "BUILD DEPLOYED", color: "text-amber-400 border-amber-500/30 bg-amber-500/5", dotColor: "bg-amber-400" };
    default:
      return { label: "INITIALIZED", color: "text-purple-400 border-purple-500/30 bg-purple-500/5", dotColor: "bg-purple-400" };
  }
}

// Interactive Pipeline Card
function TimelineCard({ entry, index }: TimelineCardProps) {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });
  const [logsExpanded, setLogsExpanded] = useState(false);

  const isEven = index % 2 === 0;
  const status = getStatusInfo(entry.id);

  return (
    <div
      ref={cardRef}
      className={`relative flex flex-col md:flex-row items-center justify-between w-full mb-16 ${
        isEven ? "md:flex-row-reverse" : ""
      }`}
    >
      {/* Date floating block */}
      <div className={`w-full md:w-[45%] flex px-4 mb-3 md:mb-0 ${isEven ? "md:justify-start" : "md:justify-end"}`}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/5 bg-white/[0.02] text-xs font-mono text-primary"
        >
          <Calendar className="w-3.5 h-3.5 text-primary" />
          <span>{entry.period}</span>
        </motion.div>
      </div>

      {/* Central pipeline node */}
      <div className="absolute left-4 md:left-1/2 -translate-x-1/2 flex items-center justify-center z-20">
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
          className={`w-9 h-9 rounded-full border-2 border-primary bg-dark flex items-center justify-center text-sm shadow-[0_0_15px_rgba(255,107,0,0.6)] select-none cursor-pointer ${
            logsExpanded ? "animate-pulse" : ""
          }`}
          onClick={() => setLogsExpanded(!logsExpanded)}
        >
          {entry.icon}
        </motion.div>
      </div>

      {/* Detail Card block */}
      <div className="w-full md:w-[45%] pl-12 md:pl-0 px-4">
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="p-5 rounded-2xl border border-white/10 hover:border-primary/50 transition-all shadow-[0_8px_32px_0_rgba(0,0,0,0.4)] backdrop-blur-md bg-white/[0.01] hover:bg-white/[0.02] group relative overflow-hidden"
        >
          {/* Top Window Chrome */}
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-primary/20 via-primary to-accent/20 opacity-40 group-hover:opacity-100 transition-opacity" />
          
          {/* Card Header & Status */}
          <div className="flex justify-between items-start flex-wrap gap-2 mb-4">
            <div className="text-left">
              <span className="text-[9px] font-mono text-muted uppercase tracking-wider block mb-1">
                EXPERIENCE NODE: #{entry.id.substring(0, 6).toUpperCase()}
              </span>
              <h3 className="text-lg font-space font-bold text-white group-hover:text-primary transition-colors leading-tight">
                {entry.role}
              </h3>
              <div className="flex flex-wrap items-center gap-2 mt-2 text-[11px] text-muted font-mono">
                <span className="text-white/80 font-bold">{entry.company}</span>
                <span className="text-white/20">|</span>
                <span className="flex items-center gap-0.5">
                  <MapPin className="w-3.5 h-3.5 text-primary/70" />
                  {entry.location}
                </span>
              </div>
            </div>
            
            {/* Status Badge */}
            <span className={`text-[9px] font-mono font-bold tracking-widest px-2.5 py-1 rounded-full border flex items-center gap-1.5 ${status.color}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${status.dotColor} animate-pulse`} />
              {status.label}
            </span>
          </div>

          {/* Description / Achievement Logs */}
          <div className="border-t border-white/5 pt-4 text-left">
            <div className="flex flex-col gap-2.5">
              {entry.achievements.map((ach, idx) => (
                <div key={idx} className="flex gap-2.5 text-xs text-muted leading-relaxed font-sans">
                  <span className="text-primary font-mono text-[10px] select-none mt-0.5">▶</span>
                  <span>{ach}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Acquired Tech Badges */}
          <div className="flex flex-wrap gap-1.5 mt-5 border-t border-white/5 pt-4 text-left">
            <span className="text-[9px] font-mono text-primary font-bold uppercase w-full mb-1.5 flex items-center gap-1">
              <Terminal className="w-3.5 h-3.5 text-primary" />
              Environment Stack:
            </span>
            {entry.skills.map((s) => (
              <span
                key={s}
                className="px-2.5 py-0.5 rounded-md border border-white/5 bg-white/5 hover:bg-primary/10 hover:border-primary/30 text-[9px] font-mono text-white/70 hover:text-white transition-all cursor-default"
              >
                {s}
              </span>
            ))}
          </div>

          {/* Interactive Console Button */}
          <button
            onClick={() => setLogsExpanded(!logsExpanded)}
            className="flex items-center gap-1.5 mt-4 text-[10px] font-mono text-primary/80 hover:text-primary transition-colors bg-primary/5 hover:bg-primary/10 border border-primary/20 px-3 py-1.5 rounded-lg w-full justify-center cursor-pointer uppercase font-bold tracking-wider"
          >
            <Settings className={`w-3.5 h-3.5 ${logsExpanded ? "animate-spin" : ""}`} />
            {logsExpanded ? "Close Console Stream" : "Inspect Console Stream"}
          </button>

          {/* Console Log Stream */}
          <AnimatePresence>
            {logsExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-4 overflow-hidden rounded-xl border border-white/5 bg-black/60 font-mono text-[10px]"
              >
                <div className="bg-[#141414] border-b border-white/5 px-3 py-2 flex items-center justify-between text-muted select-none">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-red-500/40" />
                    <span className="w-2 h-2 rounded-full bg-yellow-500/40" />
                    <span className="w-2 h-2 rounded-full bg-green-500/40" />
                  </div>
                  <span>node_diagnostic_log.sh</span>
                  <span className="text-[8px] bg-primary/10 text-primary px-1.5 py-0.5 rounded border border-primary/20">LIVE</span>
                </div>
                <div className="p-3 text-left max-h-48 overflow-y-auto flex flex-col gap-1.5 text-muted leading-relaxed select-all">
                  <div className="text-success">[OK] Initializing execution context...</div>
                  <div className="text-white/30">[09:30:14] FETCH CONFIG FROM COMPANY={entry.company.toUpperCase()}</div>
                  <div className="text-white/30">[09:30:15] ROLE_SPEC={entry.role.toUpperCase()}</div>
                  <div className="text-white/30">[09:30:16] ENVIRONMENT_LOCATION={entry.location.toUpperCase()}</div>
                  {entry.skills.map((s, i) => (
                    <div key={i} className="text-primary/70">
                      {`[LOAD_MODULE] Acquired dependency: ${s.toUpperCase()} (v1.0.0) -> SUCCESS`}
                    </div>
                  ))}
                  <div className="text-success">[BUILD] All system integrations compiled successfully.</div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}

// Spec Terminal for Developer view
function ConsoleSpecTerminal() {
  const [copied, setCopied] = useState(false);
  const jsonString = JSON.stringify(experiences, null, 2);

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-4xl mx-auto rounded-2xl border border-white/10 bg-[#0A0A0A]/90 shadow-[0_12px_40px_rgba(0,0,0,0.5)] overflow-hidden text-left"
    >
      <div className="bg-[#141414] border-b border-white/5 px-5 py-3 flex items-center justify-between font-mono text-xs select-none">
        <div className="flex items-center gap-2">
          <FileCode className="w-4 h-4 text-primary" />
          <span className="text-white/70">experiences_schema.json</span>
        </div>
        <button
          onClick={handleCopy}
          className="text-[10px] font-bold text-primary hover:text-white border border-primary/20 hover:border-primary px-3 py-1 rounded bg-primary/5 transition-all cursor-pointer"
        >
          {copied ? "COPIED!" : "COPY RAW JSON"}
        </button>
      </div>
      <div className="p-6 font-mono text-xs text-white/60 leading-relaxed overflow-x-auto max-h-[500px]">
        <pre className="whitespace-pre">{jsonString}</pre>
      </div>
    </motion.div>
  );
}

export function Experience() {
  const [activeTab, setActiveTab] = useState<"pipeline" | "spec">("pipeline");
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef(null);
  const isTitleInView = useInView(titleRef, { once: true });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section
      id="experience"
      className="relative min-h-screen py-24 flex items-center bg-dark overflow-hidden"
    >
      {/* Dynamic Cyber Grid Background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />
      <div className="absolute inset-0 bg-dot-pattern opacity-10 pointer-events-none" />
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8 text-left">
          <div ref={titleRef}>
            <h2 className="text-3xl md:text-5xl font-bold font-space text-white tracking-tight relative pb-4 inline-block">
              Experience (Command Center)
              <motion.div
                initial={{ width: 0 }}
                animate={isTitleInView ? { width: "100%" } : {}}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="absolute bottom-0 left-0 h-[3px] bg-primary shadow-[0_0_8px_#FF6B00]"
              />
            </h2>
            <p className="text-xs font-mono text-muted uppercase tracking-widest mt-4">
              Chronicle. Toggle visual timeline or interact with schemas.
            </p>
          </div>

          {/* Toggle Tab Selectors */}
          <div className="flex bg-[#111]/80 p-1 rounded-full border border-white/5 backdrop-blur-md self-start md:self-auto gap-0.5">
            <button
              onClick={() => setActiveTab("pipeline")}
              className={`flex items-center gap-1.5 px-4.5 py-2 rounded-full text-xs font-mono tracking-wider transition-all uppercase cursor-pointer ${
                activeTab === "pipeline"
                  ? "bg-primary text-white shadow-[0_0_15px_rgba(255,107,0,0.4)]"
                  : "text-muted hover:text-white"
              }`}
            >
              <Cpu className="w-3.5 h-3.5" />
              Timeline View
            </button>
            <button
              onClick={() => setActiveTab("spec")}
              className={`flex items-center gap-1.5 px-4.5 py-2 rounded-full text-xs font-mono tracking-wider transition-all uppercase cursor-pointer ${
                activeTab === "spec"
                  ? "bg-primary text-white shadow-[0_0_15px_rgba(255,107,0,0.4)]"
                  : "text-muted hover:text-white"
              }`}
            >
              <Code className="w-3.5 h-3.5" />
              Schema View
            </button>
          </div>
        </div>

        {/* Tab Contents */}
        <AnimatePresence mode="wait">
          {activeTab === "pipeline" ? (
            <motion.div
              key="pipeline"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              ref={containerRef}
              className="relative w-full max-w-4xl mx-auto mt-12"
            >
              {/* Background Track line */}
              <div className="absolute left-4 md:left-1/2 -translate-x-1/2 top-4 bottom-4 w-[3px] bg-white/5 rounded-full" />
              
              {/* Glowing fill line */}
              <motion.div
                style={{ scaleY }}
                className="absolute left-4 md:left-1/2 -translate-x-1/2 top-4 bottom-4 w-[3px] bg-gradient-to-b from-primary via-accent to-primary rounded-full origin-top shadow-[0_0_10px_#FF6B00]"
              />

              {/* Data Packet Pulse (Traveling along pipeline line) */}
              <motion.div 
                style={{ top: useTransform(scrollYProgress, [0, 1], ["0%", "100%"]) }}
                className="absolute left-4 md:left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-primary shadow-[0_0_15px_#FF6B00] z-10 pointer-events-none hidden md:block"
              />

              {/* Timeline Cards */}
              <div className="relative flex flex-col w-full">
                {experiences.map((entry, idx) => (
                  <TimelineCard key={entry.id} entry={entry} index={idx} />
                ))}
              </div>
            </motion.div>
          ) : (
            <ConsoleSpecTerminal key="spec" />
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

export default Experience;
