"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Sparkles } from "@react-three/drei";
import * as THREE from "three";

// Atmospheric glow shader
const AtmosphereShader = {
  vertexShader: `
    varying vec3 vNormal;
    void main() {
      vNormal = normalize(normalMatrix * normal);
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    varying vec3 vNormal;
    void main() {
      // Glow intensity based on normal vector angle
      float intensity = pow(0.7 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 3.0);
      // Brand orange glow: rgb(255, 107, 0) -> vec4(1.0, 0.42, 0.0, 1.0)
      gl_FragColor = vec4(1.0, 0.42, 0.0, 1.0) * intensity * 1.5;
    }
  `
};

// Convert Lat/Lng to 3D Cartesian coordinates
function latLngToVector3(lat: number, lng: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);

  const x = -(radius * Math.sin(phi) * Math.sin(theta));
  const y = radius * Math.cos(phi);
  const z = radius * Math.sin(phi) * Math.cos(theta);

  return new THREE.Vector3(x, y, z);
}

// Data Packet traveling along a curve
function DataPacket({ curve, color = "#FF6B00", speed = 0.5, delay = 0 }: { curve: THREE.Curve<THREE.Vector3>, color?: string, speed?: number, delay?: number }) {
  const ref = useRef<THREE.Mesh>(null);
  const progress = useRef(-delay);

  useFrame((state, delta) => {
    if (ref.current) {
      progress.current += delta * speed;
      if (progress.current > 1) {
        progress.current = -0.1; // Small gap before looping
      }
      if (progress.current >= 0 && progress.current <= 1) {
         const point = curve.getPoint(progress.current);
         ref.current.position.copy(point);
         ref.current.visible = true;
      } else {
         ref.current.visible = false;
      }
    }
  });

  return (
    <mesh ref={ref} visible={false}>
      <sphereGeometry args={[0.035, 12, 12]} />
      <meshBasicMaterial color={color} />
      <pointLight distance={1.5} intensity={1} color={color} />
    </mesh>
  );
}

// Pulsing location marker
function PulsingMarker({ position, color, isBase = false }: { position: THREE.Vector3, color: string, isBase?: boolean }) {
  const ringRef = useRef<THREE.Mesh>(null);
  
  useFrame((state, delta) => {
    if (ringRef.current && isBase) {
      ringRef.current.scale.addScalar(delta * 2.5);
      const mat = ringRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity -= delta * 1.2;
      
      if (mat.opacity <= 0) {
         ringRef.current.scale.set(1, 1, 1);
         mat.opacity = 0.8;
      }
    }
  });

  return (
    <group position={position}>
      <mesh>
        <sphereGeometry args={[isBase ? 0.05 : 0.03, 16, 16]} />
        <meshBasicMaterial color={color} toneMapped={false} />
      </mesh>
      {isBase && (
        <mesh ref={ringRef}>
          <sphereGeometry args={[0.06, 16, 16]} />
          <meshBasicMaterial color={color} transparent opacity={0.8} depthWrite={false} toneMapped={false} />
        </mesh>
      )}
    </group>
  );
}

// Tech rings orbiting the globe
function TechRings({ radius }: { radius: number }) {
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const ring3Ref = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (ring1Ref.current) ring1Ref.current.rotation.x += delta * 0.15;
    if (ring2Ref.current) ring2Ref.current.rotation.y += delta * 0.2;
    if (ring3Ref.current) {
       ring3Ref.current.rotation.x -= delta * 0.1;
       ring3Ref.current.rotation.z += delta * 0.05;
    }
  });

  return (
    <group>
      <mesh ref={ring1Ref} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[radius * 1.35, 0.005, 16, 100]} />
        <meshBasicMaterial color="#FF6B00" transparent opacity={0.25} />
      </mesh>
      <mesh ref={ring2Ref} rotation={[0, Math.PI / 4, 0]}>
        <torusGeometry args={[radius * 1.55, 0.003, 16, 100]} />
        <meshBasicMaterial color="#FFC857" transparent opacity={0.15} />
      </mesh>
      <mesh ref={ring3Ref} rotation={[Math.PI / 2, 0, Math.PI / 6]}>
        <torusGeometry args={[radius * 1.75, 0.008, 16, 100, Math.PI * 1.5]} />
        <meshBasicMaterial color="#FF6B00" transparent opacity={0.35} />
      </mesh>
    </group>
  );
}

export function Earth() {
  const groupRef = useRef<THREE.Group>(null);
  const pointerPos = useRef({ x: 0, y: 0 });

  // Handle mouse moves for parallax globally
  useMemo(() => {
    if (typeof window !== "undefined") {
      const handleMouseMove = (e: MouseEvent) => {
        pointerPos.current.x = (e.clientX / window.innerWidth) * 2 - 1;
        pointerPos.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
      };
      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    }
  }, []);

  // Locations setup
  const radius = 2.2;
  const locations = useMemo(() => {
    const coords = {
      mumbai: { lat: 19.076, lng: 72.877, name: "Mumbai (Base)" },
      newyork: { lat: 40.7128, lng: -74.006, name: "New York" },
      london: { lat: 51.5074, lng: -0.1278, name: "London" },
      tokyo: { lat: 35.6762, lng: 139.6503, name: "Tokyo" },
      sydney: { lat: -33.8688, lng: 151.2093, name: "Sydney" }
    };

    const vectors = Object.entries(coords).map(([key, c]) => ({
      key,
      name: c.name,
      pos: latLngToVector3(c.lat, c.lng, radius)
    }));

    // Create curve lines from Mumbai to other locations
    const mumbaiPos = vectors.find((v) => v.key === "mumbai")!.pos;
    const connections = vectors
      .filter((v) => v.key !== "mumbai")
      .map((dest) => {
        // Find midpoint and push it outwards to create a curve
        const midPoint = new THREE.Vector3()
          .addVectors(mumbaiPos, dest.pos)
          .multiplyScalar(0.5);
        const distance = mumbaiPos.distanceTo(dest.pos);
        // Exaggerate midpoint displacement based on distance
        midPoint.normalize().multiplyScalar(radius + distance * 0.4);

        const curve = new THREE.QuadraticBezierCurve3(mumbaiPos, midPoint, dest.pos);
        const points = curve.getPoints(40); // Increased resolution

        return {
          key: dest.key,
          points,
          curve
        };
      });

    return { vectors, connections };
  }, [radius]);

  // Handle rotation and parallax frame updates
  useFrame((state, delta) => {
    if (groupRef.current) {
      // Base rotation (smooth frame-independent)
      groupRef.current.rotation.y += delta * 0.15;

      // Mouse Parallax logic
      const targetX = pointerPos.current.x * 0.4;
      const targetY = pointerPos.current.y * 0.4;
      // Damping towards target
      groupRef.current.rotation.y += (targetX - groupRef.current.rotation.y) * 0.05;
      groupRef.current.rotation.x += (targetY - groupRef.current.rotation.x) * 0.05;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
      <group ref={groupRef}>
        <TechRings radius={radius} />

        {/* Atmosphere limb glow (slightly larger mesh) */}
        <mesh>
          <sphereGeometry args={[radius * 1.15, 32, 32]} />
          <shaderMaterial
            vertexShader={AtmosphereShader.vertexShader}
            fragmentShader={AtmosphereShader.fragmentShader}
            blending={THREE.AdditiveBlending}
            side={THREE.BackSide}
            transparent={true}
          />
        </mesh>

        {/* Main Schematic Globe Mesh */}
        <group>
          {/* Core sphere */}
          <mesh>
            <sphereGeometry args={[radius, 32, 32]} />
            <meshBasicMaterial
              color="#0a0a0a"
              transparent={true}
              opacity={0.9}
              wireframe={false}
            />
          </mesh>

          {/* Outer wireframe grid */}
          <mesh>
            <sphereGeometry args={[radius + 0.01, 24, 24]} />
            <meshBasicMaterial
              color="#FF6B00"
              wireframe={true}
              transparent={true}
              opacity={0.2}
            />
          </mesh>

          {/* Latitude/Longitude lines */}
          <mesh>
            <sphereGeometry args={[radius - 0.02, 12, 12]} />
            <meshBasicMaterial
              color="#FFC857"
              wireframe={true}
              transparent={true}
              opacity={0.08}
            />
          </mesh>

          {/* Ambient Sparkles around the globe */}
          <Sparkles count={80} scale={radius * 2.5} size={1.5} speed={0.2} opacity={0.4} color="#FFC857" />

          {/* Locations and markers */}
          {locations.vectors.map((loc) => (
            <PulsingMarker 
               key={loc.key} 
               position={loc.pos} 
               color={loc.key === "mumbai" ? "#FF6B00" : "#FFC857"} 
               isBase={loc.key === "mumbai"} 
            />
          ))}

          {/* Connection Curves and Data Packets */}
          {locations.connections.map((conn, i) => (
            <group key={conn.key}>
              <line>
                <bufferGeometry>
                  <bufferAttribute
                    attach="attributes-position"
                    args={[
                      new Float32Array(conn.points.flatMap((p) => [p.x, p.y, p.z])),
                      3
                    ]}
                  />
                </bufferGeometry>
                <lineBasicMaterial
                  color="#FF6B00"
                  transparent={true}
                  opacity={0.3}
                  linewidth={1}
                />
              </line>
              {/* Animate multiple data packets along each route */}
              <DataPacket curve={conn.curve} delay={i * 0.4} speed={0.4} />
              <DataPacket curve={conn.curve} delay={i * 0.4 + 1.2} speed={0.4} />
            </group>
          ))}
        </group>
      </group>
    </Float>
  );
}

export default Earth;
