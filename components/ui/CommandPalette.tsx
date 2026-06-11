"use client";

import { useEffect, useState } from "react";
import { Command } from "cmdk";
import { Search, Compass, Download, ShieldCheck, Mail, Sun, Moon, Cpu, FolderGit } from "lucide-react";
import { projects } from "../../content/projects";

export function CommandPalette() {
  const [open, setOpen] = useState(false);

  // Toggle keyboard shortcut listener
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const runCommand = (action: () => void) => {
    action();
    setOpen(false);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const toggleTheme = () => {
    const root = document.documentElement;
    const currentTheme = root.getAttribute("data-theme");
    const nextTheme = currentTheme === "light" ? "dark" : "light";
    root.setAttribute("data-theme", nextTheme);
  };

  return (
    <>
      {/* Trigger floating hint in bottom left */}
      <div 
        onClick={() => setOpen(true)}
        className="fixed bottom-6 left-6 z-[99] hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-dark/60 text-muted hover:text-white hover:border-primary/50 cursor-pointer backdrop-blur-md transition-all select-none hover:shadow-[0_0_15px_rgba(255,107,0,0.2)]"
      >
        <span className="text-[10px] font-mono tracking-wider">COMMAND CENTER</span>
        <kbd className="text-[9px] font-mono bg-white/10 px-1.5 py-0.5 rounded border border-white/10">
          ⌘K
        </kbd>
      </div>

      {open && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-[9999] flex items-center justify-center p-4">
          <div className="w-full max-w-lg rounded-xl border border-white/10 bg-[#0E0E0E]/95 glow-primary overflow-hidden shadow-2xl transition-all duration-300">
            <Command label="Global Command Center" className="w-full">
              {/* Input field with search icon */}
              <div className="flex items-center gap-3 border-b border-white/5 px-4 py-3 bg-white/5">
                <Search className="w-4 h-4 text-primary" />
                <Command.Input
                  autoFocus
                  placeholder="Type a command or search sections..."
                  className="w-full bg-transparent text-sm text-white focus:outline-none placeholder-muted font-mono"
                />
              </div>

              {/* Suggestions List */}
              <Command.List className="max-h-[300px] overflow-y-auto p-2 flex flex-col gap-1">
                <Command.Empty className="text-xs text-muted font-mono p-4 text-center">
                  No execution parameters found.
                </Command.Empty>

                {/* Section Quicklinks */}
                <Command.Group heading="Navigation Nodes" className="text-[10px] font-mono text-primary/60 px-3 py-1.5 uppercase tracking-wider">
                  <Command.Item
                    onSelect={() => runCommand(() => scrollToSection("hero"))}
                    className="flex items-center gap-3 px-3 py-2 text-xs font-mono text-white/80 rounded-lg hover:bg-white/5 cursor-pointer transition-colors"
                  >
                    <Compass className="w-3.5 h-3.5 text-primary" />
                    <span>Jump to Hero Command</span>
                  </Command.Item>
                  <Command.Item
                    onSelect={() => runCommand(() => scrollToSection("about"))}
                    className="flex items-center gap-3 px-3 py-2 text-xs font-mono text-white/80 rounded-lg hover:bg-white/5 cursor-pointer transition-colors"
                  >
                    <Compass className="w-3.5 h-3.5 text-primary" />
                    <span>Jump to About Node</span>
                  </Command.Item>
                  <Command.Item
                    onSelect={() => runCommand(() => scrollToSection("skills"))}
                    className="flex items-center gap-3 px-3 py-2 text-xs font-mono text-white/80 rounded-lg hover:bg-white/5 cursor-pointer transition-colors"
                  >
                    <Cpu className="w-3.5 h-3.5 text-primary" />
                    <span>Jump to Skills Universe</span>
                  </Command.Item>
                  <Command.Item
                    onSelect={() => runCommand(() => scrollToSection("projects"))}
                    className="flex items-center gap-3 px-3 py-2 text-xs font-mono text-white/80 rounded-lg hover:bg-white/5 cursor-pointer transition-colors"
                  >
                    <FolderGit className="w-3.5 h-3.5 text-primary" />
                    <span>Jump to Project Showroom</span>
                  </Command.Item>
                  <Command.Item
                    onSelect={() => runCommand(() => scrollToSection("experience"))}
                    className="flex items-center gap-3 px-3 py-2 text-xs font-mono text-white/80 rounded-lg hover:bg-white/5 cursor-pointer transition-colors"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-primary" />
                    <span>Jump to Experience Pipeline</span>
                  </Command.Item>
                  <Command.Item
                    onSelect={() => runCommand(() => scrollToSection("contact"))}
                    className="flex items-center gap-3 px-3 py-2 text-xs font-mono text-white/80 rounded-lg hover:bg-white/5 cursor-pointer transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5 text-primary" />
                    <span>Jump to Mission Control (Contact)</span>
                  </Command.Item>
                </Command.Group>

                {/* Projects Group */}
                <Command.Group heading="Project Details" className="text-[10px] font-mono text-primary/60 px-3 py-1.5 uppercase tracking-wider border-t border-white/5 mt-2 pt-2">
                  {projects.map((proj) => (
                    <Command.Item
                      key={proj.id}
                      onSelect={() => runCommand(() => scrollToSection(`project-${proj.id}`))}
                      className="flex items-center gap-3 px-3 py-2 text-xs font-mono text-white/80 rounded-lg hover:bg-white/5 cursor-pointer transition-colors"
                    >
                      <FolderGit className="w-3.5 h-3.5 text-muted" />
                      <span>Showcase: {proj.title}</span>
                    </Command.Item>
                  ))}
                </Command.Group>

                {/* System actions */}
                <Command.Group heading="System Protocols" className="text-[10px] font-mono text-primary/60 px-3 py-1.5 uppercase tracking-wider border-t border-white/5 mt-2 pt-2">
                  <Command.Item
                    onSelect={() => runCommand(toggleTheme)}
                    className="flex items-center gap-3 px-3 py-2 text-xs font-mono text-white/80 rounded-lg hover:bg-white/5 cursor-pointer transition-colors"
                  >
                    <Sun className="w-3.5 h-3.5 text-primary block dark:hidden" />
                    <Moon className="w-3.5 h-3.5 text-primary hidden dark:block" />
                    <span>Toggle Light / Dark Interface</span>
                  </Command.Item>
                  <Command.Item
                    onSelect={() => runCommand(() => {
                      const link = document.createElement("a");
                      link.href = "/BakkiMahesh_Resume_2026.pdf";
                      link.download = "BakkiMahesh_Resume_2026.pdf";
                      link.click();
                    })}
                    className="flex items-center gap-3 px-3 py-2 text-xs font-mono text-white/80 rounded-lg hover:bg-white/5 cursor-pointer transition-colors"
                  >
                    <Download className="w-3.5 h-3.5 text-primary" />
                    <span>Download Engineer CV (PDF)</span>
                  </Command.Item>
                </Command.Group>
              </Command.List>
            </Command>

            {/* Bottom help bar */}
            <div className="flex justify-between items-center bg-black/40 border-t border-white/5 px-4 py-2 text-[9px] font-mono text-muted">
              <span>ESC to exit command mode</span>
              <span>Select with Enter</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default CommandPalette;
