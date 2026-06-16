'use client';

import React, { Suspense } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { HaftWizard } from '@/components/shop/HaftWizard';

interface SubjectItem {
  id: string;
  label: string;
  image: string;
  link?: string;
  type?: 'link' | 'button';
}

const mainSubjects: SubjectItem[] = [
  { id: 'bluzy', label: 'BLUZY', image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=800', link: '/shop/bluzy', type: 'link' },
  { id: 'koszulki', label: 'KOSZULKI', image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=800', link: '/shop/koszulki', type: 'link' },
  { id: 'akcesoria', label: 'AKCESORIA', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800', link: '/shop/akcesoria', type: 'link' },
  { id: 'lookbook', label: 'LOOKBOOK', image: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&q=80&w=800', link: '/lookbook', type: 'link' },
  { id: 'haft', label: 'HAFT NA ZAMÓWIENIE', image: 'https://images.unsplash.com/photo-1516062423079-7ca13cdc7f5a?auto=format&fit=crop&q=80&w=800', type: 'button' },
  { id: 'kolekcje', label: 'KOLEKCJE >', image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=800', link: '/subjects?view=collections', type: 'link' },
];

const collections: SubjectItem[] = [
  { id: 'stare', label: 'THE WAY WE STARE', image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800', link: '/shop/stare', type: 'link' },
  { id: 'roll', label: 'THE WAY WE ROLL', image: 'https://images.unsplash.com/photo-1539109132381-31a15b2c686a?auto=format&fit=crop&q=80&w=800', link: '/shop/roll', type: 'link' },
  { id: 'bloom', label: 'THE WAY WE BLOOM', image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&q=80&w=800', link: '/shop/bloom', type: 'link' },
  { id: 'fly', label: 'THE WAY WE FLY', image: 'https://images.unsplash.com/photo-1475189778702-5ec9941484ae?auto=format&fit=crop&q=80&w=800', link: '/shop/fly', type: 'link' },
];

function SubjectsContent() {
  const searchParams = useSearchParams();
  const view = searchParams.get('view');
  const isCollections = view === 'collections';
  const items = isCollections ? collections : mainSubjects;
  const [isHaftOpen, setIsHaftOpen] = React.useState(false);

  return (
    <main className="min-h-screen bg-[color:var(--surface)] text-[color:var(--foreground)] font-antonio relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] bg-repeat" />
      <Header />

      <div className="container mx-auto px-6 pt-40 pb-20 relative z-10">
        <header className="mb-20 text-center lg:text-left relative">
           {isCollections && (
             <Link href="/subjects" className="absolute -top-12 left-0 text-[13px] font-black uppercase tracking-widest border border-[color:var(--border)] px-4 py-2 rounded-full hover:bg-[color:var(--surface-muted)] transition-all">← Wróć</Link>
           )}
           <p className="text-[17px] font-black uppercase tracking-[0.4em] text-[color:var(--foreground)]/30 mb-4">Project: TWWW // Subject:</p>
           <h1 className="text-7xl font-black uppercase tracking-tighter italic leading-none">
             {isCollections ? 'Wybierz Kolekcję' : 'Wybierz Kategorię'}
           </h1>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
           {items.map((item, i) => (
             item.type === 'button' ? (
                <button
                  key={item.id}
                  onClick={() => setIsHaftOpen(true)}
                  className="group relative aspect-square overflow-hidden rounded-[50px] border border-[color:var(--border)] shadow-2xl hover:scale-[1.02] transition-all duration-700"
                >
                  <img src={item.image} alt={item.label} className="w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000 group-hover:scale-110" />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-transparent transition-colors">
                     <span className="text-4xl font-black uppercase tracking-tighter italic text-white drop-shadow-2xl">{item.label}</span>
                  </div>
                </button>
             ) : (
                <Link
                  key={item.id}
                  href={item.link || '#'}
                  className="group relative aspect-square overflow-hidden rounded-[50px] border border-[color:var(--border)] shadow-2xl hover:scale-[1.02] transition-all duration-700"
                >
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.1 }}>
                    <img src={item.image} alt={item.label} className="w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000 group-hover:scale-110" />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-transparent transition-colors">
                       <span className="text-4xl font-black uppercase tracking-tighter italic text-white drop-shadow-2xl text-center px-4">{item.label}</span>
                    </div>
                  </motion.div>
                </Link>
             )
           ))}
        </div>
      </div>

      <HaftWizard isOpen={isHaftOpen} onClose={() => setIsHaftOpen(false)} />
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
