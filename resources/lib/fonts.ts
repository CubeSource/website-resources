import { Outfit, VT323 } from "next/font/google";

export const vt323 = VT323({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

