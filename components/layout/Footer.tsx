"use client";

import { ArrowUp, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon, TwitterIcon, AwsIcon, AzureIcon, GcpIcon } from "../ui/BrandIcons";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-dark/60 border-t border-white/5 py-12 overflow-hidden z-10">
      <div className="absolute inset-0 bg-dot-pattern opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
        {/* Left Side: Brand branding */}
        <div className="text-center md:text-left">
          <div className="text-lg font-space font-bold text-white tracking-widest flex justify-center md:justify-start items-center gap-1.5 mb-2">
            <span className="text-primary">MK</span>
            <span className="text-white/60">COMMAND</span>
          </div>
          <p className="text-[11px] font-mono text-muted max-w-xs leading-relaxed">
            Cloud Solutions & Dynamic Full-Stack Interfaces. Engineered with custom 3D WebGL pipelines.
          </p>
          
          <div className="flex items-center justify-center md:justify-start gap-4 mt-4 text-muted">
            <AwsIcon className="w-5 h-5 hover:text-[#FF9900] transition-colors" />
            <AzureIcon className="w-5 h-5 hover:text-[#0078D4] transition-colors" />
            <GcpIcon className="w-5 h-5 hover:text-[#4285F4] transition-colors" />
          </div>
        </div>

        {/* Center: System log ticker mock */}
        <div className="hidden lg:flex items-center gap-4 bg-white/5 border border-white/5 px-4 py-2 rounded-xl text-[10px] font-mono text-muted">
          <span className="w-1.5 h-1.5 rounded-full bg-success animate-ping" />
          <span>STATUS: OPEN TO GLOBAL OPPORTUNITIES</span>
        </div>

        {/* Right Side: Social & Scroll Top */}
        <div className="flex flex-col items-center md:items-end gap-4">
          {/* Social icons */}
          <div className="flex gap-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-lg border border-white/5 hover:border-primary/50 text-muted hover:text-primary transition-all bg-surface hover:scale-105 active:scale-95 cursor-pointer hover:shadow-[0_0_12px_rgba(255,107,0,0.15)]"
              aria-label="GitHub Link"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-lg border border-white/5 hover:border-primary/50 text-muted hover:text-primary transition-all bg-surface hover:scale-105 active:scale-95 cursor-pointer hover:shadow-[0_0_12px_rgba(255,107,0,0.15)]"
              aria-label="LinkedIn Link"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-lg border border-white/5 hover:border-primary/50 text-muted hover:text-primary transition-all bg-surface hover:scale-105 active:scale-95 cursor-pointer hover:shadow-[0_0_12px_rgba(255,107,0,0.15)]"
              aria-label="Twitter Link"
            >
              <TwitterIcon className="w-4 h-4" />
            </a>
            <a
              href="mailto:mahesh@ece.cloud"
              className="p-2.5 rounded-lg border border-white/5 hover:border-primary/50 text-muted hover:text-primary transition-all bg-surface hover:scale-105 active:scale-95 cursor-pointer hover:shadow-[0_0_12px_rgba(255,107,0,0.15)]"
              aria-label="Email Link"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>

          {/* Copyright and back to top */}
          <div className="flex items-center gap-4 text-[10px] font-mono text-muted">
            <span>© {new Date().getFullYear()} MAHESH. ALL LIGHTS ACTIVE.</span>
            <button
              onClick={scrollToTop}
              className="p-1.5 rounded border border-white/10 hover:border-primary text-muted hover:text-primary transition-colors cursor-pointer"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
