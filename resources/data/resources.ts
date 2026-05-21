import { pdfUrl } from "../lib/github-raw";

export type ResourceItem = {
  title: string;
  description: string;
  url: string;
  pdfFilename?: string; // If set, this is a PDF that should be viewed on-site
};

export type ResourceCategory = {
  name: string;
  items: ResourceItem[];
};

export const resourceCategories: ResourceCategory[] = [
  {
    name: "SpaceX Standards",
    items: [
      {
        title: "Rideshare Payload User's Guide",
        description:
          "Complete guide for integrating CubeSats and small satellites on SpaceX rideshare missions, including mechanical, electrical, and operational requirements.",
        url: "/resources/view/spacex-rideshare-payload-users-guide",
        pdfFilename: "SpaceX_Rideshare_Payload_Users_Guide.pdf",
      },
    ],
  },
  {
    name: "Testing & Environmental",
    items: [
      {
        title: "Vibration Testing of Small Satellites - Part 1",
        description:
          "Comprehensive guide to vibration testing methodologies, test setup, and acceptance criteria for small satellite systems.",
        url: "/resources/view/instar-vibration-testing-part-1",
        pdfFilename: "Instar_Vibration_Testing_of_Small_Satellites_Part_1.pdf",
      },
      {
        title: "Vibration Testing of Small Satellites - Part 2",
        description:
          "Advanced vibration testing techniques, analysis methods, and case studies for small satellite qualification.",
        url: "/resources/view/instar-vibration-testing-part-2",
        pdfFilename: "Instar_Vibration_Testing_of_Small_Satellites_Part_2.pdf",
      },
      {
        title: "Atomic Oxygen Interactions",
        description:
          "Analysis of atomic oxygen effects on spacecraft materials and coatings in low Earth orbit environments.",
        url: "/resources/view/atomic-oxygen-interactions",
        pdfFilename: "Atomic oxygen interactions .pdf",
      },
      {
        title: "Radiation for Electronics",
        description:
          "Radiation effects topics for orbit and various terrestrial applications.",
        url: "/resources/view/radiation-for-electronics",
        pdfFilename: "Radiation_Handbook.pdf",
      },
    ],
  },
  {
    name: "Materials & Structures",
    items: [
      {
        title: "Comparison of High-Performance Fibers",
        description:
          "Technical comparison of high-performance fiber materials for aerospace applications, including mechanical properties and performance characteristics.",
        url: "/resources/view/comparison-high-performance-fibers",
        pdfFilename: "Comparison of High-Performance Fibers.pdf",
      },
    ],
  },
  {
    name: "Thermal Systems",
    items: [
      {
        title: "Basics of Thermal Resistance and Heat Dissipation",
        description:
          "Fundamental principles of thermal resistance, heat dissipation mechanisms, and thermal management for electronic systems in space applications.",
        url: "/resources/view/basics-thermal-resistance-heat-dissipation",
        pdfFilename: "basics_of_thermal_resistance_and_heat_dissipation_an-e.pdf",
      },
    ],
  },
  {
    name: "Standards & Specifications",
    items: [
      {
        title: "CubeSat Design Specification (CDS) Rev 14.1",
        description:
          "Official CubeSat Design Specification revision 14.1 from Cal Poly San Luis Obispo, defining form factors (1U-12U), deployment mechanisms, and interface requirements for CubeSat missions.",
        url: "/resources/view/cds-rev14",
        pdfFilename: "CDS+REV14_1+2022-02-09.pdf",
      },
      {
        title: "State-of-the-Art Small Spacecraft Technology (2024)",
        description:
          "NASA technical publication (TP-2024-10001462) from the Small Spacecraft Systems Virtual Institute covering current state-of-the-art technologies, standards, and best practices in small satellite development. Published February 2024.",
        url: "/resources/view/soa-2023",
        pdfFilename: "soa-2023.pdf",
      },
    ],
  },
];

