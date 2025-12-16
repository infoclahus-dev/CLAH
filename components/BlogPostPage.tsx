import React, { useEffect } from 'react';
import { ArrowLeft, ArrowRight, Calendar, User } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useWordPressPost } from '../hooks/useWordPressPost';
import {
  getPostFeaturedImage,
  getPostCategory,
  getPostAuthor,
  formatPostDate,
} from '../services/wordpressService';
import Footer from './Footer';

interface BlogPostPageProps {
  slug: string;
  onBack: () => void;
  onViewPost: (slug: string) => void;
}

const SkeletonLoader: React.FC = () => (
  <div className="animate-pulse">
    <div className="h-[50vh] bg-slate-800" />
    <div className="container mx-auto px-6 py-12 max-w-3xl">
      <div className="h-4 bg-slate-700 rounded w-32 mb-4" />
      <div className="h-10 bg-slate-700 rounded w-full mb-2" />
      <div className="h-10 bg-slate-700 rounded w-3/4 mb-8" />
      <div className="space-y-4">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="h-4 bg-slate-700 rounded w-full" />
        ))}
      </div>
    </div>
  </div>
);

const BlogPostPage: React.FC<BlogPostPageProps> = ({ slug, onBack, onViewPost }) => {
  const { language } = useLanguage();
  const { post, relatedPosts, loading, error } = useWordPressPost(slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (loading) {
    return (
      <div className="bg-slate-950 min-h-screen pt-20">
        <SkeletonLoader />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="bg-slate-950 min-h-screen pt-20">
        <div className="container mx-auto px-6 py-20 text-center">
          <h1 className="text-2xl font-bold text-white mb-4">
            {language === 'vn' ? 'Khong tim thay bai viet' : 'Post Not Found'}
          </h1>
          <p className="text-slate-400 mb-8">
            {language === 'vn'
              ? 'Bai viet ban tim kiem khong ton tai hoac da bi xoa.'
              : 'The post you are looking for does not exist or has been removed.'}
          </p>
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-slate-900 rounded-full font-medium hover:bg-slate-100 transition-colors"
          >
            <ArrowLeft size={18} />
            {language === 'vn' ? 'Quay lai Resources' : 'Back to Resources'}
          </button>
        </div>
      </div>
    );
  }

  const featuredImage = getPostFeaturedImage(post);
  const category = getPostCategory(post);
  const author = getPostAuthor(post);
  const formattedDate = formatPostDate(post.date);

  return (
    <div className="bg-slate-950 min-h-screen pt-20">
      <div className="bg-slate-950">
        <div className="container mx-auto px-6 py-4">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors font-medium"
          >
            <ArrowLeft size={18} />
            {language === 'vn' ? 'Tat ca bai viet' : 'All Posts'}
          </button>
        </div>
      </div>

      <div className="relative h-[50vh] min-h-[400px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/40 via-slate-950/20 to-slate-950/80 z-10" />
        <img
          src={featuredImage}
          alt={post.title.rendered}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 z-20 p-8">
          <div className="container mx-auto max-w-3xl">
            <span className="inline-block px-3 py-1 rounded text-xs font-bold uppercase tracking-wider text-white bg-slate-800/80 backdrop-blur-sm shadow-sm mb-4">
              {category}
            </span>
            <h1
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4 drop-shadow-lg"
              dangerouslySetInnerHTML={{ __html: post.title.rendered }}
            />
            <div className="flex flex-wrap items-center gap-4 text-white/80 text-sm">
              <span className="flex items-center gap-2">
                <Calendar size={16} />
                {formattedDate}
              </span>
              {author && (
                <span className="flex items-center gap-2">
                  <User size={16} />
                  {author.name}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      <article className="container mx-auto px-6 py-12 max-w-3xl">
        <div
          className="prose prose-lg prose-invert max-w-none
            prose-headings:font-bold prose-headings:text-white
            prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
            prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
            prose-p:text-slate-300 prose-p:leading-relaxed
            prose-a:text-cyan-400 prose-a:no-underline hover:prose-a:underline
            prose-img:rounded-xl prose-img:shadow-lg
            prose-blockquote:border-l-4 prose-blockquote:border-slate-600 prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-slate-400
            prose-ul:list-disc prose-ul:pl-6
            prose-ol:list-decimal prose-ol:pl-6
            prose-li:text-slate-300
            prose-strong:text-white prose-strong:font-semibold
            prose-code:bg-slate-800 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:text-slate-200
            prose-pre:bg-slate-900 prose-pre:text-slate-100 prose-pre:rounded-xl"
          dangerouslySetInnerHTML={{ __html: post.content.rendered }}
        />

        {author && (
          <div className="mt-16 pt-8 border-t border-slate-800">
            <div className="flex items-center gap-4">
              {author.avatar_urls?.['96'] && (
                <img
                  src={author.avatar_urls['96']}
                  alt={author.name}
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-slate-700"
                />
              )}
              <div>
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">
                  {language === 'vn' ? 'Tac gia' : 'Written by'}
                </p>
                <h4 className="text-base font-semibold text-white">{author.name}</h4>
              </div>
            </div>
          </div>
        )}
      </article>

      {relatedPosts.length > 0 && (
        <section className="bg-slate-900 border-t border-slate-800 py-16">
          <div className="container mx-auto px-6">
            <h2 className="text-2xl font-bold text-white mb-8 text-center">
              {language === 'vn' ? 'Bai viet lien quan' : 'Related Posts'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {relatedPosts.map((relatedPost) => (
                <div
                  key={relatedPost.id}
                  onClick={() => onViewPost(relatedPost.slug)}
                  className="group cursor-pointer bg-slate-800/50 rounded-xl overflow-hidden hover:bg-slate-800 transition-all duration-300 border border-slate-700/50 hover:border-slate-600 hover:-translate-y-1"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-slate-900/0 transition-colors z-10" />
                    <img
                      src={getPostFeaturedImage(relatedPost)}
                      alt={relatedPost.title.rendered}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                      loading="lazy"
                    />
                    <div className="absolute top-4 left-4 z-20">
                      <span className="px-3 py-1 rounded text-xs font-bold uppercase tracking-wider text-white bg-slate-900/80 backdrop-blur-sm">
                        {getPostCategory(relatedPost)}
                      </span>
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="text-xs font-medium text-slate-500 mb-2">
                      {formatPostDate(relatedPost.date)}
                    </div>
                    <h3
                      className="text-base font-bold text-white leading-snug group-hover:text-cyan-400 transition-colors line-clamp-2"
                      dangerouslySetInnerHTML={{ __html: relatedPost.title.rendered }}
                    />
                    <div className="mt-3 flex items-center text-sm font-medium text-slate-400 group-hover:text-cyan-400 transition-colors">
                      {language === 'vn' ? 'Doc them' : 'Read more'}
                      <ArrowRight
                        size={14}
                        className="ml-1.5 transform -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default BlogPostPage;
