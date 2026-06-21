"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { Award, Code2, Globe, HeartHandshake, ShieldAlert, Cpu, Download } from "lucide-react";
import { TiltCard } from "../ui/TiltCard";

interface CounterProps {
  value: number;
  suffix?: string;
}

// Custom lightweight scroll-triggered count-up component
function CountUp({ value, suffix = "" }: CounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      const duration = 1500;
      const startTime = performance.now();

      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Easing out quadratic
        const easeProgress = progress * (2 - progress);
        setCount(Math.floor(easeProgress * end));

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setCount(end);
        }
      };

      requestAnimationFrame(animate);
    }
  }, [isInView, value]);

  return (
    <span ref={ref} className="text-5xl md:text-6xl font-black font-space text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-500 drop-shadow-lg group-hover:from-primary group-hover:to-orange-400 transition-all duration-500 relative z-10">
      {count}
      {suffix}
    </span>
  );
}

export function About() {
  const titleRef = useRef(null);
  const isTitleInView = useInView(titleRef, { once: true });

  const whatIBring = [
    {
      icon: <Award className="w-5 h-5 text-primary" />,
      title: "Reliable Architecture",
      desc: "Designing load-balanced server setups and isolated networks that scale automatically and remain resilient.",
    },
    {
      icon: <Cpu className="w-5 h-5 text-primary" />,
      title: "Clean Execution",
      desc: "Writing modular, strongly-typed codebases that are self-documenting and fully testable.",
    },
    {
      icon: <HeartHandshake className="w-5 h-5 text-primary" />,
      title: "Collaborative Focus",
      desc: "Working hand-in-hand with development teams, bridging hardware ECE concepts and cloud operations.",
    },
  ];

  return (
    <section
      id="about"
      className="relative min-h-screen py-28 flex items-center bg-dark overflow-hidden"
    >
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
      <div className="absolute top-40 left-[-10%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-40 right-[-10%] w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
        {/* Title */}
        <div ref={titleRef} className="flex flex-col items-start mb-20">
          <h2 className="text-4xl md:text-6xl font-black font-space tracking-tight relative pb-4 text-transparent bg-clip-text bg-gradient-to-r from-white via-primary/80 to-primary drop-shadow-[0_0_15px_rgba(255,107,0,0.3)]">
            About Me
            <motion.div
              initial={{ width: 0 }}
              animate={isTitleInView ? { width: "100%" } : {}}
              transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
              className="absolute bottom-0 left-0 h-[4px] bg-gradient-to-r from-primary to-transparent shadow-[0_0_15px_#FF6B00] rounded-full"
            />
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Side: Stats cards & visual container */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            {/* Animated Profile image wrapping circles */}
            <div className="relative w-72 h-72 md:w-[400px] md:h-[400px] flex items-center justify-center mb-10 group">
              {/* Outer orbit rings */}
              <div className="absolute inset-0 rounded-full border-2 border-t-primary border-r-primary/30 border-b-transparent border-l-transparent animate-[spin_8s_linear_infinite] scale-110 pointer-events-none shadow-[0_0_30px_rgba(255,107,0,0.2)]" />
              <div className="absolute inset-0 rounded-full border-2 border-b-purple-500 border-l-purple-500/30 border-t-transparent border-r-transparent animate-[spin_12s_linear_infinite_reverse] scale-[1.2] pointer-events-none shadow-[0_0_30px_rgba(168,85,247,0.2)]" />
              
              {/* Orbiting dots */}
              <div className="absolute inset-0 animate-[spin_8s_linear_infinite] scale-110 pointer-events-none">
                <div className="w-4 h-4 bg-primary rounded-full absolute -top-2 left-1/2 -translate-x-1/2 shadow-[0_0_20px_#FF6B00]" />
              </div>
              <div className="absolute inset-0 animate-[spin_12s_linear_infinite_reverse] scale-[1.2] pointer-events-none">
                <div className="w-3 h-3 bg-purple-500 rounded-full absolute -bottom-1.5 left-1/2 -translate-x-1/2 shadow-[0_0_15px_#A855F7]" />
              </div>

              {/* Avatar Frame */}
              <div className="w-full h-full rounded-full overflow-hidden border-[4px] border-dark p-2 bg-gradient-to-br from-primary/20 to-purple-500/20 relative z-10 flex items-center justify-center group-hover:scale-105 transition-transform duration-500 shadow-[0_0_50px_rgba(255,107,0,0.2)]">
                <div className="w-full h-full rounded-full overflow-hidden relative">
                  <Image
                    src="/portfolio1assests/mahesh-about.png"
                    alt="Mahesh Avatar"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 288px, 400px"
                    priority
                  />
                </div>
              </div>
            </div>

            {/* Currently Building Live Badge */}
            <div className="flex items-center gap-3 bg-dark/60 backdrop-blur-xl border border-white/10 px-6 py-3 rounded-full select-none shadow-[0_8px_32px_rgba(0,0,0,0.5)] ring-1 ring-white/5 hover:ring-primary/50 transition-all cursor-default">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-success shadow-[0_0_10px_#00FF00]"></span>
              </span>
              <span className="text-xs font-mono font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 tracking-widest uppercase">
                Currently: <span className="text-white">AWS Architecture & Latency</span>
              </span>
            </div>
          </div>

          {/* Right Side: Copy paragraphs & grid */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            <h3 className="text-2xl md:text-3xl font-space font-bold text-white mb-6 leading-snug">
              Cloud Engineer <span className="text-primary mx-1">•</span> Startup Builder <span className="text-primary mx-1">•</span> Full Stack Dev
            </h3>

            <div className="prose prose-invert max-w-none mb-10">
              <p className="text-lg text-gray-300 font-sans leading-relaxed mb-4">
                I&apos;m <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-400 font-bold text-xl">Bakki Mahesh</span>, a technology enthusiast focused on cloud computing, full-stack development, and building practical software solutions.
              </p>
              <p className="text-lg text-gray-300 font-sans leading-relaxed mb-4">
                Currently working as a Tech Lead at GKLT Global Solutions, where I manage development projects, cloud deployments, and modern web applications.
              </p>
              <p className="text-lg text-gray-300 font-sans leading-relaxed">
                My interests include AWS, DevOps, backend engineering, and creating products that solve real-world problems.
              </p>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 w-full mb-12">
              {/* What I'm Doing Now Section */}
              <div className="w-full p-6 rounded-3xl bg-dark/40 backdrop-blur-md border border-white/10 hover:border-success/30 transition-colors shadow-xl group">
                <h4 className="text-sm font-mono font-bold tracking-widest text-success uppercase mb-5 flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-success animate-pulse shadow-[0_0_10px_#00FF00]" />
                  Active Focus
                </h4>
                <ul className="flex flex-col gap-3.5 text-sm font-mono text-gray-300">
                  <li className="flex items-center gap-3 group-hover:translate-x-1 transition-transform">
                    <span className="text-success text-lg leading-none">✦</span> Building Manakrishi Platform
                  </li>
                  <li className="flex items-center gap-3 group-hover:translate-x-1 transition-transform delay-75">
                    <span className="text-success text-lg leading-none">✦</span> VisaEnsure Deployment
                  </li>
                  <li className="flex items-center gap-3 group-hover:translate-x-1 transition-transform delay-100">
                    <span className="text-success text-lg leading-none">✦</span> AWS Cloud Infrastructure
                  </li>
                  <li className="flex items-center gap-3 group-hover:translate-x-1 transition-transform delay-150">
                    <span className="text-success text-lg leading-none">✦</span> Learning Kubernetes
                  </li>
                </ul>
              </div>

              {/* Developer Specifications / Resume Highlights */}
              <div className="w-full p-6 rounded-3xl bg-primary/5 backdrop-blur-md border border-primary/20 hover:border-primary/40 transition-colors shadow-[0_0_30px_rgba(255,107,0,0.05)] group relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-[40px] rounded-full pointer-events-none" />
                <h4 className="text-sm font-mono font-bold tracking-widest text-primary uppercase mb-5 flex items-center gap-3 relative z-10">
                  <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse shadow-[0_0_10px_#FF6B00]" />
                  Specs & Highlights
                </h4>
                <div className="flex flex-col gap-3.5 text-sm font-mono relative z-10">
                  <div className="flex justify-between items-center border-b border-white/5 pb-2 group-hover:border-white/10 transition-colors">
                    <span className="text-gray-400">STATUS:</span>
                    <span className="text-white font-bold">Tech Lead / ECE</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-white/5 pb-2 group-hover:border-white/10 transition-colors">
                    <span className="text-gray-400">AVAILABILITY:</span>
                    <span className="text-success font-bold">Open for Internships</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-white/5 pb-2 group-hover:border-white/10 transition-colors">
                    <span className="text-gray-400">CREDENTIALS:</span>
                    <span className="text-white font-bold text-right">AWS Certified <span className="text-[10px] text-gray-500 block">(SAA, CCP)</span></span>
                  </div>
                  <div className="flex justify-between items-center pt-1">
                    <span className="text-gray-400">DEPLOYMENTS:</span>
                    <span className="text-white font-bold">5+ Full Stack</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Cards grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full mb-16">
              <TiltCard className="p-6 h-40 flex flex-col items-center justify-center text-center bg-dark/50 backdrop-blur-xl border border-white/10 hover:border-primary/50 group transition-colors shadow-2xl relative overflow-hidden rounded-3xl">
                <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <CountUp value={5} suffix="+" />
                <span className="text-xs font-space font-medium text-gray-400 uppercase mt-4 tracking-widest group-hover:text-white transition-colors relative z-10">Full Stack Apps</span>
              </TiltCard>
              <TiltCard className="p-6 h-40 flex flex-col items-center justify-center text-center bg-dark/50 backdrop-blur-xl border border-white/10 hover:border-purple-500/50 group transition-colors shadow-2xl relative overflow-hidden rounded-3xl">
                <div className="absolute inset-0 bg-gradient-to-t from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <CountUp value={3} suffix="" />
                <span className="text-xs font-space font-medium text-gray-400 uppercase mt-4 tracking-widest group-hover:text-white transition-colors relative z-10">Production Projects</span>
              </TiltCard>
              <TiltCard className="p-6 h-40 flex flex-col items-center justify-center text-center bg-dark/50 backdrop-blur-xl border border-white/10 hover:border-orange-500/50 group transition-colors shadow-2xl relative overflow-hidden rounded-3xl">
                <div className="absolute inset-0 bg-gradient-to-t from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <CountUp value={2} suffix="" />
                <span className="text-xs font-space font-medium text-gray-400 uppercase mt-4 tracking-widest group-hover:text-white transition-colors relative z-10">Startups Launched</span>
              </TiltCard>
            </div>

            {/* What I Bring Section */}
            <h4 className="text-xl md:text-2xl font-space font-bold text-white mb-8 flex items-center gap-4 w-full">
              What I Bring to the Table
              <div className="h-[2px] flex-1 bg-gradient-to-r from-primary/50 via-purple-500/30 to-transparent" />
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
              {whatIBring.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: idx * 0.15 }}
                  className="flex flex-col items-start text-left p-6 rounded-3xl bg-dark/40 backdrop-blur-md border border-white/10 group hover:-translate-y-2 hover:border-primary/50 transition-all duration-300 hover:shadow-[0_20px_40px_rgba(255,107,0,0.1)] relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-[50px] group-hover:bg-primary/20 transition-colors" />
                  <div className="mb-6 p-4 rounded-2xl bg-dark border border-white/10 group-hover:border-primary/30 group-hover:shadow-[0_0_20px_rgba(255,107,0,0.2)] transition-all duration-300 relative z-10 flex items-center justify-center">
                    {item.icon}
                  </div>
                  <h5 className="text-sm font-space font-bold text-white mb-3 uppercase tracking-wide group-hover:text-primary transition-colors relative z-10">
                    {item.title}
                  </h5>
                  <p className="text-sm text-gray-400 leading-relaxed font-sans group-hover:text-gray-300 transition-colors relative z-10">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
