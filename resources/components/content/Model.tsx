'use client';

import { Suspense, ReactNode, useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Mesh, Box3, Vector3, MeshStandardMaterial, DoubleSide } from "three";
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
  const { scene: originalScene } = useGLTF(src);
  const [processedScene, setProcessedScene] = useState<any>(null);

  useEffect(() => {
    if (!originalScene) return;

    // Clone the scene to avoid mutating the cached original
    const scene = originalScene.clone();
    
    // Calculate bounding box to center and scale the model
    const box = new Box3().setFromObject(scene);
    
    if (box.isEmpty()) {
      console.warn('Model bounding box is empty');
      return;
    }
    
    const center = box.getCenter(new Vector3());
    const size = box.getSize(new Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);
    const scale = maxDim > 0 ? 2 / maxDim : 1;
    
    console.log('Model bounds:', { center, size, maxDim, scale });
    
    // Center and scale the model
    scene.scale.setScalar(scale);
    scene.position.sub(center.multiplyScalar(scale));
    
    // Ensure all materials are visible and have proper settings
    let meshCount = 0;
    scene.traverse((child) => {
      if ((child as any).isMesh) {
        meshCount++;
        const mesh = child as any;
        
        // Make sure geometry is visible
        if (mesh.geometry) {
          mesh.geometry.computeBoundingBox();
        }
        
        // Fix materials - force them to be visible and double-sided
        if (mesh.material) {
          if (Array.isArray(mesh.material)) {
            mesh.material.forEach((mat: any) => {
              if (mat) {
                mat.needsUpdate = true;
                mat.opacity = 1;
                mat.transparent = false;
                mat.side = DoubleSide; // Make material double-sided
              }
            });
          } else {
            mesh.material.needsUpdate = true;
            mesh.material.opacity = 1;
            mesh.material.transparent = false;
            mesh.material.side = DoubleSide; // Make material double-sided
          }
        } else {
          // Add a default material if none exists
          console.warn('Mesh has no material, adding default');
          mesh.material = new MeshStandardMaterial({ color: 0x888888, side: DoubleSide });
        }
      }
    });
    
    console.log(`Processed ${meshCount} meshes`);
    
    // Log final position and scale
    const finalBox = new Box3().setFromObject(scene);
    const finalCenter = finalBox.getCenter(new Vector3());
    const finalSize = finalBox.getSize(new Vector3());
    console.log('Final model bounds:', { center: finalCenter, size: finalSize });
    
    setProcessedScene(scene);
  }, [originalScene]);

  if (!originalScene) {
    return <TestBox />;
  }

  if (!processedScene) {
    return <TestBox />;
  }

  return <primitive object={processedScene} />;
}

function ModelCanvas({ src }: { src: string }) {
  return (
    <Canvas
      gl={{ antialias: true, alpha: false }}
      style={{ width: '100%', height: '100%', display: 'block' }}
      camera={{ position: [0, 0, 5], fov: 50 }}
      dpr={[1, 2]}
    >
      <color attach="background" args={['#040404']} />
      <ambientLight intensity={0.8} />
      <directionalLight position={[10, 10, 5]} intensity={1.5} />
      <directionalLight position={[-10, -10, -5]} intensity={0.8} />
      <pointLight position={[0, 0, 5]} intensity={0.5} />
      <Suspense fallback={<TestBox />}>
        <ModelViewer src={src} />
      </Suspense>
      <OrbitControls
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        minDistance={0.5}
        maxDistance={20}
        autoRotate={false}
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
