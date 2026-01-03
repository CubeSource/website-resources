
import { SatelliteExplorer } from '@/components/satellite/SatelliteExplorer';
import NavBar from '@/components/Nav';

export const metadata = {
  title: 'Non Terrestrial Networks',
  description: 'Interactive 3D visualization and comparison of global satellite networks.',
};

export default function SatellitePage() {
  return (
    <div className="min-h-screen bg-slate-950 px-4 py-8">
      <NavBar />
      <div className="max-w-7xl pt-20">
        <h1 className="mb-8 text-3xl font-bold text-white">Satellite Networks</h1>
        <SatelliteExplorer />
      </div>
    </div>
  );
}
