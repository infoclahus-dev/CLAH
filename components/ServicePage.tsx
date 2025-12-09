
import React, { useEffect, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { CLAH_DETAILED_SERVICES, UI_TEXT } from '../constants';
import { 
  Hammer, PaintBucket, Home, FileText, 
  Ruler, LayoutTemplate, Box, Palette, 
  Armchair, Utensils, Shirt, Gem,
  MapPin, Laptop, Coffee, Users,
  ArrowRight, LucideIcon, CheckCircle2
} from 'lucide-react';

const ServicePage: React.FC = () => {
  const { language } = useLanguage();
  const t = UI_TEXT.servicesPage;
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    window.scrollTo(0, 0);

    const handleScroll = () => {
      const sections = CLAH_DETAILED_SERVICES.map(s => s.id);
      let current = '';
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && window.scrollY >= (element.offsetTop - 200)) {
          current = section;
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 120, // Offset for sticky headers
        behavior: 'smooth'
      });
    }
  };

  const iconMap: Record<string, LucideIcon> = {
    'Hammer': Hammer, 'PaintBucket': PaintBucket, 'Home': Home, 'FileText': FileText,
    'Ruler': Ruler, 'LayoutTemplate': LayoutTemplate, 'Box': Box, 'Palette': Palette,
    'Armchair': Armchair, 'Utensils': Utensils, 'Shirt': Shirt, 'Gem': Gem,
    'MapPin': MapPin, 'Laptop': Laptop, 'Coffee': Coffee, 'Users': Users
  };

  const getBrandColor = (index: number) => {
    switch (index) {
      case 0: return 'text-blue-600 bg-blue-50 border-blue-100 hover:border-blue-300';
      case 1: return 'text-purple-600 bg-purple-50 border-purple-100 hover:border-purple-300';
      case 2: return 'text-emerald-600 bg-emerald-50 border-emerald-100 hover:border-emerald-300';
      case 3: return 'text-orange-600 bg-orange-50 border-orange-100 hover:border-orange-300';
      default: return 'text-slate-600 bg-slate-50 border-slate-100';
    }
  };

  const getBrandHeaderColor = (index: number) => {
    switch (index) {
        case 0: return 'from-blue-600 to-blue-400';
        case 1: return 'from-purple-600 to-purple-400';
        case 2: return 'from-emerald-600 to-emerald-400';
        case 3: return 'from-orange-600 to-orange-400';
        default: return 'from-slate-600 to-slate-400';
      }
  };

  return (
    <div className="bg-white min-h-screen pt-20">
      {/* Hero Section - Matching Home Page Style */}
      <div className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2070&auto=format&fit=crop" 
            alt="Service Catalog Background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-slate-900/90" />
        </div>

        <div className="container mx-auto px-6 text-center relative z-10 text-white">
          <div className="inline-block px-4 py-1.5 mb-6 border border-white/30 rounded-full bg-white/10 backdrop-blur-md">
             <span className="text-sm font-medium tracking-wide text-blue-200 uppercase">
                 {language === 'vn' ? 'Danh mục dịch vụ' : 'Service Catalog'}
             </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight drop-shadow-lg">
            {t.hero.title[language]}
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed drop-shadow-md">
            {t.hero.subtitle[language]}
          </p>
        </div>
      </div>

      {/* Sticky Sub-navigation */}
      <div className="sticky top-[72px] z-40 bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 overflow-x-auto no-scrollbar">
          <div className="flex justify-start md:justify-center min-w-max">
            {CLAH_DETAILED_SERVICES.map((company, index) => (
              <button
                key={company.id}
                onClick={() => scrollToSection(company.id)}
                className={`px-6 py-4 text-sm font-bold uppercase tracking-wider transition-all border-b-4 ${
                  activeSection === company.id
                    ? index === 0 ? 'text-blue-700 border-blue-600 bg-blue-50/50' :
                      index === 1 ? 'text-purple-700 border-purple-600 bg-purple-50/50' :
                      index === 2 ? 'text-emerald-700 border-emerald-600 bg-emerald-50/50' :
                      'text-orange-700 border-orange-600 bg-orange-50/50'
                    : 'text-slate-500 border-transparent hover:text-slate-800 hover:bg-slate-50'
                }`}
              >
                {company.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12">
        <div className="flex flex-col gap-24">
            {CLAH_DETAILED_SERVICES.map((company, index) => {
                const headerColor = getBrandHeaderColor(index);
                
                return (
                    <section key={company.id} id={company.id} className="scroll-mt-40">
                        {/* Section Header */}
                        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-10 pb-6 border-b border-gray-100 gap-4">
                            <div>
                                <div className={`h-1.5 w-16 rounded-full bg-gradient-to-r ${headerColor} mb-4`} />
                                <h2 className="text-4xl font-bold text-slate-900 mb-2">{company.name}</h2>
                                <p className="text-slate-500 text-lg">
                                    {language === 'vn' ? 'Các giải pháp chuyên biệt' : 'Specialized solutions provided by'} {company.name}
                                </p>
                            </div>
                            <a 
                                href={company.services[0]?.link || '#'} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="group flex items-center gap-2 font-semibold text-slate-700 hover:text-blue-600 transition-colors"
                            >
                                {language === 'vn' ? 'Truy cập Website' : 'Visit Website'}
                                <ArrowRight size={18} className="transform group-hover:translate-x-1 transition-transform" />
                            </a>
                        </div>

                        {/* Services Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {company.services.map((service, sIdx) => {
                                const Icon = iconMap[service.iconName] || CheckCircle2;
                                const colorClass = getBrandColor(index);
                                
                                return (
                                    <a 
                                        key={sIdx}
                                        href={service.link}
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="group bg-white rounded-xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 flex flex-col h-full hover:-translate-y-1"
                                    >
                                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-colors border ${colorClass} group-hover:scale-110 duration-300`}>
                                            <Icon size={24} />
                                        </div>
                                        
                                        <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-700 transition-colors">
                                            {service.name[language]}
                                        </h3>
                                        
                                        <p className="text-slate-500 text-sm leading-relaxed mb-6 flex-1">
                                            {service.description[language]}
                                        </p>
                                        
                                        <div className="mt-auto flex items-center text-sm font-semibold text-slate-400 group-hover:text-blue-600 transition-colors">
                                            {language === 'vn' ? 'Tìm hiểu thêm' : 'Learn more'}
                                            <ArrowRight size={16} className="ml-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                                        </div>
                                    </a>
                                );
                            })}
                        </div>
                    </section>
                );
            })}
        </div>
      </div>
    </div>
  );
};

export default ServicePage;
