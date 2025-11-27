'use client';

import Link from "next/link";
import { vt323 } from "../../../lib/fonts";
import StarryBackground from "../../../components/StarryBackground";
import NavBar from "../../../components/Nav";

export default function FastenerTorquePage() {
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
            <p className="text-sm text-zinc-400 md:text-base">
              Calculator functionality will be added here.
            </p>
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

