export type CalculatorItem = {
  title: string;
  description: string;
  route: string;
};

export type CalculatorCategory = {
  name: string;
  items: CalculatorItem[];
};

export const calculatorCategories: CalculatorCategory[] = [
  {
    name: "Power Systems",
    items: [
      {
        title: "Solar Panel Sizing",
        description:
          "Calculate solar panel requirements based on orbit, power consumption, and mission duration.",
        route: "/calculators/solar-panel-sizing",
      },
      {
        title: "Battery Capacity",
        description:
          "Determine battery capacity needed for eclipse periods and peak power demands.",
        route: "/calculators/battery-capacity",
      },
      {
        title: "Power Budget",
        description:
          "Create comprehensive power budgets accounting for all subsystems and duty cycles.",
        route: "/calculators/power-budget",
      },
    ],
  },
  {
    name: "Structure",
    items: [
      {
        title: "Fastener Torque",
        description:
          "Calculate proper torque values for aerospace fasteners based on material and thread specifications.",
        route: "/calculators/fastener-torque",
      },
      {
        title: "Frame Load Analysis",
        description:
          "Analyze structural loads and determine frame requirements for launch and on-orbit conditions.",
        route: "/calculators/frame-load-analysis",
      },
      {
        title: "Mass Properties",
        description:
          "Calculate center of mass, moment of inertia, and other mass properties for attitude control.",
        route: "/calculators/mass-properties",
      },
    ],
  },
  {
    name: "Thermal",
    items: [
      {
        title: "Thermal Balance",
        description:
          "Estimate steady-state temperatures for components and subsystems in orbit.",
        route: "/calculators/thermal-balance",
      },
      {
        title: "Heater Sizing",
        description:
          "Determine heater power requirements to maintain minimum operating temperatures.",
        route: "/calculators/heater-sizing",
      },
    ],
  },
  {
    name: "Orbital Mechanics",
    items: [
      {
        title: "Orbit Period",
        description:
          "Calculate orbital period, velocity, and other orbital parameters for different altitudes.",
        route: "/calculators/orbit-period",
      },
      {
        title: "Eclipse Duration",
        description:
          "Determine eclipse duration and frequency for different orbital inclinations and altitudes.",
        route: "/calculators/eclipse-duration",
      },
    ],
  },
];

