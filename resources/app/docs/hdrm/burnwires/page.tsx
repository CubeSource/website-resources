'use client';

import Link from "next/link";
import { vt323 } from "../../../../lib/fonts";
import Content from "../../../../components/content/Content";
import Title from "../../../../components/content/Title";
import Text from "../../../../components/content/Text";
import Section from "../../../../components/content/Section";
import Model from "../../../../components/content/Model";
import ProductLink from "../../../../components/content/ProductLink";

export default function BurnwiresPage() {
  return (
    <Content>
      <div className="space-y-3">
        <Title number="03" category="Hold-Down Release Mechanisms">
          Thermal Knives
        </Title>
        <Model src="Burnwing-EngV2.glb" alt="Burnwing V2 Eng model">
          A Burnwing v2 model.
        </Model>
      </div>
      
      <section className="space-y-4">
        <Section>Burnwires</Section>
        <Text>
          A burnwire (thermal knife) secures deployable satellite components like antennas or solar panels during launch, releasing them once in space by applying heat to cut or melt the restraining material.
        </Text>
      </section>

      <ProductLink storeUrl="https://store.cubesource.com/burnwire" />

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


