import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="text-white pt-20 pb-16 font-sans relative z-10">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">

          {/* Column 1: Brand, Socials, Copyright (Span 2) */}
          {/* UPDATED: Reduced to span 2 to pull Links column left */}
          <div className="lg:col-span-2 flex flex-col justify-between h-full min-h-[200px] space-y-8 items-center text-center lg:items-start lg:text-left">

            {/* Logo - UPDATED: Added justify-center for mobile */}
            <div className="flex items-center gap-3 justify-center lg:justify-start">
              <svg
                preserveAspectRatio="xMidYMid meet"
                data-bbox="50.186 24.788 99.488 149.999"
                viewBox="50.186 24.788 99.488 149.999"
                className="h-14 w-auto"
                xmlns="http://www.w3.org/2000/svg"
                data-type="tint"
                role="presentation"
                aria-hidden="true"
                aria-label=""
              >
                <g>
                  <path d="M145.992 126.041l-45.978 22.869-45.978-22.869c-1.204-.602-2.768-.12-3.37 1.083-.602 1.204-.12 2.768 1.083 3.37l48.265 24.072 48.265-24.072c1.204-.602 1.805-2.167 1.083-3.37-.601-1.203-2.166-1.685-3.37-1.083z" fill="#FD7A7A"></path>
                  <path d="M145.992 146.262l-45.978 22.869-45.978-22.869c-1.204-.602-2.768-.12-3.37 1.083-.602 1.204-.12 2.768 1.083 3.37l48.265 24.072 48.265-24.072c1.204-.602 1.805-2.167 1.083-3.37-.601-1.203-2.166-1.685-3.37-1.083z" fill="#FD7A7A"></path>
                  <path d="M149.603 50.816c0-.963-.481-1.805-1.444-2.287l-47.061-23.47a2.55 2.55 0 0 0-2.287 0L51.75 48.529c-.843.481-1.444 1.324-1.444 2.287h-.12v57.292h.12c0 .963.602 1.805 1.444 2.287l47.061 23.47c.361.12.722.241 1.083.241s.722-.12 1.083-.241l47.061-23.47c.843-.481 1.444-1.324 1.444-2.287h.12V50.816h.001zM55.36 54.788l42.126 21.063v7.222L55.36 104.136V54.788zm47.182 21.063l42.126-21.063v49.228l-42.126-21.063v-7.102zm-2.528-45.738l41.404 20.702-40.562 20.221h-1.805L58.61 50.816l41.404-20.703zm-2.527 58.616v38.756L58.61 108.107l38.877-19.378zm5.055 38.757V88.729l38.877 19.378-38.877 19.379z" fill="#FD7A7A"></path>
                </g>
              </svg>
              <span className="text-2xl font-normal text-white tracking-wide">CubeSource</span>
            </div>

            {/* Socials - UPDATED: Added justify-center for mobile */}
            <div className="space-y-4">
              <p className="text-[#a0a0a0] text-lg">Connect With Us:</p>
              <div className="flex gap-4 justify-center lg:justify-start">
                {/* X */}
                <a href="https://x.com/cubesourcespace" target="_blank" rel="noreferrer" className="text-[#a0a0a0] hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                </a>
                {/* Instagram */}
                <a href="https://www.instagram.com/cubesource.space/" target="_blank" rel="noreferrer" className="text-[#a0a0a0] hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
                </a>
                {/* LinkedIn */}
                <a href="https://www.linkedin.com/company/cubesource" target="_blank" rel="noreferrer" className="text-[#a0a0a0] hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h5v-8.321c0-4.62 5.08-4.425 5.08 4.425v3.896h5v-8.32c0-8.181-7.5-7.18-9.62-3.896v-2.784z" /></svg>
                </a>
                {/* Github */}
                <a href="https://github.com/CubeSource" target="_blank" rel="noreferrer" className="text-[#a0a0a0] hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                </a>
              </div>
            </div>

            <div className="mt-8">
              <p className="text-[#a0a0a0] text-sm">
                © 2025 by CubeSource<br />
                All Rights Reserved
              </p>
            </div>
          </div>

          {/* Column 2: Links (Span 4) - Centered content */}
          <div className="lg:col-span-4 flex justify-center lg:justify-center">
            <nav className="flex flex-col space-y-4 text-center items-center pt-2">
              <a href="https://www.cubesource.space/products" className="text-white hover:text-blue-400 text-lg underline decoration-[#7a7a7a] underline-offset-4 decoration-1">Products</a>
              <a href="https://www.cubesource.space/resources" className="text-white hover:text-blue-400 text-lg underline decoration-[#7a7a7a] underline-offset-4 decoration-1">Resource Center</a>
              <a href="https://www.cubesource.space/feed" className="text-white hover:text-blue-400 text-lg underline decoration-[#7a7a7a] underline-offset-4 decoration-1">Feed</a>
              <a href="https://www.cubesource.space/about-4-1" className="text-white hover:text-blue-400 text-lg underline decoration-[#7a7a7a] underline-offset-4 decoration-1">Careers</a>
              <a href="https://www.cubesource.space/about-4" className="text-white hover:text-blue-400 text-lg underline decoration-[#7a7a7a] underline-offset-4 decoration-1">About</a>
              <a href="https://www.cubesource.space/contact-8" className="text-white hover:text-blue-400 text-lg underline decoration-[#7a7a7a] underline-offset-4 decoration-1">Contact</a>
            </nav>
          </div>

          {/* Column 3: Subscribe (Span 3) */}
          <div className="lg:col-span-3 flex flex-col items-center pt-2">
            <h3 className="text-xl text-[#a0a0a0] font-normal mb-8 text-center w-full">Subscribe for exclusive updates</h3>
            <form action="https://www.cubesource.space/contact-8" method="GET" target="_blank" className="w-full flex flex-col items-center">

              <div className="w-full max-w-[300px] flex flex-col gap-4">
                <div className="flex flex-col gap-1 w-full">
                  <label htmlFor="email" className="text-sm text-white">Email *</label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    required
                    placeholder="email@example.com"
                    className="w-full h-10 bg-white text-black px-4 text-sm focus:outline-none placeholder-gray-500 border border-transparent focus:border-blue-400"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full h-10 bg-white text-black text-sm font-normal hover:bg-gray-100 transition-colors"
                >
                  Join Our Mailing List
                </button>

                <div className="flex items-start gap-3 mt-1">
                  <div className="relative flex items-center mt-0.5">
                    <input
                      type="checkbox"
                      id="subscribe-check"
                      className="peer h-5 w-5 appearance-none border border-white bg-transparent checked:bg-white checked:border-white cursor-pointer transition-all"
                    />
                    <svg
                      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 text-black pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <label htmlFor="subscribe-check" className="text-sm text-white font-light cursor-pointer select-none leading-tight">
                    I want to subscribe to your mailing list.
                  </label>
                </div>
              </div>

            </form>
          </div>

          {/* Column 4: Partners (Span 3) - Right aligned */}
          <div className="lg:col-span-3 flex flex-col items-center lg:items-end pt-2">
            <p className="text-lg text-[#a0a0a0] mb-8 lg:text-right w-full">Collaborating Partners:</p>
            <div className="flex flex-col space-y-8 items-center lg:items-end w-full">
              <a href="http://www.calgarytospace.ca" target="_blank" rel="noreferrer" className="hover:opacity-80 transition-opacity block">
                <img
                  src="https://static.wixstatic.com/media/b4da61_9273e12952134459911450c3f2b78616~mv2.png/v1/fill/w_264,h_131,al_c,q_85,usm_0.66_1.00_0.01/b4da61_9273e12952134459911450c3f2b78616~mv2.png"
                  alt="CalgaryToSpace"
                  className="w-[190px] h-auto object-contain"
                />
              </a>
              <a href="https://satsearch.co" target="_blank" rel="noreferrer" className="hover:opacity-80 transition-opacity block">
                <img
                  src="/images/satsearch.png"
                  alt="satsearch"
                  className="w-[190px] h-auto object-contain"
                />
              </a>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
