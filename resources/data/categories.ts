export type CategoryItem = {
  title: string;
  description: string;
  route: string;
};

export type Category = {
  name: string;
  items: CategoryItem[];
};

export const categories: Category[] = [
  {
    name: "Core Topics",
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
        title: "Manufacturing/Coatings",
        description:
          "Review fabrication considerations, tolerances, and surface treatments for aerospace structures.",
        route: "/docs/structure/manufacturing-coatings",
      },
    ],
  },
  {
    name: "Hold Down Release Mechanisms",
    items: [
      {
        title: "Thermal Knives (aka Burnwires)",
        description:
          "Design and qualify nichrome burnwire systems, from power sizing to redundancy planning.",
        route: "/docs/hdrm/thermal-knives",
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
    items: [
      {
        title: "Batteries",
        description:
          "Compare cell chemistries, pack architectures, and battery management for space missions.",
        route: "/docs/eps/batteries",
      },
      {
        title: "Solar Panels",
        description:
          "Model solar arrays, deployables, and power point tracking to feed spacecraft loads.",
        route: "/docs/eps/solar-panels",
      },
      {
        title: "Separation Switches",
        description:
          "Integrate separation switches for launch safety and automated system enabling.",
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
        route: "/docs/assembly/fastener-torque-calculations",
      },
      {
        title: "Epoxies/Adhesives",
        description:
          "Select and apply aerospace adhesives with appropriate surface prep and cure cycles.",
        route: "/docs/assembly/epoxies-adhesives",
      },
      {
        title: "Tools/Organization",
        description:
          "Set up cleanroom-friendly tools, kitting, and ESD-safe workflows for integration.",
        route: "/docs/assembly/tools-organization",
      },
      {
        title: "Jigs/Fixtures",
        description:
          "Design and validate jigs and fixtures that support repeatable, precise assembly work.",
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
          "Plan sine, random, and shock tests, including fixture design and acceptance criteria.",
        route: "/docs/environmental-testing/vibration-testing",
      },
      {
        title: "Thermal Testing",
        description:
          "Execute thermal balance and thermal vacuum campaigns to validate spacecraft performance.",
        route: "/docs/environmental-testing/thermal-testing",
      },
    ],
  },
];

