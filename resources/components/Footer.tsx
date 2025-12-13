import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="text-white pt-20 pb-16 font-sans relative z-10">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">

          {/* Column 1: Brand, Socials, Copyright (Span 3) */}
          <div className="lg:col-span-3 flex flex-col justify-between h-full min-h-[200px] space-y-8 items-center text-center lg:items-start lg:text-left">
            {/* Logo */}
            <div className="flex items-center gap-3 justify-center lg:justify-start">
               <svg preserveAspectRatio="xMidYMid meet" data-bbox="50.186 24.788 99.488 149.999" viewBox="50.186 24.788 99.488 149.999" className="h-14 w-auto" xmlns="http://www.w3.org/2000/svg" data-[...]
                <g>
                    <path d="M145.992 126.041l-45.978 22.869-45.978-22.869c-1.204-.602-2.768-.12-3.37 1.083-.602 1.204-.12 2.768 1.083 3.37l48.265 24.072 48.265-24.072c1.204-.602 1.805-2.167 1.083-3.3[...]
                    <path d="M145.992 146.262l-45.978 22.869-45.978-22.869c-1.204-.602-2.768-.12-3.37 1.083-.602 1.204-.12 2.768 1.083 3.37l48.265 24.072 48.265-24.072c1.204-.602 1.805-2.167 1.083-3.3[...]
                    <path d="M149.603 50.816c0-.963-.481-1.805-1.444-2.287l-47.061-23.47a2.55 2.55 0 0 0-2.287 0L51.75 48.529c-.843.481-1.444 1.324-1.444 2.287h-.12v57.292h.12c0 .963.602 1.805 1.444 2[...]
                </g>
              </svg>
              <span className="text-2xl font-normal text-white tracking-wide">CubeSource</span>
            </div>

            {/* Socials */}
            <div className="space-y-4">
              <p className="text-[#a0a0a0] text-lg">Connect With Us:</p>
              <div className="flex gap-4 justify-center lg:justify-start">
                 {/* X */}
                 <a href="https://twitter.com" target="_blank" rel="noreferrer" className="text-[#a0a0a0] hover:text-white transition-colors">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4[...]
                 </a>
                 {/* Instagram */}
                 <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-[#a0a0a0] hover:text-white transition-colors">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.20[...]
                 </a>
                 {/* LinkedIn */}
                 <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-[#a0a0a0] hover:text-white transition-colors">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 [...]
                 </a>
                 {/* Github */}
                 <a href="https://github.com" target="_blank" rel="noreferrer" className="text-[#a0a0a0] hover:text-white transition-colors">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4[...]
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

          {/* Column 2: Links (Span 2) - Centered content */}
          <div className="lg:col-span-2 flex justify-center lg:justify-center">
            <nav className="flex flex-col space-y-4 text-center items-center pt-2">
               <a href="/products" className="text-white hover:text-blue-400 text-lg underline decoration-[#7a7a7a] underline-offset-4 decoration-1">Products</a>
               <a href="/resources" className="text-white hover:text-blue-400 text-lg underline decoration-[#7a7a7a] underline-offset-4 decoration-1">Resource Center</a>
               <a href="/feed" className="text-white hover:text-blue-400 text-lg underline decoration-[#7a7a7a] underline-offset-4 decoration-1">Feed</a>
               <a href="/about-4-1" className="text-white hover:text-blue-400 text-lg underline decoration-[#7a7a7a] underline-offset-4 decoration-1">Careers</a>
               <a href="/about-4" className="text-white hover:text-blue-400 text-lg underline decoration-[#7a7a7a] underline-offset-4 decoration-1">About</a>
               <a href="/contact-8" className="text-white hover:text-blue-400 text-lg underline decoration-[#7a7a7a] underline-offset-4 decoration-1">Contact</a>
            </nav>
          </div>

          {/* Column 3: Subscribe (Span 4) */}
          <div className="lg:col-span-4 flex flex-col items-center pt-2">
            <h3 className="text-xl text-[#a0a0a0] font-normal mb-8 text-center w-full">Subscribe for exclusive updates</h3>
            <form action="https://www.cubesource.space/_functions/submitForm" method="POST" className="w-full flex flex-col items-center">
              
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
                  src="https://static.wixstatic.com/media/b4da61_9273e12952134459911450c3f2b78616~mv2.png/v1/fill/w_264,h_131,al_c,q_85,usm_0.66_1.00_0.01/b4da61_9273e12952134459911450c3f2b78616~mv2.p[...]
                  alt="CalgaryToSpace" 
                  className="w-[190px] h-auto object-contain"
                />
              </a>
              <a href="https://satsearch.co" target="_blank" rel="noreferrer" className="hover:opacity-80 transition-opacity block">
                <img 
                  src="https://static.wixstatic.com/media/b4da61_c663af42359b4aac9000e4096c6f12d3~mv2.png/v1/fill/w_264,h_61,al_c,q_85,usm_0.66_1.00_0.01/b4da61_c663af42359b4aac9000e4096c6f12d3~mv2.pn[...]
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
