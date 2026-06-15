"use client";

import { useState, useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Terminal, Sliders, RefreshCw, Eye } from "lucide-react";

interface ParticleSystemProps {
  speed: number;
  noise: number;
  size: number;
  color: string;
  count: number;
  mouseGravity: number;
}

function ParticleSystem({ speed, noise, size, color, count, mouseGravity }: ParticleSystemProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const mouse = useRef({ x: 0, y: 0 });

  // Update mouse coords on move
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Generate stable coordinates once per count limit
  const [positions, originalPositions] = useMemo(() => {
    const coords = new Float32Array(count * 3);
    const orig = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Sphere coordinate distribution
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 3 + Math.random() * 2; // Radius between 3 and 5

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      coords[i * 3] = x;
      coords[i * 3 + 1] = y;
      coords[i * 3 + 2] = z;

      orig[i * 3] = x;
      orig[i * 3 + 1] = y;
      orig[i * 3 + 2] = z;
    }
    return [coords, orig];
  }, [count]);

  // Frame animations
  useFrame((state) => {
    if (!pointsRef.current) return;
    
    const time = state.clock.getElapsedTime();
    const mesh = pointsRef.current;
    
    // Slow rotational drift
    mesh.rotation.y = time * 0.05 * speed;
    mesh.rotation.x = time * 0.02 * speed;

    const geo = mesh.geometry;
    const attr = geo.attributes.position;
    if (!attr) return;

    const arr = attr.array as Float32Array;

    for (let i = 0; i < count; i++) {
      const idx = i * 3;
      const ox = originalPositions[idx];
      const oy = originalPositions[idx + 1];
      const oz = originalPositions[idx + 2];

      // Wave math (sine and cosine waves combined with noise frequency)
      const wave = Math.sin(time * speed + ox * noise) * 0.25;
      const waveCos = Math.cos(time * speed + oy * noise) * 0.25;

      // Apply coordinates shift
      arr[idx] = ox + wave;
      arr[idx + 1] = oy + waveCos;
      arr[idx + 2] = oz + wave * waveCos;

      // Apply mouse gravity displacement
      if (mouseGravity > 0) {
        // Project particle coordinates to 2D
        const px = arr[idx];
        const py = arr[idx + 1];

        // Calculate distance to mouse pointer
        const dx = mouse.current.x * 6 - px;
        const dy = mouse.current.y * 4 - py;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 2.5) {
          const force = (2.5 - dist) * 0.15 * mouseGravity;
          arr[idx] -= (dx / dist) * force;
          arr[idx + 1] -= (dy / dist) * force;
        }
      }
    }

    attr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        transparent={true}
        color={color}
        size={size * 0.03}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function PlaygroundPage() {
  const [mounted, setMounted] = useState(false);
  const [speed, setSpeed] = useState(1.2);
  const [noise, setNoise] = useState(0.8);
  const [size, setSize] = useState(1.5);
  const [color, setColor] = useState("#FF6B00");
  const [count, setCount] = useState(2500);
  const [mouseGravity, setMouseGravity] = useState(1.5);

  useEffect(() => {
    setMounted(true);
  }, []);

  const resetParams = () => {
    setSpeed(1.2);
    setNoise(0.8);
    setSize(1.5);
    setColor("#FF6B00");
    setCount(2500);
    setMouseGravity(1.5);
  };

  const randomizeParams = () => {
    setSpeed(Number((Math.random() * 3 + 0.1).toFixed(2)));
    setNoise(Number((Math.random() * 2 + 0.1).toFixed(2)));
    setSize(Number((Math.random() * 3 + 0.5).toFixed(2)));
    setCount(Math.floor(Math.random() * 3000 + 1000));
    setMouseGravity(Number((Math.random() * 3).toFixed(2)));

    const colors = ["#FF6B00", "#38bdf8", "#d946ef", "#22c55e", "#ffc857", "#ffffff"];
    setColor(colors[Math.floor(Math.random() * colors.length)]);
  };

  if (!mounted) {
    return (
      <div className="min-h-screen w-full bg-[#050505] text-white flex items-center justify-center font-mono text-xs">
        LOADING WEBGL ENVIRONMENT...
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-[#050505] text-white pt-24 relative overflow-hidden flex flex-col md:flex-row">
      {/* Visual Canvas Layer */}
      <div className="flex-1 h-[50vh] md:h-auto relative">
        <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
          <ambientLight intensity={0.2} />
          <pointLight position={[10, 10, 10]} intensity={1.5} color="#ffffff" />
          <ParticleSystem
            speed={speed}
            noise={noise}
            size={size}
            color={color}
            count={count}
            mouseGravity={mouseGravity}
          />
        </Canvas>

        {/* Top-Left telemetry overlay */}
        <div className="absolute top-6 left-6 z-10 text-left select-none pointer-events-none">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-[10px] font-mono mb-2 shadow-[0_0_10px_rgba(255,107,0,0.05)] w-fit">
            <Eye className="w-3.5 h-3.5 animate-pulse" />
            <span>WebGL TELEMETRY SANDBOX</span>
          </div>
          <h2 className="text-xl md:text-2xl font-space font-bold text-white uppercase">
            Particle Storm Node
          </h2>
          <span className="text-[9px] font-mono text-muted">
            FPS: 60 // Active Vertices: {count.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Control Panel Dashboard */}
      <div className="w-full md:w-96 bg-[#0E0E0E]/95 border-t md:border-t-0 md:border-l border-white/5 backdrop-blur-md p-6 flex flex-col justify-between z-10 text-left overflow-y-auto max-h-[50vh] md:max-h-none scrollbar-thin">
        <div>
          {/* Header */}
          <div className="flex items-center gap-2 mb-6 pb-4 border-b border-white/5">
            <Sliders className="w-4 h-4 text-primary" />
            <h3 className="font-space font-bold text-sm uppercase text-white">Mutation Controls</h3>
          </div>

          <div className="flex flex-col gap-5">
            {/* Speed Control */}
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between items-center text-[10px] font-mono">
                <span className="text-muted">ROTATION SPEED</span>
                <span className="text-primary font-bold">{speed}x</span>
              </div>
              <input
                type="range"
                min="0.1"
                max="4.0"
                step="0.1"
                value={speed}
                onChange={(e) => setSpeed(Number(e.target.value))}
                className="w-full accent-primary h-1 bg-white/5 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            {/* Wave Noise Frequency Control */}
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between items-center text-[10px] font-mono">
                <span className="text-muted">WAVE FREQUENCY</span>
                <span className="text-primary font-bold">{noise}λ</span>
              </div>
              <input
                type="range"
                min="0.1"
                max="2.5"
                step="0.1"
                value={noise}
                onChange={(e) => setNoise(Number(e.target.value))}
                className="w-full accent-primary h-1 bg-white/5 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            {/* Particle Scale Size Control */}
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between items-center text-[10px] font-mono">
                <span className="text-muted">PARTICLE SCALE</span>
                <span className="text-primary font-bold">{size}px</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="4.0"
                step="0.1"
                value={size}
                onChange={(e) => setSize(Number(e.target.value))}
                className="w-full accent-primary h-1 bg-white/5 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            {/* Mouse Gravity Force Control */}
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between items-center text-[10px] font-mono">
                <span className="text-muted">MOUSE REPELLENT FORCE</span>
                <span className="text-primary font-bold">{mouseGravity}G</span>
              </div>
              <input
                type="range"
                min="0.0"
                max="4.0"
                step="0.1"
                value={mouseGravity}
                onChange={(e) => setMouseGravity(Number(e.target.value))}
                className="w-full accent-primary h-1 bg-white/5 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            {/* Color Palette Selector */}
            <div className="flex flex-col gap-2">
              <span className="text-[10px] font-mono text-muted uppercase">COLOR SPECTRUM</span>
              <div className="grid grid-cols-6 gap-2">
                {[
                  { value: "#FF6B00", label: "Orange" },
                  { value: "#38bdf8", label: "Cyan" },
                  { value: "#d946ef", label: "Magenta" },
                  { value: "#22c55e", label: "Emerald" },
                  { value: "#ffc857", label: "Yellow" },
                  { value: "#ffffff", label: "White" }
                ].map((c) => (
                  <button
                    key={c.value}
                    onClick={() => setColor(c.value)}
                    style={{ backgroundColor: c.value }}
                    className={`h-6 rounded-md border cursor-pointer transition-all ${
                      color === c.value ? "border-white scale-110 shadow-lg" : "border-transparent opacity-60 hover:opacity-100"
                    }`}
                    title={c.label}
                  />
                ))}
              </div>
            </div>

            {/* Density Count Control */}
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between items-center text-[10px] font-mono">
                <span className="text-muted">PARTICLE DENSITY</span>
                <span className="text-primary font-bold">{count.toLocaleString()} pts</span>
              </div>
              <input
                type="range"
                min="500"
                max="4000"
                step="250"
                value={count}
                onChange={(e) => setCount(Number(e.target.value))}
                className="w-full accent-primary h-1 bg-white/5 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="flex gap-2.5 mt-8 border-t border-white/5 pt-4">
          <button
            onClick={resetParams}
            className="flex-1 py-2 rounded-xl border border-white/10 hover:border-white/20 text-[10px] font-mono uppercase transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            Reset
          </button>
          <button
            onClick={randomizeParams}
            className="flex-1 py-2 rounded-xl bg-primary text-[10px] font-mono font-bold text-white hover:bg-transparent border border-primary transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-[0_0_15px_rgba(255,107,0,0.2)]"
          >
            <RefreshCw className="w-3 h-3" />
            MUTATE
          </button>
        </div>
      </div>
    </div>
  );
}
