"use client";

import { useState, useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Html, Stars, Float, Sparkles, Trail } from "@react-three/drei";
import * as THREE from "three";
import * as LucideIcons from "lucide-react";
import { skillsData, Skill } from "../../content/skills";

// Fallback icon resolver to prevent compilation crashes on missing Lucide icons
const IconHelper = ({ name, className, style }: { name: string; className?: string, style?: React.CSSProperties }) => {
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
  return <IconComponent className={className} style={style} />;
};

const categoryColors = [
  "#FF6B00", // primary orange
  "#00E5FF", // cyan
  "#B5179E", // purple
  "#4CC9F0", // blue
  "#F72585", // pink
  "#7209B7"  // deep purple
];

interface OrbitNodeProps {
  skill: Skill;
  radius: number;
  speed: number;
  initialAngle: number;
  isActive: boolean;
  onSelect: (skill: Skill | null) => void;
  selectedSkill: Skill | null;
  color: string;
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
  color
}: OrbitNodeProps) {
  const nodeRef = useRef<THREE.Group>(null);
  const planetRef = useRef<THREE.Mesh>(null);
  const angleRef = useRef(initialAngle);

  useFrame((state, delta) => {
    if (nodeRef.current) {
      // If this skill is clicked, pause its orbit
      const isSelected = selectedSkill?.name === skill.name;
      if (!isSelected) {
        angleRef.current += speed * 0.3 * delta;
      }
      
      const x = Math.cos(angleRef.current) * radius;
      const z = Math.sin(angleRef.current) * radius;
      nodeRef.current.position.set(x, 0, z);

      if (planetRef.current && !isSelected) {
        planetRef.current.rotation.y += delta;
        planetRef.current.rotation.x += delta * 0.5;
      }
    }
  });

  const isSelected = selectedSkill?.name === skill.name;

  return (
    <group ref={nodeRef}>
      <Trail
        width={isActive ? 0.5 : 0.05}
        color={color}
        length={isSelected ? 0 : 4} // Hide trail when selected
        decay={1}
        attenuation={(t) => t * t}
      >
        <mesh 
          ref={planetRef} 
          onClick={(e) => {
            e.stopPropagation();
            onSelect(isSelected ? null : skill);
          }}
          onPointerOver={(e) => {
            e.stopPropagation();
            document.body.style.cursor = 'pointer';
          }}
          onPointerOut={(e) => {
            e.stopPropagation();
            document.body.style.cursor = 'auto';
          }}
        >
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshStandardMaterial 
            color={isActive ? color : "#333333"} 
            emissive={isActive ? color : "#000000"} 
            emissiveIntensity={isSelected ? 2 : (isActive ? 0.8 : 0)} 
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>
      </Trail>

      <Html distanceFactor={isSelected ? 6 : 10} center position={[0, isSelected ? 0.5 : 0.3, 0]} zIndexRange={[100, 0]}>
        <div
          onClick={(e) => {
            e.stopPropagation();
            onSelect(isSelected ? null : skill);
          }}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border transition-all duration-300 cursor-pointer whitespace-nowrap select-none backdrop-blur-md ${
            isSelected
              ? "bg-dark/80 text-white scale-125 z-50"
              : isActive
              ? "bg-dark/60 text-white hover:scale-110"
              : "bg-surface/10 border-white/5 text-white/20 scale-75 pointer-events-none"
          }`}
          style={{
             borderColor: isSelected ? color : isActive ? `${color}60` : undefined,
             boxShadow: isSelected ? `0 0 20px ${color}80` : undefined
          }}
        >
          <IconHelper
            name={skill.icon}
            className={`w-3.5 h-3.5`}
            style={{ color: isSelected ? '#fff' : isActive ? color : '#555' }}
          />
          <span className="text-[10px] font-mono font-medium">{skill.name}</span>
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

  // Global reset cursor when component unmounts
  useEffect(() => {
    return () => {
      document.body.style.cursor = 'auto';
    };
  }, []);

  return (
    <div className="relative w-full h-[550px] md:h-[650px] bg-[#050505] rounded-2xl border border-white/5 overflow-hidden shadow-2xl">
      {/* Category Tabs Overlay */}
      <div className="absolute top-4 left-0 right-0 z-30 flex flex-wrap justify-center gap-2 px-4">
        <button
          onClick={() => {
            setActiveCategory("all");
            setSelectedSkill(null);
          }}
          className={`px-4 py-1.5 rounded-full text-xs font-mono transition-all border backdrop-blur-md ${
            activeCategory === "all"
              ? "bg-primary/20 border-primary text-white shadow-[0_0_15px_rgba(255,107,0,0.4)]"
              : "bg-surface/40 border-white/5 text-muted hover:border-white/20 hover:text-white"
          }`}
        >
          ALL UNIVERSE
        </button>
        {categories.map((cat, idx) => {
          const catColor = categoryColors[idx % categoryColors.length];
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.id);
                setSelectedSkill(null);
              }}
              className={`px-4 py-1.5 rounded-full text-xs font-mono transition-all border backdrop-blur-md ${
                isActive
                  ? "text-white"
                  : "bg-surface/40 border-white/5 text-muted hover:border-white/20 hover:text-white"
              }`}
              style={{
                backgroundColor: isActive ? `${catColor}30` : undefined,
                borderColor: isActive ? catColor : undefined,
                boxShadow: isActive ? `0 0 15px ${catColor}50` : undefined
              }}
            >
              {cat.name.toUpperCase()}
            </button>
          )
        })}
      </div>

      {/* R3F Canvas */}
      <div className="w-full h-full">
        <Canvas camera={{ position: [0, 8, 12], fov: 60 }} dpr={[1, 2]}>
          <ambientLight intensity={0.2} />
          <pointLight position={[0, 0, 0]} intensity={2} color="#FF6B00" distance={20} />
          <directionalLight position={[5, 10, 5]} intensity={1.5} color="#ffffff" />

          {/* Central Sun represent core engineer */}
          <Float speed={2} rotationIntensity={0.8} floatIntensity={2}>
            <mesh position={[0, 0, 0]}>
              <sphereGeometry args={[0.7, 32, 32]} />
              <meshStandardMaterial color="#FF6B00" emissive="#FF6B00" emissiveIntensity={1.5} roughness={0.4} metalness={0.8} toneMapped={false} />
              
              <Sparkles count={150} scale={3} size={2.5} speed={0.4} opacity={0.8} color="#FFC857" />
              
              <Html center>
                <div className="pointer-events-none select-none text-[10px] font-mono font-bold tracking-widest text-primary uppercase text-center mt-14 bg-dark/80 px-2.5 py-1 rounded border border-primary/30 whitespace-nowrap backdrop-blur-md shadow-[0_0_15px_rgba(255,107,0,0.5)]">
                  BM Core
                </div>
              </Html>
            </mesh>

            {/* Central Sun Halo glow */}
            <mesh position={[0, 0, 0]}>
              <sphereGeometry args={[1.0, 32, 32]} />
              <meshBasicMaterial color="#FFC857" transparent opacity={0.15} wireframe />
            </mesh>
            <mesh position={[0, 0, 0]}>
              <sphereGeometry args={[1.4, 24, 24]} />
              <meshBasicMaterial color="#FF6B00" transparent opacity={0.05} wireframe />
            </mesh>
          </Float>

          {/* Universe Background */}
          <Stars radius={50} depth={50} count={4000} factor={5} saturation={1} fade speed={1.5} />

          {/* Orbits and Nodes mapping */}
          {categories.map((cat, catIdx) => {
            const orbitRadius = 2.2 + catIdx * 1.2; // Staggered radiuses
            const isCatActive = activeCategory === "all" || activeCategory === cat.id;
            const catColor = categoryColors[catIdx % categoryColors.length];

            return (
              <group key={cat.id}>
                {/* Orbit Path line */}
                <OrbitRing
                  radius={orbitRadius}
                  color={isCatActive ? catColor : "#ffffff"}
                  opacity={isCatActive ? 0.2 : 0.02}
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
                      color={catColor}
                    />
                  );
                })}
              </group>
            );
          })}

          <OrbitControls
            enableZoom={true}
            maxDistance={25}
            minDistance={4}
            maxPolarAngle={Math.PI / 2 - 0.05} // Prevent going below grid floor
            enablePan={false}
            autoRotate={!selectedSkill}
            autoRotateSpeed={0.5}
          />
        </Canvas>
      </div>

      {/* Selected Skill Information Tooltip Panel */}
      {selectedSkill && (
        <div className="absolute bottom-6 left-6 right-6 md:left-auto md:right-6 md:w-80 p-5 rounded-2xl glass-panel border border-primary/40 bg-dark/80 backdrop-blur-2xl z-30 transition-all duration-300 animate-in fade-in slide-in-from-bottom-4 shadow-[0_0_30px_rgba(255,107,0,0.2)]">
          <div className="flex justify-between items-start mb-3">
            <div>
              <h4 className="text-base font-mono font-bold text-white flex items-center gap-2">
                <IconHelper name={selectedSkill.icon} className="w-4 h-4 text-primary" />
                {selectedSkill.name}
              </h4>
              <span className="text-[10px] font-mono text-primary uppercase tracking-wider">
                {selectedSkill.years} Years Experience
              </span>
            </div>
            <button
              onClick={() => setSelectedSkill(null)}
              className="text-muted hover:text-white transition-colors bg-surface/50 p-1.5 rounded-full hover:bg-surface"
            >
              <LucideIcons.X className="w-4 h-4" />
            </button>
          </div>
          <p className="text-sm text-muted mb-4 font-sans leading-relaxed">
            {selectedSkill.details}
          </p>
          <div>
            <div className="flex justify-between text-xs font-mono text-white/80 mb-1.5">
              <span className="tracking-widest">PROFICIENCY</span>
              <span className="text-primary font-bold">{selectedSkill.proficiency}%</span>
            </div>
            <div className="w-full bg-surface h-2 rounded-full overflow-hidden border border-white/5">
              <div
                className="bg-primary h-full rounded-full transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(255,107,0,0.8)]"
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
