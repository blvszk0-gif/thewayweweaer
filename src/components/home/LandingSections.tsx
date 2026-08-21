'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Star, Camera, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterConsent, setNewsletterConsent] = useState(false);
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [newsletterMessage, setNewsletterMessage] = useState('');

  const subscribeToNewsletter = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setNewsletterStatus('loading');
    setNewsletterMessage('');

    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: newsletterEmail, consent: newsletterConsent }),
      });
      const isJson = response.headers.get('content-type')?.includes('application/json');
      const body = isJson ? await response.json() as { error?: string; message?: string } : {};
      if (!response.ok) throw new Error(body.error || 'Nie udało się zapisać do newslettera. Spróbuj ponownie później.');
      setNewsletterStatus('success');
      setNewsletterMessage(body.message || 'Zapis do newslettera został potwierdzony.');
      setNewsletterEmail('');
      setNewsletterConsent(false);
    } catch (error) {
      setNewsletterStatus('error');
      setNewsletterMessage(error instanceof Error ? error.message : 'Nie udało się zapisać do newslettera. Spróbuj ponownie później.');
    }
  };

  const reviews = [
    { id: 1, author: 'Kamil G.', rating: 5, text: tHome('najlepsza_bluza_jaką_miałem_materiał_340'), photo: 'https://placehold.co/400x500/000000/FFFFFF?text=OPINIA+1' },
    { id: 2, author: 'Marta V.', rating: 5, text: tHome('haft_jest_niesamowicie_szczegółowy_czeka'), photo: null },
    { id: 3, author: 'Alex_Gamer', rating: 4, text: tHome('stylistyka_1010_rozmiarówka_oversize_ide'), photo: 'https://placehold.co/400x500/000000/FFFFFF?text=OPINIA+3' },
  ];

  const faqItems = [
    {
      q: tHome('jaki_jest_czas_realizacji_zamówienia'),
      a: tHome('standardowy_czas_realizacji_to_35_dni_ro')
    },
    {
      q: tHome('czy_mogę_zwrócić_towar'),
      a: tHome('tak_masz_14_dni_na_zwrot_nieużywanego_to')
    },
    {
      q: tHome('jak_dbać_o_ubrania_twww'),
      a: tHome('zalecamy_pranie_w_30_stopniach_na_lewej')
    },
    {
      q: tHome('czy_wysyłacie_za_granicę'),
      a: tHome('obecnie_wysyłamy_na_terenie_całej_unii_e')
    },
    {
      q: tHome('co_to_jest_twww_club'),
      a: tHome('to_nasz_system_lojalnościowy_za_każde_za')
    }
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
            <button className="w-full md:w-auto flex items-center justify-center gap-2 text-base font-black uppercase tracking-widest border border-[color:var(--border)] px-6 py-3 rounded-full hover:bg-[color:var(--surface-muted)] hover:text-[color:var(--foreground)] transition-all">
              <Camera size={16} /> {tHome('dodaj_swoją_opinię')}
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
            <p className="text-[color:var(--foreground)]/40 font-bold uppercase tracking-widest text-base">{tHome('najczęściej_zadawane_pytania')}</p>
          </div>

          <div className="space-y-6">
            {faqItems.map((item, i) => (
              <FAQItem key={i} q={item.q} a={item.a} i={i} />
            ))}
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="bg-[color:var(--surface)] text-[color:var(--foreground)] rounded-[50px] p-16 md:p-24 shadow-2xl relative overflow-hidden group border border-[color:var(--border)]">
           <div className="absolute top-0 right-0 w-96 h-96 bg-[color:var(--foreground)]/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl group-hover:bg-[color:var(--foreground)]/10 transition-all duration-1000" />
           <div className="relative z-10 max-w-2xl">
              <h3 className="text-5xl md:text-7xl font-black uppercase tracking-tighter italic mb-8">{tHome('pozostańmy_w_kontakcie')}</h3>
              <p className="text-xl font-bold opacity-40 uppercase mb-12 tracking-wide text-[color:var(--foreground)]/60">{tHome('zapisz_się_już_dziś_do_newslettera_i_bąd')}</p>

              <form onSubmit={subscribeToNewsletter} className="space-y-5">
              <div className="flex flex-col md:flex-row gap-4">
                 <input
                  type="email"
                  placeholder={tHome('twojapocztacom')}
                  value={newsletterEmail}
                  onChange={(event) => setNewsletterEmail(event.target.value)}
                  required
                  className="flex-1 bg-[color:var(--surface-muted)] border border-[color:var(--border)] rounded-full px-10 py-6 font-black uppercase text-[18px] focus:outline-none focus:border-[color:var(--foreground)] transition-all text-[color:var(--foreground)] placeholder:text-[color:var(--foreground)]/50"
                 />
                 <button type="submit" disabled={!newsletterConsent || newsletterStatus === 'loading'} className="bg-[color:var(--foreground)] text-[color:var(--surface)] px-12 py-6 rounded-full font-black uppercase tracking-widest hover:opacity-90 transition-all shadow-xl disabled:opacity-40">
                   {newsletterStatus === 'loading' ? '...' : tHome('zapisz_się')}
                 </button>
              </div>
              <label className="flex items-start gap-3 text-sm font-bold uppercase tracking-widest text-[color:var(--foreground)]/60 cursor-pointer">
                <input type="checkbox" checked={newsletterConsent} onChange={(event) => setNewsletterConsent(event.target.checked)} className="mt-0.5 h-4 w-4" />
                <span>{tHome('newsletter_consent')}</span>
              </label>
              {newsletterStatus === 'success' && <p className="text-sm font-black uppercase tracking-widest text-green-600">{newsletterMessage}</p>}
              {newsletterStatus === 'error' && <p className="text-sm font-black uppercase tracking-widest text-red-600">{newsletterMessage}</p>}
              </form>
           </div>
        </div>
      </div>
    </section>
  );
};
