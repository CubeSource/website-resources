'use client';

import { useState } from "react";
import StarryBackground from "../../components/StarryBackground";
import NavBar from "../../components/Nav";
import { resourceCategories } from "../../data/resources";
import { vt323 } from "../../lib/fonts";

export default function ResourcesPage() {
  const [openUrl, setOpenUrl] = useState<string | null>(null);

  const toggleUrl = (url: string) => {
    setOpenUrl((current) => (current === url ? null : url));
  };

  return (
    <div className="relative min-h-dvh bg-black text-zinc-200">
      <NavBar />
      <StarryBackground />
      <div className="relative z-10 flex min-h-dvh items-start justify-center py-24 px-6 sm:py-24 md:px-10 md:py-40">
        <div className="w-full max-w-3xl">
          <nav className="space-y-8 md:space-y-10">
            {resourceCategories.map((category) => (
              <section
                key={category.name}
                className="space-y-3 md:space-y-4 first:mt-0 mt-10"
              >
                <h2
                  className={`${vt323.className} text-xl text-zinc-400 mt-4 mb-1`}
                >
                  {category.name}
                </h2>
                <div className="space-y-3 md:space-y-6">
                  {category.items.map((item) => (
                    <div
                      key={item.url}
                      className="group block cursor-pointer "
                      role="button"
                      tabIndex={0}
                      aria-expanded={openUrl === item.url}
                      onClick={() => toggleUrl(item.url)}
                      onKeyDown={(event) => {
                        if (event.key === "Enter" || event.key === " ") {
                          event.preventDefault();
                          toggleUrl(item.url);
                        }
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`${vt323.className} inline-block text-3xl text-zinc-100 transition-colors duration-300 ease-out group-hover:text-zinc-200 sm:text-5xl${
                            openUrl === item.url ? " text-zinc-200" : ""
                          }`}
                        >
                          {item.title}
                        </span>
                        <span
                          className={`pointer-events-none inline-flex h-6 w-4 items-center justify-center text-zinc-300 transition-opacity duration-300 ease-out${
                            openUrl === item.url ? " opacity-100" : " opacity-0"
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
                        className={`mt-0 block max-h-0 max-w-xl overflow-hidden text-sm text-zinc-400 opacity-0 transition-all duration-300 delay-[300ms] ease-out group-hover:mt-2 group-hover:max-h-40 group-hover:opacity-100 md:text-base${
                          openUrl === item.url
                            ? " mt-2 max-h-40 opacity-100"
                            : ""
                        }`}
                      >
                        {item.description}
                        <br />
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`${vt323.className} cursor-pointer group/button mt-3 relative inline-flex items-center rounded-none border border-white/10 bg-[linear-gradient(90deg,#ffffff_0%,#ffffff_50%,#e4e4e7_100%)] bg-[length:200%_100%] bg-[position:0%_50%] px-4 py-1 text-lg text-black shadow-sm transition-[background-position,box-shadow] duration-300 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white hover:bg-[position:100%_50%] hover:shadow-md overflow-hidden`}
                          onClick={(event) => {
                            event.stopPropagation();
                          }}
                        >
                          <span 
                            data-overlay
                            className="absolute inset-0 bg-gray-300 transform scale-x-0 transition-transform duration-300 origin-right pointer-events-none"
                          />
                          <span 
                            className="relative z-10 inline-block"
                            onMouseEnter={(e) => {
                              const button = e.currentTarget.closest('a');
                              const overlay = button?.querySelector('[data-overlay]') as HTMLElement;
                              if (overlay) {
                                overlay.classList.remove('scale-x-0');
                                overlay.classList.add('scale-x-100');
                              }
                            }}
                            onMouseLeave={(e) => {
                              const button = e.currentTarget.closest('a');
                              const overlay = button?.querySelector('[data-overlay]') as HTMLElement;
                              if (overlay) {
                                overlay.classList.remove('scale-x-100');
                                overlay.classList.add('scale-x-0');
                              }
                            }}
                          >
                            View Resource
                          </span>
                        </a>
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

