export type CategoryItem = {
  title: string;
  description: string;
  route: string;
};

export type Category = {
  name: string;
  items: CategoryItem[];
  image?: string;
  imageSize?: number;
};

export const categories: Category[] = [
  {
    name: "Getting Started",
    image: "/images/graphic-1u.png",
    items: [
      {
        title: "What's a CubeSat?",
        description:
          "Break down CubeSat bus architecture, standard form factors, and how power, thermal, and communications budgets map to missions.",
        route: "/docs/foundations",
      },
    ],
  },
  {
    name: "Structure",
    image: "/images/graphic-structure1.png",
    items: [
      {
        title: "Frames",
        description:
          "Explore structural frame selections, materials, and load paths for CubeSat primary structures.",
        route: "/docs/structure/frames",
      },
      {
        title: "Fasteners",
        description:
          "Select fastener materials, thread specs, and retention strategies for flight hardware.",
        route: "/docs/structure/fasteners",
      },
      {
        title: "Manufacturing & Coatings",
        description:
          "Review fabrication considerations, tolerances, and surface treatments for aerospace structures.",
        route: "/docs/structure/manufacturing-coatings",
      },
    ],
  },
  {
    name: "Hold-Down Release Mechanisms",
    image: "/images/graphic-burnwire.png",
    items: [
      {
        title: "Thermal Knives / Burnwires",
        description:
          "Design and qualify nichrome burnwire systems, from power sizing to redundancy planning.",
        route: "/docs/hdrm/burnwires",
      },
      {
        title: "Shape Memory Alloy",
        description:
          "Leverage SMA actuators for deployment systems, focusing on control, heating, and reset strategies.",
        route: "/docs/hdrm/shape-memory-alloy",
      },
    ],
  },
  {
    name: "Electrical Power Systems (EPS)",
    image: "/images/graphic-eps.png",
    imageSize: 120,
    items: [
      {
        title: "Batteries",
        description:
          "Reliable energy storage is critical for survival during eclipse phases. Learn about cell selection, safe pack architecture, and Battery Management Systems.",
        route: "/docs/eps/batteries",
      },
      {
        title: "Solar Panels",
        description:
          "Solar panels are the primary power source for most missions. Explore array modeling, deployment mechanisms, and MPPT optimization.",
        route: "/docs/eps/solar-panels",
      },
      {
        title: "Separation Switches",
        description:
          "Separation switches ensure the system remains dormant until deployment. Learn how to integrate these inhibits for safety and reliable startup.",
        route: "/docs/eps/separation-switches",
      },
    ],
  },
  {
    name: "Assembly",
    items: [
      {
        title: "Fastener Torque Calculations",
        description:
          "Calculate torque specs and preload requirements to ensure structural integrity.",
        route: "/calculators/fastener-torque",
      },
      {
        title: "Epoxies / Adhesives",
        description:
          "Specialized bonding agents are needed to reinforce fasteners and mount sensors. This guide details selection and cure cycles for low-outgassing materials.",
        route: "/docs/assembly/epoxies-adhesives",
      },
      {
        title: "Tools & Organization",
        description:
          "A disorganized build environment introduces risk. Learn about cleanroom-compatible equipment, ESD safety, and inventory tracking.",
        route: "/docs/assembly/tools-organization",
      },
      {
        title: "Jigs & Fixtures",
        description:
          "Precision alignment requires custom tooling. Discover how to design and validate jigs for consistent manufacturing tolerances.",
        route: "/docs/assembly/jigs-fixtures",
      },
    ],
  },
  {
    name: "Environmental Testing",
    items: [
      {
        title: "Vibration Testing",
        description:
          "Hardware must survive the intense energy of launch. Plan sine, random, and shock tests to verify structural integrity.",
        route: "/docs/environmental-testing/vibration-testing",
      },
      {
        title: "Thermal Testing",
        description:
          "Validate that your system can withstand extreme orbital temperatures. Learn how to execute thermal balance and TVAC campaigns.",
        route: "/docs/environmental-testing/thermal-testing",
      },
    ],
  },
];
