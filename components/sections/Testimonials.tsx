"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Quote, CheckCircle, ChevronLeft, ChevronRight, Star } from "lucide-react";
import { TiltCard } from "../ui/TiltCard";

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  initials: string;
  bgColor: string;
}

const testimonials: Testimonial[] = [
  {
    quote: "Mahesh possesses an exceptional drive for systems engineering. During his work on our precision research telemetry integration, he optimized the WebSocket buffer channels, resolving high-concurrency latencies and dropping packet loss to zero during pilot testing.",
    author: "Dr. Kiran Kumar",
    role: "Professor & Lab Director",
    company: "ECE Research Labs, GNITS",
    initials: "KK",
    bgColor: "bg-primary"
  },
  {
    quote: "We hired Mahesh to build our construction resource logistics scheduler on AWS. He delivered a secure, highly-available 3-tier VPC environment and a responsive dashboard. His grasp of cloud configurations is outstanding for a developer.",
    author: "Rajesh Kalidindi",
    role: "Managing Director",
    company: "RK Projects",
    initials: "RK",
    bgColor: "bg-success"
  },
  {
    quote: "Mahesh bridged the gap between our client-facing web application and the AWS backend infrastructure. His automation pipelines cut deployment cycle times by 40% and improved security checks. He writes extremely clean, strongly-typed code.",
    author: "Siddharth M.",
    role: "Senior Full-Stack Engineer",
    company: "GKLT Tech Group",
    initials: "SM",
    bgColor: "bg-accent"
  }
];

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="relative min-h-screen py-24 flex items-center bg-dark overflow-hidden"
    >
      <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />
      <div className="absolute top-[30%] left-[20%] w-[350px] h-[350px] bg-primary/5 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-[30%] right-[20%] w-[350px] h-[350px] bg-accent/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
        
        {/* Title */}
        <div className="flex flex-col items-start mb-16 text-left">
          <h2 className="text-3xl md:text-5xl font-bold font-space text-white tracking-tight relative pb-4 inline-block">
            Peer Verification & Endorsements
            <motion.div
              initial={{ width: 0 }}
              animate={isInView ? { width: "100%" } : {}}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="absolute bottom-0 left-0 h-[3px] bg-primary shadow-[0_0_8px_#FF6B00]"
            />
          </h2>
          <p className="text-xs font-mono text-muted uppercase tracking-widest mt-4">
            System Validation. Endorsements from project sponsors, academic mentors, and engineering peers.
          </p>
        </div>

        {/* Carousel Block for Testimonials */}
        <div className="max-w-4xl mx-auto relative px-4 sm:px-12">
          {/* Decorative giant quote mark */}
          <div className="absolute -top-12 -left-6 text-white/[0.02] font-serif text-[180px] pointer-events-none select-none">
            “
          </div>

          <div className="relative overflow-hidden min-h-[380px] md:min-h-[320px] flex items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.4 }}
                className="w-full"
              >
                <TiltCard 
                  maxTilt={4}
                  glowColor="rgba(255,107,0,0.15)"
                  className="w-full p-8 md:p-12 rounded-3xl bg-[#111]/70 border border-white/5 shadow-[0_12px_40px_rgba(0,0,0,0.5)] flex flex-col justify-between text-left"
                >
                  <div>
                    {/* Stars & Verified row */}
                    <div className="flex justify-between items-center mb-6">
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        ))}
                      </div>
                      <span className="flex items-center gap-1 text-[9px] font-mono text-success bg-success/5 border border-success/20 px-2.5 py-0.5 rounded-full uppercase tracking-wider font-bold">
                        <CheckCircle className="w-3.5 h-3.5" /> Checked Reference
                      </span>
                    </div>

                    {/* Quote */}
                    <p className="text-sm md:text-base text-white/90 leading-relaxed font-sans italic mb-8 select-none relative">
                      &ldquo;{testimonials[currentIndex].quote}&rdquo;
                    </p>
                  </div>

                  {/* Profile info */}
                  <div className="flex items-center gap-4 border-t border-white/5 pt-6 mt-2">
                    {/* Avatar Circle */}
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-mono font-bold text-white shadow-lg shrink-0 ${testimonials[currentIndex].bgColor}`}>
                      {testimonials[currentIndex].initials}
                    </div>
                    <div>
                      <h4 className="text-sm font-space font-bold text-white">
                        {testimonials[currentIndex].author}
                      </h4>
                      <p className="text-[10px] font-mono text-muted uppercase tracking-wider mt-0.5">
                        {testimonials[currentIndex].role} — <span className="text-primary font-bold">{testimonials[currentIndex].company}</span>
                      </p>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              onClick={handlePrev}
              className="p-3 rounded-xl bg-[#111]/80 hover:bg-primary border border-white/5 hover:border-primary text-muted hover:text-white transition-all cursor-pointer shadow-lg active:scale-90"
              aria-label="Previous Testimonial"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                    currentIndex === idx ? "bg-primary w-6" : "bg-white/10"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
            <button
              onClick={handleNext}
              className="p-3 rounded-xl bg-[#111]/80 hover:bg-primary border border-white/5 hover:border-primary text-muted hover:text-white transition-all cursor-pointer shadow-lg active:scale-90"
              aria-label="Next Testimonial"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}

export default Testimonials;
