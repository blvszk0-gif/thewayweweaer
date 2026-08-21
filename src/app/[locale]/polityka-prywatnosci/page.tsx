'use client';

import React, { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import PolicyLayout from '@/components/layout/PolicyLayout';
import { getShopPolicies, ShopifyShopPolicy } from '@/lib/shopify';

export default function PrivacyPolicy() {
  const tLegalSearch = useTranslations('legal_search');
  const [shopifyPolicy, setShopifyPolicy] = useState<ShopifyShopPolicy | null>(null);

  useEffect(() => {
    async function fetchPolicies() {
      const policies = await getShopPolicies();
      const privacy = policies.find(p => p.handle === 'privacy-policy' || p.title.toLowerCase().includes('privacy') || p.title.toLowerCase().includes('prywatności'));
      if (privacy) setShopifyPolicy(privacy);
    }
    fetchPolicies();
  }, []);

  return (
    <PolicyLayout title={shopifyPolicy?.title || "Polityka Prywatności"}>
      {shopifyPolicy?.body ? (
        <div dangerouslySetInnerHTML={{ __html: shopifyPolicy.body }} />
      ) : (
        <>
          <section>
            <h2 className="text-[color:var(--foreground)] font-black mb-4">1. Administrator Danych</h2>
            <p>{tLegalSearch('administratorem_twoich_danych_osobowych')}</p>
          </section>
          <section>
            <h2 className="text-[color:var(--foreground)] font-black mb-4">2. Zakres Zbieranych Danych</h2>
            <p>{tLegalSearch('zbieramy_dane_niezbędne_do_realizacji_za')}</p>
          </section>
        </>
      )}
    </PolicyLayout>
  );
}
