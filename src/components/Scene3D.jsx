"use client";

import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { PointMaterial, Points, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

// Particle field component
const ParticleField = ({ count = 5000, mousePosition }) => {
  const pointsRef = useRef();

  useFrame((state) => {
    if (!pointsRef.current) return;

    // Slow rotation of the entire particle system
    pointsRef.current.rotation.x = THREE.MathUtils.lerp(
      pointsRef.current.rotation.x,
      mousePosition.y * 0.5,
      0.05
    );
    pointsRef.current.rotation.y = THREE.MathUtils.lerp(
      pointsRef.current.rotation.y,
      mousePosition.x * 0.5,
      0.05
    );
  });

  // Generate random particles in a sphere
  const [positions] = useState(() => {
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      // Create a spherical distribution of points
      const radius = 1 + Math.random() * 0.2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = radius * Math.cos(phi);
    }

    return positions;
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3}>
      <PointMaterial
        transparent
        color="#88ccff"
        size={0.01}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
};

// Three.js scene component
const Scene3D = ({ mousePosition }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full z-[-1] opacity-70">
      <Canvas camera={{ position: [0, 0, 3], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <ParticleField mousePosition={mousePosition} />
        <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
      </Canvas>
    </div>
  );
};

export default Scene3D;
