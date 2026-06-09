'use client';

import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CartView } from '@/components/shop/CartView';

export default function CartPage() {
  return (
    <main className="min-h-screen bg-black">
      <Header />
      <CartView />
      <Footer />
    </main>
  );
}
