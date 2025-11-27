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
    name: "Structure",
    items: [
      {
        title: "Fastener Torque",
        description:
          "Calculate proper torque values for aerospace fasteners based on material and thread specifications.",
        route: "/calculators/fastener-torque",
      },
    ],
  },
];

