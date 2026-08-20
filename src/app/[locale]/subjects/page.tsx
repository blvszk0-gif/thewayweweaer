'use client';

import React, { Suspense } from 'react';
import { useTranslations } from 'next-intl';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { motion } from 'framer-motion';
import { Link } from '@/i18n/routing';
import { useSearchParams } from 'next/navigation';

interface SubjectItem {
  id: string;
  labelKey: string;
  image: string;
  link?: string;
  rawLabel?: string;
}

function SubjectsContent() {
  const tColorsCategories = useTranslations('colors_categories');
  const tNav = useTranslations('nav');
  const tForms = useTranslations('forms');
  const searchParams = useSearchParams();
  const view = searchParams.get('view');
  const isCollections = view === 'collections';

  const mainSubjects: SubjectItem[] = [
    { id: 'bluzy', labelKey: 'bluzy', image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=800', link: '/shop/bluzy' },
    { id: 'koszulki', labelKey: 'koszulki', image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=800', link: '/shop/koszulki' },
    { id: 'akcesoria', labelKey: 'akcesoria', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800', link: '/shop/akcesoria' },
    { id: 'lookbook', labelKey: 'lookbook', image: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&q=80&w=800', link: '/lookbook', rawLabel: 'LOOKBOOK' },
    { id: 'kolekcje', labelKey: 'kolekcje', image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=800', link: '/subjects?view=collections' },
  ];

  const collections: SubjectItem[] = [
    { id: 'stare', labelKey: 'stare', rawLabel: 'THE WAY WE STARE', image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800', link: '/shop/stare' },
    { id: 'roll', labelKey: 'roll', rawLabel: 'THE WAY WE ROLL', image: 'https://images.unsplash.com/photo-1539109132381-31a15b2c686a?auto=format&fit=crop&q=80&w=800', link: '/shop/roll' },
    { id: 'bloom', labelKey: 'bloom', rawLabel: 'THE WAY WE BLOOM', image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&q=80&w=800', link: '/shop/bloom' },
    { id: 'fly', labelKey: 'fly', rawLabel: 'THE WAY WE FLY', image: 'https://images.unsplash.com/photo-1475189778702-5ec9941484ae?auto=format&fit=crop&q=80&w=800', link: '/shop/fly' },
  ];

  const items = isCollections ? collections : mainSubjects;

  return (
    <main className="min-h-screen bg-[color:var(--surface)] text-[color:var(--foreground)] font-antonio relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] bg-repeat" />
      <Header />

      <div className="container mx-auto px-6 pt-40 pb-20 relative z-10">
        <header className="mb-20 text-center lg:text-left relative">
           {isCollections && (
             <Link href="/subjects" className="absolute -top-12 left-0 text-[13px] font-black uppercase tracking-widest border border-[color:var(--border)] px-4 py-2 rounded-full hover:bg-[color:var(--surface-muted)] transition-all">← {tForms('wróć')}</Link>
           )}
           <p className="text-[17px] font-black uppercase tracking-[0.4em] text-[color:var(--foreground)]/30 mb-4">Project: TWWW // Subject:</p>
           <h1 className="text-7xl font-black uppercase tracking-tighter italic leading-none">
             {isCollections ? tNav('kolekcje') : tNav('kolekcje')}
           </h1>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
           {items.map((item, i) => (
              <Link
                key={item.id}
                href={item.link || '#'}
                className="group relative aspect-square overflow-hidden rounded-[50px] border border-[color:var(--border)] shadow-2xl hover:scale-[1.02] transition-all duration-700"
              >
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.1 }}>
                  <img src={item.image} alt={item.rawLabel || tColorsCategories(item.labelKey as any)} className="w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000 group-hover:scale-110" />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-transparent transition-colors">
                     <span className="text-4xl font-black uppercase tracking-tighter italic text-white drop-shadow-2xl text-center px-4">
                       {item.rawLabel || (tColorsCategories.has(item.labelKey as any) ? tColorsCategories(item.labelKey as any) : tNav(item.labelKey as any))}
                     </span>
                  </div>
                </motion.div>
              </Link>
           ))}
        </div>
      </div>

      <Footer />
    </main>
  );
}

export default function SubjectsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[color:var(--surface)]" />}>
      <SubjectsContent />
    </Suspense>
  );
}
