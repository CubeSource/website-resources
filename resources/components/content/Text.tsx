import { ReactNode } from "react";

interface TextProps {
  children: ReactNode;
}

export default function Text({ children }: TextProps) {
  return (
    <p className="text-base text-zinc-300 sm:text-lg leading-relaxed">
      {children}
    </p>
  );
}

