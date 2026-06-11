"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

// Individual server rack node under the cloud
function ServerNode({ position, color, label }: { position: [number, number, number]; color: string; label: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const outlineRef = useRef<THREE.LineSegments>(null);

  useFrame((state) => {
    if (meshRef.current) {
      // Pulse scale slightly
      const time = state.clock.getElapsedTime();
      const scale = 1 + Math.sin(time * 3 + position[0]) * 0.05;
      meshRef.current.scale.set(scale, scale, scale);
      
      // Rotate slowly
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <group position={position}>
      {/* Central Server Core */}
      <mesh ref={meshRef}>
        <boxGeometry args={[0.4, 0.4, 0.4]} />
        <meshPhysicalMaterial
          color={color}
          emissive={color}
          emissiveIntensity={1.5}
          roughness={0.1}
          metalness={0.9}
          transparent
          opacity={0.9}
        />
      </mesh>

      {/* Wireframe Outline */}
      <mesh>
        <boxGeometry args={[0.45, 0.45, 0.45]} />
        <meshBasicMaterial color={color} wireframe transparent opacity={0.3} />
      </mesh>

      {/* Connection Point light */}
      <pointLight color={color} intensity={0.5} distance={2} />
    </group>
  );
}

// Data packets flowing from servers up to the cloud
function DataStream({ start, end, color, speedDelay }: { start: THREE.Vector3; end: THREE.Vector3; color: string; speedDelay: number }) {
  const pointsRef = useRef<THREE.Points>(null);
  const particleCount = 6;

  const [positions, progress] = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const prog = new Float32Array(particleCount);
    for (let i = 0; i < particleCount; i++) {
      prog[i] = i / particleCount; // Spread progress
    }
    return [pos, prog];
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      const geo = pointsRef.current.geometry;
      const posAttr = geo.getAttribute("position") as THREE.BufferAttribute;
      const time = state.clock.getElapsedTime() + speedDelay;

      for (let i = 0; i < particleCount; i++) {
        // Increment progress and loop
        let p = (progress[i] + time * 0.25) % 1;
        
        // Linear interpolation from server node (start) to cloud center (end)
        // Add a bit of noise/curve
        const currentPos = new THREE.Vector3().lerpVectors(start, end, p);
        
        // Add waving/sinusoidal deviation for organic flow
        currentPos.x += Math.sin(p * Math.PI * 2 + time * 2) * 0.15;
        currentPos.z += Math.cos(p * Math.PI * 2 + time * 2) * 0.15;

        posAttr.setXYZ(i, currentPos.x, currentPos.y, currentPos.z);
      }
      posAttr.needsUpdate = true;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[new Float32Array(particleCount * 3), 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color={color}
        size={0.08}
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export function CloudModel() {
  const cloudGroupRef = useRef<THREE.Group>(null);
  const databaseNodePositions: [number, number, number][] = [
    [-0.9, -1.5, 0.4],
    [0, -1.6, -0.6],
    [0.9, -1.5, 0.4],
  ];

  const cloudCenter = useMemo(() => new THREE.Vector3(0, 0.2, 0), []);
  const serverVectors = useMemo(() => {
    return databaseNodePositions.map(pos => new THREE.Vector3(...pos));
  }, []);

  useFrame((state) => {
    if (cloudGroupRef.current) {
      const time = state.clock.getElapsedTime();
      
      // Floating motion
      cloudGroupRef.current.position.y = Math.sin(time * 0.8) * 0.12;
      
      // Gentle rotation
      cloudGroupRef.current.rotation.y = time * 0.08;
    }
  });

  return (
    <group>
      {/* Orbit Controls to allow custom rotation/interaction */}
      <OrbitControls 
        enableZoom={false} 
        enablePan={false}
        autoRotate={false}
        maxPolarAngle={Math.PI / 1.8}
        minPolarAngle={Math.PI / 3}
      />

      <ambientLight intensity={0.5} />
      <pointLight position={[5, 5, 5]} intensity={1.5} color="#FF6B00" />
      <pointLight position={[-5, -5, -5]} intensity={0.5} color="#0078D4" />

      {/* Cloud & Server cluster group */}
      <group ref={cloudGroupRef}>
        
        {/* ================= CLOUD BODY ================= */}
        {/* Main Central Sphere */}
        <mesh position={[0, 0.2, 0]}>
          <sphereGeometry args={[1.0, 32, 32]} />
          <meshPhysicalMaterial
            color="#FF6B00"
            emissive="#FF6B00"
            emissiveIntensity={0.15}
            roughness={0.15}
            metalness={0.1}
            transmission={0.6}
            thickness={1.5}
            transparent
            opacity={0.85}
          />
        </mesh>

        {/* Left Cushion */}
        <mesh position={[-0.8, -0.1, 0]}>
          <sphereGeometry args={[0.7, 32, 32]} />
          <meshPhysicalMaterial
            color="#0078D4"
            emissive="#0078D4"
            emissiveIntensity={0.1}
            roughness={0.15}
            metalness={0.1}
            transmission={0.6}
            thickness={1.5}
            transparent
            opacity={0.85}
          />
        </mesh>

        {/* Right Cushion */}
        <mesh position={[0.8, -0.1, 0]}>
          <sphereGeometry args={[0.7, 32, 32]} />
          <meshPhysicalMaterial
            color="#FF6B00"
            emissive="#FF6B00"
            emissiveIntensity={0.1}
            roughness={0.15}
            metalness={0.1}
            transmission={0.6}
            thickness={1.5}
            transparent
            opacity={0.85}
          />
        </mesh>

        {/* Front Puff */}
        <mesh position={[-0.3, 0.3, 0.6]}>
          <sphereGeometry args={[0.6, 32, 32]} />
          <meshPhysicalMaterial
            color="#FFC857"
            emissive="#FFC857"
            emissiveIntensity={0.15}
            roughness={0.15}
            metalness={0.1}
            transmission={0.6}
            thickness={1.5}
            transparent
            opacity={0.8}
          />
        </mesh>

        {/* Back Puff */}
        <mesh position={[0.3, 0.3, -0.6]}>
          <sphereGeometry args={[0.6, 32, 32]} />
          <meshPhysicalMaterial
            color="#0078D4"
            emissive="#0078D4"
            emissiveIntensity={0.1}
            roughness={0.15}
            metalness={0.1}
            transmission={0.6}
            thickness={1.5}
            transparent
            opacity={0.8}
          />
        </mesh>

        {/* ================= CLOUD WIREFRAME LAYERS ================= */}
        {/* Schematic Grid Layer overlay */}
        <mesh position={[0, 0.2, 0]}>
          <sphereGeometry args={[1.05, 16, 16]} />
          <meshBasicMaterial color="#FF6B00" wireframe transparent opacity={0.15} />
        </mesh>
        
        <mesh position={[-0.8, -0.1, 0]}>
          <sphereGeometry args={[0.73, 12, 12]} />
          <meshBasicMaterial color="#0078D4" wireframe transparent opacity={0.15} />
        </mesh>

        <mesh position={[0.8, -0.1, 0]}>
          <sphereGeometry args={[0.73, 12, 12]} />
          <meshBasicMaterial color="#FF6B00" wireframe transparent opacity={0.15} />
        </mesh>

        {/* ================= ORBITAL BANDWIDTH RINGS ================= */}
        {/* Horizontal Ring representing Network Orbit */}
        <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0.15, 0]}>
          <torusGeometry args={[1.6, 0.012, 8, 64]} />
          <meshBasicMaterial color="#FFC857" transparent opacity={0.25} />
        </mesh>

        {/* Diagonal Ring */}
        <mesh rotation={[Math.PI / 3, Math.PI / 4, 0]} position={[0, 0.15, 0]}>
          <torusGeometry args={[1.8, 0.008, 8, 64]} />
          <meshBasicMaterial color="#0078D4" transparent opacity={0.2} />
        </mesh>

        {/* ================= DATA SERVER NODES ================= */}
        <ServerNode position={databaseNodePositions[0]} color="#0078D4" label="compute-1" />
        <ServerNode position={databaseNodePositions[1]} color="#FFC857" label="db-master" />
        <ServerNode position={databaseNodePositions[2]} color="#FF6B00" label="cdn-cache" />

        {/* ================= DATA PACKET STREAM CHANNELS ================= */}
        {/* Connective Fiber Line paths */}
        {serverVectors.map((v, i) => (
          <line key={i}>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                args={[
                  new Float32Array([
                    v.x, v.y, v.z,
                    cloudCenter.x, cloudCenter.y - 0.2, cloudCenter.z
                  ]),
                  3
                ]}
              />
            </bufferGeometry>
            <lineBasicMaterial
              color={i === 0 ? "#0078D4" : i === 1 ? "#FFC857" : "#FF6B00"}
              transparent
              opacity={0.3}
              linewidth={1}
            />
          </line>
        ))}

        {/* Flowing animated packet streams */}
        <DataStream start={serverVectors[0]} end={cloudCenter} color="#0078D4" speedDelay={0} />
        <DataStream start={serverVectors[1]} end={cloudCenter} color="#FFC857" speedDelay={2} />
        <DataStream start={serverVectors[2]} end={cloudCenter} color="#FF6B00" speedDelay={4} />

      </group>
    </group>
  );
}

export default CloudModel;
