import React from 'react';
import { motion } from 'framer-motion';

interface ResultCardProps {
  children: React.ReactNode;
  title: string;
}

const ResultCard: React.FC<ResultCardProps> = ({ children, title }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-primary-50 dark:bg-gray-800 p-6 rounded-2xl border-2 border-primary-200 dark:border-gray-700"
    >
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">{title}</h3>
      <div className="space-y-4">{children}</div>
    </motion.div>
  );
};

export default ResultCard;
