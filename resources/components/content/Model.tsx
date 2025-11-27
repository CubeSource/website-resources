'use client';

import { Suspense, ReactNode, useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Box3, Vector3, Mesh } from "three";
import { vt323 } from "../../lib/fonts";

interface ModelProps {
  src: string;
  alt: string;
  children?: ReactNode;
}

// Test box to verify Canvas is working
function TestBox() {
  const meshRef = useRef<Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
    }
  });
  
  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  );
}

function ModelViewer({ src }: { src: string }) {
  const { scene } = useGLTF(src);
  
  useEffect(() => {
    if (!scene) return;
    
    try {
      // Calculate bounding box to center and scale the model
      const box = new Box3().setFromObject(scene);
      const center = box.getCenter(new Vector3());
      const size = box.getSize(new Vector3());
      const maxDim = Math.max(size.x, size.y, size.z);
      const scale = maxDim > 0 ? 1.5 / maxDim : 1;
      
      // Center and scale the model
      scene.scale.setScalar(scale);
      scene.position.sub(center.multiplyScalar(scale));
    } catch (err) {
      console.error('Error processing model:', err);
    }
  }, [scene]);
  
  if (!scene) {
    console.log('No scene loaded, showing test box');
    return <TestBox />;
  }
  
  console.log('Model loaded successfully:', scene);
  return <primitive object={scene} />;
}

function ModelCanvas({ src }: { src: string }) {
  return (
    <Canvas
      gl={{ antialias: true, alpha: false }}
      style={{ width: '100%', height: '100%', display: 'block' }}
      camera={{ position: [0, 0, 3], fov: 50 }}
      dpr={[1, 2]}
      onCreated={(state) => {
        console.log('Canvas created:', state);
      }}
    >
      <color attach="background" args={['#040404']} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <directionalLight position={[-10, -10, -5]} intensity={0.5} />
      <Suspense fallback={<TestBox />}>
        <ModelViewer src={src} />
      </Suspense>
      <OrbitControls
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        minDistance={1}
        maxDistance={10}
      />
    </Canvas>
  );
}

export default function Model({ src, alt, children }: ModelProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  return (
    <div className="w-full my-6">
      <div 
        ref={containerRef}
        className="w-full aspect-video bg-[#040404] bg-opacity-80 backdrop-blur-md border border-white/10 rounded-[0px] overflow-hidden relative"
      >
        <Suspense
          fallback={
            <div className="w-full h-full flex items-center justify-center absolute inset-0">
              <p className={`${vt323.className} text-white text-lg sm:text-xl text-zinc-400`}>
                Loading model...
              </p>
            </div>
          }
        >
          <div className="w-full h-full absolute inset-0">
            <ModelCanvas src={`/models/${src}`} />
          </div>
        </Suspense>
      </div>
      {children && (
        <p className="text-sm text-zinc-400 mt-2 text-left">
          {children}
        </p>
      )}
    </div>
  );
}

