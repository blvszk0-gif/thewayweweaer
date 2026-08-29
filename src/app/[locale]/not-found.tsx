'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export default function NotFound() {
  const tEditorial = useTranslations('editorial');

  return (
    <main className="min-h-screen text-[color:var(--foreground)] font-antonio flex flex-col">
      <Header />
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-9xl font-black italic tracking-tighter opacity-10">404</h1>
        <div className="mt-[-4rem]">
          <h2 className="text-4xl font-black uppercase italic tracking-tighter mb-4">{tEditorial('strona_nie_została_odnaleziona')}</h2>
          <p className="text-[18px] font-bold opacity-50 uppercase tracking-widest mb-8">{tEditorial('strona_której_szukasz_nie_istnieje_lub_z')}</p>
          <Link
            href="/"
            className="inline-block bg-[color:var(--foreground)] text-[color:var(--surface)] px-12 py-5 rounded-full font-black uppercase tracking-widest text-[18px] shadow-2xl hover:scale-105 transition-transform"
          >
            {tEditorial('wróć_do_strony_głównej')}
          </Link>
        </div>
      </div>
      <Footer />
    </main>
  );
}
