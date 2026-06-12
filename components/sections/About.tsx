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
    <span ref={ref} className="text-3xl md:text-4xl font-space font-bold text-primary">
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
      className="relative min-h-screen py-24 flex items-center bg-dark"
    >
      <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
        {/* Title */}
        <div ref={titleRef} className="flex flex-col items-start mb-16">
          <h2 className="text-3xl md:text-5xl font-bold font-space text-gradient-aurora tracking-tight relative pb-4 drop-shadow-lg">
            About Me
            <motion.div
              initial={{ width: 0 }}
              animate={isTitleInView ? { width: "100%" } : {}}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="absolute bottom-0 left-0 h-[3px] bg-primary shadow-[0_0_8px_#FF6B00]"
            />
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Side: Stats cards & visual container */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            {/* Animated Profile image wrapping circles */}
            <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center mb-8">
              {/* Outer orbit rings */}
              <div className="absolute inset-0 rounded-full border border-t-primary/40 border-r-primary/20 border-b-transparent border-l-transparent animate-orbit-cw scale-110 pointer-events-none shadow-[0_0_20px_rgba(255,107,0,0.15)]" />
              <div className="absolute inset-0 rounded-full border border-b-accent/30 border-l-accent/10 border-t-transparent border-r-transparent animate-orbit-ccw scale-125 pointer-events-none shadow-[0_0_15px_rgba(255,200,87,0.1)]" />
              
              {/* Orbiting dot */}
              <div className="absolute inset-0 animate-orbit-cw scale-110 pointer-events-none">
                <div className="w-2.5 h-2.5 bg-primary rounded-full absolute -top-1.5 left-1/2 -translate-x-1/2 shadow-[0_0_10px_#FF6B00]" />
              </div>

              {/* Avatar Frame */}
              <div className="w-full h-full rounded-full overflow-hidden border-2 border-primary/30 p-2 bg-dark/80 relative z-10 flex items-center justify-center">
                <div className="w-full h-full rounded-full overflow-hidden relative">
                  <Image
                    src="/portfolio1assests/mahesh-about.png"
                    alt="Mahesh Avatar"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 256px, 320px"
                    priority
                  />
                </div>
              </div>
            </div>

            {/* Currently Building Live Badge */}
            <div className="flex items-center gap-3 bg-surface border border-white/5 px-4 py-2.5 rounded-full select-none shadow-[0_0_15px_rgba(0,0,0,0.2)]">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-success"></span>
              </span>
              <span className="text-[10px] font-mono text-white/90 uppercase tracking-widest">
                CURRENTLY: AWS Architecture & latency
              </span>
            </div>
          </div>

          {/* Right Side: Copy paragraphs & grid */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            <h3 className="text-xl md:text-2xl font-space font-medium text-white mb-6">
              Designing scalable cloud environments at the boundary of hardware and systems.
            </h3>

            <p className="text-muted font-sans leading-relaxed mb-6">
              Hi, I&apos;m <span className="text-white font-medium">Mahesh</span> (Bakki Mahesh), a B-Tech student focused on Cloud Computing, systems infrastructure, and full-stack development. I architect reliable, containerized structures on AWS, build optimized web interfaces, and deploy system automations.
            </p>
            <p className="text-muted font-sans leading-relaxed mb-10">
              I specialize in AWS serverless configurations, infrastructure deployment, secure networking models, and high-performance APIs. My objective is to bridge the gap between application engineering and cloud operations to build bulletproof products that scale.
            </p>

            {/* Stats Cards grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full mb-12">
              <TiltCard className="p-5 flex flex-col items-center justify-center text-center">
                <CountUp value={5} suffix="+" />
                <span className="text-[10px] font-mono text-muted uppercase mt-2">Years Coding</span>
              </TiltCard>
              <TiltCard className="p-5 flex flex-col items-center justify-center text-center">
                <CountUp value={9} suffix="+" />
                <span className="text-[10px] font-mono text-muted uppercase mt-2">Projects Deployed</span>
              </TiltCard>
              <TiltCard className="p-5 flex flex-col items-center justify-center text-center">
                <CountUp value={4} suffix="+" />
                <span className="text-[10px] font-mono text-muted uppercase mt-2">Cloud Milestones</span>
              </TiltCard>
            </div>

            {/* What I Bring Section */}
            <h4 className="text-xs font-mono font-bold tracking-widest text-primary uppercase mb-6 drop-shadow-[0_0_8px_rgba(255,107,0,0.5)]">
              What I Bring to the Table
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
              {whatIBring.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: idx * 0.15 }}
                  className="flex flex-col items-start text-left p-5 rounded-xl glass-panel group hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(255,107,0,0.15)] transition-all duration-300"
                >
                  <div className="mb-4 p-2.5 rounded-lg bg-primary/10 border border-primary/20 group-hover:bg-primary/20 transition-colors shadow-[0_0_15px_rgba(255,107,0,0.1)]">
                    {item.icon}
                  </div>
                  <h5 className="text-xs font-mono font-bold text-white mb-2 uppercase group-hover:text-primary transition-colors">
                    {item.title}
                  </h5>
                  <p className="text-[11px] text-muted leading-relaxed font-sans group-hover:text-gray-300 transition-colors">
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
