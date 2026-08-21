'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { UserCheck } from 'lucide-react';

export const LoginForm = () => {
  const tAccount = useTranslations('account');

  const handleShopifyLogin = () => {
    window.location.href = '/api/auth/login';
  };

  return (
    <div className="w-full max-w-md mx-auto font-antonio">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[color:var(--surface)] rounded-[40px] p-8 sm:p-10 shadow-2xl border border-[color:var(--border)] text-center space-y-8"
      >
        <div className="w-20 h-20 bg-[color:var(--surface-muted)] text-[color:var(--foreground)] rounded-full flex items-center justify-center mx-auto border border-[color:var(--border)] shadow-xl">
          <UserCheck size={36} />
        </div>

        <div>
          <h2 className="text-3xl font-black uppercase tracking-tighter italic mb-2">
            Konto Klienta Shopify
          </h2>
          <p className="text-sm font-bold uppercase tracking-wider opacity-60 leading-relaxed">
            {tAccount('zaloguj_się_aby_uzyskać_dostęp_do_swojeg')}
          </p>
        </div>

        <button
          type="button"
          onClick={handleShopifyLogin}
          className="w-full bg-[color:var(--foreground)] text-[color:var(--surface)] py-5 rounded-full font-black uppercase tracking-[0.2em] text-sm shadow-xl hover:opacity-90 transition-all flex items-center justify-center gap-3"
        >
          {tAccount('zaloguj_zarejestruj_się')} (Shopify OAuth)
        </button>

        <p className="text-[11px] font-bold uppercase tracking-widest opacity-40">
          Bezpieczne logowanie bezhasłowe za pomocą oficjalnego Shopify Customer Account API.
        </p>
      </motion.div>
    </div>
  );
};
