'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Heart, CreditCard } from 'lucide-react';
import Link from 'next/link';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
}

export const ProductCard = ({ id, name, price, image }: ProductCardProps) => {
  return (
    <div className="group flex flex-col bg-white rounded-3xl overflow-hidden border border-black/5 hover:shadow-2xl transition-all duration-500">
      <Link href={`/product/${id}`} className="relative aspect-[3/4] overflow-hidden">
        <motion.img
          src={image}
          alt={name}
          whileHover={{ scale: 1.05 }}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
           <button className="bg-white/80 backdrop-blur-md p-3 rounded-full text-black hover:bg-black hover:text-white transition-all shadow-xl">
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
          <button className="w-full bg-black text-white py-4 rounded-full font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2 hover:bg-black/80 transition-all">
            <ShoppingBag size={16} /> Dodaj do koszyka
          </button>

          <div className="flex items-center justify-center gap-4 opacity-20 py-2">
            <CreditCard size={16} />
            <span className="text-[8px] font-black italic">BLIK</span>
            <span className="text-[8px] font-black italic">VISA</span>
            <span className="text-[8px] font-black italic">APPLE PAY</span>
          </div>
        </div>
      </div>
    </div>
  );
};
