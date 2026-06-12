'use client';

import React, { useState } from 'react';
import { Star, Camera, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const reviews = [
  { id: 1, author: 'Kamil G.', rating: 5, text: 'Najlepsza bluza jaką miałem. Materiał 340G robi robotę, czuć tę jakość od razu po wyjęciu z pudełka.', photo: 'https://placehold.co/400x500/000000/FFFFFF?text=OPINIA+1' },
  { id: 2, author: 'Marta V.', rating: 5, text: 'Haft jest niesamowicie szczegółowy. Czekam na kolejny drop!', photo: null },
  { id: 3, author: 'Alex_Gamer', rating: 4, text: 'Stylistyka 10/10. Rozmiarówka oversize idealnie trafiona.', photo: 'https://placehold.co/400x500/000000/FFFFFF?text=OPINIA+3' },
];

const FAQItem = ({ q, a, i }: { q: string, a: string, i: number }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: i * 0.1 }}
      className="bg-[color:var(--surface)] border border-[color:var(--border)] rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center p-8 cursor-pointer text-[color:var(--foreground)] text-left focus:outline-none"
      >
        <span className="font-black uppercase tracking-widest text-sm">{q}</span>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          className="w-8 h-8 rounded-full bg-[color:var(--surface-muted)] flex items-center justify-center shrink-0"
        >
          <Plus size={16} />
        </motion.span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.04, 0.62, 0.23, 0.98] }}
          >
            <div className="px-8 pb-8 text-sm font-bold uppercase opacity-70 leading-relaxed text-[color:var(--foreground)]">
              {a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export const LandingSections = () => {
  return (
    <section className="py-24 font-antonio">
      <div className="container mx-auto px-6">

        {/* Reviews Section */}
        <div className="mb-48">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-16 gap-4 text-center md:text-left">
            <div>
              <h2 className="text-5xl font-black uppercase tracking-tighter italic">Głos Squadu</h2>
              <p className="text-[color:var(--foreground)]/70 font-bold uppercase tracking-widest text-xs mt-2">Wasze opinie o naszych dropach</p>
            </div>
            <button className="w-full md:w-auto flex items-center justify-center gap-2 text-xs font-black uppercase tracking-widest border border-[color:var(--border)] px-6 py-3 rounded-full hover:bg-[color:var(--surface-muted)] hover:text-[color:var(--foreground)] transition-all">
              <Camera size={16} /> Dodaj swoją opinię
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviews.map((rev) => (
              <motion.div
                key={rev.id}
                whileHover={{ y: -10 }}
                className="bg-[color:var(--surface)] text-[color:var(--foreground)] p-8 rounded-[30px] shadow-xl border border-[color:var(--border)] flex flex-col h-full"
              >
                <div className="flex gap-1 mb-4 text-yellow-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill={i < rev.rating ? "currentColor" : "none"} />
                  ))}
                </div>
                <p className="text-[18px] font-bold uppercase leading-relaxed mb-6 flex-1 italic">&quot;{rev.text}&quot;</p>

                {rev.photo && (
                  <div className="mb-6 aspect-[4/5] rounded-2xl overflow-hidden grayscale hover:grayscale-0 transition-all duration-500 border border-[color:var(--border)] bg-[color:var(--surface-muted)]">
                    <img src={rev.photo} alt="Review" className="w-full h-full object-cover" />
                  </div>
                )}

                <div className="text-[13px] font-black uppercase tracking-widest opacity-30">
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
            <p className="text-[color:var(--foreground)]/40 font-bold uppercase tracking-widest text-xs">Najczęściej zadawane pytania</p>
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
              <FAQItem key={i} q={item.q} a={item.a} i={i} />
            ))}
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="bg-[color:var(--surface)] rounded-[50px] p-16 md:p-24 shadow-2xl relative overflow-hidden group border border-[color:var(--border)]">
           <div className="absolute top-0 right-0 w-96 h-96 bg-[color:var(--foreground)]/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl group-hover:bg-[color:var(--foreground)]/10 transition-all duration-1000" />
           <div className="relative z-10 max-w-2xl">
              <h3 className="text-5xl md:text-7xl font-black uppercase tracking-tighter italic mb-8 text-[color:var(--foreground)]">Be a part of our squad!</h3>
              <p className="text-xl font-bold opacity-40 uppercase mb-12 tracking-wide text-[color:var(--foreground)]">Zapisz się już dziś do newslettera i bądź na bieżąco z dropami nowych kolekcji.</p>

              <div className="flex flex-col md:flex-row gap-4">
                 <input
                  type="email"
                  placeholder="TWOJA@POCZTA.COM"
                  className="flex-1 bg-[color:var(--surface-muted)] border border-[color:var(--border)] rounded-full px-10 py-6 font-black uppercase text-sm focus:outline-none focus:border-[color:var(--foreground)] transition-all text-[color:var(--foreground)] placeholder:text-[color:var(--foreground)]/50"
                 />
                 <button className="bg-[color:var(--foreground)] text-[color:var(--surface)] px-12 py-6 rounded-full font-black uppercase tracking-widest hover:opacity-90 transition-all shadow-xl">
                   Zapisz się
                 </button>
              </div>

              <button className="mt-8 text-[13px] font-black uppercase tracking-widest text-red-600 hover:text-red-700 transition-colors">
                Anuluj subskrypcję
              </button>
           </div>
        </div>
      </div>
    </section>
  );
};
