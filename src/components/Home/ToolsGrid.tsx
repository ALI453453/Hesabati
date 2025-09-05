import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, TrendingUp, Calculator, Activity, RefreshCw } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import { t } from '../../data/translations';
import { toolsData } from '../../data/tools';
import ToolCard from '../Tools/ToolCard';

const ToolsGrid: React.FC = () => {
  const { language } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', name: language === 'ar' ? 'الكل' : 'All', icon: Calculator },
    { id: 'finance', name: t('finance', language), icon: TrendingUp },
    { id: 'health', name: t('health', language), icon: Activity },
    { id: 'conversion', name: t('conversion', language), icon: RefreshCw }
  ];

  const filteredTools = toolsData.filter(tool => {
    const matchesSearch = searchTerm === '' || 
      tool.title[language].toLowerCase().includes(searchTerm.toLowerCase()) ||
      tool.description[language].toLowerCase().includes(searchTerm.toLowerCase()) ||
      tool.keywords[language].some(keyword => 
        keyword.toLowerCase().includes(searchTerm.toLowerCase())
      );
    
    const matchesCategory = selectedCategory === 'all' || tool.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Get featured tools for the home page
  const featuredTools = filteredTools.slice(0, 8);

  return (
    <div className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {language === 'ar' ? 'الأدوات المميزة' : 'Featured Tools'}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {language === 'ar' 
              ? 'اكتشف مجموعة من أقوى الأدوات والحاسبات لتلبية احتياجاتك المختلفة'
              : 'Discover our collection of powerful tools and calculators to meet your diverse needs'
            }
          </p>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          {/* Search Bar */}
          <div className="relative mb-6">
            <Search className="absolute left-4 rtl:left-auto rtl:right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder={language === 'ar' ? 'ابحث عن الأدوات...' : 'Search tools...'}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 rtl:pl-4 rtl:pr-12 pr-4 py-4 text-lg border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center space-x-2 rtl:space-x-reverse px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                    selectedCategory === category.id
                      ? 'bg-primary-600 text-white shadow-lg'
                      : 'bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-gray-800 border border-gray-200 dark:border-gray-700'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{category.name}</span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Tools Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {featuredTools.map((tool, index) => (
            <motion.div
              key={tool.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <ToolCard tool={tool} />
            </motion.div>
          ))}
        </motion.div>

        {/* View All Tools */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-12"
        >
          <a
            href="/tools"
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-primary-600 dark:text-primary-400 bg-white dark:bg-gray-900 hover:bg-primary-50 dark:hover:bg-gray-800 rounded-xl transition-all duration-300 border-2 border-primary-200 dark:border-primary-800 hover:border-primary-300"
          >
            {language === 'ar' ? 'عرض جميع الأدوات' : 'View All Tools'}
            <span className={`${language === 'ar' ? 'mr-2' : 'ml-2'} text-sm bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 px-2 py-1 rounded-full`}>
              {toolsData.length}
            </span>
          </a>
        </motion.div>

        {/* AdSense Middle Banner */}
        <div className="mt-16 mb-8">
          <div className="bg-gray-100 dark:bg-gray-900 rounded-xl p-8 text-center">
            <div className="h-24 bg-gray-200 dark:bg-gray-800 rounded-lg flex items-center justify-center text-gray-500 dark:text-gray-400">
              AdSense Content Banner (728x90)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolsGrid;
