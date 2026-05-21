'use client';

import Link from "next/link";
import { vt323 } from "../../../../lib/fonts";
import Content from "../../../../components/content/Content";
import Title from "../../../../components/content/Title";
import Header from "../../../../components/content/Header";
import Text from "../../../../components/content/Text";
import Section from "../../../../components/content/Section";

export default function SolarPanelsPage() {
  return (
    <Content>
      <div className="space-y-3">
        <Title number="04" category="Electrical Power Systems (EPS)">
          Solar Panels
        </Title>
        <Header>
          As the primary power source for most missions, the solar array dictates the total energy budget.
        </Header>
      </div>

      <section className="space-y-4">
        <Section>Photovoltaic Assemblies</Section>
        <Text>
          Solar panels are photovoltaic assemblies, either body-mounted or deployable, that convert solar radiation into electrical current to charge the battery bank and power the bus.
        </Text>
      </section>

      <section className="space-y-4">
        <Section>Design & Optimization</Section>
        <Text>
          We explore array modeling, deployment mechanisms, and optimizing Maximum Power Point Tracking (MPPT).
        </Text>
      </section>


    </Content>
  );
}
