import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, TrendingUp, Activity, RefreshCw, Calculator } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { t } from '../data/translations';
import { toolsData } from '../data/tools';
import ToolCard from '../components/Tools/ToolCard';

const ToolsPage: React.FC = () => {
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

  return (
    <div className="bg-gray-50 dark:bg-gray-800 py-12 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {t('tools', language)}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            {language === 'ar'
              ? `تصفح مجموعتنا الكاملة من ${toolsData.length} أداة وحاسبة قوية.`
              : `Browse our complete collection of ${toolsData.length} powerful tools and calculators.`
            }
          </p>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12 sticky top-28 z-40 py-4 bg-gray-50/80 dark:bg-gray-800/80 backdrop-blur-sm"
        >
          <div className="relative mb-6">
            <Search className="absolute left-4 rtl:left-auto rtl:right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder={language === 'ar' ? `ابحث في ${toolsData.length} أداة...` : `Search ${toolsData.length} tools...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 rtl:pl-4 rtl:pr-12 pr-4 py-4 text-lg border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
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
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {filteredTools.length > 0 ? (
            filteredTools.map((tool, index) => (
              <motion.div
                key={tool.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                layout
              >
                <ToolCard tool={tool} />
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-16">
              <p className="text-xl text-gray-600 dark:text-gray-400">{t('noResults', language)}</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default ToolsPage;
