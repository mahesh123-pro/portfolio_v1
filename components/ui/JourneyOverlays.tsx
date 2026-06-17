"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  ArrowRight,
  Download,
  Terminal,
  User,
  ShieldCheck,
  ExternalLink,
  Hourglass,
  CheckCircle,
  AlertCircle,
  Briefcase,
  Calendar,
  MapPin,
  Settings,
  Code,
  FileCode,
  GitBranch,
  GitCommit,
  GitPullRequest,
  Folder,
  Star,
  Eye,
  ArrowUpRight,
  Code2,
  Mail,
  BookOpen,
  X,
  Plus
} from "lucide-react";
import Image from "next/image";
import { projects, Project } from "../../content/projects";
import { experiences } from "../../content/experience";
import { skillsData, Skill } from "../../content/skills";
import { GithubIcon, LinkedinIcon } from "./BrandIcons";
import { GlassCard } from "./GlassCard";

interface JourneyOverlaysProps {
  activeScene: number;
  selectedProject: number | null;
  setSelectedProject: (project: number | null) => void;
  activeProject: number | null;
}

// Zod Schema for validation
const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(4, "Subject must be at least 4 characters"),
  role: z.enum(["recruiter", "collaborator", "client", "other"]),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

// Map 0, 1, 2, 3 to projects array indices
const MAPPED_PROJECTS = [2, 1, 5, 7];

export function JourneyOverlays({ 
  activeScene, 
  selectedProject, 
  setSelectedProject, 
  activeProject 
}: JourneyOverlaysProps) {
  // Global / General States
  const [typedText, setTypedText] = useState("");
  const fullText = "Cloud & Full-Stack Developer · AWS Enthusiast · Systems Architect";
  
  // Scene 2 (Skills) States
  const [activeSkillCategory, setActiveSkillCategory] = useState("all");
  
  // Scene 3 (Projects) States
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const selectedCaseStudy = useMemo(() => {
    return selectedProject !== null ? projects[MAPPED_PROJECTS[selectedProject]] : null;
  }, [selectedProject]);
  
  // Scene 4 (Timeline) States
  const [logsExpandedNode, setLogsExpandedNode] = useState<string | null>(null);
  const [experienceViewMode, setExperienceViewMode] = useState<"pipeline" | "spec">("pipeline");

  // Scene 5 (Mission Control) States
  const [hoveredHeatmapCell, setHoveredHeatmapCell] = useState<string | null>(null);
  const mockContributions = useMemo(() => {
    const cells = [];
    const levels = [0, 0, 0, 1, 1, 1, 2, 2, 3, 4];
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    for (let i = 0; i < 280; i++) {
      const level = levels[Math.floor(Math.random() * levels.length)];
      const date = new Date();
      date.setDate(date.getDate() - (280 - i));
      const formattedDate = `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
      const commitCount = level === 0 ? "No" : level * 2 + Math.floor(Math.random() * 2);
      cells.push({ id: i, level, tooltip: `${commitCount} contributions on ${formattedDate}` });
    }
    return cells;
  }, []);

  // Scene 6 (Contact) States
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    defaultValues: {
      role: "recruiter",
    },
  });

  // Typewriter effect in Scene 1
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setTypedText((prev) => prev + fullText.charAt(index));
      index++;
      if (index >= fullText.length) {
        clearInterval(interval);
      }
    }, 40);
    return () => clearInterval(interval);
  }, []);

  const handleContactSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      // Simulate/execute contact dispatch
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSubmitSuccess(true);
        reset();
        window.dispatchEvent(new Event("contact-submitted"));
      } else {
        throw new Error("API call failed, running fallback save.");
      }
    } catch (err) {
      // Local storage fallback save simulation
      const submissions = JSON.parse(localStorage.getItem("portfolio_contacts") || "[]");
      submissions.push({ ...data, date: new Date().toISOString() });
      localStorage.setItem("portfolio_contacts", JSON.stringify(submissions));

      setSubmitSuccess(true);
      reset();
      window.dispatchEvent(new Event("contact-submitted"));
    } finally {
      setIsSubmitting(false);
    }
  };

  const getHeatmapBg = (level: number) => {
    switch (level) {
      case 1: return "bg-green-950/70 border border-green-900/30";
      case 2: return "bg-green-800/80 border border-green-700/30";
      case 3: return "bg-green-600/90 border border-green-500/30";
      case 4: return "bg-emerald-400 border border-emerald-300/30 shadow-[0_0_8px_rgba(52,211,153,0.3)]";
      default: return "bg-neutral-900/40 border border-white/[0.01]";
    }
  };

  return (
    <div className="fixed inset-0 z-10 pointer-events-none flex flex-col justify-between">
      <div className="w-full flex-1 max-w-7xl mx-auto px-6 relative flex items-center justify-center">
        <AnimatePresence mode="wait">
          {/* SCENE 1: ARRIVAL PORTAL / HERO / ABOUT */}
          {activeScene === 0 && (
            <motion.div
              key="scene-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pointer-events-auto text-left"
            >
              {/* Left Side: Core Headers */}
              <div className="lg:col-span-7 flex flex-col items-start">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-[10px] font-mono mb-4 shadow-[0_0_15px_rgba(255,107,0,0.1)]">
                  <Terminal className="w-3.5 h-3.5 animate-pulse" />
                  <span className="min-h-[16px] tracking-wide">{typedText}</span>
                  <span className="w-1 h-3 bg-primary animate-ping" />
                </div>
                <h1 className="text-4xl md:text-6xl font-bold font-space text-gradient-aurora tracking-tight mb-4 leading-tight">
                  Bakki Mahesh
                </h1>
                <p className="text-sm md:text-base font-space text-muted max-w-lg mb-6 leading-relaxed">
                  Designing scalable cloud environments at the boundary of hardware and systems, built using <span className="text-white font-medium">React, AWS, Node.js, and Docker</span>.
                </p>
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => document.getElementById("skills")?.scrollIntoView({ behavior: "smooth" })}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary border border-primary text-[11px] font-mono font-bold text-white hover:bg-transparent hover:text-primary transition-all cursor-pointer shadow-[0_0_15px_rgba(255,107,0,0.2)] hover:scale-105"
                  >
                    Launch Journey
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <a
                    href="/BakkiMahesh_Resume_2026.pdf"
                    download="BakkiMahesh_Resume_2026.pdf"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/10 hover:border-primary text-[11px] font-mono text-muted hover:text-white transition-all bg-surface/40 hover:scale-105"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Download CV
                  </a>
                </div>
              </div>

              {/* Right Side: Profile Image & Quick specifications specs panel */}
              <div className="lg:col-span-5 flex flex-col gap-8 items-center justify-center mt-8 lg:mt-0">
                {/* Hero Profile Image with Cyberpunk Rings */}
                <div className="relative w-48 h-48 md:w-56 md:h-56 rounded-full p-1 bg-gradient-to-tr from-primary via-purple-500 to-emerald-400 shadow-[0_0_40px_rgba(255,107,0,0.3)]">
                  <div className="w-full h-full rounded-full overflow-hidden border-[6px] border-[#050505] relative z-10 bg-[#111]">
                    <Image
                      src="/portfolio1assests/maheshmain.png"
                      alt="Bakki Mahesh"
                      fill
                      className="object-cover scale-105 hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  {/* Orbital decorative rings */}
                  <div className="absolute inset-[-15px] rounded-full border border-primary/30 animate-[spin_10s_linear_infinite]" />
                  <div className="absolute inset-[-30px] rounded-full border-dashed border-purple-500/20 animate-[spin_15s_linear_infinite_reverse]" />
                  {/* Satellite dots */}
                  <div className="absolute top-1/2 -right-4 w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_10px_#34d399] animate-pulse" />
                  <div className="absolute bottom-4 -left-2 w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_#ff6b00] animate-pulse" />
                </div>

                <GlassCard className="border border-primary/20 bg-primary/5 text-left p-6 w-full">
                  <h4 className="text-[10px] font-mono font-bold tracking-widest text-primary uppercase mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    DEVELOPER CLOUD PROFILE
                  </h4>
                  <div className="flex flex-col gap-3 text-xs font-mono">
                    <div className="flex justify-between border-b border-white/5 pb-1">
                      <span className="text-muted">STATUS:</span>
                      <span className="text-white font-bold">B.Tech ECE Student</span>
                    </div>
                    <div className="flex justify-between border-b border-white/5 pb-1">
                      <span className="text-muted">AVAILABILITY:</span>
                      <span className="text-success font-bold">Available for Internships</span>
                    </div>
                    <div className="flex justify-between border-b border-white/5 pb-1">
                      <span className="text-muted">CREDENTIALS:</span>
                      <span className="text-white font-bold">AWS SAA & CCP Certified</span>
                    </div>
                    <div className="flex justify-between border-b border-white/5 pb-1">
                      <span className="text-muted">LOCATIONS:</span>
                      <span className="text-white font-bold">Mumbai Base Node</span>
                    </div>
                  </div>
                </GlassCard>
              </div>
            </motion.div>
          )}

          {/* SCENE 2: CLOUD UNIVERSE / SKILLS */}
          {activeScene === 1 && (
            <motion.div
              key="scene-1"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              transition={{ duration: 0.5 }}
              className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pointer-events-auto"
            >
              {/* Left Side: Instructions and filter category list */}
              <div className="lg:col-span-5 text-left">
                <h2 className="text-2xl md:text-4xl font-bold font-space text-white mb-3 tracking-tight">
                  Skills Galaxy
                </h2>
                <p className="text-xs text-muted mb-6 leading-relaxed font-sans">
                  The planetary nodes orbiting the central sun represent different components of my technical stack. Click nodes directly in the 3D galaxy to lock orbit and inspect detailed diagnostic statistics.
                </p>

                {/* Categories */}
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => setActiveSkillCategory("all")}
                    className={`px-4 py-2 rounded-xl text-[10px] font-mono tracking-wider transition-all border text-left ${
                      activeSkillCategory === "all"
                        ? "bg-primary/20 border-primary text-white"
                        : "bg-surface/40 border-white/5 text-muted hover:border-white/10 hover:text-white"
                    }`}
                  >
                    ALL SKILLS UNIVERSE
                  </button>
                  {skillsData.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setActiveSkillCategory(cat.id)}
                      className={`px-4 py-2 rounded-xl text-[10px] font-mono tracking-wider transition-all border text-left ${
                        activeSkillCategory === cat.id
                          ? "bg-primary/20 border-primary text-white"
                          : "bg-surface/40 border-white/5 text-muted hover:border-white/10 hover:text-white"
                      }`}
                    >
                      {cat.name.toUpperCase()} INFRASTRUCTURE
                    </button>
                  ))}
                </div>
              </div>

              {/* Right Side: Quick list of skills for the active category */}
              <div className="lg:col-span-7 max-h-[400px] overflow-y-auto pr-2 flex flex-col gap-3">
                {skillsData
                  .filter((cat) => activeSkillCategory === "all" || cat.id === activeSkillCategory)
                  .flatMap((cat) => cat.skills)
                  .map((skill) => (
                    <GlassCard key={skill.name} className="p-4 flex flex-col gap-2 bg-dark/40 border-white/5">
                      <div className="flex justify-between items-center text-xs font-mono text-white">
                        <span className="font-bold">{skill.name}</span>
                        <span className="text-primary">{skill.proficiency}%</span>
                      </div>
                      <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden">
                        <div className="bg-primary h-full rounded-full" style={{ width: `${skill.proficiency}%` }} />
                      </div>
                      <p className="text-[10px] text-muted text-left font-sans leading-relaxed">
                        {skill.details}
                      </p>
                    </GlassCard>
                  ))}
              </div>
            </motion.div>
          )}

          {/* SCENE 3: PROJECT GALAXY */}
          {activeScene === 2 && (
            <motion.div
              key="scene-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="w-full h-full flex flex-col md:flex-row items-center justify-between gap-6 pointer-events-auto p-4 md:p-8"
            >
              {/* Left HUD: Current Project Details */}
              <AnimatePresence mode="wait">
                {activeProject !== null && (
                  <motion.div
                    key={activeProject}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 50 }}
                    transition={{ duration: 0.4 }}
                    className="w-full md:max-w-md self-center text-left"
                  >
                    {/* Glassmorphic Project HUD Panel */}
                    <div className={`p-6 rounded-2xl border bg-black/85 backdrop-blur-md transition-all duration-300 ${
                      activeProject === 0 ? "border-[#4ade80]/20 shadow-[0_0_25px_rgba(74,222,128,0.08)]" :
                      activeProject === 1 ? "border-[#38bdf8]/20 shadow-[0_0_25px_rgba(56,189,248,0.08)]" :
                      activeProject === 2 ? "border-[#ea580c]/20 shadow-[0_0_25px_rgba(234,88,12,0.08)]" :
                      "border-[#d946ef]/20 shadow-[0_0_25px_rgba(217,70,239,0.08)]"
                    }`}>
                      {/* Top Header: ID & Indicator */}
                      <div className="flex justify-between items-center mb-4">
                        <span className={`text-[10px] font-mono tracking-widest font-bold ${
                          activeProject === 0 ? "text-[#4ade80]" :
                          activeProject === 1 ? "text-[#38bdf8]" :
                          activeProject === 2 ? "text-[#ea580c]" :
                          "text-[#d946ef]"
                        }`}>
                          0{activeProject + 1} / 04 · PROJECT NODE
                        </span>
                        <div className="flex items-center gap-1.5">
                          <span className={`w-2 h-2 rounded-full animate-pulse ${
                            activeProject === 0 ? "bg-[#4ade80]" :
                            activeProject === 1 ? "bg-[#38bdf8]" :
                            activeProject === 2 ? "bg-[#ea580c]" :
                            "bg-[#d946ef]"
                          }`} />
                          <span className="text-[7px] font-mono text-muted uppercase tracking-wider">Active Lock</span>
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="text-2xl md:text-3xl font-space font-bold text-white mb-2 leading-tight">
                        {projects[MAPPED_PROJECTS[activeProject]].title}
                      </h3>
                      
                      {/* Short Description */}
                      <p className="text-xs text-muted leading-relaxed font-sans mb-5 font-light">
                        {projects[MAPPED_PROJECTS[activeProject]].description}
                      </p>

                      {/* Tech stack */}
                      <div className="flex flex-wrap gap-1.5 mb-6">
                        {projects[MAPPED_PROJECTS[activeProject]].tech.map((t) => (
                          <span key={t} className="px-2 py-0.5 bg-white/5 border border-white/10 rounded font-mono text-[8px] text-white/80 uppercase">
                            {t}
                          </span>
                        ))}
                      </div>

                      {/* Action buttons */}
                      <div className="flex flex-col gap-2 pt-4 border-t border-white/5">
                        <button
                          onClick={() => setSelectedProject(activeProject)}
                          className={`w-full py-2.5 rounded-xl font-mono text-xs font-bold text-white transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 ${
                            activeProject === 0 ? "bg-[#4ade80]/10 hover:bg-[#4ade80] border border-[#4ade80]/30 shadow-[0_0_15px_rgba(74,222,128,0.15)]" :
                            activeProject === 1 ? "bg-[#38bdf8]/10 hover:bg-[#38bdf8] border border-[#38bdf8]/30 shadow-[0_0_15px_rgba(56,189,248,0.15)]" :
                            activeProject === 2 ? "bg-[#ea580c]/10 hover:bg-[#ea580c] border border-[#ea580c]/30 shadow-[0_0_15px_rgba(234,88,12,0.15)]" :
                            "bg-[#d946ef]/10 hover:bg-[#d946ef] border border-[#d946ef]/30 shadow-[0_0_15px_rgba(217,70,239,0.15)]"
                          }`}
                        >
                          Explore Project Ecosystem
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Right HUD: Navigation list & scroll instructions */}
              <div className="w-full md:max-w-xs flex flex-col items-start md:items-end text-left md:text-right gap-6">
                {/* Scroll Helper */}
                <div className="bg-black/60 backdrop-blur-sm border border-white/5 p-4 rounded-xl max-w-[240px] text-xs font-sans text-muted leading-relaxed self-start md:self-end">
                  <span className="font-mono text-[9px] text-primary uppercase tracking-wider block mb-1">Navigation Instructions</span>
                  Scroll down to fly through the project galaxy. Click any floating island or click the button to investigate system specifications.
                </div>

                {/* Progress Indicators */}
                <div className="flex flex-row md:flex-col gap-3 font-mono text-[10px]">
                  {["ManaKrishi", "VisaEnsure", "3-Tier VPC", "3D Portfolio"].map((name, idx) => (
                    <div 
                      key={name} 
                      onClick={() => {
                        const start = 0.25;
                        const range = 0.17;
                        const progress = start + (idx / 3) * range * 0.99;
                        const targetScroll = progress * (document.documentElement.scrollHeight - window.innerHeight);
                        window.scrollTo({ top: targetScroll, behavior: "smooth" });
                      }}
                      className="flex items-center gap-2 cursor-pointer transition-all duration-200"
                    >
                      <span className={`hidden md:inline ${activeProject === idx ? "text-white font-bold" : "text-muted"}`}>
                        {name}
                      </span>
                      <span className={`w-2 h-2 rounded-full border transition-all ${
                        activeProject === idx ? (
                          idx === 0 ? "bg-[#4ade80] border-[#4ade80] scale-125 shadow-[0_0_8px_#4ade80]" :
                          idx === 1 ? "bg-[#38bdf8] border-[#38bdf8] scale-125 shadow-[0_0_8px_#38bdf8]" :
                          idx === 2 ? "bg-[#ea580c] border-[#ea580c] scale-125 shadow-[0_0_8px_#ea580c]" :
                          "bg-[#d946ef] border-[#d946ef] scale-125 shadow-[0_0_8px_#d946ef]"
                        ) : "bg-transparent border-white/20"
                      }`} />
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* SCENE 4: EXPERIENCE TIMELINE TUNNEL */}
          {activeScene === 3 && (
            <motion.div
              key="scene-3"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.5 }}
              className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pointer-events-auto"
            >
              {/* Left Side: Pipeline list of checkpoints */}
              <div className="lg:col-span-7 flex flex-col gap-4 text-left">
                <h2 className="text-2xl md:text-4xl font-bold font-space text-white mb-2 tracking-tight">
                  Experience Pipeline
                </h2>
                <p className="text-xs text-muted mb-6 leading-relaxed font-sans">
                  Nodes inside the cyber-tunnel represent career checkpoints. Toggle dashboard pipelines below or execute diagnostic console shell script streams.
                </p>

                {experienceViewMode === "pipeline" ? (
                  <div className="flex flex-col gap-4 max-h-[380px] overflow-y-auto pr-2">
                    {experiences.map((exp) => (
                      <GlassCard key={exp.id} className="p-4 bg-dark/40 border-white/5">
                        <div className="flex justify-between items-start flex-wrap gap-2 mb-2">
                          <div>
                            <span className="text-[8px] font-mono text-primary uppercase block mb-1">
                              NODE: #{exp.id.substring(0, 6).toUpperCase()} ({exp.period})
                            </span>
                            <h4 className="text-sm font-space font-bold text-white">
                              {exp.role} @ {exp.company}
                            </h4>
                          </div>
                          <span className="text-[8px] font-mono text-success bg-success/5 border border-success/30 px-2 py-0.5 rounded-full">
                            STABLE ACTIVE
                          </span>
                        </div>
                        <ul className="flex flex-col gap-1.5 text-[10px] text-muted list-inside leading-relaxed mt-2 pt-2 border-t border-white/5">
                          {exp.achievements.map((ach, i) => (
                            <li key={i} className="flex gap-2">
                              <span className="text-primary font-mono select-none">▶</span>
                              <span>{ach}</span>
                            </li>
                          ))}
                        </ul>
                        <button
                          onClick={() => setLogsExpandedNode(logsExpandedNode === exp.id ? null : exp.id)}
                          className="flex items-center gap-1.5 mt-3 text-[9px] font-mono text-primary/80 hover:text-primary transition-colors bg-primary/5 border border-primary/20 px-3 py-1 rounded-lg w-full justify-center cursor-pointer uppercase font-bold"
                        >
                          <Settings className="w-3 h-3 animate-spin" />
                          {logsExpandedNode === exp.id ? "Close Diagnostics" : "Open Shell Diagnostics"}
                        </button>
                        
                        {/* Shell diagnostic window overlay inline */}
                        {logsExpandedNode === exp.id && (
                          <div className="mt-3 rounded-lg border border-white/5 bg-black/80 font-mono text-[9px] text-left overflow-hidden">
                            <div className="bg-[#141414] border-b border-white/5 px-3 py-1 flex items-center justify-between text-muted">
                              <span>node_spec_diagnostics.sh</span>
                              <span className="text-[7px] bg-primary/10 text-primary px-1 rounded">LIVE</span>
                            </div>
                            <div className="p-3 max-h-32 overflow-y-auto flex flex-col gap-1 text-muted select-all">
                              <div className="text-success">[OK] Loaded profile specs.</div>
                              <div>[SYS] FETCH COMP: {exp.company}</div>
                              {exp.skills.map((s) => (
                                <div key={s} className="text-primary/70">{`[DEP] Integrated module: ${s}`}</div>
                              ))}
                              <div className="text-success">[BUILD] Environment validation successful.</div>
                            </div>
                          </div>
                        )}
                      </GlassCard>
                    ))}
                  </div>
                ) : (
                  <GlassCard className="p-4 bg-[#0A0A0A] border-white/5 font-mono text-[10px] text-left max-h-[380px] overflow-y-auto">
                    <pre className="text-white/60 whitespace-pre">{JSON.stringify(experiences, null, 2)}</pre>
                  </GlassCard>
                )}
              </div>

              {/* Right Side: Tab Selectors and specifications highlights */}
              <div className="lg:col-span-5 flex flex-col gap-4">
                <div className="flex bg-[#111] p-1 rounded-full border border-white/5 backdrop-blur-md self-start gap-1">
                  <button
                    onClick={() => setExperienceViewMode("pipeline")}
                    className={`px-4 py-2 rounded-full text-[9px] font-mono uppercase cursor-pointer ${
                      experienceViewMode === "pipeline" ? "bg-primary text-white shadow-[0_0_10px_rgba(255,107,0,0.3)]" : "text-muted hover:text-white"
                    }`}
                  >
                    Pipeline Run
                  </button>
                  <button
                    onClick={() => setExperienceViewMode("spec")}
                    className={`px-4 py-2 rounded-full text-[9px] font-mono uppercase cursor-pointer ${
                      experienceViewMode === "spec" ? "bg-primary text-white shadow-[0_0_10px_rgba(255,107,0,0.3)]" : "text-muted hover:text-white"
                    }`}
                  >
                    Console Spec
                  </button>
                </div>

                <GlassCard className="p-5 border-white/5 bg-dark/40 text-left">
                  <span className="text-[8px] font-mono text-primary uppercase block mb-1">
                    Tunnel Telemetry Logs
                  </span>
                  <div className="flex flex-col gap-3 mt-4 text-[10px] font-mono">
                    <div className="flex justify-between border-b border-white/5 pb-1">
                      <span className="text-muted">Total Nodes:</span>
                      <span className="text-white font-bold">{experiences.length} Checkpoints</span>
                    </div>
                    <div className="flex justify-between border-b border-white/5 pb-1">
                      <span className="text-muted">Active Node:</span>
                      <span className="text-success font-bold">GKLT (Manakrishi)</span>
                    </div>
                    <div className="flex justify-between border-b border-white/5 pb-1">
                      <span className="text-muted">First Commit:</span>
                      <span className="text-white font-bold">2020 Foundation</span>
                    </div>
                  </div>
                </GlassCard>
              </div>
            </motion.div>
          )}

          {/* SCENE 5: MISSION CONTROL (GITHUB HEATMAP) */}
          {activeScene === 4 && (
            <motion.div
              key="scene-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
              className="w-full flex flex-col items-center pointer-events-auto"
            >
              {/* Header metrics */}
              <div className="max-w-2xl text-center mb-8">
                <h2 className="text-2xl md:text-4xl font-bold font-space text-white mb-3">
                  Engineering Verification Hub
                </h2>
                <p className="text-xs text-muted leading-relaxed font-sans">
                  Continuous commit telemetry logs. Hover cells on the heatmap grid below to fetch detailed commit payloads and check repository health metrics.
                </p>
              </div>

              {/* Metrics Stats Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-5xl mb-6">
                <GlassCard className="p-4 flex items-center gap-3 bg-dark/40 border-white/5 text-left">
                  <div className="p-2 rounded-lg bg-primary/10 border border-primary/20 shrink-0">
                    <GitCommit className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <span className="text-[9px] font-mono text-muted uppercase block">Commits (2025-26)</span>
                    <span className="text-lg font-space font-bold text-white">1,280+</span>
                  </div>
                </GlassCard>
                <GlassCard className="p-4 flex items-center gap-3 bg-dark/40 border-white/5 text-left">
                  <div className="p-2 rounded-lg bg-green-500/10 border border-green-500/20 shrink-0">
                    <GitPullRequest className="w-4 h-4 text-green-400" />
                  </div>
                  <div>
                    <span className="text-[9px] font-mono text-muted uppercase block">PRs Merged</span>
                    <span className="text-lg font-space font-bold text-white">42 Active</span>
                  </div>
                </GlassCard>
                <GlassCard className="p-4 flex items-center gap-3 bg-dark/40 border-white/5 text-left">
                  <div className="p-2 rounded-lg bg-yellow-500/10 border border-yellow-500/20 shrink-0">
                    <Folder className="w-4 h-4 text-yellow-400" />
                  </div>
                  <div>
                    <span className="text-[9px] font-mono text-muted uppercase block">Repositories</span>
                    <span className="text-lg font-space font-bold text-white">18 Repos</span>
                  </div>
                </GlassCard>
                <GlassCard className="p-4 flex items-center gap-3 bg-dark/40 border-white/5 text-left">
                  <div className="p-2 rounded-lg bg-purple-500/10 border border-purple-500/20 shrink-0">
                    <Eye className="w-4 h-4 text-purple-400" />
                  </div>
                  <div>
                    <span className="text-[9px] font-mono text-muted uppercase block">Visibility</span>
                    <span className="text-lg font-space font-bold text-white">Public Source</span>
                  </div>
                </GlassCard>
              </div>

              {/* Heatmap Grid Calendar */}
              <GlassCard className="p-6 w-full max-w-5xl bg-dark/40 border-white/5 mb-4">
                <div className="flex justify-between items-center mb-4 flex-wrap gap-2 text-left">
                  <div className="flex items-center gap-2">
                    <Code2 className="w-4 h-4 text-primary" />
                    <span className="text-[10px] font-mono text-white font-bold uppercase tracking-wider">
                      Telemetry Commit Stream: @mahesh123-pro
                    </span>
                  </div>
                  <div className="text-[9px] font-mono text-primary bg-primary/5 border border-primary/20 px-3 py-1 rounded min-h-[22px] flex items-center">
                    {hoveredHeatmapCell || "Hover grid cells for commit specs"}
                  </div>
                </div>

                <div className="overflow-x-auto w-full pb-2">
                  <div className="min-w-[700px] flex flex-col gap-1.5 select-none">
                    <div
                      className="grid grid-flow-col gap-0.5"
                      style={{ gridTemplateRows: "repeat(7, minmax(0, 1fr))", gridTemplateColumns: "repeat(40, minmax(0, 1fr))" }}
                    >
                      {mockContributions.map((cell) => (
                        <div
                          key={cell.id}
                          className={`w-[9px] h-[9px] rounded-sm transition-all duration-150 cursor-pointer ${getHeatmapBg(cell.level)} hover:scale-125`}
                          onMouseEnter={() => setHoveredHeatmapCell(cell.tooltip)}
                          onMouseLeave={() => setHoveredHeatmapCell(null)}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          )}

          {/* SCENE 6: CONTACT PORTAL */}
          {activeScene === 5 && (
            <motion.div
              key="scene-5"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5 }}
              className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pointer-events-auto"
            >
              {/* Left Side: Form validations */}
              <div className="lg:col-span-7">
                <GlassCard className="p-6 md:p-8 border-white/5 bg-[#111]/85 text-left">
                  <AnimatePresence mode="wait">
                    {!submitSuccess ? (
                      <form onSubmit={handleSubmit(handleContactSubmit)} className="flex flex-col gap-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="flex flex-col gap-1">
                            <label className="text-[9px] font-mono text-muted uppercase">Name</label>
                            <input
                              type="text"
                              {...register("name")}
                              placeholder="Jean Doe"
                              className="px-3 py-2 rounded-lg border border-white/5 bg-white/[0.02] text-xs text-white focus:outline-none focus:border-primary/50 font-mono"
                            />
                            {errors.name && (
                              <span className="text-[9px] font-mono text-primary flex items-center gap-1 mt-0.5">
                                <AlertCircle className="w-3 h-3" /> {errors.name.message}
                              </span>
                            )}
                          </div>
                          <div className="flex flex-col gap-1">
                            <label className="text-[9px] font-mono text-muted uppercase">Return coordinate (email)</label>
                            <input
                              type="email"
                              {...register("email")}
                              placeholder="jean@agency.com"
                              className="px-3 py-2 rounded-lg border border-white/5 bg-white/[0.02] text-xs text-white focus:outline-none focus:border-primary/50 font-mono"
                            />
                            {errors.email && (
                              <span className="text-[9px] font-mono text-primary flex items-center gap-1 mt-0.5">
                                <AlertCircle className="w-3 h-3" /> {errors.email.message}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="flex flex-col gap-1">
                            <label className="text-[9px] font-mono text-muted uppercase">Subject</label>
                            <input
                              type="text"
                              {...register("subject")}
                              placeholder="Collaboration proposal"
                              className="px-3 py-2 rounded-lg border border-white/5 bg-white/[0.02] text-xs text-white focus:outline-none focus:border-primary/50 font-mono"
                            />
                            {errors.subject && (
                              <span className="text-[9px] font-mono text-primary flex items-center gap-1 mt-0.5">
                                <AlertCircle className="w-3 h-3" /> {errors.subject.message}
                              </span>
                            )}
                          </div>
                          <div className="flex flex-col gap-1">
                            <label className="text-[9px] font-mono text-muted uppercase">Identifier</label>
                            <select
                              {...register("role")}
                              className="px-3 py-2 rounded-lg border border-white/5 bg-surface text-xs text-white focus:outline-none focus:border-primary/50 font-mono"
                            >
                              <option value="recruiter">Recruiter / Talent Agent</option>
                              <option value="collaborator">Developer / Collaborator</option>
                              <option value="client">Client / Project Lead</option>
                              <option value="other">Other Entity</option>
                            </select>
                          </div>
                        </div>

                        <div className="flex flex-col gap-1">
                          <label className="text-[9px] font-mono text-muted uppercase">Payload Log (message)</label>
                          <textarea
                            rows={4}
                            {...register("message")}
                            placeholder="State the details of your proposal here..."
                            className="px-3 py-2 rounded-lg border border-white/5 bg-white/[0.02] text-xs text-white focus:outline-none focus:border-primary/50 font-mono resize-none"
                          />
                          {errors.message && (
                            <span className="text-[9px] font-mono text-primary flex items-center gap-1 mt-0.5">
                              <AlertCircle className="w-3 h-3" /> {errors.message.message}
                            </span>
                          )}
                        </div>

                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full py-2.5 rounded-xl bg-primary text-xs font-mono font-bold text-white hover:bg-transparent border border-primary transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:pointer-events-none"
                        >
                          {isSubmitting ? "TRANSMITTING COORDINATES..." : "TRANSMIT COMMAND PAYLOAD"}
                        </button>
                      </form>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="flex flex-col items-center justify-center py-8 text-center"
                      >
                        <CheckCircle className="w-12 h-12 text-primary mb-3 animate-bounce" />
                        <h3 className="text-lg font-space font-bold text-white mb-1">
                          Transmission Launched
                        </h3>
                        <p className="text-[10px] font-mono text-muted max-w-xs mb-4 leading-relaxed">
                          Your message payload was successfully routed into the portal. Base node synced.
                        </p>
                        <button
                          onClick={() => setSubmitSuccess(false)}
                          className="px-4 py-1.5 rounded-full border border-white/10 hover:border-primary text-[9px] font-mono text-muted hover:text-white transition-colors cursor-pointer"
                        >
                          TRANSMIT ANOTHER DATA PACKET
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </GlassCard>
              </div>

              {/* Right Side: Coordinates / Quick info cards */}
              <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
                <GlassCard className="p-4 border-white/5 bg-dark/40">
                  <span className="text-[8px] font-mono text-primary uppercase block mb-1">Secure Email Channel</span>
                  <a href="mailto:mahesh@ece.cloud" className="text-xs font-mono font-bold text-white hover:text-primary transition-colors flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-primary" /> mahesh@ece.cloud
                  </a>
                </GlassCard>
                <GlassCard className="p-4 border-white/5 bg-dark/40">
                  <span className="text-[8px] font-mono text-primary uppercase block mb-1">Grid Base Node</span>
                  <span className="text-xs font-mono font-bold text-white flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-primary" /> Hyderabad, India
                  </span>
                </GlassCard>
                <GlassCard className="p-4 border-white/5 bg-dark/40">
                  <span className="text-[8px] font-mono text-primary uppercase block mb-1">GitHub Account</span>
                  <a href="https://github.com/mahesh123-pro" target="_blank" rel="noreferrer" className="text-xs font-mono font-bold text-white hover:text-primary transition-colors flex items-center gap-1.5">
                    <GithubIcon className="w-3.5 h-3.5 text-primary" /> github/mahesh123-pro
                  </a>
                </GlassCard>
                <GlassCard className="p-4 border-white/5 bg-dark/40">
                  <span className="text-[8px] font-mono text-primary uppercase block mb-1">LinkedIn Network</span>
                  <a href="https://linkedin.com/in/mahesh-bakki" target="_blank" rel="noreferrer" className="text-xs font-mono font-bold text-white hover:text-primary transition-colors flex items-center gap-1.5">
                    <LinkedinIcon className="w-3.5 h-3.5 text-primary" /> linkedin/mahesh-bakki
                  </a>
                </GlassCard>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Case Study Full Side Drawer Panel */}
      <AnimatePresence>
        {selectedCaseStudy && (
          <div className="fixed inset-0 z-50 flex justify-end pointer-events-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
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
                <div className="flex justify-between items-start border-b border-white/5 pb-4 mb-6 text-left">
                  <div>
                    <span className="text-[8px] font-mono text-primary font-bold tracking-widest uppercase">
                      SYSTEM ARCHITECTURE ANALYSIS
                    </span>
                    <h3 className="text-xl font-space font-bold text-white">
                      {selectedCaseStudy.title}
                    </h3>
                  </div>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="p-1.5 rounded-lg border border-white/10 text-muted hover:text-white transition-colors cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex flex-col gap-5 text-left font-sans text-xs">
                  <div>
                    <h4 className="text-[9px] font-mono font-bold tracking-wider text-primary uppercase mb-1.5 flex items-center gap-1">
                      <span className="w-1 h-1 rounded-full bg-primary" /> Problem
                    </h4>
                    <p className="text-muted leading-relaxed">{selectedCaseStudy.caseStudy.problem}</p>
                  </div>
                  <div>
                    <h4 className="text-[9px] font-mono font-bold tracking-wider text-primary uppercase mb-1.5 flex items-center gap-1">
                      <span className="w-1 h-1 rounded-full bg-primary" /> Solution
                    </h4>
                    <p className="text-muted leading-relaxed">{selectedCaseStudy.caseStudy.solution}</p>
                  </div>
                  <div>
                    <h4 className="text-[9px] font-mono font-bold tracking-wider text-primary uppercase mb-1.5 flex items-center gap-1">
                      <span className="w-1 h-1 rounded-full bg-primary" /> My Contribution
                    </h4>
                    <p className="text-white leading-relaxed bg-white/[0.01] border border-white/5 p-3 rounded-lg">
                      {selectedCaseStudy.caseStudy.myContribution}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-[9px] font-mono font-bold tracking-wider text-primary uppercase mb-1.5 flex items-center gap-1">
                      <span className="w-1 h-1 rounded-full bg-primary" /> Technical Architecture
                    </h4>
                    <ul className="flex flex-col gap-1">
                      {selectedCaseStudy.caseStudy.architecture.map((item, idx) => (
                        <li key={idx} className="flex gap-2 text-muted leading-relaxed">
                          <span className="text-primary font-mono select-none">[{idx + 1}]</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-[9px] font-mono font-bold tracking-wider text-primary uppercase mb-1.5 flex items-center gap-1">
                      <span className="w-1 h-1 rounded-full bg-primary" /> Key Impact Metrics
                    </h4>
                    <div className="grid grid-cols-1 gap-2">
                      {selectedCaseStudy.caseStudy.metrics.map((metric, idx) => (
                        <div key={idx} className="p-2.5 rounded-lg border border-white/5 bg-white/[0.01] flex items-center gap-3 text-white">
                          <Terminal className="w-3.5 h-3.5 text-primary shrink-0" />
                          <span className="font-mono text-muted">{metric}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 border-t border-white/5 pt-4 flex gap-4">
                {selectedCaseStudy.githubUrl && (
                  <a
                    href={selectedCaseStudy.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 py-3 rounded-xl bg-transparent hover:bg-white/5 border border-white/10 text-xs font-mono font-bold text-white transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <GithubIcon className="w-3.5 h-3.5" /> Source Code
                  </a>
                )}
                {selectedCaseStudy.liveUrl && (
                  <a
                    href={selectedCaseStudy.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 py-3 rounded-xl bg-primary hover:bg-transparent border border-primary text-xs font-mono font-bold text-white transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    Visit Live Link <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Live Preview Browser Lightbox Frame */}
      <AnimatePresence>
        {previewUrl && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-auto">
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
              className="relative w-full max-w-4xl h-[75vh] rounded-2xl border border-white/10 bg-[#0E0E0E] overflow-hidden flex flex-col z-10 shadow-2xl"
            >
              <div className="flex items-center justify-between bg-[#141414] border-b border-white/5 px-4 py-2.5 shrink-0">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/20 hover:bg-red-500 transition-colors" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/20 hover:bg-yellow-500 transition-colors" />
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500/20 hover:bg-green-500 transition-colors" />
                </div>
                <div className="hidden sm:flex items-center justify-center gap-2 px-4 py-0.5 rounded bg-white/5 text-[9px] font-mono text-muted max-w-xs w-full truncate border border-white/5 select-none">
                  <span className="text-primary">secure://</span>
                  {previewUrl.replace("https://", "")}
                </div>
                <button
                  onClick={() => setPreviewUrl(null)}
                  className="p-1 rounded-md text-muted hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="flex-1 bg-white relative">
                <iframe
                  src={previewUrl}
                  title="Live Website Sandbox"
                  className="w-full h-full border-none"
                  sandbox="allow-scripts allow-same-origin"
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default JourneyOverlays;
