'use client';

import Link from "next/link";
import { useState, useMemo } from "react";
import { vt323 } from "../../../lib/fonts";
import StarryBackground from "../../../components/StarryBackground";
import NavBar from "../../../components/Nav";

export default function FastenerTorquePage() {
  const [sy, setSy] = useState<string>('');
  const [at, setAt] = useState<string>('');
  const [k, setK] = useState<string>('');
  const [d, setD] = useState<string>('');

  const calculations = useMemo(() => {
    const syNum = parseFloat(sy) || 0;
    const atNum = parseFloat(at) || 0;
    const kNum = parseFloat(k) || 0;
    const dNum = parseFloat(d) || 0;

    // F = 0.65 * Sy * At
    const f = 0.65 * syNum * atNum;
    
    // T = K * F * d
    const t = kNum * f * dNum;

    return {
      preload: isNaN(f) || f <= 0 ? null : f,
      torque: isNaN(t) || t <= 0 ? null : t,
    };
  }, [sy, at, k, d]);

  return (
    <div className="relative min-h-dvh bg-black text-zinc-200">
      <NavBar />
      <StarryBackground />
      <main className="relative z-10 flex min-h-dvh items-start justify-center py-24 px-6 sm:py-24 md:px-10 md:py-40">
        <div className="w-full max-w-3xl space-y-8">
          <div className="space-y-4">
            <h1 className={`${vt323.className} text-4xl text-zinc-100 sm:text-5xl md:text-6xl`}>
              Fastener Torque Calculator
            </h1>
            <p className="text-base text-zinc-400 md:text-lg">
              Calculate proper torque values for aerospace fasteners based on material and thread specifications.
            </p>
          </div>

          <div className="space-y-6 border border-white/10 bg-white/5 p-6 md:p-8">
            <h2 className={`${vt323.className} text-2xl text-zinc-300 md:text-3xl`}>
              Calculator
            </h2>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="sy" className="block text-sm font-medium text-zinc-300 mb-2">
                  Bolt Yield Stress (Sy)
                </label>
                <input
                  id="sy"
                  type="number"
                  value={sy}
                  onChange={(e) => setSy(e.target.value)}
                  className="w-full px-4 py-2 bg-black/50 border border-white/20 rounded text-zinc-200 focus:outline-none focus:border-zinc-400"
                  placeholder="Enter bolt yield stress"
                />
              </div>

              <div>
                <label htmlFor="at" className="block text-sm font-medium text-zinc-300 mb-2">
                  Tensile Stress Area (At)
                </label>
                <input
                  id="at"
                  type="number"
                  value={at}
                  onChange={(e) => setAt(e.target.value)}
                  className="w-full px-4 py-2 bg-black/50 border border-white/20 rounded text-zinc-200 focus:outline-none focus:border-zinc-400"
                  placeholder="Enter tensile stress area"
                />
              </div>

              <div>
                <label htmlFor="k" className="block text-sm font-medium text-zinc-300 mb-2">
                  Nut/Friction Factor (K)
                </label>
                <input
                  id="k"
                  type="number"
                  value={k}
                  onChange={(e) => setK(e.target.value)}
                  className="w-full px-4 py-2 bg-black/50 border border-white/20 rounded text-zinc-200 focus:outline-none focus:border-zinc-400"
                  placeholder="Enter nut/friction factor"
                />
              </div>

              <div>
                <label htmlFor="d" className="block text-sm font-medium text-zinc-300 mb-2">
                  Nominal Bolt Diameter (d) in meters
                </label>
                <input
                  id="d"
                  type="number"
                  value={d}
                  onChange={(e) => setD(e.target.value)}
                  className="w-full px-4 py-2 bg-black/50 border border-white/20 rounded text-zinc-200 focus:outline-none focus:border-zinc-400"
                  placeholder="Enter nominal bolt diameter"
                />
              </div>
            </div>

            {(calculations.preload !== null || calculations.torque !== null) && (
              <div className="mt-6 pt-6 border-t border-white/10 space-y-3">
                <h3 className={`${vt323.className} text-xl text-zinc-300`}>
                  Results
                </h3>
                {calculations.preload !== null && (
                  <div>
                    <span className="text-sm text-zinc-400">Preload (F): </span>
                    <span className="text-zinc-200 font-medium">
                      {calculations.preload.toFixed(2)} N
                    </span>
                  </div>
                )}
                {calculations.torque !== null && (
                  <div>
                    <span className="text-sm text-zinc-400">Torque (T): </span>
                    <span className="text-zinc-200 font-medium">
                      {calculations.torque.toFixed(2)} N·m
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="pt-6">
            <Link 
              href="/calculators" 
              className={`${vt323.className} text-lg text-zinc-400 underline decoration-zinc-500 hover:text-zinc-200 hover:decoration-zinc-300 transition-colors`}
            >
              ← Back to calculators
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

