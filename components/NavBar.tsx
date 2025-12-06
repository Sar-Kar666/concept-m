import React, { useState, useEffect } from 'react';

const NavBar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-white/5 ${
        scrolled ? 'bg-black/80 backdrop-blur-md py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#5227FF] to-[#FF9FFC] animate-pulse"></div>
          <span className="text-xl font-bold tracking-wider text-white">LUMINA</span>
        </div>
        
        <div className="hidden md:flex items-center gap-8">
          <a href="#services" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Solutions</a>
          <a href="#about" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Technology</a>
          <a href="#contact" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Contact</a>
          <button className="px-5 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-sm text-sm font-semibold transition-all hover:scale-105 active:scale-95">
            Get Access
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;