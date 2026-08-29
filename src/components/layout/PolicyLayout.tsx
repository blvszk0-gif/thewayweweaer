import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export default function PolicyLayout({ title, children }: { title: string, children: React.ReactNode }) {
  return (
    <main className="min-h-screen text-[color:var(--foreground)] font-antonio">
      <Header />
      <div className="container mx-auto px-6 pt-40 pb-20 max-w-4xl">
        <h1 className="text-5xl font-black uppercase tracking-tighter italic mb-12">{title}</h1>
        <div className="prose prose-sm max-w-none font-bold uppercase text-[13px] tracking-widest text-[color:var(--foreground)]/70 leading-relaxed space-y-8">
          {children}
        </div>
      </div>
      <Footer />
    </main>
  );
}
