'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type NavItem = {
  title: string;
  href: string;
  external?: boolean;
};

const navItems: NavItem[] = [
  { title: 'Home', href: '/' },
  { title: 'Docs', href: '/docs' },
  { title: 'NTN Visualiser', href: '/satellite' },
  // example external link; keep external: true for clarity but treat same-origin externals as active
  { title: 'Resource Center', href: 'https://resources.cubesource.com/', external: true },
];

const headerStyle: React.CSSProperties = {
  // Slightly bigger header: increased vertical padding
  padding: '18px 24px',
  // Slightly larger and bold header text
  fontSize: '1.05rem',
  fontWeight: 700,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
};

const navStyle: React.CSSProperties = {
  display: 'flex',
  gap: '16px',
  alignItems: 'center',
};

const linkStyle: React.CSSProperties = {
  color: 'inherit',
  textDecoration: 'none',
  padding: '6px 8px',
  borderRadius: '4px',
};

const activeStyle: React.CSSProperties = {
  fontWeight: 700,
  textDecoration: 'underline',
};

export default function Nav() {
  const pathname = usePathname();

  // Helper to determine if a link should be marked active.
  // Treat external links that match the current origin as active.
  const isActive = (href: string) => {
    // If href is a relative path, compare to router.asPath
    if (href.startsWith('/')) {
      // Consider path-only match and also when router.asPath starts with the href (for sections)
      return pathname === href || pathname.startsWith(href + '/') || (href === '/' && pathname === '/');
    }

    // For absolute URLs, try to parse and compare origin + pathname to current location
    try {
      // On server-side rendering window is undefined; avoid accessing window in that case
      const url = new URL(href);
      if (typeof window !== 'undefined') {
        // If the external link's origin matches the current origin, treat it like an internal link
        if (url.origin === window.location.origin) {
          // Compare pathname + search to router.asPath where possible
          const hrefPath = url.pathname + (url.search || '');
          // Exact match or router.asPath starts with the hrefPath
          return pathname === hrefPath || pathname.startsWith(hrefPath + '/') || (hrefPath === '/' && pathname === '/');
        }
      }
    } catch (e) {
      // If parsing fails, fall back to string comparison
      if (pathname === href) return true;
    }

    return false;
  };

  return (
    <header style={headerStyle}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontSize: '1.05rem', fontWeight: 700 }}>CubeSource</span>
          <small style={{ color: '#666' }}>Platform</small>
        </div>
      </div>

      <nav style={navStyle} aria-label="Main navigation">
        {navItems.map((item) => {
          const active = isActive(item.href);
          const combinedStyle: React.CSSProperties = {
            ...linkStyle,
            ...(active ? activeStyle : {}),
          };

          const isExternal = !item.href.startsWith('/');

          if (isExternal) {
            // Use a normal anchor for external links
            return (
              <a
                key={item.href}
                href={item.href}
                style={combinedStyle}
                target={item.external ? '_blank' : undefined}
                rel={item.external ? 'noopener noreferrer' : undefined}
              >
                {item.title}
              </a>
            );
          }

          return (
            <Link key={item.href} href={item.href} legacyBehavior>
              <a style={combinedStyle}>{item.title}</a>
            </Link>
          );
        })}
      </nav>
    </header>
  );
}

