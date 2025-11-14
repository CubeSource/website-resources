'use client';

import Link from "next/link";
import { vt323 } from "../../../../lib/fonts";
import Content from "../../../../components/content/Content";
import Title from "../../../../components/content/Title";
import Header from "../../../../components/content/Header";
import Text from "../../../../components/content/Text";
import Section from "../../../../components/content/Section";

export default function ManufacturingCoatingsPage() {
  return (
    <Content>
      <div className="space-y-3">
        <Title number="04" category="Structure">
          Manufacturing & Coatings
        </Title>
        <Header>
          Review fabrication considerations, tolerances, and surface treatments for aerospace structures.
        </Header>
      </div>
      
      <section className="space-y-4">
        <Section>Fabrication Considerations</Section>
        <Text>
          CubeSat structures require precise manufacturing to meet dimensional tolerances and surface finish requirements. Common fabrication methods include 
          CNC machining, waterjet cutting, and additive manufacturing. Each method has trade-offs in cost, lead time, and achievable tolerances.
        </Text>
      </section>

      <section className="space-y-4">
        <Section>Tolerances</Section>
        <Text>
          Dimensional tolerances for CubeSat structures are typically specified to ±0.1mm or tighter for critical interfaces. Tighter tolerances ensure proper 
          fit with deployment mechanisms and maintain structural integrity under load. Tolerance stack-up analysis is essential when multiple components interface.
        </Text>
      </section>

      <section className="space-y-4">
        <Section>Surface Treatments</Section>
        <Text>
          Surface treatments for aerospace structures include anodizing, passivation, and specialized coatings. These treatments provide corrosion resistance, 
          thermal control properties, and electrical isolation. Surface finish requirements must balance functional needs with manufacturing feasibility and cost.
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

