import React from 'react';

export const metadata = {
  title: 'SatComm | CubeSource',
  description: 'SatComm self-contained section',
};

export default function SatCommLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {children}
    </div>
  );
}
