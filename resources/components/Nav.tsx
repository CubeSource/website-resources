import Image from "next/image";
import Link from "next/link";
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
  // Navigation links data - derived from categories
  const navLinks: NavLink[] = categories.map((category) => {
    // Shorten category names for nav
    const shortNames: Record<string, string> = {
      "Getting Started": "Getting Started",
      "Structure": "Structure",
      "Hold-Down Release Mechanisms": "Mechanisms",
      "Electrical Power Systems (EPS)": "Electrical",
      "Assembly": "Assembly",
      "Environmental Testing": "Testing"
    };
    
    // Get the first item's route as the href, or use a hash-based anchor
    const href = category.items.length > 0 ? category.items[0].route : `#${category.name.toLowerCase().replace(/\s+/g, '-')}`;
    
    return {
      href,
      label: shortNames[category.name] || category.name,
      about: category.items.length > 0 ? category.items[0].description : undefined
    };
  });

  // Social media links
  const socialLinks: SocialLink[] = [
    { href: "https://twitter.com", label: "Twitter" },
    { href: "https://youtube.com", label: "YouTube" },
    { href: "https://discord.com", label: "Discord" }
  ];

  // State to track if mobile menu is open
  const [menuOpen, setMenuOpen] = useState(false);
  
  // State to track scroll direction and nav visibility
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  
  // Handle scroll detection
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show nav when scrolling up, hide when scrolling down
      if (currentScrollY < lastScrollY || currentScrollY < 10) {
        // Scrolling up or near top
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 10) {
        // Scrolling down
        setIsVisible(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    // Throttle scroll events for better performance
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
  
  // Prevent scrolling when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  // Toggle menu function
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Custom NavLink component with a white animated underline effect
  const NavLink = ({ href, children }: NavLinkProps) => {
    return (
      <Link 
        href={href} 
        className={`${vt323.className} text-white px-4 relative group inline-block`}
      >
        <span className="relative inline-block">
          {children}
          <span 
            className="absolute left-0 bottom-[1px] w-full h-0.5 transform scale-x-0 transition-transform duration-300 origin-right group-hover:scale-x-100 bg-white"
          />
        </span>
      </Link>
    );
  };

  // Determine container classes based on menu state
  const containerClasses = 
    menuOpen 
      ? 'bottom-0 px-0 py-0' 
      : 'px-4 sm:px-8 py-4 sm:py-8 md:px-16';
      
  // Determine navbar classes based on menu state
  const navbarClasses = 
    menuOpen 
      ? 'w-full h-full rounded-none border-0 pb-16 py-4 px-4'
      : 'px-4 sm:px-6 py-3 rounded-[0px] w-full sm:w-auto';
      
  // Determine menu content classes based on menu state
  const menuContentClasses = 
    menuOpen
      ? 'opacity-100 mt-4 px-4 sm:px-6'
      : 'max-h-0 opacity-0 mt-0';

  return (
    <div 
      className={`fixed top-0 left-0 right-0 z-50 ${containerClasses}`}
      style={{
        transform: isVisible ? 'translateY(0)' : 'translateY(-100%)',
        transition: 'transform 0.6s cubic-bezier(0.34, 1.1, 0.64, 1)',
      }}
    >
      {/* Mobile and desktop navbar */}
      <div className={`w-full h-full flex ${menuOpen ? 'items-start' : 'justify-center items-center'}`}>
        <div 
          className={`relative flex flex-col bg-[#040404] bg-opacity-80 backdrop-blur-md border border-white/10 transition-all duration-300 ease-in-out ${navbarClasses}`}
          style={menuOpen ? {
            background: 'linear-gradient(to top, #0a0a0a 0%, rgba(4, 4, 4, 0.9) 15%, rgba(4, 4, 4, 0.9) 100%)'
          } : {}}
        >
          {/* Header row with logo and menu button */}
          <div className={`flex justify-between items-center w-full ${menuOpen ? 'px-4 sm:px-6 py-3' : ''}`}>
            <div className="p-[6px] pl-[4px] mt-[-1px]">
              <Image src="/Logo.png" alt="UCDevs logo" width={15} height={22} className="!w-[15px] !h-[22px]" style={{ width: '15px', height: '22px' }} />
            </div>
            
            {/* Navigation links - hidden on mobile */}
            <nav className="hidden md:flex items-center ml-4 border-l border-white/10 pl-2">
              {navLinks.map((link, index) => (
                <NavLink key={index} href={link.href}>
                  {link.label}
                </NavLink>
              ))}
            </nav>

            {/* Mobile menu button with flip animation - fixed width to accommodate both texts */}
            <button 
              onClick={toggleMenu} 
              className={`${vt323.className} text-white md:hidden ml-auto relative h-6 w-16 overflow-hidden text-right`}
            >
              <span className={`inline-block w-full transition-transform duration-300 ${menuOpen ? 'transform -translate-y-full opacity-0' : ''}`}>
                MENU
              </span>
              <span className={`absolute inset-0 w-full transition-transform duration-300 ${menuOpen ? 'transform translate-y-0' : 'transform translate-y-full opacity-0'}`}>
                CLOSE
              </span>
            </button>
          </div>

          {/* Mobile menu - always in DOM but height/opacity animated */}
          <div 
            className={`w-full flex-grow overflow-hidden transition-all duration-300 ease-in-out md:hidden ${menuContentClasses}`}
          >
            <ul className="flex flex-col pt-2">
              {navLinks.map((link, index) => (
                <li 
                  key={index} 
                  className={`transform transition-all duration-300 ease-in-out ${
                    menuOpen
                      ? 'translate-y-0 opacity-100' 
                      : 'translate-y-4 opacity-0'
                  }`}
                  style={{ 
                    transitionDelay: menuOpen ? `${(index * 75) + 100}ms` : '0ms'
                  }}
                >
                  <Link 
                    href={link.href} 
                    className={`${vt323.className} block py-3 px-2 text-2xl text-white hover:bg-white/10 transition-colors`}
                    onClick={() => {
                      // Close menu on navigation
                      setMenuOpen(false);
                    }}
                  >
                    {link.label}
                    {link.about && (
                      <span className={`${vt323.className} block mt-1 text-lg text-gray-400 font-light leading-none`}>
                        {link.about}
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
            
            {/* Social media links row */}
            {/* <div className={`flex px-2 space-x-8 mt-4 transition-all duration-300 ease-in-out ${
              menuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`} style={{ transitionDelay: menuOpen ? '500ms' : '0ms' }}>
              {socialLinks.map((link, index) => (
                <a 
                  key={index}
                  href={link.href}
                  className={`${vt323.className} text-white text-xl hover:text-white/80 transition-colors duration-300`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                    // Prevent immediate closing of menu
                    e.stopPropagation();
                  }}
                >
                  {link.label}
                </a>
              ))}
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}