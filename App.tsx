
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ServiceCard from './components/ServiceCard';
import DetailedServiceList from './components/DetailedServiceList';
import AboutPage from './components/AboutPage';
import ContactPage from './components/ContactPage';
import ServicePage from './components/ServicePage';
import CareersPage from './components/CareersPage';
import ResourcesPage from './components/ResourcesPage';
import LocationsPage from './components/LocationsPage';
import EcosystemModel from './components/EcosystemModel';
import AIChatWidget from './components/AIChatWidget';
import ContactForm from './components/ContactForm';
import { CLAH_ENTITIES, UI_TEXT } from './constants';
import { MapPin, Phone, Mail, Instagram, Facebook, Linkedin, Youtube } from 'lucide-react';
import { useLanguage } from './contexts/LanguageContext';
import { ViewState } from './types';

const App: React.FC = () => {
  const { language } = useLanguage();
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const t = UI_TEXT;

  return (
    <div className="min-h-screen font-sans bg-slate-50 text-slate-800 selection:bg-blue-100 selection:text-blue-900">
      <Navbar onNavigate={setCurrentView} currentView={currentView} />
      
      <main>
        {currentView === 'home' && (
          <>
            <HeroSection />

             {/* Ecosystem Model Graphic */}
             <EcosystemModel />

            {/* Services Grid (The "Gateway") */}
            <section id="services" className="py-16 container mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {CLAH_ENTITIES.map((entity) => (
                  <ServiceCard key={entity.id} entity={entity} />
                ))}
              </div>
            </section>
            
            {/* Detailed Services List (New Section) */}
            <section id="detailed-services">
              <DetailedServiceList />
            </section>

            {/* Home About Teaser - Simplified version for landing */}
            <section id="about-teaser" className="py-16 bg-white">
              <div className="container mx-auto px-4 text-center">
                 <span className="text-blue-600 font-bold tracking-wider uppercase text-sm mb-4 block">
                    {t.about.vision[language]}
                 </span>
                 <h2 className="text-3xl md:text-5xl font-bold mb-8 leading-tight text-slate-900 whitespace-pre-line max-w-4xl mx-auto">
                    {t.about.title[language]}
                 </h2>
                 <p className="text-lg text-slate-600 mb-10 max-w-2xl mx-auto">
                    {t.about.desc1[language]}
                 </p>
                 <button 
                    onClick={() => { setCurrentView('about'); window.scrollTo(0, 0); }}
                    className="px-8 py-3 rounded-full border border-slate-200 text-slate-900 font-semibold hover:bg-slate-50 transition-colors"
                 >
                    {t.hero.aboutBtn[language]}
                 </button>
              </div>
            </section>

            {/* Vision / Borderless Section */}
            <section className="py-16 bg-white overflow-hidden border-t border-gray-100">
              <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
                  {/* Left Column: Typography */}
                  <div className="w-full lg:w-1/3 text-center lg:text-left">
                    <h2 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-600 leading-[0.9] tracking-tighter uppercase mb-6 whitespace-pre-line drop-shadow-sm">
                      {t.visionSection.title[language]}
                    </h2>
                    <p className="text-xl text-slate-600 font-medium">
                      {t.visionSection.subtitle[language]}
                    </p>
                  </div>
                  
                  {/* Right Column: 4 Vertical Pills */}
                  <div className="w-full lg:w-2/3 h-[400px] md:h-[500px] grid grid-cols-4 gap-4">
                     {/* Pill 1 */}
                     <div className="relative rounded-[100px] overflow-hidden mt-0 h-[85%] bg-orange-100 group shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-orange-500/30 hover:scale-105">
                        <img 
                            src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=600&auto=format&fit=crop" 
                            alt="Construction" 
                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" 
                        />
                     </div>
                     {/* Pill 2 */}
                     <div className="relative rounded-[100px] overflow-hidden mt-[20%] h-[80%] bg-blue-100 group shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-orange-500/30 hover:scale-105">
                        <img 
                            src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=600&auto=format&fit=crop" 
                            alt="Tech" 
                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" 
                        />
                     </div>
                     {/* Pill 3 */}
                     <div className="relative rounded-[100px] overflow-hidden mt-[5%] h-[95%] bg-emerald-100 group shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-orange-500/30 hover:scale-105">
                        <img 
                            src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=600&auto=format&fit=crop" 
                            alt="Community" 
                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" 
                        />
                     </div>
                     {/* Pill 4 */}
                     <div className="relative rounded-[100px] overflow-hidden mt-[15%] h-[85%] bg-purple-100 group shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-orange-500/30 hover:scale-105">
                         <img 
                            src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=600&auto=format&fit=crop" 
                            alt="Design" 
                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" 
                        />
                     </div>
                  </div>
                </div>
              </div>
            </section>
          </>
        )}

        {currentView === 'about' && <AboutPage />}
        {currentView === 'contact' && <ContactPage />}
        {currentView === 'services' && <ServicePage />}
        {currentView === 'careers' && <CareersPage />}
        {currentView === 'resources' && <ResourcesPage />}
        {currentView === 'locations' && <LocationsPage />}

        {/* CTA / Contact Section - Always visible */}
        <section id="contact" className="py-16 bg-white text-slate-900">
          <div className="container mx-auto px-4 text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.contact.title[language]}</h2>
            <p className="text-slate-600 max-w-xl mx-auto">
              {t.contact.subtitle[language]}
            </p>
          </div>

          <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 bg-slate-900 rounded-2xl border border-slate-800 hover:border-orange-500/50 transition-all duration-300 hover:-translate-y-1 group flex flex-col items-center md:items-start text-center md:text-left text-white">
              <div className="w-14 h-14 bg-blue-500/10 text-blue-400 rounded-2xl flex items-center justify-center mb-6 border border-blue-500/20 group-hover:border-blue-500/50 transition-colors">
                <MapPin size={26} />
              </div>
              <h3 className="text-xl font-bold mb-3">{t.contact.visit[language]}</h3>
              <p className="text-slate-400 text-sm leading-relaxed whitespace-pre-line">
                {t.contact.address}
              </p>
            </div>

            <div className="p-8 bg-slate-900 rounded-2xl border border-slate-800 hover:border-orange-500/50 transition-all duration-300 hover:-translate-y-1 group flex flex-col items-center md:items-start text-center md:text-left text-white">
              <div className="w-14 h-14 bg-emerald-500/10 text-emerald-400 rounded-2xl flex items-center justify-center mb-6 border border-emerald-500/20 group-hover:border-emerald-500/50 transition-colors">
                <Phone size={26} />
              </div>
              <h3 className="text-xl font-bold mb-3">{t.contact.call[language]}</h3>
              <p className="text-slate-400 text-sm">
                <a href={`tel:${t.contact.phoneNo}`} className="hover:text-white transition-colors block mb-1">
                  {t.contact.phoneNo}
                </a>
                <span className="text-slate-500 text-xs">Mon - Fri, 9am - 6pm</span>
              </p>
            </div>

            <div className="p-8 bg-slate-900 rounded-2xl border border-slate-800 hover:border-orange-500/50 transition-all duration-300 hover:-translate-y-1 group flex flex-col items-center md:items-start text-center md:text-left text-white">
              <div className="w-14 h-14 bg-purple-500/10 text-purple-400 rounded-2xl flex items-center justify-center mb-6 border border-purple-500/20 group-hover:border-purple-500/50 transition-colors">
                <Mail size={26} />
              </div>
              <h3 className="text-xl font-bold mb-3">{t.contact.email[language]}</h3>
              <p className="text-slate-400 text-sm">
                <a href={`mailto:${t.contact.emailAddr}`} className="hover:text-white transition-colors">
                  {t.contact.emailAddr}
                </a>
              </p>
            </div>
          </div>
        </section>

        {/* Contact Form - Only show on home, about, and careers */}
        {(currentView === 'home' || currentView === 'about' || currentView === 'careers') && <ContactForm />}

        {/* Footer */}
        <footer className="bg-slate-950 text-slate-400 py-8 border-t border-slate-900">
          <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-2xl font-bold text-white tracking-tighter">CLAH</div>
            <div className="flex gap-6">
              <a href="https://www.instagram.com/clah_us/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors"><Instagram size={20} /></a>
              <a href="https://www.facebook.com/clah.official/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors"><Facebook size={20} /></a>
              <a href="#" className="hover:text-white transition-colors"><Linkedin size={20} /></a>
              <a href="#" className="hover:text-white transition-colors"><Youtube size={20} /></a>
            </div>
            <div className="text-sm">
              © 2024 CLAH Ecosystem. All rights reserved.
            </div>
          </div>
        </footer>
      </main>

      <AIChatWidget />
    </div>
  );
};

export default App;
