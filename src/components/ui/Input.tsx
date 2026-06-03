import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({ label, error, className = '', ...props }) => {
  return (
    <div className="w-full">
      {label && <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 ml-1">{label}</label>}
      <input
        className={`w-full px-4 py-3 rounded-2xl bg-gray-900 border border-gray-800 focus:outline-none focus:border-white text-white transition-all ${className}`}
        {...props}
      />
      {error && <p className="text-red-500 text-xs mt-1 ml-1">{error}</p>}
    </div>
  );
};
