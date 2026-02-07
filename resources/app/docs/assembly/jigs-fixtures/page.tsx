'use client';

import Link from "next/link";
import { vt323 } from "../../../../lib/fonts";
import Content from "../../../../components/content/Content";
import Title from "../../../../components/content/Title";
import Header from "../../../../components/content/Header";

export default function JigsFixturesPage() {
  return (
    <Content>
      <div className="space-y-3">
        <Title number="05" category="Assembly">
          Jigs & Fixtures
        </Title>
        <Header>
          Precision alignment is rarely achievable by hand. Jigs and fixtures are custom-manufactured tools designed to hold components in a fixed, accurate position during assembly, ensuring repeatability for tasks like solar cell bonding or structural integration. Discover how to design and validate these aids to support consistent manufacturing tolerances.
        </Header>
      </div>
      
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
