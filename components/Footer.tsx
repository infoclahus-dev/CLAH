import React from 'react';
import { Instagram, Facebook, Linkedin, Youtube } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 text-slate-400 py-8 border-t border-slate-800">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-2xl font-bold text-white tracking-tighter">CLAH</div>
        <div className="flex gap-6">
          <a href="https://www.instagram.com/clah_us/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors"><Instagram size={20} /></a>
          <a href="https://www.facebook.com/clah.official/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors"><Facebook size={20} /></a>
          <a href="https://www.linkedin.com/company/clah-custom-luxury-affordable-homes/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors"><Linkedin size={20} /></a>
          <a href="https://www.youtube.com/@CLAHCustomLuxuryAffordableHome" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors"><Youtube size={20} /></a>
        </div>
        <div className="text-sm">
          © 2025 CLAH Ecosystem. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
