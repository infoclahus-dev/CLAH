import React, { useEffect, useState, useMemo } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { UI_TEXT, SAMPLE_RESOURCES } from '../constants';
import { ArrowRight, Search, Loader2 } from 'lucide-react';
import { useWordPressPosts } from '../hooks/useWordPressPosts';
import { ResourceItem } from '../types';

const SkeletonCard: React.FC = () => (
  <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 animate-pulse">
    <div className="aspect-[4/3] bg-slate-200" />
    <div className="p-6">
      <div className="h-3 bg-slate-200 rounded w-24 mb-3" />
      <div className="h-5 bg-slate-200 rounded w-full mb-2" />
      <div className="h-5 bg-slate-200 rounded w-3/4 mb-4" />
      <div className="h-4 bg-slate-200 rounded w-20 mt-4" />
    </div>
  </div>
);

const ResourcesPage: React.FC = () => {
  const { language } = useLanguage();
  const t = UI_TEXT.resourcesPage;
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const categorySlugMap: Record<string, string> = {
    all: 'all',
    news: 'news',
    casestudy: 'case-study',
    pressrelease: 'press-release',
    blog: 'blog',
  };

  const { posts, loading, error, hasMore, loadMore } = useWordPressPosts({
    perPage: 9,
    categorySlug: categorySlugMap[activeCategory] || 'all',
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const displayPosts = useMemo(() => {
    let items: ResourceItem[] = posts.length > 0 ? posts : SAMPLE_RESOURCES;

    if (activeCategory !== 'all' && posts.length === 0) {
      items = SAMPLE_RESOURCES.filter(
        (item) => item.category.toLowerCase().replace(' ', '') === activeCategory
      );
    }

    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      items = items.filter(
        (item) =>
          item.title.en.toLowerCase().includes(term) ||
          item.title.vn.toLowerCase().includes(term) ||
          item.category.toLowerCase().includes(term)
      );
    }

    return items;
  }, [posts, activeCategory, searchTerm]);

  const categories = [
    { id: 'all', label: t.filters.all[language] },
    { id: 'news', label: t.filters.news[language] },
    { id: 'casestudy', label: t.filters.caseStudy[language] },
    { id: 'pressrelease', label: t.filters.press[language] },
    { id: 'blog', label: t.filters.blog[language] },
  ];

  const getCategoryColor = (category: string): string => {
    const cat = category.toLowerCase();
    if (cat.includes('news')) return 'bg-blue-600';
    if (cat.includes('blog')) return 'bg-orange-500';
    if (cat.includes('case')) return 'bg-emerald-600';
    if (cat.includes('press')) return 'bg-rose-600';
    return 'bg-slate-600';
  };

  return (
    <div className="bg-slate-50 min-h-screen pt-20">
      <div className="bg-white py-12 border-b border-gray-100">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            {t.hero.title[language]}
          </h1>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
            {t.hero.subtitle[language]}
          </p>
        </div>
      </div>

      <div className="sticky top-[72px] z-30 bg-white/90 backdrop-blur-md border-b border-gray-200">
        <div className="container mx-auto px-6 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
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

            <div className="relative w-full md:w-64 hidden md:block">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={language === 'vn' ? 'Tim kiem...' : 'Search...'}
                className="w-full pl-10 pr-4 py-2 bg-slate-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all"
              />
              <Search size={16} className="absolute left-3.5 top-2.5 text-slate-400" />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        {error && (
          <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-lg text-amber-800 text-sm">
            {language === 'vn'
              ? 'Khong the tai bai viet tu blog. Hien thi du lieu mau.'
              : 'Could not load posts from blog. Showing sample data.'}
          </div>
        )}

        {loading && displayPosts.length === 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : displayPosts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-slate-500 text-lg">
              {language === 'vn' ? 'Khong tim thay bai viet nao.' : 'No posts found.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayPosts.map((item) => (
              <a
                key={item.id}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full border border-gray-100 hover:-translate-y-1"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-slate-900/0 transition-colors z-10" />
                  <img
                    src={item.image}
                    alt={item.title[language]}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute top-4 left-4 z-20">
                    <span
                      className={`px-3 py-1 rounded text-xs font-bold uppercase tracking-wider text-white shadow-sm ${getCategoryColor(
                        item.category
                      )}`}
                    >
                      {item.category}
                    </span>
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <div className="text-xs font-medium text-slate-400 mb-3">{item.date}</div>
                  <h3
                    className="text-xl font-bold text-slate-900 mb-4 leading-snug group-hover:text-blue-700 transition-colors line-clamp-3"
                    dangerouslySetInnerHTML={{ __html: item.title[language] }}
                  />

                  <div className="mt-auto flex items-center text-sm font-bold text-slate-400 group-hover:text-blue-600 transition-colors pt-4 border-t border-gray-50">
                    {t.readMore[language]}
                    <ArrowRight
                      size={16}
                      className="ml-2 transform -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all"
                    />
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}

        {hasMore && !loading && (
          <div className="mt-10 text-center">
            <button
              onClick={loadMore}
              disabled={loading}
              className="px-8 py-3 bg-white border border-slate-200 text-slate-600 font-semibold rounded-full hover:bg-slate-50 hover:text-slate-900 transition-colors shadow-sm disabled:opacity-50"
            >
              {language === 'vn' ? 'Xem them bai viet' : 'Load More Articles'}
            </button>
          </div>
        )}

        {loading && displayPosts.length > 0 && (
          <div className="mt-10 flex justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-slate-400" />
          </div>
        )}
      </div>
    </div>
  );
};

export default ResourcesPage;
