// Multi-step form component for job applications and inquiries
import React, { useState, FormEvent } from 'react';
import { supabase } from '../lib/supabase';
import { UI_TEXT } from '../constants';
import { useLanguage } from '../contexts/LanguageContext';
import { Send, Upload, ChevronRight, ChevronLeft } from 'lucide-react';

const ContactForm: React.FC = () => {
  const { language } = useLanguage();
  const t = UI_TEXT.contact.form;

  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    positionAppliedFor: '',
    message: '',
    attachmentUrl: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `attachments/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('contact_attachments')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('contact_attachments')
        .getPublicUrl(filePath);

      setFormData(prev => ({ ...prev, attachmentUrl: data.publicUrl }));
      setUploadProgress(100);
      setTimeout(() => setUploadProgress(0), 2000);
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Error uploading file. Please try again.');
    }
  };

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.firstName && formData.lastName && formData.email && formData.phone && formData.positionAppliedFor) {
      setCurrentStep(2);
    }
  };

  const handlePrevStep = () => {
    setCurrentStep(1);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const submissionData = {
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        position_applied_for: formData.positionAppliedFor,
        message: formData.message,
        attachment_url: formData.attachmentUrl
      };

      const { error } = await supabase
        .from('contact_submissions')
        .insert([submissionData]);

      if (error) throw error;

      await fetch('https://services.leadconnectorhq.com/hooks/RoIyYKYL5UPrQFUDZqRu/webhook-trigger/3221a411-4c51-4092-a2f5-2454bb8a9a4e', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      });

      setSubmitStatus('success');
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        positionAppliedFor: '',
        message: '',
        attachmentUrl: ''
      });
      setCurrentStep(1);

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
            {currentStep === 1 ? 'Job Application' : 'Additional Information'}
          </h2>
          <p className="text-slate-400">
            Step {currentStep} of 2
          </p>
        </div>

        <form onSubmit={currentStep === 1 ? handleNextStep : handleSubmit} className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
          {currentStep === 1 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-slate-300 mb-2">
                    First Name <span className="text-orange-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                    placeholder="John"
                  />
                </div>

                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-slate-300 mb-2">
                    Last Name <span className="text-orange-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                    Email <span className="text-orange-500">*</span>
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

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-slate-300 mb-2">
                    Phone <span className="text-orange-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                    placeholder="+1 (650) 123-4567"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label htmlFor="positionAppliedFor" className="block text-sm font-medium text-slate-300 mb-2">
                  Position Applied For <span className="text-orange-500">*</span>
                </label>
                <input
                  type="text"
                  id="positionAppliedFor"
                  name="positionAppliedFor"
                  value={formData.positionAppliedFor}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  placeholder="e.g., Senior Software Engineer"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold py-4 px-8 rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all duration-300 flex items-center justify-center gap-2 group"
              >
                Next Step
                <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </>
          ) : (
            <>
              <div className="mb-6">
                <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">
                  Additional Information
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all resize-none"
                  placeholder="Tell us more about yourself..."
                />
              </div>

              <div className="mb-6">
                <label htmlFor="attachment" className="block text-sm font-medium text-slate-300 mb-2">
                  Attachment <span className="text-orange-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="file"
                    id="attachment"
                    onChange={handleFileUpload}
                    accept=".pdf,.doc,.docx,.jpg,.png,.gif"
                    className="hidden"
                  />
                  <label
                    htmlFor="attachment"
                    className="flex items-center justify-center w-full px-4 py-8 rounded-xl bg-white/5 border-2 border-dashed border-white/20 text-white cursor-pointer hover:border-orange-500 hover:bg-orange-500/5 transition-all"
                  >
                    <div className="text-center">
                      <Upload size={32} className="mx-auto mb-2 text-orange-500" />
                      <p className="font-medium">{formData.attachmentUrl ? 'File uploaded' : 'Choose file'}</p>
                      <p className="text-xs text-slate-400 mt-1">PDF, DOC, JPG, PNG accepted</p>
                    </div>
                  </label>
                  {uploadProgress > 0 && (
                    <div className="absolute inset-0 bg-orange-500/10 rounded-xl flex items-center justify-center">
                      <div className="text-orange-400 font-semibold">{uploadProgress}%</div>
                    </div>
                  )}
                </div>
              </div>

              {submitStatus === 'success' && (
                <div className="mb-6 p-4 bg-emerald-500/20 border border-emerald-500/50 rounded-xl text-emerald-300 text-center">
                  Application submitted successfully!
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-xl text-red-300 text-center">
                  Error submitting application. Please try again.
                </div>
              )}

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={handlePrevStep}
                  className="flex-1 bg-slate-700 text-white font-semibold py-4 px-8 rounded-xl hover:bg-slate-600 transition-all duration-300 flex items-center justify-center gap-2 group"
                >
                  <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                  Back
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || !formData.attachmentUrl}
                  className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold py-4 px-8 rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Application'}
                  {!isSubmitting && <Send size={18} className="group-hover:translate-x-1 transition-transform" />}
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </section>
  );
};

export default ContactForm;
