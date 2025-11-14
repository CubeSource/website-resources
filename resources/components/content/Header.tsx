import { ReactNode } from "react";
import { vt323 } from "../../lib/fonts";

interface HeaderProps {
  children: ReactNode;
}

export default function Header({ children }: HeaderProps) {
  return (
    <h1 className={`${vt323.className} text-4xl text-white sm:text-5xl`}>
      {children}
    </h1>
  );
}

