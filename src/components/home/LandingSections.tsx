'use client';

import React from 'react';
import { ProductCard } from '@/components/shop/ProductCard';

const products = [
  { id: '1', name: 'OVERSIZE HOODIE // STARE', price: 299, image: 'https://placehold.co/600x800/000000/FFFFFF?text=HOODIE+1' },
  { id: '2', name: 'GRAFIC T-SHIRT // ROLL', price: 149, image: 'https://placehold.co/600x800/000000/FFFFFF?text=TEE+1' },
  { id: '3', name: 'CARGO PANTS // BLOOM', price: 349, image: 'https://placehold.co/600x800/000000/FFFFFF?text=PANTS+1' },
  { id: '4', name: 'SQUAD CAP // FLY', price: 99, image: 'https://placehold.co/600x800/000000/FFFFFF?text=CAP+1' },
];

export const LandingSections = () => {
  return (
    <section className="py-24 font-montserrat">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-end mb-16">
          <div>
            <h2 className="text-5xl font-black uppercase tracking-tighter italic font-abel">Bestsellery</h2>
            <p className="text-black/40 font-bold uppercase tracking-widest text-xs mt-2">Najczęściej wybierane przez Squad</p>
          </div>
          <button className="text-xs font-black uppercase tracking-widest border-b-2 border-black pb-1 hover:opacity-50 transition-opacity">Zobacz wszystko</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((p) => (
            <ProductCard key={p.id} {...p} />
          ))}
        </div>

        {/* Mission Section */}
        <div className="mt-48 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
           <div className="aspect-square rounded-[40px] overflow-hidden bg-black/5 shadow-2xl">
              <img src="https://placehold.co/800x800/000000/FFFFFF?text=THE+WAY+WE+WEAR+STUDIO" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000" />
           </div>
           <div className="space-y-8">
              <h3 className="text-6xl font-black uppercase tracking-tighter italic leading-none font-abel">Więcej niż ubrania. <br/> To Twój ekwipunek.</h3>
              <p className="text-xl font-bold opacity-60 leading-relaxed uppercase">
                The Way WE Wear to marka premium stworzona dla tych, którzy światy wirtualne traktują na równi z rzeczywistością. Łączymy minimalistyczny styl z ukrytymi smaczkami z Lore Twoich ulubionych gier i anime.
              </p>
              <div className="grid grid-cols-2 gap-8 pt-8 border-t border-black/10">
                 <div>
                    <h4 className="text-2xl font-black uppercase mb-2 italic font-abel">Haft Premium</h4>
                    <p className="text-[10px] font-bold opacity-40 uppercase tracking-widest">Precyzyjne wykończenie każego detalu.</p>
                 </div>
                 <div>
                    <h4 className="text-2xl font-black uppercase mb-2 italic font-abel">Bawełna 340G</h4>
                    <p className="text-[10px] font-bold opacity-40 uppercase tracking-widest">Najwyższa trwałość i komfort noszenia.</p>
                 </div>
              </div>
           </div>
        </div>

        {/* Newsletter Section */}
        <div className="mt-48 bg-white rounded-[50px] p-16 md:p-24 shadow-2xl relative overflow-hidden group">
           <div className="absolute top-0 right-0 w-96 h-96 bg-black/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl group-hover:bg-black/10 transition-all duration-1000" />
           <div className="relative z-10 max-w-2xl">
              <h3 className="text-5xl md:text-7xl font-black uppercase tracking-tighter italic mb-8 font-abel">Join the Squad.</h3>
              <p className="text-xl font-bold opacity-40 uppercase mb-12 tracking-wide">Zapisz się do newslettera i odbierz -10% na pierwszy drop oraz dostęp do ukrytych kolekcji.</p>

              <div className="flex flex-col md:flex-row gap-4">
                 <input
                  type="email"
                  placeholder="TWOJA@POCZTA.COM"
                  className="flex-1 bg-black/5 border border-black/10 rounded-full px-10 py-6 font-black uppercase text-sm focus:outline-none focus:border-black transition-all"
                 />
                 <button className="bg-black text-white px-12 py-6 rounded-full font-black uppercase tracking-widest hover:bg-black/80 transition-all shadow-xl">
                   Zapisz się
                 </button>
              </div>

              <button className="mt-8 text-[10px] font-black uppercase tracking-widest text-red-600 hover:text-red-700 transition-colors">
                Anuluj subskrypcję
              </button>
           </div>
        </div>
      </div>
    </section>
  );
};
