"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState, useEffect, ReactNode } from "react";
import { vt323 } from "../lib/fonts";
import { categories } from "../data/categories";

interface NavLink {
  href: string;
  label: string;
  about?: string;
}

interface SocialLink {
  href: string;
  label: string;
}

interface NavLinkProps {
  href: string;
  children: ReactNode;
}

export default function NavBar() {
  // Navigation links data - simplified to just Documentation and Calculators
  const navLinks: NavLink[] = [
    {
      href: "/",
      label: "Resource Center",
      about: "Browse comprehensive guides and documentation."
    },
    {
      href: "/constellations",
      label: "Constellations",
      about: "Satellite communication constellation visualiser and tools."
    },
    {
      href: "/documents",
      label: "Documents",
      about: "Documents by organizations like SpaceX and NASA detailing standards."
    },
    {
      href: "/tips",
      label: "Tips & Tricks",
      about: "Tips and tricks on satellite design from industry insiders."
    }
  ];

  const [menuOpen, setMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < lastScrollY || currentScrollY < 10) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 10) {
        setIsVisible(false);
      }
      setLastScrollY(currentScrollY);
    };

    let ticking = false;
    const throttledHandleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledHandleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', throttledHandleScroll);
    };
  }, [lastScrollY]);

  useEffect(() => {
    if (menuOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const NavLinkComp = ({ href, children }: NavLinkProps) => {
    const pathname = usePathname();
    const isActive = pathname === href;

    return (
      <Link href={href} className={`${vt323.className} text-white px-4 relative group inline-block`}>
        <span className="relative inline-block">
          {children}
          <span className={`absolute left-0 bottom-[1px] w-full h-0.5 transform transition-transform duration-300 origin-right group-hover:scale-x-100 bg-white ${isActive ? 'scale-x-100' : 'scale-x-0'}`} />
        </span>
      </Link>
    );
  };

  const containerClasses = 
    menuOpen 
      ? 'bottom-0 px-0 py-0' 
      : 'px-4 sm:px-8 py-2 sm:py-3 md:px-16';
  const navbarClasses = menuOpen ? 'w-full h-full rounded-none border-0 pb-16 py-4 px-4' : 'px-4 sm:px-6 py-3 rounded-xl w-full sm:w-auto';
  const menuContentClasses = menuOpen ? 'opacity-100 mt-4 px-4 sm:px-6' : 'max-h-0 opacity-0 mt-0';

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 ${containerClasses}`}
      style={{ transform: isVisible ? 'translateY(0)' : 'translateY(-100%)', transition: 'transform 0.6s cubic-bezier(0.34, 1.1, 0.64, 1)' }}
    >
      <div className={`w-full h-full flex ${menuOpen ? 'items-start' : 'justify-center items-center'}`}>
        <div className={`relative flex flex-col bg-[#040404] bg-opacity-50 backdrop-blur-md border border-white/10 transition-all duration-300 ease-in-out ${navbarClasses}`} style={menuOpen ? { background: 'linear-gradient(to top, #0a0a0a 0%, rgba(4, 4, 4, 0.9) 15%, rgba(4, 4, 4, 0.9) 100%)' } : {}}>
          <div className={`flex justify-between items-center w-full ${menuOpen ? 'px-4 sm:px-6 py-3' : ''}`}>
            <div className="flex flex-col items-center gap-4 p-[6px] pl-[4px] mt-[-1px]">
              <a href="https://cubesource.space/" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center no-underline">
                <Image src="/Logo.png" alt="UCDevs logo" width={20} height={30} className="!w-[20px] !h-[30px]" style={{ width: '20px', height: '28px' }} />
                {/*<span className={`${vt323.className} text-xs text-white/90 mt-2`}>Home</span>*/}
              </a>
            </div>

            <nav className="hidden md:flex items-center ml-4 border-l border-white/10 pl-2">
              {navLinks.map((link, index) => (
                <NavLinkComp key={index} href={link.href}>{link.label}</NavLinkComp>
              ))}
            </nav>

            <button onClick={toggleMenu} className={`${vt323.className} text-white md:hidden ml-auto relative h-6 w-16 overflow-hidden text-right`}>
              <span className={`inline-block w-full transition-transform duration-300 ${menuOpen ? 'transform -translate-y-full opacity-0' : ''}`}>MENU</span>
              <span className={`absolute inset-0 w-full transition-transform duration-300 ${menuOpen ? 'transform translate-y-0' : 'transform translate-y-full opacity-0'}`}>CLOSE</span>
            </button>
          </div>

          <div className={`w-full flex-grow overflow-hidden transition-all duration-300 ease-in-out md:hidden ${menuContentClasses}`}>
            <ul className="flex flex-col pt-2">
              {navLinks.map((link, index) => (
                <li key={index} className={`transform transition-all duration-300 ease-in-out ${menuOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`} style={{ transitionDelay: menuOpen ? `${(index * 75) + 100}ms` : '0ms' }}>
                  <Link href={link.href} className={`${vt323.className} block py-3 px-2 text-2xl text-white hover:bg-white/10 transition-colors`} onClick={() => setMenuOpen(false)}>
                    {link.label}
                    {link.about && (<span className={`${vt323.className} block mt-1 text-lg text-gray-400 font-light leading-none`}>{link.about}</span>)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

