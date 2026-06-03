'use client';

import React from 'react';
import { useTheme } from '@/context/ThemeContext';
import { Card } from '@/components/ui/Card';
import { motion } from 'framer-motion';
import Link from 'next/link';

// Mock products data
const products = [
  { id: '1', name: 'Hoodie "LORE" V1', price: '299 PLN', fraction: 'player', image: 'https://via.placeholder.com/400x500?text=Hoodie+Player' },
  { id: '2', name: 'T-Shirt "WAIFU" Limited', price: '149 PLN', fraction: 'anime', image: 'https://via.placeholder.com/400x500?text=T-Shirt+Anime' },
  { id: '3', name: 'Joggers "SQUAD"', price: '249 PLN', fraction: 'player', image: 'https://via.placeholder.com/400x500?text=Joggers+Player' },
  { id: '4', name: 'Oversize "MANGAKA"', price: '199 PLN', fraction: 'anime', image: 'https://via.placeholder.com/400x500?text=Oversize+Anime' },
];

export default function ShopPage() {
  const { fraction } = useTheme();

  // Filter products based on fraction or show all if none selected
  const filteredProducts = fraction
    ? products.filter(p => p.fraction === fraction)
    : products;

  return (
    <div className="container mx-auto px-6 py-24">
      <header className="mb-12">
        <h1 className="text-4xl font-black mb-2">KOLEKCJA {fraction?.toUpperCase() || 'WSZYSTKIE'}</h1>
        <p className="text-gray-400">Wyselekcjonowane ubrania premium dla Twojego stylu.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProducts.map((product) => (
          <Link key={product.id} href={`/shop/${product.id}`}>
            <motion.div whileHover={{ y: -10 }} className="cursor-pointer">
              <Card className="p-0 overflow-hidden group">
                <div className="aspect-[4/5] bg-gray-800 relative overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="bg-white text-black px-6 py-2 rounded-full font-bold">ZOBACZ</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-1">{product.name}</h3>
                  <p className="text-[var(--primary,theme(colors.purple.500))] font-mono font-bold">{product.price}</p>
                </div>
              </Card>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
}
