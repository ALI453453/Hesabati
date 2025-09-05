import React from 'react';
import { motion } from 'framer-motion';

interface ProgressBarProps {
  value: number;
  max: number;
  color: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ value, max, color }) => {
  const percentage = (value / max) * 100;

  return (
    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
      <motion.div
        className="h-4 rounded-full"
        style={{ backgroundColor: color }}
        initial={{ width: 0 }}
        animate={{ width: `${percentage}%` }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
      />
    </div>
  );
};

export default ProgressBar;
