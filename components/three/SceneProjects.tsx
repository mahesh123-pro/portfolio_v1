"use client";

import { useRef, useState, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Html, Sparkles } from "@react-three/drei";
import * as THREE from "three";
import * as LucideIcons from "lucide-react";

interface SceneProjectsProps {
  active: boolean;
}

// 1. Manakrishi Farmland Island
function ManakrishiIsland() {
  const droneRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    // Flying drone circular loop
    if (droneRef.current) {
      const time = state.clock.getElapsedTime() * 1.5;
      const x = Math.cos(time) * 0.8;
      const z = Math.sin(time) * 0.8;
      const y = 0.5 + Math.sin(time * 2) * 0.1; // Bobbing
      droneRef.current.position.set(x, y, z);
      // Face flight direction
      droneRef.current.rotation.y = -time + Math.PI / 2;
    }
  });

  return (
    <group position={[-3.2, -0.5, 0.5]}>
      <Float speed={1.5} floatIntensity={0.6} rotationIntensity={0.2}>
        {/* Island Base */}
        <mesh>
          <cylinderGeometry args={[1.0, 1.2, 0.2, 6]} />
          <meshStandardMaterial color="#112211" roughness={0.8} flatShading />
        </mesh>
        {/* Grid Farming Farmland Lines */}
        <gridHelper args={[1.6, 6, "#22c55e", "#1b431b"]} position={[0, 0.11, 0]} />

        {/* Drone model */}
        <group ref={droneRef}>
          {/* Drone chassis */}
          <mesh>
            <boxGeometry args={[0.2, 0.05, 0.2]} />
            <meshStandardMaterial color="#ff3333" emissive="#550000" />
          </mesh>
          {/* Rotors */}
          <mesh position={[0.1, 0.05, 0.1]} rotation={[0, 0, 0]}>
            <cylinderGeometry args={[0.06, 0.06, 0.01, 4]} />
            <meshBasicMaterial color="#ffffff" wireframe />
          </mesh>
          <mesh position={[-0.1, 0.05, 0.1]}>
            <cylinderGeometry args={[0.06, 0.06, 0.01, 4]} />
            <meshBasicMaterial color="#ffffff" wireframe />
          </mesh>
          <mesh position={[0.1, 0.05, -0.1]}>
            <cylinderGeometry args={[0.06, 0.06, 0.01, 4]} />
            <meshBasicMaterial color="#ffffff" wireframe />
          </mesh>
          <mesh position={[-0.1, 0.05, -0.1]}>
            <cylinderGeometry args={[0.06, 0.06, 0.01, 4]} />
            <meshBasicMaterial color="#ffffff" wireframe />
          </mesh>
          {/* Telemetry packet light */}
          <pointLight distance={1.0} intensity={1} color="#22c55e" position={[0, -0.1, 0]} />
        </group>

        {/* Crops / smart sensor beacons */}
        <mesh position={[0.4, 0.2, 0.2]}>
          <boxGeometry args={[0.04, 0.15, 0.04]} />
          <meshBasicMaterial color="#22c55e" />
        </mesh>
        <mesh position={[-0.3, 0.2, -0.4]}>
          <boxGeometry args={[0.04, 0.15, 0.04]} />
          <meshBasicMaterial color="#22c55e" />
        </mesh>
        
        <Html center position={[0, -0.5, 0]} distanceFactor={6}>
          <div className="px-2 py-0.5 rounded border border-green-500/20 bg-green-500/5 text-green-400 font-mono text-[7px] tracking-wider uppercase whitespace-nowrap">
            MANAKRISHI DRONE
          </div>
        </Html>
      </Float>
    </group>
  );
}

// 2. VisaEnsure Schematic Earth Globe Island
function VisaIsland() {
  const globeRef = useRef<THREE.Group>(null);
  
  useFrame((state, delta) => {
    if (globeRef.current) {
      globeRef.current.rotation.y += delta * 0.15;
    }
  });

  return (
    <group position={[3.2, -0.2, -1.0]}>
      <Float speed={1.2} floatIntensity={0.5} rotationIntensity={0.3}>
        {/* Island Base */}
        <mesh>
          <cylinderGeometry args={[1.0, 1.2, 0.2, 6]} />
          <meshStandardMaterial color="#111c2b" roughness={0.7} flatShading />
        </mesh>

        {/* Schematic Mini-Globe */}
        <group ref={globeRef} position={[0, 0.7, 0]}>
          <mesh>
            <sphereGeometry args={[0.5, 16, 16]} />
            <meshBasicMaterial color="#0a0a0a" transparent opacity={0.6} />
          </mesh>
          <mesh>
            <sphereGeometry args={[0.51, 16, 16]} />
            <meshBasicMaterial color="#00E5FF" wireframe transparent opacity={0.3} />
          </mesh>
          <Sparkles count={15} scale={1.0} size={1} speed={0.2} opacity={0.5} color="#00E5FF" />
          
          {/* Mumbai and NY markers */}
          <mesh position={[0, 0.35, 0.35]}>
            <sphereGeometry args={[0.03, 8, 8]} />
            <meshBasicMaterial color="#FF6B00" />
          </mesh>
          <mesh position={[0.3, 0.2, -0.3]}>
            <sphereGeometry args={[0.03, 8, 8]} />
            <meshBasicMaterial color="#00E5FF" />
          </mesh>
        </group>
        
        <Html center position={[0, -0.5, 0]} distanceFactor={6}>
          <div className="px-2 py-0.5 rounded border border-[#00E5FF]/20 bg-[#00E5FF]/5 text-[#00E5FF] font-mono text-[7px] tracking-wider uppercase whitespace-nowrap">
            VISAS GLOBAL TELEMETRY
          </div>
        </Html>
      </Float>
    </group>
  );
}

// 3. Cloud Architecture Island
function CloudIsland() {
  const serverRefs = useRef<THREE.Mesh[]>([]);

  useFrame((state, delta) => {
    // Pulse Server Core scales slightly
    serverRefs.current.forEach((ref, i) => {
      if (ref) {
        const t = state.clock.getElapsedTime();
        const scale = 1 + Math.sin(t * 3.5 + i) * 0.06;
        ref.scale.set(scale, scale, scale);
      }
    });
  });

  return (
    <group position={[0, 2.2, -3.5]}>
      <Float speed={1.6} floatIntensity={0.8} rotationIntensity={0.4}>
        {/* Cloud Base Cushion */}
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[0.5, 16, 16]} />
          <meshPhysicalMaterial color="#FF6B00" transmission={0.6} transparent opacity={0.7} roughness={0.1} />
        </mesh>
        <mesh position={[-0.4, -0.1, 0]}>
          <sphereGeometry args={[0.35, 16, 16]} />
          <meshPhysicalMaterial color="#0078D4" transmission={0.6} transparent opacity={0.7} roughness={0.1} />
        </mesh>
        <mesh position={[0.4, -0.1, 0]}>
          <sphereGeometry args={[0.35, 16, 16]} />
          <meshPhysicalMaterial color="#FFC857" transmission={0.6} transparent opacity={0.7} roughness={0.1} />
        </mesh>

        {/* Server Rack nodes */}
        <mesh
          ref={(el) => {
            if (el) serverRefs.current[0] = el;
          }}
          position={[-0.4, -0.7, 0.2]}
        >
          <boxGeometry args={[0.18, 0.18, 0.18]} />
          <meshStandardMaterial color="#0078D4" emissive="#0078D4" emissiveIntensity={1.0} />
        </mesh>
        <mesh
          ref={(el) => {
            if (el) serverRefs.current[1] = el;
          }}
          position={[0, -0.8, -0.2]}
        >
          <boxGeometry args={[0.18, 0.18, 0.18]} />
          <meshStandardMaterial color="#FFC857" emissive="#FFC857" emissiveIntensity={1.0} />
        </mesh>
        <mesh
          ref={(el) => {
            if (el) serverRefs.current[2] = el;
          }}
          position={[0.4, -0.7, 0.2]}
        >
          <boxGeometry args={[0.18, 0.18, 0.18]} />
          <meshStandardMaterial color="#FF6B00" emissive="#FF6B00" emissiveIntensity={1.0} />
        </mesh>

        <Sparkles count={30} scale={1.2} size={1} speed={0.4} opacity={0.6} color="#FF6B00" />
        
        <Html center position={[0, -1.3, 0]} distanceFactor={6}>
          <div className="px-2 py-0.5 rounded border border-primary/20 bg-primary/5 text-primary font-mono text-[7px] tracking-wider uppercase whitespace-nowrap">
            3-TIER VPS INFRA
          </div>
        </Html>
      </Float>
    </group>
  );
}

export function SceneProjects({ active }: SceneProjectsProps) {
  const groupRef = useRef<THREE.Group>(null);
  const [visible, setVisible] = useState(true);

  useFrame((state, delta) => {
    // Distance-based frustum culling (Scene is positioned at [-15, -25, -75])
    if (groupRef.current) {
      const dist = state.camera.position.distanceTo(new THREE.Vector3(-15, -25, -75));
      const isNear = dist < 45;
      if (isNear !== visible) {
        setVisible(isNear);
      }
    }
  });

  return (
    <group ref={groupRef}>
      {visible && (
        <group>
          {/* Subtitle labels or connection streams between islands */}
          <Sparkles count={80} scale={12} size={1.5} speed={0.15} opacity={0.4} color="#FFC857" />

          {/* Render our custom floating islands */}
          <ManakrishiIsland />
          <VisaIsland />
          <CloudIsland />
        </group>
      )}
    </group>
  );
}

export default SceneProjects;
