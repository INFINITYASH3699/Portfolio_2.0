"use client";

import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Custom particles implementation without using drei
const ParticleField = ({ count = 5000, mousePosition }) => {
  const particlesRef = useRef();

  // Create geometry and material for particles
  const [particlesGeometry] = useState(() => {
    const geometry = new THREE.BufferGeometry();
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

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geometry;
  });

  const [particlesMaterial] = useState(() => {
    return new THREE.PointsMaterial({
      color: "#88ccff",
      size: 0.01,
      sizeAttenuation: true,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
  });

  useFrame(() => {
    if (!particlesRef.current) return;

    // Slow rotation of the entire particle system
    particlesRef.current.rotation.x = THREE.MathUtils.lerp(
      particlesRef.current.rotation.x,
      mousePosition.y * 0.5,
      0.05
    );
    particlesRef.current.rotation.y = THREE.MathUtils.lerp(
      particlesRef.current.rotation.y,
      mousePosition.x * 0.5,
      0.05
    );
  });

  return (
    <primitive
      ref={particlesRef}
      object={new THREE.Points(particlesGeometry, particlesMaterial)}
    />
  );
};

// Three.js scene component
const Scene3D = ({ mousePosition }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full z-[-1] opacity-70">
      <Canvas camera={{ position: [0, 0, 3], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <ParticleField mousePosition={mousePosition} />
      </Canvas>
    </div>
  );
};

export default Scene3D;
