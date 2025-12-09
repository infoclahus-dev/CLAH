
import React, { useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { UI_TEXT } from '../constants';
import { Award, Users, Heart, Lightbulb, Briefcase, Shield, LucideIcon, MapPin } from 'lucide-react';

const AboutPage: React.FC = () => {
  const { language } = useLanguage();
  const t = UI_TEXT.about;
  const tOffices = UI_TEXT.careersPage.offices;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const iconMap: Record<string, LucideIcon> = {
    'Lightbulb': Lightbulb,
    'Award': Award,
    'Briefcase': Briefcase,
    'Shield': Shield,
    'Users': Users,
    'Heart': Heart
  };

  return (
    <div className="bg-white min-h-screen pt-20">
      {/* About Hero */}
      <div className="relative h-[60vh] min-h-[500px] flex items-center justify-center bg-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
             <img 
                src="https://picsum.photos/1920/1080?random=15" 
                alt="CLAH Team" 
                className="w-full h-full object-cover opacity-50"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
        </div>
        <div className="relative z-10 text-center container mx-auto px-4">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">{t.pageTitle[language]}</h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                {t.desc1[language]}
            </p>
        </div>
      </div>

      {/* Story Section (Our Journey) */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-6">
            <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">
                {/* Text Side */}
                <div className="w-full lg:w-1/2 sticky top-24">
                    <span className="text-blue-600 font-bold tracking-wider uppercase text-sm mb-4 block">
                        {t.storyTitle[language]}
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-8 leading-tight">
                        {t.title[language]}
                    </h2>
                    <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                        {t.storyContent[language]}
                    </p>
                    <div className="relative pl-6 border-l-4 border-blue-500 bg-slate-50/80 p-6 rounded-r-2xl backdrop-blur-sm">
                        <p className="text-lg text-slate-700 italic font-medium leading-relaxed">
                            "{t.desc2[language]}"
                        </p>
                    </div>
                </div>

                {/* Image Side - Staggered Grid */}
                <div className="w-full lg:w-1/2 grid grid-cols-2 gap-6">
                    {/* Left Image (Road) - Pushed Down */}
                    <div className="pt-16">
                        <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[3/4] group">
                            <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-slate-900/0 transition-all z-10" />
                            <img 
                                src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=1000&auto=format&fit=crop" 
                                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" 
                                alt="Journey Road" 
                            />
                        </div>
                    </div>
                    {/* Right Image (Mist) - Aligned Top */}
                    <div>
                         <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[3/4] group">
                             <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-slate-900/0 transition-all z-10" />
                             <img 
                                src="https://images.unsplash.com/photo-1501854140884-074bf6b243e7?q=80&w=1000&auto=format&fit=crop" 
                                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" 
                                alt="Connecting Communities" 
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* Culture & Values Section */}
      <section className="py-20 bg-slate-50">
          <div className="container mx-auto px-6">
              <div className="text-center mb-16">
                  {/* CLAH Culture Label */}
                  <span className="text-blue-600 font-bold tracking-widest uppercase text-sm mb-6 block">
                      {t.values.cultureTitle[language]}
                  </span>
                  
                  {/* Slogan - Amber/Orange Gradient */}
                  <h2 className="text-4xl md:text-6xl lg:text-8xl font-black mb-20 tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-600 uppercase leading-none drop-shadow-sm filter hover:brightness-110 transition-all cursor-default">
                      {t.values.cultureSlogan[language]}
                  </h2>

                  {/* Core Values Label */}
                  <div className="relative py-8 mt-4">
                     <div className="absolute inset-0 flex items-center" aria-hidden="true">
                        <div className="w-full border-t border-gray-200"></div>
                     </div>
                     <div className="relative flex justify-center">
                        <span className="bg-slate-50 px-4 text-blue-600 font-bold tracking-widest uppercase text-sm">
                           {t.values.title[language]}
                        </span>
                     </div>
                  </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {t.values.items.map((item, idx) => {
                      const Icon = iconMap[item.icon];
                      return (
                        <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 text-center flex flex-col items-center group">
                              <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 transition-colors duration-300 ${
                                  idx % 3 === 0 ? 'bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white' :
                                  idx % 3 === 1 ? 'bg-purple-50 text-purple-600 group-hover:bg-purple-600 group-hover:text-white' :
                                  'bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white'
                              }`}>
                                  {Icon && <Icon size={32} />}
                              </div>
                              <h3 className="text-xl font-bold mb-3 text-slate-900">{item.title[language]}</h3>
                              <p className="text-slate-500 leading-relaxed">{item.desc[language]}</p>
                        </div>
                      );
                  })}
              </div>
          </div>
      </section>

      {/* Our Milestones Section */}
      <section className="py-24 bg-white overflow-hidden">
          <div className="container mx-auto px-6">
              <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">
                  
                  {/* Left Column: Text (Matching Our Journey Layout) */}
                  <div className="w-full lg:w-1/2 sticky top-24">
                       <span className="text-blue-600 font-bold tracking-wider uppercase text-sm mb-4 block">
                          {language === 'vn' ? 'Lịch sử phát triển' : 'Timeline'}
                       </span>
                      <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-8">
                        <span className="text-slate-900">Our </span>
                        <span className="text-[#a1826b]">{language === 'vn' ? 'Cột Mốc' : 'Milestones'}</span>
                      </h2>
                      <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                        {language === 'vn' 
                            ? 'Từ những bước đi đầu tiên vào năm 2005 đến việc hình thành một hệ sinh thái toàn diện. Mỗi cột mốc là một minh chứng cho sự cam kết và phát triển không ngừng của CLAH tại San Jose.' 
                            : 'From our first steps in 2005 to forming a comprehensive ecosystem. Each milestone is a testament to CLAH\'s commitment and continuous growth in San Jose.'
                        }
                      </p>
                  </div>

                  {/* Right Column: Staggered Diamond Grid */}
                  <div className="w-full lg:w-1/2 relative">
                      {/* Decorative Line (Hidden on small screens, adjusts to layout) */}
                      <div className="absolute top-20 bottom-20 left-1/2 w-0.5 bg-gray-100 hidden md:block -z-10" />

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
                          {t.milestones.items.map((item, index) => (
                              <div 
                                key={index} 
                                className={`flex flex-col items-center text-center group ${
                                    // Stagger effect: Push the 2nd item down
                                    index === 1 ? 'md:mt-32' : '' 
                                }`}
                              >
                                  {/* Diamond Shape Container */}
                                  <div className="relative w-36 h-36 mb-6 flex items-center justify-center">
                                      {/* Outer Soft Glow/Border Layer */}
                                      <div className="absolute inset-0 bg-orange-100/50 rounded-[2rem] rotate-45 scale-110 blur-[1px]"></div>
                                      
                                      {/* Main Gradient Diamond */}
                                      <div className="absolute inset-2 bg-gradient-to-br from-amber-300 to-orange-400 rounded-[1.5rem] rotate-45 shadow-xl flex items-center justify-center border-2 border-white/50 transition-transform duration-300 group-hover:scale-105">
                                          {/* Year Text (Counter Rotated) */}
                                          <span className="-rotate-45 text-white text-3xl font-extrabold drop-shadow-md">
                                              {item.year}
                                          </span>
                                      </div>
                                  </div>

                                  {/* Content Text */}
                                  <div className="flex flex-col gap-2 items-center mt-2">
                                      {item.lines.map((line, idx) => (
                                          <p 
                                            key={idx} 
                                            className="text-slate-900 font-extrabold text-sm uppercase tracking-wider"
                                          >
                                              {line[language]}
                                          </p>
                                      ))}
                                  </div>
                              </div>
                          ))}
                      </div>
                  </div>
              </div>
          </div>
      </section>

       {/* Our Offices Section */}
       <section className="py-24 bg-slate-50 border-t border-gray-100">
         <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-16 text-slate-900">{tOffices.title[language]}</h2>
            {/* Removed max-w-5xl to let images expand to container width */}
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
                  <div className="absolute bottom-0 left-0 p-8 z-10">
                     <h3 className="text-2xl font-bold text-white mb-3">{tOffices.hq.name[language]}</h3>
                     <p className="text-slate-200 flex items-start gap-3 text-lg leading-relaxed">
                        <MapPin className="mt-1 shrink-0 text-blue-400" size={20} />
                        <span className="whitespace-pre-line">{tOffices.hq.address}</span>
                     </p>
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
                  <div className="absolute bottom-0 left-0 p-8 z-10">
                     <h3 className="text-2xl font-bold text-white mb-3">{tOffices.vn.name[language]}</h3>
                     <p className="text-slate-200 flex items-start gap-3 text-lg leading-relaxed">
                        <MapPin className="mt-1 shrink-0 text-orange-400" size={20} />
                        <span className="whitespace-pre-line">{tOffices.vn.address}</span>
                     </p>
                  </div>
               </div>

            </div>
         </div>
      </section>
    </div>
  );
};

export default AboutPage;
