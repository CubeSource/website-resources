'use client';

import Link from "next/link";
import { vt323 } from "../../../../lib/fonts";
import Content from "../../../../components/content/Content";
import Title from "../../../../components/content/Title";
import Header from "../../../../components/content/Header";

export default function VibrationTestingPage() {
  return (
    <Content>
      <div className="space-y-3">
        <Title number="06" category="Environmental Testing">
          Vibration Testing
        </Title>
        <Header>
          Before reaching orbit, hardware must survive the intense acoustic and mechanical energy of launch. Vibration testing is a qualification process where the integrated system is shaken at specific frequencies and amplitudes to verify that structural integrity and electronics will withstand ascent loads. This section helps you plan sine, random, and shock tests, including fixture design and acceptance criteria.
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
