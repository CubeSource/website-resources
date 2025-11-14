import NextImage from "next/image";
import { ReactNode } from "react";

interface ImageProps {
  src: string;
  alt: string;
  children?: ReactNode;
}

export default function Image({ src, alt, children }: ImageProps) {
  return (
    <div className="w-full my-6">
      <div className="w-full aspect-video bg-[#040404] bg-opacity-80 backdrop-blur-md border border-white/10 rounded-[0px] overflow-hidden relative">
        <NextImage
          src={`/images/${src}`}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1024px"
        />
      </div>
      {children && (
        <p className="text-sm text-zinc-400 mt-2 text-left">
          {children}
        </p>
      )}
    </div>
  );
}

