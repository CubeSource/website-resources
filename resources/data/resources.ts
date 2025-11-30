export type ResourceItem = {
  title: string;
  description: string;
  url: string;
};

export type ResourceCategory = {
  name: string;
  items: ResourceItem[];
};

export const resourceCategories: ResourceCategory[] = [
  {
    name: "NASA Standards",
    items: [
      {
        title: "NASA Technical Standards System (NTSS)",
        description:
          "Comprehensive collection of NASA technical standards covering all aspects of space system design, manufacturing, and testing.",
        url: "https://standards.nasa.gov",
      },
      {
        title: "CubeSat Design Specification (CDS)",
        description:
          "Official specification document defining CubeSat form factors, deployment mechanisms, and interface requirements for launch integration.",
        url: "https://www.cubesat.org/specification",
      },
    ],
  },
  {
    name: "SpaceX Standards",
    items: [
      {
        title: "Rideshare User's Guide",
        description:
          "Complete guide for integrating CubeSats and small satellites on SpaceX rideshare missions, including mechanical, electrical, and operational requirements.",
        url: "https://www.spacex.com/rideshare",
      },
      {
        title: "Payload Integration Requirements",
        description:
          "Technical specifications for structural interfaces, separation systems, and environmental conditions for SpaceX launch vehicles.",
        url: "https://www.spacex.com/media",
      },
    ],
  },
  {
    name: "Other Organizations",
    items: [
      {
        title: "ISO Standards for Space Systems",
        description:
          "International Organization for Standardization documents covering space systems, including quality management, risk management, and system engineering processes.",
        url: "https://www.iso.org/ics/49.140/x/",
      },
      {
        title: "ESA Standards",
        description:
          "European Space Agency technical standards and requirements for space systems, including CubeSat design and testing specifications.",
        url: "https://www.esa.int/ESA_Multimedia/Search?q=standards",
      },
    ],
  },
];

