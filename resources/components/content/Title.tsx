import { ReactNode } from "react";
import { vt323 } from "../../lib/fonts";

interface TitleProps {
  number: string;
  category: string;
  children: ReactNode;
}

export default function Title({ number, category, children }: TitleProps) {
  return (
    <p className={`${vt323.className} text-lg text-zinc-400 sm:text-2xl`}>
      {number} <span className="text-zinc-500">\\</span> {category} <span className="text-zinc-500">\\</span> {children}
    </p>
  );
}

