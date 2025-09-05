export const translations = {
  en: {
    // Navigation
    home: 'Home',
    tools: 'Tools',
    blog: 'Blog',
    analytics: 'Analytics',
    about: 'About',
    contact: 'Contact',
    privacy: 'Privacy Policy',
    terms: 'Terms of Service',
    faq: 'FAQ',
    
    // Hero Section
    heroTitle: 'Your Global Multi-Tools Platform',
    heroSubtitle: 'Access 24+ powerful calculators and tools for Finance, Health, and Conversions. Fast, free, and available in multiple languages.',
    heroButton: 'Explore Tools',
    
    // Categories
    finance: 'Finance',
    health: 'Health',
    conversion: 'Conversion',
    
    // Common Actions
    calculate: 'Calculate',
    convert: 'Convert',
    generate: 'Generate',
    reset: 'Reset',
    copy: 'Copy',
    share: 'Share',
    export: 'Export',
    download: 'Download',
    search: 'Search tools...',
    
    // Tool Features
    usageCount: 'Usage Count',
    lastUsed: 'Last Used',
    difficulty: 'Difficulty',
    keywords: 'Keywords',
    relatedTools: 'Related Tools',
    
    // Analytics
    totalUsage: 'Total Usage',
    dailyUsage: 'Daily Usage',
    popularTools: 'Popular Tools',
    conversionRate: 'Conversion Rate',
    userSessions: 'User Sessions',
    bounceRate: 'Bounce Rate',
    avgSessionDuration: 'Avg Session Duration',
    errorLogs: 'Error Logs',
    
    // Blog
    latestPosts: 'Latest Blog Posts',
    readMore: 'Read More',
    publishedOn: 'Published on',
    readTime: 'min read',
    author: 'Author',
    tags: 'Tags',
    
    // Footer
    quickLinks: 'Quick Links',
    categories: 'Categories',
    support: 'Support',
    legal: 'Legal',
    followUs: 'Follow Us',
    newsletter: 'Newsletter',
    subscribe: 'Subscribe',
    
    // Settings
    language: 'Language',
    theme: 'Theme',
    lightMode: 'Light Mode',
    darkMode: 'Dark Mode',
    
    // Common Messages
    loading: 'Loading...',
    error: 'An error occurred',
    success: 'Success!',
    copied: 'Copied to clipboard',
    noResults: 'No results found',
    
    // SEO
    metaDescription: 'Hesabati provides 24+ powerful calculators and tools for Finance, Health, and Conversions. Free, fast, and available in English and Arabic.',
    keywords: 'calculator, tools, finance, health, conversion, bilingual, Arabic, English, hesabati'
  },
  ar: {
    // Navigation
    home: 'الرئيسية',
    tools: 'الأدوات',
    blog: 'المدونة',
    analytics: 'التحليلات',
    about: 'عن الموقع',
    contact: 'اتصل بنا',
    privacy: 'سياسة الخصوصية',
    terms: 'شروط الخدمة',
    faq: 'الأسئلة الشائعة',
    
    // Hero Section
    heroTitle: 'منصة الأدوات المتعددة العالمية',
    heroSubtitle: 'احصل على 24+ آلة حاسبة وأداة قوية للمالية والصحة والتحويلات. سريع ومجاني ومتاح بعدة لغات.',
    heroButton: 'استكشف الأدوات',
    
    // Categories
    finance: 'المالية',
    health: 'الصحة',
    conversion: 'التحويل',
    
    // Common Actions
    calculate: 'احسب',
    convert: 'حول',
    generate: 'أنشئ',
    reset: 'إعادة تعيين',
    copy: 'نسخ',
    share: 'مشاركة',
    export: 'تصدير',
    download: 'تحميل',
    search: 'ابحث عن الأدوات...',
    
    // Tool Features
    usageCount: 'عدد مرات الاستخدام',
    lastUsed: 'آخر استخدام',
    difficulty: 'الصعوبة',
    keywords: 'الكلمات المفتاحية',
    relatedTools: 'أدوات ذات صلة',
    
    // Analytics
    totalUsage: 'إجمالي الاستخدام',
    dailyUsage: 'الاستخدام اليومي',
    popularTools: 'الأدوات الشائعة',
    conversionRate: 'معدل التحويل',
    userSessions: 'جلسات المستخدم',
    bounceRate: 'معدل الارتداد',
    avgSessionDuration: 'متوسط مدة الجلسة',
    errorLogs: 'سجلات الأخطاء',
    
    // Blog
    latestPosts: 'أحدث منشورات المدونة',
    readMore: 'اقرأ المزيد',
    publishedOn: 'نُشر في',
    readTime: 'دقيقة قراءة',
    author: 'الكاتب',
    tags: 'العلامات',
    
    // Footer
    quickLinks: 'روابط سريعة',
    categories: 'الفئات',
    support: 'الدعم',
    legal: 'قانوني',
    followUs: 'تابعنا',
    newsletter: 'النشرة الإخبارية',
    subscribe: 'اشترك',
    
    // Settings
    language: 'اللغة',
    theme: 'المظهر',
    lightMode: 'المظهر الفاتح',
    darkMode: 'المظهر الداكن',
    
    // Common Messages
    loading: 'جاري التحميل...',
    error: 'حدث خطأ',
    success: 'نجح!',
    copied: 'تم النسخ إلى الحافظة',
    noResults: 'لم يتم العثور على نتائج',
    
    // SEO
    metaDescription: 'حسابتي يوفر 24+ آلة حاسبة وأداة قوية للمالية والصحة والتحويلات. مجاني وسريع ومتاح باللغتين العربية والإنجليزية.',
    keywords: 'حاسبة، أدوات، مالية، صحة، تحويل، ثنائي اللغة، عربي، إنجليزي، حسابتي'
  }
};

export const t = (key: string, language: 'en' | 'ar'): string => {
  const keys = key.split('.');
  let value: any = translations[language];
  
  for (const k of keys) {
    value = value?.[k];
  }
  
  return value || key;
};
