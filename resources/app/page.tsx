'use client';

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import StarryBackground from "../components/StarryBackground";
import NavBar from "../components/Nav";
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
      <NavBar />
      <StarryBackground />
      <div className="relative z-10 flex min-h-dvh items-start justify-center px-6 pt-20 pb-16 sm:py-24 md:px-10 md:pt-28 md:pb-20">
        <div className="w-full max-w-3xl">
          {/*
          <Image
            src="/Logo.png"
            alt="CubeSource logo"
            width={120}
            height={120}
            className="mb-5 m-[5px] h-auto w-10 md:w-14"
            priority
          />
          <p
            className={`${outfit.className} mb-7 text-md text-white md:text-base`}
          >
            A free resource offered by CubeSource, complete with visuals, diagrams and tutorials.
          </p>*/}
          <nav className="space-y-5">
            {categories.map((category) => (
              <section
                key={category.name}
                className=""
              >
                <div className="flex flex-col md:flex-row items-center gap-8 xs:gap-12">
                  <div className="flex-1 space-y-3 md:space-y-4 w-full">
                    <h2
                      className={`${vt323.className} text-md text-zinc-400 mt-0 mb-1`}
                    >
                      {category.name}
                    </h2>
                    <div className="space-y-4 md:space-y-3">
                      {category.items.map((item) => (
                        <div
                          key={item.route}
                          className="group block cursor-pointer"
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
                          <div className="flex items-center gap-3">
                            <span
                              className={`${vt323.className} inline-block text-2xl text-zinc-100 transition-colors duration-300 ease-out group-hover:text-zinc-200 sm:text-4xl${openRoute === item.route ? " text-zinc-200" : ""
                                }`}
                            >
                              {item.title}
                            </span>
                            <span className="sr-only">A 1U CubeSat being handled by a NASA technician.</span>
                            <span
                              className={`pointer-events-none inline-flex h-6 w-4 items-center justify-center text-zinc-300 transition-opacity duration-300 ease-out${openRoute === item.route ? " opacity-100" : " opacity-0"
                                }`}
                              aria-hidden="true"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="h-4 w-4"
                              >
                                <path d="M18 6L6 18" />
                                <path d="M6 6l12 12" />
                              </svg>
                            </span>
                          </div>
                          <span
                            className={`mt-0 block max-h-0 max-content overflow-hidden text-sm text-zinc-400 opacity-0 transition-all duration-300 delay-[300ms] ease-out group-hover:mt-2 group-hover:max-h-40 group-hover:opacity-100 md:text-base${openRoute === item.route
                              ? " mt-2 max-h-40 opacity-100"
                              : ""
                              }`}
                          >
                            {item.description}
                            <br />
                            <button
                              type="button"
                              className={`${vt323.className} cursor-pointer group/button mt-3 relative inline-flex items-center rounded-none border border-white/10 bg-[linear-gradient(90deg,#ffffff_0%,#ffffff_50%,#e4e4e7_100%)] bg-[length:200%_100%] bg-[position:0%_50%] px-4 py-1 text-lg text-black shadow-sm transition-[background-position,box-shadow] duration-300 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white hover:bg-[position:100%_50%] hover:shadow-md overflow-hidden`}
                              onClick={(event) => {
                                event.stopPropagation();
                                router.push(item.route);
                              }}
                            >
                              <span
                                data-overlay
                                className="absolute inset-0 bg-gray-300 transform scale-x-0 transition-transform duration-300 origin-right pointer-events-none"
                              />
                              <span
                                className="relative z-10 inline-block"
                                onMouseEnter={(e) => {
                                  const button = e.currentTarget.closest('button');
                                  const overlay = button?.querySelector('[data-overlay]') as HTMLElement;
                                  if (overlay) {
                                    overlay.classList.remove('scale-x-0');
                                    overlay.classList.add('scale-x-100');
                                  }
                                }}
                                onMouseLeave={(e) => {
                                  const button = e.currentTarget.closest('button');
                                  const overlay = button?.querySelector('[data-overlay]') as HTMLElement;
                                  if (overlay) {
                                    overlay.classList.remove('scale-x-100');
                                    overlay.classList.add('scale-x-0');
                                  }
                                }}
                              >
                                Start Learning
                              </span>
                            </button>
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  {category.image && (
                    <div
                      className="hidden md:block relative shrink-0 mt-0"
                      style={{
                        width: category.imageSize || 180,
                        height: category.imageSize || 180,
                      }}
                    >
                      <Image
                        src={category.image}
                        alt={category.name}
                        width={category.imageSize || 180}
                        height={category.imageSize || 180}
                        className="object-contain"
                        style={{
                          width: category.imageSize || 180,
                          height: category.imageSize || 180,
                        }}
                      />
                    </div>
                  )}
                </div>
              </section>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
