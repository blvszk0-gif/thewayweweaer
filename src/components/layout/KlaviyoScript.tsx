'use client';
import { useEffect, useState } from 'react';
import Script from 'next/script';
import { hasMarketingConsent } from './CookieConsent';

export function KlaviyoScript({ companyId }: { companyId: string }) {
    const [allowed, setAllowed] = useState(false);

    useEffect(() => {
        setAllowed(hasMarketingConsent());
        const handler = (e: Event) => {
            const detail = (e as CustomEvent).detail;
            setAllowed(detail === 'accepted');
        };
        window.addEventListener('cookie-consent-changed', handler);
        return () => window.removeEventListener('cookie-consent-changed', handler);
    }, []);

    if (!allowed) return null;

    return (
        <Script
            id="klaviyo-onsite"
            strategy="afterInteractive"
            src={`https://static.klaviyo.com/onsite/js/klaviyo.js?company_id=${encodeURIComponent(companyId)}`}
        />
    );
}