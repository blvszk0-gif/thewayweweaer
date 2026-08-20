'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import PolicyLayout from '@/components/layout/PolicyLayout';

export default function PrivacyPolicy() {
  const tLegalSearch = useTranslations('legal_search');

  return (
    <PolicyLayout title="Polityka Prywatności">
      <section>
        <h2 className="text-[color:var(--foreground)] font-black mb-4">1. Administrator Danych</h2>
        <p>{tLegalSearch('administratorem_twoich_danych_osobowych')}</p>
      </section>
      <section>
        <h2 className="text-[color:var(--foreground)] font-black mb-4">2. Zakres Zbieranych Danych</h2>
        <p>{tLegalSearch('zbieramy_dane_niezbędne_do_realizacji_za')}</p>
      </section>
    </PolicyLayout>
  );
}
