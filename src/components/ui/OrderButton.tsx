'use client';

import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

interface OrderButtonProps extends Omit<HTMLMotionProps<'button'>, 'ref' | 'children'> {
  loading?: boolean;
  children: React.ReactNode;
}

export const OrderButton: React.FC<OrderButtonProps> = ({
  children,
  className = '',
  loading,
  ...props
}) => {
  return (
    <motion.button
      whileHover="hover"
      whileTap={{ scale: 0.98 }}
      className={`relative overflow-hidden inline-flex items-center justify-center rounded-2xl font-black transition-all focus:outline-none py-6 text-xl bg-white text-[#383e42] ${className}`}
      {...props}
    >
      {/* Background Fill Animation (File 2.PNG style) */}
      <motion.div
        variants={{
          hover: { width: '100%' }
        }}
        initial={{ width: '0%' }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="absolute inset-0 bg-purple-500 z-0"
      />

      <span className="relative z-10 transition-colors group-hover:text-white">
        {loading ? 'PRZETWARZANIE...' : children}
      </span>
    </motion.button>
  );
};
