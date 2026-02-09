'use client';

import Link from "next/link";
import NextImage from "next/image";
import { vt323 } from "../../lib/fonts";

/**
 * ProductLink Component
 * 
 * A box component that displays a message about product availability and a link to the CubeSource store.
 * Used in content pages to promote products available for purchase.
 * 
 * @param storeUrl - The URL to the product page on the CubeSource store (required)
 * @param productText - Optional text to customize the product description. Replaces the entire "This product is" phrase.
 *                      Defaults to "This product is".
 *                      Examples: "This burnwire is", "These components are", "This frame is"
 *                      Text format: "{productText} available on the CubeSource store."
 * @param imageSrc - Optional image source path relative to public/images/ directory (e.g., "product.jpg" for public/images/product.jpg)
 * @param imageAlt - Alt text for the image (required if imageSrc is provided)
 * 
 * @example
 * // Basic usage with default text
 * <ProductLink storeUrl="https://store.cubesource.com/product" />
 * // Displays: "This product is available on the CubeSource store."
 * 
 * @example
 * // With custom product text
 * <ProductLink 
 *   storeUrl="https://store.cubesource.com/burnwire" 
 *   productText="This burnwire is"
 * />
 * // Displays: "This burnwire is available on the CubeSource store."
 * 
 * @example
 * // Plural example
 * <ProductLink 
 *   storeUrl="https://store.cubesource.com/components" 
 *   productText="These components are"
 * />
 * // Displays: "These components are available on the CubeSource store."
 */
interface ProductLinkProps {
  storeUrl: string;
  productText?: string;
  imageSrc?: string;
  imageAlt?: string;
  imageClassName?: string;
}

export default function ProductLink({ storeUrl, productText = "This product is", imageSrc, imageAlt, imageClassName = "w-full" }: ProductLinkProps) {
  return (
    <div className="w-full my-6 p-6 bg-[#040404] bg-opacity-80 backdrop-blur-md border border-white/10 rounded-[0px]">
      {imageSrc && (
        <div className={`${imageClassName} mb-4 aspect-video bg-[#040404] bg-opacity-80 backdrop-blur-md border border-white/10 rounded-[0px] overflow-hidden relative`}>
          <NextImage
            src={`/images/${imageSrc}`}
            alt={imageAlt || "Product image"}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1024px"
          />
        </div>
      )}
      <p className="text-base text-zinc-300 sm:text-lg leading-relaxed mb-4">
        {productText} available on the CubeSource store.
      </p>
      <Link
        href={storeUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`${vt323.className} cursor-pointer group/button relative inline-flex items-center rounded-none border border-white/10 bg-[linear-gradient(90deg,#ffffff_0%,#ffffff_50%,#e4e4e7_100%)] bg-[length:200%_100%] bg-[position:0%_50%] px-4 py-1 text-lg text-black shadow-sm transition-[background-position,box-shadow] duration-300 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white hover:bg-[position:100%_50%] hover:shadow-md overflow-hidden`}
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
          Visit Store
        </span>
      </Link>
    </div>
  );
}

