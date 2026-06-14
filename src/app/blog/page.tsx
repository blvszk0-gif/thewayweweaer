'use client';

import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { motion } from 'framer-motion';
import { Book, History, Users, Heart } from 'lucide-react';

const articles = [
  {
    title: 'JAK TO SIĘ ZACZĘŁO?',
    date: '12 STYCZNIA 2026',
    excerpt: 'OD PIERWSZEJ MASZYNY DO SZYCIA W GARAŻU DO BUDOWANIA NAJWIĘKSZEJ SPOŁECZNOŚCI STREETWEAROWEJ W POLSCE.',
    icon: History
  },
  {
    title: 'MISJA SQUADU',
    date: '05 LUTEGO 2026',
    excerpt: 'DLACZEGO "WE" W NASZEJ NAZWIE JEST TAK WAŻNE? O BUDOWANIU RELACJI I WSPÓLNYCH PASJACH.',
    icon: Users
  },
  {
    title: 'JAKOŚĆ PREMIUM',
    date: '20 MARCA 2026',
    excerpt: 'DETALE, KTÓRE ROBIĄ RÓŻNICĘ. PRZEWODNIK PO NASZYCH MATERIAŁACH I TECHNIKACH HAFTU.',
    icon: Heart
  }
];

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-[color:var(--surface)] font-antonio">
      <Header />

      <div className="container mx-auto px-6 pt-40 pb-40">
        <div className="max-w-4xl mx-auto">
          <div className="mb-24 text-center">
            <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter italic mb-8">Nasza Historia</h1>
            <p className="text-[22px] font-bold opacity-40 uppercase tracking-widest leading-relaxed">Poznaj korzenie The Way WE Wear</p>
          </div>

          <div className="space-y-12">
            {articles.map((art, i) => (
              <motion.article
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-[color:var(--surface-muted)] border border-[color:var(--border)] rounded-[40px] p-12 hover:scale-[1.02] transition-transform cursor-pointer group shadow-xl"
              >
                <div className="flex flex-col md:flex-row gap-12 items-center">
                   <div className="w-32 h-32 bg-[color:var(--foreground)] text-[color:var(--surface)] rounded-3xl flex items-center justify-center shrink-0 group-hover:rotate-6 transition-transform shadow-2xl">
                      <art.icon size={48} />
                   </div>
                   <div className="space-y-4">
                      <p className="text-[13px] font-black uppercase tracking-[0.4em] opacity-30">{art.date}</p>
                      <h2 className="text-4xl font-black uppercase tracking-tighter italic">{art.title}</h2>
                      <p className="text-xl font-bold opacity-60 uppercase leading-relaxed">{art.excerpt}</p>
                      <button className="flex items-center gap-2 text-[15px] font-black uppercase tracking-widest border-b-2 border-[color:var(--foreground)] pb-1 hover:gap-4 transition-all">
                        Czytaj dalej <Book size={16} />
                      </button>
                   </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
