'use client';

import Link from "next/link";
import { vt323 } from "../../../../lib/fonts";
import Content from "../../../../components/content/Content";
import Title from "../../../../components/content/Title";
import Header from "../../../../components/content/Header";
import Text from "../../../../components/content/Text";
import Section from "../../../../components/content/Section";

export default function JigsFixturesPage() {
  return (
    <Content>
      <div className="space-y-3">
        <Title number="05" category="Assembly">
          Jigs & Fixtures
        </Title>
        <Header>
          Precision alignment is rarely achievable by hand.
        </Header>
      </div>

      <section className="space-y-4">
        <Section>Custom Tooling</Section>
        <Text>
          Jigs and fixtures are custom-manufactured tools designed to hold components in a fixed, accurate position during assembly, ensuring repeatability for tasks like solar cell bonding or structural integration.
        </Text>
      </section>

      <section className="space-y-4">
        <Section>Validation</Section>
        <Text>
          These aids are designed and validated to support consistent manufacturing tolerances.
        </Text>
      </section>


    </Content>
  );
}
