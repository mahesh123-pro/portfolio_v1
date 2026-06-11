import React from "react";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  glow?: boolean;
  className?: string;
}

export function GlassCard({ children, glow = false, className = "", ...props }: GlassCardProps) {
  return (
    <div
      className={`glass-panel rounded-2xl p-6 transition-all duration-300 ${
        glow ? "glow-primary-hover" : ""
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export default GlassCard;
