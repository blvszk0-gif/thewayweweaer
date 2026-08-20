'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { motion } from 'framer-motion';
import { Twitter, Instagram, Facebook, Youtube } from 'lucide-react';

const socials = [
  { id: 'x', label: 'X.COM', icon: Twitter, link: 'https://x.com', image: 'https://images.unsplash.com/photo-1611605698335-8b1569810432?auto=format&fit=crop&q=80&w=800' },
  { id: 'insta', label: 'INSTAGRAM', icon: Instagram, link: 'https://instagram.com', image: 'https://images.unsplash.com/photo-1611262588024-d1217049d9c6?auto=format&fit=crop&q=80&w=800' },
  { id: 'fb', label: 'FACEBOOK', icon: Facebook, link: 'https://facebook.com', image: 'https://images.unsplash.com/photo-1611223235982-5f503482b48d?auto=format&fit=crop&q=80&w=800' },
  { id: 'tiktok', label: 'TIKTOK', icon: Youtube, link: 'https://tiktok.com', image: 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?auto=format&fit=crop&q=80&w=800' },
];

export default function FollowUsPage() {
  const tEditorial = useTranslations('editorial');

  return (
    <main className="min-h-screen bg-[color:var(--surface)] text-[color:var(--foreground)] font-antonio relative overflow-hidden">
      <Header />
      <div className="container mx-auto px-6 pt-40 pb-20 relative z-10">
        <header className="mb-20 text-center">
           <p className="text-[17px] font-black uppercase tracking-[0.4em] text-[color:var(--foreground)]/30 mb-4">Project: TWWW // Subject:</p>
           <h1 className="text-7xl font-black uppercase tracking-tighter italic leading-none">{tEditorial('śledź_nasz_profil')}</h1>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
           {socials.map((social, i) => (
             <a
               key={social.id}
               href={social.link}
               target="_blank"
               rel="noopener noreferrer"
               className="group relative aspect-square overflow-hidden rounded-[50px] border border-[color:var(--border)] shadow-2xl hover:scale-[1.02] transition-all duration-700"
             >
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.1 }}>
                  <img src={social.image} alt={social.label} className="w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000 group-hover:scale-110" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/20 group-hover:bg-transparent transition-colors">
                     <social.icon size={48} className="text-white mb-4 opacity-50 group-hover:opacity-100 transition-all" />
                     <span className="text-4xl font-black uppercase tracking-tighter italic text-white drop-shadow-2xl">{social.label}</span>
                  </div>
                </motion.div>
             </a>
           ))}
        </div>
      </div>
      <Footer />
    </main>
  );
}
