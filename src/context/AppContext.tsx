import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AppContext, Language, AnalyticsData, Tool, ErrorLog, ClickEvent } from '../types';
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
  errors: [],
  clickEvents: []
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
    let savedAnalytics;
    try {
      savedAnalytics = JSON.parse(localStorage.getItem('hesabati-analytics') || 'null');
    } catch {
      savedAnalytics = null;
    }

    if (savedLang) setLanguage(savedLang);
    if (savedTheme) setTheme(savedTheme);
    if (savedAnalytics) {
      setAnalytics(prev => ({ ...prev, ...savedAnalytics }));
    }

    // Detect user's preferred language
    if (!savedLang) {
      const browserLang = navigator.language.toLowerCase();
      if (browserLang.startsWith('ar')) {
        setLanguage('ar');
      }
    }

    // Detect system theme preference
    if (!savedTheme) {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(prefersDark ? 'dark' : 'light');
    }

    // Track user session
    if (!sessionStorage.getItem('hesabati-session-active')) {
      setAnalytics(prev => ({
        ...prev,
        userSessions: (prev.userSessions || 0) + 1,
      }));
      sessionStorage.setItem('hesabati-session-active', 'true');
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
      newAnalytics.totalUsage = (newAnalytics.totalUsage || 0) + 1;
      newAnalytics.toolsUsage[toolId] = (newAnalytics.toolsUsage[toolId] || 0) + 1;
      
      const today = new Date().getDay(); // Simple daily tracking
      const newDailyUsage = [...(newAnalytics.dailyUsage || Array(7).fill(0))];
      newDailyUsage[today] = (newDailyUsage[today] || 0) + 1;
      newAnalytics.dailyUsage = newDailyUsage;
      
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
  };

  const trackClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;
    const newClick: ClickEvent = {
      x: event.clientX,
      y: event.clientY,
      timestamp: Date.now(),
      element: target.tagName.toLowerCase() + (target.id ? `#${target.id}` : '') + (target.className ? `.${target.className.toString().split(' ')[0]}` : '')
    };
    setAnalytics(prev => ({
      ...prev,
      clickEvents: [...(prev.clickEvents || []).slice(-99), newClick] // Keep last 100 clicks
    }));
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
      errors: [errorLog, ...(prev.errors || []).slice(0, 99)] // Keep last 100 errors
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
    trackClick,
    logError
  };

  return (
    <AppContextProvider.Provider value={contextValue}>
      {children}
    </AppContextProvider.Provider>
  );
};
