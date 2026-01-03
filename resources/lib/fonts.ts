import { Outfit, Poppins } from "next/font/google";

export const vt323 = Poppins({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

export const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
  preload: false,
});

