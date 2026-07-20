"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const moreLinks = [
    { name: "News", href: "/news" },
    { name: "Careers", href: "/careers" },
    { name: "Business Units", href: "/business-units" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Developer Resources", href: "/resources" },
    { name: "Brand Assets", href: "/brand" },
    { name: "Press Kit", href: "/press" },
    { name: "Roadmap", href: "/roadmap" },
    { name: "Language", href: "/language" },
  ];

  return (
    <nav className="fixed w-full top-0 left-0 p-6 flex justify-between items-center z-50 bg-[#071a3d]/80 backdrop-blur-md border-b border-[#0a2552]">
      <Link href="/" className="text-xl font-bold tracking-tighter text-white">
        KAMIO
      </Link>
      
      <div className="flex items-center space-x-8 text-sm font-medium text-gray-300">
        <Link href="/services" className="hover:text-blue-400 transition-colors">Services</Link>
        <Link href="/about" className="hover:text-blue-400 transition-colors">About</Link>
        <Link href="/portofolio" className="hover:text-blue-400 transition-colors">Portfolio</Link>
        <Link href="/partnership" className="hover:text-blue-400 transition-colors">Partnership</Link>
        <Link href="/investor" className="hover:text-blue-400 transition-colors">Investor</Link>
        <Link href="/faq" className="hover:text-blue-400 transition-colors">FAQ</Link>

        {/* Dropdown Menu */}
        <div className="relative">
          <button 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="text-gray-300 hover:text-blue-400 transition-colors text-[10px]"
          >
            ▼
          </button>
          
          {isDropdownOpen && (
            <div className="absolute right-0 mt-4 w-48 bg-[#071a3d] border border-[#0a2552] rounded-xl shadow-2xl py-2 z-50 text-gray-300">
              {moreLinks.map((link) => (
                <Link 
                  key={link.name} 
                  href={link.href} 
                  className="block px-4 py-2 hover:bg-[#0057b8]/20 hover:text-white transition-all"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          )}
        </div>
        
        <Link 
          href="/contact" 
          className="px-5 py-2 border border-blue-500/50 text-blue-400 rounded-full hover:bg-[#0057b8] hover:text-white hover:shadow-[0_0_15px_rgba(0,87,184,0.5)] transition-all"
        >
          Contact
        </Link>
      </div>
    </nav>
  );
}