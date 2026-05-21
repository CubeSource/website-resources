'use client';

import Link from "next/link";
import { vt323 } from "../../../../lib/fonts";
import Content from "../../../../components/content/Content";
import Title from "../../../../components/content/Title";
import Header from "../../../../components/content/Header";
import Text from "../../../../components/content/Text";
import Section from "../../../../components/content/Section";

export default function EpoxiesAdhesivesPage() {
  return (
    <Content>
      <div className="space-y-3">
        <Title number="05" category="Assembly">
          Epoxies / Adhesives
        </Title>
        <Header>
          Standard mechanical fasteners often need chemical reinforcement to withstand launch loads.
        </Header>
      </div>

      <section className="space-y-4">
        <Section>Bonding Agents</Section>
        <Text>
          Epoxies and adhesives are specialized bonding agents used to lock fasteners (staking), mount sensors, and secure cabling.
        </Text>
      </section>

      <section className="space-y-4">
        <Section>Selection Criteria</Section>
        <Text>
          Crucially, these materials are selected for low-outgassing properties to prevent optics contamination in a vacuum. Proper selection, surface preparation, and cure cycles are critical for success.
        </Text>
      </section>


    </Content>
  );
}
