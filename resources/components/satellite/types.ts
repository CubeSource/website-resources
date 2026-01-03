
export interface SatelliteNetwork {
  network: string;
  orbit: string;
  type: string;
  frequency: string;
  power: string;
  hardwareCost: string;
  serviceCost: string;
}

export interface CostData {
  name: string;
  minHardware: number;
  maxHardware: number;
  monthlyService: number; // Normalized to monthly
  type: string;
}

export interface SimSatellite {
  lat: number;
  lng: number;
  alt: number;
  color: string;
  label: string;
  network: string;
  // Animation props
  inclination: number; // radians
  raan: number; // radians
  u0: number; // initial argument of latitude (radians)
  meanMotion: number; // radians per minute
}

export interface OrbitalParams {
  network: string;
  altitudeKm: number;
  inclinationDeg: number;
  planes: number | null; // null if Varies or N/A
  satellitesPerPlane: number | null;
  periodMin: number; // Changed to number for animation math
  coverageStrategy: string;
}

export interface OrbitalPath {
  coords: [number, number, number][]; // lat, lng, alt
  color: string;
}
