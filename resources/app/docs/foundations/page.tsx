'use client';

import Link from "next/link";
import StarryBackground from "../../../components/StarryBackground";
import { vt323 } from "../../../lib/fonts";

export default function FoundationsPage() {
  return (
    <div className="relative min-h-dvh bg-black text-zinc-200">
      <StarryBackground />
      <main className="relative z-10 flex min-h-dvh items-start justify-center py-20 px-6 sm:py-24 md:px-10 md:py-40">
        <div className="w-full max-w-3xl space-y-8">
          <div className="space-y-3">
            <p className={`${vt323.className} text-xl text-zinc-400 sm:text-2xl`}>
              Getting Started <span className="text-zinc-500">\\</span> What&apos;s a CubeSat?
            </p>
            <h1 className={`${vt323.className} text-xl text-white sm:text-5xl`}>
              A CubeSat is a type of miniaturized satellite consisting of multiples of 10×10×10 cm cubic units.
            </h1>
          </div>
          
          <section className="space-y-4">
            <h2 className={`${vt323.className} text-xl text-zinc-400 sm:text-2xl`}>
              Standard Form Factors
            </h2>
            <p className="text-base text-zinc-300 sm:text-lg leading-relaxed">
              CubeSats are defined in units (U). The most common sizes are 1U, 2U, 3U, and 6U. Each unit is a 10×10×11.35 cm cube. 
              This standardization allows for easier deployment mechanisms and flexible launch opportunities.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className={`${vt323.className} text-xl text-zinc-400 sm:text-2xl`}>
              Key Subsystems
            </h2>
            <p className="text-base text-zinc-300 sm:text-lg leading-relaxed">
              Every CubeSat requires several critical subsystems: power management, communications, attitude determination and control, 
              thermal management, and command and data handling. Understanding how these systems interact and their design constraints 
              is essential for mission success.
            </p>
          </section>

          <div className="pt-6">
            <Link 
              href="/" 
              className={`${vt323.className} text-lg text-zinc-400 underline decoration-zinc-500 hover:text-zinc-200 hover:decoration-zinc-300 transition-colors`}
            >
              ← Back to home
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}


