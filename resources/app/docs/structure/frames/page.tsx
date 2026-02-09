'use client';

import Link from "next/link";
import { vt323 } from "../../../../lib/fonts";
import Content from "../../../../components/content/Content";
import Title from "../../../../components/content/Title";
import Header from "../../../../components/content/Header";
import Text from "../../../../components/content/Text";
import Section from "../../../../components/content/Section";

export default function FramesPage() {
  return (
    <Content>
      <div className="space-y-3">
        <Title number="02" category="Structure">
          Frames
        </Title>
        <Header>
          Explore structural frame selections, materials, and load paths for CubeSat main structures.
        </Header>
      </div>

      <section className="space-y-4">
        <Section>Frame Materials</Section>
        <Text>
          CubeSat frames are typically constructed from aluminum alloys such as 6061-T6, 7075-T6, or 5052, which offer excellent strength-to-weight ratios and machinability.
          These materials provide the necessary structural integrity while keeping mass within mission constraints.
        </Text>
      </section>

      <section className="space-y-4">
        <Section>Load Path Considerations</Section>
        <Text>
          Understanding load paths is critical for frame design. Primary loads include launch vehicle acceleration, separation shock, and on-orbit thermal cycling.
          Frames must distribute these loads efficiently while providing mounting points for subsystems and maintaining dimensional stability.
        </Text>
      </section>


    </Content>
  );
}

