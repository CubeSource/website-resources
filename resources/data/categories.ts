export type Category = {
  title: string;
  description: string;
  route: string;
};

export const categories: Category[] = [
  {
    title: "What's a CubeSat?",
    description:
      "Understand CubeSat anatomy, mission profiles, and why nanosats changed classroom space programs.",
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
];

