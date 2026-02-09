import { ReactNode } from "react";
import { vt323 } from "../../lib/fonts";

interface TitleProps {
  number: string;
  category: string;
  children: ReactNode;
}

export default function Title({ number, category, children }: TitleProps) {
  return (
    <p className={`${vt323.className} text-lg text-zinc-400 sm:text-2xl flex flex-wrap gap-x-2 items-center`}>
      <span>{number}</span>
      <span className="text-zinc-500">\\</span>
      <span>{category}</span>
      <span className="text-zinc-500">\\</span>
      <span>{children}</span>
    </p>
  );
}

