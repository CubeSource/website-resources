'use client';

import { ReactNode } from "react";
import StarryBackground from "../StarryBackground";
import NavBar from "../Nav";

interface ContentProps {
  children: ReactNode;
}

export default function Content({ children }: ContentProps) {
  return (
    <div className="relative min-h-dvh bg-black text-zinc-200">
      <NavBar />
      <StarryBackground />
      <main className="relative z-10 flex min-h-dvh items-start justify-center py-24 px-6 sm:py-24 md:px-10 md:py-40">
        <div className="w-full max-w-3xl space-y-8">
          {children}
        </div>
      </main>
    </div>
  );
}

