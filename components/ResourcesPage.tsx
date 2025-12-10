
import React, { useEffect, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { UI_TEXT, SAMPLE_RESOURCES } from '../constants';
import { ArrowRight, ChevronRight, Search } from 'lucide-react';

const ResourcesPage: React.FC = () => {
  const { language } = useLanguage();
  const t = UI_TEXT.resourcesPage;
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [filteredResources, setFilteredResources] = useState(SAMPLE_RESOURCES);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (activeCategory === 'all') {
      setFilteredResources(SAMPLE_RESOURCES);
    } else {
      setFilteredResources(SAMPLE_RESOURCES.filter(item => item.category.toLowerCase().replace(' ', '') === activeCategory));
    }
  }, [activeCategory]);

  const categories = [
    { id: 'all', label: t.filters.all[language] },
    { id: 'news', label: t.filters.news[language] },
    { id: 'casestudy', label: t.filters.caseStudy[language] },
    { id: 'pressrelease', label: t.filters.press[language] },
    { id: 'blog', label: t.filters.blog[language] }
  ];

  return (
    <div className="bg-slate-50 min-h-screen pt-20">
      {/* Simple Text Header */}
      <div className="bg-white py-12 border-b border-gray-100">
        <div className="container mx-auto px-6 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">{t.hero.title[language]}</h1>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
              {t.hero.subtitle[language]}
            </p>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="sticky top-[72px] z-30 bg-white/90 backdrop-blur-md border-b border-gray-200">
         <div className="container mx-auto px-6 py-4">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                {/* Categories */}
                <div className="flex flex-wrap justify-center gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setActiveCategory(cat.id)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                        activeCategory === cat.id
                          ? 'bg-slate-900 text-white'
                          : 'text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>

                {/* Search - Visual Only */}
                <div className="relative w-full md:w-64 hidden md:block">
                   <input 
                      type="text" 
                      placeholder={language === 'vn' ? "Tìm kiếm..." : "Search..."}
                      className="w-full pl-10 pr-4 py-2 bg-slate-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all"
                   />
                   <Search size={16} className="absolute left-3.5 top-2.5 text-slate-400" />
                </div>
            </div>
         </div>
      </div>

      {/* Content Grid */}
      <div className="container mx-auto px-6 py-12">
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredResources.map((item) => (
                <a 
                  key={item.id} 
                  href={item.link}
                  className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full border border-gray-100 hover:-translate-y-1"
                >
                   {/* Image Container */}
                   <div className="relative aspect-[4/3] overflow-hidden">
                      <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-slate-900/0 transition-colors z-10" />
                      <img 
                        src={item.image} 
                        alt={item.title[language]} 
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                      {/* Category Badge */}
                      <div className="absolute top-4 left-4 z-20">
                         <span className={`px-3 py-1 rounded text-xs font-bold uppercase tracking-wider text-white shadow-sm ${
                            item.category === 'News' ? 'bg-blue-600' :
                            item.category === 'Blog' ? 'bg-orange-500' :
                            item.category === 'Case Study' ? 'bg-emerald-600' :
                            'bg-purple-600'
                         }`}>
                           {item.category}
                         </span>
                      </div>
                   </div>

                   {/* Content */}
                   <div className="p-6 flex flex-col flex-1">
                      <div className="text-xs font-medium text-slate-400 mb-3">{item.date}</div>
                      <h3 className="text-xl font-bold text-slate-900 mb-4 leading-snug group-hover:text-blue-700 transition-colors line-clamp-3">
                        {item.title[language]}
                      </h3>
                      
                      <div className="mt-auto flex items-center text-sm font-bold text-slate-400 group-hover:text-blue-600 transition-colors pt-4 border-t border-gray-50">
                        {t.readMore[language]}
                        <ArrowRight size={16} className="ml-2 transform -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                      </div>
                   </div>
                </a>
            ))}
         </div>
         
         {/* Load More Button */}
         <div className="mt-10 text-center">
            <button className="px-8 py-3 bg-white border border-slate-200 text-slate-600 font-semibold rounded-full hover:bg-slate-50 hover:text-slate-900 transition-colors shadow-sm">
               {language === 'vn' ? 'Xem thêm bài viết' : 'Load More Articles'}
            </button>
         </div>
      </div>
    </div>
  );
};

export default ResourcesPage;
