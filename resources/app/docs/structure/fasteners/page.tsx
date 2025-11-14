'use client';

import Link from "next/link";
import { vt323 } from "../../../../lib/fonts";
import Content from "../../../../components/content/Content";
import Title from "../../../../components/content/Title";
import Header from "../../../../components/content/Header";
import Text from "../../../../components/content/Text";
import Section from "../../../../components/content/Section";

export default function FastenersPage() {
  return (
    <Content>
      <div className="space-y-3">
        <Title number="03" category="Structure">
          Fasteners
        </Title>
        <Header>
          Select fastener materials, thread specs, and retention strategies for flight hardware.
        </Header>
      </div>
      
      <section className="space-y-4">
        <Section>Fastener Materials</Section>
        <Text>
          Aerospace fasteners are typically made from corrosion-resistant materials such as stainless steel (A286, 17-4PH) or titanium alloys. 
          Material selection depends on strength requirements, thermal compatibility, and mission environment considerations.
        </Text>
      </section>

      <section className="space-y-4">
        <Section>Thread Specifications</Section>
        <Text>
          Standard thread specifications for CubeSats include #4-40, #6-32, and M3 metric threads. Thread selection balances strength requirements, 
          available space, and compatibility with commercial off-the-shelf components. Proper thread engagement and torque specifications are critical for mission success.
        </Text>
      </section>

      <section className="space-y-4">
        <Section>Retention Strategies</Section>
        <Text>
          Fastener retention is essential to prevent loosening during launch vibrations and thermal cycling. Common methods include thread-locking compounds, 
          lock washers, safety wire, and self-locking fasteners. The retention method must be compatible with the operating environment and mission requirements.
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

