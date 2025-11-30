'use client';

import Link from "next/link";
import { vt323 } from "../../lib/fonts";
import Content from "../../components/content/Content";
import Title from "../../components/content/Title";
import Header from "../../components/content/Header";
import Text from "../../components/content/Text";
import Section from "../../components/content/Section";

export default function ResourcesPage() {
  return (
    <Content>
      <div className="space-y-3">
        <Title number="01" category="Resources">
          Standards & Documentation
        </Title>
        <Header>
          Official documents and standards from leading space organizations.
        </Header>
      </div>
      
      <section className="space-y-4">
        <Section>NASA Standards</Section>
        <Text>
          NASA provides comprehensive technical standards and specifications for space systems, 
          including CubeSat design requirements, testing procedures, and safety guidelines. These 
          documents are essential references for ensuring mission success and compliance with 
          launch provider requirements.
        </Text>
        <div className="space-y-3 pt-2">
          <div className="border border-white/10 p-4 hover:border-white/20 transition-colors">
            <h3 className={`${vt323.className} text-xl text-white mb-2`}>
              NASA Technical Standards System (NTSS)
            </h3>
            <p className="text-sm text-zinc-400 mb-3">
              Comprehensive collection of NASA technical standards covering all aspects of space 
              system design, manufacturing, and testing.
            </p>
            <a 
              href="https://standards.nasa.gov" 
              target="_blank" 
              rel="noopener noreferrer"
              className={`${vt323.className} inline-block text-base text-zinc-300 underline decoration-zinc-500 hover:text-zinc-200 hover:decoration-zinc-300 transition-colors`}
            >
              View Standards →
            </a>
          </div>
          <div className="border border-white/10 p-4 hover:border-white/20 transition-colors">
            <h3 className={`${vt323.className} text-xl text-white mb-2`}>
              CubeSat Design Specification (CDS)
            </h3>
            <p className="text-sm text-zinc-400 mb-3">
              Official specification document defining CubeSat form factors, deployment mechanisms, 
              and interface requirements for launch integration.
            </p>
            <a 
              href="https://www.cubesat.org/specification" 
              target="_blank" 
              rel="noopener noreferrer"
              className={`${vt323.className} inline-block text-base text-zinc-300 underline decoration-zinc-500 hover:text-zinc-200 hover:decoration-zinc-300 transition-colors`}
            >
              View Specification →
            </a>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <Section>SpaceX Standards</Section>
        <Text>
          SpaceX documentation provides detailed requirements for payload integration, including 
          structural interfaces, electrical specifications, and environmental testing standards 
          for rideshare missions.
        </Text>
        <div className="space-y-3 pt-2">
          <div className="border border-white/10 p-4 hover:border-white/20 transition-colors">
            <h3 className={`${vt323.className} text-xl text-white mb-2`}>
              Rideshare User&apos;s Guide
            </h3>
            <p className="text-sm text-zinc-400 mb-3">
              Complete guide for integrating CubeSats and small satellites on SpaceX rideshare 
              missions, including mechanical, electrical, and operational requirements.
            </p>
            <a 
              href="https://www.spacex.com/rideshare" 
              target="_blank" 
              rel="noopener noreferrer"
              className={`${vt323.className} inline-block text-base text-zinc-300 underline decoration-zinc-500 hover:text-zinc-200 hover:decoration-zinc-300 transition-colors`}
            >
              View Guide →
            </a>
          </div>
          <div className="border border-white/10 p-4 hover:border-white/20 transition-colors">
            <h3 className={`${vt323.className} text-xl text-white mb-2`}>
              Payload Integration Requirements
            </h3>
            <p className="text-sm text-zinc-400 mb-3">
              Technical specifications for structural interfaces, separation systems, and 
              environmental conditions for SpaceX launch vehicles.
            </p>
            <a 
              href="https://www.spacex.com/media" 
              target="_blank" 
              rel="noopener noreferrer"
              className={`${vt323.className} inline-block text-base text-zinc-300 underline decoration-zinc-500 hover:text-zinc-200 hover:decoration-zinc-300 transition-colors`}
            >
              View Requirements →
            </a>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <Section>Other Organizations</Section>
        <Text>
          Additional standards and documentation from international space agencies and 
          standardization bodies that provide valuable guidance for CubeSat development.
        </Text>
        <div className="space-y-3 pt-2">
          <div className="border border-white/10 p-4 hover:border-white/20 transition-colors">
            <h3 className={`${vt323.className} text-xl text-white mb-2`}>
              ISO Standards for Space Systems
            </h3>
            <p className="text-sm text-zinc-400 mb-3">
              International Organization for Standardization documents covering space systems, 
              including quality management, risk management, and system engineering processes.
            </p>
            <a 
              href="https://www.iso.org/ics/49.140/x/" 
              target="_blank" 
              rel="noopener noreferrer"
              className={`${vt323.className} inline-block text-base text-zinc-300 underline decoration-zinc-500 hover:text-zinc-200 hover:decoration-zinc-300 transition-colors`}
            >
              View Standards →
            </a>
          </div>
          <div className="border border-white/10 p-4 hover:border-white/20 transition-colors">
            <h3 className={`${vt323.className} text-xl text-white mb-2`}>
              ESA Standards
            </h3>
            <p className="text-sm text-zinc-400 mb-3">
              European Space Agency technical standards and requirements for space systems, 
              including CubeSat design and testing specifications.
            </p>
            <a 
              href="https://www.esa.int/ESA_Multimedia/Search?q=standards" 
              target="_blank" 
              rel="noopener noreferrer"
              className={`${vt323.className} inline-block text-base text-zinc-300 underline decoration-zinc-500 hover:text-zinc-200 hover:decoration-zinc-300 transition-colors`}
            >
              View Standards →
            </a>
          </div>
        </div>
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

