'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import PolicyLayout from '@/components/layout/PolicyLayout';

export default function Cookies() {
  const tLegalSearch = useTranslations('legal_search');

  return (
    <PolicyLayout title="Pliki Cookie">
      <section>
        <h2 className="text-[color:var(--foreground)] font-black mb-4">{tLegalSearch('czym_są_cookies')}</h2>
        <p>{tLegalSearch('to_małe_pliki_tekstowe_zapisywane_na_two')}</p>
      </section>
    </PolicyLayout>
  );
}
