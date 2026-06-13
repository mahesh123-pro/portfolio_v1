"use client";

import { useRef, useState, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Html, Sparkles } from "@react-three/drei";
import * as THREE from "three";
import { experiences } from "../../content/experience";

interface SceneTimelineProps {
  active: boolean;
}

export function SceneTimeline({ active }: SceneTimelineProps) {
  const groupRef = useRef<THREE.Group>(null);
  const [visible, setVisible] = useState(true);

  // Define points along the tunnel curve (interpolating Scene 4 to Scene 5 path)
  const tunnelPoints = useMemo(() => {
    const list = [];
    const count = 14;
    for (let i = 0; i < count; i++) {
      const t = i / (count - 1);
      // Interpolate from camera waypoints
      const x = t * 14;
      const y = -32 - t * 16;
      const z = -95 - t * 40;
      list.push(new THREE.Vector3(x, y, z));
    }
    return list;
  }, []);

  // Map 4 experience milestones along the tunnel timeline
  const milestones = useMemo(() => {
    return experiences.map((exp, idx) => {
      const count = experiences.length;
      // Spread milestones along the second half of the path segment (t from 0.15 to 0.85)
      const t = 0.15 + (idx / (count - 1)) * 0.7;
      
      const x = t * 14;
      const y = -32 - t * 16;
      const z = -95 - t * 40;
      
      // Offset slightly to the left/right of the tunnel center to sit on the edge
      const sideOffset = idx % 2 === 0 ? 1.5 : -1.5;
      
      return {
        ...exp,
        pos: new THREE.Vector3(x + sideOffset, y + 0.5, z),
        t
      };
    });
  }, []);

  const milestoneRefs = useRef<THREE.Mesh[]>([]);

  useFrame((state, delta) => {
    // Distance-based frustum culling (Scene origin is near center of tunnel [7, -40, -115])
    const sceneCenter = new THREE.Vector3(7, -40, -115);
    if (groupRef.current) {
      const dist = state.camera.position.distanceTo(sceneCenter);
      const isNear = dist < 45;
      if (isNear !== visible) {
        setVisible(isNear);
      }
    }

    if (!visible) return;

    // Check proximity of camera to milestones to dynamic light up
    milestones.forEach((m, idx) => {
      const mesh = milestoneRefs.current[idx];
      if (mesh) {
        const camDist = state.camera.position.distanceTo(m.pos);
        // If camera is close (within 12 units), illuminate!
        const proximityIntensity = Math.max(0, Math.min(1.0, 1.0 - camDist / 12.0));
        
        const mat = mesh.material as THREE.MeshStandardMaterial;
        mat.emissiveIntensity = 0.2 + proximityIntensity * 2.2;
        mesh.scale.setScalar(1 + proximityIntensity * 0.35);
      }
    });
  });

  return (
    <group ref={groupRef}>
      {visible && (
        <group>
          {/* Cyber-tunnel Torus Rings */}
          {tunnelPoints.map((pt, i) => {
            const nextPt = tunnelPoints[i + 1] || tunnelPoints[i].clone().add(new THREE.Vector3(1, -1.1, -2.8));
            
            return (
              <group
                key={i}
                position={pt}
                ref={(el) => {
                  if (el) el.lookAt(nextPt);
                }}
              >
                {/* Glowing neon tunnel ring */}
                <mesh>
                  <torusGeometry args={[2.5, 0.02, 16, 64]} />
                  <meshBasicMaterial
                    color={i % 2 === 0 ? "#FF6B00" : "#8a2be2"}
                    transparent
                    opacity={0.18}
                  />
                </mesh>
                
                {/* Secondary larger background ring */}
                <mesh scale={[1.3, 1.3, 1.3]}>
                  <torusGeometry args={[2.5, 0.005, 8, 32]} />
                  <meshBasicMaterial
                    color="#FFC857"
                    transparent
                    opacity={0.06}
                    wireframe
                  />
                </mesh>
              </group>
            );
          })}

          {/* Ambient space dust inside the tunnel */}
          <Sparkles count={150} scale={18} size={1.5} speed={0.25} opacity={0.6} color="#FF6B00" />

          {/* Experience milestone checkpoints */}
          {milestones.map((m, idx) => {
            return (
              <group key={m.id} position={m.pos}>
                <Float speed={1.5} floatIntensity={0.4} rotationIntensity={0.2}>
                  {/* Outer glowing halo ring */}
                  <mesh rotation={[Math.PI / 2, 0, 0]}>
                    <torusGeometry args={[0.5, 0.015, 8, 32]} />
                    <meshBasicMaterial color="#FF6B00" transparent opacity={0.25} />
                  </mesh>

                  {/* Pulsing checkpoint node */}
                  <mesh
                    ref={(el) => {
                      if (el) milestoneRefs.current[idx] = el;
                    }}
                  >
                    <sphereGeometry args={[0.22, 16, 16]} />
                    <meshStandardMaterial
                      color="#FF6B00"
                      emissive="#FF6B00"
                      emissiveIntensity={0.2}
                      roughness={0.1}
                      metalness={0.9}
                    />
                  </mesh>

                  <Html center position={[0, -0.65, 0]} distanceFactor={6} zIndexRange={[10, 0]}>
                    <div className="flex flex-col items-center gap-1">
                      <div className="px-2 py-0.5 rounded border border-primary/20 bg-dark/95 text-[7px] font-mono text-primary font-bold whitespace-nowrap uppercase tracking-widest">
                        {m.period}
                      </div>
                      <div className="px-2.5 py-1 rounded-full border border-white/5 bg-[#111]/90 text-[8px] font-space font-medium text-white whitespace-nowrap shadow-[0_0_10px_rgba(0,0,0,0.5)]">
                        {m.role} @ {m.company}
                      </div>
                    </div>
                  </Html>
                </Float>
              </group>
            );
          })}
        </group>
      )}
    </group>
  );
}

export default SceneTimeline;
