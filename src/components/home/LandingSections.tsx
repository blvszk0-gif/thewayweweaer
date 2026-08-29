'use client';
import React, { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Star, Camera, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { FAQSection } from '@/components/home/FAQSection';
interface StoreReview {
  id: number;
  rating: number;
  body: string;
  reviewerName: string;
  pictureUrl: string | null;
}

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
        <span className="font-black uppercase tracking-widest text-[18px]">{q}</span>
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
            <div className="px-8 pb-8 text-[18px] font-bold uppercase opacity-70 leading-relaxed text-[color:var(--foreground)]">
              {a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export const LandingSections = () => {
  const tHome = useTranslations('home');
  const [reviews, setReviews] = useState<StoreReview[]>([]);
  const [loadingReviews, setLoadingReviews] = useState(true);

  useEffect(() => {
    fetch('/api/reviews')
      .then((res) => res.json())
      .then((data) => setReviews(data.reviews ?? []))
      .catch(() => setReviews([]))
      .finally(() => setLoadingReviews(false));
  }, []);

  const faqItems = [
    { q: tHome('jaki_jest_czas_realizacji_zamówienia'), a: tHome('standardowy_czas_realizacji_to_35_dni_ro') },
    { q: tHome('czy_mogę_zwrócić_towar'), a: tHome('tak_masz_14_dni_na_zwrot_nieużywanego_to') },
    { q: tHome('jak_dbać_o_ubrania_twww'), a: tHome('zalecamy_pranie_w_30_stopniach_na_lewej') },
    { q: tHome('czy_wysyłacie_za_granicę'), a: tHome('obecnie_wysyłamy_na_terenie_całej_unii_e') },
  ];

  return (
    <section className="py-24 font-antonio">
      <div className="container mx-auto px-6">
        {/* Reviews Section */}
        <div className="mb-48">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-16 gap-4 text-center md:text-left">
            <div>
              <h2 className="text-5xl font-black uppercase tracking-tighter italic">{tHome('pochwal_się_tym_co_kupiłeś')}</h2>
            </div>
            <a
              href="mailto:zamowienia@thewaywewear.pl?subject=Moja%20opinia%20o%20TWWW&body=Cze%C5%9B%C4%87%2C%0A%0AChcia%C5%82(a)bym%20podzieli%C4%87%20si%C4%99%20opini%C4%85%20o%20zakupionym%20produkcie%20TWWW.%20W%20za%C5%82%C4%85czniku%20wysy%C5%82am%20zdj%C4%99cie.%0A%0AProdukt%3A%20%0AOcena%20(1-5)%3A%20%0AOpinia%3A%20"
              className="w-full md:w-auto flex items-center justify-center gap-2 text-base font-black uppercase tracking-widest border border-[color:var(--border)] px-6 py-3 rounded-full hover:bg-[color:var(--surface-muted)] hover:text-[color:var(--foreground)] transition-all"
            >
              <Camera size={16} /> {tHome('dodaj_swoją_opinię')}
            </a>
          </div>

          {!loadingReviews && reviews.length === 0 && (
            <p className="text-center opacity-40 font-bold uppercase tracking-widest">
              Brak jeszcze recenzji ze zdjęciami.
            </p>
          )}

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
                <p className="text-[18px] font-bold uppercase leading-relaxed mb-6 flex-1 italic">&quot;{rev.body}&quot;</p>
                {rev.pictureUrl && (
                  <div className="mb-6 aspect-[4/5] rounded-2xl overflow-hidden grayscale hover:grayscale-0 transition-all duration-500 border border-[color:var(--border)] bg-[color:var(--surface-muted)]">
                    <img src={rev.pictureUrl} alt="Review" className="w-full h-full object-cover" />
                  </div>
                )}
                <div className="text-[13px] font-black uppercase tracking-widest opacity-30">
                  — {rev.reviewerName}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <FAQSection />
      </div>
    </section>
  );
};