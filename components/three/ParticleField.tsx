"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function ParticleField({ count = 1200 }) {
  const pointsRef = useRef<THREE.Points>(null);

  // Generate random positions
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i += 3) {
      // Sphere distribution or random box
      const radius = 10 + Math.random() * 40;
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      
      arr[i] = radius * Math.sin(phi) * Math.cos(theta);
      arr[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
      arr[i + 2] = radius * Math.cos(phi);
    }
    return arr;
  }, [count]);

  // Animate the particles
  useFrame((state) => {
    if (pointsRef.current) {
      // Slow rotation
      pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.02;
      pointsRef.current.rotation.x = state.clock.getElapsedTime() * 0.01;
    }
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
        color="#FF6B00"
        size={0.12}
        sizeAttenuation={true}
        transparent={true}
        opacity={0.6}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

export default ParticleField;
