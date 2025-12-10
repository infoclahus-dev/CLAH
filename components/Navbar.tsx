

import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Globe, ChevronDown, ChevronRight, Hammer, PenTool, Armchair, Coffee } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { UI_TEXT, CLAH_ENTITIES, CLAH_DETAILED_SERVICES, CLAH_ABOUT_MENU } from '../constants';
import { ViewState } from '../types';

interface NavbarProps {
    onNavigate: (view: ViewState) => void;
    currentView: ViewState;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate, currentView }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [activeServiceTab, setActiveServiceTab] = useState(0);
  const { language, toggleLanguage } = useLanguage();
  const dropdownTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Updated: User requested all pages to match Services style (white bg/dark text always).
  // By setting this to empty, useScrolledStyle will always be true via the !hasDarkHero check.
  const hasDarkHero: string[] = [];

  // Use the "scrolled" style (white bg, dark text) if:
  // 1. The user has scrolled down
  // 2. OR we are on a page that doesn't have a dark hero
  const useScrolledStyle = isScrolled || !hasDarkHero.includes(currentView);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseEnter = (menu: string) => {
    if (dropdownTimerRef.current) clearTimeout(dropdownTimerRef.current);
    setActiveDropdown(menu);
  };

  const handleMouseLeave = () => {
    dropdownTimerRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 200);
  };

  const handleNavClick = (view: ViewState) => {
      onNavigate(view);
      setMobileMenuOpen(false);
      window.scrollTo(0, 0);
  };

  const iconMap = {
    'Hammer': Hammer,
    'PenTool': PenTool,
    'Armchair': Armchair,
    'Coffee': Coffee
  };

  return (
    <nav 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        useScrolledStyle ? 'bg-white/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <button onClick={() => handleNavClick('home')} className="flex items-center gap-2 group">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-xl transition-colors ${useScrolledStyle ? 'bg-orange-600 text-white' : 'bg-white text-orange-600'}`}>
              C
            </div>
            <span className={`text-2xl font-bold tracking-tighter transition-colors ${useScrolledStyle ? 'text-slate-800' : 'text-white'}`}>
              CLAH
            </span>
          </button>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {/* Ecosystem Dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => handleMouseEnter('ecosystem')}
            onMouseLeave={handleMouseLeave}
          >
            <button 
              className={`flex items-center gap-1 font-medium text-sm hover:text-orange-500 transition-colors py-2 focus:outline-none ${useScrolledStyle ? 'text-slate-600' : 'text-white/90'}`}
              aria-expanded={activeDropdown === 'ecosystem'}
            >
              {UI_TEXT.nav.ecosystem[language]}
              <ChevronDown size={14} className={`transform transition-transform duration-200 ${activeDropdown === 'ecosystem' ? 'rotate-180' : ''}`} />
            </button>
            
            {/* Dropdown Menu */}
            <div 
              className={`absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[750px] bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden transform transition-all duration-300 origin-top ${
                activeDropdown === 'ecosystem' ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-2 invisible'
              }`}
            >
              <div className="p-8 grid grid-cols-2 gap-x-12 gap-y-10">
                {CLAH_ENTITIES.map((entity) => (
                  <a 
                    key={entity.id}
                    href={entity.websiteUrl || '#'} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-start justify-between"
                    onClick={() => setActiveDropdown(null)}
                  >
                    <div className="pr-4">
                      <h4 className="font-bold text-slate-900 text-base mb-1 group-hover:text-orange-600 transition-colors">
                        {entity.name}
                      </h4>
                      <p className="text-sm text-slate-500 leading-relaxed">
                        {entity.description[language]}
                      </p>
                    </div>
                    <div className="mt-1 text-slate-300 group-hover:text-orange-600 transition-colors transform group-hover:translate-x-1 duration-200">
                      <ChevronRight size={18} />
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>

           {/* Services Dropdown (Mega Menu) */}
           <div 
            className="relative"
            onMouseEnter={() => handleMouseEnter('services')}
            onMouseLeave={handleMouseLeave}
          >
            <button 
              onClick={() => handleNavClick('services')}
              className={`flex items-center gap-1 font-medium text-sm hover:text-orange-500 transition-colors py-2 focus:outline-none ${useScrolledStyle ? 'text-slate-600' : 'text-white/90'}`}
              aria-expanded={activeDropdown === 'services'}
            >
              {UI_TEXT.nav.services[language]}
              <ChevronDown size={14} className={`transform transition-transform duration-200 ${activeDropdown === 'services' ? 'rotate-180' : ''}`} />
            </button>
            
            {/* Dropdown Menu - Fixed positioning to prevent right overflow */}
            <div 
              className={`absolute top-full right-[-150px] mt-4 w-[900px] max-w-[90vw] bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden transform transition-all duration-300 origin-top-right flex ${
                activeDropdown === 'services' ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-2 invisible'
              }`}
            >
              {/* Sidebar: Company List */}
              <div className="w-[280px] bg-slate-50 p-6 flex flex-col gap-2 border-r border-gray-100 flex-shrink-0">
                {CLAH_DETAILED_SERVICES.map((company, index) => (
                  <button
                    key={company.id}
                    onMouseEnter={() => setActiveServiceTab(index)}
                    className={`text-left px-4 py-3 rounded-xl transition-all duration-200 text-sm font-semibold flex justify-between items-center ${
                      activeServiceTab === index 
                        ? 'bg-white text-orange-600 shadow-sm' 
                        : 'text-slate-600 hover:bg-white/50 hover:text-slate-900'
                    }`}
                  >
                    {company.name}
                    {activeServiceTab === index && <ChevronRight size={14} />}
                  </button>
                ))}
              </div>

              {/* Content: Service Grid */}
              <div className="flex-1 p-8 min-h-[400px]">
                 <div className="mb-6 pb-4 border-b border-gray-50 flex justify-between items-center">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900">
                        {CLAH_DETAILED_SERVICES[activeServiceTab].name}
                      </h3>
                      <p className="text-sm text-slate-400 mt-1">
                        {language === 'vn' ? 'Các dịch vụ nổi bật' : 'Featured Services'}
                      </p>
                    </div>
                    <button 
                       onClick={() => handleNavClick('services')}
                       className="text-xs font-semibold text-orange-600 hover:text-orange-700 hover:underline"
                    >
                      {language === 'vn' ? 'Xem tất cả dịch vụ' : 'View all services'}
                    </button>
                 </div>
                 <div className="grid grid-cols-2 gap-x-8 gap-y-8">
                    {CLAH_DETAILED_SERVICES[activeServiceTab].services.map((service, idx) => (
                      <a 
                        key={idx}
                        href={service.link || '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group block"
                        onClick={() => setActiveDropdown(null)}
                      >
                         <div className="flex justify-between items-start mb-1">
                            <h4 className="font-bold text-slate-800 text-sm group-hover:text-orange-600 transition-colors">
                              {service.name[language]}
                            </h4>
                            <ChevronRight size={14} className="text-slate-300 group-hover:text-orange-600 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all" />
                         </div>
                         <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                            {service.description[language]}
                         </p>
                      </a>
                    ))}
                 </div>
              </div>
            </div>
          </div>

          {/* Resources Link */}
          <button 
             onClick={() => handleNavClick('resources')}
             className={`font-medium text-sm hover:text-orange-500 transition-colors ${useScrolledStyle ? 'text-slate-600' : 'text-white/90'}`}
          >
            {UI_TEXT.nav.resources[language]}
          </button>

          {/* About Dropdown (Updated Style to Match Ecosystem) */}
          <div 
            className="relative"
            onMouseEnter={() => handleMouseEnter('about')}
            onMouseLeave={handleMouseLeave}
          >
            <button 
              className={`flex items-center gap-1 font-medium text-sm hover:text-orange-500 transition-colors py-2 focus:outline-none ${useScrolledStyle ? 'text-slate-600' : 'text-white/90'}`}
              aria-expanded={activeDropdown === 'about'}
            >
              {UI_TEXT.nav.about[language]}
              <ChevronDown size={14} className={`transform transition-transform duration-200 ${activeDropdown === 'about' ? 'rotate-180' : ''}`} />
            </button>
             
            {/* Dropdown Menu */}
            <div 
              className={`absolute top-full right-[-80px] mt-4 w-[750px] max-w-[90vw] bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden transform transition-all duration-300 origin-top-right ${
                activeDropdown === 'about' ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-2 invisible'
              }`}
            >
              <div className="p-8 grid grid-cols-2 gap-x-12 gap-y-10">
                 {CLAH_ABOUT_MENU.map((item) => (
                   <button
                      key={item.id}
                      onClick={() => {
                        if (item.link === 'about') {
                          handleNavClick('about');
                        } else if (item.link === 'careers') {
                            handleNavClick('careers');
                        } else if (item.link === 'resources') {
                            handleNavClick('resources');
                        } else if (item.link === 'locations') {
                            handleNavClick('locations');
                        }
                        setActiveDropdown(null);
                      }}
                      className="group flex items-start justify-between text-left"
                   >
                      <div className="pr-4">
                        <h4 className="font-bold text-slate-900 text-base mb-1 group-hover:text-orange-600 transition-colors">
                          {item.name[language]}
                        </h4>
                        <p className="text-sm text-slate-500 leading-relaxed group-hover:text-slate-600">
                          {item.description[language]}
                        </p>
                      </div>
                      <div className="mt-1 text-slate-300 group-hover:text-orange-600 transition-colors transform group-hover:translate-x-1 duration-200">
                        <ChevronRight size={18} />
                      </div>
                   </button>
                 ))}
              </div>
            </div>
          </div>
          
          <button 
             onClick={() => {
                handleNavClick('home');
                // Allow time for view switch then scroll
                setTimeout(() => {
                    const el = document.getElementById('contact');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                }, 100);
             }}
             className={`font-medium text-sm hover:text-orange-500 transition-colors ${useScrolledStyle ? 'text-slate-600' : 'text-white/90'}`}
          >
            {UI_TEXT.nav.contact[language]}
          </button>

          <button 
            onClick={toggleLanguage}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all cursor-pointer select-none active:scale-95 ${
            useScrolledStyle 
              ? 'bg-slate-900 text-white hover:bg-slate-800' 
              : 'bg-white text-slate-900 hover:bg-gray-100'
          }`}>
            <Globe size={16} />
            {language === 'vn' ? 'VN' : 'EN'}
          </button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-2xl focus:outline-none"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className={useScrolledStyle ? 'text-slate-800' : 'text-white'} /> : <Menu className={useScrolledStyle ? 'text-slate-800' : 'text-white'} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white border-t border-gray-100 shadow-xl max-h-[90vh] overflow-y-auto flex flex-col md:hidden animate-fade-in-down">
          <div className="p-4 space-y-4">
             {/* Mobile Ecosystem Accordion */}
             <div className="border-b border-gray-50 pb-2">
                <div className="font-semibold text-slate-800 mb-3 px-2 flex items-center gap-2">
                  {UI_TEXT.nav.ecosystem[language]}
                </div>
                <div className="grid gap-2 pl-2">
                  {CLAH_ENTITIES.map((entity) => {
                     const Icon = iconMap[entity.iconName];
                     return (
                      <a 
                        key={entity.id}
                        href={entity.websiteUrl || '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-2 rounded-lg bg-gray-50 active:bg-gray-100"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                         <Icon size={16} className="text-orange-600" />
                         <span className="text-sm font-medium text-slate-700">{entity.name}</span>
                      </a>
                     )
                  })}
                </div>
             </div>

             {/* Mobile Services Nested List */}
             <div className="border-b border-gray-50 pb-2">
                <button 
                   onClick={() => handleNavClick('services')}
                   className="font-semibold text-slate-800 mb-3 px-2 flex items-center gap-2 w-full text-left"
                >
                  {UI_TEXT.nav.services[language]}
                </button>
                <div className="space-y-4 pl-2">
                  {CLAH_DETAILED_SERVICES.map((company) => (
                    <div key={company.id}>
                      <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 px-2">
                        {company.name}
                      </div>
                      <div className="grid gap-1 pl-2 border-l-2 border-gray-100">
                        {company.services.map((svc, idx) => (
                           <a 
                             key={idx}
                             href={svc.link || '#'}
                             target="_blank"
                             rel="noopener noreferrer"
                             className="block py-1.5 px-2 text-sm text-slate-600 active:text-orange-600"
                             onClick={() => setMobileMenuOpen(false)}
                           >
                             {svc.name[language]}
                           </a>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
             </div>

            {/* Mobile Resources Link */}
            <div className="border-b border-gray-50 pb-2">
               <button 
                   onClick={() => handleNavClick('resources')}
                   className="font-semibold text-slate-800 mb-3 px-2 flex items-center gap-2 w-full text-left"
                >
                  {UI_TEXT.nav.resources[language]}
                </button>
            </div>

            {/* Mobile About Nested List */}
             <div className="border-b border-gray-50 pb-2">
                <div className="font-semibold text-slate-800 mb-3 px-2 flex items-center gap-2">
                  {UI_TEXT.nav.about[language]}
                </div>
                <div className="grid gap-1 pl-2">
                  {CLAH_ABOUT_MENU.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        if (item.link === 'about') {
                          handleNavClick('about');
                        } else if (item.link === 'careers') {
                            handleNavClick('careers');
                        } else if (item.link === 'resources') {
                            handleNavClick('resources');
                        } else if (item.link === 'locations') {
                            handleNavClick('locations');
                        }
                        setMobileMenuOpen(false);
                      }}
                      className="block w-full text-left py-2 px-2 text-sm text-slate-600 active:text-orange-600 rounded-lg active:bg-gray-50"
                    >
                      {item.name[language]}
                    </button>
                  ))}
                </div>
             </div>

            <button 
               onClick={() => {
                handleNavClick('home');
                setTimeout(() => {
                    const el = document.getElementById('contact');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                }, 100);
               }}
              className="block w-full text-left text-slate-800 font-medium py-3 px-2 border-b border-gray-50"
            >
              {UI_TEXT.nav.contact[language]}
            </button>
            
             <button 
              onClick={() => { toggleLanguage(); setMobileMenuOpen(false); }}
              className="w-full flex items-center justify-between py-3 px-2 text-slate-800 font-medium"
            >
              Language
              <div className="flex items-center gap-2 bg-slate-100 px-4 py-1.5 rounded-full text-sm">
                 <Globe size={14} />
                {language === 'vn' ? 'Tiếng Việt' : 'English'}
              </div>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;