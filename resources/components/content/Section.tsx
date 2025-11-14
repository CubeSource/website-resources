import { ReactNode } from "react";
import { vt323 } from "../../lib/fonts";

interface SectionProps {
  children: ReactNode;
}

export default function Section({ children }: SectionProps) {
  return (
    <h2 className={`${vt323.className} text-xl text-zinc-400 sm:text-2xl`}>
      {children}
    </h2>
  );
}

