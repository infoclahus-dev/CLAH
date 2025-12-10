
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { CLAH_DETAILED_SERVICES } from '../constants';
import { 
  Hammer, PaintBucket, Home, FileText, 
  Ruler, LayoutTemplate, Box, Palette, 
  Armchair, Utensils, Shirt, Gem,
  MapPin, Laptop, Coffee, Users,
  LucideIcon, ArrowRight
} from 'lucide-react';

const SERVICE_IMAGES: Record<string, string[]> = {
  'custom-home': [
    '/public/customhome1.jpg', // Modern House Exterior
    'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=600&auto=format&fit=crop', // Construction Site
    'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=600&auto=format&fit=crop', // Architecture Detail
    'https://images.unsplash.com/photo-1590332766627-994f38d38f2b?q=80&w=600&auto=format&fit=crop'  // Blueprint/Planning
  ],
  'nca-designs': [
    'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=600&auto=format&fit=crop', // Modern Interior
    'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=600&auto=format&fit=crop', // Decor Setup
    'https://images.unsplash.com/photo-1631679706909-1844bbd07221?q=80&w=600&auto=format&fit=crop', // Living Room
    'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=600&auto=format&fit=crop'  // Minimal Design
  ],
  'design-your-rooms': [
    'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=600&auto=format&fit=crop', // Sofa Detail
    'https://images.unsplash.com/photo-1595428774223-ef52624120d2?q=80&w=600&auto=format&fit=crop', // Kitchen Cabinet
    'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?q=80&w=600&auto=format&fit=crop', // Modern Kitchen
    'https://images.unsplash.com/photo-1617325247661-675ab4b64ae4?q=80&w=600&auto=format&fit=crop'  // Wardrobe/Closet
  ],
  'ncm-cafe': [
    'https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=600&auto=format&fit=crop', // Cafe Vibe
    'https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?q=80&w=600&auto=format&fit=crop', // Co-working
    'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=600&auto=format&fit=crop', // Meeting Space
    'https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=600&auto=format&fit=crop'  // Event/Networking
  ]
};

const DetailedServiceList: React.FC = () => {
  const { language } = useLanguage();

  const iconMap: Record<string, LucideIcon> = {
    'Hammer': Hammer, 'PaintBucket': PaintBucket, 'Home': Home, 'FileText': FileText,
    'Ruler': Ruler, 'LayoutTemplate': LayoutTemplate, 'Box': Box, 'Palette': Palette,
    'Armchair': Armchair, 'Utensils': Utensils, 'Shirt': Shirt, 'Gem': Gem,
    'MapPin': MapPin, 'Laptop': Laptop, 'Coffee': Coffee, 'Users': Users
  };

  return (
    <div className="bg-white py-16 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6">
        {CLAH_DETAILED_SERVICES.map((company, index) => {
          const isEven = index % 2 === 0;
          const images = SERVICE_IMAGES[company.id] || [];

          return (
            <div 
              key={company.id} 
              className={`flex flex-col lg:flex-row items-center gap-12 xl:gap-20 py-12 ${
                !isEven ? 'lg:flex-row-reverse' : ''
              } ${index !== CLAH_DETAILED_SERVICES.length - 1 ? 'border-b border-gray-100' : ''}`}
            >
              {/* Text Content Side */}
              <div className="w-full lg:w-1/2">
                <div className="mb-8">
                  <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider mb-6 ${
                    index === 0 ? 'bg-blue-100 text-blue-700' :
                    index === 1 ? 'bg-purple-100 text-purple-700' :
                    index === 2 ? 'bg-emerald-100 text-emerald-700' :
                    'bg-orange-100 text-orange-700'
                  }`}>
                    {index + 1}. Brand Entity
                  </div>
                  <h2 className="text-5xl md:text-6xl font-bold text-slate-900 tracking-tight mb-6">
                    {company.name}
                  </h2>
                  <div className={`h-2 w-24 rounded-full ${
                    index === 0 ? 'bg-blue-600' :
                    index === 1 ? 'bg-purple-600' :
                    index === 2 ? 'bg-emerald-600' :
                    'bg-orange-500'
                  }`} />
                </div>

                <div className="flex flex-col gap-8">
                  {company.services.map((service, idx) => {
                    const Icon = iconMap[service.iconName] || Hammer;
                    return (
                      <a 
                        key={idx}
                        href={service.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-start gap-6 hover:translate-x-2 transition-transform duration-300"
                      >
                        {/* Icon Container */}
                        <div className={`flex-shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center transition-colors shadow-sm ${
                          index === 0 ? 'bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white' :
                          index === 1 ? 'bg-purple-50 text-purple-600 group-hover:bg-purple-600 group-hover:text-white' :
                          index === 2 ? 'bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white' :
                          'bg-orange-50 text-orange-600 group-hover:bg-orange-600 group-hover:text-white'
                        }`}>
                          <Icon size={28} strokeWidth={1.5} />
                        </div>

                        {/* Content */}
                        <div className="pt-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-xl font-bold text-slate-800 group-hover:text-blue-900 transition-colors">
                              {service.name[language]}
                            </h3>
                          </div>
                          <p className="text-slate-500 text-base leading-relaxed max-w-md">
                            {service.description[language]}
                          </p>
                        </div>
                      </a>
                    );
                  })}
                </div>
              </div>

              {/* Image Grid Side (4 Images) */}
              <div className="w-full lg:w-1/2">
                <div className="grid grid-cols-2 gap-4 md:gap-6">
                  {/* Left Column (Images 0 & 2) */}
                  <div className="flex flex-col gap-4 md:gap-6">
                      {[0, 2].map((imgIdx) => (
                           <div key={imgIdx} className="group relative overflow-hidden rounded-2xl shadow-lg aspect-[4/5]">
                                <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-slate-900/0 transition-all z-10" />
                                <img 
                                  src={images[imgIdx]} 
                                  alt={`${company.name} ${imgIdx}`}
                                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                                />
                           </div>
                      ))}
                  </div>

                  {/* Right Column (Images 1 & 3) - Shifted Down */}
                  <div className="flex flex-col gap-4 md:gap-6 pt-8 md:pt-16">
                      {[1, 3].map((imgIdx) => (
                           <div key={imgIdx} className="group relative overflow-hidden rounded-2xl shadow-lg aspect-[4/5]">
                                <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-slate-900/0 transition-all z-10" />
                                <img 
                                  src={images[imgIdx]} 
                                  alt={`${company.name} ${imgIdx}`}
                                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                                />
                           </div>
                      ))}
                  </div>
                </div>
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DetailedServiceList;
