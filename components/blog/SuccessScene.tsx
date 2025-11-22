"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Text, Stars, Sparkles, MeshDistortMaterial, OrbitControls } from "@react-three/drei";
import { useRef, useState } from "react";
import * as THREE from "three";
import { motion } from "framer-motion";

function FloatingShape() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.5, 0]} />
        <MeshDistortMaterial
          color="#4f46e5"
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
    </Float>
  );
}

function SuccessText() {
  return (
    <group>
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5} position={[0, 1, 0]}>
        <Text
          fontSize={0.8}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          font="/fonts/Inter-Bold.ttf" // Fallback font might be needed or use default
        >
          SUCCESS!
        </Text>
      </Float>
      <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.5} position={[0, -0.5, 0]}>
        <Text
          fontSize={0.3}
          color="#94a3b8"
          anchorX="center"
          anchorY="middle"
        >
          Your story has been submitted
        </Text>
      </Float>
    </group>
  );
}

export default function SuccessScene() {
  return (
    <div className="w-full h-[500px] relative">
      <Canvas camera={{ position: [0, 0, 6] }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} color="purple" intensity={0.5} />
        
        <FloatingShape />
        {/* <SuccessText /> Text might be tricky without font file, using HTML overlay instead */}
        
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        <Sparkles count={100} scale={6} size={2} speed={0.4} opacity={0.5} color="#60a5fa" />
        
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  );
}
