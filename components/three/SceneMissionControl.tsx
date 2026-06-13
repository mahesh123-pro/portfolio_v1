"use client";

import { useRef, useState, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Html, Sparkles } from "@react-three/drei";
import * as THREE from "three";
import * as LucideIcons from "lucide-react";

interface SceneMissionControlProps {
  active: boolean;
}

// Sub-component: 3D Heatmap Board
function HeatmapBoard3D() {
  const gridWidth = 14;
  const gridHeight = 7;
  const cellSize = 0.16;
  const gap = 0.04;

  const cells = useMemo(() => {
    const arr = [];
    const weights = [0, 0, 1, 1, 2, 2, 3, 4];
    for (let x = 0; x < gridWidth; x++) {
      for (let y = 0; y < gridHeight; y++) {
        const level = weights[Math.floor(Math.random() * weights.length)];
        arr.push({ x, y, level });
      }
    }
    return arr;
  }, []);

  const getCellColor = (level: number) => {
    switch (level) {
      case 1: return "#0e4429";
      case 2: return "#006d32";
      case 3: return "#26a641";
      case 4: return "#39d353";
      default: return "#161b22";
    }
  };

  return (
    <group position={[-2.4, 0.5, 0.5]} rotation={[0, Math.PI / 6, 0]}>
      <Float speed={1.2} floatIntensity={0.3} rotationIntensity={0.1}>
        {/* Heatmap frame */}
        <mesh>
          <boxGeometry args={[gridWidth * (cellSize + gap) + 0.2, gridHeight * (cellSize + gap) + 0.2, 0.05]} />
          <meshStandardMaterial color="#111" roughness={0.9} />
        </mesh>
        <mesh>
          <boxGeometry args={[gridWidth * (cellSize + gap) + 0.22, gridHeight * (cellSize + gap) + 0.22, 0.055]} />
          <meshBasicMaterial color="#FF6B00" wireframe transparent opacity={0.15} />
        </mesh>

        {/* Render 3D Heatmap cubes */}
        {cells.map((cell, idx) => {
          const posX = cell.x * (cellSize + gap) - (gridWidth * (cellSize + gap)) / 2 + cellSize / 2;
          const posY = cell.y * (cellSize + gap) - (gridHeight * (cellSize + gap)) / 2 + cellSize / 2;
          const color = getCellColor(cell.level);
          
          return (
            <mesh key={idx} position={[posX, posY, 0.03]}>
              <boxGeometry args={[cellSize, cellSize, cellSize / 2]} />
              <meshStandardMaterial
                color={color}
                emissive={color}
                emissiveIntensity={cell.level > 2 ? 0.8 : 0.1}
                roughness={0.2}
              />
            </mesh>
          );
        })}

        <Html center position={[0, -0.9, 0.1]} distanceFactor={6}>
          <div className="px-2.5 py-0.5 rounded border border-green-500/20 bg-green-500/5 text-green-400 font-mono text-[6px] tracking-widest uppercase whitespace-nowrap">
            3D COMMIT HEATMAP TELEMETRY
          </div>
        </Html>
      </Float>
    </group>
  );
}

// Sub-component: 3D Repository Network Graph
function RepositoryNetworkGraph() {
  const nodes = useMemo(() => [
    { id: 0, label: "Core", color: "#FF6B00", pos: new THREE.Vector3(0, 0.2, 0), size: 0.22 },
    { id: 1, label: "FastAPI", color: "#00E5FF", pos: new THREE.Vector3(-1.0, 0.8, -0.5), size: 0.13 },
    { id: 2, label: "Next.js", color: "#B5179E", pos: new THREE.Vector3(0.8, 1.0, 0.4), size: 0.15 },
    { id: 3, label: "AWS S3", color: "#FFC857", pos: new THREE.Vector3(-0.6, -0.6, 0.6), size: 0.12 },
    { id: 4, label: "DB Node", color: "#22C55E", pos: new THREE.Vector3(1.1, -0.4, -0.3), size: 0.14 }
  ], []);

  const connections = useMemo(() => [
    { start: 0, end: 1 },
    { start: 0, end: 2 },
    { start: 0, end: 3 },
    { start: 0, end: 4 },
    { start: 1, end: 2 }
  ], []);

  return (
    <group position={[2.2, 0.2, -1.0]} rotation={[0, -Math.PI / 8, 0]}>
      <Float speed={1.4} floatIntensity={0.4} rotationIntensity={0.2}>
        {/* Draw Connection Lines */}
        {connections.map((c, i) => {
          const startPt = nodes[c.start].pos;
          const endPt = nodes[c.end].pos;
          
          return (
            <line key={i}>
              <bufferGeometry>
                <bufferAttribute
                  attach="attributes-position"
                  args={[
                    new Float32Array([
                      startPt.x, startPt.y, startPt.z,
                      endPt.x, endPt.y, endPt.z
                    ]),
                    3
                  ]}
                />
              </bufferGeometry>
              <lineBasicMaterial color="#FF6B00" transparent opacity={0.35} />
            </line>
          );
        })}

        {/* Draw Nodes */}
        {nodes.map((node) => {
          return (
            <group key={node.id} position={node.pos}>
              <mesh>
                <sphereGeometry args={[node.size, 16, 16]} />
                <meshStandardMaterial
                  color={node.color}
                  emissive={node.color}
                  emissiveIntensity={1.2}
                />
              </mesh>
              <mesh scale={[1.25, 1.25, 1.25]}>
                <sphereGeometry args={[node.size, 8, 8]} />
                <meshBasicMaterial color={node.color} transparent opacity={0.15} wireframe />
              </mesh>
              
              <Html center position={[0, node.size + 0.25, 0]} distanceFactor={6}>
                <span className="px-1.5 py-0.5 rounded bg-dark/90 border border-white/10 text-[6px] font-mono text-white/80 whitespace-nowrap">
                  {node.label}
                </span>
              </Html>
            </group>
          );
        })}
      </Float>
    </group>
  );
}

export function SceneMissionControl({ active }: SceneMissionControlProps) {
  const groupRef = useRef<THREE.Group>(null);
  const [visible, setVisible] = useState(true);

  useFrame((state, delta) => {
    // Distance check for frustum culling (Scene is positioned at [20, -55, -170])
    if (groupRef.current) {
      const dist = state.camera.position.distanceTo(new THREE.Vector3(20, -55, -170));
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
          <Sparkles count={80} scale={15} size={1.8} speed={0.2} opacity={0.5} color="#FF6B00" />

          {/* Render 3D Heatmap calendar */}
          <HeatmapBoard3D />

          {/* Render 3D Repo branch graph */}
          <RepositoryNetworkGraph />

          {/* Central command core screen */}
          <group position={[0, -0.8, -3.0]}>
            <Float speed={1.5} floatIntensity={0.3} rotationIntensity={0.1}>
              {/* Floating glass panel backing */}
              <mesh>
                <boxGeometry args={[4.2, 2.2, 0.05]} />
                <meshPhysicalMaterial color="#0A0A0A" roughness={0.1} transmission={0.65} transparent opacity={0.6} />
              </mesh>
              {/* Glowing framing box */}
              <mesh>
                <boxGeometry args={[4.25, 2.25, 0.055]} />
                <meshBasicMaterial color="#FF6B00" wireframe transparent opacity={0.25} />
              </mesh>

              {/* Server activity telemetry indicator */}
              <pointLight intensity={1.5} color="#FF6B00" distance={5} />
              
              <Html center position={[0, 0, 0.05]} distanceFactor={6}>
                <div className="w-80 h-32 p-3 text-left font-mono text-[7px] text-muted flex flex-col gap-1 select-none pointer-events-none">
                  <div className="text-primary font-bold border-b border-primary/20 pb-1 flex justify-between">
                    <span>SYS_DIAGNOSTICS // STREAMING ACTIVE</span>
                    <span className="animate-pulse">● LIVE</span>
                  </div>
                  <div className="text-success">[LOAD] API Router connected: /gateway/drone/telemetry</div>
                  <div>[LOAD] Repository commits synced. Hash verified.</div>
                  <div>[LOAD] Contributor: Bakki Mahesh (1280 commits, 18 repos)</div>
                  <div>[SYNC] Sync: Mumbai Base Node - Latency 38ms - STATUS_OK</div>
                  <div className="text-primary/70">[EXEC] node network_diagnostics.sh --full --auto</div>
                </div>
              </Html>
            </Float>
          </group>

        </group>
      )}
    </group>
  );
}

export default SceneMissionControl;
