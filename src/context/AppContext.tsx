import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AppContext, Language, AnalyticsData, Tool, ErrorLog } from '../types';
import { toolsData } from '../data/tools';

const defaultAnalytics: AnalyticsData = {
  totalUsage: 0,
  dailyUsage: Array(30).fill(0),
  toolsUsage: {},
  popularTools: [],
  conversionRate: 0,
  userSessions: 0,
  bounceRate: 0,
  avgSessionDuration: 0,
  errors: []
};

const AppContextProvider = createContext<AppContext | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContextProvider);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
};

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [analytics, setAnalytics] = useState<AnalyticsData>(defaultAnalytics);

  // Initialize from localStorage
  useEffect(() => {
    const savedLang = localStorage.getItem('hesabati-language') as Language;
    const savedTheme = localStorage.getItem('hesabati-theme') as 'light' | 'dark';
    const savedAnalytics = localStorage.getItem('hesabati-analytics');

    if (savedLang) setLanguage(savedLang);
    if (savedTheme) setTheme(savedTheme);
    if (savedAnalytics) {
      try {
        setAnalytics(JSON.parse(savedAnalytics));
      } catch (error) {
        console.error('Failed to parse saved analytics:', error);
      }
    }

    // Detect user's preferred language
    if (!savedLang) {
      const browserLang = navigator.language.toLowerCase();
      if (browserLang.includes('ar')) {
        setLanguage('ar');
      }
    }

    // Detect system theme preference
    if (!savedTheme) {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(prefersDark ? 'dark' : 'light');
    }
  }, []);

  // Save to localStorage when values change
  useEffect(() => {
    localStorage.setItem('hesabati-language', language);
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.className = language === 'ar' ? 'rtl' : '';
  }, [language]);

  useEffect(() => {
    localStorage.setItem('hesabati-theme', theme);
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('hesabati-analytics', JSON.stringify(analytics));
  }, [analytics]);

  const trackToolUsage = (toolId: string) => {
    setAnalytics(prev => {
      const newAnalytics = { ...prev };
      newAnalytics.totalUsage += 1;
      newAnalytics.toolsUsage[toolId] = (newAnalytics.toolsUsage[toolId] || 0) + 1;
      
      // Update daily usage (last 30 days)
      const today = new Date().getDate() - 1;
      newAnalytics.dailyUsage[today] += 1;
      
      // Update popular tools
      const sortedTools = toolsData
        .map(tool => ({
          ...tool,
          usageCount: newAnalytics.toolsUsage[tool.id] || 0
        }))
        .sort((a, b) => b.usageCount - a.usageCount)
        .slice(0, 10);
      
      newAnalytics.popularTools = sortedTools;
      
      return newAnalytics;
    });

    // Google Analytics tracking
    if (typeof gtag !== 'undefined') {
      gtag('event', 'tool_usage', {
        event_category: 'Tools',
        event_label: toolId,
        value: 1
      });
    }
  };

  const logError = (error: string, tool?: string) => {
    const errorLog: ErrorLog = {
      id: Date.now().toString(),
      timestamp: new Date(),
      error,
      tool,
      userAgent: navigator.userAgent,
      url: window.location.href
    };

    setAnalytics(prev => ({
      ...prev,
      errors: [errorLog, ...prev.errors.slice(0, 99)] // Keep last 100 errors
    }));

    console.error('Hesabati Error:', errorLog);
  };

  const contextValue: AppContext = {
    language,
    theme,
    setLanguage,
    setTheme,
    analytics,
    trackToolUsage,
    logError
  };

  return (
    <AppContextProvider.Provider value={contextValue}>
      {children}
    </AppContextProvider.Provider>
  );
};
