'use client';
import { useState, useEffect } from 'react';
import { Link } from '@/i18n/routing';

const STORAGE_KEY = 'twww_cookie_consent';

type ConsentState = 'accepted' | 'rejected' | null;

export function CookieConsent() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const stored = localStorage.getItem(STORAGE_KEY) as ConsentState;
        if (!stored) setVisible(true);
    }, []);

    const setConsent = (value: 'accepted' | 'rejected') => {
        localStorage.setItem(STORAGE_KEY, value);
        // Powiadamiamy resztę aplikacji (np. skrypt Klaviyo/GA), że zgoda się zmieniła
        window.dispatchEvent(new CustomEvent('cookie-consent-changed', { detail: value }));
        setVisible(false);
    };

    if (!visible) return null;

    return (
        <div
            role="dialog"
            aria-label="Zgoda na pliki cookie"
            className="fixed bottom-0 left-0 right-0 z-[200] bg-neutral-950 text-white border-t border-white/10 px-6 py-5"
        >
            <div className="container mx-auto flex flex-col sm:flex-row items-center gap-4 justify-between">
                <p className="text-sm leading-relaxed opacity-80 max-w-2xl">
                    Używamy plików cookie do działania sklepu oraz — za Twoją zgodą — do analityki i marketingu.
                    Szczegóły znajdziesz w{' '}
                    <Link href="/cookies" className="underline hover:opacity-70">
                        Polityce cookies
                    </Link>.
                </p>
                <div className="flex gap-3 shrink-0">
                    <button
                        onClick={() => setConsent('rejected')}
                        className="px-5 py-2.5 rounded-full border border-white/20 text-xs font-black uppercase tracking-widest hover:bg-white/10 transition-all"
                    >
                        Odrzuć
                    </button>
                    <button
                        onClick={() => setConsent('accepted')}
                        className="px-5 py-2.5 rounded-full bg-white text-black text-xs font-black uppercase tracking-widest hover:opacity-90 transition-all"
                    >
                        Akceptuję
                    </button>
                </div>
            </div>
        </div>
    );
}

export function hasMarketingConsent(): boolean {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem(STORAGE_KEY) === 'accepted';
}