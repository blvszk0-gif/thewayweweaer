'use client';

import { motion } from 'framer-motion';

export const LoginForm = () => {
  const startLogin = () => { window.location.assign(`/api/auth/login?returnTo=${encodeURIComponent('/account')}`); };
  return <div className="w-full max-w-md mx-auto font-antonio">
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-[color:var(--surface)] rounded-[40px] p-12 shadow-2xl border border-[color:var(--border)] text-center">
      <h1 className="text-3xl font-black uppercase tracking-tighter italic mb-5 text-[color:var(--foreground)]">The Way We Are</h1>
      <p className="text-[14px] font-bold uppercase opacity-50 tracking-widest leading-relaxed text-[color:var(--foreground)] mb-10">Zaloguj się lub utwórz konto, aby mieć dostęp do swoich zamówień i ustawień. Zakupy jako gość pozostają dostępne.</p>
      <button type="button" onClick={startLogin} className="w-full bg-[color:var(--foreground)] text-[color:var(--surface)] py-6 rounded-full font-black uppercase tracking-[0.2em] shadow-xl hover:opacity-90 transition-all">Zaloguj się / Utwórz konto</button>
      <p className="mt-7 text-xs font-bold uppercase tracking-wider opacity-40">Dostępne metody logowania zależą od konfiguracji Shopify, np. e-mail lub Google.</p>
    </motion.div>
  </div>;
};
