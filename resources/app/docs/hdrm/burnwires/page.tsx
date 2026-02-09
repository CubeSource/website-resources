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
          A Burnwing v2 model. Note: The nichrome wire heats up to cut the retention line, releasing the deployable.
        </Model>
      </div>

      <section className="space-y-4">
        <Section>Burnwires</Section>
        <Text>
          A burnwire (thermal knife) secures deployable satellite components like antennas or solar panels during launch, releasing them once in space by applying heat to cut or melt the restraining material.
        </Text>
      </section>

      <section className="space-y-4">
        <Section>Hold Down Line Materials</Section>
        <Text>
          Selecting the right hold down line is critical. Common materials include Dyneema and Vectran, selected based on temperature and shock requirements.
        </Text>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left text-zinc-300 border border-white/10">
            <thead className={`${vt323.className} text-lg bg-white/5 uppercase`}>
              <tr>
                <th className="px-4 py-2 border-b border-white/10">Line</th>
                <th className="px-4 py-2 border-b border-white/10">Applications</th>
                <th className="px-4 py-2 border-b border-white/10">Melting Temp (°C)</th>
                <th className="px-4 py-2 border-b border-white/10">Creep</th>
                <th className="px-4 py-2 border-b border-white/10">UV Resistance</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-white/5">
                <td className="px-4 py-2 font-bold text-white">Dyneema</td>
                <td className="px-4 py-2">Low temp/shock</td>
                <td className="px-4 py-2">~150</td>
                <td className="px-4 py-2">Moderate</td>
                <td className="px-4 py-2">Moderate</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-bold text-white">Vectran</td>
                <td className="px-4 py-2">High temp/shock</td>
                <td className="px-4 py-2">~330</td>
                <td className="px-4 py-2">Low</td>
                <td className="px-4 py-2">Low</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-4">
        <Section>Nichrome Element</Section>
        <Text>
          The heating element is typically Nichrome 80/20 (80% Nickel, 20% Chromium) due to its high melting point ({">"}1000°C) and resistance.
        </Text>
        <div className="p-4 bg-white/5 border border-white/10 rounded-sm">
          <h3 className={`${vt323.className} text-xl text-white mb-2`}>Resistance Formula</h3>
          <p className="font-mono text-zinc-400 mb-2">R = ρ (L / A)</p>
          <ul className="list-disc list-inside text-sm text-zinc-400 space-y-1">
            <li><strong className="text-zinc-200">R</strong>: Resistance (Ω)</li>
            <li><strong className="text-zinc-200">ρ</strong>: Resistivity (Ω·m) [~1.09e-6 for NiCr]</li>
            <li><strong className="text-zinc-200">L</strong>: Length of wire (m)</li>
            <li><strong className="text-zinc-200">A</strong>: Cross-sectional area (m²)</li>
          </ul>
        </div>
        <Text>
          Common wire gauges for CubeSats include 30 AWG (0.25mm dia) and 32 AWG (0.20mm dia), offering a balance between durability and power consumption.
        </Text>
      </section>

      <section className="space-y-4">
        <Section>Line Securement</Section>
        <Text>
          Securing the line requires careful attention to vibration resistance, abrasion, and tensioning. Tying repeatability is essential for consistent release times.
        </Text>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-white/5 border border-white/10">
            <h4 className={`${vt323.className} text-lg text-white mb-2`}>Considerations</h4>
            <ul className="list-disc list-inside text-sm text-zinc-400 space-y-1">
              <li>Vibration & Abrasion Resistance</li>
              <li>Consistent Tensioning</li>
              <li>Contact with burn elements</li>
              <li>Preventing Space Debris (capturing the cut line)</li>
            </ul>
          </div>
          <div className="p-4 bg-white/5 border border-white/10">
            <h4 className={`${vt323.className} text-lg text-white mb-2`}>Recommended Knots</h4>
            <ul className="list-disc list-inside text-sm text-zinc-400 space-y-1">
              <li><strong className="text-white">Midshipman's Hitch</strong>: Adjustable loop for tensioning.</li>
              <li><strong className="text-white">Uni Knot</strong>: Strong, reliable terminal knot.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <Section>Environmental Considerations</Section>
        <Text>
          <strong>Vacuum/Outgassing:</strong> In vacuum, heat transfer is purely radiative and conductive. Wire temperature rises linearly with power until equilibrium.
          <br />
          <strong>UV Degradation:</strong> Materials like Vectran degrade under UV exposure and must be shielded.
          <br />
          <strong>Atomic Oxygen:</strong> In LEO, atomic oxygen can erode polymers; compatible coatings or materials must be used.
        </Text>
      </section>

      <ProductLink
        storeUrl="https://www.cubesource.space/product-page/burnwire-release-mechanism"
        productText="Burnwires are"
        imageSrc="Burnwing.png"
        imageAlt="Burnwire mechanism"
        imageClassName="w-1/2"
      />


    </Content>
  );
}


