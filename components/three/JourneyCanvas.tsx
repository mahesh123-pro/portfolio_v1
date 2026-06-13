"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars, Sparkles } from "@react-three/drei";
import * as THREE from "three";
import JourneyWorld from "./JourneyWorld";

// 3D Path definitions for the camera fly-through
const cameraPoints = [
  new THREE.Vector3(0, 1.5, 9),       // Scene 1: Arrival Portal
  new THREE.Vector3(12, 6, -20),     // Scene 2: Cloud Universe
  new THREE.Vector3(-10, -12, -55),  // Scene 3: Project Galaxy
  new THREE.Vector3(0, -32, -95),    // Scene 4: Experience Tunnel
  new THREE.Vector3(14, -48, -135),  // Scene 5: Mission Control
  new THREE.Vector3(0, -70, -180)    // Scene 6: Contact Portal
];

const targetPoints = [
  new THREE.Vector3(0, 0, 0),        // Scene 1 target (Arrival Portal Center)
  new THREE.Vector3(15, -10, -35),   // Scene 2 target (Skills Sun)
  new THREE.Vector3(-15, -25, -75),  // Scene 3 target (Islands center)
  new THREE.Vector3(0, -40, -120),   // Scene 4 target (Tunnel center)
  new THREE.Vector3(20, -55, -170),  // Scene 5 target (Command center dashboard)
  new THREE.Vector3(0, -75, -220)    // Scene 6 target (Contact Portal Center)
];

interface CameraControllerProps {
  scrollProgress: React.MutableRefObject<number>;
}

function CameraController({ scrollProgress }: CameraControllerProps) {
  const currentLookAt = useRef(new THREE.Vector3(0, 0, 0));
  const mouse = useRef({ x: 0, y: 0 });

  // Generate continuous spline curves for position and look-at target
  const cameraCurve = useMemo(() => new THREE.CatmullRomCurve3(cameraPoints), []);
  const targetCurve = useMemo(() => new THREE.CatmullRomCurve3(targetPoints), []);

  // Listen to mouse movement for interactive parallax tilt
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame((state, delta) => {
    // Clamping progress
    const p = Math.max(0, Math.min(0.999, scrollProgress.current));

    // Sample coordinates along curves
    const targetCamPos = cameraCurve.getPointAt(p);
    const targetLookAt = targetCurve.getPointAt(p);

    // Apply interactive mouse displacement offset
    const parallaxStrength = 1.2;
    const mouseOffsetCam = new THREE.Vector3(
      mouse.current.x * parallaxStrength,
      mouse.current.y * parallaxStrength,
      0
    );

    const finalCamPos = targetCamPos.clone().add(mouseOffsetCam);

    // Smoothly lerp camera position and lookAt target (damping)
    const lerpFactor = 0.05;
    state.camera.position.lerp(finalCamPos, lerpFactor);
    currentLookAt.current.lerp(targetLookAt, lerpFactor);
    state.camera.lookAt(currentLookAt.current);
  });

  return null;
}

interface JourneyCanvasProps {
  scrollProgress: React.MutableRefObject<number>;
  activeScene: number;
}

export function JourneyCanvas({ scrollProgress, activeScene }: JourneyCanvasProps) {
  return (
    <div className="fixed inset-0 w-screen h-screen z-0 pointer-events-none bg-[#050505]">
      <Canvas
        camera={{ position: [0, 1.5, 9], fov: 60 }}
        dpr={[1, 1.5]} // Performance optimization: Cap resolution at 1.5x
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: "high-performance",
          depth: true,
          stencil: false
        }}
      >
        {/* Core Lighting System */}
        <ambientLight intensity={0.15} />
        <directionalLight position={[10, 20, 10]} intensity={0.8} color="#ffffff" />
        
        {/* Volumetric atmosphere fog */}
        <fogExp2 attach="fog" args={["#050505", 0.007]} />

        {/* Global Deep Space Particles */}
        <Stars radius={100} depth={50} count={3500} factor={4} saturation={1} fade speed={1.0} />
        <Sparkles count={250} scale={60} size={2} speed={0.2} opacity={0.5} color="#FF6B00" />

        {/* 3D World Scenes assembly */}
        <JourneyWorld scrollProgress={scrollProgress} activeScene={activeScene} />

        {/* Camera flight controller */}
        <CameraController scrollProgress={scrollProgress} />
      </Canvas>
    </div>
  );
}

export default JourneyCanvas;
