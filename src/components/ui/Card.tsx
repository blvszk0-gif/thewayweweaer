import React from 'react';
import { motion } from 'framer-motion';

export const Card: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className = '' }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-gray-900 border border-gray-800 rounded-3xl p-6 shadow-2xl ${className}`}
    >
      {children}
    </motion.div>
  );
};
