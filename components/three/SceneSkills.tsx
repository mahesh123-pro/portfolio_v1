"use client";

import { useRef, useState, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Html, Sparkles, Trail } from "@react-three/drei";
import * as THREE from "three";
import * as LucideIcons from "lucide-react";
import { skillsData, Skill } from "../../content/skills";

interface SceneSkillsProps {
  active: boolean;
}

export function SceneSkills({ active }: SceneSkillsProps) {
  const groupRef = useRef<THREE.Group>(null);
  const [visible, setVisible] = useState(true);
  const [hoveredPlanet, setHoveredPlanet] = useState<string | null>(null);
  const [selectedPlanet, setSelectedPlanet] = useState<Skill | null>(null);

  // Map skills from raw skills data
  const planets = useMemo(() => {
    const list: { name: string; color: string; size: number; pos: [number, number, number]; speed: number; skill: Skill }[] = [];
    const colors = ["#FF9900", "#00E5FF", "#B5179E", "#4CC9F0", "#F72585", "#7209B7", "#0078D4", "#339933"];
    
    let colorIdx = 0;
    skillsData.forEach((cat) => {
      cat.skills.forEach((skill, idx) => {
        // Form a spiral / galaxy distribution
        const angle = (colorIdx / 12) * Math.PI * 2;
        const radius = 3.5 + Math.random() * 1.5 + (colorIdx * 0.4);
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        const y = (Math.random() - 0.5) * 2;
        
        list.push({
          name: skill.name,
          color: colors[colorIdx % colors.length],
          size: 0.25 + (skill.proficiency / 100) * 0.15,
          pos: [x, y, z],
          speed: 0.15 + Math.random() * 0.2,
          skill
        });
        colorIdx++;
      });
    });
    return list;
  }, []);

  const planetRefs = useRef<THREE.Mesh[]>([]);

  useFrame((state, delta) => {
    // Distance check for culling (Scene center is [15, -10, -35])
    if (groupRef.current) {
      const dist = state.camera.position.distanceTo(new THREE.Vector3(15, -10, -35));
      const isNear = dist < 45;
      if (isNear !== visible) {
        setVisible(isNear);
      }
    }

    if (!visible) return;

    // Rotate planets and orbit them slowly around the center
    planets.forEach((p, idx) => {
      const mesh = planetRefs.current[idx];
      if (mesh) {
        // Slow self rotation
        mesh.rotation.y += delta * 0.8;
        
        // Orbit movement
        const time = state.clock.getElapsedTime() * p.speed * 0.3;
        const radius = Math.sqrt(p.pos[0] * p.pos[0] + p.pos[2] * p.pos[2]);
        const initialAngle = Math.atan2(p.pos[2], p.pos[0]);
        const angle = initialAngle + time;
        mesh.position.set(Math.cos(angle) * radius, p.pos[1], Math.sin(angle) * radius);
      }
    });
  });

  return (
    <group ref={groupRef}>
      {visible && (
        <group>
          {/* Central Galaxy Sun representing Core Infrastructure */}
          <Float speed={2} floatIntensity={1} rotationIntensity={0.5}>
            <mesh position={[0, 0, 0]}>
              <sphereGeometry args={[1.0, 32, 32]} />
              <meshStandardMaterial
                color="#FF6B00"
                emissive="#FF6B00"
                emissiveIntensity={1.8}
                roughness={0.2}
                metalness={0.9}
              />
              <Sparkles count={150} scale={4} size={3} speed={0.5} opacity={0.8} color="#FFC857" />
              <Html center>
                <div className="pointer-events-none select-none text-[8px] font-mono font-bold tracking-widest text-primary uppercase text-center mt-12 bg-dark/90 px-2.5 py-1 rounded border border-primary/20 whitespace-nowrap backdrop-blur-md">
                  CORE SYSTEMS SUN
                </div>
              </Html>
            </mesh>
          </Float>

          {/* Galaxy orbital rings */}
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[3, 3.02, 64]} />
            <meshBasicMaterial color="#FF6B00" transparent opacity={0.1} side={THREE.DoubleSide} />
          </mesh>
          <mesh rotation={[Math.PI / 2, 0, Math.PI / 4]}>
            <ringGeometry args={[5, 5.02, 64]} />
            <meshBasicMaterial color="#00E5FF" transparent opacity={0.08} side={THREE.DoubleSide} />
          </mesh>
          <mesh rotation={[Math.PI / 2, 0, Math.PI / -6]}>
            <ringGeometry args={[7, 7.02, 64]} />
            <meshBasicMaterial color="#B5179E" transparent opacity={0.06} side={THREE.DoubleSide} />
          </mesh>

          {/* Orbiting technology planets */}
          {planets.map((p, idx) => {
            const isHovered = hoveredPlanet === p.name;
            const isSelected = selectedPlanet?.name === p.name;
            const scaleFactor = isSelected ? 1.6 : isHovered ? 1.3 : 1.0;
            const finalSize = p.size * scaleFactor;

            return (
              <group key={p.name}>
                <Trail
                  width={isHovered || isSelected ? 0.35 : 0.08}
                  color={p.color}
                  length={isSelected ? 0 : 3.5}
                  decay={1.2}
                  attenuation={(t) => t * t}
                >
                  <mesh
                    ref={(el) => {
                      if (el) planetRefs.current[idx] = el;
                    }}
                    position={p.pos}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedPlanet(isSelected ? null : p.skill);
                    }}
                    onPointerOver={(e) => {
                      e.stopPropagation();
                      setHoveredPlanet(p.name);
                      document.body.style.cursor = "pointer";
                    }}
                    onPointerOut={(e) => {
                      e.stopPropagation();
                      setHoveredPlanet(null);
                      document.body.style.cursor = "auto";
                    }}
                  >
                    <sphereGeometry args={[finalSize, 32, 32]} />
                    <meshStandardMaterial
                      color={isHovered || isSelected ? p.color : "#444444"}
                      emissive={isHovered || isSelected ? p.color : "#111111"}
                      emissiveIntensity={isSelected ? 1.8 : isHovered ? 1.2 : 0.15}
                      roughness={0.2}
                      metalness={0.8}
                    />
                    
                    {/* Glowing atmosphere shell */}
                    {(isHovered || isSelected) && (
                      <mesh scale={[1.2, 1.2, 1.2]}>
                        <sphereGeometry args={[finalSize, 16, 16]} />
                        <meshBasicMaterial
                          color={p.color}
                          transparent
                          opacity={0.15}
                          wireframe
                        />
                      </mesh>
                    )}

                    <Html center position={[0, finalSize + 0.35, 0]} distanceFactor={6} zIndexRange={[20, 0]}>
                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedPlanet(isSelected ? null : p.skill);
                        }}
                        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border transition-all duration-300 cursor-pointer whitespace-nowrap select-none backdrop-blur-md ${
                          isSelected
                            ? "bg-dark/95 text-white scale-110 z-50"
                            : isHovered
                            ? "bg-dark/85 text-white scale-105"
                            : "bg-surface/30 border-white/5 text-white/50 scale-90"
                        }`}
                        style={{
                          borderColor: isSelected || isHovered ? p.color : undefined,
                          boxShadow: isSelected || isHovered ? `0 0 15px ${p.color}50` : undefined
                        }}
                      >
                        <span className="text-[8px] font-mono tracking-wider">{p.name}</span>
                      </div>
                    </Html>
                  </mesh>
                </Trail>
              </group>
            );
          })}

          {/* Planet Details Card (in-canvas overlay) */}
          {selectedPlanet && (
            <Html position={[0, -2.5, 0]} center distanceFactor={8} zIndexRange={[100, 0]}>
              <div className="w-72 p-4 rounded-xl border border-primary/30 bg-dark/95 text-left font-sans text-xs shadow-[0_0_20px_rgba(255,107,0,0.3)] animate-in fade-in zoom-in-95 duration-200">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-sm font-space font-bold text-white flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-primary" />
                    {selectedPlanet.name}
                  </h4>
                  <button
                    onClick={() => setSelectedPlanet(null)}
                    className="text-muted hover:text-white p-1 bg-surface/50 hover:bg-surface rounded-full transition-colors"
                  >
                    <LucideIcons.X className="w-3 h-3" />
                  </button>
                </div>
                <div className="text-[9px] font-mono text-primary uppercase tracking-widest mb-2">
                  {selectedPlanet.years} Years Experience
                </div>
                <p className="text-muted leading-relaxed mb-3 text-[11px]">
                  {selectedPlanet.details}
                </p>
                <div>
                  <div className="flex justify-between text-[9px] font-mono text-white/80 mb-1">
                    <span>PROFICIENCY</span>
                    <span className="text-primary font-bold">{selectedPlanet.proficiency}%</span>
                  </div>
                  <div className="w-full bg-surface h-1 rounded-full overflow-hidden border border-white/5">
                    <div
                      className="bg-primary h-full rounded-full transition-all duration-700 shadow-[0_0_8px_#FF6B00]"
                      style={{ width: `${selectedPlanet.proficiency}%` }}
                    />
                  </div>
                </div>
              </div>
            </Html>
          )}

        </group>
      )}
    </group>
  );
}

export default SceneSkills;
