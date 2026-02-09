'use client';

import Link from "next/link";
import { vt323 } from "../../../../lib/fonts";
import Content from "../../../../components/content/Content";
import Title from "../../../../components/content/Title";
import Header from "../../../../components/content/Header";
import Text from "../../../../components/content/Text";
import Section from "../../../../components/content/Section";

export default function ThermalTestingPage() {
  return (
    <Content>
      <div className="space-y-3">
        <Title number="06" category="Environmental Testing">
          Thermal Testing
        </Title>
        <Header>
          Space is an environment of extreme temperature fluctuations.
        </Header>
      </div>

      <section className="space-y-4">
        <Section>Thermal Cycling</Section>
        <Text>
          Thermal testing involves cycling the hardware through hot and cold extremes—often within a vacuum chamber—to validate that the thermal control system maintains safe operating temperatures for all subsystems.
        </Text>
      </section>

      <section className="space-y-4">
        <Section>Verification Campaigns</Section>
        <Text>
          Learn how to execute thermal balance and thermal vacuum (TVAC) campaigns to verify performance in the harsh orbital environment.
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
