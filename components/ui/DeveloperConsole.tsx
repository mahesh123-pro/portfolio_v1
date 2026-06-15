"use client";

import { useEffect, useState, useRef } from "react";
import { Terminal as TerminalIcon, X, Maximize2, Minimize2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { skillsData } from "../../content/skills";
import { projects } from "../../content/projects";

interface ConsoleLog {
  text: string;
  type: "input" | "output" | "error" | "success" | "system";
}

export function DeveloperConsole() {
  const [isOpen, setIsOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [inputVal, setInputVal] = useState("");
  const [logs, setLogs] = useState<ConsoleLog[]>([
    { text: "System Initialized: anti-gravityOS v2.0-stable", type: "system" },
    { text: "Type 'help' to inspect available system parameters.", type: "output" }
  ]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isMatrixActive, setIsMatrixActive] = useState(false);

  const logsEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Toggle console on backtick key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "`" || e.key === "~") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Autofocus input
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  // Scroll to bottom
  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  // Matrix Rain Canvas Simulation
  useEffect(() => {
    if (!isMatrixActive || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    const resizeCanvas = () => {
      canvas.width = canvas.parentElement?.clientWidth || 800;
      canvas.height = canvas.parentElement?.clientHeight || 400;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const katakana = "ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const alphabet = katakana.split("");

    const fontSize = 14;
    const columns = canvas.width / fontSize;

    const rainDrops: number[] = [];
    for (let x = 0; x < columns; x++) {
      rainDrops[x] = 1;
    }

    const draw = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#FF6B00"; // Orange themed matrix rain!
      ctx.font = fontSize + "px monospace";

      for (let i = 0; i < rainDrops.length; i++) {
        const text = alphabet[Math.floor(Math.random() * alphabet.length)];
        ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize);

        if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          rainDrops[i] = 0;
        }
        rainDrops[i]++;
      }
    };

    const runLoop = () => {
      draw();
      animationFrameId = requestAnimationFrame(runLoop);
    };

    runLoop();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [isMatrixActive]);

  const executeCommand = async (commandStr: string) => {
    const trimmed = commandStr.trim();
    if (!trimmed) return;

    const newLogs = [...logs, { text: `[root@mahesh-node ~]# ${trimmed}`, type: "input" as const }];
    setLogs(newLogs);
    setCommandHistory((prev) => [trimmed, ...prev.filter((h) => h !== trimmed)]);
    setHistoryIndex(-1);
    setInputVal("");

    const parts = trimmed.split(" ");
    const command = parts[0].toLowerCase();
    const args = parts.slice(1);

    switch (command) {
      case "help":
        setLogs((prev) => [
          ...prev,
          { text: "Available parameters:", type: "output" },
          { text: "  neofetch      Display retro systems diagnostics & telemetry specs.", type: "output" },
          { text: "  skills        List developer skill matrices & proficiencies.", type: "output" },
          { text: "  projects      Inspect project repository indexes.", type: "output" },
          { text: "  project <id>  Run simulated build & deploy checks on a project node.", type: "output" },
          { text: "  matrix        Activate visual holographic matrix stream interface.", type: "output" },
          { text: "  hack          Trigger mock automated security decrypt sequence.", type: "output" },
          { text: "  contact       Inspect coordinate log data (Email, GitHub, LinkedIn).", type: "output" },
          { text: "  clear         Clear current screen parameters.", type: "output" },
          { text: "  close         Deactivate system console overlay.", type: "output" }
        ]);
        break;

      case "clear":
        setLogs([]);
        setIsMatrixActive(false);
        break;

      case "close":
        setIsOpen(false);
        setIsMatrixActive(false);
        break;

      case "neofetch":
        setLogs((prev) => [
          ...prev,
          {
            text: `
   .::::::::::::::::.       OS: anti-gravityOS v2.0.0-stable
  .::   ::::::::   ::.      Kernel: NextJS 16.2.9 Node Core
 .::   ::      ::   ::.     Uptime: Active session synced
.::   ::        ::   ::.    Shell: zsh-portfolio v2
.::   ::   ::   ::   ::.    Resolution: WebGL Canvas 3D
 .::   ::  ::  ::   ::.     Processor: Mahesh Core v9 (ECE)
  .::   ::::::::   ::.      Memory: 16 GB Web Cache
   .::::::::::::::::.       Credentials: AWS SAA & CCP Certified
`,
            type: "success"
          }
        ]);
        break;

      case "skills":
        const skillOutputs: ConsoleLog[] = [];
        skillsData.forEach((category) => {
          skillOutputs.push({ text: `--- ${category.name.toUpperCase()} MATRIX ---`, type: "system" });
          category.skills.forEach((s) => {
            const barLength = 10;
            const filled = Math.round((s.proficiency / 100) * barLength);
            const empty = barLength - filled;
            const bar = "■".repeat(filled) + "□".repeat(empty);
            skillOutputs.push({
              text: `  ${s.name.padEnd(20)} [${bar}] ${s.proficiency}%`,
              type: "output"
            });
          });
        });
        setLogs((prev) => [...prev, ...skillOutputs]);
        break;

      case "projects":
        setLogs((prev) => [
          ...prev,
          { text: "Index of active project nodes:", type: "system" },
          ...projects.map((p) => ({
            text: `  - ${p.id.padEnd(16)}: ${p.title} (${p.tech.slice(0, 3).join(", ")})`,
            type: "output" as const
          }))
        ]);
        break;

      case "project":
        const targetId = args[0];
        if (!targetId) {
          setLogs((prev) => [...prev, { text: "Error: Please specify project node ID (e.g. 'project visaensure')", type: "error" }]);
          break;
        }
        const proj = projects.find((p) => p.id === targetId);
        if (!proj) {
          setLogs((prev) => [...prev, { text: `Error: Project node '${targetId}' not found. Type 'projects' to list.`, type: "error" }]);
          break;
        }

        // Run mock deployment animation
        setLogs((prev) => [...prev, { text: `Connecting payload to [${proj.title}]...`, type: "system" }]);
        await sleep(600);
        setLogs((prev) => [...prev, { text: "Fetching repository branch: 'main'...", type: "output" }]);
        await sleep(500);
        setLogs((prev) => [...prev, { text: "Checking lock dependency integrity...", type: "output" }]);
        await sleep(700);
        setLogs((prev) => [...prev, { text: "Executing test suite: npm run test...", type: "output" }]);
        await sleep(800);
        setLogs((prev) => [
          ...prev,
          { text: "  ✔ Unit tests passed: 42/42", type: "success" },
          { text: "  ✔ Integration tests passed: 18/18", type: "success" },
          { text: "Compiling bundle structure with dynamic minification...", type: "output" }
        ]);
        await sleep(600);
        setLogs((prev) => [...prev, { text: `Pushing assets to AWS secure bucket: ${proj.liveUrl}`, type: "output" }]);
        await sleep(600);
        setLogs((prev) => [
          ...prev,
          { text: "Deploy complete. System Status: ACTIVE", type: "success" },
          { text: `Metrics telemetry check: ${proj.metric}`, type: "success" }
        ]);
        break;

      case "matrix":
        setIsMatrixActive((prev) => !prev);
        setLogs((prev) => [
          ...prev,
          { text: `Matrix display simulation toggled.`, type: "success" }
        ]);
        break;

      case "hack":
        setLogs((prev) => [...prev, { text: "Launching firewall bypass protocol...", type: "error" }]);
        await sleep(500);
        setLogs((prev) => [...prev, { text: "Locating mainframe gateway node...", type: "output" }]);
        await sleep(600);
        setLogs((prev) => [...prev, { text: "Intercepting handshake protocols [IP: 192.168.0.254]...", type: "output" }]);
        await sleep(700);
        setLogs((prev) => [...prev, { text: "Bypassing biometric authorization structures...", type: "error" }]);
        await sleep(500);
        setLogs((prev) => [
          ...prev,
          { text: "Decryption seed matching: 0x8F3D... SUCCESS", type: "success" },
          { text: "ACCESS GRANTED. Core system metrics synchronized.", type: "success" }
        ]);
        break;

      case "contact":
        setLogs((prev) => [
          ...prev,
          { text: "--- COORDINATES TELEMETRY LOGS ---", type: "system" },
          { text: "  Email:     mahesh@ece.cloud", type: "output" },
          { text: "  GitHub:    https://github.com/mahesh123-pro", type: "output" },
          { text: "  LinkedIn:  https://linkedin.com/in/mahesh-ece", type: "output" }
        ]);
        break;

      default:
        setLogs((prev) => [
          ...prev,
          { text: `Error: Protocol parameter '${command}' not recognized. Type 'help' to review guidelines.`, type: "error" }
        ]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      executeCommand(inputVal);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length === 0) return;
      const nextIdx = historyIndex + 1;
      if (nextIdx < commandHistory.length) {
        setHistoryIndex(nextIdx);
        setInputVal(commandHistory[nextIdx]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const nextIdx = historyIndex - 1;
      if (nextIdx >= 0) {
        setHistoryIndex(nextIdx);
        setInputVal(commandHistory[nextIdx]);
      } else {
        setHistoryIndex(-1);
        setInputVal("");
      }
    }
  };

  const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  return (
    <>
      {/* Floating terminal trigger button in bottom right corner */}
      <div
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-[99] flex items-center justify-center p-3 rounded-full border border-white/10 bg-dark/60 text-muted hover:text-white hover:border-primary/50 cursor-pointer backdrop-blur-md transition-all select-none hover:shadow-[0_0_15px_rgba(255,107,0,0.3)] hover:scale-105"
        title="Open Developer Console ( ` )"
      >
        <TerminalIcon className="w-5 h-5 text-primary" />
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className={`fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md`}
          >
            <div
              className={`relative bg-[#080808]/95 border border-primary/20 rounded-xl overflow-hidden shadow-2xl flex flex-col font-mono text-xs transition-all duration-300 ${
                isFullscreen ? "w-full h-full" : "w-full max-w-3xl h-[500px]"
              }`}
            >
              {/* Matrix Canvas Element */}
              {isMatrixActive && (
                <canvas
                  ref={canvasRef}
                  className="absolute inset-0 z-0 pointer-events-none opacity-40"
                />
              )}

              {/* Console Header Bar */}
              <div className="relative z-10 flex justify-between items-center bg-white/5 px-4 py-2.5 border-b border-white/5 select-none">
                <div className="flex items-center gap-2">
                  <TerminalIcon className="w-4 h-4 text-primary animate-pulse" />
                  <span className="font-bold text-white tracking-wide">developer_telemetry_console</span>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setIsFullscreen(!isFullscreen)}
                    className="text-muted hover:text-white transition-colors cursor-pointer"
                  >
                    {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-muted hover:text-primary transition-colors cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Scrollable logs body */}
              <div className="relative z-10 flex-1 p-4 overflow-y-auto flex flex-col gap-1.5 scrollbar-thin scrollbar-thumb-primary">
                {logs.map((log, idx) => (
                  <pre
                    key={idx}
                    className={`whitespace-pre-wrap ${
                      log.type === "input" ? "text-white font-bold" :
                      log.type === "error" ? "text-red-500" :
                      log.type === "success" ? "text-green-400 font-bold" :
                      log.type === "system" ? "text-primary font-bold" : "text-white/70"
                    }`}
                  >
                    {log.text}
                  </pre>
                ))}
                <div ref={logsEndRef} />
              </div>

              {/* Terminal command input footer */}
              <div className="relative z-10 bg-white/5 border-t border-white/5 px-4 py-3 flex items-center gap-2">
                <span className="text-primary font-bold">[root@mahesh-node ~]#</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1 bg-transparent border-none outline-none text-white font-mono focus:ring-0"
                  placeholder="Type a parameter (e.g. 'help', 'neofetch')..."
                  autoFocus
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default DeveloperConsole;
