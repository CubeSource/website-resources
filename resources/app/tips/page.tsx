'use client';

import Image from "next/image";
import StarryBackground from "../../components/StarryBackground";
import NavBar from "../../components/Nav";
import { outfit, vt323 } from "../../lib/fonts";

// Each entry is one "CubeSAT tip of the day" pulled from the company Twitter feed,
// cleaned up and numbered like a transmission log — they were originally posted
// as a running daily series, so the sequence is real, not decorative.
type Tip = {
  id: string;
  text: string;
  source?: string; // attributed handle, if the tip name-checked one
  image?: string; // filename in public/images/tips, e.g. "001.jpg"
};

const tips: Tip[] = [
  {
    id: "001",
    text: "Containerized satellites require a minimum of two hardware interlocks to prevent power-up during launch — aka separation switches. The Omron D2F series is a popular choice, and one of the few COTS options available.",
    source: "@OmronComponents",
    image: "containerized.jpeg",
  },
  {
    id: "002",
    text: 'Silicon solar cells are often written off as not "space grade." Somebody forgot to tell SpaceX, who uses them on Starlink — the biggest satellite constellation in history. Silicon cells are nearing 26–27% efficiency for under $1/W, and in LEO, radiation exposure is minimal.',
    source: "@SpaceX",
    image: "silicon_cells.jpeg",
  },
  {
    id: "003",
    text: "Rockets aren't the only path to orbit. With demand for space access at an all-time high, alternatives are gaining traction — Starfighters Inc. plans to deliver picosats to LEO/VLEO using surplus F-104 fighter jets.",
    source: "@StarfightersInc",
  },
  {
    id: "004",
    text: "A lesser-known benefit of running multiple GNSS antennas, beyond redundancy, is lower power draw: GPS can acquire the minimum number of satellites needed for a fix faster with more antennas feeding it.",
    image: "gnss.jpeg",
  },
  {
    id: "005",
    text: "Believe it or not, the sequence you torque your fasteners in makes a real difference — especially once you're working with 0.1 mm tolerances.",
    image: "wrench_seq.jpeg",
  },
  {
    id: "006",
    text: '1U and 2U CubeSats need separation spring plungers, since several may be stacked in a single deployer. 3U and 6U buses skip this requirement and often pick up extra "tuna can" volume instead.',
    image: "",
  },
  {
    id: "007",
    text: "If you're working on nanosatellites, chances are you've read Cal Poly's CubeSat Design Specification. It doesn't mention this, but chamfers are commonly used instead of fillets — they're far easier to CNC and serve the same function. Question your constraints.",
    source: "@CalPoly",
    image: "calpolyspec.jpeg",
  },
  {
    id: "008",
    text: "For students: run collaborative systems-engineering meetings where mission options get discussed and constraints get defined out loud. The constraints will keep changing — but knowing what they were, and why, is what keeps a team engaged.",
    image: "",
  },
  {
    id: "009",
    text: "On canceling magnetic moments: your shielding doesn't need to be pure, just a high percentage. Conformal coating mostly negates the issue on its own, and lead also happens to have good fatigue properties if you go that route.",
    image: "",
  },
  {
    id: "010",
    text: 'Electrical components that aren\'t specifically made for space will have "Earth centric" datasheets. Make sure to check which assumptions are used. For example, power ratings assume convective heat transfer.',
    image: "",
  },
  {
    id: "011",
    text: "Every engineer is a systems engineer. Being willing to communicate with and think critically about disciplines that are outside your area of expertise is essential for successful missions.",
    image: "",
  },
  {
    id: "012",
    text: "Hate fumbling fasteners? Knurled socket head cap screws are the easiest to handle during assembly. The knurling helps with hand threading them in before switching to your favorite driver (Wera).",
    image: "fasteners.jpeg",
  },
  {
    id: "013",
    text: "Avoid blind holes in your satellite frame. These can create little air pockets. If necessary, pair with vented fasteners.",
    image: "blind_holes.jpeg",
  },
  {
    id: "014",
    text: "Roller-style switches have less chance of catching and breaking while being inserted or removed from a deployer.",
    image: "rollers.jpeg",
  },
  {
    id: "015",
    text: "Getting to space is hard — and not just technically. Some of your biggest hurdles aren't engineering: keeping a team together, filling out paperwork, holding your ground in contract negotiations. That's what getting to space actually looks like.",
    image: "",
  },
  {
    id: "016",
    text: "Great advice via SAWT: write a \"master sim\" — orbit, attitude, thermals, power, and RF all combined — from scratch, in a language you know. By the time you're done, you'll have a strong grasp of the common trade spaces in spacecraft design.",
    source: "@AI_in_LEO",
    image: "",
  },
  {
    id: "017",
    text: "Use a piece of kapton tape to hold tricky fasteners in place while installing.",
    image: "kapton.jpeg",
  },
];

const dispatches = [
  {
    id: "D1",
    text: "Our CubeSat Resource Center is now open source — including an interactive visualizer showing real NTN constellation orbits like Iridium and Starlink.",
    source: "@IridiumComm · @Starlink",
  },
  {
    id: "D2",
    text: "Latest revision of our Burnwing PCB is out: an open-source burnwire dev kit to help people build their own space-grade release mechanisms — thermal analysis included.",
  },
  {
    id: "D3",
    text: "Open-source ADCS is the real bottleneck for this industry right now. We'll support anyone who takes a serious swing at it.",
  },
];

const resource = {
  title: "A Guide to CubeSat Mission and Bus Design",
  subtitle: "Open-source text, University of Hawaii",
  href: "https://89ca5d95-63d7-4c60-8837-6b17f3743392.filesusr.com/ugd/b4da61_7357c743b58a4069b14fd71e8ee3e499.pdf?dn=A-Guide-to-CubeSat-Mission-and-Bus-Design.pdf",
};

export default function TipsAndTricks() {
  return (
    <div className="relative min-h-dvh bg-black text-zinc-200">
      <NavBar />
      <StarryBackground />
      <div className="relative z-10 flex min-h-dvh justify-center px-6 pt-20 pb-24 sm:py-24 md:px-10 md:pt-28">
        <div className="w-full max-w-3xl">
          {/* Header */}
          <div className="mb-10 md:mb-14">
            {/*<h1
              className={`${vt323.className} text-4xl text-zinc-100 sm:text-5xl`}
            >
              CubeSat Tips &amp; Tricks
            </h1>*/}
            <p className={`${outfit.className} mt-3 max-w-3xl text-md text-white sm:text-lg`}>
              A running log of CubeSat tips of the day, pulled straight from our Twitter feed
              and archived here for whenever you need them.
            </p>
          </div>

          {/* Tip log */}
          <div className="space-y-6 md:space-y-7">
            {tips.map((tip) => (
              <div
                key={tip.id}
                className="group border-l border-white/10 pl-5 transition-colors duration-300 ease-out hover:border-zinc-400 md:pl-6"
              >
                <div className="flex items-baseline gap-3">
                  <span
                    className={`${vt323.className} text-lg text-zinc-500 transition-colors duration-300 ease-out group-hover:text-zinc-300`}
                  >
                    TIP_{tip.id}
                  </span>
                </div>
                <p className={`${outfit.className} mt-1 text-sm leading-relaxed text-zinc-300 sm:text-base`}>
                  {tip.text}
                </p>
                {tip.image && (
                  <div className="relative mt-3 aspect-video w-full max-w-md overflow-hidden border border-white/10">
                    <Image
                      src={`/images/tips/${tip.image}`}
                      alt={`Illustration for tip ${tip.id}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                {tip.source && (
                  <a href={`https://x.com/${tip.source}`} target="_blank" className={`${outfit.className} mt-2 inline-block text-xs text-zinc-500 hover:underline`}>
                    {tip.source}
                  </a>
                )}
              </div>
            ))}
          </div>

          {/* Resource callout */}
          <a
            href={resource.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-12 block border border-white/10 bg-white/[0.02] px-5 py-4 transition-colors duration-300 ease-out hover:border-zinc-400 hover:bg-white/[0.04] md:mt-16 md:px-6 md:py-5"
          >
            <span className={`${vt323.className} text-xs uppercase tracking-widest text-zinc-500`}>
              Further reading
            </span>
            <p className={`${outfit.className} mt-1 text-base text-zinc-100 sm:text-lg`}>
              {resource.title}
            </p>
            <p className={`${outfit.className} text-sm text-zinc-500`}>{resource.subtitle}</p>
          </a>

          {/* Dispatches / announcements
          <div className="mt-14 md:mt-16">
            <h2 className={`${vt323.className} text-md mb-4 text-zinc-400`}>
              Dispatches
            </h2>
            <div className="space-y-5 md:space-y-6">
              {dispatches.map((d) => (
                <div key={d.id} className="border-l border-white/10 pl-5 md:pl-6">
                  <p className={`${outfit.className} text-sm leading-relaxed text-zinc-300 sm:text-base`}>
                    {d.text}
                  </p>
                  {d.source && (
                    <span className={`${outfit.className} mt-2 inline-block text-xs text-zinc-500`}>
                      {d.source}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}