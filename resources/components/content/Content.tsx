import { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import StarryBackground from "../StarryBackground";
import NavBar from "../Nav";
import { categories } from "../../data/categories";
import { vt323 } from "../../lib/fonts";

interface ContentProps {
  children: ReactNode;
}

export default function Content({ children }: ContentProps) {
  const pathname = usePathname();

  // Find current category and item index
  let nextItem = null;

  for (const category of categories) {
    const currentIndex = category.items.findIndex(item => item.route === pathname);
    if (currentIndex !== -1) {
      // Check if there is a next item in the same category
      if (currentIndex < category.items.length - 1) {
        nextItem = category.items[currentIndex + 1];
      } else {
        // If last item in category, try to find the next category's first item
        const currentCategoryIndex = categories.findIndex(cat => cat === category);
        if (currentCategoryIndex < categories.length - 1) {
          // Find next category that has items
          for (let i = currentCategoryIndex + 1; i < categories.length; i++) {
            if (categories[i].items.length > 0) {
              nextItem = categories[i].items[0];
              break;
            }
          }
        }
      }
      break;
    }
  }

  return (
    <div className="relative min-h-dvh bg-black text-zinc-200">
      <NavBar />
      <StarryBackground />
      <main className="relative z-10 flex min-h-dvh items-start justify-center py-24 px-6 sm:py-24 md:px-10 md:py-40">
        <div className="w-full max-w-3xl space-y-8">
          {children}

          <div className="flex justify-between items-end pt-8 border-t border-white/10 mt-12">
            <Link
              href="/"
              className={`${vt323.className} text-lg text-zinc-400 underline decoration-zinc-500 hover:text-zinc-200 hover:decoration-zinc-300 transition-colors mb-2`}
            >
              ← Back to home
            </Link>

            {nextItem ? (
              <Link
                href={nextItem.route}
                className="group flex flex-col items-end text-right"
              >
                <span className={`${vt323.className} text-zinc-500 text-lg mb-1`}>Next Article</span>
                <span className={`${vt323.className} text-2xl text-white group-hover:text-blue-400 transition-colors`}>
                  {nextItem.title} →
                </span>
              </Link>
            ) : (
              <div /> /* Spacer for when there is no next item, to keep Back to Home on left */
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

