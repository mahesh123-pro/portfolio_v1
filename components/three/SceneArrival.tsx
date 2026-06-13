"use client";

import { useRef, useState, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Html, Float, Sparkles } from "@react-three/drei";
import * as THREE from "three";
import * as LucideIcons from "lucide-react";

interface SceneArrivalProps {
  active: boolean;
}

export function SceneArrival({ active }: SceneArrivalProps) {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const [visible, setVisible] = useState(true);

  // Orbiting technology items data
  const techOrbits = useMemo(() => [
    { name: "AWS", icon: "Cloud", color: "#FF9900", angle: 0, radius: 2.2, speed: 0.8 },
    { name: "Docker", icon: "Box", color: "#2496ED", angle: 1.2, radius: 2.5, speed: 0.6 },
    { name: "React", icon: "Code", color: "#61DAFB", angle: 2.4, radius: 2.3, speed: 0.7 },
    { name: "Linux", icon: "Terminal", color: "#FCC624", angle: 3.6, radius: 2.6, speed: 0.5 },
    { name: "Node.js", icon: "Cpu", color: "#339933", angle: 4.8, radius: 2.1, speed: 0.9 }
  ], []);

  const orbitRefs = useRef<THREE.Group[]>([]);

  useFrame((state, delta) => {
    // Distance-based frustum culling
    if (groupRef.current) {
      const dist = state.camera.position.distanceTo(new THREE.Vector3(0, 0, 0));
      const isNear = dist < 25;
      if (isNear !== visible) {
        setVisible(isNear);
      }
    }

    if (!visible) return;

    // Rotate core
    if (coreRef.current) {
      coreRef.current.rotation.y += delta * 0.4;
      coreRef.current.rotation.x += delta * 0.2;
    }

    // Rotate holographic energy rings
    if (ring1Ref.current) ring1Ref.current.rotation.z += delta * 0.15;
    if (ring2Ref.current) ring2Ref.current.rotation.z -= delta * 0.2;

    // Orbit tech icons
    orbitRefs.current.forEach((ref, index) => {
      if (ref) {
        const orbit = techOrbits[index];
        orbit.angle += orbit.speed * delta * 0.4;
        const x = Math.cos(orbit.angle) * orbit.radius;
        const z = Math.sin(orbit.angle) * orbit.radius;
        // Float height oscillation
        const y = Math.sin(state.clock.getElapsedTime() * 1.5 + index) * 0.25;
        ref.position.set(x, y, z);
      }
    });
  });

  return (
    <group ref={groupRef}>
      {visible && (
        <group>
          {/* Swirling energy rings in center */}
          <mesh ref={ring1Ref} rotation={[Math.PI / 2.5, 0, 0]}>
            <torusGeometry args={[3.2, 0.03, 16, 100]} />
            <meshBasicMaterial color="#FF6B00" transparent opacity={0.3} wireframe />
          </mesh>
          <mesh ref={ring2Ref} rotation={[Math.PI / -2.3, Math.PI / 6, 0]}>
            <torusGeometry args={[2.8, 0.02, 16, 100]} />
            <meshBasicMaterial color="#FFC857" transparent opacity={0.2} wireframe />
          </mesh>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[3.8, 0.01, 8, 64]} />
            <meshBasicMaterial color="#8a2be2" transparent opacity={0.15} />
          </mesh>

          {/* Swirling particle tunnel surrounding the camera entry */}
          <Sparkles count={300} scale={10} size={2} speed={0.4} opacity={0.7} color="#FF6B00" />
          <Sparkles count={150} scale={15} size={1} speed={0.2} opacity={0.4} color="#8a2be2" />

          {/* Central Digital Twin representation: Rotating Holographic Core */}
          <Float speed={1.8} rotationIntensity={0.5} floatIntensity={1}>
            <group>
              <mesh ref={coreRef}>
                <icosahedronGeometry args={[1.1, 1]} />
                <meshPhysicalMaterial
                  color="#FF6B00"
                  emissive="#FF6B00"
                  emissiveIntensity={1.2}
                  wireframe
                  transparent
                  opacity={0.8}
                />
              </mesh>
              {/* Inner glowing sphere */}
              <mesh>
                <sphereGeometry args={[0.6, 16, 16]} />
                <meshBasicMaterial color="#FFC857" transparent opacity={0.25} />
              </mesh>
              
              {/* Glowing point light in center */}
              <pointLight intensity={2} color="#FF6B00" distance={6} />
            </group>
          </Float>

          {/* Orbiting Technology Icons */}
          {techOrbits.map((orbit, index) => {
            const Icon = (LucideIcons as any)[orbit.icon] || LucideIcons.Code;
            return (
              <group
                key={orbit.name}
                ref={(el) => {
                  if (el) orbitRefs.current[index] = el;
                }}
              >
                <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
                  <mesh>
                    <sphereGeometry args={[0.12, 16, 16]} />
                    <meshStandardMaterial
                      color={orbit.color}
                      emissive={orbit.color}
                      emissiveIntensity={1.0}
                      roughness={0.1}
                      metalness={0.8}
                    />
                  </mesh>
                  <Html center distanceFactor={8} position={[0, 0.35, 0]} zIndexRange={[10, 0]}>
                    <div
                      className="flex items-center gap-1 px-2 py-0.5 rounded-full border border-white/10 bg-dark/80 text-[8px] font-mono font-bold text-white whitespace-nowrap backdrop-blur-md"
                      style={{ borderColor: `${orbit.color}40`, boxShadow: `0 0 10px ${orbit.color}40` }}
                    >
                      <Icon className="w-2.5 h-2.5" style={{ color: orbit.color }} />
                      <span>{orbit.name}</span>
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

export default SceneArrival;
