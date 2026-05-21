/**
 * Mapping of URL slugs to PDF filenames
 * Add new PDFs here when you add them to the resources list
 */
export const pdfSlugMap: Record<string, string> = {
  "spacex-rideshare-payload-users-guide": "SpaceX_Rideshare_Payload_Users_Guide.pdf",
  "instar-vibration-testing-part-1": "Instar_Vibration_Testing_of_Small_Satellites_Part_1.pdf",
  "instar-vibration-testing-part-2": "Instar_Vibration_Testing_of_Small_Satellites_Part_2.pdf",
  "comparison-high-performance-fibers": "Comparison of High-Performance Fibers.pdf",
  "cds-rev14": "CDS+REV14_1+2022-02-09.pdf",
  "basics-thermal-resistance-heat-dissipation": "basics_of_thermal_resistance_and_heat_dissipation_an-e.pdf",
  "atomic-oxygen-interactions": "Atomic oxygen interactions .pdf",
  "radiation-for-electronics" : "Radiation_Handbook.pdf",
  "soa-2023": "soa-2023.pdf",
};

/**
 * Get PDF filename from slug, or return null if not found
 */
export function getPdfFilename(slug: string): string | null {
  return pdfSlugMap[slug] || null;
}

