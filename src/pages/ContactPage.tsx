import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, Facebook, Twitter, Instagram } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import PageWrapper from '../components/UI/PageWrapper';

const ContactPage: React.FC = () => {
  const { language } = useAppContext();
  const [status, setStatus] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('success');
    setTimeout(() => setStatus(''), 5000);
  };

  const content = {
    en: {
      title: 'Contact Us',
      subtitle: 'Have a question, suggestion, or feedback? We’d love to hear from you.',
      formName: 'Your Name',
      formEmail: 'Your Email',
      formMessage: 'Your Message',
      formButton: 'Send Message',
      successMessage: 'Thank you! Your message has been sent.',
      orEmailUs: 'Or email us directly at:',
      followUs: 'Follow us on social media',
    },
    ar: {
      title: 'اتصل بنا',
      subtitle: 'هل لديك سؤال أو اقتراح أو ملاحظة؟ نود أن نسمع منك.',
      formName: 'اسمك',
      formEmail: 'بريدك الإلكتروني',
      formMessage: 'رسالتك',
      formButton: 'إرسال الرسالة',
      successMessage: 'شكرًا لك! تم إرسال رسالتك.',
      orEmailUs: 'أو راسلنا مباشرة على:',
      followUs: 'تابعنا على وسائل التواصل الاجتماعي',
    },
  };

  const currentContent = content[language];
  const socialMedia = [
    { name: 'Facebook', icon: Facebook, href: '#' },
    { name: 'Twitter', icon: Twitter, href: '#' },
    { name: 'Instagram', icon: Instagram, href: '#' },
  ];

  return (
    <PageWrapper title={currentContent.title} subtitle={currentContent.subtitle}>
      <div className="grid md:grid-cols-2 gap-16 not-prose">
        {/* Contact Form */}
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <input
              type="text"
              placeholder={currentContent.formName}
              required
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500"
            />
            <input
              type="email"
              placeholder={currentContent.formEmail}
              required
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500"
            />
            <textarea
              rows={5}
              placeholder={currentContent.formMessage}
              required
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500"
            ></textarea>
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 px-6 py-4 text-lg font-semibold text-white bg-primary-600 hover:bg-primary-700 rounded-xl transition-colors"
            >
              <Send className="w-5 h-5" />
              <span>{currentContent.formButton}</span>
            </button>
            {status === 'success' && (
              <p className="text-green-600 dark:text-green-400 text-center">{currentContent.successMessage}</p>
            )}
          </div>
        </form>

        {/* Contact Info */}
        <div className="space-y-8">
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{currentContent.orEmailUs}</h3>
            <a href="mailto:support@hesabati.com" className="flex items-center gap-3 text-lg text-primary-600 dark:text-primary-400 hover:underline">
              <Mail className="w-6 h-6" />
              <span>support@hesabati.com</span>
            </a>
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{currentContent.followUs}</h3>
            <div className="flex space-x-6 rtl:space-x-reverse">
              {socialMedia.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    className="text-gray-500 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                    aria-label={social.name}
                  >
                    <Icon className="w-7 h-7" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default ContactPage;
