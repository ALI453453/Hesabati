import React from 'react';
import { motion } from 'framer-motion';
import { Calculator, TrendingUp, Activity, RefreshCw, ArrowRight } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import { t } from '../../data/translations';

const Hero: React.FC = () => {
  const { language, analytics } = useAppContext();

  const features = [
    {
      icon: Calculator,
      title: language === 'ar' ? '24+ أداة قوية' : '24+ Powerful Tools',
      description: language === 'ar' ? 'حاسبات متخصصة لجميع احتياجاتك' : 'Specialized calculators for all your needs'
    },
    {
      icon: TrendingUp,
      title: language === 'ar' ? 'أدوات مالية' : 'Financial Tools',
      description: language === 'ar' ? 'خطط لمستقبلك المالي بثقة' : 'Plan your financial future with confidence'
    },
    {
      icon: Activity,
      title: language === 'ar' ? 'أدوات صحية' : 'Health Tools',
      description: language === 'ar' ? 'تتبع صحتك ولياقتك البدنية' : 'Track your health and fitness'
    },
    {
      icon: RefreshCw,
      title: language === 'ar' ? 'أدوات تحويل' : 'Conversion Tools',
      description: language === 'ar' ? 'حول بين الوحدات والصيغ بسهولة' : 'Convert between units and formats easily'
    }
  ];

  const stats = [
    {
      value: analytics.totalUsage.toLocaleString(),
      label: language === 'ar' ? 'إجمالي الحسابات' : 'Total Calculations'
    },
    {
      value: '24+',
      label: language === 'ar' ? 'أداة متاحة' : 'Tools Available'
    },
    {
      value: '2',
      label: language === 'ar' ? 'لغة مدعومة' : 'Languages Supported'
    },
    {
      value: '99.9%',
      label: language === 'ar' ? 'وقت التشغيل' : 'Uptime'
    }
  ];

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary-200/20 dark:bg-primary-800/20 rounded-full blur-3xl animate-pulse-gentle"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-200/20 dark:bg-blue-800/20 rounded-full blur-3xl animate-bounce-gentle"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="text-center">
          {/* Main Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6">
              <span className="text-primary-600 dark:text-primary-400">Hesabati</span>
              <br />
              <span className="text-3xl md:text-5xl lg:text-6xl">
                {t('heroTitle', language)}
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
              {t('heroSubtitle', language)}
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <a
              href="/tools"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-primary-600 hover:bg-primary-700 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              {t('heroButton', language)}
              <ArrowRight className={`w-5 h-5 ${language === 'ar' ? 'mr-2 rotate-180' : 'ml-2'}`} />
            </a>
            
            <a
              href="/analytics"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-primary-600 dark:text-primary-400 bg-white dark:bg-gray-800 hover:bg-primary-50 dark:hover:bg-gray-700 rounded-xl transition-all duration-300 border-2 border-primary-200 dark:border-primary-800 hover:border-primary-300"
            >
              {t('analytics', language)}
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20"
          >
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600 dark:text-gray-400">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
                >
                  <div className="bg-primary-100 dark:bg-primary-900/30 w-12 h-12 rounded-lg flex items-center justify-center mb-4 mx-auto">
                    <Icon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
