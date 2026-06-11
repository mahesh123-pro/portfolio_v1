"use client";

import React, { useRef, useState } from "react";

interface TiltCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  maxTilt?: number; // Maximum tilt degrees
  glowColor?: string; // Box shadow glow color on hover
  className?: string;
}

export function TiltCard({
  children,
  maxTilt = 12,
  glowColor = "rgba(255, 107, 0, 0.25)",
  className = "",
  ...props
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transformStyle, setTransformStyle] = useState<string>("");
  const [shadowStyle, setShadowStyle] = useState<string>("");

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Mouse position relative to the card coordinate center (0 to width/height)
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Normalised position between -0.5 and 0.5
    const normX = mouseX / width - 0.5;
    const normY = mouseY / height - 0.5;

    // Calculate rotation angle (opposite values for y-rotation relative to x-movement)
    const rotateX = (-normY * maxTilt).toFixed(2);
    const rotateY = (normX * maxTilt).toFixed(2);

    setTransformStyle(`perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`);
    setShadowStyle(`0 20px 40px ${glowColor}`);
  };

  const handleMouseLeave = () => {
    setTransformStyle("perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)");
    setShadowStyle("");
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`glass-panel rounded-2xl transition-all duration-200 ease-out ${className}`}
      style={{
        transform: transformStyle,
        boxShadow: shadowStyle,
        transformStyle: "preserve-3d",
      }}
      {...props}
    >
      <div className="w-full h-full" style={{ transform: "translateZ(30px)", transformStyle: "preserve-3d" }}>
        {children}
      </div>
    </div>
  );
}

export default TiltCard;
