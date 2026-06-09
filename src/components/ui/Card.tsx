import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({ children, className = '', onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`bg-white/5 border border-white/10 rounded-3xl overflow-hidden transition-all duration-500 hover:border-white/20 ${className}`}
    >
      {children}
    </div>
  );
};
