'use client';

import Link from "next/link";
import { vt323 } from "../../../../lib/fonts";
import Content from "../../../../components/content/Content";
import Title from "../../../../components/content/Title";
import Text from "../../../../components/content/Text";
import Section from "../../../../components/content/Section";

export default function ShapeMemoryAlloyPage() {
  return (
    <Content>
      <div className="space-y-3">
        <Title number="03" category="Hold-Down Release Mechanisms">
          Shape Memory Alloy
        </Title>
      </div>
      
      <section className="space-y-4">
        <Section>Shape Memory Alloy</Section>
        <Text>
          Leverage SMA actuators for deployment systems, focusing on control, heating, and reset strategies. Shape memory alloys are smart materials that can return to their original shape after being deformed, typically triggered by heat.
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
