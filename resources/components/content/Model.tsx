import { vt323 } from "../../lib/fonts";

export default function Model() {
  return (
    <div className="w-full my-6 aspect-video bg-[#040404] bg-opacity-80 backdrop-blur-md border border-white/10 rounded-[0px] flex items-center justify-center">
      <p className={`${vt323.className} text-white text-lg sm:text-xl text-zinc-400`}>
        3D model here soon.
      </p>
    </div>
  );
}

