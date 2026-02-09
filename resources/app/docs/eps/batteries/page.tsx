'use client';

import Link from "next/link";
import { vt323 } from "../../../../lib/fonts";
import Content from "../../../../components/content/Content";
import Title from "../../../../components/content/Title";
import Header from "../../../../components/content/Header";
import Text from "../../../../components/content/Text";
import Section from "../../../../components/content/Section";

export default function BatteriesPage() {
  return (
    <Content>
      <div className="space-y-3">
        <Title number="04" category="Electrical Power Systems (EPS)">
          Batteries
        </Title>
        <Header>
          Reliable energy storage is non-negotiable for survival during eclipse phases and high-power operations.
        </Header>
      </div>
      
      <section className="space-y-4">
        <Section>Energy Reservoir</Section>
        <Text>
          Batteries serve as the spacecraft&apos;s primary energy reservoir—typically utilizing Lithium-Ion or Lithium-Polymer chemistries—to regulate bus voltage and sustain operations when solar generation is unavailable.
        </Text>
      </section>

      <section className="space-y-4">
        <Section>Key Topics</Section>
        <Text>
          This section covers cell selection, safe pack architecture, and Battery Management Systems (BMS).
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
