import { SatelliteNetwork, CostData, SimSatellite, OrbitalParams, OrbitalPath } from './types';
import { SATELLITE_COUNTS_CSV, ORBITAL_PARAMETERS_CSV } from './constants';

export const parseCSV = (csv: string): SatelliteNetwork[] => {
  const lines = csv.trim().split('\n');
  const result: SatelliteNetwork[] = [];

  // Helper to handle quoted CSV fields containing commas
  const splitCSVLine = (line: string): string[] => {
    const matches = line.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g);
    // Fallback if regex misses simple splits
    if (!matches) return line.split(',');
    return matches.map(m => m.replace(/^"|"$/g, '').trim());
  };

  // Skip header (index 0)
  for (let i = 1; i < lines.length; i++) {
    const currentLine = lines[i];
    if (!currentLine) continue;
    
    // We can't just split by comma because of quoted fields like "500mA (Tx), 40mA (Idle)"
    // A simple regex approach for this specific dataset:
    // Split by comma ONLY if not inside quotes
    const row = currentLine.match(/(".*?"|[^",]+)(?=\s*,|\s*$)/g);
    
    if (row && row.length >= 7) {
        // Clean up quotes from the matched groups
        const cleanRow = row.map(val => val.replace(/^"|"$/g, '').trim());
        
        result.push({
          network: cleanRow[0],
          orbit: cleanRow[1],
          type: cleanRow[2],
          frequency: cleanRow[3],
          power: cleanRow[4],
          hardwareCost: cleanRow[5],
          serviceCost: cleanRow[6],
        });
    }
  }
  return result;
};

// Helper to extract numeric values from cost strings for charting
export const processCostData = (networks: SatelliteNetwork[]): CostData[] => {
  return networks.map(net => {
    // Parse Hardware Cost
    let minHw = 0;
    let maxHw = 0;
    const hwStr = net.hardwareCost.replace(/[$,]/g, ''); // Remove $ and ,
    
    if (hwStr.includes('-')) {
      const parts = hwStr.split('-');
      minHw = parseFloat(parts[0]);
      maxHw = parseFloat(parts[1]);
    } else if (hwStr.includes('+')) {
      minHw = parseFloat(hwStr.replace('+', ''));
      maxHw = minHw; // Treat as min for chart, maybe indicate it's open-ended
    } else {
      minHw = parseFloat(hwStr);
      maxHw = minHw;
    }

    // Parse Service Cost
    let serviceMonthly = 0;
    const svcStrLower = net.serviceCost.toLowerCase();
    
    if (svcStrLower === 'free') {
      serviceMonthly = 0;
    } else {
      // Normalize to monthly
      const isYearly = svcStrLower.includes('/yr') || svcStrLower.includes('/year');
      const isMin = svcStrLower.includes('/min');
      // Simple parsing, assuming typical format
      const cleanSvc = net.serviceCost.replace(/[$,]/g, '').replace(/\/mo|\/yr|\/year|\/min/g, '').replace('+', '');
      
      if (cleanSvc.includes('-')) {
        const parts = cleanSvc.split('-');
        const avg = (parseFloat(parts[0]) + parseFloat(parts[1])) / 2;
        serviceMonthly = isYearly ? avg / 12 : isMin ? avg * 60 : avg; // Rough estimate for min
      } else {
        const val = parseFloat(cleanSvc);
        serviceMonthly = isYearly ? val / 12 : isMin ? val * 60 : val;
      }
    }

    return {
      name: net.network,
      minHardware: isNaN(minHw) ? 0 : minHw,
      maxHardware: isNaN(maxHw) ? 0 : maxHw,
      monthlyService: isNaN(serviceMonthly) ? 0 : serviceMonthly,
      type: net.type
    };
  });
};

export const getCountsMap = (): Record<string, number> => {
  const lines = SATELLITE_COUNTS_CSV.trim().split('\n');
  const counts: Record<string, number> = {};

  // Skip header
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    const row = line.match(/(".*?"|[^",]+)(?=\s*,|\s*$)/g);
    
    if (row && row.length >= 3) {
      const name = row[0].replace(/^"|"$/g, '').trim();
      const countStr = row[2].replace(/^"|"$/g, '').trim();
      const count = parseInt(countStr.replace(/[^0-9]/g, ''), 10);
      if (!isNaN(count)) {
        counts[name] = count;
      }
    }
  }
  return counts;
}

export const parseOrbitalParams = (): OrbitalParams[] => {
  const lines = ORBITAL_PARAMETERS_CSV.trim().split('\n');
  const params: OrbitalParams[] = [];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    const row = line.match(/(".*?"|[^",]+)(?=\s*,|\s*$)/g);
    if (!row || row.length < 7) continue;

    const clean = row.map(v => v.replace(/^"|"$/g, '').trim());
    
    // Parse Altitude (take average if range, remove km, commas)
    let alt = 500;
    const altStr = clean[1].replace(/,/g, '').replace(' km', '').replace('*', '');
    if (altStr.includes('–') || altStr.includes('-')) {
      const parts = altStr.split(/[–-]/).map(p => parseFloat(p));
      alt = (parts[0] + parts[1]) / 2;
    } else {
      alt = parseFloat(altStr);
    }

    // Parse Inclination
    let inc = 0;
    const incStr = clean[2].replace('°', '').split(' ')[0].replace('*', ''); // Take number before text
    if (incStr.includes('–') || incStr.includes('-')) {
         const parts = incStr.split(/[–-]/).map(p => parseFloat(p));
         inc = (parts[0] + parts[1]) / 2;
    } else if (incStr.includes('~')) {
        inc = parseFloat(incStr.replace('~', ''));
    } else {
        inc = parseFloat(incStr);
    }
    
    // Parse Planes
    let planes: number | null = null;
    const planeStr = clean[3].replace('*', '');
    if (planeStr !== 'N/A' && !planeStr.includes('Varies')) {
        if (planeStr.includes('–') || planeStr.includes('-')) {
             const parts = planeStr.split(/[–-]/).map(p => parseFloat(p));
             planes = Math.round((parts[0] + parts[1]) / 2);
        } else {
            planes = parseInt(planeStr);
        }
    }

    // Parse Sats per Plane
    let satsPerPlane: number | null = null;
    const satsStr = clean[4].replace('*', '');
     if (satsStr !== 'N/A' && !satsStr.includes('Varies')) {
        if (satsStr.includes('–') || satsStr.includes('-')) {
             const parts = satsStr.split(/[–-]/).map(p => parseFloat(p));
             satsPerPlane = Math.round((parts[0] + parts[1]) / 2);
        } else {
            satsPerPlane = parseInt(satsStr);
        }
    }

    // Parse Period (String to Number min)
    let period = 96;
    const pStr = clean[5].toLowerCase();
    const numMatch = pStr.match(/[0-9.]+/);
    if (numMatch) {
        let val = parseFloat(numMatch[0]);
        if (pStr.includes('hour')) {
            val = val * 60;
        }
        period = val;
    }

    params.push({
      network: clean[0],
      altitudeKm: isNaN(alt) ? 500 : alt,
      inclinationDeg: isNaN(inc) ? 0 : inc,
      planes: isNaN(planes!) ? null : planes,
      satellitesPerPlane: isNaN(satsPerPlane!) ? null : satsPerPlane,
      periodMin: period,
      coverageStrategy: clean[6]
    });
  }
  return params;
}

export const generateSimulationData = (networks?: SatelliteNetwork[]): SimSatellite[] => {
  const allParams = parseOrbitalParams();
  let allSats: SimSatellite[] = [];
  allParams.forEach(p => {
    allSats = [...allSats, ...generateConstellation(p)];
  });
  return allSats;
};

// Shared color palette logic
const PALETTE = [
  '#22d3ee', '#f0abfc', '#a3e635', '#22d3ee', '#e879f9', '#a3e635',
  '#34985f', '#7F00FF', '#DA70D6', '#BF40BF', '#0FFF50'
];
const NETWORK_COLORS: Record<string, string> = {
  'Thuraya': '#0FFF50', 'Inmarsat': '#7F00FF', 'Globalstar': '#e879f9',
};

const getNetworkColor = (network: string): string => {
  if (NETWORK_COLORS[network]) return NETWORK_COLORS[network];
  let hash = 0;
  for (let i = 0; i < network.length; i++) {
    hash = network.charCodeAt(i) + ((hash << 5) - hash);
  }
  return PALETTE[Math.abs(hash) % PALETTE.length];
};

export const generateConstellation = (params: OrbitalParams): SimSatellite[] => {
  const satellites: SimSatellite[] = [];
  const countsMap = getCountsMap();
  const earthRadiusKm = 6371;
  const altRel = params.altitudeKm / earthRadiusKm;
  const color = getNetworkColor(params.network);
  
  const inclinationRad = (params.inclinationDeg * Math.PI) / 180;
  const meanMotion = (2 * Math.PI) / (params.periodMin || 100);

  // --- IRIDIUM SPECIAL LOGIC (Walker Star) ---
  if (params.network === 'Iridium') {
    const planes = 6;
    const satsPerPlane = 11;
    const planeSpacingDeg = 31.6;
    const phasingDeg = 10.909;

    for (let p = 0; p < planes; p++) {
        const raanDeg = p * planeSpacingDeg;
        const raanRad = (raanDeg * Math.PI) / 180;
        const planePhaseOffsetDeg = p * phasingDeg;
        const planePhaseOffsetRad = (planePhaseOffsetDeg * Math.PI) / 180;

        for (let s = 0; s < satsPerPlane; s++) {
            const meanAnomalyDeg = (s * 360) / satsPerPlane;
            const u0 = (meanAnomalyDeg * Math.PI / 180) + planePhaseOffsetRad;
            const sinLat = Math.sin(inclinationRad) * Math.sin(u0);
            const latRad = Math.asin(sinLat);
            const y = Math.cos(inclinationRad) * Math.sin(u0);
            const x = Math.cos(u0);
            const lngRad = raanRad + Math.atan2(y, x);
            const lat = (latRad * 180) / Math.PI;
            let lng = (lngRad * 180) / Math.PI;
            lng = ((lng + 540) % 360) - 180;

            satellites.push({
                lat: lat, lng: lng, alt: altRel, color: color,
                label: params.network, network: params.network,
                inclination: inclinationRad, raan: raanRad, u0: u0, meanMotion: meanMotion
            });
        }
    }
    return satellites;
  }

  // --- ONEWEB SPECIAL LOGIC (Walker Star - Polar) ---
  if (params.network === 'OneWeb') {
    // OneWeb Gen 1: ~648 sats, 12 planes, ~49 sats/plane.
    // Unlike Walker Delta (Mesh), Walker Star planes are distributed over 180 degrees.
    const planes = 12;
    const satsPerPlane = 49;
    
    // Spread planes over 180 degrees (one side of Earth), 
    // descending nodes will cover the other side.
    const planeSpacingDeg = 180 / planes; // 15 degrees

    // To avoid collision at the poles where planes cross, adjacent planes are phased.
    // We alternate phase for visual clarity.
    const phaseStepRad = (2 * Math.PI) / satsPerPlane;

    for (let p = 0; p < planes; p++) {
        const raanDeg = p * planeSpacingDeg;
        const raanRad = (raanDeg * Math.PI) / 180;
        
        // Offset odd planes by half a slot
        const planePhaseOffsetRad = (p % 2) * (phaseStepRad / 2);

        for (let s = 0; s < satsPerPlane; s++) {
            const meanAnomalyRad = (s * 2 * Math.PI) / satsPerPlane;
            const u0 = meanAnomalyRad + planePhaseOffsetRad;

            const sinLat = Math.sin(inclinationRad) * Math.sin(u0);
            const latRad = Math.asin(sinLat);
            
            const y = Math.cos(inclinationRad) * Math.sin(u0);
            const x = Math.cos(u0);
            const lngRad = raanRad + Math.atan2(y, x);
            
            const lat = (latRad * 180) / Math.PI;
            let lng = (lngRad * 180) / Math.PI;
            lng = ((lng + 540) % 360) - 180;

            satellites.push({
                lat: lat, lng: lng, alt: altRel, color: color,
                label: params.network, network: params.network,
                inclination: inclinationRad, raan: raanRad, u0: u0, meanMotion: meanMotion
            });
        }
    }
    return satellites;
  }

  // --- GENERIC LOGIC (Walker Delta / Mesh) ---
  let totalCount = countsMap[params.network] || 100;
  
  // Performance Cap for Object rendering
  const MAX_SATELLITES = 1500;
  if (totalCount > MAX_SATELLITES) {
      totalCount = MAX_SATELLITES;
  }

  // Generation Logic
  const planes = params.planes || Math.max(1, Math.floor(Math.sqrt(totalCount)));
  const satsPerPlane = params.satellitesPerPlane || Math.ceil(totalCount / planes);
  
  let effPlanes = planes;
  let effSatsPerPlane = satsPerPlane;

  if (totalCount > (planes * satsPerPlane) * 1.5 && params.planes !== null) {
      const factor = Math.sqrt(totalCount / (planes * satsPerPlane));
      effPlanes = Math.ceil(planes * factor);
      effSatsPerPlane = Math.ceil(satsPerPlane * factor);
  } else if (params.planes === null && params.altitudeKm > 30000) {
      // GEO case
      effPlanes = 1;
      effSatsPerPlane = totalCount;
  }

  for (let p = 0; p < effPlanes; p++) {
    // Walker Delta default: equidistant RAAN over 360 degrees
    const raan = (2 * Math.PI * p) / effPlanes;
    
    // Add phase offset to stagger satellites between planes (Walker Delta like)
    const phaseOffset = (2 * Math.PI * p) / (effPlanes * 2); 

    for (let s = 0; s < effSatsPerPlane; s++) {
      // Initial Argument of Latitude
      const u0 = (2 * Math.PI * s) / effSatsPerPlane + phaseOffset;
      
      // Calculate initial position for t=0
      // We still need lat/lng for initial render
      const sinLat = Math.sin(inclinationRad) * Math.sin(u0);
      const latRad = Math.asin(sinLat);
      
      const y = Math.cos(inclinationRad) * Math.sin(u0);
      const x = Math.cos(u0);
      const lngRad = raan + Math.atan2(y, x);
      
      const lat = (latRad * 180) / Math.PI;
      let lng = (lngRad * 180) / Math.PI;
      lng = ((lng + 540) % 360) - 180;

      // No jitter for equidistant spacing
      satellites.push({
        lat: lat,
        lng: lng,
        alt: altRel,
        color: color,
        label: params.network,
        network: params.network,
        inclination: inclinationRad,
        raan: raan,
        u0: u0,
        meanMotion: meanMotion
      });
      
      if (satellites.length >= totalCount) break;
    }
    if (satellites.length >= totalCount) break;
  }
  
  return satellites;
};

export const generateOrbitalPaths = (params: OrbitalParams): OrbitalPath[] => {
  const paths: OrbitalPath[] = [];
  const countsMap = getCountsMap();
  let totalCount = countsMap[params.network] || 100;
  
  const earthRadiusKm = 6371;
  const altRel = params.altitudeKm / earthRadiusKm;
  const color = getNetworkColor(params.network);
  
  const planes = params.planes || Math.max(1, Math.floor(Math.sqrt(totalCount)));
  const satsPerPlane = params.satellitesPerPlane || Math.ceil(totalCount / planes);
  
  let effPlanes = planes;
  
  if (totalCount > (planes * satsPerPlane) * 1.5 && params.planes !== null) {
      const factor = Math.sqrt(totalCount / (planes * satsPerPlane));
      effPlanes = Math.ceil(planes * factor);
  } else if (params.planes === null && params.altitudeKm > 30000) {
      effPlanes = 1; // GEO ring
  }

  // Cap planes for visualization to avoid mess
  if (effPlanes > 100) effPlanes = 100; 
  
  const inclinationRad = (params.inclinationDeg * Math.PI) / 180;
  const segments = 120; // smoothness

  for (let p = 0; p < effPlanes; p++) {
    const raan = (2 * Math.PI * p) / effPlanes;
    const coords: [number, number, number][] = [];
    
    for (let i = 0; i <= segments; i++) {
        const u = (2 * Math.PI * i) / segments;
        
        const sinLat = Math.sin(inclinationRad) * Math.sin(u);
        const latRad = Math.asin(sinLat);
        
        const y = Math.cos(inclinationRad) * Math.sin(u);
        const x = Math.cos(u);
        const lngRad = raan + Math.atan2(y, x);
        
        const lat = (latRad * 180) / Math.PI;
        let lng = (lngRad * 180) / Math.PI;
        lng = ((lng + 540) % 360) - 180;
        
        coords.push([lat, lng, altRel]);
    }
    
    paths.push({
        coords,
        color
    });
  }
  
  return paths;
};