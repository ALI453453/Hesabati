import React from 'react';
import { Link } from 'react-router-dom';
import { Frown } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const NotFoundPage: React.FC = () => {
  const { language } = useAppContext();

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center bg-white dark:bg-gray-900">
      <Frown className="w-24 h-24 text-primary-500 mb-4" />
      <h1 className="text-6xl font-bold text-gray-800 dark:text-white mb-2">404</h1>
      <p className="text-2xl font-medium text-gray-600 dark:text-gray-400 mb-6">
        {language === 'ar' ? 'الصفحة غير موجودة' : 'Page Not Found'}
      </p>
      <p className="text-lg text-gray-500 dark:text-gray-500 mb-8 max-w-md">
        {language === 'ar'
          ? 'عذراً، لم نتمكن من العثور على الصفحة التي تبحث عنها. ربما تم حذفها أو أن الرابط غير صحيح.'
          : 'Sorry, we couldn’t find the page you’re looking for. It might have been removed or the link is incorrect.'}
      </p>
      <Link
        to="/"
        className="inline-flex items-center justify-center px-6 py-3 text-lg font-semibold text-white bg-primary-600 hover:bg-primary-700 rounded-xl transition-colors duration-300"
      >
        {language === 'ar' ? 'العودة إلى الرئيسية' : 'Go Back Home'}
      </Link>
    </div>
  );
};

export default NotFoundPage;
