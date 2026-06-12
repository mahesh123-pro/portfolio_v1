"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { GitBranch, GitCommit, GitPullRequest, Folder, Star, Eye, ArrowUpRight, Code2 } from "lucide-react";
import { TiltCard } from "../ui/TiltCard";

interface RepoDetails {
  name: string;
  desc: string;
  lang: string;
  langColor: string;
  stars: number;
  forks: number;
  url: string;
}

const mockRepos: RepoDetails[] = [
  {
    name: "manakrishi-telemetry",
    desc: "Real-time WebSocket server and data processing gateway connecting drone transponders to operator displays with <80ms delay.",
    lang: "TypeScript",
    langColor: "bg-[#3178c6]",
    stars: 34,
    forks: 8,
    url: "https://github.com/mahesh123-pro/manakrishi-telemetry"
  },
  {
    name: "aws-3tier-vpc",
    desc: "Production-ready VPC infrastructure layout provisioning separate subnets, security locks, and Application Load Balancer nodes.",
    lang: "HCL / Terraform",
    langColor: "bg-[#7B42BC]",
    stars: 28,
    forks: 12,
    url: "https://github.com/mahesh123-pro/aws-3tier-vpc"
  },
  {
    name: "6s-greentech-gateway",
    desc: "Agri-tech edge client processing multi-sensor stream uploads and classifying plant diagnostic metrics via FastAPI backends.",
    lang: "Python",
    langColor: "bg-[#3572A5]",
    stars: 21,
    forks: 5,
    url: "https://github.com/mahesh123-pro/6s-greentech"
  }
];

// Generate mock contribution cells for calendar (53 weeks * 7 days = 371 cells)
// We will assign random contribution levels (0 to 4) to cells to match real patterns
const generateMockContributions = () => {
  const cells = [];
  const levels = [0, 0, 0, 1, 1, 1, 2, 2, 3, 4]; // weights for natural distribution
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  
  // Total 371 cells
  for (let i = 0; i < 371; i++) {
    const level = levels[Math.floor(Math.random() * levels.length)];
    // Assign a date starting from 370 days ago
    const date = new Date();
    date.setDate(date.getDate() - (370 - i));
    const formattedDate = `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
    const commitCount = level === 0 ? "No" : level * 2 + Math.floor(Math.random() * 2);
    
    cells.push({
      id: i,
      level,
      tooltip: `${commitCount} contributions on ${formattedDate}`
    });
  }
  return cells;
};

export function GitHubDashboard() {
  const [contributions] = useState(generateMockContributions);
  const [hoveredCell, setHoveredCell] = useState<string | null>(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const getCellBg = (level: number) => {
    switch (level) {
      case 1:
        return "bg-green-950/70 border border-green-900/30";
      case 2:
        return "bg-green-800/80 border border-green-700/30";
      case 3:
        return "bg-green-600/90 border border-green-500/30";
      case 4:
        return "bg-emerald-400 border border-emerald-300/30 shadow-[0_0_10px_rgba(52,211,153,0.3)]";
      default:
        return "bg-neutral-900/50 border border-white/[0.02]";
    }
  };

  return (
    <section
      id="github"
      ref={sectionRef}
      className="relative min-h-screen py-24 flex items-center bg-dark overflow-hidden"
    >
      <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />
      <div className="absolute inset-0 bg-dot-pattern opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
        
        {/* Header Block */}
        <div className="flex flex-col items-start mb-16 text-left">
          <h2 className="text-3xl md:text-5xl font-bold font-space text-white tracking-tight relative pb-4 inline-block">
            Engineering Verification Hub
            <motion.div
              initial={{ width: 0 }}
              animate={isInView ? { width: "100%" } : {}}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="absolute bottom-0 left-0 h-[3px] bg-primary shadow-[0_0_8px_#FF6B00]"
            />
          </h2>
          <p className="text-xs font-mono text-muted uppercase tracking-widest mt-4">
            GitHub Diagnostics. Live code repositories and continuous commit telemetry feeds.
          </p>
        </div>

        {/* Stats Metrics Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <TiltCard className="p-5 flex items-center gap-4 bg-[#111]/60 border border-white/5 text-left">
            <div className="p-3 rounded-xl bg-primary/10 border border-primary/20 shrink-0">
              <GitCommit className="w-5 h-5 text-primary" />
            </div>
            <div>
              <span className="text-[10px] font-mono text-muted uppercase tracking-wider block">Commits (2025-26)</span>
              <span className="text-2xl font-space font-bold text-white">1,280+</span>
            </div>
          </TiltCard>

          <TiltCard className="p-5 flex items-center gap-4 bg-[#111]/60 border border-white/5 text-left">
            <div className="p-3 rounded-xl bg-[#22c55e]/10 border border-[#22c55e]/20 shrink-0">
              <GitPullRequest className="w-5 h-5 text-[#22c55e]" />
            </div>
            <div>
              <span className="text-[10px] font-mono text-muted uppercase tracking-wider block">PRs Merged</span>
              <span className="text-2xl font-space font-bold text-white">42 Active</span>
            </div>
          </TiltCard>

          <TiltCard className="p-5 flex items-center gap-4 bg-[#eab308]/10 border border-[#eab308]/20 shrink-0 text-left">
            <div className="p-3 rounded-xl bg-[#eab308]/10 border border-[#eab308]/20 shrink-0">
              <Folder className="w-5 h-5 text-[#eab308]" />
            </div>
            <div>
              <span className="text-[10px] font-mono text-muted uppercase tracking-wider block">Repositories</span>
              <span className="text-2xl font-space font-bold text-white">18 Repos</span>
            </div>
          </TiltCard>

          <TiltCard className="p-5 flex items-center gap-4 bg-[#8b5cf6]/10 border border-[#8b5cf6]/20 shrink-0 text-left">
            <div className="p-3 rounded-xl bg-[#8b5cf6]/10 border border-[#8b5cf6]/20 shrink-0">
              <Eye className="w-5 h-5 text-[#8b5cf6]" />
            </div>
            <div>
              <span className="text-[10px] font-mono text-muted uppercase tracking-wider block">Profile Visibility</span>
              <span className="text-2xl font-space font-bold text-white">Public Source</span>
            </div>
          </TiltCard>
        </div>

        {/* Contribution Heatmap Card */}
        <div className="glass-panel p-6 rounded-2xl border border-white/10 bg-[#0C0C0C]/80 shadow-[0_8px_32px_rgba(0,0,0,0.4)] mb-12">
          <div className="flex justify-between items-center mb-4 flex-wrap gap-2 text-left">
            <div className="flex items-center gap-2">
              <Code2 className="w-4 h-4 text-primary" />
              <span className="text-xs font-mono text-white font-bold uppercase tracking-wider">
                Telemetry Commit Stream: @mahesh123-pro
              </span>
            </div>
            {/* Tooltip display */}
            <div className="text-[10px] font-mono text-primary bg-primary/5 border border-primary/20 px-3 py-1 rounded min-h-[24px] flex items-center">
              {hoveredCell || "Hover cells for commit payloads"}
            </div>
          </div>

          {/* Grid Area with Scroll container for small screens */}
          <div className="overflow-x-auto w-full pb-2">
            <div className="min-w-[760px] flex flex-col gap-1.5 select-none">
              {/* Heatmap Grid Grid Layout (7 rows, 53 columns) */}
              <div 
                className="grid grid-flow-col gap-1"
                style={{ gridTemplateRows: "repeat(7, minmax(0, 1fr))", gridTemplateColumns: "repeat(53, minmax(0, 1fr))" }}
              >
                {contributions.map((cell) => (
                  <div
                    key={cell.id}
                    className={`w-[10px] h-[10px] rounded-sm transition-all duration-150 cursor-pointer ${getCellBg(cell.level)} hover:scale-125 hover:shadow-[0_0_8px_rgba(52,211,153,0.5)]`}
                    onMouseEnter={() => setHoveredCell(cell.tooltip)}
                    onMouseLeave={() => setHoveredCell(null)}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Heatmap Legend footer */}
          <div className="flex justify-between items-center mt-4 text-[10px] font-mono text-muted">
            <span>Historical Commits Log (Past 12 Months)</span>
            <div className="flex items-center gap-1.5">
              <span>Less</span>
              <div className="w-[10px] h-[10px] rounded-sm bg-neutral-900/50 border border-white/[0.02]" />
              <div className="w-[10px] h-[10px] rounded-sm bg-green-950/70 border border-green-900/30" />
              <div className="w-[10px] h-[10px] rounded-sm bg-green-800/80 border border-green-700/30" />
              <div className="w-[10px] h-[10px] rounded-sm bg-green-600/90 border border-green-500/30" />
              <div className="w-[10px] h-[10px] rounded-sm bg-emerald-400 border border-emerald-300/30" />
              <span>More</span>
            </div>
          </div>
        </div>

        {/* Featured Open Source Code Repositories */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {mockRepos.map((repo, idx) => (
            <motion.div
              key={repo.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="h-full"
            >
              <TiltCard 
                maxTilt={6}
                glowColor="rgba(255,107,0,0.15)"
                className="h-full flex flex-col justify-between bg-[#111]/80 border border-white/5 p-6 rounded-2xl group hover:border-primary/30 transition-all text-left"
              >
                <div>
                  {/* Repo Header */}
                  <div className="flex justify-between items-center mb-4">
                    <span className="p-2 rounded-xl bg-white/5 border border-white/5 text-muted group-hover:text-primary transition-colors">
                      <GitBranch className="w-4 h-4" />
                    </span>
                    <a
                      href={repo.url}
                      target="_blank"
                      rel="noreferrer"
                      className="p-1.5 rounded-lg border border-white/5 bg-white/5 hover:bg-primary/20 hover:border-primary/40 text-muted hover:text-white transition-all"
                      title="Inspect Source Code"
                    >
                      <ArrowUpRight className="w-3.5 h-3.5 text-primary" />
                    </a>
                  </div>

                  <h3 className="text-lg font-space font-bold text-white group-hover:text-primary transition-colors block mb-2">
                    {repo.name}
                  </h3>
                  <p className="text-xs text-muted leading-relaxed font-sans mb-6">
                    {repo.desc}
                  </p>
                </div>

                {/* Repo Meta specs */}
                <div className="flex items-center gap-4 text-[10px] font-mono text-muted border-t border-white/5 pt-4">
                  <div className="flex items-center gap-1.5">
                    <span className={`w-2.5 h-2.5 rounded-full ${repo.langColor}`} />
                    <span>{repo.lang}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                    <span>{repo.stars}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <GitPullRequest className="w-3.5 h-3.5 text-success" />
                    <span>{repo.forks}</span>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
        
      </div>
    </section>
  );
}

export default GitHubDashboard;
