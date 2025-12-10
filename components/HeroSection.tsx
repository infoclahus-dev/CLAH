import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { UI_TEXT } from '../constants';
import BlueprintSketch from './BlueprintSketch';

const HeroSection: React.FC = () => {
  const { language } = useLanguage();
  const text = UI_TEXT.hero;

  return (
    <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Blueprint Animation Background */}
      <BlueprintSketch />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <div className="inline-block px-4 py-1.5 mb-6 border border-white/30 rounded-full bg-white/10 backdrop-blur-md">
          <span className="text-sm font-medium tracking-wide text-orange-200 uppercase">
            {text.tagline[language]}
          </span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight leading-tight whitespace-pre-line drop-shadow-lg">
          {text.title[language]} <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-600">
            Endless Possibilities.
          </span>
        </h1>
        
        <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto mb-10 leading-relaxed drop-shadow-md">
          {text.subtitle[language]}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a href="#services" className="px-8 py-4 bg-orange-600 hover:bg-orange-700 text-white rounded-full font-semibold transition-all transform hover:scale-105 flex items-center gap-2 shadow-lg shadow-orange-900/50">
            {text.cta[language]}
            <ArrowRight size={20} />
          </a>
          <button className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-full font-semibold backdrop-blur-sm transition-all">
            {text.aboutBtn[language]}
          </button>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-white/50">
        <div className="w-1 h-16 rounded-full bg-gradient-to-b from-white/0 via-white/50 to-white/0" />
      </div>
    </section>
  );
};

export default HeroSection;