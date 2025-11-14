'use client';

import Link from "next/link";
import StarryBackground from "../../../components/StarryBackground";
import NavBar from "../../../components/Nav";
import { vt323 } from "../../../lib/fonts";
import Title from "../../../components/content/Title";
import Header from "../../../components/content/Header";
import Text from "../../../components/content/Text";
import Section from "../../../components/content/Section";

export default function FoundationsPage() {
  return (
    <div className="relative min-h-dvh bg-black text-zinc-200">
      <NavBar />
      <StarryBackground />
      <main className="relative z-10 flex min-h-dvh items-start justify-center py-20 px-6 sm:py-24 md:px-10 md:py-40">
        <div className="w-full max-w-3xl space-y-8">
          <div className="space-y-3">
            <Title number="01" category="Getting Started">
              What&apos;s a CubeSat?
            </Title>
            <Header>
              A CubeSat is a type of miniaturized satellite consisting of multiples of 10×10×10 cm cubic units.
            </Header>
          </div>
          
          <section className="space-y-4">
            <Section>Standard Form Factors</Section>
            <Text>
              CubeSats are defined in units (U). The most common sizes are 1U, 2U, 3U, and 6U. Each unit is a 10×10×11.35 cm cube. 
              This standardization allows for easier deployment mechanisms and flexible launch opportunities.
            </Text>
          </section>

          <section className="space-y-4">
            <Section>Key Subsystems</Section>
            <Text>
              Every CubeSat requires several critical subsystems: power management, communications, attitude determination and control, 
              thermal management, and command and data handling. Understanding how these systems interact and their design constraints 
              is essential for mission success.
            </Text>
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


