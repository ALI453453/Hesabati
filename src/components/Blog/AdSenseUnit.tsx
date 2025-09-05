import React from 'react';

interface AdSenseUnitProps {
  type: 'in-article' | 'display';
}

const AdSenseUnit: React.FC<AdSenseUnitProps> = ({ type }) => {
  const adStyles = {
    'in-article': 'h-48 md:h-64',
    'display': 'h-24'
  };

  return (
    <div className={`my-8 flex items-center justify-center bg-gray-100 dark:bg-gray-800 border border-dashed border-gray-300 dark:border-gray-700 rounded-lg ${adStyles[type]}`}>
      <div className="text-center text-gray-500 dark:text-gray-400">
        <p className="font-semibold">Responsive AdSense Unit</p>
        <p className="text-sm">({type})</p>
      </div>
    </div>
  );
};

export default AdSenseUnit;
