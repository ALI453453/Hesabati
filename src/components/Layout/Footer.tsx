import React from 'react';
import { Calculator, Facebook, Twitter, Instagram, Youtube, Mail } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import { t } from '../../data/translations';

const Footer: React.FC = () => {
  const { language } = useAppContext();

  const quickLinks = [
    { name: t('home', language), href: '/' },
    { name: t('tools', language), href: '/tools' },
    { name: t('blog', language), href: '/blog' },
    { name: t('analytics', language), href: '/analytics' }
  ];

  const categories = [
    { name: t('finance', language), href: '/tools?category=finance' },
    { name: t('health', language), href: '/tools?category=health' },
    { name: t('conversion', language), href: '/tools?category=conversion' }
  ];

  const support = [
    { name: t('about', language), href: '/about' },
    { name: t('contact', language), href: '/contact' },
    { name: t('faq', language), href: '/faq' }
  ];

  const legal = [
    { name: t('privacy', language), href: '/privacy' },
    { name: t('terms', language), href: '/terms' }
  ];

  const socialMedia = [
    { name: 'Facebook', icon: Facebook, href: '#' },
    { name: 'Twitter', icon: Twitter, href: '#' },
    { name: 'Instagram', icon: Instagram, href: '#' },
    { name: 'YouTube', icon: Youtube, href: '#' }
  ];

  return (
    <footer className="bg-gray-900 dark:bg-black text-white">
      {/* AdSense Footer Banner */}
      <div className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="h-20 bg-gray-800 rounded flex items-center justify-center text-sm text-gray-400">
            AdSense Footer Banner (728x90)
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 rtl:space-x-reverse mb-4">
              <div className="bg-primary-600 p-2 rounded-lg">
                <Calculator className="w-6 h-6 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold">Hesabati</span>
                <span className="text-sm text-gray-400">
                  {language === 'ar' ? 'حسابتي' : 'Multi-Tools Platform'}
                </span>
              </div>
            </div>
            <p className="text-gray-400 mb-4 max-w-md">
              {language === 'ar' 
                ? 'منصة الأدوات المتعددة العالمية. 24+ آلة حاسبة وأداة قوية للمالية والصحة والتحويلات.'
                : 'Your global multi-tools platform. 24+ powerful calculators and tools for Finance, Health, and Conversions.'
              }
            </p>
            
            {/* Newsletter */}
            <div className="mb-6">
              <h4 className="text-lg font-semibold mb-2">{t('newsletter', language)}</h4>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  placeholder={language === 'ar' ? 'البريد الإلكتروني' : 'Your email'}
                  className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <button className="bg-primary-600 hover:bg-primary-700 px-4 py-2 rounded-lg transition-colors">
                  {t('subscribe', language)}
                </button>
              </div>
            </div>

            {/* Social Media */}
            <div>
              <h4 className="text-lg font-semibold mb-2">{t('followUs', language)}</h4>
              <div className="flex space-x-4 rtl:space-x-reverse">
                {socialMedia.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      className="text-gray-400 hover:text-white transition-colors"
                      aria-label={social.name}
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('quickLinks', language)}</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('categories', language)}</h3>
            <ul className="space-y-2">
              {categories.map((category) => (
                <li key={category.name}>
                  <a
                    href={category.href}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {category.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support & Legal */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('support', language)}</h3>
            <ul className="space-y-2">
              {support.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
            
            <h3 className="text-lg font-semibold mb-4 mt-6">{t('legal', language)}</h3>
            <ul className="space-y-2">
              {legal.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2025 Hesabati. {language === 'ar' ? 'جميع الحقوق محفوظة.' : 'All rights reserved.'}
            </p>
            <div className="flex items-center space-x-4 rtl:space-x-reverse mt-4 md:mt-0">
              <span className="text-gray-400 text-sm">
                {language === 'ar' ? 'صنع بـ ❤️ للعالم' : 'Made with ❤️ for the world'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
