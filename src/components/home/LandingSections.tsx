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
import React, { useState } from 'react';
import { Star, ChevronDown, Share2, Mail, ShoppingCart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const LandingSections = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const reviews = [
    { name: 'Maksymilian', text: 'Jakość haftu powala. Widać, że to nie jest masówka.', img: 'https://placehold.co/400x500/000000/FFFFFF?text=CLIENT+1' },
    { name: 'Julia', text: 'Bluza oversize leży idealnie. Materiał bardzo gruby i ciepły.', img: 'https://placehold.co/400x500/000000/FFFFFF?text=CLIENT+2' },
    { name: 'Kacper', text: 'Najlepszy streetwear jaki miałem. Polecam każdemu geekowi.', img: 'https://placehold.co/400x500/000000/FFFFFF?text=CLIENT+3' },
  ];

  const faqs = [
    { q: 'Jaki jest czas realizacji?', a: 'Standardowy czas to 3-5 dni roboczych.' },
    { q: 'Czy mogę zwrócić produkt?', a: 'Tak, masz 14 dni na zwrot nieużywanego towaru.' },
    { q: 'Skąd wysyłacie?', a: 'Wszystkie paczki wychodzą z naszej pracowni w Polsce.' },
    { q: 'Jak prać bluzę z haftem?', a: 'Zalecamy pranie na lewej stronie w 30 stopniach.' },
    { q: 'Czy robicie własne projekty?', a: 'Tak, skontaktuj się z nami przez formularz.' },
  ];

  const socials = [
    { name: 'x.com', icon: <Share2 size={20} />, href: 'https://x.com' },
    { name: 'facebook', icon: <Share2 size={20} />, href: 'https://facebook.com' },
    { name: 'tiktok', icon: <Share2 size={20} />, href: 'https://tiktok.com' },
    { name: 'instagram', icon: <Share2 size={20} />, href: 'https://instagram.com' },
    { name: 'pinterest', icon: <Share2 size={20} />, href: 'https://pinterest.com' },
  ];

  return (
    <div className="bg-black text-white">
      {/* Reviews */}
      <section className="py-24 container mx-auto px-6">
        <h2 className="text-4xl font-black uppercase tracking-tighter mb-16 text-center italic">Opinie klientów</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((r, i) => (
            <div key={i} className="group">
              <div className="aspect-[3/4] overflow-hidden rounded-3xl mb-6 grayscale group-hover:grayscale-0 transition-all duration-700 border border-white/5">
                <img src={r.img} alt={r.name} className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-700" />
              </div>
              <div className="flex gap-1 mb-3 text-white">
                {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="white" />)}
              </div>
              <p className="text-lg font-bold mb-2 uppercase tracking-tighter">{r.name}</p>
              <p className="text-white/50 text-sm leading-relaxed italic">"{r.text}"</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 border-y border-white/5">
        <div className="container mx-auto px-6 max-w-2xl">
          <h2 className="text-6xl font-black uppercase tracking-tighter mb-16 text-center">FAQ</h2>
          <div className="flex flex-col gap-4">
            {faqs.map((f, i) => (
              <div key={i} className="border border-white/10 rounded-2xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full p-6 flex justify-between items-center text-left hover:bg-white/5 transition-colors"
                >
                  <span className="font-bold uppercase tracking-widest text-xs">{f.q}</span>
                  <ChevronDown size={18} className={`transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="px-6 pb-6 text-white/50 text-sm leading-relaxed"
                    >
                      {f.a}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Socials */}
      <section className="py-24 container mx-auto px-6 text-center">
        <h3 className="text-xs font-bold text-white/30 tracking-[0.3em] uppercase mb-12">Znajdź i zaobserwuj nas tutaj:</h3>
        <div className="flex flex-wrap justify-center gap-12">
          {socials.map((s) => (
            <a key={s.name} href={s.href} className="flex items-center gap-3 group">
              <div className="p-3 border border-white/10 rounded-full group-hover:bg-white group-hover:text-black transition-all">
                {s.icon}
              </div>
              <span className="font-black uppercase tracking-tighter text-xl group-hover:translate-x-2 transition-transform">{s.name}</span>
            </a>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-24 bg-white/5">
        <div className="container mx-auto px-6 flex flex-col items-center">
          <div className="flex items-center gap-4 mb-8">
             <ShoppingCart size={32} />
             <h2 className="text-4xl font-black uppercase tracking-tighter italic">Join the Squad</h2>
          </div>
          <div className="w-full max-w-xl flex flex-col md:flex-row gap-4 mb-6">
             <input type="email" placeholder="TWOJA POCZTA..." className="flex-1 bg-black border border-white/20 rounded-full px-8 py-4 focus:outline-none focus:border-white transition-colors" />
             <button className="bg-white text-black px-12 py-4 rounded-full font-black uppercase tracking-tighter hover:bg-white/90 transition-colors">ZAPISZ SIĘ</button>
          </div>
          <button className="text-[10px] font-bold text-red-500 uppercase tracking-widest hover:underline decoration-red-500/50">
            Anuluj subskrypcję
          </button>
        </div>
      </section>
    </div>
  );
};
