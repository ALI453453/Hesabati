export interface Tool {
  id: string;
  slug: string;
  title: {
    en: string;
    ar: string;
  };
  description: {
    en: string;
    ar: string;
  };
  category: 'finance' | 'health' | 'conversion';
  icon: string;
  usageCount: number;
  lastUsed?: Date;
  featured?: boolean;
  difficulty: 'easy' | 'medium' | 'advanced';
  keywords: {
    en: string[];
    ar: string[];
  };
}

export interface BlogPost {
  id: string;
  slug: string;
  title: {
    en: string;
    ar: string;
  };
  excerpt: {
    en: string;
    ar: string;
  };
  content: {
    en: string;
    ar: string;
  };
  author: string;
  publishedAt: string;
  updatedAt: string;
  tags: string[];
  readTime: number;
  featured?: boolean;
  relatedTool: string; // slug of the related tool
  featuredImage: string;
  faq: {
    question: {
      en: string;
      ar: string;
    };
    answer: {
      en: string;
      ar: string;
    };
  }[];
}

export interface ClickEvent {
  x: number;
  y: number;
  timestamp: number;
  element: string;
}

export interface AnalyticsData {
  totalUsage: number;
  dailyUsage: number[];
  toolsUsage: Record<string, number>;
  popularTools: Tool[];
  conversionRate: number;
  userSessions: number;
  bounceRate: number;
  avgSessionDuration: number;
  errors: ErrorLog[];
  clickEvents: ClickEvent[];
}

export interface ErrorLog {
  id: string;
  timestamp: Date;
  error: string;
  tool?: string;
  userAgent: string;
  url: string;
}

export type Language = 'en' | 'ar';

export interface AppContext {
  language: Language;
  theme: 'light' | 'dark';
  setLanguage: (lang: Language) => void;
  setTheme: (theme: 'light' | 'dark') => void;
  analytics: AnalyticsData;
  trackToolUsage: (toolId: string) => void;
  trackClick: (event: React.MouseEvent<HTMLDivElement>) => void;
  logError: (error: string, tool?: string) => void;
}
