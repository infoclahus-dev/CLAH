import React from 'react';
import { Hammer, PenTool, Armchair, Coffee, ArrowRight } from 'lucide-react';
import { ServiceEntity } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

interface ServiceCardProps {
  entity: ServiceEntity;
}

const iconMap = {
  'Hammer': Hammer,
  'PenTool': PenTool,
  'Armchair': Armchair,
  'Coffee': Coffee
};

const ServiceCard: React.FC<ServiceCardProps> = ({ entity }) => {
  const { language } = useLanguage();
  const Icon = iconMap[entity.iconName];

  return (
    <div className="group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 flex flex-col h-full">
      {/* Image Section */}
      <div className="relative h-64 overflow-hidden">
        <div className="absolute inset-0 bg-gray-900/20 group-hover:bg-gray-900/10 transition-colors z-10" />
        <img 
          src={entity.imageUrl} 
          alt={entity.name} 
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute top-4 right-4 z-20 bg-white/90 backdrop-blur p-3 rounded-2xl shadow-lg text-orange-600">
          <Icon size={24} />
        </div>
      </div>

      {/* Content Section */}
      <div className="p-8 flex-1 flex flex-col">
        <h3 className="text-2xl font-bold text-slate-800 mb-2 group-hover:text-orange-600 transition-colors">
          {entity.name}
        </h3>
        <p className="text-slate-500 mb-6 flex-1 leading-relaxed">
          {entity.description[language]}
        </p>
        
        {/* Features Pills */}
        <div className="flex flex-wrap gap-2 mb-8">
          {entity.features[language].slice(0, 2).map((feat, idx) => (
            <span key={idx} className="px-3 py-1 bg-slate-100 text-slate-600 text-xs font-medium rounded-full">
              {feat}
            </span>
          ))}
        </div>

        <a 
          href={entity.websiteUrl || '#'}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-4 rounded-xl border-2 border-slate-100 group-hover:border-orange-600 group-hover:bg-orange-600 group-hover:text-white transition-all duration-300 font-semibold flex items-center justify-center gap-2"
        >
          {entity.ctaText[language]}
          <ArrowRight size={18} className="transform group-hover:translate-x-1 transition-transform" />
        </a>
      </div>
    </div>
  );
};

export default ServiceCard;