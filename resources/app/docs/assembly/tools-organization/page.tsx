'use client';

import Link from "next/link";
import { vt323 } from "../../../../lib/fonts";
import Content from "../../../../components/content/Content";
import Title from "../../../../components/content/Title";
import Header from "../../../../components/content/Header";
import Text from "../../../../components/content/Text";
import Section from "../../../../components/content/Section";

export default function ToolsOrganizationPage() {
  return (
    <Content>
      <div className="space-y-3">
        <Title number="05" category="Assembly">
          Tools & Organization
        </Title>
        <Header>
          A disorganized build environment introduces risk to flight hardware.
        </Header>
      </div>

      <section className="space-y-4">
        <Section>Systematic Arrangement</Section>
        <Text>
          Tools and organization refer to the systematic arrangement of cleanroom-compatible equipment, ESD-safe workstations, and strict inventory tracking (kitting) required to assemble systems without introducing debris or static damage.
        </Text>
      </section>

      <section className="space-y-4">
        <Section>Professional Workflows</Section>
        <Text>
          We cover setting up professional workflows for efficient, safe integration.
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
