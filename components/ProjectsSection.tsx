// Component to display CLAH projects with links to their landing pages
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { CLAH_ENTITIES } from '../constants';
import { UI_TEXT } from '../constants';

const ProjectsSection: React.FC = () => {
  const { language } = useLanguage();
  const t = UI_TEXT;

  const projects = CLAH_ENTITIES;

  return (
    <section className="py-20 bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-orange-500 font-bold tracking-wider uppercase text-sm mb-4 block">
            {language === 'vn' ? 'Dự Án Của Chúng Tôi' : 'Our Projects'}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900">
            {language === 'vn' ? 'Các Dự Án Đã & Đang Thực Hiện' : 'Completed & Ongoing Projects'}
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            {language === 'vn'
              ? 'Khám phá các dự án xuất sắc mà chúng tôi đã và đang phát triển trong hệ sinh thái CLAH.'
              : 'Explore the exceptional projects we have developed and are currently building in the CLAH ecosystem.'}
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-slate-100 flex flex-col h-full"
            >
              {/* Project Image */}
              <div className="relative h-48 overflow-hidden bg-slate-100 flex-shrink-0">
                <img
                  src={project.imageUrl}
                  alt={project.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Project Info */}
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-lg font-bold mb-6 text-slate-900 group-hover:text-orange-600 transition-colors flex items-center justify-center text-center">
                  {project.name}
                </h3>

                {/* CTA Button */}
                <a
                  href={project.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-full font-semibold hover:bg-orange-600 transition-all duration-300 group-hover:gap-3 text-sm mt-auto"
                >
                  <span>{language === 'vn' ? 'Xem Dự Án' : 'View Project'}</span>
                  <ArrowRight size={16} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
