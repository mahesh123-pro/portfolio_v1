"use client";

import { Canvas } from "@react-three/fiber";
import { Stars, Sparkles } from "@react-three/drei";

export function SpaceBackground() {
  return (
    <div className="fixed inset-0 w-screen h-screen z-[-1] pointer-events-none bg-[#050505]">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 60 }}
        dpr={[1, 1.2]} // Performance optimized dpr cap
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          depth: false,
          stencil: false
        }}
      >
        <ambientLight intensity={0.1} />
        
        {/* Drifting Space Stars */}
        <Stars
          radius={100}
          depth={40}
          count={2000}
          factor={4}
          saturation={1}
          fade
          speed={1.0}
        />
        
        {/* Glowing Orange Space Dust */}
        <Sparkles
          count={100}
          scale={50}
          size={1.5}
          speed={0.15}
          opacity={0.4}
          color="#FF6B00"
        />
      </Canvas>
    </div>
  );
}

export default SpaceBackground;
