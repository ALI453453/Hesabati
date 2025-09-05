import React from 'react';
import Hero from '../components/Home/Hero';
import ToolsGrid from '../components/Home/ToolsGrid';
import { useAppContext } from '../context/AppContext';

const HomePage: React.FC = () => {
  const { language } = useAppContext();

  // Update page title and meta description
  React.useEffect(() => {
    document.title = language === 'ar' 
      ? 'حسابتي - منصة الأدوات المتعددة العالمية'
      : 'Hesabati - Global Multi-Tools Platform';
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 
        language === 'ar' 
          ? 'حسابتي يوفر 24+ آلة حاسبة وأداة قوية للمالية والصحة والتحويلات. مجاني وسريع ومتاح باللغتين العربية والإنجليزية.'
          : 'Hesabati provides 24+ powerful calculators and tools for Finance, Health, and Conversions. Free, fast, and available in English and Arabic.'
      );
    }
  }, [language]);

  return (
    <div className="animate-fade-in">
      <Hero />
      <ToolsGrid />
    </div>
  );
};

export default HomePage;
