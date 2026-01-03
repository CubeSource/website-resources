
export const RAW_CSV_DATA = `Network,Orbit,Type,Frequency,Power,Hardware_Cost,Service_Cost
Iridium,LEO,IoT,L-Band (1616 – 1626.5 MHz),"Tx: 0.8 W, Rx: 195 mW",$200 - $600,$15-20/mo
Orbcomm,LEO,IoT,VHF (148 MHz Tx / 137 MHz Rx),"Tx: 5.3 W, Rx: 230 mW",$100 - $200,$5-20/mo
Globalstar,LEO,IoT,S-Band (1610 MHz Tx / 2483 MHz Rx),Tx: 1.1 W,$50 - $100,$5-12/mo
Kinéis,LEO,IoT,UHF (401 MHz Tx / 460 MHz Rx),Tx: 2.5 W,$20 - $50,$5-10/mo
Starlink,LEO,Broadband,Ku-Band (14 GHz Tx / 10-12 GHz Rx),"Tx: 75 W, Rx: 20 W",$599+,$120/mo
OneWeb,LEO,Broadband,Ku-Band (14 GHz Tx / 10-12 GHz Rx),"Tx: 150 W, Rx: 40 W",$9000+,$575+/mo
Inmarsat,GEO,Broadband,L-Band (1.6 GHz Tx / 1.5 GHz Rx),"Tx: 65 W, Rx: 3 W",$2500+,$50-100/mo
Thuraya,GEO,Voice,L-Band (1.6 GHz Tx / 1.5 GHz Rx),"Tx: 1.5 W, Rx: 110 mW",$500 - $800,$1.50/min
GPS,MEO,Positioning,"L1: 1575.42 MHz, L2: 1227.60 MHz, L5: 1176.45 MHz",Rx: 25 mW,$5 - $10,Free
Galileo,MEO,Positioning,"E1: 1575.42 MHz, E5a: 1176.45 MHz, E5b: 1207.14 MHz, E6: 1278.75 MHz",Rx: 25 mW,$5 - $10,Free
GLONASS,MEO,Positioning,"G1: 1602 MHz (+ offsets), G2: 1246 MHz (+ offsets), G3: 1202.025 MHz",Rx: 25 mW,$5 - $10,Free`;

export const SATELLITE_COUNTS_CSV = `Network,Orbit,Estimated Count,Status / Notes
Starlink,LEO,"9,384","Adding ~40-50 per week; target is 12,000+"
OneWeb,LEO,654,Completed Gen 1 constellation
Iridium,LEO,66,Plus ~9 in-orbit spares (75 total active)
GPS,MEO,31,Requires min. 24 for global coverage
Galileo,MEO,27,EU precision navigation system
GLONASS,MEO,26,Russian navigation system
Kinéis,LEO,25,Newly completed IoT constellation (2025)
Globalstar,LEO,24,2nd Generation fleet
Orbcomm,LEO,~18,IoT messaging satellites
Inmarsat,GEO,~14,"Includes I-4, I-5 (GX), and I-6 fleets"
Thuraya,GEO,3,"Thuraya-2, 3, and the new Thuraya-4"`;

export const ORBITAL_PARAMETERS_CSV = `Network,Altitude (km),Inclination (°),Planes,Satellites per Plane,Period (min),Coverage Strategy
Iridium,780 km,86.4° (Polar),6,11,~100 min,Global (100%): Polar orbits ensure coverage even at N/S poles.
Orbcomm,750 km,52°,3–4,6–8,~100 min,Mid-Latitude: Optimized for populated zones; weaker at poles.
Globalstar,"1,414 km",52°,8,6,~114 min,Mid-Latitude: Higher altitude means fewer satellites needed (bigger footprint per satellite).
Kinéis,650 km,98° (SSO),5,5,~98 min,Global: Evenly spaced polar planes for consistent revisit times.
Starlink,550 km*,53°*,72*,22*,~96 min,"Dense Mesh: Low altitude requires massive density. Note: Data for primary ""Shell 1"" which covers most users."
OneWeb,"1,200 km",87.9° (Polar),12,49,~109 min,"Global: High inclination ensures strong coverage at high latitudes (e.g., Alaska, Canada, N. Europe)."
Inmarsat,"35,786 km",~0° (Equatorial),N/A,N/A,24 hours,"Fixed: Satellite moves at same speed as Earth's rotation, appearing stationary."
Thuraya,"35,786 km",~6° (Inclined),N/A,N/A,24 hours,Regional: Uses inclined geosynchronous orbit to improve look-angles for Europe/Asia.
GPS,"20,200 km",55°,6,4–5,~12 hours,Global: 6 planes allow you to see at least 4 satellites from anywhere on Earth at any time.
Galileo,"23,222 km",56°,3,8–10,~14 hours,"Global: Higher altitude than GPS provides better visibility in ""urban canyons"" (cities)."
GLONASS,"19,100 km",64.8°,3,8,~11 hours,High Latitude Focus: High inclination (65°) makes it the most reliable GNSS for Russia/Arctic.`;
