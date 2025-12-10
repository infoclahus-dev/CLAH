// Contact form component for customer inquiries
import React, { useState, FormEvent } from 'react';
import { supabase } from '../lib/supabase';
import { UI_TEXT } from '../constants';
import { useLanguage } from '../contexts/LanguageContext';
import { Send } from 'lucide-react';

const ContactForm: React.FC = () => {
  const { language } = useLanguage();
  const t = UI_TEXT.contact.form;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service_interest: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const { error } = await supabase
        .from('contact_submissions')
        .insert([formData]);

      if (error) throw error;

      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        service_interest: '',
        message: ''
      });

      setTimeout(() => setSubmitStatus('idle'), 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-16 bg-gradient-to-br from-slate-900 to-slate-800">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-3 text-white">
            {t.title[language]}
          </h2>
          <p className="text-slate-400">
            {t.subtitle[language]}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">
                {t.name[language]} <span className="text-orange-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                placeholder={language === 'vn' ? 'Nguyễn Văn A' : 'John Doe'}
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                {t.email[language]} <span className="text-orange-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                placeholder="example@email.com"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-slate-300 mb-2">
                {t.phone[language]}
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                placeholder="+1 (650) 123-4567"
              />
            </div>

            <div>
              <label htmlFor="service_interest" className="block text-sm font-medium text-slate-300 mb-2">
                {t.service[language]}
              </label>
              <select
                id="service_interest"
                name="service_interest"
                value={formData.service_interest}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
              >
                <option value="" className="bg-slate-800">{t.serviceOptions.none[language]}</option>
                <option value="custom-home" className="bg-slate-800">{t.serviceOptions.customHome[language]}</option>
                <option value="design" className="bg-slate-800">{t.serviceOptions.design[language]}</option>
                <option value="furniture" className="bg-slate-800">{t.serviceOptions.furniture[language]}</option>
                <option value="cafe" className="bg-slate-800">{t.serviceOptions.cafe[language]}</option>
                <option value="other" className="bg-slate-800">{t.serviceOptions.other[language]}</option>
              </select>
            </div>
          </div>

          <div className="mb-6">
            <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">
              {t.message[language]} <span className="text-orange-500">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={5}
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all resize-none"
              placeholder={language === 'vn' ? 'Cho chúng tôi biết về dự án của bạn...' : 'Tell us about your project...'}
            />
          </div>

          {submitStatus === 'success' && (
            <div className="mb-6 p-4 bg-emerald-500/20 border border-emerald-500/50 rounded-xl text-emerald-300 text-center">
              {t.success[language]}
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-xl text-red-300 text-center">
              {t.error[language]}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold py-4 px-8 rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
          >
            {isSubmitting ? t.submitting[language] : t.submit[language]}
            {!isSubmitting && <Send size={18} className="group-hover:translate-x-1 transition-transform" />}
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactForm;
