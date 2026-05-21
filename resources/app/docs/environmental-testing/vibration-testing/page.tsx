'use client';

import Link from "next/link";
import { vt323 } from "../../../../lib/fonts";
import Content from "../../../../components/content/Content";
import Title from "../../../../components/content/Title";
import Header from "../../../../components/content/Header";
import Text from "../../../../components/content/Text";
import Section from "../../../../components/content/Section";

export default function VibrationTestingPage() {
  return (
    <Content>
      <div className="space-y-3">
        <Title number="06" category="Environmental Testing">
          Vibration Testing
        </Title>
        <Header>
          Before reaching orbit, hardware must survive the intense acoustic and mechanical energy of launch.
        </Header>
      </div>

      <section className="space-y-4">
        <Section>Qualification Process</Section>
        <Text>
          Vibration testing is a qualification process where the integrated system is shaken at specific frequencies and amplitudes to verify that structural integrity and electronics will withstand ascent loads.
        </Text>
      </section>

      <section className="space-y-4">
        <Section>Test Planning</Section>
        <Text>
          Planning includes defining sine, random, and shock test profiles, designing fixtures, and establishing acceptance criteria.
        </Text>
      </section>


    </Content>
  );
}
