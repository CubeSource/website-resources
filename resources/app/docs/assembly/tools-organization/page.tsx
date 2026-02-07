'use client';

import Link from "next/link";
import { vt323 } from "../../../../lib/fonts";
import Content from "../../../../components/content/Content";
import Title from "../../../../components/content/Title";
import Header from "../../../../components/content/Header";

export default function ToolsOrganizationPage() {
  return (
    <Content>
      <div className="space-y-3">
        <Title number="05" category="Assembly">
          Tools & Organization
        </Title>
        <Header>
          A disorganized build environment introduces risk to flight hardware. Tools and organization refer to the systematic arrangement of cleanroom-compatible equipment, ESD-safe workstations, and strict inventory tracking (kitting) required to assemble systems without introducing debris or static damage. We cover setting up professional workflows for efficient, safe integration.
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
