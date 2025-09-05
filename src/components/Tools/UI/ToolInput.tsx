import React from 'react';

interface ToolInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: React.ReactNode;
  unit?: string;
}

const ToolInput: React.FC<ToolInputProps> = ({ label, icon, unit, ...props }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        {label}
      </label>
      <div className="relative">
        {icon && (
          <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
            {icon}
          </div>
        )}
        <input
          {...props}
          className={`w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent ${icon ? 'pl-10' : ''} ${unit ? 'pr-12' : ''}`}
        />
        {unit && (
          <div className="pointer-events-none absolute inset-y-0 right-0 pr-3 flex items-center">
            <span className="text-gray-500 dark:text-gray-400 sm:text-sm">{unit}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ToolInput;
