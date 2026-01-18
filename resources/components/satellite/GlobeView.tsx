"use client";

import React, { useMemo, useRef, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
// We dynamically import `react-globe.gl` at runtime if available. This lets the
// project run even when the package isn't installed locally (useful for CI
// or quick dev without the heavy dependency). If not present, we render a
// lightweight fallback message instead of crashing the build.
import * as THREE from 'three';
import { SimSatellite } from './types';
import { parseOrbitalParams, generateConstellation, getCountsMap } from './utils';
import { Globe as GlobeIcon, Navigation, Info, Layers, Zap, Orbit, Lightbulb } from '@/components/icons';

// Module-scoped dynamic import so HMR / re-renders don't recreate the component
const DynamicGlobe = dynamic(
  () => import('react-globe.gl').then((mod) => mod.default || mod),
  {
    ssr: false,
    loading: () => (
      <div className="h-full w-full flex items-center justify-center bg-slate-900/30 rounded-xl border border-slate-800 text-slate-500 animate-pulse">
        Initializing 3D Environment...
      </div>
    )
  }
);

interface Props {
  selectedNetwork: string;
}

type GlobeModule = any;
const INTERESTING_FACTS: Record<string, string> = {
    'Iridium': "The original Iridium satellites produced 'Iridium flares' so bright they could be seen in daylight.",
    'Orbcomm': "Orbcomm was the first commercial provider of global low-earth orbit data and messaging services.",
    'Globalstar': "Uses a 'bent-pipe' architecture, relaying signals directly to ground gateways without inter-satellite links.",
    'Kinéis': "A new French constellation aiming to connect millions of IoT devices with very low power consumption.",
    'Starlink': "Operates the largest satellite constellation in history, with thousands of satellites providing low-latency internet.",
    'OneWeb': "Satellites operate in higher LEO than Starlink, requiring fewer satellites for global coverage.",
    'Inmarsat': "Originally founded to establish a satellite communications network for the maritime community.",
    'Thuraya': "Known for dual-mode phones that switch between satellite and GSM networks seamlessly.",
    'GPS': "Operated by the U.S. Space Force, it relies on atomic clocks accurate to a few nanoseconds.",
    'Galileo': "A civilian-controlled European system that offers better positioning accuracy at high latitudes.",
    'GLONASS': "The Russian alternative to GPS, particularly effective at high latitudes due to its orbital inclination.",
};

export const GlobeView: React.FC<Props> = ({ selectedNetwork }) => {
  const globeEl = useRef<any | undefined>(undefined);
  const [containerDimensions, setContainerDimensions] = useState({ width: 0, height: 0 });
  const [isGlobeReady, setGlobeReady] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [landPolygons, setLandPolygons] = useState({ features: [] });
  
  // Refs for InstancedMesh management to avoid React state overhead in animation loop
  const meshRef = useRef<THREE.InstancedMesh | null>(null);
  const satellitesDataRef = useRef<SimSatellite[]>([]);
  
  const orbitalData = useMemo(() => parseOrbitalParams(), []);
  
  const selectedOrbitalParams = useMemo(() => 
    orbitalData.find(p => p.network === selectedNetwork) || orbitalData[0]
  , [selectedNetwork, orbitalData]);

  const [strategyType, strategyDesc] = useMemo(() => {
    const raw = selectedOrbitalParams.coverageStrategy || '';
    const idx = raw.indexOf(':');
    if (idx !== -1) {
        let type = raw.substring(0, idx).trim();
        type = type.replace(/\s*\(.*?\)/, ''); 
        return [type, raw.substring(idx + 1).trim()];
    }
    return [null, raw];
  }, [selectedOrbitalParams]);

  // Generate initial static constellation data
  const initialSatellites = useMemo(() => 
    generateConstellation(selectedOrbitalParams)
  , [selectedOrbitalParams]);


  // Satellite counts for display
  const countsMap = useMemo(() => getCountsMap(), []);
  const totalRealCount = countsMap[selectedNetwork] || 0;
  const isCapped = initialSatellites.length < totalRealCount;
  const simCount = initialSatellites.length;

  // Colors
  const PALETTE = [
    '#22d3ee', '#f0abfc', '#a3e635', '#22d3ee', '#e879f9', '#a3e635',
    '#34985f', '#7F00FF', '#DA70D6', '#BF40BF', '#0FFF50'
  ];
  const NETWORK_COLORS: Record<string, string> = {
    'Thuraya': '#0FFF50', 'Inmarsat': '#7F00FF', 'Globalstar': '#e879f9',
  };
  const getNetworkColor = (name: string) => {
    if (NETWORK_COLORS[name]) return NETWORK_COLORS[name];
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return PALETTE[Math.abs(hash) % PALETTE.length];
  };
  const currentColor = useMemo(() => getNetworkColor(selectedNetwork), [selectedNetwork]);

  const orbitType = useMemo(() => {
    const alt = selectedOrbitalParams.altitudeKm;
    if (alt > 30000) return 'GEO';
    if (alt > 2000) return 'MEO';
    return 'LEO';
  }, [selectedOrbitalParams.altitudeKm]);

  // 1. Setup InstancedMesh
  useEffect(() => {
    if (!globeEl.current || !isGlobeReady) return;
    
    // Cleanup previous mesh
    if (meshRef.current) {
        const scene = globeEl.current.scene();
        if (scene) scene.remove(meshRef.current);
        
        if (meshRef.current.geometry) meshRef.current.geometry.dispose();
        if (meshRef.current.material) {
            if (Array.isArray(meshRef.current.material)) {
                meshRef.current.material.forEach(m => m.dispose());
            } else {
                (meshRef.current.material as THREE.Material).dispose();
            }
        }
        meshRef.current = null;
    }

    // Prepare data
    satellitesDataRef.current = initialSatellites.map(s => ({ ...s }));
    const count = satellitesDataRef.current.length;
    if (count === 0) return;

    // Geometry & Material
    // Adjust size based on count/orbit
    let radius = 1.5;
    let segments = 12; // Low poly for performance
    const alt = selectedOrbitalParams.altitudeKm;
    
    if (count > 2000) {
        radius = 0.5; segments = 6;
    } else if (count > 500) {
        radius = 0.8; segments = 8;
    } else if (count > 100) {
        radius = 1.0; segments = 10;
    }
    if (alt > 30000) radius *= 3; 
    else if (alt > 8000) radius *= 2.2;

    const geometry = new THREE.SphereGeometry(radius, segments, segments);
    const material = new THREE.MeshPhongMaterial({ 
        color: currentColor,
        emissive: new THREE.Color(currentColor).multiplyScalar(0.4),
        shininess: 50
    });

    const mesh = new THREE.InstancedMesh(geometry, material, count);
    mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage); // Optimization for frequent updates
    
    const scene = globeEl.current.scene();
    if (scene) scene.add(mesh);
    meshRef.current = mesh;

    return () => {
        if (meshRef.current && globeEl.current) {
            const scene = globeEl.current.scene();
            if (scene) scene.remove(meshRef.current);
            if (meshRef.current.geometry) meshRef.current.geometry.dispose();
            if (meshRef.current.material) (meshRef.current.material as THREE.Material).dispose();
            meshRef.current = null;
        }
    };
  }, [initialSatellites, selectedOrbitalParams, currentColor, isGlobeReady]);

  // 2. Animation Loop (Updates InstancedMesh directly)
  useEffect(() => {
    let animationFrameId: number;
    const startTime = Date.now();
    const timeScale = 100;
    const dummy = new THREE.Object3D();

    const animate = () => {
        if (!meshRef.current || !globeEl.current) {
             animationFrameId = requestAnimationFrame(animate);
             return;
        }

        const now = Date.now();
        const elapsedMinutes = ((now - startTime) / 1000) * (timeScale / 60); 
        const sats = satellitesDataRef.current;
        const count = sats.length;
        const mesh = meshRef.current;
        const globeRadius = globeEl.current.getGlobeRadius(); // usually 100

        // Update positions
        for (let i = 0; i < count; i++) {
            const sat = sats[i];
            const u = sat.u0 + sat.meanMotion * elapsedMinutes;
            
            const sinLat = Math.sin(sat.inclination) * Math.sin(u);
            const latRad = Math.asin(sinLat);
            
            const y = Math.cos(sat.inclination) * Math.sin(u);
            const x = Math.cos(u);
            const lngRad = sat.raan + Math.atan2(y, x);
            
            const lat = (latRad * 180) / Math.PI;
            let lng = (lngRad * 180) / Math.PI;
            lng = ((lng + 540) % 360) - 180;
            
            // Convert to Cartesian
            // sat.alt is relative altitude (e.g. 0.1 for 10% above surface)
            // globeRadius is the radius of the sphere object in Three scene
            const alt = sat.alt * globeRadius; 
            
            // Use utility if available or manual calc
            // Manual calc for performance (avoid function call overhead in loop)
            const phi = (90 - lat) * (Math.PI / 180);
            const theta = (lng + 180) * (Math.PI / 180);
            const r = globeRadius + alt;
            
            dummy.position.x = -r * Math.sin(phi) * Math.cos(theta);
            dummy.position.y = r * Math.cos(phi);
            dummy.position.z = r * Math.sin(phi) * Math.sin(theta);
            
            dummy.lookAt(0,0,0); // Orient satellites to face center? Or align with velocity?
            // Just basic orientation for now
            dummy.updateMatrix();
            mesh.setMatrixAt(i, dummy.matrix);
        }
        
        mesh.instanceMatrix.needsUpdate = true;
        
        // Trigger render if needed (React Globe usually auto-renders on controls interaction)
        // But for animation we might need to rely on controls.autoRotate or force frames.
        // Usually modifying scene objects doesn't auto-trigger frame in standard ReactThreeFiber, 
        // but react-globe.gl wraps ThreeGlobe which might need a kick.
        // However, since we have autoRotate on, it should be rendering.
        
        animationFrameId = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animationFrameId);
  }, [selectedOrbitalParams]); // Re-run if params change

  // Fetch GeoJSON
  useEffect(() => {
    fetch('https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_110m_land.geojson')
      .then(res => res.json())
      .then(setLandPolygons)
      .catch(err => console.error("Failed to load land polygons", err));
  }, []);

  // One-time Scene Init
  useEffect(() => {
    if (globeEl.current) {
        const scene = globeEl.current.scene();
        
        // Cleanup existing lights to avoid stacking on HMR
        const existingAmbient = scene.getObjectByName('ambientLight');
        if (existingAmbient) scene.remove(existingAmbient);
        const existingDir = scene.getObjectByName('dirLight');
        if (existingDir) scene.remove(existingDir);

        // Safe access to globeMaterial
        const globeInstance = globeEl.current as any;
        if (typeof globeInstance.globeMaterial === 'function') {
            const globeMaterial = globeInstance.globeMaterial() as THREE.MeshPhongMaterial;
            if (globeMaterial) {
                globeMaterial.color = new THREE.Color('#0a0a0a'); // True black/very dark
                globeMaterial.emissive = new THREE.Color('#18181b');
                globeMaterial.emissiveIntensity = 0.1;
                globeMaterial.shininess = 0.5;
            }
        }

        const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
        ambientLight.name = 'ambientLight';
        scene.add(ambientLight);

        const dirLight = new THREE.DirectionalLight(0xffffff, 3.0);
        dirLight.position.set(200, 200, 100);
        dirLight.name = 'dirLight';
        scene.add(dirLight);
    }
  }, [isGlobeReady]); 

  // If `onGlobeReady` isn't fired by the component, poll for readiness
  // (globeEl.current.getGlobeRadius is available when the Three scene is ready).
  useEffect(() => {
    if (isGlobeReady) return; // already ready
    let raf = 0;
    let mounted = true;

    const checkReady = () => {
      try {
        if (globeEl.current && typeof globeEl.current.getGlobeRadius === 'function') {
          const r = globeEl.current.getGlobeRadius();
          if (r && mounted) {
            setGlobeReady(true);
            return;
          }
        }
      } catch (e) {
        // ignore until ready
      }
      raf = requestAnimationFrame(checkReady);
    };

    raf = requestAnimationFrame(checkReady);
    return () => { mounted = false; cancelAnimationFrame(raf); };
  }, [isGlobeReady]);

  // Update controls and camera
  useEffect(() => {
    if (globeEl.current && isGlobeReady) {
      const controls = globeEl.current.controls();
      controls.autoRotate = true;
      controls.autoRotateSpeed = 0.6;
      
      const alt = selectedOrbitalParams.altitudeKm;
      // Default LEO distance
      let dist = 2.5; 

      if (alt > 30000) {
        // GEO: Approx 5.6 Earth Radii Altitude.
        // Camera at 14.0 radii provides a balanced view of the high orbit.
        dist = 14.0; 
      }
      else if (alt > 8000) {
        // MEO: Approx 3 Earth Radii Altitude.
        // Camera at 10.0 radii ensures the constellation fits without clipping.
        dist = 10.0; 
      }
      
      globeEl.current.pointOfView({ altitude: dist }, 1000);
    }
  }, [selectedNetwork, selectedOrbitalParams, isGlobeReady]);

  // Resize observer
  useEffect(() => {
    if (!containerRef.current) return;
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setContainerDimensions({
          width: entry.contentRect.width,
          height: entry.contentRect.height
        });
      }
    });
    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, []);


  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:h-[450px]">
      {/* Left Sidebar - Stats */}
      <div className="space-y-6 lg:col-span-1 flex flex-col h-full">
        <div className="flex-1 flex flex-col gap-4 rounded-xl border border-zinc-800 bg-black/60 p-5 shadow-sm overflow-y-auto custom-scrollbar">
             <div className="flex items-center gap-3 border-b border-zinc-800 pb-4 shrink-0">
                 <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-900 text-white">
                    <GlobeIcon size={20} />
                 </div>
                 <div>
                     <h2 className="text-xl font-bold text-white" style={{ color: currentColor }}>{selectedOrbitalParams.network}</h2>
                     <div className="flex flex-col">
                        <p className="text-xs text-slate-400">
                            {isCapped 
                              ? `${totalRealCount.toLocaleString()} Active Satellites (${simCount.toLocaleString()} Simulated)`
                              : `${totalRealCount.toLocaleString()} Active Satellites`
                            }
                        </p>
                     </div>
                 </div>
             </div>
             
             <div className="grid grid-cols-2 gap-4 shrink-0">
                 <div className="p-3 rounded-lg bg-zinc-900/50 border border-zinc-800">
                     <div className="text-xs text-slate-500 mb-1 flex items-center gap-1"><Navigation size={10}/> Altitude</div>
                     <div className="text-lg font-semibold text-slate-200">{selectedOrbitalParams.altitudeKm.toLocaleString()} km</div>
                 </div>
                 <div className="p-3 rounded-lg bg-zinc-900/50 border border-zinc-800">
                     <div className="text-xs text-slate-500 mb-1 flex items-center gap-1"><Layers size={10}/> Inclination</div>
                     <div className="text-lg font-semibold text-slate-200">{selectedOrbitalParams.inclinationDeg}°</div>
                 </div>
                 <div className="p-3 rounded-lg bg-zinc-900/50 border border-zinc-800">
                     <div className="text-xs text-slate-500 mb-1 flex items-center gap-1"><Zap size={10}/> Period</div>
                     <div className="text-lg font-semibold text-slate-200">
                        {selectedOrbitalParams.periodMin > 200 
                            ? `${(selectedOrbitalParams.periodMin/60).toFixed(1)} hrs` 
                            : `${Math.round(selectedOrbitalParams.periodMin)} min`}
                     </div>
                 </div>
                 <div className="p-3 rounded-lg bg-zinc-900/50 border border-zinc-800">
                     <div className="text-xs text-slate-500 mb-1 flex items-center gap-1"><Orbit size={10}/> Orbit</div>
                     <div className="text-lg font-semibold text-slate-200">
                         {orbitType}
                     </div>
                 </div>
             </div>

             <div className="p-3 rounded-lg bg-zinc-900/50 border border-zinc-800 h-24 shrink-0 overflow-y-auto custom-scrollbar">
                 <div className="flex items-center gap-1 mb-1">
                    <h4 className="text-sm font-semibold text-slate-300 flex items-center gap-1">
                        <Info size={14}/> Coverage Strategy{strategyType ? ':' : ''}
                    </h4>
                    {strategyType && (
                        <span className="text-sm font-semibold text-slate-200">
                            {strategyType}
                        </span>
                    )}
                 </div>
                 <p className="text-sm text-slate-300 leading-relaxed">
                     {strategyDesc}
                 </p>
             </div>

             <div className="p-3 rounded-lg bg-zinc-900/50 border border-zinc-800 h-32 flex flex-col shrink-0 overflow-y-auto custom-scrollbar">
                 <h4 className="text-sm font-semibold text-slate-300 mb-1 flex items-center gap-1 shrink-0">
                     <Lightbulb size={14}/> Did you know?
                 </h4>
                 <div className="pr-1">
                     <p className="text-sm text-slate-300 leading-relaxed italic">
                         {INTERESTING_FACTS[selectedNetwork] || "Provides critical global communications infrastructure."}
                     </p>
                 </div>
             </div>
        </div>
      </div>

      {/* Right - Globe */}
      <div className="h-[300px] lg:h-full lg:col-span-2 rounded-xl border border-zinc-800 bg-black/60 overflow-hidden relative shadow-2xl" ref={containerRef}>
        <div className="absolute top-4 left-4 z-10 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-zinc-700/50 pointer-events-none">
            <h3 className="text-xs font-semibold text-slate-300 flex items-center gap-2">
                <GlobeIcon size={14} />
                {selectedOrbitalParams.network} Constellation
            </h3>
        </div>
        
        {containerDimensions.width > 0 && (
          // @ts-ignore - dynamic client component
          <DynamicGlobe
              ref={globeEl}
              onGlobeReady={() => setGlobeReady(true)}
              width={containerDimensions.width}
              height={containerDimensions.height}
              backgroundColor="rgba(0,0,0,0)"
              globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
              bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
              polygonsData={landPolygons.features}
              polygonCapColor={() => 'rgba(0,0,0,0)'}
              polygonSideColor={() => 'rgba(0,0,0,0)'}
              polygonStrokeColor={() => '#3f3f46'}
              polygonAltitude={0.01}
              atmosphereColor="#27272a"
              atmosphereAltitude={0.25}
            />
          )}
      </div>
    </div>
  );
};