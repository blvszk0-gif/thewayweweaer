'use client';

import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const blogPosts = [
  {
    id: 'story-of-twww',
    title: 'Dlaczego WE? Historia powstania marki',
    excerpt: 'W świecie zdominowanym przez indywidualizm postawiliśmy na Squad. Poznaj historię The Way WE Wear.',
    date: '20.03.2024',
    author: 'ADMIN',
    category: 'HISTORY',
    image: 'https://placehold.co/800x600/000000/FFFFFF?text=OUR+STORY'
  },
  {
    id: 'anime-vibe-check',
    title: 'Easter Eggi w nowej kolekcji Anime',
    excerpt: 'Szukasz nawiązań do lore? Przygotowaliśmy dla Ciebie zestawienie wszystkich ukrytych smaczków.',
    date: '15.03.2024',
    author: 'SQUAD LEADER',
    category: 'LORE',
    image: 'https://placehold.co/800x600/000000/FFFFFF?text=ANIME+LORE'
  },
  {
    id: 'setup-tour',
    title: 'Top 5 setupów naszych graczy',
    excerpt: 'Zestawienie najbardziej epickich biurek i monitorów od naszej społeczności. TWWW w akcji.',
    date: '10.03.2024',
    author: 'GEEK',
    category: 'COMMUNITY',
    image: 'https://placehold.co/800x600/000000/FFFFFF?text=SETUPS'
  }
];

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-[color:var(--surface)] font-antonio">
      <Header />

      <div className="container mx-auto px-6 pt-40 pb-20">
        <div className="mb-20">
           <span className="text-[13px] font-black tracking-[0.5em] text-[color:var(--foreground)]/20 uppercase mb-4 block">Archive // Journals</span>
           <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter italic mb-8">Nasza Historia</h1>
           <p className="text-xl font-bold opacity-40 uppercase max-w-2xl italic">Dziennik pokładowy squadu TWWW. Update'y, lore i życie społeczności.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
           {blogPosts.map((post, i) => (
             <motion.article
               key={post.id}
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ delay: i * 0.1 }}
               className="group flex flex-col"
             >
                <div className="aspect-[4/3] rounded-[40px] overflow-hidden bg-[color:var(--surface-muted)] mb-8 relative border border-[color:var(--border)]">
                   <img src={post.image} alt={post.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" />
                   <div className="absolute top-6 left-6 bg-[color:var(--surface)]/80 backdrop-blur-md px-4 py-2 rounded-full text-[11px] font-black uppercase tracking-widest border border-[color:var(--border)]">
                      {post.category}
                   </div>
                </div>

                <div className="flex items-center gap-6 text-[11px] font-black uppercase tracking-widest opacity-30 mb-4">
                   <span className="flex items-center gap-2"><Calendar size={12} /> {post.date}</span>
                   <span className="flex items-center gap-2"><User size={12} /> {post.author}</span>
                </div>

                <h2 className="text-3xl font-black uppercase tracking-tighter italic mb-4 group-hover:text-blue-500 transition-colors leading-none">
                  {post.title}
                </h2>

                <p className="text-[15px] font-bold opacity-40 uppercase tracking-widest leading-relaxed mb-8 flex-1">
                  {post.excerpt}
                </p>

                <Link href={`/blog/${post.id}`} className="inline-flex items-center gap-3 text-[13px] font-black uppercase tracking-[0.3em] group-hover:gap-6 transition-all">
                  Czytaj Dalej <ArrowRight size={16} />
                </Link>
             </motion.article>
           ))}
        </div>
      </div>

      <Footer />
    </main>
  );
}
