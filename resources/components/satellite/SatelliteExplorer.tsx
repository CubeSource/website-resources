"use client";

import React, { useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { RAW_CSV_DATA } from './constants';
import { parseCSV } from './utils';
import { SatelliteTable } from './SatelliteTable';

// Dynamic import is CRITICAL for Next.js integration.
// It prevents 'window is not defined' errors during the build process
// because react-globe.gl relies on browser APIs.
const GlobeView = dynamic(() => import('./GlobeView').then((m) => m.GlobeView), { 
  ssr: false,
  loading: () => (
    <div className="h-full w-full flex items-center justify-center bg-slate-900/30 rounded-xl border border-slate-800 text-slate-500 animate-pulse">
      Initializing 3D Environment...
    </div>
  )
});

export const SatelliteExplorer: React.FC = () => {
  const [selectedNetwork, setSelectedNetwork] = useState<string>('Iridium');
  const data = useMemo(() => parseCSV(RAW_CSV_DATA), []);
  
  return (
    <div className="w-full space-y-8 text-slate-200">
      {/* Top Section: Visualization */}
      <section className="relative w-full">
         <GlobeView selectedNetwork={selectedNetwork} />
      </section>

        {/* Bottom Section: Data Table */}
        <section className="w-full mt-28">
         <SatelliteTable 
          data={data} 
          selectedNetwork={selectedNetwork}
          onSelectNetwork={setSelectedNetwork}
         />
      </section>
    </div>
  );
};