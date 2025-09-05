import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, Users, Activity, AlertCircle, Clock, Target } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { t } from '../data/translations';

const AnalyticsPage: React.FC = () => {
  const { language, analytics } = useAppContext();

  // Mock data for charts - in a real app, this would come from your analytics service
  const dailyUsageData = analytics.dailyUsage.map((value, index) => ({
    day: index + 1,
    usage: value
  }));

  const topTools = Object.entries(analytics.toolsUsage)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 10)
    .map(([toolId, usage]) => ({ toolId, usage }));

  const statsCards = [
    {
      title: t('totalUsage', language),
      value: analytics.totalUsage.toLocaleString(),
      icon: BarChart3,
      color: 'bg-blue-500',
      change: '+12.3%'
    },
    {
      title: t('userSessions', language),
      value: analytics.userSessions.toLocaleString(),
      icon: Users,
      color: 'bg-green-500',
      change: '+8.7%'
    },
    {
      title: t('avgSessionDuration', language),
      value: `${Math.floor(analytics.avgSessionDuration / 60)}:${(analytics.avgSessionDuration % 60).toString().padStart(2, '0')}`,
      icon: Clock,
      color: 'bg-purple-500',
      change: '+5.2%'
    },
    {
      title: t('conversionRate', language),
      value: `${analytics.conversionRate.toFixed(1)}%`,
      icon: Target,
      color: 'bg-orange-500',
      change: '+2.1%'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t('analytics', language)}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            {language === 'ar' 
              ? 'تحليلات مفصلة لاستخدام الأدوات والأداء العام للمنصة'
              : 'Detailed analytics on tool usage and platform performance'
            }
          </p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          {statsCards.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl ${stat.color} text-white`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-sm text-green-600 dark:text-green-400 font-medium">
                    {stat.change}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                  {stat.value}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {stat.title}
                </p>
              </div>
            );
          })}
        </motion.div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Daily Usage Chart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700"
          >
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              {t('dailyUsage', language)}
            </h3>
            <div className="h-64 bg-gray-50 dark:bg-gray-900 rounded-xl flex items-center justify-center">
              <div className="text-center text-gray-500 dark:text-gray-400">
                <BarChart3 className="w-12 h-12 mx-auto mb-2" />
                <p>{language === 'ar' ? 'رسم بياني للاستخدام اليومي' : 'Daily Usage Chart Placeholder'}</p>
                <p className="text-sm mt-1">
                  {language === 'ar' ? 'يتطلب مكتبة رسوم بيانية' : 'Requires chart library integration'}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Popular Tools */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700"
          >
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              {t('popularTools', language)}
            </h3>
            <div className="space-y-4">
              {topTools.slice(0, 5).map((tool, index) => (
                <div key={tool.toolId} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3 rtl:space-x-reverse">
                    <span className="text-lg font-semibold text-gray-400 w-6">
                      #{index + 1}
                    </span>
                    <span className="text-gray-900 dark:text-white font-medium">
                      {tool.toolId.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </span>
                  </div>
                  <span className="text-primary-600 dark:text-primary-400 font-semibold">
                    {tool.usage.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* AdSense Banner */}
        <div className="mb-12">
          <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-8 text-center">
            <div className="h-24 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center text-gray-500 dark:text-gray-400">
              AdSense Analytics Banner (728x90)
            </div>
          </div>
        </div>

        {/* Error Logs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              {t('errorLogs', language)}
            </h3>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {language === 'ar' ? 'آخر 10 أخطاء' : 'Last 10 errors'}
            </span>
          </div>
          
          {analytics.errors.length === 0 ? (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              <AlertCircle className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p>{language === 'ar' ? 'لا توجد أخطاء مسجلة' : 'No errors logged'}</p>
            </div>
          ) : (
            <div className="space-y-3">
              {analytics.errors.slice(0, 10).map((error) => (
                <div
                  key={error.id}
                  className="flex items-start space-x-3 rtl:space-x-reverse p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg"
                >
                  <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-red-800 dark:text-red-200 font-medium">
                      {error.error}
                    </p>
                    <div className="flex items-center space-x-4 rtl:space-x-reverse text-sm text-red-600 dark:text-red-400 mt-1">
                      <span>{error.timestamp.toLocaleString()}</span>
                      {error.tool && <span>Tool: {error.tool}</span>}
                      <span>{error.url}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
