'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import PolicyLayout from '@/components/layout/PolicyLayout';

export default function PersonalData() {
  const tLegalSearch = useTranslations('legal_search');

  return (
    <PolicyLayout title="Ochrona Danych Osobowych">
      <section>
        <h2 className="text-[color:var(--foreground)] font-black mb-4">Twoje Prawa</h2>
        <p>{tLegalSearch('masz_prawo_do_wglądu_w_swoje_dane_ich_po')}</p>
      </section>
    </PolicyLayout>
  );
}
