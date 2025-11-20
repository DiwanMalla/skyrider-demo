"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";

interface FloatingShapeProps {
  position: [number, number, number];
  rotationSpeed: number;
  floatSpeed: number;
  scale: number;
  color: string;
}

function FloatingShape({
  position,
  rotationSpeed,
  floatSpeed,
  scale,
  color,
}: FloatingShapeProps) {
  const mesh = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (!mesh.current) return;
    mesh.current.rotation.x += rotationSpeed * delta;
    mesh.current.rotation.y += rotationSpeed * 1.2 * delta;
    mesh.current.position.y =
      position[1] + Math.sin(state.clock.elapsedTime * floatSpeed) * 0.4;
  });

  return (
    <mesh ref={mesh} position={position} scale={scale} castShadow>
      <icosahedronGeometry args={[1.1, 0]} />
      <meshStandardMaterial
        color={color}
        wireframe
        opacity={0.55}
        transparent
      />
    </mesh>
  );
}

function StarField() {
  const points = useMemo(() => {
    const positions = new Float32Array(1500 * 3);
    const generator = new THREE.Random("skyrider-blog");
    for (let i = 0; i < positions.length; i += 3) {
      positions[i] = (generator.nextFloat() - 0.5) * 20;
      positions[i + 1] = (generator.nextFloat() - 0.5) * 12;
      positions[i + 2] = -Math.abs(generator.nextFloat() * 15) - 4;
    }
    return positions;
  }, []);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={points.length / 3}
          array={points}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#fbbf24"
        opacity={0.35}
        transparent
        sizeAttenuation
      />
    </points>
  );
}

export default function CosmicBackground() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[5, 5, 10]} intensity={0.4} />
          <pointLight position={[-5, -2, 6]} color="#fbbf24" intensity={1.2} />
          <StarField />
          <FloatingShape
            position={[2, 1.5, 0]}
            rotationSpeed={0.3}
            floatSpeed={1.1}
            scale={1.2}
            color="#f97316"
          />
          <FloatingShape
            position={[-3, -1.2, 0]}
            rotationSpeed={0.2}
            floatSpeed={0.8}
            scale={0.9}
            color="#f59e0b"
          />
          <FloatingShape
            position={[0, -0.5, -1.5]}
            rotationSpeed={0.25}
            floatSpeed={1.4}
            scale={1.4}
            color="#fb923c"
          />
        </Suspense>
      </Canvas>
      <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/10 to-white/60 dark:from-slate-900/70 dark:via-slate-900/30 dark:to-slate-900/90 pointer-events-none" />
    </div>
  );
}
