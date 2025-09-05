import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Activity, RefreshCw, Calculator, Clock, Users, Star } from 'lucide-react';
import { Tool } from '../../types';
import { useAppContext } from '../../context/AppContext';

const ToolCard: React.FC<{ tool: Tool }> = ({ tool }) => {
  const { language, trackToolUsage } = useAppContext();

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'finance': return TrendingUp;
      case 'health': return Activity;
      case 'conversion': return RefreshCw;
      default: return Calculator;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'finance': return 'text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400';
      case 'health': return 'text-red-600 bg-red-100 dark:bg-red-900/30 dark:text-red-400';
      case 'conversion': return 'text-blue-600 bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400';
      default: return 'text-primary-600 bg-primary-100 dark:bg-primary-900/30 dark:text-primary-400';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400';
      case 'medium': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'advanced': return 'text-red-600 bg-red-100 dark:bg-red-900/30 dark:text-red-400';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  const handleToolClick = () => {
    trackToolUsage(tool.id);
  };

  const CategoryIcon = getCategoryIcon(tool.category);

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-800 overflow-hidden group h-full flex flex-col"
    >
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-start justify-between mb-4">
          <div className={`p-3 rounded-xl ${getCategoryColor(tool.category)}`}>
            <CategoryIcon className="w-6 h-6" />
          </div>
          {tool.featured && (
            <div className="flex items-center space-x-1 rtl:space-x-reverse bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 px-2 py-1 rounded-full text-xs font-medium">
              <Star className="w-3 h-3" />
              <span>{language === 'ar' ? 'مميز' : 'Featured'}</span>
            </div>
          )}
        </div>

        <div className="mb-4 flex-grow">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
            {tool.title[language]}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3">
            {tool.description[language]}
          </p>
        </div>

        <div className="flex items-center justify-between mb-4 text-xs">
          <div className={`px-2 py-1 rounded-full font-medium ${getDifficultyColor(tool.difficulty)}`}>
            {language === 'ar' 
              ? tool.difficulty === 'easy' ? 'سهل' : tool.difficulty === 'medium' ? 'متوسط' : 'متقدم'
              : tool.difficulty
            }
          </div>
        </div>

        <div className="mt-auto">
          <a
            href={`/tools/${tool.slug}`}
            onClick={handleToolClick}
            className="block w-full bg-primary-600 hover:bg-primary-700 text-white text-center py-3 rounded-xl font-medium transition-all duration-300 group-hover:bg-primary-700"
          >
            {language === 'ar' ? 'استخدم الأداة' : 'Use Tool'}
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default React.memo(ToolCard);
