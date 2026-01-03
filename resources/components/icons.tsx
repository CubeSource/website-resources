"use client";

import React from 'react';

type IconProps = { size?: number; className?: string };

const make = (render: React.ReactNode) => ({ size = 16, className = '' }: IconProps) => (
  <span className={className} style={{ display: 'inline-flex', width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
    {render}
  </span>
);

export const Globe = make(
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="100%" height="100%"><circle cx="12" cy="12" r="9" strokeLinecap="round" strokeLinejoin="round"/><path d="M2 12h20" strokeLinecap="round" strokeLinejoin="round"/></svg>
);

export const Navigation = make(
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="100%" height="100%"><path d="M3 11l18-8-8 18-3-7-7-3z" strokeLinecap="round" strokeLinejoin="round"/></svg>
);

export const Info = make(<svg viewBox="0 0 24 24" width="100%" height="100%" stroke="currentColor" strokeWidth="1.5" fill="none"><circle cx="12" cy="12" r="9"/><path d="M12 8v.01M12 12v4" strokeLinecap="round" strokeLinejoin="round"/></svg>);

export const Layers = make(<svg viewBox="0 0 24 24" width="100%" height="100%" stroke="currentColor" strokeWidth="1.5" fill="none"><path d="M21 16l-9 5-9-5 9-5 9 5z" strokeLinecap="round" strokeLinejoin="round"/><path d="M21 8l-9 5-9-5" strokeLinecap="round" strokeLinejoin="round"/></svg>);

export const Zap = make(<svg viewBox="0 0 24 24" width="100%" height="100%" stroke="currentColor" strokeWidth="1.5" fill="none"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" strokeLinecap="round" strokeLinejoin="round"/></svg>);

export const Orbit = make(<svg viewBox="0 0 24 24" width="100%" height="100%" stroke="currentColor" strokeWidth="1.5" fill="none"><circle cx="12" cy="12" r="3"/><path d="M2 12c4-6 14-6 20 0" strokeLinecap="round" strokeLinejoin="round"/></svg>);

export const Lightbulb = make(<svg viewBox="0 0 24 24" width="100%" height="100%" stroke="currentColor" strokeWidth="1.5" fill="none"><path d="M9 18h6M10 22h4M12 2a6 6 0 00-4 10v2h8v-2a6 6 0 00-4-10z" strokeLinecap="round" strokeLinejoin="round"/></svg>);

export const ArrowUpDown = make(<svg viewBox="0 0 24 24" width="100%" height="100%" stroke="currentColor" strokeWidth="1.5" fill="none"><path d="M12 3v12M8 7l4-4 4 4M12 21v-12M8 17l4 4 4-4" strokeLinecap="round" strokeLinejoin="round"/></svg>);

export const Wifi = make(<svg viewBox="0 0 24 24" width="100%" height="100%" stroke="currentColor" strokeWidth="1.5" fill="none"><path d="M5 12a11 11 0 0114 0M8 15a6 6 0 018 0M11 18a2 2 0 012 0" strokeLinecap="round" strokeLinejoin="round"/></svg>);

export const DollarSign = make(<svg viewBox="0 0 24 24" width="100%" height="100%" stroke="currentColor" strokeWidth="1.5" fill="none"><path d="M12 1v22M17 5H9a3 3 0 100 6h6a3 3 0 010 6H7" strokeLinecap="round" strokeLinejoin="round"/></svg>);

export const Signal = make(<svg viewBox="0 0 24 24" width="100%" height="100%" stroke="currentColor" strokeWidth="1.5" fill="none"><path d="M2 20h.01M7 16v4M12 11v9M17 6v14M22 3v17" strokeLinecap="round" strokeLinejoin="round"/></svg>);

export const Activity = make(<svg viewBox="0 0 24 24" width="100%" height="100%" stroke="currentColor" strokeWidth="1.5" fill="none"><path d="M3 12h3l3 8 4-16 3 8h4" strokeLinecap="round" strokeLinejoin="round"/></svg>);

export const X = make(<svg viewBox="0 0 24 24" width="100%" height="100%" stroke="currentColor" strokeWidth="1.5" fill="none"><path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round"/></svg>);

export default {
  Globe, Navigation, Info, Layers, Zap, Orbit, Lightbulb,
  ArrowUpDown, Wifi, DollarSign, Signal, Activity, X
};
