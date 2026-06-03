'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { OrderButton } from '@/components/ui/OrderButton';

export default function Home() {
  return (
    <main className="flex-1 flex flex-col items-center justify-center p-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl"
      >
        <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 uppercase">
          The Way <span className="text-purple-400">WE</span> Wear
        </h1>
        <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-2xl mx-auto font-medium">
          Premium streetwear dla prawdziwych wyjadaczy gamingu i anime.
          Odkryj ukryte Lore w każdym projekcie.
        </p>

        <div className="flex flex-col md:flex-row gap-6 justify-center">
          <Link href="/shop">
            <OrderButton className="px-12">WEJDŹ DO SKLEPU</OrderButton>
          </Link>
          <Link href="/shop?cat=hoodie">
            <button className="px-12 py-6 text-xl font-black border-2 border-white/20 rounded-2xl hover:border-white transition-all">
              ZOBACZ BLUZY
            </button>
          </Link>
        </div>
      </motion.div>

      {/* Featured SKU Shortcut for testing */}
      <div className="mt-24 pt-12 border-t border-white/5 w-full">
         <p className="text-xs text-gray-500 uppercase tracking-widest mb-4">Polecany Drop</p>
         <Link href="/shop/hoodie-001" className="text-2xl font-black hover:text-purple-400 transition-colors uppercase">
           Oversize Hoodie "SQUAD" V1
         </Link>
      </div>
    </main>
  );
}
