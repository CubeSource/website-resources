"use client";

import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  ZAxis,
  Cell
} from 'recharts';
import { CostData } from '../types';

interface Props {
  data: CostData[];
}

export const CostCharts: React.FC<Props> = ({ data }) => {
  // Filter out free services or anomalies for cleaner log scale charts if needed
  // For now, linear scale with some domain adjustment is fine.
  
  // Color palette for types
  const getColor = (type: string) => {
    if (type.toLowerCase().includes('broadband')) return '#22c55e'; // Green
    if (type.toLowerCase().includes('iot')) return '#a855f7'; // Purple
    return '#3b82f6'; // Blue
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="rounded-lg border border-slate-700 bg-slate-900 p-3 shadow-xl backdrop-blur-md">
          <p className="mb-1 font-semibold text-white">{label || payload[0].payload.name}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: <span className="font-mono text-slate-200">${entry.value.toLocaleString()}</span>
            </p>
          ))}
          <p className="mt-1 text-xs text-slate-500">{payload[0].payload.type}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-8">
      {/* Hardware Cost Chart */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-6 shadow-sm">
        <h3 className="mb-6 text-lg font-semibold text-slate-100">Estimated Hardware Cost Comparison</h3>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
              <XAxis 
                dataKey="name" 
                stroke="#64748b" 
                tick={{ fill: '#94a3b8', fontSize: 12 }} 
                angle={-45}
                textAnchor="end"
                interval={0}
              />
              <YAxis 
                stroke="#64748b" 
                tick={{ fill: '#94a3b8', fontSize: 12 }}
                label={{ value: 'Cost (USD)', angle: -90, position: 'insideLeft', fill: '#64748b' }} 
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255, 255, 255, 0.05)' }} />
              <Legend wrapperStyle={{ paddingTop: '20px' }} />
              <Bar name="Min Hardware Cost" dataKey="minHardware" fill="#06b6d4" radius={[4, 4, 0, 0]} maxBarSize={50} />
              <Bar name="Max Hardware Cost" dataKey="maxHardware" fill="#0891b2" radius={[4, 4, 0, 0]} maxBarSize={50} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Service Cost Scatter Plot */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-6 shadow-sm">
        <h3 className="mb-6 text-lg font-semibold text-slate-100">Monthly Service Cost vs. Hardware Cost</h3>
        <p className="mb-4 text-sm text-slate-400">Comparing ongoing operational costs against initial investment.</p>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart
              margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis 
                type="number" 
                dataKey="minHardware" 
                name="Hardware Cost" 
                stroke="#64748b"
                tick={{ fill: '#94a3b8' }}
                label={{ value: 'Hardware Cost ($)', position: 'bottom', fill: '#64748b', offset: 0 }}
              />
              <YAxis 
                type="number" 
                dataKey="monthlyService" 
                name="Monthly Service" 
                stroke="#64748b"
                tick={{ fill: '#94a3b8' }}
                label={{ value: 'Monthly Service ($)', angle: -90, position: 'insideLeft', fill: '#64748b' }}
              />
              <ZAxis type="category" dataKey="name" name="Network" />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} content={<CustomTooltip />} />
              <Scatter name="Networks" data={data} fill="#8884d8">
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={getColor(entry.type)} />
                ))}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
        </div>
         <div className="mt-4 flex flex-wrap gap-4 text-xs text-slate-400 justify-center">
            <div className="flex items-center gap-2">
                <span className="block h-3 w-3 rounded-full bg-green-500"></span> Broadband
            </div>
            <div className="flex items-center gap-2">
                <span className="block h-3 w-3 rounded-full bg-purple-500"></span> IoT / LEO
            </div>
            <div className="flex items-center gap-2">
                <span className="block h-3 w-3 rounded-full bg-blue-500"></span> Positioning / Other
            </div>
        </div>
      </div>
    </div>
  );
};