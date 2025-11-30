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
  const githubUrl = pdfUrl(filename);
  const pdfSrc = githubUrl.startsWith('#') 
    ? `/pdfs/${filename}` 
    : githubUrl;

  return (
    <div className="relative min-h-dvh bg-black text-zinc-200">
      <NavBar />
      <StarryBackground />
      <div className="relative z-10 min-h-dvh pt-16">
        {/* Header with back button - positioned below NavBar */}
        <div className="fixed top-16 left-0 right-0 z-20 bg-black/80 backdrop-blur-md border-b border-white/10 px-6 py-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <Link
              href="/resources"
              className={`${vt323.className} text-lg text-zinc-400 underline decoration-zinc-500 hover:text-zinc-200 hover:decoration-zinc-300 transition-colors`}
            >
              ← Back to resources
            </Link>
            <h1 className={`${vt323.className} text-xl text-white hidden sm:block`}>
              {filename.replace('.pdf', '').replace(/_/g, ' ')}
            </h1>
            <div className="w-24"></div> {/* Spacer for centering */}
          </div>
        </div>

        {/* PDF Viewer */}
        <div className="w-full pt-16" style={{ height: 'calc(100dvh - 64px)' }}>
          <iframe
            src={pdfSrc}
            className="w-full h-full border-0"
            title={filename}
          />
        </div>
      </div>
    </div>
  );
}

