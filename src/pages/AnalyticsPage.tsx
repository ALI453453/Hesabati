import React from 'react';
import { motion } from 'framer-motion';
import ReactECharts from 'echarts-for-react';
import * as echarts from 'echarts/core';
import { BarChart, PieChart, ScatterChart } from 'echarts/charts';
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  VisualMapComponent,
} from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import { BarChart3, Users, AlertCircle, Clock, Target, MousePointerClick } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { t } from '../data/translations';
import { toolsData } from '../data/tools';

echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  BarChart,
  PieChart,
  ScatterChart,
  VisualMapComponent,
  CanvasRenderer,
]);

const AnalyticsPage: React.FC = () => {
  const { language, analytics, theme } = useAppContext();

  const isDarkMode = theme === 'dark';
  const textColor = isDarkMode ? '#e5e7eb' : '#374151';

  const dailyUsageOption = {
    tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
    grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
    xAxis: [{ type: 'category', data: Array.from({ length: 7 }, (_, i) => `Day ${i + 1}`), axisTick: { alignWithLabel: true }, axisLabel: { color: textColor } }],
    yAxis: [{ type: 'value', axisLabel: { color: textColor }, splitLine: { lineStyle: { color: isDarkMode ? '#4b5563' : '#e5e7eb' } } }],
    series: [{ name: 'Usage', type: 'bar', barWidth: '60%', data: analytics.dailyUsage, itemStyle: { color: '#3b82f6' } }],
    backgroundColor: 'transparent',
  };

  const popularToolsData = Object.entries(analytics.toolsUsage)
    .map(([toolId, usage]) => ({ value: usage, name: toolsData.find(t => t.id === toolId)?.title[language] || toolId }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 10);

  const popularToolsOption = {
    tooltip: { trigger: 'item', formatter: '{a} <br/>{b}: {c} ({d}%)' },
    legend: { show: false },
    series: [{
      name: 'Tool Usage', type: 'pie', radius: '70%', center: ['50%', '50%'], data: popularToolsData,
      emphasis: { itemStyle: { shadowBlur: 10, shadowOffsetX: 0, shadowColor: 'rgba(0, 0, 0, 0.5)' } },
      label: { color: textColor }
    }],
    backgroundColor: 'transparent',
  };

  const clickHeatmapOption = {
    tooltip: { trigger: 'item', formatter: '{c}' },
    xAxis: { type: 'value', show: false, min: 0, max: window.innerWidth },
    yAxis: { type: 'value', show: false, min: 0, max: window.innerHeight, inverse: true },
    visualMap: {
      min: 1,
      max: 5,
      calculable: true,
      inRange: { color: ['#3b82f6', '#ef4444'] },
      show: false,
    },
    series: [{
      type: 'scatter',
      data: analytics.clickEvents.map(c => [c.x, c.y, 1, c.element]),
      symbolSize: 15,
      itemStyle: { opacity: 0.5 },
    }],
    backgroundColor: 'transparent',
  };

  const statsCards = [
    { title: t('totalUsage', language), value: analytics.totalUsage.toLocaleString(), icon: BarChart3, color: 'bg-blue-500' },
    { title: t('userSessions', language), value: analytics.userSessions.toLocaleString(), icon: Users, color: 'bg-green-500' },
    { title: 'Total Clicks', value: analytics.clickEvents.length.toLocaleString(), icon: MousePointerClick, color: 'bg-yellow-500' },
    { title: t('errorLogs', language), value: analytics.errors.length.toLocaleString(), icon: AlertCircle, color: 'bg-red-500' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">{t('analytics', language)}</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">{language === 'ar' ? 'تحليلات مفصلة لاستخدام الأدوات والأداء العام للمنصة' : 'Detailed analytics on tool usage and platform performance'}</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {statsCards.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
                <div className={`p-3 rounded-xl ${stat.color} text-white w-min mb-4`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{stat.value}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{stat.title}</p>
              </div>
            );
          })}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.4 }} className="lg:col-span-2 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">{t('dailyUsage', language)} (Last 7 Days)</h3>
            <ReactECharts echarts={echarts} option={dailyUsageOption} style={{ height: '300px', width: '100%' }} notMerge={true} lazyUpdate={true} theme={isDarkMode ? 'dark' : 'light'} />
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.6 }} className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">{t('popularTools', language)}</h3>
            <ReactECharts echarts={echarts} option={popularToolsOption} style={{ height: '300px', width: '100%' }} notMerge={true} lazyUpdate={true} theme={isDarkMode ? 'dark' : 'light'} />
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.8 }} className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 mb-12">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Click Heatmap (Last 100 Clicks)</h3>
          <div className="relative h-96 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
            <ReactECharts echarts={echarts} option={clickHeatmapOption} style={{ height: '100%', width: '100%' }} />
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 1.0 }} className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">{t('errorLogs', language)}</h3>
          {analytics.errors.length === 0 ? (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              <AlertCircle className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p>{language === 'ar' ? 'لا توجد أخطاء مسجلة' : 'No errors logged'}</p>
            </div>
          ) : (
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {analytics.errors.map((error) => (
                <div key={error.id} className="flex items-start space-x-3 rtl:space-x-reverse p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-red-800 dark:text-red-200 font-medium">{error.error}</p>
                    <div className="flex items-center space-x-4 rtl:space-x-reverse text-sm text-red-600 dark:text-red-400 mt-1">
                      <span>{new Date(error.timestamp).toLocaleString()}</span>
                      {error.tool && <span>Tool: {error.tool}</span>}
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
