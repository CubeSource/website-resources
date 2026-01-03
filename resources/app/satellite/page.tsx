
import { SatelliteExplorer } from '@/components/satellite/SatelliteExplorer';

export const metadata = {
  title: 'Non Terrestrial Networks',
  description: 'Interactive 3D visualization and comparison of global satellite networks.',
};

export default function SatellitePage() {
  return (
    <div className="min-h-screen bg-slate-950 px-4 py-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-8 text-3xl font-bold text-white">Satellite Networks</h1>
        <SatelliteExplorer />
      </div>
    </div>
  );
}
