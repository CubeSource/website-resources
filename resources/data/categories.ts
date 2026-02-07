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
    name: "Getting Started",
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
        title: "Manufacturing & Coatings",
        description:
          "Review fabrication considerations, tolerances, and surface treatments for aerospace structures.",
        route: "/docs/structure/manufacturing-coatings",
      },
    ],
  },
  {
    name: "Hold-Down Release Mechanisms",
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
    items: [
      {
        title: "Batteries",
        description:
          "Reliable energy storage is non-negotiable for survival during eclipse phases and high-power operations. Batteries serve as the spacecraft's primary energy reservoir—typically utilizing Lithium-Ion or Lithium-Polymer chemistries—to regulate bus voltage and sustain operations when solar generation is unavailable. This section covers cell selection, safe pack architecture, and Battery Management Systems (BMS).",
        route: "/docs/eps/batteries",
      },
      {
        title: "Solar Panels",
        description:
          "As the primary power source for most missions, the solar array dictates the total energy budget. Solar panels are photovoltaic assemblies, either body-mounted or deployable, that convert solar radiation into electrical current to charge the battery bank and power the bus. We explore array modeling, deployment mechanisms, and optimizing Maximum Power Point Tracking (MPPT).",
        route: "/docs/eps/solar-panels",
      },
      {
        title: "Separation Switches",
        description:
          "Ensuring the system remains dormant until deployment is a strict launch requirement. Separation switches (or kill switches) are electromechanical devices that physically interrupt the power circuit while the hardware is stowed, automatically closing the circuit to activate the bus only after ejection. Learn how to integrate these inhibits for launch safety and reliable system startup.",
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
          "Standard mechanical fasteners often need chemical reinforcement to withstand launch loads. Epoxies and adhesives are specialized bonding agents used to lock fasteners (staking), mount sensors, and secure cabling. Crucially, these materials are selected for low-outgassing properties to prevent optics contamination in a vacuum. This guide details proper selection, surface preparation, and cure cycles.",
        route: "/docs/assembly/epoxies-adhesives",
      },
      {
        title: "Tools & Organization",
        description:
          "A disorganized build environment introduces risk to flight hardware. Tools and organization refer to the systematic arrangement of cleanroom-compatible equipment, ESD-safe workstations, and strict inventory tracking (kitting) required to assemble systems without introducing debris or static damage. We cover setting up professional workflows for efficient, safe integration.",
        route: "/docs/assembly/tools-organization",
      },
      {
        title: "Jigs & Fixtures",
        description:
          "Precision alignment is rarely achievable by hand. Jigs and fixtures are custom-manufactured tools designed to hold components in a fixed, accurate position during assembly, ensuring repeatability for tasks like solar cell bonding or structural integration. Discover how to design and validate these aids to support consistent manufacturing tolerances.",
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
          "Before reaching orbit, hardware must survive the intense acoustic and mechanical energy of launch. Vibration testing is a qualification process where the integrated system is shaken at specific frequencies and amplitudes to verify that structural integrity and electronics will withstand ascent loads. This section helps you plan sine, random, and shock tests, including fixture design and acceptance criteria.",
        route: "/docs/environmental-testing/vibration-testing",
      },
      {
        title: "Thermal Testing",
        description:
          "Space is an environment of extreme temperature fluctuations. Thermal testing involves cycling the hardware through hot and cold extremes—often within a vacuum chamber—to validate that the thermal control system maintains safe operating temperatures for all subsystems. Learn how to execute thermal balance and thermal vacuum (TVAC) campaigns to verify performance in the harsh orbital environment.",
        route: "/docs/environmental-testing/thermal-testing",
      },
    ],
  },
];

