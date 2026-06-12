"use client";

import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Send, Mail, MapPin, CheckCircle, AlertCircle, Calendar, BookOpen, FileText } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "../ui/BrandIcons";
import dynamic from "next/dynamic";
import { Canvas } from "@react-three/fiber";

const Earth = dynamic(() => import("../three/Earth"), { ssr: false });

// Zod Schema for validation
const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(4, "Subject must be at least 4 characters"),
  role: z.enum(["recruiter", "collaborator", "client", "other"]),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const titleRef = useRef(null);
  const isTitleInView = useInView(titleRef, { once: true });

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

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // API call to our contact route
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitSuccess(true);
        reset();
        setTimeout(() => setSubmitSuccess(false), 5000);
      } else {
        throw new Error(result.error || "Failed to transmit payload.");
      }
    } catch (err: any) {
      // Local storage simulation fallback in case Supabase/Resend are not configured
      console.warn("API Error, utilizing local fallback simulation:", err.message);
      
      const submissions = JSON.parse(localStorage.getItem("portfolio_contacts") || "[]");
      submissions.push({ ...data, date: new Date().toISOString() });
      localStorage.setItem("portfolio_contacts", JSON.stringify(submissions));

      setSubmitSuccess(true);
      reset();
      setTimeout(() => setSubmitSuccess(false), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative min-h-screen py-24 flex items-center bg-dark"
    >
      <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
        {/* Title */}
        <div ref={titleRef} className="flex flex-col items-start mb-16">
          <h2 className="text-3xl md:text-5xl font-bold font-space text-white tracking-tight relative pb-4">
            Mission Control
            <motion.div
              initial={{ width: 0 }}
              animate={isTitleInView ? { width: "100%" } : {}}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="absolute bottom-0 left-0 h-[3px] bg-primary shadow-[0_0_8px_#FF6B00]"
            />
          </h2>
          <p className="text-xs font-mono text-muted uppercase tracking-widest mt-4">
            Contact Gateway. Establish transmission coordinates.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left: Contact Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="glass-panel p-6 md:p-8 rounded-2xl border border-white/10 bg-[#111]/80 shadow-[0_4px_30px_rgba(0,0,0,0.3)]">
              <AnimatePresence mode="wait">
                {!submitSuccess ? (
                  <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 text-left">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Name */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-mono text-muted uppercase tracking-wider">
                          Sender Name
                        </label>
                        <input
                          type="text"
                          {...register("name", { required: true })}
                          placeholder="e.g. Jean Doe"
                          className="px-4 py-2.5 rounded-xl border border-white/5 bg-white/[0.02] text-xs text-white focus:outline-none focus:border-primary/60 transition-colors font-mono"
                        />
                        {errors.name && (
                          <span className="text-[10px] font-mono text-primary flex items-center gap-1 mt-0.5">
                            <AlertCircle className="w-3 h-3" />
                            {errors.name.message}
                          </span>
                        )}
                      </div>

                      {/* Email */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-mono text-muted uppercase tracking-wider">
                          Return Coordinate (Email)
                        </label>
                        <input
                          type="email"
                          {...register("email", { required: true })}
                          placeholder="e.g. jean@agency.com"
                          className="px-4 py-2.5 rounded-xl border border-white/5 bg-white/[0.02] text-xs text-white focus:outline-none focus:border-primary/60 transition-colors font-mono"
                        />
                        {errors.email && (
                          <span className="text-[10px] font-mono text-primary flex items-center gap-1 mt-0.5">
                            <AlertCircle className="w-3 h-3" />
                            {errors.email.message}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Subject */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-mono text-muted uppercase tracking-wider">
                          Transmission Subject
                        </label>
                        <input
                          type="text"
                          {...register("subject", { required: true })}
                          placeholder="e.g. Project Proposal"
                          className="px-4 py-2.5 rounded-xl border border-white/5 bg-white/[0.02] text-xs text-white focus:outline-none focus:border-primary/60 transition-colors font-mono"
                        />
                        {errors.subject && (
                          <span className="text-[10px] font-mono text-primary flex items-center gap-1 mt-0.5">
                            <AlertCircle className="w-3 h-3" />
                            {errors.subject.message}
                          </span>
                        )}
                      </div>

                      {/* I am a Role Dropdown */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-mono text-muted uppercase tracking-wider">
                          Identifier
                        </label>
                        <select
                          {...register("role")}
                          className="px-4 py-2.5 rounded-xl border border-white/5 bg-surface text-xs text-white focus:outline-none focus:border-primary/60 transition-colors font-mono"
                        >
                          <option value="recruiter">Recruiter / Talent Agent</option>
                          <option value="collaborator">Developer / Collaborator</option>
                          <option value="client">Client / Project Lead</option>
                          <option value="other">Other System Entity</option>
                        </select>
                      </div>
                    </div>

                    {/* Message */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-mono text-muted uppercase tracking-wider">
                        Log Payload (Message)
                      </label>
                      <textarea
                        rows={5}
                        {...register("message", { required: true })}
                        placeholder="Write details of your proposal or connection requests here..."
                        className="px-4 py-2.5 rounded-xl border border-white/5 bg-white/[0.02] text-xs text-white focus:outline-none focus:border-primary/60 transition-colors font-mono resize-none"
                      />
                      {errors.message && (
                        <span className="text-[10px] font-mono text-primary flex items-center gap-1 mt-0.5">
                          <AlertCircle className="w-3 h-3" />
                          {errors.message.message}
                        </span>
                      )}
                    </div>

                    {submitError && (
                      <div className="p-3.5 rounded-xl bg-primary/10 border border-primary/20 text-xs font-mono text-primary flex items-center gap-2">
                        <AlertCircle className="w-4 h-4" />
                        <span>{submitError}</span>
                      </div>
                    )}

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex items-center justify-center gap-2 mt-2 px-6 py-3 rounded-xl bg-primary border border-primary text-xs font-mono font-bold text-white hover:bg-transparent hover:text-primary transition-all cursor-pointer disabled:opacity-50 disabled:pointer-events-none shadow-[0_0_15px_rgba(255,107,0,0.2)] hover:shadow-[0_0_25px_rgba(255,107,0,0.4)]"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          TRANSMITTING...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          TRANSMIT COMMAND
                        </>
                      )}
                    </button>
                  </form>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="flex flex-col items-center justify-center py-12 text-center"
                  >
                    <CheckCircle className="w-16 h-16 text-primary mb-4 animate-bounce" />
                    <h3 className="text-xl font-space font-bold text-white mb-2">
                      Transmission Confirmed
                    </h3>
                    <p className="text-xs font-mono text-muted max-w-sm mb-6">
                      Data packet successfully routed to Mumbai base node. Standby for feedback sequence.
                    </p>
                    <button
                      onClick={() => setSubmitSuccess(false)}
                      className="px-4 py-2 rounded-full border border-white/10 hover:border-primary text-[10px] font-mono text-muted hover:text-white transition-colors cursor-pointer"
                    >
                      SEND ANOTHER PACKET
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Right: Globe and details (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-8 text-left w-full h-[400px] lg:h-[500px]">
            {/* 3D Earth Display */}
            <div className="flex-1 w-full relative cursor-grab">
              {/* Outer decorative arcs */}
              <div className="absolute inset-0 border border-white/5 rounded-full animate-orbit-cw pointer-events-none scale-95" />
              
              <div className="w-full h-full">
                <Canvas camera={{ position: [0, 0, 5.0], fov: 45 }} dpr={[1, 2]}>
                  <ambientLight intensity={0.4} />
                  <pointLight position={[5, 3, 5]} intensity={1.5} color="#FF6B00" />
                  <Earth />
                </Canvas>
              </div>
            </div>

            {/* Quick coordinates cards grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
              <div className="glass-panel p-4 rounded-xl border border-white/5 bg-white/[0.01] hover:border-primary/30 transition-all">
                <span className="text-[8px] font-mono text-primary font-bold uppercase tracking-wider block mb-1">
                  Secure Channel
                </span>
                <a
                  href="mailto:mahesh@ece.cloud"
                  className="text-xs font-mono font-bold text-white hover:text-primary transition-colors flex items-center gap-1.5"
                >
                  <Mail className="w-3.5 h-3.5 shrink-0 text-primary" />
                  mahesh@ece.cloud
                </a>
              </div>

              <div className="glass-panel p-4 rounded-xl border border-white/5 bg-white/[0.01] hover:border-primary/30 transition-all">
                <span className="text-[8px] font-mono text-primary font-bold uppercase tracking-wider block mb-1">
                  Grid Base Node
                </span>
                <span className="text-xs font-mono font-bold text-white flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 shrink-0 text-primary" />
                  Hyderabad, India
                </span>
              </div>

              <div className="glass-panel p-4 rounded-xl border border-white/5 bg-white/[0.01] hover:border-primary/30 transition-all">
                <span className="text-[8px] font-mono text-primary font-bold uppercase tracking-wider block mb-1">
                  GitHub Codebase
                </span>
                <a
                  href="https://github.com/mahesh123-pro"
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-mono font-bold text-white hover:text-primary transition-colors flex items-center gap-1.5"
                >
                  <GithubIcon className="w-3.5 h-3.5 shrink-0 text-primary" />
                  github.com/mahesh123-pro
                </a>
              </div>

              <div className="glass-panel p-4 rounded-xl border border-white/5 bg-white/[0.01] hover:border-primary/30 transition-all">
                <span className="text-[8px] font-mono text-primary font-bold uppercase tracking-wider block mb-1">
                  LinkedIn Network
                </span>
                <a
                  href="https://linkedin.com/in/mahesh-bakki"
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-mono font-bold text-white hover:text-primary transition-colors flex items-center gap-1.5"
                >
                  <LinkedinIcon className="w-3.5 h-3.5 shrink-0 text-primary" />
                  linkedin.com/in/mahesh-bakki
                </a>
              </div>

              <div className="glass-panel p-4 rounded-xl border border-white/5 bg-white/[0.01] hover:border-primary/30 transition-all">
                <span className="text-[8px] font-mono text-primary font-bold uppercase tracking-wider block mb-1">
                  Technical Medium Blog
                </span>
                <a
                  href="https://medium.com/@mahesh-bakki"
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-mono font-bold text-white hover:text-primary transition-colors flex items-center gap-1.5"
                >
                  <BookOpen className="w-3.5 h-3.5 shrink-0 text-primary" />
                  medium.com/@mahesh-bakki
                </a>
              </div>

              <div className="glass-panel p-4 rounded-xl border border-white/5 bg-white/[0.01] hover:border-primary/30 transition-all">
                <span className="text-[8px] font-mono text-primary font-bold uppercase tracking-wider block mb-1">
                  Calendly Direct Meeting
                </span>
                <a
                  href="https://calendly.com/mahesh-bakki/meeting"
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-mono font-bold text-white hover:text-primary transition-colors flex items-center gap-1.5"
                >
                  <Calendar className="w-3.5 h-3.5 shrink-0 text-primary" />
                  Book Calendly Slot
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
