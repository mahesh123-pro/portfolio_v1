"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
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

export function Earth() {
  const groupRef = useRef<THREE.Group>(null);
  const globeRef = useRef<THREE.Mesh>(null);
  const pointerPos = useRef({ x: 0, y: 0 });

  // Handle mouse moves for parallax
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
        const points = curve.getPoints(30);

        return {
          key: dest.key,
          points,
          curve
        };
      });

    return { vectors, connections };
  }, [radius]);

  // Handle rotation and parallax frame updates
  useFrame((state) => {
    if (groupRef.current) {
      // Base rotation
      groupRef.current.rotation.y += 0.003;

      // Mouse Parallax logic
      const targetX = pointerPos.current.x * 0.3;
      const targetY = pointerPos.current.y * 0.3;
      groupRef.current.rotation.y += (targetX - groupRef.current.rotation.y) * 0.05;
      groupRef.current.rotation.x += (targetY - groupRef.current.rotation.x) * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
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
      <group ref={globeRef}>
        {/* Core sphere */}
        <mesh>
          <sphereGeometry args={[radius, 32, 32]} />
          <meshBasicMaterial
            color="#111111"
            transparent={true}
            opacity={0.8}
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
            opacity={0.15}
          />
        </mesh>

        {/* Latitude/Longitude lines */}
        <mesh>
          <sphereGeometry args={[radius - 0.02, 10, 10]} />
          <meshBasicMaterial
            color="#FFC857"
            wireframe={true}
            transparent={true}
            opacity={0.06}
          />
        </mesh>

        {/* Locations and markers */}
        {locations.vectors.map((loc) => (
          <mesh key={loc.key} position={loc.pos}>
            <sphereGeometry args={[loc.key === "mumbai" ? 0.06 : 0.04, 8, 8]} />
            <meshBasicMaterial
              color={loc.key === "mumbai" ? "#FF6B00" : "#FFC857"}
              toneMapped={false}
            />
          </mesh>
        ))}

        {/* Connection Curves */}
        {locations.connections.map((conn) => (
          <line key={conn.key}>
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
              opacity={0.4}
              linewidth={1.5}
            />
          </line>
        ))}
      </group>
    </group>
  );
}

export default Earth;
