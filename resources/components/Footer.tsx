// components/Footer.tsx
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="relative z-50 bg-[#0b0e17] pt-20 pb-12 text-white">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">

          {/* 1 Copyright */}
          <div className="text-center lg:text-left">
            <p className="text-sm text-gray-400">
              © 2025 by CubeSource<br />All Rights Reserved
            </p>
          </div>

          {/* 2 Links */}
          <div className="flex justify-center lg:justify-start">
            <nav className="space-y-5 text-lg">
              <a href="/products" className="block underline underline-offset-4 decoration-gray-600 hover:text-blue-400">Products</a>
              <a href="/resources" className="block underline underline-offset-4 decoration-gray-600 hover:text-blue-400">Resource Center</a>
              <a href="/feed" className="block underline underline-offset-4 decoration-gray-600 hover:text-blue-400">Feed</a>
              <a href="/about-4-1" className="block underline underline-offset-4 decoration-gray-600 hover:text-blue-400">Careers</a>
              <a href="/about-4" className="block underline underline-offset-4 decoration-gray-600 hover:text-blue-400">About</a>
              <a href="/contact-8" className="block underline underline-offset-4 decoration-gray-600 hover:text-blue-400">Contact</a>
            </nav>
          </div>

          {/* 3 Subscribe */}
          <div className="flex flex-col items-center lg:items-start">
            <p className="mb-5 text-lg">Subscribe for exclusive updates</p>
            <form action="https://www.cubesource.space/_functions/submitForm" method="POST" className="flex w-full max-w-xs flex-col gap-3 sm:flex-row">
              <input type="email" name="email" required placeholder="email@example.com" className="flex-1 rounded-md border border-gray-600 bg-white/10 px-4 py-3 text-sm placeholder-gray-400 focus:border-blue-400 focus:outline-none" />
              <button type="submit" className="rounded-md bg-blue-600 px-6 py-3 font-medium hover:bg-blue-500">Join Our Mailing List</button>
            </form>
          </div>

          {/* 4 Partners */}
          <div className="flex flex-col items-center lg:items-end">
            <p className="mb-5 text-sm text-gray-400">Collaborating Partners:</p>
            <div className="space-y-8">
              <a href="http://www.calgarytospace.ca" target="_blank" rel="noreferrer">
                <Image src="https://static.wixstatic.com/media/b4da61_9273e12952134459911450c3f2b78616~mv2.png/v1/fill/w_264,h_131,al_c,q_85,usm_0.66_1.00_0.01/b4da61_9273e12952134459911450c3f2b78616~mv2.png" alt="CalgaryToSpace" width={190} height={94} className="object-contain" />
              </a>
              <a href="https://satsearch.co" target="_blank" rel="noreferrer">
                <Image src="https://static.wixstatic.com/media/b4da61_c663af42359b4aac9000e4096c6f12d3~mv2.png/v1/fill/w_264,h_61,al_c,q_85,usm_0.66_1.00_0.01/b4da61_c663af42359b4aac9000e4096c6f12d3~mv2.png" alt="satsearch" width={190} height={44} className="object-contain" />
              </a>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}