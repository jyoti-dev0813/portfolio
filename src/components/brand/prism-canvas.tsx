"use client";

import { ContactShadows } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import type { Group } from "three";
import { MathUtils } from "three";

function Gem() {
  const group = useRef<Group>(null);
  const tilt = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      tilt.current.x = (event.clientX / window.innerWidth - 0.5) * 0.55;
      tilt.current.y = (event.clientY / window.innerHeight - 0.5) * 0.35;
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useFrame((_, delta) => {
    const node = group.current;
    if (!node) return;
    node.rotation.y += delta * 0.22;
    node.rotation.x = MathUtils.damp(node.rotation.x, tilt.current.y, 3, delta);
    node.rotation.z = MathUtils.damp(node.rotation.z, -tilt.current.x * 0.35, 3, delta);
  });

  return (
    <group ref={group}>
      <mesh>
        <icosahedronGeometry args={[1.15, 0]} />
        <meshPhysicalMaterial
          color="#b7a6ff"
          metalness={0.62}
          roughness={0.16}
          clearcoat={1}
          clearcoatRoughness={0.12}
          reflectivity={1}
        />
      </mesh>
      <mesh position={[-1.7, 0.15, 0.2]} rotation={[0, 0, 0.15]}>
        <boxGeometry args={[1.5, 0.02, 0.02]} />
        <meshBasicMaterial color="#d7f6ff" transparent opacity={0.9} />
      </mesh>
    </group>
  );
}

export default function PrismCanvas() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 3.4], fov: 35 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      aria-label="Rotating faceted prism"
    >
      <ambientLight intensity={0.45} />
      <directionalLight position={[-3, 2, 2]} intensity={4} color="#8b6cff" />
      <pointLight position={[2.4, 1.2, 2]} intensity={12} color="#d7f6ff" distance={8} />
      <Gem />
      <ContactShadows position={[0, -1.45, 0]} opacity={0.4} scale={6} blur={2.4} far={3} />
    </Canvas>
  );
}
