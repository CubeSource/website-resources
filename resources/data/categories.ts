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
      {
        title: "Burnwires",
        description:
          "Design and deploy release mechanisms, from nichrome selection to deployment sequencing and redundancy.",
        route: "/docs/components",
      },
      {
        title: "PCBs",
        description:
          "Lay out flight-ready boards, manage stack-ups, grounding, and test plans for CubeSat avionics.",
        route: "/docs/deployments",
      },
    ],
  },
];

