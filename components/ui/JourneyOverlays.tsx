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
import Link from "next/link";
import { projects, Project } from "../../content/projects";
import { experiences } from "../../content/experience";
import { skillsData, Skill } from "../../content/skills";
import { GithubIcon, LinkedinIcon } from "./BrandIcons";
import { GlassCard } from "./GlassCard";

// SVG Architecture diagrams for each project case study
function ProjectArchitectureDiagram({ projectId }: { projectId: string }) {
  if (projectId === "manakrishi") {
    return (
      <div className="my-4">
        <span className="text-[9px] font-mono text-muted uppercase tracking-wider block mb-1.5">System Architecture Flow</span>
        <svg className="w-full h-32 bg-black/40 border border-white/5 rounded-xl" viewBox="0 0 400 120">
          <defs>
            <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 2 L 8 5 L 0 8 z" fill="#FF6B00" />
            </marker>
          </defs>
          <g transform="translate(10, 10)">
            <rect x="10" y="35" width="60" height="30" rx="6" fill="#111" stroke="#888" strokeWidth="1" />
            <text x="40" y="53" fill="#fff" fontSize="7" fontFamily="monospace" textAnchor="middle">Operator</text>
            
            <rect x="100" y="35" width="70" height="30" rx="6" fill="#111" stroke="#FF6B00" strokeWidth="1.2" />
            <text x="135" y="53" fill="#fff" fontSize="7" fontFamily="monospace" textAnchor="middle">React Native</text>
            
            <rect x="200" y="35" width="70" height="30" rx="6" fill="#111" stroke="#FF6B00" strokeWidth="1.2" />
            <text x="235" y="53" fill="#fff" fontSize="7" fontFamily="monospace" textAnchor="middle">WebSockets</text>
            
            <rect x="300" y="15" width="70" height="25" rx="4" fill="#111" stroke="#22c55e" strokeWidth="1" />
            <text x="335" y="31" fill="#fff" fontSize="7" fontFamily="monospace" textAnchor="middle">Redis Cache</text>
            <rect x="300" y="60" width="70" height="25" rx="4" fill="#111" stroke="#22c55e" strokeWidth="1" />
            <text x="335" y="76" fill="#fff" fontSize="7" fontFamily="monospace" textAnchor="middle">MongoDB</text>
            
            <path d="M 70 50 L 95 50" stroke="#FF6B00" strokeWidth="1.2" markerEnd="url(#arrow)" />
            <path d="M 170 50 L 195 50" stroke="#FF6B00" strokeWidth="1.2" markerEnd="url(#arrow)" />
            <path d="M 270 45 L 295 28" stroke="#22c55e" strokeWidth="1" markerEnd="url(#arrow)" />
            <path d="M 270 55 L 295 72" stroke="#22c55e" strokeWidth="1" markerEnd="url(#arrow)" />
          </g>
        </svg>
      </div>
    );
  }
  
  if (projectId === "prolance") {
    return (
      <div className="my-4">
        <span className="text-[9px] font-mono text-muted uppercase tracking-wider block mb-1.5">Milestone Sync Architecture</span>
        <svg className="w-full h-32 bg-black/40 border border-white/5 rounded-xl" viewBox="0 0 400 120">
          <defs>
            <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 2 L 8 5 L 0 8 z" fill="#38bdf8" />
            </marker>
          </defs>
          <g transform="translate(10, 10)">
            <rect x="10" y="35" width="60" height="30" rx="6" fill="#111" stroke="#888" strokeWidth="1" />
            <text x="40" y="53" fill="#fff" fontSize="7" fontFamily="monospace" textAnchor="middle">Freelancer</text>
            
            <rect x="100" y="35" width="70" height="30" rx="6" fill="#111" stroke="#38bdf8" strokeWidth="1.2" />
            <text x="135" y="53" fill="#fff" fontSize="7" fontFamily="monospace" textAnchor="middle">Next.js UI</text>
            
            <rect x="200" y="35" width="70" height="30" rx="6" fill="#111" stroke="#38bdf8" strokeWidth="1.2" />
            <text x="235" y="53" fill="#fff" fontSize="7" fontFamily="monospace" textAnchor="middle">Node/Express</text>
            
            <rect x="300" y="15" width="70" height="25" rx="4" fill="#111" stroke="#ea580c" strokeWidth="1" />
            <text x="335" y="31" fill="#fff" fontSize="7" fontFamily="monospace" textAnchor="middle">MongoDB</text>
            <rect x="300" y="60" width="70" height="25" rx="4" fill="#111" stroke="#ea580c" strokeWidth="1" />
            <text x="335" y="76" fill="#fff" fontSize="7" fontFamily="monospace" textAnchor="middle">Socket.io</text>
            
            <path d="M 70 50 L 95 50" stroke="#38bdf8" strokeWidth="1.2" markerEnd="url(#arrow)" />
            <path d="M 170 50 L 195 50" stroke="#38bdf8" strokeWidth="1.2" markerEnd="url(#arrow)" />
            <path d="M 270 45 L 295 28" stroke="#ea580c" strokeWidth="1" markerEnd="url(#arrow)" />
            <path d="M 270 55 L 295 72" stroke="#ea580c" strokeWidth="1" markerEnd="url(#arrow)" />
          </g>
        </svg>
      </div>
    );
  }

  if (projectId === "visaensure") {
    return (
      <div className="my-4">
        <span className="text-[9px] font-mono text-muted uppercase tracking-wider block mb-1.5">OCR Validation Architecture</span>
        <svg className="w-full h-32 bg-black/40 border border-white/5 rounded-xl" viewBox="0 0 400 120">
          <defs>
            <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 2 L 8 5 L 0 8 z" fill="#ea580c" />
            </marker>
          </defs>
          <g transform="translate(10, 10)">
            <rect x="10" y="35" width="60" height="30" rx="6" fill="#111" stroke="#888" strokeWidth="1" />
            <text x="40" y="53" fill="#fff" fontSize="7" fontFamily="monospace" textAnchor="middle">Student</text>
            
            <rect x="90" y="35" width="70" height="30" rx="6" fill="#111" stroke="#ea580c" strokeWidth="1.2" />
            <text x="125" y="53" fill="#fff" fontSize="7" fontFamily="monospace" textAnchor="middle">Next.js Web</text>
            
            <rect x="190" y="35" width="80" height="30" rx="6" fill="#111" stroke="#ea580c" strokeWidth="1.2" />
            <text x="230" y="53" fill="#fff" fontSize="7" fontFamily="monospace" textAnchor="middle">Vercel Edge</text>
            
            <rect x="300" y="15" width="70" height="25" rx="4" fill="#111" stroke="#22c55e" strokeWidth="1" />
            <text x="335" y="31" fill="#fff" fontSize="7" fontFamily="monospace" textAnchor="middle">OCR Service</text>
            <rect x="300" y="60" width="70" height="25" rx="4" fill="#111" stroke="#22c55e" strokeWidth="1" />
            <text x="335" y="76" fill="#fff" fontSize="7" fontFamily="monospace" textAnchor="middle">AWS S3 Docs</text>
            
            <path d="M 70 50 L 85 50" stroke="#ea580c" strokeWidth="1.2" markerEnd="url(#arrow)" />
            <path d="M 160 50 L 185 50" stroke="#ea580c" strokeWidth="1.2" markerEnd="url(#arrow)" />
            <path d="M 270 45 L 295 28" stroke="#22c55e" strokeWidth="1" markerEnd="url(#arrow)" />
            <path d="M 270 55 L 295 72" stroke="#22c55e" strokeWidth="1" markerEnd="url(#arrow)" />
          </g>
        </svg>
      </div>
    );
  }

  if (projectId === "6sgreentech") {
    return (
      <div className="my-4">
        <span className="text-[9px] font-mono text-muted uppercase tracking-wider block mb-1.5">IoT Telemetry & Control Flow</span>
        <svg className="w-full h-32 bg-black/40 border border-white/5 rounded-xl" viewBox="0 0 400 120">
          <defs>
            <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 2 L 8 5 L 0 8 z" fill="#a259ff" />
            </marker>
          </defs>
          <g transform="translate(10, 10)">
            <rect x="10" y="35" width="60" height="30" rx="6" fill="#111" stroke="#888" strokeWidth="1" />
            <text x="40" y="53" fill="#fff" fontSize="7" fontFamily="monospace" textAnchor="middle">IoT Sensors</text>
            
            <rect x="100" y="35" width="70" height="30" rx="6" fill="#111" stroke="#a259ff" strokeWidth="1.2" />
            <text x="135" y="53" fill="#fff" fontSize="7" fontFamily="monospace" textAnchor="middle">AWS IoT Core</text>
            
            <rect x="200" y="35" width="70" height="30" rx="6" fill="#111" stroke="#a259ff" strokeWidth="1.2" />
            <text x="235" y="53" fill="#fff" fontSize="7" fontFamily="monospace" textAnchor="middle">FastAPI API</text>
            
            <rect x="300" y="15" width="70" height="25" rx="4" fill="#111" stroke="#22c55e" strokeWidth="1" />
            <text x="335" y="31" fill="#fff" fontSize="7" fontFamily="monospace" textAnchor="middle">MongoDB</text>
            <rect x="300" y="60" width="70" height="25" rx="4" fill="#111" stroke="#ea580c" strokeWidth="1" />
            <text x="335" y="76" fill="#fff" fontSize="7" fontFamily="monospace" textAnchor="middle">Next.js UI</text>
            
            <path d="M 70 50 L 95 50" stroke="#a259ff" strokeWidth="1.2" markerEnd="url(#arrow)" />
            <path d="M 170 50 L 195 50" stroke="#a259ff" strokeWidth="1.2" markerEnd="url(#arrow)" />
            <path d="M 270 45 L 295 28" stroke="#22c55e" strokeWidth="1" markerEnd="url(#arrow)" />
            <path d="M 270 55 L 295 72" stroke="#ea580c" strokeWidth="1" markerEnd="url(#arrow)" />
          </g>
        </svg>
      </div>
    );
  }

  return (
    <div className="my-4">
      <span className="text-[9px] font-mono text-muted uppercase tracking-wider block mb-1.5">Infrastructure Deployment Tier</span>
      <svg className="w-full h-32 bg-black/40 border border-white/5 rounded-xl" viewBox="0 0 400 120">
        <defs>
          <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 2 L 8 5 L 0 8 z" fill="#ff6b00" />
          </marker>
        </defs>
        <g transform="translate(10, 10)">
          <rect x="20" y="35" width="70" height="30" rx="6" fill="#111" stroke="#888" strokeWidth="1" />
          <text x="55" y="53" fill="#fff" fontSize="7" fontFamily="monospace" textAnchor="middle">Edge Client</text>
          
          <path d="M 90 50 L 140 50" stroke="#ff6b00" strokeWidth="1.2" markerEnd="url(#arrow)" />
          
          <rect x="150" y="35" width="80" height="30" rx="6" fill="#111" stroke="#ff6b00" strokeWidth="1.2" />
          <text x="190" y="53" fill="#fff" fontSize="7" fontFamily="monospace" textAnchor="middle">Compute Cluster</text>
          
          <path d="M 230 50 L 280 50" stroke="#ff6b00" strokeWidth="1.2" markerEnd="url(#arrow)" />
          
          <rect x="290" y="35" width="80" height="30" rx="6" fill="#111" stroke="#22c55e" strokeWidth="1" />
          <text x="330" y="53" fill="#fff" fontSize="7" fontFamily="monospace" textAnchor="middle">Database / S3</text>
        </g>
      </svg>
    </div>
  );
}

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
    return selectedProject !== null ? projects[selectedProject] : null;
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
                <h2 className="text-lg md:text-xl font-space font-bold text-primary mb-2">
                  Cloud Engineer | Full Stack Developer | Tech Lead
                </h2>
                <h1 className="text-4xl md:text-6xl font-bold font-space text-gradient-aurora tracking-tight mb-4 leading-tight">
                  Bakki Mahesh
                </h1>
                <p className="text-sm md:text-base font-space text-muted max-w-lg mb-6 leading-relaxed">
                  Building scalable web applications, cloud infrastructure, and startup products using AWS, React, Next.js, Node.js, and modern DevOps practices.
                </p>
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary border border-primary text-[11px] font-mono font-bold text-white hover:bg-transparent hover:text-primary transition-all cursor-pointer shadow-[0_0_15px_rgba(255,107,0,0.2)] hover:scale-105"
                  >
                    View Projects
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <a
                    href="/BakkiMahesh_Resume_2026.pdf"
                    download="BakkiMahesh_Resume_2026.pdf"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/10 hover:border-primary text-[11px] font-mono text-muted hover:text-white transition-all bg-surface/40 hover:scale-105"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Download Resume
                  </a>
                  <button
                    onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/10 hover:border-primary text-[11px] font-mono text-muted hover:text-white transition-all bg-surface/40 hover:scale-105"
                  >
                    Contact Me
                  </button>
                </div>
              </div>

              {/* Right Side: Profile Image & Quick specifications specs panel */}
              <div className="lg:col-span-5 flex flex-col gap-6 items-center justify-center mt-8 lg:mt-0">
                {/* Hero Profile Image with Cyberpunk Rings */}
                <div className="relative w-40 h-40 md:w-44 md:h-44 rounded-full p-1 bg-gradient-to-tr from-primary via-purple-500 to-emerald-400 shadow-[0_0_40px_rgba(255,107,0,0.3)]">
                  <div className="w-full h-full rounded-full overflow-hidden border-[6px] border-[#050505] relative z-10 bg-[#111]">
                    <Image
                      src="/portfolio1assests/maheshmain.png"
                      alt="Bakki Mahesh"
                      fill
                      className="object-cover scale-105 hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  {/* Orbital decorative rings */}
                  <div className="absolute inset-[-12px] rounded-full border border-primary/30 animate-[spin_10s_linear_infinite]" />
                  <div className="absolute inset-[-24px] rounded-full border-dashed border-purple-500/20 animate-[spin_15s_linear_infinite_reverse]" />
                </div>

                <div className="flex gap-4 w-full items-stretch">
                  <GlassCard className="border border-primary/20 bg-primary/5 text-left p-4 flex-1">
                    <h4 className="text-[9px] font-mono font-bold tracking-widest text-primary uppercase mb-3 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                      DEVELOPER BIO
                    </h4>
                    <div className="flex flex-col gap-2 text-[10px] font-mono">
                      <div className="flex justify-between border-b border-white/5 pb-1">
                        <span className="text-muted">ROLE:</span>
                        <span className="text-white font-bold">Tech Lead / Cloud</span>
                      </div>
                      <div className="flex justify-between border-b border-white/5 pb-1">
                        <span className="text-muted">CREDENTIALS:</span>
                        <span className="text-white font-bold">AWS Certified</span>
                      </div>
                      <div className="flex justify-between border-b border-white/5 pb-1">
                        <span className="text-muted">PROJECTS:</span>
                        <span className="text-white font-bold">3 Production</span>
                      </div>
                    </div>
                  </GlassCard>

                  <GlassCard className="border border-white/5 bg-[#0C0C0C]/50 text-left p-4 flex-1 flex flex-col justify-between">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-[9px] font-mono font-bold tracking-widest text-success uppercase flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
                        ACTIVE FOCUS
                      </h4>
                      {/* Small AWS badge image */}
                      <div className="relative w-6 h-6 shrink-0">
                        <Image
                          src="/portfolio1assests/aws_cert_img.png"
                          alt="AWS Cert Badge"
                          fill
                          className="object-contain"
                        />
                      </div>
                    </div>
                    <ul className="flex flex-col gap-1 text-[9px] font-mono text-muted">
                      <li>• Manakrishi Platform</li>
                      <li>• VisaEnsure Website</li>
                      <li>• Learning Kubernetes</li>
                      <li>• DevOps Automation</li>
                    </ul>
                  </GlassCard>
                </div>
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
                  Skills (Skill Matrix)
                </h2>
                <p className="text-xs text-muted mb-6 leading-relaxed font-sans">
                  The planetary nodes orbiting the central sun represent components of my technical stack. Click nodes directly in the 3D galaxy to lock orbit and inspect technology logs.
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
                    ALL SKILLS MATRIX
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
                      {cat.name.toUpperCase()} SKILLS
                    </button>
                  ))}
                </div>
              </div>

              {/* Right Side: Skills Matrix Table */}
              <div className="lg:col-span-7 w-full">
                <GlassCard className="p-6 bg-dark/40 border-white/5 text-left overflow-hidden">
                  <h3 className="text-xs font-mono font-bold text-primary uppercase tracking-widest mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    TECHNICAL SKILLS MATRIX
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
                        {(activeSkillCategory === "all" || activeSkillCategory === "cloud") && (
                          <tr className="hover:bg-white/[0.02] transition-colors">
                            <td className="py-3 font-bold text-primary">Cloud</td>
                            <td className="py-3 text-muted">AWS (SAA, CCP), Azure, VPC Private Networking</td>
                          </tr>
                        )}
                        {(activeSkillCategory === "all" || activeSkillCategory === "frontend") && (
                          <tr className="hover:bg-white/[0.02] transition-colors">
                            <td className="py-3 font-bold text-primary">Frontend</td>
                            <td className="py-3 text-muted">React, Next.js, HTML5, CSS3, Tailwind CSS</td>
                          </tr>
                        )}
                        {(activeSkillCategory === "all" || activeSkillCategory === "backend") && (
                          <tr className="hover:bg-white/[0.02] transition-colors">
                            <td className="py-3 font-bold text-primary">Backend</td>
                            <td className="py-3 text-muted">Node.js, Express, WebSockets, Python FastAPI</td>
                          </tr>
                        )}
                        {(activeSkillCategory === "all" || activeSkillCategory === "database") && (
                          <tr className="hover:bg-white/[0.02] transition-colors">
                            <td className="py-3 font-bold text-primary">Database</td>
                            <td className="py-3 text-muted">MongoDB, PostgreSQL, Redis</td>
                          </tr>
                        )}
                        {(activeSkillCategory === "all" || activeSkillCategory === "devops") && (
                          <tr className="hover:bg-white/[0.02] transition-colors">
                            <td className="py-3 font-bold text-primary">DevOps</td>
                            <td className="py-3 text-muted">Docker, GitHub Actions CI/CD</td>
                          </tr>
                        )}
                        {activeSkillCategory === "all" && (
                          <tr className="hover:bg-white/[0.02] transition-colors">
                            <td className="py-3 font-bold text-primary">Tools</td>
                            <td className="py-3 text-muted">Git, Linux Administration, Postman, VS Code</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </GlassCard>
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
                      activeProject % 4 === 0 ? "border-[#4ade80]/20 shadow-[0_0_25px_rgba(74,222,128,0.08)]" :
                      activeProject % 4 === 1 ? "border-[#38bdf8]/20 shadow-[0_0_25px_rgba(56,189,248,0.08)]" :
                      activeProject % 4 === 2 ? "border-[#ea580c]/20 shadow-[0_0_25px_rgba(234,88,12,0.08)]" :
                      "border-[#d946ef]/20 shadow-[0_0_25px_rgba(217,70,239,0.08)]"
                    }`}>
                      {/* Top Header: ID & Indicator */}
                      <div className="flex justify-between items-center mb-4">
                        <span className={`text-[10px] font-mono tracking-widest font-bold ${
                          activeProject % 4 === 0 ? "text-[#4ade80]" :
                          activeProject % 4 === 1 ? "text-[#38bdf8]" :
                          activeProject % 4 === 2 ? "text-[#ea580c]" :
                          "text-[#d946ef]"
                        }`}>
                          0{activeProject + 1} / {String(projects.length).padStart(2, "0")} · PROJECT HUB
                        </span>
                        <div className="flex items-center gap-1.5">
                          <span className={`w-2 h-2 rounded-full animate-pulse ${
                            activeProject % 4 === 0 ? "bg-[#4ade80]" :
                            activeProject % 4 === 1 ? "bg-[#38bdf8]" :
                            activeProject % 4 === 2 ? "bg-[#ea580c]" :
                            "bg-[#d946ef]"
                          }`} />
                          <span className="text-[7px] font-mono text-muted uppercase tracking-wider">Active Lock</span>
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="text-2xl md:text-3xl font-space font-bold text-white mb-2 leading-tight">
                        {projects[activeProject].title}
                      </h3>
                      
                      {/* Short Description */}
                      <p className="text-xs text-muted leading-relaxed font-sans mb-5 font-light">
                        {projects[activeProject].description}
                      </p>

                      {/* Tech stack */}
                      <div className="flex flex-wrap gap-1.5 mb-6">
                        {projects[activeProject].tech.map((t) => (
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
                            activeProject % 4 === 0 ? "bg-[#4ade80]/10 hover:bg-[#4ade80] border border-[#4ade80]/30 shadow-[0_0_15px_rgba(74,222,128,0.15)]" :
                            activeProject % 4 === 1 ? "bg-[#38bdf8]/10 hover:bg-[#38bdf8] border border-[#38bdf8]/30 shadow-[0_0_15px_rgba(56,189,248,0.15)]" :
                            activeProject % 4 === 2 ? "bg-[#ea580c]/10 hover:bg-[#ea580c] border border-[#ea580c]/30 shadow-[0_0_15px_rgba(234,88,12,0.15)]" :
                            "bg-[#d946ef]/10 hover:bg-[#d946ef] border border-[#d946ef]/30 shadow-[0_0_15px_rgba(217,70,239,0.15)]"
                          }`}
                        >
                          Explore Case Study
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                        <Link
                          href="/projects"
                          className="w-full py-2.5 rounded-xl border border-white/10 hover:border-primary/50 bg-white/[0.02] hover:bg-primary/5 transition-all text-xs font-mono font-bold text-muted hover:text-white flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(255,107,0,0.02)] hover:shadow-[0_0_20px_rgba(255,107,0,0.08)] pointer-events-auto"
                        >
                          View All Projects
                          <ArrowUpRight className="w-3.5 h-3.5 text-primary" />
                        </Link>
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
                  Scroll to navigate projects. Click a node to view its detailed architectural case study.
                </div>

                {/* Progress Indicators */}
                <div className="flex flex-row md:flex-col gap-3 font-mono text-[10px]">
                  {projects.map((proj, idx) => (
                    <div 
                      key={proj.id} 
                      onClick={() => {
                        const start = 0.28;
                        const range = 0.36;
                        const progress = start + (idx / (projects.length - 1)) * range * 0.99;
                        const targetScroll = progress * (document.documentElement.scrollHeight - window.innerHeight);
                        window.scrollTo({ top: targetScroll, behavior: "smooth" });
                      }}
                      className="flex items-center gap-2 cursor-pointer transition-all duration-200"
                    >
                      <span className={`hidden md:inline ${activeProject === idx ? "text-white font-bold" : "text-muted"}`}>
                        {proj.title.split(" (")[0].split(" ")[0]}
                      </span>
                      <span className={`w-2 h-2 rounded-full border transition-all ${
                        activeProject === idx ? (
                          idx % 4 === 0 ? "bg-[#4ade80] border-[#4ade80] scale-125 shadow-[0_0_8px_#4ade80]" :
                          idx % 4 === 1 ? "bg-[#38bdf8] border-[#38bdf8] scale-125 shadow-[0_0_8px_#38bdf8]" :
                          idx % 4 === 2 ? "bg-[#ea580c] border-[#ea580c] scale-125 shadow-[0_0_8px_#ea580c]" :
                          "bg-[#d946ef] border-[#d946ef] scale-125 shadow-[0_0_8px_#d946ef]"
                        ) : "bg-transparent border-white/20"
                      }`} />
                    </div>
                  ))}
                </div>

                {/* View All Projects Shortcut */}
                <Link
                  href="/projects"
                  className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-white/10 hover:border-primary/50 bg-black/40 text-[10px] font-mono text-muted hover:text-white transition-all cursor-pointer shadow-[0_0_12px_rgba(255,107,0,0.05)] hover:shadow-[0_0_18px_rgba(255,107,0,0.15)] self-start md:self-end pointer-events-auto"
                >
                  View All Projects (8 Projects)
                  <ArrowUpRight className="w-3.5 h-3.5 text-primary" />
                </Link>
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
                  Experience (Command Center)
                </h2>
                <p className="text-xs text-muted mb-6 leading-relaxed font-sans">
                  The nodes inside the timeline represent my professional achievements. Toggle view modes below to examine detailed career specifications.
                </p>

                {experienceViewMode === "pipeline" ? (
                  <div className="flex flex-col gap-4 max-h-[380px] overflow-y-auto pr-2">
                    {experiences.map((exp) => (
                      <GlassCard key={exp.id} className="p-4 bg-dark/40 border-white/5">
                        <div className="flex justify-between items-start flex-wrap gap-2 mb-2">
                          <div>
                            <span className="text-[8px] font-mono text-primary uppercase block mb-1">
                              Timeline Node: #{exp.id.substring(0, 6).toUpperCase()} ({exp.period})
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
                          <Settings className="w-3 h-3" />
                          {logsExpandedNode === exp.id ? "Close Console Diagnostics" : "Open Console Diagnostics"}
                        </button>
                        
                        {/* Shell diagnostic window overlay inline */}
                        {logsExpandedNode === exp.id && (
                          <div className="mt-3 rounded-lg border border-white/5 bg-black/80 font-mono text-[9px] text-left overflow-hidden">
                            <div className="bg-[#141414] border-b border-white/5 px-3 py-1 flex items-center justify-between text-muted">
                              <span>diagnostics.sh</span>
                              <span className="text-[7px] bg-primary/10 text-primary px-1 rounded">LIVE</span>
                            </div>
                            <div className="p-3 max-h-32 overflow-y-auto flex flex-col gap-1 text-muted select-all">
                              <div className="text-success">[OK] Loaded profile specs.</div>
                              <div>[SYS] FETCH COMP: {exp.company}</div>
                              {exp.skills.map((s) => (
                                <div key={s} className="text-primary/70">{`[DEP] Integrated module: ${s}`}</div>
                              ))}
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
                    Timeline View
                  </button>
                  <button
                    onClick={() => setExperienceViewMode("spec")}
                    className={`px-4 py-2 rounded-full text-[9px] font-mono uppercase cursor-pointer ${
                      experienceViewMode === "spec" ? "bg-primary text-white shadow-[0_0_10px_rgba(255,107,0,0.3)]" : "text-muted hover:text-white"
                    }`}
                  >
                    Schema View
                  </button>
                </div>

                <GlassCard className="p-5 border-white/5 bg-dark/40 text-left">
                  <span className="text-[8px] font-mono text-primary uppercase block mb-1">
                    Career Milestones Log
                  </span>
                  <div className="flex flex-col gap-3 mt-4 text-[10px] font-mono">
                    <div className="flex justify-between border-b border-white/5 pb-1">
                      <span className="text-muted">Total Milestones:</span>
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
                  GitHub Stats & Activity
                </h2>
                <p className="text-xs text-muted leading-relaxed font-sans">
                  Commit history & developer activity metrics. Hover cells on the grid below to inspect commit logs.
                </p>
              </div>

              {/* Metrics Stats Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-5xl mb-6">
                <GlassCard className="p-4 flex items-center gap-3 bg-dark/40 border-white/5 text-left">
                  <div className="p-2 rounded-lg bg-primary/10 border border-primary/20 shrink-0">
                    <GitCommit className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <span className="text-[9px] font-mono text-muted uppercase block">Commits</span>
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
                      Commit Stream: @mahesh123-pro
                    </span>
                  </div>
                  <div className="text-[9px] font-mono text-primary bg-primary/5 border border-primary/20 px-3 py-1 rounded min-h-[22px] flex items-center">
                    {hoveredHeatmapCell || "Hover grid cells for details"}
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
                            <label className="text-[9px] font-mono text-muted uppercase">Email Address</label>
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
                          <label className="text-[9px] font-mono text-muted uppercase">Message</label>
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
                          {isSubmitting ? "SENDING MESSAGE..." : "SEND MESSAGE"}
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
                  {/* Screenshot section */}
                  {selectedCaseStudy.image && (
                    <div>
                      <h4 className="text-[9px] font-mono font-bold tracking-wider text-primary uppercase mb-2 flex items-center gap-1">
                        <span className="w-1 h-1 rounded-full bg-primary" /> Screenshot (Actual UI)
                      </h4>
                      <div className="relative w-full h-44 rounded-xl overflow-hidden border border-white/5 bg-dark/40 shadow-lg group hover:scale-[1.01] transition-transform duration-300">
                        <Image
                          src={selectedCaseStudy.image}
                          alt={selectedCaseStudy.title}
                          fill
                          className="object-cover opacity-90"
                          sizes="500px"
                        />
                      </div>
                    </div>
                  )}

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
                    <ProjectArchitectureDiagram projectId={selectedCaseStudy.id} />
                    <ul className="flex flex-col gap-1 mt-2">
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
                      <span className="w-1 h-1 rounded-full bg-primary" /> Key Challenges & Mitigations
                    </h4>
                    <p className="text-muted leading-relaxed bg-white/[0.01] border border-white/5 p-3 rounded-lg">
                      {selectedCaseStudy.caseStudy.challenges}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-[9px] font-mono font-bold tracking-wider text-primary uppercase mb-1.5 flex items-center gap-1">
                      <span className="w-1 h-1 rounded-full bg-primary" /> Outcomes & Results
                    </h4>
                    <p className="text-muted leading-relaxed bg-white/[0.01] border border-white/5 p-3 rounded-lg">
                      {selectedCaseStudy.caseStudy.results}
                    </p>
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
