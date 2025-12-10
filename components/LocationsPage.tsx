
import React, { useEffect, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { LOCATIONS_DATA, UI_TEXT } from '../constants';
import { MapPin, Phone, Mail } from 'lucide-react';

const LocationsPage: React.FC = () => {
  const { language } = useLanguage();
  const t = UI_TEXT.locationsPage;
  const [activeMap, setActiveMap] = useState<'hq' | 'vn'>('hq');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-slate-50 min-h-screen pt-20">
      {/* Hero Section */}
      <div className="bg-slate-900 text-white py-16 relative overflow-hidden">
        {/* World Map Background Pattern */}
        <div className="absolute inset-0 z-0 opacity-10" 
             style={{ 
               backgroundImage: `url("data:image/svg+xml,%3Csvg width='100%25' height='100%25' viewBox='0 0 1000 500' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M200,200 Q300,100 400,200 T600,200 T800,200' fill='none' stroke='white' stroke-width='2' /%3E%3C/svg%3E")`, 
               backgroundSize: 'cover'
             }}>
             {/* Simple Abstract Globe/Map representation */}
             <img src="https://upload.wikimedia.org/wikipedia/commons/8/80/World_map_-_low_resolution.svg" alt="World Map" className="w-full h-full object-cover grayscale invert" />
        </div>
        
        <div className="container mx-auto px-6 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">{t.hero.title[language]}</h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            {t.hero.subtitle[language]}
          </p>
        </div>
      </div>

      {/* Locations Grid */}
      <div className="container mx-auto px-6 py-12">
        {LOCATIONS_DATA.map((group, index) => (
          <div key={index} className="mb-12 last:mb-0">
            {/* Region Header */}
            <div className="flex items-center gap-4 mb-8">
                <div className="h-px bg-gray-200 flex-1"></div>
                <h2 className="text-2xl font-bold text-slate-900 uppercase tracking-widest px-4 border border-gray-200 py-2 rounded-full bg-white">
                    {group.region[language]}
                </h2>
                <div className="h-px bg-gray-200 flex-1"></div>
            </div>

            {/* Offices Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
               {group.offices.map((office) => (
                 <div key={office.id} className="group relative overflow-hidden rounded-3xl shadow-lg h-[450px] bg-white">
                    {/* Background Image */}
                    <div className="absolute inset-0 z-0">
                        <img 
                          src={office.image} 
                          alt={office.name[language]} 
                          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
                    </div>

                    {/* Floating Glass Content Card */}
                    <div className="absolute bottom-6 left-6 right-6 p-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl transition-all duration-300 group-hover:bg-white/20 group-hover:-translate-y-2 group-hover:shadow-xl flex flex-col gap-4">
                        <div>
                            <h3 className="text-2xl font-bold text-white mb-2">{office.name[language]}</h3>
                            <div className="flex flex-col gap-2 text-slate-100 text-sm">
                                <div className="flex items-start gap-3">
                                    <MapPin className="shrink-0 mt-0.5 text-orange-400" size={16} />
                                    <span className="leading-relaxed whitespace-pre-line opacity-90">{office.address}</span>
                                </div>
                                {office.phone && (
                                    <div className="flex items-center gap-3">
                                        <Phone className="shrink-0 text-blue-400" size={16} />
                                        <span className="opacity-90">{office.phone}</span>
                                    </div>
                                )}
                                {office.email && (
                                    <div className="flex items-center gap-3">
                                        <Mail className="shrink-0 text-emerald-400" size={16} />
                                        <span className="opacity-90">{office.email}</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        <a 
                           href={office.mapUrl || '#'}
                           target="_blank"
                           rel="noopener noreferrer"
                           className="w-full py-3 bg-white text-slate-900 text-sm font-bold rounded-xl text-center hover:bg-orange-50 transition-colors shadow-sm opacity-90 group-hover:opacity-100"
                        >
                           {t.viewMap[language]}
                        </a>
                    </div>
                 </div>
               ))}
            </div>
          </div>
        ))}
      </div>

      {/* Office Gallery Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-slate-900">{t.gallery[language]}</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[200px]">
                {/* Large Featured Image */}
                <div className="lg:col-span-2 lg:row-span-2 relative rounded-2xl overflow-hidden group">
                    <img 
                        src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop" 
                        alt="Office Space" 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/10 transition-colors" />
                </div>
                
                {/* Smaller Images */}
                <div className="relative rounded-2xl overflow-hidden group">
                     <img 
                        src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=800&auto=format&fit=crop" 
                        alt="Meeting Room" 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                </div>
                <div className="relative rounded-2xl overflow-hidden group">
                     <img 
                        src="https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?q=80&w=800&auto=format&fit=crop" 
                        alt="Co-working Area" 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                </div>
                <div className="relative rounded-2xl overflow-hidden group">
                     <img 
                        src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=800&auto=format&fit=crop" 
                        alt="Discussion" 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                </div>
                <div className="relative rounded-2xl overflow-hidden group">
                     <img 
                        src="https://images.unsplash.com/photo-1604328698692-f76ea9498e76?q=80&w=800&auto=format&fit=crop" 
                        alt="Lounge" 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                </div>
            </div>
        </div>
      </section>

      {/* Map Access Section */}
      <section className="bg-slate-50 py-16 border-t border-gray-200">
         <div className="container mx-auto px-6 max-w-6xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-slate-900">{t.mapAccess[language]}</h2>
            
            {/* Map Tabs */}
            <div className="flex justify-center mb-8">
                <div className="inline-flex bg-white p-1 rounded-full border border-gray-200 shadow-sm">
                    <button 
                        onClick={() => setActiveMap('hq')}
                        className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${
                            activeMap === 'hq' 
                                ? 'bg-slate-900 text-white shadow-sm' 
                                : 'text-slate-500 hover:text-slate-900'
                        }`}
                    >
                        Headquarters (USA)
                    </button>
                    <button 
                        onClick={() => setActiveMap('vn')}
                        className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${
                            activeMap === 'vn' 
                                ? 'bg-slate-900 text-white shadow-sm' 
                                : 'text-slate-500 hover:text-slate-900'
                        }`}
                    >
                        Vietnam Office
                    </button>
                </div>
            </div>

            {/* Map Content */}
            <div className="bg-white p-4 rounded-3xl shadow-lg border border-gray-100 flex flex-col md:flex-row gap-8 min-h-[400px]">
                {/* Details Side */}
                <div className="w-full md:w-1/3 p-4 flex flex-col justify-center">
                    <h3 className="text-2xl font-bold text-slate-900 mb-4">
                        {activeMap === 'hq' ? 'San Jose Headquarters' : 'Vietnam Regional Office'}
                    </h3>
                    <p className="text-slate-600 leading-relaxed mb-6">
                        {activeMap === 'hq' 
                            ? 'Located in the heart of Silicon Valley, our headquarters serves as the central hub for innovation and strategy.'
                            : 'Our Vietnam office in Ho Chi Minh City drives our Asian market operations and software development.'
                        }
                    </p>
                    <div className="space-y-4">
                        <div className="flex items-start gap-3">
                            <MapPin className="text-orange-500 shrink-0 mt-1" />
                            <p className="text-slate-700 font-medium">
                                {activeMap === 'hq' ? '2092 Concourse Drive, Ste 9,\nSan Jose, CA 95131' : '161 Ung Văn Khiêm, Phường Thạnh Mỹ Tây,\nBình Thạnh, TP. HCM'}
                            </p>
                        </div>
                        <div className="flex items-center gap-3">
                            <Phone className="text-blue-500 shrink-0" />
                            <p className="text-slate-700 font-medium">
                                {activeMap === 'hq' ? '+1 650-999-6797' : '+84 28 1234 5678'}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Map Frame Side */}
                <div className="w-full md:w-2/3 rounded-2xl overflow-hidden bg-slate-100 border border-gray-200">
                    <iframe 
                        title="Office Map"
                        width="100%" 
                        height="100%" 
                        frameBorder="0" 
                        style={{ border: 0, minHeight: '350px' }} 
                        src={activeMap === 'hq' 
                            ? "https://maps.google.com/maps?q=2092%20Concourse%20Drive%2C%20San%20Jose%2C%20CA&t=&z=15&ie=UTF8&iwloc=&output=embed"
                            : "https://maps.google.com/maps?q=161%20Ung%20Van%20Khiem%2C%20Ho%20Chi%20Minh&t=&z=15&ie=UTF8&iwloc=&output=embed"
                        }
                        allowFullScreen
                    ></iframe>
                </div>
            </div>
         </div>
      </section>
    </div>
  );
};

export default LocationsPage;
