'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import PolicyLayout from '@/components/layout/PolicyLayout';

export default function Terms() {
  const tLegalSearch = useTranslations('legal_search');

  return (
    <PolicyLayout title="Warunki Zakupów">
      <section>
        <h2 className="text-[color:var(--foreground)] font-black mb-4">1. Postanowienia Ogólne</h2>
        <p>{tLegalSearch('niniejszy_regulamin_określa_zasady_korzy')}</p>
      </section>
      <section>
        <h2 className="text-[color:var(--foreground)] font-black mb-4">2. Zwroty</h2>
        <p>{tLegalSearch('klient_ma_14_dni_na_odstąpienie_od_umowy')}</p>
      </section>
    </PolicyLayout>
  );
}
