'use client';

import React, { useState } from 'react';
import { Star, Camera, Plus } from 'lucide-react';
import { motion } from 'framer-motion';

const reviews = [
  { id: 1, author: 'Kamil G.', rating: 5, text: 'Najlepsza bluza jaką miałem. Materiał 340G robi robotę, czuć tę jakość od razu po wyjęciu z pudełka.', photo: 'https://placehold.co/400x500/000000/FFFFFF?text=OPINIA+1' },
  { id: 2, author: 'Marta V.', rating: 5, text: 'Haft jest niesamowicie szczegółowy. Czekam na kolejny drop!', photo: null },
  { id: 3, author: 'Alex_Gamer', rating: 4, text: 'Stylistyka 10/10. Rozmiarówka oversize idealnie trafiona.', photo: 'https://placehold.co/400x500/000000/FFFFFF?text=OPINIA+3' },
];

export const LandingSections = () => {
  return (
    <section className="py-24 font-abel">
      <div className="container mx-auto px-6">

        {/* Reviews Section */}
        <div className="mb-48">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
            <div>
              <h2 className="text-5xl font-black uppercase tracking-tighter italic font-abel">Głos Squadu</h2>
              <p className="text-black/40 font-bold uppercase tracking-widest text-xs mt-2">Wasze opinie o naszych dropach</p>
            </div>
            <button className="flex items-center gap-2 text-xs font-black uppercase tracking-widest border border-black px-6 py-3 rounded-full hover:bg-black hover:text-white transition-all">
              <Camera size={16} /> Dodaj swoją opinię
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviews.map((rev) => (
              <motion.div
                key={rev.id}
                whileHover={{ y: -10 }}
                className="bg-white p-8 rounded-[30px] shadow-xl border border-black/5 flex flex-col h-full"
              >
                <div className="flex gap-1 mb-4 text-yellow-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill={i < rev.rating ? "currentColor" : "none"} />
                  ))}
                </div>
                <p className="text-sm font-bold uppercase leading-relaxed mb-6 flex-1 italic">"{rev.text}"</p>

                {rev.photo && (
                  <div className="mb-6 aspect-[4/5] rounded-2xl overflow-hidden grayscale hover:grayscale-0 transition-all duration-500">
                    <img src={rev.photo} alt="Review" className="w-full h-full object-cover" />
                  </div>
                )}

                <div className="text-[10px] font-black uppercase tracking-widest opacity-30">
                  — {rev.author}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-48 max-w-4xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-black uppercase tracking-tighter italic mb-4">FAQ</h2>
            <p className="text-black/40 font-bold uppercase tracking-widest text-xs">Najczęściej zadawane pytania</p>
          </div>

          <div className="space-y-6">
            {[
              {
                q: "JAKI JEST CZAS REALIZACJI ZAMÓWIENIA?",
                a: "Standardowy czas realizacji to 3-5 dni roboczych. W przypadku dropów limitowanych czas ten może się wydłużyć do 10 dni."
              },
              {
                q: "CZY MOGĘ ZWRÓCIĆ TOWAR?",
                a: "Tak, masz 14 dni na zwrot nieużywanego towaru bez podania przyczyny. Produkty z własnym haftem nie podlegają zwrotowi."
              },
              {
                q: "JAK DBAĆ O UBRANIA TWWW?",
                a: "Zalecamy pranie w 30 stopniach na lewej stronie. Unikaj suszarek bębnowych, aby zachować jakość haftu na lata."
              },
              {
                q: "CZY WYSYŁACIE ZA GRANICĘ?",
                a: "Obecnie wysyłamy na terenie całej Unii Europejskiej. Koszt wysyłki zagranicznej jest obliczany przy checkoutcie."
              },
              {
                q: "CO TO JEST SQUAD POINTS?",
                a: "To nasz system lojalnościowy. Za każde zakupy zbierasz punkty, które wymienisz na zniżki lub dostęp do tajnych dropów."
              }
            ].map((item, i) => (
              <details key={i} className="group bg-white border border-black/5 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all">
                <summary className="flex justify-between items-center p-8 cursor-pointer list-none">
                  <span className="font-black uppercase tracking-widest text-sm">{item.q}</span>
                  <span className="w-8 h-8 rounded-full bg-black/5 flex items-center justify-center group-open:rotate-45 transition-transform">
                    <Plus size={16} />
                  </span>
                </summary>
                <div className="px-8 pb-8 text-sm font-bold uppercase opacity-50 leading-relaxed">
                  {item.a}
                </div>
              </details>
            ))}
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="bg-white rounded-[50px] p-16 md:p-24 shadow-2xl relative overflow-hidden group">
           <div className="absolute top-0 right-0 w-96 h-96 bg-black/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl group-hover:bg-black/10 transition-all duration-1000" />
           <div className="relative z-10 max-w-2xl">
              <h3 className="text-5xl md:text-7xl font-black uppercase tracking-tighter italic mb-8 font-abel">Be a part of our squad!</h3>
              <p className="text-xl font-bold opacity-40 uppercase mb-12 tracking-wide">Zapisz się już dziś do newslettera i bądź na bieżąco z dropami nowych kolekcji.</p>

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
