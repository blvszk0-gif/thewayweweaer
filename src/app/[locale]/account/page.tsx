'use client';

import { useEffect, useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

type Customer = { firstName?: string; lastName?: string; emailAddress?: { emailAddress?: string }; orders?: { nodes: Array<{ id: string; number?: string; processedAt?: string; financialStatus?: string; fulfillmentStatus?: string; totalPrice?: { amount: string; currencyCode: string } }> } };

export default function AccountPage() {
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => { fetch('/api/auth/me').then((response) => response.ok ? response.json() : { customer: null }).then((data) => setCustomer(data.customer)).finally(() => setLoading(false)); }, []);
  const logout = async () => { await fetch('/api/auth/logout', { method: 'POST' }); window.location.assign('/'); };
  return <main className="min-h-screen bg-[color:var(--surface)] text-[color:var(--foreground)] font-antonio"><Header />
    <section className="container mx-auto px-6 pt-36 pb-24 max-w-5xl">
      {loading && <p className="font-black uppercase tracking-widest opacity-50">Ładowanie konta…</p>}
      {!loading && !customer && <div className="text-center py-24"><h1 className="text-5xl font-black uppercase italic">TWWW Club</h1><p className="mt-5 opacity-60">Zaloguj się, aby zobaczyć swoje zamówienia.</p><button onClick={() => window.location.assign('/api/auth/login?returnTo=/account')} className="inline-block mt-8 bg-[color:var(--foreground)] text-[color:var(--surface)] px-8 py-4 rounded-full font-black uppercase tracking-widest">Zaloguj się</button></div>}
      {!loading && customer && <><div className="flex justify-between gap-6 items-start mb-14"><div><p className="opacity-50 font-black uppercase tracking-widest">TWWW Club</p><h1 className="text-5xl font-black uppercase italic">{customer.firstName || customer.emailAddress?.emailAddress || 'Moje konto'}</h1><p className="mt-3 opacity-60">{customer.emailAddress?.emailAddress}</p></div><button onClick={logout} className="border border-[color:var(--border)] px-5 py-3 rounded-full font-black uppercase tracking-widest text-sm">Wyloguj się</button></div>
        <h2 className="text-2xl font-black uppercase italic mb-6">Historia zamówień</h2>
        {customer.orders?.nodes?.length ? <div className="space-y-4">{customer.orders.nodes.map((order) => <article key={order.id} className="border border-[color:var(--border)] rounded-2xl p-6 flex flex-wrap justify-between gap-4"><div><p className="font-black">Zamówienie #{order.number || order.id}</p><p className="opacity-50 text-sm">{order.processedAt ? new Date(order.processedAt).toLocaleDateString('pl-PL') : ''}</p></div><div className="text-right"><p className="font-black">{order.totalPrice ? `${order.totalPrice.amount} ${order.totalPrice.currencyCode}` : ''}</p><p className="opacity-50 text-sm">{order.fulfillmentStatus || order.financialStatus || 'W realizacji'}</p></div></article>)}</div> : <p className="opacity-50">Nie masz jeszcze zamówień.</p>}</>}
    </section><Footer />
  </main>;
}
