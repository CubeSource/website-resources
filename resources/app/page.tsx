'use client';

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import StarryBackground from "../components/StarryBackground";
import { categories } from "../data/categories";
import { outfit, vt323 } from "../lib/fonts";

export default function Home() {
  const router = useRouter();
  const [openRoute, setOpenRoute] = useState<string | null>(null);

  const toggleRoute = (route: string) => {
    setOpenRoute((current) => (current === route ? null : route));
  };

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
          {/*<p
            className={`${outfit.className} mb-7 text-md text-white md:text-base`}
          >
            A free resource offered by CubeSource, complete with visuals, diagrams and tutorials.
          </p>*/}
          <nav className="space-y-8 md:space-y-10">
            {categories.map((category) => (
              <section
                key={category.name}
                className="space-y-3 md:space-y-4 first:mt-0 mt-10"
              >
                <h2
                  className={`${vt323.className} text-3xl text-zinc-400 mt-4 mb-2`}
                >
                  {category.name}
                </h2>
                <div className="space-y-3 md:space-y-6">
                  {category.items.map((item) => (
                    <div
                      key={item.route}
                      className="group block cursor-pointer "
                      role="button"
                      tabIndex={0}
                      aria-expanded={openRoute === item.route}
                      onClick={() => toggleRoute(item.route)}
                      onKeyDown={(event) => {
                        if (event.key === "Enter" || event.key === " ") {
                          event.preventDefault();
                          toggleRoute(item.route);
                        }
                      }}
                    >
                      <span
                        className={`${vt323.className} inline-block text-4xl text-zinc-100 transition-colors duration-300 ease-out group-hover:text-zinc-200 sm:text-5xl${
                          openRoute === item.route ? " text-zinc-200" : ""
                        }`}
                      >
                        {item.title}
                      </span>
                      <span
                        className={`mt-0 block max-h-0 max-w-xl overflow-hidden text-sm text-zinc-400 opacity-0 transition-all duration-300 ease-out group-hover:mt-2 group-hover:max-h-40 group-hover:opacity-100 md:text-base${
                          openRoute === item.route
                            ? " mt-2 max-h-40 opacity-100"
                            : ""
                        }`}
                      >
                        {item.description}
                        <br />
                        <button
                          type="button"
                          className={`${vt323.className} cursor-pointer group/button mt-3 inline-flex items-center gap-3 rounded-md bg-[linear-gradient(90deg,#ffffff_0%,#ffffff_50%,#e4e4e7_100%)] bg-[length:200%_100%] bg-[position:0%_50%] px-4 py-1 text-lg text-black shadow-sm transition-[background-position,box-shadow] duration-300 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white hover:bg-[position:100%_50%] hover:shadow-md`}
                          onClick={(event) => {
                            event.stopPropagation();
                            router.push(item.route);
                          }}
                        >
                          <span className="relative z-10">Start learning</span>
                          <span className="flex h-7 items-center justify-center transition-colors duration-300 ease-out group-hover/button:text-zinc-700">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              className="h-5 w-5 text-black"
                              aria-hidden="true"
                            >
                              <path
                                fillRule="evenodd"
                                d="M4.75 10a.75.75 0 01.75-.75h6.19l-2.22-2.22a.75.75 0 111.06-1.06l3.5 3.5a.75.75 0 010 1.06l-3.5 3.5a.75.75 0 11-1.06-1.06l2.22-2.22H5.5A.75.75 0 014.75 10z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </span>
                        </button>
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
