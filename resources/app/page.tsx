import Image from "next/image";
import Link from "next/link";
import StarryBackground from "../components/StarryBackground";
import { categories } from "../data/categories";
import { vt323 } from "../lib/fonts";

export default function Home() {
  return (
    <div className="relative min-h-dvh bg-black text-zinc-200">
      <StarryBackground />
      <div className="relative z-10 flex min-h-dvh items-start justify-center pt-8 px-6 sm:pt-16 md:px-10 md:pt-40">
        <div className="w-full max-w-3xl">
          <Image
            src="/Logo.png"
            alt="CubeSource logo"
            width={120}
            height={120}
            className="mb-5 m-[5px] h-auto w-10 md:w-14"
            priority
          />
          <nav className="space-y-3 md:space-y-6">
            {categories.map((category) => (
              <Link
                key={category.route}
                href={category.route}
                className="group block"
              >
                <span
                  className={`${vt323.className} text-4xl sm:text-5xl text-zinc-100 transition-all duration-300 ease-out group-hover:text-zinc-200`}
                >
                  {category.title}
                </span>
                <span
                  className="mt-0 block max-h-0 max-w-xl overflow-hidden text-sm text-zinc-400 opacity-0 transition-all duration-300 ease-out group-hover:mt-2 group-hover:max-h-20 group-hover:opacity-100 md:text-base"
                >
                  {category.description}
                </span>
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
