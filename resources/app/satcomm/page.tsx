"use client";
import React from 'react';
import SatCommClient from './SatCommClient';
import NavBar from '@/components/Nav';
import StarryBackground from '@/components/StarryBackground';

export default function Page() {
  return (
    <main className="relative min-h-screen">
      <NavBar />
      <StarryBackground />
      <div className="relative z-10">
        <div style={{ maxWidth: 1200, margin: '0 auto', color: '#e6eef8', paddingTop: 140, paddingLeft: 20, paddingRight: 20 }}>
          <div style={{ marginBottom: 24 }}>
            <h1 style={{ fontSize: 28, fontWeight: 800 }}>Non Terrestrial Networks</h1>
            <p style={{ color: '#9fb4d4', maxWidth: '50%', fontWeight: 'bold' }}>
              A comprehensive registry of commercial satellite communication networks, comparing frequency bands, power requirements, operational costs and more.
            </p>
            <p style={{ color: '#9fb4d4', marginTop: 24 }}>
              Email info@cubesource.space to suggest new features.
            </p>
          </div>

          <SatCommClient />
        </div>
      </div>
    </main>
  );
}
