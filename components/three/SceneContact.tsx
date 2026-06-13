"use client";

import { useRef, useState, useEffect, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Html, Sparkles } from "@react-three/drei";
import * as THREE from "three";

interface SceneContactProps {
  active: boolean;
}

export function SceneContact({ active }: SceneContactProps) {
  const groupRef = useRef<THREE.Group>(null);
  const portalRingRef = useRef<THREE.Mesh>(null);
  const coreLightRef = useRef<THREE.PointLight>(null);
  const [visible, setVisible] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const submitAnimTime = useRef(0);

  // Concentric rings inside portal vortex
  const vortexRings = useMemo(() => {
    const list = [];
    for (let i = 0; i < 6; i++) {
      list.push({
        radius: 1.0 + i * 0.4,
        speed: 0.8 + i * 0.2,
        color: i % 2 === 0 ? "#FF6B00" : "#8a2be2"
      });
    }
    return list;
  }, []);

  // Listen for the form submission custom event
  useEffect(() => {
    const handleSubmission = () => {
      setSubmitted(true);
      submitAnimTime.current = 0;
      // Reset submission flare animation after 6 seconds
      setTimeout(() => {
        setSubmitted(false);
      }, 6000);
    };
    window.addEventListener("contact-submitted", handleSubmission);
    return () => window.removeEventListener("contact-submitted", handleSubmission);
  }, []);

  useFrame((state, delta) => {
    // Distance-based frustum culling (Scene is positioned at [0, -75, -220])
    if (groupRef.current) {
      const dist = state.camera.position.distanceTo(new THREE.Vector3(0, -75, -220));
      const isNear = dist < 45;
      if (isNear !== visible) {
        setVisible(isNear);
      }
    }

    if (!visible) return;

    // Slow portal rotation
    if (portalRingRef.current) {
      const spinSpeed = submitted ? 6.0 : 0.8;
      portalRingRef.current.rotation.z += delta * spinSpeed;
      portalRingRef.current.rotation.y += delta * spinSpeed * 0.2;
    }

    // Handle form submission flare animation
    if (submitted && coreLightRef.current) {
      submitAnimTime.current += delta;
      const t = submitAnimTime.current;
      
      if (t < 1.5) {
        // Quick expansion / flare-up (0s to 1.5s)
        const progress = t / 1.5;
        coreLightRef.current.intensity = 2 + progress * 20;
      } else if (t < 5.0) {
        // High energy swirling & decay (1.5s to 5.0s)
        const progress = (t - 1.5) / 3.5;
        coreLightRef.current.intensity = 22 - progress * 20;
      } else {
        // Restore base intensity
        coreLightRef.current.intensity = 2.0;
      }
    }
  });

  return (
    <group ref={groupRef}>
      {visible && (
        <group>
          <Sparkles count={submitted ? 300 : 80} scale={10} size={submitted ? 3 : 1.5} speed={submitted ? 1.5 : 0.2} opacity={0.6} color="#FFC857" />

          <Float speed={submitted ? 6 : 2} floatIntensity={submitted ? 1.5 : 0.5} rotationIntensity={0.5}>
            <group position={[0, 0.5, 0]}>
              {/* Outer Portal Structure */}
              <mesh ref={portalRingRef}>
                <torusGeometry args={[2.5, 0.16, 16, 100]} />
                <meshStandardMaterial
                  color="#FF6B00"
                  emissive="#FF6B00"
                  emissiveIntensity={submitted ? 4.0 : 1.0}
                  roughness={0.1}
                  metalness={0.9}
                />
              </mesh>
              <mesh scale={[1.05, 1.05, 1.05]}>
                <torusGeometry args={[2.5, 0.02, 8, 32]} />
                <meshBasicMaterial color="#FFC857" transparent opacity={0.25} wireframe />
              </mesh>

              {/* Vortex rings inside portal */}
              {vortexRings.map((ring, i) => (
                <mesh
                  key={i}
                  rotation={[0, 0, (i * Math.PI) / 6]}
                  ref={(el) => {
                    if (el && submitted) {
                      el.rotation.z += i * 0.1; // accelerate rotation when submitted
                    }
                  }}
                >
                  <torusGeometry args={[ring.radius, 0.012, 8, 64]} />
                  <meshBasicMaterial
                    color={submitted ? "#00E5FF" : ring.color}
                    transparent
                    opacity={submitted ? 0.6 : 0.2}
                    wireframe={i % 2 === 0}
                  />
                </mesh>
              ))}

              {/* Portal Center Core */}
              <mesh>
                <sphereGeometry args={[0.3, 32, 32]} />
                <meshBasicMaterial
                  color={submitted ? "#00E5FF" : "#FFC857"}
                  toneMapped={false}
                />
              </mesh>
              
              {/* Submission energy streams */}
              {submitted && (
                <Sparkles count={150} scale={4} size={4} speed={2} opacity={0.9} color="#00E5FF" />
              )}

              {/* Central glowing point light */}
              <pointLight
                ref={coreLightRef}
                intensity={2.0}
                color={submitted ? "#00E5FF" : "#FF6B00"}
                distance={15}
              />
            </group>
          </Float>
        </group>
      )}
    </group>
  );
}

export default SceneContact;
