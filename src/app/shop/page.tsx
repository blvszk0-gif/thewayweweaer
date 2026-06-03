'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { motion } from 'framer-motion';
import Link from 'next/link';

// Mock products data
const products = [
  { id: 'hoodie-001', name: 'Oversize Hoodie "SQUAD" V1', price: '349 PLN', image: 'https://via.placeholder.com/400x500?text=Oversize+Hoodie' },
  { id: '2', name: 'T-Shirt "WAIFU" Limited', price: '149 PLN', image: 'https://via.placeholder.com/400x500?text=T-Shirt+Anime' },
  { id: '3', name: 'Joggers "SQUAD"', price: '249 PLN', image: 'https://via.placeholder.com/400x500?text=Joggers+Player' },
  { id: '4', name: 'Oversize "MANGAKA"', price: '199 PLN', image: 'https://via.placeholder.com/400x500?text=Oversize+Anime' },
];

export default function ShopPage() {
  return (
    <div className="container mx-auto px-6 py-24">
      <header className="mb-12">
        <h1 className="text-4xl font-black mb-2 uppercase tracking-tighter">WSZYSTKIE PRODUKTY</h1>
        <p className="text-gray-400">Wyselekcjonowane ubrania premium dla Twojego stylu.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <Link key={product.id} href={`/shop/${product.id}`}>
            <motion.div whileHover={{ y: -10 }} className="cursor-pointer">
              <Card className="p-0 overflow-hidden group bg-[#2d3236]">
                <div className="aspect-[4/5] bg-white/5 relative overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="bg-white text-[#383e42] px-6 py-2 rounded-full font-black">ZOBACZ</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-black mb-1 uppercase">{product.name}</h3>
                  <p className="text-purple-400 font-black">{product.price}</p>
                </div>
              </Card>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
}
