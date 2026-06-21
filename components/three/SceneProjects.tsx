"use client";

import { useRef, useState, useMemo, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Float, Html, Sparkles, QuadraticBezierLine } from "@react-three/drei";
import * as THREE from "three";
import { Cpu, Globe, Server, Terminal, Play, Check, Landmark, Wheat, HardDrive } from "lucide-react";
import { projects, Project } from "../../content/projects";

interface SceneProjectsProps {
  active: boolean;
  selectedProject: number | null;
  setSelectedProject: (project: number | null) => void;
  scrollProgress: React.MutableRefObject<number>;
}

// ----------------------------------------------------
// Helper Component: Animated Energy Connection Bridge
// ----------------------------------------------------
interface EnergyBridgeProps {
  start: [number, number, number];
  end: [number, number, number];
  color: string;
}

function EnergyBridge({ start, end, color }: EnergyBridgeProps) {
  const lineRef = useRef<any>(null);
  const startVec = useMemo(() => new THREE.Vector3(...start), [start]);
  const endVec = useMemo(() => new THREE.Vector3(...end), [end]);
  
  // Calculate mid-point with an upward arch for a premium Bezier bridge look
  const midVec = useMemo(() => {
    const mid = new THREE.Vector3().addVectors(startVec, endVec).multiplyScalar(0.5);
    mid.y += 2.0; // arch height
    return mid;
  }, [startVec, endVec]);

  useFrame((state) => {
    if (lineRef.current) {
      // Pulse emission speed along the bridge line
      const t = state.clock.getElapsedTime();
      lineRef.current.material.dashOffset = -t * 0.5;
    }
  });

  return (
    <group>
      {/* Dashed animated Bezier core */}
      <QuadraticBezierLine
        ref={lineRef}
        start={startVec}
        end={endVec}
        mid={midVec}
        color={color}
        lineWidth={1.5}
        dashed
        dashScale={2}
        dashSize={0.5}
        gapSize={0.3}
        transparent
        opacity={0.6}
      />
      {/* Base faint reference wire */}
      <QuadraticBezierLine
        start={startVec}
        end={endVec}
        mid={midVec}
        color={color}
        lineWidth={0.5}
        transparent
        opacity={0.15}
      />
    </group>
  );
}

// ----------------------------------------------------
// Project Island 1: ManaKrishi (Smart Agriculture)
// ----------------------------------------------------
interface IslandProps {
  project: Project;
  idx: number;
  position: [number, number, number];
  selected: boolean;
  onSelect: () => void;
  isMobile: boolean;
  scrollProgress: React.MutableRefObject<number>;
}

function ManaKrishiIsland({ position, selected, onSelect, isMobile, project, idx }: IslandProps) {
  const [hovered, setHovered] = useState(false);
  const [isNear, setIsNear] = useState(false);
  const droneRef = useRef<THREE.Group>(null);
  const bladeRefs = useRef<THREE.Mesh[]>([]);
  const sensorRef = useRef<THREE.Mesh>(null);
  const { camera } = useThree();

  // Coordinates converted from relative array position
  const absPos = useMemo(() => {
    return new THREE.Vector3(position[0] - 15, position[1] - 25, position[2] - 75);
  }, [position]);

  useFrame((state, delta) => {
    // Check distance to camera for label visibility
    const dist = camera.position.distanceTo(absPos);
    setIsNear(dist < 18);

    // Flying Drone looping patrols
    if (droneRef.current) {
      const time = state.clock.getElapsedTime() * 1.2;
      const radius = 1.2;
      const dx = Math.cos(time) * radius;
      const dz = Math.sin(time) * radius;
      const dy = 0.8 + Math.sin(time * 2.5) * 0.15;
      
      droneRef.current.position.set(dx, dy, dz);
      droneRef.current.rotation.y = -time + Math.PI / 2;
      droneRef.current.rotation.z = Math.sin(time) * 0.15; // Lean into corners
    }

    // Spin drone blades
    bladeRefs.current.forEach((blade) => {
      if (blade) blade.rotation.y += delta * 25;
    });

    // Pulse sensor light
    if (sensorRef.current) {
      const t = state.clock.getElapsedTime();
      const intensity = 0.5 + Math.sin(t * 8) * 0.5;
      (sensorRef.current.material as THREE.MeshBasicMaterial).opacity = intensity;
    }
  });

  return (
    <group position={position}>
      <Float 
        speed={hovered ? 2.5 : 1.2} 
        floatIntensity={hovered ? 0.8 : 0.4} 
        rotationIntensity={hovered ? 0.3 : 0.1}
        floatingRange={hovered ? [-0.1, 0.3] : [-0.05, 0.05]}
      >
        {/* Clickable Invisible Bound box */}
        <mesh 
          visible={false} 
          onClick={(e) => {
            e.stopPropagation();
            onSelect();
          }}
          onPointerOver={(e) => {
            e.stopPropagation();
            setHovered(true);
            document.body.style.cursor = "pointer";
          }}
          onPointerOut={() => {
            setHovered(false);
            document.body.style.cursor = "default";
          }}
        >
          <cylinderGeometry args={[2.0, 2.0, 2.5, 6]} />
        </mesh>

        {/* Island Base */}
        <group>
          {/* Top Grass Level */}
          <mesh castShadow receiveShadow>
            <cylinderGeometry args={[1.5, 1.7, 0.3, 6]} />
            <meshStandardMaterial color={hovered ? "#1b4d22" : "#143a1a"} roughness={0.7} flatShading />
          </mesh>
          {/* Subsoil Rock Level */}
          <mesh position={[0, -0.4, 0]} castShadow>
            <cylinderGeometry args={[1.7, 1.4, 0.5, 6]} />
            <meshStandardMaterial color="#2d2d2d" roughness={0.9} flatShading />
          </mesh>
          <mesh position={[0, -0.9, 0]}>
            <cylinderGeometry args={[1.4, 0.1, 0.6, 6]} />
            <meshStandardMaterial color="#1a1a1a" roughness={1.0} flatShading />
          </mesh>
        </group>

        {/* Farm Grids & Crops */}
        <gridHelper args={[2.0, 6, "#22c55e", "#1b351b"]} position={[0, 0.16, 0]} />
        
        {/* Simple crops (re-purposed box arrays) */}
        {[-0.8, -0.4, 0, 0.4, 0.8].map((x, i) => (
          <group key={i} position={[x, 0.25, 0.3]}>
            <mesh>
              <boxGeometry args={[0.06, 0.2, 0.06]} />
              <meshStandardMaterial color="#22c55e" roughness={0.5} />
            </mesh>
            <mesh position={[0, 0.1, 0]}>
              <sphereGeometry args={[0.05, 4, 4]} />
              <meshBasicMaterial color="#eab308" />
            </mesh>
          </group>
        ))}

        {/* Smart Water Tank & Irrigation pipe */}
        <group position={[-0.8, 0.4, -0.6]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.25, 0.25, 0.6, 8]} />
            <meshStandardMaterial color="#475569" roughness={0.4} metalness={0.6} />
          </mesh>
          {/* Valve indicator */}
          <mesh position={[0.18, 0.1, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.08, 0.08, 0.05, 6]} />
            <meshStandardMaterial color="#3b82f6" />
          </mesh>
        </group>

        {/* IoT Weather Station Tower */}
        <group position={[0.8, 0.6, -0.8]}>
          {/* Metal Truss mast */}
          <mesh>
            <cylinderGeometry args={[0.04, 0.08, 1.0, 4]} />
            <meshStandardMaterial color="#94a3b8" wireframe />
          </mesh>
          {/* Sensor head */}
          <group position={[0, 0.5, 0]}>
            <mesh>
              <sphereGeometry args={[0.12, 8, 8]} />
              <meshStandardMaterial color="#1e293b" />
            </mesh>
            {/* Blinking signal beacon */}
            <mesh ref={sensorRef}>
              <sphereGeometry args={[0.06, 4, 4]} />
              <meshBasicMaterial color="#22c55e" transparent />
            </mesh>
          </group>
        </group>

        {/* Mini Solar Panel Array */}
        <group position={[0.8, 0.25, 0.7]} rotation={[0.4, -0.4, 0]}>
          <mesh castShadow>
            <boxGeometry args={[0.6, 0.04, 0.4]} />
            <meshStandardMaterial color="#1e3a8a" roughness={0.2} metalness={0.8} />
          </mesh>
          <mesh position={[0, -0.2, 0]}>
            <cylinderGeometry args={[0.03, 0.03, 0.4, 4]} />
            <meshStandardMaterial color="#64748b" />
          </mesh>
        </group>

        {/* Agricultural Flying Drone */}
        <group ref={droneRef} scale={0.7}>
          {/* Drone Chassis */}
          <mesh castShadow>
            <boxGeometry args={[0.3, 0.06, 0.3]} />
            <meshStandardMaterial color="#dc2626" roughness={0.3} metalness={0.7} />
          </mesh>
          {/* Rotors arms */}
          <mesh rotation={[0, Math.PI / 4, 0]}>
            <boxGeometry args={[0.55, 0.03, 0.05]} />
            <meshStandardMaterial color="#334155" />
          </mesh>
          <mesh rotation={[0, -Math.PI / 4, 0]}>
            <boxGeometry args={[0.55, 0.03, 0.05]} />
            <meshStandardMaterial color="#334155" />
          </mesh>
          {/* Blade Mounts and blades */}
          {[
            [0.2, 0.05, 0.2],
            [-0.2, 0.05, 0.2],
            [0.2, 0.05, -0.2],
            [-0.2, 0.05, -0.2]
          ].map((posArr, idx) => (
            <group key={idx} position={posArr as [number, number, number]}>
              <mesh ref={(el) => { if (el) bladeRefs.current[idx] = el; }}>
                <boxGeometry args={[0.25, 0.01, 0.02]} />
                <meshBasicMaterial color="#ffffff" transparent opacity={0.7} />
              </mesh>
            </group>
          ))}
          {/* Spraying mist particle emitter light */}
          <pointLight color="#60a5fa" intensity={1.5} distance={1.2} position={[0, -0.2, 0]} />
        </group>

        {/* Localized Floating Sparkles */}
        {!isMobile && (
          <Sparkles count={hovered ? 25 : 8} scale={2} size={1.5} speed={0.5} opacity={0.6} color="#4ade80" />
        )}

        {/* Holographic HUD Labels */}
        {isNear && (
          <Html distanceFactor={6} center position={[0, 1.4, 0]}>
            <div className={`flex flex-col items-center select-none pointer-events-none transition-all duration-300 ${
              hovered ? "scale-105" : "scale-95 opacity-80"
            }`}>
              {/* Glassmorphic Bubble */}
              <div className="px-3 py-1.5 rounded-xl border border-[#4ade80]/30 bg-black/80 backdrop-blur-md flex items-center gap-2 shadow-[0_0_15px_rgba(74,222,128,0.2)]">
                <Wheat className="w-3.5 h-3.5 text-[#4ade80]" />
                <div className="flex flex-col items-start leading-none">
                  <span className="font-space font-bold text-[10px] text-white tracking-wide">{project.title.split(" (")[0]}</span>
                  <span className="font-mono text-[7px] text-[#4ade80] uppercase tracking-wider mt-0.5">{project.category} module</span>
                </div>
              </div>
              
              {/* Tech Badges on Hover */}
              <div className={`flex gap-1 mt-2 transition-all duration-300 ${
                hovered ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1 pointer-events-none"
              }`}>
                {project.tech.slice(0, 3).map((t) => (
                  <span key={t} className="px-1.5 py-0.5 bg-[#143a1a]/60 border border-[#4ade80]/20 rounded font-mono text-[6px] text-[#4ade80] uppercase">
                    {t}
                  </span>
                ))}
              </div>
              <div className="w-0.5 h-6 bg-gradient-to-b from-[#4ade80]/40 to-transparent mt-1" />
            </div>
          </Html>
        )}
      </Float>
    </group>
  );
}

// ----------------------------------------------------
// Project Island 2: VisaEnsure (Immigration Platform)
// ----------------------------------------------------
function VisaEnsureIsland({ position, selected, onSelect, isMobile, project, idx }: IslandProps) {
  const [hovered, setHovered] = useState(false);
  const [isNear, setIsNear] = useState(false);
  const globeRef = useRef<THREE.Group>(null);
  const flightGroupRef = useRef<THREE.Group>(null);
  const { camera } = useThree();

  const absPos = useMemo(() => {
    return new THREE.Vector3(position[0] - 15, position[1] - 25, position[2] - 75);
  }, [position]);

  useFrame((state, delta) => {
    const dist = camera.position.distanceTo(absPos);
    setIsNear(dist < 18);

    // Rotate Globe
    if (globeRef.current) {
      globeRef.current.rotation.y += delta * 0.12;
    }

    // Animate Flights rotating on orbit
    if (flightGroupRef.current) {
      flightGroupRef.current.rotation.y += delta * 0.25;
      flightGroupRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.1;
    }
  });

  // Points representing geographic locations on the globe
  const markers = useMemo(() => [
    { pos: [0.5, 0.4, 0.1], color: "#ff9f1c" }, // NY
    { pos: [-0.4, 0.3, 0.4], color: "#00f5d4" }, // London
    { pos: [0.1, -0.4, 0.5], color: "#ff6b6b" }, // Mumbai
    { pos: [0.2, 0.5, -0.2], color: "#00f5d4" }  // Tokyo
  ], []);

  return (
    <group position={position}>
      <Float 
        speed={hovered ? 2.2 : 1.0} 
        floatIntensity={hovered ? 0.7 : 0.3} 
        rotationIntensity={hovered ? 0.4 : 0.15}
        floatingRange={hovered ? [-0.15, 0.25] : [-0.04, 0.04]}
      >
        {/* Clickable Invisible Bound Box */}
        <mesh 
          visible={false} 
          onClick={(e) => {
            e.stopPropagation();
            onSelect();
          }}
          onPointerOver={(e) => {
            e.stopPropagation();
            setHovered(true);
            document.body.style.cursor = "pointer";
          }}
          onPointerOut={() => {
            setHovered(false);
            document.body.style.cursor = "default";
          }}
        >
          <cylinderGeometry args={[2.0, 2.0, 2.5, 6]} />
        </mesh>

        {/* Island Base */}
        <group>
          <mesh castShadow receiveShadow>
            <cylinderGeometry args={[1.5, 1.7, 0.3, 6]} />
            <meshStandardMaterial color={hovered ? "#0f172a" : "#020617"} roughness={0.6} flatShading />
          </mesh>
          <mesh position={[0, -0.4, 0]} castShadow>
            <cylinderGeometry args={[1.7, 1.4, 0.5, 6]} />
            <meshStandardMaterial color="#2d2d2d" roughness={0.9} flatShading />
          </mesh>
          <mesh position={[0, -0.9, 0]}>
            <cylinderGeometry args={[1.4, 0.1, 0.6, 6]} />
            <meshStandardMaterial color="#111" roughness={1.0} flatShading />
          </mesh>
        </group>

        {/* Neon blue server circuit paths on the base */}
        <gridHelper args={[1.8, 8, "#38bdf8", "#0369a1"]} position={[0, 0.16, 0]} />

        {/* Miniature Earth Core Globe */}
        <group ref={globeRef} position={[0, 0.8, 0]}>
          {/* Central Blue Sphere */}
          <mesh>
            <sphereGeometry args={[0.5, 16, 16]} />
            <meshStandardMaterial color="#0f172a" roughness={0.8} emissive="#0284c7" emissiveIntensity={0.2} />
          </mesh>
          {/* Wireframe Globe grid outline */}
          <mesh>
            <sphereGeometry args={[0.52, 12, 12]} />
            <meshBasicMaterial color="#0284c7" wireframe transparent opacity={0.3} />
          </mesh>

          {/* Location markers */}
          {markers.map((marker, idx) => (
            <mesh key={idx} position={marker.pos as [number, number, number]}>
              <sphereGeometry args={[0.04, 6, 6]} />
              <meshBasicMaterial color={marker.color} />
            </mesh>
          ))}
        </group>

        {/* Flight Arcs and Flights */}
        <group ref={flightGroupRef} position={[0, 0.8, 0]}>
          {/* Air flight path orbit */}
          <mesh rotation={[Math.PI / 3, 0, 0]}>
            <torusGeometry args={[0.75, 0.008, 6, 32]} />
            <meshBasicMaterial color="#0284c7" transparent opacity={0.2} />
          </mesh>
          <mesh rotation={[-Math.PI / 4, Math.PI / 4, 0]}>
            <torusGeometry args={[0.85, 0.008, 6, 32]} />
            <meshBasicMaterial color="#00f5d4" transparent opacity={0.15} />
          </mesh>
          
          {/* Miniature Airplane */}
          <group position={[0.75, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <mesh>
              <coneGeometry args={[0.05, 0.15, 4]} />
              <meshStandardMaterial color="#f8fafc" emissive="#0284c7" emissiveIntensity={0.5} />
            </mesh>
            <mesh position={[0, -0.05, 0]} rotation={[Math.PI / 2, 0, 0]}>
              <boxGeometry args={[0.18, 0.01, 0.04]} />
              <meshStandardMaterial color="#cbd5e1" />
            </mesh>
          </group>
        </group>

        {/* Localized Floating Sparkles */}
        {!isMobile && (
          <Sparkles count={hovered ? 30 : 10} scale={2} size={1.8} speed={0.4} opacity={0.7} color="#38bdf8" />
        )}

        {/* Holographic HUD Label */}
        {isNear && (
          <Html distanceFactor={6} center position={[0, 1.5, 0]}>
            <div className={`flex flex-col items-center select-none pointer-events-none transition-all duration-300 ${
              hovered ? "scale-105" : "scale-95 opacity-80"
            }`}>
              {/* Glassmorphic Bubble */}
              <div className="px-3 py-1.5 rounded-xl border border-[#38bdf8]/30 bg-black/80 backdrop-blur-md flex items-center gap-2 shadow-[0_0_15px_rgba(56,189,248,0.2)]">
                <Globe className="w-3.5 h-3.5 text-[#38bdf8] animate-spin-slow" />
                <div className="flex flex-col items-start leading-none">
                  <span className="font-space font-bold text-[10px] text-white tracking-wide">{project.title.split(" (")[0]}</span>
                  <span className="font-mono text-[7px] text-[#38bdf8] uppercase tracking-wider mt-0.5">{project.category} module</span>
                </div>
              </div>
              
              {/* Tech Badges on Hover */}
              <div className={`flex gap-1 mt-2 transition-all duration-300 ${
                hovered ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1 pointer-events-none"
              }`}>
                {project.tech.slice(0, 3).map((t) => (
                  <span key={t} className="px-1.5 py-0.5 bg-[#0f172a]/60 border border-[#38bdf8]/20 rounded font-mono text-[6px] text-[#38bdf8] uppercase">
                    {t}
                  </span>
                ))}
              </div>
              <div className="w-0.5 h-6 bg-gradient-to-b from-[#38bdf8]/40 to-transparent mt-1" />
            </div>
          </Html>
        )}
      </Float>
    </group>
  );
}

// ----------------------------------------------------
// Project Island 3: Cloud VPC (Architecture Visual)
// ----------------------------------------------------
function CloudVPCIsland({ position, selected, onSelect, isMobile, project, idx }: IslandProps) {
  const [hovered, setHovered] = useState(false);
  const [isNear, setIsNear] = useState(false);
  const lbRef = useRef<THREE.Mesh>(null);
  const dataPacketRefs = useRef<THREE.Mesh[]>([]);
  const { camera } = useThree();

  const absPos = useMemo(() => {
    return new THREE.Vector3(position[0] - 15, position[1] - 25, position[2] - 75);
  }, [position]);

  // Network connection lines mapping nodes
  const networkNodes = useMemo(() => [
    { start: [-0.6, 0.4, 0.4], end: [0.6, 0.4, 0.4], color: "#ea580c" },
    { start: [0, 0.7, -0.4], end: [-0.6, 0.4, 0.4], color: "#ea580c" },
    { start: [0, 0.7, -0.4], end: [0.6, 0.4, 0.4], color: "#ea580c" }
  ], []);

  useFrame((state, delta) => {
    const dist = camera.position.distanceTo(absPos);
    setIsNear(dist < 18);

    // Rotate load balancer
    if (lbRef.current) {
      lbRef.current.rotation.y += delta * 2;
    }

    // Move data packets along network pathways
    dataPacketRefs.current.forEach((packet, idx) => {
      if (packet) {
        const t = (state.clock.getElapsedTime() * 0.8 + idx * 0.3) % 1.0;
        const node = networkNodes[idx % networkNodes.length];
        const startVec = new THREE.Vector3(...node.start);
        const endVec = new THREE.Vector3(...node.end);
        packet.position.copy(startVec).lerp(endVec, t);
      }
    });
  });

  return (
    <group position={position}>
      <Float 
        speed={hovered ? 2.6 : 1.4} 
        floatIntensity={hovered ? 0.9 : 0.5} 
        rotationIntensity={hovered ? 0.3 : 0.1}
        floatingRange={hovered ? [-0.1, 0.35] : [-0.06, 0.06]}
      >
        {/* Clickable Invisible Bound Box */}
        <mesh 
          visible={false} 
          onClick={(e) => {
            e.stopPropagation();
            onSelect();
          }}
          onPointerOver={(e) => {
            e.stopPropagation();
            setHovered(true);
            document.body.style.cursor = "pointer";
          }}
          onPointerOut={() => {
            setHovered(false);
            document.body.style.cursor = "default";
          }}
        >
          <cylinderGeometry args={[2.0, 2.0, 2.5, 6]} />
        </mesh>

        {/* Island Base */}
        <group>
          <mesh castShadow receiveShadow>
            <cylinderGeometry args={[1.5, 1.7, 0.3, 6]} />
            <meshStandardMaterial color={hovered ? "#291b10" : "#1a120b"} roughness={0.7} flatShading />
          </mesh>
          <mesh position={[0, -0.4, 0]} castShadow>
            <cylinderGeometry args={[1.7, 1.4, 0.5, 6]} />
            <meshStandardMaterial color="#222" roughness={0.9} flatShading />
          </mesh>
          <mesh position={[0, -0.9, 0]}>
            <cylinderGeometry args={[1.4, 0.1, 0.6, 6]} />
            <meshStandardMaterial color="#0c0c0c" roughness={1.0} flatShading />
          </mesh>
        </group>

        {/* Circuit board micro lines */}
        <gridHelper args={[1.8, 8, "#ea580c", "#7c2d12"]} position={[0, 0.16, 0]} />

        {/* VPC Boundary glowing outline box */}
        <mesh position={[0, 0.5, 0]}>
          <boxGeometry args={[1.8, 0.8, 1.8]} />
          <meshBasicMaterial color="#ea580c" wireframe transparent opacity={0.15} />
        </mesh>

        {/* Load Balancer node (spinning prism) */}
        <group position={[0, 0.7, -0.4]}>
          <mesh ref={lbRef} castShadow>
            <cylinderGeometry args={[0, 0.2, 0.3, 4]} />
            <meshStandardMaterial color="#ea580c" roughness={0.3} metalness={0.7} emissive="#ea580c" emissiveIntensity={0.2} />
          </mesh>
          <mesh position={[0, -0.25, 0]}>
            <boxGeometry args={[0.08, 0.2, 0.08]} />
            <meshStandardMaterial color="#78716c" />
          </mesh>
        </group>

        {/* EC2 Server Racks */}
        {[
          [-0.6, 0.4, 0.4], // Server A
          [0.6, 0.4, 0.4]   // Server B
        ].map((srvPos, idx) => (
          <group key={idx} position={srvPos as [number, number, number]}>
            {/* Server metal housing */}
            <mesh castShadow>
              <boxGeometry args={[0.35, 0.5, 0.35]} />
              <meshStandardMaterial color="#3f3f46" roughness={0.4} metalness={0.8} />
            </mesh>
            {/* Status led panel */}
            <mesh position={[0, 0.15, 0.18]}>
              <boxGeometry args={[0.2, 0.05, 0.02]} />
              <meshBasicMaterial color={idx === 0 ? "#22c55e" : "#ea580c"} />
            </mesh>
            <mesh position={[0, 0, 0.18]}>
              <boxGeometry args={[0.2, 0.05, 0.02]} />
              <meshBasicMaterial color="#22c55e" />
            </mesh>
          </group>
        ))}

        {/* Network connections (draw nodes manually) */}
        {networkNodes.map((node, i) => (
          <group key={i}>
            {/* Glowing moving packet */}
            <mesh ref={(el) => { if (el) dataPacketRefs.current[i] = el; }}>
              <sphereGeometry args={[0.04, 6, 6]} />
              <meshBasicMaterial color="#f97316" />
            </mesh>
          </group>
        ))}

        {/* Localized Floating Sparkles */}
        {!isMobile && (
          <Sparkles count={hovered ? 25 : 8} scale={2} size={1.5} speed={0.4} opacity={0.6} color="#f97316" />
        )}

        {/* Holographic HUD Label */}
        {isNear && (
          <Html distanceFactor={6} center position={[0, 1.4, 0]}>
            <div className={`flex flex-col items-center select-none pointer-events-none transition-all duration-300 ${
              hovered ? "scale-105" : "scale-95 opacity-80"
            }`}>
              {/* Glassmorphic Bubble */}
              <div className="px-3 py-1.5 rounded-xl border border-[#ea580c]/30 bg-black/80 backdrop-blur-md flex items-center gap-2 shadow-[0_0_15px_rgba(234,88,12,0.2)]">
                <Server className="w-3.5 h-3.5 text-[#ea580c]" />
                <div className="flex flex-col items-start leading-none">
                  <span className="font-space font-bold text-[10px] text-white tracking-wide">{project.title.split(" (")[0]}</span>
                  <span className="font-mono text-[7px] text-[#ea580c] uppercase tracking-wider mt-0.5">{project.category} module</span>
                </div>
              </div>
              
              {/* Tech Badges on Hover */}
              <div className={`flex gap-1 mt-2 transition-all duration-300 ${
                hovered ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1 pointer-events-none"
              }`}>
                {project.tech.slice(0, 3).map((t) => (
                  <span key={t} className="px-1.5 py-0.5 bg-[#291b10]/60 border border-[#ea580c]/20 rounded font-mono text-[6px] text-[#ea580c] uppercase">
                    {t}
                  </span>
                ))}
              </div>
              <div className="w-0.5 h-6 bg-gradient-to-b from-[#ea580c]/40 to-transparent mt-1" />
            </div>
          </Html>
        )}
      </Float>
    </group>
  );
}

// ----------------------------------------------------
// Project Island 4: Portfolio (Personal Digital Universe)
// ----------------------------------------------------
function PortfolioIsland({ position, selected, onSelect, isMobile, project, idx }: IslandProps) {
  const [hovered, setHovered] = useState(false);
  const [isNear, setIsNear] = useState(false);
  const orbRef = useRef<THREE.Mesh>(null);
  const screenRef = useRef<THREE.Group>(null);
  const { camera } = useThree();

  const absPos = useMemo(() => {
    return new THREE.Vector3(position[0] - 15, position[1] - 25, position[2] - 75);
  }, [position]);

  useFrame((state, delta) => {
    const dist = camera.position.distanceTo(absPos);
    setIsNear(dist < 18);

    // AI Assistant Orb floating, pulsing scale
    if (orbRef.current) {
      const t = state.clock.getElapsedTime();
      const scale = 0.35 + Math.sin(t * 3) * 0.05;
      orbRef.current.scale.set(scale, scale, scale);
      orbRef.current.rotation.y += delta * 0.5;
      orbRef.current.rotation.x += delta * 0.3;
    }

    // Screens rotating orbit
    if (screenRef.current) {
      screenRef.current.rotation.y += delta * 0.2;
    }
  });

  return (
    <group position={position}>
      <Float 
        speed={hovered ? 2.8 : 1.5} 
        floatIntensity={hovered ? 0.95 : 0.45} 
        rotationIntensity={hovered ? 0.4 : 0.1}
        floatingRange={hovered ? [-0.1, 0.35] : [-0.05, 0.05]}
      >
        {/* Clickable Invisible Bound Box */}
        <mesh 
          visible={false} 
          onClick={(e) => {
            e.stopPropagation();
            onSelect();
          }}
          onPointerOver={(e) => {
            e.stopPropagation();
            setHovered(true);
            document.body.style.cursor = "pointer";
          }}
          onPointerOut={() => {
            setHovered(false);
            document.body.style.cursor = "default";
          }}
        >
          <cylinderGeometry args={[2.0, 2.0, 2.5, 6]} />
        </mesh>

        {/* Island Base */}
        <group>
          <mesh castShadow receiveShadow>
            <cylinderGeometry args={[1.5, 1.7, 0.3, 6]} />
            <meshStandardMaterial color={hovered ? "#221133" : "#11051c"} roughness={0.7} flatShading />
          </mesh>
          <mesh position={[0, -0.4, 0]} castShadow>
            <cylinderGeometry args={[1.7, 1.4, 0.5, 6]} />
            <meshStandardMaterial color="#222" roughness={0.9} flatShading />
          </mesh>
          <mesh position={[0, -0.9, 0]}>
            <cylinderGeometry args={[1.4, 0.1, 0.6, 6]} />
            <meshStandardMaterial color="#06020c" roughness={1.0} flatShading />
          </mesh>
        </group>

        {/* Holographic motherboard grid */}
        <gridHelper args={[1.8, 8, "#d946ef", "#701a75"]} position={[0, 0.16, 0]} />

        {/* Core AI Assistant Orb */}
        <mesh ref={orbRef} position={[0, 0.75, 0]}>
          <icosahedronGeometry args={[0.5, 2]} />
          <meshPhysicalMaterial 
            color="#d946ef" 
            wireframe 
            roughness={0.1}
            transmission={0.6}
            thickness={0.5}
            emissive="#a21caf"
            emissiveIntensity={0.8}
          />
        </mesh>

        {/* Point light in the core */}
        <pointLight color="#d946ef" intensity={1.8} distance={2.5} position={[0, 0.75, 0]} />

        {/* Rotating Holographic screens */}
        <group ref={screenRef} position={[0, 0.75, 0]}>
          {/* Glass dashboard screen 1 */}
          <group position={[0.7, 0.1, 0]} rotation={[0, Math.PI / 2, 0]}>
            <mesh>
              <boxGeometry args={[0.35, 0.25, 0.01]} />
              <meshPhysicalMaterial color="#c084fc" transmission={0.7} transparent opacity={0.6} roughness={0.2} />
            </mesh>
            {/* Visual indicator lines on screen */}
            <mesh position={[0, 0, 0.007]}>
              <boxGeometry args={[0.25, 0.02, 0.002]} />
              <meshBasicMaterial color="#d946ef" />
            </mesh>
          </group>

          {/* Glass dashboard screen 2 */}
          <group position={[-0.7, 0.1, 0]} rotation={[0, -Math.PI / 2, 0]}>
            <mesh>
              <boxGeometry args={[0.35, 0.25, 0.01]} />
              <meshPhysicalMaterial color="#c084fc" transmission={0.7} transparent opacity={0.6} roughness={0.2} />
            </mesh>
            <mesh position={[0, 0, 0.007]}>
              <boxGeometry args={[0.2, 0.02, 0.002]} />
              <meshBasicMaterial color="#a21caf" />
            </mesh>
          </group>
        </group>

        {/* Localized Floating Sparkles */}
        {!isMobile && (
          <Sparkles count={hovered ? 30 : 12} scale={2} size={1.5} speed={0.5} opacity={0.8} color="#d946ef" />
        )}

        {/* Holographic HUD Label */}
        {isNear && (
          <Html distanceFactor={6} center position={[0, 1.4, 0]}>
            <div className={`flex flex-col items-center select-none pointer-events-none transition-all duration-300 ${
              hovered ? "scale-105" : "scale-95 opacity-80"
            }`}>
              {/* Glassmorphic Bubble */}
              <div className="px-3 py-1.5 rounded-xl border border-[#d946ef]/30 bg-black/80 backdrop-blur-md flex items-center gap-2 shadow-[0_0_15px_rgba(217,70,239,0.2)]">
                <Terminal className="w-3.5 h-3.5 text-[#d946ef]" />
                <div className="flex flex-col items-start leading-none">
                  <span className="font-space font-bold text-[10px] text-white tracking-wide">{project.title.split(" (")[0]}</span>
                  <span className="font-mono text-[7px] text-[#d946ef] uppercase tracking-wider mt-0.5">{project.category} module</span>
                </div>
              </div>
              
              {/* Tech Badges on Hover */}
              <div className={`flex gap-1 mt-2 transition-all duration-300 ${
                hovered ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1 pointer-events-none"
              }`}>
                {project.tech.slice(0, 3).map((t) => (
                  <span key={t} className="px-1.5 py-0.5 bg-[#221133]/60 border border-[#d946ef]/20 rounded font-mono text-[6px] text-[#d946ef] uppercase">
                    {t}
                  </span>
                ))}
              </div>
              <div className="w-0.5 h-6 bg-gradient-to-b from-[#d946ef]/40 to-transparent mt-1" />
            </div>
          </Html>
        )}
      </Float>
    </group>
  );
}

// ----------------------------------------------------
// Core Scene Assembly
// ----------------------------------------------------
export function SceneProjects({ active, selectedProject, setSelectedProject, scrollProgress }: SceneProjectsProps) {
  const groupRef = useRef<THREE.Group>(null);
  const [visible, setVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Check screen size for mobile optimizations
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useFrame((state) => {
    // Frustum culling based on distance to projects node origin ([-15, -25, -75])
    if (groupRef.current) {
      const dist = state.camera.position.distanceTo(new THREE.Vector3(-15, -25, -75));
      // Show scene when camera is within 55 units
      const isNear = dist < 55;
      if (isNear !== visible) {
        setVisible(isNear);
      }
    }
  });

  // Relative coordinates within the scene group [-15, -25, -75]
  const positions: [number, number, number][] = [
    [-5, 8, 20],   // Project 0 (ManaKrishi / KrishiUnnati)
    [4, 5, 13],    // Project 1 (VisaEnsure AI)
    [-5, 3, 6],    // Project 2 (Manakrishi App)
    [4, 1, -1],    // Project 3 (RK Projects)
    [-5, -1, -8],  // Project 4 (Prolance Network)
    [4, -3, -15],  // Project 5 (3-Tier VPC Architecture)
    [-5, -5, -22], // Project 6 (Elegance Events)
    [4, -7, -29]   // Project 7 (3D Command Center Portfolio)
  ];

  return (
    <group ref={groupRef}>
      {visible && (
        <group>
          {/* Energy Bridges Connecting the Project Progression Spline */}
          {positions.slice(0, positions.length - 1).map((pos, idx) => (
            <EnergyBridge 
              key={idx} 
              start={pos} 
              end={positions[idx + 1]} 
              color={
                idx % 4 === 0 ? "#00f5d4" :
                idx % 4 === 1 ? "#ea580c" :
                idx % 4 === 2 ? "#d946ef" :
                "#38bdf8"
              } 
            />
          ))}

          {/* Floating Atmospheric Sparkles in Project Galaxy */}
          {!isMobile && (
            <Sparkles count={120} scale={18} size={1.2} speed={0.2} opacity={0.5} color="#38bdf8" />
          )}

          {/* 8 Floating Islands */}
          {projects.map((proj, idx) => {
            const pos = positions[idx];
            const isSelected = selectedProject === idx;
            const selectProjectHandler = () => setSelectedProject(idx);

            if (idx % 4 === 0) {
              return (
                <ManaKrishiIsland 
                  key={proj.id}
                  project={proj}
                  idx={idx}
                  position={pos} 
                  selected={isSelected} 
                  onSelect={selectProjectHandler}
                  isMobile={isMobile}
                  scrollProgress={scrollProgress}
                />
              );
            }
            if (idx % 4 === 1) {
              return (
                <VisaEnsureIsland 
                  key={proj.id}
                  project={proj}
                  idx={idx}
                  position={pos} 
                  selected={isSelected} 
                  onSelect={selectProjectHandler}
                  isMobile={isMobile}
                  scrollProgress={scrollProgress}
                />
              );
            }
            if (idx % 4 === 2) {
              return (
                <CloudVPCIsland 
                  key={proj.id}
                  project={proj}
                  idx={idx}
                  position={pos} 
                  selected={isSelected} 
                  onSelect={selectProjectHandler}
                  isMobile={isMobile}
                  scrollProgress={scrollProgress}
                />
              );
            }
            return (
              <PortfolioIsland 
                key={proj.id}
                project={proj}
                idx={idx}
                position={pos} 
                selected={isSelected} 
                onSelect={selectProjectHandler}
                isMobile={isMobile}
                scrollProgress={scrollProgress}
              />
            );
          })}
        </group>
      )}
    </group>
  );
}

export default SceneProjects;
