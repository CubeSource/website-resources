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

// Component to ensure materials stay double-sided
function EnsureDoubleSided({ scene }: { scene: any }) {
  useFrame(() => {
    if (scene) {
      scene.traverse((child: any) => {
        if (child.isMesh && child.material) {
          if (Array.isArray(child.material)) {
            child.material.forEach((mat: any) => {
              if (mat && mat.side !== DoubleSide) {
                mat.side = DoubleSide;
                mat.needsUpdate = true;
              }
            });
          } else {
            if (child.material.side !== DoubleSide) {
              child.material.side = DoubleSide;
              child.material.needsUpdate = true;
            }
          }
        }
      });
    }
  });
  return null;
}

function ModelViewer(/models/${src}: { src: string }) {
  const { scene: originalScene } = useGLTF(src);
  const [processedScene, setProcessedScene] = useState<any>(null);
  const meshRef = useRef<any>(null);

  // Keep face culling disabled on every frame
  useFrame(({ gl }) => {
    if (gl) {
      const context = gl.getContext() as WebGLRenderingContext;
      if (context) {
        context.disable(context.CULL_FACE);
      }
    }
  });

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
        
        // Make sure geometry is visible and normals are correct
        if (mesh.geometry) {
          mesh.geometry.computeBoundingBox();
          // Recalculate normals to fix culling issues
          if (mesh.geometry.attributes.normal) {
            mesh.geometry.computeVertexNormals();
            mesh.geometry.attributes.normal.needsUpdate = true;
          } else {
            // If no normals exist, compute them
            mesh.geometry.computeVertexNormals();
          }
        }
        
        // Fix materials - force them to be visible and double-sided
        // Always create new materials to ensure they're properly set
        if (mesh.material) {
          if (Array.isArray(mesh.material)) {
            mesh.material = mesh.material.map((mat: any) => {
              if (mat) {
                // Create a new material based on the original but with DoubleSide
                const newMat = mat.clone();
                newMat.side = DoubleSide;
                newMat.opacity = 1;
                newMat.transparent = false;
                newMat.needsUpdate = true;
                // Force update
                if (newMat.map) newMat.map.needsUpdate = true;
                return newMat;
              }
              return new MeshStandardMaterial({ color: 0x888888, side: DoubleSide });
            });
          } else {
            const newMat = mesh.material.clone();
            newMat.side = DoubleSide;
            newMat.opacity = 1;
            newMat.transparent = false;
            newMat.needsUpdate = true;
            if (newMat.map) newMat.map.needsUpdate = true;
            mesh.material = newMat;
          }
        } else {
          // Add a default material if none exists
          mesh.material = new MeshStandardMaterial({ color: 0x888888, side: DoubleSide });
        }
        
        // Also ensure the mesh itself is set up correctly
        mesh.frustumCulled = false; // Disable frustum culling
        mesh.matrixAutoUpdate = true;
        mesh.visible = true; // Ensure mesh is visible
        mesh.castShadow = true;
        mesh.receiveShadow = true;
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

  return (
    <>
      <EnsureDoubleSided scene={processedScene} />
      <primitive ref={meshRef} object={processedScene} />
    </>
  );
}

function ModelCanvas({ src, onControlsReady, onCameraReady }: { src: string; onControlsReady: (controls: any) => void; onCameraReady: (camera: any) => void }) {
  return (
    <Canvas
        gl={{ 
          antialias: true, 
          alpha: false,
          powerPreference: "high-performance",
          depth: true,
          stencil: false,
          logarithmicDepthBuffer: false
        }}
      onCreated={({ gl: renderer, camera }) => {
        // Disable face culling globally via the renderer's context
        const gl = renderer.getContext() as WebGLRenderingContext;
        if (gl) {
          gl.disable(gl.CULL_FACE);
          // Also ensure it stays disabled
          renderer.setRenderTarget(null);
        }
        onCameraReady(camera);
      }}
      style={{ width: '100%', height: '100%', display: 'block' }}
      camera={{ position: [0, 0, 5], fov: 50 }}
      dpr={[1, 2]}
    >
      <color attach="background" args={['#040404']} />
      <gridHelper args={[10, 10, 0x444444, 0x222222]} position={[0, -1.5, 0]} />
      <ambientLight intensity={1.2} />
      <directionalLight position={[10, 10, 5]} intensity={1.5} />
      <directionalLight position={[-10, -10, -5]} intensity={1.5} />
      <directionalLight position={[0, 10, 0]} intensity={1.0} />
      <directionalLight position={[0, -10, 0]} intensity={1.0} />
      <pointLight position={[0, 0, 5]} intensity={0.8} />
      <pointLight position={[0, 0, -5]} intensity={0.8} />
      <Suspense fallback={<TestBox />}>
        <ModelViewer src={src} />
      </Suspense>
      <OrbitControls
        ref={onControlsReady}
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
  const controlsRef = useRef<any>(null);
  const cameraRef = useRef<any>(null);
  
  const handleZoomIn = () => {
    if (cameraRef.current && controlsRef.current) {
      // Get current distance from target
      const target = controlsRef.current.target;
      const currentDistance = cameraRef.current.position.distanceTo(target);
      
      // Calculate direction from camera to target
      const direction = new Vector3()
        .subVectors(cameraRef.current.position, target)
        .normalize();
      
      // Move camera closer (zoom in)
      const newDistance = Math.max(currentDistance * 0.8, 0.5);
      cameraRef.current.position.copy(target).add(direction.multiplyScalar(newDistance));
      controlsRef.current.update();
    }
  };
  
  const handleZoomOut = () => {
    if (cameraRef.current && controlsRef.current) {
      // Get current distance from target
      const target = controlsRef.current.target;
      const currentDistance = cameraRef.current.position.distanceTo(target);
      
      // Calculate direction from camera to target
      const direction = new Vector3()
        .subVectors(cameraRef.current.position, target)
        .normalize();
      
      // Move camera farther (zoom out)
      const newDistance = Math.min(currentDistance * 1.25, 20);
      cameraRef.current.position.copy(target).add(direction.multiplyScalar(newDistance));
      controlsRef.current.update();
    }
  };

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
            <ModelCanvas 
              src={`/models/${src}`} 
              onControlsReady={(controls) => {
                controlsRef.current = controls;
              }}
              onCameraReady={(camera) => {
                cameraRef.current = camera;
              }}
            />
          </div>
        </Suspense>
      </div>
      <div className="flex justify-between items-center mt-2">
        {children && (
          <p className="text-sm text-zinc-400 text-left">
            {children}
          </p>
        )}
        <div className="flex gap-2 ml-auto">
          <button
            onClick={handleZoomOut}
            className={`${vt323.className} px-3 py-1.5 bg-[#040404] bg-opacity-80 backdrop-blur-md border border-white/10 text-white text-sm hover:bg-opacity-100 transition-colors`}
            aria-label="Zoom out"
          >
            −
          </button>
          <button
            onClick={handleZoomIn}
            className={`${vt323.className} px-3 py-1.5 bg-[#040404] bg-opacity-80 backdrop-blur-md border border-white/10 text-white text-sm hover:bg-opacity-100 transition-colors`}
            aria-label="Zoom in"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}
