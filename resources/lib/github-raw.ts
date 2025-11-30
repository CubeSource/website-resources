/**
 * Generate a GitHub raw file URL for PDFs stored in the repository.
 * This uses GitHub's CDN, so it doesn't consume Vercel bandwidth.
 * 
 * Setup: Set NEXT_PUBLIC_GITHUB_REPO in your .env.local file (e.g., "username/repo")
 * 
 * @param filePath - Path to the file relative to the repository root (e.g., "public/pdfs/document.pdf")
 * @param branch - Git branch name (default: "main")
 * @param repo - Repository in format "username/repo" (optional, uses env var if not provided)
 * 
 * @example
 * // For a file at public/pdfs/nasa-standard.pdf
 * githubRawUrl("public/pdfs/nasa-standard.pdf")
 * // Returns: https://raw.githubusercontent.com/username/repo/main/public/pdfs/nasa-standard.pdf
 */
export function githubRawUrl(
  filePath: string,
  branch: string = "main",
  repo?: string
): string {
  const repository = repo || process.env.NEXT_PUBLIC_GITHUB_REPO;
  
  if (!repository || repository === "your-username/your-repo") {
    console.warn(
      "GitHub repo not configured. Set NEXT_PUBLIC_GITHUB_REPO in .env.local or pass repo parameter."
    );
    // Return a placeholder that will show an error - you should configure this
    return `#configure-github-repo:${filePath}`;
  }
  
  return `https://raw.githubusercontent.com/${repository}/${branch}/${filePath}`;
}

/**
 * Helper for PDFs stored in public/pdfs/
 */
export function pdfUrl(filename: string): string {
  return githubRawUrl(`public/pdfs/${filename}`);
}

