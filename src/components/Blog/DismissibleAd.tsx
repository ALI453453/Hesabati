import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

interface DismissibleAdProps {
  adId: string;
  type: 'in-article' | 'display';
}

const DismissibleAd: React.FC<DismissibleAdProps> = ({ adId, type }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const dismissedState = sessionStorage.getItem(`ad-dismissed-${adId}`);
    if (dismissedState !== 'true') {
      setIsVisible(true);
    }
  }, [adId]);

  const handleDismiss = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsVisible(false);
    sessionStorage.setItem(`ad-dismissed-${adId}`, 'true');
  };

  const adStyles = {
    'in-article': 'h-48 md:h-64',
    'display': 'h-16 md:h-24'
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.5 }}
          className="relative my-4"
        >
          <div className={`flex items-center justify-center bg-gray-100 dark:bg-gray-800 border border-dashed border-gray-300 dark:border-gray-700 rounded-lg ${adStyles[type]}`}>
            <div className="text-center text-gray-500 dark:text-gray-400">
              <p className="font-semibold">Responsive AdSense Unit</p>
              <p className="text-sm">({type})</p>
            </div>
          </div>
          <button
            onClick={handleDismiss}
            className="absolute top-1 right-1 p-1 bg-gray-200/50 dark:bg-gray-700/50 hover:bg-gray-300/80 dark:hover:bg-gray-600/80 rounded-full text-gray-600 dark:text-gray-300"
            aria-label="Dismiss ad"
          >
            <X className="w-3 h-3" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DismissibleAd;
