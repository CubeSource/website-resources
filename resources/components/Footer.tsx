// components/Footer.tsx
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="relative z-50 bg-[#0b0e17] text-white py-12 mt-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">

          {/* Left – Copyright */}
          <div className="text-center md:text-left">
            <p className="text-sm leading-6 text-gray-400">
              © 2025 by CubeSource<br />All Rights Reserved
            </p>
          </div>

          {/* Center – Navigation Links */}
          <div className="text-center">
            <nav className="flex flex-col space-y-4 text-lg">
              <a href="/products"        className="underline underline-offset-4 decoration-gray-600 hover:text-blue-400">Products</a>
              <a href="/resources"       className="underline underline-offset-4 decoration-gray-600 hover:text-blue-400">Resource Center</a>
              <a href="/feed"            className="underline underline-offset-4 decoration-gray-600 hover:text-blue-400">Feed</a>
              <a href="/about-4-1"       className="underline underline-offset-4 decoration-gray-600 hover:text-blue-400">Careers</a>
              <a href="/about-4"         className="underline underline-offset-4 decoration-gray-600 hover:text-blue-400">About</a>
              <a href="/contact-8"       className="underline underline-offset-4 decoration-gray-600 hover:text-blue-400">Contact</a>
            </nav>
          </div>

          {/* Right – Subscribe + Partners */}
          <div className="flex flex-col items-center md:items-end space-y-10">
            {/* Subscribe */}
            <div className="w-full max-w-sm">
              <p className="text-lg mb-4 text-center md:text-right">Subscribe for exclusive updates</p>
              <form
                action="https://www.cubesource.space/_functions/submitForm"
                method="POST"
                className="flex flex-col sm:flex-row gap-3"
              >
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="email@example.com"
                  className="flex-1 px-4 py-3 bg-white/10 border border-gray-600 rounded-md placeholder-gray-400 focus:outline-none focus:border-blue-400 text-sm"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-md font-medium whitespace-nowrap transition"
                >
                  Join Our Mailing List
                </button>
              </form>
            </div>

            {/* Partners */}
            <div className="text-center md:text-right">
              <p className="text-sm text-gray-400 mb-4">Collaborating Partners:</p>
              <div className="flex flex-col sm:flex-row justify-center md:justify-end gap-10 items-center">
                <a href="http://www.calgarytospace.ca" target="_blank" rel="noreferrer">
                  <Image
                    src="https://static.wixstatic.com/media/b4da61_9273e12952134459911450c3f2b78616~mv2.png/v1/fill/w_264,h_131,al_c,q_85,usm_0.66_1.00_0.01/b4da61_9273e12952134459911450c3f2b78616~mv2.png"
                    alt="CalgaryToSpace"
                    width={220}
                    height={109}
                    className="object-contain"
                  />
                </a>
                <a href="https://satsearch.co" target="_blank" rel="noreferrer">
                <Image
                  src="https://static.wixstatic.com/media/b4da61_c663af42359b4aac9000e4096c6f12d3~mv2.png/v1/fill/w_264,h_61,al_c,q_85,usm_0.66_1.00_0.01/b4da61_c663af42359b4aac9000e4096c6f12d3~mv2.png"
                  alt="satsearch"
                  width={220}
                  height={51}
                  className="object-contain"
                />
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}