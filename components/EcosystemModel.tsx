
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { UI_TEXT, CLAH_ENTITIES } from '../constants';
import { Hammer, PenTool, Armchair, Coffee, ArrowRight } from 'lucide-react';

const EcosystemModel: React.FC = () => {
  const { language } = useLanguage();
  const t = UI_TEXT.ecosystemModel;

  const getUrl = (id: string) => {
    return CLAH_ENTITIES.find(e => e.id === id)?.websiteUrl || '#';
  };

  return (
    <section className="py-12 md:py-16 bg-white relative overflow-hidden">
      {/* Background Grid - AnyMind Style */}
      <div className="absolute inset-0 z-0 opacity-30 pointer-events-none">
         <div className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-blue-50/50 to-transparent" />
         <div className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-orange-50/50 to-transparent" />
         {/* Dotted Pattern */}
         <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
      </div>

      {/* Decorative Floating Elements - Hidden on Mobile */}
      <div className="absolute top-1/4 left-10 hidden xl:block animate-[float_8s_ease-in-out_infinite]">
         <div className="w-64 h-64 border border-blue-100 rounded-full flex items-center justify-center opacity-40">
            <div className="w-48 h-48 border border-blue-200 rounded-full" />
         </div>
      </div>
      <div className="absolute bottom-1/4 right-10 hidden xl:block animate-[float_10s_ease-in-out_infinite_reverse]">
         <div className="w-72 h-72 border border-orange-100 rounded-full flex items-center justify-center opacity-40">
            <div className="w-56 h-56 border border-orange-200 rounded-full dashed" />
         </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <span className="inline-block py-1.5 px-4 rounded-full bg-slate-900 text-white font-bold tracking-wider uppercase text-xs mb-4 md:mb-6 shadow-lg shadow-slate-200">
              {t.header[language]}
          </span>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-4 md:mb-6 tracking-tight">
              {t.title[language]}
          </h2>
          <p className="text-base md:text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
              {t.description[language]}
          </p>
        </div>

        {/* Main Diagram */}
        <div className="relative max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-24">
            
            {/* Connecting Lines Layer (SVG) - Visible on Desktop Only */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none hidden lg:block z-0" viewBox="0 0 1200 600" preserveAspectRatio="none">
               {/* Left Top to Center */}
               <path d="M 350 150 C 450 150, 500 300, 600 300" fill="none" stroke="#e2e8f0" strokeWidth="2" strokeDasharray="6 6" className="animate-[dash_20s_linear_infinite]" />
               {/* Left Bottom to Center */}
               <path d="M 350 450 C 450 450, 500 300, 600 300" fill="none" stroke="#e2e8f0" strokeWidth="2" strokeDasharray="6 6" className="animate-[dash_20s_linear_infinite]" />
               {/* Right Top to Center */}
               <path d="M 850 150 C 750 150, 700 300, 600 300" fill="none" stroke="#e2e8f0" strokeWidth="2" strokeDasharray="6 6" className="animate-[dash_20s_linear_infinite]" />
               {/* Right Bottom to Center */}
               <path d="M 850 450 C 750 450, 700 300, 600 300" fill="none" stroke="#e2e8f0" strokeWidth="2" strokeDasharray="6 6" className="animate-[dash_20s_linear_infinite]" />
            </svg>

            {/* Mobile Vertical Connector Line (Hidden on Desktop) */}
            <div className="absolute inset-y-0 left-1/2 w-0.5 bg-slate-200 -translate-x-1/2 hidden md:block lg:hidden z-0 border-r-2 border-dashed border-slate-300"></div>

            {/* Left Column: SPACE & DESIGN (Hardware) */}
            <div className="flex flex-col gap-6 md:gap-8 w-full max-w-md lg:max-w-sm relative z-10">
               <div className="text-center lg:text-right mb-2 md:mb-4">
                  <span className="text-blue-600 font-bold tracking-widest text-sm uppercase bg-white/80 px-2 py-1 rounded backdrop-blur-sm">Space & Design</span>
               </div>
               
               {/* CARD 1: CUSTOM HOME (Blue) */}
               <a 
                  href={getUrl('custom-home')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group bg-white p-6 md:p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-slate-100 hover:border-blue-200 hover:-translate-y-1 relative overflow-hidden cursor-pointer"
               >
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-blue-600" />
                  <div className="flex justify-between items-start mb-4">
                     <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                        <Hammer size={20} className="md:w-6 md:h-6" />
                     </div>
                     <span className="text-xs font-bold text-slate-300 uppercase">01</span>
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">Custom Home</h3>
                  <p className="text-sm text-slate-500 mb-3">General Contractor</p>
                  <p className="text-xs text-blue-600 font-semibold tracking-wide uppercase bg-blue-50 inline-block px-2 py-1 rounded">
                    Construction
                  </p>
               </a>

               {/* CARD 2: NCA DESIGNS (Purple) */}
               <a 
                  href={getUrl('nca-designs')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group bg-white p-6 md:p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-slate-100 hover:border-purple-200 hover:-translate-y-1 relative overflow-hidden mt-0 lg:mt-8 cursor-pointer"
               >
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-400 to-purple-600" />
                  <div className="flex justify-between items-start mb-4">
                     <div className="w-10 h-10 md:w-12 md:h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center">
                        <PenTool size={20} className="md:w-6 md:h-6" />
                     </div>
                     <span className="text-xs font-bold text-slate-300 uppercase">02</span>
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-2 group-hover:text-purple-600 transition-colors">NCA Designs</h3>
                  <p className="text-sm text-slate-500 mb-3">Architecture & Interior</p>
                  <p className="text-xs text-purple-600 font-semibold tracking-wide uppercase bg-purple-50 inline-block px-2 py-1 rounded">
                     Design
                  </p>
               </a>
            </div>

            {/* Center Hub */}
            <div className="relative z-20 flex-shrink-0 my-4 lg:my-0">
               <div className="relative w-32 h-32 md:w-40 md:h-40 lg:w-56 lg:h-56">
                  {/* Orbit Rings */}
                  <div className="absolute inset-0 rounded-full border border-slate-200 animate-[spin_10s_linear_infinite]" />
                  <div className="absolute inset-4 rounded-full border border-slate-200 animate-[spin_15s_linear_infinite_reverse]" />
                  
                  {/* Core */}
                  <div className="absolute inset-0 m-auto w-24 h-24 md:w-28 md:h-28 lg:w-40 lg:h-40 bg-slate-900 rounded-full shadow-2xl flex items-center justify-center z-10 hover:scale-105 transition-transform duration-500">
                     <div className="text-center">
                        <div className="text-2xl md:text-3xl lg:text-4xl font-black text-white tracking-tighter">CLAH</div>
                        <div className="text-[8px] md:text-[10px] text-slate-400 font-medium tracking-widest uppercase mt-0.5 md:mt-1">Ecosystem</div>
                     </div>
                  </div>

                  {/* Connecting Dots (Visual) */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 md:w-3 md:h-3 bg-blue-500 rounded-full shadow-lg shadow-blue-500/50" />
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 md:w-3 md:h-3 bg-orange-500 rounded-full shadow-lg shadow-orange-500/50" />
               </div>
            </div>

            {/* Right Column: LIFESTYLE & CONNECT (Software) */}
            <div className="flex flex-col gap-6 md:gap-8 w-full max-w-md lg:max-w-sm relative z-10">
               <div className="text-center lg:text-left mb-2 md:mb-4">
                  <span className="text-emerald-600 font-bold tracking-widest text-sm uppercase bg-white/80 px-2 py-1 rounded backdrop-blur-sm">Lifestyle & Connect</span>
               </div>

               {/* CARD 3: DESIGN YOUR ROOMS (Emerald) */}
               <a 
                  href={getUrl('design-your-rooms')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group bg-white p-6 md:p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-slate-100 hover:border-emerald-200 hover:-translate-y-1 relative overflow-hidden cursor-pointer"
               >
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-emerald-600" />
                  <div className="flex justify-between items-start mb-4">
                     <div className="w-10 h-10 md:w-12 md:h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
                        <Armchair size={20} className="md:w-6 md:h-6" />
                     </div>
                     <span className="text-xs font-bold text-slate-300 uppercase">03</span>
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-2 group-hover:text-emerald-600 transition-colors">Design Your Rooms</h3>
                  <p className="text-sm text-slate-500 mb-3">Bespoke Furniture</p>
                  <p className="text-xs text-emerald-600 font-semibold tracking-wide uppercase bg-emerald-50 inline-block px-2 py-1 rounded">
                     Custom Furniture
                  </p>
               </a>

               {/* CARD 4: NCM CAFE (Orange) */}
               <a 
                  href={getUrl('ncm-cafe')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group bg-white p-6 md:p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-slate-100 hover:border-orange-200 hover:-translate-y-1 relative overflow-hidden mt-0 lg:mt-8 cursor-pointer"
               >
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-400 to-orange-600" />
                  <div className="flex justify-between items-start mb-4">
                     <div className="w-10 h-10 md:w-12 md:h-12 bg-orange-50 text-orange-600 rounded-xl flex items-center justify-center">
                        <Coffee size={20} className="md:w-6 md:h-6" />
                     </div>
                     <span className="text-xs font-bold text-slate-300 uppercase">04</span>
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-2 group-hover:text-orange-600 transition-colors">NCM Cafe</h3>
                  <p className="text-sm text-slate-500 mb-3">Real Estate & Startup Hub</p>
                  <p className="text-xs text-orange-600 font-semibold tracking-wide uppercase bg-orange-50 inline-block px-2 py-1 rounded">
                     Community
                  </p>
               </a>
            </div>

        </div>

        {/* Bottom Flow Graphic */}
        <div className="mt-8 md:mt-12 flex justify-center opacity-40">
           <div className="flex flex-wrap justify-center items-center gap-2 md:gap-4 text-[10px] md:text-xs font-bold tracking-widest text-slate-400 uppercase">
              <span>Construction</span>
              <ArrowRight size={14} className="md:w-4 md:h-4" />
              <span>Interior</span>
              <ArrowRight size={14} className="md:w-4 md:h-4" />
              <span>Furniture</span>
              <ArrowRight size={14} className="md:w-4 md:h-4" />
              <span>Community</span>
           </div>
        </div>
      </div>
    </section>
  );
};

export default EcosystemModel;
