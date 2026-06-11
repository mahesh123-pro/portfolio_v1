"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const [cursorType, setCursorType] = useState<"default" | "hover" | "grab" | "hidden">("default");

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Configure spring physics for organic cursor trail
  const springConfig = { damping: 30, stiffness: 250, mass: 0.5 };
  const springX = useSpring(cursorX, springConfig);
  const springY = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Detect mobile touch devices (custom cursor is disabled for touch UX)
    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) {
      setCursorType("hidden");
      return;
    }

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      // Check if hovering interactive components
      const isInteractive =
        target.closest("a") ||
        target.closest("button") ||
        target.closest('[role="button"]') ||
        target.classList.contains("interactive");

      // Check if hovering 3D canvas areas
      const isCanvas = target.closest("canvas");

      if (isInteractive) {
        setCursorType("hover");
      } else if (isCanvas) {
        setCursorType("grab");
      } else {
        setCursorType("default");
      }
    };

    const handleMouseLeaveWindow = () => {
      setCursorType("hidden");
    };

    const handleMouseEnterWindow = () => {
      setCursorType("default");
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseleave", handleMouseLeaveWindow);
    document.addEventListener("mouseenter", handleMouseEnterWindow);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", handleMouseLeaveWindow);
      document.removeEventListener("mouseenter", handleMouseEnterWindow);
    };
  }, [cursorX, cursorY]);

  if (cursorType === "hidden") return null;

  return (
    <>
      {/* Glow dot */}
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 bg-primary rounded-full pointer-events-none z-[99999] mix-blend-difference"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />
      {/* Outer ring */}
      <motion.div
        className="fixed top-0 left-0 border border-primary rounded-full pointer-events-none z-[99998] flex items-center justify-center"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: cursorType === "hover" ? 48 : cursorType === "grab" ? 36 : 24,
          height: cursorType === "hover" ? 48 : cursorType === "grab" ? 36 : 24,
          backgroundColor: cursorType === "hover" ? "rgba(255, 107, 0, 0.1)" : "rgba(255, 107, 0, 0)",
          borderColor: cursorType === "hover" ? "#FFC857" : "#FF6B00",
        }}
        transition={{ type: "spring", stiffness: 350, damping: 25 }}
      >
        {cursorType === "hover" && (
          <span className="text-[7px] text-accent font-mono font-bold tracking-widest uppercase animate-pulse">
            View
          </span>
        )}
        {cursorType === "grab" && (
          <span className="text-[7px] text-primary font-mono font-bold tracking-widest uppercase">
            Drag
          </span>
        )}
      </motion.div>
    </>
  );
}

export default CustomCursor;
