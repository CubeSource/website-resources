'use client';

import Link from "next/link";
import { vt323 } from "../../../lib/fonts";
import Content from "../../../components/content/Content";
import Title from "../../../components/content/Title";
import Header from "../../../components/content/Header";
import Text from "../../../components/content/Text";
import Section from "../../../components/content/Section";
import Image from "../../../components/content/Image";
import Model from "../../../components/content/Model";

export default function FoundationsPage() {
  return (
    <Content>
      <div className="space-y-3">
        <Title number="01" category="Getting Started">
          What&apos;s a CubeSat?
        </Title>
        <Header>
          A CubeSat is a type of miniaturized satellite consisting of multiples of 10×10×10 cm cubic units.
        </Header>
        <Image src="CubeSat.jpg" alt="CubeSat diagram">
          A 1U CubeSat being handled by a NASA technician.
        </Image>
        <Model src="BurnwingV2.glb" alt="Burnwing V2 model">
          Optional caption text here
        </Model>
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
    </Content>
  );
}


