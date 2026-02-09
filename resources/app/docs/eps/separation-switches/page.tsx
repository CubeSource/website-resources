'use client';

import Link from "next/link";
import { vt323 } from "../../../../lib/fonts";
import Content from "../../../../components/content/Content";
import Title from "../../../../components/content/Title";
import Header from "../../../../components/content/Header";
import Text from "../../../../components/content/Text";
import Section from "../../../../components/content/Section";

export default function SeparationSwitchesPage() {
  return (
    <Content>
      <div className="space-y-3">
        <Title number="04" category="Electrical Power Systems (EPS)">
          Separation Switches
        </Title>
        <Header>
          Ensuring the system remains dormant until deployment is a strict launch requirement.
        </Header>
      </div>

      <section className="space-y-4">
        <Section>Inhibit Mechanisms</Section>
        <Text>
          Separation switches (or kill switches) are electromechanical devices that physically interrupt the power circuit while the hardware is stowed, automatically closing the circuit to activate the bus only after ejection.
        </Text>
      </section>

      <section className="space-y-4">
        <Section>Integration & Safety</Section>
        <Text>
          Learn how to integrate these inhibits for launch safety and reliable system startup.
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
