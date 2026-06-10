'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Heart } from 'lucide-react';
import Link from 'next/link';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
}

export const ProductCard = ({ id, name, price, image }: ProductCardProps) => {
  return (
    <div className="group flex flex-col bg-[color:var(--surface)] rounded-3xl overflow-hidden border border-[color:var(--border)] hover:shadow-2xl transition-all duration-500">
      <Link href={`/product/${id}`} className="relative aspect-[3/4] overflow-hidden">
        <motion.img
          src={image}
          alt={name}
          whileHover={{ scale: 1.05 }}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
           <button className="bg-[color:var(--surface)]/80 backdrop-blur-md p-3 rounded-full text-[color:var(--foreground)] hover:bg-[color:var(--surface-muted)] hover:text-[color:var(--foreground)] transition-all shadow-xl">
             <Heart size={18} />
           </button>
        </div>
      </Link>

      <div className="p-6 flex flex-col flex-1">
        <Link href={`/product/${id}`}>
          <h3 className="text-xs font-black uppercase tracking-widest mb-1 opacity-40">Project: TWWW</h3>
          <p className="text-lg font-black uppercase tracking-tighter mb-4 italic leading-tight">{name}</p>
          <p className="text-xl font-black mb-6">{price} PLN</p>
        </Link>

        <div className="mt-auto space-y-4">
          <button className="w-full bg-[color:var(--foreground)] text-[color:var(--surface)] py-4 rounded-full font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2 hover:bg-[color:var(--foreground)]/90 transition-all">
            <ShoppingBag size={16} /> Dodaj do koszyka
          </button>
        </div>
      </div>
    </div>
  );
};
