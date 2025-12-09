
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
import EcosystemModel from './components/EcosystemModel';
import AIChatWidget from './components/AIChatWidget';
import { CLAH_ENTITIES, UI_TEXT } from './constants';
import { MapPin, Phone, Mail, Instagram, Facebook, Linkedin } from 'lucide-react';
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
            <section id="services" className="py-24 container mx-auto px-4">
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
            <section id="about-teaser" className="py-20 bg-white">
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
          </>
        )}

        {currentView === 'about' && <AboutPage />}
        {currentView === 'contact' && <ContactPage />}
        {currentView === 'services' && <ServicePage />}
        {currentView === 'careers' && <CareersPage />}
        {currentView === 'resources' && <ResourcesPage />}

        {/* CTA / Contact Section - Always visible */}
        <section id="contact" className="py-24 bg-slate-900 text-white">
          <div className="container mx-auto px-4 text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.contact.title[language]}</h2>
            <p className="text-slate-400 max-w-xl mx-auto">
              {t.contact.subtitle[language]}
            </p>
          </div>

          <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
            <div className="p-8 bg-slate-800/50 rounded-2xl border border-slate-700/50 hover:border-blue-500/50 transition-colors">
              <div className="w-12 h-12 bg-blue-600/20 text-blue-400 rounded-xl flex items-center justify-center mx-auto md:mx-0 mb-6">
                <MapPin size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">{t.contact.visit[language]}</h3>
              <p className="text-slate-400">
                {t.contact.address}
              </p>
            </div>

            <div className="p-8 bg-slate-800/50 rounded-2xl border border-slate-700/50 hover:border-blue-500/50 transition-colors">
              <div className="w-12 h-12 bg-emerald-600/20 text-emerald-400 rounded-xl flex items-center justify-center mx-auto md:mx-0 mb-6">
                <Phone size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">{t.contact.call[language]}</h3>
              <p className="text-slate-400">
                {t.contact.phoneNo}<br/>
                Mon - Fri, 9am - 6pm
              </p>
            </div>

            <div className="p-8 bg-slate-800/50 rounded-2xl border border-slate-700/50 hover:border-blue-500/50 transition-colors">
              <div className="w-12 h-12 bg-purple-600/20 text-purple-400 rounded-xl flex items-center justify-center mx-auto md:mx-0 mb-6">
                <Mail size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">{t.contact.email[language]}</h3>
              <p className="text-slate-400">
                {t.contact.emailAddr}<br/>
              </p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-slate-950 text-slate-400 py-12 border-t border-slate-900">
          <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-2xl font-bold text-white tracking-tighter">CLAH</div>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors"><Instagram size={20} /></a>
              <a href="#" className="hover:text-white transition-colors"><Facebook size={20} /></a>
              <a href="#" className="hover:text-white transition-colors"><Linkedin size={20} /></a>
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
