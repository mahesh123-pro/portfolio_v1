"use client";

import { useState, useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import * as THREE from "three";
import * as LucideIcons from "lucide-react";
import { skillsData, Skill } from "../../content/skills";

// Fallback icon resolver to prevent compilation crashes on missing Lucide icons
const IconHelper = ({ name, className }: { name: string; className?: string }) => {
  // Map custom names to standard Lucide icons
  const iconMap: Record<string, string> = {
    Container: "Package",
    Grid: "LayoutGrid",
    FileCode: "FileCode",
    Coffee: "Terminal",
    Flame: "Flame",
    Wind: "Sparkles",
  };

  const resolvedName = iconMap[name] || name;
  const IconComponent = (LucideIcons as any)[resolvedName] || LucideIcons.Code;
  return <IconComponent className={className} />;
};

interface OrbitNodeProps {
  skill: Skill;
  radius: number;
  speed: number;
  initialAngle: number;
  isActive: boolean;
  onSelect: (skill: Skill | null) => void;
  selectedSkill: Skill | null;
}

// Individual Skill Node in 3D orbit
function OrbitNode({
  skill,
  radius,
  speed,
  initialAngle,
  isActive,
  onSelect,
  selectedSkill,
}: OrbitNodeProps) {
  const nodeRef = useRef<THREE.Group>(null);
  const angleRef = useRef(initialAngle);

  useFrame((state) => {
    if (nodeRef.current) {
      // If this skill is clicked, pause its orbit
      const isSelected = selectedSkill?.name === skill.name;
      if (!isSelected) {
        angleRef.current += speed * 0.005;
      }
      
      const x = Math.cos(angleRef.current) * radius;
      const z = Math.sin(angleRef.current) * radius;
      nodeRef.current.position.set(x, 0, z);
    }
  });

  const isSelected = selectedSkill?.name === skill.name;

  return (
    <group ref={nodeRef}>
      <Html distanceFactor={12} center>
        <div
          onClick={(e) => {
            e.stopPropagation();
            onSelect(isSelected ? null : skill);
          }}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all duration-300 cursor-pointer whitespace-nowrap select-none backdrop-blur-md ${
            isSelected
              ? "bg-primary border-primary text-white scale-110 shadow-[0_0_20px_rgba(255,107,0,0.6)] z-50"
              : isActive
              ? "bg-surface/90 border-white/10 text-white hover:border-primary/50 hover:scale-105"
              : "bg-surface/20 border-white/5 text-white/30 scale-90 pointer-events-none"
          }`}
        >
          <IconHelper
            name={skill.icon}
            className={`w-3.5 h-3.5 ${isSelected ? "text-white" : "text-primary"}`}
          />
          <span className="text-xs font-mono font-medium">{skill.name}</span>
        </div>
      </Html>
    </group>
  );
}

interface OrbitRingProps {
  radius: number;
  color: string;
  opacity: number;
}

// Visual 3D Ring representing orbit path
function OrbitRing({ radius, color, opacity }: OrbitRingProps) {
  const points = useMemo(() => {
    const arr = [];
    const segments = 64;
    for (let i = 0; i <= segments; i++) {
      const theta = (i / segments) * Math.PI * 2;
      arr.push(new THREE.Vector3(Math.cos(theta) * radius, 0, Math.sin(theta) * radius));
    }
    return arr;
  }, [radius]);

  return (
    <line>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[new Float32Array(points.flatMap((p) => [p.x, p.y, p.z])), 3]}
        />
      </bufferGeometry>
      <lineBasicMaterial color={color} transparent opacity={opacity} linewidth={1} />
    </line>
  );
}

export function SkillsUniverse() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);

  // Set up orbits and layout for each category
  const categories = skillsData;

  return (
    <div className="relative w-full h-[550px] md:h-[650px] bg-dark/40 rounded-2xl border border-white/5 overflow-hidden">
      {/* Category Tabs Overlay */}
      <div className="absolute top-4 left-0 right-0 z-30 flex flex-wrap justify-center gap-1.5 px-4">
        <button
          onClick={() => {
            setActiveCategory("all");
            setSelectedSkill(null);
          }}
          className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all border ${
            activeCategory === "all"
              ? "bg-primary border-primary text-white"
              : "bg-surface/60 border-white/5 text-muted hover:border-white/20 hover:text-white"
          }`}
        >
          ALL UNIVERSE
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => {
              setActiveCategory(cat.id);
              setSelectedSkill(null);
            }}
            className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all border ${
              activeCategory === cat.id
                ? "bg-primary border-primary text-white"
                : "bg-surface/60 border-white/5 text-muted hover:border-white/20 hover:text-white"
            }`}
          >
            {cat.name.toUpperCase()}
          </button>
        ))}
      </div>

      {/* R3F Canvas */}
      <div className="w-full h-full">
        <Canvas camera={{ position: [0, 8, 8], fov: 60 }} dpr={[1, 2]}>
          <ambientLight intensity={0.4} />
          <pointLight position={[0, 5, 0]} intensity={1.5} color="#FF6B00" />

          {/* Central Sun represent core engineer */}
          <mesh position={[0, 0, 0]}>
            <sphereGeometry args={[0.6, 32, 32]} />
            <meshBasicMaterial color="#FF6B00" toneMapped={false} />
            <Html center>
              <div className="pointer-events-none select-none text-[10px] font-mono font-bold tracking-widest text-primary uppercase text-center mt-12 bg-dark/80 px-2 py-0.5 rounded border border-primary/20 whitespace-nowrap">
                BM Core
              </div>
            </Html>
          </mesh>

          {/* Central Sun Halo glow */}
          <mesh position={[0, 0, 0]}>
            <sphereGeometry args={[0.9, 16, 16]} />
            <meshBasicMaterial color="#FFC857" transparent opacity={0.12} wireframe />
          </mesh>

          {/* Orbits and Nodes mapping */}
          {categories.map((cat, catIdx) => {
            const orbitRadius = 1.8 + catIdx * 0.95; // Staggered radiuses
            const isCatActive = activeCategory === "all" || activeCategory === cat.id;

            return (
              <group key={cat.id}>
                {/* Orbit Path line */}
                <OrbitRing
                  radius={orbitRadius}
                  color={isCatActive ? "#FF6B00" : "#ffffff"}
                  opacity={isCatActive ? 0.15 : 0.03}
                />

                {/* Nodes on this orbit */}
                {cat.skills.map((skill, skillIdx) => {
                  const nodeCount = cat.skills.length;
                  const initialAngle = (skillIdx / nodeCount) * Math.PI * 2;
                  const speed = 0.5 + (5 - catIdx) * 0.15; // Inner circles rotate faster

                  return (
                    <OrbitNode
                      key={skill.name}
                      skill={skill}
                      radius={orbitRadius}
                      speed={speed}
                      initialAngle={initialAngle}
                      isActive={isCatActive}
                      selectedSkill={selectedSkill}
                      onSelect={setSelectedSkill}
                    />
                  );
                })}
              </group>
            );
          })}

          <OrbitControls
            enableZoom={true}
            maxDistance={15}
            minDistance={4}
            maxPolarAngle={Math.PI / 2 - 0.05} // Prevent going below grid floor
            enablePan={false}
          />
        </Canvas>
      </div>

      {/* Selected Skill Information Tooltip Panel */}
      {selectedSkill && (
        <div className="absolute bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80 p-4 rounded-xl glass-panel border border-primary/30 glow-primary backdrop-blur-xl z-30 transition-all duration-300 animate-in fade-in slide-in-from-bottom-4">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h4 className="text-sm font-mono font-bold text-white flex items-center gap-2">
                <IconHelper name={selectedSkill.icon} className="w-4 h-4 text-primary" />
                {selectedSkill.name}
              </h4>
              <span className="text-[10px] font-mono text-muted uppercase">
                {selectedSkill.years} Years Experience
              </span>
            </div>
            <button
              onClick={() => setSelectedSkill(null)}
              className="text-muted hover:text-white transition-colors"
            >
              <LucideIcons.X className="w-4 h-4" />
            </button>
          </div>
          <p className="text-xs text-muted mb-3 font-sans leading-relaxed">
            {selectedSkill.details}
          </p>
          <div>
            <div className="flex justify-between text-[10px] font-mono text-white/70 mb-1">
              <span>PROFICIENCY</span>
              <span className="text-primary">{selectedSkill.proficiency}%</span>
            </div>
            <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden border border-white/5">
              <div
                className="bg-primary h-full rounded-full transition-all duration-500 shadow-[0_0_8px_rgba(255,107,0,0.8)]"
                style={{ width: `${selectedSkill.proficiency}%` }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SkillsUniverse;
