import React from 'react';
import { motion } from 'framer-motion';

interface PageWrapperProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}

const PageWrapper: React.FC<PageWrapperProps> = ({ title, subtitle, children }) => {
  return (
    <div className="bg-white dark:bg-gray-900 py-16 sm:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {title}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            {subtitle}
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-bold prose-a:text-primary-600 dark:prose-a:text-primary-400 hover:prose-a:underline"
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
};

export default PageWrapper;
