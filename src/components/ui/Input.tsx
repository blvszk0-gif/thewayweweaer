import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Input: React.FC<InputProps> = ({ label, className = '', ...props }) => {
  return (
    <div className="w-full">
      {label && <label className="block text-sm font-medium text-gray-400 mb-1 ml-2">{label}</label>}
      <input
        className={`w-full px-4 py-3 rounded-2xl bg-gray-900 border border-gray-800 focus:outline-none focus:border-[var(--primary,theme(colors.purple.500))] text-white transition-all ${className}`}
        {...props}
      />
    </div>
  );
};
