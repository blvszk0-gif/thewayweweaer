'use client';

import React, { useEffect } from 'react';
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
  const [visiblePosts, setVisiblePosts] = React.useState(blogPosts);

  // Mock infinite scroll
  useEffect(() => {
    const handleScroll = () => {
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 500) {
        setVisiblePosts(prev => [...prev, ...blogPosts.map(p => ({ ...p, id: `${p.id}-${Math.random()}` }))]);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main className="min-h-screen bg-[color:var(--surface)] font-antonio">
      <Header />

      <div className="container mx-auto px-6 pt-40 pb-20 max-w-2xl">
        <div className="mb-20 text-center">
           <span className="text-[13px] font-black tracking-[0.5em] text-[color:var(--foreground)]/20 uppercase mb-4 block">Archive // Journals</span>
           <h1 className="text-6xl font-black uppercase tracking-tighter italic mb-8">Nasza Historia</h1>
        </div>

        <div className="flex flex-col gap-24">
           {visiblePosts.map((post, i) => (
             <motion.article
               key={post.id}
               initial={{ opacity: 0, y: 50 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               className="group flex flex-col border border-[color:var(--border)] rounded-[40px] overflow-hidden bg-[color:var(--surface)] shadow-2xl"
             >
                <div className="flex items-center gap-4 p-6 border-b border-[color:var(--border)] bg-[color:var(--surface-muted)]/50">
                   <div className="w-10 h-10 bg-[color:var(--foreground)] text-[color:var(--surface)] rounded-full flex items-center justify-center font-black">TW</div>
                   <div>
                      <p className="text-[15px] font-black uppercase tracking-tighter">THE WAY WE WEAR</p>
                      <p className="text-[11px] font-bold opacity-40 uppercase tracking-widest">{post.category} // {post.date}</p>
                   </div>
                </div>

                <div className="aspect-square bg-[color:var(--surface-muted)] relative overflow-hidden">
                   <img src={post.image} alt={post.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" />
                </div>

                <div className="p-8">
                   <h2 className="text-3xl font-black uppercase tracking-tighter italic mb-4 leading-none">
                     {post.title}
                   </h2>

                   <p className="text-[17px] font-bold opacity-60 uppercase tracking-widest leading-relaxed mb-6">
                     {post.excerpt}
                   </p>

                   <div className="flex items-center gap-4 opacity-30 text-[11px] font-black uppercase tracking-widest">
                      <span>{post.author}</span>
                      <span>•</span>
                      <span>42 LIKES</span>
                   </div>
                </div>
             </motion.article>
           ))}
        </div>
      </div>

      <Footer />
    </main>
  );
}
