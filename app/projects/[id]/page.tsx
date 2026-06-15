"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { ArrowLeft, ExternalLink, GitBranch, Terminal, ShieldAlert, Cpu, HardDrive, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "../../../content/projects";

interface LogLine {
  text: string;
  type: "input" | "output" | "success" | "error" | "system";
}

export default function ProjectCaseStudy() {
  const { id } = useParams();
  const router = useRouter();
  const [terminalLogs, setTerminalLogs] = useState<LogLine[]>([
    { text: "Simulated Deployment Telemetry Node Initialized.", type: "system" },
    { text: "Ready to run protocols. Click a command trigger below to begin.", type: "output" }
  ]);
  const [isSimulating, setIsSimulating] = useState(false);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  const proj = projects.find((p) => p.id === id);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [terminalLogs]);

  if (!proj) {
    return (
      <div className="min-h-screen w-full bg-[#050505] text-white flex flex-col items-center justify-center text-center px-6">
        <h2 className="text-2xl font-space font-bold text-primary mb-2">404: BLUEPRINT NOT FOUND</h2>
        <p className="text-xs font-mono text-muted mb-6">The blueprint reference you requested is not loaded in this node.</p>
        <button
          onClick={() => router.push("/projects")}
          className="px-5 py-2.5 rounded-xl bg-primary text-xs font-mono font-bold text-white border border-primary hover:bg-transparent hover:text-primary transition-all cursor-pointer"
        >
          Return to showroom
        </button>
      </div>
    );
  }

  const runSimulation = async (action: "build" | "test" | "deploy") => {
    if (isSimulating) return;
    setIsSimulating(true);

    const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

    if (action === "build") {
      setTerminalLogs((prev) => [...prev, { text: "$ npm run build", type: "input" }]);
      await sleep(500);
      setTerminalLogs((prev) => [...prev, { text: ">> Compiling source modules...", type: "output" }]);
      await sleep(700);
      setTerminalLogs((prev) => [...prev, { text: ">> Checking bundle chunk sizes...", type: "output" }]);
      await sleep(600);
      setTerminalLogs((prev) => [
        ...prev,
        { text: "   - main.js      [142 kB]  (Dynamic split)", type: "output" },
        { text: "   - vendor.js    [280 kB]  (Compressed dependencies)", type: "output" },
        { text: ">> Bundle configuration validation successful.", type: "success" }
      ]);
      await sleep(500);
      setTerminalLogs((prev) => [...prev, { text: "Build completed. 0 warnings, 0 errors.", type: "success" }]);
    } else if (action === "test") {
      setTerminalLogs((prev) => [...prev, { text: "$ npm run test", type: "input" }]);
      await sleep(400);
      setTerminalLogs((prev) => [...prev, { text: ">> Instantiating unit test runner...", type: "output" }]);
      await sleep(600);
      setTerminalLogs((prev) => [...prev, { text: ">> Resolving assertion modules...", type: "output" }]);
      await sleep(500);
      setTerminalLogs((prev) => [
        ...prev,
        { text: "   ✔ PASS: test/schema_validation.spec.ts", type: "success" },
        { text: "   ✔ PASS: test/api_endpoints.spec.ts", type: "success" },
        { text: "   ✔ PASS: test/integration_telemetry.spec.ts", type: "success" }
      ]);
      await sleep(400);
      setTerminalLogs((prev) => [...prev, { text: "Test summary: 34 passed, 0 failed. Uptime stable.", type: "success" }]);
    } else if (action === "deploy") {
      setTerminalLogs((prev) => [...prev, { text: "$ deploy --target=production", type: "input" }]);
      await sleep(500);
      setTerminalLogs((prev) => [...prev, { text: ">> Syncing config files with cloud clusters...", type: "output" }]);
      await sleep(600);
      setTerminalLogs((prev) => [...prev, { text: ">> Deploying containers into VPC subnets...", type: "output" }]);
      await sleep(800);
      setTerminalLogs((prev) => [
        ...prev,
        { text: ">> Setting up Application Load Balancer routes...", type: "output" },
        { text: ">> Running staging verification tests...", type: "output" }
      ]);
      await sleep(600);
      setTerminalLogs((prev) => [
        ...prev,
        { text: "   ✔ Verified: Route status codes return 200", type: "success" },
        { text: "   ✔ Verified: Database connectivity verified", type: "success" },
        { text: `System live at: ${proj.liveUrl}`, type: "success" }
      ]);
    }

    setIsSimulating(false);
  };

  return (
    <div className="min-h-screen w-full bg-[#050505] text-white pt-28 pb-16 relative">
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 relative z-10 text-left">
        {/* Navigation row */}
        <button
          onClick={() => router.push("/projects")}
          className="group flex items-center gap-2 text-xs font-mono text-muted hover:text-white transition-colors mb-8 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          BACK TO SHOWROOM
        </button>

        {/* Top Header metrics */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-3 text-[10px] font-mono text-primary mb-3">
              <span className="px-2 py-0.5 bg-primary/10 border border-primary/20 rounded uppercase font-bold">
                {proj.category}
              </span>
              <span className="flex items-center gap-1">
                <GitBranch className="w-3.5 h-3.5" />
                ref/branch/main
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold font-space text-white leading-tight">
              {proj.title}
            </h1>
          </div>

          <div className="flex flex-wrap gap-3 shrink-0">
            <a
              href={proj.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/10 hover:border-primary text-xs font-mono text-muted hover:text-white transition-colors bg-[#111]/40"
            >
              GitHub Source
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <a
              href={proj.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-xs font-mono font-bold text-white border border-primary hover:bg-transparent hover:text-primary transition-all cursor-pointer shadow-[0_0_15px_rgba(255,107,0,0.2)]"
            >
              Launch Platform
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Problem and Solution Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="p-6 rounded-2xl border border-white/5 bg-[#111]/25 backdrop-blur-md">
            <h3 className="text-xs font-mono text-red-400 font-bold uppercase tracking-wider mb-3 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-red-400" />
              Operational Challenge
            </h3>
            <p className="text-sm text-muted leading-relaxed font-sans">
              {proj.caseStudy.problem}
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-primary/20 bg-primary/5 backdrop-blur-md shadow-[0_0_20px_rgba(255,107,0,0.02)]">
            <h3 className="text-xs font-mono text-primary font-bold uppercase tracking-wider mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-primary" />
              Engineered Response
            </h3>
            <p className="text-sm text-muted leading-relaxed font-sans">
              {proj.caseStudy.solution}
            </p>
          </div>
        </div>

        {/* Key Metrics Dashboard */}
        <div className="mb-12">
          <h3 className="text-xs font-mono text-primary font-bold uppercase tracking-wider mb-6">
            // TELEMETRY IMPACT METRICS
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {proj.caseStudy.metrics.map((metricStr, idx) => {
              const parts = metricStr.split(" via ");
              const main = parts[0];
              const desc = parts[1] || "";
              return (
                <div key={idx} className="p-5 rounded-xl border border-white/5 bg-[#111]/15 text-center">
                  <div className="text-lg md:text-xl font-space font-bold text-white mb-2">
                    {main}
                  </div>
                  {desc && (
                    <div className="text-[10px] font-mono text-muted uppercase">
                      via {desc}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Dynamic Interactive SVG System Blueprint Map */}
        <div className="mb-12">
          <h3 className="text-xs font-mono text-primary font-bold uppercase tracking-wider mb-6">
            // ARCHITECTURE SCHEMATIC LAYOUT
          </h3>
          <div className="p-8 rounded-2xl border border-white/5 bg-[#090909] overflow-hidden flex flex-col md:flex-row items-center justify-around gap-8 relative">
            <div className="absolute inset-0 bg-dot-pattern opacity-10 pointer-events-none" />

            {/* Render dynamic nodes representation */}
            <div className="flex flex-col items-center gap-2 z-10">
              <div className="p-3.5 rounded-xl border border-white/10 bg-[#141414] shadow-lg flex items-center justify-center">
                <Cpu className="w-6 h-6 text-primary animate-pulse" />
              </div>
              <span className="text-[10px] font-mono text-white/80">Edge Client Ingress</span>
            </div>

            <div className="h-0.5 w-16 bg-gradient-to-right from-primary to-transparent hidden md:block" />

            <div className="flex flex-col items-center gap-2 z-10">
              <div className="p-3.5 rounded-xl border border-primary/20 bg-primary/5 shadow-[0_0_15px_rgba(255,107,0,0.1)] flex items-center justify-center">
                <Terminal className="w-6 h-6 text-primary" />
              </div>
              <span className="text-[10px] font-mono text-primary font-bold">ALB Controller</span>
            </div>

            <div className="h-0.5 w-16 bg-gradient-to-right from-transparent to-white/10 hidden md:block" />

            <div className="flex flex-col items-center gap-2 z-10">
              <div className="p-3.5 rounded-xl border border-white/10 bg-[#141414] shadow-lg flex items-center justify-center">
                <HardDrive className="w-6 h-6 text-muted" />
              </div>
              <span className="text-[10px] font-mono text-white/80">Database Cluster</span>
            </div>
          </div>

          {/* Descriptive bullet points for architecture */}
          <ul className="mt-4 flex flex-col gap-2 font-mono text-[10px] text-muted">
            {proj.caseStudy.architecture.map((arch, i) => (
              <li key={i} className="flex gap-2">
                <span className="text-primary">▶</span>
                <span>{arch}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Project Specific Pipeline CLI Simulator */}
        <div className="mb-12">
          <h3 className="text-xs font-mono text-primary font-bold uppercase tracking-wider mb-6">
            // LIVE PIPELINE TELEMETRY SIMULATOR
          </h3>
          <div className="rounded-2xl border border-primary/20 bg-black/85 glow-primary overflow-hidden shadow-2xl flex flex-col font-mono text-xs">
            {/* Terminal Header */}
            <div className="bg-white/5 border-b border-white/5 px-4 py-2.5 flex justify-between items-center text-muted">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-primary animate-pulse" />
                <span className="text-[10px] font-bold text-white">{proj.id}_pipeline_simulator.sh</span>
              </div>
              <span className="text-[8px] bg-primary/10 text-primary px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">
                READY
              </span>
            </div>

            {/* Terminal Body */}
            <div className="p-4 h-64 overflow-y-auto flex flex-col gap-1.5 scrollbar-thin scrollbar-thumb-primary/50 text-left bg-black/70">
              {terminalLogs.map((log, index) => (
                <pre
                  key={index}
                  className={`whitespace-pre-wrap ${
                    log.type === "input" ? "text-white font-bold" :
                    log.type === "error" ? "text-red-500" :
                    log.type === "success" ? "text-green-400 font-bold" :
                    log.type === "system" ? "text-primary font-bold" : "text-white/60"
                  }`}
                >
                  {log.text}
                </pre>
              ))}
              <div ref={terminalEndRef} />
            </div>

            {/* Terminal Control Actions Footer */}
            <div className="bg-white/5 border-t border-white/5 px-4 py-3 flex flex-wrap gap-2.5 items-center justify-between">
              <div className="text-[9px] text-muted">Execute target verification scripts:</div>
              <div className="flex gap-2">
                <button
                  onClick={() => runSimulation("build")}
                  disabled={isSimulating}
                  className="px-3 py-1.5 rounded bg-white/5 hover:bg-white/10 text-[9px] font-bold text-white border border-white/10 hover:border-white/20 transition-all disabled:opacity-50 cursor-pointer"
                >
                  RUN BUILD
                </button>
                <button
                  onClick={() => runSimulation("test")}
                  disabled={isSimulating}
                  className="px-3 py-1.5 rounded bg-white/5 hover:bg-white/10 text-[9px] font-bold text-white border border-white/10 hover:border-white/20 transition-all disabled:opacity-50 cursor-pointer"
                >
                  RUN TESTS
                </button>
                <button
                  onClick={() => runSimulation("deploy")}
                  disabled={isSimulating}
                  className="px-3 py-1.5 rounded bg-primary/10 hover:bg-primary/20 text-[9px] font-bold text-primary border border-primary/20 hover:border-primary/30 transition-all disabled:opacity-50 cursor-pointer"
                >
                  TRIGGER DEPLOY
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Contribution Details */}
        <div className="p-6 rounded-2xl border border-white/5 bg-[#111]/10">
          <h4 className="text-xs font-mono text-primary font-bold uppercase tracking-wider mb-3">
            Core Development Contribution
          </h4>
          <p className="text-sm text-muted leading-relaxed font-sans">
            {proj.caseStudy.myContribution}
          </p>
        </div>
      </div>
    </div>
  );
}
