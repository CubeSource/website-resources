'use client';

import Link from "next/link";
import { useParams } from "next/navigation";
import StarryBackground from "../../../../components/StarryBackground";
import NavBar from "../../../../components/Nav";
import { getPdfFilename } from "../../../../data/pdf-slugs";
import { pdfUrl } from "../../../../lib/github-raw";
import { vt323 } from "../../../../lib/fonts";

export default function PdfViewerPage() {
  const params = useParams();
  const slug = params.slug as string;
  const filename = getPdfFilename(slug);

  if (!filename) {
    return (
      <div className="relative min-h-dvh bg-black text-zinc-200">
        <NavBar />
        <StarryBackground />
        <div className="relative z-10 flex min-h-dvh items-center justify-center py-24 px-6">
          <div className="text-center">
            <h1 className={`${vt323.className} text-4xl text-white mb-4`}>
              PDF Not Found
            </h1>
            <p className="text-zinc-400 mb-6">
              The requested document could not be found.
            </p>
            <Link
              href="/resources"
              className={`${vt323.className} text-lg text-zinc-400 underline decoration-zinc-500 hover:text-zinc-200 hover:decoration-zinc-300 transition-colors`}
            >
              ← Back to resources
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Use GitHub raw URL if configured, otherwise fall back to local public path
  // TODO: Configure NEXT_PUBLIC_GITHUB_REPO to avoid Vercel bandwidth usage
  const githubUrl = pdfUrl(filename);
  const pdfSrc = githubUrl.startsWith('#') 
    ? `/pdfs/${filename}` 
    : githubUrl;

  // TODO: Re-enable this check once GitHub repo is configured
  // // Check if GitHub repo is configured
  // if (pdfSrc.startsWith('#')) {
  //   return (
  //     <div className="relative min-h-dvh bg-black text-zinc-200">
  //       <NavBar />
  //       <StarryBackground />
  //       <div className="relative z-10 flex min-h-dvh items-center justify-center py-24 px-6">
  //         <div className="text-center max-w-2xl">
  //           <h1 className={`${vt323.className} text-4xl text-white mb-4`}>
  //             Configuration Required
  //           </h1>
  //           <p className="text-zinc-400 mb-6">
  //             GitHub repository not configured. To serve PDFs without consuming Vercel bandwidth, 
  //             set <code className="text-zinc-300">NEXT_PUBLIC_GITHUB_REPO</code> in your <code className="text-zinc-300">.env.local</code> file 
  //             (e.g., &quot;username/repo&quot;).
  //           </p>
  //           <Link
  //             href="/resources"
  //             className={`${vt323.className} text-lg text-zinc-400 underline decoration-zinc-500 hover:text-zinc-200 hover:decoration-zinc-300 transition-colors`}
  //           >
  //             ← Back to resources
  //           </Link>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className="relative min-h-dvh bg-black text-zinc-200">
      <NavBar />
      <StarryBackground />
      <div className="relative z-10 min-h-dvh pt-16">
        {/* Header with back button and title */}
        <div className="relative bg-black/50 backdrop-blur-sm border-b border-white/10 px-6 py-6">
          <div className="max-w-6xl mx-auto">
            <Link
              href="/resources"
              className={`${vt323.className} text-lg text-zinc-400 underline decoration-zinc-500 hover:text-zinc-200 hover:decoration-zinc-300 transition-colors inline-block mb-3`}
            >
              ← Back to resources
            </Link>
            <div className="flex items-center justify-between gap-4">
              <h1 className={`${vt323.className} text-2xl sm:text-3xl text-white`}>
                {filename.replace('.pdf', '').replace(/_/g, ' ')}
              </h1>
              <a
                href={pdfSrc}
                download={filename}
                className={`${vt323.className} text-lg px-4 py-2 bg-zinc-800/50 border border-white/20 rounded hover:bg-zinc-700/50 hover:border-white/30 text-zinc-300 hover:text-white transition-colors whitespace-nowrap`}
              >
                Download
              </a>
            </div>
          </div>
        </div>

        {/* PDF Viewer Container */}
        <div className="py-8 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="bg-zinc-900/50 border border-white/10 rounded-lg overflow-hidden shadow-2xl" style={{ height: '85vh' }}>
              <iframe
                src={pdfSrc}
                className="w-full h-full border-0"
                title={filename}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

