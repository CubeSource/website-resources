'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function Nav() {
  const router = useRouter();
  const [currentPath, setCurrentPath] = useState('');

  useEffect(() => {
    // Get the current pathname from the router
    setCurrentPath(window.location.pathname);
  }, []);

  const isActive = (href: string) => {
    return currentPath === href || currentPath.startsWith(href + '/');
  };

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/services', label: 'Services' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link href="/" className="nav-logo">
          CubeSource
        </Link>
        <ul className="nav-menu">
          {navItems.map((item) => (
            <li key={item.href} className="nav-item">
              <Link
                href={item.href}
                className={`nav-link ${isActive(item.href) ? 'active' : ''}`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <style jsx>{`
        .nav-link {
          color: inherit;
          text-decoration: none;
          transition: color 0.3s ease;
        }

        .nav-link.active {
          color: red;
          font-weight: bold;
        }

        .nav-link:hover {
          color: red;
        }
      `}</style>
    </nav>
  );
}
