
import React, { useEffect, useState, useRef } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { UI_TEXT } from '../constants';
import {
  MapPin, ArrowRight, CheckCircle2, Briefcase,
  DollarSign, Clock, ChevronDown, ChevronUp,
  Upload, Globe
} from 'lucide-react';
import BlueprintCanvas from './BlueprintCanvas';

const CareersPage: React.FC = () => {
  const { language } = useLanguage();
  const t = UI_TEXT.careersPage;
  const [expandedJob, setExpandedJob] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);
  const [positionApplied, setPositionApplied] = useState('');

  useEffect(() => {
    setMounted(true);
    window.scrollTo(0, 0);
  }, []);

  const toggleJob = (index: number) => {
    if (expandedJob === index) {
      setExpandedJob(null);
    } else {
      setExpandedJob(index);
    }
  };

  const handleApplyClick = (e: React.MouseEvent, jobTitle: string) => {
    e.stopPropagation();
    setPositionApplied(jobTitle);
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-white min-h-screen pt-20">
      {/* Hero Section */}
      <div className="bg-slate-900 text-white pt-20 pb-24 relative overflow-hidden">
        <BlueprintCanvas />
        <div className={`container mx-auto px-6 text-center relative z-10 transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <span className="inline-block py-1 px-3 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm text-xs font-bold tracking-widest uppercase mb-6">
             {t.hero.title[language]}
          </span>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight max-w-4xl mx-auto">
            {t.hero.subtitle[language]}
          </h1>
           <button 
             onClick={() => document.getElementById('open-positions')?.scrollIntoView({ behavior: 'smooth' })}
             className="px-8 py-4 bg-orange-600 hover:bg-orange-700 text-white rounded-full font-semibold transition-all hover:scale-105 active:scale-95 flex items-center gap-2 mx-auto shadow-lg shadow-orange-900/30"
           >
            {t.hero.cta[language]}
            <ArrowRight size={20} />
          </button>
        </div>
      </div>

      {/* Intro Section */}
      <section className="py-16 bg-white">
        <div className={`container mx-auto px-6 max-w-4xl text-center transition-all duration-1000 delay-300 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
            <h2 className="text-3xl font-bold text-slate-900 mb-6">{t.intro.title[language]}</h2>
            <p className="text-xl text-slate-600 leading-relaxed">
                {t.intro.content[language]}
            </p>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-slate-50">
          <div className="container mx-auto px-6">
              <h2 className="text-3xl font-bold text-center mb-10 text-slate-900">{t.benefits.title[language]}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {t.benefits.items.map((item, idx) => (
                      <div key={idx} className="group bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                          <div className="w-12 h-12 bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors rounded-xl flex items-center justify-center mb-6">
                              {idx === 0 && <DollarSign size={24} />}
                              {idx === 1 && <CheckCircle2 size={24} />}
                              {idx === 2 && <Globe size={24} />}
                              {idx === 3 && <Briefcase size={24} />}
                          </div>
                          <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title[language]}</h3>
                          <p className="text-slate-500 leading-relaxed">{item.desc[language]}</p>
                      </div>
                  ))}
              </div>
          </div>
      </section>

      {/* Jobs Section */}
      <section id="open-positions" className="py-16 bg-white">
          <div className="container mx-auto px-6 max-w-5xl">
              <h2 className="text-3xl font-bold text-center mb-10 text-slate-900">{t.jobs.title[language]}</h2>
              <div className="space-y-6">
                  {t.jobs.list.map((job, idx) => (
                      <div key={idx} className="border border-gray-200 rounded-2xl overflow-hidden hover:border-orange-300 hover:shadow-md transition-all duration-300">
                          <button 
                            onClick={() => toggleJob(idx)}
                            className="w-full flex items-center justify-between p-6 bg-white hover:bg-gray-50 transition-colors text-left"
                          >
                              <div className="flex flex-col md:flex-row md:items-center gap-4">
                                  <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center font-bold text-lg shrink-0">
                                      {job.dept.substring(0, 2).toUpperCase()}
                                  </div>
                                  <div>
                                      <h3 className="text-xl font-bold text-slate-900">{job.title}</h3>
                                      <div className="flex items-center gap-4 text-sm text-slate-500 mt-1">
                                          <span className="flex items-center gap-1"><Briefcase size={14} /> {job.dept}</span>
                                          <span className="flex items-center gap-1"><MapPin size={14} /> {job.location}</span>
                                          <span className="flex items-center gap-1"><Clock size={14} /> {job.type}</span>
                                      </div>
                                  </div>
                              </div>
                              <div className="flex items-center gap-4">
                                  <span className="hidden md:inline-block px-4 py-2 bg-blue-50 text-blue-700 font-semibold rounded-full text-sm">
                                      {t.jobs.viewDetail[language]}
                                  </span>
                                  {expandedJob === idx ? <ChevronUp className="text-slate-400" /> : <ChevronDown className="text-slate-400" />}
                              </div>
                          </button>

                          {expandedJob === idx && (
                              <div className="p-8 bg-slate-50 border-t border-gray-200 animate-fade-in-down">
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-8">
                                      <div>
                                          <h4 className="font-bold text-slate-900 mb-4">{t.jobs.jobDetails.desc[language]}</h4>
                                          <p className="text-slate-600 leading-relaxed mb-6">{job.details.description[language]}</p>
                                          
                                          <h4 className="font-bold text-slate-900 mb-4">{t.jobs.jobDetails.reqs[language]}</h4>
                                          <ul className="space-y-2 mb-6">
                                              {job.details.requirements[language].map((req: string, i: number) => (
                                                  <li key={i} className="flex items-start gap-2 text-slate-600">
                                                      <CheckCircle2 size={18} className="text-blue-500 mt-1 shrink-0" />
                                                      <span>{req}</span>
                                                  </li>
                                              ))}
                                          </ul>
                                      </div>
                                      <div>
                                          <h4 className="font-bold text-slate-900 mb-4">{t.jobs.jobDetails.benefits[language]}</h4>
                                          <ul className="space-y-2 mb-6">
                                              {job.details.benefits[language].map((ben: string, i: number) => (
                                                  <li key={i} className="flex items-start gap-2 text-slate-600">
                                                      <CheckCircle2 size={18} className="text-emerald-500 mt-1 shrink-0" />
                                                      <span>{ben}</span>
                                                  </li>
                                              ))}
                                          </ul>

                                          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                                              <div className="text-sm text-slate-500 mb-1">{t.jobs.jobDetails.deadline[language]}</div>
                                              <div className="font-semibold text-slate-900 mb-6">{job.details.deadline[language]}</div>
                                              <button
                                                onClick={(e) => handleApplyClick(e, job.title)}
                                                className="block w-full py-3 bg-orange-600 hover:bg-orange-700 active:scale-95 text-white text-center rounded-lg font-bold transition-all shadow-md hover:shadow-lg"
                                              >
                                                  {t.jobs.apply[language]}
                                              </button>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          )}
                      </div>
                  ))}
              </div>
          </div>
      </section>

      {/* General Application Form */}
      <section ref={formRef} className="py-16 bg-slate-50 border-t border-gray-200 scroll-mt-20">
           <div className="container mx-auto px-6 max-w-3xl">
              <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-slate-900 mb-4">{t.form.title[language]}</h2>
                  <p className="text-slate-500">Don't see a position that fits? Send us your resume.</p>
              </div>
              
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
                  <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                              <label className="block text-sm font-medium text-slate-700 mb-2">{t.form.firstName[language]}<span className="text-red-500">*</span></label>
                              <input type="text" className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white text-slate-900 focus:ring-2 focus:ring-orange-100 focus:border-orange-500 outline-none transition-all" />
                          </div>
                          <div>
                              <label className="block text-sm font-medium text-slate-700 mb-2">{t.form.lastName[language]}<span className="text-red-500">*</span></label>
                              <input type="text" className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white text-slate-900 focus:ring-2 focus:ring-orange-100 focus:border-orange-500 outline-none transition-all" />
                          </div>
                      </div>

                       <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">{t.form.preferredName[language]}</label>
                          <input type="text" className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white text-slate-900 focus:ring-2 focus:ring-orange-100 focus:border-orange-500 outline-none transition-all" />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                              <label className="block text-sm font-medium text-slate-700 mb-2">{t.form.email[language]}<span className="text-red-500">*</span></label>
                              <input type="email" className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white text-slate-900 focus:ring-2 focus:ring-orange-100 focus:border-orange-500 outline-none transition-all" />
                          </div>
                          <div>
                              <label className="block text-sm font-medium text-slate-700 mb-2">{t.form.phone[language]}<span className="text-red-500">*</span></label>
                              <input type="tel" className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white text-slate-900 focus:ring-2 focus:ring-orange-100 focus:border-orange-500 outline-none transition-all" />
                          </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                           <div>
                              <label className="block text-sm font-medium text-slate-700 mb-2">{t.form.country[language]}<span className="text-red-500">*</span></label>
                              <select className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white text-slate-900 focus:ring-2 focus:ring-orange-100 focus:border-orange-500 outline-none transition-all">
                                  <option>Vietnam (+84)</option>
                                  <option>United States (+1)</option>
                              </select>
                          </div>
                           <div>
                              <label className="block text-sm font-medium text-slate-700 mb-2">{t.form.location[language]}<span className="text-red-500">*</span></label>
                              <input type="text" className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white text-slate-900 focus:ring-2 focus:ring-orange-100 focus:border-orange-500 outline-none transition-all" />
                              <button className="text-xs text-blue-600 font-medium mt-1 hover:underline">{t.form.locateMe[language]}</button>
                          </div>
                      </div>

                      {/* Current Position */}
                      <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">{t.form.currentPosition[language]}</label>
                          <input type="text" placeholder={language === 'vn' ? 'Ví dụ: Senior Software Engineer' : 'e.g., Senior Software Engineer'} className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white text-slate-900 focus:ring-2 focus:ring-orange-100 focus:border-orange-500 outline-none transition-all" />
                      </div>

                      {/* Position Applied For - Auto-filled if clicked from job list */}
                       <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">{t.form.position[language]}</label>
                          <select 
                            className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white text-slate-900 focus:ring-2 focus:ring-orange-100 focus:border-orange-500 outline-none transition-all"
                            value={positionApplied}
                            onChange={(e) => setPositionApplied(e.target.value)}
                          >
                             <option value="">Select a position...</option>
                             {t.jobs.list.map((job, idx) => (
                                 <option key={idx} value={job.title}>{job.title}</option>
                             ))}
                             <option value="other">Other / General Application</option>
                          </select>
                      </div>

                       <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">{t.form.resume[language]}<span className="text-red-500">*</span></label>
                          <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-orange-400 hover:bg-orange-50 transition-all cursor-pointer bg-slate-50 group">
                              <Upload className="mx-auto text-slate-400 group-hover:text-orange-500 mb-4 transition-colors" size={32} />
                              <div className="space-y-2">
                                  <button className="px-6 py-2 bg-white border border-gray-200 rounded-full text-sm font-semibold text-slate-700 hover:border-orange-300 transition-colors shadow-sm">{t.form.attach[language]}</button>
                                  <button className="px-6 py-2 bg-white border border-gray-200 rounded-full text-sm font-semibold text-slate-700 hover:border-orange-300 transition-colors shadow-sm mx-2">{t.form.dropbox[language]}</button>
                              </div>
                              <p className="text-xs text-slate-400 mt-4">{t.form.fileTypes[language]}</p>
                          </div>
                      </div>

                       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                              <label className="block text-sm font-medium text-slate-700 mb-2">{t.form.currentSalary[language]}<span className="text-red-500">*</span></label>
                              <input type="text" className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white text-slate-900 focus:ring-2 focus:ring-orange-100 focus:border-orange-500 outline-none transition-all" />
                          </div>
                          <div>
                              <label className="block text-sm font-medium text-slate-700 mb-2">{t.form.expectedSalary[language]}<span className="text-red-500">*</span></label>
                              <input type="text" className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white text-slate-900 focus:ring-2 focus:ring-orange-100 focus:border-orange-500 outline-none transition-all" />
                          </div>
                      </div>

                       <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">{t.form.linkedin[language]}</label>
                          <input type="text" className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white text-slate-900 focus:ring-2 focus:ring-orange-100 focus:border-orange-500 outline-none transition-all" />
                      </div>

                       <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">{t.form.noticePeriod[language]}</label>
                          <input type="text" className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white text-slate-900 focus:ring-2 focus:ring-orange-100 focus:border-orange-500 outline-none transition-all" />
                      </div>

                      <button className="w-full py-4 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 active:scale-95 active:translate-y-0">
                          {t.form.submit[language]}
                      </button>
                  </form>
              </div>
           </div>
      </section>

      {/* Our Offices Section */}
      <section className="py-16 bg-white border-t border-gray-100">
         <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-10 text-slate-900">{t.offices.title[language]}</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
               
               {/* Headquarters */}
               <div className="group relative overflow-hidden rounded-3xl shadow-lg h-[400px]">
                  <div className="absolute inset-0 z-0">
                     <img 
                       src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop" 
                       alt="San Jose HQ" 
                       className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                     />
                     <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
                  </div>
                  {/* Floating Glass Card */}
                  <div className="absolute bottom-6 left-6 right-6 p-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl transition-all duration-300 group-hover:bg-white/20 group-hover:-translate-y-2 group-hover:shadow-xl">
                     <h3 className="text-2xl font-bold text-white mb-2">{t.offices.hq.name[language]}</h3>
                     <p className="text-slate-100 flex items-start gap-3 text-lg leading-relaxed mb-4">
                        <MapPin className="mt-1 shrink-0 text-blue-300" size={20} />
                        <span className="whitespace-pre-line">{t.offices.hq.address}</span>
                     </p>
                     <button className="px-4 py-2 bg-white text-slate-900 text-sm font-bold rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        View on Map
                     </button>
                  </div>
               </div>

               {/* Vietnam Office */}
               <div className="group relative overflow-hidden rounded-3xl shadow-lg h-[400px]">
                   <div className="absolute inset-0 z-0">
                     <img 
                       src="https://images.unsplash.com/photo-1555217851-614f536ad3f8?q=80&w=1974&auto=format&fit=crop" 
                       alt="Vietnam Office" 
                       className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                     />
                     <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
                  </div>
                  {/* Floating Glass Card */}
                  <div className="absolute bottom-6 left-6 right-6 p-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl transition-all duration-300 group-hover:bg-white/20 group-hover:-translate-y-2 group-hover:shadow-xl">
                     <h3 className="text-2xl font-bold text-white mb-2">{t.offices.vn.name[language]}</h3>
                     <p className="text-slate-100 flex items-start gap-3 text-lg leading-relaxed mb-4">
                        <MapPin className="mt-1 shrink-0 text-orange-300" size={20} />
                        <span className="whitespace-pre-line">{t.offices.vn.address}</span>
                     </p>
                      <button className="px-4 py-2 bg-white text-slate-900 text-sm font-bold rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        View on Map
                     </button>
                  </div>
               </div>

            </div>
         </div>
      </section>
    </div>
  );
};

export default CareersPage;
