"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Generate target positions for the "MK" monogram using points in 3D
function generateMKPoints(count = 1000): Float32Array {
  const arr = new Float32Array(count * 3);
  const pointsPerSection = Math.floor(count / 6);
  let index = 0;

  // M Left Stem: x = -2.2, y = -1.5 to 1.5, z = 0
  for (let i = 0; i < pointsPerSection; i++) {
    arr[index++] = -2.2 + (Math.random() - 0.5) * 0.08;
    arr[index++] = -1.5 + (i / pointsPerSection) * 3.0 + (Math.random() - 0.5) * 0.08;
    arr[index++] = (Math.random() - 0.5) * 0.08;
  }

  // M Right Stem: x = -0.6, y = -1.5 to 1.5, z = 0
  for (let i = 0; i < pointsPerSection; i++) {
    arr[index++] = -0.6 + (Math.random() - 0.5) * 0.08;
    arr[index++] = -1.5 + (i / pointsPerSection) * 3.0 + (Math.random() - 0.5) * 0.08;
    arr[index++] = (Math.random() - 0.5) * 0.08;
  }

  // M center V-shape: from (-2.2, 1.5) -> (-1.4, -0.5) -> (-0.6, 1.5)
  const halfV = Math.floor(pointsPerSection);
  for (let i = 0; i < halfV; i++) {
    const t = i / halfV;
    if (i < halfV / 2) {
      // Left side of V
      const localT = t * 2;
      arr[index++] = -2.2 + localT * 0.8 + (Math.random() - 0.5) * 0.08;
      arr[index++] = 1.5 - localT * 2.0 + (Math.random() - 0.5) * 0.08;
    } else {
      // Right side of V
      const localT = (t - 0.5) * 2;
      arr[index++] = -1.4 + localT * 0.8 + (Math.random() - 0.5) * 0.08;
      arr[index++] = -0.5 + localT * 2.0 + (Math.random() - 0.5) * 0.08;
    }
    arr[index++] = (Math.random() - 0.5) * 0.08;
  }

  // K Stem: x = 0.8, y = -1.5 to 1.5, z = 0
  for (let i = 0; i < pointsPerSection; i++) {
    arr[index++] = 0.8 + (Math.random() - 0.5) * 0.08;
    arr[index++] = -1.5 + (i / pointsPerSection) * 3.0 + (Math.random() - 0.5) * 0.08;
    arr[index++] = (Math.random() - 0.5) * 0.08;
  }

  // K Top Slant: from (0.8, 0) -> (2.0, 1.5)
  for (let i = 0; i < pointsPerSection; i++) {
    const t = i / pointsPerSection;
    arr[index++] = 0.8 + t * 1.2 + (Math.random() - 0.5) * 0.08;
    arr[index++] = 0.0 + t * 1.5 + (Math.random() - 0.5) * 0.08;
    arr[index++] = (Math.random() - 0.5) * 0.08;
  }

  // K Bottom Slant: from (0.8, 0) -> (2.0, -1.5)
  for (let i = 0; i < pointsPerSection; i++) {
    const t = i / pointsPerSection;
    arr[index++] = 0.8 + t * 1.2 + (Math.random() - 0.5) * 0.08;
    arr[index++] = 0.0 - t * 1.5 + (Math.random() - 0.5) * 0.08;
    arr[index++] = (Math.random() - 0.5) * 0.08;
  }

  // Fill up any remaining index spots with floating dust
  while (index < count * 3) {
    arr[index++] = (Math.random() - 0.5) * 5;
    arr[index++] = (Math.random() - 0.5) * 5;
    arr[index++] = (Math.random() - 0.5) * 5;
  }

  return arr;
}

interface LogoParticlesProps {
  progress: number;
}

function LogoParticles({ progress }: LogoParticlesProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 1200;

  // Initialize scattered random starting positions
  const startPositions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) {
      arr[i] = (Math.random() - 0.5) * 12; // Scattered wide
    }
    return arr;
  }, []);

  // Targets positions forming "MK"
  const targetPositions = useMemo(() => generateMKPoints(count), []);

  // Current working buffer
  const currentPositions = useMemo(() => new Float32Array(count * 3), []);

  useFrame(() => {
    if (pointsRef.current) {
      const positionsAttr = pointsRef.current.geometry.attributes.position;
      
      // Interpolate startPositions to targetPositions based on load progress
      // We will ease the interpolation
      const t = progress / 100;
      const easeT = t * t * (3 - 2 * t); // Smoothstep

      for (let i = 0; i < count * 3; i++) {
        currentPositions[i] = THREE.MathUtils.lerp(startPositions[i], targetPositions[i], easeT);
      }

      // Directly update the underlying float array to satisfy TS union checking
      const array = positionsAttr.array as Float32Array;
      if (array) {
        for (let i = 0; i < count * 3; i++) {
          array[i] = currentPositions[i];
        }
        positionsAttr.needsUpdate = true;
      }

      // Slight rotation of the logo
      pointsRef.current.rotation.y = Math.sin(progress * 0.02) * 0.15;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[startPositions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#FF6B00"
        size={0.16}
        sizeAttenuation={true}
        transparent={true}
        opacity={0.8}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [consoleLogs, setConsoleLogs] = useState<string[]>([]);
  const [canSkip, setCanSkip] = useState(false);
  const [isDone, setIsDone] = useState(false);

  const logLines = useMemo(() => [
    "INITIALIZING PORTFOLIO v2.0...",
    "Connecting secure network protocols to Mumbai base...",
    "Loading cloud systems configuration keys...",
    "Assembling Three.js environment matrix grids...",
    "Compiling 5 years of hardware & software architecture logs...",
    "Systems ready. Welcome, Engineer."
  ], []);

  // Fake loading timing combined with real assembly
  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        // Speed up early, slow down near end to make it organic
        const step = prev < 50 ? 4 : prev < 85 ? 2 : 1;
        return Math.min(prev + step, 100);
      });
    }, 40);

    const skipTimeout = setTimeout(() => {
      setCanSkip(true);
    }, 1000);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(skipTimeout);
    };
  }, []);

  // Log line typing sequence based on progress thresholds
  useEffect(() => {
    const indices = [0, 15, 35, 60, 80, 95];
    const newLogs: string[] = [];
    indices.forEach((threshold, idx) => {
      if (progress >= threshold) {
        newLogs.push(logLines[idx]);
      }
    });
    setConsoleLogs(newLogs);

    if (progress === 100) {
      const completeTimeout = setTimeout(() => {
        setIsDone(true);
        const exitTimeout = setTimeout(() => {
          onComplete();
        }, 600); // Wait for transition fade
        return () => clearTimeout(exitTimeout);
      }, 500);
      return () => clearTimeout(completeTimeout);
    }
  }, [progress, logLines, onComplete]);

  return (
    <div
      className={`fixed inset-0 bg-[#0A0A0A] z-[9999] flex flex-col items-center justify-between p-6 transition-all duration-700 ease-in-out ${
        isDone ? "opacity-0 scale-95 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Noise Overlay */}
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#fff_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
      {/* Scanline line */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="w-full h-0.5 bg-primary/20 opacity-30 animate-scanline shadow-[0_0_10px_rgba(255,107,0,0.5)]" />
      </div>

      {/* Header telemetry details */}
      <div className="w-full flex justify-between text-[10px] font-mono text-primary/60 tracking-wider">
        <span>LOC: MUMBAI_NODE_IN</span>
        <span>SYS_STATUS: ACTIVE</span>
      </div>

      {/* 3D Particle Logo Canvas */}
      <div className="w-full h-[300px] flex items-center justify-center">
        <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <LogoParticles progress={progress} />
        </Canvas>
      </div>

      {/* Console and Progress Indicators */}
      <div className="w-full max-w-xl flex flex-col gap-4">
        {/* Terminal log output */}
        <div className="glass-panel rounded-lg p-4 h-[130px] font-mono text-[11px] text-muted overflow-hidden flex flex-col gap-1 border border-white/5 bg-black/40">
          {consoleLogs.map((log, idx) => (
            <div
              key={idx}
              className={`transition-all duration-300 ${
                idx === consoleLogs.length - 1 ? "text-primary border-l-2 border-primary pl-2" : "text-white/60 pl-2"
              }`}
            >
              {log}
            </div>
          ))}
        </div>

        {/* Energy meter progress bar */}
        <div className="flex flex-col gap-1.5">
          <div className="flex justify-between items-center text-xs font-mono">
            <span className="text-white/80">REPLICATING MATRIX IDENTITY</span>
            <span className="text-primary font-bold">{progress}%</span>
          </div>
          <div className="w-full h-2.5 bg-white/5 rounded-full overflow-hidden border border-white/5 p-0.5">
            <div
              className="bg-primary h-full rounded-full transition-all duration-300 ease-out shadow-[0_0_12px_rgba(255,107,0,0.8)]"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Bottom control row */}
      <div className="w-full flex justify-between items-center text-[10px] font-mono text-muted mt-4">
        <span>© {new Date().getFullYear()} MK COMMAND</span>
        {canSkip && (
          <button
            onClick={() => {
              setIsDone(true);
              setTimeout(onComplete, 600);
            }}
            className="px-4 py-1.5 rounded border border-primary/30 text-primary bg-primary/5 hover:bg-primary/20 hover:text-white transition-all cursor-pointer glow-primary-hover uppercase tracking-wider"
          >
            Skip Intro
          </button>
        )}
      </div>
    </div>
  );
}

export default LoadingScreen;
