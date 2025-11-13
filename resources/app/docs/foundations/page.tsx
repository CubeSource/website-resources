'use client';

import Link from "next/link";

export default function FoundationsPage() {
  return (
    <main className="min-h-dvh bg-black px-6 py-12 text-zinc-100 md:px-10">
      <div className="mx-auto max-w-3xl space-y-6">
        <h1 className="text-4xl font-bold text-white sm:text-5xl">
          What&apos;s a CubeSat?
        </h1>
        <p className="text-base text-zinc-300 sm:text-lg">
          This page is under construction. Check back soon for detailed
          guidance on CubeSat architecture, mission budgeting, and subsystem
          planning.
        </p>
        <p className="text-sm text-zinc-500">
          In the meantime, return to the{" "}
          <Link href="/" className="underline decoration-zinc-500 hover:text-white">
            front page
          </Link>{" "}
          to explore other resources.
        </p>
      </div>
    </main>
  );
}


