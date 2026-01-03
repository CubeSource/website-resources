"use client";

import React, { useState, useMemo } from 'react';
import { SatelliteNetwork } from '../types';
import { ArrowUpDown, Zap, Wifi, DollarSign, Signal, Globe, Activity, X } from 'lucide-react';

interface Props {
  data: SatelliteNetwork[];
  selectedNetwork: string;
  onSelectNetwork: (network: string) => void;
}

const BAND_LEGEND = [
    { label: 'VHF', range: '30 - 300 MHz', color: 'bg-fuchsia-900/30 text-fuchsia-300 ring-1 ring-inset ring-fuchsia-700/50' },
    { label: 'UHF', range: '300 MHz - 1 GHz', color: 'bg-indigo-900/30 text-indigo-300 ring-1 ring-inset ring-indigo-700/50' },
    { label: 'L-Band', range: '1 - 2 GHz', color: 'bg-blue-900/30 text-blue-300 ring-1 ring-inset ring-blue-700/50' },
    { label: 'S-Band', range: '2 - 4 GHz', color: 'bg-sky-900/30 text-sky-300 ring-1 ring-inset ring-sky-700/50' },
    { label: 'Ku-Band', range: '12 - 18 GHz', color: 'bg-emerald-500/15 text-emerald-200 ring-1 ring-inset ring-emerald-500/30' },
];

const getBandStyle = (raw: string) => {
    if (raw.includes('Ku-Band')) return BAND_LEGEND[4].color;
    if (raw.includes('L/S-Band')) return 'bg-gradient-to-r from-blue-900/30 to-sky-900/30 text-sky-100 ring-1 ring-inset ring-blue-700/50';
    if (raw.includes('L-Band')) return BAND_LEGEND[2].color;
    if (raw.includes('S-Band')) return BAND_LEGEND[3].color;
    if (raw.includes('VHF')) return BAND_LEGEND[0].color;
    if (raw.includes('UHF')) return BAND_LEGEND[1].color;
    if (raw.includes('L1') || raw.includes('E1') || raw.includes('G1')) return BAND_LEGEND[2].color;
    return 'bg-slate-800 text-slate-300 ring-1 ring-inset ring-slate-700';
}

const getTxRx = (power: string) => {
    if (!power) return { tx: 'N/A', rx: 'N/A' };
    
    let tx = 'N/A';
    let rx = 'N/A';
    const p = power;

    // Extract Tx
    const txMatch = p.match(/Tx:\s*([^,]+)/i);
    if (txMatch) {
        tx = txMatch[1].trim();
    }
    
    // Extract Rx
    const rxMatch = p.match(/Rx:\s*([^,]+)/i);
    if (rxMatch) {
        rx = rxMatch[1].trim();
    }
    
    return { tx, rx };
};

const formatDisplayPower = (val: string): string => {
    if (!val || val === 'N/A' || val === '-') return 'N/A';
    
    const lower = val.toLowerCase();
    const numMatch = lower.match(/([0-9.]+)/);
    if (!numMatch) return val;
    
    const num = parseFloat(numMatch[1]);
    
    if (lower.includes('mw')) {
        return `${num} mW`;
    }
    
    if (lower.includes('w')) {
        if (num < 1) {
            return `${num * 1000} mW`;
        }
        return `${num} W`;
    }
    
    return val;
};

const parsePowerVal = (val: string): number => {
    if (!val || val === 'N/A' || val === '-') return -1;
    const num = parseFloat(val.replace(/[^0-9.]/g, ''));
    if (isNaN(num)) return -1;
    if (val.toLowerCase().includes('mw')) return num; // Base unit mW
    if (val.toLowerCase().includes('w')) return num * 1000; // Convert W to mW
    return num;
};

const getFrequencyRank = (raw: string) => {
    const r = raw || '';
    if (r.includes('VHF')) return 1;
    if (r.includes('UHF')) return 2;
    if (r.includes('L-Band')) return 3;
    if (r.includes('L1') || r.includes('E1') || r.includes('G1')) return 3;
    if (r.includes('L/S-Band')) return 4;
    if (r.includes('S-Band')) return 4;
    if (r.includes('Ku-Band')) return 5;
    return 6;
};

export const SatelliteTable: React.FC<Props> = ({ data, selectedNetwork, onSelectNetwork }) => {
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const handleSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const toggleFilter = (label: string) => {
    setActiveFilters(prev => 
      prev.includes(label) 
        ? [] // Deselect if clicked again
        : [label] // Select only the clicked one
    );
  };

  const clearFilters = () => setActiveFilters([]);

  const filteredData = useMemo(() => {
    if (activeFilters.length === 0) return data;

    return data.filter(row => {
        const freq = row.frequency || '';
        return activeFilters.some(filter => {
            if (filter === 'VHF' && freq.includes('VHF')) return true;
            if (filter === 'UHF' && freq.includes('UHF')) return true;
            if (filter === 'L-Band' && (freq.includes('L-Band') || freq.includes('L1') || freq.includes('E1') || freq.includes('G1'))) return true;
            if (filter === 'S-Band' && (freq.includes('S-Band'))) return true;
            if (filter === 'Ku-Band' && freq.includes('Ku-Band')) return true;
            return false;
        });
    });
  }, [data, activeFilters]);

  const sortedData = useMemo(() => {
    return [...filteredData].sort((a, b) => {
        if (!sortConfig) {
            return getFrequencyRank(a.frequency) - getFrequencyRank(b.frequency);
        }
        
        const key = sortConfig.key;
        const dir = sortConfig.direction === 'asc' ? 1 : -1;

        if (key === 'txPower' || key === 'rxPower') {
            const pA = getTxRx(a.power);
            const pB = getTxRx(b.power);
            const valA = parsePowerVal(key === 'txPower' ? pA.tx : pA.rx);
            const valB = parsePowerVal(key === 'txPower' ? pB.tx : pB.rx);
            return (valA - valB) * dir;
        }

        const aVal = (a as any)[key]?.toString().toLowerCase() || '';
        const bVal = (b as any)[key]?.toString().toLowerCase() || '';
        
        const aNum = parseFloat(aVal.replace(/[^0-9.-]+/g,""));
        const bNum = parseFloat(bVal.replace(/[^0-9.-]+/g,""));

        if (!isNaN(aNum) && !isNaN(bNum) && key.toLowerCase().includes('cost')) {
        return (aNum - bNum) * dir;
        }

        if (aVal < bVal) return -1 * dir;
        if (aVal > bVal) return 1 * dir;
        return 0;
    });
  }, [filteredData, sortConfig]);

  return (
    <div className="space-y-6">
      
      {activeFilters.length > 0 && (
        <div className="flex items-center justify-between px-1">
            <span className="text-sm text-slate-400">
                Showing {sortedData.length} networks matching <span className="text-slate-200 font-medium">{activeFilters.join(', ')}</span>
            </span>
            <button 
                onClick={clearFilters}
                className="flex items-center gap-1 text-xs font-medium text-slate-500 hover:text-slate-300 transition-colors bg-slate-900/50 px-2 py-1 rounded-md border border-slate-800"
            >
                <X size={12} /> Clear Filters
            </button>
        </div>
      )}

      <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900/40 shadow-xl">
        <div className="overflow-x-auto">
          <table className="min-w-full text-center text-sm whitespace-nowrap">
            <thead className="bg-slate-900/80 text-xs uppercase tracking-wider text-slate-400 backdrop-blur-sm">
              <tr>
                {[
                  { key: 'network', label: 'Network', icon: <Signal size={12} className="mr-1" /> },
                  { key: 'type', label: 'Type', icon: <Wifi size={12} className="mr-1" /> },
                  { key: 'orbit', label: 'Orbit', icon: <Globe size={12} className="mr-1" /> },
                  { key: 'txPower', label: 'Tx Power', icon: <Zap size={12} className="mr-1" /> },
                  { key: 'rxPower', label: 'Rx Power', icon: <Activity size={12} className="mr-1" /> },
                  { key: 'hardwareCost', label: 'H/W Cost', icon: <DollarSign size={12} className="mr-1" /> },
                  { key: 'serviceCost', label: 'Svc Cost', icon: <DollarSign size={12} className="mr-1" /> },
                ].map((col) => (
                  <th
                    key={col.key}
                    scope="col"
                    className="cursor-pointer px-6 py-3 font-semibold hover:bg-slate-800 hover:text-cyan-400 transition-colors"
                    onClick={() => handleSort(col.key)}
                  >
                    <div className="flex items-center justify-center">
                      {col.icon}
                      {col.label}
                      <ArrowUpDown size={12} className="ml-1 opacity-50" />
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {sortedData.length > 0 ? (
                sortedData.map((row, idx) => {
                  const { tx, rx } = getTxRx(row.power);
                  const bandStyle = getBandStyle(row.frequency);
                  const isSelected = row.network === selectedNetwork;
                  
                  return (
                    <tr 
                        key={idx} 
                        onClick={() => onSelectNetwork(row.network)}
                        className={`group cursor-pointer transition-all duration-200 border-l-4 
                          ${isSelected 
                            ? 'bg-blue-900/30 border-cyan-400 shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)]' 
                            : 'border-transparent hover:bg-slate-800/50 hover:border-slate-700'
                          }`}
                    >
                        <td className="px-6 py-2 font-medium text-slate-200">
                           <div className="flex justify-center">
                               <span className={`inline-flex w-24 items-center justify-center rounded-md py-1 text-sm font-medium transition-all ${bandStyle} ${isSelected ? 'ring-2 ring-cyan-500/50 scale-105' : ''}`}>
                                    {row.network}
                                </span>
                           </div>
                        </td>
                        <td className="px-6 py-2 text-slate-300">
                            {row.type}
                        </td>
                        <td className="px-6 py-2 text-slate-300">
                            {row.orbit}
                        </td>
                        <td className="px-6 py-2 text-slate-300 font-mono">
                            {formatDisplayPower(tx)}
                        </td>
                         <td className="px-6 py-2 text-slate-300 font-mono">
                            {formatDisplayPower(rx)}
                        </td>
                        <td className="px-6 py-2 font-medium text-cyan-300">{row.hardwareCost}</td>
                        <td className="px-6 py-2 font-medium text-emerald-300">{row.serviceCost}</td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-slate-500">
                    <div className="flex flex-col items-center justify-center gap-2">
                        <Wifi size={24} className="opacity-20" />
                        <p>No networks found matching the selected filters.</p>
                        <button 
                            onClick={clearFilters}
                            className="text-cyan-400 hover:underline text-xs mt-1"
                        >
                            Clear filters
                        </button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5 pt-2">
        {BAND_LEGEND.map((band) => {
            const isSelected = activeFilters.includes(band.label);
            const isDimmed = activeFilters.length > 0 && !isSelected;

            return (
                <button
                    key={band.label}
                    onClick={() => toggleFilter(band.label)}
                    className={`relative flex flex-col items-center justify-center rounded-md px-2 py-1.5 text-center transition-all duration-300 outline-none
                        ${band.color}
                        ${isDimmed ? 'opacity-40 scale-95 grayscale-[0.3]' : 'opacity-100 shadow-lg scale-100 hover:scale-[1.03]'}
                        ${isSelected ? 'ring-2 ring-white/20 ring-offset-2 ring-offset-slate-950 z-10' : 'hover:ring-1 hover:ring-white/10'}
                    `}
                >
                    <div className="text-xs font-bold uppercase tracking-wider opacity-90 leading-none mb-1">{band.label}</div>
                    <div className="text-sm font-bold font-mono leading-none opacity-80">{band.range}</div>
                </button>
            );
        })}
      </div>
    </div>
  );
};