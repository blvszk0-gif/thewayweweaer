'use client';

import { useState } from 'react';
import { Bell, Check } from 'lucide-react';

interface BackInStockFormProps {
    variantId: string; // GraphQL gid, np. "gid://shopify/ProductVariant/123456789"
}

function extractNumericVariantId(gid: string): string {
    return gid.split('/').pop() ?? gid;
}

export function BackInStockForm({ variantId }: BackInStockFormProps) {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const companyId = process.env.NEXT_PUBLIC_KLAVIYO_COMPANY_ID;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !companyId) return;

        setStatus('loading');

        try {
            const res = await fetch(
                `https://a.klaviyo.com/client/back-in-stock-subscriptions/?company_id=${companyId}`,
                {
                    method: 'POST',
                    headers: {
                        accept: 'application/json',
                        revision: '2024-10-15',
                        'content-type': 'application/json',
                    },
                    body: JSON.stringify({
                        data: {
                            type: 'back-in-stock-subscription',
                            attributes: {
                                channels: ['EMAIL'],
                                profile: {
                                    data: {
                                        type: 'profile',
                                        attributes: { email },
                                    },
                                },
                            },
                            relationships: {
                                variant: {
                                    data: {
                                        type: 'catalog-variant',
                                        id: `$shopify:::$default:::${extractNumericVariantId(variantId)}`,
                                    },
                                },
                            },
                        },
                    }),
                }
            );

            if (!res.ok && res.status !== 202) throw new Error();
            setStatus('success');
        } catch {
            setStatus('error');
        }
    };

    if (!companyId) return null;

    if (status === 'success') {
        return (
            <div className="flex-1 flex items-center justify-center gap-2 border border-[color:var(--border)] rounded-full py-5 font-black uppercase tracking-widest text-sm text-green-600">
                <Check size={18} /> Zgłoszono! Odezwiemy się mailem.
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="flex-1 flex flex-col sm:flex-row gap-3">
            <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Twój adres e-mail"
                className="flex-1 border border-[color:var(--border)] rounded-full px-6 py-4 bg-transparent font-bold focus:outline-none"
            />
            <button
                type="submit"
                disabled={status === 'loading'}
                className="flex items-center justify-center gap-2 bg-[color:var(--foreground)] text-[color:var(--surface)] px-6 py-4 rounded-full font-black uppercase tracking-widest text-sm disabled:opacity-50"
            >
                <Bell size={16} />
                {status === 'loading' ? '...' : 'Powiadom mnie'}
            </button>
            {status === 'error' && (
                <p role="alert" className="text-red-500 text-sm font-bold sm:hidden">
                    Coś poszło nie tak, spróbuj ponownie.
                </p>
            )}
        </form>
    );
}