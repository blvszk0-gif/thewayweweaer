'use client';

import React, { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { Package, Truck, CheckCircle2, MapPin, Search, ExternalLink } from 'lucide-react';
import { useParams } from 'next/navigation';
import { Link } from '@/i18n/routing';
import { CatOrderConfirmed } from '@/components/animations/CatOrderConfirmed';
import { CatPreparingOrder } from '@/components/animations/CatPreparingOrder';
import { CatShippingOrder } from '@/components/animations/CatShippingOrder';
import { CatDelivered } from '@/components/animations/CatDelivered';
import { CatCancelled } from '@/components/animations/CatCancelled';
import { PixelBackdrop } from '@/components/animations/PixelBackdrop';
import { CANCELLED_LABEL, ORDER_STAGES, extractNumericId, isOrderCancelled, orderStageIndex } from '@/lib/orderStatus';

const stageIcons = [CheckCircle2, Search, Truck, Package];
const stageComponents = [CatOrderConfirmed, CatPreparingOrder, CatShippingOrder, CatDelivered];

type Order = {
  id: string;
  number?: number;
  cancelledAt?: string | null;
  fulfillmentStatus?: string;
  shippingAddress?: {
    name: string | null;
    address1: string | null;
    address2: string | null;
    city: string | null;
    zip: string | null;
  } | null;
  fulfillments?: {
    nodes: Array<{
      latestShipmentStatus: string | null;
      trackingInformation: Array<{ company: string | null; number: string | null; url: string | null }>;
    }>;
  };
};

type FetchState = 'loading' | 'guest' | 'not-found' | 'ready';

export default function OrderStatusPage() {
  const tAccount = useTranslations('account');
  const params = useParams();
  const id = params.id as string;
  const [state, setState] = useState<FetchState>('loading');
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    fetch('/api/auth/me')
      .then(async (res) => {
        if (!res.ok) {
          setState('guest');
          return;
        }
        const data = await res.json() as { customer: { orders?: { nodes: Order[] } } | null };
        const found = data.customer?.orders?.nodes.find((o) => extractNumericId(o.id) === id);
        if (!found) {
          setState('not-found');
          return;
        }
        setOrder(found);
        setState('ready');
      })
      .catch(() => setState('guest'));
  }, [id]);

  const cancelled = order ? isOrderCancelled(order) : false;
  const currentStatus = order ? orderStageIndex(order) : 0;
  const tracking = order?.fulfillments?.nodes.find((f) => f.trackingInformation.length > 0)?.trackingInformation[0];
  const recipient = order?.shippingAddress;

  return (
    <main className="min-h-screen bg-[color:var(--surface)] font-antonio shadow-[inset_0_0_100px_rgba(0,0,0,0.1)]">
      <Header />

      <div className="container mx-auto px-6 pt-40 pb-20 max-w-4xl">
        <div className="bg-[color:var(--surface)]/95 backdrop-blur-md rounded-[50px] p-12 shadow-2xl relative overflow-hidden border border-[color:var(--border)]">

          <div className="flex justify-between items-start mb-16 relative z-10">
            <div>
              <p className="text-[17px] font-black uppercase tracking-[0.3em] text-[color:var(--foreground)]/30 mb-2">Order Tracking // ID: {id}</p>
              <h1 className="text-5xl font-black uppercase tracking-tighter italic">Status Twojej Paczki</h1>
            </div>
            {state === 'ready' && (
              <div className="bg-[color:var(--foreground)] text-[color:var(--surface)] px-6 py-2 rounded-full text-[17px] font-black uppercase tracking-widest">
                Live Update
              </div>
            )}
          </div>

          {state === 'loading' && (
            <p className="text-center py-20 font-black uppercase tracking-widest opacity-40">Ładowanie…</p>
          )}

          {state === 'guest' && (
            <div className="text-center py-20">
              <p className="font-black uppercase tracking-widest opacity-60 mb-6">Zaloguj się, aby zobaczyć status zamówienia.</p>
              <Link href="/account" className="inline-block bg-[color:var(--foreground)] text-[color:var(--surface)] px-8 py-4 rounded-full font-black uppercase tracking-widest text-sm">
                Przejdź do konta
              </Link>
            </div>
          )}

          {state === 'not-found' && (
            <div className="text-center py-20">
              <p className="font-black uppercase tracking-widest opacity-60 mb-6">Nie znaleziono zamówienia na Twoim koncie.</p>
              <Link href="/account" className="inline-block bg-[color:var(--foreground)] text-[color:var(--surface)] px-8 py-4 rounded-full font-black uppercase tracking-widest text-sm">
                Wróć do konta
              </Link>
            </div>
          )}

          {state === 'ready' && (
            <>
              {cancelled ? (
                <div className="mb-20 flex flex-col items-center justify-center relative">
                  <PixelBackdrop statusLabel={CANCELLED_LABEL}>
                    <CatCancelled />
                  </PixelBackdrop>
                  <p className="mt-6 text-2xl font-black italic uppercase tracking-tighter text-center text-red-500">{CANCELLED_LABEL}</p>
                </div>
              ) : (
                <>
                  <div className="mb-20 flex flex-col items-center justify-center relative">
                    <PixelBackdrop statusLabel={ORDER_STAGES[currentStatus].label}>
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={currentStatus}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          transition={{ duration: 0.4 }}
                          className="relative z-10 w-full h-full flex items-center justify-center"
                        >
                          {React.createElement(stageComponents[currentStatus])}
                        </motion.div>
                      </AnimatePresence>
                    </PixelBackdrop>
                    <p className="mt-6 text-2xl font-black italic uppercase tracking-tighter text-center">{ORDER_STAGES[currentStatus].label}</p>
                  </div>

                  <div className="relative px-4">
                    <div className="absolute top-6 left-12 right-12 h-1 bg-[color:var(--border)]" />
                    <motion.div
                      className="absolute top-6 left-12 h-1 bg-[color:var(--foreground)] origin-left"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: (currentStatus / (ORDER_STAGES.length - 1)) }}
                      transition={{ duration: 1, ease: "circOut" }}
                    />
                    <div className="relative flex justify-between">
                      {ORDER_STAGES.map((step, i) => {
                        const Icon = stageIcons[i];
                        return (
                          <div key={step.id} className="flex flex-col items-center relative z-10">
                            <motion.div
                              className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 border-2 ${i <= currentStatus ? 'bg-[color:var(--foreground)] text-[color:var(--surface)] border-[color:var(--foreground)] shadow-xl' : 'bg-[color:var(--surface)] text-[color:var(--foreground)]/40 border-[color:var(--border)]'}`}
                              animate={i === currentStatus ? { scale: [1, 1.2, 1] } : {}}
                              transition={{ repeat: Infinity, duration: 2 }}
                            >
                              <Icon size={20} />
                            </motion.div>
                            <p className={`mt-4 text-[17px] font-black uppercase tracking-widest text-center max-w-[100px] ${i <= currentStatus ? 'opacity-100' : 'opacity-20'}`}>
                              {step.label}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </>
              )}

              <div className="mt-20 pt-12 border-t border-[color:var(--border)] flex flex-col md:flex-row gap-12">
                <div className="flex-1">
                  <h3 className="text-base font-black uppercase tracking-widest mb-6 italic flex items-center gap-2">
                    <MapPin size={16} /> {tAccount('adres_dostawy')}
                  </h3>
                  <p className="text-[18px] font-bold uppercase opacity-60 leading-relaxed">
                    {recipient?.name || 'Klient TWWW'}<br />
                    {[recipient?.address1, recipient?.address2].filter(Boolean).join(', ') || 'Brak wyznaczonego adresu'}<br />
                    {[recipient?.zip, recipient?.city].filter(Boolean).join(' ') || 'Polska'}
                  </p>
                </div>
                <div className="flex-1">
                  <h3 className="text-base font-black uppercase tracking-widest mb-6 italic flex items-center gap-2">
                    <Truck size={16} /> {tAccount('preferowana_metoda_dostawy')}
                  </h3>
                  <p className="text-[18px] font-bold uppercase opacity-60 leading-relaxed">
                    {tracking?.company || 'Kurier / Paczkomat'}
                  </p>
                  {tracking?.url && (
                    <a
                      href={tracking.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-flex items-center gap-2 text-sm font-black uppercase tracking-widest underline underline-offset-4 opacity-80 hover:opacity-100"
                    >
                      Śledź przesyłkę{tracking.number ? ` — ${tracking.number}` : ''} <ExternalLink size={14} />
                    </a>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <Footer />
    </main>
  );
}
