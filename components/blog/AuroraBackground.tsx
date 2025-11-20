"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef, useEffect, useState } from "react";
import * as THREE from "three";

const vertexShader = /* glsl */ `
  uniform float uTime;
  varying vec2 vUv;

  void main() {
    vUv = uv;
    vec3 pos = position;
    float wave1 = sin((pos.x * 1.2) + (uTime * 0.6)) * 0.3;
    float wave2 = cos((pos.y * 1.5) + (uTime * 0.4)) * 0.25;
    float wave3 = sin((pos.x + pos.y) * 0.7 + (uTime * 0.9)) * 0.2;
    pos.z += wave1 + wave2 + wave3;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  uniform float uTime;
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  varying vec2 vUv;

  void main() {
    float wave = sin((vUv.y * 6.0) + (uTime * 0.5)) * 0.2;
    float mixVal = clamp(vUv.y + wave, 0.0, 1.0);
    vec3 color = mix(uColorA, uColorB, mixVal);
    float alpha = 0.35 + (0.3 * (1.0 - vUv.y));
    gl_FragColor = vec4(color, alpha);
  }
`;

function AuroraWave() {
  const shaderRef = useRef<THREE.ShaderMaterial>(null);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };

    checkTheme();

    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColorA: { value: new THREE.Color(isDark ? "#fbbf24" : "#3b82f6") },
      uColorB: { value: new THREE.Color(isDark ? "#fb923c" : "#8b5cf6") },
    }),
    [isDark]
  );

  useFrame((_, delta) => {
    if (shaderRef.current) {
      shaderRef.current.uniforms.uTime.value += delta;
    }
  });

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.5, 0]}>
      <planeGeometry args={[24, 16, 200, 200]} />
      <shaderMaterial
        ref={shaderRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

function AuroraParticles() {
  const ref = useRef<THREE.Points>(null);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };

    checkTheme();

    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  const positions = useMemo(() => {
    const count = 1200;
    const arr = new Float32Array(count * 3);

    const pseudoRandom = (seed: number) => {
      const x = Math.sin(seed * 12.9898) * 43758.5453;
      return x - Math.floor(x);
    };

    for (let i = 0; i < count; i++) {
      arr[i * 3 + 0] = (pseudoRandom(i) - 0.5) * 20;
      arr[i * 3 + 1] = pseudoRandom(i + 11) * 8;
      arr[i * 3 + 2] = (pseudoRandom(i + 31) - 0.5) * 10;
    }

    return arr;
  }, []);

  const geometry = useMemo(() => {
    const bufferGeometry = new THREE.BufferGeometry();
    bufferGeometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3)
    );
    return bufferGeometry;
  }, [positions]);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.05;
    }
  });

  return (
    <points ref={ref} position={[0, 1, -4]}>
      <primitive object={geometry} attach="geometry" />
      <pointsMaterial
        size={isDark ? 0.05 : 0.12}
        color={isDark ? "#ffffff" : "#1e40af"}
        transparent
        opacity={0.4}
      />
    </points>
  );
}

export default function AuroraBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <Canvas camera={{ position: [0, 5, 10], fov: 60 }}>
        <ambientLight intensity={0.4} />
        <AuroraWave />
        <AuroraParticles />
      </Canvas>
    </div>
  );
}
