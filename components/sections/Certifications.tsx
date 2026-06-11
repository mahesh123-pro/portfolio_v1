"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Award, ShieldCheck, ExternalLink, QrCode, Hourglass } from "lucide-react";

interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  verifyUrl: string;
  badgeId: string;
}

const certificationsList: Certification[] = [
  {
    id: "aws-ccp",
    name: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services",
    date: "Dec 2024",
    verifyUrl: "https://aws.amazon.com/verification",
    badgeId: "AWS-CCP-881923"
  },
  {
    id: "aws-saa",
    name: "AWS Certified Solutions Architect – Associate",
    issuer: "Amazon Web Services",
    date: "Feb 2025",
    verifyUrl: "https://aws.amazon.com/verification",
    badgeId: "AWS-SAA-992388"
  },
  {
    id: "tf-assoc",
    name: "HashiCorp Certified: Terraform Associate (003)",
    issuer: "HashiCorp",
    date: "May 2025",
    verifyUrl: "https://verify.hashicorp.com",
    badgeId: "HC-TF-229983"
  }
];

interface HologramCardProps {
  cert: Certification;
  index: number;
}

function HologramCard({ cert, index }: HologramCardProps) {
  const [flipped, setFlipped] = useState(false);
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-50px" });

  return (
    <div
      ref={cardRef}
      onClick={() => setFlipped(!flipped)}
      className="relative w-full h-[280px] cursor-pointer"
      style={{ perspective: "1000px" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        style={{
          transformStyle: "preserve-3d",
          rotateY: flipped ? 180 : 0
        }}
        className="w-full h-full relative transition-transform duration-700 rounded-2xl glass-panel border border-white/10 overflow-hidden"
      >
        {/* FRONT SIDE */}
        <div
          style={{ backfaceVisibility: "hidden" }}
          className="absolute inset-0 p-6 flex flex-col justify-between items-start text-left bg-dark/40 hologram-shimmer"
        >
          {/* Badge Glow header */}
          <div className="w-full flex justify-between items-center">
            <span className="p-2.5 rounded-xl bg-primary/10 border border-primary/20">
              <Award className="w-5 h-5 text-primary" />
            </span>
            <span className="text-[8px] font-mono text-muted bg-white/5 border border-white/5 px-2 py-0.5 rounded">
              ID: {cert.badgeId}
            </span>
          </div>

          <div>
            <span className="text-[9px] font-mono text-primary font-bold uppercase tracking-widest block mb-1">
              {cert.issuer}
            </span>
            <h3 className="text-base font-space font-bold text-white tracking-tight leading-snug">
              {cert.name}
            </h3>
          </div>

          <div className="w-full flex justify-between items-center text-[10px] font-mono text-muted border-t border-white/5 pt-3">
            <span>ISSUED: {cert.date}</span>
            <span className="text-primary hover:text-accent transition-colors flex items-center gap-1 font-bold">
              TAP TO FLIP
            </span>
          </div>
        </div>

        {/* BACK SIDE */}
        <div
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)"
          }}
          className="absolute inset-0 p-6 flex flex-col justify-between items-center bg-surface/95"
        >
          {/* Custom vector QR code placeholder */}
          <div className="w-28 h-28 border border-primary/20 bg-dark/80 rounded-xl p-2 flex items-center justify-center relative glow-primary">
            <QrCode className="w-full h-full text-primary opacity-80" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-6 h-6 bg-dark rounded border border-primary flex items-center justify-center text-[7px] font-mono text-white font-bold select-none">
                BM
              </div>
            </div>
          </div>

          <div className="text-center">
            <span className="text-[9px] font-mono text-muted block mb-1 uppercase">VERIFICATION NODE</span>
            <a
              href={cert.verifyUrl}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1 text-xs font-mono font-bold text-primary hover:text-accent transition-colors"
            >
              Verify Credentials
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <span className="text-[8px] font-mono text-muted uppercase tracking-widest">
            Tap to return
          </span>
        </div>
      </motion.div>
    </div>
  );
}

export function Certifications() {
  const titleRef = useRef(null);
  const isTitleInView = useInView(titleRef, { once: true });

  return (
    <section
      id="certifications"
      className="relative min-h-screen py-24 flex items-center bg-dark"
    >
      <div className="absolute inset-0 bg-dot-pattern opacity-5 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
        {/* Title */}
        <div ref={titleRef} className="flex flex-col items-start mb-16">
          <h2 className="text-3xl md:text-5xl font-bold font-space text-white tracking-tight relative pb-4">
            Hologram Vault
            <motion.div
              initial={{ width: 0 }}
              animate={isTitleInView ? { width: "100%" } : {}}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="absolute bottom-0 left-0 h-[3px] bg-primary shadow-[0_0_8px_#FF6B00]"
            />
          </h2>
          <p className="text-xs font-mono text-muted uppercase tracking-widest mt-4">
            Cloud Certifications. Flip badges to reveal validation metrics.
          </p>
        </div>

        {/* Progress Tracker Card */}
        <div className="max-w-xl mx-auto mb-16">
          <div className="glass-panel p-5 rounded-2xl border border-white/5 flex items-center gap-5 bg-white/[0.01]">
            <div className="p-3.5 rounded-xl bg-primary/10 border border-primary/20 shrink-0">
              <Hourglass className="w-5 h-5 text-primary animate-spin" />
            </div>
            <div className="flex-1 text-left">
              <div className="flex justify-between text-xs font-mono mb-1.5">
                <span className="text-white">Active Cert Strategy</span>
                <span className="text-primary font-bold">In Progress</span>
              </div>
              <p className="text-[10px] font-mono text-muted uppercase mb-3">
                Next cert: AWS Certified Solutions Architect – Professional (SAP-C02)
              </p>
              {/* Progress bar */}
              <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden border border-white/5">
                <div
                  className="bg-primary h-full rounded-full animate-pulse shadow-[0_0_8px_rgba(255,107,0,0.6)]"
                  style={{ width: "45%" }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Certs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {certificationsList.map((cert, idx) => (
            <HologramCard key={cert.id} cert={cert} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Certifications;
