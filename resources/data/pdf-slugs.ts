/**
 * Mapping of URL slugs to PDF filenames
 * Add new PDFs here when you add them to the resources list
 */
export const pdfSlugMap: Record<string, string> = {
  "spacex-rideshare-payload-users-guide": "SpaceX_Rideshare_Payload_Users_Guide.pdf",
};

/**
 * Get PDF filename from slug, or return null if not found
 */
export function getPdfFilename(slug: string): string | null {
  return pdfSlugMap[slug] || null;
}

