import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, Stars } from '@react-three/drei';
import { motion } from 'framer-motion-3d';
import * as THREE from 'three';

function Earth() {
  const earthRef = useRef<THREE.Mesh>(null);
  
  useFrame(({ clock }) => {
    if (earthRef.current) {
      earthRef.current.rotation.y = clock.getElapsedTime() * 0.1;
    }
  });

  return (
    <group position={[0, 0, -15]}>
      {/* Core Earth sphere */}
      <Sphere ref={earthRef} args={[8, 64, 64]}>
        <meshPhongMaterial
          color="#1a237e"
          emissive="#1a237e"
          emissiveIntensity={0.5}
          specular={new THREE.Color('#ffffff')}
          shininess={10}
        />
      </Sphere>
      
      {/* Glowing atmosphere */}
      <Sphere args={[8.2, 32, 32]}>
        <meshPhongMaterial
          color="#4051b5"
          transparent
          opacity={0.1}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </Sphere>
      
      {/* City lights layer */}
      <Sphere args={[8.1, 64, 64]}>
        <meshPhongMaterial
          color="#bba14f"
          transparent
          opacity={0.3}
          blending={THREE.AdditiveBlending}
          wireframe
        />
      </Sphere>
    </group>
  );
}

function AISphere() {
  const sphereRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (sphereRef.current) {
      sphereRef.current.rotation.x = clock.getElapsedTime() * 0.2;
      sphereRef.current.rotation.y = clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <motion.group
      animate={{
        y: [0, 0.5, 0],
        scale: [1, 1.05, 1]
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      position={[2, 0, 0]}
    >
      <Sphere ref={sphereRef} args={[1, 100, 100]} scale={1}>
        <meshStandardMaterial
          color="#BBA14F"
          roughness={0.2}
          metalness={0.8}
          emissive="#BBA14F"
          emissiveIntensity={0.2}
        />
      </Sphere>
    </motion.group>
  );
}

function Scene() {
  return (
    <Suspense fallback={null}>
      <ambientLight intensity={0.5} />
      <pointLight position={[100, 10, -50]} intensity={2} />
      <pointLight position={[-100, -10, -50]} intensity={1} />
      <Stars radius={300} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      <Earth />
      <AISphere />
      <fog attach="fog" args={['#000000', 30, 40]} />
    </Suspense>
  );
}

export default function HeroScene() {
  return (
    <div className="absolute inset-0" style={{ zIndex: 0 }}>
      <Canvas
        camera={{ position: [0, 0, 30], fov: 45 }}
        style={{ background: 'transparent' }}
        gl={{ 
          alpha: true, 
          antialias: true,
          powerPreference: "high-performance"
        }}
        dpr={[1, 2]}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
