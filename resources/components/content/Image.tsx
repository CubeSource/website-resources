import NextImage from "next/image";

interface ImageProps {
  src: string;
  alt: string;
}

export default function Image({ src, alt }: ImageProps) {
  return (
    <div className="w-full my-6 aspect-video bg-[#040404] bg-opacity-80 backdrop-blur-md border border-white/10 rounded-[0px] overflow-hidden relative">
      <NextImage
        src={`/images/${src}`}
        alt={alt}
        fill
        className="object-contain"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1024px"
      />
    </div>
  );
}

